'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// Canonical URLs are extensionless with NO trailing slash (root is the sole "/").
// A same-origin reference that 301-redirects — trailing slash OR .html — is reported
// by Google as "Page with redirect". This guard keeps the whole class out of the site:
// not just <a href>, but og:url, JSON-LD url/item, llms.txt, sitemaps, and server-side
// email templates. Kept in lockstep with scripts/validate-seo.js redirectingRefs().
// See thoughts/shared/plans/fix-trailing-slash-hub-links.md.

const HREF_TRAILING = /href=["'](\/[^"'\/][^"'?#]*\/)(?:[?#][^"']*)?["']/gi;                 // href="/x/" (+?#)
const ABS_TRAILING = /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\/)(?=["')>\s]|$)/g;  // ".../x/"
const HREF_HTML = /(?:href|src)=["'](\/[A-Za-z0-9\/_-]+\.html)(?:[?#][^"']*)?["']/gi;         // href="/x.html" (+?#)
const ABS_HTML = /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\.html)\b/gi;             // ".../x.html"

function refsIn(content) {
  const refs = [];
  for (const re of [HREF_TRAILING, ABS_TRAILING, HREF_HTML, ABS_HTML]) {
    for (const m of content.matchAll(re)) refs.push(m[1]);
  }
  return refs.filter(r => !r.startsWith('/assets/'));
}

function walk(dir, exts) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (entry.isFile() && exts.some(e => entry.name.toLowerCase().endsWith(e))) out.push(full);
  }
  return out;
}

test('no same-origin reference in public/ 301-redirects (trailing slash or .html)', () => {
  const offenders = [];
  for (const file of walk(H.PUBLIC, ['.html', '.js', '.txt'])) {
    const hits = refsIn(fs.readFileSync(file, 'utf8'));
    if (hits.length > 0) {
      offenders.push(`${path.relative(H.PUBLIC, file)}: ${[...new Set(hits)].join(', ')}`);
    }
  }
  assert.deepStrictEqual(offenders, [],
    `Redirecting same-origin references. Use the extensionless no-slash canonical:\n${offenders.join('\n')}`);
});

test('no server-side template (src/backend) links a redirecting URL', () => {
  const offenders = [];
  for (const file of walk(path.join(H.ROOT, 'src', 'backend'), ['.js'])) {
    const hits = refsIn(fs.readFileSync(file, 'utf8'));
    if (hits.length > 0) {
      offenders.push(`${path.relative(H.ROOT, file)}: ${[...new Set(hits)].join(', ')}`);
    }
  }
  assert.deepStrictEqual(offenders, [],
    `Redirecting links in server templates:\n${offenders.join('\n')}`);
});

test('no sitemap <loc> is a redirecting URL (trailing slash or .html; root exempt)', () => {
  const offenders = [];
  for (const file of walk(H.PUBLIC, ['.xml'])) {
    const xml = fs.readFileSync(file, 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1];
      const isRoot = /^https?:\/\/www\.caphegroup\.org\/?$/.test(loc);
      if ((!isRoot && /\/$/.test(loc)) || /\.html($|\?)/i.test(loc)) {
        offenders.push(`${path.relative(H.PUBLIC, file)}: ${loc}`);
      }
    }
  }
  assert.deepStrictEqual(offenders, [],
    `Redirecting sitemap <loc> entries:\n${offenders.join('\n')}`);
});
