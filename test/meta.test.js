'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.3 Meta-description hygiene for key indexable pages (50–160 chars).
// login excluded (noindex). Tutorials covered separately by audit; spot-check here.
const PAGES = [
  'index.html', 'about.html', 'contact.html', 'programs.html', 'resources.html',
  'membership.html', 'membership/community.html', 'membership/professional.html',
  'peer-review.html', 'past-events.html', 'recordings.html',
];

test('key indexable pages have a 50–160 char meta description', () => {
  const bad = [];
  for (const p of PAGES) {
    const desc = H.metaDescOf(fs.readFileSync(path.join(H.PUBLIC, p), 'utf8'));
    const len = desc ? desc.length : 0;
    if (len < 50 || len > 160) bad.push(`${p}: ${len}`);
  }
  assert.deepStrictEqual(bad, [], `descriptions out of [50,160]:\n${bad.join('\n')}`);
});
