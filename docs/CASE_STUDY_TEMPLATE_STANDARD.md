# CAPHE Case Studies — Canonical Template & 4-Stage Factory Standard

**Effective Date:** November 1, 2026  
**Enforced By:** [`scripts/render_option_c.js`](../scripts/render_option_c.js), [`scripts/audit_anti_cheat.js`](../scripts/audit_anti_cheat.js), [`scripts/verify_case_study_figures.js`](../scripts/verify_case_study_figures.js), [`test/answer-block.test.js`](../test/answer-block.test.js), and [`docs/CLAUDE_ADVERSARIAL_REVIEW_PROMPT.md`](./CLAUDE_ADVERSARIAL_REVIEW_PROMPT.md).

---

## 1. Purpose, Audience & Voice

CAPHE Case Studies (`https://www.caphegroup.org/case-studies/{slug}`) are decision briefs written for **California County Public Health Officers (PHOs), Health Agency Directors, County Administrative Office (CAO) budget analysts, Medi-Cal Managed Care Plan (MCP) medical directors, and legislative staff**.

- **Core Question Every Case Study Answers:** *"What is the policy or budget decision on our desk, why does the standard snapshot or raw average mislead us, what does the properly structured comparison show, and what changes operationally as a result?"*
- **Voice & Readability:**
  - Institutionally neutral, direct, and grounded in real California administrative programs (Medi-Cal CalAIM SPA 22-0001, DHCS redetermination funnels, HCAI inpatient discharges, CDPH vital statistics, SCO county financial transactions, EDD Paid Family Leave, USDA/CDSS CalFresh EBT registries).
  - Target natural **Grade 7–8** plain English. Write clear, idiomatic sentences for busy executives—never use mechanical word-ban workarounds or baby-talk synonyms, and never leave undefined econometric or bureaucratic shorthand in visible reader surfaces.
  - **Expand Acronyms on First Use:** Always spell out program, agency, and technical acronyms on first visible appearance (`Community Health Worker (CHW)`, `Quality-Adjusted Life Year (QALY)`, `Value of a Statistical Life (VSL)`, `Geographic Practice Cost Index (CMS Practice Expense GPCI)`, `Medicaid and CHIP Payment and Access Commission (MACPAC)`).
  - **Plain-English Labels in Visible Surfaces:** Translate econometric shorthand (`TWFE` $\rightarrow$ `County & Year Panel`, `OLS` $\rightarrow$ `Unadjusted Model` / `13-Yr Cumulative`, `Long-Diff 2SLS` $\rightarrow$ `13-Yr Routine-Budget IV`, `ICER` $\rightarrow$ `Net Cost per QALY`, `NMB` $\rightarrow$ `Net Health Value`, `ΔR²` $\rightarrow$ `unique spread`) in all visible prose, table headers, cells, and scenario cards. Keep formal estimator names and test statistics (`SE`, `p`, `F`, `95% CI`, `R²`) inside the collapsible `<details>` notes.

---

## 2. Page Architecture (Top to Bottom)

Every case study compiled by `scripts/render_option_c.js` follows a 6-part vertical layout:

1. **Header Block:**
   - **Eyebrow (`.track-eyebrow`):** Track name + plain-English method tag.
   - **Headline (`<h1>`, $\le 60$ chars `<title>`):** A complete, stat-free declarative sentence stating the policy or analytical takeaway (`Per-Visit Medi-Cal Rates Cover Only a Small Fraction of County Living-Wage CHW Salaries`). Zero digits, dollar signs, percentages, or question marks in `<h1>`.
   - **Subtitle (`.subtitle`, `12–22` words):** One plain-English, number-free sentence stating what the case study compares.
2. **Two-Part Executive Opening:**
   - **Paragraph 1 — The Policy Setting (`<p class="policy-setting">`, `2–3` sentences, 0 study stats):** Plain-English introduction to the California program, statutory rule, or routine county workflow so a cold reader understands the policy context before hitting any numbers.
   - **Paragraph 2 — Analytical Answer Block (`<p class="answer-block">`, `60–120` words, clickable `[1]..[3]` endnotes):**
     1. *Operational Decision Hook:* The practical decision challenge on a county director's desk.
     2. *Statewide Baseline or Structural County Test Case:* Why the 58-county baseline or specific county contrast matters.
     3. *Parallel Metric Pairing on Identical Units:* The naive/unadjusted figure vs. the decomposed/adjusted figure in the exact same unit.
     4. *Operational Takeaway:* What that split changes for staffing, targeting, or contracting.
3. **Table 1 — Observed Baseline & Estimator Comparison (`#quantitativeComparisonTable`):**
   - Corner header: `Baseline Measure`.
   - 4 named archetype or estimator columns (`col.title` in `<thead>`; technical sample/tract details routed to collapsible `Table 1 Notes`).
   - Explicit row-level provenance tags: `Observed Data`, `Assumed Input` (for hypothetical caseload/budget parameters), or `*` (for modeled outputs).
   - Inline proportional mini-bars (`.inline-mini-bar`) on the primary comparison row.
   - Collapsible `<details>` **Table 1 Notes** containing the estimator crosswalk, sample size (`N`), standard errors, $p$-values, and 95% confidence intervals.
4. **Selective Standalone Non-Stacked SVG Comparison Chart (`Rules V1–V3` — 6 Whitelisted Modules Only):**
   - **Rule V1 (Earned Space):** Render a standalone SVG chart **only** when it shows a multi-row comparison or plots values against an external policy threshold that `Table 1`'s single-row mini-bars cannot show at a glance:
     1. `chw-health-outcomes`: 58-county interactive calculator + 3-bar horizontal comparison (`#chwCostOffsetSvg`) of Worker Cost, Direct Medi-Cal Visit Pay, and Year-1 Hospital Savings against the dashed `1x Worker Cost` breakeven line (with two-year QALYs in a separate callout below).
     2. `food-insecurity-diabetes` & `food-affordability-tradeoffs`: Paired pre-rent vs. post-rent monthly food share bars against the `30%` post-rent budget stress reference line.
     3. `medicaid-expansion`: Paired total six-month coverage losses vs. avoidable paperwork losses in adult counts.
     4. `cost-effectiveness-ratio`: Cost per healthy year gained (`$/QALY`) across the 4 accounting horizons against the `$50,000 / QALY` strict benchmark line.
     5. `threat-maturation-solutions`: Paired `2026` onset vs. `2030` Year-6 SDI reserve ratio bars relative to `0%` and the `25.0%` prudent reserve floor.
   - **Rule V2 (Hard Ban on Stacked Bar Charts):** Never use stacked bar charts (`100%` stacked or absolute stacked) anywhere on CAPHE.
   - **Rule V3 (18 Table-First Modules):** Keep the remaining 18 case studies table-first without standalone chart duplication.
5. **Scenario Comparison Cards (`.scenario-grid`) & Table 2 (`#policyFitTable`):**
   - Side-by-side Scenario Cards (`N = 3–4`) showing the scenario label, action/assumption title, primary metric on the baseline scale, and a 1-sentence operational takeaway, with secondary scale crosswalks inside a collapsible `<details>` footer.
   - **Table 2 (Sensitivity & Policy Fit Matrix):** Short, scannable cells ($\le 22$ words per cell) comparing how conclusions hold up across assumptions or sub-populations. For the 5 Class A Financing/CEA modules (`chw-health-outcomes`, `budget-impact`, `measuring-health-common-unit`, `cost-effectiveness-ratio`, `sensitivity-analysis-cea`), include a `"Where the Return Shows Up"` row instead of mechanical `Perspective:` badges.
6. **Collapsible Provenance, Synthesis, FAQs & Enumerated Endnotes (`<details id="data-sources-endnotes">`):**
   - Full data provenance, model inputs, 2-paragraph policy synthesis, 3+ FAQs (wired to `FAQPage` JSON-LD), and numbered `#endnote-N` references with `>= 4` external primary source links.

---

## 3. Non-Negotiable Data & Econometric Integrity Rules

1. **Zero Synthetic Data:** Every number must trace to an authentic, verified California or federal empirical source file on disk (`scripts/verify_case_study_figures.js`).
2. **Strict Ledger Purity:** Never add Year-1 cash flows (fee-for-service visit revenue, hospital bed-day savings) to multi-year monetized health gains (`QALYs` or `VSL`) into a single summed dollar figure. Report Year-1 cash flows and multi-year health gains on separate rows.
3. **Explicit Model Input vs. Finding Separation:** Hypothetical scenario parameters (`55 patients/yr`, `150 adults across 10 ZIP codes`, `$1.93M Year-1 budget`) must be labeled as `Assumed Input` / `Model Input` and never described as empirical findings.
4. **Econometric Identification Fencing:** Match verbs to the study's identification design (`tier1_causal` panel/IV designs vs. `tier2_decomposition` administrative funnels vs. `tier3_cross_sectional` tract accounting vs. `tier4_modeled_fiscal` CEA simulations).

---

## 4. The 4-Stage CAPHE Case Study Factory

Whenever creating a new case study or revising an existing one, execute these 4 stages in order:

### Stage 1 — Data & Provenance Lock (`scripts/verify_case_study_figures.js`)
- Register the authoritative source files (JSON, CSV, TeX) and exact derived tokens and `Table 1` proportional `barWidth` values in `scripts/verify_case_study_figures.js`.
- Classify every row as `Observed Data`, `Assumed Input`, or `Modeled Estimate`.

### Stage 2 — Spec Authoring & Compilation (`scripts/build_wave*.js` $\rightarrow$ `scripts/render_option_c.js`)
- Update or add the module spec in the appropriate `scripts/build_wave*.js` file and compile via `node scripts/build_wave*.js`.

### Stage 3 — Deterministic Gate (`npm run gate`, `< 1 second`)
- Run `npm run gate`, which executes:
  1. `node scripts/validate-seo.js` (SEO, titles, canonicals, sitemaps)
  2. `node scripts/audit_anti_cheat.js` (DOM structure, endnote resolution, zero stacked bars, ledger purity, 6-module chart whitelist, chart-to-Table 1 number sync, zero `Ruler`/`Mode` meta-labels, zero unexpanded `TWFE`/`2SLS`/`ICER`/`NMB` shorthand in visible text)
  3. `node scripts/verify_case_study_figures.js` (code-to-figure mathematical verification across all 24 modules and the hub page)
  4. `npm test` (`58` unit, accessibility, routing, and JSON-LD tests)

### Stage 4 — Independent Claude Adversarial Review (`docs/CLAUDE_ADVERSARIAL_REVIEW_PROMPT.md`)
- Run `/Users/vserver/.local/bin/claude -p --model opus` with `docs/CLAUDE_ADVERSARIAL_REVIEW_PROMPT.md` against the compiled HTML and spec.
- Automatically apply any `BLOCKER` or `MAJOR` corrections to the spec/renderer, re-run `npm run gate`, and record the disposition in `docs/WORK_LOG.md`.
