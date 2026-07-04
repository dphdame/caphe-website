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
  // trailing slash — root-relative href (tolerate a ?query / #hash after the slash)
  for (const m of content.matchAll(/href=["'](\/[^"'\/][^"'?#]*\/)(?:[?#][^"']*)?["']/gi)) {
    refs.push(m[1]);
  }
  // trailing slash — absolute canonical-host URL
  for (const m of content.matchAll(
    /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\/)(?=["')>\s]|$)/g
  )) {
    refs.push(m[1]);
  }
  // .html extension — root-relative href/src (tolerate a trailing ?query / #hash)
  for (const m of content.matchAll(/(?:href|src)=["'](\/[A-Za-z0-9\/_-]+\.html)(?:[?#][^"']*)?["']/gi)) {
    refs.push(m[1]);
  }
  // .html extension — absolute canonical-host URL
  for (const m of content.matchAll(
    /https:\/\/www\.caphegroup\.org(\/[A-Za-z0-9\/_-]+\.html)\b/gi
  )) {
    refs.push(m[1]);
  }
  // /assets/* is served statically and never redirects — exclude uniformly.
  return refs.filter(r => !r.startsWith('/assets/'));
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

// ---------------------------------------------------------------------------
// Routing model — mirror src/backend/server.js so the link/sitemap checks agree
// with what the server actually serves.
// ---------------------------------------------------------------------------

// Map a public/ HTML file to its canonical served path.
//   index.html                              -> /
//   about.html                              -> /about
//   methods-lab/index.html                  -> /methods-lab
//   tools/lha-calculator/methodology.html   -> /tools/lha-calculator/methodology
function fileToCanonicalPath(relativePath) {
  let p = '/' + relativePath.replace(/\\/g, '/');
  p = p.replace(/\.html$/i, '');
  p = p.replace(/\/index$/i, '');       // dir index collapses to the dir
  return p === '' ? '/' : p;
}

// Extra static mounts served from OUTSIDE public/ (server.js:107-109).
const REPO_ROOT = path.join(__dirname, '..');
const STATIC_MOUNTS = [
  { prefix: '/src/', dir: path.join(REPO_ROOT, 'src') },
  { prefix: '/assets/', dir: path.join(REPO_ROOT, 'assets') },
  { prefix: '/data/', dir: path.join(REPO_ROOT, 'data') },
];

// Bare methods-lab tutorial slugs that the server 301s to /methods-lab/<slug>
// (server.js labSlugs). Derived from the tutorial dirs so it can't drift.
function labSlugSet() {
  const ml = path.join(PUBLIC_DIR, 'methods-lab');
  if (!fs.existsSync(ml)) return new Set();
  return new Set(fs.readdirSync(ml, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(ml, d.name, 'index.html')))
    .map(d => d.name));
}
// /programs/<section> that the server 301s to /programs#<section> (server.js).
const PROGRAMS_SECTIONS = new Set(['webinars', 'workshops', 'working-groups', 'peer-review']);

// Does an internal root-relative path resolve to something the server serves
// (200 OR a 301 to a real target — i.e. NOT a 404)? `p` must already be stripped
// of ?query and #hash. The redirect concern (trailing slash / .html) is owned by
// redirectingRefs; here we only care whether the link dead-ends.
function internalPathResolves(p) {
  if (p === '/') return fs.existsSync(path.join(PUBLIC_DIR, 'index.html'));
  if (p.startsWith('/api/')) return true;             // server route, trusted
  for (const { prefix, dir } of STATIC_MOUNTS) {       // /src /assets /data mounts
    if (p.startsWith(prefix)) return fs.existsSync(path.join(dir, p.slice(prefix.length)));
  }
  // Normalize a trailing slash away (server 301s /about/ -> /about, /methods-lab/ -> /methods-lab).
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  const rel = p.replace(/^\//, '');
  // Server-side redirect maps that resolve to a real target (server.js labSlugs / programs).
  if (labSlugSet().has(rel)) return true;
  const progMatch = p.match(/^\/programs\/([a-z-]+)$/);
  if (progMatch && PROGRAMS_SECTIONS.has(progMatch[1])) return true;
  // Has a file extension → must be that exact static file under public/.
  if (/\.[a-z0-9]+$/i.test(p)) return fs.existsSync(path.join(PUBLIC_DIR, rel));
  // Extensionless → <p>.html or <p>/index.html (server.js:85-98).
  return fs.existsSync(path.join(PUBLIC_DIR, rel + '.html')) ||
         fs.existsSync(path.join(PUBLIC_DIR, rel, 'index.html'));
}

// Extract same-origin link targets (root-relative "/…" and absolute www URLs).
// Skips in-page anchors, mailto/tel/external, protocol-relative, and data URIs.
function internalLinkTargets(content) {
  const targets = [];
  for (const m of content.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    let href = m[1].trim();
    if (href.startsWith('https://www.caphegroup.org')) {
      href = href.slice('https://www.caphegroup.org'.length) || '/';
    } else if (!href.startsWith('/') || href.startsWith('//')) {
      continue; // external, protocol-relative, mailto:, tel:, #anchor, data:
    }
    const clean = href.split('#')[0].split('?')[0];
    if (clean === '' || clean === '/') { if (clean === '/') targets.push('/'); continue; }
    targets.push(clean);
  }
  return [...new Set(targets)];
}

// Broken internal links — a link to a path the server does not serve is a real
// navigation bug. Reported as WARNING for the first cycle (per plan), promote to
// ERROR once the live site is confirmed clean.
function checkBrokenLinks(relativePath, content) {
  const broken = internalLinkTargets(content).filter(t => !internalPathResolves(t));
  if (broken.length > 0) {
    warnings.push(`${relativePath}: ${broken.length} internal link(s) resolve to nothing: ${broken.join(', ')}`);
  }
}

// Canonical self-consistency — a page's own self-referential URLs must agree:
// <link rel=canonical>, og:url, and any JSON-LD self-page url. Disagreement is the
// exact class we shipped (canonical no-slash vs og:url trailing-slash).
// Page-scoped JSON-LD types whose `url` IS the current page (must match canonical).
// NOT WebSite/Organization (their url is the site root) and NOT BreadcrumbList
// (its items point at other pages).
const SELF_PAGE_TYPES = new Set([
  'WebPage', 'Article', 'CollectionPage', 'AboutPage', 'ContactPage', 'ItemPage'
]);

// Flatten JSON-LD into a list of nodes, descending through @graph and arrays so a
// self-page node nested in {"@context":…, "@graph":[…]} is actually inspected.
function jsonLdNodes(root) {
  const out = [];
  const visit = (n) => {
    if (Array.isArray(n)) { n.forEach(visit); return; }
    if (n && typeof n === 'object') {
      out.push(n);
      if (n['@graph']) visit(n['@graph']);
    }
  };
  visit(root);
  return out;
}

function checkCanonicalConsistency(relativePath, content) {
  const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonMatch) return; // absence handled elsewhere
  const canon = (canonMatch[0].match(/href=["']([^"']+)["']/i) || [])[1];
  if (!canon) return;

  const ogMatch = content.match(/<meta[^>]*property=["']og:url["'][^>]*>/i);
  if (ogMatch) {
    const og = (ogMatch[0].match(/content=["']([^"']+)["']/i) || [])[1];
    if (og && og !== canon) {
      errors.push(`${relativePath}: og:url (${og}) != canonical (${canon})`);
    }
  }

  // JSON-LD self-page url (recurse @graph; skip BreadcrumbList / WebSite / Org).
  for (const block of content.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )) {
    let json; try { json = JSON.parse(block[1].trim()); } catch { continue; }
    for (const node of jsonLdNodes(json)) {
      const types = [].concat(node['@type'] || []);
      if (types.some(t => SELF_PAGE_TYPES.has(t)) && node.url && node.url !== canon) {
        errors.push(`${relativePath}: JSON-LD ${types.join('/')} url (${node.url}) != canonical (${canon})`);
      }
    }
  }
}

// Sitemap <-> site parity: every <loc> must map to a real, indexable page; no
// noindex page may be listed. (Missing-from-sitemap is a warning, not an error.)
function checkSitemapParity() {
  const noindexPaths = new Set(NOINDEX_PAGES.map(fileToCanonicalPath));
  const locs = [];
  for (const seg of ['sitemap-tutorials.xml', 'sitemap-static.xml']) {
    const p = path.join(PUBLIC_DIR, seg);
    if (!fs.existsSync(p)) continue;
    for (const m of fs.readFileSync(p, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
      locs.push({ seg, loc: m[1], pathOnly: m[1].replace(/^https?:\/\/www\.caphegroup\.org/, '') || '/' });
    }
  }
  const locPaths = new Set(locs.map(l => l.pathOnly));
  for (const { seg, loc, pathOnly } of locs) {
    if (!internalPathResolves(pathOnly)) {
      errors.push(`${seg}: <loc> ${loc} does not resolve to a real page`);
      continue;
    }
    // noindex from the hardcoded list OR the page's own inline robots meta.
    let noindex = noindexPaths.has(pathOnly);
    if (!noindex) {
      const file = pathOnly === '/' ? 'index.html'
        : fs.existsSync(path.join(PUBLIC_DIR, pathOnly.replace(/^\//, '') + '.html'))
          ? pathOnly.replace(/^\//, '') + '.html'
          : path.join(pathOnly.replace(/^\//, ''), 'index.html');
      const fp = path.join(PUBLIC_DIR, file);
      if (fs.existsSync(fp) && /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(fs.readFileSync(fp, 'utf8'))) {
        noindex = true;
      }
    }
    if (noindex) {
      errors.push(`${seg}: <loc> ${loc} is a noindex page and must not be in the sitemap`);
    }
  }
  // Indexable pages absent from the sitemap (warning).
  for (const { relativePath } of findHtmlFiles(PUBLIC_DIR)) {
    if (NOINDEX_PAGES.includes(relativePath)) continue;
    const content = fs.readFileSync(path.join(PUBLIC_DIR, relativePath), 'utf8');
    if (/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(content)) continue;
    const cp = fileToCanonicalPath(relativePath);
    if (!locPaths.has(cp)) {
      warnings.push(`${relativePath}: indexable page not in any sitemap (${cp})`);
    }
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

  // REG-b: canonical / og:url / JSON-LD self-url must agree.
  checkCanonicalConsistency(relativePath, content);

  // REG-c: internal links must resolve to something the server serves.
  checkBrokenLinks(relativePath, content);

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

// Recursively scan a directory, running the redirecting-ref check on every file
// whose extension is in `exts`. Labels are relative to `labelBase`.
function scanDirForRedirects(dir, exts, labelBase) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForRedirects(full, exts, labelBase);
    } else if (entry.isFile() && exts.some(e => entry.name.toLowerCase().endsWith(e))) {
      reportRedirectingRefs(path.relative(labelBase, full), fs.readFileSync(full, 'utf8'));
    }
  }
}

// public/**: JS injectors (lab-access-control.js back-links) and text files
// (llms.txt) can carry redirecting refs the HTML scan never sees.
function checkPublicNonHtml() {
  scanDirForRedirects(PUBLIC_DIR, ['.js', '.txt'], PUBLIC_DIR);
}

// Server-side email/HTML templates (src/backend/**/*.js) embed absolute
// caphegroup.org links that must also use the no-slash canonical form.
function checkServerTemplates() {
  const backendDir = path.join(__dirname, '../src/backend');
  scanDirForRedirects(backendDir, ['.js'], path.join(__dirname, '..'));
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
      const isRoot = /^https?:\/\/www\.caphegroup\.org\/?$/.test(loc);
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

function runAllChecks() {
  console.log('🔍 Running SEO validation...\n');

  const htmlFiles = findHtmlFiles(PUBLIC_DIR);
  console.log(`Found ${htmlFiles.length} HTML files\n`);

  htmlFiles.forEach(checkFile);
  checkPublicNonHtml();
  checkServerTemplates();
  checkSitemap();
  checkSitemapParity();
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
  return { errors, warnings };
}

// Export pure helpers so the regression ledger + self-tests can exercise the
// checker directly (REG-e: the checker must itself be checked).
module.exports = {
  redirectingRefs,
  internalPathResolves,
  internalLinkTargets,
  fileToCanonicalPath,
  NOINDEX_PAGES,
  PUBLIC_DIR,
};

// Only run (and exit) when invoked as a script, not when require()'d.
if (require.main === module) {
  runAllChecks();
  process.exit(errors.length > 0 ? 1 : 0);
}
