# Implementation Plan: Spatial & Editorial Copy System Rollout

### Project Config
- **Repository:** CAPHE Website (`caphegroup.org`)
- **Default Branch:** `master`
- **Feature Branch:** `feat-spatial-editorial-copy-system`
- **Pre-Deploy Command:** `npm test && node scripts/validate-seo.js`
- **Deploy Target:** Heroku (`caphegroup-79290933e1e5` / `origin master`) + GitHub (`github master`)
- **Heroku App:** `caphegroup-79290933e1e5`
- **Canonical Host:** `https://www.caphegroup.org`
- **Smoke URLs:** `/`, `/tools/lha-calculator`, `/tools/access-explorer`, `/methods-lab`, `/membership`, `/programs`, `/resources`, `/about`

---

## 1. Context & Objectives
Extend the spatial architecture tokens (`.container-content`, `.section-compact`, `.section-header-left`) and the editorial voice/style/tone rules (confident collegiality, front-loaded information scent, pruning generic "Learn More" / "Click Here" phrasing) across the primary tool interfaces:
1. `public/tools/lha-calculator/index.html`
2. `public/tools/access-explorer/index.html`

In addition, satisfy the user's explicit release requirements:
- **Smoke screens:** Run automated visual/DOM and accessibility smoke screens.
- **Pre-deploy preview:** Provide an interactive local browser preview so the user can inspect the pages before production deployment.

---

## 2. Invariants & Guardrails
- **Zero Synthetic Data:** All empirical estimates (e.g. 9.16 deaths per 100k per $10/capita; NPPES vs HHS Medicaid claims) remain faithfully cited with authentic methodology links.
- **Information Scent:** Zero generic "Learn more" or "Click here" links. Use active, destination-grounded verbs (`Read Methodology →`, `View Research Details`).
- **Accessibility:** Add `<a href="#main-content" class="skip-link">Skip to main content</a>` and `<main id="main-content">` to both tool interfaces; verify keyboard focus path.
- **SEO & Links:** Extensionless clean URLs; meta descriptions 50–160 chars; test suite 0 failures.

---

## 3. Execution Phases

### Phase 1: Tool Microcopy & Accessibility Upgrades
- `public/tools/lha-calculator/index.html`:
  - Add skip-link `<a href="#main-content" class="skip-link">` after `<body>`.
  - Add `id="main-content"` to `<main>`.
  - Line 792: Change `<button>Learn more</button>` to `<button>View research details</button>`.
  - Line 840: Change `<a href="...">Learn more &rarr;</a>` to `<a href="...">Read Methodology &rarr;</a>`.
  - Refine explainer copy to ensure confident, constructive tone.
- `public/tools/access-explorer/index.html`:
  - Add skip-link `<a href="#main-content" class="skip-link">` after `<body>`.
  - Add `id="main-content"` to `<main>`.
  - Refine hero subtitle and map instructions for single-breath typographic measure and active scent.

### Phase 2: Automated Smoke Screen & Verifications
- Run `npm test` (0 failures).
- Run `node scripts/validate-seo.js` (0 errors).
- Verify DOM integrity: skip-link targets `#main-content` on both tool pages.

### Phase 3: Pre-Deploy Browser Preview Checkpoint (User Gate)
- Launch or open local preview in the user's browser so they can interact with the live tool pages and inspect the layout/copy before deployment.
- Await user approval.

### Phase 4: Deploy & Post-Deploy Verification
- Commit changes to `feat-spatial-editorial-copy-system`.
- Merge to `master` and deploy to Heroku (`origin master`) and GitHub (`github master`).
- Sync updated files to Google Drive (`07_website/`).
- Verify production release via curl on canonical endpoints.
