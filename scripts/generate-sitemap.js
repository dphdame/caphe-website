#!/usr/bin/env node
/**
 * Sitemap Generator for CAPHE
 * Run: node scripts/generate-sitemap.js
 *
 * Automatically generates sitemap.xml from public HTML files
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.caphegroup.org';
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Pages to exclude (noindex pages)
const EXCLUDE_PATTERNS = [
  /^admin\.html$/,
  /^dashboard\.html$/,
  /^settings\.html$/,
  /^documents\.html$/,
  /^auth-callback\.html$/,
  /^reset-password\.html$/,
  /^join\//,
  /^404\.html$/
];

// Priority mappings
const PRIORITY_MAP = {
  'index.html': '1.0',
  'about.html': '0.9',
  'programs.html': '0.9',
  'methods-lab/index.html': '0.9',
  'resources.html': '0.8',
  'membership.html': '0.8',
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

function generateSitemap() {
  const htmlFiles = findHtmlFiles(PUBLIC_DIR);
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const file of htmlFiles.sort()) {
    // Convert file path to clean URL (no .html extension)
    let urlPath = file.replace(/\\/g, '/');

    // Handle index files and .html extensions
    if (urlPath === 'index.html') {
      urlPath = '';
    } else if (urlPath.endsWith('/index.html')) {
      urlPath = urlPath.replace('/index.html', '/');
    } else if (urlPath.endsWith('.html')) {
      urlPath = urlPath.slice(0, -5); // Remove .html extension
    }

    const url = `${BASE_URL}/${urlPath}`;
    const priority = getPriority(file);
    const changefreq = getChangefreq(file);

    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Generated sitemap with ${htmlFiles.length} URLs: ${OUTPUT_FILE}`);
}

generateSitemap();
