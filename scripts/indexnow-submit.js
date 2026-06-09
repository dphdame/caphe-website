#!/usr/bin/env node
/**
 * IndexNow submitter for CAPHE (PRD §6.7).
 * Pushes changed/new URLs to Bing + Yandex via the IndexNow API for instant
 * (re)crawl — useful for the not-yet-indexed URLs and every new tutorial.
 *
 * Usage:
 *   node scripts/indexnow-submit.js /membership /resources/health-economics-data-sources
 *   node scripts/indexnow-submit.js --all        # submit every indexable static + tutorial URL
 *
 * The key file public/<KEY>.txt must be deployed and publicly reachable.
 */
const fs = require('fs');
const path = require('path');

const HOST = 'www.caphegroup.org';
const BASE_URL = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const PUBLIC_DIR = path.join(__dirname, '../public');

function findKey() {
  const f = fs.readdirSync(PUBLIC_DIR).find(n => /^[0-9a-f]{8,}\.txt$/i.test(n));
  if (!f) throw new Error('No IndexNow key file (public/<key>.txt) found.');
  return path.basename(f, '.txt');
}

/** Build the IndexNow payload from a list of path-or-absolute URLs. */
function buildPayload(urls, key = findKey()) {
  const urlList = urls.map(u => (/^https?:\/\//.test(u) ? u : `${BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`));
  return {
    host: HOST,
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList,
  };
}

async function submit(urls) {
  const payload = buildPayload(urls);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow: submitted ${payload.urlList.length} URL(s) → HTTP ${res.status}`);
  if (!res.ok) console.log(await res.text());
  return res.status;
}

module.exports = { buildPayload, findKey, HOST, BASE_URL };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node scripts/indexnow-submit.js <path...> | --all');
    process.exit(1);
  }
  let urls = args;
  if (args[0] === '--all') {
    // Reuse the sitemap segments as the canonical URL list.
    urls = ['sitemap-tutorials.xml', 'sitemap-static.xml'].flatMap(seg => {
      const p = path.join(PUBLIC_DIR, seg);
      if (!fs.existsSync(p)) return [];
      return (fs.readFileSync(p, 'utf8').match(/<loc>([^<]+)<\/loc>/g) || [])
        .map(s => s.replace(/<\/?loc>/g, ''));
    });
  }
  submit(urls).catch(e => { console.error(e); process.exit(1); });
}
