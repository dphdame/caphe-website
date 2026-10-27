#!/usr/bin/env node
/**
 * Deterministic Anti-Cheat Auditor for CAPHE Methods Lab (30 Modules)
 * Enforces the 10 Non-Negotiable Anti-Cheat Rules from the Goal Specification.
 *
 * Usage:
 *   node scripts/audit_anti_cheat.js                  # Audit all 30 modules
 *   node scripts/audit_anti_cheat.js slug1 slug2 ...  # Audit specific module(s)
 */

const fs = require('fs');
const path = require('path');

const BLUEPRINT_PATH = '/Users/vserver/.gemini/antigravity/brain/b378d7ce-ffef-403d-86d8-d73c4162621b/caphe_30_case_studies_blueprint.md';
const LAB_DIR = path.join(__dirname, '..', 'public', 'methods-lab');

function loadBlueprint() {
  const bp = fs.readFileSync(BLUEPRINT_PATH, 'utf8');
  const map = new Map();
  for (const line of bp.split('\n')) {
    const m = line.match(/^\|\s*\*\*(\d+)\*\*\s*\|\s*`([^`]+)`.*?\|\s*\*\*(Mode [AB])\*\*\s*\|\s*\*\*`<h1>`:\*\*\s*([^<]+)<br>\*\*`<title>`:\*\*\s*`([^`]+)`/);
    if (m) {
      map.set(m[2].trim(), {
        num: Number(m[1]),
        slug: m[2].trim(),
        mode: m[3].trim(),
        h1: m[4].trim(),
        titlePrefix: m[5].trim(),
      });
    }
  }
  return map;
}

const BANNED_ADVERSARIAL = /\b(naive|wrong|mistake|mistakes|flaw|flawed|trap|traps|illusion|mislead|misleads|misleading|distort|distorts|distortion)\b/gi;
const BANNED_METAPHORS = /\b(break|breaks|breaking|broken|breakdown|bottleneck|bottlenecks|survive|survives|surviving|survival|crisis|crises|fail|fails|failing|failure|phantom|paralyzed|destroy|destroys|punish|punishes|penalize|penalizes)\b|(blind spots?|red flags?|false alarms?|fire alarms?)/gi;
const BANNED_SECOND_PERSON = /\b(you|your|yours)\b/gi;
const BANNED_SALESMANSHIP = /\b(proves|guarantees|bulletproof|undeniable|unlock|upgrade)\b|(member access|free with account)/gi;
const SCREEN1_JARGON = /\b(Lewbel|ivreg2|Hansen J|Kleibergen-Paap|Oster|Rambachan-Roth|HonestDiD|Benjamini-Hochberg|VanderWeele)\b/gi;

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}

function computeFkgl(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.split(/\s+/).filter(Boolean).length > 2);
  const words = text.match(/\b[A-Za-z]+\b/g) || [];
  if (!sentences.length || !words.length) return { fkgl: 0, asl: 0, asw: 0 };
  const asl = words.length / sentences.length;
  const asw = words.reduce((a, w) => a + countSyllables(w), 0) / words.length;
  return {
    fkgl: Number((0.39 * asl + 11.8 * asw - 15.59).toFixed(2)),
    asl: Number(asl.toFixed(1)),
    asw: Number(asw.toFixed(2))
  };
}

function htmlToBlockText(htmlFragment) {
  return htmlFragment
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<sup[\s\S]*?<\/sup>/gi, ' ')
    .replace(/<select[\s\S]*?<\/select>/gi, ' ')
    .replace(/&middot;|&#183;|&bull;|&rarr;/gi, '. ')
    .replace(/<\/(p|li|h1|h2|h3|h4|tr|th|td|div|dt|dd|summary|section)>/gi, '. ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&ndash;|&#8211;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMainHtml(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  return m ? m[0] : html;
}

function extractScreen1Html(mainHtml) {
  // Screen 1 = Hero (Block 1: H1, subtitle, answer-block) + Block 2 (Two-Ruler section before Table 1)
  const table1Idx = mainHtml.indexOf('<table');
  return table1Idx > -1 ? mainHtml.slice(0, table1Idx) : mainHtml;
}

function extractAriaLabels(mainHtml) {
  const labels = [];
  const re = /aria-label="([^"]+)"/gi;
  let m;
  while ((m = re.exec(mainHtml)) !== null) {
    labels.push(m[1]);
  }
  return labels.join(' | ');
}

function extractInteractiveScenarios(mainHtml) {
  const m = mainHtml.match(/const\s+scenarios\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return [];
  try {
    const arr = JSON.parse(m[1]);
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

function auditModule(slug, bpMap) {
  const errors = [];
  const filePath = path.join(LAB_DIR, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    return [`Missing file: ${filePath}`];
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const mainHtml = extractMainHtml(html);
  const scenarios = extractInteractiveScenarios(mainHtml);
  const scenarioText = scenarios.map(s => `${s.label || ''} ${s.headline || ''} ${s.metric || ''} ${s.desc || ''}`).join(' | ');
  const visibleText = stripTags(mainHtml) + ' ' + extractAriaLabels(mainHtml) + ' ' + stripTags(scenarioText);
  const bp = bpMap.get(slug);

  if (!bp) {
    errors.push(`Slug ${slug} not found in blueprint`);
    return errors;
  }

  // Rule 1 & 2: Exact Blueprint H1 Alignment & No Question Marks / Case Glitches
  const h1Match = mainHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const actualH1 = h1Match ? stripTags(h1Match[1]) : '';
  if (actualH1 !== bp.h1) {
    errors.push(`[Rule 2: H1 Drift] Actual H1 ("${actualH1}") !== Blueprint H1 ("${bp.h1}")`);
  }
  if (/\b(Why Does [a-z]|How Do [a-z]|When [a-z])/.test(actualH1)) {
    errors.push(`[Rule 1: Case Glitch] Lowercase injection detected in H1: "${actualH1}"`);
  }

  // Rule 3: Banned Adversarial, Metaphorical, Second-Person, and Salesmanship Tokens
  const advMatches = visibleText.match(BANNED_ADVERSARIAL);
  if (advMatches) {
    errors.push(`[Rule 3a: Banned Adversarial Words (${advMatches.length})] ${[...new Set(advMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }
  const metMatches = visibleText.match(BANNED_METAPHORS);
  if (metMatches) {
    errors.push(`[Rule 3b: Banned Metaphor/Alarmist Words (${metMatches.length})] ${[...new Set(metMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }
  const secMatches = visibleText.match(BANNED_SECOND_PERSON);
  if (secMatches) {
    errors.push(`[Rule 3c: Banned Second-Person Words (${secMatches.length})] ${[...new Set(secMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }
  const salesMatches = visibleText.match(BANNED_SALESMANSHIP);
  if (salesMatches) {
    errors.push(`[Rule 3d: Banned Salesmanship/Overclaiming Words (${salesMatches.length})] ${[...new Set(salesMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }
  const gWordMatches = visibleText.match(/\bground(ing|ed|s)?\b/gi);
  if (gWordMatches) {
    errors.push(`[Rule 3e: Banned G-Word (${gWordMatches.length})] ${[...new Set(gWordMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }

  // Rule 4: No Econometric Jargon Dumping on Screen 1
  const screen1Text = stripTags(extractScreen1Html(mainHtml));
  const jargonMatches = screen1Text.match(SCREEN1_JARGON);
  if (jargonMatches) {
    errors.push(`[Rule 4: Screen 1 Jargon (${jargonMatches.length})] Found in Hero/Rulers: ${[...new Set(jargonMatches)].join(', ')}`);
  }

  // Rule 5: Strict Mode A vs Mode B Provenance Truth & Ban in Visible Reader Copy
  const detailsBlocks = [...mainHtml.matchAll(/<details[\s\S]*?<\/details>/gi)].map(m => m[0]);
  const allDetailsHtml = detailsBlocks.join('\n');
  if (bp.mode === 'Mode A') {
    if (!/Mode A/i.test(allDetailsHtml)) {
      errors.push(`[Rule 5: Missing Mode A Provenance Tag] Blueprint specifies Mode A, but "Mode A" does not appear inside <details> provenance notes`);
    }
  } else if (bp.mode === 'Mode B') {
    if (!/Mode B/i.test(allDetailsHtml)) {
      errors.push(`[Rule 5: Missing Mode B Provenance Tag] Blueprint specifies Mode B, but "Mode B" does not appear inside <details> provenance notes`);
    }
  }

  // Rule 6: No placeholder / synthetic / mock markers & required provenance <details> drawer with >= 4 external links
  if (/\b(TODO|TBD|PLACEHOLDER|mock data|synthetic data|lorem ipsum)\b/i.test(visibleText)) {
    errors.push(`[Rule 6: Placeholder/Synthetic Marker] Found forbidden placeholder/synthetic token in visible text`);
  }
  if (detailsBlocks.length === 0) {
    errors.push(`[Rule 6: Missing Provenance Drawer] Module is missing collapsible <details> audit/provenance block`);
  } else {
    const mainDetails = detailsBlocks[detailsBlocks.length - 1];
    const detailsExtLinks = (mainDetails.match(/href="https:\/\/[^"]+"/g) || []).filter(h => !h.includes('caphegroup.org') && !h.includes('fonts.'));
    if (detailsExtLinks.length < 4) {
      errors.push(`[Rule 6: Audit Drawer External Links] Main <details> audit drawer has ${detailsExtLinks.length} external links (min 4 required)`);
    }
  }

  // Rule 8: Explicit Unit-of-Analysis & Ecological Fencing + Table 1 / Table 2 Column Sub-labels
  if (/B19013/i.test(mainHtml) && /B25064/i.test(mainHtml)) {
    if (!/(area-median|modeled|different census universes|all households.*renter)/i.test(visibleText)) {
      errors.push(`[Rule 8: Ecological Fencing] Combines ACS B19013 and B25064 without explicit area-median / universe disclosure`);
    }
  }
  const tables = [...mainHtml.matchAll(/<table[\s\S]*?<\/table>/gi)].map(m => m[0]);
  if (tables.length < 2) {
    errors.push(`[Rule 8: Missing Two-Deck Table Structure] Expected at least 2 tables (Table 1 & Table 2), found ${tables.length}`);
  } else {
    for (let tIdx = 0; tIdx < 2; tIdx++) {
      const colThs = [...tables[tIdx].matchAll(/<th[^>]*scope="col"[^>]*>([\s\S]*?)<\/th>/gi)].map(m => stripTags(m[1]));
      // Expect 5 col headers (1 row-label header + 4 data column headers)
      const dataCols = colThs.slice(1);
      if (dataCols.length !== 4) {
        errors.push(`[Rule 8: Table ${tIdx + 1} Column Count] Expected 4 data columns, found ${dataCols.length}`);
      }
    }
  }

  // Rule 9: Constructive Table 2 Framing (No negative attack row headers)
  const thMatches = [...mainHtml.matchAll(/<th[^>]*scope="row"[^>]*>([\s\S]*?)<\/th>/gi)].map(m => stripTags(m[1]));
  for (const th of thMatches) {
    if (/\b(naive|mislead|trap|fail|flaw|wrong|mistake|distort)\b/i.test(th)) {
      errors.push(`[Rule 9: Negative Row Header] "${th}"`);
    }
  }

  // Rule 10: SEO & Public Access Gate (No login wall / modal gate, canonical & JSON-LD present)
  if (!/<link\s+rel="canonical"/i.test(html)) {
    errors.push(`[Rule 10: Missing Canonical Tag] <link rel="canonical"> not found`);
  }
  if (!/<script\s+type="application\/ld\+json"/i.test(html)) {
    errors.push(`[Rule 10: Missing JSON-LD] Structured data script not found`);
  }

  // Rule 11: Unclipped Executive Visible Word Budget (<= 1,400 words across <main> outside <details> and <select>)
  const visibleNoDetails = mainHtml
    .replace(/<details[\s\S]*?<\/details>/gi, ' ')
    .replace(/<select[\s\S]*?<\/select>/gi, ' ');
  const visibleWordCount = stripTags(visibleNoDetails).split(/\s+/).filter(Boolean).length;
  if (visibleWordCount > 1400) {
    errors.push(`[Rule 11: Visible Word Budget Exceeded] ${visibleWordCount} words in <main> outside <details>/<select> (max 1400)`);
  }

  // Rule 12: Block 2 Single-Case Micro-Caption Completeness & Brevity (<= 70 words per .ruler-desc)
  const rulerDescs = [...mainHtml.matchAll(/<p class="ruler-desc[^>]*>([\s\S]*?)<\/p>/gi)].map(m => stripTags(m[1]));
  rulerDescs.forEach((rText, idx) => {
    const rWords = rText.split(/\s+/).filter(Boolean).length;
    if (rWords > 70) {
      errors.push(`[Rule 12: Ruler ${idx + 1} Caption Too Long] ${rWords} words (max 70): "${rText}"`);
    }
  });

  // Rule 13: Table 2 Intra-Cell Complete Sentence Ceiling (<= 45 words per cell)
  if (tables.length >= 2) {
    const t2Cells = [...tables[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripTags(m[1]));
    for (const cellText of t2Cells) {
      const cw = cellText.split(/\s+/).filter(Boolean).length;
      if (cw > 45) {
        errors.push(`[Rule 13: Table 2 Cell Too Long] ${cw} words (max 45): "${cellText.slice(0, 80)}..."`);
      }
    }
  }

  // Rule 14: Zero Arbitrary Column Tints, Pill Boxes, or Boxes-Inside-Cells
  if (/(col-header-banner|bg-blue-50\/20|bg-emerald-50 border border-emerald-200 rounded-md)/i.test(mainHtml)) {
    errors.push(`[Rule 14: Arbitrary Shaded Box Detected] Remove column tints, decorative SVG header boxes, and boxes-inside-cells`);
  }

  // Rule 15: Zero Mock Access-Explorer Numbers (commit ebfd873 ban)
  if (/(_summary\.json|imperial\.json|fresno\.json|los_angeles\.json|3,810\s*Reg|69\.5\s*\(-30\.5|1,970\s*\/\s*4,210|659\s*\/\s*1,842)/i.test(html)) {
    errors.push(`[Rule 15: Mock Access-Explorer Data Detected] Found reference to mock access-explorer JSON or synthetic NPI headcounts from commit ebfd873`);
  }

  // Rule 16: Zero Meta-Audience Scaffolding Badges (.pedagogical-step or data-step)
  if (/(pedagogical-step|data-step=)/i.test(mainHtml)) {
    errors.push(`[Rule 16: Meta-Audience Scaffolding Badge] Found forbidden .pedagogical-step or data-step badge in <main>`);
  }

  // Rule 17: Zero Mid-Sentence Clipped Fragments in Ruler Descriptions or Table 2 Cells
  const DANGLING_END = /\b(with|by|in|of|to|for|from|and|or|at|on|under|vs\.?|versus|into|across|between|the|a|an|per|as|that|which|where|when|via|within|without|through|during|after|before)\.?$/i;
  for (const rText of rulerDescs) {
    if (DANGLING_END.test(rText.trim()) || /\/$/.test(rText.trim())) {
      errors.push(`[Rule 17: Clipped Ruler Description] "${rText}"`);
    }
  }
  if (tables.length >= 2) {
    const t2Cells = [...tables[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripTags(m[1]));
    for (const cText of t2Cells) {
      if (DANGLING_END.test(cText.trim()) || /\/$/.test(cText.trim())) {
        errors.push(`[Rule 17: Clipped Table 2 Cell] "${cText}"`);
      }
    }
  }
  for (const s of scenarios) {
    for (const field of ['headline', 'desc']) {
      const sVal = stripTags(s[field] || '').trim();
      if (sVal && (DANGLING_END.test(sVal) || /\/$/.test(sVal))) {
        errors.push(`[Rule 17: Clipped Interactive Scenario ${field}] "${sVal}"`);
      }
    }
  }

  // Rule 18: Zero Repeated "Modeled " Prefix in Table 1 Row Headers
  if (tables.length >= 1) {
    const t1RowThs = [...tables[0].matchAll(/<th[^>]*scope="row"[^>]*>([\s\S]*?)<\/th>/gi)].map(m => stripTags(m[1]));
    for (const rTh of t1RowThs) {
      if (/^Modeled\s+/i.test(rTh)) {
        errors.push(`[Rule 18: Repeated "Modeled" Prefix in Table 1 Row Header] Use asterisk (*) and Table 1 footnote instead: "${rTh}"`);
      }
    }
  }

  // Rule 19: Enumerated Endnotes & Zero External Links / Jargon / Metaphors in Visible Executive Copy
  const ansMatch = mainHtml.match(/<p class="answer-block[^>]*>([\s\S]*?)<\/p>/i);
  const ansText = ansMatch ? stripTags(ansMatch[1]).trim() : '';
  if (ansMatch) {
    const ansExtLinks = ansMatch[1].match(/href=["']https?:\/\/[^"']+["']/gi) || [];
    if (ansExtLinks.length > 0) {
      errors.push(`[Rule 19a: Inline External Links in Answer Block] Found ${ansExtLinks.length} external links in .answer-block; use enumerated endnotes [1], [2] instead`);
    }
    const rawCites = [...ansText.matchAll(/\[(\d+)\]/g)].map(m => Number(m[1]));
    if (rawCites.length === 0) {
      errors.push(`[Rule 19b: Missing Enumerated Endnotes] Executive Answer Block has zero [N] endnote markers.`);
    } else {
      for (const n of new Set(rawCites)) {
        const expectedAnchor = new RegExp(`<a[^>]+href="#endnote-${n}"[^>]*>\\s*\\[${n}\\]\\s*<\\/a>`, 'i');
        if (!expectedAnchor.test(ansMatch[1])) {
          errors.push(`[Rule 19b: Unlinked Endnote Marker] Citation [${n}] in Executive Answer Block is not a clickable <a href="#endnote-${n}">[${n}]</a> link.`);
        }
        const targetMatches = [...mainHtml.matchAll(new RegExp(`id="endnote-${n}"`, 'gi'))];
        if (targetMatches.length !== 1) {
          errors.push(`[Rule 19b: Broken or Duplicate Endnote Target] Expected exactly 1 id="endnote-${n}" in <ol class="endnote-list">, found ${targetMatches.length}.`);
        }
      }
    }
  }
  const allEndnoteIds = [...mainHtml.matchAll(/id="endnote-(\d+)"/gi)].map(m => Number(m[1]));
  if (!/id="data-sources-endnotes"/i.test(mainHtml) || allEndnoteIds.length === 0) {
    errors.push(`[Rule 19b: Missing Enumerated Endnotes] Module must include <details id="data-sources-endnotes"> with <li id="endnote-1">`);
  } else {
    for (let idx = 0; idx < allEndnoteIds.length; idx++) {
      if (allEndnoteIds[idx] !== idx + 1) {
        errors.push(`[Rule 19b: Non-Contiguous Endnote List] <ol class="endnote-list"> IDs must be strictly 1..K in order; found [${allEndnoteIds.join(', ')}].`);
        break;
      }
    }
  }
  const visibleProseText = stripTags(visibleNoDetails) + ' ' + stripTags(scenarioText);
  const BANNED_VISIBLE_JARGON_METAPHOR = /\b(randomly assign half|cannot randomly assign|lack randomized trials|without an RCT|wait for an RCT|gold-standard RCT|firefighters? at a blaze|firefighters? at fires|hierarchy of evidence|When RCTs Are Impossible|Solves the Ethics Barrier to Public Health RCTs|Unadjusted Observational Correlation|Quasi-Experimental Instrumental Variables|Simultaneous OLS Association|Cross-Method Replication|How the Design Handles Endogeneity|Endogenous|Heteroskedastic)\b/gi;
  const visJargonMatches = visibleProseText.match(BANNED_VISIBLE_JARGON_METAPHOR);
  if (visJargonMatches) {
    errors.push(`[Rule 19c: Visible Jargon/Metaphor/RCT Straw-Man (${visJargonMatches.length})] ${[...new Set(visJargonMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }
  const fullMainText = stripTags(mainHtml);
  const GARBLED_TOKENS = /(\buneven spread-based\b|\bmath life\b|\bgroup 1,204\b|`)/gi;
  const garbledMatches = fullMainText.match(GARBLED_TOKENS);
  if (garbledMatches) {
    errors.push(`[Rule 19d: Garbled Regex Artifact or Raw Backtick (${garbledMatches.length})] ${[...new Set(garbledMatches)].join(', ')}`);
  }
  const endnoteLis = [...mainHtml.matchAll(/<li id="endnote-\d+">([\s\S]*?)<\/li>/gi)].map(m => stripTags(m[1]));
  for (const liText of endnoteLis) {
    if (/(Lewbel, A\. \(2012\)|Rambachan, A\., & Roth, J\. \(2023\)|Oster, E\. \(2019\)|Sanders et al\., 2016)/i.test(liText) && /(-9\.16|M\*\s*=\s*0\.35|1\.35x|2\.89|40\.04\s*QALYs|200\.20\s*QALYs)/i.test(liText)) {
      if (!/\b(CAPHE|Methodological reference:|re-estimated on the California)\b/i.test(liText)) {
        errors.push(`[Rule 19e: Endnote Conflates Methods Paper with CAPHE Empirical Estimate] "${liText}"`);
      }
    }
  }

  // Rule 20: Direct Declarative H1, Zero Inanimate-Agent Anthropomorphism & 4-Tier Econometric Identification Fence
  const r20H1Match = mainHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const r20SubMatch = mainHtml.match(/<h1[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
  const r20H1Text = r20H1Match ? stripTags(r20H1Match[1]).trim() : '';
  const r20SubText = r20SubMatch ? stripTags(r20SubMatch[1]).trim() : '';
  const r20AnsText = ansText;

  // 20a. Zero Inanimate-Agent Anthropomorphic Verbs across ALL visible surfaces outside <details>
  // (H1, Subtitle, Answer Block, Ruler Cards, Table 1 headers/cells/captions, Table 2 headers/cells/captions, Related Module links)
  const ANTHRO_VERBS = /\b(hides?|masks?|conceals?|buries|bury|disguises?|obscures?|blinds?|erases?|ignores?|overlooks?|overlooking|miss(?:es|ing)?|punishes?|penalizes?|starves?|locks out|skews?|chasing|treats?\b[^.?!]{1,60}\bas if)\b/gi;
  const anthroMatches = visibleProseText.match(ANTHRO_VERBS);
  if (anthroMatches) {
    errors.push(`[Rule 20a: Inanimate-Agent Anthropomorphic Verb in Visible Surface (${anthroMatches.length})] ${[...new Set(anthroMatches.map(w => w.toLowerCase()))].join(', ')}`);
  }

  // 20b. Direct Declarative, Stat-Free H1 & Plain-English, Stat-Free Subtitle
  if (/\bMode\s+[AB]\b/i.test(visibleProseText)) {
    errors.push(`[Rule 5b: Internal Mode A/B Jargon in Visible Copy] "Mode A" / "Mode B" must only appear inside <details> provenance notes, never in visible reader surfaces.`);
  }
  if (/^(Why|How|When|What|Case Study:|California Case Study:)\b/i.test(r20H1Text) || /\?$/.test(r20H1Text)) {
    errors.push(`[Rule 20b: Non-Declarative H1 Starter] H1 must be a direct declarative statement, not start with Why/How/When/What/Case Study or end with ?: "${r20H1Text}"`);
  }
  const firstWordMatch = r20H1Text.match(/^([A-Za-z]+)/);
  if (firstWordMatch && /ing$/i.test(firstWordMatch[1])) {
    errors.push(`[Rule 20b: Leading Gerund (-ing) in H1] H1 must open with a noun phrase + finite verb, not an -ing gerund ("${firstWordMatch[1]}"): "${r20H1Text}"`);
  }
  if (/[\d$%]/.test(r20H1Text)) {
    errors.push(`[Rule 20b: Numbers/Stats in H1] H1 must state the insight in plain words with zero digits, percentages, or dollar figures: "${r20H1Text}"`);
  }
  if (/[\d$%]/.test(r20SubText)) {
    errors.push(`[Rule 20b: Numbers/Stats in Subtitle] Subtitle must explain what is compared in plain English with zero digits, percentages, or dollar figures: "${r20SubText}"`);
  }
  if (/^(California Case|Medicaid Case)\b/i.test(r20SubText)) {
    errors.push(`[Rule 20b: Redundant "California Case:" Prefix in Subtitle] Remove "California Case:" prefix from subtitle: "${r20SubText}"`);
  }

  // 20c. Complete 24-Slug 4-Tier Econometric Identification Manifest
  const IDENTIFICATION_TIER_MANIFEST = {
    // Tier 1: Quasi-Experimental / Causal Point Estimate (may use causal verbs only with instrument/design named)
    'observational-to-experimental': 'tier1_causal',
    'reverse-causation-feedback': 'tier1_causal',
    'regression-tables-confounding': 'tier1_causal',
    'confounding-assessment-checklist': 'tier1_causal',
    'parallel-trends-power': 'tier1_causal',
    // Tier 2: Longitudinal / Administrative Decomposition (descriptive/decomposition verbs; Mode A simulation rows must be fenced)
    'before-after-trap': 'tier2_decomposition',
    'selection-into-treatment': 'tier2_decomposition',
    'threat-regression-to-mean': 'tier2_decomposition',
    'threat-history-solutions': 'tier2_decomposition',
    'threat-maturation-solutions': 'tier2_decomposition',
    'medicaid-expansion': 'tier2_decomposition',
    'threat-history-maturation': 'tier2_decomposition',
    'identical-data-opposite-policies': 'tier2_decomposition',
    'threat-confounding-selection': 'tier2_decomposition',
    'threat-measurement-instrumentation': 'tier2_decomposition',
    'study-design-ladder': 'tier2_decomposition',
    'p-hacking-multiple-testing': 'tier2_decomposition',
    'measurement-error-claims': 'tier2_decomposition',
    'collider-bias': 'tier2_decomposition',
    'classifying-causal-mechanisms': 'tier2_decomposition',
    // Tier 3: Cross-Sectional Accounting / Partial-R2 Decomposition (strictly ban causal verbs across all visible surfaces)
    'food-affordability-tradeoffs': 'tier3_cross_sectional',
    'geographic-variables': 'tier3_cross_sectional',
    'food-insecurity-diabetes': 'tier3_cross_sectional',
    // Tier 4: Modeled Fiscal / CEA Counterfactual Simulation (must include explicit "modeled"/"projected"/"simulated" fence in H1/Subtitle AND Answer Block)
    'chw-health-outcomes': 'tier4_modeled_fiscal',
    'budget-impact': 'tier4_modeled_fiscal',
    'comparator-choice': 'tier4_modeled_fiscal',
    'measuring-health-common-unit': 'tier4_modeled_fiscal',
    'cost-effectiveness-ratio': 'tier4_modeled_fiscal',
    'comparing-two-programs': 'tier4_modeled_fiscal',
    'sensitivity-analysis-cea': 'tier4_modeled_fiscal'
  };

  const slugTier = IDENTIFICATION_TIER_MANIFEST[slug];
  if (!slugTier) {
    errors.push(`[Rule 20c: Unclassified Module Slug] Slug "${slug}" is missing from IDENTIFICATION_TIER_MANIFEST.`);
  } else {
    if (slugTier === 'tier3_cross_sectional') {
      const tier3CausalMatch = visibleProseText.match(/\b(drives|drive|driven by|causes|caused by|reduces|cuts|lowers|prevents|averts)\b/i);
      if (tier3CausalMatch) {
        errors.push(`[Rule 20c: Tier 3 Cross-Sectional Causal Overclaim] Cross-sectional module "${slug}" may not use causal verb "${tier3CausalMatch[0]}" in visible text outside <details>.`);
      }
    }
    if (slugTier === 'tier4_modeled_fiscal' || (bp.mode === 'Mode A' && slugTier !== 'tier3_cross_sectional')) {
      if (!/\b(modeled|modeling|model|models|projected|projection|simulated|simulation|calibrated|calibration|sensitivity bounds|comparison groups|per-visit medi-cal rates)\b/i.test(r20H1Text)) {
        errors.push(`[Rule 20c: Unfenced Mode A Headline] Mode A module "${slug}" must qualify modeled outcomes in H1 ("Projected", "Modeled", "Models", "Sensitivity Bounds") or state an observed statutory baseline: "${r20H1Text}"`);
      }
    }
    if (slugTier === 'tier4_modeled_fiscal' || bp.mode === 'Mode A') {
      if (!/\b(modeled|modeling|model|models|projected|projection|simulated|simulation|calibrated|calibration)\b/i.test(`${r20SubText} ${r20AnsText}`)) {
        errors.push(`[Rule 20c: Unfenced Mode A Subtitle/Answer] Mode A module "${slug}" must explicitly fence modeled projections in Subtitle and Answer Block.`);
      }
    }
    if (slugTier === 'tier4_modeled_fiscal') {
      if (!/\b(modeled|projected|simulated)\b/i.test(r20AnsText)) {
        errors.push(`[Rule 20c: Tier 4 Unfenced Modeled Claim in Answer Block] Modeled fiscal/CEA module "${slug}" must explicitly include "modeled", "projected", or "simulated" inside the Executive Answer Block.`);
      }
    }
  }

  // Rule 21: Cardinality & Scenario Comparison Gate (Side-by-Side Cards vs. Dropdown + Collapsible Math Boundary)
  if (/id="scenarioSelect"/i.test(mainHtml)) {
    errors.push(`[Rule 21a: Forbidden Single-Select Scenario Dropdown] Low-cardinality scenario comparisons (N = 2-4) must render side by side (.scenario-grid / .scenario-card), not behind a <select id="scenarioSelect"> dropdown.`);
  }
  const scenarioGridMatch = mainHtml.match(/<div class="scenario-grid[\s\S]*?<\/details>\s*<\/div>/i) || mainHtml.match(/<div class="scenario-grid[\s\S]*?<\/div>\s*<\/div>/i);
  if (/class="scenario-grid/i.test(mainHtml)) {
    const scenarioDescs = [...mainHtml.matchAll(/<p class="scenario-desc[^>]*>([\s\S]*?)<\/p>/gi)].map(m => stripTags(m[1]));
    if (scenarioDescs.length < 2 || scenarioDescs.length > 4) {
      errors.push(`[Rule 21a: Scenario Card Count] Expected 2 to 4 side-by-side .scenario-card items, found ${scenarioDescs.length}.`);
    }
    scenarioDescs.forEach((sDesc, idx) => {
      const sWords = sDesc.split(/\s+/).filter(Boolean).length;
      if (sWords > 30) {
        errors.push(`[Rule 21b: Scenario Card ${idx + 1} Too Long] ${sWords} words (max 30; move secondary denominators and arithmetic chains to <details>): "${sDesc}"`);
      }
      if (DANGLING_END.test(sDesc.trim()) || /\/$/.test(sDesc.trim())) {
        errors.push(`[Rule 21b: Clipped Scenario Card ${idx + 1} Description] "${sDesc}"`);
      }
      if (/\([^)]*(?:unscaled|ACS-weighted|ACS denominator|top-down|amortization)[^)]*\)/i.test(sDesc)) {
        errors.push(`[Rule 21b: Secondary Scale/Denominator Leaked Into Visible Scenario Card ${idx + 1}] Move secondary denominators and amortization notes into the collapsible <details> footer: "${sDesc}"`);
      }
    });
    if (!scenarioGridMatch || !/<details[\s\S]*?<\/details>/i.test(scenarioGridMatch[0])) {
      errors.push(`[Rule 21c: Missing Collapsible Scenario Math Note] Every .scenario-grid must include a collapsible <details> footer documenting scenario math, scale crosswalks, or parameter specifications.`);
    }
  }

  // Rule 22: Standalone Section & Semantic-Naming Gate (Zero Bare Coordinates Outside Table 1 <thead> & <details>)
  const visibleNoTheadNoDetails = visibleNoDetails.replace(/<thead[\s\S]*?<\/thead>/gi, ' ');
  const visibleProseNoThead = stripTags(visibleNoTheadNoDetails);
  const BARE_COORDINATES = /\b(Steps?\s+\d+(?:[–-]\d+)?|Groups?\s+[1-9](?:[–-]\d+)?|Buckets?\s+[A-H](?:[–-][A-H])?|Columns?\s+\d+(?:[–-]\d+)?|Q[1-5]\b|Tract\s+\d+(?:\.\d+)?)\b/gi;
  const coordMatches = visibleProseNoThead.match(BARE_COORDINATES);
  if (coordMatches) {
    errors.push(`[Rule 22: Bare Coordinate Shorthand in Visible Prose (${coordMatches.length})] Replace positional coordinates with substantive names in visible copy and move coordinates to <details>: ${[...new Set(coordMatches)].join(', ')}`);
  }

  // Rule 23: Sparse-Number Contrast Answer Block & Zero Accounting-Footnote Clutter in Prose / FAQs
  if (/(survey-weighted,\s*rounded to|summed across (?:rounded )?groups|or\s+[\d,]+\s+unrounded)/i.test(visibleProseNoThead)) {
    errors.push(`[Rule 23a: Accounting Reconciliation Clutter in Visible Prose] Move survey-weight rounding twins and summed-group reconciliations out of visible prose into Table 1 and <details id="data-sources-endnotes">.`);
  }
  const faqMatches = [...mainHtml.matchAll(/<details class="faq-item[\s\S]*?<\/details>/gi)].map(m => stripTags(m[0])).join(' ');
  const faqCoordMatches = faqMatches.match(/\b(Steps?\s+\d+(?:[–-]\d+)?|Buckets?\s+[A-H](?:[–-][A-H])?)\b/gi);
  if (faqCoordMatches) {
    errors.push(`[Rule 23b: Bare Step/Bucket Coordinate in FAQ Answer] Use plain-English stage and subpopulation names in FAQs: ${[...new Set(faqCoordMatches)].join(', ')}`);
  }

  // Rule 24: Insight-First, Jargon-Free Headlines & Table Subtitles
  const h1WordCount = r20H1Text.split(/\s+/).filter(Boolean).length;
  if (h1WordCount > 16) {
    errors.push(`[Rule 24a: H1 Too Long] ${h1WordCount} words (max 16): "${r20H1Text}"`);
  }
  const BANNED_HEADLINE_JARGON = /\b(co-occur(?:s|ring)? with|outside-factor|regression parameters?|area-median|confounding parameters?)\b/i;
  if (BANNED_HEADLINE_JARGON.test(r20H1Text)) {
    errors.push(`[Rule 24a: Clunky Jargon in H1] State the clear takeaway in plain English without "co-occur with", "outside-factor", "regression parameters", or "area-median": "${r20H1Text}"`);
  }
  const tableHeaderBlocks = [...mainHtml.matchAll(/<!-- BLOCK [34]:[^>]*-->\s*<div class="mb-3">\s*<h2[^>]*>([\s\S]*?)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi)];
  tableHeaderBlocks.forEach((m, idx) => {
    const tTitle = stripTags(m[1]);
    const tSub = stripTags(m[2]);
    const tTitleWords = tTitle.split(/\s+/).filter(Boolean).length;
    const tSubWords = tSub.split(/\s+/).filter(Boolean).length;
    if (tTitleWords > 15) {
      errors.push(`[Rule 24a: Table ${idx + 1} Title Too Long] ${tTitleWords} words (max 15): "${tTitle}"`);
    }
    if (BANNED_HEADLINE_JARGON.test(tTitle)) {
      errors.push(`[Rule 24a: Clunky Jargon in Table ${idx + 1} Title] Remove technical jargon from table title: "${tTitle}"`);
    }
    if (tSubWords > 22) {
      errors.push(`[Rule 24b: Table ${idx + 1} Subtitle Too Long] ${tSubWords} words (max 22; move sample sizes and variable definitions to Table Notes): "${tSub}"`);
    }
    if (/\b(N\s*=\s*\d+|B\d{5}|regression parameters?)\b/i.test(tSub)) {
      errors.push(`[Rule 24b: Technical Sample/Variable Code in Table ${idx + 1} Subtitle] Move N=... sample sizes, Census codes, and regression parameter notes into <details> Table Notes: "${tSub}"`);
    }
  });

  // Rule 25: Conceptual Archetype Column Headers & Footnote-Only Place/Sample IDs
  const allTheadHtml = [...mainHtml.matchAll(/<thead[\s\S]*?<\/thead>/gi)].map(m => m[0]).join(' ');
  const allTheadText = stripTags(allTheadHtml);
  if (/\b(SJC|B\d{5}|N\s*=\s*\d+)\b/i.test(allTheadText)) {
    errors.push(`[Rule 25a: Technical Abbreviation or Sample Size in <thead>] Move SJC, Census table codes, and N=... out of <thead> into <details> Table Notes.`);
  }
  const GEO_ARCHETYPE_SLUGS = new Set(['food-insecurity-diabetes', 'food-affordability-tradeoffs', 'geographic-variables', 'identical-data-opposite-policies']);
  if (GEO_ARCHETYPE_SLUGS.has(slug) && tables.length >= 1) {
    const t1ColThs = [...tables[0].matchAll(/<th[^>]*scope="col"[^>]*>([\s\S]*?)<\/th>/gi)].slice(1).map(m => stripTags(m[1]));
    for (const cTh of t1ColThs) {
      if (/^(Marin|Fresno|Santa Clara|Nevada|Alameda|Imperial|Los Angeles|San Francisco|Tract\s+\d+)/i.test(cTh)) {
        errors.push(`[Rule 25b: Raw Place/Tract Name in Geographic Column Header] Lead with the Conceptual Archetype in <thead> and move specific county/place/tract IDs to Table 1 Notes: "${cTh}"`);
      }
    }
  }

  // Rule 26: Unit-Once Row Labels, %-First Burden Cells & Parallel Row Granularity
  if (tables.length >= 1) {
    const t1RowThs = [...tables[0].matchAll(/<th[^>]*scope="row"[^>]*>([\s\S]*?)<\/th>/gi)].map(m => stripTags(m[1]));
    for (const rTh of t1RowThs) {
      if (/\bgross rent\b/i.test(rTh)) {
        errors.push(`[Rule 26a: Technical "Gross Rent" in Table 1 Row Label] Use plain-English "Share of Income Spent on Monthly Rent" instead: "${rTh}"`);
      }
      if (/\boutside-factor\b/i.test(rTh)) {
        errors.push(`[Rule 26a: Clunky "Outside-Factor" in Table 1 Row Label] Replace with plain-English conceptual label: "${rTh}"`);
      }
    }
    const t1Tds = [...tables[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripTags(m[1]));
    for (const td of t1Tds) {
      if (/(\/\s*mo\b|\/\s*mo\s+remaining\b|\bof\s+B\d{5}\b)/i.test(td)) {
        errors.push(`[Rule 26b: Repeated Unit or Census Code in Table 1 Cell] Put "Monthly" or "Left After Rent and Food" once in the row header and remove "/ mo", "/ mo remaining", or "of B19013" from cells: "${td}"`);
      }
    }
  }
  if (/\boutside-factor\b/i.test(fullMainText)) {
    errors.push(`[Rule 26c: Banned "Outside-Factor" Jargon] Replace "Outside-Factor" with plain English across all surfaces.`);
  }

  // Rule 26d: Zero Statistical Test Diagnostics in Visible Tables (Table 1 & Table 2), Ruler Cards, Scenario Cards, and Table Subtitles
  const VISIBLE_STAT_DIAGNOSTICS = /(\b(?:SE|standard\s+error\w*|confidence\s+interval\w*|t-stat\w*|p-value\w*|z-score\w*|F-stat\w*|Hansen\s*J|Breusch-Pagan|Partial\s+R²|R²|R\^2|R-squared|VIF|95%\s*CI|statistically\s+sig\w*|statistical\s+correlation|Poisson|\bSD\b|\bAUC\b|\bFDR\b|\bBonferroni\b)\b|\b\d+(?:\.\d+)?%\s+ranking\s+score\b|\b0\.\d{3}\s+to\s+0\.\d{3}\s+range\b|\b(?:SE|t|p|F|z|r|OR|VIF|AUC)\s*(?:=|<|>|≤|≥|&lt;|&gt;)\s*[-+]?(?:\d|10)|\*{2,3}|β|\bSaved\s+Saved\b)/i;
  tables.forEach((tblHtml, tIdx) => {
    const tblCellsAndHeaders = [...tblHtml.matchAll(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi)].map(m => stripTags(m[1]));
    for (const cellText of tblCellsAndHeaders) {
      const statMatch = cellText.match(VISIBLE_STAT_DIAGNOSTICS);
      if (statMatch) {
        errors.push(`[Rule 26d: Statistical Test Diagnostic in Visible Table ${tIdx + 1} ("${statMatch[0]}")] Move SE, t, p, F, Hansen J, R², VIF, OR, AUC, 95% CI, β, and *** out of visible table rows/cells into collapsible <details> Table Notes and the TETS companion article: "${cellText}"`);
      }
    }
  });
  for (const rText of rulerDescs) {
    const rStatMatch = rText.match(VISIBLE_STAT_DIAGNOSTICS);
    if (rStatMatch) {
      errors.push(`[Rule 26d: Statistical Test Diagnostic in Visible Ruler Description ("${rStatMatch[0]}")] Move SE, t, p, F, R², AUC, and 95% CI out of visible ruler copy into collapsible <details> Table Notes: "${rText}"`);
    }
  }
  const rulerSections = [...visibleNoDetails.matchAll(/<section[^>]*aria-label="[^"]*"[\s\S]*?<\/section>/gi)].map(m => stripTags(m[0]));
  for (const rSecText of rulerSections) {
    const rbStatMatch = rSecText.match(VISIBLE_STAT_DIAGNOSTICS);
    if (rbStatMatch) {
      errors.push(`[Rule 26d: Statistical Test Diagnostic in Visible Section ("${rbStatMatch[0]}")] Move statistical test tokens out of visible section into <details> Table Notes.`);
    }
  }
  const scenarioCardsHtml = [...visibleNoDetails.matchAll(/<div class="scenario-card[\s\S]*?<\/div>\s*<\/div>/gi)].map(m => stripTags(m[0]));
  const scenarioDescsAll = [...visibleNoDetails.matchAll(/<p class="scenario-desc[^>]*>([\s\S]*?)<\/p>/gi)].map(m => stripTags(m[1]));
  const scenarioMetricsAll = [...visibleNoDetails.matchAll(/<div class="font-mono[^>]*>([\s\S]*?)<\/div>/gi)].map(m => stripTags(m[1]));
  for (const scText of [...scenarioCardsHtml, ...scenarioDescsAll, ...scenarioMetricsAll]) {
    const scStatMatch = scText.match(VISIBLE_STAT_DIAGNOSTICS);
    if (scStatMatch) {
      errors.push(`[Rule 26d: Statistical Test Diagnostic in Visible Scenario Card ("${scStatMatch[0]}")] Move OR, p, SE, t, F, R², AUC, and 95% CI out of visible scenario cards into the collapsible scenario <details> notes: "${scText}"`);
    }
  }
  tableHeaderBlocks.forEach((m, idx) => {
    const tSub = stripTags(m[2]);
    const subStatMatch = tSub.match(VISIBLE_STAT_DIAGNOSTICS);
    if (subStatMatch) {
      errors.push(`[Rule 26d: Statistical Test Diagnostic in Visible Table ${idx + 1} Subtitle ("${subStatMatch[0]}")] Move statistical test tokens out of visible table subtitle into <details> Table Notes: "${tSub}"`);
    }
  });

  // Rule 26e: Table 1 Operational Row Depth Floor (>= 4 tbody rows)
  if (tables.length >= 1) {
    const t1BodyMatch = tables[0].match(/<tbody[\s\S]*?<\/tbody>/i);
    const t1Rows = t1BodyMatch ? [...t1BodyMatch[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)] : [];
    if (t1Rows.length < 4) {
      errors.push(`[Rule 26e: Table 1 Has Fewer Than 4 Operational Rows (${t1Rows.length})] Replace removed statistical rows with plain-English operational rows (Plausible Range in Natural Units, What This Comparison Accounts For, Budget/Operational Consequence).`);
    }
  }

  // Rule 26f: Collapsible <details> Table Notes Audit Completeness
  const r26fDetailsText = [...mainHtml.matchAll(/<details[\s\S]*?<\/details>/gi)].map(m => stripTags(m[0])).join(' ');
  if (r26fDetailsText.length < 150) {
    errors.push(`[Rule 26f: Collapsible <details> Notes Too Short] Collapsible <details> drawers must house the displaced technical audit trail (sample sizes, estimator names, and confidence bounds).`);
  }

  // Rule 27: Table vs. Prose Decision Gate ("No Essays in Tables")
  const FLAGSHIP_SLUGS = new Set(['chw-health-outcomes', 'medicaid-expansion', 'food-insecurity-diabetes']);
  const t2BodyWordLimit = FLAGSHIP_SLUGS.has(slug) ? 16 : 22;
  if (tables.length >= 2) {
    const t2RawTds = [...tables[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => m[1]);
    for (const rawTd of t2RawTds) {
      const withoutStrong = rawTd.replace(/<strong[\s\S]*?<\/strong>/gi, ' ');
      const bodyText = stripTags(withoutStrong).trim();
      const bodyWords = bodyText.split(/\s+/).filter(Boolean).length;
      if (bodyWords > t2BodyWordLimit) {
        errors.push(`[Rule 27: Table 2 Essay Cell Exceeds Scannable Limit] ${bodyWords} body words (max ${t2BodyWordLimit}; move multi-clause prose to Table 2 Notes): "${bodyText}"`);
      }
    }
  }

  // Rule 28: Action-Oriented Section 3 (No Passive "Diagnostic Lens" Framing)
  if (/\b(Diagnostic\s+Lens(?:es)?|Lens\s+[1-4])\b/i.test(fullMainText)) {
    errors.push(`[Rule 28: Passive "Diagnostic Lens" Framing in Section 3] Replace passive "Lens 1..3" / "Diagnostic Lenses" with concrete operational actions or scenarios specifying the decision level (Household/Clinic, Tract/Neighborhood, or County System).`);
  }

  // Rule 29: Audience-Native Operational Problem Hook, Zero Straw-Man Drama & Zero Imperative Scolding in Sentence 1
  const STRAW_MAN_DRAMA = /(\b(?:often|routinely|frequently|commonly|typically|regularly|habitually)\s+(?:stall\w*|delay\w*|cut\w*|defend\w*|argue\w*|disagree\w*|misread\w*|misallocate\w*|assume\w*|proceed\w*|rely|relies|treat\w*|conflate\w*)\b|\bstall\w*\s+in\s+(?:budget|finance|legislative|committee)|\bbudget\s+committees?\s+often\s+stall|\bface\s+pressure\s+to\s+(?:cut|trim|defund|reduce)|\bfiscal\s+pressure\s+mounts|\bstakeholders\s+(?:disagree|argue|clash|debate)|\bbudgets\s+are\s+(?:often\s+)?(?:defended|cut)\s+based\s+on|\btakes\s+three\s+seconds|\bcontrolling\s+for\s+everything\s+in\s+the\s+database|\blooks\s+like\s+responsible\s+data\s+cleaning|\bnot\s+merely\s+a\s+textbook|\bas\s+if\s+the\s+[^.?!]{1,40}\s+assumption\s+is\s+settled|\bassumes\s+the\s+funding\s+decision\s+is\s+settled)/gi;
  const strawMatches = fullMainText.match(STRAW_MAN_DRAMA);
  if (strawMatches) {
    errors.push(`[Rule 29a: Straw-Man Committee/Analyst Drama in Copy (${strawMatches.length})] Replace unverified sociological generalizations with a concrete operational workflow/cutoff/dashboard hook: ${[...new Set(strawMatches)].join(' | ')}`);
  }
  const ansSentence1 = r20AnsText.split(/(?<=[.?!])\s+/)[0] || '';
  const SCOLDING_MODALS_S1 = /\b(must|need to|needs to|cannot|should not|have to)\b/i;
  if (SCOLDING_MODALS_S1.test(ansSentence1)) {
    errors.push(`[Rule 29b: Prescriptive Scolding ("must / need to / cannot") in Answer Block Sentence 1] Open Sentence 1 with one of the 6 Practitioner-First Operational Decision-Hook templates (naming the routine workflow/cutoff/metric on the reader's desk and its concrete operational consequence) rather than scolding the reader: "${ansSentence1}"`);
  }

  // Rule 30: Flesch-Kincaid Reading Level Gate (Non-Collapsed <= 6.50 FKGL, Collapsed <details> <= 8.00 FKGL) & Regex/Citation/Protected-Term Integrity
  const visFkRes = computeFkgl(htmlToBlockText(visibleNoDetails));
  const detFkRes = computeFkgl(htmlToBlockText(allDetailsHtml));
  if (visFkRes.fkgl > 6.50) {
    errors.push(`[Rule 30a: Non-Collapsed Reading Level Exceeds Grade 6.5] Flesch-Kincaid Grade Level is ${visFkRes.fkgl.toFixed(2)} (ASL=${visFkRes.asl}, ASW=${visFkRes.asw}; max 6.50).`);
  }
  if (detFkRes.fkgl > 8.00) {
    errors.push(`[Rule 30b: Collapsed <details> Reading Level Exceeds Grade 8.0] Flesch-Kincaid Grade Level is ${detFkRes.fkgl.toFixed(2)} (ASL=${detFkRes.asl}, ASW=${detFkRes.asw}; max 8.00).`);
  }
  const REGEX_ARTIFACTS = /(\b(?:person low-income|Person Hardship|person income|home low-income|Base County Low-Income|Working Local|Rural Local|Local Health Workers?|Model to the mean|video-qualifying|video flexibilities|running costs?\s+runs|group and language groups|list lists|check check|Model Models?|Uniform Rules Rules|Projected Base Base|Need Insurance|Need Care|Lancet Main Care|Federal Medicare|State Health Agency|US Census Survey|State Health Survey|Federal Low-Income|US Bureau of Economic Research|Doctor List|lost qualifying|by law exempt|an\s+(?:split|uneven|upfront|Mean|tool|study|raw|Joint|Multi-Year|waiver))\b|\b\d+(?:\.\d+)?(?:st|nd|rd|th)\s+rank\b)/gi;
  const regexArtMatches = fullMainText.match(REGEX_ARTIFACTS);
  if (regexArtMatches) {
    errors.push(`[Rule 30c: Regex/Citation/Protected-Term Corruption (${regexArtMatches.length})] Found mechanical word-swap artifact(s): ${[...new Set(regexArtMatches)].join(' | ')}`);
  }

  // Rule 30d: FAQPage JSON-LD vs. Visible FAQ Parity
  const ldMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of ldMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed && parsed['@type'] === 'FAQPage' && Array.isArray(parsed.mainEntity)) {
        const visibleFaqItems = [...mainHtml.matchAll(/<div class="border-b border-slate-100 pb-3 last:border-0 last:pb-0">\s*<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>\s*<\/div>/gi)];
        if (visibleFaqItems.length === parsed.mainEntity.length) {
          for (let i = 0; i < visibleFaqItems.length; i++) {
            const visQ = stripTags(visibleFaqItems[i][1]).trim();
            const visA = stripTags(visibleFaqItems[i][2]).trim();
            const ldQ = stripTags(parsed.mainEntity[i].name || '').trim();
            const ldA = stripTags((parsed.mainEntity[i].acceptedAnswer && parsed.mainEntity[i].acceptedAnswer.text) || '').trim();
            if (visQ !== ldQ || visA !== ldA) {
              errors.push(`[Rule 30d: FAQPage JSON-LD Desync on Q${i + 1}] JSON-LD FAQ text does not match visible <dl> FAQ text.`);
            }
          }
        }
      }
    } catch (_) {
      // Handled by JSON-LD syntax validator
    }
  }

  // Rule 31: Case Studies Branding, Non-Enumeration & Open Public Access Gate
  if (/\b(Methods\s+Lab|Decision\s+Labs?|CAPHE\s+Lab|Related\s+Methods\s+Lab|Browse\s+all\s+\d+)\b/i.test(html)) {
    errors.push(`[Rule 31a: Legacy "Methods Lab / Decision Lab / CAPHE Lab" or Enumerated Browse Link] Use "Case Studies" / "CAPHE Case Studies" and non-enumerated navigation links.`);
  }
  if (/\bTrack\s+[1-4]\b/i.test(visibleNoDetails)) {
    errors.push(`[Rule 31b: Visible Track Enumeration ("Track 1..4")] Use the unnumbered decision theme name in visible copy instead of "Track 1..4".`);
  }
  errors._fkgl = { vis: visFkRes.fkgl, det: detFkRes.fkgl };

  return errors;
}

function main() {
  const bpMap = loadBlueprint();
  const requestedSlugs = process.argv.slice(2);
  const slugs = requestedSlugs.length > 0 ? requestedSlugs : [...bpMap.keys()];

  let totalErrors = 0;
  let failingModules = 0;
  const table1Fingerprints = new Map();

  for (const slug of slugs) {
    const errs = auditModule(slug, bpMap);
    // Rule 7: Dataset Diversity Cap (no two modules may share identical Table 1 quantitative cell fingerprints)
    const filePath = path.join(LAB_DIR, slug, 'index.html');
    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf8');
      const firstTable = html.match(/<table[\s\S]*?<\/table>/i);
      if (firstTable) {
        const tdText = [...firstTable[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripTags(m[1])).join('|');
        if (tdText.length > 0) {
          if (table1Fingerprints.has(tdText)) {
            errs.push(`[Rule 7: Duplicate Table 1 Data] Identical Table 1 quantitative cells as module "${table1Fingerprints.get(tdText)}"`);
          } else {
            table1Fingerprints.set(tdText, slug);
          }
        }
      }
    }

    const bp = bpMap.get(slug);
    const fkTag = errs._fkgl ? ` [Vis FK=${errs._fkgl.vis.toFixed(2)} <= 6.5 | Det FK=${errs._fkgl.det.toFixed(2)} <= 8.0]` : '';
    const prefix = bp ? `#${String(bp.num).padStart(2, '0')} [${slug}] (${bp.mode})${fkTag}` : `[${slug}]${fkTag}`;
    if (errs.length === 0) {
      console.log(`PASS ${prefix}`);
    } else {
      failingModules++;
      totalErrors += errs.length;
      console.log(`BLOCK ${prefix}:`);
      for (const e of errs) {
        console.log(`  - ${e}`);
      }
    }
  }

  console.log(`\nSummary: ${slugs.length - failingModules}/${slugs.length} modules passed (${totalErrors} total rule violations).`);
  if (requestedSlugs.length === 0) {
    const { verifyAllCaseStudiesAndFigures } = require('./verify_case_study_figures');
    const figErrs = verifyAllCaseStudiesAndFigures();
    if (figErrs.length > 0) {
      totalErrors += figErrs.length;
      console.log(`BLOCK [Rule 32: Code-to-Figure & Source-Data Linkage]:`);
      for (const fe of figErrs) console.log(`  - ${fe}`);
    } else {
      console.log(`PASS [Rule 32: Code-to-Figure & Source-Data Linkage] All 24 case studies + Hub Page verified against code-generated outputs.`);
    }
  }
  if (totalErrors > 0) {
    process.exit(1);
  }
}

main();
