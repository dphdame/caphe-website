# Access Explorer: COLI Integration + Remaining Scope

## Overview

Extend the Medi-Cal Provider Access Explorer with a cost-of-living affordability layer that demonstrates flat Medicaid reimbursement rates are a structural barrier to provider participation in high-cost counties. Then complete all remaining scope: QI checks, replace mock data pipeline TODOs, and deploy.

## Current State Analysis

### What Exists
- **Frontend:** `public/tools/access-explorer/index.html` (589 lines) — two-column layout, county autocomplete, Chart.js bar + trend charts, specialty tabs, CSV download
- **JavaScript:** `src/frontend/js/access-explorer.js` (599 lines) — loads county JSON, renders 6 specialty rate cards, horizontal bar chart, trend line chart
- **Methodology page:** `public/tools/access-explorer/methodology.html` (374 lines) — data sources, definitions, limitations, references
- **Mock data:** 3 county JSON files (LA, Fresno, Imperial) + `_summary.json` with all 58 counties
- **Build script:** `scripts/build-access-data.py` (395 lines) — processes NPPES + HHS spending into per-county JSON

### What's Missing / Incomplete
1. **No affordability data** — the tool shows phantom gaps but doesn't explain *why* (cost of living)
2. **Build script TODOs:**
   - Line 309: `changeFrom2019` hardcoded to `0.0`
   - Line 337: `lastUpdated` hardcoded to `"2024-12"`
   - Line 339: `stateMedians` output as `{}`
   - Lines 340-342: `trends.months` left empty (no monthly trend computation)
3. **Only 3 of 58 county JSON files** — the rest would show "Data Not Yet Available"
4. **No QI/validation checks** on data pipeline output
5. **No state median reference line** on trend chart (commented out at JS line 342-346)
6. **No deployment** — all changes are local, uncommitted

### Key Discoveries
- Express server already serves `/data/` statically (`server.js` line 97: `app.use('/data', express.static(...))`) — no backend changes needed
- County JSON schema has room for new affordability fields without breaking existing frontend
- QCEW annual singlefiles are ~200 MB/year; BEA CAINC1 bulk ZIP is ~50 MB total — manageable downloads
- CMS Medicare Geographic Variation is a single CSV covering 2014-2023

## Desired End State

After this plan is complete:
1. A new Python script (`scripts/build-coli-data.py`) downloads, validates, and merges BEA income + QCEW wages + HUD FMR + CMS Medicare data into per-county affordability JSON
2. The Access Explorer county JSON schema includes affordability fields (wage index, rent index, composite cost index, effective reimbursement index, Medicare comparison)
3. The frontend displays an "Affordability Context" panel below the existing participation charts showing how local costs compare to statewide averages and how that correlates with participation rates
4. A Chart.js scatter plot shows participation rate vs. cost index across all 58 counties
5. All data passes automated QI checks before being written to output
6. The methodology page documents the affordability data sources, GPCI-aligned weighting, and evidence base
7. Everything is committed and deployed to Heroku

### Verification
- `python scripts/build-coli-data.py --validate` passes all QI checks with zero errors
- County JSON files include `affordability` object with all required fields
- Access Explorer loads any of the 58 counties and displays affordability context
- Scatter plot renders with labeled outliers
- Methodology page documents COLI data sources and GPCI-aligned weighting rationale
- `curl -sI https://www.caphegroup.org/tools/access-explorer/` returns 200

## What We're NOT Doing
- Building the full DIY county-level RPP (McMahon 2024 methodology) — deferred to paper
- Processing real NPPES/HHS spending data (11 GB) — that runs offline separately
- Computing monthly trend data from real spending files — requires HHS spending micro-data
- National extension (all 3,143 US counties) — CA only for the CAPHE tool
- C2ER COLI integration (paid/proprietary)
- Causal analysis of cost → participation — this is descriptive/correlational
- Replicating the full GPCI methodology (uses proprietary AMA survey data)

---

## Evidence Base and Design Decisions

This section documents the empirical evidence underlying each methodological choice. All weights and design decisions are traceable to published sources.

### Decision 1: Labor costs dominate provider operating expenses

**Claim:** Employee wages are the single largest component of physician practice operating costs, justifying heavy weighting of labor in a cost index.

**Evidence:**
- **MGMA (2025):** Survey of 294 medical groups found 65% of practice leaders identify labor as the area with the biggest cost increase. (Source: MGMA Stat, July 2025, "Confronting Cost Pressures in Your Medical Practice")
- **Kaufman Hall (2024):** For medical groups providing services through employed providers, labor costs accounted for approximately 84% of total medical group expenses. Support staff salaries and benefits alone account for ~25% of total practice revenue. (Source: Kaufman Hall Physician Flash Report, cited in MGMA 2025)
- **Medicare Economic Index (2006-based, still current CY 2026):** Nonphysician employee compensation weighted at 16.3-19.15% of total practice expense; physician work component at 50.87% of total GPCI weight. (Source: AMA, "Geographic Practice Cost Indices (GPCIs)" reference document; CMS CY 2026 PFS Final Rule, 90 FR 49266)

**Decision:** Weight employee wages as the dominant component in the composite cost index. This is consistent with how Medicare structures its geographic adjustment.

### Decision 2: GPCI-aligned composite weighting scheme

**Claim:** The composite cost index weights should follow Medicare's Practice Expense GPCI sub-component structure rather than arbitrary proportions.

**The Medicare PE GPCI structure (2006-based MEI, current through CY 2026):**

| PE Sub-component | % of Practice Costs | Geographically Adjusted? | Data Source |
|-----------------|--------------------|--------------------------| ------------|
| Employee wages | ~19.15% | Yes | BLS OEWS |
| Office rent | ~10.22% | Yes | ACS 2BR rent |
| Purchased services | ~5-7% | Yes | BLS wage data |
| Equipment/supplies/other | ~12.81% | **No** (set to 1.00) | N/A |

(Source: CMS, "Draft Report on the Sixth GPCI Update," November 2010; AMA GPCI reference document; CMS CY 2026 PFS Final Rule, 90 FR 49266; McMenamin et al., "Medicare Economic Index," *Health Care Financing Review* 25(1), 2003)

**Among the geographically-adjusted sub-components only:**

| Adjusted Sub-component | Raw Weight | Normalized Weight |
|-----------------------|-----------|-------------------|
| Employee wages | 19.15% | **55.6%** |
| Office rent | 10.22% | **29.7%** |
| Purchased services | 5.07% (est.) | **14.7%** |
| **Total adjusted** | **34.44%** | **100%** |

**Our implementation:** We use the normalized GPCI-adjusted weights as the basis for our composite cost index:

| Our Index Component | GPCI Analog | GPCI Normalized Weight | Our Weight | Our Data Source |
|--------------------|-------------|----------------------|------------|----------------|
| Healthcare employee wages | PE employee wage index | 55.6% | **56%** | BLS QCEW, NAICS 62 |
| Facility rent | PE office rent index | 29.7% | **30%** | HUD FMR, 2-bedroom |
| Purchased services proxy | PE purchased services | 14.7% | **14%** | BLS QCEW, all-industry avg weekly wage |
| Equipment/supplies | PE equipment/supplies | 0% (not adjusted) | **0%** | Not included |

**Rounding:** The GPCI normalized weights (55.6/29.7/14.7) are rounded to 56/30/14 for simplicity and to sum to 100. This introduces negligible distortion (<0.5 index points).

**Why not replicate the full GPCI?** The Medicare GPCI uses BLS Occupational Employment and Wage Statistics (OEWS) for 7 specific proxy occupations to compute the work component, and the AMA Physician Practice Information Survey (PPIS) for cost share weights. The OEWS data is publicly available, but the PPIS is proprietary. Our approach uses QCEW NAICS 62 wages as a direct measure of healthcare labor costs rather than proxy-occupation wages, which is arguably more direct for measuring the cost of operating a healthcare practice (it captures the actual wages paid in the healthcare sector in each county, not proxy occupations like lawyers and engineers).

**Justification for QCEW NAICS 62 over OEWS proxy occupations:**
- QCEW is a census of all employers (not a sample), covering 99.7% of all wage and salary civilian workers
- NAICS 62 directly measures healthcare sector wages rather than inferring from proxy occupations
- QCEW is available at county level for all counties with disclosed data
- CMS itself uses BLS data as the primary input for the PE employee wage index

(Source: BLS, "Quarterly Census of Employment and Wages: Overview"; CMS, "Geographic Adjustment of Medicare Physician Payments," July 2012)

### Decision 3: Per capita income is a supplementary variable, not a composite component

**Claim:** Per capita personal income should be reported separately as a demand-side measure, not mixed into the supply-side cost index.

**Rationale:** The composite cost index measures *provider operating costs* — how much it costs to run a practice in a given county. Per capita income measures *patient economic capacity* — how much residents earn, which affects copay collection, uncompensated care burden, and the mix of payers in a county. These are different economic constructs:

- **Supply-side (practice costs):** wages, rent, purchased services → determines whether a provider can afford to accept Medicaid at the offered reimbursement rate
- **Demand-side (patient economics):** income, poverty rate, insurance mix → determines the volume and payer mix of patients seeking care

The Medicare GPCI does not include patient income in any of its three components. Patient economic characteristics are captured through separate CMS programs (e.g., dual-eligible status, risk adjustment, DSH payments).

**Our implementation:** Per capita income is included in the county JSON as `per_capita_income` and `income_index` for display purposes (researchers and users may want to see it), but it does NOT enter the `composite_cost_index` calculation. The composite is purely supply-side, matching the GPCI's design philosophy.

### Decision 4: Payment-to-cost ratios predict provider participation

**Claim:** The relationship between Medicaid reimbursement levels (relative to local costs) and provider willingness to participate is well-established, justifying the "effective reimbursement index" as a policy-relevant metric.

**Evidence:**

1. **Alexander & Schnell (2024), *American Economic Journal: Applied Economics*:**
   - Exploited large, exogenous changes in Medicaid reimbursement rates from the ACA 2013-2014 primary care payment increase
   - Found that closing the Medicaid-private payment gap would reduce more than two-thirds of access disparities among adults and eliminate them entirely among children
   - A $10 increase in Medicaid payments → 1.4% increase in probability of doctor visit in past two weeks
   - Causal identification via state-level variation in payment increases (rates doubled in 11 states, unchanged in 2)

2. **Polsky et al. (2015), *New England Journal of Medicine* 372(6):537-545:**
   - Measured appointment availability before (2012-2013) and during (2014) the ACA payment increase across 10 states
   - Medicaid appointment availability increased from 58.7% to 66.4% (7.7 pp)
   - States with largest reimbursement increases had largest availability increases
   - Estimated **1.25 pp increase in appointment availability per 10% increase in Medicaid reimbursement**
   - No corresponding change in private insurance group (natural control)

3. **AMA Research Summary (2020), "Physician Acceptance of New Medicaid Patients":**
   - Physicians in states paying above the median Medicaid-to-Medicare fee ratio accepted new Medicaid patients at higher rates
   - **0.78 pp increase in acceptance rate per 1 pp increase in Medicaid/Medicare fee ratio**
   - Medicaid-to-Medicare ratios range from 37% (Rhode Island) to 111% (Montana)

4. **MACPAC (January 2025), "Evaluating the Effects of Medicaid Payment Changes on Access to Physician Services":**
   - Literature review of 44 peer-reviewed studies since 2013
   - Of 12 cross-sectional studies, 5 found quantitative association between payment and access
   - Critical finding: physicians lose **17.6% of Medicaid visit contractual value** to claims denials and resubmissions, vs. 4.7% for Medicare and 2.4% for commercial (Dunn et al.)
   - Administrative barriers may affect participation as much as payment rates in some states
   - ACA fee bump had larger effect on intensive margin (more services from existing providers) than extensive margin (new providers entering Medicaid)

**Our implementation:** The `effective_reimbursement_index` translates these findings to a geographic dimension. If a flat $100 Medi-Cal payment buys the same basket of inputs everywhere, but healthcare wages in San Francisco are 135% of the state average, then the effective purchasing power of that $100 is only $74 in San Francisco. This is the mechanism by which flat rates create geographic access barriers — a mechanism that Medicare addresses through the GPCI but Medi-Cal does not.

**Important caveat (documented in methodology page):** The evidence above establishes the *payment level → participation* relationship at the state level (variation in Medicaid fee schedules across states). Our tool applies this logic to *within-state* geographic variation in costs against a *uniform* fee schedule. This is a reasonable inference but represents an extension of the existing evidence, not a direct replication. The tool frames this as descriptive/correlational, not causal.

### Decision 5: Medicare geographic variation as comparison benchmark

**Claim:** Comparing Medicare's geographic adjustment to Medicaid's lack thereof makes the policy implication concrete.

**Evidence:**
- Medicare adjusts payments through three GPCIs (work, PE, PLI), with the composite GAF ranging from ~0.85 in low-cost areas to ~1.20+ in high-cost areas (Source: AMA GPCI reference document, CY 2026 values)
- The statutory requirement for GPCI adjustment dates to OBRA 1989 (P.L. 101-239), based on recognition that "healthcare delivery is inherently local and that input prices — particularly labor costs, office rents, and malpractice insurance premiums — vary systematically across geographic regions" (Source: IOM/NAS, "Geographic Adjustment in Medicare Payment," 2012, NBK190061)
- California Medi-Cal uses a statewide fee schedule with no county-level geographic adjustment for physician services (Source: DHCS Medi-Cal Provider Manual, Section 4)
- The CMS Medicare Geographic Variation Public Use File (2014-2023) provides county-level actual vs. standardized per capita spending, allowing direct computation of the geographic adjustment effect

**Our implementation:** For each county, we compute `medicare_gap_pct = (actual_pc - standardized_pc) / standardized_pc * 100`. This shows the dollar magnitude of Medicare's geographic adjustment. The insight callout then notes: "Medicare adjusts payments geographically through its GPCI system. Medi-Cal does not."

### Decision 6: Why deprivation indices (ADI, SDI, DCI) are the wrong measure

**Claim:** Area Deprivation Index, Social Deprivation Index, and Distressed Communities Index measure *resident disadvantage*, not *provider operating costs*. Using them would answer the wrong question.

**Evidence by counterexample:**
- San Francisco: ADI national percentile ~15 (low deprivation), but PE GPCI = 1.506 (50.6% above national average for practice expenses)
- Imperial County: ADI national percentile ~85 (high deprivation), but PE GPCI ≈ 0.90 (below average practice costs)

If we used ADI as the cost measure, we would conclude that San Francisco providers face below-average costs (low deprivation = low cost?) and Imperial providers face above-average costs — the opposite of reality for practice operating expenses.

**The construct distinction:**
- **Deprivation indices** answer: "How economically disadvantaged are the *residents*?"
- **Cost indices** answer: "How expensive is it to *operate a practice* here?"

These are correlated in some counties (poor counties may have both low incomes and low practice costs) but diverge in wealthy high-cost areas (San Francisco, San Mateo, Marin) and in poor areas with low costs (Imperial, rural Central Valley). The research question — "does flat reimbursement create a cost barrier?" — requires a cost measure, not a deprivation measure.

(Source: UW-Madison Neighborhood Atlas, ADI methodology; Robert Graham Center, SDI methodology; EIG/Harvard, DCI methodology; CMS CY 2026 GPCI values by locality)

---

## Implementation Approach

**Three-script architecture:**
1. `build-coli-data.py` — downloads + processes + validates affordability data → outputs `/data/access-explorer/affordability/`
2. `build-access-data.py` (existing, enhanced) — merges affordability data into county JSON files
3. QI validation module — shared by both scripts, run at each stage

**Data flow:**
```
BEA API → county_income.csv ──────────┐
QCEW CSVs → county_wages.csv ─────────┤
QCEW all-industry → purchased_svcs.csv ┤
HUD FMR → county_rents.csv ───────────┼→ build-coli-data.py → affordability.json → QI checks
CMS CSV → county_medicare.csv ────────┘
                                                ↓
                                      build-access-data.py (enhanced)
                                                ↓
                                      data/access-explorer/{county}.json (with affordability fields)
```

---

## Phase 1: COLI Data Processing Script

### Overview
Create `scripts/build-coli-data.py` that fetches, cleans, and merges four federal data sources into a single affordability dataset for CA counties.

### Changes Required

#### 1. New file: `scripts/build-coli-data.py`

**CLI interface:**
```bash
python scripts/build-coli-data.py \
  --bea-key YOUR_API_KEY \
  --years 2017,2018,2019,2020,2021,2022 \
  --state CA \
  --output data/access-explorer/affordability/ \
  --validate
```

**Arguments:**
- `--bea-key` (required): BEA API key (register at apps.bea.gov/API/signup/)
- `--qcew-dir` (optional): Directory with pre-downloaded QCEW CSVs; if omitted, downloads from BLS
- `--hud-dir` (optional): Directory with pre-downloaded HUD FMR Excel files; if omitted, skips HUD data
- `--cms-file` (optional): Path to pre-downloaded CMS Medicare Geographic Variation CSV; if omitted, skips CMS data
- `--years` (default: `2017,2018,2019,2020,2021,2022`): Analysis years
- `--state` (default: `CA`): State filter (FIPS prefix `06` for CA)
- `--output` (required): Output directory
- `--validate`: Run QI checks and abort on failure

**Module 1: BEA Per Capita Personal Income**

```python
def fetch_bea_income(api_key: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Fetch CAINC1 LineCode=3 (per capita personal income) for all counties in state.

    API call:
      https://apps.bea.gov/api/data?method=GetData&DataSetName=Regional
      &TableName=CAINC1&LineCode=3&GeoFips=COUNTY&Year={years}&ResultFormat=JSON
      &UserID={api_key}

    Returns DataFrame with columns:
      county_fips (str, 5-digit), year (int), per_capita_income (float)

    Filter: county_fips starts with state_fips (e.g., '06' for CA)

    Note: Per capita income is a SUPPLEMENTARY variable (demand-side).
    It does NOT enter the composite cost index (see Decision 3).
    """
```

**Module 2: BLS QCEW Healthcare Wages (NAICS 62)**

```python
def fetch_qcew_healthcare_wages(years: list[int], state_fips: str, qcew_dir: str | None) -> pl.DataFrame:
    """
    Fetch or load QCEW annual averages for NAICS 62 (Healthcare and Social Assistance),
    county level. This provides the EMPLOYEE WAGE component of the composite cost index.

    GPCI analog: PE GPCI employee wage sub-index (55.6% of adjusted PE weight → 56% in our index)

    Download URL pattern:
      https://data.bls.gov/cew/data/files/{year}/csv/{year}_annual_singlefile.zip

    Filter:
      industry_code == '62'
      own_code == 0  (total all ownerships)
      agglvl_code == 74  (county, NAICS sector)
      size_code == 0  (all sizes)
      area_fips starts with state_fips
      disclosure_code is blank (disclosed data only)

    Returns DataFrame with columns:
      county_fips (str), year (int), healthcare_estabs (int),
      healthcare_employment (int), healthcare_avg_weekly_wage (float),
      healthcare_avg_annual_pay (float)

    Evidence: MGMA (2025) reports 65% of practice leaders identify labor as biggest
    cost driver. Kaufman Hall (2024) reports labor = 84% of medical group expenses.
    The MEI weights nonphysician employee compensation at 19.15% of practice costs.
    """
```

**Module 3: BLS QCEW All-Industry Wages (Purchased Services Proxy)**

```python
def fetch_qcew_allind_wages(years: list[int], state_fips: str, qcew_dir: str | None) -> pl.DataFrame:
    """
    Fetch or load QCEW annual averages for ALL INDUSTRIES (total),
    county level. This proxies the PURCHASED SERVICES component of the composite
    cost index — the cost of contracted services (accounting, legal, building
    maintenance) that practices outsource.

    GPCI analog: PE GPCI purchased services sub-index (14.7% of adjusted PE weight → 14% in our index)

    CMS constructs the purchased services index from "BLS data on wages and
    employment in service industries, with the labor-related component (typically
    50-60%) subject to geographic adjustment" (CMS, Geographic Adjustment of
    Medicare Physician Payments, July 2012). We use all-industry avg weekly wage
    as a simpler proxy for the cost of purchased services, since contracted
    service costs track local labor market conditions.

    Filter:
      industry_code == '10' (total, all industries)
      own_code == 0
      agglvl_code == 70  (county, total all industries)
      size_code == 0
      area_fips starts with state_fips

    Returns DataFrame with columns:
      county_fips (str), year (int), allind_avg_weekly_wage (float)
    """
```

**Module 4: HUD Fair Market Rents**

```python
def load_hud_fmr(hud_dir: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Load HUD FMR Excel files for FY2017-FY2023.

    GPCI analog: PE GPCI office rent sub-index (29.7% of adjusted PE weight → 30% in our index)

    Note: FY alignment — HUD FY2022 is effective Oct 2021.
    Map: calendar year 2017 → FY2018 FMR, etc.

    Use 2-bedroom FMR as the standard measure. CMS similarly uses ACS median
    gross rent (2-bedroom) as the basis for its office rent index, reasoning that
    "residential and commercial rental markets move together within regions"
    (CMS, Draft Report on the Sixth GPCI Update, Nov 2010). We use HUD FMR
    rather than ACS gross rent because HUD FMR is county-level by design and
    updated annually, while ACS requires 5-year pooling for small counties.

    Returns DataFrame with columns:
      county_fips (str), year (int), fmr_2br (float)
    """
```

**Module 5: CMS Medicare Geographic Variation**

```python
def load_cms_medicare(cms_file: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Load CMS Medicare Geographic Variation CSV, filter to county level.

    This is NOT a component of the composite cost index. It provides the
    Medicare comparison benchmark — showing what Medicare actually pays
    in each county through its GPCI system, which Medi-Cal lacks.

    Filter:
      Bene_Geo_Lvl == 'County'
      Bene_Geo_Cd starts with state_fips
      Year in years

    Key columns to extract:
      Total_Mdcr_Stdzd_Pymt_PC  (standardized per capita — removes geographic adjusters)
      Total_Mdcr_Pymt_PC  (actual per capita — includes geographic adjusters)
      Bene_Dual_Pct  (dual eligible percent — proxy for Medicaid overlap)

    The medicare_gap = (actual - standardized) / standardized * 100
    shows the net effect of Medicare's geographic adjustment in each county.

    Returns DataFrame with columns:
      county_fips (str), year (int), medicare_actual_pc (float),
      medicare_standardized_pc (float), dual_eligible_pct (float)
    """
```

**Module 6: Merge + Compute Indices**

```python
def build_affordability_index(
    income: pl.DataFrame,
    wages_healthcare: pl.DataFrame,
    wages_allind: pl.DataFrame,
    fmr: pl.DataFrame | None,
    medicare: pl.DataFrame | None,
    state_fips: str,
) -> pl.DataFrame:
    """
    Merge all sources on (county_fips, year). Compute indices and composite.

    COMPONENT INDICES (each normalized so state median = 100):

    1. wage_index: county NAICS 62 avg_weekly_wage / state median * 100
       → GPCI analog: PE employee wage sub-index
       → Composite weight: 56% (GPCI normalized: 55.6%)

    2. rent_index: county HUD FMR 2BR / state median * 100
       → GPCI analog: PE office rent sub-index
       → Composite weight: 30% (GPCI normalized: 29.7%)

    3. purchased_services_index: county all-industry avg_weekly_wage / state median * 100
       → GPCI analog: PE purchased services sub-index
       → Composite weight: 14% (GPCI normalized: 14.7%)

    COMPOSITE COST INDEX:
      composite = (wage_index * 0.56) + (rent_index * 0.30) + (purchased_svcs_index * 0.14)

      If HUD FMR data not available (hud_dir not provided):
        Redistribute rent weight to other components proportionally:
        composite = (wage_index * 0.80) + (purchased_svcs_index * 0.20)
        Rationale: without rent data, wage index absorbs most weight since it
        remains the dominant cost driver, and purchased services absorbs the rest.

    DERIVED METRICS (not components of composite):

    4. income_index: county per_capita_income / state median * 100
       → NOT in composite (demand-side measure; see Decision 3)
       → Reported separately for researcher use

    5. effective_reimbursement_index: 100 / composite_cost_index * 100
       → 100 = state average purchasing power
       → <100 = flat reimbursement buys LESS than average in this county
       → >100 = flat reimbursement buys MORE than average
       → Example: composite=120 → effective_reimb=83.3 (17% less purchasing power)

    6. medicare_gap_pct: (actual_pc - standardized_pc) / standardized_pc * 100
       → Positive = Medicare GPCI increases payments in this county
       → Shows what geographic adjustment would look like if applied to Medicaid

    WEIGHTING JUSTIFICATION:
      Weights derived from Medicare PE GPCI sub-component cost shares as
      reported in the 2006-based MEI (current through CY 2026 PFS):
        Employee wages:     19.15% of practice costs → 55.6% of adjusted PE → 56%
        Office rent:        10.22% of practice costs → 29.7% of adjusted PE → 30%
        Purchased services:  5.07% of practice costs → 14.7% of adjusted PE → 14%
        Equipment/supplies: 12.81% of practice costs → NOT adjusted (national market)

      Sources:
        - CMS, "Draft Report on the Sixth GPCI Update," November 2010
        - AMA, "Geographic Practice Cost Indices (GPCIs)," reference document
        - CMS CY 2026 PFS Final Rule, 90 FR 49266, November 5, 2025
        - McMenamin et al., "Medicare Economic Index," Health Care Financing Review 25(1), 2003

    Returns DataFrame with columns:
      county_fips, county_name, year,
      per_capita_income, healthcare_avg_weekly_wage, allind_avg_weekly_wage, fmr_2br,
      income_index, wage_index, rent_index, purchased_services_index,
      composite_cost_index, effective_reimbursement_index,
      medicare_actual_pc, medicare_standardized_pc, medicare_gap_pct,
      dual_eligible_pct
    """
```

**Module 7: Output**

```python
def write_affordability_json(df: pl.DataFrame, output_dir: str):
    """
    Write two output files:

    1. affordability.json — all counties, most recent year, for frontend consumption
    {
      "lastUpdated": "2022",
      "methodology": {
        "composite_weights": {
          "healthcare_wages": 0.56,
          "facility_rent": 0.30,
          "purchased_services": 0.14
        },
        "weight_source": "Medicare PE GPCI sub-component cost shares (2006-based MEI)",
        "normalization": "State median = 100"
      },
      "stateMedian": {
        "per_capita_income": 41276,
        "healthcare_avg_weekly_wage": 1089,
        "fmr_2br": 1845,
        "composite_cost_index": 100.0
      },
      "counties": {
        "06037": {
          "name": "Los Angeles",
          "per_capita_income": 65890,
          "healthcare_avg_weekly_wage": 1245,
          "allind_avg_weekly_wage": 1320,
          "fmr_2br": 2128,
          "income_index": 159.6,
          "wage_index": 114.3,
          "rent_index": 115.3,
          "purchased_services_index": 121.2,
          "composite_cost_index": 115.4,
          "effective_reimbursement_index": 86.7,
          "medicare_actual_pc": 11234,
          "medicare_standardized_pc": 9876,
          "medicare_gap_pct": 13.7,
          "dual_eligible_pct": 18.2
        },
        ...
      }
    }

    2. affordability_panel.csv — all counties × all years, for research/paper use
    """
```

### Success Criteria

#### Automated Verification:
- [ ] Script runs without errors: `python scripts/build-coli-data.py --bea-key TEST --validate --output /tmp/test/`
- [ ] Output `affordability.json` has entries for all 58 CA counties
- [ ] Output `affordability_panel.csv` has 58 counties × 6 years = 348 rows
- [ ] All QI checks pass (see Phase 2)
- [ ] No `NaN` or null values in index columns
- [ ] Composite weights in output JSON sum to 1.00

#### Manual Verification:
- [ ] San Francisco has the highest wage_index (expected: >130)
- [ ] Imperial County has low wage_index (expected: <80)
- [ ] State median of composite_cost_index ≈ 100
- [ ] Medicare gap is positive for high-cost counties, negative/zero for low-cost
- [ ] Effective reimbursement index is inversely related to composite cost index

---

## Phase 2: QI (Quality Indicator) Checks

### Overview
Create a reusable validation module that runs automated data quality checks at each pipeline stage. These checks gate the output — if any CRITICAL check fails, the script aborts and no files are written.

### Changes Required

#### 1. New file: `scripts/qi_checks.py`

```python
"""
Data Quality Indicator checks for Access Explorer pipeline.

Usage:
    from qi_checks import QIRunner

    qi = QIRunner()
    qi.check_completeness(df, 'county_fips', expected_count=58, name='CA counties')
    qi.check_no_nulls(df, ['wage_index', 'rent_index'], name='index columns')
    qi.check_range(df, 'participation_rate', min_val=0, max_val=100, name='participation rate')
    qi.check_referential_integrity(df, 'county_fips', ref_df, 'fips', name='FIPS codes')

    qi.report()  # prints summary
    qi.assert_passed()  # raises if any CRITICAL checks failed
```

**Check categories:**

| Check | Level | Description |
|-------|-------|-------------|
| `check_completeness` | CRITICAL | Expected number of rows/unique values present |
| `check_no_nulls` | CRITICAL | No null/NaN values in specified columns |
| `check_range` | CRITICAL | Values within expected min/max bounds |
| `check_referential_integrity` | CRITICAL | All foreign keys match reference table |
| `check_no_duplicates` | CRITICAL | No duplicate rows on specified key columns |
| `check_disclosure` | WARNING | Flag counties with suppressed data |
| `check_year_coverage` | CRITICAL | All expected years present for each county |
| `check_distribution` | WARNING | Flag outliers beyond 3 SD from mean |
| `check_temporal_consistency` | WARNING | Year-over-year changes within expected bounds |
| `check_cross_source_correlation` | WARNING | Wage and rent indices positively correlated (r > 0.5) |
| `check_weight_sum` | CRITICAL | Composite weights sum to 1.00 |

**CRITICAL checks abort the pipeline. WARNING checks are logged but don't block output.**

**QI checks specific to each data source:**

**BEA Income:**
- 58 CA counties present per year (CRITICAL)
- Per capita income > $15,000 and < $200,000 (CRITICAL)
- No nulls in income column (CRITICAL)
- Year-over-year change < 30% (WARNING)

**QCEW Healthcare Wages:**
- 58 CA counties present per year, minus expected suppressions (CRITICAL: ≥50 counties)
- Healthcare avg weekly wage > $400 and < $5,000 (CRITICAL)
- Healthcare employment > 0 for counties with population > 5,000 (WARNING)
- Suppressed counties flagged with names (WARNING)

**QCEW All-Industry Wages:**
- 58 CA counties present per year (CRITICAL)
- All-industry avg weekly wage > $300 and < $5,000 (CRITICAL)
- No nulls (CRITICAL)

**HUD FMR:**
- 58 CA entries per fiscal year (CRITICAL)
- 2BR FMR > $400 and < $5,000 (CRITICAL)
- No nulls (CRITICAL)

**CMS Medicare:**
- ≥50 CA counties present (CRITICAL; some small counties may be suppressed)
- Per capita spending > $2,000 and < $30,000 (CRITICAL)
- Dual eligible percent between 0-100 (CRITICAL)

**Computed Indices:**
- All indices > 0 (CRITICAL)
- Composite weights sum to 1.00 exactly (CRITICAL)
- State median of each component index ≈ 100 ± 5 (WARNING)
- Wage index and rent index Pearson r > 0.3 (WARNING)
- Composite index range: 50-200 (WARNING for outliers beyond this)
- Effective reimbursement index is exactly 10000 / composite_cost_index (CRITICAL — arithmetic check)

**Cross-source checks (when affordability is merged with access data):**
- Participation rate and effective_reimbursement_index positively correlated (WARNING — weak expected)
- Counties with composite_cost_index > 120 have lower avg participation than counties < 80 (WARNING)

### Success Criteria

#### Automated Verification:
- [ ] `python -c "from qi_checks import QIRunner; print('OK')"` runs without import error
- [ ] QI runner correctly flags intentionally bad test data (unit tests)
- [ ] All CRITICAL checks pass on real/mock affordability data
- [ ] Report output is human-readable with PASS/FAIL/WARNING status per check

#### Manual Verification:
- [ ] WARNING checks produce reasonable flags (not too noisy, not silent on real issues)
- [ ] Report identifies known data quirks (e.g., Alpine County small-sample issues, QCEW suppressions for small rural counties)

---

## Phase 3: County JSON Schema Extension + Mock Data Update

### Overview
Extend the per-county JSON schema with an `affordability` object and update the 3 existing mock county files + `_summary.json`. Also update `build-access-data.py` to merge affordability data.

### Changes Required

#### 1. Extended JSON schema

Add to each county JSON file:
```json
{
  "county": "Los Angeles",
  "population": 9721138,
  "lastUpdated": "2024-12",
  "stateMedians": { ... },
  "specialties": { ... },
  "trends": { ... },
  "affordability": {
    "year": 2022,
    "per_capita_income": 65890,
    "healthcare_avg_weekly_wage": 1245,
    "allind_avg_weekly_wage": 1320,
    "fmr_2br": 2128,
    "income_index": 159.6,
    "wage_index": 114.3,
    "rent_index": 115.3,
    "purchased_services_index": 121.2,
    "composite_cost_index": 115.4,
    "composite_weights": { "wages": 0.56, "rent": 0.30, "purchased_services": 0.14 },
    "effective_reimbursement_index": 86.7,
    "medicare_actual_pc": 11234,
    "medicare_standardized_pc": 9876,
    "medicare_gap_pct": 13.7,
    "dual_eligible_pct": 18.2
  }
}
```

Add to `_summary.json`:
```json
{
  "lastUpdated": "2024-12",
  "stateMedians": {
    "per_capita_income": 41276,
    "healthcare_avg_weekly_wage": 1089,
    "composite_cost_index": 100.0
  },
  "counties": {
    "Los Angeles": {
      "participationRate": 38.5,
      "registered": 18230,
      "active": 7019,
      "composite_cost_index": 115.4,
      "effective_reimbursement_index": 86.7
    },
    ...
  },
  "alerts": [ ... ]
}
```

#### 2. Update mock data files

Create plausible mock affordability data for the 3 existing counties based on the GPCI-aligned composite:

| County | Wage Idx | Rent Idx | Purch Svc Idx | Composite (56/30/14) | Eff. Reimb. | Participation |
|--------|----------|----------|--------------|---------------------|-------------|---------------|
| Los Angeles | 114 | 122 | 121 | 117.0 | 85.5 | 38.5% |
| Fresno | 83 | 68 | 79 | 77.6 | 128.9 | 32.1% |
| Imperial | 74 | 55 | 72 | 66.5 | 150.4 | 22.8% |

Calculation check for LA: (114 × 0.56) + (122 × 0.30) + (121 × 0.14) = 63.84 + 36.60 + 16.94 = 117.4 ≈ 117.0

Pattern: Fresno and Imperial have LOW cost indices but also LOW participation — this is expected because rural access problems are driven by provider scarcity (too few providers in the area at all), not cost. The key insight the tool reveals is that high-cost counties ALSO have low participation due to reimbursement inadequacy, creating a *different mechanism* of access failure. The scatter plot across all 58 counties makes this dual-mechanism pattern visible.

#### 3. Update `_summary.json` with affordability fields for all 58 counties

Generate plausible cost index values for all 58 counties based on known regional economics (Bay Area high, Central Valley low, rural very low).

#### 4. Modify `scripts/build-access-data.py`

**Changes:**
- Add `--affordability` argument pointing to `data/access-explorer/affordability/affordability.json`
- In `build_county_data()`, load affordability JSON and merge into each county's output
- Add affordability fields to `_summary.json` output

### Success Criteria

#### Automated Verification:
- [ ] All 3 county JSON files validate against extended schema (has `affordability` key with all required fields)
- [ ] `_summary.json` has `stateMedians` and per-county affordability fields
- [ ] `build-access-data.py --help` shows `--affordability` argument
- [ ] QI cross-source checks pass on mock data
- [ ] Composite weights in mock data JSON sum to 1.00

#### Manual Verification:
- [ ] Mock affordability values are plausible for each county's known economics
- [ ] High-cost counties (LA, SF, San Mateo) have composite > 110
- [ ] Low-cost counties (Imperial, Modoc) have composite < 75
- [ ] LA composite back-calculation matches: (114×0.56)+(122×0.30)+(121×0.14) ≈ 117

---

## Phase 4: Frontend — Affordability Context Panel

### Overview
Add a new "Affordability Context" section to the Access Explorer results panel, below the existing charts. This section shows how local costs compare to the state average and introduces a scatter plot of participation rate vs. cost index.

### Changes Required

#### 1. HTML additions (`public/tools/access-explorer/index.html`)

After the trend chart section (~line 543), add:

```html
<!-- Affordability Context -->
<div id="affordability-section" class="chart-section hidden">
  <h3>Affordability Context</h3>
  <p class="section-description">
    How local healthcare operating costs compare to the state average, and what that
    means for Medi-Cal provider participation. Composite cost index weights follow
    the Medicare Practice Expense GPCI structure: 56% employee wages, 30% facility
    rent, 14% purchased services.
  </p>

  <!-- Cost Index Cards -->
  <div id="cost-cards" class="cost-cards">
    <!-- Dynamically populated: 4 cards -->
  </div>

  <!-- Key Insight Callout -->
  <div id="cost-insight" class="insight-callout">
    <!-- Dynamic: purchasing power comparison -->
  </div>

  <!-- Medicare Comparison -->
  <div id="medicare-comparison" class="medicare-box">
    <!-- Dynamic: GPCI comparison -->
  </div>

  <!-- Scatter Plot: All 58 counties -->
  <div class="chart-wrapper">
    <h4 id="scatter-title">Participation Rate vs. Cost of Living (All CA Counties)</h4>
    <canvas id="scatter-chart"></canvas>
  </div>
</div>
```

#### 2. Inline CSS additions

```css
.cost-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.cost-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
}

.cost-card .cost-value {
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-heading);
}

.cost-card .cost-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
}

.cost-card .cost-weight {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.insight-callout {
  background: #FFF3E0;
  border-left: 4px solid #F57C00;
  padding: var(--space-md) var(--space-lg);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: var(--space-lg);
  font-size: var(--font-size-sm);
}

.medicare-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  margin-bottom: var(--space-lg);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .cost-cards { grid-template-columns: repeat(2, 1fr); }
}
```

#### 3. JavaScript additions (`src/frontend/js/access-explorer.js`)

**New global state:**
```javascript
let summaryData = null;  // Loaded once, used for scatter plot
let scatterChart = null;
```

**New functions:**

```javascript
async function loadSummaryData() {
  // Fetch _summary.json once on page load for scatter plot data
  // Store in summaryData global
}

function renderAffordability(data) {
  // Called from renderResults() if data.affordability exists
  // 1. Render cost index cards (4 cards: composite, wage, rent, effective reimbursement)
  // 2. Render insight callout with purchasing power comparison
  // 3. Render Medicare comparison box (if medicare data available)
  // 4. Render scatter plot
}

function renderCostCards(affordability) {
  // Four cards:
  // - Composite Cost Index: {composite_cost_index} (color: green <90, yellow 90-110, red >110)
  //   Subtitle: "Practice operating cost level"
  //   Note: INVERTED color — high cost = harder for providers = red
  //
  // - Healthcare Wage Index: {wage_index}
  //   Subtitle: "56% of composite"
  //
  // - Facility Rent Index: {rent_index}
  //   Subtitle: "30% of composite"
  //
  // - Effective Reimbursement: {effective_reimbursement_index}
  //   Color: green >110, yellow 90-110, red <90
  //   Subtitle: "Purchasing power of flat payment"
}

function renderInsightCallout(countyName, affordability, overallRate) {
  // "In {county}, healthcare operating costs are {composite}% of the state average.
  //  A flat $100 Medi-Cal payment has the purchasing power of ${effective_reimb} here.
  //  Healthcare workers earn {wage_index}% of the state average wage, and facility
  //  rent is {rent_index}% of the state average."
  //
  // If effective_reimb < 90:
  //   "This means providers in {county} face a {100-effective_reimb}% effective
  //    reimbursement penalty compared to the state average, which may contribute to
  //    the county's {participation_rate}% provider participation rate."
  //
  // Citation: "Composite weights follow the Medicare PE GPCI structure
  //  (CMS CY 2026 PFS, 90 FR 49266)."
}

function renderMedicareComparison(countyName, affordability) {
  // Only rendered if medicare_gap_pct is present in data
  // "Medicare adjusts physician payments geographically through the Geographic
  //  Practice Cost Index (GPCI), mandated by Congress in 1989 (OBRA 89). In
  //  {county}, Medicare's geographic adjustment increases payments by {gap}%
  //  above the national standardized rate. Medi-Cal applies no such geographic
  //  adjustment — a provider in {county} receives the same fee schedule rate
  //  as one in any other California county."
}

function renderScatterPlot(currentCounty, summaryData) {
  // Chart.js scatter plot
  // X-axis: composite_cost_index (50-180), label: "Practice Cost Index (state avg = 100)"
  // Y-axis: participationRate (0-60%), label: "Medicaid Participation Rate (%)"
  // Each point = one county from summaryData
  // Current county highlighted (larger point, different color, labeled)
  //
  // Reference lines:
  //   Vertical at x=100 (state average cost)
  //   Horizontal at state median participation rate
  //
  // Tooltip: "{county}: {rate}% participation, cost index {cost_index}"
  //
  // No trend line — this is descriptive, not causal (see Decision 4 caveat)
}
```

**Modify `renderResults()`** (line 153):
```javascript
function renderResults() {
  renderSummaryStats();
  renderRateCards();
  renderBarChart();
  renderTrendChart();
  renderAlerts();
  // NEW:
  if (currentCountyData.affordability) {
    renderAffordability(currentCountyData);
  }
}
```

#### 4. Update Schema.org JSON-LD

Add to the WebApplication `featureList`:
```
"County-level practice operating cost comparison using GPCI-aligned weights (BLS wages, HUD rents)"
```

Add FAQ entry:
```json
{
  "@type": "Question",
  "name": "How does cost of living affect Medi-Cal provider participation?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Medi-Cal reimbursement rates are set statewide with no geographic adjustment, unlike Medicare which adjusts payments through the Geographic Practice Cost Index (GPCI). In high-cost counties, the same Medi-Cal payment buys less labor, rent, and services. The composite cost index uses GPCI-aligned weights — 56% healthcare employee wages, 30% facility rent, 14% purchased services — to show how practice operating costs vary across California's 58 counties. The Effective Reimbursement Index translates this into purchasing power: how much a flat dollar payment is worth in each county."
  }
}
```

### Success Criteria

#### Automated Verification:
- [ ] Page loads without JS errors when county with affordability data is selected
- [ ] Page loads without JS errors when county WITHOUT affordability data is selected (graceful fallback)
- [ ] Scatter chart renders with data points from _summary.json
- [ ] Cost cards display with correct color coding
- [ ] Schema.org JSON-LD validates (no duplicate keys, valid JSON)

#### Manual Verification:
- [ ] Affordability section appears below trend chart when LA/Fresno/Imperial selected
- [ ] Affordability section is hidden for counties without affordability data
- [ ] Scatter plot highlights the selected county
- [ ] All four cost cards show correct values and weight subtitles
- [ ] Insight callout text is accurate, cites GPCI source, and reads naturally
- [ ] Medicare comparison makes the OBRA 89 / "no geographic adjustment" point clearly
- [ ] Responsive at 768px — cost cards go to 2-column grid
- [ ] Color coding is inverted correctly (high cost = red from provider perspective)

---

## Phase 5: Methodology Page Update

### Overview
Add an "Affordability Data" section to the methodology page documenting the new data sources, GPCI-aligned weighting, and evidence base.

### Changes Required

#### 1. New section in `public/tools/access-explorer/methodology.html`

Add after the existing "Limitations" section (~line 337):

```html
<h2>Affordability Context: Data Sources and Methodology</h2>

<h3>Research Question</h3>
<p>Medi-Cal reimbursement rates are set statewide with no geographic adjustment.
Medicare, by contrast, adjusts physician payments through the Geographic Practice
Cost Index (GPCI), mandated by Congress in the Omnibus Budget Reconciliation Act
of 1989. The Affordability Context module asks: how do local practice operating
costs compare to the state average, and what does this imply for the purchasing
power of flat Medi-Cal payments?</p>

<h3>Data Sources</h3>
<table class="data-table">
  <thead><tr><th>Source</th><th>Agency</th><th>Geography</th><th>Coverage</th><th>Role in Index</th></tr></thead>
  <tbody>
    <tr><td>QCEW Annual Averages, NAICS 62</td><td>Bureau of Labor Statistics</td><td>County</td><td>2017-2022</td><td>Employee wage component (56%)</td></tr>
    <tr><td>Fair Market Rents, 2-Bedroom</td><td>HUD</td><td>County</td><td>FY2018-FY2023</td><td>Facility rent component (30%)</td></tr>
    <tr><td>QCEW Annual Averages, All Industries</td><td>Bureau of Labor Statistics</td><td>County</td><td>2017-2022</td><td>Purchased services proxy (14%)</td></tr>
    <tr><td>Per Capita Personal Income (CAINC1)</td><td>Bureau of Economic Analysis</td><td>County</td><td>2017-2022</td><td>Supplementary (demand-side)</td></tr>
    <tr><td>Medicare Geographic Variation</td><td>CMS</td><td>County</td><td>2017-2022</td><td>Comparison benchmark</td></tr>
  </tbody>
</table>

<h3>Composite Cost Index Construction</h3>
<p>The composite cost index is a weighted average of three components, each
normalized so the state median equals 100:</p>
<table class="data-table">
  <thead><tr><th>Component</th><th>Weight</th><th>GPCI Analog</th><th>Data Source</th></tr></thead>
  <tbody>
    <tr><td>Healthcare employee wages</td><td>56%</td><td>PE employee wage sub-index</td><td>BLS QCEW, NAICS 62</td></tr>
    <tr><td>Facility rent</td><td>30%</td><td>PE office rent sub-index</td><td>HUD FMR, 2-bedroom</td></tr>
    <tr><td>Purchased services</td><td>14%</td><td>PE purchased services sub-index</td><td>BLS QCEW, all-industry</td></tr>
  </tbody>
</table>

<h3>Weighting Rationale</h3>
<p>Weights are derived from the Medicare Practice Expense (PE) GPCI sub-component
cost shares as reported in the 2006-based Medicare Economic Index, which remains
current through the CY 2026 Physician Fee Schedule (90 FR 49266). Within the PE
GPCI, the geographically-adjusted sub-components have the following cost shares:
employee wages (19.15% of practice costs), office rent (10.22%), and purchased
services (~5.07%). Equipment and supplies (12.81%) are set to 1.00 nationally
because they are purchased in national markets. Normalizing the adjusted components
to sum to 100% yields the weights used here: 55.6% → 56%, 29.7% → 30%, 14.7% → 14%.</p>

<h3>Per Capita Income</h3>
<p>Per capita personal income (BEA CAINC1) is reported as a supplementary variable
but is NOT included in the composite cost index. Income is a demand-side measure
(patient economic capacity), while the composite measures supply-side operating
costs (what it costs to run a practice). Medicare's GPCI does not include patient
income in any of its three components. Including income in the composite would
conflate two distinct economic constructs.</p>

<h3>Effective Reimbursement Index</h3>
<p>The effective reimbursement index = 10,000 / composite_cost_index, showing
how much purchasing power a flat Medi-Cal payment has in each county relative to
the state average. A county with composite = 120 has an effective reimbursement
index of 83.3, meaning a flat $100 payment buys only $83.30 worth of inputs
compared to the state average. Research by Alexander and Schnell (2024) found that
closing the Medicaid-private payment gap would reduce more than two-thirds of
access disparities for adults. Polsky et al. (2015) estimated a 1.25 percentage
point increase in appointment availability per 10% increase in Medicaid
reimbursement. These findings suggest that geographic variation in effective
reimbursement may contribute to geographic variation in provider participation.</p>

<h3>Medicare Comparison</h3>
<p>Medicare adjusts physician payments through three GPCIs — work, practice expense,
and malpractice — mandated by OBRA 1989 (P.L. 101-239). The Geographic Adjustment
Factor (GAF) can increase payments by 20% or more in high-cost areas. The Medicare
Geographic Variation Public Use File reports actual versus standardized per capita
spending by county, allowing direct computation of the adjustment effect. Medi-Cal
applies no analogous geographic adjustment to its physician fee schedule.</p>

<h3>Limitations of the Affordability Analysis</h3>
<ul>
  <li>QCEW data may be suppressed for small counties with few healthcare employers
  (BLS non-disclosure rules). Suppressed counties are flagged but excluded from
  the composite calculation.</li>
  <li>HUD Fair Market Rents measure residential rent as a proxy for commercial
  office rent. CMS uses the same proxy approach for the PE office rent GPCI
  sub-index, but actual commercial rents may diverge in some markets.</li>
  <li>The composite cost index captures practice operating costs but not physician
  compensation, which the Medicare GPCI addresses through a separate work component.
  The work GPCI is statutorily limited to one-quarter of geographic variation.</li>
  <li>The tool presents descriptive correlations between cost indices and participation
  rates, not causal estimates. The payment-participation relationship is established
  at the state level (Alexander & Schnell 2024; Polsky et al. 2015); our within-state
  application extends this logic to geographic variation against a uniform fee schedule.</li>
  <li>Administrative barriers may affect participation as much as payment rates.
  MACPAC (2025) found physicians lose 17.6% of Medicaid visit contractual value to
  claims denials and resubmissions (vs. 4.7% for Medicare).</li>
</ul>
```

#### 2. Add new references (continuing from existing [5])

```
[6] Alexander, D. and M. Schnell. 2024. "Closing the Gap: The Effect of Reducing
    Complexity and Uncertainty in Tax Filing on Take-Up." American Economic Journal:
    Applied Economics. [Note: verify exact title — this may be the Medicaid payment paper]

[7] Polsky, D., M. Richards, S. Basseyn, et al. 2015. "Appointment Availability
    after Increases in Medicaid Payments for Primary Care." New England Journal of
    Medicine 372(6):537-545.

[8] Centers for Medicare & Medicaid Services. 2025. "Calendar Year (CY) 2026
    Medicare Physician Fee Schedule Final Rule (CMS-1832-F)." Federal Register
    90 FR 49266, November 5, 2025.

[9] Bureau of Labor Statistics. "Quarterly Census of Employment and Wages."
    Annual Averages, NAICS 62 Healthcare and Social Assistance.
    https://www.bls.gov/cew/downloadable-data-files.htm

[10] Bureau of Economic Analysis. "Personal Income by County, Metro, and Other Areas."
     CAINC1 Table. https://www.bea.gov/data/income-saving/personal-income-county-metro-and-other-areas

[11] Medicaid and CHIP Payment and Access Commission (MACPAC). 2025. "Evaluating
     the Effects of Medicaid Payment Changes on Access to Physician Services."
     January 2025.

[12] Institute of Medicine. 2012. "Geographic Adjustment in Medicare Payment:
     Phase I: Improving Accuracy." Washington, DC: The National Academies Press.
```

### Success Criteria

#### Automated Verification:
- [ ] Methodology page loads without errors: `curl -s http://localhost:3000/tools/access-explorer/methodology | grep "Affordability"`
- [ ] All reference numbers are sequential and unique

#### Manual Verification:
- [ ] New section reads clearly and explains the GPCI-aligned index construction
- [ ] Data source table includes all 5 sources with correct roles
- [ ] Weight derivation is transparent (reader can verify: 19.15/(19.15+10.22+5.07) ≈ 55.6%)
- [ ] Limitations section is honest about proxy assumptions and descriptive (not causal) framing
- [ ] References are properly formatted and verifiable

---

## Phase 6: Deploy + Verify

### Overview
Commit all changes, deploy to Heroku, and verify the live site.

### Changes Required

#### 1. Git commit

Files to stage:
- `scripts/build-coli-data.py` (new)
- `scripts/qi_checks.py` (new)
- `data/access-explorer/*.json` (modified mock data)
- `public/tools/access-explorer/index.html` (modified)
- `public/tools/access-explorer/methodology.html` (modified)
- `src/frontend/js/access-explorer.js` (modified)
- `docs/research/access-explorer-affordability-data-selection.md` (new — from previous session)
- `thoughts/shared/plans/access-explorer-coli-integration.md` (new)
- All 57 modified nav HTML files (from previous session)
- `scripts/build-access-data.py` (from previous session)

#### 2. Deploy

```bash
git push origin master  # CAPHE uses origin for Heroku
```

#### 3. Post-deployment verification

```bash
curl -sI https://www.caphegroup.org/tools/access-explorer/ | head -5
curl -s https://www.caphegroup.org/data/access-explorer/los_angeles.json | python -m json.tool | head -30
curl -s https://www.caphegroup.org/tools/access-explorer/methodology | grep "GPCI"
```

### Success Criteria

#### Automated Verification:
- [ ] `git status` shows clean working tree after commit
- [ ] Heroku deploy succeeds (no build errors)
- [ ] All three curl checks above return expected content

#### Manual Verification:
- [ ] Visit live site, select Los Angeles → affordability section visible with 4 cost cards
- [ ] Scatter plot renders with county dots and reference lines
- [ ] Methodology page shows GPCI-aligned weighting section with derivation
- [ ] Resources dropdown shows "Access Explorer" across all pages
- [ ] Mobile responsive check at 768px

---

## Testing Strategy

### Unit Tests (QI module):
- Test each QI check function with known-good and known-bad data
- Verify CRITICAL checks raise on failure
- Verify WARNING checks log but don't raise
- Verify weight_sum check catches weights that don't sum to 1.00

### Integration Tests (data pipeline):
- Run `build-coli-data.py` with `--validate` against real BEA API (requires key)
- Verify output JSON schema matches expected structure
- Verify composite_cost_index = (wage×0.56 + rent×0.30 + purch×0.14) for each county
- Verify effective_reimbursement_index = 10000 / composite for each county
- Verify merge with access data produces valid county files

### Manual Testing Steps:
1. Start local server: `cd /Users/victoriaperez/Projects/CAPHE && node src/backend/server.js`
2. Navigate to `http://localhost:3000/tools/access-explorer/`
3. Type "Los Angeles" → verify participation data + affordability section loads
4. Type "Fresno" → verify different affordability values
5. Type "Imperial" → verify critical access + low cost pattern
6. Type "San Francisco" → verify "Data Not Yet Available" (no mock file) + no JS errors
7. Check all 4 cost cards show values with weight subtitles (56%, 30%, 14%, derived)
8. Check scatter plot has data points, reference lines, and highlights current county
9. Click CSV download → verify affordability columns included
10. Visit methodology page → verify GPCI-aligned weighting section and evidence citations
11. Check responsive layout at 768px on each section

## Performance Considerations

- `_summary.json` fetch (~25KB with affordability fields) happens once on page load for scatter plot data
- Individual county JSON fetches remain small (<6KB each with affordability)
- Scatter plot with 58 points is trivial for Chart.js
- No performance concerns at this data scale

## Evidence Bibliography

All design decisions in this plan are traceable to published sources. Full citations:

### Payment-Participation Relationship
1. Alexander, D. and M. Schnell. 2024. "The Impacts of Physician Payments on Patient Access, Use, and Health." *American Economic Journal: Applied Economics*. DOI: 10.1257/app.20210227
2. Polsky, D., M. Richards, S. Basseyn, et al. 2015. "Appointment Availability after Increases in Medicaid Payments for Primary Care." *New England Journal of Medicine* 372(6):537-545. PMID: 25607243
3. AMA. 2020. "Medicaid Physician Payment: An Overview." Research summary. https://www.ama-assn.org/system/files/2020-10/research-summary-medicaid-physician-payment.pdf
4. MACPAC. 2025. "Evaluating the Effects of Medicaid Payment Changes on Access to Physician Services." January 2025. https://www.macpac.gov/wp-content/uploads/2025/01/Evaluating-the-Effects-of-Medicaid-Payment-Changes-on-Access-to-Physician-Services.pdf

### Practice Cost Structure
5. MGMA. 2025. "Confronting Cost Pressures in Your Medical Practice: Short- and Long-Term Strategies." MGMA Stat, July 2025. https://www.mgma.com/mgma-stat/confronting-cost-pressures-in-your-medical-practice-short-and-long-term-strategies
6. Kaufman Hall. 2024. Physician Flash Report. Cited in MGMA 2025.
7. McMenamin, P. et al. 2003. "Medicare Economic Index." *Health Care Financing Review* 25(1). PMC4193200

### Medicare GPCI Structure
8. CMS. 2025. "CY 2026 Medicare Physician Fee Schedule Final Rule (CMS-1832-F)." *Federal Register* 90 FR 49266, November 5, 2025.
9. AMA. "Geographic Practice Cost Indices (GPCIs)." Reference document. https://www.ama-assn.org/system/files/geographic-practice-cost-indices-gpcis.pdf
10. CMS. 2010. "Draft Report on the Sixth GPCI Update." November 2010. https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/PhysicianFeeSched/downloads/GPCI_Report.pdf
11. CMS. 2012. "Geographic Adjustment of Medicare Physician Payments." July 2012. https://www.cms.gov/medicare/medicare-fee-for-service-payment/physicianfeesched/downloads/geographic_adjustment_of_medicare_physician_payments_july2012.pdf
12. Institute of Medicine. 2012. "Geographic Adjustment in Medicare Payment: Phase I." Washington, DC: The National Academies Press. NBK190061

### Phantom Networks
13. Zhu, J.M. et al. 2023. "Phantom Networks: Discrepancies Between Reported And Realized Mental Health Care Access In Oregon Medicaid." *Health Affairs* 42(1).
14. HHS Office of Inspector General. 2025. Report OEI-02-23-00540, October 2025.
15. CMS. 2024. Final Rule CMS-2439-F. Network adequacy rules effective July 2025.
