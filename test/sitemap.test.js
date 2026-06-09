'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.7 Defensive indexing: segmented sitemaps + master index; tutorials segment
// separate from static; no /login anywhere; all locs use www.
const files = {
  index: path.join(H.PUBLIC, 'sitemap-index.xml'),
  tutorials: path.join(H.PUBLIC, 'sitemap-tutorials.xml'),
  static: path.join(H.PUBLIC, 'sitemap-static.xml'),
};

function locs(p) {
  const xml = fs.readFileSync(p, 'utf8');
  return (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));
}

test('segmented sitemap files exist', () => {
  for (const [k, p] of Object.entries(files)) {
    assert.ok(fs.existsSync(p), `missing sitemap-${k}.xml`);
  }
});

test('sitemap-index references both child sitemaps', () => {
  const xml = fs.readFileSync(files.index, 'utf8');
  assert.ok(/sitemap-tutorials\.xml/.test(xml), 'index must reference tutorials sitemap');
  assert.ok(/sitemap-static\.xml/.test(xml), 'index must reference static sitemap');
});

test('tutorials sitemap covers 37 tutorials + the methods-lab index (38 locs)', () => {
  const u = locs(files.tutorials);
  assert.strictEqual(u.length, 38, `expected 38 tutorial locs, got ${u.length}`);
  assert.ok(u.some(x => /\/methods-lab\/?$/.test(x)), 'should include the methods-lab hub');
});

test('no sitemap lists /login and all locs use www', () => {
  for (const k of ['tutorials', 'static']) {
    for (const u of locs(files[k])) {
      assert.ok(!/\/login\b/.test(u), `${k}: /login must be excluded (${u})`);
      assert.ok(/^https:\/\/www\.caphegroup\.org/.test(u), `${k}: non-www loc ${u}`);
    }
  }
});
