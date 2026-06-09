# Implementation Plan: CAPHE SEO/GEO PRD Execution (TDD)

**Date:** 2026-06-08
**Repo:** `/Users/victoriaperez/Projects/CAPHE`
**Research:** `thoughts/shared/research/2026-06-08-caphe-seo-geo-prd-research.md`
**Method:** TDD — write failing test → implement → green → refactor. `node:test` (built-in, zero-dep).

## Overview

Execute the deterministic SEO/GEO epics first under TDD (images, titles, llms.txt, contrast, login noindex, sitemap segmentation, schema), then the content epics (answer blocks, FAQ copy, membership copy, data-sources hub) with structural tests + agent-authored prose. The PRD audit is stale on schema/descriptions/tutorial-contrast (already fixed); this plan targets the **actual** remaining gap.

---

## Phase 0 — Test harness + RED suite

#### Step 0.1: Stand up `node:test`
- **Files:** `package.json` (`"test": "node --test test/"`), new `test/_helpers.js` (load tutorials, parse JSON-LD, list img srcs).
- **What:** zero-dep runner; helper to enumerate `public/methods-lab/*/index.html`.

#### Step 0.2: Write failing tests (RED) for every deterministic epic
- `test/images.test.js` — no tutorial body contains `src="assets/`; each `/methods-lab/<slug>/assets/<file>` referenced resolves to a real file on disk.
- `test/titles.test.js` — every tutorial `<title>` text ≤ 60 chars.
- `test/llms.test.js` — every `### …` resource block uses a markdown link `- [Title](https://…): desc` (no bare `> url`); contains data-sources hub line.
- `test/contrast.test.js` — repo (css + html) contains no `#797979` and no `#757575`; `style.css` muted token = `#595959`.
- `test/noindex.test.js` — `login.html` has `<meta name="robots" … noindex>`; `privacy.html`/`terms.html` do not.
- `test/sitemap.test.js` — `sitemap-index.xml`, `sitemap-tutorials.xml`, `sitemap-static.xml` exist + well-formed XML + all `<loc>` use `www`; tutorials sitemap = 38 locs (37 + index); no sitemap contains `/login`.
- `test/schema.test.js` — every tutorial has valid JSON-LD with top type incl. `Article`; **and** a `FAQPage` block with ≥3 `Question`s; org/membership pages (membership, community, professional, programs, peer-review, contact, resources, past-events) each have ≥1 JSON-LD block.
- `test/meta.test.js` — every indexable page meta description length ∈ [50,160].
- `test/answer-block.test.js` (structural) — ≥35 tutorials contain a server-rendered answer block (`class="answer-block"` or `data-answer-first`) with 40–120 words; ≥4 external citation `<a href="http…">` outside nav/footer.
- **Acceptance of Phase 0:** `npm test` runs and FAILS on the not-yet-done epics (proves tests are real).

**QI gate:** confirm each suite fails for the right reason before implementing.

---

## Phase 1 — Deterministic epics → GREEN

#### Step 1.1 (§6.1, P0): Fix broken images
- **Files:** the 25 tutorials in `/tmp/broken_img_files.txt`.
- **What:** transform script rewrites `src="assets/X"` → `src="/methods-lab/<slug>/assets/X"`, preserving `alt`/attrs; add `width`/`height` if PNG dims readable. Idempotent.
- **Green:** `images.test.js`.

#### Step 1.2 (§6.3, P1): Trim long titles
- **Files:** 12 tutorials >60 chars.
- **What:** `… | CAPHE Methods Lab` → `… | CAPHE`; re-measure; if still >60, shorten head noun (manual list in plan). Update `og:title` if present.
- **Green:** `titles.test.js`.

#### Step 1.3 (§6.4, P1): Reformat llms.txt
- **Files:** `public/llms.txt`.
- **What:** convert `### Title \n > url \n desc` → `- [Title](url): desc`; add data-sources hub + a topic-rich Methods Lab line (name methods + datasets).
- **Green:** `llms.test.js`.

#### Step 1.4 (§6.5, P2): Global contrast
- **Files:** `src/frontend/css/style.css:27`.
- **What:** `--color-text-muted:#757575` → `#595959`. Grep any other page-level overrides.
- **Green:** `contrast.test.js`.

#### Step 1.5 (Cluster F): /login noindex + gate coupling
- **Files:** `public/login.html` (+`<meta name="robots" content="noindex,follow">`), `scripts/validate-seo.js` (add `login.html` to `NOINDEX_PAGES`), `scripts/generate-sitemap.js` (add `/^login\.html$/` to `EXCLUDE_PATTERNS`).
- **Green:** `noindex.test.js`; `npm run seo:validate` still exits 0.

#### Step 1.6 (§6.7): Sitemap segmentation
- **Files:** rewrite `scripts/generate-sitemap.js` to emit `sitemap-tutorials.xml` (37 tutorials + methods-lab index), `sitemap-static.xml` (everything else indexable), `sitemap-index.xml` (master). Keep generating legacy `sitemap.xml` as a copy of the index (or 1:1) so existing GSC submission keeps resolving. Update `robots.txt` Sitemap line → `sitemap-index.xml`.
- **Green:** `sitemap.test.js`.

---

## Phase 2 — Schema overhaul → GREEN

#### Step 2.1 (§6.2): FAQPage on 37 tutorials
- **Files:** 37 tutorials.
- **What:** append a 2nd JSON-LD `FAQPage` block (3–4 Q&As). Questions = real long-tail variants; answers = 1–2 sentence extracts. **Author via parallel agents per topical cluster** (causal-pitfalls, threats-to-validity, CEA/value, program-impact) so Q&As are accurate, not boilerplate. Append, don't overwrite Article block.
- **Green:** `schema.test.js` FAQ portion.

#### Step 2.2 (§6.2): Schema on org/membership pages
- **Files:** membership.html (`Organization`), community/professional (`Offer` per tier: price 0 / real price + `priceValidUntil`, `offeredBy`, `eligibleRegion` CA), programs/peer-review/contact (`Organization`/`EducationalOrganization`), past-events (`Event`), resources (`CollectionPage`+`ItemList`). Add `BreadcrumbList` to section pages.
- **Green:** `schema.test.js` org portion.

---

## Phase 3 — Content epics (structural tests + agent prose)

#### Step 3.1 (Cluster A GEO standard): answer-first blocks + citations
- **Files:** 35 tutorials lacking a block.
- **What:** insert a 40–120-word **server-rendered** bolded answer block as first content under H1; add ≥4 real external citations (Hernán-Robins, Cunningham *Mixtape*, Angrist-Pischke, Imbens-Rubin, Pearl, topic primaries) — **URLs verified before baking** (citation-integrity rule). "Last reviewed" stamp. Author via parallel agents per cluster.
- **Green:** `answer-block.test.js`.

#### Step 3.2 (Cluster D CREATE): data-sources hub
- **Files:** new `public/resources/health-economics-data-sources/index.html`; link from `resources.html`; add to llms.txt + static sitemap.
- **What:** 1,800–2,400w directory w/ `<table>` (Dataset|Owner|Coverage|Access|Use), grouped H2s, answer block, `CollectionPage`+`ItemList`+`BreadcrumbList`+`FAQPage` schema, 8–12 verified outbound links, canonical+www.
- **Green:** new `test/data-sources-hub.test.js` (exists, schema, table, ≥8 outbound, canonical).

#### Step 3.3 (Cluster C OPTIMIZE): membership copy
- **Files:** membership.html, community.html, professional.html.
- **What:** identity statement, "what you get" bullets, tier comparison table, FAQ block, hard CTAs (exact copy from PRD §5C), internal-link anchors. Run through `/style-pass --advocate`-style voice check + `ux-design-qa-analyst` per CLAUDE.md frontend rule (these are conversion pages).
- **Green:** `meta.test.js` + membership structural test.

---

## Phase 4 — Infra scripts + external/manual actions

#### Step 4.1: IndexNow pusher (deterministic, scriptable)
- **Files:** `scripts/indexnow-submit.js` (+ key file in `public/<key>.txt`). Submits changed URLs to Bing/Yandex IndexNow.
- **Green:** `test/indexnow.test.js` (key file present, script builds correct payload — mocked fetch).

#### Step 4.2: External/manual — FLAG for user, do not fake
- Bing Webmaster Tools verify + submit segmented sitemap (login required).
- GSC URL Inspection → Request Indexing for the 2 not-indexed URLs + flagship (CDP/login).
- .edu outreach batch.
- These have third-party effects / require interactive login → **listed as a handoff checklist**, not executed silently.

---

## QI Gates

| Gate | When | Tool | Pass criteria |
|---|---|---|---|
| RED proof | end Phase 0 | `npm test` | every new suite fails for the intended reason |
| GREEN deterministic | end Phase 1–2 | `npm test` | images/titles/llms/contrast/noindex/sitemap/schema green |
| Predeploy gate intact | after 1.5/1.6 | `npm run seo:validate` | exits 0 |
| Citation verification | Step 3.1/3.2 | WebFetch each URL | 100% of external citations resolve + say what we claim |
| Image regression | end Phase 1 | re-crawl / `images.test.js` | 0 `src="assets/` ; 0 missing files |
| Schema validity | end Phase 2 | JSON.parse in `schema.test.js` (+ spot Rich Results Test) | all JSON-LD parses; FAQPage on 37 |
| Voice/UX | Step 3.3 | `/style-pass`, `ux-design-qa-analyst` | conversion pages pass before "done" |
| Full suite | end | `npm test` | all green |

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Overwriting existing Article schema | append FAQPage as separate block; test asserts BOTH present |
| validate-seo predeploy fails after login noindex | add login to NOINDEX_PAGES in same commit (Step 1.5) |
| Sitemap transition breaks GSC discovery | keep legacy `sitemap.xml`; point robots at index; verify both parse |
| Fabricated citations | verify every URL via WebFetch before baking (Phase 3 gate) |
| Content epics large | parallelize via cluster agents; structural tests gate completeness, not wording |
| Stale PRD over-scoping | plan reflects verified remaining work, not the audit table |

## Phasing vs PRD roadmap
PRD Phase 1≈ my Phase 1 (1.1/1.3 + meta). PRD Phase 2≈ my Phase 2 + 1.6 + 4.1. PRD Phase 3≈ my 3.1/3.3. PRD Phase 4≈ my 3.2 + 4.2.

## Deploy
After green + visual check: `git push origin master` (Heroku) then `git push github master`; verify `heroku releases -n 1` + `curl -sI https://www.caphegroup.org`.
