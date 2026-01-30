#!/usr/bin/env node
/**
 * Pre-commit check: Detect relative links in methods-lab that could break
 * Run: node scripts/check-relative-links.js
 */

const fs = require('fs');
const path = require('path');

const methodsLabDir = path.join(__dirname, '../public/methods-lab');
let hasErrors = false;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativeLinkPattern = /href="(?!\/|https?:|#|mailto:)([a-z-]+)\/?"/g;
  const parentLinkPattern = /href="\.\.\/([a-z-]+)\/?"/g;

  let match;
  const fileName = path.relative(methodsLabDir, filePath);

  while ((match = relativeLinkPattern.exec(content)) !== null) {
    // Skip if it's a known safe pattern (like anchor links)
    if (!match[1].includes('-')) continue;

    console.error(`❌ ${fileName}: Relative link found: href="${match[0]}"`);
    console.error(`   Should be: href="/methods-lab/${match[1]}/"`);
    hasErrors = true;
  }

  while ((match = parentLinkPattern.exec(content)) !== null) {
    console.error(`❌ ${fileName}: Parent-relative link found: href="${match[0]}"`);
    console.error(`   Should be: href="/methods-lab/${match[1]}/"`);
    hasErrors = true;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      checkFile(filePath);
    }
  }
}

console.log('Checking for relative links in methods-lab...\n');
walkDir(methodsLabDir);

if (hasErrors) {
  console.error('\n⚠️  Found relative links that may break. Use absolute paths instead.');
  process.exit(1);
} else {
  console.log('✅ No problematic relative links found.');
  process.exit(0);
}
