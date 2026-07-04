'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const V = require('../scripts/validate-seo');

// REG-e (the checker must be checked): unit-test validate-seo's pure helpers
// against the exact edge cases the 6 code-review findings exposed, so a future
// refactor that breaks one of them fails loudly instead of silently.

test('redirectingRefs flags trailing-slash + .html in href and absolute forms', () => {
  const hits = V.redirectingRefs(`
    <a href="/methods-lab/">x</a>
    <a href="/about.html">y</a>
    <meta property="og:url" content="https://www.caphegroup.org/tools/access-explorer/">
    <link href="https://www.caphegroup.org/resources.html">
  `);
  assert.ok(hits.includes('/methods-lab/'));
  assert.ok(hits.includes('/about.html'));
  assert.ok(hits.includes('/tools/access-explorer/'));
  assert.ok(hits.includes('/resources.html'));
});

test('redirectingRefs does NOT flag canonical forms, root, or protocol-relative', () => {
  const hits = V.redirectingRefs(`
    <a href="/">home</a>
    <a href="/methods-lab">ml</a>
    <meta property="og:url" content="https://www.caphegroup.org/">
    <a href="//cdn.example.com/lib/">cdn</a>
  `);
  assert.deepStrictEqual(hits, []);
});

test('redirectingRefs excludes /assets/ on EVERY branch (finding 1)', () => {
  const hits = V.redirectingRefs(`
    <a href="/assets/img/sprite/">a</a>
    <iframe src="/assets/embeds/w.html"></iframe>
    <img src="https://www.caphegroup.org/assets/logos/x/">
    <link href="https://www.caphegroup.org/assets/style.html">
  `);
  assert.deepStrictEqual(hits, []);
});

test('redirectingRefs catches uppercase .HTML (finding 4) and ?query/#hash (finding 5)', () => {
  const hits = V.redirectingRefs(`
    <meta property="og:url" content="https://www.caphegroup.org/About.HTML">
    <a href="/methods-lab/?utm=x">q</a>
    <a href="/about.html#top">h</a>
  `);
  assert.ok(hits.includes('/About.HTML'), 'uppercase .HTML');
  assert.ok(hits.includes('/methods-lab/'), 'trailing slash before ?query');
  assert.ok(hits.includes('/about.html'), '.html before #hash');
});

test('internalPathResolves knows the non-public static mounts (/src /assets /data)', () => {
  assert.equal(V.internalPathResolves('/src/frontend/css/style.css'), true);
  assert.equal(V.internalPathResolves('/assets/images/logo-icon.png'), true);
  assert.equal(V.internalPathResolves('/assets/does-not-exist.png'), false);
});

test('internalPathResolves handles extensionless, dir-index, root, and /api routes', () => {
  assert.equal(V.internalPathResolves('/'), true);              // index.html
  assert.equal(V.internalPathResolves('/about'), true);         // about.html
  assert.equal(V.internalPathResolves('/methods-lab'), true);   // methods-lab/index.html
  assert.equal(V.internalPathResolves('/tools/lha-calculator/methodology'), true);
  assert.equal(V.internalPathResolves('/api/auth/google'), true); // route, trusted
  assert.equal(V.internalPathResolves('/nope-not-a-page'), false);
});

test('internalPathResolves models server redirect maps and trailing slash (adversary #3)', () => {
  // labSlug bare form → server 301s to /methods-lab/<slug>, so it is NOT a 404.
  assert.equal(V.internalPathResolves('/selection-into-treatment'), true);
  // /programs/<section> → server 301s to /programs#<section>.
  assert.equal(V.internalPathResolves('/programs/webinars'), true);
  assert.equal(V.internalPathResolves('/programs/not-a-section'), false);
  // trailing slash normalizes (redirect concern owned by redirectingRefs, not this).
  assert.equal(V.internalPathResolves('/about/'), true);
  assert.equal(V.internalPathResolves('/methods-lab/'), true);
});

test('internalLinkTargets skips external, mailto/tel, in-page anchors, protocol-relative', () => {
  const t = V.internalLinkTargets(`
    <a href="/about">in</a>
    <a href="https://www.caphegroup.org/resources">abs-self</a>
    <a href="https://external.com/x">ext</a>
    <a href="mailto:info@caphegroup.org">mail</a>
    <a href="#section">anchor</a>
    <a href="//cdn.example.com/x.js">pr</a>
  `);
  assert.ok(t.includes('/about'));
  assert.ok(t.includes('/resources'));   // absolute self-URL normalized to path
  assert.ok(!t.some(x => x.includes('external.com')));
  assert.ok(!t.includes('#section'));
  assert.ok(!t.some(x => x.startsWith('mailto')));
});

test('fileToCanonicalPath mirrors the server routing', () => {
  assert.equal(V.fileToCanonicalPath('index.html'), '/');
  assert.equal(V.fileToCanonicalPath('about.html'), '/about');
  assert.equal(V.fileToCanonicalPath('methods-lab/index.html'), '/methods-lab');
  assert.equal(V.fileToCanonicalPath('tools/lha-calculator/methodology.html'),
    '/tools/lha-calculator/methodology');
});
