# Research: "Page with redirect" indexing issue — trailing-slash hub links

**Date:** 2026-07-04
**Repo:** caphe-website (github: dphdame/caphe-website; deploy: Heroku app `caphegroup`)
**Trigger:** Google Search Console "Page with redirect" — 21 affected URLs on caphegroup.org.

## Question

What in this codebase causes Google/users to land on non-canonical URL variants
(trailing-slash, bare-domain, http) instead of the canonical `https://www` no-trailing-slash form?

## Canonical form (agreed by canonical tags, sitemaps, and server)

- Scheme+host: `https://www.caphegroup.org`
- Path: extensionless, **no** trailing slash (root is the sole `/`).

## Root cause (single, code-grounded)

Internal nav/footer/card links point to **trailing-slash variants of three hub pages**, while
canonical tags, all sitemaps, and the server all use the no-slash form. Google follows the
trailing-slash links → 301 → reports "Page with redirect."

Complete, exhaustive set of offending internal links (broad sweep `href="/[a-z0-9][^"]*/"`
returned only these three patterns):

| Link in markup | Occurrences | Files | Canonical/sitemap form |
|---|---|---|---|
| `href="/methods-lab/"` | 94 | 64 | `/methods-lab` |
| `href="/tools/lha-calculator/"` | 85 | 60 | `/tools/lha-calculator` |
| `href="/tools/access-explorer/"` | 85 | ~60 | `/tools/access-explorer` |
| `src/backend/server.js:719` (community-welcome email body) → `.../methods-lab/` | 1 | — | `/methods-lab` |

Corroborating signal: `/methods-lab/` is linked inconsistently — 94× with slash, 37× without,
in the same nav blocks — i.e. copy-paste drift, not intent.

### Why prior fix missed it

Commit `2a5fac5` ("SEO: fix index coverage — non-slash sitemap+links, hub completeness") already
converted **sitemaps and tutorial-subpage links** to no-slash. It did **not** touch the three
hub landing-page nav links. So this is the un-fixed remainder of that same class.

## What is already correct (no change needed)

- **Canonical tags** (`scripts/validate-seo.js:54` already gates presence + www): 57 indexable
  pages, all `https://www.caphegroup.org/…` no-slash (root correctly `/`). The 10 pages without a
  canonical (`admin`, `dashboard`, `settings`, `auth-callback`, `reset-password`, `documents`,
  `404`, `join/apr|feb|jun`) are all `<meta name="robots" content="noindex">` — correct.
- **Sitemaps** (`sitemap-static.xml`, `sitemap-tutorials.xml` 38 locs, `sitemap-index.xml`): every
  `<loc>` https+www+no-slash.
- **robots.txt**: clean; points to `sitemap-index.xml`.
- **llms.txt**: no non-canonical URL forms.
- **No `http://` or non-www references** anywhere in `public/*.html`.
- **Tutorial sub-pages** (`/methods-lab/decision-thresholds`, …): linked 154× no-slash, 0× with
  slash. The trailing-slash versions GSC shows for these are historical directory-style URLs from
  before the extensionless migration; the server 301 handles them and they age out.
- **No generator/script or the `caphe-lab-generator` skill emits the bad links** — the nav is
  duplicated static HTML, so a one-pass find/replace is durable.

## Redirect config assessment (`src/backend/server.js:14-101`)

Each normalization is a single 301:
- non-www/bare `caphegroup.org` → `https://www` (MW1, lines 14-20, preserves path)
- trailing-slash → no-slash (MW2, lines 46-49)
- `.html` → clean (lines 39-43)
- `labSlugs` (lines 53-71) and `/programs/*` → `/programs#*` (74-83): single-hop to canonical.

Observations (minor, not the reported bug):
1. **Combined cases stack to 2 hops** — e.g. `http://caphegroup.org/methods-lab/decision-thresholds/`
   does bare→www (keeping slash) then slash-strip. ≤2 hops, no loop, tolerable. Optional: fold path
   normalization into MW1.
2. **http→https for the `www` host is not in app code** — MW1 only fires for exact bare host
   `caphegroup.org`. Bare-domain http→https works (MW1 always targets `https://`), but
   `http://www.caphegroup.org/...` relies on the Heroku/CDN layer. Verify at hosting layer.
3. `public/sitemap.xml` is byte-identical to `sitemap-index.xml` (redundant duplicate); robots
   points to the index, so harmless.

## Files that will change

- `public/**/*.html` (~64 files): normalize the 3 hub link patterns.
- `src/backend/server.js:719`: email link.
- `scripts/validate-seo.js` (+ optionally a `test/*.test.js`): add fix-the-class guard.

## Durable guard (fix-the-class)

`scripts/validate-seo.js` runs on `npm run predeploy`. Add a check that flags any internal
`href="/…/"` (trailing slash, non-root) in `public/*.html` as an ERROR, so this class cannot recur.
