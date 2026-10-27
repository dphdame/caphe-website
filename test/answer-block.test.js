'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const H = require('./_helpers');

// Cluster A GEO authoring standard (structural, not prose-quality):
// each tutorial has a server-rendered 4-sentence answer block (40-130 words) and
// >=4 external citation links in the body (outside nav/footer).

function hasAnswerBlock(html) {
  const m = html.match(/class=["'][^"']*\banswer-block\b[^"']*["'][\s\S]*?>([\s\S]*?)<\/(?:div|p|section)>/i);
  if (!m) return false;
  const words = m[1].replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return words >= 40 && words <= 130;
}

function externalLinkCount(html) {
  const body = H.bodyMinusChrome(html);
  const links = body.match(/href=["']https?:\/\/[^"']+["']/gi) || [];
  return links.filter(l => !/caphegroup\.org/.test(l)).length;
}

test('all 24 tutorials have a server-rendered answer block', () => {
  const slugs = H.tutorialSlugs();
  const withBlock = slugs.filter(s => hasAnswerBlock(H.read(H.tutorialPath(s))));
  assert.ok(withBlock.length >= 24,
    `only ${withBlock.length}/${slugs.length} tutorials have an answer block`);
});

test('all 24 tutorials carry >=4 external citation links', () => {
  const slugs = H.tutorialSlugs();
  const cited = slugs.filter(s => externalLinkCount(H.read(H.tutorialPath(s))) >= 4);
  assert.ok(cited.length >= 24,
    `only ${cited.length}/${slugs.length} tutorials have >=4 external citations`);
});
