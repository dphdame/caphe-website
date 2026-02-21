# HSR Research Brief: Full Publication Pipeline

## Paper
**Title:** Flat-Rate Medicaid Reimbursement and Geographic Variation in Provider Participation: Evidence from California
**Author:** Victoria Cholette, MPP
**Target:** *Health Services Research* (Research Brief format)
**Core thesis:** Medi-Cal's flat statewide reimbursement — with no GPCI-like geographic adjustment — explains a large share of county-level variation in provider participation rates across specialties.

## Current State

| Asset | Status | Location |
|-------|--------|----------|
| Draft text | Complete (~2,498 words) | `docs/hsr-research-brief.md` |
| Cover letter | Complete | `docs/hsr-cover-letter.md` |
| Figure script | Exhibits 1-2 coded | `scripts/generate-hsr-figures.py` |
| GeoJSON (CA counties) | Missing — script needs this | `data/access-explorer/ca-counties.geojson` |
| Source data | 58 counties, 6 specialties | `data/access-explorer/_summary.json` |
| Results verification | Not done | — |
| Citation verification | Not done | — |
| Style-pass | Not done | — |
| Formatted manuscript | Not done (markdown only) | — |

---

## Phase 1: Data Validation
**Goal:** Verify every number cited in the manuscript against source data.

### What gets checked
Every statistic in the draft must trace back to `_summary.json`. This includes:
- Statewide totals (76,392 registered; 30,612 active; 40.1% rate)
- County rankings (Exhibit 3: top 10 and bottom 10)
- Specialty medians (Exhibit 4: all 6 specialties)
- Behavioral health desert counties (7 counties <19%)
- Cost-participation correlation (r = 0.935)
- HRR-level statistics (3 tiers, Redding 30.0% to SF 47.0%)
- AMC effect (+8.6 percentage points)
- Provider density ratios (SF HRR 4.51 vs Bakersfield 1.15 per 1,000)

### Script: `scripts/verify-hsr-numbers.py`
Automated verification script that:
1. Loads `_summary.json`
2. Computes every aggregate cited in the manuscript
3. Outputs a verification report with PASS/FAIL for each claim
4. Flags any discrepancy > 0.1 percentage points

### Agent: `econ-data-pipeline`
- Validate `_summary.json` structure and completeness
- Check for missing counties, null specialty values, impossible rates (>100% or <0%)
- Verify that registered >= active for every county-specialty pair
- Cross-check county population totals against ACS if available

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Statewide totals | Script sums all counties | Matches 76,392 / 30,612 |
| County rankings | Script sorts by rate | Top/bottom 10 match Exhibit 3 |
| Specialty medians | Script computes medians | All 6 match Exhibit 4 |
| BH desert list | Script filters <19% | Exactly 7 counties match text |
| Cost-participation r | Script computes Pearson | r = 0.935 ± 0.001 |
| HRR aggregates | Script uses crosswalk | Ranges match text |
| No impossible values | Script range-checks | 0 ≤ rate ≤ 100 for all |
| Registered ≥ Active | Script inequality check | True for all 58 × 6 cells |

### Output
- `docs/hsr-verification-report.md` — line-by-line verification log
- All PASS → proceed to Phase 2
- Any FAIL → fix manuscript or data before proceeding

---

## Phase 2: Figure Generation
**Goal:** Produce publication-quality PDFs for Exhibits 1-2.

### Exhibit 1: California County Map
- Choropleth map, 58 counties colored by overall participation rate
- Sequential blue color scale (0–50%)
- Key county annotations (SF, Marin, Imperial, Modoc)
- Source note, colorbar
- **Requires:** `ca-counties.geojson` — download from Census TIGER/Line or Natural Earth

### Exhibit 2: Behavioral Health vs Pharmacy/DME Bar Chart
- Horizontal paired bars, 20 most populous counties
- Sorted by BH rate ascending
- Median reference lines for each specialty
- Source note

### Exhibits 3-4: Tables
- Already in manuscript text (Exhibit 3: top/bottom 10 counties; Exhibit 4: specialty summary)
- Will be formatted as Word tables in Phase 6

### Script: `scripts/generate-hsr-figures.py` (existing, needs update)
1. Add GeoJSON download step or manual placement
2. Verify county name matching (GeoJSON NAME field vs data keys)
3. Generate at 300 DPI minimum
4. Output format: PDF (vector) for journal submission
5. Figure dimensions per HSR guidelines

### Agent: `ada-compliance`
- Verify figure alt text is complete and descriptive
- Check colorblind accessibility of color scales
- Ensure font sizes meet minimum readability (8pt+)

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| All 58 counties rendered | Script reports match count | 58/58 matched |
| Color scale range | Visual inspection | Covers 0-50%, no clipping |
| Annotations correct | Compare to Exhibit 3 data | Rates match exactly |
| Resolution | File metadata | ≥ 300 DPI |
| Colorblind safe | Sim tool or agent review | Distinguishable in deuteranopia |
| Source notes present | Visual inspection | Both figures have source text |

### Output
- `docs/hsr-figures/exhibit-1-map.pdf`
- `docs/hsr-figures/exhibit-2-specialty.pdf`

---

## Phase 3: Results QI (Automated + Manual)
**Goal:** Ensure analytical claims in the text are defensible and correctly stated.

### Automated checks (script-driven)

#### `scripts/hsr-results-qi.py`
1. **Claim extraction**: Parse manuscript for every numeric claim
2. **Recomputation**: Independently compute each statistic from raw data
3. **Comparison**: Flag mismatches
4. **Sensitivity**: Test whether key findings hold under alternative specifications:
   - Exclude counties with <10 providers (does r change materially?)
   - Use weighted vs unweighted correlation
   - Test median vs mean participation rates

### Agent: `econometric-analyst`
Review the analytical claims for methodological soundness:
- Is the r=0.935 correlation appropriately computed? (Pearson vs Spearman, weighted vs unweighted)
- Are the "three tiers" of HRR participation defensible cutpoints or arbitrary?
- Does the "counterintuitive" cost-participation finding hold under controls?
- Is "cross-sectional descriptive analysis" the right framing, or should regression results be added?

### Manual verification
| Claim | Verification approach |
|-------|----------------------|
| "I-5 corridor" band of low participation | Map visual confirms geographic cluster |
| "approximately 4 million residents" in low-BH band | Sum populations of named counties |
| AMC counties list (SF, LA, Sac, SD, Alameda) | Confirm these have teaching hospitals |
| FQHC cost-based reimbursement claim | Verify against 42 CFR § 405.2462 |

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| All numerics verified | Verification script | 0 discrepancies |
| Correlation robust | Sensitivity script | r > 0.85 under all specs |
| BH desert list stable | Exclude small counties | Same 7 counties or justified change |
| HRR tier cutpoints | Distribution analysis | Natural breaks in data |
| Population estimate | County pop summation | Within 10% of "4 million" |

### Output
- `docs/hsr-results-qi-report.md`

---

## Phase 4: Citation Verification
**Goal:** Confirm all 12 references are accurate, accessible, and correctly cited.

### Agent: `econ-review-lit`
For each of the 12 references:
1. Fetch the URL or DOI
2. Verify: author names, title, journal, year, volume/issue/pages
3. Confirm the specific claims attributed to each source
4. Flag any broken URLs

### Reference-by-reference verification

| Ref | Source | Key claim to verify |
|-----|--------|-------------------|
| 1 | CMS GPCI documentation | GPCI established under §1848(e) in 1992 |
| 2 | Zhu et al. 2022 Health Affairs | 26% reachable BH providers in OR Medicaid; doi correct |
| 3 | CMS-2439-F (May 2024) | Fed Reg citation, document number |
| 4 | HHS OIG OEI-02-23-00540 | 45% unavailable; 3/4 cite full caseloads |
| 5 | Skopec et al. 2025 Health Affairs | 71% Medicaid-to-Medicare ratio; 80% threshold |
| 6 | NPPES download page | URL accessible |
| 7 | HHS Medicaid Provider Spending | URL accessible, Feb 2026 release |
| 8 | Dartmouth Atlas HRR | URL accessible |
| 9 | Wen et al. 2019 JAMA Psychiatry | 47.9% to 35.4% decline; doi correct |
| 10 | MACPAC Jan 2025 | 87.4% vs 52.0% acceptance rates |
| 11 | Zhu et al. 2023 Health Affairs | 76% median psychiatric reimbursement |
| 12 | HRSA BH Workforce Brief 2025 | 55%/48%/72% adequacy projections |

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| All URLs resolve | WebFetch each | 12/12 accessible |
| DOIs resolve | doi.org lookup | All DOIs valid |
| Author names exact | Fetch vs manuscript | 0 mismatches |
| Attributed claims accurate | Read source | Claims match source text |
| Citation format consistent | Manual review | All follow same style |

### Output
- `docs/hsr-citation-verification.md` — per-reference verification log

---

## Phase 5: Style Pass
**Goal:** Mandatory style editing per CLAUDE.md workflow.

### Skill: `/style-pass --academic`
Full 8-step style-pass workflow:
1. Second-person pronoun scan (must be zero)
2. Em dash scan
3. AI rhetoric pattern detection ("Not X, but Y")
4. Passive voice audit
5. Boilerplate opening/closing check
6. Negative form → positive form opportunities
7. Fancy words → plain alternatives
8. McCloskey/Strunk & White rules application

### Agent: `rhetorical-pattern-editor`
Post-style-pass cleanup for any remaining "Not X, But Y" constructions.

### Agent: `punctuation-reviewer`
Review em dash usage and replace with appropriate alternatives.

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Zero "you/your" | Grep scan | 0 instances |
| Zero em dashes | Grep scan | 0 instances |
| Author attribution | Manual check | "Victoria Cholette" used |
| First-person plural | Grep for "we/our" | Consistent throughout |
| Completion marker | `mark-style-pass-complete.py` | ≥ 3 edits recorded |
| Word count | wc | ≤ 2,500 words (excl. abstract, refs, exhibits) |

### Output
- Style-passed manuscript text
- Style-pass completion marker logged

---

## Phase 6: Manuscript Formatting
**Goal:** Produce submission-ready Word document per HSR Research Brief guidelines.

### HSR Research Brief Requirements
- **Format:** Word (.docx)
- **Word limit:** 2,500 words (excluding structured abstract, references, exhibits)
- **Structured abstract:** Objective, Data Sources, Study Design, Principal Findings, Conclusions
- **Exhibits:** Up to 4 (figures or tables), submitted separately
- **References:** Numbered, Vancouver style
- **Title page:** Title, author(s), affiliations, corresponding author, word count, key words
- **Blinded manuscript:** Separate version without author identification (for peer review)

### Script: `scripts/format-hsr-docx.py`
Python script using `python-docx` to generate:
1. Title page (author info)
2. Blinded title page (no author info)
3. Structured abstract
4. Main text with numbered references
5. Exhibit captions page
6. **Clean metadata** using `clean_docx_metadata.py`

### Formatting details
- Font: Times New Roman 12pt, double-spaced
- Margins: 1 inch all sides
- Page numbers: bottom center
- Line numbers: continuous (HSR requirement)
- Tables: separate pages after references
- Figure legends: separate page

### QI Checks
| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Word count | docx word count | ≤ 2,500 (excl. abstract/refs/exhibits) |
| Structured abstract | Manual review | All 5 sections present |
| Blinded version clean | Grep for author name | 0 instances in blinded doc |
| Metadata clean | `clean_docx_metadata.py` | No python-docx artifacts |
| Line numbers | Visual inspection | Continuous numbering |
| References numbered | Manual count | 1-12 sequential, Vancouver style |
| Exhibits labeled | Manual review | "Exhibit 1" through "Exhibit 4" |

### Output
- `docs/hsr-submission/manuscript.docx` (with author info)
- `docs/hsr-submission/manuscript-blinded.docx` (for peer review)
- `docs/hsr-submission/cover-letter.docx`

---

## Phase 7: Final QI Gate
**Goal:** Pre-submission checklist — nothing ships without passing all checks.

### Agent: `pre-publish-check`
Run the pre-publish skill across the full submission package:
1. Technical accuracy (econometric methods correctly described)
2. Accessibility (figure alt text, table headers)
3. Style compliance (post-style-pass verification)
4. Citation integrity (all 12 verified)

### Agent: `review-article`
Full article review for:
- Technical accuracy of econometric claims
- Citation validity (literature verification)
- Logical consistency of argument
- Policy implication defensibility
- Limitations adequacy

### Agent: `ux-design-qa-analyst`
Review submission documents for:
- Figure readability at print size
- Table formatting clarity
- Exhibit numbering consistency

### Master QI Checklist

| # | Check | Phase | Status |
|---|-------|-------|--------|
| 1 | All 58 county stats verified against data | 1 | ☐ |
| 2 | Statewide totals match | 1 | ☐ |
| 3 | Correlation coefficient reproduced | 1 | ☐ |
| 4 | Exhibits 1-2 generated at ≥300 DPI | 2 | ☐ |
| 5 | All 58 counties render in map | 2 | ☐ |
| 6 | Colorblind accessibility confirmed | 2 | ☐ |
| 7 | Sensitivity tests pass (r robust) | 3 | ☐ |
| 8 | Population estimates verified | 3 | ☐ |
| 9 | All 12 references verified | 4 | ☐ |
| 10 | All DOIs/URLs resolve | 4 | ☐ |
| 11 | Attributed claims match sources | 4 | ☐ |
| 12 | Zero second-person pronouns | 5 | ☐ |
| 13 | Style-pass completion marker set | 5 | ☐ |
| 14 | Word count ≤ 2,500 | 6 | ☐ |
| 15 | Structured abstract complete | 6 | ☐ |
| 16 | Blinded version clean | 6 | ☐ |
| 17 | Metadata cleaned | 6 | ☐ |
| 18 | Cover letter matches manuscript | 7 | ☐ |
| 19 | `review-article` skill passes | 7 | ☐ |
| 20 | `pre-publish-check` skill passes | 7 | ☐ |

**Gate rule:** All 20 checks must pass before submission. Any failure returns to the relevant phase.

---

## Phase 8: Submission Package
**Goal:** Assemble and submit to HSR via ScholarOne.

### Submission components
1. `manuscript.docx` — full manuscript with author info
2. `manuscript-blinded.docx` — anonymous version for review
3. `cover-letter.docx` — formatted cover letter
4. `exhibit-1-map.pdf` — California county map
5. `exhibit-2-specialty.pdf` — BH vs Pharmacy bar chart
6. `exhibit-3-table.docx` — Top/bottom 10 counties table (if separate)
7. `exhibit-4-table.docx` — Specialty summary table (if separate)

### Submission metadata
- Article type: Research Brief
- Subject area: Health Policy / Access to Care
- Keywords: Medicaid, Medi-Cal, provider participation, geographic variation, reimbursement, network adequacy, behavioral health
- Data availability statement: "County- and specialty-level data are publicly available at caphegroup.org/tools/access-explorer"
- Conflict of interest: None
- Funding: None
- IRB: Not applicable (publicly available aggregate data, no human subjects)

### Post-submission
- Save confirmation email / manuscript ID
- Note submission date
- Set reminder for editorial decision (~6-8 weeks for HSR)
- Prepare response-to-reviewers template

---

## Agent & Workflow Summary

| Phase | Primary Agent/Skill | Purpose |
|-------|-------------------|---------|
| 1 | `econ-data-pipeline` | Data validation, completeness checks |
| 2 | `ada-compliance` | Figure accessibility |
| 3 | `econometric-analyst` | Analytical claim review, sensitivity |
| 4 | `econ-review-lit` | Citation verification |
| 5 | `/style-pass --academic` | Mandatory style editing |
| 5 | `rhetorical-pattern-editor` | Post-style cleanup |
| 5 | `punctuation-reviewer` | Em dash cleanup |
| 6 | `python-docx` script | Word document formatting |
| 7 | `pre-publish-check` | Final QI gate |
| 7 | `review-article` | Full article review |
| 7 | `ux-design-qa-analyst` | Figure/table readability |

### Scripts to create
| Script | Purpose | Phase |
|--------|---------|-------|
| `scripts/verify-hsr-numbers.py` | Verify every manuscript number against data | 1 |
| `scripts/hsr-results-qi.py` | Sensitivity tests, robustness checks | 3 |
| `scripts/format-hsr-docx.py` | Generate formatted Word documents | 6 |
| `scripts/generate-hsr-figures.py` | Already exists, needs GeoJSON fix | 2 |

### External dependencies
| Dependency | Source | Status |
|------------|--------|--------|
| `ca-counties.geojson` | Census TIGER/Line shapefiles | Need to download |
| `geopandas` | pip | Need to verify installed |
| `python-docx` | pip | Need to verify installed |
| HSR author guidelines | wiley.com | Need to fetch and confirm format requirements |

---

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| 1. Data Validation | 1 session | `_summary.json` |
| 2. Figure Generation | 1 session | GeoJSON download, Phase 1 pass |
| 3. Results QI | 1 session | Phase 1 pass |
| 4. Citation Verification | 1 session | Can run parallel with 2-3 |
| 5. Style Pass | 1 session | Phase 1-4 complete |
| 6. Manuscript Formatting | 1 session | Phase 5 complete |
| 7. Final QI Gate | 1 session | Phase 6 complete |
| 8. Submission | 1 session | Phase 7 pass |

**Total: ~6-8 sessions** (can compress with parallel execution of Phases 2-4)

---

## Verification of Desired End State

The pipeline is complete when:
1. All 20 QI checks pass (Phase 7 checklist)
2. Submission package uploaded to HSR ScholarOne
3. Confirmation/manuscript ID received
4. All scripts, verification reports, and formatted documents saved in `docs/hsr-submission/`
