# Plan: standing regression + likely-bug gate

**Branch:** `harden-regression-gate`
**Research:** `thoughts/shared/research/2026-07-04_regression-gate-diagnosis.md`
**Date:** 2026-07-04

## Goal

A single standing gate that (a) re-catches every bug we've already hit, (b) catches the most
likely adjacent bugs, and (c) grows by one named test each time a new bug is found — wired so it
**actually runs** in CI, on predeploy, and before a Heroku push.

## Project config
Same as prior plan: DEFAULT_BRANCH `master`; deploy `git push origin master` (Heroku `caphegroup`,
remote `origin`); PREDEPLOY `npm run seo:validate` + `npm test`; CANONICAL_HOST `https://www.caphegroup.org`; no Sentry.

## Deliverables

### 1. New checks in `scripts/validate-seo.js` (run on predeploy + CI + pre-commit)
- **Canonical self-consistency** (catches REG-b, the exact contradiction we shipped): on each
  indexable page, `<link rel=canonical>` == `og:url` == every JSON-LD top-level `url`/WebPage/Article
  url. Mismatch = error.
- **Broken internal links** (REG-c): every internal `href`/`src` starting `/` resolves to a real
  target — a static file in `public/`, a directory with `index.html`, a `<name>.html`, or a known
  server route (`/api/...`, hash-only, known extensionless page). Unresolvable = error.
- **Sitemap ↔ site parity** (REG-d): every `<loc>` maps to a real page and is NOT a noindex page;
  every indexable non-noindex HTML page appears in a sitemap. Divergence = error (missing-from-sitemap
  as warning to start, to avoid noise).

### 2. Regression ledger — `test/regressions.test.js`
One named, dated test per past incident (seed with REG-a…f), each with a comment: what broke, when,
and the invariant. This is the "add to as new bugs come up" artifact. New bug → add one test here,
red first, then fix.

### 3. Negative/edge tests for the guard itself (REG-e)
`test/validate-seo-selftest.test.js`: feed `redirectingRefs()` and the new checks crafted inputs and
assert they FIRE (assets excluded on all branches, `.txt` scanned, `?query`/`#hash`, uppercase
`.HTML`, nested dirs) — so the checker is itself checked.

### 4. Wire the gates so they run
- `package.json`: `"predeploy": "npm run seo:validate && npm test"`; add `"pretest"`/`"validate": "npm run seo:validate && npm test"` convenience.
- CI `.github/workflows/seo-validation.yml`: add an `npm test` step; broaden `paths` to include
  `scripts/**`, `src/**`, `test/**`, `public/**` (all), `llms.txt`, `package.json`.
- Activate hooks: `git config core.hooksPath .githooks` (document in README) and update
  `.githooks/pre-commit` to run `npm test` too.

### 5. Deploy-parity gate (REG-f) — prevents the stale-deploy incident
- `scripts/check-deploy-parity.sh`: fetch `github/master`; if pushing to the Heroku remote and local
  `HEAD` != `github/master`, print the divergence and exit 1.
- `.githooks/pre-push`: when the push URL is `git.heroku.com`, run the parity check; block on failure.
  (Escape hatch: `ALLOW_DEPLOY_DIVERGENCE=1` env for intentional hotfixes, logged.)

## Phased TDD

- **P1 (REG-e selftest + ledger scaffold):** write failing/■ tests that encode each invariant. Red.
- **P2 (checks):** implement canonical-consistency, broken-link, sitemap-parity in validate-seo.js. Green.
- **P3 (wiring):** predeploy + CI + hooks. Verify `npm test` runs in CI locally via `act`-style dry check or by asserting the workflow yaml contains the step.
- **P4 (deploy-parity):** script + pre-push hook; unit-test the script logic (simulate HEAD==remote and HEAD!=remote).
- **P5 adversarial review:** agent attacks the new checks for false-pos/neg + the parity logic.
- **P6 validate + behavioral:** `npm run seo:validate` + `npm test` green on the real repo; broken-link
  check finds zero on current site; parity script correctly blocks a simulated divergence and passes on parity.

## Success criteria
- `npm test` green; `npm run seo:validate` green on the live repo.
- Each new check has a negative test proving it fires.
- CI workflow runs `npm test`; predeploy runs both.
- Deploy-parity script blocks a divergent HEAD and passes on a matching one (both simulated + verified).
- Adversary: no unaddressed false-positive that would block a legitimate deploy.

## Risk / out of scope
- Broken-link check must know the server's routing (extensionless, dir-index, `/api`, hash, mailto,
  external) to avoid false positives — implement against `src/backend/server.js` route rules; start
  strict-but-warn on ambiguous cases.
- Not touching the redundant `public/sitemap.xml` duplicate or MW1 2-hop optimization here.
