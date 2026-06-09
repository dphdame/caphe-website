'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// Accessibility fixes from UX review of the data-sources hub (WCAG 2.1 AA).
const HUB = path.join(H.PUBLIC, 'resources', 'health-economics-data-sources', 'index.html');
const html = () => fs.readFileSync(HUB, 'utf8');

test('hub has a <main id="main-content"> landmark (B1)', () => {
  assert.match(html(), /<main[^>]*id=["']main-content["']/i);
});

test('hub has a skip-to-content link as first body element (B2)', () => {
  const h = html();
  assert.match(h, /class=["']skip-link["'][^>]*href=["']#main-content["']/i);
});

test('hub table first column cells are th scope="row" (H1)', () => {
  const h = html();
  // 11 dataset rows → 11 <th scope="row"> inside tbody
  const tbody = (h.match(/<tbody>([\s\S]*?)<\/tbody>/i) || [, ''])[1];
  const rowHeaders = (tbody.match(/<th\s+scope=["']row["']/gi) || []).length;
  assert.ok(rowHeaders >= 11, `expected >=11 th scope=row, got ${rowHeaders}`);
  assert.ok(!/<tbody>[\s\S]*?<tr>\s*<td>/i.test(h), 'first tbody cell should be a th, not td');
});

test('hub external links disclose new tab via visually-hidden text (H2)', () => {
  const h = html();
  assert.ok((h.match(/opens in a new tab/gi) || []).length >= 8,
    'external links should carry an "opens in a new tab" disclosure');
});

test('hub table wrapper is keyboard-scrollable region (H3) and table has min-width (H4)', () => {
  const h = html();
  assert.match(h, /class=["']ds-table-wrap["'][^>]*tabindex=["']0["']/i);
  assert.match(h, /class=["']ds-table-wrap["'][^>]*role=["']region["']/i);
  assert.match(h, /min-width:\s*600px/i);
});

test('hub FAQ uses a definition list (H5)', () => {
  const h = html();
  const faq = h.slice(h.search(/id=["']faq["']/i));
  assert.match(faq, /<dl>[\s\S]*<dt>[\s\S]*<dd>[\s\S]*<\/dl>/i);
});

test('hub renders a visible breadcrumb nav (M4)', () => {
  assert.match(html(), /<nav[^>]*aria-label=["']Breadcrumb["'][\s\S]*?<\/nav>/i);
});

test('global stylesheet defines skip-link and visually-hidden helpers', () => {
  const css = fs.readFileSync(path.join(H.ROOT, 'src', 'frontend', 'css', 'style.css'), 'utf8');
  assert.match(css, /\.skip-link\b/);
  assert.match(css, /\.visually-hidden\b/);
});

test('main.js wires dropdown keyboard support + mobile aria-expanded (B3/M1)', () => {
  const js = fs.readFileSync(path.join(H.ROOT, 'src', 'frontend', 'js', 'main.js'), 'utf8');
  assert.match(js, /aria-expanded/);
  assert.match(js, /nav-dropdown/);
});
