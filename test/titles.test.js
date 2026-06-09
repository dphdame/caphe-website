'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const H = require('./_helpers');

// §6.3 Title hygiene: tutorial <title> ≤ 60 chars (SERP truncation point).
const MAX = 60;

test('every tutorial title is <= 60 characters', () => {
  const tooLong = [];
  for (const slug of H.tutorialSlugs()) {
    const title = H.titleOf(H.read(H.tutorialPath(slug)));
    if (title && title.length > MAX) tooLong.push(`${slug}: ${title.length} — "${title}"`);
  }
  assert.deepStrictEqual(tooLong, [], `Titles over ${MAX} chars:\n${tooLong.join('\n')}`);
});
