"""
National Medicaid Provider Participation: Paper Feasibility Assessment

Author: V Cholette
Date: February 2026

This document evaluates the feasibility of four paper concepts using HHS Medicaid
Provider Spending data (Jan 2018–Dec 2024) combined with NPPES provider registries.
Each concept is assessed for data completeness, identification strategy validity,
statistical power, and overall publication readiness for top-tier journals.

Core Data Foundation:
- HHS Medicaid Provider Spending: 227M rows, 50 states + DC, Jan 2018–Dec 2024
- NPPES NPI Registry: ~8M providers, monthly updates, historical snapshots 2017-2024
- Participation rate = unique NPIs billing Medicaid / active NPIs in specialty-geography
"""

## CONCEPT 1: BEHAVIORAL HEALTH PARADOX

**Research Question:** Why does behavioral health have the lowest Medicaid participation
despite the highest demand?

**Target Journals:** JAMA, NEJM, Health Affairs

### 1. Data Completeness Assessment

**Available (85% of ideal dataset):**
- HHS spending data covers full period with BH provider billing patterns
- NPPES taxonomy codes cleanly identify BH specialties: psychiatry (2084P0800X),
  psychologists (103T/103TC), clinical social workers (1041C0700X), MH counselors
  (101YM0800X), psych NPs (363LP0808X) — approximately 360K providers
- State-level 988 call volume data exists (scrapeable from PDF reports)
- Parity law enactment dates reconstructable from LAPPA/ParityTrack/NCSL

**Missing (15%):**
- 988 data in PDF format requires manual extraction (3-4 days work)
- Parity law effective dates require manual coding from 3 sources (2-3 days work)
- Parity law CONTENT varies dramatically (LAPPA documents 7 different policy dimensions)
- No standardized measure of parity law strength/enforcement

**Binding Gap:** The 988 rollout was simultaneous nationwide (July 16, 2022), eliminating
staggered difference-in-differences entirely. This is a CRITICAL design flaw.

### 2. Timeline Alignment

**988 Demand Shock:**
- Implementation: July 16, 2022 (month 55 of 84-month data window)
- Pre-period: 54 months (Jan 2018–Jun 2022)
- Post-period: 30 months (Jul 2022–Dec 2024)
- Timeline: ADEQUATE but simultaneous rollout prevents clean causal inference

**Parity Laws:**
- Staggered adoption spans 2016-2023
- Most variation falls within data window (2018-2023)
- Late adopters (2022-2023) provide only 12-24 months post-treatment
- Timeline: GOOD for staggered DiD

### 3. Statistical Power Estimate

**Units of Analysis:**
- State-month panel: 51 states × 84 months = 4,284 observations
- Treatment variation: 29 states enacted BH parity bills in 2025 alone; historical
  variation 2016-2023 provides ~40 treatment events
- Outcome variation: CA shows BH participation ranges 15-45% across counties;
  state-level variation likely 20-50%

**Power Calculation (Rough):**
- Staggered DiD with 40 treatment events, 4,284 state-months
- Assuming participation SD = 10 percentage points, α = 0.05, β = 0.20
- MDE (minimum detectable effect) ≈ 2-3 percentage points
- Power: ADEQUATE for clinically meaningful effects (5+ percentage points)

**Concern:** 988 analysis limited to simple pre-post comparison across all states
simultaneously — no credible control group. Power is irrelevant without identification.

### 4. Identification Threats

**Top 3 Threats:**

1. **Simultaneous 988 Rollout (FATAL):**
   - No staggered variation means no clean control group
   - Cannot distinguish 988 effect from other July 2022 confounders (monkeypox emergency,
     continued COVID policy evolution, macroeconomic conditions)
   - Workaround: Use state-level call volume VARIATION as continuous treatment intensity,
     but this is endogenous (states with worse baseline access → higher call volumes)

2. **Parity Law Endogeneity:**
   - States adopt parity laws BECAUSE of poor BH access (reverse causality)
   - Event study can test for pre-trends, but selection on unobservables remains
   - Workaround: Include state-specific linear trends, control for pre-treatment BH
     utilization, Medicaid expansion status, baseline physician supply

3. **Parity Law Heterogeneity:**
   - ParityTrack 2018 evaluation: only 1 state got "A" grade, 32 got "F"
   - Treatment variable is binary (enacted/not) but implementation quality varies enormously
   - Enforcement is rare (LAPPA documents minimal state enforcement activity)
   - Workaround: Code parity law "strength" using LAPPA dimensions, but this requires
     subjective scoring and is labor-intensive

**Additional Threat:**
- Managed care penetration: If most Medicaid BH is managed care, provider participation
  may respond to plan network adequacy standards rather than parity laws directly

### 5. Specific Design Checks

**Can we construct state-by-month panels of BH participation rates?**
- YES. HHS data has claim_month; NPPES has state; taxonomy codes identify BH providers.
- Denominator issue: NPPES includes inactive providers. Need to restrict to those who
  billed ANY payer in past 12 months OR who maintain active NPI record.

**Does 988 nationwide simultaneous rollout kill staggered DID?**
- YES. No staggered variation = no Callaway-Sant'Anna estimator.
- Alternative: Synthetic control using one state as treated (but which one?), or
  continuous treatment intensity (call volume growth) with instrumental variables
  (but what instrument?).

**Are parity laws staggered enough for Callaway-Sant'Anna?**
- Potentially YES. Need to map exact effective dates from LAPPA/ParityTrack/NCSL.
- If ~40 states adopted over 2016-2023 with varied timing, CS estimator is feasible.
- Never-treated controls: States without comprehensive parity laws as of Dec 2024.

### 6. Feasibility Verdict: YELLOW

**Reasoning:**
- Data is 85% complete and can be assembled in 1 week
- Parity law analysis is feasible with staggered DiD (Callaway-Sant'Anna)
- 988 analysis has fatal identification flaw (simultaneous rollout)
- Can salvage as descriptive "demand shock" analysis or use continuous treatment
  (call volume variation) with caveats

**To Upgrade to GREEN:**
1. Drop 988 as causal analysis; use only as descriptive motivation
2. Focus on parity law staggered DiD as primary causal strategy
3. Code parity law strength from LAPPA to explore heterogeneous effects
4. Add robustness: synthetic control for states with dramatic parity changes

**Remaining Risks:**
- Parity law endogeneity (states with worse BH access adopt parity)
- Weak enforcement makes "treatment" potentially weak
- Managed care networks may mediate parity law effects

---

## CONCEPT 2: MATERNAL HEALTH DESERTS

**Research Question:** Does extending postpartum Medicaid coverage improve OB/GYN
provider participation in underserved areas?

**Target Journals:** NEJM, Health Affairs, JAMA

### 1. Data Completeness Assessment

**Available (90% of ideal dataset):**
- HHS spending data covers full period with OB/GYN billing patterns
- NPPES taxonomy codes: 207V00000X (OB/GYN), 207VM0101X (maternal-fetal medicine)
- HCPCS codes for OB services: 59400-59622 (global OB packages), prenatal visits, delivery
- Postpartum extension effective dates: DOCUMENTED for all 47 adopting states + DC
  (ASPE 2023 Appendix B, KFF tracker, NASHP tracker)
- Staggered adoption: April 1, 2022 (first wave ~20 states) through March 2024
- Never-treated controls: AR and WI (only 2 holdouts)
- County Health Rankings low birth weight data: free, all counties, multi-year averages

**Missing (10%):**
- OB unit closure dates: No single free database
  - CMS Provider of Services (POS) file: free but incomplete (only Medicare-certified units)
  - AHA Annual Survey: comprehensive but requires paid license ($1,500-$3,000)
  - Sheps Center: rural only (excludes urban closures)
- March of Dimes maternity care deserts: 4 waves (2018, 2020, 2022, 2024) but requires
  formal data request (not bulk downloadable)
- County-level birth outcomes for small counties: CDC WONDER suppresses <100K population
  (83% of counties). NCHS restricted data requires DUA + RDC access.

**Binding Gap:** Birth outcome data for small counties requires restricted NCHS access.
However, this is a SECONDARY outcome; primary outcome (provider participation) is fully available.

### 2. Timeline Alignment

**Postpartum Coverage Extensions:**
- First adoptions: April 1, 2022 (month 52 of 84-month data window)
- Staggered adoption: Apr 2022–Mar 2024 (24 months)
- Final adoptions: March 2024 (month 75 of 84-month window)

**Pre-Post Windows:**
- Early adopters (Apr 2022): 51 months pre, 33 months post — EXCELLENT
- Late adopters (Mar 2024): 75 months pre, 10 months post — ADEQUATE for short-run effects

**Timeline: EXCELLENT** — policy falls squarely in data window with adequate pre-periods
for parallel trends testing and meaningful post-periods for effect detection.

### 3. Statistical Power Estimate

**Units of Analysis:**
- State-month panel: 51 states × 84 months = 4,284 observations
- County-month panel: ~3,100 counties × 84 months = 260,400 observations
- Treatment variation: 47 states adopted (staggered); only AR and WI never-treated

**Treatment Timing:**
- First wave (Apr 2022): ~20 states
- Gradual adoption (May 2022–Mar 2024): ~27 states
- Sufficient staggering for Callaway-Sant'Anna estimator

**Outcome Variation:**
- CA shows OB/GYN participation median 38.4%, county-level range 20-65%
- Expected effect size: If coverage extension increases participation 5-10 percentage points
  in underserved areas, this is detectable

**Power Calculation (Rough):**
- County-month panel: 260K observations, ~47 treatment groups, ~2 never-treated controls
- Assuming participation SD = 15 percentage points, α = 0.05, β = 0.20
- MDE ≈ 1.5-2 percentage points at county level
- Power: EXCELLENT for meaningful effects (5+ percentage points)

**Concern:** Only 2 never-treated controls (AR, WI) limits Callaway-Sant'Anna to
"not-yet-treated" comparison units. This is valid but reduces statistical power slightly.

### 4. Identification Threats

**Top 3 Threats:**

1. **Endogenous Adoption Timing:**
   - States with worse maternal health outcomes may adopt earlier/later
   - Example: States with high maternal mortality → earlier adoption to address crisis
   - Workaround: Event study to test pre-trends; control for baseline maternal health
     measures (MMR, infant mortality, uninsured rate), Medicaid expansion status

2. **Simultaneous Policy Changes:**
   - Many states bundled postpartum extension with OTHER maternal health policies
     (doula coverage, midwifery scope expansion, implicit bias training)
   - Example: CA SB 65 (postpartum extension) + SB 464 (doula Medi-Cal coverage) both 2021
   - Cannot isolate postpartum coverage effect from bundled policies
   - Workaround: Code other maternal health policies as time-varying controls;
     acknowledge bundling in limitations

3. **Provider Supply Dynamics:**
   - OB/GYN workforce is declining nationally (ACOG projects 6,000-8,000 provider shortage by 2030)
   - Retirements and training pipeline changes confound treatment effects
   - Rural hospital closures → OB unit closures → provider exit (separate from coverage policy)
   - Workaround: Control for county-level hospital closures (if data available),
     include county-specific linear trends, use rural/urban subgroup analysis

**Additional Threat:**
- Managed care networks: Most Medicaid births occur in managed care. Network adequacy
  standards may drive participation more than coverage duration.

### 5. Specific Design Checks

**How many treated states have adequate staggering for CS estimator?**
- 47 treated states + DC across 24-month window (Apr 2022–Mar 2024)
- KFF tracker shows: Apr 2022 (~20 states), gradual monthly adoption thereafter
- Sufficient staggering: YES — Callaway-Sant'Anna estimator is appropriate
- Limitation: Only AR and WI as never-treated controls (rely on not-yet-treated comparison)

**Can we link OB closures to county-level participation without AHA data?**
- Partial YES with free data:
  - CMS POS file: tracks Medicare-certified OB units (births, beds) — incomplete but free
  - Sheps Center rural hospital closures: rural OB units — free but rural-only
- Complete answer requires AHA Annual Survey (paid license)
- Workaround: Use CMS POS + Sheps as proxy; acknowledge undercount in urban areas

**Can we measure maternity care deserts without March of Dimes bulk data?**
- Construct our own measure from NPPES + HRSA FQHC data:
  - County has 0 OB/GYN providers (from NPPES)
  - OR <60 OB/GYN FTE per 10,000 births (from NPPES + CDC birth counts)
- March of Dimes definition: No hospital/birth center AND no OB/GYN providers AND
  low/no prenatal care utilization
- Our measure is SIMPLER but captures key concept
- Request March of Dimes data for validation/robustness

### 6. Feasibility Verdict: GREEN

**Reasoning:**
- Data is 90% complete with clear path to assembly (1 week)
- Identification strategy is credible: staggered DiD with Callaway-Sant'Anna
- Policy variation is well-documented with exact effective dates
- Timeline alignment is excellent (policy squarely in data window)
- Primary outcome (provider participation) is fully observable
- Secondary outcomes (birth outcomes) available for large counties; restricted data
  needed for small counties but not required for publication

**Strengths:**
1. Clean policy experiment with staggered state adoption
2. Well-documented treatment dates (ASPE, KFF, NASHP)
3. Policy relevance is HIGH (maternal mortality crisis, Medicaid coverage gaps)
4. Data is free and publicly available (no DUA required for main analysis)
5. Large sample size (260K county-months) provides excellent power

**To Strengthen Further:**
1. Request March of Dimes maternity care desert data for validation
2. Code bundled maternal health policies (doula coverage, midwifery scope) as controls
3. Obtain CMS POS file to track OB unit closures (free)
4. Consider NCHS restricted data application for small-county birth outcomes (optional)

**Publication Path:**
- Main analysis: Provider participation (free data, no DUA)
- Submit to NEJM or Health Affairs
- If NCHS data obtained, add birth outcomes for higher impact (NEJM more likely)

---

## CONCEPT 3: REIMBURSEMENT ADEQUACY ELASTICITIES

**Research Question:** What is the elasticity of provider participation with respect to
Medicaid reimbursement rates?

**Target Journals:** Health Affairs, Journal of Health Economics (JHE), AEJ: Applied

### 1. Data Completeness Assessment

**Available (75% of ideal dataset):**
- HHS spending data: CA Medicaid billing patterns Jan 2018–Dec 2024
- NPPES taxonomy codes: primary care, OB/GYN, psychiatry well-defined
- Medi-Cal Targeted Rate Increase (TRI):
  - Effective date: January 1, 2024 (documented in AB 133, SB 154)
  - Rate increase: to 87.5% of lowest CA Medicare locality rate
  - Covered specialties: primary care (incl NPs/PAs), obstetrics, non-specialty mental health
  - Actual payments: began retroactively Nov-Dec 2024 (implementation lag)
- Medi-Cal fee schedules: downloadable from files.medi-cal.ca.gov (procedure-code level)
- Medicare GPCI data: 89 localities, 3 components, available 2018-2024 from CMS PFS files
- California has multiple Medicare localities (LA, San Francisco, Anaheim, rest of state)
  → within-state variation in Medicare rates → variation in TRI impact

**Available for Cross-State Comparison:**
- 8 HRSN waiver states with 80% Medicare rate floors: AZ, AR, CA, MA, NJ, NY, OR, WA
- KFF Medicaid-to-Medicare Fee Index: all states, multiple specialties, multiple years
- State fee schedules: variable availability (some states publish, others require FOIA)

**Missing (25%):**
- Historical Medi-Cal fee schedule archive depth: Unknown if monthly snapshots available
  back to 2018, or only current + recent years
- Managed care implementation details: TRI flows through MCOs with potential delays
- MCO network adequacy standards: may confound rate effects
- Pre-2018 data for ACA fee bump (2013-2014): outside HHS data window

**Binding Gap:** Only 12 months of post-TRI data (Jan-Dec 2024). Short post-period limits
ability to detect dynamic effects or distinguish short-run vs. long-run elasticities.

### 2. Timeline Alignment

**California TRI:**
- Effective date: January 1, 2024 (month 73 of 84-month data window)
- Pre-period: 72 months (Jan 2018–Dec 2023) — EXCELLENT baseline
- Post-period: 12 months (Jan 2024–Dec 2024) — SHORT but adequate for initial effects
- Actual payment lag: Nov-Dec 2024 retroactive payments may delay provider response

**Timeline: ADEQUATE** — Long pre-period supports parallel trends testing, but short
post-period limits analysis to short-run effects only.

**Cross-State HRSN Waivers:**
- Staggered adoption 2022-2024 for 8 states
- Falls within HHS data window
- Biden framework rescinded March 2025 (after data window ends)

### 3. Statistical Power Estimate

**California-Only Analysis:**

**Units of Analysis:**
- Provider-month panel: ~200K CA providers × 84 months (subset: ~60K primary care/OB/BH)
- County-month panel: 58 counties × 84 months = 4,872 observations
- Specialty-county-month: 6 specialties × 58 counties × 84 months = 29,232 observations

**Treatment Variation:**
- Within-specialty: All primary care/OB/BH providers treated simultaneously Jan 2024
- Across-specialty: Only 3 specialties treated (PC, OB, BH); others untreated (diff-in-diff)
- Geographic: Medicare locality variation creates different TRI impacts across CA counties

**Expected Effect Size:**
- Literature (MACPAC 2025 review): ACA fee bump effects were 0-5 percentage points
- TRI is smaller magnitude (87.5% vs. 100% Medicare parity)
- Expected effect: 2-4 percentage points increase in participation
- CA baseline: PC ~50%, OB ~38%, BH ~27%

**Power Calculation (Rough):**
- Specialty-county-month panel: 29K observations
- Diff-in-diff comparing treated specialties (PC/OB/BH) to untreated (other surgical, dental)
- Assuming participation SD = 12 percentage points, α = 0.05, β = 0.20
- MDE ≈ 1-2 percentage points
- Power: GOOD for detecting 3+ percentage point effects

**Concern:** Only 12 months post-treatment. If provider response is gradual (6-12 month
lag as providers learn about rates, decide to enroll), we may underestimate long-run elasticity.

**Cross-State Analysis:**

**Units of Analysis:**
- State-specialty-month: 51 states × 6 specialties × 84 months = 25,704 observations
- Treatment variation: 8 HRSN waiver states with 80% Medicare floors (staggered 2022-2024)

**Power:** GOOD — 8 treated states, 43 controls, staggered timing enables Callaway-Sant'Anna

### 4. Identification Threats

**Top 3 Threats:**

1. **Simultaneous Policy Changes:**
   - TRI implemented alongside other CA policies:
     - Prop 35 (Nov 2024): MCO tax made permanent → long-term funding certainty
     - CalAIM (ongoing 2022-2024): major delivery system reform
   - Cannot isolate TRI effect from bundled reforms
   - Workaround: Diff-in-diff comparing treated specialties (PC/OB/BH) to untreated
     specialties within CA controls for CA-wide policies

2. **Managed Care Implementation Lags:**
   - 85% of Medi-Cal enrollees in managed care
   - TRI flows through MCO contracts → potential delays in provider awareness/payment
   - MCO network adequacy standards may bind more than fee schedules
   - Workaround: Code MCO penetration by county as time-varying control; acknowledge
     that estimated elasticity reflects BOTH fee increase and MCO network response

3. **Provider Awareness and Adjustment Costs:**
   - Providers may not immediately learn about TRI (information frictions)
   - Medicaid enrollment requires credentialing, panel space decisions (adjustment costs)
   - 12-month post-period may capture only partial equilibrium response
   - Workaround: Acknowledge short-run elasticity; discuss likely underestimate of
     long-run effects; code "months since TRI" to test for gradual ramp-up

**Additional Threat:**
- Geographic variation in TRI impact (via Medicare locality differences) may be confounded
  by cost-of-living differences that also affect provider location decisions

### 5. Specific Design Checks

**Does HHS data start early enough for pre-TRI baseline in CA?**
- YES. 72 months pre-treatment (Jan 2018–Dec 2023) is excellent for:
  - Event study with leads and lags
  - Parallel trends testing
  - Establishing stable baseline participation rates

**Is there within-specialty variation?**
- Within treated specialties (PC/OB/BH): No — all treated simultaneously
- Across specialties: YES — treated (PC/OB/BH) vs. untreated (other surgical, dental, pharmacy)
- Geographic (within treated specialties): YES — Medicare locality variation creates
  differential TRI impact by county

**Can other states serve as controls?**
- For CA TRI: Other states are clean controls for CA-specific policy
- Diff-in-diff-in-diff: (CA vs. other states) × (treated specialties vs. untreated) ×
  (pre vs. post)
- This THREE-WAY diff-in-diff controls for:
  - National trends in specialty-specific participation
  - CA-specific shocks affecting all specialties
  - Specialty-specific shocks affecting all states

**What is the implied reimbursement elasticity calculation?**
- Elasticity = (% change in participation) / (% change in reimbursement)
- % change in reimbursement: TRI raises rates from ~60% Medicare to 87.5% Medicare
  - Example primary care visit (99213): $50 → $73 (46% increase)
- % change in participation: If participation rises from 50% to 52% (4% increase)
- Implied elasticity: 4% / 46% = 0.087 (inelastic, consistent with literature)

**Can we validate fee schedule changes at procedure-code level?**
- YES. Medi-Cal posts fee schedules at files.medi-cal.ca.gov (procedure-code level)
- Can construct actual % change in reimbursement for common procedures (99213, 99214, 59400)
- This allows heterogeneity analysis: elasticity may differ for high-volume vs.
  low-volume procedures

### 6. Feasibility Verdict: YELLOW

**Reasoning:**
- Data is 75% complete and publicly available (no DUA required)
- Identification strategy is credible with triple-diff-in-diff
- Timeline alignment is adequate but post-period is short (12 months)
- Statistical power is good for detecting 3+ percentage point effects
- Primary binding constraint: SHORT POST-PERIOD limits to short-run elasticity only

**Strengths:**
1. Clean policy experiment (CA TRI with documented effective date)
2. Diff-in-diff-in-diff controls for confounders
3. Procedure-code level validation of fee changes possible
4. Within-state geographic variation in Medicare localities
5. Cross-state comparison available (8 HRSN waiver states)

**Limitations:**
1. Only 12 months post-treatment (Jan-Dec 2024) → short-run elasticity only
2. Managed care implementation lags may delay effects → underestimate elasticity
3. Bundled with Prop 35 and CalAIM reforms → attribution challenge
4. Literature shows Medicaid participation is inelastic (MACPAC review) → small effects expected

**To Upgrade to GREEN:**
1. Wait for 24+ months post-TRI data (requires HHS to release 2025-2026 updates)
2. Code MCO network adequacy standards as time-varying controls
3. Obtain historical Medi-Cal fee schedules to validate pre-TRI baseline rates
4. Add cross-state HRSN waiver analysis as robustness check

**Publication Path:**
- Proceed with 12-month post-period as "short-run elasticity" paper
- Frame as first evidence on post-pandemic Medicaid rate elasticity
- Acknowledge short-run limitation and discuss likely long-run effects
- Target Health Affairs (policy-focused) or JHE (methodology-focused if triple-diff-in-diff
  with procedure-level heterogeneity is novel)

---

## CONCEPT 4: INSTITUTIONAL INFRASTRUCTURE (REVISED)

**Research Question:** Does gaining or losing a teaching hospital causally change
county-level Medicaid provider participation?

**Target Journals:** Journal of Health Economics (JHE), AEJ: Applied, Health Affairs

**Design Change:** Original IV approach (distance to land-grant universities) abandoned due
to weak exclusion restriction. Replaced with teaching hospital openings/closures DID,
which requires no exclusion restriction.

### 1. Data Completeness Assessment

**Available (95% of ideal dataset):**
- HHS spending data: all states, county-level Medicaid billing patterns
- NPPES with county/ZIP: provider counts by specialty-geography-month
- **Teaching hospital panel data (EXCELLENT):**
  - CMS IPPS Impact File: IRB (intern-resident-to-bed ratio), 1986-present, annual
    - IRB > 0 = teaching hospital; IRB >= 0.25 = major teaching hospital
    - Identify openings: IRB goes from 0 to >0 (or vice versa for closures)
  - Adam Sacarny processed POS data: 1993-2017, cleaned, .dta and CSV formats
  - CMS HCRIS: FY 1996-present, hospital financial data
- **AHRF (Area Health Resources File):**
  - 6,000+ county-level variables, free, annual updates
  - Physician counts by specialty, hospital beds, population, income, education
- **FQHC data:** HRSA geocoded CSV: free, current snapshot

**Missing (5%):**
- Historical FQHC panel (only current snapshot)
- Need to construct teaching hospital panel from CMS IPPS for 2018-2024 specifically

**Binding Gap:** Must identify enough teaching hospital openings/closures within 2018-2024
for adequate event study power.

### 2. Timeline Alignment

**Teaching Hospital Events:**
- CMS IPPS Impact File: annual, 2018-2024 (7 years within HHS data window)
- Need to identify counties where teaching hospital status changed (IRB crossed 0 threshold)
- Pre-period for event study: years before teaching hospital opening/closure
- Post-period: years after

**Outcome (Medicaid Participation):**
- HHS data: Jan 2018-Dec 2024 (84 months, monthly)
- County-month panels constructible for all specialties

**Timeline: GOOD** — Depends on number of teaching hospital status changes within window.
If few events occur 2018-2024, can extend pre-period using Sacarny POS data (1993-2017)
for teaching hospital identification and AHRF for pre-period provider supply measures.

### 3. Statistical Power Estimate

**Key Question:** How many teaching hospital openings/closures occurred 2018-2024?
- ~400 teaching hospitals exist nationally (IRB > 0)
- Annual status changes: estimated 5-15 per year (openings + closures)
- Over 7 years: potentially 35-105 events
- If we use IRB threshold of 0.25 (major teaching): fewer events but cleaner signal

**Units of Analysis:**
- County-month panel: 3,100 counties x 84 months = 260K observations
- Treated counties: estimated 35-105 (counties experiencing teaching hospital status change)
- Control counties: ~3,000 (no change in teaching hospital status)

**Power: ADEQUATE IF** sufficient events exist. Need to verify by downloading CMS IPPS data.
If <20 events in 2018-2024, can extend to 2010-2024 using Sacarny data + HCRIS.

### 4. Identification Threats

**Top 3 Threats:**

1. **Selection into Teaching Hospital Status:**
   - Hospitals that gain teaching status may be in counties already experiencing healthcare
     growth (reverse causality)
   - Hospitals that lose teaching status may be in declining areas
   - Workaround: Event study with leads to test for pre-trends; control for county-level
     population, income, and hospital bed trends

2. **Simultaneous Hospital Changes:**
   - Teaching hospital openings may coincide with other hospital expansions (new beds,
     new departments, Medicaid managed care contracts)
   - Cannot isolate teaching hospital effect from general hospital growth
   - Workaround: Control for total hospital beds, hospital count, FQHC presence

3. **Geographic Spillovers:**
   - Teaching hospital opening in county A may attract providers from neighboring county B
     (SUTVA violation)
   - Workaround: Exclude bordering counties from control group; use ring-based controls
     (counties 50-100 miles from treated county)

### 5. Specific Design Checks

**Can we identify teaching hospital events from CMS data?**
- YES. Compare IRB across consecutive IPPS Impact Files (annual).
- Opening: IRB goes from 0 to >0. Closure: IRB goes from >0 to 0.
- Can also track IRB intensity changes (expansion/contraction of residency programs).

**Event study specification:**
- Outcome: county-specialty-month participation rate
- Event: teaching hospital opening or closure in county
- Leads: 24-36 months pre-event (test parallel trends)
- Lags: 12-36 months post-event (estimate dynamic effects)
- Controls: county FE, month FE, county-level time-varying covariates from AHRF

**CA baseline check:** AMC counties (SF, LA, Sacramento, San Diego, Alameda) show
+8.6 percentage point higher participation than non-AMC counties (42.2% vs. 33.6%).

### 6. Feasibility Verdict: YELLOW (upgraded from original IV approach)

**Reasoning:**
- Data is 95% complete, all free
- No exclusion restriction needed (cleaner than IV approach)
- Clean event study design with pre-trend testing
- **BINDING CONSTRAINT:** Number of teaching hospital events within data window is unknown
  — must verify before committing

**To Upgrade to GREEN:**
1. Download CMS IPPS Impact File for 2018-2024 and count teaching hospital status changes
2. If sufficient events (>20): proceed with event study
3. If insufficient: extend to 2010-2024 using Sacarny POS + HCRIS data
4. Consider broader definition: residency program openings/closures (more events than
   full teaching hospital status changes)

---

## CONCEPT 5: MENTAL HEALTH DESERTS & TELEHEALTH/LICENSING DEREGULATION

**Research Question:** Did COVID-era relaxation of telehealth restrictions and occupational
licensing requirements reduce mental health provider deserts, and what happened when states
tightened these rules back?

**Target Journals:** JAMA Psychiatry, Health Affairs, NEJM, JHE

### 1. Data Completeness Assessment

**Available (90% of ideal dataset):**
- HHS spending data: BH provider billing patterns, all states, Jan 2018-Dec 2024
- NPPES taxonomy codes: ~360K behavioral health providers nationally (psychiatry,
  psychology, clinical social work, mental health counseling, psych NPs)
- **Telehealth policy variation (EXCELLENT — multiple staggered treatments):**
  - Center for Connected Health Policy (CCHP): state-by-state telehealth laws database
    with policy dimensions (audio-only, originating site, payment parity, consent waivers)
  - Manatt Telehealth Policy Tracker: federal + state policy changes
  - McBain et al. (RAND/JAMA Network Open 2023) tracked 4 key policies across all states
    with state-by-state coding in their supplement
  - NASHP: payment parity tracker, school-based telehealth tracker
- **Interstate licensing compacts (staggered adoption — EXCELLENT for DID):**
  - PSYPACT (Psychology): 40+ states, staggered adoption with documented dates
  - Counseling Compact: 39 states + DC, staggered from 2021 through 2025
    (first 10 states in 2021-2022, 11 more in 2023)
  - Social Work Compact: 31 states, starting July 2023 (Missouri first)
  - Interstate Medical Licensure Compact (IMLC): covers psychiatrists
  - Council of State Governments maintains comprehensive compact databases
- **COVID emergency declaration dates:** documented by KFF/NASHP for all states
  (drives expiration of emergency telehealth waivers)
- **Mental health shortage data:**
  - HRSA Mental Health HPSAs: downloadable, designations at county/sub-county level
  - AHRF: county-level MH provider counts, multiple years
  - SAMHSA behavioral health treatment locator
- **Outcome data:**
  - 988 Lifeline state monthly call volume (Jul 2022-present, PDF format)
  - CDC WONDER: suicide rates by county (suppression issues for small counties)
  - State-level ED visit data for MH crises (varies by state)

**Missing (10%):**
- Telehealth UTILIZATION data (not just policy — did providers actually use telehealth?)
  - CMS Medicaid telehealth claims identifiable via place-of-service code 02 (telehealth)
    and modifier 95/GT in HCPCS — available in HHS spending data
- Exact dates of COVID emergency waiver expirations vary by state and require manual coding

**Binding Gap:** None fatal. Policy dates require assembly from multiple sources but
McBain et al. supplement provides a strong starting point.

### 2. Timeline Alignment

**COVID Emergency Period:**
- State emergency declarations: mostly March 2020 (month 27 of data window)
- Pre-COVID baseline: Jan 2018-Feb 2020 (26 months) — EXCELLENT
- Emergency period: Mar 2020-varies by state (emergency declarations ended staggered
  2021-2023)
- Post-tightening: varies by state through Dec 2024

**Licensing Compact Adoption:**
- PSYPACT: staggered adoption 2019-2024 (falls within data window)
- Counseling Compact: staggered 2021-2025 (mostly within window)
- Social Work Compact: starting Jul 2023 (late in window but still usable)

**Telehealth Permanence Decisions:**
- States made telehealth rules permanent at different times (2021-2024)
- States that let waivers expire: staggered 2021-2023
- This creates a TIGHTENING treatment (loss of telehealth access) that is staggered

**Timeline: EXCELLENT** — Pre-COVID baseline (26 months), COVID relaxation shock,
staggered tightening/permanence decisions, and licensing compact adoptions all fall
within the Jan 2018-Dec 2024 data window.

### 3. Statistical Power Estimate

**Multiple Treatment Margins (each can be analyzed separately):**

A. **Telehealth tightening (states that reversed emergency waivers):**
   - Treatment: state ends emergency telehealth waiver without permanent replacement
   - ~15-20 states tightened; ~30 states made permanent
   - State-month panel: 51 states x 84 months = 4,284 observations
   - Power: STRONG

B. **PSYPACT adoption:**
   - Treatment: state joins Psychology Interjurisdictional Compact
   - 40+ states adopted, staggered over 2019-2024
   - Power: STRONG (many treated states, good staggering)

C. **Counseling Compact adoption:**
   - Treatment: state joins Counseling Compact
   - 39 states + DC adopted, staggered 2021-2025
   - Power: STRONG

D. **Combined licensing deregulation index:**
   - Count of compacts joined (PSYPACT + Counseling + Social Work + IMLC)
   - Continuous treatment intensity measure
   - Power: STRONG (variation across states and over time)

**Outcome Variation:**
- CA shows BH participation ranges 12.3-33.3% across counties
- National variation likely wider (some states >50%, others <15%)
- MDE at state-month level: ~2 percentage points (well below plausible effect sizes)

**Power: EXCELLENT** — Multiple overlapping natural experiments, large panel, strong
treatment variation.

### 4. Identification Threats

**Top 3 Threats:**

1. **Demand-Side Confounders (COVID Mental Health Crisis):**
   - COVID simultaneously increased MH demand AND changed telehealth/licensing policy
   - Cannot separate telehealth supply effect from demand surge effect
   - Workaround: Use the TIGHTENING (reversal of waivers) as the clean treatment —
     demand pressure was similar across states post-COVID, but tightening was staggered.
     This is the key insight: the REMOVAL of telehealth access is cleaner to identify
     than its introduction (which coincided with the pandemic).

2. **Licensing Compact Endogeneity:**
   - States with greater MH provider shortages may adopt compacts faster
   - Workaround: Event study with leads to test pre-trends; control for baseline
     HPSA designation, Medicaid expansion status, urbanicity
   - CSG (Council of State Governments) promoted compacts through a coordinated campaign,
     which provides some exogeneity (political/legislative window timing)

3. **Telehealth Measurement:**
   - Provider PARTICIPATION (billing Medicaid) vs. provider offering TELEHEALTH
     (different concepts)
   - A provider may have always participated in Medicaid but now does so via telehealth
   - New telehealth-only providers may appear in billing data (market entry)
   - Workaround: Separate analysis of (a) total BH providers billing Medicaid
     (extensive margin) and (b) telehealth-specific claims (intensive margin) using
     HCPCS place-of-service codes

### 5. Specific Design Checks

**Can we identify telehealth claims in HHS spending data?**
- YES, partially. HCPCS codes include telehealth-specific modifiers (95, GT).
  Place-of-service code 02 = telehealth. If HCPCS_CODE field captures these modifiers,
  we can separate telehealth from in-person claims.
- Need to verify whether HHS data preserves modifier codes or strips them.

**Can we construct a "mental health desert" measure?**
- YES, from NPPES + HHS data: counties where zero or very few (<3) BH providers
  bill Medicaid
- Validate against HRSA Mental Health HPSA designations
- CA baseline: Sierra County = zero BH providers; Imperial = 12.3% participation

**What is the key identification insight?**
- The TIGHTENING of telehealth/licensing is cleaner than the RELAXATION because:
  - Relaxation coincided with COVID (confounded)
  - Tightening is staggered across states 2021-2024 (clean variation)
  - States that made permanent vs. expired create natural treated/control groups
- This is a "policy reversal" design — rare and publishable

**McBain et al. (RAND) as foundation:**
- Their JAMA Network Open paper provides state-by-state coding of 4 telehealth policies
- We EXTEND this by measuring PARTICIPATION RATES (not just facility telehealth
  availability) using the new HHS Medicaid spending data
- Their outcome: % of facilities offering telehealth. Our outcome: % of BH providers
  billing Medicaid. These are complementary measures.

### 6. Feasibility Verdict: GREEN

**Reasoning:**
- Data is 90% complete, all freely available, no DUA required
- Multiple overlapping natural experiments provide robust identification
- Policy tightening (reversal of COVID waivers) is a novel, clean treatment
- Licensing compact staggered adoption provides additional causal variation
- Existing literature (McBain et al.) provides policy coding foundation
- Timeline alignment is excellent (pre-COVID baseline + COVID + staggered tightening)
- HHS Medicaid spending data is NEW — no one has used it for this yet

**Strengths:**
1. Novel combination: telehealth + licensing + Medicaid provider participation
2. Policy reversal design (tightening as treatment) is rare and clean
3. Multiple treatment margins for robustness
4. Strong policy relevance (MH access crisis, telehealth permanence debate)
5. Builds on McBain et al. (RAND) but with superior outcome data
6. Large sample, excellent power
7. All data free, no restricted access needed

**To Strengthen Further:**
1. Verify HCPCS modifier/place-of-service codes in HHS spending data
2. Assemble state-by-state telehealth tightening dates (start from CCHP + McBain supplement)
3. Map PSYPACT and Counseling Compact adoption dates from compact commission websites
4. Define "mental health desert" threshold (suggest: <3 BH providers billing Medicaid per
   10,000 Medicaid enrollees at county level)

**Publication Path:**
- Frame as: "What Happened When States Rolled Back COVID Telehealth Flexibilities?
  Evidence from Medicaid Behavioral Health Provider Participation"
- Lead with the tightening design (clean ID) + licensing compacts as secondary
- Target JAMA Psychiatry (clinical relevance) or Health Affairs (policy relevance)
- If effects are large: NEJM (broad medical audience)

---

## PHASE 4: BASELINE FINDINGS FROM CALIFORNIA DATA

Existing CA data (`_summary.json`, 58 counties, 6 specialties) provides proof-of-concept
for national expansion.

### Check 1: Specialty Participation Hierarchy

| Specialty | Median | Min | Max | N Counties |
|-----------|--------|-----|-----|------------|
| pharmacy_dme | 72.2% | 27.3% | 100.0% | 57 |
| primary_care | 41.5% | 28.6% | 50.0% | 56 |
| obgyn | 38.5% | 20.8% | 50.0% | 54 |
| dental | 35.9% | 23.8% | 50.0% | 56 |
| other_surgical | 30.8% | 21.4% | 50.0% | 56 |
| **behavioral_health** | **27.3%** | **12.3%** | **33.3%** | **56** |

**Confirmed:** Behavioral health has the lowest participation rate of any clinical specialty.
This validates the core premise of Concepts 1 and 5.

### Check 2: Maternal Health Desert Candidates (CA)

- Counties with NO OB/GYN providers: Alpine, Sierra (population <1,200)
- Counties with 0% OB/GYN participation: Mariposa, Modoc (1 registered, 0 active)
- 4 of 58 CA counties are functional maternal health deserts by OB/GYN participation

### Check 3: Behavioral Health Desert Candidates (CA)

- Counties with NO BH providers: Sierra
- Counties with <15% BH participation: Alpine (0%), Imperial (12.3%)
- Imperial County (pop ~180K, 65 registered BH providers, only 8 active) is the most
  policy-relevant BH desert — large population, very low participation

### Check 4: Cost-Participation Paradox

**Correlation: r = 0.935** (N=50 counties with >=20 providers)

This is strikingly high. Higher-cost counties have dramatically higher Medicaid participation:
- Lowest-cost 5: avg 24.6% participation (Lassen, Glenn, Imperial, Siskiyou, Tehama)
- Highest-cost 5: avg 45.9% participation (Alameda, Marin, Santa Clara, San Mateo, SF)

Interpretation: Institutional density (teaching hospitals, academic medical centers, FQHCs)
clusters in high-cost urban areas. Supports Concept 4 (infrastructure drives participation).

### Check 5: Academic Medical Center Effect

- AMC counties (SF, LA, Sacramento, San Diego, Alameda): mean 42.2% participation
- Non-AMC counties: mean 33.6% participation
- **Difference: +8.6 percentage points**

This confirms the teaching hospital infrastructure hypothesis. Counties with academic
medical centers show systematically higher Medicaid participation across all specialties.

---

## RANKED RECOMMENDATIONS (UPDATED)

### Tier 1: Ready to Proceed (GREEN)

**#1: CONCEPT 5 — Mental Health Deserts & Telehealth/Licensing Deregulation** (NEW)

**Rationale:**
- **Data completeness:** 90% complete, all free, no DUA required
- **Identification:** Multiple overlapping natural experiments:
  (a) telehealth tightening (reversal of COVID waivers) is staggered across states
  (b) licensing compact adoption (PSYPACT, Counseling, Social Work) is staggered
- **Novel design:** Policy REVERSAL (tightening) is cleaner than policy introduction
  (which coincided with COVID confounders)
- **Policy relevance:** VERY HIGH — MH access crisis, telehealth permanence debate,
  occupational licensing reform
- **Timeline:** Excellent — pre-COVID baseline (26 months) + staggered tightening
- **Power:** Excellent — multiple treatment margins, large panel
- **Publication target:** JAMA Psychiatry, Health Affairs, NEJM
- **Existing literature foundation:** McBain et al. (RAND) provides state policy coding

**Timeline to Submission:**
- Policy date assembly: 1 week (McBain supplement + CCHP + compact websites)
- Data assembly: 1 week (shared with other concepts)
- Analysis: 2-3 weeks
- Writing: 2-3 weeks
- **Total: 7-9 weeks to first draft**

**Next Steps:**
1. Download McBain et al. supplement for state-by-state telehealth policy coding
2. Compile PSYPACT and Counseling Compact adoption dates from commission websites
3. Map COVID emergency declaration end dates by state (KFF/NASHP)
4. Construct state-month panel of BH participation rates from HHS + NPPES
5. Identify telehealth claims via HCPCS place-of-service codes in HHS data
6. Event study around tightening dates + compact adoption dates
7. Callaway-Sant'Anna estimation for each treatment margin
8. Define "mental health desert" measure and map nationally

**#2: CONCEPT 2 — Maternal Health Deserts**

**Rationale:**
- **Data completeness:** 90% complete, all free, no DUA required
- **Identification:** Clean staggered DiD with Callaway-Sant'Anna estimator
- **Policy relevance:** HIGH — maternal mortality crisis, Medicaid coverage gaps
- **Timeline:** Excellent — policy falls squarely in data window (Apr 2022-Mar 2024)
- **Power:** Excellent — 47 states, 260K county-months
- **Publication target:** NEJM or Health Affairs (high impact)

**Timeline to Submission:**
- Data assembly: 1 week (shared with Concept 5)
- Policy dates: 2-3 days (ASPE/KFF/NASHP — well-documented)
- Analysis: 2-3 weeks
- Writing: 2-3 weeks
- **Total: 6-8 weeks to first draft**

**Next Steps:**
1. Compile postpartum extension effective dates from ASPE/KFF/NASHP
2. Construct county-month panel of OB/GYN participation rates
3. Event study (leads/lags) to test parallel trends
4. Callaway-Sant'Anna estimation
5. Heterogeneity analysis: rural vs. urban, baseline maternity care desert status

---

### Tier 2: Feasible with Caveats (YELLOW)

**#3: CONCEPT 3 — Reimbursement Adequacy Elasticities**

**Rationale:**
- **Data completeness:** 75% complete, publicly available
- **Identification:** Credible triple-diff-in-diff
- **Limitation:** Only 12 months post-TRI data → short-run elasticity only
- **Policy relevance:** HIGH — Medicaid payment adequacy
- **Publication target:** Health Affairs or JHE

**Decision Point:** Proceed now with short-run framing, or wait for more post-TRI data.

**#4: CONCEPT 1 — Behavioral Health Paradox (Parity Laws)**

**Rationale:**
- **Data completeness:** 85% (requires manual coding of parity law dates)
- **Identification:** Parity law staggered DiD is feasible; 988 is descriptive only
- **Note:** May overlap with Concept 5 — consider whether parity laws and
  telehealth/licensing are analyzed in the same paper or separately. Concept 5
  has cleaner identification; Concept 1 could be a robustness check within
  Concept 5 or a separate paper.

**#5: CONCEPT 4 — Institutional Infrastructure (Teaching Hospital Events)**

**Rationale (Revised):**
- **Data completeness:** 95% complete, all free
- **Identification:** Teaching hospital openings/closures DID (replaces original IV)
- **Limitation:** Number of teaching hospital events within 2018-2024 unknown — must
  verify from CMS IPPS data before committing
- **Policy relevance:** MODERATE — AMC role in safety-net care

**Next Step:** Download CMS IPPS Impact File and count events before proceeding.

---

## SUMMARY RECOMMENDATION

**PURSUE CONCEPTS 5 AND 2 IN PARALLEL**

Both share the same core data assembly (HHS Medicaid spending + NPPES + taxonomy crosswalk),
so the marginal cost of the second paper is low once the first is built.

**Recommended Sequence:**
1. **Weeks 1-2:** Common data assembly (HHS + NPPES + crosswalk — serves all 5 concepts)
2. **Weeks 2-3:** Policy variable assembly:
   - Concept 5: McBain supplement + CCHP + compact websites + emergency end dates
   - Concept 2: ASPE/KFF/NASHP postpartum extension dates
3. **Weeks 3-5:** Analysis (run both in parallel — different outcomes, different treatments)
4. **Weeks 5-7:** Writing (two separate manuscripts)
5. **Weeks 7-9:** Revisions and submission

**Submission Targets:**
- Concept 5 → JAMA Psychiatry (MH focus) or Health Affairs (policy focus)
- Concept 2 → NEJM (maternal health) or Health Affairs

**Backup:** If either paper encounters identification problems during analysis, pivot to
Concept 3 (CA reimbursement elasticity) which has the simplest data requirements.

**Hold on Concepts 1 and 4** until Concepts 5 and 2 are submitted. Concept 1 may fold
into Concept 5 as a robustness analysis. Concept 4 requires verification of teaching
hospital event counts.

---

## FINAL NOTES

**Common Data Assembly Tasks (Apply to All Concepts):**
1. Download HHS Medicaid Provider Spending data (227M rows, 3.4 GB parquet)
2. Download NPPES NPI bulk files (monthly updates + NBER historical snapshots 2017-2024)
3. Download NUCC taxonomy code crosswalk (NPPES codes → specialties)
4. Construct ZIP-to-county crosswalk (HUD or Census)
5. Develop provider-level participation flags (ever billed Medicaid in 12-month window)
6. Aggregate to county-specialty-month participation rates

**Estimated Time for Common Assembly:** 3-5 days (one-time cost, reusable across all 5 concepts)

**Methodological Consistency Across Papers:**
- Use Callaway-Sant'Anna (2021) for all staggered DiD analyses
- Cluster standard errors at state level (minimum) for state-level treatments
- Cluster at county level for county-level treatments
- Report event study plots for all DiD analyses (test parallel trends)
- Include state-specific linear trends as robustness check
- Report both aggregated treatment effects and heterogeneity by subgroup

**Authorship:**
- V Cholette
- Date: February 2026

**References:**
- Callaway, B., & Sant'Anna, P. H. (2021). Difference-in-differences with multiple time
  periods. Journal of Econometrics, 225(2), 200-230.
- Conley, T. G., Hansen, C. B., & Rossi, P. E. (2012). Plausibly exogenous. Review of
  Economics and Statistics, 94(1), 260-272.
- MACPAC. (2025). Medicaid physician payment: A review of the evidence. Retrieved from
  https://www.macpac.gov/
"""
