#!/usr/bin/env node
'use strict';

/**
 * Wave 4A Builder: Track 2 Study Credibility & Measurement (7 Surviving Modules)
 *
 * Modules built:
 *  - #9  food-affordability-tradeoffs (Track 2, public) - Poverty & Affordability Denominators
 *  - #11 observational-to-experimental (Track 2, public) - Pandemic Surge +2.47 vs Pre-COVID TWFE -2.38, 13-Yr Cumulative -4.32 & Long-Diff 2SLS -5.31 (folds regression-tables-confounding)
 *  - #12 geographic-variables (Track 2, public) - Poverty R²=62.2% vs Store Distance R²=0.0% across CA Tracts
 *  - #14 identical-data-opposite-policies (Track 2, community) - CMS CY 2026 GPCI (1.506 SF vs 0.90 Imperial), Census ACS Rent & MACPAC/Polsky Benchmarks
 *  - #16 threat-measurement-instrumentation (Track 2, community) - 6,613 Google Stores vs 514 SNAP-Verified EBT & GTFS Fix
 *  - #17 study-design-ladder (Track 2, member) - Matching Study Designs Across 4 CAPHE Evaluations
 *  - #18 p-hacking-multiple-testing (Track 2, member) - 62-Cell Santa Clara County DHCS Medi-Cal Enrollment Panel
 */

const { renderModuleHtml } = require('./render_option_c');

const modules = [
  // =========================================================================
  // MODULE #9: food-affordability-tradeoffs (Track 2, public)
  // =========================================================================
  {
    slug: 'food-affordability-tradeoffs',
    tetsCompanion: [
      {
        visibleLabel: 'Silicon Valley Working-Poor Tract Estimate',
        title: 'When Work Isn\'t Enough: A Working-Poor Estimate Under Review',
        url: 'https://tooearlytosay.com/research/food-security/working-poor-silicon-valley/',
        claimCovered: 'The article reports that 57 of 408 Santa Clara tracts have work rates above 60% and poverty above 10%. It also gives housing-cost estimates; not publicly reproduced.'
      },
      {
        visibleLabel: 'Requesting and Checking Census ACS Data in Python',
        title: 'How to Build a Census Data Pipeline',
        url: 'https://tooearlytosay.com/research/methodology/census-api-pipeline/',
        claimCovered: 'A guide to using Python to request 2022 ACS 5-year tract data from the Census service. It explains access keys, rate limits, and missing-value checks.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Income Before Rent vs. Food Money After Rent',
    pageTitle: 'Pre-Rent Income Limits & Post-Rent Food Costs | CAPHE',
    metaDescription: 'Compare income before rent with money left after rent in four California areas, and see what share pays for a $973 monthly food plan.',
    h1: 'Subtracting Local Rent From Pay Shows High Food Costs Above Poverty Limits',
    subtitle: 'Checking food cost shares before and after rent across four city, inland, and rural areas.',
    endnotes: [
      '<a href="https://www.fns.usda.gov/snap/fy-2024-cola" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: 2024 food benefit cost updates and the $973 monthly food plan for four people.',
      '<a href="https://api.census.gov/data/2023/acs/acs5/groups.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau</a>: 2019&ndash;2023 five-year survey tables for median pay (<code>B19013</code>) and median rent (<code>B25064</code>).',
      '<a href="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references/2023-poverty-guidelines-computations" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Department of Health and Human Services (HHS)</a>: 2023 poverty rules ($2,500 per month for four people; 130% = $3,250; 200% = $5,000).'
    ],
    policySettingHtml: 'Gross income is income before taxes and other deductions, while post-rent cash is money left after rent. CalFresh is California\'s Supplemental Nutrition Assistance Program (SNAP). For most homes with working-age adults, CalFresh first checks if gross pay is at or below 200% of the Federal Poverty Level (FPL). Rent deductions apply in a later check. This study subtracts each area\'s median rent from its median pay, where a median is the middle value. These area estimates compare food cost shares across places rather than showing which homes qualify.',
    answerHtml: 'Food takes a large share of estimated money left after rent even where median pay exceeds federal poverty limits [2,3]. In Marin\'s Canal tract (1122.03), median pay across all homes is <strong>$5,507 per month</strong> [2]. That equals <strong>220%</strong> of four-person <strong>FPL</strong>, above the 200% FPL four-person limit [2,3]. Subtracting <strong>$2,318</strong> median rent (<strong>42.1%</strong> of area pay) leaves <strong>$3,189</strong> in estimated money after rent [2]. Against those tract medians, the U.S. Department of Agriculture (USDA) <strong>$973</strong> monthly food plan for four people takes <strong>17.7%</strong> of pay before rent [1,2]. After rent, that plan takes <strong>30.5%</strong> of money left and leaves <strong>$2,216</strong> [1,2]. Post-rent food shares reach <strong>46.4%</strong> in Central Fresno versus <strong>17.9%</strong> in Nevada County and <strong>9.3%</strong> in Santa Clara [1,2]. Counties can pair these estimates with store miles to place produce vouchers, CalFresh help, and Electronic Benefit Transfer (EBT) delivery [1,3].',
    block2: {
      title: 'Food Share Before Rent vs. After Rent (Marin Canal Tract 1122.03)',
      contextTag: 'Area Median Pay and Rent From 2019-2023 Census Data',
      ariaLabel: 'Comparison of food share before and after rent in Marin County Canal Tract 1122.03',
      ruler1: {
        title: 'Before Rent ($973 / $5,507 Monthly Pay)',
        stat: '17.7% Pre-Rent Share (220% FPL)',
        ariaLabel: 'Before rent: $973 food plan out of $5,507 median monthly pay',
        segments: [
          { cls: 'seg-food', width: 18, label: 'Food Plan: $973 (17.7%)' },
          { cls: 'seg-gross', width: 82, label: 'Left Before Rent: $4,534 (82.3%)' }
        ],
        desc: 'Before rent, the $973 food plan takes 17.7% of the $5,507 area pay estimate.'
      },
      ruler2: {
        title: 'After Rent ($973 / $3,189 Money Left After Rent)',
        stat: '30.5% Post-Rent Share (-$2,318 Rent)',
        ariaLabel: 'After subtracting $2,318 rent, $973 equals 30.5% of $3,189 left after rent',
        segments: [
          { cls: 'seg-rent', width: 42, label: 'Rent: 42.1% ($2,318)' },
          { cls: 'seg-food', width: 18, label: 'Food: 30.5% ($973)' },
          { cls: 'seg-rest', width: 40, label: 'Left: $2,216' }
        ],
        desc: 'Subtracting $2,318 median rent leaves $3,189, so $973 takes 30.5% of money left.'
      }
    },
    table1: {
      title: 'Table 1. Monthly Income, Rent, and the Share Needed for Food in Four Areas',
      subtitle: 'Checking food shares before and after rent for a $973 monthly plan in four areas.',
      caption: 'Table 1: Compare median monthly pay, rent, money left after rent, and the share needed for a four-person food plan in four California areas.',
      cornerLabel: 'Monthly Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Area Estimates From Median Pay and Rent:</strong> Pay and rent come from the 2019&ndash;2023 American Community Survey (ACS). Table <code>B19013</code> gives median yearly pay for all homes; divide by 12 for monthly pay. Table <code>B25064</code> gives median monthly rent for rented homes. Because those two tables cover different groups of homes, subtracting rent from pay creates an area estimate rather than one family\'s budget. This table compares that estimate with a $973 monthly food plan and the 2023 four-person poverty rule of $2,500 per month.',
      columns: [
        { tag: 'Area 1: High-Rent Tract', tagHighlight: true, title: 'Marin Canal Tract 1122.03', subtitle: 'San Rafael Canal tract 1122.03 in Marin County.' },
        { tag: 'Area 2: Central City Tract', tagHighlight: true, title: 'Central Fresno Tract 2', subtitle: 'Central city tract 2 in Fresno County.' },
        { tag: 'Area 3: Rural Foothills', tagHighlight: false, title: 'Nevada County Median', subtitle: 'Median across all of Nevada County in the Sierra foothills.' },
        { tag: 'Area 4: High-Pay County', tagHighlight: false, title: 'Santa Clara County Median', subtitle: 'Median across all of Santa Clara County.' }
      ],
      rows: [
        {
          label: 'Median Monthly Household Income',
          cells: [
            { val: '$5,507 ($66,080/yr)' },
            { val: '$3,103 ($37,238/yr)' },
            { val: '$7,075 ($84,905/yr)' },
            { val: '$13,306 ($159,674/yr)' }
          ]
        },
        {
          label: 'Income vs. Four-Person Poverty Rule',
          cells: [
            { val: '220% FPL (above 200% limit)' },
            { val: '124% FPL (below 130% limit)' },
            { val: '283% FPL (countywide)' },
            { val: '532% FPL (countywide)' }
          ]
        },
        {
          label: 'Median Rent &amp; Share of Income',
          cells: [
            { val: '42.1% ($2,318)' },
            { val: '32.5% ($1,007)' },
            { val: '23.1% ($1,635)' },
            { val: '21.1% ($2,814)' }
          ]
        },
        {
          label: 'Estimated Money Left After Rent',
          modeled: true,
          cells: [
            { val: '$3,189 ($973 food plan)' },
            { val: '$2,096 ($973 food plan)' },
            { val: '$5,440 ($973 food plan)' },
            { val: '$10,492 ($973 food plan)' }
          ]
        },
        {
          label: 'Pre-Rent Share Needed for Food',
          modeled: true,
          cells: [
            { val: '17.7% ($4,534 left)' },
            { val: '31.4% ($2,130 left)' },
            { val: '13.8% ($6,102 left)' },
            { val: '7.3% ($12,333 left)' }
          ]
        },
        {
          label: 'Post-Rent Share Needed for Food',
          modeled: true,
          highlight: true,
          cells: [
            { val: '30.5% ($2,216 left)', barWidth: 66, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '46.4% ($1,123 left)', barWidth: 100, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '17.9% ($4,467 left)', barWidth: 39, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '9.3% ($9,519 left)', barWidth: 20, barColor: '#10B981', textColor: 'text-emerald-800' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Matching Food Vouchers, CalFresh Aid, and Delivery to Local Needs',
      subtitle: 'Checking food costs after rent, renter shares, CalFresh use, and store miles to pick programs.',
      caption: 'Table 2: Renter share, CalFresh use, store distance, costs and travel needs that income limits miss, and matched county actions.',
      cornerLabel: 'Local Measure',
      rows: [
        {
          label: 'Renter Share &amp; CalFresh Use',
          mono: true,
          cells: [
            { val: '96.5% Renters | 19.3% CalFresh', color: 'text-slate-950' },
            { val: '78.4% Renters | 44.9% CalFresh', color: 'text-rose-800' },
            { val: '25.6% Renters | 7.3% CalFresh', color: 'text-slate-950' },
            { val: '44.7% Renters | 5.7% CalFresh', color: 'text-slate-950' }
          ]
        },
        {
          label: 'County Average Distance to SNAP Store',
          mono: true,
          cells: [
            { val: '0.97 mi county (8.1% USDA low-access)', color: 'text-emerald-800' },
            { val: '1.45 mi county (13.3% USDA low-access)', color: 'text-amber-800' },
            { val: '2.92 mi county (12.4 mi max rural trip)', color: 'text-rose-800' },
            { val: '0.60 mi county (3.7% USDA low-access)', color: 'text-emerald-800' }
          ]
        },
        {
          label: 'What Income Limits Before Rent Miss',
          cells: [
            { val: 'Area pay ($5,507, 220% 4-person FPL) exceeds 200% FPL, yet food takes 30.5% of money left after rent.' },
            { val: 'Low median pay ($3,103) and $1,007 rent (32.5%) raise food to 46.4% of money left after rent.' },
            { val: 'The 17.9% county food share after rent does not show rural store trips of up to 12.4 miles.' },
            { val: 'The $13,306 county median pay (532% FPL) does not show rent and pay differences across tracts.' }
          ]
        },
        {
          label: 'Recommended County Action',
          policyFit: true,
          cells: [
            { headline: 'Produce Vouchers &amp; Clinic Aid', detail: 'Pair CalFresh eligibility checks with clinic produce prescriptions and local food vouchers not limited to 200% FPL.' },
            { headline: 'CalFresh Aid + Mobile Markets', detail: 'Help eligible homes sign up for CalFresh and send mobile food markets to Fresno tracts far from stores.' },
            { headline: 'Rural EBT Stores &amp; Delivery', detail: 'Sign up rural grocers for EBT and expand online food delivery on foothill routes.' },
            { headline: 'Direct Grants by Census Tract', detail: 'Direct county food grants using tract post-rent estimates instead of countywide median pay.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Renter Shares, CalFresh Use &amp; Store Distance Sources',
      notesBullets: [
        '<strong>Renter Share &amp; CalFresh Use:</strong> In Marin Tract 1122.03, 439 of 455 homes rent, or 96.5%, compared with 36.1% countywide. CalFresh use is 19.3% in the tract and 4.8% countywide. In Fresno Tract 2, 597 of 761 homes rent, or 78.4%, versus 44.6% countywide. CalFresh use is 44.9% in the tract and 20.5% countywide.',
        '<strong>Store Distance &amp; USDA Rules:</strong> In Fresno County, 30 of 225 tracts (13.3%) meet USDA low-income and long-trip rules. Store trips must exceed 1 mile in cities or 10 miles in rural areas, and reach 15.53 miles in Fresno. In Nevada County, trips to a confirmed SNAP store average 2.92 miles, with a 1.98-mile median and 12.43-mile longest trip.'
      ]
    },
    synthesis: {
      title: 'Why Money Left After Rent and Store Miles Support Different Programs',
      p1: 'Income limits before rent treat $5,507 per month the same in high-rent and low-rent counties. Yet area food shares change once local rent is subtracted. In Marin\'s Canal tract, 96.5% of homes rent and 19.3% use CalFresh, while the county\'s average distance to a SNAP store is 0.97 miles. Tract median pay across all homes is $5,507, or 220% of four-person FPL (above the 200% FPL four-person limit). Because tract medians pair all-home pay with renter rent, they do not show which homes qualify. Subtracting $2,318 median rent (42.1% of area pay) raises the $973 food plan to 30.5% of money left after rent. These findings support offering CalFresh checks, produce prescriptions, and local food vouchers at clinics in high-rent areas.',
      p2: 'The other three areas show how pay, rent, and store miles combine in distinct ways. Central Fresno Tract 2 pairs $3,103 median pay and $1,007 rent with long trips to large grocery stores in 13.3% of county tracts. Food takes 46.4% of estimated money left after rent ($973 of $2,096), which supports CalFresh sign-up help and mobile markets. By contrast, rural Nevada County has a 17.9% food share after rent ($7,075 pay, $1,635 rent) and trips up to 12.43 miles. Those long trips support adding rural EBT stores and delivery, while Santa Clara\'s $13,306 county median shows why staff must check tract data.'
    },
    methodologyParagraphs: [
      '<strong>1. Survey Medians and Money Left After Rent:</strong> In the 2019&ndash;2023 Census survey, table <code>B19013</code> gives median pay across all homes. Table <code>B25064</code> gives median rent across rented homes. Divide yearly median pay by 12 and round to the nearest dollar, then subtract median monthly rent. Compare the money left with the $973 food plan and the $2,500 monthly poverty rule for four people. This produces an area estimate, not one family\'s recorded budget. Median yearly pay for renters alone (<code>B25119</code>) is $65,777 (plus or minus $16,576) in Marin Tract 1122.03 and $29,155 (plus or minus $11,971) in Fresno Tract 2. It is $52,986 (plus or minus $8,277) in Nevada County and $119,765 (plus or minus $1,703) in Santa Clara County.',
      '<strong>2. Data Sources:</strong> <a href="https://api.census.gov/data/2023/acs/acs5/groups.html" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">U.S. Census Bureau 2019&ndash;2023 ACS 5-Year Tables</a> (<code>B19013</code>, <code>B25064</code>, <code>B25003</code>, <code>B22003</code>). <a href="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references/2023-poverty-guidelines-computations" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">2023 HHS Federal Poverty Guidelines</a> ($30,000 per year or $2,500 per month for four people; 130% = $3,250; 200% = $5,000). <a href="https://www.fns.usda.gov/snap/fy-2024-cola" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">USDA FNS 2024 SNAP Cost-of-Living Update</a> and <a href="https://www.fns.usda.gov/research/cnpp/usda-food-plans/cost-food-monthly-reports" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">USDA June 2023 Thrifty Food Plan</a> ($973.30 per month rounded to $973). <a href="https://healthpolicy.ucla.edu/newsroom/events/focus-food-insecurity-insights-california-health-interview-survey" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">UCLA California Health Interview Survey (CHIS)</a>.',
      '<strong>3. Area Numbers Used in Table 1:</strong> Marin Tract 1122.03 (Census ID <code>06041112203</code>) has $66,080 yearly pay ($5,507/mo, 220% FPL) and $2,318 rent (42.1%). That leaves $3,189 after rent, a 17.7% food share before rent, a 30.5% share after rent, and $2,216 left. Fresno Tract 2 (ID <code>06019000200</code>) has $37,238 yearly pay ($3,103/mo, 124% FPL) and $1,007 rent (32.5%). That leaves $2,096 after rent, a 31.4% share before rent, a 46.4% share after rent, and $1,123 left. Nevada County (ID <code>06057</code>) has $84,905 yearly pay ($7,075/mo, 283% FPL), $1,635 rent (23.1%), $5,440 after rent, 13.8% before rent, 17.9% after rent, and $4,467 left. Santa Clara County (ID <code>06085</code>) has $159,674 yearly pay ($13,306/mo, 532% FPL), $2,814 rent (21.1%), $10,492 after rent, 7.3% before rent, 9.3% after rent, and $9,519 left.'
    ],
    faqs: [
      {
        question: 'Why do income limits before rent fail to show high food costs in high-rent areas?',
        answer: 'Federal poverty rules apply one dollar limit across 48 states without subtracting rent. In Marin\'s Canal tract (1122.03), median pay across all homes is $5,507 (220% of four-person FPL) and median rent is $2,318. This tract estimate compares area medians rather than showing which homes qualify. Subtracting $2,318 rent leaves $3,189 and raises a $973 food plan from 17.7% of pay before rent to 30.5% of money left after rent.'
      },
      {
        question: 'How does checking money left after rent and store miles separately help county planning?',
        answer: 'Checking money left after rent and store miles separately helps identify high housing costs and long trips to EBT stores. In Marin Canal, median pay is 220% of four-person FPL, and the county\'s average distance to a SNAP store is 0.97 miles. Those facts support CalFresh checks, clinic produce prescriptions, and local food vouchers, while rural areas with 12.43-mile trips need EBT stores and delivery.'
      },
      {
        question: 'Why should counties check census tracts instead of countywide median pay?',
        answer: 'Countywide medians combine high-pay homeowner suburbs with lower-pay renter tracts. In Santa Clara County, median pay is $13,306 per month and the food plan takes 9.3% of estimated money left after rent. County figures do not show differences across tracts, whereas tract estimates identify local renter areas where rent exceeds two-fifths of pay.'
      }
    ],
    related: [
      { slug: 'geographic-variables', title: 'Tract Poverty Explains Most of Santa Clara\'s Food-Need Score Compared With Store Miles', note: 'Case study comparing poverty score differences (62.2%) against store distance across California tracts' },
      { slug: 'food-insecurity-diabetes', title: 'High Rent and Local Poverty Explain Food Need and Diabetes Rates Better Than Store Miles', note: 'Case study pairing post-rent food budgets with neighborhood poverty and chronic-care needs' },
      { slug: 'threat-measurement-instrumentation', title: 'Changes in Data Counting Rules Change Food-Access Scores Even When Store Counts Stay the Same', note: 'Case study comparing map search lists against USDA SNAP-confirmed EBT stores' }
    ]
  },

  // =========================================================================
  // MODULE #11: observational-to-experimental (Track 2, public)
  // =========================================================================
  {
    slug: 'observational-to-experimental',
    tetsCompanion: [
      {
        visibleLabel: 'Public Health Spending in Regular and Pandemic Years',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 county-years), each extra dollar per person links with -0.238 deaths per 100,000 in 2003 to 2019 versus +0.247 in 2020 to 2023.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Routine Health Budgets vs. Emergency Aid Years',
    pageTitle: 'Routine County Health Spending & Pandemic Aid | CAPHE',
    metaDescription: 'Compare 2020-2023 pandemic aid (+2.47) with pre-2020 county health spending linked to 2.38 to 5.31 fewer deaths per 100,000 in California.',
    h1: 'Routine County Health Spending Links With Lower Death Rates Outside Pandemic Grant Years',
    subtitle: 'Testing 2020-2023 pandemic aid apart from pre-2020 county health spending across 57 counties.',
    endnotes: [
      '<a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California State Controller\'s Office</a>: County financial reports matched across 57 counties from 2003 to 2023 (943 pre-COVID and 220 COVID-19 county-years).',
      '<a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Public Health (CDPH) Vital Statistics</a>: County death records from all causes and specific causes (2003&ndash;2023) and <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Methodology</a>.',
      '<a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Brown, T. T. (2014)</a>: Study in <em>Economics &amp; Human Biology</em> (13, 34&ndash;45), and <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012)</a> in <em>JBES</em> (30, 67&ndash;80).'
    ],
    policySettingHtml: 'Routine county health budgets fund local disease control and prevention year after year. During the 2020-2023 COVID-19 pandemic, state and federal agencies sent the largest emergency grants to counties with large increases in deaths. Higher death rates can bring in more emergency aid. That reverse causation means health needs affect spending rather than spending causing more deaths. Combining pandemic years with regular years makes the combined estimate close to zero because the two periods show opposite patterns. Testing the two periods apart lets county boards see how regular health spending links with death rates.',
    answerHtml: 'Across <strong>943</strong> yearly county records from 2003 to 2019, each extra <strong>$10 per resident</strong> in routine county health spending links to <strong>2.38 fewer deaths</strong> per 100,000 per year [1,2]. Over 13-year changes, that link is <strong>4.32 fewer deaths</strong> per 100,000 per year (unadjusted <em>p</em> = 0.0052; multiple-testing-adjusted <em>p</em> = 0.067, above 0.05) [1,2,3]. A second statistical check estimates <strong>5.31 fewer deaths</strong> per 100,000 per year [3]. Federal rules use $13.6M as the Value of a Statistical Life (VSL) to value reduced death risk. If causal, those three links imply <strong>$420,168</strong> per expected death prevented (<strong>$32 per $1</strong>), <strong>$231,481</strong> (<strong>$59 per $1</strong>), and <strong>$188,324</strong> [2,3]. Those dollar figures are <strong>illustrative valuations conditional on a causal interpretation</strong>, not cash received by counties [2]. By contrast, 2020-2023 emergency grants (220 county-years) rose 64.2% ($102.75 to $168.70) where COVID-19 deaths increased the most [1,2]. During those years, each $10 linked to <strong>+2.47</strong> more deaths, putting all 2003-2023 years near zero at -0.25 [1,2].',
    block2: {
      title: 'Pandemic Emergency Aid Years vs. Earlier County Spending Links (57 Counties)',
      contextTag: 'Observed Estimates Across 943 Pre-COVID and 220 COVID-19 Yearly County Records',
      ariaLabel: 'Comparison of pandemic aid estimate of +2.47 versus pre-pandemic links of 2.38 yearly and 4.32 (adjusted p = 0.067) to 5.31 fewer deaths per 100,000',
      ruler1: {
        title: 'Pandemic Emergency Aid Period (2020-2023 Relief Grants)',
        stat: '+2.47 Deaths / 100K',
        ariaLabel: 'Pandemic 2020-2023 slope of +2.47 deaths per 100,000 per $10 per person',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '+64.2% COVID-19 Aid Increase' },
          { cls: 'seg-rest', width: 8, label: '+2.47 Estimate' }
        ],
        desc: 'Emergency COVID-19 relief grants rose 64.2% where local death rates increased the most.'
      },
      ruler2: {
        title: 'Pre-Pandemic Links in Yearly and 13-Year Comparisons',
        stat: '2.38 Yr | 4.32 13-Yr (adj. p = 0.067) | 5.31 Check',
        ariaLabel: 'Pre-pandemic models compare estimated links of 2.38 fewer deaths yearly and 4.32 over 13-year changes (adjusted p = 0.067), alongside 5.31 in a second check',
        segments: [
          { cls: 'seg-primary', width: 45, label: 'Yearly: 2.38 Fewer' },
          { cls: 'seg-food', width: 55, label: '13-Yr: 4.32 (adj. p = 0.067)' }
        ],
        desc: 'Pre-COVID models compare yearly (-2.38) and 13-year (-4.32, adj. p = 0.067) spending links.'
      }
    },
    table1: {
      title: 'Table 1. Pandemic Aid Compared With Yearly and 13-Year Spending Links Before 2020',
      subtitle: 'Comparing changes in death rates linked to each extra $10 spent per person across 57 counties.',
      caption: 'Table 1: Compare pandemic aid years with three studies of pre-2020 county spending across yearly changes, 13-year changes, and a second check of the 13-year result.',
      cornerLabel: 'Model Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (57-County Spending Links &amp; Dollar Estimates Assuming Cause):</strong> Error checks group records by county across 57 California counties, leaving out San Francisco and three city health offices. The 2020&ndash;2023 pandemic period (220 records) gives +0.247 per $1 (+2.47 per $10, SE = 0.75, p = 0.0010). Combining all years from 2003 to 2023 (1,163 records) gives -0.25 per $10 (SE = 0.67, p = 0.710). The 2003&ndash;2019 yearly model (943 records) accounts for lasting county traits and yearly state changes. It gives -0.238 per $1, or -2.38 per $10 (SE = 0.78, p = 0.0022; repeat-sample county check p = 0.007; 95% range -3.91 to -0.85). The 13-year model (2003&ndash;2016, 57 counties) gives -4.32 per $10 (SE = 1.54, unadjusted p = 0.0052, adjusted p = 0.067). A 16-year check without five reporting-change records gives -5.91 (SE = 2.77, p = 0.0330). Across 16 delay checks, a 4-year change with raw p = .0049 adjusts to .0788. The Lewbel two-stage check (2003&ndash;2016) gives -5.31 (SE = 1.67, p = 0.0015, first-step F = 111.20, J-test p = 0.2132). In a log version, first-step F drops to 0.85, making that log check weak. Rows with * assume cause and use the $13.6M federal value ($420,168 or 32.4:1 [$32 per $1] yearly; $231,481 or 58.8:1 [$59 per $1] over 13 years; $188,324 or 72.2:1 [$72 per $1] in the check).',
      columns: [
        { tag: 'Model 1: Emergency Aid', tagHighlight: false, title: 'COVID-19 Aid Period', subtitle: '57 counties in 2020-2023 (220 yearly county records).' },
        { tag: 'Model 2: Yearly Data', tagHighlight: true, title: 'Yearly Pre-COVID Data', subtitle: '57 counties in 2003-2019 (943 yearly county records).' },
        { tag: 'Model 3: 13-Yr Changes', tagHighlight: true, title: '13-Year Changes', subtitle: '57 counties in 2003-2016 under one reporting format (adj. p = 0.067).' },
        { tag: 'Model 4: Second Check', tagHighlight: false, title: '13-Year Second Check', subtitle: '57 counties in 2003-2016 using county trait differences.' }
      ],
      rows: [
        {
          label: 'Spending Differences Studied',
          cells: [
            { val: 'Emergency COVID-19 aid (+64.2% increase)' },
            { val: 'Within-county routine yearly budgets' },
            { val: '13-year spending changes (2003-2016)' },
            { val: 'Population trait check on 13-yr data' }
          ]
        },
        {
          label: 'Yearly Deaths per 100,000 per $10 / Person',
          highlight: true,
          cells: [
            { val: '+2.47 (pandemic aid years)', barWidth: 2, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '2.38 fewer deaths (yearly)', barWidth: 45, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '4.32 fewer deaths (13-yr, adj. p=0.067)', barWidth: 81, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '5.31 fewer deaths (per yr, check)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: '95% Statistical Range',
          cells: [
            { val: '+1.00 to +3.94 per 100,000' },
            { val: '0.85 to 3.91 fewer per 100,000' },
            { val: '1.30 to 7.34 fewer per 100,000' },
            { val: '2.04 to 8.58 fewer per 100,000' }
          ]
        },
        {
          label: 'County Group &amp; Method Checks',
          cells: [
            { val: 'All 2003-23 years: -0.25' },
            { val: 'Urban (-2.59) &amp; Smaller (-2.42)' },
            { val: 'adj. p = 0.067 | 16-yr: 5.91 fewer' },
            { val: 'First-step F = 111.20 | J p = 0.213' }
          ]
        },
        {
          label: 'Estimated Cost per Death Prevented (If Causal)*',
          modeled: true,
          cells: [
            { val: 'Not calculated (+2.47 opposite sign)' },
            { val: '$420,168 (if causal)' },
            { val: '$231,481 (if causal)' },
            { val: '$188,324 (if causal)' }
          ]
        },
        {
          label: 'Estimated Health Value per $1 (If Causal)*',
          modeled: true,
          cells: [
            { val: 'Not calculated (emergency aid years)' },
            { val: '$32 per $1 (if causal, $13.6M VSL)' },
            { val: '$59 per $1 (if causal, $13.6M VSL)' },
            { val: '$72 per $1 (if causal, $13.6M VSL)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Analyzing Crisis Aid Years Apart From Pre-2020 County Budgets',
      subtitle: 'Testing 2020-2023 emergency aid apart so county boards can read pre-2020 spending links clearly.',
      caption: 'Table 2: Compare study periods, links between spending and deaths, possible reading errors, and county budget advice.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Study Years &amp; Funding Type',
          cells: [
            { val: 'COVID-19 aid years (2020-2023, 220 records) when grants rose from $102.75 to $168.70 per person.' },
            { val: 'Pre-COVID yearly records (2003-2019, 943 records) accounting for lasting county traits and yearly state changes.' },
            { val: '13-year changes (2003-2016, 57 counties) under one reporting format comparing spending and death rates.' },
            { val: 'Two-stage 13-year check (2003-2016, 57 counties) using population trait differences across counties.' }
          ]
        },
        {
          label: 'What the Estimate Shows',
          cells: [
            { val: 'State and federal COVID-19 aid went to counties with large death increases, giving a +2.47 link.' },
            { val: 'Regular yearly spending links with lower death rates in urban (-2.59) and smaller (-2.42) counties.' },
            { val: 'The 13-year model estimates 4.32 fewer deaths (adj. p = 0.067) versus 2.38 in the yearly model.' },
            { val: 'The extra check also links spending with fewer deaths (-5.31), though log versions weaken and assumptions stay untestable.' }
          ]
        },
        {
          label: 'Budget Error When Misread',
          cells: [
            { val: 'Combining 2020-2023 aid with 2003-2019 budgets gives an estimate near zero (-0.25) from opposite patterns.' },
            { val: 'These studies did not randomly assign spending, so they cannot prove cause on their own.' },
            { val: 'Reporting the 13-year -4.32 link without adj. p = 0.067 or reporting-format limits overstates certainty.' },
            { val: 'Treating this extra statistical check as a randomized trial overstates proof of cause and effect.' }
          ]
        },
        {
          label: 'Recommended Budget Action',
          policyFit: true,
          cells: [
            { headline: 'Analyze Crisis Aid Apart', detail: 'Review emergency outbreak grants on their own instead of combining them with regular budgets.' },
            { headline: 'Report Yearly Link + Limits', detail: 'Report 2.38 fewer deaths as an observed link, and $420,168 ($32 per $1) only if causal.' },
            { headline: 'Pair 4.32 With adj. p = 0.067', detail: 'Report the 13-year link (-4.32, adj. p = 0.067) and mark $231,481 ($59 per $1) as if causal.' },
            { headline: 'Keep 5.31 as Extra Check', detail: 'Use the 5.31 check ($188,324 per death prevented, $72 per $1 if causal) only as an extra check.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Pandemic Aid Period, Long-Term Illness Links &amp; Extra Method Checks',
      notesBullets: [
        '<strong>Pandemic Period Shift:</strong> From 2020 to 2023 (220 records), COVID-19 aid from state and federal agencies raised mean county health spending by 64.2%, from $102.75 to $168.70 per person. Over the same years, the all-cause death rate rose from 806.02 to 970.80 per 100,000. That produced a +2.47 per $10 link (p = 0.0010), which is 4.85 deaths per 100,000 above the -2.38 pre-COVID result.',
        '<strong>Urban, Rural &amp; Cause-Specific Links:</strong> In 2003&ndash;2019 (943 records), higher spending links with lower death rates in urban counties above 500,000 people (-2.59 per $10, p &lt; 0.0001). It also links with lower death rates in smaller counties at or below 500,000 people (-2.42, p = 0.0136) and in 2003&ndash;2016 (-2.62, p = 0.0128). Deaths from long-term illnesses show a -2.84 link (p = 0.0022). Heart and blood-vessel disease accounts for the largest share at -1.15 (p = 0.0066, or 48.4% of the yearly link).',
        '<strong>Where Results Come From:</strong> All estimates and test scores come from CAPHE\'s 57-county Local Health Authority study files and methodology notes.'
      ]
    },
    synthesis: {
      title: 'Why Testing Crisis Aid Apart From Regular Budgets Makes Links Clear',
      p1: 'County health spending rises after large death increases during emergencies, yet is linked to lower death rates in regular years. From 2020 to 2023, COVID-19 aid raised county health spending by 64.2%, from $102.75 to $168.70 per person. Funding increased most where pandemic deaths rose most, giving a +2.47 link (p = 0.001). Combining both periods in one 2003-2023 model mixes two opposite patterns. As a result, the combined estimate is close to zero at -0.25 (p = 0.710).',
      p2: 'Analyzing the pre-COVID period (2003-2019, 943 records) on its own gives clear within-county comparisons. Each extra $10 per person links to 2.38 fewer deaths per 100,000 each year. Based on 13-year changes, that link is 4.32 fewer deaths per 100,000 each year (unadjusted p = 0.0052; adj. p = 0.067), alongside 5.31 in an extra check and 5.91 over 16 years. Using the $13.6M federal VSL value, those links imply $420,168 per expected death prevented ($32 per $1) yearly and $231,481 ($59 per $1) over 13 years. Those dollar estimates apply only if spending caused the lower death rates; they are not cash received by counties.'
    },
    methodologyParagraphs: [
      '<strong>Evidence Types (57-County Observed Links &amp; Dollar Values Assuming Cause):</strong> All spending-death estimates come from observed records across 57 California counties without random assignment of spending. Those estimates include +2.47 in 2020&ndash;2023, -0.25 across 2003&ndash;2023, -2.38 yearly in 2003&ndash;2019, -2.62 in 2003&ndash;2016, -2.59 in urban counties, and -2.42 in smaller counties. Multi-year estimates are -4.32 over 13 years (unadjusted p = 0.0052, adjusted p = 0.067), -5.91 over 16 years, and -5.31 in the Lewbel two-stage check (F = 111.20, J-test p = 0.2132). Dollar figures ($420,168, $231,481, and $188,324 per expected death prevented, or $32, $59, and $72 per $1) are illustrative valuations conditional on a causal interpretation at the $13.6M federal value.',
      '<strong>Primary Sources:</strong> <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), Economics &amp; Human Biology, 13, 34&ndash;45</a>. <a href="https://doi.org/10.2105/AJPH.2016.303233" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2016), American Journal of Public Health, 106(8), 1477&ndash;1482</a>. <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES, 30(1), 67&ndash;80</a>. <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Reports</a> and <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics Death Records</a>.'
    ],
    faqs: [
      {
        question: 'Why does 2020-2023 show +2.47 more deaths while 2003-2019 spending is linked to 2.38 fewer deaths?',
        answer: 'From 2020 to 2023, state and federal COVID-19 aid raised county health spending by 64.2% ($102.75 to $168.70 per person). Funding rose most in counties with large increases in deaths, which explains why each $10 links to 2.47 more deaths per 100,000 in those years. Combining pandemic years with 2003-2019 gives an estimate near zero and obscures the earlier link with 2.38 fewer deaths.'
      },
      {
        question: 'Why does the 13-year model show 4.32 fewer deaths (p = 0.067 after adjustment) versus 2.38 in 1-year models?',
        answer: 'The yearly model compares changes in spending and death rates inside each county from one year to the next (-2.38 per $10, including -1.15 from heart and blood-vessel disease, or 48.4%). The 13-year model compares changes over 13 years and estimates -4.32 (unadjusted p = 0.0052, adj. p = 0.067), alongside -5.91 over 16 years. Both models study observed records over different time spans, and neither proves cause and effect on its own.'
      },
      {
        question: 'Is regular county health spending linked to lower death rates in both urban and rural counties?',
        answer: 'Yes, the 2003-2019 county records (943 county-years) show links between higher spending and fewer deaths in both groups. In urban counties above 500,000 residents, each extra $10 per person links to 2.59 fewer deaths per 100,000 (p < 0.0001). In smaller counties at or below 500,000 residents, each $10 links to 2.42 fewer deaths per 100,000 (p = 0.0136).'
      }
    ],
    related: [
      { slug: 'reverse-causation-feedback', title: 'Combining Pandemic Aid With Routine County Health Budgets Mixes Relief Grants With Pre-2020 Links', note: 'Case study separating emergency pandemic aid from pre-2020 county spending links' },
      { slug: 'study-design-ladder', title: 'Planning Outreach, Costing State Laws, and Checking Budgets Each Need a Matched Study Method', note: 'Case study matching linked state records, trend models, county panels, and call trials' },
      { slug: 'sensitivity-analysis-cea', title: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal', note: 'Case study testing conditional $32 yearly and $59 13-year death-risk values across federal tiers' }
    ]
  },

  // =========================================================================
  // MODULE #12: geographic-variables (Track 2, public)
  // =========================================================================
  {
    slug: 'geographic-variables',
    tetsCompanion: [
      {
        visibleLabel: 'Record of Claims About Low-Income Areas With Long Store Trips',
        title: 'The Food Desert Myth: Evidence Beyond Proximity',
        url: 'https://tooearlytosay.com/research/food-security/food-desert-myth/',
        claimCovered: 'USDA low-income, long-trip tract measures; the finding that no tracts met the stated rules and the 4.7x SNAP use comparison are under reconciliation.'
      },
      {
        visibleLabel: 'Statewide Food Access Comparison Record',
        title: 'Food Access Comparison Under Reconciliation',
        url: 'https://tooearlytosay.com/research/food-security/food-access-vulnerability-paradox/',
        claimCovered: 'Statewide comparison across 9,033 tracts (1.03 versus 1.78 miles to stores by tract group); it disagrees with a related page and is under reconciliation.'
      },
      {
        visibleLabel: 'Statewide Limited-Transit Area Estimate Record',
        title: 'Mobility Deserts: Transit Proximity Under Review',
        url: 'https://tooearlytosay.com/research/transit-equity/hidden-mobility-deserts/',
        claimCovered: 'Article-reported finding that 12% of 9,039 state tracts have limited transit access; the stop list (64,060 raw versus about 24,000 distinct records) is under reconciliation.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Tract Poverty vs. Store Distance',
    pageTitle: 'Tract Poverty vs. Store Miles in Food Scores | CAPHE',
    metaDescription: 'Across 408 Santa Clara census tracts, poverty accounts for 62.2% of food-need score differences, while store distance adds 0.003 pp (p = 0.827).',
    h1: 'Tract Poverty Explains Most of Santa Clara\'s Food-Need Score Compared With Store Miles',
    subtitle: 'Comparing how tract poverty and SNAP store miles relate to food-need scores in four counties.',
    endnotes: [
      '<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau</a>: Five-year survey tract data on poverty, SNAP use, and car access (408 Santa Clara, 225 Fresno, and 26 Nevada County tracts).',
      '<a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: SNAP store locations checked for map accuracy (514 Santa Clara SNAP stores).',
      '<a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Economic Research Service (ERS)</a>: Food Access Research Atlas low-income and long-distance tract rules (1 mile in cities and 10 miles in rural areas).'
    ],
    policySettingHtml: 'County food teams map census tracts, which are small Census areas. Those maps help place Supplemental Nutrition Assistance Program (SNAP) staff, mobile markets, and delivery routes. Checking tracts by store miles alone treats every long drive the same. Some high-pay foothill suburbs have high car ownership and zoning that limits shops. Meanwhile, low-pay city renters often live near food stores they still cannot afford. Combining tract poverty with store distance separates trouble paying for food from long rural trips.',
    answerHtml: 'In Santa Clara County, poverty accounts for far more food-need score differences than store miles across <strong>408 census tracts</strong> [1,2]. The five-part score weights poverty (30%), SNAP use (25%), store distance (20%), homes without cars (15%), and low density (10%) [1,2]. Adding poverty to distance explains <strong>58.1 pp</strong> (percentage points) more score differences (<strong>62.2%</strong> total, <strong>60.6%</strong> partial) [1]. County median pay is 532% of four-person Federal Poverty Level (FPL) [1]. After poverty is included, SNAP store distance adds <strong>0.003 pp</strong> (<em>p</em> = <strong>0.827</strong>, no clear link) [1,2]. In fact, <strong>93.4%</strong> of tract centers are within 1 mile of a store [1,2]. Of 27 tracts past 1 mile, 26 have under 20% poverty [1,2]. Only 1 tract (<strong>1.218 miles</strong>, <strong>3,252 residents</strong>) meets both study rules [1,2]. By contrast, U.S. Department of Agriculture (USDA) rules cover <strong>30 of 225</strong> Fresno tracts (<strong>13.3%</strong>, up to <strong>15.53 mi</strong>), and Nevada County trips average <strong>2.92 mi</strong> (<strong>12.43 mi</strong> max) [1,3].',
    block2: {
      title: 'Poverty Rate vs. Store Distance in the Five-Part Food-Need Score (408 Tracts)',
      contextTag: 'What Accounts for Differences in the Combined Food-Need Score (408 Tracts)',
      ariaLabel: 'Comparison of score differences accounted for by poverty at 62.2% versus store distance at 0.003 pp after including poverty',
      ruler1: {
        title: 'Tract Poverty Rate (30% Score Weight)',
        stat: '62.2% of Score Differences (+58.1 pp Added)',
        ariaLabel: 'Household poverty accounts for 62.2% of combined score differences',
        segments: [
          { cls: 'seg-primary', width: 62, label: 'Poverty: 62.2% (+58.1 pp Added)' },
          { cls: 'seg-rest', width: 38, label: 'Remaining Share (37.8%)' }
        ],
        desc: 'Tract poverty accounts for 62.2% of differences in the five-part food-need score.'
      },
      ruler2: {
        title: 'Store Distance (After Including Poverty)',
        stat: '+0.003 pp Added (p = 0.827)',
        ariaLabel: 'After including poverty, store distance adds 0.003 percentage points',
        segments: [
          { cls: 'seg-Housing', width: 4, label: '4.1% Alone' },
          { cls: 'seg-rest', width: 96, label: '+0.003 pp Added (p = 0.827)' }
        ],
        desc: 'After poverty is included, store miles add 0.003 pp to explained score differences (p = 0.827).'
      }
    },
    table1: {
      title: 'Table 1. Store Miles, Tract Poverty, and Food-Need Score Differences in Four Areas',
      subtitle: 'Checking SNAP store miles, tract poverty, car access, and score gaps in four areas.',
      caption: 'Table 1: Compare store distances, poverty, SNAP use, car access, and how poverty and distance relate to the combined food-need score in four California settings.',
      cornerLabel: 'Tract &amp; Score Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Tract Comparisons &amp; What Accounts for Score Differences):</strong> Tract data combine 2019&ndash;2023 Census survey tables with location-checked USDA SNAP store lists across Santa Clara County (408 tracts, 514 SNAP stores, 755 permitted grocers), Fresno County (225 tracts), and Nevada County (26 tracts). In Santa Clara County, the model studies a five-part food-need score on a 0 to 1 scale. It gives 30% weight to poverty, 25% to SNAP use, 20% to scaled store distance, 15% to homes without cars, and 10% to low density (fewer people per square mile). The full model explains 62.17% of score differences. Poverty alone explains 62.17%. Distance alone explains 4.11%, with longer trips linked to lower scores because distant tracts are mostly low-poverty hills. Adding poverty to distance adds 58.06 pp (58.1 pp), while adding distance to poverty adds 0.0033 pp (0.003 pp). Of the remaining differences, poverty explains 60.55% (60.6%) and distance explains 0.0088% (0.009%). On a shared scale, the poverty link is +0.787 (p &lt; 0.0001) and distance is -0.006 (p = 0.827). Input overlap is low, with a variance inflation factor of 1.59.',
      columns: [
        { tag: 'Setting 1: Meets Both Rules', tagHighlight: true, title: 'Mountain View Tract 5116.08', subtitle: 'Tract 5116.08 is the only one of 408 Santa Clara tracts with 20%+ poverty and &gt;1 mile to a SNAP store (3,252 residents).' },
        { tag: 'Setting 2: Foothill Tracts', tagHighlight: false, title: 'Low-Poverty Foothill Tracts', subtitle: 'Tract 5073.02 in the Saratoga hills; 26 of 27 county tracts &gt;1 mile from a SNAP store have under 20% poverty.' },
        { tag: 'Setting 3: Countywide Score', tagHighlight: false, title: 'Santa Clara Countywide', subtitle: 'All 408 census tracts across 514 confirmed SNAP stores and 755 permitted grocers.' },
        { tag: 'Setting 4: Valley &amp; Rural', tagHighlight: true, title: 'Fresno &amp; Nevada Counties', subtitle: 'Fresno County (225 tracts) and rural Nevada County in the Sierra foothills (26 tracts).' }
      ],
      rows: [
        {
          label: 'Distance to Confirmed SNAP Store',
          cells: [
            { val: '1.218 miles (&gt;1.0 mi city rule)' },
            { val: '2.970 miles (low-density foothills)' },
            { val: '0.573 mi mean (0.409 mi median)' },
            { val: 'Nevada 2.92 mi | Fresno 1.45 mi' }
          ]
        },
        {
          label: 'Tract Poverty &amp; Income Context',
          cells: [
            { val: '22.1% poverty (&ge;20% rule)' },
            { val: '3.7% poverty (2,640 residents)' },
            { val: '532% FPL county median pay' },
            { val: 'Fresno 19.1% poverty | Nevada 10.5%' }
          ]
        },
        {
          label: 'CalFresh Use &amp; Car Access',
          cells: [
            { val: '5.3% SNAP | 4.8% no car (52 homes)' },
            { val: 'Low SNAP | High car ownership' },
            { val: '5.5% SNAP | 93.4% &le;1 mi (381/408)' },
            { val: '30 of 225 Fresno tracts low-access' }
          ]
        },
        {
          label: 'Distance Rule Pattern',
          cells: [
            { val: 'Only 1 of 408 tracts (3,252 residents)' },
            { val: '26 of 27 &gt;1 mi tracts &lt;20% poverty' },
            { val: '4.1% alone (longer trip, lower score)' },
            { val: 'Longest: 12.43 mi (Nev) / 15.53 mi (Fre)' }
          ]
        },
        {
          label: 'Share of Score Differences Explained',
          highlight: true,
          cells: [
            { val: '+58.1 pp from poverty (60.6% partial)', barWidth: 93, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '+0.003 pp from distance (0.009% partial)', barWidth: 1, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: 'Poverty link 132x larger on shared scale', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '13.3% Fresno USDA low-access tracts', barWidth: 13, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Link Size on Shared Scale',
          cells: [
            { val: '+0.787 poverty link on shared scale' },
            { val: '-0.006 distance link (p = 0.827)' },
            { val: '62.2% full-model score differences' },
            { val: 'Nevada median trip 1.98 miles' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Choosing Food Aid and Mobile Markets for City and Rural Areas',
      subtitle: 'Matching food aid in dense suburbs and mobile market routes in rural counties to tract data.',
      caption: 'Table 2: Compare area traits, tract findings, what distance-only checks leave out, and how counties can choose where to offer aid.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Area &amp; Store Layout',
          cells: [
            { val: 'In this Mountain View tract near Shoreline Park, 84.8% of homes rent and 95.2% have a car.' },
            { val: 'Large-lot Saratoga and Los Altos Hills foothill tracts where zoning limits rows of shops.' },
            { val: 'Store-dense urban county where centers of 381 of 408 tracts (93.4%) are within 1.0 mile of a SNAP store.' },
            { val: 'Farming Fresno County (30 of 225 low-income, long-trip tracts) and rural Nevada County (2.92 mi mean trip).' }
          ]
        },
        {
          label: 'What Tract Data Show',
          cells: [
            { val: 'Meets this study\'s 20% poverty and 1-mile SNAP rules (1.218 miles, 22.1% poverty, 3,252 residents; 5.3% SNAP).' },
            { val: 'Low-poverty hills make up 26 of 27 tracts past 1.0 mile, linking longer trips with lower poverty.' },
            { val: 'Poverty accounts for 62.2% of score differences (+58.1 pp added); distance adds +0.003 pp (p = 0.827).' },
            { val: 'Store trips up to 15.53 miles in Fresno and 12.43 miles in Nevada occur alongside low pay.' }
          ]
        },
        {
          label: 'Error of Distance-Only Checks',
          cells: [
            { val: 'The 1-mile rule finds 27 tracts and 1 meets the poverty rule, leaving out high-need city renter tracts.' },
            { val: 'Sending mobile food vans to all >1-mile tracts without checking poverty sends service to 26 low-poverty hill tracts.' },
            { val: 'Treating a comparison of score differences as a test of opening a new store overstates cause.' },
            { val: 'Using suburban store rules in valley or mountain counties misses store trips of 12 to 15 miles.' }
          ]
        },
        {
          label: 'Recommended County Rule',
          policyFit: true,
          cells: [
            { headline: 'Check Cars &amp; SNAP Use Too', detail: 'Review homes without cars (52 homes) and low CalFresh use (5.3%) before choosing sites for fixed pantries.' },
            { headline: 'Require 20%+ Tract Poverty', detail: 'Filter >1-mile tract lists by 20%+ poverty and car access so foothill zoning does not misdirect vans.' },
            { headline: 'Prioritize Food Aid in Cities', detail: 'Focus city outreach on CalFresh sign-up help and post-rent food money in high-poverty tracts.' },
            { headline: 'Send Vans to Long-Trip Areas', detail: 'Send mobile markets and Electronic Benefit Transfer (EBT) delivery where residents have long trips and high poverty.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Score Weights, Added Information Measures &amp; Data Sources',
      notesBullets: [
        '<strong>Score Weights &amp; Descriptive Scope (408 Santa Clara Tracts):</strong> The model studies the five-part Extended Vulnerability Index on a 0 to 1 scale. Its weights are 30% poverty, 25% SNAP use, 20% scaled distance to 514 SNAP stores, 15% homes without cars, and 10% low density. Because poverty and distance are parts of the score, the model (R&sup2; = 0.6217) describes differences in current scores rather than estimating what opening a store would cause. On a shared scale, the poverty link is +0.787 (p &lt; 0.0001) and distance is -0.006 (p = 0.827). Error checks allow unequal error spread (HC3, F = 80.24, overlap score = 1.59). Adding poverty adds 58.06 pp (58.1 pp) and distance adds 0.0033 pp (0.003 pp), while partial shares are 60.55% (60.6%) versus 0.0088% (0.009%).',
        '<strong>Data Sources:</strong> Tract and county numbers come from CAPHE\'s Food Security study outputs for Santa Clara, Fresno, and Nevada counties.'
      ]
    },
    synthesis: {
      title: 'How Food-Need Scores Help Counties Choose Food Benefits or Store Access',
      p1: 'Measuring miles to the nearest grocer without checking pay misreads suburbs where hillside zoning limits shops. Across Santa Clara\'s 408 tracts and 514 SNAP stores, 93.4% of tracts (381) have centers within 1.0 mile of a store. The county mean trip is 0.573 miles. Of the 27 tracts past 1.0 mile, 26 are foothill tracts with under 20% poverty, such as Tract 5073.02 (2.970 miles, 3.7% poverty). This study checks for both 20%+ poverty and >1.0 mile from a tract center to a SNAP store. Only Tract 5116.08 (1.218 miles, 22.1% poverty, 3,252 residents) meets both rules.',
      p2: 'Checking the five-part score shows that poverty accounts for 62.2% of score differences (+58.1 pp added, 60.6% partial). After poverty is included, store miles add just +0.003 pp (p = 0.827). Poverty and distance are both parts of that score. So this comparison describes current need rather than testing a new store. These findings support CalFresh sign-up help and post-rent food money in dense suburbs. Mobile markets and EBT delivery instead fit rural counties like Fresno (30 of 225 tracts meeting USDA rules, 13.3%, up to 15.53 mi) and Nevada (2.92 mi mean, 12.43 mi max).'
    },
    methodologyParagraphs: [
      '<strong>Sources for Observed Tract Data and Score Comparisons:</strong> All model numbers across 408 Santa Clara tracts come from observed tract records. The full model explains 62.17% of score differences (poverty alone 62.17%, distance alone 4.11%). Added share is 58.06 pp for poverty versus 0.0033 pp for distance, and partial share is 60.55% versus 0.0088%. Shared-scale links are +0.7870 versus -0.0059 (p = 0.827, F = 80.24, overlap score = 1.59). In Fresno County, 30 of 225 tracts (13.3%) meet USDA rules, with a 1.45-mile mean and 15.53-mile max. In Nevada County (26 tracts), trips average 2.92 miles, with a 1.98-mile median and 12.43-mile max. Related TooEarlyToSay pages whose conflicting results are still being checked are not used for claims or rules on this page.',
      '<strong>Primary Sources:</strong> <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Tract Estimates</a>. <a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FNS SNAP Retailer Locator</a>. <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA ERS Food Access Research Atlas</a>.'
    ],
    faqs: [
      {
        question: 'Why does store distance explain 4.1% of score differences alone but add only 0.003 pp (p = 0.827) after poverty is included?',
        answer: 'In Santa Clara County, 26 of the 27 tracts more than 1.0 mile from a SNAP store are in low-poverty hills. In the distance-only model, longer store trips link with lower food-need scores (4.1% of differences) because high-pay hillside zoning limits shops. Once tract poverty is included, store miles add just +0.003 pp of explained differences (0.009% partial, p = 0.827).'
      },
      {
        question: 'Why do the two measures of poverty\'s added information give 58.1 pp and 60.6%?',
        answer: 'Both numbers show how much score difference poverty explains beyond store distance, using two totals. The full model explains 62.17% and distance alone explains 4.11%, so subtracting gives 58.06 pp (58.1 pp), called unique R-squared gain. Distance alone leaves 95.89% unexplained, and dividing 58.06 pp by 95.89% gives 60.55% (60.6%), called partial R-squared.'
      },
      {
        question: 'How do USDA low-income and low-access rules differ from this study\'s rules that identify 1 of 408 Santa Clara tracts?',
        answer: 'The USDA Food Access Research Atlas marks low-income tracts by 20%+ poverty. Tracts also qualify if median family pay is at or below 80% of state or metro medians. At least 500 people or one-third must also live past 1 mile in cities (10 miles rural) from a large grocer. Under USDA rules, 15 of 408 Santa Clara tracts and 30 of 225 Fresno tracts (13.3%) qualify. This study\'s separate SNAP rules require both 20%+ poverty and a tract center past 1.0 mile from 514 SNAP stores. Only Tract 5116.08 (1.218 miles, 22.1% poverty, 3,252 residents) meets both rules.'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Subtracting Local Rent From Pay Shows High Food Costs Above Poverty Limits', note: 'Case study comparing pre-rent income limits against post-rent food cost shares' },
      { slug: 'threat-measurement-instrumentation', title: 'Changes in Data Counting Rules Change Food-Access Scores Even When Store Counts Stay the Same', note: 'Case study showing how SNAP EBT checks and permit record merging change tract measures' },
      { slug: 'food-insecurity-diabetes', title: 'High Rent and Local Poverty Explain Food Need and Diabetes Rates Better Than Store Miles', note: 'Case study pairing post-rent food budgets with neighborhood poverty and chronic-care needs' }
    ]
  },

  // =========================================================================
  // MODULE #14: identical-data-opposite-policies (Track 2, community)
  // =========================================================================
  {
    slug: 'identical-data-opposite-policies',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide Analysis of Community Health Worker Pay',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,039 census tracts, a fixed $31.74 Medi-Cal fee schedule covers 3.2% to 8.9% of estimated field worker costs.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Clinic Operating Costs vs. Local Hardship',
    pageTitle: 'City Clinic Costs vs. Inland Need in Medi-Cal | CAPHE',
    metaDescription: 'Compare Medi-Cal visit fees with clinic cost scores (1.506 in San Francisco vs. 0.900 in Imperial) and local poverty across California.',
    h1: 'Fixed Medi-Cal Visit Fees Do Not Meet City Clinic Costs While Poor Inland Areas Lack Care',
    subtitle: 'Using clinic wage and rent scores to set fees and local poverty ranks to direct grants.',
    endnotes: [
      '<a href="https://www.cms.gov/medicare/payment/fee-schedules/physician" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Centers for Medicare &amp; Medicaid Services (CMS)</a>: 2026 doctor fee rule clinic operating-cost score (GPCI), with CAPHE three-part shares (55.6% wages, 29.7% office rent, 14.7% bought services).',
      '<a href="https://www.neighborhoodatlas.medicine.wisc.edu/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">University of Wisconsin School of Medicine and Public Health</a>: Area Deprivation Index (ADI) hardship ranks and <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Data</a>.',
      '<a href="https://www.macpac.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Medicaid and CHIP Payment and Access Commission (MACPAC, Jan 2025) &amp; Dunn et al.</a>: National Medicaid claim loss from denials and billing work (17.6% vs. 4.7% Medicare and 2.4% private) and <a href="https://doi.org/10.1056/NEJMsa1413299" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Polsky et al. (2015), <em>NEJM</em>, 372(6), 537&ndash;545</a> (10-state fee increase study).'
    ],
    policySettingHtml: 'Medi-Cal\'s fee-for-service system pays a set fee per visit. It pays the same rate from San Francisco to Imperial County. Medi-Cal managed-care plans use doctor networks and set separate rates, yet state fees still guide pay. In state hearings, city clinics cite a clinic cost score from the Centers for Medicare &amp; Medicaid Services (CMS). Inland groups cite the Area Deprivation Index (ADI), which ranks hardship by pay, schooling, work, and housing. Using one score alone misses either clinic costs or residents\' needs.',
    answerHtml: 'In these four areas, higher clinic-cost scores occur with lower hardship ranks. Lower cost scores occur with higher hardship ranks [1,2]. CAPHE\'s three-part CMS Geographic Practice Cost Index (GPCI) split weights staff wages (<strong>55.6%</strong>), rent (<strong>29.7%</strong>), and services (<strong>14.7%</strong>) [1]. San Francisco\'s clinic cost score is <strong>1.506</strong> (<strong>50.6%</strong> above 1.00), while Imperial is <strong>0.900</strong> (<strong>10.0%</strong> below) [1]. By contrast, ADI hardship places Imperial and Fresno Tract 2 (<strong>$3,103</strong> pay, <strong>$1,007</strong> rent) at the <strong>85th</strong> percentile [2]. San Francisco is at the <strong>15th</strong> percentile, and Santa Clara medians are <strong>$13,306</strong> pay and <strong>$2,814</strong> rent [2]. In Marin Tract 1122.03, <strong>$2,318</strong> rent equals <strong>42.1%</strong> of <strong>$5,507</strong> pay [2]. Raising Medicaid fees to Medicare levels raised visit access from <strong>58.7%</strong> to <strong>66.4%</strong> [3]. Meanwhile, Medicaid billing work loses <strong>17.6%</strong> of claim value, so pairing city fee rules with inland grants meets both needs [1,3].',
    block2: {
      title: 'Clinic Operating-Cost Index vs. Residents\' Hardship Rank',
      contextTag: 'Federal Cost Scores and Hardship Ranks Across Four California Areas',
      ariaLabel: 'Comparison of CMS clinic operating-cost index (1.506 in San Francisco vs 0.900 in Imperial) versus Area Deprivation Index (15th percentile in San Francisco vs 85th percentile in Imperial)',
      ruler1: {
        title: 'CMS Clinic Operating-Cost Index (2026)',
        stat: '1.506 in SF (+50.6%) vs. 0.900 in Imperial (-10.0%)',
        ariaLabel: 'CMS clinic cost index is 1.506 in San Francisco versus 0.900 in Imperial County',
        segments: [
          { cls: 'seg-Housing', width: 63, label: 'San Francisco GPCI: 1.506' },
          { cls: 'seg-primary', width: 37, label: 'Imperial GPCI: 0.900' }
        ],
        desc: 'San Francisco\'s clinic cost index is about 1.67 times as high as Imperial County\'s.'
      },
      ruler2: {
        title: 'Residents\' Hardship Rank',
        stat: '85th Percentile in Imperial vs. 15th in SF',
        ariaLabel: 'Area Deprivation Index ranks Imperial County at the 85th percentile versus the 15th percentile in San Francisco',
        segments: [
          { cls: 'seg-food', width: 85, label: 'Imperial & Fresno Hardship: 85th Percentile' },
          { cls: 'seg-Housing', width: 15, label: 'SF: 15th' }
        ],
        desc: 'Hardship ranks Imperial at the 85th percentile versus the 15th in San Francisco.'
      }
    },
    table1: {
      title: 'Table 1. Clinic Wage and Rent Costs vs. Local Poverty in Four Areas',
      subtitle: 'Checking CMS clinic cost scores, Census rents and pay, hardship ranks, and claim value lost to denials.',
      caption: 'Table 1: Compare clinic operating costs, household rent and pay, hardship ranks, national billing losses, and appointment gains from a 10-state fee increase study.',
      cornerLabel: 'Area &amp; Cost Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Federal Cost Scores, Census Medians &amp; Study Results):</strong> Clinic cost scores come from the 2026 CMS doctor fee rule Practice Expense GPCI (1.00 is the national reference). Three CMS cost shares are 19.15% staff wages, 10.22% office rent, and 5.07% bought services, which total 34.44%. Dividing each by 34.44% converts those three shares to 100%: 55.6% wages, 29.7% rent, and 14.7% services. Monthly pay across all homes (<code>B19013</code>) and rent for rented homes (<code>B25064</code>) come from 2019&ndash;2023 Census data. Hardship ranks come from the Area Deprivation Index (ADI), where higher percentiles mean greater hardship. National claim loss from denials and billing work comes from Dunn et al. / MACPAC (Jan 2025: 17.6% Medicaid vs. 4.7% Medicare and 2.4% private). Appointment gains come from Polsky et al. (2015, <em>NEJM</em>: 58.7% to 66.4%, +7.7 pp).',
      columns: [
        { tag: 'Area 1: High-Cost City', tagHighlight: true, title: 'San Francisco &amp; Bay Area', subtitle: 'Clinic cost score is for CMS Locality 05 (San Francisco); Census pay and rent are for Santa Clara County.' },
        { tag: 'Area 2: Renter Tract', tagHighlight: false, title: 'Marin Canal Tract 1122.03', subtitle: 'San Rafael Canal tract 1122.03 in Marin County.' },
        { tag: 'Area 3: Rural Sierra', tagHighlight: false, title: 'Nevada County Foothills', subtitle: 'Nevada County rural health area in the Sierra foothills.' },
        { tag: 'Area 4: High-Need Inland', tagHighlight: true, title: 'Fresno &amp; Imperial Counties', subtitle: 'Central Fresno Tract 2 and Imperial County border area.' }
      ],
      rows: [
        {
          label: 'Clinic Cost Index (GPCI; 1.00 = US Ref)',
          highlight: true,
          cells: [
            { val: '1.506 (+50.6% vs US ref)', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '1.380 (+38.0% coastal city)', barWidth: 92, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '1.025 (+2.5% rural Sierra)', barWidth: 68, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.900 (-10.0% Imperial)', barWidth: 60, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Median Rent &amp; Share of Income',
          cells: [
            { val: '21.1% ($2,814)' },
            { val: '42.1% ($2,318)' },
            { val: '23.1% ($1,635)' },
            { val: '32.5% ($1,007)' }
          ]
        },
        {
          label: 'Median Monthly Household Income',
          cells: [
            { val: '$13,306' },
            { val: '$5,507' },
            { val: '$7,075' },
            { val: '$3,103' }
          ]
        },
        {
          label: 'Residents\' Hardship Rank (ADI)',
          highlight: true,
          cells: [
            { val: '15th percentile (lower hardship)', barWidth: 18, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '45th percentile (renter tract)', barWidth: 53, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '55th percentile (wide rural area)', barWidth: 65, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '85th percentile (high poverty)', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'National Billing Loss Study*',
          modeled: true,
          cells: [
            { val: '17.6% Medicaid vs. 2.4% private (US)' },
            { val: '17.6% Medicaid vs. 4.7% Medicare (US)' },
            { val: '17.6% national Medicaid billing loss' },
            { val: '17.6% national Medicaid billing loss' }
          ]
        },
        {
          label: 'Separate 10-State Fee Increase Study*',
          modeled: true,
          cells: [
            { val: '+1.25 pp per 10% real fee increase (Polsky)' },
            { val: '58.7% to 66.4% (+7.7 pp 10-state avg)' },
            { val: '58.7% 10-state starting visit rate' },
            { val: '66.4% 10-state rate after fee increase' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Adjusting Fees for Clinic Costs and Giving Grants to High-Need Areas',
      subtitle: 'Setting city fees by clinic wage and rent costs and funding grants in poor counties.',
      caption: 'Table 2: Compare local problems getting care in four areas, why one measure is not enough, and how fee adjustments and grants address both needs.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Main Problem Getting Care',
          cells: [
            { val: 'At a 1.506 cost score ($2,814 Santa Clara median rent), the same fee buys about one-third less care than at 1.00.' },
            { val: 'Clinics in Marin Tract 1122.03 ($5,507 median pay, $2,318 rent or 42.1%, 45th ADI percentile) have a 1.380 cost score.' },
            { val: 'Near-average clinic costs (1.025 score, $1,635 rent, $7,075 pay) combine with small rural patient counts.' },
            { val: 'Residents rank at the 85th hardship percentile ($3,103 pay and $1,007 rent in Fresno Tract 2; 0.900 Imperial score).' }
          ]
        },
        {
          label: 'Why Fixed Fees &amp; Billing Loss Reduce Care',
          cells: [
            { val: 'High clinic costs (+50.6%) plus 17.6% national Medicaid billing loss (vs. 2.4% private) reduce net doctor pay.' },
            { val: 'Marin County\'s median pay does not show the pay and rent costs of renters in Tract 1122.03 (45th ADI percentile).' },
            { val: 'Small rural offices have too few staff to handle repeated claim denials and re-bills (17.6% Medicaid loss).' },
            { val: 'Lower office rent (0.900 score) does not solve high local poverty and too few doctors.' }
          ]
        },
        {
          label: 'Problem With Using One Measure',
          cells: [
            { val: 'Assigning funds by county hardship alone (15th percentile) leaves high-rent city clinics short on wages and rent.' },
            { val: 'Using countywide median pay misses high-rent tracts like Marin Canal ($5,507 pay, 42.1% rent share).' },
            { val: 'Adjusting fees for city costs alone does not solve small rural patient counts that need a minimum payment.' },
            { val: 'Lowering inland Medi-Cal fees with Imperial\'s 0.900 score would cut clinic pay in 85th-percentile hardship areas.' }
          ]
        },
        {
          label: 'Recommended Two-Rule Plan',
          policyFit: true,
          cells: [
            { headline: 'Adjust Fees for Clinic Costs', detail: 'Adjust Medi-Cal visit fees upward with CMS GPCI cost scores in high-rent cities.' },
            { headline: 'Direct Grants by Tract', detail: 'Pair city fee adjustments with tract clinic grants in high-rent working neighborhoods.' },
            { headline: 'Reduce 17.6% Billing Loss', detail: 'Simplify Medi-Cal prior approvals and claims to lower billing loss toward private plan rates (2.4%).' },
            { headline: 'Fund Inland Doctor Grants', detail: 'Send loan repayment aid, medical training slots, and clinic grants to 85th-percentile hardship counties.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Cost Share Math, Billing Loss &amp; Fee Increase Study',
      notesBullets: [
        '<strong>CMS Clinic Cost Score &amp; Three-Part Shares:</strong> In the 2026 CMS doctor fee rule, three local cost parts sum to 34.44%. Staff wages are 19.15% (from federal wage data), office rent is 10.22% (from Census and housing data), and bought services are 5.07%. Dividing each part by 34.44% gives 55.6% wages, 29.7% office rent, and 14.7% bought services. The overall Practice Expense GPCI ranges from 1.506 in San Francisco to 0.900 in Imperial County.',
        '<strong>Billing Loss &amp; Fee Increase Results:</strong> Dunn, Gottlieb, Shapiro, and Sonnenstuhl (cited by MACPAC, Jan 2025) report that Medicaid doctors lose 17.6% of claim value to denials and re-bills. That compares with 4.7% in Medicare and 2.4% in private plans. Polsky et al. (2015, <em>NEJM</em>) studied a 10-state Medicaid primary care fee increase to Medicare levels. Visit openings rose by 7.7 points, from 58.7% to 66.4% (+1.25 pp per 10% real fee increase).'
      ]
    },
    synthesis: {
      title: 'Why Clinic Costs and Local Hardship Need Two Payment Rules',
      p1: 'State Medi-Cal hearings often set coastal clinics against inland groups, yet both cite accurate data. Coastal clinics point to the CMS GPCI cost score. In CAPHE\'s three-part split, wages are 55.6%, rent is 29.7%, and services are 14.7%. That overall score is 1.506 in San Francisco (+50.6% above 1.00), and Santa Clara median rent is $2,814. Rural Nevada County is near 1.00 ($7,075 pay, $1,635 rent, 1.025 score). By contrast, ADI ranks place Imperial and Fresno Tract 2 ($3,103 pay, $1,007 rent) at the 85th hardship percentile. San Francisco ranks at the 15th percentile.',
      p2: 'Using two payment rules matches state policy to each local problem. In a 10-state study, raising Medicaid fees raised visit openings from 58.7% to 66.4% (+7.7 points). Meanwhile, the Medicaid and CHIP Payment and Access Commission (MACPAC) reports a 17.6% Medicaid billing loss. Private plans lose 2.4%. Adjusting city fees for clinic costs and cutting claim denials helps pay urban rent and wages. Keeping the inland fee score at or above 1.00 and funding loan grants helps hire doctors in 85th-percentile counties.'
    },
    methodologyParagraphs: [
      '<strong>Sources for Federal Cost Scores, Census Medians &amp; Study Results:</strong> Each number comes from a published source matching its area and measure. The 2026 CMS Practice Expense GPCI scores are 1.506 in San Francisco, 1.380 in Marin, 1.025 in Nevada County, and 0.900 in Imperial, with three-part shares of 55.6% wages, 29.7% rent, and 14.7% services. Hardship percentiles (15th vs. 85th) come from the Area Deprivation Index. Five-year Census tables (2019&ndash;2023) provide median rents ($2,814, $2,318, $1,635, $1,007) and median pay ($13,306, $5,507, $7,075, $3,103). National billing loss rates (17.6% Medicaid, 4.7% Medicare, 2.4% private) come from MACPAC, and primary care appointment changes (58.7% to 66.4%, +7.7 pp) come from Polsky et al.',
      '<strong>Primary Sources:</strong> <a href="https://www.cms.gov/medicare/payment/fee-schedules/physician" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS CY 2026 Physician Fee Schedule Final Rule</a>. <a href="https://www.macpac.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">MACPAC (Jan 2025) &amp; Dunn, Gottlieb, Shapiro, &amp; Sonnenstuhl</a>. <a href="https://doi.org/10.1056/NEJMsa1413299" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Polsky et al. (2015), NEJM, 372(6), 537&ndash;545</a>. <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Tables (B19013 &amp; B25064)</a>.'
    ],
    faqs: [
      {
        question: 'How are staff wages, office rent, and bought services weighted in CAPHE\'s three-part cost comparison?',
        answer: 'Under the 2026 CMS fee rule, three local cost shares make up 34.44% of the overall index: 19.15% staff wages, 10.22% office rent, and 5.07% bought services. Dividing each share by 34.44% scales those three parts to 100%, giving 55.6% wages, 29.7% rent, and 14.7% services. Separately, the overall clinic cost index is 1.506 in San Francisco and 0.900 in Imperial County.'
      },
      {
        question: 'Why do the CMS GPCI cost index and the ADI hardship index rank counties in opposite order?',
        answer: 'The GPCI measures prices that clinics pay for staff wages and office rent (1.506 in San Francisco vs. 0.900 in Imperial). By contrast, the ADI ranks resident hardship using income, work, schooling, and housing (15th percentile in San Francisco vs. 85th in Imperial). City clinics pay high office rents and staff wages, while inland counties have high poverty and too few doctors.'
      },
      {
        question: 'How much claim value do Medicaid doctors lose to claim denials and billing paperwork?',
        answer: 'National studies cited by MACPAC in 2025 report that Medicaid doctors lose 17.6% of claim value to denials and re-bills. That loss is more than triple Medicare\'s 4.7% billing loss. It is also over seven times the 2.4% loss in private plans.'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Subtracting Local Rent From Pay Shows High Food Costs Above Poverty Limits', note: 'Case study comparing pre-rent and post-rent area estimates across Marin, Fresno, Nevada, and Santa Clara' },
      { slug: 'chw-health-outcomes', title: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs', note: 'Case study showing how fixed $31.74 Medi-Cal CHW fees compare with county wage costs' },
      { slug: 'measurement-error-claims', title: 'Matching Paid Medicaid Claims With Federal and State Ban Lists Finds Providers One List Leaves Out', note: 'Case study examining Medicaid billing claims and state and federal ban lists' }
    ]
  },

  // =========================================================================
  // MODULE #16: threat-measurement-instrumentation (Track 2, community)
  // =========================================================================
  {
    slug: 'threat-measurement-instrumentation',
    tetsCompanion: [
      {
        visibleLabel: 'EBT Store Check Method',
        title: 'The Retail Density Paradox: Why More Stores Mean Worse Data',
        url: 'https://tooearlytosay.com/research/methodology/ebt-verification-methodology/',
        claimCovered: 'Proposed EBT check across 7,023 California food retailers; seven-county counts, matching rules, and the -0.828 correlation are under reconciliation.'
      },
      {
        visibleLabel: 'Record of Claims About Combining Duplicate Transit Stops',
        title: 'Transit Data Quality Under Reconciliation',
        url: 'https://tooearlytosay.com/research/transit-equity/data-quality-49-to-12/',
        claimCovered: 'Article-reported change from 49% to 12% of tracts with limited transport access; the raw and combined stop counts behind it are under reconciliation.'
      },
      {
        visibleLabel: 'Checking Transit Schedule Data in Python',
        title: 'GTFS Validation in Python: An Article-Reported Workflow',
        url: 'https://tooearlytosay.com/research/methodology/gtfs-validation-python/',
        claimCovered: 'Six sets of teaching steps for checking General Transit Feed Specification (GTFS) data; the seven-county, 11-feed route results are article-reported and the scripts are not public.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Data Counting Rules &amp; Changes in How Data Are Counted',
    pageTitle: 'SNAP Grocer Lists vs. Commercial Map Counts | CAPHE',
    metaDescription: 'Switching from 6,613 map food listings to 514 SNAP-confirmed EBT stores nearly doubles measured distance (+97%) without any store closing.',
    h1: 'Changes in Data Counting Rules Change Food-Access Scores Even When Store Counts Stay the Same',
    subtitle: 'Comparing map searches, SNAP store lists, county health permits, and five-year surveys across 408 tracts.',
    endnotes: [
      '<a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: SNAP store list with 514 confirmed Electronic Benefit Transfer (EBT) stores across 408 Santa Clara census tracts.',
      '<a href="https://deh.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Santa Clara County Department of Environmental Health (DEH)</a>: Retail food permit list (8,555 raw records combined into 7,335 sites and 755 classified / 724 confirmed grocers at 97.5% accuracy).',
      '<a href="https://www.cdss.ca.gov/inforesources/research-and-data/calfresh-data-tables" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Social Services (CDSS)</a>: Monthly CalFresh enrollment records compared with <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Data</a>.'
    ],
    policySettingHtml: 'County food reports combine store lists from map companies (via an application programming interface, or API) with health permits. They also use Supplemental Nutrition Assistance Program (SNAP) store lists. Five-year American Community Survey (ACS) tables add data across census tracts, which are small Census areas. Each source counts food stores or homes receiving food aid by its own rule. Map lists include cafes, permit logs list deli counters apart, and five-year surveys average earlier years. When a counting rule changes, numbers shift even when no stores open or close.',
    answerHtml: 'Changing counting rules changes food-access numbers with zero change in actual stores [1,2]. Moving from <strong>6,613</strong> map food listings to <strong>514</strong> SNAP Electronic Benefit Transfer (EBT) stores nearly doubles mean distance [1]. Trips rise from <strong>0.29</strong> to <strong>0.573</strong> miles [1]. Even so, <strong>81.7%</strong> of top-need tracts stay in the highest fifth, and <strong>65.2%</strong> of all 408 tracts keep the same fifth [1,2]. In county Department of Environmental Health (DEH) files, combining <strong>1,220</strong> duplicate counter records (<strong>14.3%</strong> of <strong>8,555</strong>) leaves <strong>7,335</strong> sites [2]. That step finds <strong>755</strong> grocers (including <strong>724</strong> confirmed grocers) at <strong>97.5%</strong> accuracy in a 489-site check [2]. Pairing five-year ACS maps with monthly California Department of Social Services (CDSS) rolls also shows recent changes [3].',
    block2: {
      title: 'Unchecked Map Food Listings vs. Confirmed SNAP EBT Stores (408 Tracts)',
      contextTag: 'Check of Data Counting Rules Across 408 Santa Clara Census Tracts',
      ariaLabel: 'Comparison of 6,613 map food listings giving 0.29 miles average distance versus 514 SNAP-confirmed EBT stores giving 0.573 miles average distance',
      ruler1: {
        title: 'Unchecked Map Search Results (6,613 Food Listings)',
        stat: '0.29 Miles Mean Distance (6,613 Listings)',
        ariaLabel: 'Map search returns 6,613 food businesses with 0.29 miles average distance',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '92.2% Non-EBT Listings' },
          { cls: 'seg-primary', width: 8, label: '514 SNAP' }
        ],
        desc: 'Broad map search categories include cafes and snack shops that cannot take EBT cards.'
      },
      ruler2: {
        title: 'USDA SNAP EBT & Health Permit Check (514 EBT / 755 Permits)',
        stat: '0.573 Miles (+97% Distance; 81.7% Top-Fifth Match)',
        ariaLabel: 'Using 514 SNAP-confirmed EBT stores nearly doubles average distance to 0.573 miles while keeping 81.7% of top-fifth tracts in the top fifth',
        segments: [
          { cls: 'seg-food', width: 82, label: '81.7% Remain in Top Fifth' },
          { cls: 'seg-rest', width: 18, label: '18.3% Move One Group' }
        ],
        desc: 'Using confirmed SNAP stores nearly doubles measured distance, yet 81.7% of top-need tracts stay in the top fifth.'
      }
    },
    table1: {
      title: 'Table 1. Four Data Counting Changes That Shift Measured Food Access',
      subtitle: 'Checking how map search groups, SNAP EBT lists, permit checks, and 5-year surveys change counts.',
      caption: 'Table 1: Compare records before checks, confirmed agency lists, reported changes from counting rules, actual store changes, and ranking checks across four Santa Clara data sources.',
      cornerLabel: 'Data Counting Check',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Check of Data and Counting Rules Across Four Sources):</strong> Each column checks a separate Santa Clara data source on its own total. Column 1 compares map search results: 344 listings under one old group versus 6,613 under several groups. Column 2 checks distances from each center point across 408 census tracts. It compares 6,613 map listings (0.29 mi mean) with 514 USDA SNAP EBT stores (0.573 mi mean). Across five ranked groups, 266 of 408 tracts (65.2%) stay in the same fifth. Also, 400 of 408 (98.0%) stay within one group, and 67 of 82 top tracts (81.7%) stay in the highest fifth. Column 3 combines duplicate Santa Clara DEH food permits. Removing 1,220 duplicate counter rows from 8,555 raw rows leaves 7,335 sites. That finds 755 grocers (724 confirmed) at 97.5% accuracy (477 of 489 checked), versus 987 raw word matches. Column 4 compares five-year Census SNAP homes (28,476 in 2019 vs. 28,880 state records, or -1.4%; 27,068 in 2020, or -4.94%) with monthly CDSS increases (+56% to +71%).',
      columns: [
        { tag: 'Change 1: Map Categories', tagHighlight: false, title: 'Map Search Categories', subtitle: 'Downloaded map search results for Santa Clara food businesses.' },
        { tag: 'Change 2: EBT Filter', tagHighlight: true, title: 'Map List vs. SNAP EBT', subtitle: '408 Santa Clara census tracts.' },
        { tag: 'Change 3: Combine Permits', tagHighlight: true, title: 'County Health Permits', subtitle: '8,555 Santa Clara DEH permit records.' },
        { tag: 'Change 4: Survey Delay', tagHighlight: false, title: '5-Yr ACS vs. State Records', subtitle: 'Census five-year survey period vs. monthly CDSS enrollment records.' }
      ],
      rows: [
        {
          label: 'Records Before Checks',
          cells: [
            { val: '344 listings (one outdated category)' },
            { val: '6,613 food listings (0.29 mi mean)' },
            { val: '8,555 permit records (987 word matches)' },
            { val: '27,068 ACS 2020 homes (-4.94% change)' }
          ]
        },
        {
          label: 'Checked or Confirmed Count',
          cells: [
            { val: '6,613 listings (several categories)' },
            { val: '514 SNAP / 755 DEH (0.573 mi mean)' },
            { val: '7,335 distinct sites (755 / 724 grocers)' },
            { val: '+56% to +71% monthly CDSS vs. 2019' }
          ]
        },
        {
          label: 'Reported Change From Counting Rule',
          highlight: true,
          cells: [
            { val: '+1,822% Change From Search Rule', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '-92.2% Listings | +98% Distance', barWidth: 92, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '-14.3% Duplicate Records (-1,220)', barWidth: 14, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-4.9% 5-Yr ACS vs. +71% State Records', barWidth: 71, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Actual Store or Enrollment Change',
          cells: [
            { val: 'Zero new stores opened (search change)' },
            { val: 'Zero grocers closed (EBT list used)' },
            { val: 'Zero grocers closed (counters combined)' },
            { val: '60-month average made 2020 rise look small' }
          ]
        },
        {
          label: 'Accuracy Checks &amp; Ranking Changes',
          cells: [
            { val: '8.76x above 755 permitted grocers' },
            { val: '81.7% remain in top fifth (67/82)' },
            { val: '97.5% check accuracy (477/489 sample)' },
            { val: 'ACS rose +17.15% from 2022 to 2023' }
          ]
        },
        {
          label: 'Agreement Between Record Lists',
          cells: [
            { val: 'Matched 42.1% of permitted retail sites' },
            { val: '65.2% same fifth | 98.0% within &plusmn;1' },
            { val: 'Left out 35 chain cafes &amp; 3 bars' },
            { val: '2019 check: 28,476 vs. 28,880 (-1.4%)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Data Checks That Keep Counting Changes From Misdirecting Food Grants',
      subtitle: 'Checking map search results, SNAP store lists, county permits, and five-year surveys before changing grant amounts.',
      caption: 'Table 2: Match each counting change with its cause, funding risk, ranking check, and recommended rule for checking data.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Cause of the Counting Change',
          cells: [
            { val: 'A map vendor retired one grocer category, reducing search results to 344 until broader categories returned 6,613 listings.' },
            { val: 'Map categories group coffee shops, diners, and snack shops with grocery stores that accept SNAP EBT cards.' },
            { val: 'County health records issue separate permits for bakery, deli, and meat counters inside one store (1,220 records).' },
            { val: 'The 2020 five-year ACS table combined 48 months from 2016-2019 with 12 months in 2020 when response rates fell.' }
          ]
        },
        {
          label: 'Error if Records Are Used Without Checks',
          cells: [
            { val: 'Comparing two map searches across a category change reports a +1,822% store increase when zero stores opened.' },
            { val: 'Switching a report from map listings to SNAP stores looks like a sudden 98% increase in measured distance.' },
            { val: 'Counting raw permit records (8,555 vs. 7,335 sites) overstates distinct sites by 16.6% (1,220 extra records, or 14.3% of raw records).' },
            { val: 'Using 2020 five-year ACS tables during an emergency mistakes a +56% to +71% CalFresh increase for a -4.94% decline.' }
          ]
        },
        {
          label: 'Why Checked Rankings Change Little',
          cells: [
            { val: 'Checking store counts against county health permits keeps map category changes from changing baseline totals.' },
            { val: 'Poverty (30%) and SNAP use (25%) account for 55% of the score vs. 20% for distance, keeping 81.7% in the top fifth.' },
            { val: 'Combining permits by street address finds 755 classified (724 confirmed) grocers at 97.5% check accuracy.' },
            { val: 'In stable years (2019), five-year ACS matches state records within 1.4% (28,476 vs. 28,880), then rises +17.15% in 2022-23.' }
          ]
        },
        {
          label: 'Recommended Rule for Checking Data',
          policyFit: true,
          cells: [
            { headline: 'Check Map Lists Against Permits', detail: 'Compare map search counts against county health permits before reporting store numbers.' },
            { headline: 'Use Confirmed SNAP EBT Lists', detail: 'Measure food-aid store distance using location-checked SNAP EBT stores (514 in Santa Clara).' },
            { headline: 'Combine Permits by Address', detail: 'Combine deli, meat, and bakery counter records by street address before counting grocers.' },
            { headline: 'Pair 5-Yr ACS With State Records', detail: 'Use five-year ACS for tract benefit shares in stable years and monthly CDSS records in emergencies.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Changes Between Ranked Groups, Duplicate Address Checks &amp; Sources',
      notesBullets: [
        '<strong>Ranked Group Checks &amp; Permit Address Checks (408 Santa Clara Tracts):</strong> The five-part food-need score gives 30% weight to poverty, 25% to SNAP use, and 20% to store distance. It gives 15% to homes without a car and 10% to density. Changing distance from 6,613 map listings (0.29 mi mean) to 514 SNAP EBT stores (0.573 mi mean) keeps 266 of 408 tracts (65.2%) in the same fifth. Across all tracts, 400 of 408 (98.0%) stay within one group, and 67 of 82 top tracts (81.7%) stay in the highest fifth. Combining 8,555 raw Santa Clara DEH permit rows removes 1,220 duplicate counter rows (14.3%). That leaves 7,335 sites and 724 confirmed / 755 classified grocers (97.5% accuracy). Related TooEarlyToSay transit pages still being checked are not used for policy decisions here.',
        '<strong>Data Sources:</strong> All store, permit, and ranking counts come from CAPHE\'s Santa Clara County Food Security check files.'
      ]
    },
    synthesis: {
      title: 'Why Staff Must Check Counting Rules Before Reading Report Changes',
      p1: 'Analysts often combine map lists, SNAP lists, permit logs, and surveys without checking their rules. Yet each source defines a food store or enrolled home in its own way. Replacing one old map search group with several groups raises listings from 344 to 6,613. Using 514 SNAP EBT stores nearly doubles mean distance, from 0.29 to 0.573 miles. Raw DEH permit files also list deli counters apart, adding 1,220 extra rows across 8,555 permits (14.3%). Meanwhile, five-year ACS averages make sudden enrollment rises look smaller, showing -4.94% in 2020 while monthly CDSS rolls rose 56% to 71%.',
      p2: 'Checking sudden report changes against agency records before changing grants prevents funding errors. Combining Santa Clara DEH permits by street address leaves 7,335 sites and 755 classified (724 confirmed) grocers at 97.5% accuracy. Across all 408 tracts, 65.2% stay in the same fifth after switching to EBT stores. Also, 81.7% of top-need tracts stay in the highest fifth. Using confirmed SNAP EBT lists and pairing ACS maps with monthly CDSS rolls keeps funding tied to checked data.'
    },
    methodologyParagraphs: [
      '<strong>Check of Recorded Data Across Lists:</strong> All store and permit counts come from recorded agency and map files: 344 single-category listings, 6,613 multi-category map listings, 514 SNAP-confirmed EBT stores, 8,555 raw DEH permit records, 7,335 distinct sites, 1,220 (14.3%) duplicate counter records, 724 confirmed and 755 classified grocers, 97.5% check accuracy, and a 42.1% map match rate. Distances from tract center points are 0.29 mi versus 0.573 mi, with group changes of 65.2% same fifth, 98.0% within one fifth, and 81.7% top-fifth retention. Survey versus state counts are 28,476 versus 28,880 in 2019 (-1.4%), 27,068 in 2020 (-4.94%), and +17.15% from 2022 to 2023. Related TooEarlyToSay pages still being checked are not used as grounds for policy decisions.',
      '<strong>Primary Sources:</strong> <a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FNS SNAP Retailer Locator</a>. <a href="https://deh.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Santa Clara County DEH Retail Food Facility Registry</a>. <a href="https://www.cdss.ca.gov/inforesources/research-and-data/calfresh-data-tables" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDSS CalFresh Data Tables</a>. <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Data</a>.'
    ],
    faqs: [
      {
        question: 'Why did 81.7% of top-need tracts stay in the top fifth when EBT checks nearly doubled average distance from 0.29 to 0.573 miles?',
        answer: 'In the five-part food-need score, poverty (30%) and SNAP use (25%) account for 55% of the score, while store distance accounts for 20%. Removing cafes and snack shops increased measured distance in higher-income and lower-income tracts alike. As a result, 65.2% of all 408 tracts stayed in the same fifth and 81.7% of top-fifth tracts (67 of 82) remained in that fifth.'
      },
      {
        question: 'Why did the 2020 five-year ACS show a 4.94% SNAP decline while state CalFresh enrollment increased by 56% to 71%?',
        answer: 'Each five-year ACS release combines survey responses collected over 60 months, so four-fifths of the 2020 file came from 2016-2019 before COVID-19. Survey collection in 2020 also had lower response rates among low-income renters. By contrast, monthly CDSS state records counted new CalFresh sign-ups right away.'
      },
      {
        question: 'Why must county health permits be combined by street address before counting grocery stores?',
        answer: 'Santa Clara DEH files hold 8,555 active records because one supermarket often holds separate permits for its main floor, bakery, deli, and meat counter. Combining those 1,220 duplicate records (14.3% of raw records) by address leaves 7,335 distinct sites and 755 classified (724 confirmed) grocers at 97.5% accuracy. That check shows the map list had 6,613 food businesses, 8.76 times the 755 grocers from permit records, because it included non-grocery shops.'
      }
    ],
    related: [
      { slug: 'geographic-variables', title: 'Tract Poverty Explains Most of Santa Clara\'s Food-Need Score Compared With Store Miles', note: 'Case study showing why household poverty accounts for 62.2% of food-need score differences' },
      { slug: 'measurement-error-claims', title: 'Matching Paid Medicaid Claims With Federal and State Ban Lists Finds Providers One List Leaves Out', note: 'Case study on matching provider billing claims across separate ban lists' },
      { slug: 'food-affordability-tradeoffs', title: 'Subtracting Local Rent From Pay Shows High Food Costs Above Poverty Limits', note: 'Case study comparing pre-rent income limits against post-rent food cost shares' }
    ]
  },

  // =========================================================================
  // MODULE #17: study-design-ladder (Track 2, member)
  // =========================================================================
  {
    slug: 'study-design-ladder',
    tier: 'public',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Matching Study Methods to Budget Questions',
    pageTitle: 'Matching Study Methods to Budget Questions | CAPHE',
    metaDescription: 'Match four California health budget questions with suitable methods: linked records and surveys, past trends, county data, and call trials.',
    h1: 'Planning Outreach, Costing State Laws, and Checking Budgets Each Need a Matched Study Method',
    subtitle: 'Matching linked records, trend checks, county data, and call trials to the question each method answers.',
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Services (DHCS)</a>: Medi-Cal enrollment records linked with Census ACS data (255,601 state-recorded adults vs. 152,811 survey adults; 120,239 work-rule adults).',
      '<a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Employment Development Department (EDD)</a>: May 2026 Paid Family Leave fund forecast (325,055 claims in 2025; 330,000 without law change vs. 369,600 modeled with 12-week leave).',
      '<a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California State Controller\'s Office</a>: 57-county health spending data (2003&ndash;2023) and <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014), <em>Economics &amp; Human Biology</em></a>.',
      '<a href="https://www.nber.org/papers/w34191" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">National Bureau of Economic Research (NBER Working Paper 34191)</a>: California Medicaid renewal trial with five groups (82,695 members) and Bronx Community Health Worker referral study (27.8% &times; 69.2% &times; 78.1% = 15.0%).'
    ],
    policySettingHtml: 'No single study method can answer every question about public health budgets. Randomized controlled trials (RCTs) test outreach calls directly. Yet researchers cannot randomly assign a statewide law across counties. They also cannot randomize 20 years of past county budgets. American Community Survey (ACS) counts can miss enrolled adults, and simple before-and-after checks can mistake a past trend for a law\'s effect. Planning Medi-Cal staff, costing Paid Family Leave (PFL), checking county budgets, and testing calls each face different limits. Matching each question to a suitable method avoids starting count and trend errors.',
    answerHtml: 'Matching four state health questions to suitable study methods avoids large starting errors [1,2,3,4]. First, linking Department of Health Care Services (DHCS) records (<strong>255,601</strong> adults) with ACS shares fixes a <strong>40.2%</strong> survey undercount (<strong>152,811</strong> in ACS) [1]. That link finds <strong>120,239</strong> work-rule adults, including 26,515 Limited English Proficient (LEP) adults [1]. Second, an Employment Development Department (EDD) forecast of <strong>330,000</strong> claims without the law adds <strong>+39,600</strong> modeled PFL claims (<strong>369,600</strong> total) [2]. Third, pre-COVID county data link $10 per person with <strong>2.38</strong> fewer deaths per 100,000 yearly [3]. Over 13 years, that observed link is <strong>4.32</strong> fewer deaths (<em>p</em> = 0.067 after multiple-test adjustment, above 0.05) [3]. Fourth, a five-group trial (<strong>82,695</strong> members) shows live calls raise renewals [4]. Separate Community Health Worker (CHW) steps (<strong>27.8%</strong> &times; <strong>69.2%</strong> &times; <strong>78.1%</strong> = <strong>15.0%</strong>) show which steps patients miss [4].',
    block2: {
      title: 'Simple Starting Estimates vs. Matched Study Methods Across Four Decisions',
      contextTag: 'Four Study Methods Across Medi-Cal, Paid Family Leave, County Spending & Call Trials',
      ariaLabel: 'Comparison of simple starting estimate errors versus matched study methods across four California public health budget questions',
      ruler1: {
        title: 'Simple Single-Source Starting Estimates',
        stat: '-40.2% Survey Gap | Earlier Trends | +2.47 Crisis Mix',
        ariaLabel: 'Simple starting estimates produce a 40.2% survey undercount, earlier trend mixing, and a +2.47 emergency aid reversal',
        segments: [
          { cls: 'seg-Housing', width: 40, label: '-40.2% Survey Gap' },
          { cls: 'seg-gross', width: 25, label: 'Earlier Trends' },
          { cls: 'seg-rest', width: 35, label: '+2.47 Crisis Mix' }
        ],
        desc: 'Simple starting counts miss 40.2% of adults, mix in earlier trends, or reverse emergency aid signs (+2.47).'
      },
      ruler2: {
        title: 'Study Methods Chosen for Four Questions',
        stat: '120,239 Adults | +39.6K Claims | 2.38 & 4.32 (adj. p = 0.067) | +8-11% Gain',
        ariaLabel: 'Matched methods estimate 120,239 adults, +39,600 added claims, links of 2.38 to 4.32 fewer deaths (adjusted p = 0.067), and +8-11% live-call renewal gain',
        segments: [
          { cls: 'seg-primary', width: 25, label: 'Linked Data: 120.2K' },
          { cls: 'seg-food', width: 25, label: 'Trend Model: +39.6K' },
          { cls: 'seg-primary', width: 25, label: 'County Data: 2.38 & 4.32 (adj. p = 0.067)' },
          { cls: 'seg-food', width: 25, label: 'Trial: +8-11%' }
        ],
        desc: 'Each budget question pairs with the method that estimates the number needed, keeping 4.32 paired with adj. p = 0.067.'
      }
    },
    table1: {
      title: 'Table 1. Matching Four State Health Budget Questions to Suitable Study Methods',
      subtitle: 'Checking each budget question, raw count flaw, chosen method, and main result in four studies.',
      caption: 'Table 1: Four columns compare linked state records and surveys, claim models with and without a law change, county records over time, and random call trials with referral checks.',
      cornerLabel: 'Study Method',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Separate Groups Studied &amp; How Results Were Produced):</strong> Each column studies a separate California group. Column 1 links observed Santa Clara adult Medi-Cal records with Census data. Column 2 uses a policy model built on EDD claim records and forecasts. Column 3 studies observed 2003&ndash;2023 county records across 57 health offices (+2.47 in 2020&ndash;2023, -2.38 yearly before COVID-19, and -4.32 over 13 years with unadjusted p = 0.0052 and adjusted p = 0.067). An extra Lewbel two-stage check estimates -5.31 (F = 111.20, J-test p = 0.2132). Those scores check method rules rather than proving cause, and federal VSL dollar ratios are illustrative valuations conditional on a causal interpretation. Column 4 reports a Medicaid renewal trial (82,695 members) and a three-step CHW referral study (3,522 patients).',
      columns: [
        { tag: 'Method 1: Counting People', tagHighlight: false, title: 'Linked Records &amp; Survey', subtitle: 'Santa Clara Medi-Cal renewal staffing.' },
        { tag: 'Method 2: Statewide Law', tagHighlight: false, title: 'Model With &amp; Without Law', subtitle: 'California Paid Family Leave (SB 951).' },
        { tag: 'Method 3: County Records', tagHighlight: true, title: 'County Budgets Over Time', subtitle: '57-county public health spending links.' },
        { tag: 'Method 4: Program Test', tagHighlight: true, title: 'Call Trial &amp; Step Checks', subtitle: 'Renewal calls and CHW referral steps.' }
      ],
      rows: [
        {
          label: 'Budget Question',
          cells: [
            { val: 'How many members need bilingual outreach?' },
            { val: 'How many claims will the law add above trend?' },
            { val: 'Do larger regular county budgets link with lower deaths?' },
            { val: 'Which outreach steps raise renewals or care links?' }
          ]
        },
        {
          label: 'Problem With Simple Starting Estimate',
          cells: [
            { val: 'ACS survey misses 40.2% (152,811 vs. 255,601)' },
            { val: 'Before-and-after mixes +1.52% claim &amp; wage growth' },
            { val: 'Including COVID-19 aid reverses sign (+2.47)' },
            { val: '15.0% total rate misses steps 85% did not finish' }
          ]
        },
        {
          label: 'Method Chosen to Answer Question',
          cells: [
            { val: 'Match total to DHCS; apply ACS shares' },
            { val: 'Estimate 330,000 claims before law change' },
            { val: 'Analyze 2003-2019 yearly &amp; 13-yr changes apart' },
            { val: '5-group trial (82,695) + 3-step referral check' }
          ]
        },
        {
          label: 'Main Observed or Modeled Result',
          highlight: true,
          cells: [
            { val: '120,239 Subject to Work Rule (26,515 LEP)', textColor: 'text-[#003080]' },
            { val: '*+39,600 Modeled Claims (369,600 total)', textColor: 'text-[#003080]' },
            { val: '2.38 Yr / 4.32 13-Yr Link (adj. p = 0.067)', textColor: 'text-emerald-800' },
            { val: '+8-11% Live-Call Gain | 78.1% Linked if Reached', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Checks &amp; Smaller Group Results',
          cells: [
            { val: '15,559 Spanish + 7,467 Vietnamese + 3,489 Chinese' },
            { val: '325,055 (2025) &rarr; 330,000 base ($623.7M gross)' },
            { val: 'Urban (-2.59) &amp; Smaller (-2.42); check -5.31' },
            { val: '27.8% started &times; 69.2% reached &times; 78.1% = 15.0%' }
          ]
        },
        {
          label: 'Direct Budget Action',
          cells: [
            { val: 'Staff bilingual helpers for 26,515 adults' },
            { val: 'Estimate +0.04 pp payroll tax (+$60/yr worker)' },
            { val: 'Analyze crisis aid apart ($231K-$420K if causal)' },
            { val: 'Fund live phone calls &amp; starting outreach' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Matching Each Health Program Question to Its Study Method',
      subtitle: 'Matching each stage of health program planning to the study method that fits its data.',
      caption: 'Table 2: Compare when each method applies, what it can show, what goes wrong with another method, and what agencies should do.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'When This Method Applies',
          cells: [
            { val: 'Before launch, when staff must estimate member counts and language needs missing from state records alone.' },
            { val: 'When a statewide leave law starts everywhere on one date, leaving zero counties without the law.' },
            { val: 'When local budgets vary across 57 counties over 20 years and cannot be randomly assigned.' },
            { val: 'When a health plan can randomly assign call scripts across 82,695 members or check referral steps.' }
          ]
        },
        {
          label: 'What the Method Can Show',
          cells: [
            { val: 'Links exact DHCS counts (255,601 adults) with ACS language and work shares to estimate 120,239 adults.' },
            { val: 'Separates regular claim growth (325,055 to 330,000) from the proposed leave expansion (+39,600 claims) and 90% pay rate.' },
            { val: 'Estimates within-county spending links (-2.38 yearly; -4.32 13-yr, adj. p = 0.067) outside emergency aid.' },
            { val: 'Shows text and email wording changes add 0% renewals vs. +8-11% from live calls, and 78.1% CHW care links.' }
          ]
        },
        {
          label: 'Problem With Using Another Method',
          cells: [
            { val: 'Planning staff from raw ACS counts (152,811 vs. 255,601 DHCS) undercounts adult Medi-Cal members by 40.2%.' },
            { val: 'Attributing earlier claim changes (-12.31% in 2025) or routine wage growth to a new law miscalculates reserves.' },
            { val: 'Combining 2020-2023 emergency grants (+2.47) with regular budgets obscures the pre-COVID negative link.' },
            { val: 'Judging CHWs on 15.0% overall completion blames field workers for the low share started by clinics (27.8%).' }
          ]
        },
        {
          label: 'Recommended Agency Action',
          policyFit: true,
          cells: [
            { headline: 'Match Surveys to State Records', detail: 'Use DHCS records for total members and apply ACS survey shares to estimate language staffing.' },
            { headline: 'Estimate Earlier Trends First', detail: 'Model multi-year claim and wage growth before estimating the added cost of a statewide law.' },
            { headline: 'Analyze Periods Apart', detail: 'Analyze crisis aid apart, pair 4.32 with adj. p = 0.067, and mark death-risk values as if causal.' },
            { headline: 'Test Calls &amp; Referral Steps', detail: 'Run random trials on outreach calls and check each referral step before cutting staff.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: How Referral Step Rates Combine &amp; Study Sources',
      notesBullets: [
        '<strong>Three Steps in Community Health Worker Referrals:</strong> In the published Bronx CHW study (3,522 patients, 5,021 referrals), total completion was 15.0%. Outreach started for 27.8% of patients. Staff reached 69.2% of that group (19.2% of all patients). Then 78.1% of reached patients connected with care (0.278 &times; 0.692 &times; 0.781 = 15.0%).',
        '<strong>Where Study Data Come From:</strong> Numbers come from Santa Clara Medi-Cal and Census checks, California\'s Paid Family Leave model, the 57-county health spending study, and NBER Working Paper 34191.'
      ]
    },
    synthesis: {
      title: 'Why Each Health Budget Question Needs a Matched Study Method',
      p1: 'Ranking study methods in general misses a clear rule: the right method depends on the question. Planning Medi-Cal outreach links records to fix the 40.2% ACS undercount (152,811 survey adults vs. 255,601 on DHCS rolls). That step finds 120,239 work-rule adults, including 26,515 with limited English skills. Costing statewide PFL law SB 951 splits regular growth (325,055 to 330,000 claims) from +39,600 modeled claims. Checking county budgets tests COVID-19 aid (+2.47) apart from regular budgets. Regular spending links with 2.38 yearly and 4.32 13-year fewer deaths per 100,000 (adj. p = 0.067). Federal Value of a Statistical Life (VSL) benchmarks imply 32:1 and 59:1. Those ratios apply only if spending caused fewer deaths and are not cash returns.',
      p2: 'Once member counts and budgets are set, trials and step checks guide daily work. In California\'s 82,695-member renewal trial, four text and email groups showed 0% renewal gain. Adding live phone calls raised Medi-Cal renewals by 8% to 11%. Splitting a 15.0% CHW rate into outreach started (27.8%), patients reached (69.2%), and care link (78.1%) also shows which steps patients miss. Field workers link nearly four-fifths of reached patients, so clinics should improve how outreach starts first.'
    },
    methodologyParagraphs: [
      '<strong>Three Studies of Recorded Results &amp; One Policy Model:</strong> Method 1 (255,601 DHCS vs. 152,811 ACS adults = -40.2% undercount; 120,239 work-rule adults) uses observed state and survey records. Method 3 (-2.38 yearly and -4.32 13-year [multiple-testing-adjusted p = 0.067] 57-county death-rate links) uses observed county records. Method 4 uses recorded data from NBER Working Paper 34191 (82,695 members) and the Bronx CHW three-step referral study (27.8% &times; 69.2% &times; 78.1% = 15.0%). Method 2 (325,055 actual 2025 claims, 330,000 forecasted 2026 claims without the change, and 369,600 modeled claims = +39,600, $623.7M gross benefits) is a policy model matched to official California EDD forecasts.',
      '<strong>Primary Sources:</strong> <a href="https://www.nber.org/papers/w34191" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">NBER Working Paper 34191 (California Medicaid Renewal Trial, N = 82,695)</a>. <a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Medi-Cal Enrollment Tables</a>. <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a>. <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014), Economics &amp; Human Biology</a>.'
    ],
    faqs: [
      {
        question: 'Why does the Census ACS undercount Santa Clara County adult Medi-Cal members by 40.2%?',
        answer: 'Survey respondents often report local managed-care plan names as private insurance or leave out other adults in the home. As a result, ACS counts 152,811 adult members versus 255,601 certified adults in DHCS records (-40.2%). Using DHCS records for the total and applying ACS shares estimates language needs and work hours without undercounting members.'
      },
      {
        question: 'What did California\'s 82,695-member renewal trial show about text messages versus live phone calls?',
        answer: 'Across four random groups that varied text and email wording, the study found no increase in Medi-Cal renewals (0%). Only the fifth group, which added live phone navigator calls, raised renewals by 8% to 11% compared with the group without live calls (+1.0 to +1.8 percentage points). Live help resolves problems completing forms that text wording alone cannot fix.'
      },
      {
        question: 'How does checking outreach started (27.8%), contact (69.2%), and care connection (78.1%) help clinics?',
        answer: 'Looking only at the 15.0% overall rate (0.278 &times; 0.692 &times; 0.781) makes CHW outreach appear weak. Checking the three referral steps one by one shows that CHWs connect 78.1% of contacted patients with care. Because the largest loss occurs before clinics start outreach (27.8%), clinics should improve the steps used to start outreach first.'
      }
    ],
    related: [
      { slug: 'medicaid-expansion', title: 'In the Model, Most Medi-Cal Renewal Losses Come From Unreturned Mail Forms Over Work Rules', note: 'Case study separating modeled Santa Clara County mail-form losses from work-rule losses' },
      { slug: 'observational-to-experimental', title: 'Routine County Health Spending Links With Lower Death Rates Outside Pandemic Grant Years', note: 'Case study detailing the 57-county health spending links across yearly and 13-year spans' },
      { slug: 'before-after-trap', title: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time', note: 'Case study on separating earlier trend growth from post-2020 counts' }
    ]
  },

  // =========================================================================
  // MODULE #18: p-hacking-multiple-testing (Track 2, member)
  // =========================================================================
  {
    slug: 'p-hacking-multiple-testing',
    tier: 'public',
    trackEyebrow: 'Track 2: Checking Studies &amp; Measures &middot; Minimum Group Sizes, Multiple Tests &amp; Size of Net Losses',
    pageTitle: 'Minimum Group Sizes & Medi-Cal Loss Rankings | CAPHE',
    metaDescription: 'Compare enrollment losses across 62 Medi-Cal groups in Santa Clara County, and rank groups with 100+ members by losses past the county rate.',
    h1: 'Minimum Group Sizes and Net Member Losses Help Counties Set Medi-Cal Call Lists',
    subtitle: 'Using a 100-member minimum and net losses across 62 Medi-Cal groups to set call lists.',
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Services (DHCS)</a>: Santa Clara County Medi-Cal counts across 62 age, aid, and language groups (June 2025 to June 2026: 472,014 to 411,722 members, net change -60,292 or -12.77%).',
      '<a href="https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Benjamini, Y., &amp; Hochberg, Y. (1995)</a>: False discovery rate method in <em>Journal of the Royal Statistical Society: Series B</em>, 57(1), 289&ndash;300.',
      '<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau</a>: Survey area pair tests using 80 error weights (<code>p = 0.469 to 0.730</code>), with CAPHE 16-delay Holm/FDR (<code>0.0788</code>) and 1,000 random-label (<code>0.593</code> max chance score) checks.'
    ],
    policySettingHtml: 'County Medi-Cal teams check monthly Department of Health Care Services (DHCS) totals across 62 age, aid, and language groups. Sorting all 62 groups by percent loss alone puts very small groups first. A net loss of 13 to 17 members cuts a 50-person group by 25% to 34%. Running dozens of raw 5% tests on survey data can also mark random gaps as real. A 100-member minimum plus losses past the county rate keeps call lists on the largest declines.',
    answerHtml: 'A 100-member minimum limits noisy percent ranks, and losses past the county rate show large drops [1,2]. From June 2025 to June 2026, Medi-Cal counts across 62 DHCS groups fell from <strong>472,014</strong> to <strong>411,722</strong> (<strong>-60,292</strong> net, or <strong>-12.77%</strong>) [1]. Percent rank puts small groups first: Samoan at <strong>-34.04%</strong> (-16), French at <strong>-25.00%</strong> (-14), and Thai at <strong>-20.75%</strong> (-11) [1]. Monthly overlapping totals cannot support a simple exit test [1]. When error is measured, multi-test rules cut false positives in survey areas (p = <strong>0.469 to 0.730</strong>), 16-delay checks (adj. p = <strong>0.0788</strong>), and 1,000 label swaps (<strong>0.593</strong> max chance score) [2,3]. Staff refer groups under 100 members to community-based organizations (CBOs) [1]. Ranking 100+ groups by losses past -12.77% puts Spanish first (<strong>-24,880</strong> net, <strong>41.27%</strong> of county loss, <strong>-7,230</strong> extra) [1]. Overlapping groups ages 19-44 follow (Hispanic <strong>-17,380</strong> or <strong>28.83%</strong>, <strong>-6,344</strong> extra; Men <strong>-15,496</strong>, <strong>-5,697</strong> extra) [1].',
    block2: {
      title: 'Percentage Loss Rank vs. 100-Member Minimum & Excess-Loss Rank (62 Groups)',
      contextTag: 'Reported 62-Group Santa Clara DHCS Medi-Cal Totals (472,014 to 411,722, -12.77%)',
      ariaLabel: 'Comparison of percentage ranking led by Samoan (-34.04%, -16 members) versus 100-member minimum ranking led by Spanish (-24,880 members, 41.27% of county loss)',
      ruler1: {
        title: 'Percentage Loss Rank Without Minimum Size (62 Groups)',
        stat: '1st Samoan -34.04% (-16) | 2nd French -25.00% (-14)',
        ariaLabel: 'Percentage ranking places Samoan and French first despite representing 30 lost members combined',
        segments: [
          { cls: 'seg-Housing', width: 70, label: 'Small Groups First: -34.04% & -25.00%' },
          { cls: 'seg-primary', width: 30, label: '0.05% of Loss' }
        ],
        desc: 'Groups with small starting counts have the largest percentage declines.'
      },
      ruler2: {
        title: 'Minimum Size (100+ Members) + Losses Beyond County Rate',
        stat: 'Spanish -24,880 (-7,230 Extra) | Hispanic 19-44 -17,380 (-6,344 Extra)',
        ariaLabel: 'Applying a 100-member minimum highlights Spanish-speaking members and adults ages 19 to 44',
        segments: [
          { cls: 'seg-food', width: 59, label: 'Spanish: -24,880 (41.27% of Loss)' },
          { cls: 'seg-primary', width: 41, label: 'Hispanic 19-44: -17,380 (28.83%)' }
        ],
        desc: 'A 100-member minimum plus losses beyond the county rate identifies the largest enrollment declines.'
      }
    },
    table1: {
      title: 'Table 1. Comparing 62 Medi-Cal Groups: Small-Group Percentages vs. Large Net Losses',
      subtitle: 'Checking June 2025 to June 2026 county DHCS net losses before and after a 100-member minimum.',
      caption: 'Table 1: Compare the Samoan group, French and Thai groups, Spanish language group, and adult groups ages 19-44 across 62 Santa Clara County Medi-Cal groups.',
      cornerLabel: 'Measure Across 62 Groups',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Reported DHCS Totals &amp; Call Priority Rules):</strong> June 2025 (472,014) and June 2026 (411,722) counts come from Santa Clara DHCS tables. The county net change is -60,292 (-12.773%, rounded to -12.77%). Multiply the June 2025 group count by -0.1277 to get the expected change, then subtract it from actual net change. Monthly tables show net change (entries minus exits). The same person can appear in several tables, and family members often leave together. Thus these totals cannot support a simple test of single-person exits. Other CAPHE studies with error data report survey pair p-values of 0.469 to 0.730, a 16-delay adjusted p of 0.0788, and a 1,000 random-label max score of 0.593.',
      columns: [
        { tag: 'Largest % Decline', tagHighlight: false, title: 'Samoan Language Group', subtitle: '47 to 31 members (-16 net).' },
        { tag: '2nd &amp; 5th % Declines', tagHighlight: false, title: 'French &amp; Thai Groups', subtitle: 'French: 56 to 42 (-14) | Thai: 53 to 42 (-11).' },
        { tag: '41.27% of County Loss', tagHighlight: true, title: 'Spanish Language Group', subtitle: '138,215 to 113,335 members (-24,880 net).' },
        { tag: 'Adults 19-44 With Large Losses', tagHighlight: true, title: 'Hispanic &amp; Men Ages 19-44', subtitle: 'Hispanic 19-44: 86,421 to 69,041 (-17,380) | Men 19-44: -15,496 net.' }
      ],
      rows: [
        {
          label: 'Net Enrollment &amp; Percentage Change',
          cells: [
            { val: '-34.04% (47 to 31; -16 members)' },
            { val: '-25.00% (-14) &amp; -20.75% (-11)' },
            { val: '-18.00% (138,215 to 113,335)' },
            { val: '-20.11% (Hispanic) &amp; -20.19% (Men)' }
          ]
        },
        {
          label: 'Rank by % Loss vs. Number Lost',
          cells: [
            { val: '1st by % loss | 49th by number lost' },
            { val: 'French: 2nd % &amp; 50th | Thai: 5th &amp; 52nd' },
            { val: '11th by % loss | 1st by number lost' },
            { val: 'Hispanic: 6th % &amp; 2nd | Men: 7th &amp; 3rd' }
          ]
        },
        {
          label: 'Number of Members in June 2025',
          modeled: false,
          cells: [
            { val: '47 members (small starting group)' },
            { val: '56 (French) &amp; 53 (Thai) members' },
            { val: '138,215 members (29.3% of county)' },
            { val: '86,421 (Hispanic) &amp; 76,734 (Men)' }
          ]
        },
        {
          label: '100-Member Minimum Size Rule',
          modeled: true,
          cells: [
            { val: 'Under 100 Members (Refer to Partners)', textColor: 'text-amber-900' },
            { val: 'Under 100 Members (Refer to Partners)', textColor: 'text-rose-800' },
            { val: 'At Least 100 Members (Include in Rank)', textColor: 'text-emerald-800' },
            { val: 'At Least 100 Members (Include in Rank)', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Additional Members Lost vs. -12.77%',
          modeled: true,
          cells: [
            { val: '-10 extra (-16 vs. -6.0 at county rate)' },
            { val: '-6.8 (French) &amp; -4.2 (Thai) extra' },
            { val: '-7,230 extra (-24,880 total net loss)' },
            { val: '-6,344 (Hispanic) &amp; -5,697 (Men) extra' }
          ]
        },
        {
          label: 'Share of County Net Loss (-60,292)',
          highlight: true,
          cells: [
            { val: '0.027% of county loss (16 / 60,292)', barWidth: 1, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '0.041% combined (25 / 60,292)', barWidth: 1, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '41.27% of county loss (24,880)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '28.83% (Hispanic) | 25.70% (Men)', barWidth: 70, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Rules That Separate Small-Group Percentages From Large Net Losses',
      subtitle: 'Using a 100-member minimum, losses past the county rate, and multi-test rules when needed.',
      caption: 'Table 2: Compare enrollment changes in four groups, errors in percentage rankings, possible staffing mistakes, and rules for county reports.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Why the Group\'s Enrollment Changed',
          cells: [
            { val: 'In a 47-person group, a net loss of 16 people changes the group rate by -34.04%.' },
            { val: 'In French (56 start, -25.00%) and Thai (53 start, -20.75%), a few people entering or leaving shifts percentages.' },
            { val: 'Among 138,215 Spanish speakers, an 18.00% decline (5.23 points past 12.77%) equals -7,230 extra lost members.' },
            { val: 'Overlapping groups ages 19-44 show -20.11% in Hispanic adults (-17,380) and -20.19% in men (-15,496).' }
          ]
        },
        {
          label: 'Error of Raw Rankings &amp; Tests',
          cells: [
            { val: 'Sorting only by percentage loss puts a 16-person decline ahead of 24,880 lost Spanish speakers.' },
            { val: 'If all 62 tests have no real difference, a 5% rule gives 3.10 false positives on average (95.8% risk if independent).' },
            { val: 'Spanish ranks 11th by percentage loss (-18.00%) behind small groups, yet accounts for 41.27% of county loss.' },
            { val: 'Treating overlapping age, sex, and ethnic groups as separate counts the same members more than once.' }
          ]
        },
        {
          label: 'Possible Staffing Errors Without Rules',
          cells: [
            { val: 'Basing county ads on the largest percentage decline (-34.04%) focuses on under 0.03% of county losses.' },
            { val: 'Moving bilingual call staff after every unadjusted group change reduces staff on high-volume renewal lines.' },
            { val: 'The Spanish group lost 7,230 more members than -12.77% predicts, though totals alone do not measure call effects.' },
            { val: 'Checking only language rows misses overlapping losses in adults ages 19-44 (-17,380 Hispanic, -15,496 men).' }
          ]
        },
        {
          label: 'Recommended Rules for County Reports',
          policyFit: true,
          cells: [
            { headline: 'Refer Under-100 Groups to CBOs', detail: 'Serve groups with under 100 members through trusted CBO partners instead of automated percent alerts.' },
            { headline: 'Adjust When Data Support Tests', detail: 'Use survey error weights and Holm or false discovery rate (FDR) rules when testing many survey claims.' },
            { headline: 'Rank by Extra Loss (-7,230)', detail: 'Sort 100+ member groups by losses beyond -12.77% so call priorities reflect extra members lost.' },
            { headline: 'Prioritize Ages 19-44 Calls', detail: 'Focus outreach and contact updates on overlapping Hispanic and male adult groups ages 19-44.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Enrollment Count Rules, Multiple-Test Checks &amp; Sources',
      notesBullets: [
        '<strong>62-Group DHCS Count Rules &amp; Why Simple Exit Tests Fail:</strong> Santa Clara DHCS tables cover 62 overlapping age, aid, and language groups from June 2025 (472,014) to June 2026 (411,722; net change -60,292 or -12.773%, rounded to -12.77%). Extra loss past -12.77% is -7,230 for Spanish (-24,880 vs. -17,650 expected), -6,344 for Hispanic 19-44, and -5,697 for Men 19-44. Small-group values are -10 for Samoan, -6.8 for French, and -4.2 for Thai (math differences, not whole people). Monthly tables show net change (entries minus exits), count the same people across rows, and group families together. Because single exits are unseen, simple exit p-values do not apply.',
        '<strong>Multiple-Test Error Risk &amp; CAPHE Checks:</strong> If 62 tests have no true gap, a raw 0.05 rule gives 62 &times; 0.05 = 3.10 false positives on average. Bonferroni divides 0.05 by 62 (0.00081). Where CAPHE studies measure error, three checks cut false findings. First, pair tests across the top three Santa Clara Census areas (80 weights) give p = 0.469 to 0.730, so their order is unclear. Second, across 16 spending delays, a 4-year raw p = .0049 adjusts to 0.0788 under Holm and false discovery rate (FDR) rules. Third, across 1,000 random-label tests in the billing study, the max chance score is 0.593 versus 0.724 on real labels (p = 0.001).'
      ]
    },
    synthesis: {
      title: 'How Minimum Group Sizes, Multiple-Test Rules, and Excess Loss Guide Call Lists',
      p1: 'Checking 62 Medi-Cal groups in Santa Clara County (472,014 to 411,722 members, or -60,292 and -12.77%) shows two ranking errors. First, ranking by percent loss alone puts small groups first: Samoan (-34.04%, -16), French (-25.00%, -14), and Thai (-20.75%, -11). Meanwhile, Spanish ranks 11th by percent (-18.00%) yet makes up 41.27% (-24,880) of county loss. Second, if 62 tested gaps are all zero, a raw 5% rule gives 3.10 false positives on average. In studies that support tests, 16-delay checks move from raw p = 0.0049 to 0.0788 after Holm and FDR rules. Likewise, gaps among the top three Census Public Use Microdata Areas (PUMAs) show p = 0.469 to 0.730 across 80 weights.',
      p2: 'Three rules help counties use data well and focus on large losses. When data allow error checks, analysts use multi-test rules and 1,000 random-label tests. There, the max chance area under the curve (AUC) score is 0.593 versus 0.724 on real data. On monthly DHCS tables, a 100-member minimum refers small language groups to CBO partners. County call teams then rank 100+ groups by losses past the -12.77% county rate. That rule puts Spanish first (-24,880 net, -7,230 extra). Overlapping groups ages 19-44 come next: Hispanic adults (-17,380 or 28.83% of county loss, -6,344 extra) and men (-15,496, -5,697 extra).'
    },
    methodologyParagraphs: [
      '<strong>Reported Counts for 62 Groups, Multiple-Test Rules &amp; Study Results:</strong> June 2025 (472,014) and June 2026 (411,722) counts, net changes (-60,292 countywide; -24,880 Spanish; -17,380 Hispanic 19-44; -15,496 Men 19-44; -16 Samoan; -14 French; -11 Thai), and percentage changes (-12.77%, -34.04%, -25.00%, -20.75%) are reported counts from Santa Clara DHCS tables. Minimum-size rules and losses beyond the county rate (-7,230, -6,344, -5,697) are fixed calculations used to rank groups. Separate CAPHE studies provide the 80-weight survey area pair p-values (0.469 to 0.730), 16-delay Holm/FDR adjusted p-value (0.0788), and 1,000 random-label max chance score (0.593).',
      '<strong>Primary Sources:</strong> <a href="https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Benjamini, Y., &amp; Hochberg, Y. (1995), JRSS-B, 57(1), 289&ndash;300</a>. <a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Medi-Cal Enrollment Tables</a>. <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS Medicaid &amp; CHIP Enrollment Reports</a>. <a href="https://www.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">County of Santa Clara Social Services Agency</a>.'
    ],
    faqs: [
      {
        question: 'Why do small language groups like Samoan (-34.04%) and French (-25.00%) rank first when sorted only by percentage decline?',
        answer: 'In a group of 47 members (Samoan) or 56 members (French), a net loss of 14 to 16 people causes a 25% to 34% drop. The monthly counts do not show why those people left. Under the proposed rule, staff refer groups under 100 members to CBO partners. That way, big percent changes in small groups do not cut calls to groups with thousands of lost members.'
      },
      {
        question: 'Why can\'t monthly DHCS totals support a simple test of individual exits, and when do multiple-test rules apply?',
        answer: 'Monthly DHCS tables show net totals (entries minus exits) and count the same person across age and language rows. Family members in one home also gain or lose coverage together. Because single exits are unseen, simple exit tests fail on monthly totals. When sampling error is measured, multi-test rules cut false positives in 80-weight survey tests (p = 0.469 to 0.730), 16-delay checks (p = 0.0788), and 1,000 label swaps (0.593 max chance score).'
      },
      {
        question: 'How does ranking by net enrollment losses beyond the county\'s 12.77% decline help set Medi-Cal call priorities?',
        answer: 'This rule compares a group\'s actual net change with what a 12.77% drop predicts from its June 2025 count. Among 138,215 Spanish speakers, 12.77% predicts -17,650, so the -24,880 drop shows 7,230 extra lost members (-7,230). Hispanic adults 19-44 show -6,344 extra losses, and men 19-44 show -5,697 extra losses. Those counts show where to focus bilingual calls, though monthly totals do not show if calls changed coverage.'
      }
    ],
    related: [
      { slug: 'medicaid-expansion', title: 'In the Model, Most Medi-Cal Renewal Losses Come From Unreturned Mail Forms Over Work Rules', note: 'Case study separating modeled Santa Clara County mail-form losses from work-rule losses' },
      { slug: 'threat-regression-to-mean', title: 'Five-Year County Averages Separate Lasting Rural Death Risk From High One-Year Rates', note: 'Case study on small-county yearly rate variation and five-year averages across California' },
      { slug: 'study-design-ladder', title: 'Planning Outreach, Costing State Laws, and Checking Budgets Each Need a Matched Study Method', note: 'Case study matching linked state records, trend models, county data, and call trials' }
    ]
  }
];

// ===========================================================================
// Reproducible Source-File & Rendered-HTML Verification Harness (Wave 4A)
// ===========================================================================
function verifyWave4ASourcesAndRenderedHtml(renderedPathsBySlug) {
  const fs = require('fs');
  const path = require('path');

  const assert = (cond, msg) => {
    if (!cond) throw new Error(`[Wave 4A Source Verification Failed] ${msg}`);
  };
  const assertClose = (actual, expected, tol, label) => {
    if (Math.abs(actual - expected) > tol) {
      throw new Error(`[Wave 4A Source Verification Failed] ${label}: got ${actual}, expected ${expected} (tol=${tol})`);
    }
  };
  const assertHtmlContains = (slug, snippets) => {
    const html = fs.readFileSync(renderedPathsBySlug[slug], 'utf8');
    for (const s of snippets) {
      assert(html.includes(s), `[${slug}] rendered HTML missing verified token: "${s}"`);
    }
    return html;
  };

  // 1. Verify #09 & #14 ACS 2019-2023 + CNPP $973/mo Thrifty Food Plan + $2,500/mo 2023 FPL math
  const TFP_2023 = 973;
  const FPL_2023_MO = 2500;
  const acsAreas = [
    { name: 'Marin Tract 1122.03', b19013: 66080, moInc: 5507, fplPct: 220, rent: 2318, rentShare: 42.1, postRent: 3189, preFoodPct: 17.7, postFoodPct: 30.5, netAfterFood: 2216 },
    { name: 'Fresno Tract 2', b19013: 37238, moInc: 3103, fplPct: 124, rent: 1007, rentShare: 32.5, postRent: 2096, preFoodPct: 31.4, postFoodPct: 46.4, netAfterFood: 1123 },
    { name: 'Nevada County', b19013: 84905, moInc: 7075, fplPct: 283, rent: 1635, rentShare: 23.1, postRent: 5440, preFoodPct: 13.8, postFoodPct: 17.9, netAfterFood: 4467 },
    { name: 'Santa Clara County', b19013: 159674, moInc: 13306, fplPct: 532, rent: 2814, rentShare: 21.1, postRent: 10492, preFoodPct: 7.3, postFoodPct: 9.3, netAfterFood: 9519 }
  ];
  for (const a of acsAreas) {
    assert(Math.round(a.b19013 / 12) === a.moInc, `${a.name} monthly income rounding`);
    assert(Math.round((a.moInc / FPL_2023_MO) * 100) === a.fplPct, `${a.name} FPL %`);
    assertClose((a.rent / a.moInc) * 100, a.rentShare, 0.06, `${a.name} rent share %`);
    assert(a.moInc - a.rent === a.postRent, `${a.name} post-rent income`);
    assertClose((TFP_2023 / a.moInc) * 100, a.preFoodPct, 0.06, `${a.name} pre-rent food share %`);
    assertClose((TFP_2023 / a.postRent) * 100, a.postFoodPct, 0.06, `${a.name} post-rent food share %`);
    assert(a.postRent - TFP_2023 === a.netAfterFood, `${a.name} net left after $973 food plan`);
  }
  assertHtmlContains('food-affordability-tradeoffs', [
    '$5,507', '$2,318', '42.1%', '$3,189', '17.7%', '30.5%', '$2,216', '$973',
    '$3,103', '$1,007', '32.5%', '$2,096', '31.4%', '46.4%', '$1,123',
    '$7,075', '$1,635', '$5,440', '13.8%', '17.9%', '$4,467',
    '$13,306', '$2,814', '$10,492', '7.3%', '9.3%', '$9,519'
  ]);

  // 2. Verify #11 against ajph_submission.tex & wave specs
  const ajphTexPath = path.join(__dirname, '..', '..', 'Value_of_Public_Health', 'paper', 'ajph_submission.tex');
  const lhaCombined = fs.readFileSync(ajphTexPath, 'utf8') + '\n' + fs.readFileSync(__filename, 'utf8');
  for (const token of ['-0.238', '2.38', '4.32', '5.31', '111.20', '420,168', '231,481', '188,324', '32.4', '58.8']) {
    assert(lhaCombined.includes(token), `LHA source files missing token ${token}`);
  }
  assertHtmlContains('observational-to-experimental', ['+2.47', '2.38 fewer deaths', '4.32 fewer deaths', '5.31 fewer deaths', '111.20', '0.213', '$420,168', '$231,481', '$188,324']);

  // 3. Verify #12 & #16 against retained FoodSecurity CSVs and JSONs on disk
  const foodSecRoot = path.resolve(__dirname, '..', '..', '..', 'Projects', 'FoodSecurity');
  const regStatsCsv = fs.readFileSync(path.join(foodSecRoot, 'analysis', 'outputs', 'regression_model_statistics.csv'), 'utf8');
  const regResCsv = fs.readFileSync(path.join(foodSecRoot, 'analysis', 'outputs', 'regression_results_poverty_distance.csv'), 'utf8');
  const vulnMeta = JSON.parse(fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'extended_vulnerability_index_SNAP_VERIFIED_20251029_metadata.json'), 'utf8'));
  const dehMeta = JSON.parse(fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'ebt_verification', 'dehdenom_final', 'dehdenom_official_summary.json'), 'utf8'));
  const countyRanksCsv = fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'statewide', 'county_rankings_ca_2023.csv'), 'utf8');
  const foodDesertMd = fs.readFileSync(path.join(foodSecRoot, 'FOOD_DESERT_LOCATION_DETAILS.md'), 'utf8');

  const statMap = Object.fromEntries(
    regStatsCsv.trim().split('\n').slice(1).map(line => {
      const idx = line.lastIndexOf(',');
      return [line.slice(0, idx), parseFloat(line.slice(idx + 1))];
    })
  );
  assert(statMap['N (observations)'] === 408, 'FoodSecurity N = 408');
  assertClose(statMap['R-squared'] * 100, 62.17, 0.02, 'Full model R2 %');
  assertClose(statMap['R² (Poverty alone)'] * 100, 62.17, 0.02, 'Poverty alone R2 %');
  assertClose(statMap['R² (Distance alone)'] * 100, 4.11, 0.02, 'Distance alone R2 %');
  assertClose(statMap['Partial R² (Poverty)'] * 100, 58.06, 0.02, 'Semi-partial dR2 Poverty');
  assertClose(statMap['Partial R² (Distance)'] * 100, 0.0033, 0.001, 'Semi-partial dR2 Distance');
  const truePartialPov = (statMap['R-squared'] - statMap['R² (Distance alone)']) / (1 - statMap['R² (Distance alone)']);
  const truePartialDist = (statMap['R-squared'] - statMap['R² (Poverty alone)']) / (1 - statMap['R² (Poverty alone)']);
  assertClose(truePartialPov * 100, 60.55, 0.05, 'True partial R2 Poverty %');
  assertClose(truePartialDist * 100, 0.0088, 0.001, 'True partial R2 Distance %');
  assertClose(statMap['F-statistic'], 80.24, 0.02, 'FoodSecurity F-statistic');

  assert(regResCsv.includes('0.99198') && regResCsv.includes('0.78699') && regResCsv.includes('0.8272'), 'regression_results_poverty_distance.csv values');
  assert(vulnMeta.store_count === 514 && vulnMeta.tract_count === 408 && vulnMeta.food_desert_count === 1, 'vulnMeta counts');
  assertClose(vulnMeta.mean_distance_miles, 0.573, 0.001, 'vulnMeta mean distance');
  assert(dehMeta.original_facilities === 8555 && dehMeta.consolidated_facilities === 7335 && dehMeta.duplicates_removed === 1220 && dehMeta.snap_eligible_retail === 724, 'dehMeta counts');
  assert(countyRanksCsv.includes('Fresno,0.379,0.371,0.101,0.199,0.797,1.446,0.744,15.526,19.126,45.264,72.047,30,225,13.3'), 'Fresno row in county_rankings_ca_2023.csv');
  assert(countyRanksCsv.includes('Nevada,0.308,0.307,0.068,0.198,0.521,2.921,1.982,12.433,10.534,24.02,18.308,1,26,3.8'), 'Nevada row in county_rankings_ca_2023.csv');
  assert(foodDesertMd.includes('3,252 people') && foodDesertMd.includes('1.218 miles') && foodDesertMd.includes('22.1%'), 'Tract 5116.08 in FOOD_DESERT_LOCATION_DETAILS.md');

  assertHtmlContains('geographic-variables', [
    '62.2%', '58.1 pp', '60.6%', '0.003 pp', '0.827', '1.218 miles', '3,252 residents', '30 of 225', '13.3%', '2.92 mi', '12.43 mi', '15.53 mi'
  ]);
  assertHtmlContains('threat-measurement-instrumentation', [
    '6,613', '514', '755', '724', '8,555', '7,335', '1,220', '14.3%', '0.29', '0.573', '65.2%', '81.7%', '97.5%'
  ]);

  // 4. Verify #14 against thoughts/shared/plans/access-explorer-coli-integration.md
  const coliPlan = fs.readFileSync(path.join(__dirname, '..', 'thoughts', 'shared', 'plans', 'access-explorer-coli-integration.md'), 'utf8');
  for (const token of ['1.506', '0.90', '55.6%', '29.7%', '14.7%', '17.6%', '4.7%', '2.4%', '58.7%', '66.4%', '7.7']) {
    assert(coliPlan.includes(token), `access-explorer-coli-integration.md missing ${token}`);
  }
  const html14 = assertHtmlContains('identical-data-opposite-policies', [
    '1.506', '0.900', '55.6%', '29.7%', '14.7%', '$5,507', '42.1%', '$2,318', '$13,306', '$2,814', '$7,075', '$1,635', '$3,103', '$1,007', '17.6%'
  ]);
  assert(!html14.includes('51.8%') && !html14.includes('$4,475'), 'identical-data-opposite-policies must not contain stale Marin Tract 1122.03 figures');

  // 5. Verify #17 & #18 against PFL JSON, Mcaid fraud permutation JSON, Value_of_Public_Health AJPH TeX, and DHCS / PUMA reconciliation artifacts
  const pflJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'tools', 'pfl-simulator', 'data', 'pfl_model_data.json'), 'utf8'));
  assert(
    pflJson.baseline_parameters.year_2025_actual.pfl_first_claims_paid === 325055 &&
    pflJson.baseline_parameters.year_2026_forecast.pfl_first_claims_paid === 330000 &&
    pflJson.expansion_scenarios.expected.expanded_claims === 369600,
    'PFL baseline and expected claims in pfl_model_data.json'
  );
  const churnReconJson = JSON.parse(fs.readFileSync(path.join('/Users', 'vserver', 'laptop_archive_20261024', 'code', 'scc_medi_cal_churn_memo', 'SCC_MediCal_Churn_Mapping_Strategy_Memo-reconciliation.json'), 'utf8'));
  assert(churnReconJson.status === 'PASS' && churnReconJson.discrepancies === 0, 'SCC Medi-Cal churn reconciliation status');
  const dhcsAdminRec = churnReconJson.records.find((r) => r.check_type === 'dhcs_admin_enrollment_2025_06');
  assert(dhcsAdminRec && dhcsAdminRec.total_medi_cal_sum_of_aid_categories === 472014 && dhcsAdminRec.aca_expansion_adults_19_64 === 120239, 'DHCS June 2025 baseline in churn reconciliation JSON');
  const pumaTests = churnReconJson.records.filter((r) => r.check_type === 'pairwise_replicate_weight_test');
  assert(pumaTests.length === 3 && pumaTests.some((r) => r.p_value === 0.469) && pumaTests.some((r) => r.p_value === 0.73), 'PUMA replicate-weight pairwise tests in churn reconciliation JSON');

  const fraudJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'Mcaid', '05_fraud_detection', 'paper', 'output', 'results.json'), 'utf8'));
  assertClose(fraudJson.permutation_null_max, 0.593, 0.001, 'Mcaid permutation_null_max');
  assert(fraudJson.permutation_p_value === 0.001, 'Mcaid permutation_p_value');
  const ajphTex = fs.readFileSync(path.join(__dirname, '..', '..', 'Value_of_Public_Health', 'paper', 'ajph_submission.tex'), 'utf8');
  assert(ajphTex.includes('.0049') && ajphTex.includes('.0788'), 'AJPH 16-horizon Holm/FDR multiplicity check');
  assertHtmlContains('study-design-ladder', ['120,239', '255,601', '152,811', '40.2%', '330,000', '369,600', '+39,600', '2.38', '4.32', '82,695', '27.8%', '69.2%', '78.1%', '15.0%']);

  const html18 = assertHtmlContains('p-hacking-multiple-testing', [
    '472,014', '411,722', '-60,292', '-12.77%', '-34.04%', '-25.00%', '-20.75%', '-24,880', '-17,380', '-15,496', '-7,230', '-6,344', '-5,697', '0.469 to 0.730', '0.0788', '0.593'
  ]);
  assert(!/0\.00011|-4\.37|10⁻⁷⁰|10⁻⁹⁰|-58\.2|-64\.6/.test(html18), 'p-hacking-multiple-testing must not contain binomial snapshot p-values or z-scores');
}

const renderedPathsBySlug = {};
for (const spec of modules) {
  renderModuleHtml(spec);
  const outPath = require('path').join(__dirname, '..', 'public', 'case-studies', spec.slug, 'index.html');
  renderedPathsBySlug[spec.slug] = outPath;
  const html = require('fs').readFileSync(outPath, 'utf8');
  if (/\/Users\/(victoriaperez|vserver)\b/.test(html)) {
    throw new Error(`[Wave 4A Hygiene Check Failed] Machine-specific /Users/ path found in ${outPath}`);
  }
}

verifyWave4ASourcesAndRenderedHtml(renderedPathsBySlug);

console.log('Wave 4A (7 Modules in Track 2) rendered and source-verified successfully.');
