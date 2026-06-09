'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.7 IndexNow: a key file in public/ and a submit script that builds a valid payload.
test('IndexNow key file exists in public/ and matches its filename', () => {
  const keyFiles = fs.readdirSync(H.PUBLIC).filter(f => /^[0-9a-f]{8,}\.txt$/i.test(f));
  assert.ok(keyFiles.length >= 1, 'no IndexNow key file (public/<key>.txt)');
  for (const f of keyFiles) {
    const key = path.basename(f, '.txt');
    const body = fs.readFileSync(path.join(H.PUBLIC, f), 'utf8').trim();
    assert.strictEqual(body, key, `key file ${f} body must equal its name`);
  }
});

test('indexnow submit script exposes a buildPayload that emits valid shape', () => {
  const mod = require(path.join(H.ROOT, 'scripts', 'indexnow-submit.js'));
  assert.strictEqual(typeof mod.buildPayload, 'function');
  const payload = mod.buildPayload(['/membership', '/resources/health-economics-data-sources']);
  assert.strictEqual(payload.host, 'www.caphegroup.org');
  assert.ok(typeof payload.key === 'string' && payload.key.length >= 8);
  assert.deepStrictEqual(payload.urlList, [
    'https://www.caphegroup.org/membership',
    'https://www.caphegroup.org/resources/health-economics-data-sources',
  ]);
});
