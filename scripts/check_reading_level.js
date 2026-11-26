#!/usr/bin/env node
/**
 * CAPHE Case Studies — Grade 7-8 Readability & Sentence-Flow Verifier
 *
 * Computes deterministic Flesch-Kincaid Grade Level across:
 *   1. Visible Narrative Prose (.subtitle + .policy-setting + .answer-block + .synthesis)
 *   2. Full-Page Reader Prose (Visible Narrative + Scenario Cards + Table 2 Cells + FAQ Answers)
 *   3. Main Case Studies Directory Hub (public/case-studies/index.html)
 *
 * Enforces:
 *   - Full-Page Prose FK <= 8.5 on all 24 case studies and hub (Target Grade 7-8)
 *   - Visible Narrative FK <= 8.8 on all 24 case studies (Target Grade 7-8)
 *   - Narrative mean sentence length >= 10.0 words/sentence (prevents choppy fragments)
 */

const fs = require('fs');
const path = require('path');

const LAB_DIR = path.join(__dirname, '..', 'public', 'case-studies');

function unescapeHtml(str) {
  return String(str || '')
    .replace(/&ndash;|&mdash;/gi, '-')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&times;/gi, 'x')
    .replace(/&rarr;|&larr;/gi, 'to')
    .replace(/&le;/gi, '<=')
    .replace(/&ge;/gi, '>=')
    .replace(/&plusmn;/gi, '+/-')
    .replace(/&middot;|&bull;/gi, '.')
    .replace(/&sect;/gi, 'sec');
}

function countSyllablesWord(word) {
  let w = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
  if (!w || w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  w = w.replace(/^y/, '');
  const groups = w.match(/[aeiouy]{1,2}/g);
  return groups ? Math.max(1, groups.length) : 1;
}

function computeFk(rawText) {
  const clean = unescapeHtml(rawText)
    .replace(/\[\d+(?:[,\-\u2013]\s*\d+)*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const protectedText = clean
    .replace(/(\d)\.(\d)/g, '$1DECIMAL$2')
    .replace(/\b(vs|adj|approx|excl|incl|yr|yrs|Dr|Mr|Ms|U\.S|Cal|Unemp|Ins|Gov|Dept|et al|H\.R|St|Ave|No|Fig|Sec)\./gi, '$1DOT');
  const sents = protectedText
    .split(/[.!?]+(?:\s+|$)/)
    .map(s => s.trim())
    .filter(s => /[A-Za-z0-9]/.test(s));
  const words = clean.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g) || [];
  if (sents.length === 0 || words.length === 0) {
    return { fk: 0, asl: 0, asw: 0, words: 0, sents: 0 };
  }
  let sylls = 0;
  for (const w of words) {
    sylls += /[A-Za-z]/.test(w) ? countSyllablesWord(w) : 1;
  }
  const asl = words.length / sents.length;
  const asw = sylls / words.length;
  const fk = 0.39 * asl + 11.8 * asw - 15.59;
  return { fk, asl, asw, words: words.length, sents: sents.length };
}

function stripTags(html) {
  return unescapeHtml(String(html || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function ensurePeriod(str) {
  const s = String(str || '').trim();
  if (!s) return '';
  return /[.!?]$/.test(s) ? s : `${s}.`;
}

function analyzeCaseStudyHtml(html) {
  let h = String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, (_, inner) => (inner.includes('.') ? '.' : ''))
    .replace(/<span class="sr-only">[\s\S]*?<\/span>/gi, '.');

  const titleMatch = h.match(/<title>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch
    ? ensurePeriod(stripTags(titleMatch[1]).replace(/\s*\|\s*CAPHE\s*$/i, ''))
    : '';
  const h1Match = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? ensurePeriod(stripTags(h1Match[1])) : '';
  const subMatch = h.match(/<h1[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
  const subtitle = subMatch ? ensurePeriod(stripTags(subMatch[1])) : '';
  const policySetting = [...h.matchAll(/<p class="policy-setting\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => ensurePeriod(stripTags(m[1]))).join(' ');
  const answer = [...h.matchAll(/<p class="answer-block\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => ensurePeriod(stripTags(m[1]))).join(' ');

  let synthesis = '';
  const synMatch = h.match(/<section class="synthesis\b[^>]*>([\s\S]*?)<\/section>/i);
  if (synMatch) {
    synthesis = [...synMatch[1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => ensurePeriod(stripTags(m[1]))).join(' ');
  }

  let table2 = '';
  const t2Match = h.match(/<table[^>]*id="policyFitTable"[\s\S]*?<\/table>/i);
  if (t2Match) {
    table2 = [...t2Match[0].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)]
      .map(m => ensurePeriod(stripTags(m[1]))).join(' ');
  }

  const scenarios = [...h.matchAll(/<p class="scenario-desc\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => ensurePeriod(stripTags(m[1]))).join(' ');

  const faqs = [...h.matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/gi)]
    .map(m => ensurePeriod(stripTags(m[1]))).join(' ');

  const details = [...h.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)]
    .map(m => {
      const inner = m[1]
        .replace(/<summary[\s\S]*?<\/summary>/gi, ' ')
        .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ' ');
      return [...inner.matchAll(/<(?:p|li|dt|dd)\b[^>]*>([\s\S]*?)<\/(?:p|li|dt|dd)>/gi)]
        .map(x => ensurePeriod(stripTags(x[1])))
        .filter(s => /[A-Za-z]{3,}/.test(s))
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');

  const sectionHeadings = [];
  const sectionSubtitles = [];
  for (const m of h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>(\s*<p[^>]*>([\s\S]*?)<\/p>)?/gi)) {
    const h2Raw = stripTags(m[1]);
    if (!h2Raw || /Frequently Asked Questions|Data Sources & Methods/i.test(h2Raw)) continue;
    const h2Clean = ensurePeriod(h2Raw.replace(/^Table\s+[12]\.\s*/i, ''));
    sectionHeadings.push({ text: h2Raw, ...computeFk(h2Clean) });
    if (m[3] && !/policy-setting|answer-block/.test(m[2])) {
      const subClean = stripTags(m[3]);
      if (subClean && subClean.split(/\s+/).length <= 36) {
        sectionSubtitles.push({ text: subClean, ...computeFk(ensurePeriod(subClean)) });
      }
    }
  }

  const narrativeText = [h1, subtitle, policySetting, answer, synthesis].filter(Boolean).join(' ');
  const fullText = [narrativeText, scenarios, table2, details].filter(Boolean).join(' ');
  return {
    pageTitle: computeFk(pageTitle),
    h1: computeFk(h1),
    subtitle: computeFk(subtitle),
    sectionHeadings,
    sectionSubtitles,
    narrative: computeFk(narrativeText),
    full: computeFk(fullText),
    details: computeFk(details),
    scenarios: computeFk(scenarios),
    answer: computeFk(answer),
    table2: computeFk(table2),
    faqs: computeFk(faqs)
  };
}

function analyzeHubHtml(html) {
  const h2s = [...html.matchAll(/<h2 class="topic-title">([\s\S]*?)<\/h2>/gi)].map(m => ensurePeriod(stripTags(m[1])));
  const topicSubs = [...html.matchAll(/<p class="topic-summary">([\s\S]*?)<\/p>/gi)].map(m => ensurePeriod(stripTags(m[1])));
  const cardTitles = [...html.matchAll(/<span class="item-title">([\s\S]*?)<\/span>/gi)].map(m => ensurePeriod(stripTags(m[1])));
  const cardSubs = [...html.matchAll(/<p class="item-contrast">([\s\S]*?)<\/p>/gi)].map(m => ensurePeriod(stripTags(m[1])));
  const leads = [...html.matchAll(/<p class="page-lead">([\s\S]*?)<\/p>/gi)].map(m => ensurePeriod(stripTags(m[1])));
  const parts = [...leads, ...h2s, ...topicSubs, ...cardTitles, ...cardSubs];
  return {
    ...computeFk(parts.join(' ')),
    h2s: h2s.map(t => ({ text: t, ...computeFk(t) })),
    topicSubs: topicSubs.map(t => ({ text: t, ...computeFk(t) })),
    cardTitles: cardTitles.map(t => ({ text: t, ...computeFk(t) })),
    cardSubs: cardSubs.map(t => ({ text: t, ...computeFk(t) }))
  };
}

function checkAllReadingLevels({ maxFullFk = 8.5, maxNarrativeFk = 8.8, maxTitleFk = 8.5, minNarrativeAsl = 10.0, quiet = false } = {}) {
  const slugs = fs.readdirSync(LAB_DIR)
    .filter(d => fs.existsSync(path.join(LAB_DIR, d, 'index.html')))
    .sort();
  const errors = [];
  const results = [];

  for (const slug of slugs) {
    const html = fs.readFileSync(path.join(LAB_DIR, slug, 'index.html'), 'utf8');
    const res = analyzeCaseStudyHtml(html);
    results.push({ slug, ...res });
    if (res.pageTitle.fk > maxTitleFk) {
      errors.push(`[${slug}] <title> FK Grade ${res.pageTitle.fk.toFixed(2)} exceeds ${maxTitleFk}`);
    }
    if (res.h1.fk > maxTitleFk) {
      errors.push(`[${slug}] <h1> FK Grade ${res.h1.fk.toFixed(2)} exceeds ${maxTitleFk}`);
    }
    if (res.subtitle.fk > maxTitleFk) {
      errors.push(`[${slug}] .subtitle FK Grade ${res.subtitle.fk.toFixed(2)} exceeds ${maxTitleFk}`);
    }
    for (const sh of res.sectionHeadings) {
      if (sh.fk > maxNarrativeFk) {
        errors.push(`[${slug}] Section <h2> FK Grade ${sh.fk.toFixed(2)} exceeds ${maxNarrativeFk}: "${sh.text}"`);
      }
    }
    for (const ss of res.sectionSubtitles) {
      if (ss.fk > maxNarrativeFk) {
        errors.push(`[${slug}] Section subtitle FK Grade ${ss.fk.toFixed(2)} exceeds ${maxNarrativeFk}: "${ss.text}"`);
      }
    }
    if (res.full.fk > maxFullFk) {
      errors.push(`[${slug}] Full-page (all text incl. details) FK Grade ${res.full.fk.toFixed(2)} exceeds ${maxFullFk} (ASL=${res.full.asl.toFixed(1)}, ASW=${res.full.asw.toFixed(2)})`);
    }
    if (res.details.fk > maxNarrativeFk) {
      errors.push(`[${slug}] <details> notes FK Grade ${res.details.fk.toFixed(2)} exceeds ${maxNarrativeFk} (ASL=${res.details.asl.toFixed(1)}, ASW=${res.details.asw.toFixed(2)})`);
    }
    if (res.narrative.fk > maxNarrativeFk) {
      errors.push(`[${slug}] Visible narrative FK Grade ${res.narrative.fk.toFixed(2)} exceeds ${maxNarrativeFk} (ASL=${res.narrative.asl.toFixed(1)}, ASW=${res.narrative.asw.toFixed(2)})`);
    }
    if (res.narrative.asl < minNarrativeAsl) {
      errors.push(`[${slug}] Visible narrative ASL ${res.narrative.asl.toFixed(1)} is below ${minNarrativeAsl} words/sentence (avoid choppy fragments)`);
    }
  }

  const hubHtml = fs.readFileSync(path.join(LAB_DIR, 'index.html'), 'utf8');
  const hubRes = analyzeHubHtml(hubHtml);
  if (hubRes.fk > maxFullFk) {
    errors.push(`[hub index.html] FK Grade ${hubRes.fk.toFixed(2)} exceeds ${maxFullFk} (ASL=${hubRes.asl.toFixed(1)}, ASW=${hubRes.asw.toFixed(2)})`);
  }
  for (const item of [...hubRes.h2s, ...hubRes.topicSubs, ...hubRes.cardTitles, ...hubRes.cardSubs]) {
    if (item.fk > maxTitleFk) {
      errors.push(`[hub index.html] Heading/subtitle FK Grade ${item.fk.toFixed(2)} exceeds ${maxTitleFk}: "${item.text}"`);
    }
  }

  if (!quiet) {
    const meanFull = results.reduce((s, r) => s + r.full.fk, 0) / results.length;
    const meanNarr = results.reduce((s, r) => s + r.narrative.fk, 0) / results.length;
    const meanH1 = results.reduce((s, r) => s + r.h1.fk, 0) / results.length;
    const meanSub = results.reduce((s, r) => s + r.subtitle.fk, 0) / results.length;
    for (const r of results) {
      const ok = r.pageTitle.fk <= maxTitleFk && r.h1.fk <= maxTitleFk && r.subtitle.fk <= maxTitleFk && r.full.fk <= maxFullFk && r.details.fk <= maxNarrativeFk && r.narrative.fk <= maxNarrativeFk && r.narrative.asl >= minNarrativeAsl;
      console.log(`${ok ? 'PASS' : 'OVER'} ${r.slug.padEnd(35)} | Full=${r.full.fk.toFixed(2)} | Det=${r.details.fk.toFixed(2)} | H1=${r.h1.fk.toFixed(2)} | Sub=${r.subtitle.fk.toFixed(2)} | Narr=${r.narrative.fk.toFixed(2)}`);
    }
    console.log(`${hubRes.fk <= maxFullFk ? 'PASS' : 'OVER'} ${'hub index.html'.padEnd(35)} | Full=${hubRes.fk.toFixed(2)} | ASL=${hubRes.asl.toFixed(1)} | ASW=${hubRes.asw.toFixed(2)}`);
    console.log(`Mean across 24 case studies: Full FK = ${meanFull.toFixed(2)} | H1 FK = ${meanH1.toFixed(2)} | Subtitle FK = ${meanSub.toFixed(2)} | Narrative FK = ${meanNarr.toFixed(2)}`);
  }

  return { errors, results, hubRes };
}

if (require.main === module) {
  const filterSlug = process.argv[2];
  const { errors, results } = checkAllReadingLevels({ quiet: Boolean(filterSlug) });
  if (filterSlug) {
    for (const r of results.filter(x => x.slug.includes(filterSlug))) {
      console.log(`${r.slug}: Full=${r.full.fk.toFixed(2)} | Narr=${r.narrative.fk.toFixed(2)} (Ans=${r.answer.fk.toFixed(1)}, T2=${r.table2.fk.toFixed(1)}, FAQ=${r.faqs.fk.toFixed(1)}) | ASL=${r.full.asl.toFixed(1)} | ASW=${r.full.asw.toFixed(2)}`);
    }
  }
  if (errors.length > 0 && !filterSlug) {
    console.error(`\n❌ Reading-level gate failed (${errors.length} issues):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  } else if (!filterSlug) {
    console.log('\n✅ All 24 case studies and hub pass Grade 7-8 readability gate.');
  }
}

module.exports = { checkAllReadingLevels, analyzeCaseStudyHtml, analyzeHubHtml, computeFk };
