#!/usr/bin/env node
/**
 * Builder: 3 California Public Health Economics Case Studies
 * - #7 chw-health-outcomes (Track 1, community, 58-County HCAI 2024 + BLS QCEW + DHCS SPA 22-0001)
 * - #8 medicaid-expansion (Track 1, community, Six-Month Renewal Model on Observed DHCS Enrollment Baseline)
 * - #28 food-insecurity-diabetes (Track 4, community, Area-Median Post-Rent Estimate & Tract Comparisons)
 */

const { renderModuleHtml } = require('./render_option_c');

const flagshipModules = [
  // =========================================================================
  // MODULE #7: chw-health-outcomes (Track 1: Program Impact, community)
  // =========================================================================
  {
    slug: 'chw-health-outcomes',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Fee Comparison',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 counties and 9,039 census tracts, a fixed $31.74 Medi-Cal fee covers 3.2% to 8.9% of estimated costs. Those figures cover Community Health Workers who visit people outside clinics.'
      }
    ],
    tier: 'community',
    hideBlock2: true,
    briefType: 'Program Cost &amp; Impact Model &middot; Community Health Workers',
    trackEyebrow: 'Track 1: Program Impact &middot; Main Case Study',
    pageTitle: 'Medi-Cal Visit Fees vs. Care Worker Costs | CAPHE',
    metaDescription: 'Compare four California care worker models across fixed $31.74 Medi-Cal visit fees, full worker costs in 58 counties, hospital savings, and health gains.',
    h1: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs',
    subtitle: 'Comparing fixed per-visit fees with county worker wages, hospital stay savings, and two-year health gains.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Medi-Cal pays a fixed <strong>$31.74</strong> per 30-minute group visit for Community Health Workers statewide [1]. Meanwhile, hiring counties pay <strong>$92,684 to $122,102</strong> per year in full worker costs across 58 counties [2].'
      },
      {
        lead: 'What our model estimates',
        html: 'Suppose one worker (<strong>$103,719</strong> statewide cost) serves <strong>55</strong> high-need patients and matches trial reductions [2,3]. Visit billing covers <strong>6.5% to 9.8%</strong> of pay, while Year-1 hospital savings reach <strong>~$107,000</strong> in plan claims (or <strong>~$291,000</strong> in bed costs) [1,3].'
      },
      {
        lead: 'Policy option',
        html: 'Hospital savings go to Medi-Cal health plans and hospitals rather than the hiring clinic [1,3]. Counties can pair monthly health-plan pay or hospital funds with public health grants for outreach (<strong>~$7,800</strong> per QALY) [3,4].'
      }
    ],
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Services (DHCS) State Plan Amendment (SPA) 22-0001</a>: State fee rules pay a fixed $31.74 per 30-minute group session and $26.66 per one-on-one session. Rates do not change for higher county wages.',
      '<a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Bureau of Labor Statistics (BLS) Quarterly Census of Employment and Wages (2024)</a> &amp; <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Access and Information (HCAI) Prevention Quality Indicators (2024)</a>: County data show full worker costs of $92,684 to $122,102 per year across 58 counties. State hospital records list 279,905 adult stays that timely care may help prevent.',
      '<a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Kangovi et al. (2020), Health Affairs</a> &amp; <a href="https://hcai.ca.gov/data/healthcare-utilization/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI / AHRQ HCUP Hospital Cost Benchmarks</a>: Clinical trials that assigned patients by chance found 22% fewer ER visits and 30% fewer hospital stays. Those trials also found 23% fewer 30-day return stays.',
      '<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Neumann, Cohen &amp; Weinstein (2014), New England Journal of Medicine</a> &amp; <a href="https://healthforce.ucsf.edu/publications" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">UCSF Healthforce Center</a>: Health studies often compare costs against $100,000 per year of full health gained, alongside state worker retention surveys.'
    ],
    block2: null,
    table1: {
      title: 'Table 1. Annual Costs, Hospital Savings &amp; Health Gains Across Four CHW Care Models',
      subtitle: 'Yearly worker cost, visit fees, Year-1 bed savings, and two-year health gains for one full-time worker in four models.',
      caption: 'Four California CHW models compared by assumed caseload, full worker cost including pay, benefits, training, and supervision, visit fees, first-year hospital savings, two-year QALYs, and net cost.',
      cornerLabel: 'Program Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> Each column models one full-time CHW. <strong>Row 1 (Assumed Model Input):</strong> Scenarios 1 and 2 assume 55 high-need patients averaging 2.23 ER visits and 0.70 hospital stays per year. Scenario 3 assumes 75 primary care patients averaging 1.40 ER visits and 0.35 stays per year. Scenario 4 assumes 150 adults served by a Promotora across 10 high-need ZIP codes. In those ZIP codes, 60% of homes speak a language other than English. <strong>Row 2 (58-County Worker Cost):</strong> Full worker cost includes pay, benefits, training, supervision, and shared expenses. Based on 2024 BLS wage data, full cost ranges from $92,684 to $122,102 ($103,719 median; $101,369 clinic; $98,469 outreach). <strong>Row 3 (* Per-Visit Pay):</strong> State rules pay a fixed $31.74 per 30-minute group session. Home travel limits paid sessions in Scenarios 1, 2, and 4 compared with clinic visits in Scenario 3. <strong>Row 4 (* Year-1 Hospital Savings):</strong> The model applies trial reductions of 22% in ER visits, 30% in stays, and 23% in return stays. Scenario 1 uses health plan payment rates ($600 per ER visit and $7,000 per stay). Scenarios 2 to 4 use full hospital costs ($2,100 per ER visit and $18,500 per stay). Modeled savings minus worker cost equal +$3,287 in Scenario 1, +$187,452 in Scenario 2, and +$80,964 in Scenario 3. Scenario 4 has a $63,569 net outlay, or $7,771 per QALY. <strong>Rows 5 &amp; 6 (* Two-Year QALYs):</strong> The model estimates 0.0545 QALYs per adult over two years, weighting year-two gains 3% less per year. Health gains are kept on a separate accounting line and are not added to first-year hospital savings.',
      columns: [
        { tag: 'Scenario 1', tagHighlight: false, title: 'Hospital Care (Plan Claims)', subtitle: 'Medi-Cal plan claims for 55 high-need patients' },
        { tag: 'Scenario 2', tagHighlight: false, title: 'Hospital Care (Bed Costs)', subtitle: 'Full hospital bed costs for 55 high-need patients' },
        { tag: 'Scenario 3', tagHighlight: false, title: 'Clinic Chronic Care', subtitle: 'Scheduled clinic visits and hospital stays for 75 patients' },
        { tag: 'Scenario 4', tagHighlight: false, title: 'Neighborhood Outreach', subtitle: 'Neighborhood prevention across 150 adults in 10 ZIP codes' }
      ],
      rows: [
        {
          label: 'Assumed Annual Caseload (Model Input)',
          modeled: false,
          cells: [
            { val: '55 Medi-Cal patients (assumed)' },
            { val: '55 hospital patients (assumed)' },
            { val: '75 clinic patients (assumed)' },
            { val: '150 local adults (assumed)' }
          ]
        },
        {
          label: 'Full Annual Worker Cost',
          modeled: false,
          cells: [
            { val: '$103,719' },
            { val: '$103,719' },
            { val: '$101,369' },
            { val: '$98,469' }
          ]
        },
        {
          label: 'Estimated Per-Visit Medi-Cal Pay',
          modeled: true,
          cells: [
            { val: '6.5% to 9.8% ($6,775 to $10,162)' },
            { val: '6.5% to 9.8% ($6,775 to $10,162)' },
            { val: '45.9% ($46,561)' },
            { val: '3.4% to 6.4% ($3,388 to $6,348)' }
          ]
        },
        {
          label: 'Estimated Year-1 Hospital Savings',
          modeled: true,
          cells: [
            { val: '$107,006 (27 ER, 11.6 stays)' },
            { val: '$291,171 (27 ER, 11.6 stays)' },
            { val: '$182,333 (23 ER, 7.9 stays)' },
            { val: '$34,900 (6.6 ER, 1.1 stays)' }
          ]
        },
        {
          label: 'Estimated Two-Year Health Gains (QALYs)',
          modeled: true,
          cells: [
            { val: '+3.00 QALYs (55 patients, 2 yrs)' },
            { val: '+3.00 QALYs (55 patients, 2 yrs)' },
            { val: '+4.09 QALYs (75 patients, 2 yrs)' },
            { val: '+8.18 QALYs (150 adults, 2 yrs)' }
          ]
        },
        {
          label: 'Estimated Net Cost or Cost per QALY',
          modeled: true,
          highlight: true,
          cells: [
            { val: 'Savings exceed cost (+$3,287 net cash)', barWidth: 92, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: 'Savings exceed cost (+$187,452 net cash)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-900' },
            { val: 'Savings exceed cost (+$80,964 net cash)', barWidth: 96, barColor: '#0D9488', textColor: 'text-emerald-900' },
            { val: '$7,771 / QALY ($63,569 net outlay)', barWidth: 88, barColor: '#0D9488', textColor: 'text-emerald-900' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Matching Each CHW Model to Its Payer and Funding Plan',
      subtitle: 'Each care model lowers costs for a different budget and needs a matching payment plan.',
      caption: 'Table comparing each model goal, where savings or health gains appear, program limits, and county funding options.',
      cornerLabel: 'Decision Guide',
      rows: [
        {
          label: 'Primary Program Goal',
          cells: [
            { val: 'Lower Year-1 Medi-Cal ER and hospital claims among frequent users.' },
            { val: 'Reduce occupied hospital beds and unpaid care costs at county hospitals.' },
            { val: 'Improve blood sugar and asthma control for regular clinic patients.' },
            { val: 'Reach families who delay clinic care across high-need ZIP codes.' }
          ]
        },
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'Medi-Cal health plan hospital and ER claim savings in Year 1.' },
            { val: 'Fewer occupied county hospital beds and lower stay costs rather than visit fees.' },
            { val: 'Clinic visit fees (~46% of worker cost) plus lower hospital stay costs.' },
            { val: 'Two-year patient health gains (~8.2 QALYs) and early health checks.' }
          ]
        },
        {
          label: 'Main Program Limit',
          cells: [
            { val: 'Home travel and care calls leave too few 30-minute sessions to cover pay.' },
            { val: 'A 55-patient hospital caseload includes only people already treated in a hospital.' },
            { val: 'Visit fees work only for patients who already receive care at a clinic.' },
            { val: 'Health gains occur over two years rather than cutting Year-1 hospital bills.' }
          ]
        },
        {
          label: 'Policy &amp; Contracting Options',
          policyFit: true,
          cells: [
            { headline: 'Health Plan Option: Monthly Pay', detail: 'Pair visit billing with monthly Medi-Cal care-management pay per member.' },
            { headline: 'Hospital Option: Bed-Cost Funding', detail: 'Fund worker costs from county hospital budgets as inpatient stays fall.' },
            { headline: 'Clinic Option: Visit Fees + Bonus', detail: 'Combine scheduled 30-minute visit fees with health-plan quality bonuses.' },
            { headline: 'County Option: Prevention Grant', detail: 'Fund neighborhood outreach through public health grants paired with plan partnerships.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Worker Costs in 58 Counties, Hospital Cost Rates &amp; Two-Year Health Math',
      notesBullets: [
        '<strong>Why Fixed Medi-Cal Fees Leave a Pay Gap:</strong> Under <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a>, Medi-Cal pays $31.74 per 30-minute group session and $26.66 per individual session in all 58 counties. Those fees do not adjust for local wages. Meanwhile, 2024 <a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">BLS wage data</a> put full worker cost at $103,719 statewide ($92,684 rural to $122,102 Bay Area). That total includes a $54,000 base salary, 35% benefits, $19,000 supervision, $4,000 training, and 10% shared expenses.',
        '<strong>Health Plan Claims vs. Full Hospital Costs:</strong> Scenario 1 values avoided care using Medi-Cal plan payment rates ($600 per ER visit, $7,000 per stay, $6,000 per return stay). Those figures show what a health plan saves in paid claims. Scenarios 2 to 4 use full hospital costs ($2,100 per ER visit, $18,500 per stay, $15,000 per return stay) from <a href="https://hcai.ca.gov/data/healthcare-utilization/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI</a> and <a href="https://hcup-us.ahrq.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">AHRQ HCUP</a>. Those figures measure fewer occupied beds and less unpaid hospital care.',
        '<strong>Why Neighborhood Outreach Needs a Two-Year View:</strong> State 2024 <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI hospital data</a> report 279,905 adult stays that timely care may help prevent (902.5 per 100,000 overall in PQI 90; 715.3 chronic in PQI 92). In areas where 60% of homes speak a non-English language, 13.7% of immigrant adults delay care (2.39 times the odds in Wolstein et al., 2022). An assumed 150-adult Promotora group avoids 6.6 ER visits and 1.10 stays in Year 1 ($34,900 saved). That worker also completes 38 early health checks per year and adds <strong>8.18 QALYs</strong> over two years. Subtracting $34,900 from the $98,469 worker cost leaves $63,569, or <strong>$7,771 per QALY</strong>, which is 92% below $100,000 per QALY (<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann et al., 2014</a>).'
      ]
    },
    countyLookup: {
      badge: 'Compare Costs and Health Gains Across 58 Counties',
      title: 'See Worker Costs, Hospital Savings &amp; QALYs by County',
      subtitle: 'Pick a county, care model, and share of the trial effect to compare costs, bed savings, and QALYs.',
      dataPath: 'data/chw_county_benchmarks_2024.json'
    },
    synthesis: {
      title: 'Matching CHW Funding to the Budget That Receives the Savings',
      p1: 'County leaders face a budget mismatch when starting a CHW care team. The hiring agency pays full worker costs of $92,684 to $122,102 per year, including pay, benefits, training, and supervision. Yet Medi-Cal pays a fixed $31.74 fee only for scheduled 30-minute sessions. Because home travel and phone calls fill most work hours, visit fees cover less than one-tenth of hospital outreach team costs. Judging every team only by Year-1 hospital bills also leaves out two-year local health gains.',
      p2: 'Separating visit fees, Year-1 hospital savings, and two-year QALYs matches each team to a payer. Hospital teams with 55 assumed patients save ~$107,000 in plan claims or ~$291,000 in bed costs in Year 1. So monthly health plan pay or hospital funds can cover those worker costs. Clinic teams with 75 assumed patients earn ~$46,600 in visit fees and save ~$182,000 in hospital costs. Meanwhile, neighborhood Promotoras serving 150 assumed adults add ~8.2 QALYs over two years at ~$7,800 per QALY. That low cost per healthy year supports steady public health grants for local outreach.'
    },
    methodologyParagraphs: [
      '<strong>How the Model Works and Where Its Data Come From:</strong> This model combines state Medi-Cal fee rules, 2024 HCAI hospital counts, 2026 DHCS enrollment counts, and 2024 BLS wages in 58 counties. It pairs those state records with published results from random-assignment trials and two-year health scores. Each column models one full-time CHW across an assumed yearly caseload of 55, 75, or 150 people.',
      '<strong>State Payment Rules (No Local Wage Adjustment):</strong> California <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a> sets fixed statewide pay for patient education codes CPT 98960-98962. Medi-Cal pays $26.66 per 30-minute one-on-one session and $31.74 per group session with billing label U2. Fees do not change for county wages or rent. Paid visit counts, avoided stays, QALYs, and net costs are modeled estimates.',
      '<strong>58-County Hospital and Worker Cost Records:</strong> Preventable stay rates come from the 2024 <a href="https://data.chhs.ca.gov/dataset/rates-of-preventable-hospitalizations-for-selected-medical-conditions-by-county" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HCAI Prevention Quality Indicators</a> across 31,012,717 adults. Those files list 279,905 preventable stays overall (902.5 per 100,000) and 221,844 stays for chronic conditions (715.3 per 100,000). County pay comes from 2024 <a href="https://www.bls.gov/cew/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">BLS wage data</a> ($103,719 median full worker cost, from $92,684 to $122,102). Full cost includes a $54,000 base salary, benefits equal to 35% of salary, supervision, training, and 10% shared costs.',
      '<strong>Trial Effects and Two-Year Health Scores:</strong> Modeled care reductions (-22% ER visits, -30% stays, -23% return stays) come from the IMPaCT trials (<a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi et al., 2020</a>). Health is scored from 0 for death to 1 for full health. Weighted gains for chronic illness (+0.025), mental health (+0.040), and social needs (+0.020) give 0.0545 QALYs per adult over two years at 3% discounting. Results are compared with $100,000 per QALY (<a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann et al., 2014</a>) and <a href="https://healthforce.ucsf.edu/publications" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">UCSF Healthforce Center</a> surveys (N = 210).'
    ],
    faqs: [
      {
        question: 'When should a county use each of the four Community Health Worker care models?',
        answer: 'Each model fits a different county goal and payer. Hospital teams (55 assumed patients) fit plans or hospitals seeking Year-1 savings of ~$107,000 in claims or ~$291,000 in bed costs. Clinic teams (75 assumed patients) fit primary care sites that bill ~$46,600 in scheduled visits while reducing hospital stay costs by ~$182,000. Neighborhood Promotoras (150 assumed adults) fit public health teams serving families outside clinic care, adding ~8.2 QALYs at ~$7,800 per QALY.'
      },
      {
        question: 'Why do Year-1 hospital bills alone understate the value of neighborhood Promotora outreach?',
        answer: 'Promotoras reach families early, before problems from high blood sugar or blood pressure require emergency care. Because most adults in the group do not need acute hospital care right away, Year-1 hospital savings equal $34,900. Yet over two years, outreach completes ~38 early health checks per year and adds ~8.2 QALYs across 150 assumed adults. Subtracting $34,900 from the $98,469 full worker cost leaves ~$7,800 per QALY, or 92% below the $100,000 benchmark.'
      },
      {
        question: 'Does Medi-Cal raise its per-visit CHW fee in high-wage California counties?',
        answer: 'No, Medi-Cal pays the same fixed rate in every county. State rules pay $31.74 per 30-minute group session and $26.66 per one-on-one session statewide. Meanwhile, full worker costs including pay, benefits, training, and supervision range from $92,684 in rural counties to $122,102 in the Bay Area. As a result, home visit billing covers only 6.5% to 9.8% of hospital team costs, so counties pair fees with monthly plan contracts or hospital funds.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'Five-Year Contracts Divide First-Year Care Team Setup Costs Across Five Years of Care', note: 'Case study comparing Year 1 setup costs with five-year cost per QALY' },
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Case study pairing multi-year health value with Year 1 cash and reserve plans' },
      { slug: 'sensitivity-analysis-cea', title: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal', note: 'Case study testing death-risk dollar values alongside CHW cost comparisons' }
    ]
  },

  // =========================================================================
  // MODULE #8: medicaid-expansion (Track 1: Program Impact, community)
  // =========================================================================
  {
    slug: 'medicaid-expansion',
    tier: 'community',
    briefType: 'Program Cost &amp; Impact Model &middot; Medi-Cal &amp; Claims',
    trackEyebrow: 'Track 1: Program Impact &middot; Main Case Study',
    pageTitle: 'Unreturned Mail Forms & Medi-Cal Work Rules | CAPHE',
    metaDescription: 'Compare two modeled reasons adults lose Medi-Cal in Santa Clara County: unreturned mail forms among qualified members and lost work-rule eligibility.',
    h1: 'In the Model, Most Medi-Cal Renewal Losses Come From Unreturned Mail Forms Over Work Rules',
    subtitle: 'The model separates adults who miss mail forms from adults who do not meet work rules.',
    openingBeats: [
      {
        lead: 'Upcoming rule in 2027',
        html: 'Federal H.R. 1 rules will make <strong>120,239</strong> county adult Medi-Cal members prove work hours or an exemption every six months [1]. Members get paper forms in the mail whenever state wage files do not confirm status [1,2].'
      },
      {
        lead: 'What our model estimates',
        html: 'In Census data, <strong>88.5%</strong> of those adults work or hold an exemption [2]. Still, if half of paper forms go unreturned, <strong>27,076</strong> adults lose care per cycle, and <strong>52.5% (14,219)</strong> are eligible members who missed the form [2,3].'
      },
      {
        lead: 'Policy option',
        html: 'Pre-filling exemptions from clinic and school records would keep eligible caregivers and students covered [3]. Adding a six-month hour check for gig workers would prevent <strong>71.4% (10,150)</strong> of missed-form losses [3].'
      }
    ],
    endnotes: [
      '<a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Health and Human Services (CHHS) Open Data Portal: Medi-Cal Certified Eligibles with Demographics by Month</a> (<code>scc_dhcs_medical_enrollment.csv:1-134</code>). Observed county Medi-Cal counts in June 2025 were 472,014 in all and 120,239 expansion adults (2.5949% of 4,633,636 statewide; 255,601 adults ages 19 to 64). By June 2026, expansion counts fell 12.31% to 105,436 before the new rules. Five-step rates come from the <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California DHCS Implementation Plan for New Eligibility and Enrollment Changes under H.R. 1</a> (Feb 5, 2026; <code>dhcs_verification_funnel_scc.csv:1-11</code>). Statewide, 1,842,155 adults (39.8%) renew at Steps 1 to 4. With no jobless waiver, 9,689 more county adults enter Step 5 paper checks (82,126 vs. 72,437; 41,100 vs. 36,218 losses at 50%).',
      '<a href="https://www2.census.gov/programs-surveys/acs/data/pums/2023/5-Year/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau American Community Survey (ACS) 2019-2023 5-Year PUMS</a> (<code>extract_pums.py</code> &amp; <code>scc_hr1_medicaid_risk_profiles.csv:1-46</code>). Across 97,933 survey records in 15 county areas (08501-08515), 6,297 adults ages 19 to 64 report Medi-Cal without Medicare or SSI at pay &le;138% FPL. Weights represent 133,998 adults (&plusmn;3,905). Scaled to 120,239 state enrollees, Group 1 has 38.01% working &ge;80 hours per month (45,703; 50,934 ACS). Group 2 has 39.53% with an exemption (47,530; 52,971 ACS across child care &lt;14 [30,074], birth or disability [11,129], and school [11,768]). Together, Groups 1 and 2 equal <strong>77.5% (93,233)</strong>. Group 3 adds <strong>11.01%</strong> in gig or part-time work (13,226; 14,752 ACS). Groups 1 to 3 total <strong>88.5%</strong>: rounded groups sum to 106,459, while 88.55% before rounding gives 106,472. Group 4 has <strong>11.45% (13,767; 15,341 ACS)</strong>.',
      '<a href="https://www.kff.org/medicaid/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">KFF Medicaid Unwinding &amp; Work Requirement Research</a> &amp; <strong>CAPHE Renewal Retention Model.</strong> Files: <code>churn_reduction_model.py</code>, <code>churn_reduction_model_scc.csv:1-24</code>, and <code>scc_hr1_synthesis.csv:8-15</code>. In the model, 54,152 adults get Step 5 paper forms (12,734 + 18,870 + 10,275 + 12,273). At a 50% loss rate, six-month losses equal 27,076 (6,367 + 9,435 + 5,138 + 6,136). Assumed missed-form shares (35.0%, 72.4%, 64.6%, 30.0%) give <strong>14,219 of 27,076 (52.5%)</strong> avoidable losses (10,150 in Groups 2 and 3). Phone uploads raise prevented losses to <strong>15,642 of 27,076 (57.8%)</strong> (+1,423). On the Census base, scaling 27,076 to 133,998 gives 30,174 losses. Summing the eight unrounded survey groups gives 30,007 losses (17,350 prevented, or 57.8%).'
    ],
    block2: {
      title: 'Statewide Rate Estimate vs. Four-Group Renewal Model (Santa Clara County)',
      contextTag: 'Six-Month Renewal Model Adjusted to the Observed State Count of 120,239 Adults',
      ariaLabel: 'Comparison of statewide rate assumptions versus four-group unreturned form and eligibility estimates',
      ruler1: {
        title: 'County Estimate Based on Statewide Rates',
        stat: '36,218 to 41,100 / Period',
        ariaLabel: 'Statewide share predicts 36,218 losses per period, rising to 41,100 with zero high-unemployment exemption share',
        segments: [
          { cls: 'seg-gross', width: 88, label: 'Statewide Rate Scaling (36,218)' },
          { cls: 'seg-rent', width: 12, label: '+4,882 Zero-Exemption Adjustment' }
        ],
        desc: 'Applying Santa Clara\'s 2.5949% share to <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS statewide renewal estimates</a> predicts <strong>36,218</strong> losses per period, or <strong>41,100</strong> with no high-unemployment exemption. That combined figure mixes unreturned forms with lost eligibility.'
      },
      ruler2: {
        title: 'Four-Group Estimate of Work and Exemptions',
        stat: '88.5% Eligible | 52.5% Avoidable',
        ariaLabel: '88.5% of expansion adults work or hold an exemption, and 52.5% of group losses come from unreturned forms',
        segments: [
          { cls: 'seg-primary', width: 38, label: 'Working >=80h (38.0%)' },
          { cls: 'seg-rest', width: 40, label: 'Exempt Caregiver/Disabled/Student (39.5%)' },
          { cls: 'seg-food', width: 11, label: 'Gig/Part-Time (11.0%)' },
          { cls: 'seg-rent', width: 11, label: 'No Record (11.5%)' }
        ],
        desc: 'Applying <a href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">ACS 2019-2023 survey shares</a> to <strong>120,239</strong> observed state enrollees shows <strong>88.5%</strong> work or have an exemption. In the model, <strong>14,219 of 27,076 (52.5%)</strong> losses come from unreturned forms.'
      }
    },
    table1: {
      title: 'Table 1. Modeled Six-Month Coverage Losses Across Four Medi-Cal Adult Groups',
      subtitle: 'Observed and survey-adjusted member counts, state record match rates, and modeled six-month losses in four groups.',
      caption: 'Table comparing four Medi-Cal adult groups by member count, share confirmed through state records, modeled six-month coverage losses, and losses from unreturned forms.',
      cornerLabel: 'Group &amp; Renewal Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> The model predicts 27,076 coverage losses in each six-month renewal period. Of those, 14,219 (52.5%) involve adults who still qualify but do not return forms. Group shares come from the 2019-2023 ACS survey sample of 6,297 adults across 15 county areas (representing 133,998 weighted adults). Those survey shares are applied to the observed June 2025 state enrollment count of 120,239 Santa Clara County expansion adults. Rounded group counts in Groups 1 to 3 sum to 106,459 (versus 106,472 before rounding, or 88.5% of 120,239).',
      columns: [
        { tag: 'Group 1', tagHighlight: true, title: 'Working 80+ Hrs/Mo', subtitle: 'Workers with regular employer-reported wages' },
        { tag: 'Group 2', tagHighlight: true, title: 'Exempt From Work Rules', subtitle: 'Caregivers, adults with disabilities, and students' },
        { tag: 'Group 3', tagHighlight: false, title: 'Gig &amp; Part-Time Work', subtitle: 'Self-employed and seasonal workers' },
        { tag: 'Group 4', tagHighlight: false, title: 'No Recorded Work', subtitle: 'Survey records do not identify an exemption' }
      ],
      rows: [
        {
          label: 'State-Adjusted Adult Count<span class="block text-xs font-normal text-slate-500">ACS shares applied to 120,239 June 2025 adults</span>',
          cells: [
            { val: '38.0% (45,703)' },
            { val: '39.5% (47,530)' },
            { val: '11.0% (13,226)' },
            { val: '11.5% (13,767)' }
          ]
        },
        {
          label: 'Census Survey Adult Count<span class="block text-xs font-normal text-slate-500">Weighted total of 133,998 (n = 6,297 across 15 areas)</span>',
          cells: [
            { val: '50,934' },
            { val: '52,971' },
            { val: '14,752' },
            { val: '15,341' }
          ]
        },
        {
          label: 'State Record Match Rate<span class="block text-xs font-normal text-slate-500">EDD wage &amp; CalWORKs/SSI file match</span>',
          cells: [
            { val: '80.0% matched' },
            { val: '38.0% to 70.0% matched' },
            { val: '10.0% to 45.0% matched' },
            { val: '5.0% matched' }
          ]
        },
        {
          label: 'Modeled Six-Month Plan Losses<span class="block text-xs font-normal text-slate-500">Total across groups: 27,076 / period</span>',
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
          label: 'Why Records Do Not Confirm<span class="block text-xs font-normal text-slate-500">Missing record at renewal</span>',
          cells: [
            { val: 'Late wage files or two jobs' },
            { val: 'School or care records unlinked' },
            { val: 'No employer W-2 wage record' },
            { val: 'Health or care needs unrecorded' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Why State Records Leave Out Eligible Groups and How Counties Act',
      subtitle: 'Each group needs a matching renewal step based on what state files miss.',
      caption: 'Table explaining why state records may not confirm eligibility for each group and listing county actions that could help members keep coverage.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Household &amp; Work Group',
          cells: [
            { val: 'Regular W-2 store, food, health, and warehouse workers at 80+ hours per month.' },
            { val: 'Parents of children under 14, adults with disabilities, and college students.' },
            { val: 'Rideshare drivers, home-care aides, and seasonal workers with changing hours.' },
            { val: 'Adults without paid work, including unpaid caregivers with no survey exemption.' }
          ]
        },
        {
          label: 'Why Records Do Not Confirm',
          cells: [
            { val: 'Wage files update every three months and miss workers who recently changed jobs.' },
            { val: 'Caregiving, disability, and school records are not linked to employer wage files.' },
            { val: 'Gig and cash pay are not in employer wage files, and one-month checks miss seasonal work.' },
            { val: 'Unrecorded medical frailty or housing loss qualifies for an exemption only after a clinic check.' }
          ]
        },
        {
          label: 'County Staffing Focus',
          cells: [
            { val: 'Use wage files to renew the estimated 80% confirmed by state records before calling.' },
            { val: 'Call exempt adults first, where the model predicts 6,831 avoidable form losses.' },
            { val: 'Review six months of work hours and accept a one-page work statement.' },
            { val: 'Combine renewal calls with clinic checks for serious health needs and job referrals.' }
          ]
        },
        {
          label: 'County &amp; State Options',
          policyFit: true,
          cells: [
            { headline: 'County Option: Wage Check + Text', detail: 'Renew matched W-2 workers first and text a paystub upload link (2,228 modeled retains).' },
            { headline: 'County &amp; State: Pre-Fill Exemptions', detail: 'Fill in parent, disability, and student exemptions from clinic and school files (6,831 modeled retains).' },
            { headline: 'County Option: Six-Month Review', detail: 'Count any 80-hour month in six and accept one-page gig pay forms (3,319 modeled retains).' },
            { headline: 'Clinic Option: Health Check + Link', detail: 'Check for medical frailty at clinic visits and refer to work programs (1,841 modeled retains).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Earlier Enrollment Decline, County Exemptions &amp; Phone Uploads',
      notesBullets: [
        '<strong>Separating Earlier Decline From New Rules.</strong> Observed county expansion counts fell <strong>12.31%</strong> before H.R. 1 work checks began (14,803 fewer adults, from 120,239 in June 2025 to 105,436 in June 2026 in <a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CHHS Open Data</a>). Studies must separate this earlier decline before estimating losses from the new rules.',
        '<strong>Why More Adults Get Paper Forms in Low-Jobless Counties.</strong> State estimates exempt 373,389 adults in high-unemployment counties before Step 5 mailings (<code>dhcs_verification_funnel_scc.csv:5</code>). At ~4.1% unemployment, Santa Clara gets no area exemption (0.0% share). Thus, 9,689 more adults face Step 5 paper checks (82,126 vs. 72,437 under state rates). At a 50% loss rate, predicted losses rise from 36,218 to <strong>41,100 per period</strong>.',
        '<strong>Added Effect of Phone Uploads.</strong> In the model, phone uploads prevent 1,423 more losses per period on the state count. That step raises prevented losses from 14,219 to <strong>15,642 of 27,076 (57.8%)</strong>. On the Census base, summing the eight survey groups gives <strong>17,350 of 30,007 (57.8%)</strong>. Scaling the four-group total directly to 133,998 gives 30,174 losses.'
      ]
    },
    synthesis: {
      title: 'Why Counties Need Different Renewal Actions for Each Adult Group',
      p1: 'A single county estimate of 36,000 to 41,000 losses does not show why members lose coverage. That total mixes adults who no longer qualify with adults who miss mail forms. If leaders assume all exits reflect lost eligibility, clinics may cut care teams too soon. Uninsured adults who still qualify may then visit county ERs, though the model does not count ER visits.',
      p2: 'Splitting renewals into four work and exemption groups guides county staff time. Across 120,239 observed expansion adults, <strong>88.5%</strong> work 80+ hours, have an exemption, or work part-time. Yet <strong>71.4%</strong> of modeled missed-form losses (<strong>10,150 of 14,219</strong>) fall in two groups outside wage files. Caregivers, disabled adults, and students account for 6,831 avoidable losses, and gig workers add 3,319. Filling in clinic and school exemptions, checking six-month hours, and texting upload links keeps members covered.'
    },
    interactive: {
      badge: 'Renewal Scenario Check',
      title: 'Compare Modeled Coverage Kept Across Three County Plans',
      subtitle: 'Modeled six-month Medi-Cal losses and prevented losses across three county plans on the 120,239-adult state count.',
      options: [
        {
          label: 'Scenario 1 · Mail Forms Only',
          headline: 'Standard Paper Forms Only',
          metric: '27,076 Modeled Losses / Period',
          desc: 'Without added record checks, half of the 54,152 adults sent paper forms lose coverage each six-month period.'
        },
        {
          label: 'Scenario 2 · Exemptions &amp; Six-Month Work Review',
          headline: 'Record Checks + Six-Month Hour Review',
          metric: '10,150 Losses Prevented (37.5%)',
          desc: 'Clinic and school record checks plus six-month gig hour reviews prevent 71.4% of missed-form losses.'
        },
        {
          label: 'Scenario 3 · Full Four-Group Plan',
          headline: 'All Four Groups + Phone Upload',
          metric: '15,642 Losses Prevented (57.8%)',
          desc: 'Adding W-2 paystub links, clinic health checks, and phone uploads helps keep nearly three-fifths of losses.'
        }
      ],
      notesTitle: 'Scenario Calculations and Comparison of State and Census Counts',
      notesBullets: [
        '<strong>Scenario 1 Baseline Paper Count.</strong> On the state count of 120,239 adults, state files do not confirm 54,152 adults. Those members get paper forms, and at a 50.0% loss rate, <strong>27,076</strong> lose coverage per period (vs. <strong>41,100</strong> under state rates).',
        '<strong>Scenario 2 Losses Prevented in Two Groups.</strong> Clinic and school record checks help <strong>6,831</strong> exempt adults keep care (1,241 caregivers, 2,295 disabled or new parents, and 3,295 students). Six-month hour checks add <strong>3,319</strong> gig workers, for <strong>10,150 prevented losses</strong> (37.5% of 27,076, or 71.4% of 14,219).',
        '<strong>Scenario 3 Full Plan and Survey Base.</strong> Adding W-2 paystub links (+<strong>2,228</strong>) and clinic health checks (+<strong>1,841</strong>) reaches <strong>14,219 (52.5%)</strong>. Phone uploads add <strong>+1,423</strong> for <strong>15,642 of 27,076 (57.8%)</strong>. On the Census base, summing eight survey groups gives <strong>17,350 of 30,007 (57.8%)</strong>, while scaling to 133,998 gives 30,174.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Model Structure.</strong> This administrative model (<code>dhcs_verification_funnel_scc.csv:1-11</code>, <code>churn_reduction_model_scc.csv:1-24</code>) estimates six-month losses. Statewide rates predict 36,218 to 41,100 losses, while the four-group model predicts 27,076 losses and 14,219 (52.5%) missed-form losses. Counts match the observed June 2025 state count of 120,239 county expansion adults (105,436 in June 2026; <code>scc_dhcs_medical_enrollment.csv:1-134</code>). Group shares come from 6,297 ACS records across 15 county areas (133,998 &plusmn; 3,905 weighted adults).',
      '<strong>Main Data Sources.</strong> Inputs combine the <a href="https://data.chhs.ca.gov/dataset/medi-cal-certified-eligibles-with-demographics-by-month" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CHHS Open Data Portal</a>, the <a href="https://www.dhcs.ca.gov/DataAndStats/statistics/Pages/Medi-Cal-Certified-Eligibles.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS H.R. 1 Plan (Feb 5, 2026)</a>, the <a href="https://www2.census.gov/programs-surveys/acs/data/pums/2023/5-Year/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019-2023 PUMS</a> (weight PWGTP and 80 error weights PWGTP1-PWGTP80), and <a href="https://www.kff.org/medicaid/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">KFF Medicaid Research</a>.',
      '<strong>Comparing State and Survey Counts.</strong> Table 1 lists state-adjusted counts (<code>N = 120,239</code>: 45,703 + 47,530 + 13,226 + 13,767) and ACS survey counts (<code>N = 133,998</code>: 50,934 + 52,971 + 14,752 + 15,341). Rounded Groups 1 to 3 sum to 106,459, while 88.55% of 120,239 before rounding equals 106,472. Listing both bases lets county staff check state files against Census survey records.'
    ],
    faqs: [
      {
        question: 'What share of adults in Santa Clara County\'s Medi-Cal expansion already work or qualify for an exemption?',
        answer: 'Nearly nine in ten adults in this expansion group work or qualify for an exemption in Census survey estimates. Adjusted to the observed count of 120,239 members, 38.0% work at least 80 hours per month. Another 39.5% qualify for a parent, disability, or student exemption, reaching 77.5% across both groups. Gig and part-time workers add 11.0% (88.5% combined). For 11.5% (13,767 adults), survey records show neither paid work nor an exemption.'
      },
      {
        question: 'Why do more adults receive paper renewal forms in a low-unemployment county than the state average?',
        answer: 'Low county unemployment prevents the countywide exemption used in high-unemployment areas. State estimates exempt 373,389 adults in high-unemployment counties before mailing paper forms. Because Santa Clara County has about 4.1% unemployment, zero county members receive that area exemption. Because of that rule, 9,689 more county adults must complete paper checks. If half do not return forms, predicted losses based on state rates increase from 36,218 to 41,100 per period.'
      },
      {
        question: 'Which Medi-Cal adult groups face the most avoidable coverage losses from unreturned forms?',
        answer: 'Caregivers, adults with disabilities, and college students face the most avoidable losses in the model. The model predicts 6,831 avoidable losses in that group per six-month period, or 72.4% of its total losses. Gig and part-time workers rank second with 3,319 modeled avoidable losses, or 64.6% of their losses. Both groups face high form loss rates because employer wage files lack school, care, and cash work records.'
      }
    ],
    related: [
      { slug: 'before-after-trap', title: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time', note: 'Case study showing how earlier clinic trends affect two-year comparisons' },
      { slug: 'p-hacking-multiple-testing', title: 'Minimum Group Sizes and Net Member Losses Help Counties Set Medi-Cal Call Lists', note: 'Case study using group size minimums and net losses to set call lists' },
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Case study pairing Medi-Cal outreach costs with health plan funding' }
    ]
  },

  // =========================================================================
  // MODULE #28: food-insecurity-diabetes (Track 4: Costs, Food Need & Health)
  // =========================================================================
  {
    slug: 'food-insecurity-diabetes',
    tetsCompanion: [
      {
        visibleLabel: 'Neighborhood Need Score Claim Record',
        title: 'Neighborhood Vulnerability Index: Results Under Review',
        url: 'https://tooearlytosay.com/research/food-security/extended-vulnerability-index/',
        claimCovered: 'This guide combines tract measures into one score for 408 Santa Clara tracts. The reported SNAP link (r = 0.83) and group comparisons are under reconciliation and not publicly reproduced.'
      },
      {
        visibleLabel: 'Neighborhood SNAP Change Claim Record',
        title: 'The Widening Gap: Why Some Neighborhoods Are Falling Behind',
        url: 'https://tooearlytosay.com/research/food-security/diverging-trajectories/',
        claimCovered: 'This record tracks SNAP use by tract from 2019 to 2023. The 48% worsening versus 20% improving split is under reconciliation because tract counts disagree.'
      }
    ],
    tier: 'community',
    briefType: 'California Data Brief &middot; Food &amp; Cost of Living',
    trackEyebrow: 'Track 4: Costs, Food Need &amp; Health &middot; Main Case Study',
    pageTitle: 'High Rent, Tract Poverty & Diabetes Rates | CAPHE',
    metaDescription: 'Compare family food costs before and after rent alongside tract poverty, store miles, and adult diabetes rates across California neighborhoods.',
    h1: 'High Rent and Local Poverty Explain Food Need and Diabetes Rates Better Than Store Miles',
    subtitle: 'Checking family food costs before and after rent next to tract poverty and store miles.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'CalFresh checks whether working-age home pay is at or below <strong>200%</strong> of poverty before rent counts [1]. County food maps also often mark tracts by store miles alone [3].'
      },
      {
        lead: 'What California records show',
        html: 'In Marin\'s Canal tract (<strong>$5,507</strong> all-home median pay; <strong>$2,318</strong> renter rent), subtracting rent raises a <strong>$973</strong> food plan from <strong>17.7%</strong> to an estimated <strong>30.5%</strong> (<strong>46.4%</strong> in West Fresno) [1,2]. Across 9,033 state tracts, poverty models explain <strong>62.2%</strong> of food-score gaps vs. <strong>1.8%</strong> for store miles [3].'
      },
      {
        lead: 'Policy option',
        html: 'Clinics can check rent at visits to offer produce vouchers above the 200% FPL limit [1,4]. Counties can use poverty maps for city aid and send delivery vans to rural areas [3,4].'
      }
    ],
    endnotes: [
      '<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau American Community Survey (ACS) 2019-2023 5-Year Estimates</a>: Table B19013 gives median income for all households, and Table B25064 gives median rent for renters in Marin Tract 1122.03, Fresno Tract 2, Santa Clara Tract 5119.15, and Nevada Tract 7.01.',
      '<a href="https://www.fns.usda.gov/cnpp/usda-food-plans-cost-food-reports" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service Thrifty Food Plan</a>: Federal reference food plan set at $973 per month for a family of four.',
      '<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Economic Research Service Food Access Research Atlas (FARA)</a>: Comparison of food-risk score differences across 9,033 state census tracts for poverty (R&sup2; = 62.2%) and store distance (R&sup2; = 1.8%).',
      '<a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">CDC PLACES Local Data for Better Health</a>: Tract adult diabetes rates linked with disability (odds ratio 1.76) and not finishing high school (odds ratio 2.47) across 408 Santa Clara County tracts.'
    ],
    block2: {
      title: 'Income &amp; Store-Distance Checks vs. Money Left After Rent &amp; Tract Poverty',
      contextTag: 'Area Estimate of Money Left After Rent and Comparison of Food-Risk Scores in 9,033 Tracts',
      ariaLabel: 'Comparison of gross income food share before rent versus post-rent food share and neighborhood poverty',
      ruler1: {
        title: 'Income Limit Before Rent &amp; Store Distance Check',
        stat: '17.7% Gross | R² = 1.8% Dist.',
        ariaLabel: 'Gross income check shows 17.7% food share in Marin Canal while store distance alone accounts for 1.8% of tract score differences',
        segments: [
          { cls: 'seg-food', width: 18, label: 'Food 17.7%' },
          { cls: 'seg-gross', width: 82, label: 'Income Before Rent (82.3%)' }
        ],
        desc: 'Before rent, Marin Canal median income (<strong>$5,507</strong>, or 220% FPL) exceeds the 200% FPL CalFresh limit. Across <strong>9,033 state tracts</strong>, store distance accounts for just <strong>1.8%</strong> of food-risk score differences (<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FARA</a>).'
      },
      ruler2: {
        title: 'Money Left After Rent &amp; Local Poverty Check',
        stat: '30.5% Post-Rent | R² = 62.2% Pov.',
        ariaLabel: 'After subtracting $2,318 median monthly rent, a $973 food plan equals 30.5% of money left in Marin Canal and 46.4% in West Fresno, while poverty accounts for 62.2% of tract score differences',
        segments: [
          { cls: 'seg-rent', width: 42, label: 'Rent 42.1% ($2,318)' },
          { cls: 'seg-food', width: 18, label: 'Food: 30.5% After Rent' },
          { cls: 'seg-rest', width: 40, label: 'Remaining $2,216' }
        ],
        desc: 'After <strong>$2,318</strong> median rent (<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Census ACS</a>), a <strong>$973</strong> food plan takes <strong>30.5%</strong> of money left in Marin and <strong>46.4%</strong> in West Fresno. Tract poverty accounts for <strong>62.2%</strong> of USDA FARA food-risk score differences, alongside <a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC PLACES</a> diabetes links.'
      }
    },
    table1: {
      title: 'Table 1. Monthly Income, Rent Share &amp; Post-Rent Food Shares Across Four Areas',
      subtitle: 'Monthly income, rent share, pre-rent and post-rent food shares, and care needs across four areas.',
      caption: 'Table comparing four California area types by monthly income, rent share, food shares before and after rent for a $973 plan, money left, and main food or diabetes care problem.',
      cornerLabel: 'Monthly Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Post-rent food shares use 2019-2023 ACS data. They subtract median renter rent (Table B25064) from median home pay (Table B19013). Next, they divide the $973 monthly USDA food plan for four people by the cash left. Income covers all homes while rent covers renters, so this figure is an area estimate rather than one family budget. Across 9,033 state tracts, separate models show poverty accounts for R&sup2; = 62.2% of food-score gaps and store miles account for R&sup2; = 1.8%. When both measures are in one model, standardized weights are 0.789 for poverty and 0.056 for store miles. Across 408 Santa Clara tracts, CDC PLACES adult diabetes models give an odds ratio of 2.47 (95% range: 2.35-2.61, p &lt; 0.001) for not finishing high school. Disability gives an odds ratio of 1.76 (95% range: 1.63-1.89, p = 0.004). These single-period models show links and do not prove cause and effect.',
      columns: [
        { tag: 'Area Type 1', tagHighlight: true, title: 'High-Rent Working Area', subtitle: 'Marin County: San Rafael Canal District (Census Tract 1122.03)' },
        { tag: 'Area Type 2', tagHighlight: false, title: 'Low-Income Central City', subtitle: 'Fresno County: West Fresno (Census Tract 2)' },
        { tag: 'Area Type 3', tagHighlight: false, title: 'High-Income Suburb', subtitle: 'Santa Clara County: Suburban San Jose (Census Tract 5119.15)' },
        { tag: 'Area Type 4', tagHighlight: false, title: 'Rural Town Area', subtitle: 'Nevada County: Western Sierra Foothills (Census Tract 7.01)' }
      ],
      rows: [
        {
          label: 'Median Monthly Household Income',
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
          label: 'Estimated Pre-Rent Food Share',
          modeled: true,
          cells: [
            { val: '17.7% ($973 plan)' },
            { val: '31.4% ($973 plan)' },
            { val: '6.9% ($973 plan)' },
            { val: '14.4% ($973 plan)' }
          ]
        },
        {
          label: 'Estimated Post-Rent Food Share',
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
          label: 'Estimated Money Left After Rent &amp; Food',
          modeled: true,
          cells: [
            { val: '$2,216' },
            { val: '$1,123' },
            { val: '$10,006' },
            { val: '$4,187' }
          ]
        },
        {
          label: 'Main Food or Care Problem',
          cells: [
            { val: 'High rent above 200% FPL limit' },
            { val: 'Low wages and high disability rate' },
            { val: 'Low area risk (some clinic needs)' },
            { val: 'Long rural drive to grocery store' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. What Income and Store-Distance Checks Leave Out and How Counties Act',
      subtitle: 'Matching renter shares and SNAP use to clinic rent checks and local programs in four area types.',
      caption: 'Table comparing renter shares, SNAP use, needs left out by income and distance checks, places to offer help, and clinic or county actions.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Renter Share &amp; SNAP / CalFresh Use',
          mono: true,
          cells: [
            { val: '96.5% Renters | 19.3% SNAP', color: 'text-slate-950' },
            { val: '78.4% Renters | 44.9% SNAP', color: 'text-rose-800' },
            { val: '25.6% Renters | 5.7% SNAP', color: 'text-slate-950' },
            { val: '44.7% Renters | 7.3% SNAP', color: 'text-slate-950' }
          ]
        },
        {
          label: 'What Income &amp; Distance Checks Miss',
          cells: [
            { val: 'Income limits before rent (200% FPL) leave out the $2,318 rent cost at 220% FPL.' },
            { val: 'Store-distance maps leave out low wages, high disability rates, and medicine costs.' },
            { val: 'High tract income medians do not show low-income renters seen at clinics.' },
            { val: 'Ten-mile rural store rules group drivers with cars alongside seniors without cars.' }
          ]
        },
        {
          label: 'Best Place or Team to Offer Help',
          cells: [
            { val: 'Primary care clinic check-in desks and local school family centers.' },
            { val: 'Community Health Worker (CHW) teams working with community clinics for low-income patients.' },
            { val: 'One-on-one patient checks at clinic visits instead of area-wide grants.' },
            { val: 'Rural senior centers and home food-delivery routes for homes without cars.' }
          ]
        },
        {
          label: 'Clinic &amp; County Options',
          policyFit: true,
          cells: [
            { headline: 'Rent Check + Produce Vouchers', detail: 'Check rent at clinic visits to offer clinic produce prescriptions and local food vouchers above 200% FPL.' },
            { headline: 'CalFresh + CHW Diabetes Care', detail: 'Help eligible patients sign up for CalFresh and pair with bilingual CHW food and medicine guidance.' },
            { headline: 'Meals Suited to Health Needs', detail: 'Refer eligible Medi-Cal diabetes patients to home-delivered medically tailored meals.' },
            { headline: 'Free EBT Delivery &amp; Food Van', detail: 'Waive delivery fees for Electronic Benefit Transfer (EBT) groceries and run mobile food vans.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Statewide Food-Risk Scores &amp; County Models of Diabetes Links',
      notesBullets: [
        '<strong>Food-Risk Score Gaps in 9,033 Tracts.</strong> This study links the <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA Food Access Research Atlas</a> with <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Census ACS</a> across 9,033 state tracts. In separate single-measure models, poverty accounts for <strong>R&sup2; = 62.2%</strong> of food-score gaps and store miles account for <strong>R&sup2; = 1.8%</strong>. In one joint model, standardized weights are 0.789 for poverty (t = 121.97, p &lt; 0.0001) and 0.056 for store miles (t = 8.64; 62.5% together).',
        '<strong>Adult Diabetes Links in 408 Santa Clara Tracts.</strong> Models link ACS schooling and disability data with <a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC PLACES</a> adult diabetes rates across 408 county tracts. Tracts with more adults lacking a high-school diploma show higher diabetes odds (<strong>odds ratio = 2.47, 95% range: 2.35-2.61, p &lt; 0.001</strong>). Higher disability rates also link with higher diabetes odds (<strong>odds ratio = 1.76, 95% range: 1.63-1.89, p = 0.004</strong>), as does joblessness (<strong>odds ratio = 1.24, 95% range: 1.13-1.35</strong>).',
        '<strong>Store Type Check.</strong> Counting all 26,645 SNAP-approved stores statewide marks 462 tracts as low-income areas with long store trips (5.1% of 9,033 tracts; 1.86M people). Counting only 4,383 full grocery stores adds 35 tracts (497 in all).'
      ]
    },
    synthesis: {
      title: 'Pairing Clinic Rent Checks With Local Tract Poverty Maps',
      p1: 'Trouble paying for food and high blood sugar often happen together when fixed rent leaves little cash. Renters pay housing costs first each month and buy food from the pay left. Yet pre-rent CalFresh limits (130% federal and 200% FPL in California) leave out coastal homes just above 200% FPL. Meanwhile, using store miles alone directs grants to less dense towns instead of poor renter tracts.',
      p2: 'Pairing clinic rent checks with tract poverty maps matches aid to real family costs. Across 9,033 state tracts, poverty accounts for 62.2% of food-score gaps while store miles account for 1.8%. In Marin\'s Canal area, $2,318 median rent raises a $973 food plan from 17.7% to 30.5% of cash left. Those area medians compare food costs across tracts without proving which homes get CalFresh. At clinic visits, staff offer produce prescriptions and local food vouchers above 200% FPL. For lower-income homes, staff check CalFresh housing deductions.'
    },
    interactive: {
      badge: 'County &amp; Clinic Action Guide',
      title: 'Use Household, Tract &amp; Plan Data to Choose Actions',
      subtitle: 'Linking clinic rent checks, tract poverty maps, and Medi-Cal meals to local actions.',
      options: [
        {
          label: 'Action 1 · Clinic Visits (Household Level)',
          headline: 'Check Money Left After Rent &amp; Vouchers',
          metric: '17.7% Pre-Rent to 30.5% Post-Rent Food Share',
          desc: 'Ask about rent and pay at clinic visits. That check finds working renters above 200% FPL for clinic produce prescriptions and local food vouchers.'
        },
        {
          label: 'Action 2 · Public Health Placement (Tract Level)',
          headline: 'Place Mobile Vans &amp; CHWs by Poverty',
          metric: '62.2% Poverty Share vs. 1.8% Store Miles',
          desc: 'Send mobile food vans and bilingual CHWs to high-poverty tracts. Those teams reach renters left out by one-mile store maps.'
        },
        {
          label: 'Action 3 · Health Plan Care (System Level)',
          headline: 'Pair Tailored Meals With CHW Support',
          metric: '2.47 &amp; 1.76 Diabetes Odds Ratios',
          desc: 'Pair home-delivered tailored meals with CHW care in high-need tracts. Those tracts link higher adult diabetes rates with lower schooling and disability.'
        }
      ],
      notesTitle: 'Calculations, Tract Models &amp; Aid Eligibility Rules',
      notesBullets: [
        '<strong>Action 1 Area Estimate After Rent.</strong> In Marin Canal Tract 1122.03, subtracting ACS B25064 median rent (<strong>$2,318/month</strong>) from ACS B19013 median home pay (<strong>$5,507/month</strong>, 220% FPL) leaves <strong>$3,189/month</strong>. That step raises the <strong>$973/month</strong> USDA food plan from 17.7% before rent to <strong>30.5%</strong> after rent (+12.8 points).',
        '<strong>Action 2 Statewide Food-Risk Models.</strong> Across 9,033 tracts in USDA FARA and ACS S1701, poverty alone accounts for <strong>R&sup2; = 62.2%</strong> of food-score gaps. Store distance alone accounts for <strong>R&sup2; = 1.8%</strong>. In the joint model, standardized weights are <strong>0.789</strong> for poverty and <strong>0.056</strong> for store miles.',
        '<strong>Action 3 Tract Diabetes Odds Ratios.</strong> Single-period models across 408 Santa Clara tracts link ACS data with CDC PLACES adult diabetes rates. Not finishing high school has an odds ratio of <strong>2.47, p &lt; 0.001 (95% range: 2.35-2.61)</strong>. Disability has an odds ratio of <strong>1.76, p = 0.004 (95% range: 1.63-1.89)</strong>.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Area Estimates After Rent and Tract Links.</strong> Monthly food shares in Table 1 subtract ACS B25064 median rent from ACS B19013 median home pay. They then divide the $973 USDA food plan by the cash left. Income covers all homes and rent covers renters, so this figure is an area estimate rather than one family budget (Fresno Tract 2 matches <code>food-affordability-tradeoffs</code>: $37,238/yr; $1,007/mo). The 9,033-tract state models and 408-tract county diabetes models show single-period links, not cause and effect.',
      '<strong>Main Data Sources.</strong> Data come from <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019-2023</a> (B19013, B25064, S1701, S1810), the <a href="https://www.fns.usda.gov/cnpp/usda-food-plans-cost-food-reports" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA Thrifty Food Plan ($973/mo)</a>, the <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA Food Access Research Atlas</a>, and <a href="https://www.cdc.gov/places/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC PLACES</a>.'
    ],
    faqs: [
      {
        question: 'Should counties act on this analysis at the census-tract level or at clinic visits?',
        answer: 'Counties need both levels because each identifies a different need. Tract poverty accounts for 62.2% of food-risk score differences versus 1.8% for store miles. Those maps show health teams where to place mobile food vans and bilingual CHWs. Meanwhile, clinic rent checks find working renters above California\'s 200% FPL gross-income limit or inside high-income suburbs. Staff connect renters above 200% FPL to clinic produce prescriptions and local food vouchers. For renters at or below the 200% FPL state gross limit (130% federal gross), staff check CalFresh housing deductions. Those deductions lower net pay toward the 100% FPL net rule and raise monthly benefits.'
      },
      {
        question: 'How does high rent reduce money for food and diabetes care above 200% of the Federal Poverty Level?',
        answer: 'Federal poverty guidelines use one income limit before rent across 48 states despite local rent differences. An income check before rent does not account for coastal housing costs. In Marin\'s Canal District, subtracting $2,318 median rent from $5,507 median household income (220% four-person FPL) leaves $3,189 in area benchmark cash. Against that estimate, a $973 food plan rises from 17.7% to 30.5%, showing why clinics offer produce prescriptions and local food vouchers above 200% FPL.'
      },
      {
        question: 'Which programs help families facing high rent, difficulty paying for food, and diabetes at the same time?',
        answer: 'Clinics and health plans combine food vouchers, meals suited to health needs, and CHW support when rent leaves little money for food and care. For renters above California\'s 200% FPL CalFresh limit, clinics provide clinic produce prescriptions and local food vouchers. For Medi-Cal members with hard-to-control diabetes, health plans pay for home-delivered tailored meals. Alongside food aid, bilingual CHWs help patients with mobility or reading limits take daily medicines.'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Subtracting Local Rent From Pay Shows High Food Costs Above Poverty Limits', note: 'Case study comparing pre-rent and post-rent food cost shares across four areas' },
      { slug: 'geographic-variables', title: 'Tract Poverty Explains Most of Santa Clara\'s Food-Need Score Compared With Store Miles', note: 'Case study comparing tract poverty and store miles across four counties' },
      { slug: 'classifying-causal-mechanisms', title: 'Controlling for Post-Start Clinic Visits Subtracts the Care Step That Reduces Hospital Stays', note: 'Case study separating pre-start causes from post-start care steps in models' }
    ]
  }
];

for (const spec of flagshipModules) {
  renderModuleHtml(spec);
}
console.log('Flagship Case Studies rendered successfully.');
