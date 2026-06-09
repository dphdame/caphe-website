'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const H = require('./_helpers');

// §6.5 Accessibility: muted body text must meet WCAG AA on near-white bg.
// #797979 (4.16:1) and #757575 (~4.5:1 borderline) are out; #595959 is the token.
const STYLE = path.join(H.ROOT, 'src', 'frontend', 'css', 'style.css');

test('no #797979 anywhere in public/ or src/', () => {
  const hits = execSync(
    `grep -rIl '797979' "${H.PUBLIC}" "${path.join(H.ROOT, 'src')}" || true`,
    { encoding: 'utf8' }
  ).trim();
  assert.strictEqual(hits, '', `#797979 found in:\n${hits}`);
});

test('global stylesheet muted token is #595959 (not #757575)', () => {
  const css = fs.readFileSync(STYLE, 'utf8');
  const m = css.match(/--color-text-muted:\s*(#[0-9a-fA-F]{6})/);
  assert.ok(m, '--color-text-muted token not found');
  assert.strictEqual(m[1].toLowerCase(), '#595959', `muted token is ${m[1]}, expected #595959`);
});
