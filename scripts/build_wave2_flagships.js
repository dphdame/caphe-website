#!/usr/bin/env node
/**
 * Wave 2 Builder: 4 Flagship California Public Health Economics Case Studies
 * - #7 chw-health-outcomes (Track 1, community, Mode A on SCC PHD HCAI 2024 + DHCS SPA 22-0001)
 * - #8 medicaid-expansion (Track 1, community, Mode A Calibrated Funnel on Observed DHCS Enrollment Baseline)
 * - #24 comparing-two-programs (Track 3, member, Mode A SCC FY 2026-27 CHW Procurement Corpus)
 * - #28 food-insecurity-diabetes (Track 4, community, Mode A Modeled Area-Median Post-Rent Benchmark & Multi-Level Synthesis)
 */

const { renderModuleHtml } = require('./render_option_c');

const wave2Modules = [
  // =========================================================================
  // MODULE #7: chw-health-outcomes (Track 1: Program Impact, community)
  // =========================================================================
  {
    slug: 'chw-health-outcomes',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,129 census tracts, a flat $26.66 Medi-Cal fee schedule covers less than 11% of community health worker labor costs.'
      }
    ],
    tier: 'community',
    hideBlock2: true,
    trackEyebrow: 'Track 1: Program Impact &middot; Flagship Case Study',
    pageTitle: 'CHW Program Impact & Medi-Cal ROI | CAPHE Case Studies',
    metaDescription: 'Compare 4 California CHW program models across flat Medi-Cal visit pay ($31.74), 58-county worker wages, hospital savings, and added healthy years.',
    h1: 'Per-Visit Medi-Cal Rates Cover Only a Small Fraction of County Living-Wage CHW Salaries',
    subtitle: 'How flat Medi-Cal visit pay compares with county worker pay, modeled care savings, and added healthy years.',
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California DHCS State Plan Amendment (SPA) 22-0001</a>: Medi-Cal Community Health Worker Benefit fee schedule. It pays $31.74 per 30-minute health education unit and $26.66 per individual unit.',
      '<a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Bureau of Labor Statistics (BLS) QCEW (2024)</a> &amp; <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California HCAI Prevention Quality Indicators (2024)</a>: 58-county loaded pay ($92,684 to $122,102/yr) and 279,905 avoidable hospital stays.',
      '<a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Kangovi et al. (2020), Health Affairs</a> &amp; <a href="https://hcai.ca.gov/data/healthcare-utilization/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">HCAI / AHRQ HCUP Hospital Cost Benchmarks</a>: Trial cuts (-22% ER visits, -30% hospital stays, -23% readmissions).',
      '<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Neumann, Cohen &amp; Weinstein (2014), NEJM</a> &amp; <a href="https://healthforce.ucsf.edu/publications" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">UCSF Healthforce Center</a>: Standard $100,000 per QALY value and CHW job stay benchmarks.'
    ],
    answerHtml: 'When sizing a county Community Health Worker team, relying only on Medi-Cal visit billing leaves an 89% to 94% pay gap for field outreach [1,2]. Across all 58 state counties, one full-time CHW costs <strong>$92,684 to $122,102</strong> per year [2]. Yet Medi-Cal pays a flat <strong>$31.74</strong> per 30-minute visit [1]. In our four-model comparison, visit fees cover just <strong>6% to 11%</strong> of field pay [1,2]. Adding modeled hospital savings and two-year health gains brings <strong>$407,006 to $852,900</strong> in yearly value per worker [1,3,4]. Splitting hospital, clinic, and local outreach tracks helps county teams blend health plan funds, bed savings, and grants [3,4].',
    block2: null,
    table1: {
      title: 'Table 1. Costs, Hospital Savings &amp; Health Gains Across 4 Program Models',
      subtitle: 'One full-time worker serves a distinct group in each model. Use the 58-county lookup below for local numbers.',
      caption: 'Four state CHW models compared by people served, worker pay, visit fees, Year-1 hospital savings, healthy years, and total value.',
      cornerLabel: 'Program Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> Unit is 1 full-time worker. <strong>Row 1 (Base Use):</strong> Scenarios 1 and 2 serve patients with 2.23 ER visits and 0.70 hospital stays per year. Scenario 3 serves clinic patients with diabetes or asthma. They average 1.40 ER visits and 0.35 stays per year. Scenario 4 reaches 150 adults in the 10 highest-need ZIP codes (60% non-English homes). <strong>Row 2 (58-County Pay):</strong> 2024 BLS county pay runs from $92,684 to $122,102 per year. Local outreach pay runs from $87,434 to $116,852. Scenario 3 shows Year 2+ ongoing clinic cost. <strong>Row 3 (* Visit Pay):</strong> DHCS SPA 22-0001 pays a flat $31.74 per 30-minute visit. Scenarios 1, 2, and 4 use field visits. Scenario 3 uses set clinic visits. <strong>Row 4 (* Hospital Savings):</strong> Uses Kangovi et al. (2020) trial cuts. Scenario 1 uses Medi-Cal plan rates. Scenarios 2 to 4 use 2024 HCAI full bed costs. Net Year-1 cash is +$3,287 in Scenario 1, +$187,452 in Scenario 2, and +$80,964 in Scenario 3. Scenario 4 has a -$63,569 net outlay, or $7,771 per QALY. <strong>Rows 5 &amp; 6 (* Health &amp; Total Value):</strong> Added healthy years (QALYs, at 0.0545 per adult over 2 years, 3% discount rate) are valued at $100,000 per QALY (Neumann et al., 2014). Scenario 4 also adds 38 early checks per year.',
      columns: [
        { tag: 'Scenario 1', tagHighlight: false, title: 'Hospital Care (Medi-Cal View)', subtitle: '' },
        { tag: 'Scenario 2', tagHighlight: false, title: 'Hospital Care (Hospital View)', subtitle: '' },
        { tag: 'Scenario 3', tagHighlight: false, title: 'Clinic Chronic Care', subtitle: '' },
        { tag: 'Scenario 4', tagHighlight: false, title: 'Neighborhood Outreach', subtitle: '' }
      ],
      rows: [
        {
          label: 'Who This Model Serves',
          modeled: false,
          cells: [
            { val: '55 Medi-Cal patients' },
            { val: '55 hospital patients' },
            { val: '75 clinic patients' },
            { val: '150 local adults' }
          ]
        },
        {
          label: 'Annual Worker Cost',
          modeled: false,
          cells: [
            { val: '$103,719' },
            { val: '$103,719' },
            { val: '$101,369' },
            { val: '$98,469' }
          ]
        },
        {
          label: 'Annual Per-Visit Medi-Cal Pay',
          modeled: true,
          cells: [
            { val: '6.5% to 9.8% ($6,775 to $10,162)' },
            { val: '6.5% to 9.8% ($6,775 to $10,162)' },
            { val: '45.9% ($46,561)' },
            { val: '3.4% to 6.4% ($3,388 to $6,348)' }
          ]
        },
        {
          label: 'Year-1 Hospital Savings',
          modeled: true,
          cells: [
            { val: '$107,006 (27 ER, 11.6 stays)' },
            { val: '$291,171 (27 ER, 11.6 stays)' },
            { val: '$182,333 (23 ER, 7.9 stays)' },
            { val: '$34,900 (6.6 ER, 1.1 stays)' }
          ]
        },
        {
          label: 'Added Healthy Years (2-Yr Horizon)',
          modeled: true,
          cells: [
            { val: '+3.00 QALYs ($300,000)' },
            { val: '+3.00 QALYs ($300,000)' },
            { val: '+4.09 QALYs ($409,000)' },
            { val: '+8.18 QALYs ($818,000)' }
          ]
        },
        {
          label: 'Total Annual Value',
          modeled: true,
          highlight: true,
          cells: [
            { val: '$407,006 (3.92:1 return)', barWidth: 48, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$591,171 (5.70:1 return)', barWidth: 69, barColor: '#0D9488', textColor: 'text-emerald-900' },
            { val: '$591,333 (5.83:1 return)', barWidth: 69, barColor: '#0D9488', textColor: 'text-emerald-900' },
            { val: '$852,900 (8.66:1 return)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-900' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. When Each Model Works Best &amp; How to Fund It',
      subtitle: 'How each CHW model fits a clear health goal and a steady county funding mix.',
      caption: 'Guide comparing when each CHW model works best, main value, key limits, and how counties pay for it.',
      cornerLabel: 'Decision Guide',
      rows: [
        {
          label: 'When This Model Works Best',
          cells: [
            { val: 'Cutting Year-1 Medi-Cal claims for frequent care users.' },
            { val: 'Freeing hospital beds and cutting unpaid care costs.' },
            { val: 'Bringing steady clinic visit fees for diabetes and asthma.' },
            { val: 'Growing early health checks in high-need ZIP codes.' }
          ]
        },
        {
          label: 'Main Value Beyond Hospital Bills',
          cells: [
            { val: 'Links patients to a doctor right after a stay.' },
            { val: 'Opens full ER bays and beds for sick patients.' },
            { val: 'Keeps blood sugar and asthma in check with set visits.' },
            { val: 'Reaches families who skip clinics due to language or fear.' }
          ]
        },
        {
          label: 'Key Operational Limit',
          cells: [
            { val: 'Field trips cannot bill enough visits to pay full wages.' },
            { val: 'Small 55-patient loads reach fewer total county adults.' },
            { val: 'Needs patients who already see a regular clinic doctor.' },
            { val: 'Health gains build over two years past Year-1 bills.' }
          ]
        },
        {
          label: 'How to Pay for This Model',
          policyFit: true,
          cells: [
            { headline: 'Monthly Health Plan Contract', detail: 'Pair visit fees with monthly CalAIM care plan pay.' },
            { headline: 'County Hospital Savings Pool', detail: 'Fund roles from hospital budgets as beds open up.' },
            { headline: 'Clinic Visit Pay + Quality Bonus', detail: 'Blend set 30-minute visit fees with care bonuses.' },
            { headline: 'Public Health Grant + Hospital Credit', detail: 'Blend Year-1 bed credits with public health grants.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: 58-County Worker Pay, Hospital Rates &amp; Health Value (QALY) Math',
      notesBullets: [
        '<strong>Flat Medi-Cal Pay vs. Local Worker Costs:</strong> Under <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a>, Medi-Cal pays a flat $31.74 per 30-minute health education visit across all 58 counties. Individual units pay $26.66. Local worker costs come from 2024 <a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Bureau of Labor Statistics QCEW</a> county wages. Pay averages $54,000 base or $103,719 loaded statewide. Across 58 counties, total cost runs from $92,684 to $122,102. That sum includes 35% fringe, $19,000 lead support, $4,000 training, and 10% office cost.',
        '<strong>Medi-Cal Rates vs. Full Hospital Costs:</strong> Medi-Cal plan rates are $600 per ER visit, $7,000 per hospital stay, and $6,000 per readmission. Those numbers match DHCS fee tables. Full hospital costs are $2,100 per ER visit, $18,500 per stay, and $15,000 per readmission. Those numbers come from <a href="https://hcai.ca.gov/data/healthcare-utilization/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California HCAI</a> and <a href="https://hcup-us.ahrq.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">AHRQ HCUP</a> cost files.',
        '<strong>Why Year-1 Hospital Bills Leave Out Scenario 4 Value (150 Adults in 10 High-Need ZIP Codes):</strong> Official 2024 <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI Prevention Quality Indicators (PQI)</a> log 279,905 avoidable stays in the state. The rate is 902.5 per 100,000 adults in PQI 90 and 715.3 in PQI 92. In high-need ZIP codes, 60% of adults speak a language other than English at home. Also, 14% of immigrant adults skip public aid out of fear. They face 2.4x higher odds of late care (Wolstein et al., 2022, JAMA Network Open). Reaching 150 adults stops 6.6 ER visits and 1.10 stays in Year 1 ($34,900 saved). It also adds 38 checks and brings <strong>8.18 quality-adjusted life years (QALYs)</strong>. That equals 0.0545 QALYs per adult over 2 years at a 3% discount rate. Each QALY is valued at $100,000 (<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann et al., 2014, NEJM</a>). After subtracting $34,900 in bed savings, Scenario 4 costs <strong>$7,771 per QALY gained</strong> ($63,569 / 8.18 QALYs). It brings <strong>$852,900/yr</strong> in total value (8.66:1).'
      ]
    },
    countyLookup: {
      badge: '58-County Lookup &amp; Impact Check',
      title: 'See Worker Pay, Hospital Savings, Healthy Years &amp; Total Value by County',
      subtitle: 'Pick a county, a program model, and a health impact level below.',
      dataPath: 'data/chw_county_benchmarks_2024.json'
    },
    synthesis: {
      title: 'Matching Each CHW Model to the Right Group, Goal &amp; Budget',
      p1: 'Local health leaders face two plain questions. First, how do counties pay a living wage ($92,684 to $122,102/yr) when Medi-Cal pays a flat $31.74 per 30-minute visit? Second, how should each model be judged? Judging every CHW team only by Year-1 bed bills favors small hospital teams. It shortchanges local outreach.',
      p2: 'Weighing both Year-1 bed savings and two-year healthy years (QALYs) shows where each model fits best. Hospital teams serving 55 sick patients fit best when health plans and hospitals need fast ER and bed savings ($107,006 to $291,171/yr). Clinic teams serving 75 patients fit best when clinics bill for set visits ($46,561/yr, or 45.9% of pay) while cutting hospital bills ($182,333/yr). Local Promotora outreach across 150 adults in the 10 highest-need ZIP codes fits best for health agencies reaching families who delay care. It adds 8.18 healthy years ($818,000 value) plus $34,900 in bed savings. Total value reaches $852,900 (8.66:1) at $7,771 per QALY.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Policy &amp; Fiscal Model on Observed 58-County Baselines):</strong> This flagship study pairs state Medi-Cal fee rules, 2024 HCAI county stay counts, 2026 DHCS plan counts, and 2024 BLS QCEW county pay with trial effect sizes and two-year health weights. The unit of study is 1.0 FTE Community Health Worker across four annual caseloads. Those are 55 hospital patients, 75 clinic patients, or 150 adults across the 10 highest-need ZIP codes in a county.',
      '<strong>Statutory Fee Schedule Provenance (Zero Regional Adjustment):</strong> California <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Department of Health Care Services (DHCS) State Plan Amendment 22-0001</a> sets flat state CHW rates for CPT 98960-98962. It pays $26.66 per 30-minute individual unit and $31.74 per 30-minute group education unit (modifier U2). There is no county wage adjustment. Visit counts, avoided stays, QALY gains, and net county balances are modeled.',
      '<strong>58-County HCAI Preventable Hospitalization &amp; BLS QCEW Wage Provenance:</strong> County stay rates come from the 2024 <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI Prevention Quality Indicators (PQI) dataset</a>. It covers N = 31,012,717 state adults with 279,905 avoidable stays (902.5 per 100,000 in PQI 90) and 221,844 chronic stays (715.3 per 100,000 in PQI 92). County wage tiers come from 2024 <a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. BLS Quarterly Census of Employment and Wages (QCEW)</a> county pay. They are scaled to Santa Clara County Public Health FY 2026-27 wage rules ($59,000 base or $112,915 loaded in clinic; $54,000 base or $103,719 loaded statewide).',
      '<strong>Trial Effect Sizes, Care Avoidance &amp; QALY Utility Parameters:</strong> Hospital cuts (-22% ER visits, -30% hospital stays, -23% 30-day readmissions) come from the IMPaCT trial (<a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi et al., 2020, Health Affairs</a>). Two-year QALY gains equal 0.0545 QALYs per adult at a 3% discount rate (chronic disease 0.025, mental health 0.040, social needs 0.020). They are valued at $100,000 per QALY (<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann, Cohen &amp; Weinstein, 2014, N Engl J Med</a>; Stansert Katzen et al., 2025, Lancet Primary Care). Care delay rates in immigrant areas (13.7% skip rate; OR = 2.39 for late care) come from Wolstein et al. (2022, JAMA Network Open). Staff turnover rates come from <a href="https://healthforce.ucsf.edu/publications" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">UCSF Healthforce Center</a> surveys (N = 210).'
    ],
    faqs: [
      {
        question: 'Under which circumstances is each of the four CHW models best?',
        answer: 'Hospital teams (55 high-need patients) work best when a health plan or county hospital needs fast Year-1 ER and bed savings. They save $107,006 at Medi-Cal rates or $291,171 at full bed cost. Clinic teams (75 patients) work best for clinics that can bill set 30-minute visits ($46,561/yr, or 45.9% of pay) while saving $182,333 in hospital costs. Local Promotora outreach (150 adults across 10 high-need ZIP codes) works best for public health teams reaching families who delay clinic care. It brings the largest health gain (+8.18 QALYs, worth $818,000) at a net cost of $7,771 per QALY.'
      },
      {
        question: 'Why is same-year hospital and emergency cost offset too narrow to evaluate neighborhood promotora prevention?',
        answer: 'Local Promotoras reach families early, before blood sugar or high blood pressure leads to an ER trip. Counting only Year-1 hospital bills captures $34,900 in bed savings. Yet it leaves out 38 early checks per year and 8.18 added healthy years (QALYs) across 150 adults. Valuing health gains at $100,000 per QALY shows $852,900 in yearly value (8.66:1). The net cost is $7,771 per QALY gained, which is 92% below the $100,000 benchmark.'
      },
      {
        question: 'Does Medi-Cal adjust its CHW reimbursement rate for high-cost California counties?',
        answer: 'No. Under DHCS SPA 22-0001, Medi-Cal pays a flat state rate of $31.74 per 30-minute health education unit across all 58 counties. Individual units pay $26.66. Full-time CHW pay runs from $92,684 in rural counties to $103,719 statewide and $122,102 in Bay Area counties. As a result, field visit billing covers only 6% to 11% of yearly worker pay.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'Cost-Effectiveness Ratios & Net Monetary Benefit', note: 'Case study on ICERs, comparator choice, and willingness-to-pay thresholds' },
      { slug: 'budget-impact', title: 'Budget Impact vs. Long-Run ROI', note: 'Case study on annual cash-flow versus multi-year societal returns' },
      { slug: 'sensitivity-analysis-cea', title: 'Sensitivity Analysis Across Valuation Tiers', note: 'Case study testing parameter uncertainty across CHW and LHA returns' }
    ]
  },

  // =========================================================================
  // MODULE #8: medicaid-expansion (Track 1: Program Impact, community)
  // =========================================================================
  {
    slug: 'medicaid-expansion',
    tier: 'community',
    trackEyebrow: 'Track 1: Program Impact &middot; Flagship Case Study (Mode A Calibrated Funnel on Observed DHCS Enrollment Baseline)',
    pageTitle: 'Medi-Cal Churn & Work Requirement Funnel | CAPHE',
    metaDescription: 'Decompose Santa Clara County Medi-Cal expansion disenrollment into administrative verification friction vs. true eligibility loss using DHCS and ACS data.',
    h1: 'Most Projected Medi-Cal Renewal Losses Stem From Preventable Paperwork Drop-Offs Rather Than Lost Eligibility',
    subtitle: 'How our modeled renewal check splits form drop-offs among working and exempt adults from true income exits.',
    endnotes: [
      '<a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Health and Human Services (CHHS) Open Data Portal: Medi-Cal Certified Eligibles with Demographics by Month</a> (<code>scc_dhcs_medical_enrollment.csv:1-134</code>). Santa Clara County June 2025 Final count is 472,014 total, 255,601 adults 19–64, and 120,239 ACA expansion adults 19–64. That equals 2.5949% of 4,633,636 statewide. The June 2026 count is 105,436 (-12.31% pre-policy drop). The state Step 1–5 funnel comes from the <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California DHCS Implementation Plan for New Eligibility and Enrollment Changes under H.R. 1</a> (Webinar Deck, Feb 5, 2026, slides 13, 20–26, 34; <code>dhcs_verification_funnel_scc.csv:1-11</code>). Statewide, 1,842,155 (39.8%) clear at Steps 1–4. Santa Clara gets a 0.0% Step 2 jobless waiver share. That shifts +9,689 adults into Step 5 paper checks (82,126 vs. 72,437 flat-scaled) and yields 41,100 vs. 36,218 losses at a 50% Step 5 loss rate.',
      '<a href="https://www2.census.gov/programs-surveys/acs/data/pums/2023/5-Year/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau ACS 2019–2023 5-Year PUMS</a> (<code>extract_pums.py</code> &amp; <code>scc_hr1_medicaid_risk_profiles.csv:1-46</code>). We pull 97,933 person records across all 15 Santa Clara County PUMAs (08501–08515). The subset has n = 6,297 unweighted adults ages 19–64 on Medicaid/Medi-Cal (HINS4 = 1) without Medicare/SSI (HINS3 != 1, SSP = 0) at income &le;138% FPL (POVPIP &le; 138). Using person weight PWGTP and 80 replicate weights (PWGTP1–PWGTP80) gives 133,998 &plusmn; 3,905 (rounded to 134,000) adults. Scaling to the 120,239 DHCS base shows <strong>77.5% (93,233 DHCS-scaled)</strong> meet the &ge;80 hr/mo rule in Group 1 (38.01%, 45,703 DHCS-scaled; 50,934 &plusmn; 2,423 ACS) or hold a rule exemption in Group 2 (39.53%, 47,530 DHCS-scaled; 52,971 ACS across Bucket B care &lt;14 [30,074], Bucket C birth/disability [11,129], and Bucket D student [11,768]). Another <strong>11.01% (13,226 DHCS-scaled; 14,752 ACS)</strong> work in Group 3 gig or part-time jobs (Buckets E [3,313], F [7,467], G [3,972]). Their status rests on a 1-month-in-6 lookback (88.5% = 106,459 summed across rounded groups, or 106,472 unrounded [0.885499 &times; 120,239]). That leaves <strong>11.45% (13,767 DHCS-scaled; 15,341 ACS)</strong> in Group 4 without recorded work or a survey exemption.',
      '<a href="https://www.kff.org/medicaid/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">KFF Medicaid Unwinding &amp; Work Requirement Research</a> (Methodological reference: form disenrollment and check funnel benchmarks). <strong>CAPHE Mode A Renewal Funnel Model</strong> (<code>churn_reduction_model.py</code>, <code>churn_reduction_model_scc.csv:1-24</code>, <code>scc_hr1_synthesis.csv:8-15</code>, <code>INTERVENTION_DESIGN.md:155,239-241</code>). For each group g, the Step 5 paper pool is M_g = N_g &times; p_step5. Here p_step5 is the share not cleared at Steps 1–4. Group 1 has 12,734 at Step 5. Group 2 has 18,870 (4,512 B + 6,120 C + 8,238 D). Group 3 has 10,275. Group 4 has 12,273. The total is M = 54,152. At the DHCS 50% Step 5 loss rate (L_g = 0.50 &times; M_g), six-month losses are 6,367 (13.9% of Group 1) + 9,435 (19.9% of Group 2) + 5,138 (38.8% of Group 3) + 6,136 (44.6% of Group 4) = 27,076 per cycle (30,174 on the 133,998 ACS scale). Multiplying L_g by avoidable shares r_g (0.35 in Group 1 = 2,228; 0.724 in Group 2 = 6,831 [1,241 B + 2,295 C + 3,295 D]; 0.646 in Group 3 = 3,319; 0.30 in Group 4 = 1,841) gives <strong>14,219 of 27,076 (52.5%)</strong> avoidable losses per cycle (10,150 in Groups 2–3). Adding phone form upload raises that to <strong>15,642 of 27,076 (57.8%)</strong> (+1,423 DHCS-scaled; 17,350 of 30,007 on the ACS scale).'
    ],
    answerHtml: 'When reviewing Medi-Cal renewal drops, one county total leaves out whether adults lost eligibility or missed a form check [1]. In Santa Clara County, low jobless rates rule out a countywide waiver [1]. Yet <strong>88.5%</strong> of Medicaid expansion adults already work or hold an exemption [1,2]. In our modeled four-group check, <strong>52.5%</strong> of projected disenrollment comes from avoidable form drops (<strong>14,219 of 27,076</strong> per cycle) [2,3]. Flat state scaling projects <strong>36,218 to 41,100</strong> losses with no group split [1,3]. Splitting the funnel guides staff to exempt caregivers, disabled adults, and part-time workers [3].',
    block2: {
      title: 'Aggregate Disenrollment Forecast vs. Procedural Verification Decomposition (Santa Clara County)',
      contextTag: 'Calibrated Six-Month Renewal Funnel on Observed DHCS Baseline (120,239)',
      ariaLabel: 'Comparison of flat-share aggregate disenrollment assumptions versus procedural versus eligibility churn decomposition',
      ruler1: {
        title: 'Ruler 1: Flat-Share Aggregate Disenrollment View (County-Scaled Funnel)',
        stat: '36,218 to 41,100 / Cycle',
        ariaLabel: 'Flat statewide share assumes 36,218 losses per cycle, rising to 41,100 after correcting Santa Clara zero high-unemployment waiver share',
        segments: [
          { cls: 'seg-gross', width: 88, label: 'Flat Statewide Scaling (36,218)' },
          { cls: 'seg-rent', width: 12, label: '+4,882 No-Waiver Adjustment' }
        ],
        desc: 'Applying the flat 2.5949% state share to the <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS state funnel</a> projects <strong>36,218</strong> six-month losses. That rises to <strong>41,100</strong> with a 0% county jobless waiver share. It does not split form drops from lost eligibility.'
      },
      ruler2: {
        title: 'Ruler 2: Subpopulation Eligibility &amp; Procedural Churn Ruler',
        stat: '88.5% Eligible | 52.5% Preventable',
        ariaLabel: '88.5% of expansion adults work or hold an exemption, and 52.5% of bucket disenrollments are preventable procedural losses',
        segments: [
          { cls: 'seg-primary', width: 38, label: 'Working >=80h (38.0%)' },
          { cls: 'seg-rest', width: 40, label: 'Exempt Caretaker/Disabled/Student (39.5%)' },
          { cls: 'seg-food', width: 11, label: 'Gig/Var (11.0%)' },
          { cls: 'seg-rent', width: 11, label: 'Gap (11.5%)' }
        ],
        desc: 'Census data (<a href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">ACS 2019–2023 PUMS</a> scaled to <strong>120,239</strong> DHCS adults) shows <strong>77.5%</strong> work &ge;80 hrs/mo or hold an exemption. Another <strong>11.0%</strong> work part-time (<strong>88.5%</strong> total). Of <strong>27,076</strong> modeled losses, <strong>14,219 (52.5%)</strong> are avoidable.'
      }
    },
    table1: {
      title: 'Table 1. Six-Month Renewal Funnel Across Four Medi-Cal Adult Groups',
      subtitle: 'Group size, auto-match rates, and modeled form losses across four Santa Clara County groups.',
      caption: 'Four Santa Clara County Medi-Cal groups compared by size, auto-match rate, six-month loss, and avoidable form drops.',
      cornerLabel: 'Group &amp; Funnel Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> This six-month renewal funnel models 27,076 group losses per cycle. Of those, 14,219 (52.5%) are avoidable form drops. It is scaled to the June 2025 Santa Clara County DHCS count of 120,239 expansion adults. Group shares come from U.S. Census ACS 2019–2023 5-Year PUMS data (133,998 weighted adults, rounded to 134,000; n = 6,297 unweighted records across 15 PUMAs).',
      columns: [
        { tag: 'Group 1', tagHighlight: true, title: 'Working >= 80 Hrs/Mo', subtitle: 'Regular W-2 wage earners' },
        { tag: 'Group 2', tagHighlight: true, title: 'Rule Exemptions', subtitle: 'Caregivers, disabled adults, and students' },
        { tag: 'Group 3', tagHighlight: false, title: 'Gig &amp; Part-Time Work', subtitle: 'Self-employed and seasonal workers' },
        { tag: 'Group 4', tagHighlight: false, title: 'No Recorded Work', subtitle: 'No visible ACS survey exemption' }
      ],
      rows: [
        {
          label: 'DHCS-Scaled Adult Count<span class="block text-xs font-normal text-slate-500">ACS shares applied to 120,239 June 2025 adults</span>',
          cells: [
            { val: '38.0% (45,703)' },
            { val: '39.5% (47,530)' },
            { val: '11.0% (13,226)' },
            { val: '11.5% (13,767)' }
          ]
        },
        {
          label: 'Census Survey Adult Count<span class="block text-xs font-normal text-slate-500">Weighted total of 133,998 (n = 6,297 across 15 PUMAs)</span>',
          cells: [
            { val: '50,934' },
            { val: '52,971' },
            { val: '14,752' },
            { val: '15,341' }
          ]
        },
        {
          label: 'Auto Data Match Rate<span class="block text-xs font-normal text-slate-500">EDD wage &amp; CalWORKs/SSI file match</span>',
          cells: [
            { val: '80.0% matched' },
            { val: '38.0% to 70.0% matched' },
            { val: '10.0% to 45.0% matched' },
            { val: '5.0% matched' }
          ]
        },
        {
          label: 'Modeled Six-Month Plan Losses<span class="block text-xs font-normal text-slate-500">Total across groups: 27,076 / cycle (30,174 ACS)</span>',
          modeled: true,
          cells: [
            { val: '13.9% (6,367)' },
            { val: '19.9% (9,435)' },
            { val: '38.8% (5,138)' },
            { val: '44.6% (6,136)' }
          ]
        },
        {
          label: 'Modeled Avoidable Form Losses<span class="block text-xs font-normal text-slate-500">Total avoidable: 14,219 of 27,076 (52.5%)</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '35.0% (2,228)', barWidth: 35, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '72.4% (6,831)', barWidth: 72, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '64.6% (3,319)', barWidth: 65, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '30.0% (1,841)', barWidth: 30, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Main Renewal Form Hurdle<span class="block text-xs font-normal text-slate-500">Friction point in redetermination</span>',
          cells: [
            { val: 'Wage lag or two jobs' },
            { val: 'Unlinked school or care forms' },
            { val: 'Hard 1099 or cash logs' },
            { val: 'Unlogged health or care hours' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Group Profiles, Form Hurdles &amp; County Actions',
      subtitle: 'How county teams match each adult group to its main form hurdle and best fix.',
      caption: 'Guide matching four Medi-Cal adult groups to form hurdles, staff priorities, and county actions.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Work &amp; Home Profile',
          cells: [
            { val: 'W-2 retail, food, health, and warehouse workers (>=80 hrs/mo).' },
            { val: 'Parents (18,950), disabled adults (18,370), and students (10,210).' },
            { val: 'App drivers, home helpers, and seasonal part-time workers.' },
            { val: 'Jobless or family-care adults with no logged exemption.' }
          ]
        },
        {
          label: 'What One Total Leaves Out',
          cells: [
            { val: 'Pay file lags affect 20% who meet work rules.' },
            { val: 'State law exempts 100% of this group from work rules.' },
            { val: 'One-month checks skip valid hours over six months.' },
            { val: 'Unlogged health needs qualify for clinic exemptions.' }
          ]
        },
        {
          label: 'County Staff Priority',
          cells: [
            { val: 'Clear 80% by state wage files before outreach.' },
            { val: 'Top return: accounts for 6,831 form drops per cycle.' },
            { val: 'Swap long tax logs for a one-page pay form.' },
            { val: 'Pair renewal calls with clinic checks and local slots.' }
          ]
        },
        {
          label: 'Best County Action',
          policyFit: true,
          cells: [
            { headline: 'Auto Wage Match + Text Upload', detail: 'Clear 80% by wage data and add phone paystub upload (saves 2,228).' },
            { headline: 'Clinic &amp; School Auto-Flag', detail: 'Pre-fill health and care exemptions from clinic and school files (saves 6,831).' },
            { headline: 'Six-Month Rule + Short Form', detail: 'Count any valid month in six plus simple cash forms (saves 3,319).' },
            { headline: 'Health Screen &amp; Local Slot', detail: 'Screen for health exemptions and link to local service slots (saves 1,841).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Pre-Policy Baseline Drift &amp; Local Unemployment Adjustment',
      notesBullets: [
        '<strong>Observed Pre-Policy Drift (DHCS Count):</strong> Santa Clara County expansion adult counts fell by <strong>-12.31%</strong> (-14,803 adults, from 120,239 in June 2025 to 105,436 in June 2026 in <a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CHHS Open Data</a>). That drop happened during routine unwinding before any work rule began.',
        '<strong>Zero Jobless Waiver Adjustment (Mode A):</strong> State DHCS funnel numbers subtract 373,389 adults in high-unemployment counties before paper checks (<code>dhcs_verification_funnel_scc.csv:5</code>). Santa Clara County has a low jobless rate (~4.1%). It gets a 0.0% county waiver share. Its paper check pool rises by +9,689 (from 72,437 to 82,126). At a 50% paper loss rate, county losses reach <strong>41,100 per cycle</strong> instead of the flat-scaled 36,218.',
        '<strong>Phone Notice Upload Gain:</strong> Adding phone notice upload and form help stops 1,423 more DHCS-scaled losses (+3,131 on the ACS scale). Total stopped disenrollment rises from 14,219 to <strong>15,642 of 27,076 (57.8%)</strong> on the DHCS scale. That equals <strong>17,350 of 30,007 (57.8%)</strong> on the unscaled ACS base.'
      ]
    },
    synthesis: {
      title: 'How Funnel Decomposition Changes County Retention Budgeting',
      p1: 'When a county sees a projected 36,000 to 41,000 drop in Medi-Cal plans, one top-line total gives no clear plan for staff. If leaders think those adults found job plans or chose not to work, the county will plan for smaller clinic panels. Meanwhile, ER teams will absorb thousands of newly uninsured patients who lost care over an unreturned form.',
      p2: 'Splitting the renewal funnel by check stage and Census group shows that <strong>88.5%</strong> of Santa Clara County\'s 120,239 expansion adults work at least 80 hours per month, hold a rule exemption, or work part-time hours. In our county model, <strong>71.4%</strong> of all avoidable form losses (<strong>10,150 of 14,219</strong> per cycle) hit exempt caregivers, disabled adults, students, and part-time workers. Moving outreach funds to clinic and school auto-flags, six-month hour checks, and one-page pay forms keeps people covered at a fraction of broad ad costs.'
    },
    interactive: {
      badge: 'Funnel Scenario Check',
      title: 'Compare Modeled Renewal Losses Across Three County Outreach Plans',
      subtitle: 'Projected six-month Medi-Cal losses across three county plans on the 120,239 adult baseline.',
      options: [
        {
          label: 'Scenario 1 · Base Renewal',
          headline: 'No Targeted County Outreach',
          metric: '27,076 Projected Losses / Cycle',
          desc: 'With no help, half of adults sent paper forms after auto data checks lose coverage each six-month cycle.'
        },
        {
          label: 'Scenario 2 · Exemption &amp; Lookback',
          headline: 'Auto Flagging + Six-Month Check',
          metric: '10,150 Saved (37.5% of Losses)',
          desc: 'Clinic and school auto-flags for caregivers and students plus a six-month hour check stop 71.4% of avoidable form drops.'
        },
        {
          label: 'Scenario 3 · Full Help + Phone Upload',
          headline: 'All Four Groups + Phone Upload',
          metric: '15,642 Saved (57.8% of Losses)',
          desc: 'Adding wage follow-up, health screens, and phone form upload across all four groups stops over half of six-month losses.'
        }
      ],
      notesTitle: 'Scenario Calculations, Subpopulation Splits &amp; ACS-Weighted Scale Crosswalk',
      notesBullets: [
        '<strong>Scenario 1 Base Counts:</strong> In the four-group model scaled to 120,239 DHCS adults, 54,152 reach paper renewal after auto checks. Of those, <strong>27,076 (50.0%)</strong> lose plans each six-month cycle. That equals <strong>30,174</strong> on the 133,998 ACS 2019–2023 PUMS base, or <strong>41,100</strong> under flat state scaling with a 0.0% county jobless waiver.',
        '<strong>Scenario 2 Group Math:</strong> Auto clinic and school flags for exempt adults stop <strong>6,831</strong> modeled losses per cycle (1,241 caregivers + 2,295 disabled or new-parent adults + 3,295 students). Six-month hour checks for part-time workers stop <strong>3,319</strong> losses. Together they stop <strong>10,150 losses</strong> (37.5% of 27,076 total losses, or 71.4% of the 14,219 avoidable pool).',
        '<strong>Scenario 3 Full Plan &amp; Phone Upload:</strong> Adding wage follow-up for W-2 workers stops <strong>2,228</strong> losses. Clinic health checks and local service slots for non-working adults stop <strong>1,841</strong> losses. That brings the total to <strong>14,219 (52.5%)</strong>. Pairing with phone form upload adds <strong>+1,423</strong> DHCS-scaled saves, reaching <strong>15,642 of 27,076 (57.8%)</strong> on the DHCS scale (<strong>17,350 of 30,007 [57.8%]</strong> on the ACS scale).'
      ]
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Calibrated Funnel on Observed Enrollment Baseline):</strong> The county check funnel (36,218 to 41,100 per cycle under top-down scaling; 27,076 group losses and 14,219 or 52.5% avoidable in the 4-group model) is a Mode A model (<code>dhcs_verification_funnel_scc.csv:1-11</code>, <code>churn_reduction_model_scc.csv:1-24</code>). It is scaled to Santa Clara County\'s June 2025 DHCS base of 120,239 expansion adults (105,436 in June 2026; <code>scc_dhcs_medical_enrollment.csv:1-134</code>). The 133,998 &plusmn; 3,905 count (rounded to 134,000) is the ACS 2019–2023 5-Year PUMS weighted base (<code>n = 6,297</code> records across PUMAs 08501–08515) used for group shares.',
      '<strong>Primary Data Sources &amp; Extract Specifications:</strong> Sources include the <a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Health and Human Services (CHHS) Open Data Portal</a> (June 2025 Final to June 2026), the <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS H.R. 1 Implementation Plan Webinar Deck (Feb 5, 2026)</a>, the <a href="https://www2.census.gov/programs-surveys/acs/data/pums/2023/5-Year/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 2019–2023 5-Year PUMS</a> (weights PWGTP and PWGTP1–PWGTP80), and <a href="https://www.kff.org/medicaid/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">KFF Medicaid Unwinding &amp; Work Requirement Research</a>.',
      '<strong>Reconciliation of DHCS vs. ACS Denominators &amp; Rounding:</strong> Table 1 lists both DHCS-scaled counts (<code>N = 120,239</code>: Group 1 = 45,703 [38.01%], Group 2 = 47,530 [39.53%], Group 3 = 13,226 [11.01%], Group 4 = 13,767 [11.45%]; sum of rounded groups 1–3 = 106,459, or 106,472 at unrounded 0.885499 &times; 120,239) and unscaled ACS PUMS weights (<code>N = 133,998</code>, rounded to 134,000: 50,934 + 52,971 + 14,752 + 15,341). County teams can match state plan dashboards directly to Census files.'
    ],
    faqs: [
      {
        question: 'What share of Santa Clara County Medi-Cal expansion adults already work or qualify for an exemption?',
        answer: 'In Census data scaled to the 120,239 DHCS base, 77.5% of expansion adults already work at least 80 hours per month (38.0%) or hold a caregiver, disability, or student exemption (39.5%). Another 11.0% work in self-employed or part-time roles, reaching 88.5% in all. Only 11.5% (13,767 adults) have no logged work or survey exemption.'
      },
      {
        question: 'Why does Santa Clara County face a higher per-capita disenrollment rate than the statewide DHCS average?',
        answer: 'The state DHCS check funnel exempts 373,389 adults living in high-unemployment or disaster counties before paper checks. Santa Clara County has a low jobless rate (~4.1%). As a result, 0% of its adults get a countywide jobless waiver. Projected six-month losses rise from 36,218 (flat state share) to 41,100.'
      },
      {
        question: 'Which Medi-Cal subpopulations experience the highest preventable procedural churn?',
        answer: 'Exempt caregivers, disabled adults, and students face 6,831 avoidable form losses per cycle (72.4% avoidable). Self-employed and part-time workers follow with 3,319 avoidable form losses per cycle (64.6% avoidable).'
      }
    ],
    related: [
      { slug: 'before-after-trap', title: 'Evaluating Pre-Post Changes Against Baseline Trends in Pre-Policy Drift', note: 'Case study on why pre-existing enrollment trends confound simple pre-post comparisons' },
      { slug: 'p-hacking-multiple-testing', title: 'Testing Subgroup Drops With Multiple-Group Checks', note: 'Case study on separating real language-group renewal drops from small-group swings' },
      { slug: 'budget-impact', title: 'Budget Impact & Reserve Floor Analysis', note: 'Case study on annual cash-flow planning for county navigation investments' }
    ]
  },

  // =========================================================================
  // MODULE #28: food-insecurity-diabetes (Track 4: System Dynamics, community)
  // =========================================================================
  {
    slug: 'food-insecurity-diabetes',
    tetsCompanion: [
      {
        visibleLabel: 'Neighborhood Vulnerability Index Claim Record',
        title: 'Neighborhood Vulnerability Index: Results Under Review',
        url: 'https://tooearlytosay.com/research/food-security/extended-vulnerability-index/',
        claimCovered: 'Composite tract index method for 408 Santa Clara tracts; the reported SNAP association (r = 0.83) and quintile comparisons are under reconciliation and not publicly reproduced.'
      },
      {
        visibleLabel: 'Neighborhood SNAP Trajectory Claim Record',
        title: 'The Widening Gap: Why Some Neighborhoods Are Falling Behind',
        url: 'https://tooearlytosay.com/research/food-security/diverging-trajectories/',
        claimCovered: 'Tract-level SNAP participation trajectories from 2019 to 2023; the 48% deteriorating versus 20% improving split is under reconciliation because its tract counts conflict.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Flagship Case Study',
    pageTitle: 'Housing Costs, Food Budgets & Diabetes Risk | CAPHE',
    metaDescription: 'See why high rent and household poverty explain neighborhood food strain and diabetes risk far better than grocery store distance across California.',
    h1: 'High Rent and Household Poverty Explain Neighborhood Diabetes Risk Better Than Store Distance',
    subtitle: 'How modeled post-rent food budgets, local poverty, and care hurdles compare across four California areas.',
    endnotes: [
      '<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau ACS 2019-2023 5-Year Estimates</a>: Tables B19013 (all-household median income) and B25064 (renter median gross rent). Covers Marin Tract 1122.03, Fresno Tract 2, Santa Clara Tract 5119.15, and Nevada County Tract 7.01.',
      '<a href="https://www.fns.usda.gov/cnpp/usda-food-plans-cost-food-reports" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service Thrifty Food Plan</a>: $973 per month reference food budget for a family of four.',
      '<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Economic Research Service Food Access Research Atlas (FARA)</a>: State 9,033-tract poverty (R² = 62.2%) vs. store distance (R² = 1.8%) study.',
      '<a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">CDC PLACES Local Data for Better Health</a>: Tract health, disability (OR = 1.76), and schooling (OR = 2.47) benchmarks across 408 Santa Clara tracts.'
    ],
    answerHtml: 'When screening clinic diabetes patients with gross pay alone, intake forms leave out working renter homes where high rent crowds out food cash [1,3]. In Marin County\'s high-rent Canal area, median pay sits above federal food aid cutoffs [1]. Yet monthly rent takes over two-fifths of pay [1,2]. In our modeled area-median benchmark, paying rent shifts a family food plan from <strong>17.7%</strong> of gross pay to <strong>30.5%</strong> of post-rent pay [1,2]. Across state tracts, poverty accounts for <strong>62.2%</strong> of food risk versus <strong>1.8%</strong> for store distance [3]. Pairing post-rent clinic screens with CalFresh and tailored meals fits both rent strain and schooling or health hurdles [3,4].',
    block2: {
      title: 'Two Rulers on the Same Household &amp; Neighborhood Chronic Disease System',
      contextTag: 'Post-Rent Home Budget Benchmark + State Tract Variance Check',
      ariaLabel: 'Comparison of gross income food share before rent versus post-rent food compression and neighborhood poverty',
      ruler1: {
        title: 'Ruler 1: Gross Income Screen &amp; Store Distance View',
        stat: '17.7% Gross | R² = 1.8% Dist.',
        ariaLabel: 'Gross income screen shows 17.7% food share in Marin Canal neighborhood while store distance alone explains only 1.8% of tract variance',
        segments: [
          { cls: 'seg-food', width: 18, label: 'Food 17.7%' },
          { cls: 'seg-gross', width: 82, label: 'Unadjusted Gross Income (82.3%)' }
        ],
        desc: 'Before rent is paid, median monthly home pay in Marin\'s Canal area (<strong>$5,507</strong>, or 220% FPL) sits above the 200% FPL CalFresh line. Across <strong>9,033 state tracts</strong> (<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FARA</a>), store distance explains just <strong>1.8%</strong> of food risk.'
      },
      ruler2: {
        title: 'Ruler 2: Post-Rent Budget &amp; Neighborhood Poverty View',
        stat: '30.5% Post-Rent | R² = 62.2% Pov.',
        ariaLabel: 'After subtracting $2,318 median monthly rent, a $973 food plan equals 30.5% of post-rent income in Marin Canal neighborhood and 46.4% in Central Fresno, while poverty explains 62.2% of tract variance',
        segments: [
          { cls: 'seg-rent', width: 42, label: 'Rent 42.1% ($2,318)' },
          { cls: 'seg-food', width: 18, label: 'Food: 30.5% of Post-Rent' },
          { cls: 'seg-rest', width: 40, label: 'Remaining $2,216' }
        ],
        desc: 'Subtracting the <strong>$2,318</strong> median rent (<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Census ACS</a>) lifts the modeled post-rent food share to <strong>30.5%</strong> in Marin. It reaches <strong>46.4%</strong> in West Fresno after $1,007 rent. Across 9,033 tracts, poverty explains <strong>62.2%</strong> of risk (<a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC PLACES</a> / ACS).'
      }
    },
    table1: {
      title: 'Table 1. Monthly Pay, Rent Share, and Food Budgets by Area Type',
      subtitle: 'Monthly pay, rent share, post-rent food share, and care hurdles across four state areas.',
      caption: 'Four California area types compared by monthly pay, rent share, pre-rent and post-rent food share, cash left, and care hurdles.',
      cornerLabel: 'Monthly Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> Table 1 shows modeled area-median post-rent food shares (Mode A benchmark). It subtracts ACS 2019–2023 Table B25064 renter gross rent from Table B19013 all-household income. Then it divides the $973 monthly USDA Thrifty Food Plan for a family of four by the cash left. Tract regression results cover N = 408 Santa Clara County tracts (disability OR = 1.76 [1.63, 1.89]; no high school diploma OR = 2.47 [2.35, 2.61]) and N = 9,033 state tracts (poverty R&sup2; = 62.2%, &beta; = 0.789 vs. store distance R&sup2; = 1.8%, &beta; = 0.056).',
      columns: [
        { tag: 'Archetype 1', tagHighlight: true, title: 'High-Rent Working Area', subtitle: 'Marin County: San Rafael Canal District (Census Tract 1122.03)' },
        { tag: 'Archetype 2', tagHighlight: false, title: 'Low-Income City Core', subtitle: 'Fresno County: West Fresno (Census Tract 2)' },
        { tag: 'Archetype 3', tagHighlight: false, title: 'High-Income Suburb', subtitle: 'Santa Clara County: Suburban San Jose (Census Tract 5119.15)' },
        { tag: 'Archetype 4', tagHighlight: false, title: 'Rural Town Area', subtitle: 'Nevada County: Western Sierra Foothills (Census Tract 7.01)' }
      ],
      rows: [
        {
          label: 'Median Monthly Home Income',
          cells: [
            { val: '$5,507 (220% FPL)' },
            { val: '$3,103 (124% FPL)' },
            { val: '$14,083 (563% FPL)' },
            { val: '$6,740 (270% FPL)' }
          ]
        },
        {
          label: 'Share of Income Spent on Monthly Rent',
          cells: [
            { val: '42.1% ($2,318)' },
            { val: '32.5% ($1,007)' },
            { val: '22.0% ($3,104)' },
            { val: '23.4% ($1,580)' }
          ]
        },
        {
          label: 'Pre-Rent Share of Income for Food',
          modeled: true,
          cells: [
            { val: '17.7% ($973 plan)' },
            { val: '31.4% ($973 plan)' },
            { val: '6.9% ($973 plan)' },
            { val: '14.4% ($973 plan)' }
          ]
        },
        {
          label: 'Post-Rent Share of Income for Food',
          modeled: true,
          highlight: true,
          cells: [
            { val: '30.5% (+12.8 pp)', barWidth: 66, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '46.4% (+15.0 pp)', barWidth: 100, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '8.9% (+2.0 pp)', barWidth: 19, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '18.9% (+4.5 pp)', barWidth: 41, barColor: '#F59E0B', textColor: 'text-amber-800' }
          ]
        },
        {
          label: 'Monthly Income Left After Rent and Food',
          modeled: true,
          cells: [
            { val: '$2,216' },
            { val: '$1,123' },
            { val: '$10,006' },
            { val: '$4,187' }
          ]
        },
        {
          label: 'Main Food &amp; Diabetes Hurdle',
          cells: [
            { val: 'Rent squeeze above 200% FPL line' },
            { val: 'Low pay and high disability rate' },
            { val: 'Low local risk (full cash buffer)' },
            { val: 'Long rural trip to full grocery' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Local Context, Screen Gaps &amp; County Action Plan',
      subtitle: 'What standard pay screens leave out in each area and how county teams can act.',
      caption: 'Guide comparing renter share, CalFresh use, screen gaps, outreach sites, and county actions across four area types.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Renter Share &amp; CalFresh Use',
          mono: true,
          cells: [
            { val: '96.5% Renters | 19.3% SNAP', color: 'text-slate-950' },
            { val: '78.4% Renters | 44.9% SNAP', color: 'text-rose-800' },
            { val: '25.6% Renters | 5.7% SNAP', color: 'text-slate-950' },
            { val: '44.7% Renters | 7.3% SNAP', color: 'text-slate-950' }
          ]
        },
        {
          label: 'What Standard Screens Leave Out',
          cells: [
            { val: 'Gross pay (220% FPL) leaves out the $2,318 rent squeeze.' },
            { val: 'Store maps leave out deep poverty and health hurdles.' },
            { val: 'County means leave out small pockets of poor renters.' },
            { val: 'Ten-mile store maps tag car-owning homes as high risk.' }
          ]
        },
        {
          label: 'Where to Place Outreach',
          cells: [
            { val: 'Safety-net clinics and local school sign-up sites.' },
            { val: 'Local CHW teams and community diabetes clinics.' },
            { val: 'Patient clinic intake screens instead of tract grants.' },
            { val: 'Low-income rural seniors and homes without cars.' }
          ]
        },
        {
          label: 'Best County &amp; Clinic Action',
          policyFit: true,
          cells: [
            { headline: 'Post-Rent Screen + Rent Deduction', detail: 'Use CalFresh rent deductions and clinic fresh food vouchers.' },
            { headline: 'CalFresh + CHW Diabetes Help', detail: 'Pair full CalFresh aid with CHW medicine and food help.' },
            { headline: 'Clinic Tailored Meal Plan', detail: 'Link Medi-Cal patients with diabetes to tailored meals.' },
            { headline: 'Online EBT &amp; Mobile Van', detail: 'Waive online EBT delivery fees and send mobile food vans.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Statewide &amp; County Multivariate Regression Parameters (Mode B)',
      notesBullets: [
        '<strong>State 9,033-Tract Variance Split (Mode B):</strong> Across N = 9,033 California census tracts (<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FARA</a> + <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">ACS</a>), the poverty rate alone accounts for <strong>R&sup2; = 62.2%</strong> of food risk variance (standardized &beta; = 0.789, t = 121.97, p &lt; 0.0001). Distance to the nearest store alone accounts for just <strong>R&sup2; = 1.8%</strong> (standardized &beta; = 0.056, t = 8.64 in the joint model; joint R&sup2; = 62.5%).',
        '<strong>Santa Clara County 408-Tract Odds Ratios (Mode B):</strong> In tract models across Santa Clara County (N = 408 tracts), lacking a high school diploma shows <strong>OR = 2.47 (95% CI: 2.35, 2.61, p &lt; 0.001)</strong>. Disability prevalence shows <strong>OR = 1.76 (95% CI: 1.63, 1.89, p = 0.004)</strong>. Jobless rate shows <strong>OR = 1.24 (95% CI: 1.13, 1.35)</strong>.',
        '<strong>Store Count Rule Check:</strong> Counting all 26,645 SNAP stores in the state flags 462 food desert tracts (5.1% of 9,033 tracts; 1.86M residents). Counting only 4,383 full grocery stores flags 497 tracts (+35 net tracts).'
      ]
    },
    synthesis: {
      title: 'How Counties Combine Clinic Screening With Tract-Level Outreach',
      p1: 'Public health teams often see a strong link between local food strain and adult diabetes rates. Acting on that link takes two clear steps. First, help clinic patients pay for healthy food and insulin after rent is paid. Second, place CHW outreach in the tracts where poverty and disability cluster.',
      p2: 'In California, high rent and low pay matter far more than miles to a grocery store. Across 9,033 tracts, poverty accounts for 34 times more food risk than store distance (62.2% vs. 1.8%). Meanwhile, high coastal rent ($2,318 per month in Marin\'s Canal area) lifts the post-rent food share to 30.5% even at 220% FPL. Counties get the best results when clinics screen for post-rent cash strain, claim CalFresh rent deductions, and send tailored meals and CHW teams to high-poverty tracts.'
    },
    interactive: {
      badge: 'County &amp; Clinic Action Guide',
      title: 'How Counties and Clinics Act on Home and Tract Data',
      subtitle: 'Matching clinic intake, census tract maps, and health plan contracts to clear local actions.',
      options: [
        {
          label: 'Action 1 · Clinic &amp; Aid Intake (Home Level)',
          headline: 'Screen for Post-Rent Pay &amp; Rent Deductions',
          metric: '17.7% Pre-Rent -> 30.5% Post-Rent Food Share',
          desc: 'Ask about monthly rent at clinic intake so working families above 200% FPL get CalFresh rent deductions and food vouchers.'
        },
        {
          label: 'Action 2 · Local Placement (Tract Level)',
          headline: 'Place Mobile Vans &amp; CHWs by Poverty Rate',
          metric: '62.2% Poverty Share vs. 1.8% Distance',
          desc: 'Place mobile food vans and bilingual CHW teams in high-poverty tracts instead of using one-mile store distance maps.'
        },
        {
          label: 'Action 3 · Health Plan Contracts (System Level)',
          headline: 'Pair Tailored Meals With Disability Care',
          metric: '1.76x & 2.47x Higher Odds',
          desc: 'Contract with Medi-Cal plans to bring tailored meals and home CHW visits to patients with diabetes and a disability.'
        }
      ],
      notesTitle: 'Action Guide Calculations, Tract Regressions &amp; Eligibility Rules',
      notesBullets: [
        '<strong>Action 1 Post-Rent Home Math (Marin County Canal Tract 1122.03):</strong> Subtracting the ACS B25064 renter gross rent (<strong>$2,318/month</strong>) from the ACS B19013 all-household median income (<strong>$5,507/month</strong>, 220% FPL) leaves <strong>$3,189/month</strong>. That puts the <strong>$973/month</strong> USDA Thrifty Food Plan at <strong>30.5%</strong> of post-rent pay (+12.8 points above its 17.7% pre-rent share).',
        '<strong>Action 2 State Tract Variance Split (N = 9,033 Tracts):</strong> In state tract models across USDA FARA and ACS S1701, the poverty rate has a standardized beta of <strong>0.789</strong> (explaining <strong>R&sup2; = 62.2%</strong> of variance). Store distance has a standardized beta of <strong>0.056</strong> (explaining <strong>R&sup2; = 1.8%</strong> of variance).',
        '<strong>Action 3 County Tract Odds Ratios (N = 408 Santa Clara Tracts):</strong> Tract models linking ACS S1810/B15003 and CDC PLACES give <strong>OR = 2.47, p &lt; 0.001 (95% CI: 2.35, 2.61)</strong> for adults without a high school diploma and <strong>OR = 1.76, p = 0.004 (95% CI: 1.63, 1.89)</strong> for disability.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Modeled Area-Median Post-Rent Benchmark &amp; Multi-Level Synthesis):</strong> Monthly food shares in Table 1 are modeled area-median benchmarks. They subtract the ACS B25064 renter median gross rent from the ACS B19013 all-household median income. Then they divide the $973 USDA Thrifty Food Plan basket by the cash left. Because the two medians come from different census universes (all households vs. renter households), this benchmark is not an observed four-person renter budget. Fresno Tract 2 values match food-affordability-tradeoffs (B19013 = $37,238; B25064 = $1,007). Tract R&sup2; splits and odds ratios across N = 9,033 state tracts and N = 408 Santa Clara tracts are observed regression results (Mode B).',
      '<strong>Primary Data Sources:</strong> Sources include <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 2019-2023 5-Year Estimates</a> (Tables B19013, B25064, S1701, S1810), the <a href="https://www.fns.usda.gov/cnpp/usda-food-plans-cost-food-reports" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA Food and Nutrition Service Thrifty Food Plan ($973/mo family of four)</a>, the <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA Economic Research Service Food Access Research Atlas (FARA)</a>, and <a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC PLACES Local Data for Better Health</a>.'
    ],
    faqs: [
      {
        question: 'Is this information more useful at the census tract level or the county and clinic level?',
        answer: 'Both levels serve clear roles. Census tract data (poverty R² = 62.2% vs. store distance R² = 1.8%) shows county health teams which areas need mobile food vans and bilingual CHW teams. Home post-rent budget math shows clinics and aid offices how to screen patients. Working families squeezed by high rent can then get CalFresh rent deductions and tailored meals.'
      },
      {
        question: 'How does high rent create nutrition and diabetes risk in families earning above 200% FPL?',
        answer: 'In high-rent areas like Marin County\'s Canal District, median monthly rent ($2,318) takes 42.1% of median monthly home pay ($5,507, or 220% FPL). Subtracting rent lifts the $973 monthly family food plan from 17.7% of pre-rent pay to 30.5% of post-rent pay. That squeeze happens even when gross pay sits above the standard 200% FPL CalFresh line.'
      },
      {
        question: 'What interventions best address co-occurring food strain and diabetes in high-cost counties?',
        answer: 'Pairing post-rent clinic screens with CalFresh rent deductions, fresh food vouchers, and CalAIM tailored meals eases the monthly budget squeeze. Families no longer have to choose between rent, healthy food, and diabetes care.'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Gross FPL vs. Post-Rent Food Affordability Rulers', note: 'Track 2 reference module on county vs. tract post-rent food shares' },
      { slug: 'geographic-variables', title: 'When Is Geography a Proxy vs. Mechanism?', note: 'Case study on decomposing poverty R²=62.2% vs. retail distance R²=1.8%' },
      { slug: 'classifying-causal-mechanisms', title: 'Confounders, Mediators & Colliders in Policy Models', note: 'Case study on avoiding over-control in structural pathways' }
    ]
  }
];

for (const spec of wave2Modules) {
  renderModuleHtml(spec);
}
console.log('Wave 2 (4 Flagship Case Studies) rendered successfully.');
