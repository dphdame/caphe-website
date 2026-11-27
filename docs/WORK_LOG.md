# CAPHE Website Work Log

## 2026-11-27: Three-Type Epistemic Hub Grouping & Spacious 3-Beat Executive Opening Across All 24 Case Studies

- **Conversation Link:** [CAPHE Case Studies Epistemic Clarity & 3-Beat Rollout (`6b755618-9257-4fa3-8968-1e4af84bdb41`)](conversation://6b755618-9257-4fa3-8968-1e4af84bdb41)
- **Transcript Path:** `/Users/vserver/.gemini/antigravity/brain/6b755618-9257-4fa3-8968-1e4af84bdb41/.system_generated/logs/transcript.jsonl`

### Completed
- Reorganized `public/case-studies/index.html` into **3 plain-English epistemic brief types** while preserving a single-row sticky Topic filter bar (`All Topics`, `Medi-Cal & Claims`, `Community Health Workers`, `Food & Cost of Living`, `County Health Budgets`) that filters across all three sections:
  1. **1. What California Data Show** (`11` empirical California/Medicaid data briefs)
  2. **2. Program Cost & Impact Models** (`4` listed `"what-if"` cost and staffing models + `2` unlisted Paid Family Leave simulation models)
  3. **3. How to Check Policy Studies** (`7` practical evidence-review guides)
- Rolled out the spacious **3-Beat Executive Opening (`spec.openingBeats`)** and plain-English **Brief-Type Kicker (`spec.briefType`)** across **all 24 case studies** (`scripts/render_option_c.js`, `scripts/build_wave2_flagships.js`, `scripts/build_wave3_track1_track3.js`, `scripts/build_wave4a_track2.js`, `scripts/build_wave4b_track4.js`):
  - Replaced the ~205-word 2-paragraph opening prose wall (`policySettingHtml` + `answerHtml`) with 3 airy 2-sentence beats (`107–138` words total, ~40%–45% fewer opening words, increased top white space `pb-8 mb-10` / `mb-12`, and zero defensive top boxes or dataset code lists):
    - **Beat 1:** `In practice today:` (or `Upcoming rule in 2027:`)
    - **Beat 2:** `What California records show:` / `What Medicaid records show:` / `What county records show:` (Type 1), `What our model estimates:` (Type 2), or `What the comparison shows:` (Type 3)
    - **Beat 3:** `Policy option:` (non-prescriptive county, health-plan, and clinic options)
  - Updated `formatTable1RowLabel()` in `scripts/render_option_c.js` to preserve natural plain-English row qualifiers (`Assumed ...`, `Estimated ...`, `Modeled ...`, `Projected ...`) instead of stripping `"Modeled"` into `*`, and framed Table 2 `policyFit` rows as options (`Policy & Contracting Options`, `County & State Options`, `County Budget Options`, `Audit & Calibration Options`, etc.).
- Enforced `spec.briefType` and 3-beat `spec.openingBeats` as mandatory across all 24 modules in `scripts/render_option_c.js` and `scripts/audit_anti_cheat.js`, and verified with `npm run gate` (`validate-seo.js` 0 errors, `audit_anti_cheat.js` 24/24 PASS + `0` metaphors, `check_reading_level.js` 24/24 + hub PASS with `Mean Full FK = 7.53` and `Mean Narrative FK = 8.14`, `verify_case_study_figures.js` 0 errors, `npm test` 59/59 PASS).

### Files Modified
- `public/case-studies/index.html` and `public/case-studies/*/index.html` (all 24 case studies)
- `scripts/render_option_c.js`
- `scripts/audit_anti_cheat.js`
- `scripts/check_reading_level.js`
- `scripts/build_wave2_flagships.js`
- `scripts/build_wave3_track1_track3.js`
- `scripts/build_wave4a_track2.js`
- `scripts/build_wave4b_track4.js`
- `docs/CASE_STUDY_TEMPLATE_STANDARD.md`
- `docs/WORK_LOG.md`

---

## 2026-11-25: Codex Low-Reasoning All-Text Audit, Grade 7–8 Calibration & Zero-Metaphor Enforcement Across All 24 Case Studies + Hub

- **Conversation Link:** [CAPHE Case Studies `/clear-connected-writing` & Grade 7–8 Calibration (`6b755618-9257-4fa3-8968-1e4af84bdb41`)](conversation://6b755618-9257-4fa3-8968-1e4af84bdb41)
- **Transcript Path:** `/Users/vserver/.gemini/antigravity/brain/6b755618-9257-4fa3-8968-1e4af84bdb41/.system_generated/logs/transcript.jsonl`

### Completed
- Executed a 4-batch **Codex low-reasoning all-text review** (`codex exec -c model_reasoning_effort="low"`, `56,118` words covering 100% of `<title>`, `metaDescription`, `<h1>`, `.subtitle`, eyebrows, policy settings, analytical answer blocks, `Table 1` & `Table 2` headers/cells/notes, SVG charts, scenario cards, syntheses, FAQs, `<details>` methodology/endnote/TETS notes, related links, and the directory hub) and incorporated all valid clarity, Grade 7–8, and zero-metaphor improvements across **100% of text**:
  - **Mean Full-Page Flesch-Kincaid Grade (All Text incl. `<details>` & Scenario Cards):** **`7.42`** across all 24 case studies (range **`6.36–8.20`**, down from `14.88`; directory hub **`6.55`** with `0` items over `8.5`).
  - **Mean `<details>` Notes Flesch-Kincaid Grade:** **`7.57`** (range **`5.89–8.53`**, down from `11.10`).
  - **Mean `<h1>` Headline Grade:** **`7.22`** (range **`4.42–8.41`**, down from `13.09`).
  - **Mean Page `.subtitle` Grade:** **`7.50`** (range **`6.31–8.47`**, down from `11.65`), plus all inner section `<h2>` titles and section subtitles calibrated to **`<= 8.8`**.
  - **Mean Visible Narrative Flesch-Kincaid Grade:** **`7.51`** (range **`6.03–8.69`**, `ASL >= 10.0` words/sentence — natural, connected prose with zero choppy fragments).
- Expanded `scripts/check_reading_level.js` to include Scenario Cards and 100% of `<details>` prose (`Full <= 8.5`, `Det <= 8.8`, `Narr <= 8.8`, `<title>`/`<h1>`/`.subtitle <= 8.5`, `Section H2/Sub <= 8.8`, `Hub <= 8.5`), and expanded `METAPHOR_BAN_RE` in `scripts/audit_anti_cheat.js` to scan `<head>` title/meta, visible text, `<details>` notes (excluding verbatim `<a>` citation titles), and the directory hub (`0` metaphors throughout, including eliminating subtle metaphors such as `fall short`, `strain`, `spikes`, `jumps`, `rebuilds`, `sunsetted`, `food/mobility deserts`, `safety-net`, `flagship`, `handoffs`, `drop-offs`, `drift`, `pathways`, `ramp-up`, `surge`, `pays for itself`, and `swings`).
- Completed a full `/clear-connected-writing` and methodological precision pass across all 4 wave builders (`build_wave2_flagships.js`, `build_wave3_track1_track3.js`, `build_wave4a_track2.js`, `build_wave4b_track4.js`) and `render_option_c.js`:
  - Explained key mechanisms, model outcomes, and technical scales inline where introduced (e.g., `H.R. 1` Medicaid work-reporting rules, `0.50` random-chance vs. `0.724` AUC ranking score, CDC PLACES adult diabetes odds ratios across 408 tracts in `food-insecurity-diabetes`, full worker cost components vs. `"loaded cost"`, selection/collider bias on 2024 biller filters, DHCS vs. ACS rounding cross-checks, and why log transforms and untestable exclusion restrictions keep two-stage runs as appendix checks).
  - Eliminated all double negatives (`-X fewer`), synchronized 100% of `h1`, `related[*].title`, and hub card titles (`0` cross-link mismatches), matched `$1` vs. `$10` per-capita units on every regression slope and standard error, framed Census `B19013` minus `B25064` post-rent comparisons explicitly as area-median benchmarks rather than individual household CalFresh eligibility determinations, distinguished USDA ERS Food Access Research Atlas criteria (`15` Santa Clara tracts) from the stricter SNAP-centroid rule (`1` tract), reconciled locked Stage 1 QALY group totals (`18.21`, `17.49`, `4.34` -> `40.04` QALYs), and preserved every Stage 4 econometric and statutory qualification (`adj. p = 0.067`, illustrative conditional `if causal` VSL framing, and EDD's `25.0%` operational SDI reserve goal vs. `Cal. Unemp. Ins. Code § 984` statutory rate rules).
- Verified with `node scripts/check_reading_level.js` (`24/24` + hub PASS) and `npm run gate` (`validate-seo.js` 0 errors, `audit_anti_cheat.js` 24/24 PASS + `reading-level-gate` PASS, `verify_case_study_figures.js` 24/24 PASS, `npm test` 67/67 PASS).

### Files Modified
- `scripts/check_reading_level.js` (new deterministic Flesch-Kincaid readability gate)
- `scripts/audit_anti_cheat.js`
- `scripts/render_option_c.js`
- `scripts/build_wave2_flagships.js`
- `scripts/build_wave3_track1_track3.js`
- `scripts/build_wave4a_track2.js`
- `scripts/build_wave4b_track4.js`
- `public/case-studies/index.html` and `public/case-studies/*/index.html` (all 24 case studies)
- `docs/WORK_LOG.md`

---

## 2026-11-23: `/clear-connected-writing` Overhaul & Stage 4 Adversarial Audit Across All 24 Case Studies + Hub

- **Conversation Link:** [CAPHE Case Studies `/clear-connected-writing` & Title Overhaul (`6b755618-9257-4fa3-8968-1e4af84bdb41`)](conversation://6b755618-9257-4fa3-8968-1e4af84bdb41)
- **Transcript Path:** `/Users/vserver/.gemini/antigravity/brain/6b755618-9257-4fa3-8968-1e4af84bdb41/.system_generated/logs/transcript.jsonl`

### Completed
- Applied `/clear-connected-writing` across **all 24 CAPHE Public Health Case Studies** (`public/case-studies/*/index.html`), all their `<title>` (`<= 60` chars), `<h1>`, `.subtitle`, `.policy-setting`, `.answer-block`, `Table 1`, Scenario Cards, `Table 2`, standalone SVG chart captions, synthesis paragraphs, and FAQs, plus the main directory hub (`public/case-studies/index.html`).
- Fixed mechanical truncation and template meta-label bugs in `scripts/render_option_c.js`:
  - Removed destructive word-swap rules in `simplifyToGrade7()` and mid-sentence clause truncation in `stripRepeatedTable2Stem()`, widening `policySettingWords` (`20–115`), `answerWords` (`40–155`), and `separateTableSubtitle` (`<= 36` words).
  - Replaced `<details>` `Two-Ruler Benchmark Summary` and `Ruler 1/2` / `Mode A/B` prefixes with plain `Standard Screen vs. Adjusted Comparison`, and gated `estimatorCrosswalkHtml` strictly to the two county-budget estimator pages (`observational-to-experimental`, `reverse-causation-feedback`) rather than firing on `"Polsky"` / `"OLS"` substrings across unrelated pages.
  - Updated standalone SVG chart titles, subtitles, and captions (`#studyComparisonSvg`) so `Marin Canal Tract` (`17.7% -> 30.5%`) and `Central Fresno Tract` (`31.4% -> 46.4%`) match `Table 1` pre-rent vs. post-rent trajectories accurately.
- Rewrote `public/case-studies/index.html` (`<title>`, `.page-lead`, 4 `.topic-summary` lines, and all 22 listed `.item-title` + `.item-contrast` entries), fixing 6 prior dataset/topic mismatches (including moving `threat-history-solutions` under `medi-cal`, fixing `food-insecurity-diabetes` and `medicaid-expansion` descriptions, and keeping unlisted `selection-into-treatment` and `threat-maturation-solutions` off the public hub) with 100% exact `h1` parity across all hub items and `spec.related` cross-links.
- Executed Stage 4 independent Claude Opus adversarial review (`4` parallel batches covering all `24` slugs + hub + `render_option_c.js`) and applied all prose, framing, citation, and source-fencing corrections:
  - Corrected Brown (2014) DOI in `study-design-ladder` from `10.1002/hec.3031` (wrong article) to CrossRef-verified `10.1016/j.ehb.2013.10.001` (*Economics & Human Biology*).
  - Aligned `observational-to-experimental` and `reverse-causation-feedback` nominal pandemic spending (`$102.75 -> $168.70`, `+64.2%`) and mortality (`806.02 -> 970.80`) with `ajph_submission.tex`, recast annual (`-2.38`) vs. 13-year (`-4.32`) panel slopes strictly as differences between estimated observational associations across horizons (eliminating `"compounding"` / causal return claims across all county-budget briefs and the hub), kept `multiple-testing-adjusted p = 0.067` alongside every 13-year `4.32` headline, explicitly labeled all VSL dollar/ratio conversions (`$420,168`, `$231,481`, `$188,324`, `32.4:1` / `32:1`, `58.8:1` / `59:1`, `72.2:1`, `15.0:1–89.4:1`) as **illustrative valuations conditional on a causal interpretation**, and labeled Lewbel (2012) two-stage estimates as an appendix sensitivity check.
  - Clarified national HHS Medicaid claims scope and the post-final-claim `50.0-month` exclusion lag in `measurement-error-claims`; reframed `collider-bias` and `classifying-causal-mechanisms` so full-list `0.724` (`0.653` exit-reweighted) vs. active-2024 `0.442` accurately reflects exit-timing inflation and zero live prospective signal on public claims alone.
  - Fixed Marin `220% FPL` recommendations in `food-affordability-tradeoffs` and `food-insecurity-diabetes` (replacing CalFresh excess-shelter deductions above California's `200% FPL` gross limit with clinic produce prescriptions and local food vouchers), distinguished EDD's `25.0%` operational SDI reserve adequacy benchmark (`25%–50%` target range, not a statutory minimum) from statutory contribution-rate authority under `Cal. Unemp. Ins. Code § 984` (`1.5%` rate ceiling) across `render_option_c.js`, `budget-impact`, `threat-maturation-solutions`, and `public/case-studies/index.html`, fixed `+109%` -> `+101%` shift in `parallel-trends-power`, `"Unrecorded medical frailty"` in `medicaid-expansion`, and `Parallel Health-Year and Saved-Life Units...` in `measuring-health-common-unit`.
  - Preserved locked Stage 1 pipeline figures and proportional `barWidth` invariants enforced by `scripts/verify_case_study_figures.js` and `test/*.test.js` (flagging upstream PFL simulator/CHW/QALY/churn table recalculations for separate owner Stage 1 data-lock decision if desired).
- Verified with `npm run gate` (`validate-seo.js` 0 errors, `audit_anti_cheat.js` 24/24 PASS, `verify_case_study_figures.js` 24/24 PASS, `npm test` 66/66 PASS) and custom cross-link/prose/meta-label scanner (`0` issues across all 24 pages + hub).

### Files Modified
- `scripts/render_option_c.js`
- `scripts/build_wave2_flagships.js`
- `scripts/build_wave3_track1_track3.js`
- `scripts/build_wave4a_track2.js`
- `scripts/build_wave4b_track4.js`
- `public/case-studies/index.html` and `public/case-studies/*/index.html` (all 24 case studies)
- `docs/WORK_LOG.md`

---

## 2026-11-01: Deploy 24 Plain-English PHO Case Studies & Selective Non-Stacked SVG Charts (Heroku v237)

- **Conversation Link:** [CAPHE 24 Case Studies Build & Deployment (`b378d7ce-ffef-403d-86d8-d73c4162621b`)](conversation://b378d7ce-ffef-403d-86d8-d73c4162621b)
- **Transcript Path:** `/Users/vserver/.gemini/antigravity/brain/b378d7ce-ffef-403d-86d8-d73c4162621b/.system_generated/logs/transcript.jsonl`

### Completed
- Rebuilt all **24 CAPHE Case Studies** (`public/methods-lab/*/index.html`) around a unified Public Health Officer (PHO) decision architecture:
  1. **The Policy Setting:** Concrete California policy context, operational mechanisms, and full expansion of technical/program acronyms on first use.
  2. **Analytical Answer Block (`60–120` words):** Direct answer to the title question with verified magnitudes and inline `[N]` citations resolving to `#ref-N`.
  3. **Table 1 (Observed Baseline Comparison):** Plain-English column headers, `Baseline Measure` corner label, `Observed Data` vs. `Assumed Input` row tags, inline proportional mini-bars on the highlighted comparison row, and expandable calculation notes.
  4. **Selective Standalone Non-Stacked SVG Comparison Charts (`6` of `24` modules):**
     - `chw-health-outcomes` (interactive 58-county calculator + `#chwCostOffsetSvg` 3-bar horizontal comparison against `1x Worker Cost`, keeping 2-year QALYs separate).
     - `food-insecurity-diabetes` & `food-affordability-tradeoffs` (paired pre-rent vs. post-rent monthly food share bars against the `30%` post-rent budget stress line).
     - `medicaid-expansion` (paired total six-month coverage losses vs. avoidable paperwork losses in adult counts).
     - `cost-effectiveness-ratio` (`4` accounting horizons plotted against the `$50,000 / QALY` strict value benchmark).
     - `threat-maturation-solutions` (paired `2026` vs. `2030` SDI reserve ratio bars relative to `0%` and the `25.0%` prudent reserve floor).
     - Kept the remaining **18 case studies** table-first without standalone chart duplication.
  5. **Scenario Cards & Table 2 (Sensitivity & Policy Stress Test):** Plain-English translations of all econometric shorthand (`TWFE`, `OLS`, `2SLS`, `Long-Diff`, `ICER`, `NMB`, `BCR`, `GPCI`, `MACPAC`, `VSL`, `M* = 0.35`, `ΔR²`).
- Verified with `npm run gate` (`58/58` tests + `validate-seo.js` PASS) and `node scripts/audit_anti_cheat.js` (`24/24` modules PASS).
- Deployed to production on `master` (commit `481661b`, Heroku Release `v237` at `https://www.caphegroup.org/methods-lab`) while preserving the offline state of the LHA ROI Calculator (`c9fcead`) and backing up the full branch on `claude/lha-calculator-ajph-v2` (`27c3ef1`).

### Files Modified
- `docs/CASE_STUDY_TEMPLATE_STANDARD.md` — codified selective visualization (`Rule V1–V3`), plain-English PHO prose rules, and ledger purity.
- `scripts/render_option_c.js` — shared template renderer, plain-English table cell/header sanitizer, and selective SVG chart generator.
- `scripts/build_wave2_flagships.js`, `scripts/build_wave3_track1_track3.js`, `scripts/build_wave4a_track2.js`, `scripts/build_wave4b_track4.js` — spec definitions for all 24 case studies.
- `scripts/audit_anti_cheat.js`, `test/answer-block.test.js` — automated governance and DOM verification gates.
- `public/methods-lab/*/index.html` — all 24 rendered case study HTML pages.

---

## 2026-06-11: Reschedule "ROI in Public Health" Webinar (June 11 → June 18)

### Completed
- Checked registrations for today's noon webinar: 5 registrants on Brevo list id=17 ("6/11, 12-1pm: Return on Investment in Public Health") — Jeffrey Hoch (UC Davis), Cheryl Holzmeyer (CDPH), Carolina Guzman (Alameda County), Jack Anderson (CHEAC), Jenna LeComte-Hinely (HARC).
- Drafted a truthful postponement/reschedule notice (saved to `~/Desktop/CAPHE_webinar_postponement_2026-06-11.txt`); Victoria emailed the 5 registrants.
- Moved the event to 2026-06-18 (same 12–1pm PT slot) with a "Rescheduled from June 11 to June 18" description note; deployed to Heroku and verified live on www.caphegroup.org.

### Files Modified
- `data/events.json` — ROI webinar date 2026-06-11 → 2026-06-18, description prefixed with reschedule note (commit 1f7362d).

### Decisions Made
- Declined a fabricated "speaker family emergency" reason: no speaker on record for the event, and a specific invented personal crisis carries reputational risk with these named professional contacts in a small CA health-econ community. Used "circumstances beyond our control" + concrete new date instead.
- Rescheduled (kept event live, edited date) rather than deleting the event, so the site stays accurate and registrations carry over.
- Registrants BCC'd (not To) in the draft to avoid exposing peers' addresses to each other.

### Next Steps
- Before June 18: send the Teams join link to the 5 registrants (email promised it would carry over).
- Optional cleanup: rename Brevo list id=17 from "6/11…" to "6/18…" to avoid future confusion.

### Extracted Artifacts
- None. Noted that a per-event registrant check via Brevo list could become a `caphe-update` skill phase if it recurs; one occurrence not enough to extract.

## 2026-03-09: SEO Performance Audit + 4-Stream Improvement Sprint

### Completed
- Full performance audit: GA4 (178 sessions/28d, 81% direct, 6% organic) + GSC (7 clicks total, ~150 impressions)
- Stream A: Removed .html from all internal links across 76 files (62 HTML + 9 JS/server + scripts)
- Stream B: Optimized meta titles/descriptions on 10 Methods Lab pages with GSC impressions but 0 clicks
- Stream C: Added Article + LearningResource JSON-LD schema to all 37 Methods Lab pages via batch script
- Stream D Phase 1: Built county-to-HRR crosswalk (58 counties → 24 HRRs) from Dartmouth Atlas + Census data
- Added OG tags to 10 Methods Lab pages
- Committed HSR revision files (exhibit tables, revised manuscript)
- Deployed v209

### Files Modified
- 76 files across `public/`, `src/`, `scripts/` — .html link cleanup
- 10 `public/methods-lab/*/index.html` — meta title/description rewrites + OG tags
- 37 `public/methods-lab/*/index.html` — Article + LearningResource JSON-LD injection
- `scripts/add-article-schema.py` — NEW: batch schema injection (idempotent)
- `scripts/build-hrr-crosswalk.py` — NEW: Dartmouth/Census crosswalk builder
- `data/access-explorer/county_hrr_crosswalk.json` — NEW: 58 counties → 24 HRRs
- `src/backend/server.js` — cleaned .html from redirect URLs

### Decisions Made
- Article schema uses dual type `["Article", "LearningResource"]` for richer SERP treatment + educational semantics
- Author attribution: CAPHE (organization), not personal — these are institutional tools
- Dates omitted from schema (no reliable publish/modify tracking)
- Riverside manually assigned to Palm Springs/Rancho Mira HRR (preserves distinct Dartmouth HRR #69)

### Next Steps
- Monitor GSC over next 2-4 weeks for indexing of clean URLs and schema pickup
- Stream D Phases 2-4: HRR aggregation in build script, frontend toggle, QI checks
- Add OG tags to remaining 27 Methods Lab pages (only 10 done this session)
- Add Article schema to other site pages (tools, recordings, etc.)
- Request GSC re-indexing of .html variant pages to speed deindexing

### Extracted Artifacts
- `scripts/add-article-schema.py` — reusable for new lab pages

---

## 2026-02-21: HSR Manuscript — Final Corrections, Submission, SSRN Prep

### Completed
- Applied hallucination corrections #6 (FQHC "cost-based" → "prospective...cost-related payment system"), #7 (FQHCs "disproportionately urban" → "serve both urban and rural communities"), #8 (1115 waiver "2% increases" → "2 percentage points in the rate ratio")
- Verified MACPAC Ref 10 against actual PDF — found 2 fabricated statistics (1.25pp elasticity, 87.4% vs 52.0% acceptance rates), removed both and replaced with what the report actually says
- Corrected author credential: MPP → PhD across all manuscript files
- Created title-page.docx for ScholarOne double-blind submission
- Submitted manuscript to HSR via ScholarOne (Research Brief, submitted Feb 20)
- Created SSRN version: LaTeX source → 17-page PDF (Times, double-spaced, all 4 exhibits inline)
- SSRN PDF uses CAPHE-only affiliation (no Berkeley/email)
- Set up publication tracker: 3 manuscripts tracked (HSR submitted, SNAP submitted to JPAM, Income Dynamics under review at JRS)
- Copied all submission files to Desktop for easy Chrome upload

### Files Modified
- `docs/hsr-research-brief.md` — Corrections #6, #7, #8; MACPAC stats removal; MPP→PhD
- `docs/hsr-submission/manuscript.docx` — Regenerated 3x (after corrections, MACPAC fix, PhD fix)
- `docs/hsr-submission/manuscript-blinded.docx` — Regenerated in parallel
- `docs/hsr-submission/cover-letter.docx` — Regenerated in parallel
- `docs/hsr-submission/title-page.docx` — NEW: separate title page for double-blind
- `docs/hsr-submission/main_text_ssrn.tex` — NEW: LaTeX source for SSRN
- `docs/hsr-submission/main_text_ssrn.pdf` — NEW: 17-page SSRN PDF
- `docs/hsr-submission/SUBMISSION_CHECKLIST.md` — Added hallucination review section
- `~/.claude/projects/-Users-victoriaperez/memory/publications.json` — HSR submitted, SNAP + Income Dynamics added
- `~/.claude/projects/-Users-victoriaperez/memory/journals.json` — HSR, JPAM, JRS entries

### Decisions Made
- SSRN affiliation: CAPHE only (no Berkeley, no email) — brand-focused
- JEL codes: I11, I13, I18
- SSRN classifications: Health Economics (primary), Public Economics (secondary)
- Post as working paper, not published/accepted

### Next Steps
- Upload SSRN PDF via Chrome Claude (file on Desktop, prompt provided)
- Update publications.json with SSRN abstract_id once posted
- Monitor HSR ScholarOne for status changes (expect 8-12 weeks)
- Access Explorer: implement specialty rankings panel (plan exists)

### Extracted Artifacts
- None this session

---

## 2026-02-16: Homepage Redesign — What's New Section with Tag Filters

### Completed
- Redesigned homepage from 5 sections to 3: Hero → What's New → Mission
- Removed "What We Do" (Workshops/Webinars/Working Groups cards) — redundant with nav
- Removed "Upcoming Events" section — folded into What's New cards
- Built "What's New" section with filterable tag pills (All / Tools / Events / Learning)
- 5 cards: Access Explorer, CEA Basics webinar, Methods Lab, ROI Calculator, Health Econ recording
- Synthesized hero subtitle merging old hero + "What We Do" copy into single statement
- Removed hero CTA buttons (redundant with nav bar)
- Added ItemList schema for tools (GEO/AI discoverability)
- Added Access Explorer to sitemap.xml (was missing entirely) and llms.txt
- Iteratively tightened spacing: hero padding, card sizes, tag pills, section gaps
- CSS cache-bust across all pages (style.css?v=N)
- Deployed v181 (initial redesign); spacing refinements pending deploy

### Files Modified
- `public/index.html` — Full homepage restructure, ItemList schema, tag filter JS
- `src/frontend/css/style.css` — .filter-tag, .card-badge, .whats-new-card, #whats-new/#mission spacing
- `public/sitemap.xml` — Added Access Explorer URL, updated homepage lastmod
- `public/llms.txt` — Added Access Explorer entry under Key Resources
- 60+ files — CSS cache-bust (style.css?v=N)

### Decisions Made
- Two agents (UX + GEO) both recommended Option C (Tools section + Latest section), but user preferred single compact "What's New" section with tag filters to reduce scrolling
- Removed hero CTA buttons — nav already has "Join CAPHE" and program links
- Card descriptions trimmed to one line each for compact layout
- "Stay Up to Date — Sign Up Free" CTA links to community membership signup (future newsletter channel)
- Filter tags use pill-button UI with color-coded card badges (green=Tool, blue=Event, orange=Learning)

### Next Steps
- Deploy spacing refinements (v182)
- Continue HRR Market Area view implementation (plan at ~/.claude/plans/rustling-napping-lemon.md)
- Build county-to-HRR crosswalk (Phase 1 of plan)
- Post LinkedIn draft for Access Explorer (at /tmp/linkedin-access-explorer-v2.md)
- Article schema on 37 Methods Lab pages (deferred from Feb 14)

### Extracted Artifacts
- None this session

---

## 2026-02-15: Access Explorer — Participation Rate Reframe + LinkedIn Post

### Completed
- Reframed entire Access Explorer from "phantom network detection" to "Medicaid participation rate measurement"
- Key methodological distinction: NPPES = all licensed providers (full pool), not Medicaid directory listings. A provider absent from Medicaid billing may never have opted in. Phantom networks (Zhu et al. 2023) use plan directory listings as the denominator.
- Updated meta descriptions (3 tags), WebApplication schema, FAQPage schema (3 entries), About section (2 subsections rewritten), 2 FAQ entries
- Fixed specialty FAQ: "highest phantom rates" → "lowest Medicaid participation rates"
- Fixed duplicate footer (two copyright lines → one clean line)
- Drafted and style-passed LinkedIn post (117 words) tied to Feb 14 HHS/DOGE Medicaid data release (10.3 GB, opendata.hhs.gov)
- Deployed v178 (reframe) and v179 (footer fix) to Heroku

### Files Modified
- `public/tools/access-explorer/index.html` — Meta descriptions, schema, About section, FAQ entries, specialty FAQ, footer dedup

### Decisions Made
- Tool measures participation rates, not phantom networks — NPPES captures all licensed providers, not Medicaid-specific directories
- Kept phantom network discussion in About section as context ("What this measures and what it doesn't") rather than removing entirely
- Removed #PhantomNetworks from LinkedIn hashtags
- HHS data release (Feb 14, 2026) used as LinkedIn post hook

### Next Steps
- Post LinkedIn draft (at /tmp/linkedin-access-explorer-v2.md)
- Continue HRR Market Area view implementation (plan at ~/.claude/plans/rustling-napping-lemon.md)
- Build county-to-HRR crosswalk (Phase 1 of plan)
- Add QI checks script (Phase 4 of plan)

### Extracted Artifacts
- None this session

---

## 2026-02-14: GEO Optimization — Schema Markup, OG Tags, AI Crawler Directives

### Completed
- Ran full GEO audit (score: 28/100) identifying zero schema, zero OG tags, no AI directives
- Implemented Tier 1+2 GEO recommendations across 62 files
- Added Organization JSON-LD to homepage and about page
- Added WebApplication + FAQPage JSON-LD to ROI Calculator
- Added VideoObject JSON-LD to recordings page
- Added OG + Twitter Card + og:image meta tags to 12 public pages
- Created `llms.txt` at site root for AI crawler discoverability
- Updated `robots.txt` with GPTBot, ClaudeBot, PerplexityBot, Google-Extended directives
- Added static FAQ section with methodology summary to ROI Calculator page
- Updated sitemap: ROI Calculator priority 0.7 → 0.9, recordings 0.7 → 0.8
- Fixed copyright year 2025 → 2026 across 57 files
- Updated meta descriptions (homepage, about, recordings)
- Fixed canonical URL on recordings page (removed .html extension)
- Deployed as v170-v171 to Heroku
- Validated: Rich Results Test detected schemas, Facebook Debugger confirmed OG tags
- Investigated tooearlytosay.com DNS error in Rich Results Test — confirmed site is indexed fine via GSC API (tool bug, not real issue)

### Files Modified
- `public/robots.txt` — AI crawler Allow directives
- `public/llms.txt` — NEW: AI discoverability file
- `public/sitemap.xml` — Regenerated with current dates and updated priorities
- `scripts/generate-sitemap.js` — Added ROI Calculator (0.9) and recordings (0.8) to PRIORITY_MAP
- `public/index.html` — Organization JSON-LD, OG tags, og:image, updated meta description, "Last updated" date
- `public/about.html` — Organization JSON-LD, OG tags, og:image, updated meta description
- `public/tools/lha-calculator/index.html` — WebApplication + FAQPage JSON-LD, OG tags, og:image, static FAQ section, copyright fix
- `public/recordings.html` — VideoObject JSON-LD, OG tags, og:image, updated meta description, canonical fix, "Last updated" date
- `public/methods-lab/index.html` — OG tags, og:image, "Last updated" date
- `public/programs.html` — OG tags, og:image
- `public/resources.html` — OG tags, og:image
- `public/membership.html` — OG tags, og:image
- `public/membership/community.html` — OG tags, og:image
- `public/membership/professional.html` — OG tags, og:image
- `public/contact.html` — OG tags, og:image
- `public/past-events.html` — OG tags, og:image
- `public/terms.html` — Citation year fix, copyright fix
- 57 files total — Copyright year 2025 → 2026

### Decisions Made
- Use `logo.png` (1024x1024) as og:image — not ideal aspect ratio for social preview but better than nothing
- Skip `fb:app_id` — non-critical, only needed for Facebook Insights analytics
- Skip Article schema on 37 Methods Lab pages — deferred to next month (separate effort)
- Skip author attribution — deferred to next quarter
- Heroku remote is `origin` (not `heroku`) — must use `git push origin master`

### Next Steps
- Add Article JSON-LD to 37 Methods Lab pages (template-based batch)
- Add author/expert attribution to Methods Lab articles
- Add text summaries + speaker credentials to recordings page
- Add FAQ sections to top 5-10 Methods Lab pages
- Build external entity signals (Wikipedia, Wikidata) to resolve CAPH/CAPHE name collision
- Create proper 1200x630 OG social image
- Monthly monitoring: test 10 AI prompts across ChatGPT, Claude, Perplexity (see audit)

### Extracted Artifacts
- None this session (geo-optimization-expert agent already exists)

---

## 2026-01-20: County ROI Report PDF - Style Spec Alignment & Header Redesign

### Completed
- Implemented Phase 2 style specification alignment for PDF reports
- Redesigned header with actual CAPHE logo (California silhouette + arrow + cross)
- Added gradient divider (blue → gold) and navy title block
- Added metric card subtitles explaining each metric for non-economists
- Added plain-language methodology section with coefficient context
- Added limitations acknowledgment
- Workshopped and added research partnership callout to footer
- Created `/caphe-report` skill for future report generation
- Created `/session-exit` skill for structured session closeout

### Files Modified
- `src/backend/report-templates/report-full.html` - Executive headline, metric subtitles, methodology improvements, research callout
- `src/backend/report-templates/report-styles.css` - New header design, subtitle styles, callout boxes
- `src/backend/pdf-generator.js` - Embedded actual CAPHE logo as base64
- `~/.claude/skills/caphe-report/SKILL.md` - NEW: Skill for CAPHE report generation
- `~/.claude/skills/session-exit/SKILL.md` - NEW: Skill for session closeout workflow
- `~/.claude/SKILLS_INVENTORY.md` - Added both skills

### Decisions Made
- Use actual logo PNG (not SVG placeholder) - professional quality matters
- Research callout copy: "Interested in deeper analysis? CAPHE is conducting ongoing research into ROI variation across program areas. Partner with us and receive more detailed, individualized findings for your county."
- Style spec is source of truth for all CAPHE content

### Next Steps
- Test PDF with screen reader (VoiceOver)
- Verify email delivery with attachment
- Run Lighthouse accessibility audit on HTML template

### Extracted Artifacts
- `/caphe-report` skill
- `/session-exit` skill
