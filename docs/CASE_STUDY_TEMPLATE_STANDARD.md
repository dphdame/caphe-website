# CAPHE Methods Lab — Canonical Case Study Template Standard

**Effective Date:** October 31, 2026  
**Enforced By:** [`scripts/render_option_c.js`](../scripts/render_option_c.js) & [`scripts/audit_anti_cheat.js`](../scripts/audit_anti_cheat.js) + [`test/answer-block.test.js`](../test/answer-block.test.js)

---

## 1. Block 1 Header: Direct Declarative, Stat-Free `<h1>` & Plain-English, Number-Free Subtitle

### Rule 1A — Direct Declarative, Insight-First, Stat-Free `<h1>` (`Rule 20b`)
- State the module's main policy/method takeaway as a complete, independent declarative sentence (`Subject + Finite Active Verb + Policy Takeaway`) in plain words.
- **Zero Numbers, Percentages, or Dollar Figures in `<h1>` (`Rule 20b`):** Never put forgettable decimals, percentages, dollar figures, or raw counts (`88.5%`, `62.2%`, `30.7%`, `9.16`, `$36,089`, `6% to 11%`) in `<h1>`. Keep all exact empirical statistics inside the Executive Answer Block, Ruler cards, and Table 1.
- **Forbidden `<h1>` Starters:** Never open an `<h1>` with `"Case Study:"`, `"Why"`, `"How"`, `"When"`, `"What"`, or an `-ing` process verb (`"Evaluating"`, `"Unpacking"`, `"Untangling"`, `"Accounting for"`, `"Separating"` when used as a gerund fragment), and never end `<h1>` with a question mark (`?`).
- Use the Eyebrow (`CAPHE Case Studies · Track X`) to indicate the track and module type.

### Rule 1A.2 — Plain-English, Number-Free Subtitle (`12–22 Words`, `Rule 20b`)
- The `.subtitle` explains what the module compares and why it matters for a decision in one clean sentence (`12–22` words).
- **Zero Numbers, Percentages, or Dollar Figures in `.subtitle`:** Never duplicate Table 1 numbers or sample counts in `.subtitle`.
- **Zero `"California Case:"` / `"Medicaid Case:"` Prefixes in `.subtitle`:** Every module on CAPHE is a California public health economics case study; never open `.subtitle` with `"California Case:"` or `"California Case (...):"`.
- **Ban Internal `Mode A` / `Mode B` Jargon From All Visible Reader Surfaces (`Rule 5` & `Rule 5b`):** `Mode A` and `Mode B` are internal provenance classifications and must appear **only** inside the collapsed `<details>` provenance accordion—never in `.track-eyebrow`, `.subtitle`, `.answer-block`, Ruler titles, Table 1/2 headers or subtitles, or interactive scenario selectors. Use reader-facing labels (`Group 1`..`Group 4`, `Scenario 1`..`Scenario 4`, `Modeled`, `Observed`) in visible surfaces.

### Rule 1B — Zero Inanimate-Agent Anthropomorphic Metaphors (`Rule 20a`)
- Mathematical formulas, thresholds, spending averages, and data tables are inanimate objects; they do not act like people.
- **Forbidden Anthropomorphic Verbs in `<h1>`, Subtitle, and `.answer-block`:**
  - `hides`, `hide`, `masks`, `mask`, `misses`, `miss`, `missing`, `skews`, `skew`, `overlooking`, `overlooks`, `chasing`, `treats ... as if`.
- **Required Literal Mathematical / Operational Replacements:**
  - Instead of *"X hides / masks the return"* $\rightarrow$ *"Combining X and Y in the same annual total offsets / dilutes the estimated return"*.
  - Instead of *"Gross-income cutoffs miss high-rent strain"* $\rightarrow$ *"Gross-income cutoffs exclude housing costs"*.
  - Instead of *"Single-statewide fee schedules miss local costs"* $\rightarrow$ *"Single-statewide fee schedules omit local cost and need differences"*.
  - Instead of *"Filtering to active billers skews risk"* $\rightarrow$ *"Restricting the sample to active billers omits earlier-exiting sanctioned providers"*.
  - Instead of *"Total counts treat paperwork delays as if..."* $\rightarrow$ *"Total counts combine paperwork delays with income-ineligible exits in a single figure"*.

### Rule 1C — 4-Tier Econometric Identification Fence (`Rule 20c`)
Every module's `<h1>`, `.subtitle`, and `.answer-block` must match the exact econometric identification tier of its underlying data in `IDENTIFICATION_TIER_MANIFEST`, and every `Mode A` module must qualify modeled outcomes in `<h1>` (`Projected`, `Modeled`, `Models`, `Sensitivity Bounds`) or state an observed statutory baseline:

| Tier (`IDENTIFICATION_TIER_MANIFEST`) | Identification Basis & Slugs | Permitted Verbs & Framing | Forbidden Overclaiming | Canonical Stat-Free Example |
|---|---|---|---|---|
| **`tier1_causal`** | **Quasi-Experimental / Panel Causal Estimate** (`observational-to-experimental`, `reverse-causation-feedback`, `parallel-trends-power`) | Name the comparison or identification operation with a noun-phrase subject (*Routine budgets lower... after separating..., Same-year spending averages combine...*) | Unconditional causal slogans (*proves, guarantees*) or anthropomorphic verbs (*hides, masks*) | **H1:** `Routine County Public Health Budgets Lower Premature Deaths After Separating Outbreak Spending`<br>**Sub:** `Comparing unadjusted yearly spending averages with multi-year routine-budget models across California counties.` |
| **`tier2_decomposition`** | **Longitudinal / Administrative Decomposition & Calibrated Funnel Models** (`before-after-trap`, `selection-into-treatment`, `threat-regression-to-mean`, `threat-history-solutions`, `threat-maturation-solutions`, `medicaid-expansion`, `identical-data-opposite-policies`, `threat-measurement-instrumentation`, `study-design-ladder`, `p-hacking-multiple-testing`, `measurement-error-claims`, `collider-bias`, `classifying-causal-mechanisms`) | Descriptive/decomposition verbs (*separates, delivers, identifies, omits*); `Mode A` modules must explicitly qualify projected/modeled outcomes in `<h1>` and `.subtitle` | Stating modeled projections as already-observed empirical facts in `<h1>` | **H1:** `Most Projected Medi-Cal Renewal Losses Stem From Preventable Paperwork Drop-Offs Rather Than Lost Eligibility`<br>**Sub:** `Separating modeled administrative renewal barriers among working and exempt adults from income-related coverage exits.` |
| **`tier3_cross_sectional`** | **Cross-Sectional Accounting / Partial-$R^2$ Decomposition** (`food-affordability-tradeoffs`, `geographic-variables`, `food-insecurity-diabetes`) | *accounts for, reveals, co-occurs with*; area-median post-rent models must include `Modeled` in `<h1>`/`.subtitle` | One-way causal verbs (*drives, causes, reduces, cuts, lowers, prevents, averts*) across any visible surface | **H1:** `Household Poverty Accounts for Most Neighborhood Food-Access Variation Compared With Store Distance`<br>**Sub:** `Comparing neighborhood income composition with physical grocery store distance across urban, suburban, and rural census tracts.` |
| **`tier4_modeled_fiscal`** | **Modeled Fiscal / CEA Counterfactual Simulation** (`chw-health-outcomes`, `budget-impact`, `measuring-health-common-unit`, `cost-effectiveness-ratio`, `sensitivity-analysis-cea`) | State the observed statutory rate identity in `<h1>` OR include explicit `Modeled` / `Models` qualifier in `<h1>`, `.subtitle`, and `.answer-block` | Presenting simulated multi-year returns or QALY valuations without explicit `modeled` / `projected` fencing | **H1:** `Per-Visit Medi-Cal Rates Cover Only a Small Fraction of County Living-Wage CHW Salaries`<br>**Sub:** `Comparing flat fee-for-service visit pay against county living-wage costs, modeled hospital savings, and multi-year health gains.` |

---

## 2. Two-Part Opening Architecture: Policy Setting Introduction (`.policy-setting`) + 4-Sentence Executive Answer Block (`.answer-block`)

### Rule 2A — Plain-English Policy Setting Topic Introduction (`.policy-setting`, 2–3 Sentences, 0 Study Stats)
- Every case study opens with a short, plain-English **Policy Setting** paragraph (`2–3` sentences) *before* presenting study statistics or model results.
- Its role is to orient a cold reader to the real-world public health program, statutory rule, or routine agency task (for example, how counties employ Community Health Workers and how Medi-Cal reimburses 30-minute visits, or how six-month Medi-Cal eligibility renewals work) so the reader understands the topic before hitting the numbers.

### Rule 2B — 4-Sentence Problem-Framed & Positive-First Executive Answer Block (`.answer-block`)
Directly below `.policy-setting`, every module's `.answer-block` (`40–130` words) follows a disciplined 4-sentence architecture:
1. **Sentence 1 (The Real-World Policy Problem / Issue — 0 citations):** A 1-sentence plain-English description of the practical decision challenge facing county or state health leaders, using one of the 6 Audience-Native Operational Problem Hooks (`Rule 8`). Never frame around why policymakers "cannot run an RCT."
2. **Sentence 2 (The Positive Policy Return / Headline Result — `[1]`):** Lead immediately with the positive empirical finding, program return, or validated benchmark in plain English.
3. **Sentence 3 (Why the Simple Baseline Differs — `[2]`):** Explain the literal operational or mathematical reason a raw average, single-point snapshot, or unadjusted directory count gives a different number (zero anthropomorphic verbs).
4. **Sentence 4 (Why Independent Checks Build Confidence — `[3]`):** Explain why confirming the finding across independent methods, multi-year baselines, or administrative data sources gives budget leaders confidence to allocate funds.

---

## 3. Enumerated Endnotes (`[1]`, `[2]`, `[3]`) & Method-vs-Empirical Separation (`Rule 19`)

1. **Zero Inline External Links in Visible Executive Copy (`Rule 19a`):**
   - Never place `<a href="https://...">`, inline author-year citations (`Brown (2014)`), or statute/table codes (`SPA 22-0001`, `B19013`, `p = 0.64`) in the Subtitle or `.answer-block`.
2. **Clickable Superscript Endnote Badges (`Rule 19b`):**
   - Citations in `answerHtml` use `[1]`, `[2]`, `[3]` markers converted by `render_option_c.js` into individual `<a href="#endnote-N">[N]</a>` links that open `<details id="data-sources-endnotes">` and scroll to `<li id="endnote-N">` under **Enumerated Endnotes & Primary Sources**.
3. **Explicit Separation of External Methods Papers vs. CAPHE California Empirical Estimates (`Rule 19e`):**
   - Whenever an endnote cites an econometric or cost-effectiveness methods paper (`Lewbel 2012`, `Roth 2022 / Rambachan & Roth 2023`, `Sanders et al. 2016`, `Benjamini & Hochberg 1995`, `Briggs, Claxton, & Sculpher 2006`) alongside California case-study figures, explicitly distinguish `Methodological reference:` from `CAPHE California empirical estimate / model calibration:` so California empirical figures are never misattributed to external methodology articles.
4. **Econometric Estimator Crosswalk in `Table 1 Notes`:**
   - Plain-English column headers in Table 1 (`Raw Yearly Average`, `County & Year FE`, `Routine-Budget Analysis`, `21-Year County Budget Model`, `County Board Budget Rules`) are paired automatically with their exact econometric estimator names (`OLS`, `TWFE`, `2SLS / Lewbel 2012 internal IV`, `Brown 2014 governance IV`) inside the collapsible `Table 1 Notes & * Modeled Estimates` drawer.

---

## 4. Scenario Comparison vs. Lookup Controls (`Rule 21`)

### Rule 4A — Cardinality & Task Rule: Side-by-Side Scenario Cards ($N = 2\text{–}4$) vs. Dropdown Lookup ($N \ge 5$) (`Rule 21a`)
- **Side-by-Side Scenario Grid (`.scenario-grid` / `.scenario-card`, `md:grid-cols-3`):**
  - Mandatory whenever a module presents **$N = 2\text{ to }4$ discrete scenarios, sensitivity bounds, or diagnostic lenses** (`medicaid-expansion`, `food-insecurity-diabetes`, `selection-into-treatment`, `parallel-trends-power`, `cost-effectiveness-ratio`).
  - Never hide $N = 2\text{–}4$ comparative scenarios behind a `<select id="scenarioSelect">` dropdown (`Rule 21a`), because readers must be able to compare the baseline, intermediate, and full scenarios side by side in space rather than toggling across time in working memory.
- **Interactive Dropdown Selector (`<select>`):**
  - Permitted **only** for high-cardinality entity lookups ($N \ge 5$, such as the 58-county selector in `chw-health-outcomes`) or multi-dimensional parameter combinations ($59 \times 4 \times 3 = 708$ states) where displaying all options simultaneously would create a scroll wall.

### Rule 4B — Visible Scenario Card Anatomy vs. Collapsible `<details>` Boundary (`Rule 21b` & `Rule 21c`)
- **Visible Scenario Card Surface (`.scenario-card`):**
  1. **Scenario Eyebrow (`label`):** Short step/bound label (e.g., `Scenario 1 · Baseline Funnel`, `Scenario 2 · Exemption & Lookback`, `Scenario 3 · Full 4-Group + Mobile Upload`).
  2. **Action / Assumption Title (`headline`):** Plain-English intervention or parameter state ($\le 8$ words).
  3. **Primary Headline Metric (`metric`):** 1 primary number + unit/share on the module's primary baseline denominator.
  4. **One-Sentence Operational Takeaway (`.scenario-desc`, $\le 30$ words, `Rule 21b`):** Explains what changes and which group or parameter drives it on the primary denominator only. Strictly ban parenthetical secondary-scale crosswalks (`unscaled ACS denominator`, `ACS-weighted scale`, `top-down`, `amortization`) and multi-part addition chains from `.scenario-desc`.
- **Collapsible Scenario Footer Note (`<details>` inside `.scenario-grid`, `Rule 21c`):**
  - Every `.scenario-grid` must include a collapsible `<details>` footer (`notesTitle` + `notesBullets`) directly below the 3-card grid housing secondary survey-weighted denominators (e.g., `133,998` ACS 5-Year PUMS scale), group-by-group addition chains (`6,831 + 3,319 = 10,150`), startup amortization adjustments, and Monte Carlo PSA specifications.

---

## 5. Standalone Section & Semantic-Naming Rule (`Rule 22`)

### Rule 5A — Semantic Substitution Over Coordinate Pointers (`Rule 22`)
- **Zero Bare Coordinates in Visible Prose Outside Table 1 `<thead>`:**
  - Never refer to a subpopulation, funnel stage, table column, wage quintile, or census tract by a bare positional index coordinate (`Step 1`..`Step 5`, `Group 1`..`Group 4`, `Bucket A`..`Bucket H`, `Column 1`..`Column 4`, `Q1`..`Q5`, `Tract 1122.03`, `Tract 2`, `Tract 5116.08`) in visible copy outside Table 1's `<thead>` header badges.
  - **Substitute, Never Append:** Do not keep the coordinate and append a parenthetical definition (which inflates word count and crowds out whitespace). Instead, replace the coordinate directly with its **2–4 word substantive name** (`sent manual paper renewal forms` instead of `routed to manual Step 5 verification`; `exempt caregivers and students` instead of `Group 2`; `variable-hour workers` instead of `Group 3`; `lowest-wage families` instead of `Q1 families`; `Marin's Canal neighborhood` instead of `Marin Tract 1122.03`).
  - **House Coordinates in Collapsible `<details>` Notes:** All exact schema coordinates (`DHCS Steps 1–5`, `Groups 1–4 / Buckets A–H`, `Columns 1–4`, `Quintiles Q1–Q5`, `Census Tract 1122.03`) remain documented inside the bottom **Methodology & Data Sources** `<details>` drawer for technical and reproducibility review. Even inside collapsible **Table 2 Notes**, **Scenario Notes**, and **FAQs**, lead with plain-English stage and subpopulation names rather than bare `Step X` or `Bucket X` shorthand.

---

## 6. Action-First, Rationale-Bridge, Sparse-Number Executive Answer Block (`Rule 23`)

### Rule 6A — The 4-Sentence Sparse-Number, Contrast-First Answer Block Formula
Every Executive Answer Block (`.answer-block`) must follow a disciplined 4-sentence structure (40–130 words) that foregrounds the analytical contrast rather than drowning the reader in spreadsheet denominators:
1. **Sentence 1 — Action-First Analytical Mechanism (0 numbers):** State how the analytical method or decomposition solves the practical policy problem (`Separating Medi-Cal renewals by work hours and exemption type shows where county outreach prevents paperwork coverage losses [1].`).
2. **Sentence 2 — Statewide Baseline or County Rationale Bridge (`We can consider [County], where [structural rationale]...`, 0–1 focal stat):** Anchor on the 58-county statewide baseline, or introduce a single-county anchor via the **structural tension** that makes it a diagnostic test case (`We can consider Santa Clara County, where low unemployment rules out a countywide jobless waiver even though 88.5% of expansion adults already work or qualify for an exemption [1,2].`).
3. **Sentence 3 — Parallel Metric Pairing on Identical Units (2–3 focal stats):** Pair the adjusted/decomposed finding directly against the unadjusted baseline in the **exact same unit** (`In our subgroup model, 52.5% of projected losses are preventable paperwork drops (14,219 of 27,076 per cycle), whereas scaling the statewide funnel by population share projects 36,218 to 41,100 losses with no subgroup detail [1,3].`).
4. **Sentence 4 — Operational Takeaway (0 numbers):** State how that split changes budget or staffing decisions using substantive subgroup names (`That subgroup split directs navigation staff to exempt caregivers, disabled adults, and variable-hour workers rather than treating renewal drop-offs as lost eligibility [3].`).

### Rule 6B — Zero Accounting-Footnote Clutter in `.answer-block` or `.synthesis`
- **No Parenthetical Denominator Crosswalks in Visible Prose:** Never stuff survey-weight twins (`(133,998 survey-weighted, rounded to 134,000)`), rounded-sum reconciliations (`(106,459 summed across rounded groups, or 106,472 unrounded)`), or sub-bucket arithmetic chains into `.answer-block` or `.synthesis` paragraphs. All cross-source denominator reconciliations belong in **Table 1** and the collapsible **Data Sources & Endnotes** (`#data-sources-endnotes`).

---

## 7. Universal Table & Section Clarity Standards (`Rules 24–28` — Enforced Across All 24 Modules)

### Rule 7A — Insight-First, Jargon-Free Headlines & Table Subtitles (`Rule 24`)
- **`<h1>` ($\le 16$ Words) & Table `<h2>` Titles ($\le 15$ Words):**
  - Every `<h1>` and Table `<h2>` must state the substantive takeaway or comparison in plain English (`High Rent and Household Poverty Explain Neighborhood Diabetes Risk Better Than Store Distance`).
  - Strictly ban academic filler and regex-translation artifacts in `<h1>` and Table `<h2>` titles: `"co-occur with"`, `"outside-factor"`, `"regression parameters"`, `"area-median"`, and `"confounding parameters"`.
- **Table 1 & Table 2 Visible `.subtitle` ($\le 22$ Words, Zero Sample/Table Codes):**
  - The visible `.subtitle` above Table 1 and Table 2 must be a single plain-English sentence ($\le 22$ words) stating what the columns compare.
  - Strictly ban sample-size strings (`N = 408`, `N = 9,033`), Census table codes (`B19013`, `B25064`), and `"regression parameters"` from visible table subtitles; `render_option_c.js` (`separateTableSubtitle`) routes all sample sizes, universe definitions, and regression parameter notes into the collapsible `<details>` **Table Notes** drawer.

### Rule 7B — Conceptual Archetype Column Headers & Footnote-Only Place/Sample IDs (`Rule 25`)
- **Lead With What the Column Characterizes (`<thead>`):**
  - When columns represent geographic or institutional examples (`food-insecurity-diabetes`, `food-affordability-tradeoffs`, `geographic-variables`, `identical-data-opposite-policies`), `col.title` in `<thead>` must name the **Conceptual Archetype** (`High-Rent Working Neighborhood`, `Low-Income Urban Core`, `Affluent Suburb`, `Rural Community`, `High-Overhead Urban Market`, `High-Need Agricultural Region`).
  - Specific county names, neighborhood names, and Census tract IDs (`Marin County: San Rafael Canal District, Tract 1122.03`, `Santa Clara County: Suburban San Jose, Tract 5119.15`) belong in `col.subtitle`, which `render_option_c.js` renders inside `<details>` **Table 1 Notes (`Column Scope`)**.
  - Strictly ban unexplained geographic abbreviations (`SJC`), Census table codes (`B19013`), and sample sizes (`N = ...`) in `<thead>`.

### Rule 7C — Unit-Once Row Labels, `%`-First Burden Cells & Parallel Row Granularity (`Rule 26`)
- **State Units Once in the First-Column Row Label:**
  - Put `Monthly`, `Annual`, or `Left After Rent and Food` **once** in the `<th scope="row">` label (`Median Monthly Household Income`, `Share of Income Spent on Monthly Rent`, `Monthly Income Left After Rent and Food`).
  - Strictly ban repeating `/ mo`, `/ mo remaining`, or `of B19013` inside Table 1 `<td>` data cells.
- **Plain-English Row Labels & `%`-First Burden Cells:**
  - Never use technical Census jargon (`"Gross rent"`) or clunky compound nouns (`"Tract Outside-Factor & Feedback Drivers"`) in row headers.
  - When a row measures a budget share or renewal loss rate, lead the cell with the **percentage** followed by the dollar or count figure in parentheses (`42.1% ($2,318)`, `72.4% (6,831)`).
- **Parallel Row Granularity:**
  - Every row in Table 1 must be measured at the same unit of analysis as the columns; never dump countywide or statewide regression parameters (`R² = 62.2%`, `OR = 2.47`) into individual neighborhood/tract columns.

### Rule 7D — Table vs. Prose Decision Gate ("No Essays in Tables", `Rule 27`)
- **When to Use a Table vs. Prose:**
  - Use a table **only** when cells hold numbers, short categories, or single-clause scannable phrases that a reader can compare horizontally across all 4 columns in under 10 seconds.
  - Every Table 2 cell body (excluding the bold `<strong>` policy-fit headline) must be **1 sentence** and **$\le 22$ words** ($\le 16$ words in flagship case studies). Multi-sentence explanations, regression parameter lists, and mechanism chains belong in collapsible **Table 2 Notes** or the 2-paragraph **Policy Fit Synthesis**.

### Rule 7E — Action-Oriented Section 3 (`County/Clinic` vs. `Tract/Neighborhood` Call to Action, `Rule 28`)
- **Ban Passive `"Diagnostic Lens"` / `"Lens 1..3"` Framing:**
  - Never title Section 3 cards `"Lens 1"`, `"Lens 2"`, `"Lens 3"`, or `"Diagnostic Lenses"`.
  - Section 3 (`.scenario-grid`) must present either **Modeled Policy/Outreach Scenarios** (`Scenario 1..3`) with explicit headcount/dollar yields OR **Concrete Operational Actions** (`Action 1 · Clinic & Benefits Intake (Household Level)`, `Action 2 · Neighborhood Placement (Census Tract Level)`, `Action 3 · Managed-Care Contracting (County System Level)`) that specify **who acts**, **at what geographic/administrative level** (`Household/Clinic`, `Census Tract/Neighborhood`, or `County System`), and **what operational lever they pull**.

### Rule 7F — Zero Visible Test Statistics in Tables/Rulers & 3-Tier Progressive Disclosure (`Rule 26d–f`)
- **Tier 1 (Visible Executive Surface — `Table 1`, `Table 2`, `.ruler-card`):**
  - Strictly ban all inferential and regression test statistics (`SE =`, `t =`, `p =`, `p <`, `F =`, `Hansen J`, `Breusch-Pagan`, `R²`, `Partial R²`, `VIF`, `z =`, `OR =`, `95% CI`, `β`, `statistically sig.`, and `***` stars) from visible table rows/cells and Ruler cards (`Rule 26d`).
  - Replace removed statistical rows in Table 1 (`Rule 26e`, minimum 4 data rows) with plain-English operational rows: **Plausible Range in Natural Units** (`6.98 to 11.33 fewer deaths per 100K`), **What This Comparison Accounts For / Omits**, and **Budget / Operational Consequence if Used**.
- **Tier 2 (Collapsible `<details>` Table Notes — Mandatory Across All 24 Modules, `Rule 26f`):**
  - House the self-contained audit trail for the visible table estimates: exact econometric estimator crosswalk, sample size (`N`), point-estimate standard errors (`SE`), $t$/$z$-statistics, $p$-values, 95% confidence intervals, and a 1-sentence validity summary.
- **Tier 3 (Linked TooEarlyToSay.com Full Methodology Article — Mandatory for Buckets 1 & 2):**
  - House multi-equation identification derivations, first-stage $F$ and Hansen $J$ algebra, Breusch-Pagan tests, distributed-lag matrices, 47-specification robustness curves, and replication code.

---

## 8. Audience-Native Operational Problem Hook, Zero Straw-Man Drama & Zero Imperative Scolding (`Rule 29a–b`)
- **Zero Straw-Man Drama (`Rule 29a`):**
  - Never open or frame a case study with unverified sociological claims about dysfunctional committees, supervisors under political pressure, or caricature analysts (`"Budget committees often stall..."`, `"County supervisors face pressure to cut..."`, `"adding twenty control variables takes three seconds"`).
- **Zero Imperative Scolding in Sentence 1 (`Rule 29b`):**
  - Never open `answerHtml` Sentence 1 with `"must"`, `"need to"`, `"needs to"`, `"cannot"`, `"should not"`, or `"have to"`.
- **Mandatory 6-Template Practitioner-First Problem Hook (`Rule 29`):**
  - Open Sentence 1 of `answerHtml` using one of the 6 Audience-Native Operational Decision-Hook templates so a county health director, CAO budget analyst, or CalAIM program lead immediately recognizes the routine workflow, fee schedule, eligibility cutoff, or dashboard metric on their desk and the concrete operational misallocation caused by using it unadjusted:
    1. **The Year-1 Operating-Ledger & Billing Gap Hook** (`chw-health-outcomes`, `budget-impact`, `cost-effectiveness-ratio`, `sensitivity-analysis-cea`, `measuring-health-common-unit`).
    2. **The Eligibility Screen & Cutoff Blind-Spot Hook** (`food-affordability-tradeoffs`, `medicaid-expansion`, `food-insecurity-diabetes`).
    3. **The Misleading Routine Dashboard / Audit Metric Hook** (`observational-to-experimental`, `reverse-causation-feedback`, `before-after-trap`, `threat-history-solutions`, `threat-maturation-solutions`, `collider-bias`).
    4. **The Field-Deployment & Targeting Tradeoff Hook** (`geographic-variables`, `identical-data-opposite-policies`, `threat-measurement-instrumentation`, `threat-regression-to-mean`, `p-hacking-multiple-testing`).
    5. **The Unequal-Caseload & Baseline-Drift Program-Comparison Hook** (`selection-into-treatment`, `study-design-ladder`, `parallel-trends-power`, `measurement-error-claims`).
    6. **The Downstream-Milestone Split Hook** (`classifying-causal-mechanisms`).

---

## 9. Two-Tier Flesch-Kincaid Reading Level Gate (`Rule 30a–b`)
- **Non-Collapsed Executive Text (`Rule 30a`, `FKGL <= 6.50`):**
  - All visible text inside `<main>` outside `<details>`, `<select>`, `<script>`, and `<style>` (including H1, Subtitle, Policy Setting, Executive Answer Block, Table 1 & Table 2 headers/cells, and Scenario cards) must achieve a Flesch-Kincaid Grade Level (`0.39 * ASL + 11.8 * ASW - 15.59`) of **$\le 6.50$**.
- **Collapsed `<details>` Notes & Synthesis (`Rule 30b`, `FKGL <= 8.00`):**
  - All collapsible `<details>` blocks inside `<main>` (Table 1 Notes, Table 2 Notes, Scenario Notes, and Block 5 Data Sources, Model Inputs, Synthesis, FAQs & Endnotes) must achieve a combined Flesch-Kincaid Grade Level of **$\le 8.00$**.

---

## 10. Three-Stage Authoring Pipeline, Subtle Analytic Perspective & Ledger Purity (`Rule 33`)

To prevent readability edits or practitioner framing from conflating assumed scenario inputs with empirical findings, introducing colloquial/sales copy, stamping overwhelming `Perspective:` badges onto headers, or summing incompatible ledgers, case study creation and revision must strictly separate three gated processes:

- **Stage 1 — Drafting (Data Provenance & Parameter Ledger Lock, `Rule 33b`):**
  - Before any narrative prose is drafted, every quantitative parameter in the module must be explicitly classified into one of three immutable provenance buckets:
    1. **`[Model Input / Assumed Scope]`**: Hypothetical scenario parameters, target caseloads, assumed catchment sizes, or statutory fee-schedule inputs (e.g., `55 Medi-Cal patients/yr`, `75 clinic patients/yr`, `150 adults across 10 ZIP codes`, `750-client cohort`, `$1,930,000 Year-1 budget`, `$10/resident shock`). In Table 1, rows containing assumed caseloads or cost inputs must be explicitly labeled (`Assumed Annual Caseload (Model Input)`, `Assumed Program Cost Input`), and rows containing modeled outputs must set `modeled: true` so the renderer appends `*` and links to the model footnote.
    2. **`[Observed Administrative Baseline]`**: Empirical counts and rates measured directly in state/federal registries (e.g., `279,905 HCAI PQI stays`, `472,014 DHCS enrollees`, `$54,000 BLS QCEW statewide base wage`).
    3. **`[Modeled / Estimated Finding]`**: Econometric or simulation outputs derived by combining inputs and baselines.
- **Stage 2 — Readability & Plain-Language Copy Editing (`Rule 30a–b`):**
  - Copy editors simplifying sentence structure to meet the Grade $\le 6.50$ Flesch-Kincaid ceiling **must never strip the `[Assumed]` / `[Model Input]` qualifier** from a scenario scope parameter or promote a model assumption (`10 ZIP codes`, `150 adults`, `55 patients`) into an empirical finding slot.
- **Stage 3 — Public Health Officer (PHO) Implications Pass & Subtle Perspective (`Rule 33a & 33c`):**
  - Every case study undergoes a dedicated **PHO Implications Pass** that channels county public health officer decision questions while enforcing CAPHE's neutral institutional voice (`marketing/voice-specifications-all-properties.md`):
    - **Subtle Perspective via Row Structure & Class Taxonomy (`Rule 33a`, Zero `Perspective:` Badge Clutter):**
      - Never stamp mechanical `Perspective: Medicaid Plan` or `Perspective: Societal` badges onto Table 1 column headers, dropdowns, or cards, and never use colloquial money metaphors (`whose pocket`, `wrong pocket`, `dollars land`, `pot of money`, `pay-in`, `payout`) or political-strategy/sales headers (`how to pitch`, `defending core budgets`, `framing by audience`, `sales pitch`).
      - **Class A — Multi-Payer Financing & Cost-Effectiveness Modules** (`chw-health-outcomes`, `budget-impact`, `measuring-health-common-unit`, `cost-effectiveness-ratio`, `sensitivity-analysis-cea`): Capture perspective naturally through **self-explanatory row structure in Table 1** (*Assumed Caseload Input* $\rightarrow$ *Annual Worker/Program Cost* $\rightarrow$ *Direct Medi-Cal Visit Billing* $\rightarrow$ *Year-1 Hospital Savings* $\rightarrow$ *Added Healthy Years [QALYs]* $\rightarrow$ *Net Cost per QALY / Pays for Itself*) and a plain-English `"Where the Return Shows Up"` row in Table 2.
      - **Class B — Multi-Tier Statutory & Administrative Incidence Modules** (`selection-into-treatment`, `threat-maturation-solutions`, `identical-data-opposite-policies`): Name the statutory/administrative tier naturally in row/column labels (federal formula, state payroll fund, county administration, household take-up).
      - **Class C — Measurement, Targeting & Econometric Identification Modules** (remaining 16 modules): Omit payer-perspective framing completely so it never clutters geographic, subpopulation, or estimator comparisons.
    - **Strict Ledger & Unit Purity (Never Sum Cash Flows and QALYs):**
      - Never add cash budget flows (Medicaid plan claims, hospital bed-cost offsets, clinic billing) to monetized health gains (QALYs or VSL) into a single summed dollar row (`Total Annual Value: $407,006`). Keep cash offsets and multi-year health gains (`QALYs`) on separate rows with a standard ICER (`$/QALY` or `Pays for itself in Year 1`) bottom line.
    - **Rounded Estimates & Ranges in Prose, Zero False-Precision Point Numbers (`Rule 33c`):**
      - In narrative prose (`answerHtml`, `block2.*.desc`, `table2` prose cells, `synthesis`, `faqs`), modeled dollar and clinical projections must be expressed as appropriately rounded estimates or ranges (e.g., `~$107,000`, `~$184,000`, `~$291,000`, `~3.0 to 8.2 QALYs`, `~$36,100 per QALY`, `~11–12 stays`), reserving exact unrounded reconciliation figures strictly for Table 1 cells and technical `<details>` notes. Unmodeled extrapolations (such as inventing a "vacancy/cut impact" row by flipping signs without modeling fixed-overhead stickiness) are strictly prohibited.

---

## 11. Statewide 58-County California Default & Single-County Structural Justification (`Rule 33d`)
- **Statewide 58-County Default:**
  - All CAPHE case studies must anchor by default on **statewide 58-county California data** (or multi-county regional archetypes spanning urban, suburban, agricultural, and rural counties). Never default to Santa Clara County for statewide CHW, fiscal, CEA, or LHA modules (`chw-health-outcomes`, `budget-impact`, `measuring-health-common-unit`, `cost-effectiveness-ratio`, `reverse-causation-feedback`, `classifying-causal-mechanisms`, `sensitivity-analysis-cea`).
- **Single-County Exception Rule (Explicit Structural Mechanism Required):**
  - A single county (e.g., Santa Clara, Fresno, Nevada, Imperial, Marin) may be highlighted in visible text **only** when demonstrating a specific, explicitly stated structural mechanism that requires sub-state contrast—for example:
    1. *Statutory Exemption Extreme (`medicaid-expansion`)*: Illustrating an urban county with low unemployment (`~4.1%`, `0.0%` jobless waiver share) versus high-unemployment waiver counties.
    2. *Urban vs. Rural Distance Cutoff (`geographic-variables`, `food-insecurity-diabetes`, `food-affordability-tradeoffs`, `identical-data-opposite-policies`)*: Contrasting a store-dense suburban county (where 26 of 27 tracts `> 1 mile` are wealthy foothills and only 1 of 408 tracts meets the USDA food-desert cutoff) against agricultural/rural counties (Fresno, Nevada, Imperial).
    3. *Sub-County Registry or Small-Cell Stratification (`threat-measurement-instrumentation`, `p-hacking-multiple-testing`, `study-design-ladder`)*: Demonstrating municipal counter-permit deduplication or small-cell noise in a 62-cell county age-by-language operational grid (`n = 47` Samoan vs. `n = 138,215` Spanish).

---

## 12. Data Visualization Standards & Hard Ban on Stacked Bar Charts (`Rules V1–V3`)
- **Rule V1 — Earned Space (When to Include a Data Visualization):**
  - Include a data visualization when it communicates a quantitative relationship at a glance that a 4-column table cannot easily show:
    1. *Threshold / Breakeven & Multi-Ledger Gaps* (e.g., the paired horizontal bar chart in `chw-health-outcomes` comparing Worker Cost, Direct Visit Billing, and Year-1 Hospital Savings against the vertical dashed breakeven line),
    2. *Pre/Post Trajectories & Counterfactual Divergence*, or
    3. *Sequential Administrative Funnel Drop-Offs*.
  - Omit standalone charts when a 4-column comparison table of archetypes or estimators is cleaner.
- **Rule V2 — Hard Ban on Stacked Bar Charts & Mixed-Unit Bars:**
  - **NO STACKED BAR CHARTS** anywhere across the case studies (neither SVG stacked `<rect>` segments nor CSS `.budget-bar-seg` stacked tracks).
  - Always use separate, individual horizontal or grouped bars on a shared axis with clear tick marks, direct data labels, and $\ge 4.5:1$ contrast.
  - Keep non-cash health outcomes (`QALYs`) in a separate callout or gauge—never plotted or stacked onto cash dollar bars.
- **Rule V3 — Placement:**
  - Place charts inside the interactive County/Scenario section or paired with Table 1—never above the `Policy Setting` introduction.
