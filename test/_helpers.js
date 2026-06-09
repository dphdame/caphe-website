'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const ML = path.join(PUBLIC, 'methods-lab');

/** List tutorial slugs (dirs under methods-lab with an index.html), excluding the hub index. */
function tutorialSlugs() {
  return fs.readdirSync(ML, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(slug => fs.existsSync(path.join(ML, slug, 'index.html')))
    .sort();
}

function tutorialPath(slug) {
  return path.join(ML, slug, 'index.html');
}

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

/** Extract the <title> text. */
function titleOf(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

/** Extract meta description content. */
function metaDescOf(html) {
  // Capture the full attribute value (descriptions legitimately contain
  // apostrophes, so match against the opening quote char via backreference).
  const m = html.match(/<meta[^>]*name=["']description["'][^>]*content=(["'])([\s\S]*?)\1/i);
  return m ? m[2] : null;
}

/** All <img src="..."> values. */
function imgSrcs(html) {
  const out = [];
  const re = /<img[^>]*\ssrc=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

/** All JSON-LD blocks parsed (skips unparseable, returns {raw, json|null}). */
function jsonLdBlocks(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    let json = null;
    try { json = JSON.parse(raw); } catch (_) { json = null; }
    out.push({ raw, json });
  }
  return out;
}

/** Normalize a schema object's @type into a flat array of strings. */
function typeList(obj) {
  if (!obj || obj['@type'] == null) return [];
  const t = obj['@type'];
  return Array.isArray(t) ? t : [t];
}

/** Strip nav/header/footer to test body-only content. */
function bodyMinusChrome(html) {
  return html
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '');
}

module.exports = {
  ROOT, PUBLIC, ML,
  tutorialSlugs, tutorialPath, read,
  titleOf, metaDescOf, imgSrcs, jsonLdBlocks, typeList, bodyMinusChrome,
};
