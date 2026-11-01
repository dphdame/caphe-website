'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const LAB_DIR = path.join(__dirname, '..', 'public', 'methods-lab');

const SLUGS = [
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

test('every case study has a Policy Setting intro, an Analytical Answer Block, and resolving endnotes', () => {
  for (const slug of SLUGS) {
    const html = fs.readFileSync(path.join(LAB_DIR, slug, 'index.html'), 'utf8');
    assert.match(html, /<p class="policy-setting\b[^>]*>[\s\S]+?<\/p>/i, `[${slug}] missing .policy-setting intro`);
    assert.match(html, /<p class="answer-block\b[^>]*>[\s\S]+?<\/p>/i, `[${slug}] missing .answer-block summary`);
    assert.match(html, /<details\s+id="data-sources-endnotes"/i, `[${slug}] missing #data-sources-endnotes`);

    const refs = [...html.matchAll(/href="#endnote-(\d+)"/gi)].map(m => m[1]);
    assert.ok(refs.length >= 1, `[${slug}] expected at least 1 endnote reference`);
    for (const r of refs) {
      assert.match(html, new RegExp(`id="endnote-${r}"`, 'i'), `[${slug}] missing #endnote-${r}`);
    }
  }
});

test('no case study uses stacked bar charts, mechanical Perspective badges, or mixed cash+QALY totals', () => {
  for (const slug of SLUGS) {
    const html = fs.readFileSync(path.join(LAB_DIR, slug, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /class="[^"]*\bbudget-bar-(?:seg|track)\b/i, `[${slug}] stacked bar chart class detected`);
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<details[\s\S]*?<\/details>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    assert.doesNotMatch(visible, /\bPerspective\s*:/i, `[${slug}] mechanical Perspective: badge detected`);
    assert.doesNotMatch(visible, /Total Annual Value\*/i, `[${slug}] mixed cash+QALY Total Annual Value detected`);
  }
});

test('chw-health-outcomes renders separate horizontal bars and ledger-pure calculator outputs', () => {
  const html = fs.readFileSync(path.join(LAB_DIR, 'chw-health-outcomes', 'index.html'), 'utf8');
  for (const id of ['chwCostOffsetSvg', 'chwBarCost', 'chwBarVisit', 'chwBarOffset', 'chwBreakevenLine', 'chwHealthCallout']) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }
  const barYs = [...html.matchAll(/id="chwBar(?:Cost|Visit|Offset)"[^>]*\by="(\d+)"/g)].map(m => Number(m[1]));
  assert.equal(new Set(barYs).size, 3, 'CHW horizontal bars must have 3 distinct y coordinates');
});
