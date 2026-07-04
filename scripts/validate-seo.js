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
  'login.html',
  'join/apr.html',
  'join/feb.html',
  'join/jun.html'
];

let errors = [];
let warnings = [];

// Same-origin references that 301-redirect, which Google reports as "Page with
// redirect". The canonical form is extensionless with NO trailing slash. Two classes
// redirect, in both root-relative and absolute forms:
//   - trailing slash:  href="/methods-lab/"  ·  "https://www.caphegroup.org/x/"  (og:url, JSON-LD, llms.txt)
//   - .html extension: href="/about.html"    ·  "https://www.caphegroup.org/resources.html"
// Skip bare root "/", protocol-relative "//host", and /assets/ path prefixes.
function redirectingRefs(content) {
  const refs = [];
  // trailing slash — root-relative href
  for (const m of content.matchAll(/href=["'](\/[^"'\/][^"']*\/)["']/gi)) {
    refs.push(m[1]);
  }
  // trailing slash — absolute canonical-host URL
  for (const m of content.matchAll(
    /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\/)(?=["')>\s]|$)/g
  )) {
    if (!m[1].startsWith('/assets/')) refs.push(m[1]);
  }
  // .html extension — root-relative href/src
  for (const m of content.matchAll(/(?:href|src)=["'](\/[A-Za-z0-9\/_-]+\.html)["']/gi)) {
    refs.push(m[1]);
  }
  // .html extension — absolute canonical-host URL
  for (const m of content.matchAll(
    /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\.html)\b/g
  )) {
    refs.push(m[1]);
  }
  return refs;
}

function reportRedirectingRefs(label, content) {
  const refs = redirectingRefs(content);
  if (refs.length > 0) {
    errors.push(
      `${label}: ${refs.length} same-origin reference(s) that 301-redirect ` +
      `(trailing slash or .html; use the extensionless no-slash canonical): ` +
      `${[...new Set(refs)].join(', ')}`
    );
  }
}

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

  // Trailing-slash same-origin references (href + og:url + JSON-LD + any absolute).
  reportRedirectingRefs(relativePath, content);

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

// Scan public/**/*.js for trailing-slash links injected into the DOM at runtime
// (e.g. lab-access-control.js back-links) — these bypass the HTML scan but produce
// the same 301 for users who click them.
function checkInjectedLinks(dir = PUBLIC_DIR) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkInjectedLinks(full);
    } else if (entry.name.endsWith('.js')) {
      reportRedirectingRefs(path.relative(PUBLIC_DIR, full), fs.readFileSync(full, 'utf8'));
    }
  }
}

// Scan server-side email/HTML templates (src/backend/*.js) — they embed absolute
// caphegroup.org links that must also use the no-slash canonical form.
function checkServerTemplates() {
  const backendDir = path.join(__dirname, '../src/backend');
  if (!fs.existsSync(backendDir)) return;
  for (const name of fs.readdirSync(backendDir)) {
    if (!name.endsWith('.js')) continue;
    const full = path.join(backendDir, name);
    reportRedirectingRefs(`src/backend/${name}`, fs.readFileSync(full, 'utf8'));
  }
}

function checkSitemap() {
  // Segmented sitemaps (PRD §6.7): validate the index + both child segments.
  // The page-URL count lives in the segments, not the index.
  const indexPath = path.join(PUBLIC_DIR, 'sitemap-index.xml');
  const segmentFiles = ['sitemap-tutorials.xml', 'sitemap-static.xml'];

  if (!fs.existsSync(indexPath)) {
    errors.push('sitemap-index.xml: File not found');
    return;
  }

  let totalUrls = 0;
  for (const seg of segmentFiles) {
    const segPath = path.join(PUBLIC_DIR, seg);
    if (!fs.existsSync(segPath)) {
      errors.push(`${seg}: File not found (referenced by sitemap-index.xml)`);
      continue;
    }
    const content = fs.readFileSync(segPath, 'utf8');
    const urls = content.match(/<loc>[^<]+<\/loc>/g) || [];
    totalUrls += urls.length;
    urls.forEach(url => {
      const loc = url.replace(/<\/?loc>/g, '');
      if (loc.includes('caphegroup.org') && !loc.includes('www.')) {
        errors.push(`${seg}: URL missing www prefix: ${loc}`);
      }
      // Sitemap <loc> must be the canonical (extensionless, no trailing slash);
      // the root "/" is the sole allowed trailing slash. A redirecting <loc>
      // wastes crawl budget and can surface as "Page with redirect".
      const isRoot = /caphegroup\.org\/?$/.test(loc);
      if (!isRoot && /\/$/.test(loc)) {
        errors.push(`${seg}: <loc> has a trailing slash (301-redirects): ${loc}`);
      }
      if (/\.html($|\?)/.test(loc)) {
        errors.push(`${seg}: <loc> uses .html (301-redirects to clean URL): ${loc}`);
      }
    });
  }

  if (totalUrls < 10) {
    warnings.push(`Segmented sitemaps: only ${totalUrls} URLs total - may be incomplete`);
  }

  console.log(`Segmented sitemaps contain ${totalUrls} page URLs`);
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
checkInjectedLinks();
checkServerTemplates();
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
