# Plan: Fix trailing-slash hub links causing "Page with redirect"

**Branch:** `fix-trailing-slash-hub-links`
**Research:** `thoughts/shared/research/2026-07-04_12-58_trailing-slash-hub-links.md`
**Date:** 2026-07-04

## Project config (resolved from repo)

| Key | Value |
|---|---|
| DEFAULT_BRANCH | `master` |
| DEPLOY_TARGET | Heroku app `caphegroup`, remote **`origin`** (`git.heroku.com/caphegroup`) — deploy = `git push origin master` (NOT auto on GitHub merge) |
| GITHUB_REMOTE | `github` (`dphdame/caphe-website`) — sync only |
| PREDEPLOY_CMD | `npm run seo:validate` (predeploy hook) + `npm test` (`node --test test/*.test.js`) |
| CANONICAL_HOST | `https://www.caphegroup.org` |
| SENTRY | none configured in repo |
| SMOKE | fetch canonical hub URLs, assert 200 (not 301) + no redirect |

## Problem

264 internal nav/footer/card links point to trailing-slash hub variants
(`/methods-lab/`, `/tools/lha-calculator/`, `/tools/access-explorer/`) that 301-redirect
to their no-slash canonical form. Google reports them as "Page with redirect."

## Approach

Three edits + a regression guard, verified by an adversarial reviewer before merge.

---

### Phase 1 — Add the fix-the-class guard FIRST (Red)

**Why first:** proves the bug exists via a failing gate, and prevents recurrence.

1. Extend `scripts/validate-seo.js` `checkFile()` to scan `public/*.html` for internal links of
   the form `href="/…/"` (leading slash, trailing slash, not bare `/`, not external) and push an
   ERROR for each. Exclude `href="/"` (root) and any `href="http…"`.
2. Add `test/trailing-slash-links.test.js`: asserts zero internal trailing-slash `href` across
   `public/**/*.html` (uses `test/_helpers.js` file-walk like `sitemap.test.js`).

**Success (Red):** `npm run seo:validate` exits 1 listing the 3 hub patterns; new test FAILS.

### Phase 2 — Normalize the links (Green)

1. Site-wide exact-match replace across `public/**/*.html`:
   ```bash
   cd public
   find . -name '*.html' -exec sed -i '' \
     -e 's#href="/methods-lab/"#href="/methods-lab"#g' \
     -e 's#href="/tools/lha-calculator/"#href="/tools/lha-calculator"#g' \
     -e 's#href="/tools/access-explorer/"#href="/tools/access-explorer"#g' {} +
   ```
   (Exact `/"` match — will NOT touch `/tools/lha-calculator/methodology` or tutorial subpaths.)
2. `src/backend/server.js:719`: `.../methods-lab/` → `.../methods-lab` in the email body.

**Success (Green):** `npm run seo:validate` exits 0; new test PASSES; `grep -rE 'href="/[a-z0-9][^"]*/"' public` returns nothing.

### Phase 3 — Adversarial review

Spawn a `general-purpose` adversarial agent to attack the diff: (a) any hub link missed or a
non-hub link wrongly stripped; (b) did the sed touch `/methodology`, tutorial subpaths, or root;
(c) is the guard defeatable / does it false-positive on external/anchor links; (d) canonical tags,
sitemaps, robots still internally consistent post-edit; (e) any NEW trailing-slash introduced.
Fold every confirmed finding before proceeding.

**Success:** adversary returns no unaddressed Critical/High finding.

### Phase 4 — Full validation + behavioral verify

1. `npm test` (full node test suite) → 0 failures.
2. `npm run seo:validate` → pass.
3. Behavioral: start server locally, `curl -sI` the three canonical hub URLs → **200** (not 301),
   and `curl -sI` a trailing-slash variant → still correctly **301** to no-slash (redirect safety
   net intact for external/legacy links).

**Success:** all green; canonical URLs serve 200 directly; redirect fallback still works.

### Phase 5 — Commit, push, PR, review, ship

1. Commit (no Co-Authored-By), push to `github`, open PR.
2. `code-review` + `/security-review` on the diff.
3. On green: merge to `master`, `git push github master`, then **`git push origin master`** (Heroku deploy).
4. Post-deploy smoke: `curl -sI` canonical hub URLs on prod → 200; trailing-slash → 301.

## Out of scope (noted, not done here)

- MW1 2-hop optimization for combined bare+slash cases (minor).
- `http://www.` host https-enforcement (hosting-layer, verify separately).
- Removing redundant `public/sitemap.xml` duplicate (harmless).

## Codebase-health baseline

- Change is additive + a lint guard; no data model, no cross-layer coupling.
- Risk: sed over-reach → mitigated by exact `/"` match + adversarial review + `npm test`.
- Reversibility: pure content/link edit; `git revert` + redeploy is a clean rollback.
