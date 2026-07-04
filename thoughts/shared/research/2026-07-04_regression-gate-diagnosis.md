# Diagnosis: how the redirect bugs (and the stale deploy) got past our gates

**Date:** 2026-07-04
**Repo:** caphe-website

Three distinct failure classes slipped through this session. Each maps to a specific missing gate.

## 1. The original site bug (264 trailing-slash links) survived because the gate checked the destination, not the roads to it

`scripts/validate-seo.js` (pre-fix) verified that canonical tags **exist** and use **www**. It never
verified that the site's own internal links and structured-data (`og:url`, JSON-LD) **point at** the
canonical form. So 264 links + 8 structured-data refs could drift to redirecting variants and the
gate stayed green. **Missing check:** same-origin references must equal the canonical form.
(Closed in the prior PR for the trailing-slash/`.html` class specifically.)

## 2. My own guard bugs (6 of them) survived initial testing because the checker was never checked

I wrote the guard and tested one happy path + one negative. The adversarial agent I ran was pointed
at the **site fix**, not at the **guard's own logic**. The `code-review` pass — pointed at the guard —
found all 6 (assets-exclusion on 1 of 4 branches, `.txt` not scanned, non-recursive scan/EISDIR,
case-sensitive `.HTML`, missed `?query`/`#hash`, unanchored root regex). **Lesson:** every gate needs
its own negative/edge-case tests; a gate with no adversarial test of *itself* is unverified.

## 3. The stale deploy (v217 shipped pre-fix code) survived because nothing checked deploy parity

`git push origin master` (origin = Heroku) blindly pushes whatever local `master` is. Local `master`
held an unpushed commit (`9200ae5`) and had **diverged** from the reviewed/merged `github/master`
(`7e13f65`). No gate asserted "the commit I'm about to deploy == the reviewed HEAD on GitHub."
**Missing gate:** pre-push deploy-parity.

## Process gaps found while diagnosing (these are why #1–#2 weren't caught automatically)

- **CI never runs the test suite.** `.github/workflows/seo-validation.yml` runs only
  `node scripts/validate-seo.js` — NOT `npm test`. The 37 tests (incl. the redirect guard) never
  execute in CI.
- **CI path filter is too narrow.** It triggers only on `public/**/*.html`, `public/sitemap.xml`,
  `public/robots.txt`. Changes to `scripts/`, `src/`, `test/`, `public/**/*.js`, or `llms.txt` do
  **not** trigger CI at all.
- **`predeploy` runs the validator but not the tests** (`"predeploy": "npm run seo:validate"`).
- **The `.githooks/pre-commit` hook is dead** — `core.hooksPath` is unset, so git never runs it.

## Failure-class taxonomy (seed for a standing regression ledger)

| ID | Class | First seen | Guarded by |
|----|-------|-----------|-----------|
| REG-2026-07-04-a | Internal ref to a redirecting URL (trailing slash / `.html`) | 2026-07-04 | validate-seo `redirectingRefs` + tests |
| REG-2026-07-04-b | Page's canonical / og:url / JSON-LD url disagree | 2026-07-04 | (to build) canonical self-consistency |
| REG-2026-07-04-c | Internal link to a nonexistent page (broken link) | (likely) | (to build) broken-link check |
| REG-2026-07-04-d | Indexable page missing from sitemap, or noindex/redirecting URL IN sitemap | (likely) | (to build) sitemap↔site parity |
| REG-2026-07-04-e | A gate whose own edge cases aren't tested | 2026-07-04 | negative tests per check |
| REG-2026-07-04-f | Deploy a commit that isn't the reviewed/merged HEAD | 2026-07-04 | (to build) pre-push deploy-parity |
