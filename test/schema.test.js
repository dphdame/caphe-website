'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.2 Structured data.
// Tutorials: keep Article/LearningResource AND add a FAQPage (>=3 Questions).
// Org/membership pages: must carry >=1 valid JSON-LD block.

function allTypes(blocks) {
  const t = [];
  for (const b of blocks) {
    if (!b.json) continue;
    const graph = b.json['@graph'] && Array.isArray(b.json['@graph']) ? b.json['@graph'] : [b.json];
    for (const node of graph) t.push(...H.typeList(node));
  }
  return t;
}

test('every tutorial JSON-LD parses as valid JSON', () => {
  const bad = [];
  for (const slug of H.tutorialSlugs()) {
    for (const b of H.jsonLdBlocks(H.read(H.tutorialPath(slug)))) {
      if (b.json === null) bad.push(slug);
    }
  }
  assert.deepStrictEqual([...new Set(bad)], [], `unparseable JSON-LD in:\n${bad.join('\n')}`);
});

test('every tutorial keeps Article + LearningResource', () => {
  const missing = [];
  for (const slug of H.tutorialSlugs()) {
    const t = allTypes(H.jsonLdBlocks(H.read(H.tutorialPath(slug))));
    if (!t.includes('Article') || !t.includes('LearningResource')) missing.push(`${slug}: [${t}]`);
  }
  assert.deepStrictEqual(missing, [], `tutorials missing Article/LearningResource:\n${missing.join('\n')}`);
});

test('every tutorial has a FAQPage with >=3 questions', () => {
  const missing = [];
  for (const slug of H.tutorialSlugs()) {
    const blocks = H.jsonLdBlocks(H.read(H.tutorialPath(slug)));
    let ok = false;
    for (const b of blocks) {
      if (!b.json) continue;
      const graph = b.json['@graph'] || [b.json];
      for (const node of graph) {
        if (H.typeList(node).includes('FAQPage')) {
          const q = Array.isArray(node.mainEntity) ? node.mainEntity.length : 0;
          if (q >= 3) ok = true;
        }
      }
    }
    if (!ok) missing.push(slug);
  }
  assert.deepStrictEqual(missing, [], `tutorials without FAQPage(>=3Q):\n${missing.join('\n')}`);
});

test('org/membership pages carry >=1 valid JSON-LD block', () => {
  const pages = [
    'membership.html', 'membership/community.html', 'membership/professional.html',
    'programs.html', 'peer-review.html', 'contact.html', 'resources.html', 'past-events.html',
  ];
  const missing = [];
  for (const p of pages) {
    const html = fs.readFileSync(path.join(H.PUBLIC, p), 'utf8');
    const blocks = H.jsonLdBlocks(html).filter(b => b.json !== null);
    if (blocks.length === 0) missing.push(p);
  }
  assert.deepStrictEqual(missing, [], `pages without schema:\n${missing.join('\n')}`);
});
