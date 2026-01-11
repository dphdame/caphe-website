#!/usr/bin/env node
/**
 * SEO Validation Script for CAPHE
 * Run: node scripts/validate-seo.js
 *
 * Checks for common SEO issues before deployment
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://www.caphegroup.org';

// Pages that should have noindex
const NOINDEX_PAGES = [
  'admin.html',
  'dashboard.html',
  'settings.html',
  'documents.html',
  'auth-callback.html',
  'reset-password.html',
  'join/apr.html',
  'join/feb.html',
  'join/jun.html'
];

let errors = [];
let warnings = [];

function findHtmlFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.html')) {
      files.push({ fullPath, relativePath });
    }
  }
  return files;
}

function checkFile({ fullPath, relativePath }) {
  const content = fs.readFileSync(fullPath, 'utf8');
  const isNoindexPage = NOINDEX_PAGES.includes(relativePath);

  // Check for canonical tag
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  const hasCanonical = !!canonicalMatch;

  // Check for noindex
  const hasNoindex = /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(content);

  // Check canonical URL uses www
  if (hasCanonical) {
    const hrefMatch = canonicalMatch[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch && hrefMatch[1].includes('caphegroup.org') && !hrefMatch[1].includes('www.')) {
      errors.push(`${relativePath}: Canonical URL missing www prefix`);
    }
  }

  // Check internal links for non-www
  const nonWwwLinks = content.match(/https:\/\/caphegroup\.org[^"'\s]*/g);
  if (nonWwwLinks) {
    warnings.push(`${relativePath}: Contains ${nonWwwLinks.length} non-www internal link(s)`);
  }

  // Indexable pages should have canonical
  if (!isNoindexPage && !hasCanonical && !hasNoindex) {
    errors.push(`${relativePath}: Missing canonical tag (indexable page)`);
  }

  // Noindex pages should have noindex meta
  if (isNoindexPage && !hasNoindex) {
    errors.push(`${relativePath}: Missing noindex meta tag`);
  }

  // Check for title tag
  if (!/<title>[^<]+<\/title>/i.test(content)) {
    errors.push(`${relativePath}: Missing or empty title tag`);
  }

  // Check for meta description
  if (!/<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(content)) {
    warnings.push(`${relativePath}: Missing meta description`);
  }
}

function checkSitemap() {
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('sitemap.xml: File not found');
    return;
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = content.match(/<loc>[^<]+<\/loc>/g) || [];

  // Check sitemap URLs use www
  urls.forEach(url => {
    if (url.includes('caphegroup.org') && !url.includes('www.')) {
      errors.push(`sitemap.xml: URL missing www prefix: ${url}`);
    }
  });

  // Check sitemap has reasonable number of URLs
  if (urls.length < 10) {
    warnings.push(`sitemap.xml: Only ${urls.length} URLs - may be incomplete`);
  }

  console.log(`Sitemap contains ${urls.length} URLs`);
}

function checkRobots() {
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    errors.push('robots.txt: File not found');
    return;
  }

  const content = fs.readFileSync(robotsPath, 'utf8');

  // Check sitemap reference uses www
  if (content.includes('caphegroup.org') && !content.includes('www.caphegroup.org')) {
    errors.push('robots.txt: Sitemap URL missing www prefix');
  }

  if (!content.includes('Sitemap:')) {
    warnings.push('robots.txt: No sitemap reference');
  }
}

// Run checks
console.log('🔍 Running SEO validation...\n');

const htmlFiles = findHtmlFiles(PUBLIC_DIR);
console.log(`Found ${htmlFiles.length} HTML files\n`);

htmlFiles.forEach(checkFile);
checkSitemap();
checkRobots();

// Report results
console.log('\n' + '='.repeat(50));

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  errors.forEach(e => console.log(`   • ${e}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
  warnings.forEach(w => console.log(`   • ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All SEO checks passed!');
}

console.log('\n' + '='.repeat(50));

// Exit with error code if there are errors
process.exit(errors.length > 0 ? 1 : 0);
