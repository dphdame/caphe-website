#!/usr/bin/env node
'use strict';

/**
 * Wave 4A Builder: Track 2 Study Credibility & Measurement (7 Surviving Modules)
 *
 * Modules built:
 *  - #9  food-affordability-tradeoffs (Track 2, public) - Poverty & Affordability Denominators
 *  - #11 observational-to-experimental (Track 2, public) - OLS +0.18 vs Brown 2014 -9.10 vs Cholette 2026 -9.16 (folds regression-tables-confounding)
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
        claimCovered: 'Article-reported count of 57 Santa Clara tracts with employment above 60% and poverty above 10% across 408 tracts, plus housing-cost benchmarks; not publicly reproduced.'
      },
      {
        visibleLabel: 'Census ACS API Pipeline in Python',
        title: 'How to Build a Census Data Pipeline',
        url: 'https://tooearlytosay.com/research/methodology/census-api-pipeline/',
        claimCovered: 'Python walkthrough for pulling 2022 ACS 5-year tract estimates through the Census API, with key handling, rate limits, and checks for suppressed or nonnumeric values.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Poverty &amp; Affordability Denominators (Mode B Area Medians + Mode A Benchmark)',
    pageTitle: 'What Is Lost Across Poverty Measures? | CAPHE Case Studies',
    metaDescription: 'Compare gross-income poverty cutoffs against post-rent food budget shares ($973/mo Thrifty Food Plan) across four California Census ACS communities.',
    h1: 'Modeled Post-Rent Household Budgets Reveal Severe Food Strain Above Federal Gross-Income Cutoffs',
    subtitle: 'We compare family food plans before and after local rent across four community types.',
    endnotes: [
      '<a href="https://www.fns.usda.gov/snap/fy-2024-cola" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: FY 2024 SNAP Cost-of-Living Adjustments &amp; Thrifty Food Plan ($973/month maximum four-person allotment).',
      '<a href="https://api.census.gov/data/2023/acs/acs5/groups.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau</a>: 2019&ndash;2023 American Community Survey (ACS) 5-Year Detailed Tables (<code>B19013</code> Median Household Income &amp; <code>B25064</code> Median Gross Rent).',
      '<a href="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references/2023-poverty-guidelines-computations" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Department of Health and Human Services (HHS)</a>: 2023 Federal Poverty Guidelines ($2,500/month four-person baseline; 130% = $3,250/mo; 200% = $5,000/mo).'
    ],
    answerHtml: 'When screening families for food aid by gross pay alone, a county leaves out high rent costs in California [1,3]. In Marin County\'s Canal area, typical monthly pay sits above federal poverty cutoffs [2,3]. Yet local rent takes more than two-fifths of pay [2]. Taking rent (<strong>$2,318</strong>) from monthly pay (<strong>$5,507</strong>) shifts a four-person food plan (<strong>$973</strong>) from <strong>17.7%</strong> of gross pay to <strong>30.5%</strong> of post-rent pay [1,2]. Checking post-rent pay across four local areas helps teams pair CalFresh shelter rules with clinic food scripts [1,2].',
    block2: {
      title: 'Same $973 Monthly Grocery Bill, Two Different Denominators (Marin Canal Neighborhood)',
      contextTag: '2019-2023 Census ACS Area Medians + Post-Rent Budget Benchmark',
      ariaLabel: 'Comparison of Gross vs. Post-Rent Food Share in Marin County Canal District: 17.7% of $5,507 median household income before rent versus 30.5% of $3,189 modeled income after subtracting $2,318 median rent',
      ruler1: {
        title: 'Ruler 1: Before Rent ($973 / $5,507 Pre-Rent Monthly Pay)',
        stat: '17.7% Pre-Rent Share (220% FPL)',
        ariaLabel: 'Before rent: $973 food plan out of $5,507 ACS median monthly household income, a 17.7% share, leaving $4,534',
        segments: [
          { cls: 'seg-food', width: 18, label: 'Food Plan: $973 (17.7%)' },
          { cls: 'seg-gross', width: 82, label: 'Remaining Pre-Rent: $4,534 (82.3%)' }
        ],
        desc: 'Out of <strong>$5,507</strong> in typical monthly pay (<strong>220% FPL</strong>), a $973 food bill takes <strong>17.7%</strong> before rent.'
      },
      ruler2: {
        title: 'Ruler 2: After Rent ($973 / $3,189 Post-Rent Monthly Pay)',
        stat: '30.5% Post-Rent Share (-$2,318 Rent)',
        ariaLabel: 'Modeled after-rent benchmark: $2,318 median monthly rent subtracted first, $973 food plan equal to 30.5% of the $3,189 post-rent income',
        segments: [
          { cls: 'seg-rent', width: 42, label: 'Rent: 42.1% ($2,318)' },
          { cls: 'seg-food', width: 18, label: 'Food: 30.5% ($973)' },
          { cls: 'seg-rest', width: 40, label: 'Remaining: $2,216' }
        ],
        desc: 'Taking out <strong>$2,318</strong> in monthly rent leaves <strong>$3,189</strong>. The $973 food plan takes <strong>30.5%</strong> of what is left (+12.8 pp).'
      }
    },
    table1: {
      title: 'Table 1. Monthly Pay, Rent Share, and Food Plans by Local Area',
      subtitle: 'We compare monthly pay, rent share, and left-over food cash for a family of four.',
      caption: 'Table 1: Comparison of monthly median pay, share of income spent on monthly rent, and four-person food budget shares across four California areas.',
      cornerLabel: 'Monthly Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> We use 2019–2023 Census ACS 5-Year medians (Table B19013 all-home pay split by 12 and Table B25064 renter gross rent). We pair these with Mode A modeled post-rent shares for the $973/month USDA Thrifty Food Plan. The 2023 HHS four-person Federal Poverty Line is $2,500/month. Table B19013 covers all households and B25064 covers renter homes across different census universes. Thus post-rent numbers show an area-median benchmark, not one single home.',
      columns: [
        { tag: 'Group 1', tagHighlight: true, title: 'High-Rent Working Tract', subtitle: 'Marin County: San Rafael Canal area (Tract 1122.03).' },
        { tag: 'Group 2', tagHighlight: true, title: 'Low-Pay City Core', subtitle: 'Fresno County: Central Fresno (Tract 2).' },
        { tag: 'Group 3', tagHighlight: false, title: 'Rural Foothills County', subtitle: 'Nevada County (Sierra Foothills baseline).' },
        { tag: 'Group 4', tagHighlight: false, title: 'High-Pay Suburb County', subtitle: 'Santa Clara County (County baseline).' }
      ],
      rows: [
        {
          label: 'Median Monthly Pay',
          cells: [
            { val: '$5,507 ($66,080/yr)' },
            { val: '$3,103 ($37,238/yr)' },
            { val: '$7,075 ($84,905/yr)' },
            { val: '$13,306 ($159,674/yr)' }
          ]
        },
        {
          label: 'Poverty Ratio (4 People)',
          cells: [
            { val: '220% FPL (>200% line)' },
            { val: '124% FPL (<=130% line)' },
            { val: '283% FPL (County)' },
            { val: '532% FPL (County)' }
          ]
        },
        {
          label: 'Share of Income Spent on Monthly Rent',
          cells: [
            { val: '42.1% ($2,318)' },
            { val: '32.5% ($1,007)' },
            { val: '23.1% ($1,635)' },
            { val: '21.1% ($2,814)' }
          ]
        },
        {
          label: 'Monthly Pay Left After Rent',
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
      title: 'Table 2. Local Access &amp; Policy Fit Across Four Areas',
      subtitle: 'We match renter share, CalFresh use, and store trips to the right county plan.',
      caption: 'Table 2: Renter housing share, SNAP use, distance to SNAP stores, and primary policy fit.',
      cornerLabel: 'Local Measure',
      rows: [
        {
          label: 'Renter Share &amp; CalFresh Use',
          mono: true,
          cells: [
            { val: '96.5% Rent | 19.3% SNAP', color: 'text-slate-950' },
            { val: '78.4% Rent | 44.9% SNAP', color: 'text-rose-800' },
            { val: '25.6% Rent | 7.3% SNAP', color: 'text-slate-950' },
            { val: '44.7% Rent | 5.7% SNAP', color: 'text-slate-950' }
          ]
        },
        {
          label: 'Mean Trip to SNAP Store',
          mono: true,
          cells: [
            { val: '0.97 mi (8.1% LILA)', color: 'text-emerald-800' },
            { val: '1.45 mi (13.3% LILA)', color: 'text-amber-800' },
            { val: '2.92 mi (12.4 mi max)', color: 'text-rose-800' },
            { val: '0.60 mi (3.7% LILA)', color: 'text-emerald-800' }
          ]
        },
        {
          label: 'What Gross Pay Leaves Out',
          cells: [
            { val: 'Rent takes 42.1% of pay above 200% FPL.' },
            { val: 'Low pay meets high rent and far stores.' },
            { val: 'Rural store trips reach up to 12.4 miles.' },
            { val: 'High county pay ($13,306) covers renter pockets.' }
          ]
        },
        {
          label: 'Best County Action',
          policyFit: true,
          cells: [
            { headline: 'Shelter Rules &amp; Food Rx', detail: 'Use CalFresh shelter rules and clinic food scripts.' },
            { headline: 'Cash Aid + Food Vans', detail: 'Pair full CalFresh aid with food vans.' },
            { headline: 'Rural EBT Delivery', detail: 'Add rural SNAP stores and online EBT delivery.' },
            { headline: 'Tract-Level Focus', detail: 'Focus on low-pay renter tracts, not county means.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: County Baselines &amp; Store Distance Ranges',
      notesBullets: [
        '<strong>Renter Share &amp; SNAP Use (ACS B25003 &amp; B22003):</strong> Marin Tract 1122.03 is 96.5% renters (439 / 455 homes) vs. 36.1% across Marin County. SNAP use is 19.3% vs. 4.8% countywide. Fresno Tract 2 is 78.4% renters (597 / 761 homes) vs. 44.6% countywide. SNAP use is 44.9% vs. 20.5% countywide.',
        '<strong>Store Trips &amp; Low-Access Shares:</strong> In Fresno County, 13.3% of tracts (30 of 225) have low pay and far stores. Trips exceed 1 mile in cities or 10 miles in rural areas, up to 15.53 miles max. In Nevada County, trips to a SNAP store reach 12.43 miles (mean 2.92 miles, median 1.98 miles).'
      ]
    },
    synthesis: {
      title: 'Why Policy Fit Changes Across These Four Areas',
      p1: 'One single state food rule misses the mark when local needs differ. In Marin\'s Canal area (Tract 1122.03), stores are close (0.97 mi mean) and pay sits at 220% FPL. Gross pay rules and new store grants do not fix the main gap. Here 96.5% of homes rent. In our modeled area-median benchmark, ACS B25064 renter gross rent is compared against ACS B19013 all-household pay across different census universes. Rent takes 42.1% of pay. The best step is helping families claim the CalFresh shelter rule and clinic food scripts that do not stop at 130% or 200% FPL.',
      p2: 'Central Fresno (Tract 2) faces two gaps at once. Low pay ($3,103/month) pushes the modeled post-rent food share to 46.4%. Also, 13.3% of county tracts lack close stores. This calls for full CalFresh aid plus mobile food vans. Nevada County has a 17.9% post-rent food share, but store trips reach 12.4 miles. It needs rural EBT delivery and more SNAP stores. Santa Clara County shows why health teams fund specific tracts instead of using county means ($13,306/month).'
    },
    methodologyParagraphs: [
      '<strong>1. Mode B vs. Mode A Rules (Area-Median Benchmark Across Different Census Universes):</strong> In the 2019-2023 ACS 5-Year tables (<strong>Mode B</strong> survey data), <code>B19013_001E</code> tracks median pay across <em>all</em> homes. <code>B25064_001E</code> tracks median gross rent across <em>renter</em> homes (different census universes). We subtract <code>B25064_001E</code> from <code>round(B19013_001E / 12)</code> and compare it to a four-person food plan (<code>$973/month</code>) and poverty line (<code>$2,500/month</code>). This builds a <strong>Mode A modeled area-median benchmark</strong>, not an observed budget for one renter family. Renter median pay (<code>B25119_003E</code>) is <strong>$65,777/yr (&plusmn;$16,576)</strong> in Marin Tract 1122.03 and <strong>$29,155/yr (&plusmn;$11,971)</strong> in Fresno Tract 2. It is <strong>$52,986/yr (&plusmn;$8,277)</strong> in Nevada County and <strong>$119,765/yr (&plusmn;$1,703)</strong> in Santa Clara County.',
      '<strong>2. Main Data Sources:</strong> We use <a href="https://api.census.gov/data/2023/acs/acs5/groups.html" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">U.S. Census Bureau 2019-2023 ACS 5-Year Detailed Tables</a> (<code>B19013</code>, <code>B25064</code>, <code>B25003</code>, <code>B22003</code>). We also use <a href="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references/2023-poverty-guidelines-computations" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">2023 HHS Federal Poverty Guidelines</a> (<strong>$30,000/yr</strong> or <strong>$2,500/mo</strong> for four people; 130% FPL = $3,250/mo; 200% FPL = $5,000/mo). Food costs come from <a href="https://www.fns.usda.gov/snap/fy-2024-cola" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">USDA FNS FY 2024 SNAP COLA</a> and <a href="https://www.fns.usda.gov/research/cnpp/usda-food-plans/cost-food-monthly-reports" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">CNPP June 2023 Thrifty Food Plan</a> (<strong>$973.30/mo</strong> rounded to <strong>$973/mo</strong>). Health survey context comes from <a href="https://healthpolicy.ucla.edu/newsroom/events/focus-food-insecurity-insights-california-health-interview-survey" target="_blank" rel="noopener noreferrer" class="underline text-[#0041A5]">UCLA CHPR California Health Interview Survey (CHIS)</a>.',
      '<strong>3. Exact ACS API Records &amp; Math Rules:</strong> Marin Tract 1122.03 (<code>GEOID 06041112203</code>) has <code>B19013_001E = $66,080 &plusmn;$19,220</code> (<code>$5,507/mo</code>, <code>220% FPL</code>) and <code>B25064_001E = $2,318/mo &plusmn;$161</code> (<code>42.1%</code>). Post-rent pay is <code>$3,189/mo</code>, pre-rent food share is <code>17.7%</code>, post-rent share is <code>30.5%</code>, and <code>$2,216/mo</code> is left. Fresno Tract 2 (<code>GEOID 06019000200</code>) has <code>B19013_001E = $37,238 &plusmn;$19,169</code> (<code>$3,103/mo</code>, <code>124% FPL</code>) and <code>B25064_001E = $1,007/mo &plusmn;$96</code> (<code>32.5%</code>). Post-rent pay is <code>$2,096/mo</code>, pre-rent share is <code>31.4%</code>, post-rent share is <code>46.4%</code>, and <code>$1,123/mo</code> is left. Nevada County (<code>GEOID 06057</code>) has <code>B19013_001E = $84,905 &plusmn;$4,336</code> (<code>$7,075/mo</code>, <code>283% FPL</code>) and <code>B25064_001E = $1,635/mo &plusmn;$99</code>. Post-rent pay is <code>$5,440/mo</code>, pre-rent share is <code>13.8%</code>, and post-rent share is <code>17.9%</code>. Santa Clara County (<code>GEOID 06085</code>) has <code>B19013_001E = $159,674 &plusmn;$1,962</code> (<code>$13,306/mo</code>, <code>532% FPL</code>) and <code>B25064_001E = $2,814/mo &plusmn;$16</code>. Post-rent pay is <code>$10,492/mo</code>, pre-rent share is <code>7.3%</code>, and post-rent share is <code>9.3%</code>.'
    ],
    faqs: [
      {
        question: 'Why do gross-pay poverty lines leave out food strain in high-rent areas?',
        answer: 'Federal Poverty Guidelines use one gross-pay line across 48 states. They do not adjust for local rent. In Marin County\'s Canal area (Tract 1122.03), typical pay is 220% FPL ($5,507/month). That sits above the 130% and 200% FPL cutoffs. Yet our modeled area-median benchmark subtracts renter gross rent ($2,318/month) from all-home pay. A $973 food bill takes 30.5% of the pay left after rent.'
      },
      {
        question: 'How does checking post-rent food costs change local plans?',
        answer: 'Checking food costs after rent separates tight budgets from long store trips. Teams can match CalFresh shelter rules, clinic food scripts, food vans, or rural delivery to each local gap.'
      },
      {
        question: 'Why should health teams check census tracts instead of county means?',
        answer: 'County means blend rich owner areas with low-pay renter tracts. Checking census tracts keeps high county pay from covering up severe post-rent food strain in renter areas.'
      }
    ],
    related: [
      { slug: 'geographic-variables', title: 'Household Poverty Accounts for Most Neighborhood Food-Access Variation Compared With Store Distance', note: 'Case study comparing poverty R² (62.2%) against store distance across 9,033 California tracts' },
      { slug: 'food-insecurity-diabetes', title: 'Case Study: Untangling Bidirectional Links Between Food Affordability and Chronic Disease', note: 'Track 4 flagship case study pairing post-rent food budgets with clinical diabetes outcomes' },
      { slug: 'threat-measurement-instrumentation', title: 'Verified CalFresh Store Lists Double Measured Grocery Distance Compared With Commercial Map Directories', note: 'Case study comparing commercial store lists against USDA SNAP-verified EBT retailers' }
    ]
  },

  // =========================================================================
  // MODULE #11: observational-to-experimental (Track 2, public)
  // =========================================================================
  {
    slug: 'observational-to-experimental',
    tetsCompanion: [
      {
        visibleLabel: 'Public Health Spending Regime Analysis',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'From 1992 to 2019 across 3,142 US counties, each 10 dollars per capita reduces Years of Potential Life Lost by 0.78 per 100,000 residents, versus +1.52 from 2020 to 2022.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Routine-Budget Identification (Mode B 57-County Panel)',
    pageTitle: 'Routine-Budget Analysis vs. Raw Yearly Averages | CAPHE',
    metaDescription: 'Compare raw yearly county averages (+0.18) against routine-budget estimates preventing 9.10 to 9.16 deaths per 100,000 across 57 California counties.',
    h1: 'Routine County Public Health Budgets Lower Premature Deaths After Separating Outbreak Spending',
    subtitle: 'We compare raw yearly spending averages with multi-year routine budget models across California counties.',
    endnotes: [
      '<a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California State Controller\'s Office</a>: County Financial Transactions Reports (57-County Public Health Spending Panel, 2003&ndash;2023, N = 1,197 county-years).',
      '<a href="https://wonder.cdc.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">CDC WONDER &amp; CDPH Vital Statistics</a>: County All-Cause Mortality Files (2003&ndash;2023) &amp; <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE LHA Methodology</a>.',
      '<a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Brown, T. T. (2014)</a>: "How Effective Are Public Health Departments at Preventing Mortality?", <em>Economics &amp; Human Biology</em>, 13, 34&ndash;45; and <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012)</a>, <em>JBES</em>, 30(1), 67&ndash;80.'
    ],
    answerHtml: 'When evaluating county public health budgets by same-year death rates, an analyst sees flat results because emergency outbreak grants arrive in high-death years. Tracking routine budget shifts across <strong>1,197 county-years</strong> (2003 to 2023) shows that each <strong>$10 per resident</strong> in county health spending prevents <strong>9.16 deaths per 100,000</strong> (<strong>$125</strong> in health value per <strong>$1</strong> spent) [1,2]. A raw yearly average across counties shows <strong>+0.18 deaths per 100,000</strong> because boards send surge funds when death rates spike [1,2]. Matching this <strong>9.16</strong> result within <strong>99.4%</strong> of an earlier 40-county board study (<strong>9.10 fewer deaths per 100,000</strong>) gives boards two separate checks across two decades [3].',
    block2: {
      title: 'Two Identification Rulers: Raw Yearly Average vs. Routine-Budget Analysis (57 Counties)',
      contextTag: 'Mode B Empirical Estimates (N = 1,197 County-Years, 2003 to 2023) &amp; Published 40-County Benchmark',
      ariaLabel: 'Comparison of raw yearly average of +0.18 deaths per 100,000 versus routine-budget estimate of 9.16 fewer deaths per 100,000',
      ruler1: {
        title: 'Ruler 1: Raw Yearly Average (Outbreak and Routine Budgets Mixed)',
        stat: '+0.18 Deaths / 100K (Outbreak Surge Mix)',
        ariaLabel: 'Raw yearly regression slope of +0.18 deaths per 100,000 per $10 per capita shifted by +9.34 due to reactive outbreak spending',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '+9.34 Outbreak-Spending Shift (Surge Funds)' },
          { cls: 'seg-rest', width: 8, label: '+0.18 Raw Avg' }
        ],
        desc: 'Linking county health pay and deaths in the same year gives <strong>+0.18 (a range that crosses zero)</strong>. Outbreaks bring surge funds, shifting the slope by <strong>+9.34 deaths/100K</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: Routine-Budget Analysis (Two Separate Checks Across 2001 to 2023)',
        stat: '9.16 Fewer Deaths / 100K (99.4% Match)',
        ariaLabel: 'Routine-budget analysis isolates 9.16 fewer deaths per 100,000 per $10 per capita, holding in 46 of 47 checks and matching the earlier 9.10 governance benchmark',
        segments: [
          { cls: 'seg-primary', width: 50, label: 'County Board Check (2001-2008): 9.10 Fewer' },
          { cls: 'seg-food', width: 50, label: '21-Year Panel Check (2003-2023): 9.16 Fewer' }
        ],
        desc: 'Tracking routine budget changes gives <strong>9.10 fewer deaths/100K</strong> under county board rules (2001 to 2008). It gives <strong>9.16 fewer deaths/100K (holding in 46 of 47 checks)</strong> across the 21-year 57-county panel.'
      }
    },
    table1: {
      title: 'Table 1. From Raw Yearly Averages to Two Separate Routine-Budget Checks',
      subtitle: 'We compare four models of local health spending ($10 per resident) and death rates per 100,000.',
      caption: 'Empirical comparison of Raw Yearly Averages, 40-County Board Check, 57-County 21-Year Routine-Budget Check, and an era split at the 2010 health law.',
      cornerLabel: 'Model Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Empirical Estimates):</strong> We use county-clustered standard errors. The raw yearly average has SE = 0.40, t = +0.46, and p = 0.644 (95% CI -0.60 to +0.97). The Brown (2014) 40-county board estimate has p &lt; 0.01 in the 2001-2008 panel and p &lt; 0.01 for the 3.07 pre-2010 estimate. The 21-year IV model has SE = 1.11, t = -8.27, and p &lt; 0.001 (95% CI -11.33 to -6.98). Its first-stage F is 314.1 (above the &gt;10 rule) and Hansen J is 4.49 (p = 0.343). Also, 46 of 47 model checks are statistically significant. Death reductions in Models 2-4 are significant at p &lt; 0.01 (***). Cost per life saved is $10 / (|β| / 100,000).',
      columns: [
        { tag: 'Model 1: Raw Average', tagHighlight: false, title: 'Raw Yearly Average', subtitle: '57 Counties (2003-2023, N=1,197).' },
        { tag: 'Model 2: Board Check', tagHighlight: true, title: 'County Board Rules', subtitle: '40 CA Counties (2001-2008).' },
        { tag: 'Model 3: 21-Yr Check', tagHighlight: true, title: '57-County Routine Budget', subtitle: '57 Counties (2003-2023, N=1,197).' },
        { tag: 'Model 4: Era Split', tagHighlight: false, title: 'After 2010 Law (2010-2023)', subtitle: 'Compared to 2003-2009 (3.07 Fewer).' }
      ],
      rows: [
        {
          label: 'Source of Budget Shifts',
          cells: [
            { val: 'Routine + outbreak funds mixed' },
            { val: 'County board budget rules' },
            { val: '21-year routine budget shifts' },
            { val: 'Routine budget split at 2010' }
          ]
        },
        {
          label: 'Deaths per $10 per Resident',
          highlight: true,
          cells: [
            { val: '+0.18 (plus sign)', barWidth: 2, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '9.10 fewer deaths', barWidth: 99, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '9.16 fewer deaths (99.4% match)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '8.93 fewer deaths (2.9x 2003-2009)', barWidth: 97, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Effect Range Across Counties',
          cells: [
            { val: '-0.60 to +0.97 (crosses zero)' },
            { val: 'Steady drop (40 counties)' },
            { val: '6.98 to 11.33 fewer deaths' },
            { val: 'Holds in both eras (3.07 pre-2010)' }
          ]
        },
        {
          label: 'Outbreak Surge Split',
          cells: [
            { val: 'No split for outbreak surges' },
            { val: 'Splits via county board rules' },
            { val: 'Splits routine pay (46 of 47 checks)' },
            { val: 'Holds before and after 2010' }
          ]
        },
        {
          label: 'Cost per Life Saved',
          cells: [
            { val: 'Not defined (+0.18 sign)' },
            { val: '~$110,000 per life saved' },
            { val: '$109,000 per life saved' },
            { val: '$111,982 per life saved' }
          ]
        },
        {
          label: 'Return per $1 Spent (BCR)',
          cells: [
            { val: 'Looks like 0:1 (false zero)' },
            { val: '$67 to $88 per $1 (2016 VSL)' },
            { val: '$125 per $1 ($13.6M VSL)' },
            { val: '$121 per $1 ($13.6M VSL)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Why Two Separate Checks Build Trust for County Budgets',
      subtitle: 'We show how two methods across two decades find the same 9.1 fewer deaths per 100,000.',
      caption: 'Decision matrix comparing data scope, outbreak spending rules, budget risk, and policy fit across four models.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Data &amp; Time Scope',
          cells: [
            { val: 'Raw yearly average across 57 counties from 2003 to 2023.' },
            { val: 'Published study of 40 county health departments from 2001 to 2008.' },
            { val: '21-year, 57-county CAPHE panel from 2003 to 2023.' },
            { val: 'Splits the 57-county panel at 2010 (2003-2009 vs. 2010-2023).' }
          ]
        },
        {
          label: 'How Outbreak Funds Are Handled',
          cells: [
            { val: 'Mixes outbreak surge grants with base budgets (+9.34 shift).' },
            { val: 'Uses county board budget rules to track steady spending.' },
            { val: 'Tracks routine budget shifts across 1,197 county-years.' },
            { val: 'Compares slopes before and after 2010 across 57 counties.' }
          ]
        },
        {
          label: 'Budget Risk if Misread',
          cells: [
            { val: 'A raw +0.18 average makes steady health programs look flat.' },
            { val: 'Staff may ask if a 2001-2008 result holds after 2014.' },
            { val: 'One model alone leaves staff unsure about the +0.18 shift.' },
            { val: 'Treating clinics and public health as swaps leads to budget cuts.' }
          ]
        },
        {
          label: 'Best Policy &amp; Budget Action',
          policyFit: true,
          cells: [
            { headline: 'Use Adjusted Budget Models', detail: 'Treat raw averages as trackers of where outbreaks hit.' },
            { headline: 'Cite Past Board Benchmarks', detail: 'Show staff that 9.1 fewer deaths holds in both studies.' },
            { headline: 'Use 21-Year Panel for ROI', detail: 'Use 9.16 fewer deaths ($125 per $1) in budget hearings.' },
            { headline: 'Fund Care and Prevention', detail: 'The post-2010 effect is 2.9x larger (8.93 vs. 3.07).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: 99.4% Cross-Decade Match, Lag Checks &amp; Era Split',
      notesBullets: [
        '<strong>Cross-Decade Match (Mode B):</strong> We compare the 2001-2008 county board result (-9.10) on 40 counties with the 2003-2023 routine-budget result (-9.16) on 57 counties. The match is 1 - |-9.16 - (-9.10)| / 9.16 = 99.34% (~99.4% match) across two methods and time windows.',
        '<strong>Regression &amp; Lag Checks (Mode B):</strong> In 2SLS, raw averages give SE = 0.40 (t = 0.46, p = 0.644, 95% CI -0.60 to +0.97). The variance-based IV model gives SE = 1.11. Two checks back up splitting base and surge funds. First, a lag model (N = 684) finds a positive 2-year lag (+1.58, SE = 0.49, p = 0.001) when counties raise pay after death shocks. Second, a Breusch-Pagan test (LM = 91.68, F = 12.32, p < 0.001) rejects equal error spread. Results hold in 2003-2019 pre-COVID data (4.56 fewer deaths***, N = 969, 62:1 BCR), rural counties (8.11 fewer deaths**), and 46 of 47 checks (leave-one-out SD = 0.05, range -9.21 to -9.02).',
        '<strong>Data Provenance:</strong> Exact slopes and checks come from `src/frontend/js/lha-calculator.js (L28-72), public/tools/lha-calculator/methodology.html (L129-310), Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex, and Value_of_Public_Health/paper/sections/robustness_tables.tex`.'
      ]
    },
    synthesis: {
      title: 'Why Two Separate Checks Across Two Decades Build Budget Trust',
      p1: 'County boards and state lawmakers set health budgets in real time. They send surge funds to counties facing disease outbreaks or death spikes. Because surge cash flows to high death rates, a raw yearly average (+0.18 deaths per 100,000, p = 0.64) mixes emergency aid with base care. That makes strong county programs look flat.',
      p2: 'Splitting base budgets from outbreak surges shows the true value of county health teams. Two studies across two decades sit within 0.06 deaths per 100,000 of each other. Brown\'s 2001-2008 study found 9.10 fewer deaths per 100,000. CAPHE\'s working-paper 2003-2023 study across 57 counties found 9.16 fewer deaths per 100,000 (F = 314.1). It also found a 2.9x larger result for 2010-2023 than for 2003-2009 (8.93 vs. 3.07 fewer deaths). Budget leaders can back base prevention with clear proof.'
    },
    methodologyParagraphs: [
      '<strong>Mode B Panel &amp; Published Studies:</strong> All slopes (+0.18, -9.10, -9.16, -3.07, -8.93), standard errors (0.40, 1.11), and checks (F = 314.1, Hansen J = 4.49, p = 0.343) are Mode B estimates. They come from the 57-county working-paper panel (N = 1,197, excluding Berkeley and Pasadena city health units) and published studies.',
      '<strong>Main Sources:</strong> We cite <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), "How Effective Are Public Health Departments at Preventing Mortality?", Economics &amp; Human Biology, 13, 34-45</a> and <a href="https://doi.org/10.2105/AJPH.2016.303233" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2016), American Journal of Public Health, 106(8), 1477-1482</a>. We also use <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES, 30(1), 67-80</a>, <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a>, and <a href="https://wonder.cdc.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC WONDER Mortality Data</a>.'
    ],
    faqs: [
      {
        question: 'Why does the raw yearly average (+0.18) have the opposite sign of the routine budget result (9.16 fewer deaths)?',
        answer: 'County boards and state teams send emergency health funds when death rates spike, such as during flu waves or COVID-19. That outbreak funding shift (+9.34 deaths/100K) offsets the 9.16 protective effect in raw comparisons.'
      },
      {
        question: 'Why does the match between the 2001-2008 study and the 2003-2023 panel matter?',
        answer: 'The 2001-2008 study used county board rules across 40 counties (9.10 fewer deaths). The 2003-2023 panel used routine budget shifts across 57 counties (9.16 fewer deaths). A 99.4% match across two methods, decades, and samples rules out model quirks.'
      },
      {
        question: 'Why is the result 2.9 times larger for 2010-2023 than for 2003-2009?',
        answer: 'Splitting the panel at 2010 gives 3.07 fewer deaths/100K in 2003-2009 and 8.93 fewer in 2010-2023 per $10 spent. Wider insurance under the 2014 Medi-Cal expansion may help people act on county health screenings. Yet the later window also spans the post-2009 recovery and COVID-19, so the era split alone cannot isolate insurance.'
      }
    ],
    related: [
      { slug: 'reverse-causation-feedback', title: 'Outbreak Spending Surges & 5-Year Phase-In', note: 'Case study detailing the needs-based funding feedback loop and 5-year phase-in schedule' },
      { slug: 'study-design-ladder', title: 'Each Public Health Budget Question Requires a Distinct Empirical Study Design', note: 'Case study matching linked administrative records, trend splits, panel analyses, and outreach trials' },
      { slug: 'sensitivity-analysis-cea', title: 'Testing Which Assumptions Change a Funding Decision', note: 'Case study stress-testing the 125:1 return across HHS 2025 VSL tiers' }
    ]
  },

  // =========================================================================
  // MODULE #12: geographic-variables (Track 2, public)
  // =========================================================================
  {
    slug: 'geographic-variables',
    tetsCompanion: [
      {
        visibleLabel: 'Food Desert Comparison Claim Record',
        title: 'The Food Desert Myth: Evidence Beyond Proximity',
        url: 'https://tooearlytosay.com/research/food-security/food-desert-myth/',
        claimCovered: 'USDA low-income, low-access tract measures; the published zero-food-desert finding and 4.7x SNAP participation comparison are under reconciliation.'
      },
      {
        visibleLabel: 'Statewide Food Access Comparison Record',
        title: 'Food Access Comparison Under Reconciliation',
        url: 'https://tooearlytosay.com/research/food-security/food-access-vulnerability-paradox/',
        claimCovered: 'Statewide comparison across 9,033 tracts (1.03 versus 1.78 miles to stores by tract composition); its populations and direction conflict with a related page and are under reconciliation.'
      },
      {
        visibleLabel: 'Statewide Mobility Desert Estimate Record',
        title: 'Mobility Deserts: Transit Proximity Under Review',
        url: 'https://tooearlytosay.com/research/transit-equity/hidden-mobility-deserts/',
        claimCovered: 'Article-reported 12% statewide mobility-desert rate across 9,039 tracts; the transit-stop inventory (64,060 raw versus about 24,000 unique records) is under reconciliation.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Spatial Proxies vs. Trip Distance (Mode B 408 Santa Clara &amp; 251 Rural/Valley Tracts)',
    pageTitle: 'Geography: Proxy vs. Causal Mechanism | CAPHE',
    metaDescription: 'Across 408 Santa Clara tracts, poverty accounts for 62.2% of food-index spread (58.1 pp unique R2 gain) while store distance adds 0.003 pp (p = 0.827).',
    h1: 'Household Poverty Accounts for Most Neighborhood Food-Access Variation Compared With Store Distance',
    subtitle: 'We compare local poverty and SNAP rates with store distance across city, suburb, and rural census tracts.',
    endnotes: [
      '<a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">U.S. Census Bureau</a>: American Community Survey (ACS) 5-Year Census Tract Poverty, SNAP &amp; Vehicle Access Estimates (N = 408 Santa Clara Tracts, N = 225 Fresno Tracts &amp; N = 26 Nevada County Tracts).',
      '<a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: SNAP Retailer Locator Geo-Verified Store Coordinates (514 Santa Clara SNAP Stores) &amp; <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA ERS Food Access Research Atlas</a>.'
    ],
    answerHtml: 'When targeting food vans by distance to the nearest grocery store alone, a suburban team sends routes to car-owning foothill tracts while skipping low-pay renter areas near stores. Across <strong>408 Santa Clara County tracts</strong>, household poverty accounts for <strong>62.2%</strong> of the 5-part food index (a <strong>58.1 pp unique R&sup2; gain</strong>, vs. <strong>0.003 pp</strong> from distance, <em>p</em> = 0.827) because poverty and SNAP hold 55% of index weight and <strong>93.4% of tracts</strong> sit within 1 mile [1,2]. Distance maps flag foothills (<strong>4.1% of spread</strong>) where <strong>26 of 27 tracts</strong> past 1 mile have under 20% poverty [1,2]. Pairing poverty with trip miles separates urban outreach from Fresno (<strong>30 of 225 tracts, 13.3%</strong>) [1,2].',
    block2: {
      title: 'Two Spatial Rulers on the 5-Part Composite Index: Poverty Rate vs. Store Distance (N = 408 Tracts)',
      contextTag: 'Mode B Composite Vulnerability Index Split (30% Poverty, 25% SNAP, 20% Distance, 15% No-Car, 10% Density; Santa Clara N = 408 Tracts)',
      ariaLabel: 'Comparison of the share of the 5-component tract vulnerability index accounted for by household poverty at 62.2% (58.1 percentage points unique R-squared gain) versus distance to SNAP grocery stores at 0.003 percentage points unique R-squared gain after accounting for poverty',
      ruler1: {
        title: 'Ruler 1: Tract Poverty Rate (30% Index Weight)',
        stat: '62.2% of Index Spread (+58.1 pp Unique R² Gain)',
        ariaLabel: 'Household poverty accounts for 62.2% of composite index variation, with a 58.1 percentage point unique R-squared gain beyond distance and a +0.787 standardized slope',
        segments: [
          { cls: 'seg-primary', width: 62, label: 'Poverty Accounts for 62.2% of Index (+58.1 pp Unique R² Gain)' },
          { cls: 'seg-rest', width: 38, label: 'Remaining Index Spread (37.8%)' }
        ],
        desc: 'Tract poverty accounts for <strong>62.2% of the 5-part index spread</strong> (a <strong>+58.1 pp unique R&sup2; gain</strong> above distance, <strong>60.6% partial R&sup2;</strong>, and a <strong>+0.787 standardized slope</strong>) because poverty and SNAP vary widely across city tracts.'
      },
      ruler2: {
        title: 'Ruler 2: Store Trip Distance (Checked With Poverty)',
        stat: '+0.003 pp Unique R² Gain (Flat -0.006 Slope, p = 0.827)',
        ariaLabel: 'After accounting for poverty, distance to SNAP stores adds 0.003 percentage points of unique R-squared gain (0.009% partial R-squared) with a flat -0.006 standardized slope',
        segments: [
          { cls: 'seg-Housing', width: 4, label: '4.1% Alone' },
          { cls: 'seg-rest', width: 96, label: '+0.003 pp Unique R² Gain After Poverty Check (p = 0.827)' }
        ],
        desc: 'Store distance alone accounts for <strong>4.1% of index spread</strong> with a minus sign because <strong>26 of 27 tracts</strong> past 1 mile are lower-poverty foothills. Accounting for poverty leaves a <strong>+0.003 pp unique R&sup2; gain</strong> (<em>p</em> = 0.827).'
      }
    },
    table1: {
      title: 'Table 1. Store Trips, Local Poverty &amp; Car Access Across Four California Areas',
      subtitle: 'We compare store distance, local poverty, car access, and composite index spread across four California areas.',
      caption: 'Empirical comparison of store distance, poverty rate, SNAP use, car access, and composite index spread across four California areas.',
      cornerLabel: 'Area &amp; Index Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Observed Tract &amp; County Data):</strong> We use observed U.S. Census ACS 5-Year tract estimates and USDA SNAP Retailer Locator coordinates across Santa Clara County (N = 408 tracts, 514 SNAP stores, 755 DEH permits), Fresno County (N = 225 tracts), and Nevada County (N = 26 tracts; `county_rankings_ca_2023.csv`). In Santa Clara County (`regression_model_statistics.csv` and `regression_results_poverty_distance.csv`, White HC3), the outcome is the 5-component Extended Vulnerability Index (0-1 scale: 30% poverty rate, 25% SNAP rate, 20% normalized store distance, 15% no-vehicle share, 10% inverse density). Full-model R² = 62.17% (poverty alone R² = 62.17%, distance alone R² = 4.11%). Unique R² gain (semi-partial ΔR², labeled `Partial R²` in the saved CSV) is +58.06 pp for poverty and +0.0033 pp for distance; true partial R² is 60.55% for poverty and 0.0088% for distance. Poverty β_std = +0.787 (t = 12.51, p &lt; 0.0001) vs. distance β_std = -0.006 (t = -0.22, p = 0.827), VIF = 1.59.',
      columns: [
        { tag: 'Group 1', tagHighlight: true, title: 'Campus Renter Tract', subtitle: 'Mountain View Tract 5116.08 (1 of 408 county tracts, 3,252 residents).' },
        { tag: 'Group 2', tagHighlight: false, title: 'High-Pay Car Foothills', subtitle: 'Saratoga / Los Altos Hills Tract 5073.02 (26 of 27 tracts &gt;1 mile from store).' },
        { tag: 'Group 3', tagHighlight: false, title: 'Dense Suburb County', subtitle: 'Santa Clara County baseline (N = 408 tracts, 514 SNAP stores / 755 permits).' },
        { tag: 'Group 4', tagHighlight: true, title: 'Rural &amp; Valley Counties', subtitle: 'Fresno County (N = 225 tracts) &amp; Nevada County (N = 26 tracts).' }
      ],
      rows: [
        {
          label: 'Trip to Nearest SNAP Store',
          cells: [
            { val: '1.218 miles (&gt;1.0 mi city line)' },
            { val: '2.970 miles (low-density hills)' },
            { val: '0.573 mi mean (0.409 mi median)' },
            { val: 'Nevada 2.92 mi | Fresno 1.45 mi' }
          ]
        },
        {
          label: 'Tract Poverty &amp; Pay Ratio',
          cells: [
            { val: '22.1% poverty (&ge;20% USDA line)' },
            { val: '3.7% poverty (2,640 residents)' },
            { val: '532% FPL county mean pay' },
            { val: 'Fresno 19.1% pov | Nevada 10.5%' }
          ]
        },
        {
          label: 'SNAP Use &amp; Car Access',
          cells: [
            { val: '5.3% SNAP | 4.8% no car (52 HH)' },
            { val: 'Low SNAP | High car ownership' },
            { val: '5.5% SNAP | 93.4% &le;1 mi (381/408)' },
            { val: '30 of 225 Fresno tracts low-access' }
          ]
        },
        {
          label: 'USDA Low-Access Pattern',
          cells: [
            { val: 'Only 1 of 408 tracts (0.2% pop)' },
            { val: '26 of 27 &gt;1 mi tracts &lt;20% pov' },
            { val: ' Distance alone R² = 4.1% (minus)' },
            { val: 'Max 12.43 mi (Nev) / 15.53 mi (Fre)' }
          ]
        },
        {
          label: 'Unique R² Gain (ΔR² on 5-Part Index)',
          highlight: true,
          cells: [
            { val: '+58.1 pp ΔR² from poverty (60.6% partial)', barWidth: 93, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '+0.003 pp ΔR² from distance (0.009% partial)', barWidth: 1, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: 'Poverty slope 132x larger in index', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '13.3% Fresno USDA food deserts', barWidth: 13, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Standardized Index Slope',
          cells: [
            { val: '+0.787 slope from poverty' },
            { val: '-0.006 slope from distance' },
            { val: '62.2% full-model index R²' },
            { val: 'Nevada median trip 1.98 miles' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Pairing Income and Trip Measures Across Suburban, Valley, and Rural Tracts',
      subtitle: 'We match the screening rule to what poverty and store distance measure in each California area.',
      caption: 'Decision matrix evaluating local context, index behavior, single-metric screening risk, and targeting rules across four areas.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Local Area &amp; Renter Context',
          cells: [
            { val: 'High-rent (84.8%) Mountain View tract near Shoreline Park with 95.2% car access.' },
            { val: 'Saratoga and Los Altos Hills tracts with large lots and no retail zoning.' },
            { val: 'Dense suburb county where 381 of 408 tracts (93.4%) sit within 1 mile of a SNAP store.' },
            { val: 'Fresno County (30 of 225 low-access tracts) and rural Nevada County (2.92 mi mean trip).' }
          ]
        },
        {
          label: 'What the Tract Measures Show',
          cells: [
            { val: 'Only 1 county tract meets both USDA cutoffs (1.218 mi and 22.1% poverty), with 5.3% SNAP use.' },
            { val: '26 of 27 Santa Clara tracts past 1 mile from a SNAP store have under 20% poverty.' },
            { val: 'Poverty accounts for 62.2% of the 5-part index spread while distance adds +0.003 pp ΔR².' },
            { val: 'In Fresno (max 15.53 mi) and Nevada County (max 12.43 mi), long trips and poverty overlap.' }
          ]
        },
        {
          label: 'Risk of Distance-Only Screening',
          cells: [
            { val: 'Relying on the 1-mile line alone flags 1 tract while skipping high-SNAP urban renter tracts.' },
            { val: 'Sending food vans to tracts past 1 mile without a poverty check puts 26 of 27 routes in rich hills.' },
            { val: 'Treating a composite index slope as a store-opening trial misreads an observational accounting split.' },
            { val: 'Applying dense suburban distance patterns to rural Sierra or valley tracts leaves out 12-to-15-mile trips.' }
          ]
        },
        {
          label: 'Best Targeting &amp; Screening Action',
          policyFit: true,
          cells: [
            { headline: 'Check SNAP &amp; Cars Before Siting', detail: 'Check SNAP use (5.3%) and no-car homes (52 HH) alongside the 1.2-mile trip.' },
            { headline: 'Pair Distance Maps With Poverty', detail: 'Filter >1-mile tract lists by poverty (>=20%) and no-car shares before routing vans.' },
            { headline: 'Target CalFresh in High-Poverty Tracts', detail: 'Use poverty and SNAP rates to target benefit outreach in dense urban tracts.' },
            { headline: 'Route Vans &amp; EBT to Rural Gaps', detail: 'Target mobile pantries and online EBT delivery where >1-10 mi trips meet high poverty.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Composite Index Definition, Semi-Partial vs. Partial R² &amp; Provenance',
      notesBullets: [
        '<strong>Composite Index Definition &amp; Regression Decomposition (Mode B, N = 408 Santa Clara Tracts):</strong> In `regression_poverty_vs_distance.py` (`regression_results_poverty_distance.csv` and `regression_model_statistics.csv`), the dependent variable is the 5-component Extended Vulnerability Index (`0-1` scale, mean `0.1960`, range `0.0988` to `0.4818`; `extended_vulnerability_index_SNAP_VERIFIED_20251029_metadata.json`), weighted `30%` poverty rate (ACS S1701), `25%` SNAP participation, `20%` normalized distance to 514 SNAP stores, `15%` no-vehicle households (ACS B25044), and `10%` inverse population density. Because poverty and distance are components of this index, the OLS model (`Index_0_1 = 0.1294 + 0.9920(Poverty_Rate, SE = 0.0793, t = 12.51, p < 0.0001, β_std = +0.787) - 0.0026(Distance_mi, SE = 0.0117, t = -0.22, p = 0.827, β_std = -0.006)`, White HC3, `R² = 0.6217`, `F = 80.24`, `VIF = 1.59`) is a cross-sectional variance decomposition of the index, not a causal estimate of store openings. Poverty alone gives `R² = 0.6217 (62.2%)` and distance alone gives `R² = 0.0411 (4.1%)`. The semi-partial `ΔR²` (`R²_full - R²_reduced`, labeled `Partial R²` in `regression_model_statistics.csv`) is `0.5806 (58.1 pp)` for poverty and `0.000033 (0.003 pp)` for distance; the true partial `R²` (`ΔR² / (1 - R²_reduced)`) is `0.6055 (60.6%)` for poverty given distance and `0.000088 (0.009%)` for distance given poverty. On the 0-100 index scale in `PHASE6_FINAL_DELIVERABLE.md`, the slopes are `+0.7768` and `-0.0173` (`β_std` ratio `0.7870 / 0.00594 = 132.5x`).',
        '<strong>Data Provenance:</strong> Exact results come from `FoodSecurity/analysis/outputs/regression_results_poverty_distance.csv, FoodSecurity/analysis/outputs/regression_model_statistics.csv, FoodSecurity/data/processed/extended_vulnerability_index_SNAP_VERIFIED_20251029_metadata.json, FoodSecurity/data/processed/statewide/county_rankings_ca_2023.csv, FoodSecurity/FOOD_DESERT_LOCATION_DETAILS.md (L1-115), and FoodSecurity/PHASE6_FINAL_DELIVERABLE.md (L1-110)`.'
      ]
    },
    synthesis: {
      title: 'What Cross-Sectional Tract Maps Can and Cannot Tell a County Team',
      p1: 'A census-tract map summarizes where low-income households and grocery stores sit, but a single distance threshold can misclassify dense suburbs. In Santa Clara County (N = 408 tracts, 514 verified SNAP stores), 93.4% of tracts (381 of 408) sit within 1.0 mile of a SNAP store (mean 0.573 miles, median 0.409 miles). Of the 27 tracts beyond 1.0 mile, 26 are lower-poverty foothill areas (such as Tract 5073.02 at 2.97 miles and 3.7% poverty), while only 1 tract (Mountain View Tract 5116.08, 3,252 residents, 1.218 miles, 22.1% poverty) meets both USDA food-desert cutoffs.',
      p2: 'Decomposing the county\'s 5-part vulnerability index (weighted 30% poverty, 25% SNAP, 20% store distance, 15% no-car share, and 10% density) shows that poverty accounts for 62.2% of index variance (+58.1 pp unique R² gain, 60.6% partial R²), whereas store distance adds +0.003 pp unique R² gain (p = 0.827) once poverty is included. Because this is an observational decomposition of a composite index in a store-dense county, it does not test the causal effect of building a store. Instead, it shows that suburban teams should pair poverty and SNAP rates with car access rather than screening by distance alone, while rural and valley counties with wider store gaps (such as Fresno County with 30 of 225 tracts at 13.3% USDA low-access up to 15.53 miles, and Nevada County averaging 2.92 miles up to 12.43 miles) require joint income-and-distance targeting.'
    },
    methodologyParagraphs: [
      '<strong>Mode B Composite-Index Decomposition &amp; County Comparisons:</strong> All regression figures (`N = 408`, `R² = 62.17%`, poverty-only `R² = 62.17%`, distance-only `R² = 4.11%`, semi-partial `ΔR² = 58.06 pp` vs. `0.0033 pp`, true partial `R² = 60.55%` vs. `0.0088%`, `β_std = +0.7870` vs. `-0.0059`, `p = 0.827`, `F = 80.24`, `VIF = 1.59`) come from `FoodSecurity/analysis/outputs/regression_model_statistics.csv` and `regression_results_poverty_distance.csv` on the 5-component Extended Vulnerability Index (`extended_vulnerability_index_SNAP_VERIFIED_20251029_metadata.json`). Rural and valley comparisons (`Fresno County: 30 of 225 tracts = 13.3% food deserts, mean 1.45 mi, max 15.53 mi; Nevada County: 26 tracts, mean 2.92 mi, median 1.98 mi, max 12.43 mi`) come from `FoodSecurity/data/processed/statewide/county_rankings_ca_2023.csv`. Companion TooEarlyToSay pages (including the article-reported 12% or 1,086 of 9,039 tracts statewide mobility-desert series flagged in `FoodSecurity/analysis/MOBILITY_DESERTS_STATUS.md` for incomplete transit agency coverage and coordinate-projection reconciliation) are excluded from empirical claims and policy recommendations on this page.',
      '<strong>Main Sources:</strong> We use <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau American Community Survey (ACS 5-Year Tract Estimates)</a> and <a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FNS SNAP Retailer Locator (Geo-Verified Store Coordinates)</a>. We also use <a href="https://www.ers.usda.gov/data-products/food-access-research-atlas/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA ERS Food Access Research Atlas</a>.'
    ],
    faqs: [
      {
        question: 'Why did store distance show a negative single-factor R² of 4.1% if its unique R² gain after accounting for poverty is +0.003 pp (p = 0.827)?',
        answer: 'That pattern reflects spatial sorting across Santa Clara County\'s 408 tracts. Exactly 26 of the 27 tracts located more than 1.0 mile from a SNAP store are lower-poverty foothill areas (under 20% poverty). In a single-factor regression on the composite index, distance acts as a proxy for foothill affluence. Once poverty rate is included, distance adds +0.003 pp of unique R² gain (0.009% partial R², p = 0.827).'
      },
      {
        question: 'What is the difference between semi-partial ΔR² (58.1 pp) and partial R² (60.6%), and what does the composite index measure?',
        answer: 'The outcome is a 0-1 composite index weighted 30% poverty, 25% SNAP rate, 20% normalized store distance, 15% no-vehicle households, and 10% inverse density. Semi-partial ΔR² (58.06 pp, labeled Partial R² in the saved summary CSV) subtracts distance-only R² (4.11%) from full-model R² (62.17%). True partial R² divides that 58.06 pp gain by the 95.89% variance left unexplained by distance alone, giving 60.55% (60.6%).'
      },
      {
        question: 'Why was only 1 of 408 Santa Clara County tracts flagged as a USDA food desert compared with 30 of 225 tracts (13.3%) in Fresno County?',
        answer: 'The USDA urban food-desert rule requires BOTH >=20% tract poverty AND >1.0 mile to a supermarket (>10 miles in rural tracts). Santa Clara County has 514 verified SNAP stores (mean distance 0.573 miles, 93.4% of tracts within 1.0 mile), so only Mountain View Tract 5116.08 (1.218 miles, 22.1% poverty, 3,252 residents) crosses both lines. Fresno County spans wider rural and agricultural tracts (mean 1.45 miles, max 15.53 miles), where 30 of 225 tracts (13.3%) cross both thresholds.'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Modeled Post-Rent Household Budgets Reveal Severe Food Strain Above Federal Gross-Income Cutoffs', note: 'Track 2 reference case comparing FPL, CPM, MIT Living Wage, and Housing-First residual income' },
      { slug: 'threat-measurement-instrumentation', title: 'Verified CalFresh Store Lists Double Measured Grocery Distance Compared With Commercial Map Directories', note: 'Case study showing how SNAP EBT verification and GTFS transit feeds change tract metrics' },
      { slug: 'food-insecurity-diabetes', title: 'Untangling Food Insecurity & Diabetes Feedback', note: 'Track 4 flagship case study on bidirectional chronic-disease pathways' }
    ]
  },

  // =========================================================================
  // MODULE #14: identical-data-opposite-policies (Track 2, community)
  // =========================================================================
  {
    slug: 'identical-data-opposite-policies',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,129 census tracts, a flat $26.66 Medi-Cal fee schedule covers less than 11% of community health worker labor costs.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Nominal vs. Real Indices (Mode B Official GPCI &amp; ACS Data)',
    pageTitle: 'Nominal vs. Cost-Adjusted Medi-Cal Fees | CAPHE',
    metaDescription: 'See how California\'s uniform nominal Medi-Cal schedule interacts with CMS Practice Expense GPCI (1.506 in San Francisco vs 0.900 in Imperial) and ACS rents.',
    h1: 'Uniform Statewide Medi-Cal Fee Schedules Deliver Unequal Clinic Purchasing Power Across Counties',
    subtitle: 'We compare local clinic costs with area need to match payment rates and staff grants.',
    endnotes: [
      '<a href="https://www.cms.gov/medicare/payment/fee-schedules/physician" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Centers for Medicare &amp; Medicaid Services (CMS)</a>: CY 2026 Physician Fee Schedule Final Rule Practice Expense GPCI (with CAPHE 3-part cost shares: 55.6% clinical wages, 29.7% rent, 14.7% estimated services).',
      '<a href="https://www.neighborhoodatlas.medicine.wisc.edu/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">University of Wisconsin School of Medicine and Public Health</a>: Area Deprivation Index (ADI) Neighborhood Atlas &amp; <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Estimates</a>.',
      '<a href="https://www.macpac.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">MACPAC (Jan 2025) &amp; Dunn et al.</a>: Medicaid Provider Billing Friction (17.6% claim value loss) &amp; <a href="https://doi.org/10.1056/NEJMsa1413299" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Polsky et al. (2015), <em>NEJM</em>, 372(6), 537&ndash;545</a>.'
    ],
    answerHtml: 'When setting Medi-Cal clinic pay rates from one state list alone, a state agency sends funds to high-wage coastal cities or low-pay inland counties based on whether the rule tracks overhead or local poverty. Tying city clinic rates to the CMS Practice Expense GPCI backs coastal clinics where overhead runs <strong>50.6% above the US mean</strong> (<strong>1.506 index</strong> in San Francisco vs. <strong>0.900</strong> in Imperial County) [1]. One flat fee list leaves out cost and need gaps because San Francisco sits at the <strong>15th percentile</strong> of local need while Imperial County sits at the <strong>85th percentile</strong> [2]. Pairing cost rate boosts with loan grants and simpler billing (saving <strong>17.6%</strong> claim value) fits both [1,3].',
    block2: {
      title: 'Two Policy Rulers on the Same State Schedule: Practice Expense GPCI vs. Local Need',
      contextTag: 'Mode B Observed Federal &amp; State Benchmarks: CMS CY 2026 Practice Expense GPCI, Census ACS Gross Rent, Local Need Percentile &amp; MACPAC Billing Loss',
      ariaLabel: 'Comparison of CMS CY 2026 Practice Expense GPCI (1.506 in San Francisco vs 0.900 in Imperial) versus Neighborhood Need percentile (15th percentile in San Francisco vs 85th percentile in Imperial)',
      ruler1: {
        title: 'Ruler 1: CMS Practice Expense GPCI (CY 2026)',
        stat: '1.506 in SF (+50.6%) vs. 0.900 in Imperial (-10.0%)',
        ariaLabel: 'CMS Practice Expense GPCI is 1.506 in San Francisco (+50.6% above national average) versus 0.900 in Imperial County (-10.0% below national average)',
        segments: [
          { cls: 'seg-Housing', width: 63, label: 'San Francisco PE GPCI: 1.506 (+50.6%)' },
          { cls: 'seg-primary', width: 37, label: 'Imperial PE GPCI: 0.900 (-10.0%)' }
        ],
        desc: 'A CAPHE 3-part composite re-weights CMS Practice Expense GPCI parts to <strong>55.6% staff pay, 29.7% office rent, and 14.7% estimated services</strong>. Under a flat state fee list, San Francisco clinics face <strong>1.67x higher costs (1.506 vs. 0.900)</strong> than Imperial County.'
      },
      ruler2: {
        title: 'Ruler 2: Local Need Index &amp; Renter Pay Strain',
        stat: '85th Percentile in Imperial vs. 15th in SF (5.7x Flip)',
        ariaLabel: 'Neighborhood Need Index ranks Imperial County at the 85th national percentile of socioeconomic deprivation versus the 15th percentile in San Francisco',
        segments: [
          { cls: 'seg-food', width: 85, label: 'Imperial &amp; Valley Need: 85th Percentile (Fresno Rent $1,007 on $3,103 Pay)' },
          { cls: 'seg-Housing', width: 15, label: 'SF 15th' }
        ],
        desc: 'Tracking resident need flips the map. Imperial sits at the <strong>85th US need percentile</strong> and Central Fresno homes earn <strong>$3,103/mo (rent $1,007)</strong>. San Francisco sits at the <strong>15th percentile</strong> and Santa Clara homes earn <strong>$13,306/mo (rent $2,814)</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Clinic Costs vs. Local Need Across Four Market Types',
      subtitle: 'We compare clinic cost scores, monthly rent share, and local need across four health markets.',
      caption: 'Cross-market comparison of CMS Practice Expense GPCI, Census ACS monthly rent and pay, Local Need percentile, MACPAC billing loss, and Polsky NEJM visit gains.',
      cornerLabel: 'Market &amp; Cost Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates:</strong> We use observed CMS CY 2026 Practice Expense GPCI scores and a CAPHE 3-part normalization of three PE sub-components (19.15% staff wages, 10.22% office rent, and 5.07% estimated purchased services divided by their 34.44% sum = 55.6% pay, 29.7% rent, and 14.7% estimated services). We pair these with Census ACS 5-Year median gross rent (B25064) and household pay (B19013) across different census universes. We also include the Local Need Index (ADI US percentile) and published MACPAC (Jan 2025) and Polsky et al. (2015, NEJM) benchmarks.',
      columns: [
        { tag: 'Group 1', tagHighlight: true, title: 'High-Cost City Market', subtitle: 'San Francisco &amp; Bay Area (CMS Area 05 / Santa Clara ACS baseline).' },
        { tag: 'Group 2', tagHighlight: false, title: 'High-Rent Working Tract', subtitle: 'Marin County: San Rafael Canal area (Tract 1122.03).' },
        { tag: 'Group 3', tagHighlight: false, title: 'Rural Foothills Market', subtitle: 'Nevada County (Sierra Foothills rural area).' },
        { tag: 'Group 4', tagHighlight: true, title: 'High-Need Farm Region', subtitle: 'Central Valley &amp; Imperial County (Central Fresno Tract 2 &amp; Imperial).' }
      ],
      rows: [
        {
          label: 'Practice Expense GPCI',
          highlight: true,
          cells: [
            { val: '1.506 (+50.6% vs US base)', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '1.380 (+38.0% coast metro)', barWidth: 92, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '1.025 (+2.5% rural Sierra)', barWidth: 68, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.900 (-10.0% Imperial)', barWidth: 60, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Share of Income Spent on Monthly Rent',
          cells: [
            { val: '21.1% ($2,814)' },
            { val: '42.1% ($2,318)' },
            { val: '23.1% ($1,635)' },
            { val: '32.5% ($1,007)' }
          ]
        },
        {
          label: 'Median Monthly Pay',
          cells: [
            { val: '$13,306' },
            { val: '$5,507' },
            { val: '$7,075' },
            { val: '$3,103' }
          ]
        },
        {
          label: 'Local Need Index (ADI)',
          highlight: true,
          cells: [
            { val: '15th percentile (Low need)', barWidth: 18, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '45th percentile (Rent strain)', barWidth: 53, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '55th percentile (Rural spread)', barWidth: 65, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '85th percentile (High need)', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'Billing Friction Loss (MACPAC)',
          cells: [
            { val: '17.6% Medicaid vs 2.4% Private' },
            { val: '17.6% Medicaid vs 4.7% Medicare' },
            { val: '17.6% Medicaid billing loss' },
            { val: '17.6% Medicaid billing loss' }
          ]
        },
        {
          label: 'Visit Gain From Fee Bump',
          cells: [
            { val: '+1.25 pp per 10% real bump' },
            { val: '58.7% to 66.4% (+7.7 pp total)' },
            { val: '58.7% base visit rate' },
            { val: '66.4% post-bump visit rate' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Matching Coastal Cost Boosts and Inland Staff Grants to Local Markets',
      subtitle: 'We show why clinic cost and local need point in opposite ways and how two tools fix both.',
      caption: 'Decision matrix comparing policy frames, market limits, single-rule risks, and two-tool policy fit across four areas.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'The Main Policy Case',
          cells: [
            { val: 'With a 1.506 cost score and $2,814 rent, a flat Medi-Cal dollar buys one-third less care in the Bay Area.' },
            { val: 'In Marin\'s Canal area, families pay $2,318 rent (42.1% of $5,507 pay) and clinics pay high coast wages.' },
            { val: 'Nevada County has near-mean costs (1.025, rent $1,635), but wide rural miles limit clinic patient volume.' },
            { val: 'Imperial and Central Fresno sit at the 85th need percentile ($3,103 pay), where low rent (0.900) cannot draw doctors.' }
          ]
        },
        {
          label: 'Main Market Constraint',
          cells: [
            { val: 'High private pay (2.4% billing loss vs. 17.6% in Medicaid) and +50.6% clinic costs crowd out solo practices.' },
            { val: 'High county pay (15th need percentile) covers up renter tracts where clinics pay coast wages to serve workers.' },
            { val: 'Fixed clinic rent spread across small rural panels makes the 17.6% Medicaid billing loss hard to absorb.' },
            { val: 'Even when a flat Medi-Cal dollar goes further against $1,007 rent, few doctors open offices in border tracts.' }
          ]
        },
        {
          label: 'Risk of Using One Metric Alone',
          cells: [
            { val: 'Setting pay boosts by local need alone (15th percentile) leaves Bay Area clinics with +50.6% higher wage and rent bills.' },
            { val: 'Using county mean pay leaves out high-rent worker tracts where 42.1% of pay goes to rent.' },
            { val: 'Using city cost boosts without rural floors leaves foothill clinics with neither rate boosts nor hiring grants.' },
            { val: 'Cutting inland Medi-Cal pay because Imperial\'s cost score is 0.900 lowers clinic pay in 85th-percentile need areas.' }
          ]
        },
        {
          label: 'Two-Tool Policy Fit',
          policyFit: true,
          cells: [
            { headline: 'Tie Clinic Rates to Local Costs', detail: 'Link city Medi-Cal fee lists to the CMS Practice Expense GPCI.' },
            { headline: 'Target Renter Tracts by Need', detail: 'Pair Bay Area cost boosts with local outreach in high-rent tracts.' },
            { headline: 'Cut 17.6% Billing Friction', detail: 'Simplify claims to save the 15.2 pp gap between Medicaid and private plans.' },
            { headline: 'Send Staff Grants to High Need', detail: 'Use 85th-percentile need ranks to fund loan pay and clinic grants in Fresno.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: CMS Practice Expense GPCI, MACPAC Billing Loss &amp; Provenance',
      notesBullets: [
        '<strong>CMS Practice Expense GPCI &amp; CAPHE 3-Part Composite (Mode B):</strong> Under the CMS CY 2026 Physician Fee Schedule Final Rule, three Practice Expense GPCI sub-components (19.15% employee wages from BLS OEWS, 10.22% office rent from Census ACS/HUD 2BR rent, and 5.07% estimated purchased services, summing to 34.44% of total MEI weight) normalize to a 3-part CAPHE composite of 55.6% staff pay, 29.7% office rent, and 14.7% estimated services. San Francisco PE GPCI is 1.506 (+50.6% above the US mean, ADI ~15th percentile) vs. Imperial County at 0.900 (-10.0%, ADI ~85th percentile).',
        '<strong>Billing Loss &amp; Fee Bump Benchmarks (Mode B):</strong> Dunn, Gottlieb, Shapiro, &amp; Sonnenstuhl / MACPAC (Jan 2025) show that Medicaid providers lose 17.6% of claim value to billing hurdles, vs. 4.7% in Medicare and 2.4% in private plans. Polsky et al. (2015, *NEJM*) find that the Medicaid fee bump raised primary care visit access by +7.7 pp (58.7% to 66.4%, or +1.25 pp per 10% fee bump). Census ACS 5-Year (2019-2023) rent and pay numbers come from different census universes (B19013 all households vs. B25064 renter homes).'
      ]
    },
    synthesis: {
      title: 'Matching Cost Rate Indexing and Need-Targeted Staff Grants to Local Markets',
      p1: 'In state budget hearings, coastal city health systems and inland rural groups show real federal data that rank counties in opposite ways. Coastal groups cite the CMS Practice Expense GPCI (where a CAPHE 3-part composite weights staff pay at 55.6% and office rent at 29.7%). San Francisco\'s Practice Expense GPCI sits at 1.506 (+50.6% above the US mean, with Santa Clara median rent at $2,814/month). Because the state pays one flat Medi-Cal fee list, coastal clinics face tight margins. Inland and border groups cite the Local Need Index (ADI) and Census ACS pay. Imperial County sits at the 85th US need percentile and Central Fresno homes earn $3,103/month ($1,007 rent), while San Francisco sits at the 15th percentile.',
      p2: 'Health economics shows that these two rulers do not conflict. They track two separate market limits that need two separate tools. Polsky et al. (2015, NEJM) show that raising primary care fees lifts visit access by +7.7 pp (58.7% to 66.4%, or +1.25 pp per 10% fee bump). Dunn et al. / MACPAC (2025) show that 17.6% of Medicaid claim value is lost to billing hurdles (vs. 2.4% in private plans). Tying fee lists to clinic costs and cutting the 17.6% billing loss backs high-cost city clinics. Sending CalHealthCares loan pay and residency grants by local need builds doctor supply in inland counties.'
    },
    methodologyParagraphs: [
      '<strong>Mode B Observed Benchmarks:</strong> All CMS CY 2026 Practice Expense GPCI scores (1.506 San Francisco vs. 0.900 Imperial) and CAPHE 3-part normalized cost shares (55.6% pay, 29.7% rent, 14.7% estimated services from the 19.15%, 10.22%, and 5.07% MEI shares) are Mode B data. They pair with Area Deprivation Index percentiles (15th vs. 85th) and Census ACS 5-Year (2019-2023) rents ($2,814, $2,318, $1,635, $1,007) and monthly pay ($13,306, $5,507, $7,075, $3,103) across different census universes. MACPAC billing loss rates (17.6% Medicaid, 4.7% Medicare, 2.4% private) and Polsky et al. (58.7% to 66.4%, +7.7 pp) benchmarks come from the CMS CY 2026 Physician Fee Schedule Final Rule and Census ACS 5-Year tables.',
      '<strong>Main Sources:</strong> We cite <a href="https://www.cms.gov/medicare/payment/fee-schedules/physician" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS CY 2026 Physician Fee Schedule Final Rule (Geographic Practice Cost Indices)</a> and <a href="https://www.macpac.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">MACPAC (Jan 2025) &amp; Dunn, Gottlieb, Shapiro, &amp; Sonnenstuhl on Medicaid Billing Friction</a>. We also use <a href="https://doi.org/10.1056/NEJMsa1413299" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Polsky et al. (2015), NEJM, 372(6), 537-545</a> and <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Estimates (Tables B19013 &amp; B25064)</a>.'
    ],
    faqs: [
      {
        question: 'How does the CAPHE 3-part composite of the CMS Practice Expense GPCI weight local pay and rent?',
        answer: 'Under the CMS CY 2026 Physician Fee Schedule Final Rule, three Practice Expense GPCI sub-components (19.15% local health staff wages from BLS OEWS, 10.22% office rent from Census ACS 2-bedroom gross rent, and 5.07% estimated purchased services) normalize across their 34.44% sum to 55.6% staff pay, 29.7% rent, and 14.7% estimated services. The overall Practice Expense GPCI is 1.506 in San Francisco vs. 0.900 in Imperial County.'
      },
      {
        question: 'Why do the CMS Practice Expense GPCI and the Area Deprivation Index rank San Francisco and Imperial in opposite ways?',
        answer: 'The CMS Practice Expense GPCI tracks what a clinic pays to hire staff and rent space (1.506 in SF vs. 0.900 in Imperial). The Area Deprivation Index (ADI) tracks resident poverty and hardship (15th percentile in SF vs. 85th percentile in Imperial). High-cost cities squeeze clinic margins, while high-need rural counties face low family pay and doctor shortages.'
      },
      {
        question: 'How much does billing friction cut real Medicaid pay?',
        answer: 'Work by Dunn, Gottlieb, Shapiro, and Sonnenstuhl cited by MACPAC (January 2025) shows that Medicaid providers lose 17.6% of claim value to denials and billing hurdles. That is more than triple Medicare (4.7%) and seven times private plans (2.4%).'
      }
    ],
    related: [
      { slug: 'food-affordability-tradeoffs', title: 'Modeled Post-Rent Household Budgets Reveal Severe Food Strain Above Federal Gross-Income Cutoffs', note: 'Track 2 flagship comparing pre-rent and post-rent household budgets across Marin, Fresno, Nevada, and Santa Clara' },
      { slug: 'measurement-error-claims', title: 'Directory Registry Counts vs. Active Claims Billers', note: 'Case study analyzing managed care encounter shares and administrative billing friction' },
      { slug: 'collider-bias', title: 'Filtered-Group Shift in Active-Biller Subsets', note: 'Case study on how conditioning on active billers shifts observed correlations' }
    ]
  },

  // =========================================================================
  // MODULE #16: threat-measurement-instrumentation (Track 2, community)
  // =========================================================================
  {
    slug: 'threat-measurement-instrumentation',
    tetsCompanion: [
      {
        visibleLabel: 'EBT Retailer Verification Method',
        title: 'The Retail Density Paradox: Why More Stores Mean Worse Data',
        url: 'https://tooearlytosay.com/research/methodology/ebt-verification-methodology/',
        claimCovered: 'Proposed EBT acceptance verification across 7,023 California food retailers; seven-county counts, matching thresholds, and the r = -0.828 correlation are under reconciliation.'
      },
      {
        visibleLabel: 'Transit Stop Deduplication Claim Record',
        title: 'Transit Data Quality Under Reconciliation',
        url: 'https://tooearlytosay.com/research/transit-equity/data-quality-49-to-12/',
        claimCovered: 'Article-reported shift from 49% to 12% of tracts classified as mobility deserts; the raw versus deduplicated stop counts behind it are under reconciliation.'
      },
      {
        visibleLabel: 'GTFS Feed Validation Workflow in Python',
        title: 'GTFS Validation in Python: An Article-Reported Workflow',
        url: 'https://tooearlytosay.com/research/methodology/gtfs-validation-python/',
        claimCovered: 'Six-layer instructional GTFS validation workflow; the seven-county, 11-feed routing results are article-reported and the project scripts are not public.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Instrumentation Shifts (Mode B Multi-Instrument Audit)',
    pageTitle: 'Instrumentation Shifts & Measurement | CAPHE',
    metaDescription: 'See how switching from 6,613 broad food listings to 514 SNAP-verified EBT retailers doubles measured distance (+97%) without a single store closing.',
    h1: 'Verified CalFresh Store Lists Double Measured Grocery Distance Compared With Commercial Map Directories',
    subtitle: 'We compare raw business map lists with verified SNAP store lists when mapping local food access.',
    endnotes: [
      '<a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">USDA Food and Nutrition Service (FNS)</a>: SNAP Retailer Locator (514 Verified EBT Retailers across 408 Santa Clara County Census Tracts).',
      '<a href="https://deh.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Santa Clara County Department of Environmental Health (DEH)</a>: Active Retail Food Facility Permit Registry (755 Permitted Grocers, 97.5% Concordance).',
      '<a href="https://www.cdss.ca.gov/inforesources/research-and-data/calfresh-data-tables" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Social Services (CDSS)</a>: Monthly CalFresh Caseloads vs. <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Rolling Windows</a>.'
    ],
    answerHtml: 'A county food team that switches its map from raw business listings to verified CalFresh EBT stores shifts local store counts even when zero stores opened or closed. Checking map lists against <strong>514 verified CalFresh EBT stores</strong> and <strong>755 county health permits</strong> keeps <strong>81.7% of top-need areas (67 of 82 tracts)</strong> in the same top tier [1,2]. Raw map queries return <strong>6,613 food spots</strong> (such as cafes that do not take CalFresh), so switching to verified grocers doubles mean trip distance by <strong>+97% (0.29 to 0.573 miles)</strong> with zero store closures [1,2]. Checking map feeds and 5-year census surveys against monthly permits and caseloads keeps grants aimed at real local gaps [2,3].',
    block2: {
      title: 'Two Store Rulers on the Same 408 Tracts: Raw Map Spots vs. SNAP-Verified EBT Stores',
      contextTag: 'Mode B Store-List Check on 408 Santa Clara Tracts (Permit Deduplication &amp; Survey Window Checks in Table 1)',
      ariaLabel: 'Comparison of 6,613 unverified commercial food stores yielding 0.29 miles mean distance versus 514 SNAP-verified EBT stores yielding 0.573 miles mean distance',
      ruler1: {
        title: 'Ruler 1: Broad Food Map List (6,613 Raw Spots)',
        stat: '0.29 Miles Mean Trip (6,613 Spots)',
        ariaLabel: 'Broad commercial food POI query returns 6,613 establishments with 0.29 miles mean distance and 0.25 miles median distance',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '6,100 Non-SNAP / Non-Grocery Spots (92.2% Noise)' },
          { cls: 'seg-primary', width: 8, label: '514 SNAP' }
        ],
        desc: 'Pulling broad food map tags returns <strong>6,613 spots</strong> (such as cafes, snack shops, and mini-marts that do not take CalFresh EBT). That shrinks mean tract distance to <strong>0.29 miles (0.25 mi median)</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: SNAP EBT &amp; Health Permit List (514 EBT / 755 Permits)',
        stat: '0.573 Miles (+97% Trip; 81.7% Top-Tier Steady)',
        ariaLabel: 'Restricting to 514 SNAP-verified EBT retailers doubles mean distance to 0.573 miles (+97%), yet 81.7% of top-quintile tracts (67 of 82) remain in the highest-need tier',
        segments: [
          { cls: 'seg-food', width: 82, label: '81.7% of Top-Need Tracts (67/82) Stay in Top Tier' },
          { cls: 'seg-rest', width: 18, label: '18.3% Nearby Shift' }
        ],
        desc: 'Keeping only <strong>514 USDA SNAP EBT stores</strong> (checked at a <strong>97.5% accuracy</strong> against <strong>755 DEH permitted grocers</strong>) doubles mean distance to <strong>0.573 miles</strong>. Still, <strong>81.7% of top-need tracts (67/82)</strong> and <strong>98.0% within &pm;1 tier</strong> stay put.'
      }
    },
    table1: {
      title: 'Table 1. Four Data Rule Shifts That Look Like Big Policy or Market Shifts',
      subtitle: 'We compare four real data rule shifts across map tags, SNAP lists, permit records, and survey waves.',
      caption: 'Comparison of old ruler vs. checked ruler, apparent metric jump, real local change, and rank stability across four California data feeds.',
      cornerLabel: 'Data Check Step',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Observed Data Rule Shifts):</strong> Each column uses its own group base and is not pooled across columns. Shift 1 counts Santa Clara County food map spots (344 single-tag vs. 6,613 multi-tag). Shift 2 tracks distance for 408 Santa Clara census tracts (6,613 spots vs. 514 SNAP stores, checked against 755 refined / 724 confirmed DEH permits). Shift 3 tracks Santa Clara County DEH food permit deduplication (`DEHDENOM_UPDATES_SUMMARY.md`: 8,555 raw permit rows minus 1,220 multi-department duplicates = 7,335 unique sites, yielding 755 refined / 724 confirmed SNAP-eligible grocers vs. 987 under an older un-deduplicated keyword rule). Shift 4 compares ACS 5-year survey homes with CDSS monthly caseloads (`PHASE6_FINAL_DELIVERABLE.md`). In Shift 2 across N = 408 tracts (`EXTENDED_VULNERABILITY_SNAP_VERIFIED_RESULTS.md`), 266 of 408 tracts (65.2%) stay in the exact same quintile, 400 of 408 (98.0%) stay within ±1 quintile, and 67 of 82 Q5 tracts (81.7%) stay in Q5.',
      columns: [
        { tag: 'Shift 1: Map Tag', tagHighlight: false, title: 'Google Map Tags', subtitle: 'Base: SCC Store Spots.' },
        { tag: 'Shift 2: EBT Filter', tagHighlight: true, title: 'Broad Spots vs. SNAP EBT', subtitle: 'Base: 408 SCC Tracts.' },
        { tag: 'Shift 3: Permit List', tagHighlight: true, title: 'Raw vs. Deduplicated DEH', subtitle: 'Base: 8,555 SCC Permits.' },
        { tag: 'Shift 4: Survey Wave', tagHighlight: false, title: 'ACS 5-Yr vs. CDSS Rolls', subtitle: 'Base: Survey vs. Rolls.' }
      ],
      rows: [
        {
          label: 'Ruler A (First or Raw Feed)',
          cells: [
            { val: '344 stores (1 old tag)' },
            { val: '6,613 broad spots (0.29 mi)' },
            { val: '8,555 raw rows (987 old est)' },
            { val: '27,068 ACS 2020 HH (-4.94% dip)' }
          ]
        },
        {
          label: 'Ruler B (Checked Feed)',
          cells: [
            { val: '6,613 stores (multi-tag pull)' },
            { val: '514 SNAP / 755 DEH (0.573 mi)' },
            { val: '7,335 sites (755 / 724 grocers)' },
            { val: '+56% to +71% CDSS CalFresh' }
          ]
        },
        {
          label: 'Apparent Shift From Ruler Change',
          highlight: true,
          cells: [
            { val: '+1,822% Store Jump', barWidth: 100, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '-92.2% Stores | +97% Trip', barWidth: 92, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '-14.3% Counter Duplicates (-1,220)', barWidth: 14, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-4.9% Survey vs. +71% Rolls', barWidth: 71, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Real Change on the Street',
          cells: [
            { val: '0 new stores (tag fix only)' },
            { val: '0 stores closed (EBT filter)' },
            { val: '0 grocers closed (merged depts)' },
            { val: '5-yr wave watered down 2020' }
          ]
        },
        {
          label: 'Cross-Check &amp; Rank Match',
          cells: [
            { val: '8.76x higher than 755 permits' },
            { val: '81.7% top-tier steady (67/82)' },
            { val: '97.5% retail accuracy (477/489)' },
            { val: 'ACS rose +17.15% in 2022-23' }
          ]
        },
        {
          label: 'Match Across Data Lists',
          cells: [
            { val: 'Google matched 42.1% of retail' },
            { val: '65.2% same tier | 98.0% in 1 tier' },
            { val: 'Removed 35 chain cafes &amp; 3 bars' },
            { val: '28,476 (2019) vs 28,880 (-1.4%)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How to Check Data Feeds So Rule Shifts Do Not Misguide Grants',
      subtitle: 'We set clear check rules for map APIs, SNAP store lists, permit registries, and 5-year census waves.',
      caption: 'Decision matrix mapping each data rule shift to its cause, budget risk, and data check rule.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Why the Data Shift Happened',
          cells: [
            { val: 'Google retired one old store tag, so a single-tag script pulled just 344 stores until multi-tag pulls found 6,613.' },
            { val: 'Map APIs do not check if a spot takes USDA CalFresh EBT cards or holds an active County DEH food permit.' },
            { val: 'Raw health permit logs list separate deli, bakery, and meat counters inside one store as separate rows (1,220 duplicates).' },
            { val: 'The 2020 ACS 5-Year wave blended four pre-COVID years (2016-2019) with 2020, creating a -4.94% dip.' }
          ]
        },
        {
          label: 'Risk of Acting on the Raw Shift',
          cells: [
            { val: 'Comparing the 344-store run to the 6,613-store run looks like a +1,822% store boom with zero new stores.' },
            { val: 'Switching from broad map lists to SNAP stores doubles measured trip distance (+97%) with zero store closures.' },
            { val: 'Using un-deduplicated permit rows (8,555 rows or 987 keyword matches) overstates store supply by 14% to 30%.' },
            { val: 'Using 2020 ACS 5-Year tables alone makes CalFresh need look down (-4.94%) when state rolls jumped +56% to +71%.' }
          ]
        },
        {
          label: 'Why Priority Ranks Held Steady',
          cells: [
            { val: 'Raw map pulls shift across software updates and should not serve as the base.' },
            { val: 'Poverty and SNAP hold 55% of index weight (distance 20%), so 81.7% of top-need tracts stayed put.' },
            { val: 'Merging counter permits by street address gives a clean 755-store denominator (97.5% accuracy).' },
            { val: 'Once pre-2020 years rolled off, ACS counts rose +17.15% to match state rolls.' }
          ]
        },
        {
          label: 'Data Check Rule for Teams',
          policyFit: true,
          cells: [
            { headline: 'Check Map Pulls Against Permits', detail: 'Match map pulls against County DEH health permits (755 stores, 97.5% accuracy).' },
            { headline: 'Use Verified SNAP EBT Lists', detail: 'Define food access using USDA SNAP EBT retailers (514 stores in Santa Clara).' },
            { headline: 'Deduplicate Permit Addresses', detail: 'Merge bakery and deli counter rows at the same address before counting stores.' },
            { headline: 'Pair 5-Yr ACS With Monthly Rolls', detail: 'Use ACS 5-Year tables for tract rates, and track fast shocks with CDSS rolls.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Tier Shift Matrix, Permit Deduplication &amp; Provenance',
      notesBullets: [
        '<strong>Column Denominators, Tier Shift Matrix &amp; Permit Deduplication (Mode B, N = 408 Santa Clara Tracts):</strong> Each column keeps its own base (store spots, 408 Santa Clara tracts, 8,555 Santa Clara DEH permit rows, and survey vs. state rolls). In `EXTENDED_VULNERABILITY_SNAP_VERIFIED_RESULTS.md`, the 5-component index weights poverty at 30%, SNAP at 25%, store distance at 20%, no-vehicle share at 15%, and density at 10%. Switching from 6,613 spots (0.29 mi mean) to 514 SNAP stores (0.573 mi mean) leaves 266 of 408 tracts (65.2%) in the exact same quintile, 400 of 408 (98.0%) within ±1 quintile (only 8 tracts or 2.0% shift by ±2 quintiles), and 67 of 82 Q5 tracts (81.7%) in Q5. In `DEHDENOM_UPDATES_SUMMARY.md` and `STORE_COUNTS_FOR_ANALYSIS.md`, consolidating 8,555 raw DEH permit records removes 1,220 multi-department duplicates (14.3%) to yield 7,335 unique facilities, 724 confirmed SNAP-eligible grocers (97.5% accuracy), and 755–766 refined grocers (vs. 987 under an older un-deduplicated keyword rule). Note that a separate companion TooEarlyToSay transit-stop article (49.0% on 24,421 stops across 8 agencies vs. 12.0% on 64,060 Cal-ITP stop rows across 9,039 state tracts in `mobility_deserts_metadata.json` and `mobility_deserts_calitp_metadata.json`) is flagged in `FoodSecurity/analysis/MOBILITY_DESERTS_STATUS.md` as incomplete and under reconciliation, so it is not used as a policy trigger here.',
        '<strong>Data Provenance:</strong> Exact check tables come from `FoodSecurity/EXTENDED_VULNERABILITY_SNAP_VERIFIED_RESULTS.md (L1-150), FoodSecurity/STORE_COUNTS_FOR_ANALYSIS.md (L1-120), FoodSecurity/DEHDENOM_UPDATES_SUMMARY.md (L1-135), and FoodSecurity/PHASE6_FINAL_DELIVERABLE.md (L1-110)`.'
      ]
    },
    synthesis: {
      title: 'Why Checking Data Rules Protects Both Program Checks and Grant Siting',
      p1: 'Health teams often build dashboards from map APIs, store lists, permit logs, and rolling census surveys. Each source can change its own rule without notice. A map API drops a store tag (jumping from 344 to 6,613 spots). An EBT filter removes cafes (-92.2% store count, +97% distance). A permit registry lists bakery and deli counters inside one supermarket as separate rows (1,220 duplicates out of 8,555 rows, or 14.3%). Or a 5-year survey waters down a 1-year shock (-4.94% in 2020 ACS vs. +56% to +71% in state CalFresh rolls).',
      p2: 'Teams should treat any sudden dashboard jump as a data-rule shift until checked against state or county rolls. Deduplicating county health permits by address (755 refined / 724 confirmed grocers at 97.5% accuracy), pairing 5-year census baselines (-1.4% gap vs. 2019 CalFresh admin rolls) with monthly caseloads, and checking rank stability (where 65.2% of tracts stay in the same quintile and 81.7% of top-need tracts stay in the highest-need tier) keeps county funds aimed at real local need.'
    },
    methodologyParagraphs: [
      '<strong>Mode B Multi-Ruler Audit:</strong> All store and permit counts (`344` single-tag, `6,613` broad map spots, `514` SNAP-verified stores, `8,555` raw DEH rows, `7,335` consolidated sites, `1,220` or `14.3%` department duplicates, `724` confirmed / `755` refined grocers, `97.5%` classification accuracy, `42.1%` Google coverage), trip distances (`0.29 mi` vs. `0.573 mi`), tier shifts (`266/408 = 65.2%` same quintile, `400/408 = 98.0%` within ±1 quintile, `67/82 = 81.7%` Q5 stability), and ACS vs. CDSS counts (`28,476` vs. `28,880` in 2019 = `-1.4%`; `27,068` in 2020 = `-4.94%`; `+17.15%` in 2022-23) come from verified `FoodSecurity` files on disk. Companion TooEarlyToSay pages (including the seven-county EBT correlation and the 49% to 12% transit-stop series flagged in `FoodSecurity/analysis/MOBILITY_DESERTS_STATUS.md`) remain under reconciliation and are excluded from grant-siting rules.',
      '<strong>Main Sources:</strong> We use <a href="https://www.fns.usda.gov/snap/retailer-locator" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA FNS SNAP Retailer Locator</a> and <a href="https://deh.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Santa Clara County Department of Environmental Health (DEH) Retail Food Facility Registry</a>. We also use <a href="https://www.cdss.ca.gov/inforesources/research-and-data/calfresh-data-tables" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Social Services (CDSS) CalFresh Data Tables</a> and <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 5-Year Estimates</a>.'
    ],
    faqs: [
      {
        question: 'Why did filtering from 6,613 broad spots to 514 SNAP stores keep 81.7% of top-need tracts (67 of 82) in the highest-vulnerability quintile?',
        answer: 'In the 5-component Extended Vulnerability Index, economic factors (30% poverty rate and 25% SNAP participation) hold 55% of the index weight while normalized store distance holds 20%. Even though mean distance doubled from 0.29 to 0.573 miles, 65.2% of tracts (266 of 408) stayed in the exact same quintile and 81.7% of Q5 tracts stayed in Q5.'
      },
      {
        question: 'Why did the 2020 ACS 5-Year survey show a -4.94% dip in SNAP homes during COVID-19?',
        answer: 'The 2020 ACS 5-Year table averages 60 months from January 2016 to December 2020, so 80% of the sample came before COVID-19. Also, 2020 survey collection faced low response rates among low-pay homes. Monthly CDSS rolls tracked the real +56% to +71% jump right away.'
      },
      {
        question: 'How did the County DEH health permit list check the store count and why was deduplication needed?',
        answer: 'Raw Santa Clara County DEH permit logs contain 8,555 rows because supermarkets hold separate permits for bakery, deli, and meat counters at the same address (1,220 duplicate rows, or 14.3%). Consolidating by address (7,335 unique sites) and classifying retail grocers (97.5% accuracy) yields 755 refined / 724 confirmed SNAP-eligible grocers, proving the 6,613 map count was inflated 8.76x by non-grocery spots.'
      }
    ],
    related: [
      { slug: 'geographic-variables', title: 'Household Poverty Accounts for Most Neighborhood Food-Access Variation Compared With Store Distance', note: 'Case study showing why poverty explains 62.2% of variance vs. 0.0% for store distance' },
      { slug: 'measurement-error-claims', title: 'Directory inactive-listing NPIs vs. Active Billers', note: 'Case study on measurement error between NPPES provider directories and Medicaid claims' },
      { slug: 'food-affordability-tradeoffs', title: 'Modeled Post-Rent Household Budgets Reveal Severe Food Strain Above Federal Gross-Income Cutoffs', note: 'Track 2 reference case comparing FPL, CPM, MIT Living Wage, and Residual Income' }
    ]
  },

  // =========================================================================
  // MODULE #17: study-design-ladder (Track 2, member)
  // =========================================================================
  {
    slug: 'study-design-ladder',
    tier: 'public',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Matching Designs to Questions (Mode B Portfolio)',
    pageTitle: 'Matching Study Designs to Policy Questions | CAPHE',
    metaDescription: 'Match 4 California health policy questions to the right design: Admin-ACS Linkage, Multi-Year Trend Splits, 57-County Panels, and Outreach Trials.',
    h1: 'Each Public Health Budget Question Requires a Distinct Empirical Study Design',
    subtitle: 'We match linked state records, trend splits, county panels, and outreach trials to each budget question.',
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Services (DHCS)</a>: Medi-Cal Certified Eligibles &amp; Redetermination Dashboards Linked With U.S. Census ACS PUMS.',
      '<a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Employment Development Department (EDD)</a>: May 2026 Disability Insurance &amp; Paid Family Leave Fund Forecast.',
      '<a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California State Controller\'s Office</a>: 57-County Public Health Spending Panel (2003&ndash;2023) &amp; <a href="https://doi.org/10.1002/hec.3031" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014)</a>.',
      '<a href="https://www.nber.org/papers/w34191" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">National Bureau of Economic Research (NBER WP 34191)</a>: California Medicaid Renewal Outreach 5-Arm Trial (N = 82,695).'
    ],
    answerHtml: 'In California public health budgeting, teams answer four separate questions on headcount, state law shifts, county returns, and outreach scripts that no single study design can solve alone. Matching each question to the right method locates <strong>120,239 Medi-Cal members</strong> needing renewal outreach [1], <strong>+39,600 Paid Family Leave claims</strong> [2], <strong>9.16 fewer deaths per 100,000</strong> from county health spending [3], and an <strong>8% to 11% renewal lift</strong> from live calls [4]. Using one raw source alone undercounts Medi-Cal adults by <strong>-40.2%</strong> in home surveys or mixes trend growth with new policy shifts [1,2]. Pairing linked records, trend splits, county panels, and outreach trials gives leaders a full toolkit [1,4].',
    block2: {
      title: 'Two Design Rulers: Unmatched Baseline Errors vs. Matched Designs Across 4 Decisions',
      contextTag: 'Mode B Multi-Design Summary Across Medi-Cal, Paid Family Leave, County LHA &amp; CHW Outreach Studies',
      ariaLabel: 'Comparison of descriptive and uncontrolled errors (-40.2% survey undercount, -12.31% pre-trend drift, +0.18 raw average) versus fit-for-purpose study designs',
      ruler1: {
        title: 'Ruler 1: Single-Source &amp; Raw Estimates (Undercounts, Drift &amp; Surge Mix)',
        stat: '-40.2% Undercount | -12.3% Drift | +0.18 Raw Avg',
        ariaLabel: 'Relying on uncalibrated surveys or unadjusted pre-post designs produces a 40.2% Medi-Cal survey undercount, 12.31% pre-policy drift, and a +0.18 raw slope',
        segments: [
          { cls: 'seg-Housing', width: 40, label: '-40.2% ACS Undercount' },
          { cls: 'seg-gross', width: 25, label: '-12.3% Drift' },
          { cls: 'seg-rest', width: 35, label: '+0.18 Raw Avg' }
        ],
        desc: 'Using an unmatched design undercounts Santa Clara adult Medi-Cal members by <strong>-40.2% in ACS surveys</strong> (152,811 vs. 255,601 DHCS). It also misreads a <strong>-12.31% pre-law enrollment drop</strong> or flips the sign in county spending (<strong>+0.18 raw average</strong>).'
      },
      ruler2: {
        title: 'Ruler 2: Matched Design Toolkit (Linked Records, Trend Split, County Panel &amp; Trials)',
        stat: '120,239 Target | +39.6K PFL | 9.16 Fewer Deaths | +8-11% Lift',
        ariaLabel: 'Matched designs isolate 120,239 HR1-exposed enrollees, +39,600 incremental PFL claims, 9.16 fewer deaths/100K per $10/capita, and +8-11% navigator lift',
        segments: [
          { cls: 'seg-primary', width: 25, label: 'Record Link: 120.2K' },
          { cls: 'seg-food', width: 25, label: 'Trend Split: +39.6K' },
          { cls: 'seg-primary', width: 25, label: 'Panel: 9.16 Fewer (125:1)' },
          { cls: 'seg-food', width: 25, label: 'Trial: +8-11% Lift' }
        ],
        desc: 'Matching each question to its design finds <strong>120,239 exposed members</strong> and <strong>+39,600 PFL claims ($623.7M)</strong>. It also finds <strong>9.16 fewer deaths/100K ($109K/life, 125:1 BCR)</strong> and <strong>+8% to +11% live-call renewal lift</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Matching Four California Health Policy Questions to the Right Study Design',
      subtitle: 'We compare four CAPHE studies across budget question, raw baseline error, matched design, and main result.',
      caption: 'Four-column study design matrix comparing Admin-Survey Linkage, Trend Split + Simulation, Routine-Budget Panel, and Outreach Trial + Funnel Check.',
      cornerLabel: 'Study Design Factor',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Empirical Estimates; Rung 2 Mode A Simulation):</strong> Each column uses a separate study group (Santa Clara adult Medi-Cal members, California PFL claimants, 57 California counties, and Medicaid outreach and CHW trial participants). The Rung 2 PFL SB 951 claim and cost numbers are Mode A simulation outputs. In Rung 3, the raw yearly average is +0.18 deaths per 100,000 per $10 per resident (p = 0.64, 95% range crosses zero). Rung 3 routine-budget model uses variance-based IV with first-stage F = 314.1 and Hansen J = 4.49 (p = 0.343), holding across 46 of 47 checks.',
      columns: [
        { tag: 'Rung 1: Target Size', tagHighlight: false, title: 'Record + Survey Link', subtitle: 'SCC Medi-Cal HR 1 Scope.' },
        { tag: 'Rung 2: Law Shift', tagHighlight: false, title: 'Trend Split + Model', subtitle: 'CA Paid Family Leave (SB 951).' },
        { tag: 'Rung 3: County Panel', tagHighlight: true, title: 'Routine-Budget Panel', subtitle: '57-County LHA Pay (21 Yrs).' },
        { tag: 'Rung 4: Outreach Step', tagHighlight: true, title: 'Outreach Trial + Funnel', subtitle: 'Call Scripts &amp; CHW Reach.' }
      ],
      rows: [
        {
          label: 'Main Budget Question',
          cells: [
            { val: 'How many members need language help?' },
            { val: 'What will SB 951 + 12-wk PFL cost?' },
            { val: 'Does county health spending save lives?' },
            { val: 'Which outreach script lifts renewals?' }
          ]
        },
        {
          label: 'Raw Baseline Gap',
          cells: [
            { val: 'ACS alone undercounts by -40.2% (152.8K vs 255.6K)' },
            { val: 'Pre-post mixes +1.52% claim drift &amp; +3.5% pay' },
            { val: 'Raw yearly mean gives +0.18 (plus sign)' },
            { val: 'Total rate leaves out 85% pre-visit drop' }
          ]
        },
        {
          label: 'Matched Study Method',
          cells: [
            { val: 'Fix totals to DHCS; use ACS shares' },
            { val: 'Split 2025-26 base slope from law jump' },
            { val: 'Track routine budget shifts (46 of 47)' },
            { val: '5-arm trial (N=82,695) + funnel check' }
          ]
        },
        {
          label: 'Main Result',
          highlight: true,
          cells: [
            { val: '120,239 Exposed (23K Sp/Viet LEP)', textColor: 'text-[#003080]' },
            { val: '+39,600 Claims ($623.7M Gross)', textColor: 'text-[#003080]' },
            { val: '9.16 Fewer Deaths/100K (125:1 BCR)', textColor: 'text-emerald-800' },
            { val: '+8-11% Call Lift (15.0% CHW Link)', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Key Check or Group Detail',
          cells: [
            { val: '15,559 Spanish + 7,467 Viet + 3,489 Chinese' },
            { val: '325,055 (2025) -> 330,000 base vs. 369,600' },
            { val: '99.4% match to 2001-2008 study (9.10)' },
            { val: 'Text and email arms: 0% lift' }
          ]
        },
        {
          label: 'Direct Budget Action',
          cells: [
            { val: 'Hire bilingual staff for 26,515 adults' },
            { val: 'Set payroll tax at +0.04 pp ($60/yr)' },
            { val: 'Back base county LHA ($109K/life)' },
            { val: 'Fund live calls and CHWs over text tweaks' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How Each Study Design Guides Agency Plans and Budgets',
      subtitle: 'We show how linked records, trend splits, county panels, and outreach trials work together.',
      caption: 'Decision matrix evaluating when to use each study design, what data it adds, the risk of a mismatch, and team actions.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'When This Design Fits Best',
          cells: [
            { val: 'When a team sizes a target group and finds language or age subgroups before launch.' },
            { val: 'When a state law (like SB 951\'s jump to 90% pay) starts on one date statewide.' },
            { val: 'When budgets shift across 57 counties over 21 years and surge aid tracks death spikes.' },
            { val: 'When a team tests outreach scripts across 82,695 members or checks referral steps.' }
          ]
        },
        {
          label: 'What This Design Adds',
          cells: [
            { val: 'Gives the exact county headcount and language shares (like 7,467 Vietnamese members) to staff outreach.' },
            { val: 'Splits yearly wage and claim growth (+1.52% claims, +6.88% pay) from the new law jump (+39,600 claims).' },
            { val: 'Tracks death rates across 21 years and 57 counties while splitting routine care from outbreak grants.' },
            { val: 'Checks each referral step to show that 78.1% of reached patients link to care once reached (27.8%).' }
          ]
        },
        {
          label: 'Risk When Design and Question Mismatch',
          cells: [
            { val: 'Using raw ACS survey counts (152,811 vs. 255,601 DHCS adults) under-budgets renewal staff by 40.2%.' },
            { val: 'Treating a pre-law -12.31% enrollment drop (120,239 to 105,436 in 2025) as a 2027 law effect overstates loss.' },
            { val: 'Using raw yearly averages (+0.18) to judge county health budgets mixes outbreak aid with steady prevention.' },
            { val: 'Spending months testing SMS text wording (0% lift) delays live phone calls that lift renewals +8% to +11%.' }
          ]
        },
        {
          label: 'Action Plan for Agency Teams',
          policyFit: true,
          cells: [
            { headline: 'Link State Totals + Survey Shares', detail: 'Use DHCS rolls for total headcount and ACS microdata for language shares.' },
            { headline: 'Model Base Slopes Before Laws', detail: 'Use multi-year trend splits to separate wage growth from new benefit jumps.' },
            { headline: 'Use Routine-Budget Panels for ROI', detail: 'Judge multi-year county budgets with 21-year panels that split out surge grants.' },
            { headline: 'Test Outreach Calls &amp; Funnels', detail: 'Use outreach trials and funnel checks to tune call scripts and CHW caseloads.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Referral Funnel Math &amp; Multi-Study Provenance',
      notesBullets: [
        '<strong>CHW Referral Funnel Math (Mode B Published Trial Split):</strong> In the Bronx CHW study (N = 3,522 patients, 5,021 referrals; INTERVENTION_DESIGN.md:L185-232), total referral completion was 15.0%. That equals 27.8% started outreach &times; 69.2% of started were reached (19.2% of total) &times; 78.1% of reached linked to care (0.278 × 0.692 × 0.781 = 0.1502 = 15.0%).',
        '<strong>Data Provenance:</strong> Exact numbers come from `scc_hr1_medicaid/SCC_HR1_MediCal_Risk_Profiles.md (L13-112), scc_hr1_medicaid/scc_dhcs_medical_enrollment.csv (L2-15), INTERVENTION_DESIGN.md (L19-232), public/tools/pfl-simulator/data/pfl_model_data.json (L20-169), and src/frontend/js/lha-calculator.js (L28-72)`.'
      ]
    },
    synthesis: {
      title: 'Why Health Agencies Use All Four Methods Together',
      p1: 'A county health director launching a Medi-Cal renewal or chronic-care plan needs four types of proof at four steps. First, record-survey linkage sizes the group (fixing the -40.2% ACS undercount to find 120,239 exposed adults and 26,515 LEP members). Second, trend models split baseline enrollment drift (-12.31%) from new laws. Third, 21-year county panels measure department returns (9.16 fewer deaths/100K, 125:1 BCR). Fourth, outreach trials test which contact channel works.',
      p2: 'Checking each step of the delivery funnel turns study numbers into daily fixes. In California\'s 5-arm renewal outreach trial (N = 82,695, NBER WP 34191), changing the wording of texts and emails gave a 0% difference. Adding a live phone call lifted renewals by +8% to +11% (+1.0 to +1.8 pp). Likewise, splitting a CHW referral funnel shows that 78.1% of reached patients link to care. The 15.0% overall rate points to an early gap in starting referrals (27.8%), not a gap in CHW support.'
    },
    methodologyParagraphs: [
      '<strong>Mode B Studies + Mode A PFL Simulation:</strong> Rung 1 (120,239 DHCS / 152,811 ACS vs. 255,601), Rung 3 (-9.16 routine-budget panel), and Rung 4 (NBER WP 34191 N = 82,695 and Bronx CHW 27.8% × 69.2% × 78.1% = 15.0%) are observed Mode B studies. Rung 2 (330,000 vs. 369,600 PFL claims, $623.7M) is a Mode A simulation calibrated to EDD forecasts. The four rungs use four separate groups (Santa Clara adult Medi-Cal members, California PFL claimants, 57 California counties, and Medicaid outreach and CHW trial participants). Their estimates are not pooled on one scale.',
      '<strong>Main Sources:</strong> We cite <a href="https://www.nber.org/papers/w34191" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">NBER Working Paper 34191 (California Medicaid Renewal Outreach 5-Arm Trial, N = 82,695)</a> and <a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Medi-Cal Enrollment Dashboards</a>. We also use <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 DI Fund Forecast</a> and <a href="https://doi.org/10.1002/hec.3031" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014), Health Economics</a>.'
    ],
    faqs: [
      {
        question: 'Why does the ACS survey undercount Santa Clara County adult Medi-Cal members by 40.2%?',
        answer: 'Home surveys face a known Medicaid undercount. People mix up Medi-Cal plan names (like Santa Clara Family Health Plan or Anthem Blue Cross) with private plans or leave out household members. Fixing totals to DHCS state records (255,601 adults vs. 152,811 in ACS) while using ACS for language and work-hour shares fixes the group base.'
      },
      {
        question: 'What did the 82,695-person California Medicaid outreach trial (NBER WP 34191) show about text wording vs. live calls?',
        answer: 'Across four written arms testing different SMS and email wording, renewal lift was 0%. Only the fifth arm, which added a live phone call, raised renewals by 8% to 11% (+1.0 to +1.8 pp). Live human help clears paperwork hurdles where text tweaks do not.'
      },
      {
        question: 'Why does splitting a referral funnel into start (27.8%), reach (69.2%), and link (78.1%) matter for teams?',
        answer: 'Looking only at the 15.0% overall completion rate (0.278 × 0.692 × 0.781) makes CHW outreach look weak. Splitting the funnel shows that CHWs link 78.1% of the patients they reach. The real operational gap is starting the referral (27.8%).'
      }
    ],
    related: [
      { slug: 'medicaid-expansion', title: 'Medi-Cal Redetermination Funnel & Churn', note: 'CHW case study decomposing the 5-step verification funnel in Santa Clara County' },
      { slug: 'observational-to-experimental', title: 'Routine County Public Health Budgets Lower Premature Deaths After Separating Outbreak Spending', note: 'Case study detailing the 57-county LHA routine-budget replication' },
      { slug: 'before-after-trap', title: 'Evaluating Pre-Post Changes Against Baseline Trends', note: 'Case study on separating pre-policy drift from post-policy changes' }
    ]
  },

  // =========================================================================
  // MODULE #18: p-hacking-multiple-testing (Track 2, member)
  // =========================================================================
  {
    slug: 'p-hacking-multiple-testing',
    tier: 'public',
    trackEyebrow: 'Track 2: Study Credibility &amp; Measurement &middot; Multiple-Group Checks (Observed 62-Cell DHCS Grid &amp; Mode A Rules)',
    pageTitle: 'Multiple Testing Across 58 Counties | CAPHE',
    metaDescription: 'Scan 62 Santa Clara DHCS Medi-Cal cells (472,014 to 411,722): separate small-group swings (-34.0% Samoan, n=47) from high-volume drops (-24,880 Spanish).',
    h1: 'Minimum Group-Size Filters and Multiple-Testing Adjustments Focus Outreach on Projected Coverage Losses',
    subtitle: 'We filter small-group swings across modeled county subgroup benchmarks so outreach funds target the largest plan drops.',
    endnotes: [
      '<a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">California Department of Health Care Services (DHCS)</a>: Santa Clara County Medi-Cal Certified Eligibles across 62 Demographic &amp; Language Cells (June 2025 to June 2026 snapshots, 472,014 to 411,722 enrollees).',
      '<a href="https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Benjamini, Y., &amp; Hochberg, Y. (1995)</a>: "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", <em>JRSS-B</em>, 57(1), 289&ndash;300.'
    ],
    answerHtml: 'When scanning 62 demographic and language cells on a monthly dashboard, a county team risks ranking random swings in tiny groups over large headcount drops. Pairing a modeled 62-group screen across <strong>62 Santa Clara County Medi-Cal groups</strong> with total headcount focuses outreach on <strong>Spanish-speaking members (-24,880 net drop, or 41.3% of the county drop)</strong> and <strong>Hispanic adults ages 19 to 44 (-17,380)</strong> [1,2]. Sorting those 62 groups by raw percent drop puts tiny groups first, like <strong>Samoan (-34.04%, 47 to 31 members)</strong> and <strong>French (-25.00%, 56 to 42)</strong>, where a few moving homes shift the rate [1]. Setting a size floor (<strong>100+ members</strong>) with modeled drops past the county rate guides staff [1,2].',
    block2: {
      title: 'Two Dashboard Rulers Across 62 DHCS Cells: Raw Percent Rank vs. Size-Filtered Volume Rank',
      contextTag: 'Observed 62-Cell Santa Clara County DHCS Medi-Cal Snapshots (472,014 to 411,722, -12.77% Net Change) &amp; Mode A Screening Rules',
      ariaLabel: 'Comparison of raw percentage ranking where small cells like Samoan (-34.04%, -16 enrollees) and French (-25.00%, -14 enrollees) top the list versus size-filtered and volume-adjusted targeting where Spanish (-18.00%, -24,880 enrollees) accounts for 41.3% of the county net drop',
      ruler1: {
        title: 'Ruler 1: Raw Percent Rank Across 62 Cells (No Size Floor)',
        stat: 'Rank #1 Samoan -34.04% (-16) | Rank #2 French -25.00% (-14)',
        ariaLabel: 'Unfiltered percentage ranking places Samoan (-34.04%, 47 to 31) and French (-25.00%, 56 to 42) at the top of the 62-cell table despite representing only 30 enrollees combined',
        segments: [
          { cls: 'seg-Housing', width: 70, label: 'Small-n Top Ranks: Samoan -34.0% (-16) &amp; French -25.0% (-14)' },
          { cls: 'seg-primary', width: 30, label: '0.05% of County Drop' }
        ],
        desc: '<em>Mode A:</em> scanning <strong>62 independent tests</strong> at raw &alpha; = 0.05 gives <strong>3.10 expected false leads (0.05 / 62 = 0.00081 Bonferroni cutoff)</strong>. <em>Observed:</em> the top percent drops are tiny cells like <strong>Samoan (47 to 31, -16 people)</strong>, <strong>French (56 to 42, -14 people)</strong>, and <strong>Thai (53 to 42, -11 people)</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: Size Floor (n &ge; 100) Paired With Net Drop Past County Rate',
        stat: 'Spanish -24,880 (-18.0%) | Young Adults -17,380 (-20.1%)',
        ariaLabel: 'Applying a 100-member size floor and ranking by net drop past the -12.77% county rate highlights Spanish-speaking enrollees (-24,880 enrollees, -18.00%) and Hispanic adults 19 to 44 (-17,380 enrollees, -20.11%)',
        segments: [
          { cls: 'seg-food', width: 59, label: 'Spanish Language Cell: -24,880 Net Drop (-18.00%, 41.3% of County Drop)' },
          { cls: 'seg-primary', width: 41, label: 'Hispanic 19-44: -17,380 (-20.11%)' }
        ],
        desc: 'Requiring cells to clear a <strong>size floor (n &ge; 100)</strong> and ranking by net drop past the <strong>-12.77% county rate</strong> finds the main targets: <strong>Spanish (-24,880 net drop; -7,230 past county rate)</strong> and <strong>Hispanic adults 19-44 (-17,380 net drop; -6,344 past county rate)</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Checking the 62-Cell Santa Clara Medi-Cal Grid: Small-Group Swings vs. Large Drops',
      subtitle: 'We compare observed June 2025 to June 2026 Medi-Cal net snapshot changes with size floors and benchmark gaps.',
      caption: 'Comparison of Samoan cell, French and Thai cells, Spanish cell, and Young Adult (19-44) cells across 62 Santa Clara County Medi-Cal groups.',
      cornerLabel: '62-Group Check Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Observed DHCS Snapshot Counts &amp; Mode A Screening Rules):</strong> Observed June 2025 (472,014) and June 2026 (411,722) counts come from `scc_dhcs_medical_enrollment.csv` (county net change -60,292 or -12.773%, rounded to -12.77%). Rows 3-5 show Mode A operational rules: a minimum group-size floor (n &ge; 100) and the net drop past the -12.77% county benchmark (`Observed_Net_Change - Base_2025 × (-0.1277)`). Because monthly DHCS snapshots record net stock changes (entries minus exits), overlap across age/sex/language tables, and cluster within families, exact binomial exit p-values are not valid on net snapshot counts; see Table 2 Notes for verified replicate-weight, Holm/FDR, and permutation tests.',
      columns: [
        { tag: 'Rank #1 Raw % (Small n)', tagHighlight: false, title: 'Samoan Language Cell', subtitle: '47 to 31 Members (-16).' },
        { tag: 'Ranks #2 &amp; #5 Raw %', tagHighlight: false, title: 'French &amp; Thai Cells', subtitle: '56 to 42 (-14) | 53 to 42 (-11).' },
        { tag: '41.3% of County Drop', tagHighlight: true, title: 'Spanish Language Cell', subtitle: '138,215 to 113,335 (-24,880).' },
        { tag: 'High-Loss Adult Group', tagHighlight: true, title: 'Hispanic &amp; Male 19-44', subtitle: '86,421 to 69,041 (-17,380).' }
      ],
      rows: [
        {
          label: 'Observed Count &amp; Net % Drop',
          cells: [
            { val: '-34.04% (47 to 31; -16 people)' },
            { val: '-25.00% (-14) &amp; -20.75% (-11)' },
            { val: '-18.00% (138,215 to 113,335)' },
            { val: '-20.11% (Hisp) &amp; -20.19% (Male)' }
          ]
        },
        {
          label: 'Raw % Rank vs. Volume Rank',
          cells: [
            { val: 'Rank #1 by % | Rank #49 by vol' },
            { val: 'Rank #2 &amp; #5 by % | #50 &amp; #52 vol' },
            { val: 'Rank #11 by % | Rank #1 by vol' },
            { val: 'Rank #6 &amp; #7 by % | #2 &amp; #3 vol' }
          ]
        },
        {
          label: 'June 2025 Group Size (n)',
          modeled: true,
          cells: [
            { val: 'n = 47 (tiny cell; 3-4 homes)' },
            { val: 'n = 56 (French) &amp; n = 53 (Thai)' },
            { val: 'n = 138,215 (29.3% of county)' },
            { val: 'n = 86,421 (Hisp) &amp; 76,734 (Male)' }
          ]
        },
        {
          label: 'Size Floor &amp; Scale Gate',
          modeled: true,
          cells: [
            { val: 'Below n &ge; 100 Floor (Partner List)', textColor: 'text-amber-900' },
            { val: 'Below n &ge; 100 Floor (Small Cell)', textColor: 'text-rose-800' },
            { val: 'Clears n &ge; 100 &amp; Volume Gate', textColor: 'text-emerald-800' },
            { val: 'Clears n &ge; 100 &amp; Volume Gate', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Net Drop Past -12.77% Rate',
          modeled: true,
          cells: [
            { val: '-10 past rate (-16 vs -6.0 exp)' },
            { val: '-6.8 (French) &amp; -4.2 (Thai)' },
            { val: '-7,230 past rate (-24,880 net)' },
            { val: '-6,344 (Hisp) &amp; -5,697 (Male)' }
          ]
        },
        {
          label: 'Share of County Net Drop (-60,292)',
          highlight: true,
          cells: [
            { val: '0.027% of drop (16 / 60,292)', barWidth: 1, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '0.041% combined (25 / 60,292)', barWidth: 1, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '41.27% of drop (24,880)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '28.83% (Hisp) | 25.70% (Male)', barWidth: 70, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Balancing Multi-Group Screens and Headcount Scale Across County Subgroups',
      subtitle: 'We set dashboard rules that filter out small-group swings and pair multi-group gates with net headcount drops.',
      caption: 'Decision matrix evaluating group size, raw rank limits, budget risk, and dashboard rules across four subgroup types.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'What Drives the Rate in This Cell',
          cells: [
            { val: 'With n = 47 members, three families moving out of county shifts the cell rate by -34.04% (-16 people).' },
            { val: 'Across 62 cells, seeing -25.00% in French (n = 56) or -20.75% in Thai (n = 53) fits small-group swings.' },
            { val: 'Across 138,215 Spanish members, an -18.00% drop (-5.23 pp past the -12.77% county rate) gives a -7,230 gap.' },
            { val: 'Young adults 19-44 see -20.11% (Hispanic, -17,380) and -20.19% (Male, -15,496) drops from moves and forms.' }
          ]
        },
        {
          label: 'Limits of Raw Percent Ranks',
          cells: [
            { val: 'Sorting a dashboard by raw percent drop puts a 16-person shift ahead of 24,880 Spanish-speaking drops.' },
            { val: 'Flagging every group with raw single tests across 62 cells gives 3.10 expected false leads by chance.' },
            { val: 'Spanish ranks #11 by raw percent (-18.00%) behind ten tiny cells, yet holds 41.3% of all county drops.' },
            { val: 'Treating 62 overlapping age, sex, and language slices as separate wins scatters outreach staff.' }
          ]
        },
        {
          label: 'Budget Risk if Unchecked',
          cells: [
            { val: 'Building a media drive around Rank #1 percent change (-34.04%) reaches just 0.03% of county drops.' },
            { val: 'Shifting translation funds toward small-group swings pulls staff hours from groups with thousands of drops.' },
            { val: 'Under-funding Spanish outreach because -18.00% sits near the -12.77% county rate leaves a -7,230 gap.' },
            { val: 'Skipping focused outreach for adults 19-44 leaves out over 17,000 members who move apartments often.' }
          ]
        },
        {
          label: 'Dashboard &amp; Outreach Rule',
          policyFit: true,
          cells: [
            { headline: 'Set a Size Floor (n >= 100)', detail: 'Send small cells (n < 100) to local partner lists instead of top alerts.' },
            { headline: 'Adjust for Multiple Tests', detail: 'Use multi-group checks on valid study tests before shifting funds.' },
            { headline: 'Rank by Net Gap (-7,230)', detail: 'Sort large groups by net drop past the county rate (-7,230 Spanish).' },
            { headline: 'Send Texts &amp; Address Checks', detail: 'Reach adults 19-44 (-20.1% drop) with SMS texts and postal address matches.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Snapshot Accounting, Multi-Test Benchmarks &amp; Provenance',
      notesBullets: [
        '<strong>Observed 62-Cell DHCS Snapshot Math &amp; Why Binomial Exit Tests Do Not Apply:</strong> The file `scc_dhcs_medical_enrollment.csv` tracks 62 age, aid, and language cells in Santa Clara County from June 2025 (472,014 members) to June 2026 (411,722 members, net change -60,292 or -12.773%). Comparing each group\'s net change against the rounded -12.77% county rate (`Observed_Drop - Base_2025 × 0.1277`) gives a net gap of -7,230 for Spanish (-24,880 vs. -17,650 expected; -7,225 at unrounded -12.773%), -6,344 for Hispanic 19-44 (-6,341 unrounded), -5,697 for Male 19-44 (-5,700 unrounded), -10 for Samoan (47 to 31), -6.8 for French (56 to 42), and -4.2 for Thai (53 to 42). Because monthly DHCS snapshots measure net stock differences (exits minus new entries), overlap across age/sex/language tables, and cluster within households, individual member exits are not observed and binomial exit p-values are not valid on these snapshot counts.',
        '<strong>Mode A Multiplicity Illustration &amp; Verified CAPHE Inference Benchmarks (Mode B):</strong> Across `m = 62` independent hypothesis tests at raw `α = 0.05`, a dashboard yields `62 × 0.05 = 3.10` expected false leads (`1 - 0.95^62 = 95.8%` chance of at least one false lead, with Bonferroni cutoff `0.05 / 62 = 0.00081`). In CAPHE empirical studies where valid sampling distributions exist, three checks prevent false discoveries: (1) across the top 3 Santa Clara County PUMAs for procedural Medi-Cal losses (`scc_puma_pairwise_tests.json`, 80 ACS replicate weights), South County (`08519`, `1,641 ± 186`), East San Jose (`08521`, `1,590 ± 167`), and Central/East San Jose (`08510`, `1,521 ± 166`) have pairwise `z = 0.35 to 0.72` (`p = 0.469 to 0.730`), proving the top-3 rank order is within survey noise; (2) across `m = 16` lag horizons in `Value_of_Public_Health/paper/ajph_submission.tex` (Table 3), a 4-year first-difference result with raw `p = 0.0049` shifts to `p = 0.0788` under Holm and `q = 0.0788` under Benjamini-Hochberg FDR; and (3) across `1,000` random label shuffles in `Mcaid/05_fraud_detection/paper/output/results.json`, the max null AUC is `0.593` versus `0.724` observed (`p = 0.001`).'
      ]
    },
    synthesis: {
      title: 'Why Health Teams Pair Size Floors and Multi-Test Checks With Net Headcount Scale',
      p1: 'When a county health team tracks Medi-Cal renewal drops across 62 age, sex, and language groups (472,014 to 411,722 members in Santa Clara County; -60,292 or -12.77% net change), two common dashboard habits pull staff off course. First, sorting groups by raw percent drop puts tiny groups at the top. Samoan (-34.04%, 47 to 31 members; -16 people), French (-25.00%, 56 to 42; -14 people), and Thai (-20.75%, 53 to 42; -11 people) rank above Spanish (-18.00%, Rank #11 by percent). Yet Spanish-speaking homes account for 24,880 net lost members, or 41.3% of the entire county drop. Second, running 62 unadjusted tests at α = 0.05 produces 3.10 expected false leads by chance alone, and treating net monthly snapshot counts as independent member exits misstates uncertainty.',
      p2: 'Pairing a size floor (n ≥ 100), valid multiple-testing checks (such as replicate-weight pairwise tests, Holm step-down, or Benjamini-Hochberg FDR where sampling variance is observed), and net headcount drop past the -12.77% county rate links statistical care with real scale. Once small cells go to partner outreach and large groups are ranked by net drop past the county rate, two major priorities stand out. First is Spanish-speaking homes (-24,880 net drop; -7,230 past the county rate). Second is young adults ages 19 to 44 (Hispanic 19-44 at -20.11%, -17,380 net drop and -6,344 past the county rate; Male 19-44 at -20.19%, -15,496 net drop and -5,697 past the county rate).'
    },
    methodologyParagraphs: [
      '<strong>Observed 62-Cell DHCS Grid, Mode A Multiplicity Rules &amp; Mode B Benchmarks:</strong> All 62 group counts in June 2025 (472,014 total) and June 2026 (411,722 total), net headcount changes (-60,292 total; -24,880 Spanish; -17,380 Hispanic 19-44; -15,496 Male 19-44; -16 Samoan; -14 French; -11 Thai), and percent shifts come from `scc_hr1_medicaid/scc_dhcs_medical_enrollment.csv`. Expected false leads (`62 × 0.05 = 3.10`), Bonferroni cutoff (`0.05 / 62 = 0.00081`), and net drops past the `-12.77%` county rate are Mode A calculations. Replicate-weight PUMA pairwise tests (`p = 0.469 to 0.730` in `scc_puma_pairwise_tests.json`), 16-horizon Holm/FDR adjustments (`raw p = 0.0049` to `Holm p = 0.0788` in `Value_of_Public_Health/paper/ajph_submission.tex`), and the 1,000-shuffle permutation test (`null max AUC = 0.593`, `p = 0.001` in `Mcaid/05_fraud_detection/paper/output/results.json`) are Mode B benchmarks.',
      '<strong>Main Sources:</strong> We cite <a href="https://doi.org/10.1111/j.2517-6161.1995.tb02031.x" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Benjamini, Y., &amp; Hochberg, Y. (1995), "Controlling the False Discovery Rate", JRSS-B, 57(1), 289-300</a> and <a href="https://www.dhcs.ca.gov/dataandstats/Pages/default.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Medi-Cal Certified Eligibles &amp; Redetermination Dashboards</a>. We also use <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS Medicaid &amp; CHIP Enrollment Trends</a> and <a href="https://www.sccgov.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">County of Santa Clara Social Services Agency &amp; Health System</a>.'
    ],
    faqs: [
      {
        question: 'Why do small language cells like Samoan (-34.04%) and French (-25.00%) sit at the top of raw percent tables?',
        answer: 'In a group with just 47 members (Samoan) or 56 members (French), a net shift of 14 to 16 people (often three or four families moving or changing jobs) swings the cell rate by 25% to 34%. Without a size floor (such as n >= 100) and headcount weights, raw percent lists mostly show small-sample swings.'
      },
      {
        question: 'Why can\'t we run simple binomial exit p-values on monthly DHCS enrollment snapshots, and how do Holm or FDR gates work on valid tests?',
        answer: 'Monthly DHCS snapshots show net stock changes (exits minus entries), overlap across age and language tables, and cluster by family, so individual exit counts are not observed. When valid sampling errors exist, such as the 80-replicate-weight PUMA tests (pairwise p = 0.469 to 0.730) or the 16-horizon public health spending check (where raw p = 0.0049 shifts to Holm p = 0.0788 and FDR q = 0.0788), Bonferroni, Holm, and Benjamini-Hochberg FDR prevent false leads.'
      },
      {
        question: 'How is the Net Drop Past the County Rate calculated and why should dashboards show it alongside size floors?',
        answer: 'It compares a group\'s observed net change against what would happen at the county net rate (-12.77%). For Spanish-speaking members (138,215 base), a -12.77% shift equals -17,650 members. The observed net drop of -24,880 leaves a -7,230 gap past the county rate (-7,225 unrounded). That shows where bilingual outreach staff can help the most families keep care.'
      }
    ],
    related: [
      { slug: 'medicaid-expansion', title: 'Case Study: Medi-Cal Redetermination Funnel & Churn', note: 'CHW case study decomposing Santa Clara County procedural vs eligibility disenrollment' },
      { slug: 'threat-regression-to-mean', title: 'Regression to the Mean in Small Counties', note: 'Case study on Empirical Bayes shrinkage and small-denominator volatility across counties' },
      { slug: 'study-design-ladder', title: 'Each Public Health Budget Question Requires a Distinct Empirical Study Design', note: 'Case study matching cross-sectional linkage, ITS, panel IV, and RCT designs' }
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

  // 2. Verify #11 against src/frontend/js/lha-calculator.js, methodology.html, lewbel_iv_results_section.tex & robustness_tables.tex
  const lhaJsPath = path.join(__dirname, '..', 'src', 'frontend', 'js', 'lha-calculator.js');
  const lhaMethPath = path.join(__dirname, '..', 'public', 'tools', 'lha-calculator', 'methodology.html');
  const lewbelTexPath = path.join(__dirname, '..', '..', 'PublicHealthValue', 'paper', 'sections', 'lewbel_iv_results_section.tex');
  const robTexPath = path.join(__dirname, '..', '..', 'PublicHealthValue', 'paper', 'sections', 'robustness_tables.tex');
  const lhaCombined = fs.readFileSync(lhaJsPath, 'utf8') + '\n' + fs.readFileSync(lhaMethPath, 'utf8') + '\n' + fs.readFileSync(lewbelTexPath, 'utf8') + '\n' + fs.readFileSync(robTexPath, 'utf8');
  for (const token of ['-9.16', '1.11', '314.1', '4.49', '0.343', '0.18', '-9.1', '-3.07', '-8.93', '125']) {
    assert(lhaCombined.includes(token), `LHA source files missing token ${token}`);
  }
  assertClose(1 - Math.abs(-9.16 - (-9.10)) / 9.16, 0.99345, 0.001, 'LHA replication concordance');
  assertHtmlContains('observational-to-experimental', ['+0.18', '9.10', '9.16', '3.07', '8.93', '314.1', '4.49', '0.343', '99.4%', '$125 per $1', '$109,000']);

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
  assertHtmlContains('study-design-ladder', ['120,239', '255,601', '152,811', '40.2%', '330,000', '369,600', '+39,600', '9.16', '82,695', '27.8%', '69.2%', '78.1%', '15.0%']);

  const html18 = assertHtmlContains('p-hacking-multiple-testing', [
    '472,014', '411,722', '-60,292', '-12.77%', '-34.04%', '-25.00%', '-20.75%', '-24,880', '-17,380', '-15,496', '-7,230', '-6,344', '-5,697', '0.469 to 0.730', '0.0788', '0.593'
  ]);
  assert(!/0\.00011|-4\.37|10⁻⁷⁰|10⁻⁹⁰|-58\.2|-64\.6/.test(html18), 'p-hacking-multiple-testing must not contain binomial snapshot p-values or z-scores');
}

const renderedPathsBySlug = {};
for (const spec of modules) {
  renderModuleHtml(spec);
  const outPath = require('path').join(__dirname, '..', 'public', 'methods-lab', spec.slug, 'index.html');
  renderedPathsBySlug[spec.slug] = outPath;
  const html = require('fs').readFileSync(outPath, 'utf8');
  if (/\/Users\/(victoriaperez|vserver)\b/.test(html)) {
    throw new Error(`[Wave 4A Hygiene Check Failed] Machine-specific /Users/ path found in ${outPath}`);
  }
}

verifyWave4ASourcesAndRenderedHtml(renderedPathsBySlug);

console.log('Wave 4A (7 Modules in Track 2) rendered and source-verified successfully.');
