# CAPHE Case Study Social Posts

**Property:** California Public Health Economics Group (`caphegroup.org`)
**Voice Profile:** `caphe` (Professional-accessible, collegial mentor/colleague, first-person plural `"we"` / `"our"`, zero `"you"` / `"your"`, average 14–18 words per sentence, max 20 words per sentence)
**Collection Hub:** `https://www.caphegroup.org/methods-lab/`

---

## Topic 1: Medi-Cal Coverage, Renewals & Provider Claims

### 1. Why Eligible Families Lose Medi-Cal at Renewal (`medicaid-expansion`)
When a county Medi-Cal roster drops by 27,076 adults in six months, did local incomes suddenly rise?

In Santa Clara County, we tracked 120,239 newly enrolled Medi-Cal adults across their first six-month renewal window.

- **Measure 1 (Aggregate Roster Count):** Enrollment fell from 120,239 to 93,163 across six months, a 22.5% drop of 27,076 adults.
- **Measure 2 (Cause-Specific Renewal Funnel):** Only 3,121 exits reflected higher income, while paperwork barriers removed 14,219 still-eligible adults (52.5%).

Across the full exit group, 88.5% remained income-eligible for coverage under state rules. When our teams separate administrative churn from income exits, we fund renewal navigation instead of cutting clinic capacity.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/medicaid-expansion

---

### 2. Why Simple Before-and-After Comparisons Mislead (`before-after-trap`)
Did post-2019 telehealth waivers add 22,239 new Medicaid telehealth billers, or were providers already adopting virtual care?

We examined national Medicaid billing records from 2018 through 2023 to test how baseline window length changes the conclusion.

- **Measure 1 (Two-Year Before-and-After Snapshot):** Active Medicaid telehealth billers rose from 91,399 in 2019 to 113,638 in 2023 (+22,239).
- **Measure 2 (Multi-Year Pre-Trend Projection):** Between 2018 and 2019, telehealth billing was already growing by 6,977 providers per year.

Projecting that pre-existing growth forward yields 119,307 expected billers by 2023, leaving a -5,669 gap against the linear trend. Plotting at least three pre-policy years helps our analysts separate new policy lift from ongoing adoption.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/before-after-trap

---

### 3. Why Administrative Claims Miss Sanctioned Providers (`measurement-error-claims`)
Can a single federal exclusion check catch every sanctioned provider in a Medicaid billing file?

We linked 488,032 Medicaid billing NPIs against both federal OIG exclusions and California DHCS suspended provider records.

- **Measure 1 (Federal OIG LEIE Match Alone):** The federal registry flags 449 excluded providers across the dataset, including 299 financial fraud cases.
- **Measure 2 (Combined Federal + State S&I Match):** Adding California DHCS state-only suspensions identifies 199 additional sanctioned providers, totaling 648.

Even among confirmed fraud exclusions, the median lag from first billing to formal sanction is 50.0 months. Clean recent billing histories often reflect enforcement delay rather than verified compliance, so our audits cross-check both registries.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/measurement-error-claims

---

### 4. How Filtering by Active Billing Distorts Fraud Models (`collider-bias`)
Why does a provider fraud model lose almost half its ranking power when we filter to active 2024 billers?

We evaluated a fraud screening model across 487,479 Medicaid providers containing 95 confirmed exclusions (a 0.0195% population base rate).

- **Measure 1 (Full Unfiltered Provider Roster):** Across all 487,479 providers, the model achieves a 0.724 AUC ranking score.
- **Measure 2 (Active-2024 Filtered Subset):** Restricting evaluation to 55,018 active 2024 billers drops the AUC score to 0.442.

Because both high-volume clinics and undetected schemes stay active in 2024, conditioning on active status scrambles the risk ranking. Evaluating models on the full population baseline keeps our audit precision estimates calibrated to real caseloads.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/collider-bias

---

### 5. Why Small Subgroups Top Percentage-Drop Rankings (`p-hacking-multiple-testing`)
When we rank 62 demographic cells by raw percentage loss during Medi-Cal unwinding, which communities appear hardest hit?

We analyzed Santa Clara County's Medi-Cal enrollment decline from 472,014 to 411,722 (-60,292 members) across 62 age-language cells.

- **Measure 1 (Unfiltered Percentage Rank):** Young adults speaking Samoan rank first with a -34.04% drop, representing 16 people (n = 47).
- **Measure 2 (Volume-Gated Count Rank, n >= 100):** Spanish-speaking families lost 24,880 members (-18.00%), accounting for 41.3% of county losses.

Vietnamese-speaking residents lost another 5,931 members (-15.05%) across the same unwinding period. Requiring n >= 100 and reporting counts alongside percentages directs our outreach to the largest caseloads.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/p-hacking-multiple-testing

---

### 6. How to Match Study Designs to Policy Questions (`study-design-ladder`)
When does a public health team need a randomized trial, and when is an administrative roster the better tool?

We compared four California policy evaluations to show how each question requires its own study design.

- **Descriptive Roster vs. Survey:** In Santa Clara County, ACS surveys report 152,811 Medi-Cal enrollees while DHCS rosters record 255,601 (-40.2% survey undercount).
- **Natural Experiment vs. Operational RCT:** Multi-year panels estimate county mortality returns (-9.16 deaths per 100,000), while an 82,695-household trial tests renewal outreach (+8 to +11 percentage points from live calls vs. 0% from text wording).

No single study design answers every policy question across a health department. Matching the method to the decision saves our agencies time and protects budget proposals.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/study-design-ladder

---

## Topic 2: Community Health Workers & Clinical Financing

### 7. Why Fee-for-Service Billing Cannot Fund County CHWs (`chw-health-outcomes`)
How much of a county Community Health Worker's salary can clinic fee-for-service Medi-Cal billing actually cover?

We compared Santa Clara County public health wage benchmarks against Medi-Cal fee-for-service reimbursement rates and acute hospital offsets.

- **Measure 1 (Clinic Fee-for-Service Billing Ledger):** Medi-Cal per-visit billing generates $6,775 to $10,162 per year, covering 6.5% to 9.8% of a $103,719 loaded county CHW position.
- **Measure 2 (Health System Offset Ledger):** Preventing 3.4 inpatient stays and 6.2 emergency visits per 100 clients saves $107,006 in payer claims ($291,171 in hospital costs).

Clinic fee-for-service billing leaves a $93,557 annual funding gap per worker despite positive system savings. Presenting both ledgers helps our county teams negotiate managed care capitation and shared-savings contracts.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/chw-health-outcomes

---

### 8. Why Cost-Effective Programs Still Face Year-1 Cash Deficits (`budget-impact`)
Why can a public health program with a 125-to-1 long-term return still trigger a Year-1 budget shortfall?

We contrasted multi-year economic value against five-year cash-flow ledgers for county health budgets and California Paid Family Leave.

- **Measure 1 (Multi-Year Economic Return):** Local health funding delivers a 125-to-1 five-year return. Year 1 captures 42% of that effect (52-to-1), while 100% of payroll is due immediately.
- **Measure 2 (Multi-Year Reserve Cash Flow):** Under SB 951, a $623.7M outlay dips the reserve to 10.8% ($1.96B) in 2026 before rebuilding to 30.4% ($6.37B) by 2030.

Long-term value ratios do not pay first-year staffing invoices. Pairing economic evaluations with five-year cash-flow tables helps our budget directors plan bridge financing.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/budget-impact

---

### 9. How One-Time Startup Costs Distort Year-1 Cost-Effectiveness (`cost-effectiveness-ratio`)
Should a county judge a new Community Health Worker program by its Year-1 cost per QALY?

We tracked a 750-client CHW navigation cohort generating 40.04 Quality-Adjusted Life Years (QALYs) per year across five budget years.

- **Measure 1 (Year-1 Cost-Effectiveness Ratio):** Loading $325,000 in one-time training and IT setup onto Year 1 raises total outlays to $1,930,000, or $48,202 per QALY.
- **Measure 2 (Steady-State and 5-Year Ratios):** In Years 2 through 5, recurring costs of $1,405,000 yield $35,090 per QALY (a $37,712 five-year average).

All three figures sit below the $100,000 per QALY benchmark. However, Year 1 looks 37% more expensive when one-time startup capital is treated as permanent. Separating startup costs from steady-state operations keeps our multi-year budget reviews accurate.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/cost-effectiveness-ratio

---

### 10. How QALYs Capture Mental Health and Social Needs Gains (`measuring-health-common-unit`)
If we evaluate a Community Health Worker program using only blood-pressure or diabetes labs, how much value do we miss?

We decomposed the 40.04 annual QALYs ($4.00M in health value at $100,000 per QALY) generated by a 750-client CHW cohort.

- **Measure 1 (Physical Chronic Disease Gains Alone):** Glycemic, hypertension, and asthma improvements generate 18.21 QALYs per year, or 45.5% of total health gains.
- **Measure 2 (Full Quality-of-Life Ledger):** Mental health gains add 17.49 QALYs (43.7%) and social stability adds 4.34 QALYs (10.8%), totaling 54.5% of program value.

We also keep morbidity QALYs separate from HHS 2025 Value of a Statistical Life tiers ($6.3M, $13.6M, and $20.7M) to avoid double-counting. Using a shared quality-of-life unit lets our analysts capture whole-person program benefits.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/measuring-health-common-unit

---

### 11. Why Controlling for Clinic Visits Hides CHW Hospital Savings (`classifying-causal-mechanisms`)
When evaluating a Community Health Worker program, should our regression model control for post-enrollment primary care visits?

We traced how CHW navigation reduces inpatient hospital stays by 30% across enrolled Medi-Cal patients.

- **Measure 1 (Total Program Effect Without Mediator Control):** CHW navigation raises primary care engagement from 57.1% to 71.7% (+14.6 percentage points) and cuts hospital admissions by 30%.
- **Measure 2 (Mediator-Adjusted Regression):** Controlling for post-enrollment doctor visits absorbs the primary care pathway and shrinks the estimated hospital effect toward zero.

Doctor visits are the mechanism through which CHWs prevent hospital crises, not a baseline confounder. Separating baseline patient severity from post-enrollment care pathways keeps our program evaluations from erasing their own success.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/classifying-causal-mechanisms

---

## Topic 3: Food Security, CalFresh & Local Cost of Living

### 12. Why Federal Income Thresholds Miss California Food Insecurity (`food-affordability-tradeoffs`)
Why do families earning 220% of the Federal Poverty Level still run out of food money in California?

We compared the $973 monthly USDA Thrifty Food Plan against four-person household budgets before and after local median rent.

- **Measure 1 (Pre-Rent Gross Income Share):** At $5,507 monthly gross income (220% FPL) in Marin County Tract 1122.03, the $973 food plan takes 17.7% of income.
- **Measure 2 (Post-Rent Disposable Income Share):** After paying $2,318 in median rent (42.1% of income), that same $973 food basket requires 30.5% of the remaining $3,189 budget.

In Fresno County Tract 2 ($3,098 monthly income, $973 rent), the food share jumps from 31.4% pre-rent to 46.4% post-rent. Measuring food costs against post-rent income helps our local programs target working families priced out by housing.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/food-affordability-tradeoffs

---

### 13. Why Store Distance Alone Misses Local Food Vulnerability (`food-insecurity-diabetes`)
Does living close to a supermarket guarantee that a neighborhood can afford healthy food?

We compared post-rent food budget shares and county census tracts across Marin, Fresno, Santa Clara, and Nevada counties.

- **Measure 1 (Store Distance Metric):** Across county census tracts, distance to the nearest grocery store explains only 1.8% of neighborhood food vulnerability.
- **Measure 2 (Post-Rent Income and Poverty Metric):** Poverty and rent explain 62.2% of vulnerability, pushing post-rent food shares to 30.5% (Marin Tract 1122.03) and 46.4% (Fresno Tract 2).

Even in higher-income counties like Santa Clara (8.9% countywide post-rent share) and rural Nevada County (18.9%), pocket tracts face severe budget squeezes. Pairing CalFresh and nutrition benefit enrollment with retail access gives our diabetes prevention teams a complete strategy.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/food-insecurity-diabetes

---

### 14. Why Urban Food Desert Maps Miss Affordability Crises (`geographic-variables`)
Only 1 of 408 census tracts in Santa Clara County is a USDA food desert, yet food insecurity persists.

We tested how urban store-distance thresholds compare against tract poverty rates in Santa Clara County (408 tracts) and Fresno County (225 tracts).

- **Measure 1 (USDA Store-Distance Indicator):** Only 1 of 408 Santa Clara tracts (0.2%) is low-access, and distance adds just +0.003 percentage points of explanatory power (p = 0.827).
- **Measure 2 (Tract Poverty and Income Indicator):** Adding neighborhood poverty adds +58.1 percentage points of unique explanatory power for local food insecurity.

In rural and agricultural Fresno County, 30 of 225 tracts (13.3%) face true physical store gaps alongside high poverty. Separating urban affordability barriers from rural transportation gaps helps our planners match interventions to local geography.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/geographic-variables

---

### 15. How Equal Nominal Grants Create Unequal Staffing in California (`identical-data-opposite-policies`)
Does an equal dollar grant per resident buy the same clinic staffing in San Francisco and Imperial County?

We compared Medicare Practice Expense Geographic Practice Cost Indices (GPCI) and population health need across all 58 California counties.

- **Measure 1 (Nominal Dollar Allocation):** A flat per-capita grant appears equal on paper across every county budget ledger.
- **Measure 2 (Purchasing-Power and Need-Adjusted Allocation):** With a 1.506 GPCI in San Francisco versus 0.900 in Imperial, equal nominal grants buy 55.6% less urban staff time.

Meanwhile, Imperial County sits at the 85th percentile of population health need compared with the 15th percentile in San Francisco. Combining a need floor with a local wage index lets state grant formulas protect rural caseloads and urban staffing.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/identical-data-opposite-policies

---

### 16. How Unverified Store Lists Overstate Neighborhood Food Access (`threat-measurement-instrumentation`)
What happens when a county food access map counts every commercial food listing instead of verified CalFresh grocery stores?

We audited three retail food data sources across 408 census tracts in Santa Clara County.

- **Measure 1 (Raw Commercial Map Listings):** Unfiltered commercial points list 6,613 food locations, implying an average trip of 0.29 miles to food.
- **Measure 2 (Verified USDA SNAP / CalFresh Retailers):** Filtering to 514 verified SNAP-authorized stores nearly doubles the measured trip distance to 0.573 miles (+97%).

Within county health permits, removing multi-counter duplicates inside single supermarkets reduces the store count from 8,555 to 7,335 (-1,220 records, or -14.3%). Auditing administrative data definitions before mapping prevents our equity assessments from understating neighborhood travel burdens.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/threat-measurement-instrumentation

---

## Topic 4: County Public Health Budgets & Mortality Returns

### 17. Why Raw Correlations Hide the Value of Prevention Budgets (`reverse-causation-feedback`)
Why does a simple same-year comparison across California counties make higher public health spending look linked to slightly higher mortality?

We analyzed 57 California counties over 21 years (2003 to 2023) to separate emergency crisis spending from baseline prevention budgets.

- **Measure 1 (Unadjusted Same-Year Correlation):** Counties surge emergency funds during outbreaks, so a naive regression shows +0.18 deaths per 100,000 per $10 per resident.
- **Measure 2 (Routine Prevention Instrumental Variable Estimate):** Isolating multi-year baseline prevention budgets reveals -9.16 deaths per 100,000 per $10 per resident in sustained annual funding.

At $10 per resident, that mortality reduction corresponds to roughly $109,000 per life saved. Separating reactive outbreak surges from routine prevention lets our county leaders evaluate public health budgets fairly.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/reverse-causation-feedback

---

### 18. How Two Independent Instruments Confirm County Public Health Returns (`observational-to-experimental`)
When we cannot randomize county health department budgets, how do we test whether prevention funding truly lowers mortality?

We compared two independent quasi-experimental designs across 57 California counties over a 21-year panel.

- **Measure 1 (Historical Governance Instrument, Brown 2014):** Using predetermined local board and jurisdiction structures estimates -9.10 deaths per 100,000 per $10 per resident.
- **Measure 2 (21-Year Routine-Budget Panel Instrument):** Isolating multi-year routine budget shifts from emergency spikes estimates -9.16 deaths per 100,000 per $10 per resident.

The two independent designs agree within 99.4%, overturning the +0.18 unadjusted correlation and confirming a $109,000 cost per life saved (125-to-1 return). Converging evidence across distinct designs gives our policy teams confidence when randomized trials are impossible.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/observational-to-experimental

---

### 19. Testing County Public Health Returns Across Conservative Bounds (`sensitivity-analysis-cea`)
Does the economic case for county public health funding depend on optimistic mortality or valuation assumptions?

We tested California mortality estimates across statistical lower bounds and federal HHS 2025 Value of a Statistical Life (VSL) tiers.

- **Measure 1 (Central Estimate at $13.6M HHS Central VSL):** At -9.16 deaths per 100,000 per $10 per resident, county prevention funding delivers a 125-to-1 benefit-cost ratio (190-to-1 at the $20.7M High VSL tier).
- **Measure 2 (Conservative Joint Floor at $6.3M Low VSL):** Pairing the $6.3M Low VSL tier with the -6.98 lower-bound mortality estimate still yields a 44-to-1 return (58-to-1 at the point estimate).

Even under the most conservative federal valuation and effect bound, benefits exceed costs by 44-fold. Reporting full sensitivity tables equips our analysts to answer skeptical budget questions before they are asked.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/sensitivity-analysis-cea

---

### 20. Why One-Year Mortality Spikes Mislead Small Rural Counties (`threat-regression-to-mean`)
When a small rural county sees a one-year mortality spike, how much of next year's drop is natural bounce-back?

We examined population-size noise and empirical Bayes shrinkage across California's 58 counties over 21 years.

- **Measure 1 (Single-Year Small-County Rate Swing):** In Alpine County (1,204 residents), one death shifts rates by 83.1 per 100,000, and 89.0% of a spike reverts next year.
- **Measure 2 (Multi-Year Pooled Panel Estimate):** Pooling 21 years with empirical Bayes weights confirms -8.11 deaths per 100,000 in small counties (-9.16 statewide).

In medium counties like Nevada County (102,000 residents), 24.4% of a single-year swing still reflects random noise. Using multi-year rolling averages and shrinkage weights protects our rural health departments from chasing single-year noise.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/threat-regression-to-mean

---

### 21. How Control Groups Separate Policy Lift from Statewide Trends (`threat-history-solutions`)
When a health program expands during a statewide shift, how much of the gain came from the program itself?

We compared Medicaid telehealth billers between 2019 and 2023 against active non-telehealth Medicaid billers over the same years.

- **Measure 1 (Single-Group Before-and-After Change):** Telehealth billers grew by +24.33% (+22,239 providers from a 91,399 baseline), which a single-group chart attributes entirely to telehealth waivers.
- **Measure 2 (Two-Group Difference-in-Differences Comparison):** Non-telehealth Medicaid billers also grew +18.71% from broader enrollment expansion, isolating a +5.62 percentage point net policy difference.

Without an untreated comparison group, general enrollment waves get miscounted as program effects. Pairing treated cohorts with contemporaneous comparison groups keeps our policy evaluations honest.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/threat-history-solutions

---

### 22. Why Passing a Pre-Trend Test Does Not Guarantee Zero Bias (`parallel-trends-power`)
If a difference-in-differences study passes its pre-policy parallel trends test, can unmeasured post-policy drift still flip the conclusion?

We audited event-study confidence bands and post-treatment sensitivity bounds in a multi-county evaluation.

- **Measure 1 (Conventional Pre-Trend Check):** Pre-policy lead coefficients sit near zero, but their confidence intervals span +-0.58 to +-0.62 percentage points per year.
- **Measure 2 (Rambachan-Roth Breakdown Sensitivity Check):** The -0.47 percentage point estimate reaches zero at a 0.35x post-period drift bound (+0.003 percentage points with county linear slopes).

A noisy pre-period makes it easy to pass a conventional p > 0.05 pre-trend test while hiding meaningful drift. Reporting pre-trend noise bands and breakdown bounds helps our teams see how fragile or robust an estimate truly is.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/parallel-trends-power

---

## Topic 5: Paid Family Leave & Workforce Policy

### 23. Who Gains and Who Pays Under California's SB 951 Leave Expansion (`selection-into-treatment`)
When SB 951 raised Paid Family Leave replacement to 90% for low-wage workers, how did net transfers shift?

We modeled 369,600 projected 2026 Paid Family Leave claims (+39,600 new claims) alongside uncapped State Disability Insurance payroll contributions (1.345%).

- **Measure 1 (Low- and Moderate-Wage Worker Net Transfers):** Replacing 90% of wages up to $63,000 yields a +$19.7M net transfer for lowest-wage workers (+$3.3M for the second tier).
- **Measure 2 (High-Wage Earner Net Payroll Contributions):** Removing the wage cap on the 1.345% payroll rate produces -$78.2M and -$157.5M net contributions from top wage quartiles.

Higher wage replacement makes family leave affordable for hourly workers who previously paid into the fund without claiming benefits. Modeling uptake and financing by wage quartile shows our policymakers how social insurance rules redistribute both leave access and costs.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/selection-into-treatment

---

### 24. Separating Baseline Claim Growth from Policy Jumps in Paid Family Leave (`threat-maturation-solutions`)
When California Paid Family Leave reaches 369,600 claims in 2026, how much reflects workforce growth versus policy expansion?

We separated long-term demographic growth in California's State Disability Insurance (SDI) fund from the 2026 twelve-week expansion jump.

- **Measure 1 (Baseline Demographic Maturation):** From 325,055 actual claims in 2025, routine +1.52% annual workforce and awareness growth projects 330,000 baseline claims in 2026 (+4,945 claims).
- **Measure 2 (Incremental Policy Expansion Jump):** Extending leave duration and raising wage replacement adds +39,600 incremental claims in 2026, bringing total volume to 369,600.

Tracking both components explains why the SDI reserve ratio dips to 10.8% ($1.96B) in 2026 before rebuilding to 30.4% ($6.37B) by 2030. Subtracting baseline maturation first prevents our fiscal analysts from overcharging new legislation for routine population growth.

Read the full CAPHE Case Study:
https://www.caphegroup.org/methods-lab/threat-maturation-solutions
