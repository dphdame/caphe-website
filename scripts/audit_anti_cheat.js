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

const LAB_DIR = path.join(__dirname, '..', 'public', 'methods-lab');

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

  // 2. Metadata, JSON-LD & External Citations
  const expectedCanonical = `https://www.caphegroup.org/methods-lab/${slug}`;
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
    errors.push(`Missing or mismatched canonical link (${expectedCanonical})`);
  }
  if (!/"@type"\s*:\s*\[\s*"Article"\s*,\s*"LearningResource"\s*\]/.test(html)) {
    errors.push('Missing Article/LearningResource JSON-LD');
  }
  if (!/"@type"\s*:\s*"FAQPage"/.test(html)) {
    errors.push('Missing FAQPage JSON-LD');
  }
  const extLinks = (html.match(/href="https:\/\/[^"]+"/g) || []).filter(
    h => !h.includes('fonts.googleapis.com') && !h.includes('fonts.gstatic.com') && !h.includes('caphegroup.org')
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
if (totalFailed > 0) process.exit(1);
