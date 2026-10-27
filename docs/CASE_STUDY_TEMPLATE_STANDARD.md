# CAPHE Methods Lab — Canonical Case Study Template Standard

**Effective Date:** October 26, 2026  
**Enforced By:** [`scripts/render_option_c.js`](../scripts/render_option_c.js) & [`scripts/audit_anti_cheat.js`](../scripts/audit_anti_cheat.js) (`Rules 1–30`) + [`test/answer-block.test.js`](../test/answer-block.test.js)

---

## 1. Block 1 Header: Direct Declarative, Stat-Free `<h1>` & Plain-English, Number-Free Subtitle

### Rule 1A — Direct Declarative, Insight-First, Stat-Free `<h1>` (`Rule 20b`)
- State the module's main policy/method takeaway as a complete, independent declarative sentence (`Subject + Finite Active Verb + Policy Takeaway`) in plain words.
- **Zero Numbers, Percentages, or Dollar Figures in `<h1>` (`Rule 20b`):** Never put forgettable decimals, percentages, dollar figures, or raw counts (`88.5%`, `62.2%`, `30.7%`, `9.16`, `$36,089`, `6% to 11%`) in `<h1>`. Keep all exact empirical statistics inside the Executive Answer Block, Ruler cards, and Table 1.
- **Forbidden `<h1>` Starters:** Never open an `<h1>` with `"Case Study:"`, `"Why"`, `"How"`, `"When"`, `"What"`, or an `-ing` process verb (`"Evaluating"`, `"Unpacking"`, `"Untangling"`, `"Accounting for"`, `"Separating"` when used as a gerund fragment), and never end `<h1>` with a question mark (`?`).
- Use the Eyebrow (`CAPHE Methods Lab · Track X`) to indicate the track and module type.

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
Every module's `<h1>`, `.subtitle`, and `.answer-block` must match the exact econometric identification tier of its underlying data in `IDENTIFICATION_TIER_MANIFEST` (`scripts/audit_anti_cheat.js`), and every `Mode A` module must qualify modeled outcomes in `<h1>` (`Projected`, `Modeled`, `Models`, `Sensitivity Bounds`) or state an observed statutory baseline:

| Tier (`IDENTIFICATION_TIER_MANIFEST`) | Identification Basis & Slugs | Permitted Verbs & Framing | Forbidden Overclaiming | Canonical Stat-Free Example |
|---|---|---|---|---|
| **`tier1_causal`** | **Quasi-Experimental / Panel Causal Estimate** (`observational-to-experimental`, `reverse-causation-feedback`, `parallel-trends-power`) | Name the comparison or identification operation with a noun-phrase subject (*Routine budgets lower... after separating..., Same-year spending averages combine...*) | Unconditional causal slogans (*proves, guarantees*) or anthropomorphic verbs (*hides, masks*) | **H1:** `Routine County Public Health Budgets Lower Premature Deaths After Separating Outbreak Spending`<br>**Sub:** `Comparing unadjusted yearly spending averages with multi-year routine-budget models across California counties.` |
| **`tier2_decomposition`** | **Longitudinal / Administrative Decomposition & Calibrated Funnel Models** (`before-after-trap`, `selection-into-treatment`, `threat-regression-to-mean`, `threat-history-solutions`, `threat-maturation-solutions`, `medicaid-expansion`, `identical-data-opposite-policies`, `threat-measurement-instrumentation`, `study-design-ladder`, `p-hacking-multiple-testing`, `measurement-error-claims`, `collider-bias`, `classifying-causal-mechanisms`) | Descriptive/decomposition verbs (*separates, delivers, identifies, omits*); `Mode A` modules must explicitly qualify projected/modeled outcomes in `<h1>` and `.subtitle` | Stating modeled projections as already-observed empirical facts in `<h1>` | **H1:** `Most Projected Medi-Cal Renewal Losses Stem From Preventable Paperwork Drop-Offs Rather Than Lost Eligibility`<br>**Sub:** `Separating modeled administrative renewal barriers among working and exempt adults from income-related coverage exits.` |
| **`tier3_cross_sectional`** | **Cross-Sectional Accounting / Partial-$R^2$ Decomposition** (`food-affordability-tradeoffs`, `geographic-variables`, `food-insecurity-diabetes`) | *accounts for, reveals, co-occurs with*; area-median post-rent models must include `Modeled` in `<h1>`/`.subtitle` | One-way causal verbs (*drives, causes, reduces, cuts, lowers, prevents, averts*) across any visible surface | **H1:** `Household Poverty Accounts for Most Neighborhood Food-Access Variation Compared With Store Distance`<br>**Sub:** `Comparing neighborhood income composition with physical grocery store distance across urban, suburban, and rural census tracts.` |
| **`tier4_modeled_fiscal`** | **Modeled Fiscal / CEA Counterfactual Simulation** (`chw-health-outcomes`, `budget-impact`, `measuring-health-common-unit`, `cost-effectiveness-ratio`, `sensitivity-analysis-cea`) | State the observed statutory rate identity in `<h1>` OR include explicit `Modeled` / `Models` qualifier in `<h1>`, `.subtitle`, and `.answer-block` | Presenting simulated multi-year returns or QALY valuations without explicit `modeled` / `projected` fencing | **H1:** `Per-Visit Medi-Cal Rates Cover Only a Small Fraction of County Living-Wage CHW Salaries`<br>**Sub:** `Comparing flat fee-for-service visit pay against county living-wage costs, modeled hospital savings, and multi-year health gains.` |

---

## 2. 4-Sentence Problem-Framed & Positive-First Executive Answer Block (`.answer-block`)

Every module's `.answer-block` (`40–130` words) must follow a strict 4-sentence architecture:
1. **Sentence 1 (The Real-World Policy Problem / Issue — 0 citations):** A 1-sentence plain-English description of the practical decision challenge facing county or state health leaders. Never frame around why policymakers "cannot run an RCT."
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
2. **Sentence 2 — County Rationale Bridge (`We can consider [County], where [structural rationale]...`, 0–1 focal stat):** Introduce any single-county or multi-county anchor via the **structural tension** that makes it a diagnostic test case (`We can consider Santa Clara County, where low unemployment rules out a countywide jobless waiver even though 88.5% of expansion adults already work or qualify for an exemption [1,2].`).
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

### Rule 8 — Audience-Native Operational Problem Hook, Zero Straw-Man Drama & Zero Imperative Scolding (`Rule 29a–b`)
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

### Rule 9 — Two-Tier Flesch-Kincaid Reading Level Gate (`Rule 30a–b`)
- **Non-Collapsed Executive Text (`Rule 30a`, `FKGL <= 6.50`):**
  - All visible text inside `<main>` outside `<details>`, `<select>`, `<script>`, and `<style>` (including H1, Subtitle, Executive Answer Block, Table 1 & Table 2 headers/cells, and Scenario cards) must achieve a Flesch-Kincaid Grade Level (`0.39 * ASL + 11.8 * ASW - 15.59`) of **$\le 6.50$**.
- **Collapsed `<details>` Notes & Synthesis (`Rule 30b`, `FKGL <= 8.00`):**
  - All collapsible `<details>` blocks inside `<main>` (Table 1 Notes, Table 2 Notes, Scenario Notes, and Block 5 Data Sources, Model Inputs, Synthesis, FAQs & Endnotes) must achieve a combined Flesch-Kincaid Grade Level of **$\le 8.00$**.




