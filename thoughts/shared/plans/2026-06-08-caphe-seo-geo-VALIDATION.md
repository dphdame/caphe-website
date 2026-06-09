# Validation Report: CAPHE SEO/GEO PRD Execution

**Date:** 2026-06-08
**Plan:** `2026-06-08-caphe-seo-geo-prd-plan.md`
**Branch:** `seo-geo-prd-2026-06-08` (4 commits) — NOT yet deployed
**Overall: PASS** (codebase-deliverable scope). External/manual actions flagged below.

## Test + gate results
- `npm test`: **25 / 25 pass, 0 fail** (`node --test test/*.test.js`).
- Predeploy SEO gate (`npm run seo:validate`): **PASS, 0 errors, 0 warnings**; 56 page URLs across segmented sitemaps.
- Runtime smoke test (server booted on :5599): tutorial 200; **fixed image path 200; old relative path 404** (bug confirmed fixed); hub 200; sitemap-index 200; IndexNow key 200; login serves `robots: noindex, follow`.

## PRD success metrics & acceptance (§3) → evidence

| Criterion | Target | Evidence | Status |
|---|---|---|---|
| Broken image requests | 0 | 0 files with `src="assets/"`; runtime 404→200 | ✅ |
| Pages with correct schema | 56 | 37 tutorials Article/LearningResource (pre-existing) + 8 org pages added + hub | ✅ |
| Tutorials with FAQ schema | 37 | 37/37 FAQPage(≥3Q) | ✅ |
| Answer-first structure | (GEO standard) | 37/37 server-rendered `answer-block` | ✅ |
| External citations ≥4/tutorial | from 0 | 37/37 ≥4 links, all from 8 WebFetch-verified sources | ✅ |
| Over-length titles | 0 | 0 tutorials >60 chars | ✅ |
| llms.txt format | markdown links | 0 bare `> url`; hub listed; Lighthouse agentic should recover | ✅ |
| Contrast (muted text) | AA | global token `#595959`; `#797979`/`#757575` absent | ✅ |
| /login indexing | noindex + de-sitemapped | noindex meta live; 0 sitemaps list /login; added to validate-seo NOINDEX_PAGES | ✅ |
| Sitemap segmentation | tutorials/static + index | 3 segmented files + legacy `sitemap.xml`=index; robots→index | ✅ |
| CREATE data-sources hub | new page | live, 1,705w, table, CollectionPage+ItemList+BreadcrumbList+FAQPage, 11 verified sources | ✅ |
| Org/membership schema | added | 8/8 pages (Organization/Offer/Event/CollectionPage/Service/ContactPoint) | ✅ |
| IndexNow | live | key file + `scripts/indexnow-submit.js` (`--all` / per-URL) | ✅ |

## Notable: PRD audit was stale (verified in research)
Tutorial schema migration (CollectionPage→Article), tutorial meta descriptions, and tutorial-level contrast were **already done** before this session. This plan targeted the genuine remaining gap. The one remaining contrast gap (global stylesheet `#757575`) was fixed.

## Citation integrity
All tutorial citations and hub outbound links drawn from a **pre-verified menu** (each URL WebFetch-confirmed 2026-06-08). One guessed ASA p-value PubMed ID was caught as a wrong paper and dropped; OECD/WHO-CHOICE dead URLs dropped. No memory-based or unverified URLs shipped.

## Files changed (high level)
- `test/` (10 files) — new TDD suite + helpers
- `scripts/` — fix-tutorial-image-paths, trim-tutorial-titles, apply-tutorial-geo, apply-org-schema, indexnow-submit; rewrote generate-sitemap (segmented); patched validate-seo (login + segmented sitemaps)
- `scripts/seo/` — citation-menu.json + 37 content/<slug>.json
- `public/methods-lab/*/index.html` (37) — image paths, titles, answer blocks, FAQ schema, citations
- `public/` — llms.txt, robots.txt, login.html, index/about meta, resources.html link, segmented sitemaps, IndexNow key, NEW hub
- `src/frontend/css/style.css` — muted token

## OPEN — external / manual (cannot be done from disk; require third-party login or have live effects)
1. **Deploy to production** — `git push origin master` (origin = Heroku) deploys live. Held for user decision (high-stakes SEO change). Branch is committed locally.
2. **Bing Webmaster Tools** — verify domain + submit `sitemap-index.xml` (interactive login).
3. **Run IndexNow** — `node scripts/indexnow-submit.js --all` after deploy (needs key file live).
4. **GSC** — submit segmented sitemaps; URL-inspect/Request-Indexing the 2 not-indexed URLs + flagship (interactive).
5. **Membership OPTIMIZE copy** (Cluster C tier table / hard-CTA rewrite) and **.edu outreach** — content/relationship work beyond schema; not attempted this session, lower automation value.
6. **UX review of hub** — `ux-design-qa-analyst` run; findings to fold in before deploy.

## Recommended next action
Review the branch; if approved, merge to `master` and deploy to Heroku, then run IndexNow + submit sitemaps in GSC/Bing.
