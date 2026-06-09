#!/usr/bin/env node
/**
 * Segmented Sitemap Generator for CAPHE (PRD §6.7 defensive indexing)
 * Run: node scripts/generate-sitemap.js
 *
 * Emits:
 *   public/sitemap-tutorials.xml  — Methods Lab tutorials + the methods-lab hub
 *   public/sitemap-static.xml     — homepage, membership, tools, org, legal, resources
 *   public/sitemap-index.xml      — master index referencing the two segments
 *   public/sitemap.xml            — kept as a copy of the index for backward compat
 *
 * Per-segment indexing in GSC is an early-warning signal: if "tutorials" indexing
 * ever drops below "static," templated-similarity is biting.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.caphegroup.org';
const PUBLIC_DIR = path.join(__dirname, '../public');

// Pages to exclude from sitemaps (noindex / utility pages)
const EXCLUDE_PATTERNS = [
  /^admin\.html$/,
  /^dashboard\.html$/,
  /^settings\.html$/,
  /^documents\.html$/,
  /^auth-callback\.html$/,
  /^reset-password\.html$/,
  /^login\.html$/,            // noindex (PRD Cluster F)
  /^join\//,
  /^404\.html$/
];

const PRIORITY_MAP = {
  'index.html': '1.0',
  'about.html': '0.9',
  'programs.html': '0.9',
  'methods-lab/index.html': '0.9',
  'tools/lha-calculator/index.html': '0.9',
  'resources.html': '0.8',
  'membership.html': '0.8',
  'recordings.html': '0.8',
  'default': '0.7',
  'privacy.html': '0.3',
  'terms.html': '0.3'
};

function shouldExclude(relativePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(relativePath));
}

function getPriority(relativePath) {
  return PRIORITY_MAP[relativePath] || PRIORITY_MAP['default'];
}

function getChangefreq(relativePath) {
  if (relativePath.includes('methods-lab/') && relativePath !== 'methods-lab/index.html') {
    return 'monthly';
  }
  if (relativePath === 'programs.html' || relativePath === 'methods-lab/index.html') {
    return 'weekly';
  }
  if (relativePath === 'privacy.html' || relativePath === 'terms.html') {
    return 'yearly';
  }
  return 'monthly';
}

function findHtmlFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.html') && !shouldExclude(relativePath)) {
      files.push(relativePath);
    }
  }
  return files;
}

function toUrl(file) {
  let urlPath = file.replace(/\\/g, '/');
  if (urlPath === 'index.html') urlPath = '';
  else if (urlPath.endsWith('/index.html')) urlPath = urlPath.replace('/index.html', '/');
  else if (urlPath.endsWith('.html')) urlPath = urlPath.slice(0, -5);
  return `${BASE_URL}/${urlPath}`;
}

// A tutorial = any methods-lab/* file EXCEPT the hub index.
function isTutorial(file) {
  const f = file.replace(/\\/g, '/');
  return f.startsWith('methods-lab/') && f !== 'methods-lab/index.html';
}

function urlsetXml(files, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const file of files.slice().sort()) {
    xml += '  <url>\n';
    xml += `    <loc>${toUrl(file)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <priority>${getPriority(file)}</priority>\n`;
    xml += `    <changefreq>${getChangefreq(file)}</changefreq>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function sitemapIndexXml(segments, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const name of segments) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${BASE_URL}/${name}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>\n';
  return xml;
}

function generate() {
  const all = findHtmlFiles(PUBLIC_DIR);
  const today = new Date().toISOString().split('T')[0];

  // The methods-lab hub (methods-lab/index.html) belongs in the tutorials segment
  // as the cluster's parent, per PRD §6.7.
  const tutorials = all.filter(f => isTutorial(f) || f.replace(/\\/g, '/') === 'methods-lab/index.html');
  const statics = all.filter(f => !tutorials.includes(f));

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-tutorials.xml'), urlsetXml(tutorials, today));
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-static.xml'), urlsetXml(statics, today));

  const indexXml = sitemapIndexXml(['sitemap-tutorials.xml', 'sitemap-static.xml'], today);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-index.xml'), indexXml);
  // Backward-compat: keep sitemap.xml resolving (now a sitemap index).
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);

  console.log(`Sitemaps generated: ${tutorials.length} tutorial URLs, ${statics.length} static URLs.`);
  console.log('  sitemap-tutorials.xml, sitemap-static.xml, sitemap-index.xml, sitemap.xml (=index)');
}

generate();
