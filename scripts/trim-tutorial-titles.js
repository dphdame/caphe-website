#!/usr/bin/env node
/**
 * Trim over-length tutorial titles (PRD §6.3): "… | CAPHE Methods Lab" → "… | CAPHE".
 * Applies to <title> and og:title. Idempotent. Reports any title still > 60 chars
 * after the swap so they can be shortened by hand.
 */
const fs = require('fs');
const path = require('path');

const ML = path.join(__dirname, '..', 'public', 'methods-lab');
const MAX = 60;

const slugs = fs.readdirSync(ML, { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name)
  .filter(s => fs.existsSync(path.join(ML, s, 'index.html')));

const residual = [];
for (const slug of slugs) {
  const file = path.join(ML, slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replace(/\| CAPHE Methods Lab/g, '| CAPHE');
  if (html !== before) fs.writeFileSync(file, html);
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (m && m[1].trim().length > MAX) residual.push(`${slug}: ${m[1].trim().length} — "${m[1].trim()}"`);
}
if (residual.length) {
  console.log('Still > 60 chars (shorten head noun manually):');
  residual.forEach(r => console.log('  ' + r));
} else {
  console.log('All tutorial titles <= 60 chars.');
}
