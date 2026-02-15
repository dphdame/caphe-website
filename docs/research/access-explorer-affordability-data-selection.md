# Access Explorer: Affordability Data Source Selection

**Date:** February 15, 2026
**Tool:** Medi-Cal Provider Access Explorer
**Decision:** County-level affordability measure for demonstrating flat Medicaid reimbursement as structural access barrier

---

## Research Question

Medi-Cal reimbursement rates are set statewide with minimal geographic adjustment. We hypothesize that flat rates create a structural barrier to provider participation in high-cost counties, where the same reimbursement buys less labor, less rent, and fewer supplies. To test this, we need a county-level measure of local costs that can be compared against a fixed reimbursement schedule.

## Selection Criteria

1. **County-level geography** — must cover all 58 CA counties (and ideally all ~3,143 US counties for national extension)
2. **Annual coverage, 2017–2022** — matching the HHS Medicaid Provider Spending data window
3. **Publicly available at no cost** — reproducibility and transparency
4. **Regular updates** — not a one-time academic product
5. **Healthcare cost relevance** — captures dimensions that affect provider operating costs (labor, rent, supplies)

---

## Alternatives Considered

### 1. BEA Regional Price Parities (RPPs)

- **Source:** Bureau of Economic Analysis, U.S. Department of Commerce
- **Geography:** State + ~384 MSAs (25 in California)
- **Coverage:** 2008–2023; next release Feb 19, 2026 adds 2024
- **Cost:** Free
- **URL:** https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area

**Strengths:**
- Gold standard for regional price comparison
- Constructed from CPI microdata + ACS housing costs
- Includes sub-indices: goods, services, rents
- Peer-reviewed methodology (Aten & D'Souza, 2008)

**Limitations (why not chosen):**
- **MSA-level only** — does not cover non-metro counties (Alpine, Modoc, Sierra, Inyo, etc.), which are often the most underserved
- No standalone healthcare sub-index
- Would require imputation or crosswalk for ~20 rural CA counties outside MSAs
- National extension would miss ~1,900 non-metro counties

**Verdict:** Strong but insufficient geographic coverage. Used as validation benchmark.

---

### 2. C2ER Cost of Living Index (COLI)

- **Source:** Council for Community and Economic Research
- **Geography:** ~300 participating metro/micro areas; county-level product available separately
- **Coverage:** Quarterly, through 2025 Q3
- **Cost:** $90 (single quarter) to $2,500 (full historical + county product)
- **URL:** https://www.coli.org

**Strengths:**
- Has standalone HEALTH_CARE sub-index (physician visit, dentist visit, optometrist, prescription drugs)
- Longest-running cost-of-living comparison (since 1968)
- County-level product now available
- Quarterly granularity

**Limitations (why not chosen):**
- **Proprietary/paid** — violates reproducibility criterion
- Not all CA counties participate in the survey
- Self-selected participating communities may not represent the full distribution
- National extension at county level would cost $2,500+
- Third-party data cannot be redistributed in a public tool

**Verdict:** Best healthcare-specific measure, but cost and redistribution restrictions make it unsuitable for a public tool.

---

### 3. DIY County-Level RPPs (McMahon 2024 Methodology)

- **Source:** Constructed from public data following McMahon (2024), U.S. Commerce Department Working Paper
- **Geography:** All ~3,143 US counties (constructible)
- **Coverage:** 2017–2023 (ACS + HUD FMR availability)
- **Cost:** Free (public input data)
- **Key reference:** McMahon, T. (2024). "Experimental County-Level Regional Price Parities." Working Paper, U.S. Department of Commerce.

**Strengths:**
- Full county coverage including rural areas
- Replicable from public data (ACS PUMS, HUD FMRs, EIA, BLS CPI)
- Validated against BEA RPPs at MSA level
- Could produce a composite index

**Limitations (why not chosen as primary):**
- **Experimental** — not yet a published/endorsed federal product
- Requires ~100 GB of ACS PUMS downloads for national build
- PUMA-to-county crosswalk introduces allocation error for small counties
- Processing pipeline is 3–6 hours of compute
- Would need independent validation

**Verdict:** Excellent for a standalone research paper but over-engineered for the Access Explorer tool. Retained as future option for paper extension.

---

### 4. HUD Fair Market Rents (FMRs)

- **Source:** U.S. Department of Housing and Urban Development
- **Geography:** County-level (+ metro areas)
- **Coverage:** Annual, 2017–2026
- **Cost:** Free
- **URL:** https://www.huduser.gov/portal/datasets/fmr.html

**Strengths:**
- True county-level geography
- Annual updates
- Directly measures housing costs (40th percentile gross rent)
- Available for every county and metro area

**Limitations (why not chosen as primary):**
- Captures only one dimension of cost (housing)
- Bedroom-size specific (0BR through 4BR) — requires normalization choice
- Does not capture healthcare-specific costs, labor costs, or goods prices
- Rent levels don't directly translate to provider operating costs

**Verdict:** Useful as a component in a composite measure but too narrow as a standalone affordability index. Incorporated as supplementary variable.

---

### 5. Area Deprivation Index (ADI)

- **Source:** University of Wisconsin School of Medicine, Neighborhood Atlas
- **Geography:** Census block group to county
- **Coverage:** Based on ACS 5-year estimates (most recent: 2017–2021)
- **Cost:** Free
- **URL:** https://www.neighborhoodatlas.medicine.wisc.edu/

**Strengths:**
- 17 indicators spanning income, education, housing, employment
- Block-group granularity aggregable to county
- Widely used in health services research (hundreds of publications)
- National decile rankings

**Limitations (why not chosen):**
- **Deprivation index, not a price/cost index** — measures demand-side disadvantage, not supply-side cost pressure
- Conflates poverty concentration with cost of living (a wealthy high-cost county scores low on deprivation)
- Time lag in ACS 5-year pooling
- Does not answer "how much does it cost to operate a practice here?"

**Verdict:** Measures the wrong construct. We need cost-of-operating, not deprivation-of-residents. Useful as a control variable but not the primary affordability measure.

---

### 6. Social Deprivation Index (SDI)

- **Source:** Robert Graham Center, George Washington University
- **Geography:** County, census tract, ZCTA, PCSA
- **Coverage:** Updated annually from ACS
- **Cost:** Free
- **URL:** https://www.graham-center.org/maps-data-tools/social-deprivation-index.html

**Strengths:**
- Designed for healthcare research
- 7 focused indicators (poverty, education, single-parent, renter, overcrowding, no car, nonemployed)
- Factor-analysis construction
- Multiple geographic levels

**Limitations (why not chosen):**
- Same issue as ADI: measures **resident deprivation**, not **local cost levels**
- A county with high costs and high incomes (e.g., San Francisco) scores low on SDI but has high provider operating costs
- Does not capture the gap between reimbursement and costs

**Verdict:** Same construct mismatch as ADI. Not suitable as primary measure.

---

### 7. Distressed Communities Index (DCI)

- **Source:** Economic Innovation Group / Harvard Kennedy School
- **Geography:** ~3,000 counties (500+ population), ~26,000 ZIP codes
- **Coverage:** Based on ACS 2011–2015 and County Business Patterns 2011/2015
- **Cost:** Free
- **URL:** https://eig.org/distressed-communities/

**Strengths:**
- Composite of 7 metrics including employment change and business establishment change
- National coverage
- Intuitive quintile ranking (prosperous → distressed)

**Limitations (why not chosen):**
- **Severely outdated** — based on 2011–2015 data, predates our analysis window
- Same deprivation-not-cost construct as ADI/SDI
- Static (no annual updates matching our panel)
- Conflates economic decline with high costs

**Verdict:** Too old and wrong construct.

---

### 8. County Health Rankings

- **Source:** University of Wisconsin Population Health Institute / Robert Wood Johnson Foundation
- **Geography:** All US counties
- **Coverage:** Annual since 2010
- **Cost:** Free
- **URL:** https://www.countyhealthrankings.org/

**Strengths:**
- Comprehensive health + social determinant measures
- Annual updates
- Full county coverage
- Includes some economic measures (children in poverty, income inequality, median household income)

**Limitations (why not chosen as primary):**
- Health outcome index, not a cost/price index
- Economic measures are a subset, not a comprehensive affordability measure
- Would need to extract specific variables rather than use the composite rank

**Verdict:** Useful for supplementary health outcome variables. Not an affordability measure.

---

### 9. CMS Medicare Geographic Variation Data

- **Source:** Centers for Medicare & Medicaid Services
- **Geography:** County-level
- **Coverage:** Annual
- **Cost:** Free
- **URL:** https://data.cms.gov/summary-statistics-on-use-and-payments/medicare-geographic-comparisons

**Strengths:**
- Shows actual Medicare spending per beneficiary by county
- Medicare adjusts payments geographically (GPCI) — Medicaid doesn't
- Direct comparison: "Medicare adjusts for local costs; Medi-Cal doesn't"
- Same agency, same payment system context

**Limitations (why not chosen as primary):**
- Reflects utilization patterns + price adjustments, not pure cost levels
- Higher spending could mean sicker population, not higher costs
- Endogeneity: more providers → more spending → looks more expensive

**Verdict:** Excellent supplementary comparison variable but confounds utilization with cost. Used alongside primary measure.

---

### 10. CMS Hospital Cost Reports (HCRIS)

- **Source:** Centers for Medicare & Medicaid Services
- **Geography:** Facility-level, aggregable to county
- **Coverage:** 1996–2025, quarterly updates
- **Cost:** Free
- **URL:** https://www.cms.gov/data-research/statistics-trends-and-reports/cost-reports

**Strengths:**
- Actual reported costs by hospitals and health facilities
- Includes cost per discharge, cost per day, labor cost ratios
- Can aggregate to county average
- Directly measures what it costs to deliver care in a location

**Limitations (why not chosen as primary):**
- Only covers facilities that file cost reports (hospitals, SNFs, HHAs, FQHCs)
- Does not cover private physician practices (the bulk of Medicaid providers)
- Counties with 1 hospital = 1 data point (unreliable)
- Complex data requiring significant cleaning

**Verdict:** Valuable for hospital-specific analysis but insufficient for the full provider ecosystem (physicians, dentists, behavioral health, pharmacy).

---

### 11. CDC PLACES Data

- **Source:** CDC
- **Geography:** County, place, tract, ZCTA
- **Coverage:** Annual releases
- **Cost:** Free
- **URL:** https://www.cdc.gov/places/

**Strengths:**
- Health outcomes and risk factors at county level
- Useful for modeling demand side (disease burden → need for providers)

**Limitations (why not chosen):**
- Health outcomes, not cost/affordability
- Endogenous to access: fewer providers → worse outcomes → higher PLACES scores

**Verdict:** Outcome variable, not an explanatory affordability measure.

---

### 12. HRSA Health Professional Shortage Area (HPSA) Designations

- **Source:** Health Resources and Services Administration
- **Geography:** County and sub-county
- **Coverage:** Continuously updated
- **Cost:** Free
- **URL:** https://data.hrsa.gov/topics/health-workforce/shortage-areas

**Strengths:**
- Official federal designation of provider shortages
- Covers primary care, dental, mental health
- Score reflects severity

**Limitations (why not chosen):**
- Outcome variable (shortage), not a cost measure
- Circular: we're trying to explain why shortages exist; using shortage designations as an explanatory variable is tautological

**Verdict:** Useful as a validation target (do high-cost counties have more HPSAs?) but not an explanatory variable.

---

## Selected Approach: BEA Per Capita Personal Income + BLS QCEW Wages

### Primary Measures

| Variable | Source | Geography | Coverage | Frequency |
|----------|--------|-----------|----------|-----------|
| **Per capita personal income** | BEA Regional Economic Accounts | All US counties | 2005–2023 | Annual |
| **Average weekly wages (healthcare sector)** | BLS Quarterly Census of Employment and Wages | All US counties | 1975–present | Quarterly |

### Why This Combination

1. **Full county coverage:** Both datasets cover all ~3,143 US counties, including rural counties missed by BEA RPPs and C2ER COLI.

2. **Direct cost relevance:** QCEW healthcare-sector wages (NAICS 62: Health Care and Social Assistance) measure the **actual labor cost** of hiring healthcare workers in each county. Since labor is 50–60% of physician practice operating costs, county-level healthcare wages are the most direct proxy for the cost pressure providers face.

3. **Effective reimbursement ratio:** We can compute: `Medicaid fee / county healthcare wage index` to show how reimbursement purchasing power varies geographically. A $50 Medicaid payment buys 1.5 hours of medical assistant time in Imperial County but only 0.8 hours in San Francisco.

4. **Free and reproducible:** Both datasets are published by federal agencies, freely downloadable, and updated on predictable schedules. Any researcher can replicate the analysis.

5. **Temporal alignment:** Both cover 2017–2022 with annual (BEA) or quarterly (QCEW) granularity, matching the HHS Medicaid Provider Spending data window.

6. **Complementary dimensions:** BEA per capita income captures the demand side (can residents afford care? can providers collect copays?), while QCEW wages capture the supply side (what does it cost to staff a practice?).

### Supplementary Variables (included but not primary)

| Variable | Source | Purpose |
|----------|--------|---------|
| HUD Fair Market Rents | HUD | Facility rent proxy |
| CMS Medicare Geographic Variation | CMS | "Medicare adjusts; Medicaid doesn't" comparison |
| HRSA HPSA designations | HRSA | Validation target |
| ACS median household income | Census | Demand-side income control |
| BLS LAUS unemployment rate | BLS | Economic distress control |

### Rejected Constructs

**Deprivation indices** (ADI, SDI, DCI) were rejected as the primary measure because they answer the wrong question. They measure "how disadvantaged are the residents?" rather than "how expensive is it to operate here?" A wealthy, high-cost county (San Mateo) scores low on deprivation but high on provider operating costs. The research question is about the gap between fixed reimbursement and local costs — a price/cost measure, not a poverty measure.

---

## Data Access

- **BEA Per Capita Personal Income:** https://www.bea.gov/data/income-saving/personal-income-county-metro-and-other-areas → CAINC1 table
- **BLS QCEW:** https://www.bls.gov/cew/downloadable-data-files.htm → Annual averages by county, NAICS 62
- **HUD FMRs:** https://www.huduser.gov/portal/datasets/fmr.html → County-level files
- **CMS Medicare Geographic Variation:** https://data.cms.gov/summary-statistics-on-use-and-payments/medicare-geographic-comparisons

## Processing Estimate

| Dataset | Size | Processing Time |
|---------|------|----------------|
| BEA CAINC1 (all counties, 2017–2022) | ~50 MB | Minutes |
| QCEW annual averages (all counties, 2017–2022) | ~200 MB/year | Minutes per year |
| HUD FMRs (2017–2026) | ~10 MB | Seconds |
| **Total** | **~1.3 GB** | **<30 minutes** |

Compare to DIY RPP approach: ~100 GB input, 3–6 hours processing.
