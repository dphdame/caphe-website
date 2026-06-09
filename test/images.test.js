'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const H = require('./_helpers');

// §6.1 Broken images: tutorials must not reference images with a relative
// "assets/..." src (resolves to /methods-lab/assets/... → 404). All image
// srcs that point into a tutorial's assets dir must be root-relative and exist.

test('no tutorial references a relative assets/ image src', () => {
  const offenders = [];
  for (const slug of H.tutorialSlugs()) {
    const html = H.read(H.tutorialPath(slug));
    for (const src of H.imgSrcs(html)) {
      if (/^assets\//.test(src)) offenders.push(`${slug}: ${src}`);
    }
  }
  assert.deepStrictEqual(offenders, [], `Relative assets/ srcs found:\n${offenders.join('\n')}`);
});

test('every root-relative methods-lab image src resolves to a real file', () => {
  const missing = [];
  for (const slug of H.tutorialSlugs()) {
    const html = H.read(H.tutorialPath(slug));
    for (const src of H.imgSrcs(html)) {
      if (/^\/methods-lab\/.+\/assets\//.test(src)) {
        const onDisk = path.join(H.PUBLIC, src.replace(/^\//, '').split('?')[0]);
        if (!fs.existsSync(onDisk)) missing.push(`${slug}: ${src}`);
      }
    }
  }
  assert.deepStrictEqual(missing, [], `Image srcs with no file on disk:\n${missing.join('\n')}`);
});
