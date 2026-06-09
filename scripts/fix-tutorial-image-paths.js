#!/usr/bin/env node
/**
 * Fix broken Methods Lab tutorial images (PRD §6.1).
 *
 * Tutorials live at public/methods-lab/<slug>/index.html and are served at
 * /methods-lab/<slug> (no trailing slash). A relative `src="assets/x.png"`
 * therefore resolves to /methods-lab/assets/x.png → 404. Rewrite every such
 * relative reference to a root-relative path that includes the slug.
 *
 * Idempotent: running twice is a no-op. Run: node scripts/fix-tutorial-image-paths.js
 */
const fs = require('fs');
const path = require('path');

const ML = path.join(__dirname, '..', 'public', 'methods-lab');

function run() {
  const slugs = fs.readdirSync(ML, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(s => fs.existsSync(path.join(ML, s, 'index.html')));

  let changedFiles = 0;
  let changedRefs = 0;

  for (const slug of slugs) {
    const file = path.join(ML, slug, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    let n = 0;
    // Match src="assets/..." or src='assets/...' that is NOT already root-relative.
    html = html.replace(/(\ssrc=)(["'])assets\/([^"']+)\2/gi, (_m, pre, q, rest) => {
      n++;
      return `${pre}${q}/methods-lab/${slug}/assets/${rest}${q}`;
    });
    if (n > 0) {
      fs.writeFileSync(file, html);
      changedFiles++;
      changedRefs += n;
      console.log(`  ${slug}: ${n} ref(s)`);
    }
  }
  console.log(`Fixed ${changedRefs} image ref(s) across ${changedFiles} file(s).`);
}

run();
