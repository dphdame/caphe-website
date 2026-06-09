'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// Cluster F: /login should be noindex (attracts search traffic it can't satisfy);
// legal pages stay indexable.
function hasNoindex(file) {
  const html = fs.readFileSync(path.join(H.PUBLIC, file), 'utf8');
  return /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html);
}

test('login.html has a noindex robots meta', () => {
  assert.ok(hasNoindex('login.html'), 'login.html should be noindex');
});

test('privacy.html and terms.html remain indexable', () => {
  assert.ok(!hasNoindex('privacy.html'), 'privacy must stay indexable');
  assert.ok(!hasNoindex('terms.html'), 'terms must stay indexable');
});
