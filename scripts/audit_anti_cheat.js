#!/usr/bin/env node
/**
 * CAPHE Methods Lab — Structural, Data & Visual Integrity Check
 *
 * Enforces hard, objective invariants across all 24 compiled case studies
 * (and pho-packaging-prototype.html) without policing prose style via word-ban
 * lists, sentence-count windows, or Flesch-Kincaid regexes:
 *
 * 1. Required page sections present (<h1>, .subtitle, .policy-setting, .answer-block,
 *    Table 1 #quantitativeComparisonTable, Table 2 #policyFitTable, <details id="data-sources-endnotes">)
 * 2. Valid metadata & links (canonical URL, Article + FAQPage JSON-LD, >= 4 external source links, resolving endnotes)
 * 3. Hard Ban on Stacked Bar Charts (.budget-bar-seg / .budget-bar-track forbidden; CHW chart uses separate horizontal bars)
 * 4. Strict Ledger Purity (never sum Year-1 cash claims + monetized QALYs into a combined dollar total)
 * 5. Subtle Perspective Framing (no mechanical "Perspective:" badge strings in visible headers/cards; Class A has "Where the Return Shows Up")
 * 6. Explicit Model Input Labeling & Zero Unmodeled Vacancy Extrapolations
 * 7. Clean HTML & Typography Rendering (no em-dashes, no unescaped < or >, no unbalanced parens in cells, no [+-]~ collisions)
 */

const fs = require('fs');
const path = require('path');

const LAB_DIR = path.join(__dirname, '..', 'public', 'case-studies');

const EXPECTED_SLUGS = [
  'chw-health-outcomes',
  'medicaid-expansion',
  'food-insecurity-diabetes',
  'observational-to-experimental',
  'reverse-causation-feedback',
  'before-after-trap',
  'selection-into-treatment',
  'threat-regression-to-mean',
  'budget-impact',
  'measuring-health-common-unit',
  'cost-effectiveness-ratio',
  'sensitivity-analysis-cea',
  'threat-history-solutions',
  'threat-maturation-solutions',
  'threat-measurement-instrumentation',
  'study-design-ladder',
  'parallel-trends-power',
  'p-hacking-multiple-testing',
  'measurement-error-claims',
  'collider-bias',
  'classifying-causal-mechanisms',
  'food-affordability-tradeoffs',
  'geographic-variables',
  'identical-data-opposite-policies'
];

const CLASS_A_FINANCING_CEA = new Set([
  'chw-health-outcomes',
  'budget-impact',
  'measuring-health-common-unit',
  'cost-effectiveness-ratio',
  'sensitivity-analysis-cea'
]);

function stripNonVisible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<details[\s\S]*?<\/details>/gi, ' ');
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

let totalFailed = 0;

for (const slug of EXPECTED_SLUGS) {
  const filePath = path.join(LAB_DIR, slug, 'index.html');
  const errors = [];

  if (!fs.existsSync(filePath)) {
    console.error(`FAIL [${slug}]: Missing compiled HTML at ${filePath}`);
    totalFailed++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : html;
  const visibleMainHtml = stripNonVisible(mainHtml);
  const visibleMainText = stripTags(visibleMainHtml);

  // 1. Required structural sections
  if (!/<h1[^>]*>[\s\S]*?<\/h1>/i.test(mainHtml)) errors.push('Missing <h1> headline');
  const beatMatches = [...mainHtml.matchAll(/<p class="[^"]*\bopening-beat\b[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)];
  if (beatMatches.length !== 3) {
    errors.push(`Expected 3 .opening-beat paragraphs in executive header, found ${beatMatches.length}`);
  }
  if (!/(?:California Data Brief|Program Cost\s*(?:&amp;|&)\s*Impact Model|Evidence Guide)/i.test(visibleMainHtml)) {
    errors.push('Missing plain-English brief-type kicker (California Data Brief / Program Cost & Impact Model / Evidence Guide)');
  }
  if (!/<p class="policy-setting\b[^>]*>([\s\S]*?)<\/p>/i.test(mainHtml)) {
    errors.push('Missing .policy-setting topic introduction paragraph');
  }
  if (!/<p class="answer-block\b[^>]*>([\s\S]*?)<\/p>/i.test(mainHtml)) {
    errors.push('Missing .answer-block analytical summary paragraph');
  }
  if (!/id="quantitativeComparisonTable"/i.test(mainHtml)) {
    errors.push('Missing Table 1 (#quantitativeComparisonTable)');
  }
  if (!/id="policyFitTable"/i.test(mainHtml)) {
    errors.push('Missing Table 2 (#policyFitTable)');
  }
  if (!/<details\s+id="data-sources-endnotes"/i.test(mainHtml)) {
    errors.push('Missing collapsible <details id="data-sources-endnotes"> block');
  }

  // 2. Metadata, JSON-LD, GA4 Tag & External Citations
  const expectedCanonical = `https://www.caphegroup.org/case-studies/${slug}`;
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
    errors.push(`Missing or mismatched canonical link (${expectedCanonical})`);
  }
  if (!html.includes('https://www.googletagmanager.com/gtag/js?id=G-E1LG1N11QE')) {
    errors.push('Missing GA4 Google tag (G-E1LG1N11QE) in <head>');
  }
  if (!/"@type"\s*:\s*\[\s*"Article"\s*,\s*"LearningResource"\s*\]/.test(html)) {
    errors.push('Missing Article/LearningResource JSON-LD');
  }
  if (!/"@type"\s*:\s*"FAQPage"/.test(html)) {
    errors.push('Missing FAQPage JSON-LD');
  }
  const extLinks = (html.match(/href="https:\/\/[^"]+"/g) || []).filter(
    h => !h.includes('fonts.googleapis.com') && !h.includes('fonts.gstatic.com') && !h.includes('googletagmanager.com') && !h.includes('caphegroup.org')
  );
  if (extLinks.length < 4) {
    errors.push(`Expected >= 4 external citation links, found ${extLinks.length}`);
  }

  // Verify superscript endnote links resolve to #endnote-N
  const endnoteRefs = [...mainHtml.matchAll(/href="#endnote-(\d+)"/gi)].map(m => Number(m[1]));
  for (const refNum of endnoteRefs) {
    if (!new RegExp(`id="endnote-${refNum}"`, 'i').test(mainHtml)) {
      errors.push(`Broken endnote link href="#endnote-${refNum}" (no matching id="endnote-${refNum}")`);
    }
  }

  // 3. Hard Ban on Stacked Bar Charts
  if (/class="[^"]*\bbudget-bar-(?:seg|track)\b/i.test(html)) {
    errors.push('Stacked bar chart elements (.budget-bar-seg / .budget-bar-track) are forbidden');
  }
  if (slug === 'chw-health-outcomes') {
    for (const reqId of ['chwCostOffsetSvg', 'chwBarCost', 'chwBarVisit', 'chwBarOffset', 'chwBreakevenLine', 'chwHealthCallout']) {
      if (!new RegExp(`id="${reqId}"`).test(html)) {
        errors.push(`Missing required paired horizontal bar chart element #${reqId}`);
      }
    }
    const barYs = [...html.matchAll(/id="chwBar(?:Cost|Visit|Offset)"[^>]*\by="(\d+)"/g)].map(m => Number(m[1]));
    if (barYs.length === 3 && new Set(barYs).size !== 3) {
      errors.push(`CHW horizontal bars must be separate rows with distinct y-coordinates, found y=${barYs.join(',')}`);
    }
  }

  // 4. Strict Ledger Purity (Never sum cash offsets + monetized QALYs)
  if (/Total Annual Value\*/i.test(visibleMainText) || /\$407,006|\$407,000\s*\/\s*yr|\$853,220|\$591,171|\$591,000\s*\/\s*yr/i.test(visibleMainText)) {
    errors.push('Mixed ledger violation: cash claims and monetized QALYs must never be summed into a single Total Annual Value figure');
  }

  // 5. Subtle Perspective Framing (No mechanical "Perspective:" badges; Class A has "Where the Return Shows Up")
  if (/\bPerspective\s*:/i.test(visibleMainText)) {
    errors.push('Mechanical "Perspective:" badge string found in visible text; capture perspective through row structure instead');
  }
  if (CLASS_A_FINANCING_CEA.has(slug) && !/Where the Return Shows Up/i.test(visibleMainText)) {
    errors.push('Class A financing/CEA module is missing the "Where the Return Shows Up" row in Table 2');
  }

  // 6. Explicit Model Input Labeling & Zero Unmodeled Vacancy Rows
  if (slug === 'chw-health-outcomes' && !/Assumed Annual Caseload\s*\(Model Input\)/i.test(visibleMainText)) {
    errors.push('chw-health-outcomes Table 1 must explicitly label "Assumed Annual Caseload (Model Input)"');
  }
  if (/Vacancy\s*\/\s*Cut\s+Impact|Leaving\s+1\s+CHW\s+Vacant/i.test(html)) {
    errors.push('Unmodeled vacancy extrapolation row detected');
  }

  // 7. Clean HTML & Typography Rendering
  if (/\u2014|&mdash;/i.test(html)) {
    errors.push('Em-dash detected in generated HTML');
  }
  if (/[+-]~(?=\$|\d)/g.test(visibleMainText)) {
    errors.push('Adjacent sign and tilde (+~ or -~) detected in visible text');
  }

  // Check table cells for unescaped '<' or unbalanced parentheses
  const cellMatches = [
    ...mainHtml.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi),
    ...mainHtml.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)
  ];
  for (const m of cellMatches) {
    const rawCell = m[1];
    const strippedTags = rawCell.replace(/<\/?(?:strong|em|b|i|u|sup|sub|span|div|p|br|a|code|svg|path|rect|line|circle|text)\b[^>]*>/gi, '');
    if (/</.test(strippedTags)) {
      errors.push(`Unescaped '<' in table cell: "${stripTags(rawCell).slice(0, 60)}"`);
      break;
    }
    const cellText = stripTags(rawCell);
    const openP = (cellText.match(/\(/g) || []).length;
    const closeP = (cellText.match(/\)/g) || []).length;
    if (openP !== closeP) {
      errors.push(`Unbalanced parentheses (${openP} open vs ${closeP} close) in table cell: "${cellText.slice(0, 60)}"`);
      break;
    }
  }

  // 8. Selective Non-Stacked SVG Chart Whitelist & Table 1 Number Sync
  const CHART_WHITELIST = new Set([
    'chw-health-outcomes',
    'food-insecurity-diabetes',
    'food-affordability-tradeoffs',
    'medicaid-expansion',
    'cost-effectiveness-ratio',
    'threat-maturation-solutions'
  ]);
  const hasStandaloneSvgChart = /id="(?:studyComparisonSvg|chwCostOffsetSvg)"/.test(html);
  if (CHART_WHITELIST.has(slug) && !hasStandaloneSvgChart) {
    errors.push(`Expected standalone non-stacked SVG chart on whitelisted module [${slug}]`);
  }
  if (!CHART_WHITELIST.has(slug) && hasStandaloneSvgChart) {
    errors.push(`Unexpected standalone SVG chart on table-first module [${slug}]`);
  }
  if (/toggleStudyChartBtn|Preview Without Chart/.test(html)) {
    errors.push('Temporary preview toggle button detected in production HTML');
  }
  if (slug !== 'chw-health-outcomes' && hasStandaloneSvgChart) {
    const svgMatch = html.match(/<svg id="studyComparisonSvg"[\s\S]*?<\/svg>/i);
    const t1Match = html.match(/<table[^>]*id="quantitativeComparisonTable"[\s\S]*?<\/table>/i);
    if (svgMatch && t1Match) {
      const svgText = stripTags(svgMatch[0]);
      const t1Text = stripTags(t1Match[0]);
      const svgNums = [...svgText.matchAll(/(?:\$?\d[\d,]*(?:\.\d+)?%?)/g)]
        .map(m => m[0])
        .filter(tok => !['0%', '2026', '2030', '$50,000', '30%', '25.0%', '100%'].includes(tok));
      for (const numTok of svgNums) {
        if (!t1Text.includes(numTok)) {
          errors.push(`Chart-to-Table 1 mismatch: SVG chart token "${numTok}" not found in Table 1`);
        }
      }
    }
  }

  // 9. Zero Template Meta-Labels, Unexpanded Econometric Shorthand, or Metaphors in Visible Text Outside <details>
  if (/\b(?:Ruler\s+[12AB]|Mode\s+[AB])\b/.test(visibleMainText)) {
    errors.push('Template meta-label (Ruler 1/2/A/B or Mode A/B) leaked into visible text');
  }
  if (/\b(?:TWFE|2SLS|Long-Diff|ICER|NMB)\b|ΔR²|ΔCost|ΔE|\bλ\s*=|\bM\*\s*=/.test(visibleMainText)) {
    errors.push('Unexpanded econometric or formula shorthand (TWFE/2SLS/Long-Diff/ICER/NMB/ΔR²/ΔCost/ΔE/λ=/M*=) leaked into visible text');
  }
  const METAPHOR_BAN_RE = /\b(?:squeez\w*|waves?|traps?|pitfalls?|funnels?|ladders?|coin[- ]?flips?|red tape|bounce[- ]?backs?|bounc(?:e|ed|es|ing)|fenc(?:e|ed|es|ing)|chas(?:e|ed|es|ing)|swamp\w*|drain\w*|soak\w*|shortchang\w*|crowd\w*\s+out|bottlenecks?|cushions?|rulers?|steer\w*|weigh(?:s|ed|ing)?|headwinds?|tailwinds?|spillover\w*|bleed\w*|erod\w*|anchor\w*|shield\w*|hurdles?|pockets?|cliff\w*|skyrocket\w*|plummet\w*|slash\w*|pit(?:s|ted|ting)?|flood\w*|starv\w*|fuel\w*|spark\w*|blind spots?|yardsticks?|playing field|one-size-fits-all|move the needle|bucket\w*|triage|ledgers?|ceilings?|fram(?:e|es|ed|ing)|dull\w*|mask\w*|hid(?:e|es|ing|den)|flatten\w*|fall(?:s|ing)?\s+short|strain\w*|spikes?|jumps?|rebuild\w*|sunset\w*|food[- ]deserts?|mobility[- ]deserts?|safety[- ]net|flagships?|handoffs?|drop[- ]?offs?|drift\w*|pathways?|ramp[- ]?ups?|surge\w*|pays?\s+for\s+(?:itself|themselves)|swings?)\b|(?<!main\s)\bfloors?\b|(?<!x\s)\blift(?:s|ed|ing)?\b(?!\s*&|\s+over|\s*=)/gi;
  const pageTitleText = stripTags((html.match(/<title>([\s\S]*?)<\/title>/i) || ['', ''])[1]);
  const metaDescText = ((html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || ['', ''])[1]).trim();
  const detailsOwnText = [...mainHtml.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)]
    .map(m => stripTags(m[1].replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ' ')))
    .join(' ');
  const metaphorScanTargets = [
    ['head title/meta', `${pageTitleText} ${metaDescText}`],
    ['visible text', visibleMainText],
    ['details notes', detailsOwnText]
  ];
  for (const [surfaceName, surfaceText] of metaphorScanTargets) {
    for (const metMatch of surfaceText.matchAll(METAPHOR_BAN_RE)) {
      const idx = metMatch.index;
      const ctx = surfaceText.slice(Math.max(0, idx - 25), idx + metMatch[0].length + 25);
      errors.push(`Metaphor "${metMatch[0]}" detected in ${surfaceName}: "...${ctx}..."`);
    }
  }

  if (errors.length === 0) {
    console.log(`PASS [${slug}]`);
  } else {
    totalFailed++;
    console.error(`FAIL [${slug}]:`);
    for (const e of errors) console.error(`  - ${e}`);
  }
}

// Check pho-packaging-prototype.html if present
const protoPath = path.join(LAB_DIR, 'pho-packaging-prototype.html');
if (fs.existsSync(protoPath)) {
  const protoHtml = fs.readFileSync(protoPath, 'utf8');
  const protoVisible = stripTags(stripNonVisible(protoHtml));
  const protoErrs = [];
  if (/\bPerspective\s*:/i.test(protoVisible)) protoErrs.push('Mechanical "Perspective:" badge found in pho-packaging-prototype.html');
  if (/Total Annual Value\*/i.test(protoVisible) || /\$407,006|\$853,220/i.test(protoVisible)) {
    protoErrs.push('Mixed cash+QALY total found in pho-packaging-prototype.html');
  }
  if (/Vacancy\s*\/\s*Cut\s+Impact/i.test(protoHtml)) protoErrs.push('Unmodeled vacancy row found in pho-packaging-prototype.html');
  if (protoErrs.length === 0) {
    console.log('PASS [pho-packaging-prototype.html]');
  } else {
    totalFailed++;
    console.error('FAIL [pho-packaging-prototype.html]:');
    for (const e of protoErrs) console.error(`  - ${e}`);
  }
}

console.log(`\nSummary: ${EXPECTED_SLUGS.length - totalFailed}/${EXPECTED_SLUGS.length} modules passed.`);

const hubPath = path.join(LAB_DIR, 'index.html');
if (fs.existsSync(hubPath)) {
  const hubHtml = fs.readFileSync(hubPath, 'utf8');
  const hubMainMatch = hubHtml.match(/<header[\s\S]*?<\/main>/i);
  const hubText = stripTags(hubMainMatch ? hubMainMatch[0] : stripNonVisible(hubHtml));
  const hubMetRe = /\b(?:squeez\w*|waves?|traps?|pitfalls?|funnels?|ladders?|coin[- ]?flips?|red tape|bounce[- ]?backs?|bounc(?:e|ed|es|ing)|fenc(?:e|ed|es|ing)|chas(?:e|ed|es|ing)|swamp\w*|drain\w*|soak\w*|shortchang\w*|crowd\w*\s+out|bottlenecks?|cushions?|rulers?|steer\w*|weigh(?:s|ed|ing)?|headwinds?|tailwinds?|spillover\w*|bleed\w*|erod\w*|anchor\w*|shield\w*|hurdles?|pockets?|cliff\w*|skyrocket\w*|plummet\w*|slash\w*|pit(?:s|ted|ting)?|flood\w*|starv\w*|fuel\w*|spark\w*|blind spots?|yardsticks?|playing field|one-size-fits-all|move the needle|bucket\w*|triage|ledgers?|ceilings?|fram(?:e|es|ed|ing)|dull\w*|mask\w*|hid(?:e|es|ing|den)|flatten\w*|fall(?:s|ing)?\s+short|strain\w*|spikes?|jumps?|rebuild\w*|sunset\w*|food[- ]deserts?|mobility[- ]deserts?|safety[- ]net|flagships?|handoffs?|drop[- ]?offs?|drift\w*|pathways?|ramp[- ]?ups?|surge\w*|pays?\s+for\s+(?:itself|themselves)|swings?|floors?|lift(?:s|ed|ing)?)\b/i;
  const hubMet = hubText.match(hubMetRe);
  if (hubMet) {
    totalFailed++;
    const idx = hubMet.index;
    console.error(`FAIL [hub index.html]:\n  - Metaphor "${hubMet[0]}" detected: "...${hubText.slice(Math.max(0, idx - 25), idx + hubMet[0].length + 25)}..."`);
  }
}

const { checkAllReadingLevels } = require('./check_reading_level');
const readingCheck = checkAllReadingLevels({ maxFullFk: 8.5, maxNarrativeFk: 8.8, minNarrativeAsl: 10.0, quiet: true });
if (readingCheck.errors.length > 0) {
  totalFailed += readingCheck.errors.length;
  console.error('FAIL [reading-level-gate]:');
  for (const e of readingCheck.errors) console.error(`  - ${e}`);
} else {
  const meanFull = readingCheck.results.reduce((s, r) => s + r.full.fk, 0) / readingCheck.results.length;
  console.log(`PASS [reading-level-gate] (24/24 case studies + hub <= Grade 8.5; mean Full FK = ${meanFull.toFixed(2)})`);
}

if (totalFailed > 0) process.exit(1);
