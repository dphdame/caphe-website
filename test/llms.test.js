'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.4 GEO: llms.txt resource entries must be markdown links
// "- [Title](https://…): description" — not bare "> url" lines.
const LLMS = path.join(H.PUBLIC, 'llms.txt');

test('llms.txt has no bare "> url" resource lines', () => {
  const txt = fs.readFileSync(LLMS, 'utf8');
  const bare = txt.split('\n').filter(l => /^\s*>\s*https?:\/\//.test(l));
  assert.deepStrictEqual(bare, [], `Bare > url lines remain:\n${bare.join('\n')}`);
});

test('llms.txt uses markdown link entries with descriptions', () => {
  const txt = fs.readFileSync(LLMS, 'utf8');
  const links = txt.split('\n').filter(l => /^\s*-\s*\[.+\]\(https?:\/\/[^)]+\):\s*\S/.test(l));
  assert.ok(links.length >= 5, `expected >=5 markdown resource links, got ${links.length}`);
});

test('llms.txt references the data-sources hub', () => {
  const txt = fs.readFileSync(LLMS, 'utf8');
  assert.ok(/health-economics-data-sources/.test(txt), 'llms.txt should list the data-sources hub');
});
