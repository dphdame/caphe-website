#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SCHEDULED_POSTS = [
  {
    id: 2001,
    num: 1,
    slug: 'medicaid-expansion',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Automated Data Checks vs. Live Outreach in Medi-Cal Renewals',
    scheduledDate: '2026-11-02',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Nov 2, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/medicaid-expansion',
    tetsUrl: '',
    text: `During Medi-Cal renewals, eligible families rarely lose coverage because their income changed. Most lose coverage where automated data checks stop and paper packets begin.

In Santa Clara County's 120,239-member renewal cohort, automated state data checks renew 39.2% of members without paperwork. Among the remaining members sent a paper packet, 27,076 lose coverage for procedural reasons even though an estimated 14,219 (52.5%) still qualify. Standard mail and text reminders move completions by 0% to 2%. Funding bilingual Community Health Worker outreach in high-drop ZIP codes recovers 35.0% of procedural losses (2,228 members retained) at $40 to $80 per member.

Read the full case study:
https://www.caphegroup.org/methods-lab/medicaid-expansion`
  },
  {
    id: 2002,
    num: 2,
    slug: 'before-after-trap',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Evaluating Pre-Post Changes Against Baseline Trends',
    scheduledDate: '2026-11-04',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Nov 4, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/before-after-trap',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
    text: `A two-point before-and-after count often credits a new policy for a trend that was already underway.

Across 84 months of Medicaid claims (2018 to 2024), active telehealth-eligible billing providers rose by 22,239 (+24.33%) between 2019 and 2023. However, that count was already climbing by 6,977 providers per year (+8.26%) before the 2020 rule change, and non-telehealth Medicaid services grew 18.71% over the same window. Comparing the full multi-year trajectory against a non-telehealth comparison group separates the true policy lift from background growth.

Read the case study and companion Medicaid claims guide:
Case Study: https://www.caphegroup.org/methods-lab/before-after-trap
Companion Method Guide: https://tooearlytosay.com/research/methodology/medicaid-data-landscape/`
  },
  {
    id: 2003,
    num: 3,
    slug: 'measurement-error-claims',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Enrolled Provider Directories vs. Active Claims and Sanction Lists',
    scheduledDate: '2026-11-09',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Nov 9, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/measurement-error-claims',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-labels/',
    text: `Counting registered provider directories as active care capacity overstates network reach, while treating sanction lists as pure billing fraud mislabels clinical license actions.

Across 488,032 Medicaid-enrolled billing providers, matching against federal and California sanction registries identifies 648 excluded providers. Only 299 of those 648 excluded providers ever submitted a Medicaid claim during the 84-month observation window, and 95 billed strictly after their sanction date ($9,694.90 median monthly billing vs. $3,820.94 among unsanctioned peers). Filtering for active paid claims and separating billing fraud from license revocations keeps network audits accurate.

Read the case study and companion exclusion-label audit:
Case Study: https://www.caphegroup.org/methods-lab/measurement-error-claims
Companion Method Guide: https://tooearlytosay.com/research/methodology/medicaid-fraud-labels/`
  },
  {
    id: 2004,
    num: 4,
    slug: 'collider-bias',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Full-List Provider Risk Screening vs. Active-Only Subsets',
    scheduledDate: '2026-11-11',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Nov 11, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/collider-bias',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-classifier/',
    text: `Evaluating a fraud screening model on a downsampled test set or an active-only billing subset inflates apparent precision unless scores are rescaled to the full provider pool.

Across 487,479 Medicaid billing providers, confirmed post-sanction billers represent a 0.0195% base rate (95 cases). On a 5-to-1 downsampled holdout (55,018 providers), the top 1% risk tier shows 0.922% precision. Rescaling to the full 487,479-provider pool yields 0.186% precision (a 9.53x lift over random audits, catching 9 cases across 4,844 flags). Pairing full-pool calibration with a $500,000 annual billing floor focuses investigators on 16,688 high-volume providers.

Read the case study and companion classifier validation guide:
Case Study: https://www.caphegroup.org/methods-lab/collider-bias
Companion Method Guide: https://tooearlytosay.com/research/methodology/medicaid-fraud-classifier/`
  },
  {
    id: 2005,
    num: 5,
    slug: 'p-hacking-multiple-testing',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Separating Real Program Outliers From Small-Group Swings',
    scheduledDate: '2026-11-16',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Nov 16, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/p-hacking-multiple-testing',
    tetsUrl: '',
    text: `Slicing a county renewal dashboard across dozens of age-by-language cells surfaces large percentage swings in tiny subgroups alongside massive headcount losses in core populations.

Across 62 age-by-language cells in Santa Clara County (472,014 baseline Medi-Cal enrollees dropping by 60,292 to 411,722), the sharpest percentage drops appear in small cells with 47 and 36 enrollees (-34.04% and -25.00%, or 16 and 9 people). After applying a multiple-group reliability check and ranking by total people affected, two large cells account for 70.1% of all coverage losses: English-speaking adults (-24,880) and Spanish-speaking adults (-17,380).

Read the full case study:
https://www.caphegroup.org/methods-lab/p-hacking-multiple-testing`
  },
  {
    id: 2006,
    num: 6,
    slug: 'study-design-ladder',
    topic: 'Medi-Cal Coverage, Renewals & Provider Claims',
    title: 'Matching the Study Design to the Operational Question',
    scheduledDate: '2026-11-18',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Nov 18, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/study-design-ladder',
    tetsUrl: '',
    text: `Different stages of a public health program require different evaluation tools. A single study design rarely answers every operational question on a director's desk.

Descriptive funnel tracking across 120,239 Santa Clara Medi-Cal renewals pinpoints where 27,076 procedural losses occur. Multi-year trend splits separate 39,600 added Paid Family Leave claims from baseline workforce growth. Routine-budget models across 1,197 county-years isolate 9.16 fewer deaths per 100,000 per $10 per resident. Finally, randomized trials across 82,695 members test whether live phone outreach lifts renewals (+8% to +11%) where text messages show 0% lift.

Read the full case study:
https://www.caphegroup.org/methods-lab/study-design-ladder`
  },
  {
    id: 2007,
    num: 7,
    slug: 'chw-health-outcomes',
    topic: 'Community Health Workers & Clinical Financing',
    title: 'Per-Visit Medi-Cal Billing vs. Acute-Care Hospital Offsets',
    scheduledDate: '2026-11-23',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Nov 23, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/chw-health-outcomes',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
    text: `Sizing a county Community Health Worker team around fee-for-service clinic billing alone leaves an 89% to 94% funding gap for field outreach.

Across all 58 California counties, employing one full-time Community Health Worker costs $92,684 to $122,102 per year ($103,719 in Santa Clara County), while Medi-Cal pays a flat $31.74 per 30-minute visit ($26.66 per individual unit). Standard visit billing covers 6.5% to 9.8% of field compensation ($6,775 to $10,162 per year). Accounting for avoided emergency and hospital stays ($107,006 to $291,171) and two-year health gains brings total annual value to $407,006 to $852,900 per worker, showing why sustainable programs blend managed-care reinvestment with base grants.

Read the case study and statewide 58-county spatial financing analysis:
Case Study: https://www.caphegroup.org/methods-lab/chw-health-outcomes
Statewide Analysis: https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/`
  },
  {
    id: 2008,
    num: 8,
    slug: 'budget-impact',
    topic: 'Community Health Workers & Clinical Financing',
    title: 'Pairing Long-Run Return Ratios With Year-One Cash-Flow Schedules',
    scheduledDate: '2026-11-25',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Nov 25, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/budget-impact',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
    text: `High multi-year return ratios do not pay Year-1 salaries. Budget committees need a five-year return model paired with a Year-1 cash-flow and reserve schedule.

In California, county prevention spending delivers a 125-to-1 five-year societal return (52-to-1 in Year 1 as 42% of the mortality reduction arrives in the first year). At the same time, expanding Paid Family Leave generates $422.0M in net annual worker benefits but requires $623.7M in 2026 cash outlays, dipping the state fund reserve to 10.8% ($1.96B) against a 25.0% ($4.38B) statutory benchmark before rebuilding to 30.4% ($6.37B) by 2030. Pairing long-run return ratios with annual reserve tables gives finance officers both numbers.

Read the case study and companion public health spending analysis:
Case Study: https://www.caphegroup.org/methods-lab/budget-impact
Companion Analysis: https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/`
  },
  {
    id: 2009,
    num: 9,
    slug: 'cost-effectiveness-ratio',
    topic: 'Community Health Workers & Clinical Financing',
    title: 'Spreading Year-One Startup Costs Across Multi-Year Health Gains',
    scheduledDate: '2026-11-30',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Nov 30, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/cost-effectiveness-ratio',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
    text: `Judging a new community health program on Year-1 operating and startup costs alone loads five years of hiring, training, and IT setup onto twelve months of patient care.

In a 750-client Santa Clara Community Health Worker scenario producing 40.04 healthy life-years per year (200.20 discounted QALYs over five years), Year-1 cost per healthy life-year sits at $48,202 ($1,930,000 in first-year spending). Across Years 2 through 5, ongoing cost drops to $35,090 per QALY ($1,405,000 per year), yielding a five-year average of $36,089 per QALY operating ($37,712 with full $325,000 startup) and +$12.47M in net monetary value at the $100,000/QALY benchmark.

Read the case study and statewide CHW financing analysis:
Case Study: https://www.caphegroup.org/methods-lab/cost-effectiveness-ratio
Statewide Analysis: https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/`
  },
  {
    id: 2010,
    num: 10,
    slug: 'measuring-health-common-unit',
    topic: 'Community Health Workers & Clinical Financing',
    title: 'Putting Chronic Care, Mental Health, and Saved Lives on Shared Ledgers',
    scheduledDate: '2026-12-02',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Dec 2, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/measuring-health-common-unit',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
    text: `When a diabetes clinic tracks blood sugar, a behavioral health team tracks depression scores, and a county health department tracks premature deaths, budget staff lack a common unit to compare programs.

Translating condition-specific outcomes into standardized healthy life-years (QALYs) and federal life-valuation tiers places each program on a clear ledger. Across a 750-client Santa Clara Community Health Worker cohort generating 40.04 QALYs per year ($4.00M in health value at $100,000/QALY), mental health and social-needs navigation contribute 54.5% of total health gains (21.83 QALYs, or $2.18M) that lab-only blood sugar metrics miss.

Read the case study and statewide CHW financing analysis:
Case Study: https://www.caphegroup.org/methods-lab/measuring-health-common-unit
Statewide Analysis: https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/`
  },
  {
    id: 2011,
    num: 11,
    slug: 'classifying-causal-mechanisms',
    topic: 'Community Health Workers & Clinical Financing',
    title: 'Separating Program Steps From Outside Factors in Care Models',
    scheduledDate: '2026-12-07',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Dec 7, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/classifying-causal-mechanisms',
    tetsUrl: '',
    text: `Adding every available database column into a regression model can erase the exact care pathway a program was built to create.

When evaluating how Community Health Workers reduce hospital stays (-30% in randomized trial benchmarks), primary care follow-up visits are a program step (mediator) between enrollment and hospital avoidance. Controlling for post-enrollment clinic visits blocks that pathway and understates program impact. Conversely, omitting neighborhood poverty in a 408-tract Santa Clara food-access regression reverses the apparent store-distance slope (-0.578 raw vs. -0.017 adjusted, with poverty explaining 62.2% of model variance).

Read the full case study:
https://www.caphegroup.org/methods-lab/classifying-causal-mechanisms`
  },
  {
    id: 2012,
    num: 12,
    slug: 'food-affordability-tradeoffs',
    topic: 'Food Security, CalFresh & Local Cost of Living',
    title: 'Uniform Poverty Cutoffs vs. Post-Rent Household Budgets',
    scheduledDate: '2026-12-09',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Dec 9, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/food-affordability-tradeoffs',
    tetsUrl: 'https://tooearlytosay.com/research/food-security/food-access-vulnerability-paradox/',
    text: `A uniform federal poverty cutoff treats a $60,000 household budget identically in coastal Marin County and inland Fresno County, even though rent absorbs very different shares of monthly income.

Comparing median household incomes and median rents across California counties shows how housing costs reshape food budgets. In Marin County, a median monthly income of $5,507 minus $2,318 in median rent (42.1%) and $973 in family food costs (17.7%) leaves $2,216 (30.5%). In Fresno County, a $3,103 monthly income minus $1,007 in rent (32.5%) and $973 in food (31.4%) leaves $1,123 (46.4% remaining before other bills). Pairing post-rent residual income with local store access matches nutrition support to actual household budgets.

Read the case study and companion food-access analysis:
Case Study: https://www.caphegroup.org/methods-lab/food-affordability-tradeoffs
Companion Analysis: https://tooearlytosay.com/research/food-security/food-access-vulnerability-paradox/`
  },
  {
    id: 2013,
    num: 13,
    slug: 'food-insecurity-diabetes',
    topic: 'Food Security, CalFresh & Local Cost of Living',
    title: 'Neighborhood Rent Pressure, Food Shortfalls, and Chronic Disease',
    scheduledDate: '2026-12-14',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Dec 14, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/food-insecurity-diabetes',
    tetsUrl: 'https://tooearlytosay.com/research/food-security/extended-vulnerability-index/',
    text: `When households face high monthly rent and rising grocery prices, food shortfalls and diabetes hospital stays reinforce each other across neighborhood lines.

Across 408 census tracts in Santa Clara County, neighborhood poverty and rent pressure account for 62.2% of the variation in nutrition assistance need, while physical distance to the nearest supermarket adds 1.8%. In high-rent tracts where a $973 monthly family food budget competes directly with housing, pairing CalFresh enrollment navigation with medically tailored groceries targets the household budget constraint that drives emergency room visits.

Read the case study and companion vulnerability index record:
Case Study: https://www.caphegroup.org/methods-lab/food-insecurity-diabetes
Companion Analysis: https://tooearlytosay.com/research/food-security/extended-vulnerability-index/`
  },
  {
    id: 2014,
    num: 14,
    slug: 'geographic-variables',
    topic: 'Food Security, CalFresh & Local Cost of Living',
    title: 'Supermarket Distance Cutoffs vs. Neighborhood Income in Food Access',
    scheduledDate: '2026-12-16',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Dec 16, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/geographic-variables',
    tetsUrl: 'https://tooearlytosay.com/research/food-security/food-desert-myth/',
    text: `Screening urban counties solely by distance to the nearest supermarket flags wealthy hillside neighborhoods while overlooking low-income renters living half a mile from a grocery store they cannot afford.

Across 408 Santa Clara County census tracts, poverty explains 58.1 percentage points of the 62.2% model variance in CalFresh participation (r = 0.827), whereas store distance alone explains 0.003 percentage points. Only 1 of 408 Santa Clara tracts (3,252 residents, 1.218 miles from a grocer) meets the federal low-income, low-access distance cutoff. By contrast, rural counties such as Nevada (2.92 miles average store distance) and Imperial (30 of 225 tracts, 13.3%) face physical transportation barriers that require mobile markets and delivery routes.

Read the case study and companion food-desert analysis:
Case Study: https://www.caphegroup.org/methods-lab/geographic-variables
Companion Analysis: https://tooearlytosay.com/research/food-security/food-desert-myth/`
  },
  {
    id: 2015,
    num: 15,
    slug: 'identical-data-opposite-policies',
    topic: 'Food Security, CalFresh & Local Cost of Living',
    title: 'Nominal Medi-Cal Fee Schedules vs. Local Clinic Purchasing Power',
    scheduledDate: '2026-12-21',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Dec 21, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/identical-data-opposite-policies',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
    text: `A single statewide Medi-Cal fee schedule pays the same nominal dollar amount per visit across California, but those dollars buy very different amounts of clinical staffing in San Francisco versus Imperial County.

Under the CMS Practice Expense Geographic Practice Cost Index (55.6% clinical wages, 29.7% rent, 14.7% services), clinic overhead runs 50.6% above the national mean in San Francisco (1.506 index) compared with 10.0% below the mean in Imperial County (0.900 index). However, Imperial County sits at the 85th percentile of neighborhood deprivation (58.7% to 66.4% Medi-Cal coverage) while San Francisco sits at the 15th percentile. Pairing regional wage adjustments for high-cost clinics with recruitment grants and simpler billing (recovering 17.6% in claim value) addresses both constraints.

Read the case study and statewide 58-county spatial financing analysis:
Case Study: https://www.caphegroup.org/methods-lab/identical-data-opposite-policies
Statewide Analysis: https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/`
  },
  {
    id: 2016,
    num: 16,
    slug: 'threat-measurement-instrumentation',
    topic: 'Food Security, CalFresh & Local Cost of Living',
    title: 'How Permit Deduplication Changes Official Retail Access Counts',
    scheduledDate: '2026-12-23',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Dec 23, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/threat-measurement-instrumentation',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/ebt-verification-methodology/',
    text: `When a supermarket holds separate health permits for its bakery, deli, and meat counter, raw permit registries count one building as three or four food retailers.

In Santa Clara County, deduplicating 8,555 raw health-permit records removes 1,220 multi-permit duplicates (14.3%), consolidating the registry to 7,335 unique physical locations and 724 verified SNAP-eligible food retailers (with 514 stores in the tract-level distance index at 0.573 miles mean distance vs. 0.29 miles on uncleaned lists). Auditing administrative registries before mapping service gaps prevents permit structure from masquerading as neighborhood retail supply.

Read the case study and companion EBT verification methodology:
Case Study: https://www.caphegroup.org/methods-lab/threat-measurement-instrumentation
Companion Method Guide: https://tooearlytosay.com/research/methodology/ebt-verification-methodology/`
  },
  {
    id: 2017,
    num: 17,
    slug: 'reverse-causation-feedback',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Separating Emergency Outbreak Surges From Routine Prevention Budgets',
    scheduledDate: '2026-12-28',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Dec 28, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/reverse-causation-feedback',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
    text: `Comparing county public health spending and death rates in the same calendar year mixes steady prevention budgets with emergency funds sent to counties during disease outbreaks.

Across 57 California counties over 21 years (2003 to 2023, N = 1,197 county-years), a raw same-year average shows a flat +0.18 deaths per 100,000 residents per $10 per person because emergency transfers spike when mortality rises. Isolating routine budget shifts shows that each $10 per resident in baseline public health spending prevents 9.16 deaths per 100,000 ($109,170 per life saved, or $124.60 in societal value per $1 spent, and 4.56 fewer deaths per 100,000 in the 2003 to 2019 pre-pandemic window).

Read the case study and companion 30-year panel regime analysis:
Case Study: https://www.caphegroup.org/methods-lab/reverse-causation-feedback
Companion Analysis: https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/`
  },
  {
    id: 2018,
    num: 18,
    slug: 'observational-to-experimental',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Two Independent Checks on County Public Health Mortality Returns',
    scheduledDate: '2026-12-30',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Dec 30, 2026 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/observational-to-experimental',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
    text: `Randomized trials are rarely feasible for countywide public health budgets, so finance committees look for independent empirical checks across decades and study designs.

Across 57 California counties from 2003 to 2023 (1,197 county-years), isolating routine county budget shifts shows 9.16 fewer deaths per 100,000 residents per $10 per person (with a 314.1 method reliability score and 8.93 fewer deaths when excluding Los Angeles). That estimate aligns within 99.4% of Brown's (2014) earlier 40-county California governance study (9.10 fewer deaths per 100,000 from 2001 to 2008), giving county boards two independent replications across twenty years of California fiscal records.

Read the case study and companion public health spending analysis:
Case Study: https://www.caphegroup.org/methods-lab/observational-to-experimental
Companion Analysis: https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/`
  },
  {
    id: 2019,
    num: 19,
    slug: 'sensitivity-analysis-cea',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Testing County Prevention Returns Across Federal Valuation Tiers',
    scheduledDate: '2027-01-04',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Jan 4, 2027 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/sensitivity-analysis-cea',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
    text: `When a budget committee questions the valuation assumptions behind a public health return ratio, testing the estimate across every federal valuation tier shows whether the funding decision holds up.

Across the 57-county California public health panel ($109,170 cost per life saved at 9.16 fewer deaths per 100,000 per $10 per resident), societal returns clear the 1-to-1 cost-neutral line under every HHS 2025 valuation standard: 57.7-to-1 at the $6.3M low tier, 124.6-to-1 at the $13.6M central tier, and 189.6-to-1 at the $20.7M high tier. Even at the lower bound of the mortality estimate (6.98 fewer deaths per 100,000, or $143,266 per life saved) paired with the $6.3M valuation floor, the return remains 44.0-to-1.

Read the case study and companion public health spending analysis:
Case Study: https://www.caphegroup.org/methods-lab/sensitivity-analysis-cea
Companion Analysis: https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/`
  },
  {
    id: 2020,
    num: 20,
    slug: 'threat-regression-to-mean',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Single-Year Rural Mortality Spikes vs. Multi-Year Pooled Baselines',
    scheduledDate: '2027-01-06',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Jan 6, 2027 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/threat-regression-to-mean',
    tetsUrl: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
    text: `Awarding multi-year rural health grants based on a single year's mortality spike often mistakes small-population noise for lasting need.

In Alpine County (1,204 residents), a single death shifts the annual mortality rate by 83.1 per 100,000. When a small county is selected right after a one-year spike, 71.5% to 89.0% of the following year's drop (-28.4 per 100,000) reflects natural settling toward the multi-year average rather than program impact. Using 3-to-5-year pooled baselines and Empirical Bayes weights separates one-year swings from the steady -8.11 deaths per 100,000 rural prevention return (-9.16 statewide).

Read the case study and companion public health spending analysis:
Case Study: https://www.caphegroup.org/methods-lab/threat-regression-to-mean
Companion Analysis: https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/`
  },
  {
    id: 2021,
    num: 21,
    slug: 'threat-history-solutions',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Using Comparison Groups to Separate Local Shifts From Statewide Shocks',
    scheduledDate: '2027-01-11',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Mon, Jan 11, 2027 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/threat-history-solutions',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/when-to-use-did/',
    text: `When a statewide economic shift or pandemic rule change hits every county at once, a simple before-and-after comparison blends that shared shock into local program results.

Across Medicaid billing records from 2018 to 2024, telehealth-eligible billing providers grew 24.33% (from 91,399 in 2019 to 113,638 in 2023). Pairing that series with non-telehealth Medicaid services (which grew 18.71%, from 109,087 to 129,492) isolates the net +5.62 percentage-point divergence (+4.60 pp after pre-trend adjustment). Adding an unaffected comparison series keeps statewide shocks from distorting local evaluations.

Read the case study and companion difference-in-differences guide:
Case Study: https://www.caphegroup.org/methods-lab/threat-history-solutions
Companion Method Guide: https://tooearlytosay.com/research/methodology/when-to-use-did/`
  },
  {
    id: 2022,
    num: 22,
    slug: 'parallel-trends-power',
    topic: 'County Public Health Budgets & Mortality Returns',
    title: 'Testing How Much Trend Drift an Evaluation Can Withstand',
    scheduledDate: '2027-01-13',
    scheduledTime: '07:00 PST',
    scheduledLabel: 'Wed, Jan 13, 2027 · 7:00 AM PST',
    url: 'https://www.caphegroup.org/methods-lab/parallel-trends-power',
    tetsUrl: 'https://tooearlytosay.com/research/methodology/parallel-trends-sensitivity/',
    text: `Passing a pre-policy trend test in a small sample does not guarantee that treatment and comparison groups would have stayed on parallel paths after the policy launched.

Across 84 months of Medicaid claims, the pre-policy trend difference between telehealth-eligible and comparison services averages -0.47 percentage points (SE = 0.22 pp, 95% CI -0.91 to -0.03 pp). Reporting sensitivity bounds shows how much post-policy trend drift an evaluation can absorb before the estimated effect crosses zero, pairing the Medicaid billing series with the 57-county California public health panel (-9.16 deaths per 100,000).

Read the case study and companion parallel-trends sensitivity guide:
Case Study: https://www.caphegroup.org/methods-lab/parallel-trends-sensitivity
Companion Method Guide: https://tooearlytosay.com/research/methodology/parallel-trends-sensitivity/`
  }
];

// Fix Post 22 case study link typo if any
SCHEDULED_POSTS[21].text = SCHEDULED_POSTS[21].text.replace(
  'Case Study: https://www.caphegroup.org/methods-lab/parallel-trends-sensitivity',
  'Case Study: https://www.caphegroup.org/methods-lab/parallel-trends-power'
);

const HELD_PFL_POSTS = [
  {
    num: 23,
    slug: 'selection-into-treatment',
    topic: 'Paid Family Leave & Workforce Policy (ON HOLD — PDF Preview Created)',
    title: 'Paid Family Leave Reach Across Worker Wage Tiers',
    status: 'on_hold_pdf_only',
    pdfFile: 'outputs/caphe_case_study_selection_into_treatment.pdf',
    url: 'https://www.caphegroup.org/methods-lab/selection-into-treatment',
    text: `Filing a Paid Family Leave claim requires an eligible employer, payroll knowledge, job protection, and enough savings to wait for state processing. As a result, voluntary claims skew toward higher-wage workers with human-resources support.

Compare California workers earning under $20,000 a year with higher-wage workers after the 2025 SB 951 benefit expansion. Although the statute raised statutory wage replacement to 90% for lower-wage workers, actual take-up among eligible new mothers earning under $20,000 remains 41.9% (161,315 claim-filing mothers out of 385,000 eligible). Take-up reaches 77.6% among higher-wage workers. Measuring program reach solely by average benefit checks misses the 58.1% of low-wage mothers who never clear the filing hurdles.

The full case study maps every stage of the Paid Family Leave filing funnel across wage tiers:
https://www.caphegroup.org/methods-lab/selection-into-treatment`
  },
  {
    num: 24,
    slug: 'threat-maturation-solutions',
    topic: 'Paid Family Leave & Workforce Policy (ON HOLD — PDF Preview Created)',
    title: 'Separating Policy Effects From Long-Term Trends',
    status: 'on_hold_pdf_only',
    pdfFile: 'outputs/caphe_case_study_threat_maturation_solutions.pdf',
    url: 'https://www.caphegroup.org/methods-lab/threat-maturation-solutions',
    text: `Statewide Paid Family Leave claims grow nearly every year as California's labor force expands and awareness spreads. When a new wage-replacement law takes effect, a multi-year trend split separates steady background growth from the policy shift itself.

Across 24 years of California Employment Development Department Paid Family Leave records (2004 to 2025), annual bonding claims rose from 152,706 to 492,043. However, bonding claims were already climbing by +5.9% per year before the 2024 taxable wage-ceiling repeal and the 2025 90% wage-replacement tier. Accounting for that 20-year baseline trend and comparing against Disability Insurance claims (+6.2%) isolates the net two-year statutory surge above trend (+15.4% in 2024 and +13.6% in 2025).

The full case study walks through the 24-year California Paid Family Leave trend split:
https://www.caphegroup.org/methods-lab/threat-maturation-solutions`
  }
];

// Style-pass audit across all 22 scheduled + 2 held posts
let issues = 0;
for (const p of [...SCHEDULED_POSTS, ...HELD_PFL_POSTS]) {
  if (/—/.test(p.text)) { console.error(`Post ${p.num} has em-dash`); issues++; }
  if (/;/.test(p.text)) { console.error(`Post ${p.num} has semicolon`); issues++; }
  if (/\b(you|your|yours|yourself)\b/i.test(p.text)) { console.error(`Post ${p.num} has 2nd person`); issues++; }
  if (/\bground(ing|ed|s)?\b/i.test(p.text)) { console.error(`Post ${p.num} has ground* word`); issues++; }
  if (/Methods Lab/i.test(p.text)) { console.error(`Post ${p.num} has Methods Lab`); issues++; }
}
if (issues > 0) process.exit(1);
console.log(`✅ Style-pass verified across all 22 scheduled posts + 2 held PFL posts (0 issues).`);

// 1. Write /Users/vserver/code/CAPHE/docs/caphe_scheduled_posts_2026_2027.json
const scheduleJsonPath = path.join(__dirname, '..', 'docs', 'caphe_scheduled_posts_2026_2027.json');
const schedulePayload = {
  site: 'caphe',
  cadence: 'Mondays and Wednesdays at 7:00 AM PST',
  startDate: '2026-11-02',
  endDate: '2027-01-13',
  scheduledCount: SCHEDULED_POSTS.length,
  heldCount: HELD_PFL_POSTS.length,
  scheduledPosts: SCHEDULED_POSTS,
  heldPosts: HELD_PFL_POSTS
};
fs.writeFileSync(scheduleJsonPath, JSON.stringify(schedulePayload, null, 2), 'utf8');
console.log('Wrote:', scheduleJsonPath);

// 2. Write /Users/vserver/Projects/website-manager/marketing/posts/caphe.json
const wmPostsDir = '/Users/vserver/Projects/website-manager/marketing/posts';
fs.mkdirSync(wmPostsDir, { recursive: true });
const wmCapheJsonPath = path.join(wmPostsDir, 'caphe.json');
fs.writeFileSync(wmCapheJsonPath, JSON.stringify({
  site: 'caphe',
  handle: '@caphegroup.org',
  platforms: ['linkedin', 'bluesky'],
  schedule: 'Monday/Wednesday 07:00 PST',
  posts: SCHEDULED_POSTS.map(p => ({
    id: `caphe-case-study-${String(p.num).padStart(2, '0')}-${p.slug}`,
    site: 'caphe',
    status: 'scheduled',
    scheduled_for: p.scheduledDate,
    scheduled_time: '07:00 PST',
    scheduled_iso: `${p.scheduledDate}T07:00:00-08:00`,
    platforms: ['linkedin', 'bluesky'],
    title: p.title,
    url: p.url,
    tets_companion_url: p.tetsUrl || null,
    text: p.text
  }))
}, null, 2), 'utf8');
console.log('Wrote:', wmCapheJsonPath);

// 3. Update docs/CAPHE_24_CASE_STUDY_SOCIAL_POSTS.md
let md = `# CAPHE Social Posts — 22 Scheduled Case Studies (Mon/Wed 7:00 AM PST) + 2 Held Paid Family Leave Previews\n\n`;
md += `- **Account:** \`CAPHE\` (\`linkedin.com/company/caphe\` & \`@caphegroup.org\` on Bluesky)\n`;
md += `- **Schedule Cadence:** Every **Monday and Wednesday at 7:00 AM PST**, starting **Monday, November 2, 2026** through **Wednesday, January 13, 2027** (22 scheduled posts).\n`;
md += `- **Held Paid Family Leave Case Studies (PDF Previews Only):** Posts #23 (\`selection-into-treatment\`) and #24 (\`threat-maturation-solutions\`) are held off from scheduling and converted to unlisted \`noindex\` mode with full PDF snapshots in \`outputs/\` and Google Drive.\n\n---\n\n`;

for (const p of SCHEDULED_POSTS) {
  md += `## Post #${p.num}: ${p.title} (\`${p.slug}\`)\n`;
  md += `- **Schedule:** **${p.scheduledLabel}** (\`${p.scheduledDate} 07:00 PST\`) · **Status:** \`SCHEDULED (CAPHE)\`\n`;
  md += `- **Topic:** ${p.topic}\n`;
  md += `- **Case Study URL:** ${p.url}\n`;
  if (p.tetsUrl) md += `- **Companion TETS Article:** ${p.tetsUrl}\n`;
  md += `\n${p.text}\n\n---\n\n`;
}

md += `## Held Off (PDF Preview Created — Not Scheduled)\n\n`;
for (const p of HELD_PFL_POSTS) {
  md += `### Held Post #${p.num}: ${p.title} (\`${p.slug}\`)\n`;
  md += `- **Status:** \`ON HOLD — PDF PREVIEW ONLY\` (\`${p.pdfFile}\`)\n`;
  md += `- **Unlisted Direct URL:** ${p.url}\n\n`;
  md += `${p.text}\n\n---\n\n`;
}

const mdPath = path.join(__dirname, '..', 'docs', 'CAPHE_24_CASE_STUDY_SOCIAL_POSTS.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log('Updated:', mdPath);

// 4. Update social-scheduler.html in website-manager and Google Drive
const schedulerFormatPosts = SCHEDULED_POSTS.map(p => ({
  id: p.id,
  site: 'caphe',
  text: p.text,
  platforms: ['linkedin', 'bluesky'],
  status: 'scheduled',
  url: p.tetsUrl || p.url,
  rationale: `CAPHE Case Study #${p.num} (${p.topic}) — Scheduled ${p.scheduledLabel}`,
  link: p.url.replace(/^https:\/\//, ''),
  imageType: 'data-viz',
  imageUrl: '',
  imagePrompt: '',
  scheduledDate: p.scheduledDate,
  scheduledTime: '07:00 PST',
  createdAt: 1793145600000 + p.num * 1000
}));

const schedulerPaths = [
  '/Users/vserver/Projects/website-manager/marketing/social-scheduler.html',
  '/Users/victoriaperez/Library/CloudStorage/GoogleDrive-victoriaeperez@gmail.com/My Drive/Projects/CAPHE/05_marketing/social-scheduler.html'
];

for (const sp of schedulerPaths) {
  if (!fs.existsSync(sp)) continue;
  let html = fs.readFileSync(sp, 'utf8');
  // Replace localStorage loader so new 2001..2022 CAPHE scheduled posts are merged in automatically
  const oldLoaderRe = /\/\/ Load from localStorage[\s\S]*?renderCalendar\(\);/;
  const newLoader = `// Load from localStorage and merge CAPHE Case Study schedule (IDs 2001-2022)
            const samplePosts = getSamplePosts();
            const saved = localStorage.getItem('social-planner-posts');
            if (saved) {
                const parsed = JSON.parse(saved).filter(p => !(p.id >= 2001 && p.id <= 2030));
                const capheScheduled = samplePosts.filter(p => p.id >= 2001 && p.id <= 2022);
                posts = [...parsed, ...capheScheduled];
                savePosts();
            } else {
                posts = samplePosts;
                savePosts();
            }

            renderCalendar();`;
  if (oldLoaderRe.test(html)) {
    html = html.replace(oldLoaderRe, newLoader);
  }
  // Inject the 22 CAPHE scheduled posts at the top of getSamplePosts()
  const serialized = JSON.stringify(schedulerFormatPosts, null, 16).slice(1, -1).trim();
  const sampleRe = /function getSamplePosts\(\)\s*\{\s*return\s*\[([\s\S]*?)\n\s*\];\s*\}/;
  if (sampleRe.test(html)) {
    html = html.replace(sampleRe, (m, inner) => {
      // Remove any previous 2001..2022 block if re-running
      const cleanedInner = inner.replace(/\/\/ CAPHE_22_CASE_STUDIES_START[\s\S]*?\/\/ CAPHE_22_CASE_STUDIES_END,?\s*/g, '');
      return `function getSamplePosts() {\n            return [\n                // CAPHE_22_CASE_STUDIES_START\n                ${serialized},\n                // CAPHE_22_CASE_STUDIES_END\n${cleanedInner}\n            ];\n        }`;
    });
  }
  fs.writeFileSync(sp, html, 'utf8');
  console.log('Updated scheduler:', sp);
}
