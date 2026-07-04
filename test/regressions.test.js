'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');
const V = require('../scripts/validate-seo');

// ===========================================================================
// REGRESSION LEDGER — one named, dated test per real incident.
//
// HOW TO USE: when a new bug ships, add a `test('REG-YYYY-MM-DD-x: ...')` here
// that FAILS on the buggy state, fix the bug, and watch it go green. This file
// is the living record of "what has bitten us" and the guard that it stays fixed.
// The umbrella test at the bottom asserts the whole validator is green on HEAD.
// ===========================================================================

const ROOT = path.join(__dirname, '..');

function allFiles(dir, exts) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...allFiles(full, exts));
    else if (exts.some(x => e.name.toLowerCase().endsWith(x))) out.push(full);
  }
  return out;
}

// REG-2026-07-04-a — internal references to redirecting URLs (trailing slash /
// .html) crept into nav/footer/cards + og:url/JSON-LD/llms.txt. GSC "Page with
// redirect" on 21 URLs. Guard: no redirecting same-origin ref anywhere shipped.
test('REG-2026-07-04-a: no redirecting internal reference (trailing slash or .html)', () => {
  const offenders = [];
  for (const f of allFiles(H.PUBLIC, ['.html', '.js', '.txt'])) {
    const hits = V.redirectingRefs(fs.readFileSync(f, 'utf8'));
    if (hits.length) offenders.push(`${path.relative(H.PUBLIC, f)}: ${[...new Set(hits)].join(', ')}`);
  }
  for (const f of allFiles(path.join(ROOT, 'src', 'backend'), ['.js'])) {
    const hits = V.redirectingRefs(fs.readFileSync(f, 'utf8'));
    if (hits.length) offenders.push(`${path.relative(ROOT, f)}: ${[...new Set(hits)].join(', ')}`);
  }
  assert.deepStrictEqual(offenders, [], `redirecting refs:\n${offenders.join('\n')}`);
});

// REG-2026-07-04-b — a page's own canonical and og:url disagreed (canonical
// no-slash vs og:url trailing-slash) on methods-lab + access-explorer. Guard:
// canonical == og:url on every indexable page.
test('REG-2026-07-04-b: canonical and og:url agree on every page', () => {
  const offenders = [];
  for (const f of allFiles(H.PUBLIC, ['.html'])) {
    const html = fs.readFileSync(f, 'utf8');
    const canon = (html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i) || [''])[0]
      .match(/href=["']([^"']+)["']/i);
    const og = (html.match(/<meta[^>]*property=["']og:url["'][^>]*>/i) || [''])[0]
      .match(/content=["']([^"']+)["']/i);
    if (canon && og && canon[1] !== og[1]) {
      offenders.push(`${path.relative(H.PUBLIC, f)}: og:url ${og[1]} != canonical ${canon[1]}`);
    }
  }
  assert.deepStrictEqual(offenders, [], offenders.join('\n'));
});

// REG-2026-07-04-c — internal links must resolve to something the server serves
// (accounting for /src, /assets, /data mounts). Guard: no dead internal link.
test('REG-2026-07-04-c: every internal link resolves to a served target', () => {
  const offenders = [];
  for (const f of allFiles(H.PUBLIC, ['.html'])) {
    const dead = V.internalLinkTargets(fs.readFileSync(f, 'utf8'))
      .filter(t => !V.internalPathResolves(t));
    if (dead.length) offenders.push(`${path.relative(H.PUBLIC, f)}: ${dead.join(', ')}`);
  }
  assert.deepStrictEqual(offenders, [], offenders.join('\n'));
});

// REG-2026-07-04-f — deploying a commit that isn't the reviewed/merged HEAD.
// Guarded by scripts/check-deploy-parity.sh + .githooks/pre-push; here we assert
// those guard files exist and are executable so they can't be silently dropped.
test('REG-2026-07-04-f: deploy-parity guard files are present and executable', () => {
  for (const rel of ['scripts/check-deploy-parity.sh', '.githooks/pre-push']) {
    const p = path.join(ROOT, rel);
    assert.ok(fs.existsSync(p), `missing ${rel}`);
    assert.ok((fs.statSync(p).mode & 0o111) !== 0, `${rel} not executable`);
  }
});

// UMBRELLA — the full validator must exit 0 on the current tree (no errors).
test('validate-seo.js exits 0 on HEAD (no errors)', () => {
  const out = execFileSync('node', ['scripts/validate-seo.js'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(out, /ERRORS \(0\)|All SEO checks passed/,
    'validator reported errors — run `npm run seo:validate`');
});
