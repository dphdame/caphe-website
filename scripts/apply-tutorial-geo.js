#!/usr/bin/env node
/**
 * Apply the GEO authoring standard (PRD Cluster A) to Methods Lab tutorials.
 *
 * Reads per-tutorial content from scripts/seo/content/<slug>.json:
 *   { "answer": "<40-120 word direct answer>",
 *     "faqs": [ {"q":"...","a":"..."}, ... ],            // >=3
 *     "citations": ["whatif","mixtape", ...] }           // >=4 keys from citation-menu.json
 *
 * Injects, idempotently (marker-guarded):
 *   1. a server-rendered bolded answer block as first content under the H1,
 *   2. a References section (>=4 verified external links) before the footer,
 *   3. a FAQPage JSON-LD block in <head>.
 *
 * Content (accurate, tutorial-specific) is authored upstream; this script only
 * does consistent, testable insertion. Run: node scripts/apply-tutorial-geo.js [slug...]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ML = path.join(ROOT, 'public', 'methods-lab');
const CONTENT_DIR = path.join(__dirname, 'seo', 'content');
const MENU = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo', 'citation-menu.json'), 'utf8'));

const CITES = { ...MENU.causal_inference, ...MENU.cost_effectiveness };

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function hostOf(url) {
  try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; }
}

function answerBlock(answer) {
  return `<!-- geo:answer:start -->
        <div class="answer-block" style="background:#f5f7fa;border-left:4px solid #1a4480;padding:1rem 1.25rem;margin:0 0 1.5rem;border-radius:6px;">
          <p style="margin:0;font-weight:600;color:#1c1c1c;">${esc(answer)}</p>
          <p style="margin:.5rem 0 0;font-size:.85rem;color:#595959;">Last reviewed: June 2026</p>
        </div>
        <!-- geo:answer:end -->`;
}

function citationsSection(keys) {
  const items = keys.map(k => {
    const c = CITES[k];
    if (!c) throw new Error(`unknown citation key: ${k}`);
    return `            <li>${esc(c.text)} <a href="${c.url}" target="_blank" rel="noopener">${esc(hostOf(c.url))}</a></li>`;
  }).join('\n');
  return `<!-- geo:citations:start -->
        <section class="references" aria-label="References" style="margin:2rem 0;padding-top:1rem;border-top:1px solid #eee;">
          <h2>References</h2>
          <ul style="line-height:1.6;">
${items}
          </ul>
        </section>
        <!-- geo:citations:end -->`;
}

function faqSchema(faqs) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return `<!-- geo:faq:start -->
<script type="application/ld+json">
${JSON.stringify(obj, null, 2)}
</script>
<!-- geo:faq:end -->`;
}

function upsert(html, startMarker, endMarker, block, anchorInsert) {
  const re = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
  if (re.test(html)) return html.replace(re, block);
  return anchorInsert(html, block);
}

function applyOne(slug) {
  const file = path.join(ML, slug, 'index.html');
  const cfgPath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(cfgPath)) { console.log(`  SKIP ${slug} (no content json)`); return false; }
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  if (!cfg.answer || !Array.isArray(cfg.faqs) || cfg.faqs.length < 3 || !Array.isArray(cfg.citations) || cfg.citations.length < 4) {
    throw new Error(`${slug}: content json must have answer, >=3 faqs, >=4 citations`);
  }
  let html = fs.readFileSync(file, 'utf8');

  // 1. Answer block — after the first body <h1>...</h1>.
  html = upsert(html, '<!-- geo:answer:start -->', '<!-- geo:answer:end -->', answerBlock(cfg.answer),
    (h, block) => {
      const m = h.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i);
      if (!m) throw new Error(`${slug}: no <h1> found`);
      const idx = m.index + m[0].length;
      return h.slice(0, idx) + '\n        ' + block + h.slice(idx);
    });

  // 2. References — before the first <footer.
  html = upsert(html, '<!-- geo:citations:start -->', '<!-- geo:citations:end -->', citationsSection(cfg.citations),
    (h, block) => {
      const fm = h.search(/<footer\b/i);
      const at = fm !== -1 ? fm : h.search(/<\/body>/i);
      return h.slice(0, at) + block + '\n        ' + h.slice(at);
    });

  // 3. FAQ schema — before </head>.
  html = upsert(html, '<!-- geo:faq:start -->', '<!-- geo:faq:end -->', faqSchema(cfg.faqs),
    (h, block) => {
      const at = h.search(/<\/head>/i);
      return h.slice(0, at) + block + '\n' + h.slice(at);
    });

  fs.writeFileSync(file, html);
  console.log(`  OK ${slug}: answer + ${cfg.faqs.length} FAQs + ${cfg.citations.length} citations`);
  return true;
}

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));

let n = 0;
for (const s of slugs) if (applyOne(s)) n++;
console.log(`Applied GEO standard to ${n} tutorial(s).`);
