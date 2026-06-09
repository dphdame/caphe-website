'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// Cluster D CREATE: /resources/health-economics-data-sources hub.
const HUB = path.join(H.PUBLIC, 'resources', 'health-economics-data-sources', 'index.html');

test('data-sources hub page exists', () => {
  assert.ok(fs.existsSync(HUB), 'hub index.html missing');
});

test('data-sources hub has canonical(www), a table, schema, and >=8 outbound links', () => {
  if (!fs.existsSync(HUB)) return; // first run: existence test already fails
  const html = fs.readFileSync(HUB, 'utf8');
  assert.ok(/rel=["']canonical["'][^>]*www\.caphegroup\.org\/resources\/health-economics-data-sources/i.test(html),
    'missing www canonical');
  assert.ok(/<table[\s\S]*<\/table>/i.test(html), 'missing dataset table');
  const types = H.jsonLdBlocks(html).flatMap(b => b.json ? H.typeList(b.json).concat(
    (b.json['@graph'] || []).flatMap(H.typeList)) : []);
  assert.ok(types.includes('ItemList') || types.includes('CollectionPage'), 'missing ItemList/CollectionPage schema');
  const outbound = (H.bodyMinusChrome(html).match(/href=["']https?:\/\/[^"']+["']/gi) || [])
    .filter(l => !/caphegroup\.org/.test(l));
  assert.ok(outbound.length >= 8, `expected >=8 outbound source links, got ${outbound.length}`);
});
