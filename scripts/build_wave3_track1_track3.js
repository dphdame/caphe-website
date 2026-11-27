#!/usr/bin/env node
/**
 * Wave 3 Builder: Track 1 (Program Impact) & Track 3 (Resource Allocation & Economic Value)
 * 10 California Public Health Economics Decision Modules:
 * Track 1:
 *  - #1 before-after-trap (public, Mode A on HHS Medicaid Provider Spending telehealth-eligible series 2018-2024)
 *  - #2 selection-into-treatment (public, Mode A on ACS/EDD PFL SB 951 Wage Quintiles)
 *  - #3 threat-regression-to-mean (community, Mode A: Rural CA County Mortality & LHA Panel)
 *  - #4 threat-history-solutions (community, Mode A: telehealth-eligible vs non-telehealth-eligible Medicaid DiD)
 *  - #5 parallel-trends-power (member, Mode A: County DiD Pre-Trend Power & HonestDiD + LHA Splits)
 *  - #6 threat-maturation-solutions (member, Mode A: EDD PFL/SDI 2025 Actuals & 2026-2030 ITS)
 * Track 3:
 *  - #20 budget-impact (public, Mode B/A: CA LHA 32:1 Annual / 59:1 Cumulative ROI vs SDI Reserve Floor & Medi-Cal Admin Cash Flow)
 *  - #21 comparator-choice (public, Mode A/B: SCC PHD CHW ACER vs Incremental ICER Across 4 Alternatives)
 *  - #22 measuring-health-common-unit (community, Mode B/A: CHW QALYs vs LHA HHS 2025 VSL Tiers)
 *  - #23 cost-effectiveness-ratio (community, Mode B/A: CHW ICER = $36,089/QALY & Net Monetary Benefit)
 */

const { renderModuleHtml } = require('./render_option_c');

const wave3Modules = [
  // =========================================================================
  // MODULE #1: before-after-trap (Track 1, public)
  // =========================================================================
  {
    slug: 'before-after-trap',
    tetsCompanion: [
      {
        visibleLabel: 'Medicaid Provider Spending File Guide',
        title: 'What 238 Million Medicaid Billing Rows Can Support',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
        claimCovered: 'What each row counts, which seven fields appear, and how small counts are suppressed across 238,015,729 billing rows, plus the clinical facts a review still needs.'
      },
      {
        visibleLabel: 'Medicaid Billing Feature Guide',
        title: 'What Billing Patterns Actually Look Like',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-billing-patterns/',
        claimCovered: 'Provider billing measures built from 84 months of Medicaid rows; the excluded-provider billing comparisons remain under reconciliation.'
      }
    ],
    tier: 'public',
    briefType: 'Evidence Guide &middot; Medi-Cal &amp; Claims',
    trackEyebrow: 'Track 1: Program Impact &middot; Two-Year Counts Compared With Earlier Growth Rates',
    pageTitle: 'Two-Year Counts vs. Prior Medicaid Trends | CAPHE',
    metaDescription: 'Compare 2019 and 2023 national Medicaid telehealth-eligible biller counts with 2018-2019 growth (+6,977/yr) and other Medicaid care over 84 months.',
    h1: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time',
    subtitle: 'Comparing pre-2020 Medicaid biller trends and other care codes with post-2020 counts over 84 months.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Medicaid reviews often subtract 2019 provider counts from 2023 counts to judge telehealth pay rules [1,3]. Yet clinics were already adding active billers each year before 2020 [1,2].'
      },
      {
        lead: 'What the comparison shows',
        html: 'Across 84 months of federal Medicaid records, monthly telehealth-code billers grew from <strong>91,399</strong> in 2019 to <strong>113,638</strong> in 2023 (<strong>+24.33%</strong>), after adding <strong>+6,977/yr</strong> before 2020 [1,2]. Extending that 1-year gain projects <strong>119,307</strong> billers in 2023 (<strong>-5,669</strong> below projection), while other Medicaid codes grew <strong>+18.71%</strong> [2,3].'
      },
      {
        lead: 'Policy option',
        html: 'Reviewers can check at least 24 pre-policy months alongside other Medicaid care codes [1,3]. Comparing both groups gives a descriptive <strong>+5.62 percentage-point</strong> difference in 2023 rather than counting routine growth [3].'
      }
    ],
    endnotes: [
      '<strong>Recorded National Medicaid Billing Counts (2018&ndash;2024).</strong> Monthly counts come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Department of Health and Human Services (HHS) Medicaid Provider Spending File</a> across 84 months (January 2018 through December 2024). Average monthly billers on telehealth-eligible codes rose from 84,422 in 2018 and 91,399 in 2019 to 113,638 in 2023. Full-year 2024 averaged 101,978, after averaging 108,781 in January&ndash;October before large November&ndash;December drops.',
      '<strong>Earlier Growth Rate Before 2020.</strong> Billers on telehealth-eligible codes rose by +6,977 per year (+8.26%) from 2018 to 2019, before 2020 telehealth pay rules began. Extending that yearly gain gives 119,307 billers in 2023 (-5,669 vs. recorded) and 126,284 in 2024 (-24,306 vs. recorded).',
      '<strong>Other Medicaid Care Codes &amp; Policy Rules.</strong> Billers on other Medicaid codes grew from 101,905 per month in 2018 and 109,087 in 2019 to 129,492 in 2023 (+18.71% from 2019 to 2023) and 116,690 in 2024. Policy background comes from <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Health Care Services (DHCS) Telehealth Policy Guidance</a>.'
    ],
    block2: {
      title: 'Two-Year Count Change Compared With Pre-2020 Straight-Line Growth',
      contextTag: 'Baseline Trend Projections on HHS Medicaid Provider Spending (84 Months)',
      ariaLabel: 'Comparison of the raw 2019 to 2023 change in billing providers versus the difference from extending the 2018 to 2019 baseline trend',
      ruler1: {
        title: 'Two-Year Count Change (2019 to 2023)',
        stat: '+22,239 Billers (+24.33%)',
        ariaLabel: 'Mean monthly billing providers rose from 91,399 in 2019 to 113,638 in 2023',
        segments: [
          { cls: 'seg-primary', width: 80, label: '2019 Mean: 91,399' },
          { cls: 'seg-food', width: 20, label: '+22,239 to 113,638' }
        ],
        desc: 'A simple two-year subtraction counts all +22,239 added billers as a post-2019 gain.'
      },
      ruler2: {
        title: 'Difference From Pre-2020 Straight-Line Trend',
        stat: '-5,669 vs. Straight-Line Trend (2023)',
        ariaLabel: 'Extending +6,977 providers per year projects 119,307 providers in 2023',
        segments: [
          { cls: 'seg-rest', width: 95, label: 'Recorded 2023: 113,638' },
          { cls: 'seg-rent', width: 5, label: '-5,669' }
        ],
        desc: 'Extending the 2018-2019 yearly gain (+6,977 per year) gives 119,307 billers in 2023.'
      }
    },
    table1: {
      title: 'Table 1. Monthly Medicaid Biller Counts Across Pre-2020, 2023, and Other Care Periods',
      subtitle: 'Comparing 12-month Medicaid biller averages from 2018 to 2024 with straight-line and percent trends from 2018-2019.',
      caption: 'Table 1 compares monthly Medicaid billing providers across 2018-2019, 2019-2023, 2019-2024, and other Medicaid care codes.',
      cornerLabel: 'Trend Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Calculated Trend Projections.</strong> Recorded biller counts, paid dollars, and procedure codes come from the HHS Medicaid Provider Spending file across 84 months (Jan 2018&ndash;Dec 2024). Calculated rows extend the 2018&ndash;2019 yearly change forward through 2023 and 2024. From 2018 to 2019, telehealth-eligible billers grew by +6,977 (+8.26%) per year, and other Medicaid billers grew by +7,182 (+7.05%) per year.',
      columns: [
        { tag: 'Period 1: Pre-2020', tagHighlight: false, title: '2018 to 2019 Growth', subtitle: 'Telehealth-eligible codes before 2020 rules.' },
        { tag: 'Period 2: Through 2023', tagHighlight: true, title: '2019 to 2023 Period', subtitle: 'Telehealth-eligible codes from 2019 to 2023.' },
        { tag: 'Period 3: Through 2024', tagHighlight: true, title: '2019 to 2024 Period', subtitle: 'Includes late-2024 drop months.' },
        { tag: 'Other Care Codes', tagHighlight: false, title: 'Other Medicaid (2018-24)', subtitle: 'Non-telehealth care codes from 2018 to 2024.' }
      ],
      rows: [
        {
          label: 'Monthly Billing Providers<span class="block text-xs font-normal text-slate-500">12-month start average to end average</span>',
          cells: [
            { val: '84,422 &rarr; 91,399' },
            { val: '91,399 &rarr; 113,638' },
            { val: '91,399 &rarr; 101,978' },
            { val: '101,905 &rarr; 116,690' }
          ]
        },
        {
          label: 'Start-to-End Biller Change<span class="block text-xs font-normal text-slate-500">End average minus start average</span>',
          cells: [
            { val: '+6,977 (+8.26%)' },
            { val: '+22,239 (+24.33%)' },
            { val: '+10,579 (+11.57%)' },
            { val: '+14,785 (+14.51%)' }
          ]
        },
        {
          label: 'Average Yearly Change<span class="block text-xs font-normal text-slate-500">Total change divided by years</span>',
          cells: [
            { val: '+6,977 / yr' },
            { val: '+5,560 / yr' },
            { val: '+2,116 / yr' },
            { val: '+2,464 / yr' }
          ]
        },
        {
          label: 'Straight-Line Projection*<span class="block text-xs font-normal text-slate-500">2019 count plus 2018-2019 yearly gain</span>',
          modeled: true,
          cells: [
            { val: 'Starting yearly gain' },
            { val: '119,307 (2023)' },
            { val: '126,284 (2024)' },
            { val: '144,997 (2024)' }
          ]
        },
        {
          label: 'Difference From Straight-Line Trend*<span class="block text-xs font-normal text-slate-500">Recorded count minus straight-line count</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '0 (starting ref)', barWidth: 2, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-5,669 (-4.75%)', barWidth: 24, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '-24,306 (-19.25%)', barWidth: 99, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '-28,307 (-19.52%)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Difference From Percent Trend*<span class="block text-xs font-normal text-slate-500">Projected vs. recorded at 2018-19 % rate</span>',
          modeled: true,
          cells: [
            { val: 'Starting % rate' },
            { val: '125,549 vs. 113,638 (-11,911)' },
            { val: '135,919 vs. 101,978 (-33,941)' },
            { val: '153,358 vs. 116,690 (-36,668)' }
          ]
        },
        {
          label: 'Annual Medicaid Dollars Paid<span class="block text-xs font-normal text-slate-500">12-month paid claim total</span>',
          cells: [
            { val: '$19.23B &rarr; $23.56B' },
            { val: '$23.56B &rarr; $40.29B' },
            { val: '$23.56B &rarr; $34.93B' },
            { val: '$85.47B &rarr; $145.72B' }
          ]
        },
        {
          label: 'Active Billing Codes per Month<span class="block text-xs font-normal text-slate-500">Monthly distinct procedure codes</span>',
          cells: [
            { val: '171.0 &rarr; 191.0' },
            { val: '191.0 &rarr; 222.7' },
            { val: '191.0 &rarr; 220.7' },
            { val: '4,424.2 &rarr; 4,518.2' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Splitting Prior Growth, Wider Coverage, and Late-2024 Drops',
      subtitle: 'Checking each period with pre-2020 trends and other care codes before setting payment rules.',
      caption: 'Table 2 compares recorded counts, baseline trend checks, budget risks, and review steps across four Medicaid periods.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Recorded Change in Period',
          cells: [
            { val: 'Billers on telehealth-eligible codes rose from 84,422 in 2018 to 91,399 in 2019 (+8.26%) before 2020 rules.' },
            { val: 'Monthly billers reached 113,638 in 2023 (+22,239 vs. 2019), while yearly gains (+5,560/yr) were below 2019.' },
            { val: 'Full-year 2024 billers averaged 101,978 (-10.26% vs. 2023), lowered by sharp November and December drops.' },
            { val: 'Other Medicaid codes rose from 101,905 in 2018 to 129,492 in 2023 (+18.71% vs. 2019) and 116,690 in 2024.' }
          ]
        },
        {
          label: 'What Trend Checks Show',
          cells: [
            { val: 'Pre-2020 records show +6,977 added billers per year that a single 2019 count leaves out.' },
            { val: 'Compared with a straight-line projection from 2018-2019 (119,307), 2023 counts are 5,669 billers lower.' },
            { val: 'Both telehealth codes (-24,306) and other care (-28,307) are ~19% below straight-line trends in 2024.' },
            { val: 'Other Medicaid care rose +18.71% from 2019 to 2023, equal to 77% of the +24.33% telehealth increase.' }
          ]
        },
        {
          label: 'Budget Risk If Skipped',
          cells: [
            { val: 'Extending one pre-2020 year across five years turns a single-year gain into a high five-year target.' },
            { val: 'Counting all +22,239 billers (+24.33%) as a policy effect double-counts clinic hiring and member growth.' },
            { val: 'Treating the 2024 drop to 101,978 as provider exit from telehealth misses a similar drop in other care.' },
            { val: 'Reviewing telehealth codes alone leaves out wider Medicaid enrollment growth while renewals were paused.' }
          ]
        },
        {
          label: 'Review Options',
          policyFit: true,
          cells: [
            { headline: 'Check Multi-Year Pre-Trends', detail: 'Chart at least 24 pre-policy months and test more than one baseline trend first.' },
            { headline: 'Compare With Other Care', detail: 'Compare against other Medicaid care (+18.71%) to report a descriptive two-group difference.' },
            { headline: 'Check Jan-Oct Next to Full Year', detail: 'Compare January-October 2024 counts (108,781) with full-year counts while late claims are reported.' },
            { headline: 'Combine Trend &amp; Group Checks', detail: 'Use both pre-2020 growth rates and other Medicaid care to bound descriptive differences.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Monthly Data Structure, Trend Formulas &amp; Late-2024 Decline',
      notesBullets: [
        '<strong>Recorded Monthly Summary Data.</strong> Monthly summaries (<code>telehealth_month_summary.parquet</code>, 168 rows across 84 months and 2 code groups, Jan 2018&ndash;Dec 2024) come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> file. Provider and code rows report 12-month averages. Paid-dollar rows report 12-month totals.',
        '<strong>Trend Projection Formulas.</strong> The straight-line projection adds 6,977 billers each year after 2019 (<code>91,399 + [year &minus; 2019] &times; 6,977</code>). That formula gives 119,307 in 2023 (-5,669 difference) and 126,284 in 2024 (-24,306 difference; -28,307 on other care from 144,997 vs. 116,690). The percent projection multiplies 91,399 by <code>1.0826^(year &minus; 2019)</code>, giving 125,549 (-11,911) in 2023 and 135,919 (-33,941) in 2024.',
        '<strong>Late-2024 Decline Across Both Groups.</strong> Billers on telehealth-eligible codes averaged 108,781 from January through October 2024 (+19.02% vs. 2019). Counts then fell to 88,364 in November 2024 and 47,562 in December 2024. Other Medicaid care fell at the same time, from 124,092 in January&ndash;October to 101,476 and 57,878 in November&ndash;December. National totals alone cannot prove the cause, though late year-end claim reporting and resumed eligibility checks are both possible reasons.'
      ]
    },
    synthesis: {
      title: 'Why Pre-2020 Trends and Other Care Codes Clarify Two-Year Counts',
      p1: 'Subtracting 2019 counts from 2023 counts assumes Medicaid biller counts would have stayed unchanged without new rules. Across 84 months of HHS records, billers on telehealth codes rose by +22,239 (+24.33%) from 2019 to 2023. Monthly averages moved from 91,399 to 113,638. Yet two wider changes happened at the same time. First, telehealth codes had already added +6,977 billers (+8.26%, from 84,422 to 91,399) from 2018 to 2019. Second, while renewals were paused, billers on other Medicaid codes rose by +18.71% (109,087 to 129,492).',
      p2: 'Checking both pre-2020 trends and other care codes avoids two opposite budget errors. Extending the one-year 2018-2019 gain straight to 119,307 leaves 2023 counts 5,669 billers below trend. That difference shows how strongly one pre-policy year affects a five-year projection. By contrast, subtracting growth in other Medicaid care leaves a descriptive +5.62 percentage-point difference through 2023. Late-2024 drops (-24,306 and -28,307 vs. trend) also happened in both code groups at once. Late claim reports or coverage checks may explain that shared decline.'
    },
    methodologyParagraphs: [
      '<strong>Study Data and Trend Calculations.</strong> Monthly biller counts, active procedure codes, and annual Medicaid payments are recorded national totals from the HHS Medicaid Provider Spending file (2 code groups across 84 months = 168 rows, Jan 2018&ndash;Dec 2024). Straight-line and percent projections extend the recorded 2018&ndash;2019 change forward to show how different baseline trends affect comparisons.',
      '<strong>Main Data Sources.</strong> Records and rules come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a>, <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Medicaid.gov Open Data</a>, <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS Transformed Medicaid Statistical Information System (T-MSIS) Analytic Files Documentation</a>, and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    faqs: [
      {
        question: 'Why does a two-year before-and-after count overstate policy gains when clinic staffing is already rising?',
        answer: 'A two-year count assumes the 2019 average of 91,399 billers would not have changed without the rule. Because clinics were already adding staff, that subtraction counts routine clinic and enrollment growth as a policy gain.'
      },
      {
        question: 'What do the 2018-2019 growth rate (+8.26%) and other care (+18.71%) show about the +24.33% telehealth increase?',
        answer: 'Telehealth-eligible codes were already adding +6,977 billers per year (+8.26%) before 2020. Other Medicaid care also grew +18.71% from 2019 to 2023 while coverage renewals were paused. Together, these figures show that most of the +24.33% increase occurred alongside wider Medicaid growth.'
      },
      {
        question: 'Why did both telehealth-eligible and other Medicaid biller counts fall in late 2024?',
        answer: 'Through October 2024, billers on telehealth-eligible codes averaged 108,781 (+19.02% above 2019). Counts then fell in November and December 2024 for both telehealth-eligible codes (88,364 and 47,562) and other care (101,476 and 57,878). National totals alone cannot prove the cause. Late claim reporting and resumed eligibility checks are both possible reasons for that shared decline.'
      }
    ],
    related: [
      { slug: 'threat-history-solutions', title: 'Checking Telehealth With Other Medicaid Care Shows Distinct Growth Rates as More Adults Join', note: 'Related case study comparing telehealth-eligible and other Medicaid care during wider enrollment' },
      { slug: 'parallel-trends-power', title: 'Wide Error Ranges Before a Policy Can Miss Slow Differences in County Trends', note: 'Related case study checking pre-policy error ranges and post-policy trend limits' },
      { slug: 'identical-data-opposite-policies', title: 'Fixed Medi-Cal Visit Fees Do Not Meet City Clinic Costs While Poor Inland Areas Lack Care', note: 'Related case study on how local clinic costs and poverty affect Medi-Cal care' }
    ]
  },

  // =========================================================================
  // MODULE #2: selection-into-treatment (Track 1, public, unlisted)
  // =========================================================================
  {
    slug: 'selection-into-treatment',
    unlisted: true,
    tier: 'public',
    briefType: 'Program Cost &amp; Impact Model &middot; Paid Family Leave',
    trackEyebrow: 'Track 1: Program Impact &middot; Leave Use by Wage Group, Job Rules, and Payroll Taxes',
    pageTitle: 'Wage Replacement Rates & Paid Leave Use | CAPHE',
    metaDescription: 'Model how California SB 951 leave pay rates (90% vs. 70%), five-worker job rules, and employer pay affect 12-week Paid Family Leave costs.',
    h1: 'Higher Low-Wage Leave Pay and Small-Firm Job Rules Affect Who Uses Paid Family Leave',
    subtitle: 'Modeling how 90% low-wage leave pay, five-worker job rules, and firm pay affect leave claims.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'All <strong>18.5 million</strong> workers in California State Disability Insurance pay payroll tax on all wages, and SB 951 pays <strong>90%</strong> of wages to lower earners [1,2]. Yet state Paid Family Leave pay ends at 8 weeks while job protection lasts 12 weeks at 5+ worker firms [2].'
      },
      {
        lead: 'What our model estimates',
        html: 'Suppose claimants use <strong>35%</strong> of four added weeks on average across <strong>369,600</strong> claims (<strong>+39,600</strong> added) [1,3]. Gross SDI cost reaches <strong>$623.7M/yr</strong> (<strong>1.345%</strong> tax rate) and adds <strong>$422.0M</strong> in net worker pay, with a <strong>+$19.7M</strong> net gain for the lowest wage group [2,3].'
      },
      {
        lead: 'Policy option',
        html: 'State budget teams can plan SDI reserves on <strong>$623.7M</strong> gross cash rather than the <strong>$1,910.0M</strong> full-use limit [3]. Clinics can also add leave claim help to WIC and Medi-Cal prenatal visits [2].'
      }
    ],
    endnotes: [
      '<strong>California Paid Family Leave (PFL) &amp; State Disability Insurance (SDI) Baselines.</strong> Baseline figures come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Employment Development Department (EDD) May 2026 Disability Insurance Fund Forecast</a> and <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019&ndash;2023 5-Year Microdata</a>. The forecast covers 18.5 million workers, $1,371.5B in taxed wages with no wage cap, and 330,000 projected 2026 PFL claims.',
      '<strong>Senate Bill 951 Pay Rates, CFRA Job Rules &amp; Payroll Taxes.</strong> <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC &sect;&sect; 984 &amp; 3300)</a> removed the SDI wage cap on Jan 1, 2024 and raised leave pay to 90% of wages for lower-paid workers on Jan 1, 2025. The <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Family Rights Act (CFRA, Gov. Code &sect; 12945.2)</a> protects jobs for 12 weeks at firms with 5 or more workers. Together, the model estimates a +$19.7M yearly net gain for the lowest wage group (+$23.0M across the bottom two groups).',
      '<strong>Expected Leave Use Compared With 100% Full Use.</strong> The <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a> models a 35% average share of the four added weeks used (369,600 claims, +39,600 added claims). That case costs $623.7M per year in gross SDI spending and adds $422.0M in net worker pay after a 30% private employer pay offset. Assuming 100% use of all four added weeks raises gross cost to $1,910.0M per year.'
    ],
    block2: {
      title: 'Full 100% Use Upper Limit Compared With Expected Use by Wage Group',
      contextTag: 'Policy Model on Employment Development Department (EDD) Baselines & Wage Groups (18.5M Workers)',
      ariaLabel: 'Comparison of 100% full use versus expected 35% use across wage groups',
      ruler1: {
        title: 'Full 100% Use Upper Limit (0% Firm Offset)',
        stat: '$1,910.0M Gross Outlay (396,000 Claims)',
        ariaLabel: 'Assuming 100% use projects $1,910.0M in annual gross outlays',
        segments: [
          { cls: 'seg-rent', width: 100, label: '100% Limit: $1,910.0M Gross Outlay' }
        ],
        desc: 'Assuming every claimant uses all 4 added weeks triples estimated yearly fund costs.'
      },
      ruler2: {
        title: 'Expected Use (35% Added Weeks) & SB 951 Net Gains',
        stat: '$623.7M Gross | $422.0M Net | +$19.7M Lowest Group',
        ariaLabel: 'Expected 35% use gives $623.7M gross outlay, $422.0M net worker pay, and +$19.7M net gain for lowest-wage workers',
        segments: [
          { cls: 'seg-primary', width: 68, label: 'Net Worker Pay $422.0M' },
          { cls: 'seg-food', width: 29, label: '30% Firm Offset $180.8M' },
          { cls: 'seg-gross', width: 3, label: 'Admin' }
        ],
        desc: 'Expected 35% use costs $623.7M gross and provides +$19.7M net to lowest-paid workers.'
      }
    },
    table1: {
      title: 'Table 1. Modeled Leave Claims, Payroll Tax Shares, and Net Gains by Wage Group',
      subtitle: 'Comparing SB 951 leave pay rates (90% vs. 70%) and SDI payroll taxes across 18.5 million workers.',
      caption: 'Table 1 compares weekly wage replacement rates, worker shares, added payroll tax shares, added Paid Family Leave pay shares, and net gains across California wage groups.',
      cornerLabel: 'Wage &amp; Tax Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Policy Estimates.</strong> Worker and wage shares come from 2019&ndash;2023 U.S. Census ACS 5-Year microdata scaled to the California EDD May 2026 Disability Insurance Fund Forecast (18.5M covered workers, 330,000 baseline 2026 PFL claims, $1,371.5B taxed wages). Modeled rows test an 8-to-12-week PFL plan with 35% average use of the four added weeks (+12% new claims to 369,600, or +39,600 added claims) and a 30% employer pay offset. Group benefit cells apply rounded group shares ($63.4M + $78.1M + $186.4M + $83.0M = $410.9M allocated across the four groups vs. $422.0M statewide net worker pay).',
      columns: [
        { tag: 'Group 1 (&lt;$25K)', tagHighlight: true, title: 'Lowest Wage Group', subtitle: 'Average wage $18K (25% of workers).' },
        { tag: 'Group 2 ($25K-$45K)', tagHighlight: true, title: 'Second Wage Group', subtitle: 'Average wage $35K (22% of workers).' },
        { tag: 'Groups 3-4 ($45K-$110K)', tagHighlight: false, title: 'Middle Wage Groups', subtitle: '38% of SDI-covered workers.' },
        { tag: 'Group 5 ($110K+)', tagHighlight: false, title: 'Highest Wage Group', subtitle: 'Average wage $165K (15% of workers).' }
      ],
      rows: [
        {
          label: 'SB 951 Weekly Leave Pay Rate<span class="block text-xs font-normal text-slate-500">Started Jan 1, 2025 ($1,765/wk cap in 2026)</span>',
          cells: [
            { val: '90% of weekly wage' },
            { val: '90% of weekly wage' },
            { val: '90% (Mid) to 70% (Upper-Mid)' },
            { val: '70% (capped at $1,765/wk)' }
          ]
        },
        {
          label: 'Share of Covered Workers<span class="block text-xs font-normal text-slate-500">18.5M workers ($1,371.5B taxed wages)</span>',
          cells: [
            { val: '25.0% of workers' },
            { val: '22.0% of workers' },
            { val: '38.0% of workers' },
            { val: '15.0% of workers' }
          ]
        },
        {
          label: 'Modeled Share of Added SDI Tax*<span class="block text-xs font-normal text-slate-500">Tax on all wages (+0.045 pp to 1.345%)</span>',
          modeled: true,
          cells: [
            { val: '7.0% (+$43.7M tax)' },
            { val: '12.0% (+$74.8M tax)' },
            { val: '42.5% (+$264.7M tax)' },
            { val: '38.6% (+$240.5M tax)' }
          ]
        },
        {
          label: 'Modeled Share of Added Net PFL Pay*<span class="block text-xs font-normal text-slate-500">369,600 modeled claims (+39,600 added)</span>',
          modeled: true,
          cells: [
            { val: '15.4% (+$63.4M benefits)' },
            { val: '19.0% (+$78.1M benefits)' },
            { val: '45.3% (+$186.4M benefits)' },
            { val: '20.2% (+$83.0M benefits)' }
          ]
        },
        {
          label: 'Modeled Net Yearly Difference*<span class="block text-xs font-normal text-slate-500">Added net leave pay minus added payroll tax</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '+$19.7M Net Gain', barWidth: 13, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '+$3.3M Net Gain', barWidth: 2, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-$78.2M Net Tax Share', barWidth: 50, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-$157.5M Net Tax Share', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Modeled Main Factor Affecting Use*<span class="block text-xs font-normal text-slate-500">Key rule or pay factor in weeks 9 to 12</span>',
          modeled: true,
          cells: [
            { val: '90% pay + small-firm CFRA rules' },
            { val: '90% pay + 5-worker CFRA rule' },
            { val: 'Partial employer leave pay' },
            { val: '30% to 50% employer pay offset' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How Pay Rates, Job Rules, and Employer Pay Affect Leave Budgets',
      subtitle: 'Linking worker leave claims across wage groups to SDI tax rates and clinic help.',
      caption: 'Table 2 compares household pay and job rules, leave-use factors, tax tradeoffs, and policy rules across four wage groups.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Pay &amp; Job Rule Factor',
          cells: [
            { val: 'Under older 60% pay rules, low-wage parents could not lose 40% of pay to stay home.' },
            { val: 'The California Family Rights Act (CFRA) protects jobs for 12 weeks at 5+ worker firms, while PFL pay ends at week 8.' },
            { val: 'Middle-wage families compare 70% to 90% state leave checks with saved vacation pay and monthly rent.' },
            { val: 'Salaried staff often get paid employer leave that combines state PFL checks with regular wages.' }
          ]
        },
        {
          label: 'How Leave Use Changes Cost',
          cells: [
            { val: 'Raising low-wage leave pay to 90% helps hourly parents use benefits funded by their payroll taxes.' },
            { val: 'Workers at firms with under 5 staff lack CFRA job protection, keeping leave use well below 100%.' },
            { val: 'Modeling +12% more claims (+39,600 claims to 369,600) reflects added bonding leave when pay matches 12 weeks.' },
            { val: 'Separating $623.7M gross SDI spending from $422.0M net worker pay accounts for the 30% employer pay offset.' }
          ]
        },
        {
          label: 'Tax &amp; Reserve Tradeoff',
          cells: [
            { val: 'Adding 4 weeks without SB 951\'s 90% rate would send most added leave dollars to salaried workers.' },
            { val: 'Matching 8-week PFL pay to 12-week CFRA job protection costs the SDI fund $623.7M per year.' },
            { val: 'Capping weekly checks at $1,765 limits top-group payments while keeping 90% pay for lower earners.' },
            { val: 'Taxing all wages means top earners pay 38.6% (+$240.5M) of added tax and receive 20.2% of added pay.' }
          ]
        },
        {
          label: 'Policy &amp; Tax Options',
          policyFit: true,
          cells: [
            { headline: 'Pair 90% Pay With Clinic Help', detail: 'Add PFL claim help to Women, Infants, and Children (WIC) and Medi-Cal prenatal visits.' },
            { headline: 'Align 12-Week Pay With CFRA', detail: 'Match 12 weeks of PFL pay with 12 weeks of CFRA job protection for hourly parents.' },
            { headline: 'Report Gross &amp; Net Dollars', detail: 'Plan SDI reserves on $623.7M gross cash while reporting $422.0M net worker pay in tax tables.' },
            { headline: 'Keep All Wages in Tax Base', detail: 'Fund added weeks across all $1,371.5B in covered wages at a 1.345% rate (+0.045 pp).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Census Scaling, Employer Pay Offsets &amp; State Comparisons',
      notesBullets: [
        '<strong>Data Sources and Scaling.</strong> Individual EDD tax records are confidential. Wage-group shares across California\'s 18.5M SDI-covered workers are estimated from <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019&ndash;2023 5-Year Public Use Microdata</a>. Totals are scaled to the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD May 2026 DI Fund Forecast</a> (330,000 baseline 2026 PFL claims, $1,165 average weekly check, $1,371.5B taxed wages).',
        '<strong>Employer Pay Offset and State Cash Spending.</strong> Many employers coordinate paid leave so state PFL checks replace part of employer-paid leave (modeled at 50% in the low-use case, 30% in the expected case, and 0% in the 100% limit). In the expected case, that 30% offset reduces added worker pay from $602.8M gross benefits to $422.0M net statewide ($410.9M summed across the four rounded group shares in Table 1). Even so, the state SDI fund still pays the full $623.7M gross cash bill ($602.8M benefits plus ~3.5% administration).',
        '<strong>Other State Leave Rates.</strong> California\'s 90% low-wage leave rate under SB 951 matches Washington and Colorado (90%) and is higher than New Jersey (85%) and New York (67%).'
      ]
    },
    synthesis: {
      title: 'Why Worker Leave Choices Affect Both Fund Reserves and Tax Fairness',
      p1: 'In program studies, selection into treatment means people who use a program differ from people who do not. In Paid Family Leave (PFL), who claims added weeks shapes both fund costs and tax fairness. Under the California Family Rights Act (CFRA), firms with five or more workers must hold jobs for 12 weeks. Yet state PFL pay ends after week 8. Because hourly families have less cash saved, many return to work early while salaried staff with employer leave pay take all 12 weeks.',
      p2: 'Modeling leave use alongside payroll taxes avoids two budget errors. Setting reserves for 100% full use ($1,910.0M gross per year and a -$0.58B deficit) estimates three times the expected cost. By contrast, assuming longer leave helps mainly high earners misses how Senate Bill 951 changed payroll taxes. Because SB 951 raised low-wage pay to 90% and taxed all covered wages, expected 35% use ($623.7M gross at a 1.345% rate, $422.0M net worker pay) provides +$23.0M in net yearly gains to the bottom two wage groups (+$19.7M and +$3.3M).'
    },
    interactive: {
      badge: 'Leave-Use &amp; Offset Cases',
      title: 'Compare How Leave Use and Employer Pay Change Annual PFL Costs',
      subtitle: 'Comparing modeled yearly SDI gross cash costs and net worker pay across low, expected, and full-use cases.',
      options: [
        {
          label: 'Case 1 &middot; Lower Use',
          headline: '25% Added-Week Use | 50% Firm Offset',
          metric: '$417.8M Gross | $201.8M Net Pay',
          desc: 'Yearly claims reach 346,500 (1.330% SDI rate), while employer leave coordination reduces added net worker pay by half.'
        },
        {
          label: 'Case 2 &middot; Expected Use',
          headline: '35% Added-Week Use | 30% Firm Offset',
          metric: '$623.7M Gross | $422.0M Net Pay',
          desc: 'Yearly claims reach 369,600 (+39,600 claims; 1.345% SDI rate) and provide +$23.0M net to the bottom two wage groups.'
        },
        {
          label: 'Case 3 &middot; 100% Upper Limit',
          headline: '100% Added-Week Use | 0% Firm Offset',
          metric: '$1,910.0M/Yr | -$0.58B 2026 Bal.',
          desc: 'Full use across 396,000 claims triples yearly spending and leaves a -$0.58B 2026 SDI deficit (-3.0% of annual spending).'
        }
      ],
      notesTitle: 'Scenario Calculations, Six-Year Spending &amp; Reserve Effects',
      notesBullets: [
        '<strong>Case 1 Lower Use (25% of Added Weeks / +5% New Claims).</strong> Claims rise by +16,500 above the 330,000 baseline to 346,500 per year. Gross SDI spending is <strong>$417.8M/yr</strong> (<strong>$2.688B</strong> across 2025&ndash;2030, 1.330% tax rate), and net worker pay rises by <strong>$201.8M/yr</strong>.',
        '<strong>Case 2 Expected Use (35% of Added Weeks / +12% New Claims).</strong> Claims rise by +39,600 to 369,600 per year. Gross SDI spending is <strong>$623.7M/yr</strong> (<strong>$4.013B</strong> across 2025&ndash;2030, 1.345% tax rate), and net worker pay rises by <strong>$422.0M/yr</strong>.',
        '<strong>Case 3 Full-Use Upper Limit (100% of Added Weeks / +20% New Claims).</strong> Claims rise by +66,000 to 396,000 per year. Gross SDI spending reaches <strong>$1,910.0M/yr</strong> (<strong>$12.286B</strong> across 2025&ndash;2030). That cost leaves a 2026 SDI balance of <strong>-$0.58B</strong>, equal to <strong>-3.0%</strong> of projected 2026 SDI spending.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Recorded EDD Totals and Policy Model.</strong> Calendar-year 2025 PFL claims (325,055), weekly checks ($1,090), and SDI fund balance ($3.011B) are recorded EDD figures. Baseline 2026 projections (330,000 claims, $1,165 weekly check, $1,371.5B taxed wages) come from the EDD May 2026 DI Fund Forecast. Wage-group shares (25%, 22%, 38%, 15%) and 12-week cost cases come from the <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a>.',
      '<strong>Main Data Sources.</strong> Records come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a>, <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Data Series</a>, <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC &sect;&sect; 984 &amp; 3300) &amp; CFRA (Gov. Code &sect; 12945.2)</a>, and <a href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 2019&ndash;2023 5-Year Microdata</a>.'
    ],
    faqs: [
      {
        question: 'Why does Paid Family Leave use differ across wage groups when every covered worker pays into the fund?',
        answer: 'All 18.5 million SDI-covered workers pay payroll tax. Yet lower-paid hourly workers could not afford large pay cuts before 90% leave pay began. Workers at firms with fewer than five staff also lack CFRA job protection.'
      },
      {
        question: 'How did Senate Bill 951 change who pays and who benefits in California Paid Family Leave?',
        answer: 'Senate Bill 951 ended the wage cap on January 1, 2024, so high earners now pay SDI tax on all covered wages. On January 1, 2025, the law raised weekly leave pay to 90% for lower-paid workers. Under a 12-week plan, those two rules give a modeled +$19.7M yearly net gain to the lowest wage group.'
      },
      {
        question: 'Why do Employment Development Department (EDD) forecasts separate $623.7M gross SDI cost from $422.0M net worker pay?',
        answer: 'Many salaried workers get private paid leave from their employers. When firms coordinate pay (modeled at 30% in the expected case), state PFL checks replace part of employer pay instead of adding dollar for dollar ($422.0M net vs. $602.8M gross benefits). Even so, the state SDI fund must still pay the full $623.7M cash bill.'
      }
    ],
    related: [
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Related case study comparing 2025-2030 EDD SDI reserve goals with multi-year value estimates' },
      { slug: 'collider-bias', title: 'Testing Fraud Checks Only on Current Billers Leaves Out Banned Providers Who Stopped Early', note: 'Related case study on sample selection and full-population base-rate checks' },
      { slug: 'study-design-ladder', title: 'Planning Outreach, Costing State Laws, and Checking Budgets Each Need a Matched Study Method', note: 'Related case study matching statewide PFL cost models to other study methods' }
    ]
  },

  // =========================================================================
  // MODULE #3: threat-regression-to-mean (Track 1, community)
  // =========================================================================
  {
    slug: 'threat-regression-to-mean',
    tetsCompanion: [
      {
        visibleLabel: 'County Health Spending by Period',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 yearly county records), each dollar per resident is linked to -0.238 deaths per 100,000 in 2003 to 2019 and +0.247 in 2020 to 2023.'
      }
    ],
    tier: 'community',
    briefType: 'Evidence Guide &middot; County Health Budgets',
    trackEyebrow: 'Track 1: Program Impact &middot; Small-County Rate Changes, Return Toward Average, and Five-Year Means',
    pageTitle: 'High One-Year Death Rates & Five-Year Means | CAPHE',
    metaDescription: 'Separate random yearly changes in small-county death rates (89% weight on regional averages in tiny counties) from lasting need with 5-year means.',
    h1: 'Five-Year County Averages Separate Lasting Rural Death Risk From High One-Year Rates',
    subtitle: 'Using five-year county averages and group size weights so rural health grants match lasting need.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Grant programs sometimes rank counties on one year of death rates per 100,000 people [2]. In small rural counties, two or three extra deaths raise that rate sharply before returning toward average next year [2].'
      },
      {
        lead: 'What the comparison shows',
        html: 'In Alpine County (<strong>1,204</strong> residents), one death changes the yearly rate by <strong>83.06</strong> points, and a count model estimates that <strong>89.4% (-20.3 per 100K)</strong> of a top-10% 1-year rise returns toward average next year [2]. Across 17 pre-COVID years of county records, <strong>$10</strong> per person links to <strong>-2.42</strong> deaths per 100K in counties up to 500K (<strong>-4.32</strong> over 13 years statewide, adj. <em>p</em> = 0.067) [1].'
      },
      {
        lead: 'Policy option',
        html: 'State offices can rank rural grants on five-year averages weighted by county size (<strong>0.89</strong> weight in tiny counties) [2,3]. Pairing a base staffing grant with per-person aid keeps rural clinics funded across years [1,3].'
      }
    ],
    endnotes: [
      '<strong>California 57-County Public Health Study (2003&ndash;2023).</strong> Spending and death records come from the <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a> and <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Public Health (CDPH) Vital Statistics</a> across 57 counties and 39,538,223 residents. Across 943 pre-COVID yearly county records, $10 more per resident is linked to -2.42 deaths per 100,000 in counties up to 500,000 residents, -2.38 statewide each year, and -4.32 over 13 years (p = 0.067 after multiple-test adjustment, above 0.05).',
      '<strong>Small Populations and Return Toward Average.</strong> Population counts come from <a href="https://dof.ca.gov/forecasting/demographics/estimates/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance (DOF) E-1 Population Estimates</a>. In Alpine County (1,204 residents), one death changes the yearly rate per 100,000 by 83.06 points. In the model, 89.4% (-20.3 per 100,000) of an apparent -22.7 next-year decrease after a high one-year rate comes from random variation returning toward average.',
      '<strong>Combining Years and Population Weights.</strong> Methods for 3-to-5-year county averages and uncertainty weights come from the <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology</a>.'
    ],
    block2: {
      title: 'One-Year Drop After a High Rate Compared With Multi-Year County Links',
      contextTag: 'Small-County Rate Variation on California Department of Finance (DOF) Counts + 57-County Study',
      ariaLabel: 'Comparison of one-year county mortality return toward average versus 57-county multi-year spending-death links',
      ruler1: {
        title: 'Apparent 1-Year Drop After Selecting Highest-10% Rates',
        stat: '-22.7 / 100K (89.4% Return to Average)',
        ariaLabel: 'Selecting small rural counties after a 90th-percentile high rate produces an apparent -22.7 per 100,000 drop with 89.4% from return to average',
        segments: [
          { cls: 'seg-food', width: 89, label: 'Return to Average: -20.3 / 100K (89.4%)' },
          { cls: 'seg-primary', width: 11, label: 'Multi-Year Link: -2.42' }
        ],
        desc: 'Selecting small counties after a high 1-year rate produces -20.3 per 100,000 of expected return toward average.'
      },
      ruler2: {
        title: 'Recorded Multi-Year County Links (2003-2019)',
        stat: '-2.42 / 100K Rural | -4.32 13-Yr (adj. p = 0.067)',
        ariaLabel: 'Multi-year county models estimate links of -2.42 per 100,000 in smaller counties and -4.32 over 13 years (adjusted p = 0.067)',
        segments: [
          { cls: 'seg-primary', width: 56, label: 'Smaller Counties: -2.42 / 100K' },
          { cls: 'seg-rest', width: 44, label: '13-Yr Link: -4.32 (adj. p = 0.067)' }
        ],
        desc: 'Combining years links $10 per resident to -2.42 per 100,000 in smaller counties and -4.32 over 13 years (adj. p = 0.067).'
      }
    },
    table1: {
      title: 'Table 1. Small-County Rate Variation, Size Weights, and Spending Links by County Size',
      subtitle: 'Checking county headcounts, one-death rate changes, size weights, and 57-county death links.',
      caption: 'Table 1 compares the smallest rural counties, small rural counties, counties up to 500,000 residents, and all 57 counties on population size, random rate variation, statistical weights, and spending-death links.',
      cornerLabel: 'Rate &amp; Study Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Calculated Variation Estimates.</strong> One-year Poisson random variation (at an average of 750 deaths per 100,000) and regional-average weights are calculated from recorded California Department of Finance E-1 county populations (Alpine 1,204 through 57-county total 39,538,223). Spending-death links come from the 57-county CAPHE LHA study across 943 pre-COVID yearly county records: -2.42 per $10 in &le;500K counties (SE = 0.98, p = 0.0136), -2.38 statewide each year (SE = 0.78, p = 0.0022), and -4.32 over 13 years (SE = 1.54, unadjusted p = 0.0052, p = 0.067 after multiple-test adjustment, above 0.05).',
      columns: [
        { tag: 'Under 10K Pop', tagHighlight: true, title: 'Smallest Rural Counties', subtitle: 'Under 10,000 residents: Alpine (1,204) to Modoc (8,700).' },
        { tag: '15K-25K Pop', tagHighlight: false, title: 'Small Rural Counties', subtitle: 'Trinity (16,060) to Colusa (22,280) residents.' },
        { tag: 'Counties &le;500K', tagHighlight: true, title: 'Counties Up to 500K', subtitle: '500,000 or fewer residents (671 yearly county records).' },
        { tag: 'All 57 Counties', tagHighlight: false, title: 'All 57 Counties', subtitle: '39,538,223 residents across 2003-2019 (943 yearly records).' }
      ],
      rows: [
        {
          label: 'County Resident Population<span class="block text-xs font-normal text-slate-500">CA Dept. of Finance E-1 population</span>',
          cells: [
            { val: '1,204 (Alpine) to 8,700 (Modoc)' },
            { val: '16,060 (Trinity) to 22,280 (Colusa)' },
            { val: '&le; 500,000 smaller/rural group' },
            { val: '39,538,223 (57 counties)' }
          ]
        },
        {
          label: 'Rate Change From One Death<span class="block text-xs font-normal text-slate-500">100,000 divided by county population</span>',
          cells: [
            { val: '11.49 to 83.06 per 100K' },
            { val: '4.49 to 6.23 per 100K' },
            { val: '0.20 to 6.23 per 100K' },
            { val: '0.01 to 0.05 (large urban)' }
          ]
        },
        {
          label: 'Estimated 1-Year Random Variation*<span class="block text-xs font-normal text-slate-500">Poisson variation at 750 deaths per 100K</span>',
          modeled: true,
          cells: [
            { val: '&plusmn;92.9 to &plusmn;249.6 per 100K' },
            { val: '&plusmn;57.9 to &plusmn;68.3 per 100K' },
            { val: '&plusmn;27.4 per 100K (multi-yr group)' },
            { val: '&plusmn;1.38 per 100K (state total)' }
          ]
        },
        {
          label: 'Weight on Regional Reference Mean*<span class="block text-xs font-normal text-slate-500">Share placed on regional average vs. 1-yr rate</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '89.0% pulled (0.89 weight)', barWidth: 89, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '68.0% pulled (0.68 weight)', barWidth: 68, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '24.0% pulled (pooled panel)', barWidth: 24, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '6.0% pulled (pop-weighted)', barWidth: 6, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Death-Rate Link per $10 / Resident<span class="block text-xs font-normal text-slate-500">Deaths per 100,000 per $10 spending</span>',
          highlight: true,
          cells: [
            { val: 'Not reported (&lt;11 deaths/yr)', textColor: 'text-rose-800' },
            { val: '1-yr variation exceeds link', textColor: 'text-amber-800' },
            { val: '-2.42 / 100K (smaller counties)', barWidth: 56, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-2.38 yr | -4.32 13-yr', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Statistical Checks by County Group<span class="block text-xs font-normal text-slate-500">Group stability and county cluster test</span>',
          cells: [
            { val: 'Large yearly rank changes' },
            { val: 'Strong next-year return to mean' },
            { val: 'Close to urban (-2.59 / 100K)' },
            { val: 'County cluster test p = 0.007' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Grant Rules Based on Lasting Need Rather Than Yearly Random Changes',
      subtitle: 'Using five-year averages, population weights, and base staff grants instead of high one-year rate lists.',
      caption: 'Table 2 compares how population size affects rates, how multi-year averages help, grant risks, and funding rules across four county groups.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Why Population Size Matters',
          cells: [
            { val: 'In the smallest rural counties (1,204 to 8,700 residents), each added death changes the rate per 100K by 11 to 83 points.' },
            { val: 'Small rural counties (16,060 to 22,280 residents) have +/-58 to +/-68 per 100K in normal yearly random variation.' },
            { val: 'Counties with 500,000 or fewer residents cover 671 yearly county records in the combined study group.' },
            { val: 'Combining 57 counties across 17 pre-COVID years (943 yearly records) separates lasting patterns from yearly variation.' }
          ]
        },
        {
          label: 'How Multi-Year Averages Help',
          cells: [
            { val: 'Giving 89.0% weight to regional averages reduces yearly changes in the funding rank of tiny rural counties.' },
            { val: 'Combining 3 to 5 years cuts random rate variation roughly in half and shows lasting health need.' },
            { val: 'Across counties &le;500K, $10 per resident is linked to 2.42 fewer deaths per 100K (tiny counties are not separate).' },
            { val: 'Testing 2020-2023 COVID-19 grant years (+2.47 deaths/100K per $10) apart keeps the pre-2020 link (-2.38) clear.' }
          ]
        },
        {
          label: 'Grant Risk If Skipped',
          cells: [
            { val: 'Selecting counties in the highest 10% of 1-year increases produces -20.3 of -22.7 per 100K (89.4%) from chance alone.' },
            { val: 'Cutting a rural team\'s grant after two or three chance deaths disrupts working clinic partnerships.' },
            { val: 'Assuming smaller counties lack usable evidence ignores the &le;500K estimate (-2.42 vs. -2.59 in &gt;500K urban).' },
            { val: 'Per-person formulas alone provide too little funding for the minimum staff small rural counties need.' }
          ]
        },
        {
          label: 'Rural Grant Options',
          policyFit: true,
          cells: [
            { headline: 'Rank on 5-Year Weighted Rates', detail: 'Use 5-year county averages and uncertainty weights (0.89 in tiny counties) to rank grant need.' },
            { headline: 'Compare With Similar Counties', detail: 'Review rural renewals against similar rural counties instead of 1-year decreases after high rates.' },
            { headline: 'Use &le;500K Combined Estimates', detail: 'Cite the -2.42 per 100K per $10 link across counties &le;500K when annual counts are under 11.' },
            { headline: 'Combine Base &amp; Per-Person Aid', detail: 'Pair a fixed base staffing grant for small counties with multi-year per-resident health funding.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Random Rate Variation, Statistical Weights &amp; Rural Group Estimates',
      notesBullets: [
        '<strong>How Population Size Affects Random Variation.</strong> Assume an average rate of 750 deaths per 100,000 people (0.0075). A Poisson count model estimates yearly random variation as <code>100,000 &times; &radic;(0.0075 &divide; Population)</code>. That formula gives &plusmn;249.6 in Alpine (1,204), &plusmn;92.9 in Modoc (8,700), and &plusmn;68.3 in Trinity (16,060). Selecting counties in the highest 10% of 1-year random increases produces an expected -20.3 per 100,000 next-year decrease from return toward average (89.4% of an apparent -22.7 decrease).',
        '<strong>Smaller Rural and Urban County Results.</strong> Across 943 pre-COVID yearly county records (2003&ndash;2019), routine public health spending is linked to fewer deaths before age 75 in both smaller counties (&le;500,000 residents: <strong>-2.42</strong> per $10, p = 0.0136, 671 records) and large urban counties (&gt;500,000 residents: <strong>-2.59</strong> per $10, p &lt; 0.0001). Statewide estimates are -2.38 each year, -4.32 over 13 years (p = 0.067 after multiple-test adjustment, above 0.05), and -5.31 in two-stage sensitivity checks (F = 111.20).'
      ]
    },
    synthesis: {
      title: 'Why Five-Year Averages Improve Both Rural Grant Lists and Program Reviews',
      p1: 'Giving short-term grants to counties with last year\'s highest death rate mistakes small population size for lasting need. Death rates report deaths for every 100,000 residents. One death in Alpine County (1,204 residents) changes its yearly rate by 83.06 points, vs. 0.01 in Los Angeles County. When a state office picks small counties after a high one-year rate, next year\'s rate is often closer to normal. That random increase is unlikely to repeat. The model assigns -20.3 of the -22.7 per 100,000 drop (89.4%) to regression to the mean.',
      p2: 'Two simple rules keep random rural variation out of grant awards. First, 3-to-5-year means and size weights (89.0% pulled in tiny rural counties and 68.0% pulled in small rural counties) match grants to lasting need. Second, combining 17 pre-pandemic years across 57 counties (39,538,223 residents) estimates multi-year patterns. In counties with 500,000 or fewer residents, $10 per resident in routine health spending links to 2.42 fewer deaths per 100,000 each year. That figure is close to the statewide yearly (-2.38) and 13-year (-4.32, adj. p = 0.067) links.'
    },
    methodologyParagraphs: [
      '<strong>Recorded County Data and Calculated Weights.</strong> County populations (Alpine 1,204 through 57-county total 39,538,223) and spending-death estimates come from CAPHE Local Health Authority study records. Those estimates are -2.42 in smaller counties (SE = 0.98, 671 records), -2.38 statewide each year (SE = 0.78, 943 records), and -4.32 over 13 years (SE = 1.54, unadjusted p = 0.0052, p = 0.067 after multiple-test adjustment, 57 counties). One-year Poisson variation, expected return-to-average shares, and reference weights (89.0%, 68.0%, 24.0%, 6.0%) are calculated from those population counts.',
      '<strong>Main Data Sources.</strong> Records come from <a href="https://dof.ca.gov/forecasting/demographics/estimates/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance (DOF) E-1 Population Estimates</a>, <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics Death Statistical Master Files (2003&ndash;2023)</a>, <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions Reports</a>, and <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014, Economics &amp; Human Biology)</a>.'
    ],
    faqs: [
      {
        question: 'Why do California\'s smallest rural counties appear among both the highest and lowest one-year death rates?',
        answer: 'Death rates report deaths per 100,000 residents. In Alpine County (1,204 residents), one added death raises the rate by 83.06 per 100,000. In Los Angeles County (9.72 million residents), one death changes the rate by 0.01, so small counties are far more likely to have very high or low one-year rates.'
      },
      {
        question: 'How does regression to the mean create apparent program gains after a high one-year rate?',
        answer: 'Counties picked after an unusually high Year-1 rate combine lasting health risk with random upward variation. In Year 2, that random error is unlikely to repeat. That expected return toward average produces a -20.3 per 100,000 decrease (89.4% of an apparent -22.7 drop) even if a grant had no effect.'
      },
      {
        question: 'Is routine health spending linked to lower death rates in smaller counties when several years are combined?',
        answer: 'Yes, as an observational link across 17 pre-pandemic years (2003-2019). In counties with 500,000 or fewer residents, each $10 per resident in routine health spending is linked to 2.42 fewer deaths per 100,000 each year (p = 0.0136). That estimate is similar to the -2.38 statewide yearly link and the -4.32 13-year link (adj. p = 0.067).'
      }
    ],
    related: [
      { slug: 'p-hacking-multiple-testing', title: 'Minimum Group Sizes and Net Member Losses Help Counties Set Medi-Cal Call Lists', note: 'Related case study on small-group rate changes across 62 county Medi-Cal groups' },
      { slug: 'observational-to-experimental', title: 'Routine County Health Spending Links With Lower Death Rates Outside Pandemic Grant Years', note: 'Related case study detailing the 57-county California public health study' },
      { slug: 'before-after-trap', title: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time', note: 'Related case study comparing pre-policy growth trends with two-year counts' }
    ]
  },

  // =========================================================================
  // MODULE #4: threat-history-solutions (Track 1, community)
  // =========================================================================
  {
    slug: 'threat-history-solutions',
    tetsCompanion: [
      {
        visibleLabel: 'When Two-Group Comparisons Apply',
        title: 'Using difference-in-differences in practice',
        url: 'https://tooearlytosay.com/research/methodology/when-to-use-did/',
        claimCovered: 'How a comparison group estimates change without the policy, which assumptions matter, and worked cases labeled as public or article-reported.'
      },
      {
        visibleLabel: 'Medicaid Provider Spending File Guide',
        title: 'What 238 Million Medicaid Billing Rows Can Support',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
        claimCovered: 'What each row in the HHS Medicaid provider-spending file counts (by provider, procedure code, and month) and rules for suppressing small counts across periods.'
      }
    ],
    tier: 'community',
    briefType: 'Evidence Guide &middot; Medi-Cal &amp; Claims',
    trackEyebrow: 'Track 1: Program Impact &middot; Comparing Code Groups During Wider Medicaid Enrollment',
    pageTitle: 'Telehealth vs. Other Medicaid Care Growth | CAPHE',
    metaDescription: 'Compare national biller counts for telehealth-eligible (+24.33%) and other Medicaid codes (+18.71%) over 84 months (+0.78 to +5.62 pp difference).',
    h1: 'Checking Telehealth With Other Medicaid Care Shows Distinct Growth Rates as More Adults Join',
    subtitle: 'Checking telehealth biller counts with other care codes and pre-2020 trends over 84 months.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'From 2020 to 2023, federal rules paused Medicaid renewals and kept millions more adults enrolled [3]. Checking telehealth-eligible billing codes alone mixes wider enrollment growth into telehealth counts [1,3].'
      },
      {
        lead: 'What the comparison shows',
        html: 'Across federal Medicaid records from 2019 to 2023, monthly telehealth-code billers rose <strong>+24.33%</strong> (<strong>91,399</strong> to <strong>113,638</strong>), while other Medicaid codes rose <strong>+18.71%</strong> (<strong>109,087</strong> to <strong>129,492</strong>) [1]. Subtracting that growth leaves a descriptive <strong>+5.62 pp</strong> gap, or <strong>+0.78 pp</strong> in a trend projection from 2018–2019 [1,2].'
      },
      {
        lead: 'Policy option',
        html: 'Agencies can report <strong>+0.78 pp to +5.62 pp</strong> as a descriptive range rather than a causal policy gain [1,2]. Reviewing both code groups together also shows that late-2024 declines occurred across all care [1].'
      }
    ],
    endnotes: [
      '<strong>National Medicaid Provider Counts for Two Code Groups (2018&ndash;2024).</strong> Monthly counts come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Department of Health and Human Services (HHS) Medicaid Provider Spending File</a> across 84 months (Jan 2018&ndash;Dec 2024). Billers on telehealth-eligible codes grew +24.33% (91,399 to 113,638) from 2019 to 2023, while billers on other Medicaid codes grew +18.71% (109,087 to 129,492). Subtracting the two gives a descriptive +5.62 percentage-point (pp) difference through 2023 (+5.26 pp in Jan&ndash;Oct 2024, or +4.60 pp across full-year 2024).',
      '<strong>Difference in Growth Before the Policy (2018&ndash;2019).</strong> Billers on telehealth-eligible codes grew +8.26% (84,422 to 91,399) from 2018 to 2019, compared with +7.05% (101,905 to 109,087) for other Medicaid codes. That +1.21 pp yearly difference before 2020 narrows the 2019&ndash;2023 descriptive difference to +0.78 pp if extended across four years.',
      '<strong>Paused Renewals &amp; Telehealth Policy Rules.</strong> Enrollment and policy rules come from <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS Transformed Medicaid Statistical Information System (T-MSIS) Analytic Files Documentation</a> and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Health Care Services (DHCS) Telehealth Policy Guidance</a>.'
    ],
    block2: {
      title: 'Telehealth Counts Alone Compared With Both Medicaid Code Groups',
      contextTag: 'Two-Group Check on HHS Medicaid Provider Spending (84 Months)',
      ariaLabel: 'Comparison of single-group telehealth provider growth (+24.33%) versus descriptive difference above other Medicaid codes (+5.62 pp)',
      ruler1: {
        title: 'Telehealth-Eligible Codes Alone (2019 to 2023)',
        stat: '+22,239 Billers (+24.33%)',
        ariaLabel: 'Single-group provider growth of 24.33 percent from 2019 to 2023',
        segments: [
          { cls: 'seg-gross', width: 77, label: 'Other Care (+18.71%)' },
          { cls: 'seg-primary', width: 23, label: 'Difference (+5.62 pp)' }
        ],
        desc: 'Checking telehealth-eligible codes alone includes wider Medicaid growth (+18.71% in other care).'
      },
      ruler2: {
        title: 'Descriptive Difference Compared With Other Medicaid Care',
        stat: '+5.62 pp (2023) | +4.60 pp (2024)',
        ariaLabel: 'Subtracting non-telehealth Medicaid growth leaves a descriptive +5.62 pp difference through 2023 and +4.60 pp through 2024',
        segments: [
          { cls: 'seg-primary', width: 55, label: '2019-2023: +5.62 pp' },
          { cls: 'seg-rest', width: 45, label: '2019-2024: +4.60 pp' }
        ],
        desc: 'Subtracting other Medicaid care leaves a descriptive +5.62 pp difference in 2023 and +4.60 pp in 2024.'
      }
    },
    table1: {
      title: 'Table 1. Telehealth Codes vs. Other Care Billers Across Four Spans (2018-2024)',
      subtitle: 'Checking yearly means of monthly biller counts and paid claims in both care groups.',
      caption: 'Table 1 compares providers billing telehealth-eligible codes and providers billing other Medicaid codes across 2018-2019, 2019-2023, 2019-2024, and 2023-2024.',
      cornerLabel: 'Two-Group Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Calculated Group Differences.</strong> Monthly biller counts and paid dollars come from the HHS Medicaid Provider Spending file across 84 months (Jan 2018&ndash;Dec 2024). Calculated rows subtract the percentage change in other Medicaid codes from the percentage change in telehealth-eligible codes. Rows also test extending the +1.21 pp 2018&ndash;2019 growth difference. These national totals cover two code groups with one pre-policy year, so they describe the records and cannot prove policy cause.',
      columns: [
        { tag: 'Pre-2020 Check', tagHighlight: false, title: '2018 to 2019 Period', subtitle: 'Growth rates before the 2020 policy.' },
        { tag: 'Growth Through 2023', tagHighlight: true, title: '2019 to 2023 Period', subtitle: 'Period while Medicaid renewals were paused.' },
        { tag: 'Through 2024', tagHighlight: true, title: '2019 to 2024 Period', subtitle: 'Full comparison through 12 months of 2024.' },
        { tag: '2024 Change', tagHighlight: false, title: '2023 to 2024 Change', subtitle: 'One-year decline across both code groups.' }
      ],
      rows: [
        {
          label: 'Billers on Telehealth Codes<span class="block text-xs font-normal text-slate-500">12-month start average to end average</span>',
          cells: [
            { val: '84,422 &rarr; 91,399' },
            { val: '91,399 &rarr; 113,638' },
            { val: '91,399 &rarr; 101,978' },
            { val: '113,638 &rarr; 101,978' }
          ]
        },
        {
          label: 'Telehealth Code Change<span class="block text-xs font-normal text-slate-500">Change in telehealth-eligible billers</span>',
          cells: [
            { val: '+6,977 (+8.26%)' },
            { val: '+22,239 (+24.33%)' },
            { val: '+10,579 (+11.57%)' },
            { val: '-11,660 (-10.26%)' }
          ]
        },
        {
          label: 'Billers on Other Medicaid Codes<span class="block text-xs font-normal text-slate-500">12-month start average to end average</span>',
          cells: [
            { val: '101,905 &rarr; 109,087' },
            { val: '109,087 &rarr; 129,492' },
            { val: '109,087 &rarr; 116,690' },
            { val: '129,492 &rarr; 116,690' }
          ]
        },
        {
          label: 'Other Medicaid Code Change<span class="block text-xs font-normal text-slate-500">Change in non-telehealth Medicaid billers</span>',
          cells: [
            { val: '+7,182 (+7.05%)' },
            { val: '+20,405 (+18.71%)' },
            { val: '+7,603 (+6.97%)' },
            { val: '-12,802 (-9.89%)' }
          ]
        },
        {
          label: 'Difference in Growth Rates*<span class="block text-xs font-normal text-slate-500">Telehealth % minus Other Medicaid %</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '+1.21 pp (pre-2020 diff)', barWidth: 22, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '+5.62 pp', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '+4.60 pp', barWidth: 82, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-0.37 pp', barWidth: 7, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'Difference Minus Earlier Trend*<span class="block text-xs font-normal text-slate-500">Subtracting +1.21 pp for each year</span>',
          modeled: true,
          cells: [
            { val: '0.00 pp (starting ref)' },
            { val: '+0.78 pp (after 4 yrs)' },
            { val: '-1.45 pp (after 5 yrs)' },
            { val: '-1.58 pp (after 1 yr)' }
          ]
        },
        {
          label: 'Annual Medicaid Dollars Paid<span class="block text-xs font-normal text-slate-500">Telehealth codes first | Other codes second</span>',
          cells: [
            { val: '$19.23B&rarr;$23.56B | $85.47B&rarr;$99.06B' },
            { val: '$23.56B&rarr;$40.29B | $99.06B&rarr;$153.37B' },
            { val: '$23.56B&rarr;$34.93B | $99.06B&rarr;$145.72B' },
            { val: '$40.29B&rarr;$34.93B | $153.37B&rarr;$145.72B' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Comparing Other Care Codes and Earlier Growth Rates in Medicaid Reviews',
      subtitle: 'Checking telehealth biller counts with other care codes, pre-2020 growth rates, and late-2024 declines.',
      caption: 'Table 2 compares wider enrollment growth, checks of earlier growth rates, budget risks, and review steps across four periods.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Wider Medicaid Change',
          cells: [
            { val: 'Both code groups grew before 2020 (+8.26% vs. +7.05%), leaving a +1.21 pp pre-policy difference.' },
            { val: 'While renewals were paused, other care rose +18.71%, which was 77% as large as telehealth\'s +24.33% rate.' },
            { val: 'From 2019 to 2024, the +6.97% rise in other care was 60% as large as telehealth\'s +11.57% rise.' },
            { val: 'Both provider counts fell ~10% in 2024 (-10.26% vs. -9.89%), possibly from renewals or reporting delays.' }
          ]
        },
        {
          label: 'Earlier Growth Check',
          cells: [
            { val: 'Telehealth billers grew 1.21 pp faster in 2018-2019, so earlier growth rates differed slightly.' },
            { val: 'Subtracting four years of that +1.21 pp earlier difference reduces the +5.62 pp 2023 difference to +0.78 pp.' },
            { val: 'Subtracting five years of +1.21 pp earlier growth moves the +4.60 pp 2024 difference to -1.45 pp.' },
            { val: 'Checking monthly pre-2020 counts shows whether +1.21 pp lasted all year or appeared briefly.' }
          ]
        },
        {
          label: 'Budget Risk If Skipped',
          cells: [
            { val: 'Assuming zero pre-2020 difference without checking 2018-2019 overstates precision in five-year reviews.' },
            { val: 'Setting telehealth payments from +24.33% alone counts wider Medicaid growth as a telehealth effect.' },
            { val: 'From 2019 to 2024, paid dollars rose 48.26% on telehealth codes and 47.10% on other codes (+1.16 pp).' },
            { val: 'Cutting telehealth rates after a -10.26% 2024 drop overlooks the small -0.37 pp difference between groups.' }
          ]
        },
        {
          label: 'Review Options',
          policyFit: true,
          cells: [
            { headline: 'Chart Monthly Pre-2020 Counts', detail: 'Check monthly 2018-2019 differences across both code groups and check for code changes.' },
            { headline: 'Report +0.78 to +5.62 pp Range', detail: 'Report the +5.62 pp difference and +0.78 pp trend-adjusted figure as descriptive benchmarks.' },
            { headline: 'Compare Jan-Oct &amp; Full 2024', detail: 'Check January-October 2024 (+5.26 pp) next to full-year 2024 (+4.60 pp) and earlier-trend bounds.' },
            { headline: 'Compare Shared 2024 Declines', detail: 'Compare against other Medicaid care (-9.89%) to see that both code groups declined together.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Growth Differences, Limits on Causal Claims &amp; Late-2024 Decline',
      notesBullets: [
        '<strong>Descriptive Growth Differences and Limits on Causal Claims.</strong> From 2019 to 2023, monthly billers on telehealth-eligible codes grew +24.33% (91,399 to 113,638), and other Medicaid codes grew +18.71% (109,087 to 129,492). Subtracting the two gives <code>24.33% &minus; 18.71% = +5.62 pp</code> (<code>11.57% &minus; 6.97% = +4.60 pp</code> through 2024; <code>-10.26% &minus; [-9.89%] = -0.37 pp</code> in 2023&ndash;2024; and <code>8.26% &minus; 7.05% = +1.21 pp</code> in 2018&ndash;2019). Providers can bill both code groups or change which codes they use. Pandemic rules also affected visit types differently, and only one pre-policy year is available. These differences therefore describe the records and do not prove a policy effect.',
        '<strong>Late-2024 Decline Across Both Groups.</strong> Both provider counts fell sharply in November and December 2024 (telehealth-eligible: 88,364 and 47,562; other codes: 101,476 and 57,878). National totals alone do not prove the cause, though late year-end claim reporting and resumed eligibility checks are possible reasons. Checking January&ndash;October 2024 separately (108,781 telehealth-eligible, +19.02% vs. 2019; 124,092 other codes, +13.76%) gives a +5.26 pp descriptive difference.'
      ]
    },
    synthesis: {
      title: 'How Two-Group Checks Show Growth Differences Without Claiming Policy Cause',
      p1: 'Checking one code group alone mixes wider coverage growth into telehealth counts. Federal rules paused Medicaid renewals from 2020 to 2023 and restarted them in 2023 and 2024. Monthly billers on telehealth codes rose +24.33% (91,399 to 113,638) from 2019 to 2023. Over the same years, billers on other Medicaid codes rose +18.71% (109,087 to 129,492).',
      p2: 'Subtracting growth in other codes over the same dates leaves a +5.62 percentage-point difference through 2023. Through 2024, the recorded difference is +4.60 pp. From 2023 to 2024, the drop was 0.37 percentage points larger on telehealth codes (-0.37 pp). Telehealth billers already grew +1.21 pp faster in 2018-2019 (+8.26% vs. +7.05%). Extending that prior gap lowers the 2023 figure to +0.78 pp. Still, two code groups and one pre-policy year cannot rule out visit changes across codes. Reporting +0.78 pp to +5.62 pp as a descriptive range keeps claims within what these records show.'
    },
    methodologyParagraphs: [
      '<strong>Recorded HHS Claims and Calculated Growth Differences.</strong> Monthly biller counts and annual paid dollars are recorded totals from the HHS Medicaid Provider Spending file (<code>telehealth_month_summary.parquet</code>, Jan 2018&ndash;Dec 2024, 2 code groups across 84 months = 168 rows), grouped by whether the procedure code allows telehealth. Growth differences and 2018&ndash;2019 trend adjustments are descriptive calculations. Claiming a causal policy effect would require evidence that both groups would have grown at the same rate without the policy and that providers did not move visits across code groups.',
      '<strong>Main Data Sources.</strong> Records come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a>, <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Medicaid.gov Open Data</a>, <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS T-MSIS Analytic Files Documentation</a>, and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    faqs: [
      {
        question: 'What does subtracting growth in other Medicaid codes show, and what are its limits?',
        answer: 'Comparing telehealth-eligible codes (+24.33%) with other Medicaid codes (+18.71%) from 2019 to 2023 leaves a +5.62 percentage-point recorded difference. Most of the raw increase happened alongside wider Medicaid growth. Still, this difference is descriptive, not causal. Clinics can bill both code groups, and pandemic rules affected visit types differently.'
      },
      {
        question: 'Why did both telehealth-eligible (-10.26%) and other Medicaid billers (-9.89%) fall at nearly the same rate in 2024?',
        answer: 'Both provider counts fell sharply in late 2024, with a -0.37 percentage-point difference between them. National provider counts alone do not prove the cause, though resumed eligibility renewals and late year-end claim reporting are possible reasons. The similar drops show that the decline affected both code groups rather than telehealth alone.'
      },
      {
        question: 'What would need to be true to say the policy caused the growth difference?',
        answer: 'Without new telehealth rules, both code groups would need to have grown at the same percentage rate after 2019. Providers would also need not to move visits between code groups. Because only one pre-2020 year exists (+1.21 pp faster on telehealth codes), +0.78 pp to +5.62 pp is a descriptive range, not a causal effect.'
      }
    ],
    related: [
      { slug: 'before-after-trap', title: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time', note: 'Related case study on pre-2020 growth rates in Medicaid telehealth-eligible providers' },
      { slug: 'parallel-trends-power', title: 'Wide Error Ranges Before a Policy Can Miss Slow Differences in County Trends', note: 'Related case study checking pre-policy error ranges and post-policy trend limits' },
      { slug: 'identical-data-opposite-policies', title: 'Fixed Medi-Cal Visit Fees Do Not Meet City Clinic Costs While Poor Inland Areas Lack Care', note: 'Related case study on local clinic costs and poverty across California Medi-Cal areas' }
    ]
  },

  // =========================================================================
  // MODULE #5: parallel-trends-power (Track 1, member)
  // =========================================================================
  {
    slug: 'parallel-trends-power',
    tetsCompanion: [
      {
        visibleLabel: 'Rambachan-Roth Pre-Trend Sensitivity Case',
        title: 'Parallel-Trends Sensitivity: An Article-Reported Case',
        url: 'https://tooearlytosay.com/research/methodology/parallel-trends-sensitivity/',
        claimCovered: 'Article-reported bank-closure study of 1,408 counties where a pre-trend test gave p = 0.9997, yet Rambachan-Roth bounds included zero; not publicly reproduced.'
      },
      {
        visibleLabel: 'Choosing Among Two-Group Comparison Designs',
        title: 'Using difference-in-differences in practice',
        url: 'https://tooearlytosay.com/research/methodology/when-to-use-did/',
        claimCovered: 'Rules for when two-group county comparisons apply and which assumptions hold, with an article-reported rolling simulation labeled by evidence status.'
      }
    ],
    tier: 'public',
    briefType: 'Evidence Guide &middot; County Health Budgets',
    trackEyebrow: 'Track 1: Program Impact &middot; Pre-Policy Error Ranges and Post-Policy Trend Limits',
    pageTitle: 'Pre-Policy Error Ranges & County Trend Tests | CAPHE',
    metaDescription: 'See why passing a pre-trend test (p = 0.9997) with wide error ranges (-1.27 to +1.16 pp) needs post-policy trend-difference bounds (0.35x limit).',
    h1: 'Wide Error Ranges Before a Policy Can Miss Slow Differences in County Trends',
    subtitle: 'Checking error ranges before a law and trend limits after it in two-group county tests.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Before citing a two-group county study, reviewers check whether pre-law differences were near zero [1,2]. Yet short three-year pre-periods often have wide error ranges that miss slow trend differences [2].'
      },
      {
        lead: 'What the comparison shows',
        html: 'In an article-reported 1,408-county study (not publicly reproduced), pre-law checks pass (<em>p</em> = 0.9997) and give a <strong>-0.47 pp</strong> estimate [1]. Yet pre-law 95% error ranges span <strong>-1.27 to +1.16 pp</strong>, and the range includes zero once post-law trends differ by <strong>0.35x</strong> of pre-law change [1,2].'
      },
      {
        lead: 'Policy option',
        html: 'Budget teams can ask for full pre-policy 95% error ranges and a <strong>1.0x</strong> trend-bound check rather than a <em>p</em>-value alone [2]. Longer panels, such as California\'s 17-year 57-county records, give firmer pre-2020 history [3].'
      }
    ],
    endnotes: [
      '<strong>Article-Reported 1,408-County Bank-Closure Study.</strong> Inputs come from an article-reported <a href="https://www.ers.usda.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA SNAP Retailer</a> and <a href="https://www.fdic.gov/resources/resolutions/bank-failures/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">FDIC Bank-Closure County Benchmark</a> (not publicly reproduced; 1,408 counties). The main post-policy estimate is -0.47 percentage points (pp), with standard error 0.22 pp and 95% confidence range -0.91 to -0.03 pp (p = 0.036). Pre-policy yearly differences are -0.056, -0.030, and 0.000, with 95% ranges from -1.27 to +1.16 pp (joint test p = 0.9997).',
      '<strong>Pre-Test Precision &amp; Rambachan-Roth Trend Limits.</strong> Methods follow <a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Roth, J. (2022), <em>AER: Insights</em></a> and <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Rambachan, A., &amp; Roth, J. (2023), <em>Review of Economic Studies</em></a>. On the stated 1,408-county inputs, the post-policy trend limit reaches zero at 0.35x (where the 95% range becomes [-0.96, 0.00] pp). Adding 3-year straight-line trends for each county changes the estimate to +0.003 pp.',
      '<strong>California 57-County Study Comparison (2003&ndash;2019).</strong> County records come from the <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a> and <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics</a> across 943 pre-COVID yearly county records. Each $10 more per resident is linked to 2.38 fewer annual deaths per 100,000, 4.32 fewer over 13 years (p = 0.067 after multiple-test adjustment, above 0.05), and 5.31 fewer in two-stage sensitivity checks.'
    ],
    block2: {
      title: 'Exact Parallel-Trends Estimate Compared With the 0.35x Trend Limit',
      contextTag: 'Sensitivity Bounds on Stated 1,408-County Inputs + 57-County Study Comparison',
      ariaLabel: 'Comparison of the standard parallel-trends estimate (-0.47 pp) versus the 0.35x post-policy trend-difference bound',
      ruler1: {
        title: 'Model Assuming No Post-Policy Trend Difference',
        stat: '-0.47 pp (-0.91 to -0.03 pp Range)',
        ariaLabel: 'Parallel-trends model reports -0.47 pp with 95% range from -0.91 to -0.03 pp',
        segments: [
          { cls: 'seg-primary', width: 75, label: 'Main Estimate: -0.47 pp' },
          { cls: 'seg-rest', width: 25, label: 'Pre-Test Passed' }
        ],
        desc: 'Assuming zero post-policy trend difference gives an estimated -0.47 pp decrease.'
      },
      ruler2: {
        title: 'Post-Policy Trend Limit (0.35x)',
        stat: '0.35x Limit | +0.003 pp With County Trends',
        ariaLabel: 'Allowing a post-policy trend difference equal to 0.35x of pre-policy change brings the upper bound to zero',
        segments: [
          { cls: 'seg-rent', width: 35, label: '0.35x Limit' },
          { cls: 'seg-food', width: 65, label: 'Includes Zero Above 35% Pre-Change' }
        ],
        desc: 'Allowing a post-policy trend difference above 35% of pre-policy change includes zero.'
      }
    },
    table1: {
      title: 'Table 1. Pre-Policy Error Ranges, Trend Limits, and Multi-Year County Studies',
      subtitle: 'Checking main slopes, pre-law error bands, 0.35x bounds, and county trends in short and long data.',
      caption: 'Table 1 compares the standard event study, pre-policy error width, post-policy trend-difference bounds, and county linear trend controls.',
      cornerLabel: 'Trend-Check Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Calculated Sensitivity Bounds.</strong> Columns summarize stated inputs from the 1,408-county study. Assuming exact parallel trends gives -0.47 pp (SE = 0.22 pp, 95% range [-0.91, -0.03], p = 0.036). Pre-policy yearly differences are -0.056 (SE = 0.620 at year -3, 95% range [-1.27, +1.16]), -0.030 (SE = 0.582 at year -2), and 0.000 (SE = 0.549 at year -1; joint p = 0.9997). The Rambachan-Roth limit reaches zero at 0.35x (95% range [-0.96, 0.00] pp, and [-1.08, +0.15] pp at 2.0x). Adding 3-year county trends gives +0.003 pp (SE = 0.016 pp, p = 0.87). Row 6 shows the separate 57-county California LHA study across 943 pre-COVID yearly county records (2.38 yearly, 4.32 over 13 years, -2.62 single-schedule, and -5.31 two-stage check, F = 111.20).',
      columns: [
        { tag: 'Model 1: Parallel', tagHighlight: false, title: 'Exact Parallel Trends', subtitle: 'Assumes zero post-policy trend difference.' },
        { tag: 'Model 2: Error Check', tagHighlight: true, title: 'Pre-Policy Error Range', subtitle: '95% error ranges across 3 pre-policy years.' },
        { tag: 'Model 3: Trend Bound', tagHighlight: true, title: 'Trend-Difference Bound', subtitle: '0.35x limit compared with 2.0x bound.' },
        { tag: 'Model 4: County Trends', tagHighlight: false, title: 'County Linear Trends', subtitle: 'Separate straight-line trend for each county.' }
      ],
      rows: [
        {
          label: 'Post-Policy or Pre-Policy Estimate<span class="block text-xs font-normal text-slate-500">Estimated difference in percentage points</span>',
          cells: [
            { val: '-0.47 pp (main estimate)' },
            { val: 'Pre-years: -0.056, -0.030, 0.00' },
            { val: '-0.47 pp (with trend bound)' },
            { val: '+0.003 pp (with county trends)' }
          ]
        },
        {
          label: 'Standard Error<span class="block text-xs font-normal text-slate-500">Statistical uncertainty before vs. after</span>',
          cells: [
            { val: '0.22 pp post-policy SE' },
            { val: '&plusmn;0.55 to &plusmn;0.62 pp pre-SE' },
            { val: 'Carries pre-policy error forward' },
            { val: '&plusmn;0.016 pp trend-adjusted SE' }
          ]
        },
        {
          label: '95% Confidence or Bounded Range*<span class="block text-xs font-normal text-slate-500">95% range under each trend assumption</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '-0.91 to -0.03 pp (0.88 width)', barWidth: 36, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-1.27 to +1.16 pp (2.43 width)', barWidth: 100, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: 'At 0.35x bound: -0.96 to 0.00 pp', barWidth: 40, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '-0.028 to +0.034 pp (0.062 width)', barWidth: 3, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'Trend Limit Including Zero*<span class="block text-xs font-normal text-slate-500">Share of pre-change where range includes 0</span>',
          modeled: true,
          cells: [
            { val: 'Assumes 0.00x trend diff' },
            { val: 'Low-precision pass (p = 0.9997)' },
            { val: '35% trend limit (0.35x)' },
            { val: 'Near zero with county trends' }
          ]
        },
        {
          label: 'Possible Trend Difference vs. Effect<span class="block text-xs font-normal text-slate-500">Pre-policy range compared with -0.47 pp</span>',
          cells: [
            { val: 'Omits pre-test uncertainty' },
            { val: '&plusmn;1.27 pp (&gt;2.5x estimate)' },
            { val: 'At 2.0x bound: -1.08 to +0.15 pp' },
            { val: 'Early-year check shows change' }
          ]
        },
        {
          label: 'CA 57-County Study (per $10)<span class="block text-xs font-normal text-slate-500">Deaths per 100K per $10/resident (2003-19)</span>',
          cells: [
            { val: 'Yearly model: 2.38 fewer / 100K' },
            { val: '13-yr period: 4.32 fewer / 100K' },
            { val: '2003-16 series: 2.62 fewer / 100K' },
            { val: '13-yr check: 5.31 fewer / 100K' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Splitting Wide-Error Pre-Tests From Longer County Studies',
      subtitle: 'Linking pre-law error ranges and post-law trend bounds to county budget checks.',
      caption: 'Table 2 compares trend assumptions, sensitivity bound checks, county budget lessons, and review rules across four models.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Trend Assumption Used',
          cells: [
            { val: 'Assumes treated and comparison counties would have changed at the exact same rate after the policy.' },
            { val: 'Treats a high pre-trend p-value (p = 0.9997) as proof that earlier county trends were equal.' },
            { val: 'Allows post-policy trend differences up to a set share of the largest pre-policy change.' },
            { val: 'Fits 1,408 separate straight-line county trends using only three pre-policy years.' }
          ]
        },
        {
          label: 'What Trend Checks Show',
          cells: [
            { val: 'Standard [-0.91, -0.03] pp ranges leave out uncertainty from checking pre-policy county trends.' },
            { val: 'With pre-policy standard errors up to 0.62 pp (-1.27 to +1.16 pp), a 1.0 pp/yr difference passes.' },
            { val: 'A 0.35x limit (well below 1.0x equal change) shows a small trend difference accounts for the drop.' },
            { val: 'Fitting separate county lines on three pre-years can fit random variation or early policy changes.' }
          ]
        },
        {
          label: 'Lesson for County Budgets',
          cells: [
            { val: 'California\'s 17-year health study gives more pre-2020 history, though it remains observational.' },
            { val: 'Short 3-year pre-periods with wide error ranges cannot rule out slow job or population changes.' },
            { val: 'Pandemic grant years (2020-2023: +2.47 vs. -2.38 deaths/100K per $10) must be analyzed apart.' },
            { val: 'Multi-year differences (4.32 fewer deaths/100K per $10, adj. p = 0.067) avoid 3-year line-fitting error.' }
          ]
        },
        {
          label: 'Study Review Options',
          policyFit: true,
          cells: [
            { headline: 'Pair Estimates With Bounds', detail: 'Report pre-policy error ranges alongside every two-group county comparison estimate.' },
            { headline: 'Show Full Pre-Policy Ranges', detail: 'List the full pre-policy 95% range (-1.27 to +1.16 pp) instead of a p-value alone.' },
            { headline: 'Check the 1.0x Trend Bound', detail: 'Treat estimates whose 95% range includes zero below 1.0x (such as 0.35x) as uncertain.' },
            { headline: 'Use Longer Pre-Periods First', detail: 'Use 6+ pre-policy years or multi-year differences instead of 3-year county trend lines.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Roth (2022) Pre-Test Precision &amp; Rambachan-Roth (2023) Trend Bounds',
      notesBullets: [
        '<strong>Low Precision of Wide-Error Pre-Tests (1,408 Counties).</strong> Pre-policy differences are -0.056 pp (SE = 0.620, 95% range [-1.27, +1.16]) at year -3, -0.030 pp (SE = 0.582, [-1.17, +1.11]) at year -2, and 0.000 pp (SE = 0.549, [-1.08, +1.08]) at year -1. Because those pre-policy ranges are more than 2.5 times wider than the -0.47 pp post-policy estimate, the joint pre-test (p = 0.9997) cannot rule out meaningful trend differences (<a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Roth, 2022, AER: Insights</a>).',
        '<strong>Rambachan-Roth 0.35x Trend Limit.</strong> Following <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023, Review of Economic Studies)</a>, a 1.0x bound allows post-policy trend differences up to 100% of the largest pre-policy yearly slope change. On these inputs, the 95% bounded range reaches zero at 0.35x ([-0.96, 0.00] pp) and widens to [-1.08, +0.15] pp at 2.0x.',
        '<strong>Two Separate Studies and Units.</strong> Pre-policy differences, standard errors, and 0.35x bounds come from the 1,408-county percentage-point study. California death-rate estimates (2.38 yearly, 4.32 over 13 years, -2.62 single-schedule, -5.31 two-stage check) come from the separate 57-county LHA study in deaths per 100,000 per $10 per resident.'
      ]
    },
    synthesis: {
      title: 'Why Passing a Pre-Trend Test Starts Rather Than Ends Study Review',
      p1: 'Not finding a pre-law gap does not prove two county groups would have changed at the same rate. In the article-reported 1,408-county study (not publicly reproduced), pre-law differences are near zero (joint p = 0.9997). Assuming no later trend difference gives a -0.47 percentage-point drop (-0.91 to -0.03 pp). Yet pre-law 95% error ranges span -1.27 to +1.16 pp, over 2.5 times that drop. Because error ranges are wide, a slow trend difference big enough to explain the -0.47 pp drop still passes.',
      p2: 'Adding Rambachan-Roth bounds replaces a pass-or-fail test with a clear numeric limit. Here, the 95% range includes zero once the post-law trend difference reaches 0.35x of the biggest pre-law change. Fitting 3-year county trend lines also moves the result to +0.003 pp. That 0.35x limit warns budget teams that a small trend difference removes the drop. Longer data, like California\'s 17-year, 57-county health records, give more pre-2020 history. Across those counties, $10 per resident links to 2.38 fewer yearly deaths and 4.32 fewer 13-year deaths per 100,000 (adj. p = 0.067).'
    },
    interactive: {
      badge: 'Post-Policy Trend Bounds',
      title: 'Compare How Post-Policy Trend Bounds Change the 95% Range',
      subtitle: 'Checking the 1,408-county slope with equal trends, the 0.35x bound, and 3-year county lines.',
      options: [
        {
          label: 'Model 1 &middot; Exact Parallel',
          headline: 'Zero Post-Policy Trend Difference (0.00x)',
          metric: 'Estimate = -0.47 pp | [-0.91, -0.03] pp',
          desc: 'Assumes zero post-policy trend difference after a wide-error pre-test, giving a -0.47 pp decrease.'
        },
        {
          label: 'Model 2 &middot; 0.35x Limit',
          headline: 'Post-Policy Trend Difference Up to 0.35x',
          metric: '0.35x Limit | [-0.96, 0.00] pp',
          desc: 'Allowing a post-policy trend difference equal to 35% of the largest pre-policy change brings the upper bound to zero.'
        },
        {
          label: 'Model 3 &middot; County Trends',
          headline: 'County Straight-Line Trends (3 Pre-Years)',
          metric: 'Estimate = +0.003 pp | [-0.028, +0.034] pp',
          desc: 'Adding straight-line county trends estimated from three pre-policy years changes -0.47 pp to +0.003 pp.'
        }
      ],
      notesTitle: 'Study Inputs, Pre-Policy Standard Errors &amp; Sensitivity Bounds',
      notesBullets: [
        '<strong>Model 1 Exact Parallel Inputs (1,408 Counties).</strong> Pre-policy differences are -0.056 pp (SE = 0.620) at year -3, -0.030 pp (SE = 0.582) at year -2, and 0.000 pp (SE = 0.549) at year -1 (joint p = 0.9997). Assuming zero post-policy trend difference gives <strong>-0.47 pp (SE = 0.22 pp, 95% range [-0.91, -0.03], p = 0.036)</strong>.',
        '<strong>Model 2 Rambachan-Roth 0.35x Bound.</strong> Under <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023)</a>, the 95% bounded range reaches <strong>[-0.96, 0.00] pp at 0.35x</strong> and widens to <strong>[-1.08, +0.15] pp at 2.0x</strong>.',
        '<strong>Model 3 Three-Year County Trends.</strong> Adding 1,408 separate county linear trends estimated on 3 pre-policy years changes the estimate to <strong>+0.003 pp (SE = 0.016 pp, p = 0.87)</strong>.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Stated 1,408-County Inputs and Recorded 57-County Data.</strong> Pre-policy differences (-0.056, -0.030, 0.000), standard errors (0.620, 0.582, 0.549), the parallel-trend estimate (-0.47 pp, SE = 0.22 pp), and the county-trend estimate (+0.003 pp) are stated inputs from the article-reported 1,408-county study. The 0.35x limit and bounded ranges are calculated from those inputs. California death-rate estimates (2.38 yearly, -2.62 single-schedule, 4.32 over 13 years, -5.31 two-stage check) come from the recorded 57-county LHA study.',
      '<strong>Main References &amp; Data Sources.</strong> Methods and records come from <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023), Review of Economic Studies</a>, <a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Roth (2022), AER: Insights</a>, <a href="https://www.ers.usda.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA SNAP Retailer Historical Database</a>, and <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions (2003&ndash;2023)</a>.'
    ],
    faqs: [
      {
        question: 'Why does a high pre-trend p-value (such as p = 0.9997) not prove equal county trends?',
        answer: 'A high p-value means only that the pre-policy data were too uncertain to rule out zero difference. Pre-policy 95% error ranges here span -1.27 to +1.16 percentage points. A county trend difference more than twice as large as the -0.47 pp estimate is still consistent with the pre-policy data.'
      },
      {
        question: 'What does a 0.35x post-policy trend limit mean for budget reviewers?',
        answer: 'A 0.35x limit measures how small a post-policy trend difference can make the 95% range include zero. If the post-policy trend difference reaches 35% of the largest pre-policy change, zero enters the 95% range. Because 0.35x is well below 1.0x, even a modest trend difference can account for the -0.47 pp drop.'
      },
      {
        question: 'How does California\'s 57-county public health study compare with short 3-year county studies?',
        answer: 'Following 57 counties across 17 pre-pandemic years (2003-2019) provides a much longer pre-2020 record. Each $10 per resident in routine health spending is linked to fewer deaths per 100,000 in urban (-2.59) and smaller (-2.42) counties. Statewide, spending is linked to 2.38 fewer yearly deaths and 4.32 fewer 13-year deaths (adj. p = 0.067).'
      }
    ],
    related: [
      { slug: 'threat-history-solutions', title: 'Checking Telehealth With Other Medicaid Care Shows Distinct Growth Rates as More Adults Join', note: 'Related case study comparing telehealth-eligible and other Medicaid care codes' },
      { slug: 'observational-to-experimental', title: 'Routine County Health Spending Links With Lower Death Rates Outside Pandemic Grant Years', note: 'Related case study detailing the 57-county California public health study across periods' },
      { slug: 'reverse-causation-feedback', title: 'Combining Pandemic Aid With Routine County Health Budgets Mixes Relief Grants With Pre-2020 Links', note: 'Related case study separating pandemic grant years from pre-2020 county spending links' }
    ]
  },

  // =========================================================================
  // MODULE #6: threat-maturation-solutions (Track 1, member, unlisted)
  // =========================================================================
  {
    slug: 'threat-maturation-solutions',
    unlisted: true,
    tier: 'public',
    briefType: 'Program Cost &amp; Impact Model &middot; Paid Family Leave',
    trackEyebrow: 'Track 1: Program Impact &middot; Routine Payroll Growth Compared With Paid-Leave Law Costs',
    pageTitle: 'Normal Wage Growth vs. Paid-Leave Law Costs | CAPHE',
    metaDescription: 'Separate routine California payroll and claim growth (+$1.635B SDI spending) from estimated Paid Family Leave benefit costs in 2025-2030 reserves.',
    h1: 'Multi-Year Fund Models Separate Normal Payroll Growth From Paid-Leave Law Costs',
    subtitle: 'Separating routine job and wage growth from modeled 12-week Paid Family Leave costs through 2030.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Statewide Paid Family Leave laws start on one date for all <strong>18.5 million</strong> covered workers [1,2]. Even without a new law, normal job and wage growth adds <strong>+$1.635B</strong> to 2026 State Disability Insurance spending [1].'
      },
      {
        lead: 'What our model estimates',
        html: 'Above routine growth (<strong>325,055</strong> to <strong>330,000</strong> claims), a modeled 12-week plan at 35% added-week use adds <strong>+39,600</strong> claims and <strong>+$623.7M/yr</strong> [1,2]. Reserves dip to <strong>10.8% ($1.96B)</strong> in 2026 before all-wage taxes raise them to <strong>30.4% ($6.37B)</strong> by 2030 [3].'
      },
      {
        lead: 'Policy option',
        html: 'Budget teams can forecast routine payroll growth first before pricing added leave weeks [1,3]. Pairing six-year reserve tables with state payroll tax rules (<strong>1.345%</strong> rate) plans past Year 1 [2,3].'
      }
    ],
    endnotes: [
      '<strong>California EDD Paid Family Leave (PFL) &amp; State Disability Insurance (SDI) Baselines (2025&ndash;2026).</strong> Recorded and forecast figures come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Employment Development Department (EDD) May 2026 Disability Insurance Fund Forecast</a>. Actual 2025 totals were 325,055 PFL claims, $1,090 weekly pay, and $15.892B in SDI spending. Baseline 2026 forecasts are 330,000 claims, $1,165 weekly pay, and $17.527B in SDI spending.',
      '<strong>Modeled Added Leave Costs Under SB 951 &amp; 12-Week Cases.</strong> Statutory rules and cost estimates come from <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC &sect; 3300 &amp; &sect; 984)</a> and the <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a>. The expected 12-week case adds +39,600 yearly claims (to 369,600) and +$623.7M/yr in gross SDI spending above routine growth.',
      '<strong>Projected Reserves Across 2025&ndash;2030.</strong> In the 35% expected-use case, 2026 SDI reserves decrease from 18.2% of annual spending ($3.19B baseline) to 10.8% ($1.96B, a -$1.23B two-year difference). Payroll taxes on all covered wages then raise reserves to 30.4% ($6.37B) by 2030, above EDD\'s 25.0% reserve planning goal.'
    ],
    block2: {
      title: 'Routine Payroll Growth Compared With Added 12-Week Leave Costs',
      contextTag: '2026-2030 Multi-Year Projections on Recorded 2025 EDD Totals',
      ariaLabel: 'Comparison of routine baseline growth (+$1.635B SDI outlays) versus modeled 12-week expansion (+$623.7M/yr)',
      ruler1: {
        title: 'Routine Growth Without a New 2026 Law',
        stat: '+4,945 Claims | +$1.635B SDI Spending',
        ariaLabel: 'Without a 12-week expansion, claims grow +4,945 and SDI spending grows +$1.635B',
        segments: [
          { cls: 'seg-gross', width: 90, label: '2025 Actual SDI: $15.892B' },
          { cls: 'seg-food', width: 10, label: '+$1.635B Routine Growth' }
        ],
        desc: 'Routine job and wage growth add +$1.635B in SDI spending without a new law.'
      },
      ruler2: {
        title: 'Added 12-Week Leave Cost & Later Reserve Growth',
        stat: '+39,600 Claims (+$623.7M) | Rises to $6.37B (30.4%)',
        ariaLabel: '12-week expansion adds +39,600 claims and +$623.7M/yr while reserves grow from 10.8% to 30.4% by 2030',
        segments: [
          { cls: 'seg-primary', width: 62, label: '2026 Reserve: $1.96B (10.8%)' },
          { cls: 'seg-rest', width: 38, label: '2030 Reserve: $6.37B (30.4%)' }
        ],
        desc: 'Subtracting routine growth isolates +$623.7M/yr and shows reserves rising from 10.8% to 30.4% by 2030.'
      }
    },
    table1: {
      title: 'Table 1. Separating Routine Payroll Growth, Law Costs, and 2025-2030 Reserves',
      subtitle: 'Comparing 2025 EDD actuals and 2026-2030 routine growth with 35%, 25%, and 100% 12-week leave plans.',
      caption: 'Table 1 compares California Paid Family Leave and SDI fund projections across routine growth without the expansion, expected 35% use, lower-use 25% use, and 100% full-use scenarios from 2025 to 2030.',
      cornerLabel: 'Measure by Year',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Projected Multi-Year Results.</strong> Calendar-year 2025 figures (325,055 PFL claims, $1,090 weekly check, $15.892B SDI spending, $3.011B actual fund balance) are recorded EDD totals. Projections for 2026&ndash;2030 come from the EDD May 2026 Disability Insurance Fund Forecast and model both first-year added leave costs and later yearly reserve changes. Reserve shares compare balances with EDD\'s 25.0% reserve planning goal (the lower end of EDD\'s 25%&ndash;50% planning range under Unemployment Insurance Code &sect; 984 payroll tax rules, not a legal reserve minimum).',
      columns: [
        { tag: 'Routine Growth', tagHighlight: false, title: 'Routine Growth Only', subtitle: '8-week PFL baseline without a 12-week law.' },
        { tag: 'Expected Case', tagHighlight: true, title: '12-Week Plan (35% Use)', subtitle: '35% share of added weeks | 12% new claims.' },
        { tag: 'Lower-Use Case', tagHighlight: false, title: '12-Week Plan (25% Use)', subtitle: '25% share of added weeks | 5% new claims.' },
        { tag: 'Upper-Limit Test', tagHighlight: false, title: 'Full-Use 100% Limit', subtitle: '100% share of added weeks | 20% new claims.' }
      ],
      rows: [
        {
          label: '2025 Fund Balance by Scenario*<span class="block text-xs font-normal text-slate-500">325,055 claims, $1,090/wk pay, $15.892B SDI spending</span>',
          modeled: true,
          cells: [
            { val: '$2.88B bal (18.1% share)' },
            { val: '$2.28B bal (13.8% share)' },
            { val: '$2.48B bal (15.2% share)' },
            { val: '$1.03B bal (5.8% share)' }
          ]
        },
        {
          label: '2026 Claims &amp; Added Leave Cost*<span class="block text-xs font-normal text-slate-500">Base: 330,000 claims (+1.52%), $1,165/wk pay</span>',
          modeled: true,
          cells: [
            { val: '330,000 | $0.0M added cost' },
            { val: '369,600 | +$623.7M/yr' },
            { val: '346,500 | +$417.8M/yr' },
            { val: '396,000 | +$1,910.0M/yr' }
          ]
        },
        {
          label: '2026 Fund Balance After Added Cost*<span class="block text-xs font-normal text-slate-500">Year-1 reserve vs. $4.38B 25% EDD goal</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '$3.19B (18.2% of spending)', barWidth: 73, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$1.96B (10.8% of spending)', barWidth: 45, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '$2.36B (13.2% of spending)', barWidth: 54, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-$0.58B (-3.0% deficit)', barWidth: 13, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: '2028 Fund Balance &amp; Reserve Share*<span class="block text-xs font-normal text-slate-500">All-wage tax revenue vs. $4.78B 25% goal</span>',
          modeled: true,
          cells: [
            { val: '$6.23B (32.6% &gt; goal)' },
            { val: '$3.69B (18.7% growing)' },
            { val: '$4.53B (23.1% near goal)' },
            { val: '-$1.53B (-7.2% deficit)' }
          ]
        },
        {
          label: '2030 Year-6 Fund Balance*<span class="block text-xs font-normal text-slate-500">2030 reserve vs. $5.07B 25% EDD goal</span>',
          modeled: true,
          cells: [
            { val: '$10.29B (50.7% of spending)' },
            { val: '$6.37B (30.4% &gt; goal)' },
            { val: '$7.67B (36.9% &gt; goal)' },
            { val: '-$1.70B (-7.6% deficit)' }
          ]
        },
        {
          label: '6-Year Added Cost &amp; Needed Rate*<span class="block text-xs font-normal text-slate-500">2025-2030 added cost &amp; tax rate to cover it</span>',
          modeled: true,
          cells: [
            { val: '$0.00B | 1.300% base rate' },
            { val: '$4.013B | 1.345% (+0.045 pp)' },
            { val: '$2.688B | 1.330% (+0.030 pp)' },
            { val: '$12.286B | 1.439% (+0.139 pp)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Separating Paid-Leave Law Costs From Routine Payroll Growth',
      subtitle: 'Comparing first-year added leave costs with multi-year tax revenue changes across 2025-2030.',
      caption: 'Table 2 compares routine growth causes, multi-year reserve projections, tax tradeoffs, and forecast rules across four SDI scenarios.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Routine Growth vs. Law Cost',
          cells: [
            { val: 'Wage growth raises weekly checks +6.88%/yr ($1,090 to $1,165), while taxes on all $1,371.5B wages grow faster.' },
            { val: 'Estimated 12-week checks lower 2026 reserves by $1.23B ($3.19B to $1.96B) before taxes raise reserves ~+$1.1B/yr.' },
            { val: 'At 25% lower use (+$417.8M/yr), 2026 reserves total $2.36B (13.2%) and exceed EDD\'s 25.0% goal by 2029.' },
            { val: 'Full 100% use (+$1,910.0M/yr) grows faster than tax revenue and widens the deficit from -$0.58B (-3.0%) to -$1.70B (-7.6%).' }
          ]
        },
        {
          label: 'What Multi-Year Projections Show',
          cells: [
            { val: 'Projecting routine growth first keeps teams from counting +$1.635B of normal SDI growth as a new law cost.' },
            { val: 'Reviewing yearly balances after 2026 shows reserves reaching 30.4% ($6.37B) in 2030 after 10.8% in 2026.' },
            { val: 'At 25% use, reserves are 13.2% ($2.36B) in 2026 and 36.9% ($7.67B) in 2030 (+0.030 pp covers 6-year cost).' },
            { val: 'Comparing yearly taxes and benefits shows the leave-use share where reserves stop rising at the 1.300% rate.' }
          ]
        },
        {
          label: 'Reserve &amp; Tax Tradeoff',
          cells: [
            { val: 'Keeping the 1.300% rate on 8-week rules brings reserves to 50.7% ($10.29B), above EDD\'s 25%-50% goal range.' },
            { val: 'Paying $4.013B over six years without a +0.045 pp rate increase delays reaching EDD\'s 25% goal until 2030.' },
            { val: 'Even 25% use ($2.688B over six years) stays below EDD\'s 25% planning goal (not a legal minimum) through 2028.' },
            { val: 'Covering high-use scenarios relies on payroll tax rate rules set by law (Cal. Unemp. Ins. Code &sect; 984, 1.5% cap).' }
          ]
        },
        {
          label: 'Forecasting Options',
          policyFit: true,
          cells: [
            { headline: 'Subtract Routine Growth First', detail: 'Project +1.52% claim growth and +6.88% check growth before estimating any new leave bill.' },
            { headline: 'Review 6-Year Costs &amp; Reserves', detail: 'Report both the 2026 reserve share (10.8%) and 2030 share (30.4%), plus the 1.345% rate.' },
            { headline: 'Model 2024 &amp; 2025 Rules Apart', detail: 'Model the 2024 wage-cap repeal and 2025 90% low-wage pay rate as two separate dates.' },
            { headline: 'Apply &sect; 984 Tax Rate Rules', detail: 'Pair EDD\'s 25% reserve goal (not a legal minimum) with &sect; 984 tax rate rules under state law.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Separate SB 951 Start Dates &amp; Leave Claim Types',
      notesBullets: [
        '<strong>Separate Start Dates Under SB 951.</strong> <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Senate Bill 951</a> took effect on two separate dates. First, the law ended the SDI taxable wage cap on <strong>January 1, 2024</strong>, taxing 100% of covered wages ($1,371.5B in 2026). Second, the law raised weekly leave pay to 90% of wages for lower-paid workers on <strong>January 1, 2025</strong>.',
        '<strong>Types of Paid Family Leave Claims.</strong> Across the <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Series</a> (2025 actuals: 325,055 first claims paid), newborn and adoption bonding makes up <strong>87.8%</strong> of claims (285,408). Family caregiving makes up <strong>12.2%</strong> (39,624), and military family needs make up <strong>&lt;0.1%</strong> (23).'
      ]
    },
    synthesis: {
      title: 'Why Fund Forecasts Must Check Both First-Year Costs and Multi-Year Changes',
      p1: 'Statewide laws like Senate Bill 951 take effect on one date for all 18.5 million covered workers. That statewide start leaves no comparison counties inside California. Employment Development Department (EDD) forecasts therefore separate law changes from routine job, wage, and claim growth. Even without a new law, +1.52% claim growth (325,055 to 330,000) and +6.88% check growth ($1,090 to $1,165) add +$1.635B to 2026 State Disability Insurance (SDI) spending.',
      p2: 'Checking both Year-1 costs and 2026-2030 tax revenue changes clarifies reserve planning. Looking at 2026 alone, a 12-week Paid Family Leave plan (+39,600 claims to 369,600; +$623.7M/yr) lowers reserves from $3.19B (18.2%) to $1.96B (10.8%). Yet payroll taxes on all covered wages grow faster than weekly checks capped at $1,765. By 2030, baseline reserves reach $10.29B (50.7%), and the 12-week plan rises to $6.37B (30.4%). That 30.4% balance exceeds EDD\'s 25.0% reserve planning goal (not a legal minimum), while payroll tax rates up to the 1.5% cap follow Cal. Unemp. Ins. Code &sect; 984.'
    },
    methodologyParagraphs: [
      '<strong>Recorded 2025 EDD Totals and 2026&ndash;2030 Projections.</strong> Calendar-year 2025 figures (325,055 PFL claims, $1,090.00 weekly check, $15.892B SDI spending, $3.011B actual fund balance) are recorded EDD totals. Projections for 2026&ndash;2030 ($3.19B / 18.2% to $10.29B / 50.7% baseline; $1.96B / 10.8% to $6.37B / 30.4% expected; $2.36B / 13.2% to $7.67B / 36.9% lower-use; -$0.58B / -3.0% to -$1.70B / -7.6% full-use limit) come from <code>public/tools/pfl-simulator/data/pfl_model_data.json</code>, scaled to the EDD May 2026 DI Fund Forecast.',
      '<strong>Main Data Sources.</strong> Records come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD Disability Insurance Fund Forecast (May 2026 Report)</a>, <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Data Series</a>, <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Unemployment Insurance Code &sect;&sect; 984 &amp; 3300 (SB 951)</a>, and <a href="https://lao.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Legislative Analyst\'s Office Fiscal Outlooks</a>.'
    ],
    faqs: [
      {
        question: 'How does a multi-year fund model improve on a one-year before-and-after subtraction?',
        answer: 'A one-year subtraction mixes routine job and wage growth (+$1.635B in 2026 SDI spending) with added leave benefits. By contrast, a multi-year model projects routine growth first. That split separates the first-year policy cost (+$623.7M) from later yearly reserve growth.'
      },
      {
        question: 'Why does California\'s baseline SDI reserve rise from 18.2% ($3.19B) in 2026 to 50.7% ($10.29B) by 2030?',
        answer: 'Senate Bill 951 ended the wage cap on worker SDI taxes on January 1, 2024, taxing all $1,371.5B of covered wages. Weekly benefit checks, however, remain capped ($1,765 per week in 2026). Because high wages are taxed with no cap while checks are capped, tax revenue grows faster than benefit payments.'
      },
      {
        question: 'How do SDI reserves change from 2026 to 2030 under the expected 12-week leave plan?',
        answer: 'In 2026, adding +39,600 claims (+$623.7M gross cost) lowers reserves from $3.19B (18.2%) to $1.96B (10.8%). That balance is below EDD\'s 25.0% ($4.38B) planning goal (not a legal minimum), while payroll tax authority up to 1.5% comes from Cal. Unemp. Ins. Code &sect; 984. Payroll taxes on all covered wages then increase reserves each year to $6.37B (30.4%) by 2030.'
      }
    ],
    related: [
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Related case study comparing annual EDD SDI reserve goals and cash costs with multi-year values' },
      { slug: 'before-after-trap', title: 'Two-Year Telehealth Counts Include Earlier Increases in Clinic Use Over Time', note: 'Related case study separating earlier clinic trends from post-policy counts' },
      { slug: 'study-design-ladder', title: 'Planning Outreach, Costing State Laws, and Checking Budgets Each Need a Matched Study Method', note: 'Related case study matching statewide PFL cost models to linked data, county studies, and trials' }
    ]
  },

  // =========================================================================
  // MODULE #20: budget-impact (Track 3, public)
  // =========================================================================
  {
    slug: 'budget-impact',
    tetsCompanion: [
      {
        visibleLabel: 'County Health Spending by Period',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 yearly county records), each dollar per resident is linked to -0.238 deaths per 100,000 in 2003 to 2019 and +0.247 in 2020 to 2023.'
      }
    ],
    tier: 'public',
    briefType: 'Evidence Guide &middot; County Health Budgets',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; Yearly Cash Budgets and Reserves Compared With Long-Term Health Value',
    pageTitle: 'Yearly Cash Budgets vs. Long-Term Health Value | CAPHE',
    metaDescription: 'Compare multi-year California health value estimates with Year-1 cash costs, EDD\'s 25% SDI reserve goal, and enacted Medi-Cal budget lines.',
    h1: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves',
    subtitle: 'Comparing multi-year health value, if causal, with Year-1 cash costs, state reserve goals, and budget rules.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Long-term health gains do not add cash to this year\'s budget [1]. Still, funding requests often cite multi-year health value with no Year-1 cash or reserve plan [2].'
      },
      {
        lead: 'What the comparison shows',
        html: 'High long-term value still faces Year-1 cash limits [1,2]. A modeled 12-week leave plan lowers 2026 reserves to <strong>10.8% ($1.96B)</strong> vs. EDD\'s <strong>25% ($4.38B)</strong> goal, and the FY 2026–27 state budget sets <strong>$709M</strong> for county staff with <strong>$0</strong> for CBO grants [2,3].'
      },
      {
        lead: 'Policy option',
        html: 'Budget teams can check two numbers side by side [2]. Multi-year health value shows program worth, while Year-1 cash and reserve plans match the right payer [2,3].'
      }
    ],
    endnotes: [
      '<strong>Health Value Estimates &amp; Outreach Costs.</strong> Estimates come from the <a href="/tools/lha-calculator/methodology" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology</a>. Pre-2020 county records link $10 per resident to 2.38 fewer yearly deaths per 100,000 (55% of the 13-year link) and 4.32 fewer over 13 years (p = 0.067 after multiple-test adjustment, above 0.05). If causal at the $13.6M federal death-risk value, those links equal $420,168 per life (32:1) and $231,481 per life (59:1). County Medi-Cal help keeps coverage for $35 to $140 per member-year.',
      '<strong>State Disability Insurance (SDI) &amp; Paid Family Leave (PFL) Cash Costs (2025&ndash;2030).</strong> Forecasts come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Employment Development Department (EDD) May 2026 Disability Insurance Fund Forecast</a>. Giving $422.0M in modeled net worker pay (after a 30% firm pay offset) under a 12-week PFL plan takes $623.7M in 2026 gross cash. That cost lowers 2026 SDI reserves to 10.8% ($1.96B). That share is below EDD\'s 25.0% ($4.38B) goal (not a legal minimum under UIC &sect; 984), before rising to 30.4% ($6.37B) by 2030.',
      '<strong>Enacted FY 2026&ndash;27 Medi-Cal Budget Rules.</strong> The <a href="https://ebudget.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance Enacted Budget Summary</a> sets $709M total ($196.8M General Fund) for county staff within $3.3B for county Medi-Cal work. State community grants ($20M AB 102 and $59.8M DHCS outreach) ended on June 30, 2025.'
    ],
    block2: {
      title: 'Conditional Multi-Year Value Compared With Year-1 Cash and EDD Reserve Goals',
      contextTag: 'Cash Spending, EDD Reserve Goal & Time-Period Checks on FY 2026-27 Budgets',
      ariaLabel: 'Comparison of conditional multi-year value ratios versus Year-1 cash costs and EDD reserve planning goals',
      ruler1: {
        title: 'Multi-Year Value (Conditional VSL & Net Pay)',
        stat: '59:1 13-Yr If Causal (32:1 Yr 1; adj. p = 0.067) | $422.0M Net PFL',
        ariaLabel: 'Conditional on causality, county public health links equal 59:1 at 13 years (adjusted p = 0.067) and PFL adds $422.0M net worker pay',
        segments: [
          { cls: 'seg-rest', width: 85, label: 'Conditional VSL (59:1 / 32:1)' },
          { cls: 'seg-primary', width: 15, label: 'Direct Cost' }
        ],
        desc: 'Multi-year estimates report illustrative resident Value of a Statistical Life (VSL) if causal, not cash.'
      },
      ruler2: {
        title: 'Year-1 Cash Cost & EDD Reserve Planning Goal',
        stat: '10.8% SDI Reserve ($1.96B vs. $4.38B EDD Goal)',
        ariaLabel: '2026 cash spending lowers SDI reserves to 10.8% ($1.96B) compared with EDD\'s $4.38B 25% planning goal',
        segments: [
          { cls: 'seg-primary', width: 45, label: '2026 Reserve: $1.96B (10.8%)' },
          { cls: 'seg-rent', width: 55, label: 'Difference From $4.38B Goal' }
        ],
        desc: 'Yearly budget reviews check gross Year-1 cash costs and EDD reserve goals (not legal minimums).'
      }
    },
    table1: {
      title: 'Table 1. Long-Term Value vs. Yearly Cash Costs and Reserve Rules Across Four Plans',
      subtitle: 'Comparing multi-year health value or worker pay with Year-1 cash costs, EDD reserve goals, and budget lines.',
      caption: 'Comparison of four California health and social-insurance cases by multi-year value, Year-1 cash cost, reserve or budget-line limit, and funding source.',
      cornerLabel: 'Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Projected or Conditional Figures.</strong> The 25.0% SDI reserve figure ($4.38B in 2026) is EDD\'s planning goal (the lower end of EDD\'s 25%&ndash;50% planning range), not a legal minimum. Worker payroll tax rates and the 1.5% maximum rate cap are set by state law (Cal. Unemp. Ins. Code &sect; 984). Rows marked with <strong class="text-slate-800">*</strong> report modeled projections or conditional value estimates.',
      columns: [
        { tag: 'SDI Fund: Expected', tagHighlight: true, title: 'PFL 12-Week Plan (35%)', subtitle: 'State Disability Insurance fund.' },
        { tag: 'SDI Fund: Upper Limit', tagHighlight: false, title: 'PFL 12-Week Limit (100%)', subtitle: 'State Disability Insurance fund.' },
        { tag: 'County Medicaid', tagHighlight: true, title: 'Medi-Cal Renewal Outreach', subtitle: 'County eligibility &amp; health plans.' },
        { tag: '57-County Study', tagHighlight: false, title: 'County Public Health', subtitle: 'County budget &amp; resident health value.' }
      ],
      rows: [
        {
          label: 'Payer Account &amp; Group Covered<span class="block text-xs font-normal text-slate-500">Agency account paying Year-1 cash bills</span>',
          modeled: false,
          cells: [
            { val: 'State SDI fund (EDD); 369,600 claims at 35% added-week use, 30% offset' },
            { val: 'State SDI fund (EDD); 396,000 claims at 100% full-use limit' },
            { val: 'County Medi-Cal administration across 120,239 expansion adults' },
            { val: '57-county public health budgets (-2.38 yr; -4.32 13-yr, adj. p = 0.067) at $10/resident' }
          ]
        },
        {
          label: 'Multi-Year Value or Unit Cost*<span class="block text-xs font-normal text-slate-500">Conditional VSL, worker pay, or cost/yr</span>',
          modeled: true,
          cells: [
            { val: '$422.0M/yr net pay (+$19.7M Group 1)' },
            { val: '$1,845.4M/yr net worker pay' },
            { val: '$35 to $140 / retained member-yr' },
            { val: '59:1 13-Yr | 32:1 Yr (if causal)' }
          ]
        },
        {
          label: 'Year-1 Gross Cash Cost<span class="block text-xs font-normal text-slate-500">First-year cash paid out by agency</span>',
          modeled: false,
          cells: [
            { val: '$623.7M / yr in 2026' },
            { val: '$1,910.0M / yr in 2026' },
            { val: '$150K to $600K / yr county tool' },
            { val: '$395.4M / yr ($10/resident statewide)' }
          ]
        },
        {
          label: 'Multi-Year Gross Cash Cost*<span class="block text-xs font-normal text-slate-500">Total 4-to-6-year gross spending</span>',
          modeled: true,
          cells: [
            { val: '$4.013B (6-yr 2025-2030)' },
            { val: '$12.286B (6-yr 2025-2030)' },
            { val: '$0.6M to $2.4M (4-yr 2027-2030)' },
            { val: '$1.98B (5-yr statewide spending)' }
          ]
        },
        {
          label: 'Main Year-1 Budget Limit*<span class="block text-xs font-normal text-slate-500">Reserve share, ended grant, or Year-1 share</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '10.8% Reserve ($1.96B vs. $4.38B)', barWidth: 11, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '-3.0% Deficit (-$0.58B balance)', barWidth: 3, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '$709M Staff | $0 State CBO Line', textColor: 'text-rose-800' },
            { val: '55% Yr-1 Share (32:1 vs. 59:1)', barWidth: 55, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Multi-Year Reserve or Period Result*<span class="block text-xs font-normal text-slate-500">2030 reserve balance or multi-year link</span>',
          modeled: true,
          cells: [
            { val: '30.4% ($6.37B) reserve by 2030' },
            { val: '-7.6% (-$1.70B) deficit in 2030' },
            { val: '11,804 member-yrs (tool) / 54,976 (all)' },
            { val: '13-Yr: 59:1 (adj. p = 0.067) | 16-Yr: 80:1' }
          ]
        },
        {
          label: 'Matched Funding Source<span class="block text-xs font-normal text-slate-500">Legal funding rule that covers Year 1</span>',
          cells: [
            { val: '1.345% SDI payroll rate (+0.045 pp)' },
            { val: '1.439% SDI payroll rate (+0.139 pp)' },
            { val: 'Medi-Cal health plan funding' },
            { val: 'Realignment &amp; County General Fund' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Matching Who Receives Value With Who Pays the Year-One Cash Cost',
      subtitle: 'Checking who gets gains, what limits Year-1 cash, and which funds pay Year-1 bills.',
      caption: 'Comparison of who receives benefits versus who pays cash, Year-1 budget limits, tax tradeoffs, and funding plans across four programs.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'Working families gain $422.0M in net pay while the state SDI fund pays $623.7M in gross checks.' },
            { val: 'Workers receive full 12-week checks while the state SDI fund records a -$0.58B Year-1 deficit.' },
            { val: 'Medi-Cal health plans keep monthly member payments while counties pay outreach staff wages.' },
            { val: 'Conditional Value of a Statistical Life (VSL) gains go to residents, not to county cash budgets.' }
          ]
        },
        {
          label: 'Why Year-1 Budgets Face Limits',
          cells: [
            { val: 'Without a tax rate change, 2026 SDI reserves drop to 10.8% ($1.96B), below EDD\'s 25.0% ($4.38B) goal.' },
            { val: 'Full 100% use spends the $3.19B baseline reserve in one year (-3.0% deficit) at the 1.300% tax rate.' },
            { val: 'State budget rules ($709M) restrict pay to county staff after $20M AB 102 community grants ended.' },
            { val: 'County general funds pay 100% of Year-1 wages, while VSL ratios measure non-cash resident value.' }
          ]
        },
        {
          label: 'What Budget Impact Analysis Adds',
          cells: [
            { val: 'Shows 30% employer leave coordination lowers net worker pay ($422.0M) without reducing the $623.7M state cost.' },
            { val: 'Estimates upper-limit deficits (-$1.70B by 2030) so lawmakers can review &sect; 984 payroll tax rules.' },
            { val: 'Shows low $35-$140 unit cost still needs a legal county or Medi-Cal health plan funding line.' },
            { val: 'Clarifies that federal $13.6M VSL figures measure conditional resident value (if causal), not cash.' }
          ]
        },
        {
          label: 'Funding Tradeoff',
          cells: [
            { val: 'A +0.045 percentage-point (pp) payroll tax increase (~$45 per $100K wages) covers the $4.013B six-year cost.' },
            { val: 'Setting payroll taxes for 100% use (+0.139 pp) overtaxes workers when expected use is 35%.' },
            { val: 'Automated state data checks keep ~14,900 member-years/yr while phone staff assist complex cases.' },
            { val: 'Counting 32:1 or 59:1 conditional VSL ratios as cash savings misstates yearly county cash budgets.' }
          ]
        },
        {
          label: 'Budget &amp; Reserve Options',
          policyFit: true,
          cells: [
            { headline: 'Pair Value With 6-Year Cash', detail: 'Submit the 2025-2030 SDI reserve table together with a +0.045 pp (1.345%) payroll tax rate.' },
            { headline: 'Apply &sect; 984 Tax Rate Rules', detail: 'Use Cal. Unemp. Ins. Code &sect; 984 rate rules (1.5% cap) if reserves stay below EDD\'s 25% goal.' },
            { headline: 'Co-Fund With Health Plans', detail: 'Fund community outreach workers through Medi-Cal health plans that keep monthly member payments.' },
            { headline: 'Keep Cash &amp; VSL Separate', detail: 'Pair Realignment cash budgets with conditional links (-2.38 yr; -4.32 13-yr, adj. p = 0.067; 32:1 and 59:1 if causal).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Enacted FY 2026-27 Medi-Cal Budget Lines &amp; Multi-Year Links',
      notesBullets: [
        '<strong>Enacted State Medi-Cal Administration Lines.</strong> The FY 2026&ndash;27 California budget provides <strong>$709M total ($196.8M General Fund)</strong> for county eligibility workers within <strong>$3.3B</strong> for county Medi-Cal administration. Dedicated state community outreach grants (<strong>$20M AB 102</strong> and <strong>$59.8M DHCS</strong>) ended on June 30, 2025.',
        '<strong>Yearly and 13-Year County Links &amp; Conditional Value.</strong> In the 57-county LHA study (<a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">Cholette et al., 2026</a>), the yearly pre-pandemic link of <strong>-2.38 deaths per 100,000 per $10/resident</strong> equals <strong>55.1% (55%)</strong> of the 13-year link of <strong>-4.32 deaths per 100,000</strong> (unadjusted p = 0.0052, p = 0.067 after multiple-test adjustment; the 16-year link is <strong>-5.91</strong>, p = 0.0330). Expressed as illustrative resident value if causal at the $13.6M federal VSL, those links correspond to $420,168 per statistical life (<strong>32.4:1 [32:1]</strong>), $231,481 per statistical life (<strong>58.8:1 [59:1]</strong>), and <strong>80.4:1 [80:1]</strong>.'
      ]
    },
    synthesis: {
      title: 'Why Program Reviews Need Both Qualified Value Estimates and a Yearly Cash Plan',
      p1: 'Proposals citing large social value cannot move forward when they leave out a Budget Impact Analysis. County health links correspond to 32:1 in Year 1 and 59:1 over 13 years (adj. p = 0.067) as illustrative resident value if causal, not cash returns. Paid Family Leave (PFL) plans estimate $422.0M in net worker pay, and Medi-Cal outreach keeps coverage for $35 to $140 per member-year. Yet budget offices must verify Year-1 cash costs, EDD reserve goals, and state payroll tax law (Cal. Unemp. Ins. Code &sect; 984). Resident health value does not place cash into agency accounts.',
      p2: 'Reporting both tables side by side gives lawmakers a complete budget plan. A 12-week PFL plan requires $623.7M in 2026 gross State Disability Insurance cash. That cost lowers reserves to 10.8% ($1.96B), below EDD\'s 25.0% ($4.38B) planning goal (not a legal minimum). At the 1.300% tax rate, wage growth across all covered jobs raises reserves to 30.4% ($6.37B) by 2030. To reach EDD\'s goal sooner, lawmakers can set a 1.345% rate under &sect; 984 (below the 1.5% cap). For Medi-Cal, $709M in state funds pays only county staff, so CBO teams partner with health plans.'
    },
    methodologyParagraphs: [
      '<strong>State Budgets, County Links, and Cash Forecasts.</strong> FY 2026&ndash;27 state Medi-Cal lines ($709M total / $196.8M General Fund, $3.3B county work, and ended $20M AB 102 and $59.8M DHCS grants) come from state budget records. Actual 2025 SDI reserves ($3.011B) come from EDD records. Pre-2020 57-county LHA death links (-2.38 yearly, -4.32 over 13 years with p = 0.0052 unadjusted and p = 0.067 adjusted, and -5.91 over 16 years) are study estimates. VSL ratios (32:1, 59:1, 80:1) show resident value if causal. Projected 2026&ndash;2030 SDI reserves ($1.96B / 10.8% vs. EDD\'s $4.38B 25% goal, separate from UIC &sect; 984 rate law and 1.5% cap) and county outreach costs ($150K&ndash;$600K/yr, $35&ndash;$140 per member-year) are modeled.',
      '<strong>Main Data Sources.</strong> Records come from the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a>, <a href="https://ebudget.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance Enacted Budget Summary</a>, <a href="https://www.dhcs.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS Medi-Cal Local Assistance Estimates</a>, and <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL)</a>.'
    ],
    faqs: [
      {
        question: 'How does a Budget Impact Analysis differ from cost-effectiveness or cost-benefit studies?',
        answer: 'Cost-effectiveness and cost-benefit studies compare total health or resident value per dollar across whole populations. By contrast, a Budget Impact Analysis estimates yearly gross cash spending, revenue, and EDD reserve goals for one payer. It also checks legal budget or tax authority over one to five years.'
      },
      {
        question: 'Why must the State Disability Insurance fund budget $623.7M in cash when net worker pay rises by $422.0M?',
        answer: 'Many private employers coordinate paid leave with state Paid Family Leave (modeled at 30%). State checks then replace part of employer-paid leave, reducing added worker pay from $602.8M gross benefits to $422.0M net. Even so, the state SDI fund must still pay the full $623.7M cash bill.'
      },
      {
        question: 'How do the yearly and 13-year county health death links compare in conditional VSL terms?',
        answer: 'Across 57 California counties before 2020, the one-year link (-2.38 deaths per 100,000 per $10) equals 55% of the 13-year link (-4.32 per 100,000, adj. p = 0.067). At the $13.6M federal Value of a Statistical Life (VSL), which values small reductions in death risk, those links equal $420,168 per statistical life (32:1) and $231,481 per statistical life (59:1). Both figures represent illustrative resident value if causal, not cash paid to counties.'
      }
    ],
    related: [
      { slug: 'chw-health-outcomes', title: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs', note: 'Related case study separating clinic visit billing, health plan savings, and health value' },
      { slug: 'measuring-health-common-unit', title: 'Distinct Healthy-Year and Death-Risk Units Help Counties Compare Care and Prevention', note: 'Related case study keeping healthy-year and death-risk units separate from cash budgets' },
      { slug: 'cost-effectiveness-ratio', title: 'Five-Year Contracts Divide First-Year Care Team Setup Costs Across Five Years of Care', note: 'Related case study comparing Year-1 setup costs with 5-year ongoing value' }
    ]
  },

  // =========================================================================
  // MODULE #22: measuring-health-common-unit (Track 3, community)
  // =========================================================================
  {
    slug: 'measuring-health-common-unit',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Fee Schedule Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,039 census tracts, a fixed $31.74 Medi-Cal visit fee pays 3.2% to 8.9% of modeled community health worker costs.'
      }
    ],
    tier: 'community',
    briefType: 'Program Cost &amp; Impact Model &middot; Community Health Workers',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; Healthy-Year Units and Federal Death-Risk Values',
    pageTitle: 'Healthy Years & Death-Risk Values in Budgets | CAPHE',
    metaDescription: 'Compare chronic care, mental health, and county death-rate links using separate Quality-Adjusted Life Year (QALY) and federal death-risk (VSL) units.',
    h1: 'Distinct Healthy-Year and Death-Risk Units Help Counties Compare Care and Prevention',
    subtitle: 'Checking clinic and mental health care in healthy years while keeping death-risk values apart.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'Diabetes clinics track lab tests, mental health teams score mood symptoms, and counties count death rates [1,3]. Without shared units, mental health and social support often drop out of budget reviews [2].'
      },
      {
        lead: 'What our model estimates',
        html: 'Suppose Community Health Workers serve <strong>750</strong> clients per year across chronic, mental, and social care [1,2]. Two-year gains reach <strong>40.04 QALYs</strong> (<strong>$4.00M</strong> at $100K/QALY; <strong>54.5%</strong> mental and social), kept separate from <strong>32:1</strong> yearly and <strong>59:1</strong> 13-year county death-risk values if causal (adj. <em>p</em> = 0.067) [2,3].'
      },
      {
        lead: 'Policy option',
        html: 'Counties can assign one main care group per client so mental and social gains count once [2]. Reporting QALYs, death-risk values (if causal), and hospital cash savings in separate rows stops double-counting [1,3].'
      }
    ],
    endnotes: [
      '<strong>Quality-Adjusted Life Year (QALY) Cohort Standard.</strong> Discounting rules follow <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders et al. (2016), Second Panel on Cost-Effectiveness in Health and Medicine</a>. Using a 3.0% annual discount rate across an illustrative 750-client annual California Community Health Worker cohort gives 40.04 two-year QALYs, valued at $4,004,083 at $100K/QALY.',
      '<strong>One Main Care Group per Client.</strong> Assigning each client in the illustrative 750-client cohort to one primary care group gives two-year discounted totals of 18.21 QALYs ($1,821,046 at $100K/QALY) across 375 chronic-care clients (50%), 17.49 QALYs across 225 mental-health clients (30%), and 4.34 QALYs across 150 social-needs clients (20%). Mental-health and social-needs groups sum to 21.83 QALYs ($2,183,037), and all three groups sum to 40.04 cohort QALYs ($4,004,083).',
      '<strong>Federal Value of a Statistical Life (VSL) Rates (2025).</strong> Rates come from the <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS ASPE 2025 VSL Schedule</a> ($6.3M Low, $13.6M Central, $20.7M High). Applied as illustrative resident value if causal to California\'s 57-county public health links, $13.6M corresponds to 32:1 yearly ($420,168 per statistical life) and 59:1 over 13 years ($231,481 per statistical life, p = 0.067 after multiple-test adjustment; kept separate from QALY ratios).'
    ],
    block2: {
      title: 'Daily Health Unit (QALYs) Compared With Conditional Death-Risk Value (HHS 2025 VSL)',
      contextTag: 'Two Separate Units (750-Client Cohort QALYs vs. Conditional 57-County VSL)',
      ariaLabel: 'Comparison of discounted Quality-Adjusted Life Years per client cohort versus conditional federal Value of a Statistical Life rates',
      ruler1: {
        title: 'Client Healthy-Year Unit (Discounted QALYs)',
        stat: '40.04 QALYs / Yr ($4,004,083 at $100K/QALY)',
        ariaLabel: '750-client cohort produces 40.04 discounted QALYs per year',
        segments: [
          { cls: 'seg-primary', width: 45, label: 'Chronic Care: 18.21 QALYs' },
          { cls: 'seg-rest', width: 44, label: 'Mental Health: 17.49 QALYs' },
          { cls: 'seg-food', width: 11, label: 'Social: 4.34' }
        ],
        desc: 'Mental health and social-needs support account for 54.5% of cohort healthy years.'
      },
      ruler2: {
        title: 'Population Death-Risk Unit (HHS 2025 VSL, If Causal)',
        stat: '$13.6M Central ($6.3M-$20.7M) | 32:1 Yr / 59:1 13-Yr (adj. p = 0.067)',
        ariaLabel: 'Conditional on causality, HHS 2025 central VSL of $13.6M equals 32:1 annual and 59:1 13-year value-to-cost ratios',
        segments: [
          { cls: 'seg-gross', width: 30, label: 'Low $6.3M' },
          { cls: 'seg-primary', width: 36, label: 'Central $13.6M (32:1 / 59:1)' },
          { cls: 'seg-rest', width: 34, label: 'High $20.7M' }
        ],
        desc: 'Federal VSL rates show illustrative resident value if causal (not cash returns) in a separate unit.'
      }
    },
    table1: {
      title: 'Table 1. Putting Clinic, Mental Health, and Death Links Into Separate Units',
      subtitle: 'Checking chronic care, mental and social help, CHW cohorts, and death links in QALY and VSL units.',
      caption: 'Comparison of four public health outcome groups across clinical or vital measures, baseline health weights, QALYs or statistical lives, dollar values, and value-to-cost ratios.',
      cornerLabel: 'Valuation Step',
      columns: [
        { tag: 'Cohort Share: 50%', tagHighlight: false, title: 'Chronic Disease Care', subtitle: '375 clients per year (QALY unit).' },
        { tag: 'Cohort Share: 50%', tagHighlight: true, title: 'Mental &amp; Social Help', subtitle: '225 mental + 150 social clients (QALY unit).' },
        { tag: 'Combined Cohort', tagHighlight: true, title: 'Full 750-Client CHW Group', subtitle: 'All 750 clients in QALY units.' },
        { tag: 'Population Unit', tagHighlight: false, title: 'County Death-Risk Links', subtitle: '57-county VSL death-risk unit.' }
      ],
      rows: [
        {
          label: 'Unit &amp; Federal or U.S. Standard<span class="block text-xs font-normal text-slate-500">QALY health gains and VSL never add together</span>',
          modeled: false,
          cells: [
            { val: 'QALYs at $50K/$100K/$150K; 375 chronic-care clients/yr' },
            { val: 'QALYs at $50K/$100K/$150K; 225 mental + 150 social clients/yr' },
            { val: 'QALYs at $50K/$100K/$150K; full 750-client county CHW group' },
            { val: 'HHS VSL ($6.3M / $13.6M / $20.7M); 57-county study ($10/resident)' }
          ]
        },
        {
          label: 'Recorded Clinical or Vital Measure<span class="block text-xs font-normal text-slate-500">Clinic chart or county vital-records measure</span>',
          modeled: false,
          cells: [
            { val: 'HbA1c %, blood pressure, +25% screening' },
            { val: 'PHQ-9 depression &amp; housing/food stability' },
            { val: '22% fewer emergency visits, 30% fewer stays' },
            { val: '-2.38 yr / -4.32 13-yr (adj. p = 0.067)' }
          ]
        },
        {
          label: 'Starting Health Weight (0 to 1)<span class="block text-xs font-normal text-slate-500">0.00 = Death | 0.40 = Hospital Stay | 1.00 = Full</span>',
          modeled: false,
          cells: [
            { val: '0.74 to 0.75 chronic starting score' },
            { val: '0.74 high-need Medi-Cal starting score' },
            { val: '0.40 hospital stay vs. 0.75 stable' },
            { val: '0.00 death before age 75' }
          ]
        },
        {
          label: 'Assumed Group Size or Conditional Lives*<span class="block text-xs font-normal text-slate-500">One group per client or conditional lives</span>',
          modeled: true,
          cells: [
            { val: '375 clients / yr (50% of cohort)' },
            { val: '225 mental (30%) + 150 social (20%)' },
            { val: '750 clients / yr (100% one group each)' },
            { val: '941 yr / 1,708 13-yr lives (if causal)' }
          ]
        },
        {
          label: 'Estimated Two-Year or Study Output*<span class="block text-xs font-normal text-slate-500">2-yr QALYs (3% disc.) or conditional $/life</span>',
          modeled: true,
          cells: [
            { val: '0.0486/client (18.21 QALYs/yr)' },
            { val: '17.49 mental + 4.34 social (21.83/yr)' },
            { val: '0.0534/client (40.04 QALYs/yr)' },
            { val: '2.38 ($420K) | 4.32 ($231K if causal)' }
          ]
        },
        {
          label: 'Estimated Dollar Value in Each Unit*<span class="block text-xs font-normal text-slate-500">At $100K/QALY vs. HHS $13.6M VSL</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '$1,821,046 / yr QALY value', barWidth: 13, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$2,183,037 / yr QALY value', barWidth: 16, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '$4,004,083 / yr Cohort QALYs', barWidth: 29, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '$13.6M / Life ($6.3M-$20.7M)', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Illustrative Value-to-Cost Ratio*<span class="block text-xs font-normal text-slate-500">Compared with $675K group / $1.405M cohort cost</span>',
          modeled: true,
          cells: [
            { val: '2.70 : 1 (at $100K / QALY)' },
            { val: '3.23 : 1 (at $100K / QALY)' },
            { val: '2.85 : 1 (vs. $1.405M ongoing)' },
            { val: '32:1 Yr | 59:1 13-Yr (if causal)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Stopping Double Counts While Scoring Mental and Social Care',
      subtitle: 'Matching healthy years and death-risk values, if causal, to clinic and county budget reviews.',
      caption: 'Comparison of who receives benefits, what common units show, rules against double-counting, tested ranges, and county budget uses.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'Patients gain steadier daily health while Medi-Cal plans avoid avoidable hospital stays.' },
            { val: 'Members experience better mood and steadier housing across non-lab support services.' },
            { val: 'Enrolled members gain 40.04 healthy years per year alongside separate reductions in hospital stays.' },
            { val: 'Conditional VSL value goes to county residents (if causal), not as cash to county budgets.' }
          ]
        },
        {
          label: 'What Common Units Show',
          cells: [
            { val: 'Places a 0.5-point blood-sugar drop on the same 0-to-1 scale as blood-pressure or asthma care.' },
            { val: 'Shows mental health (17.49 QALYs) and social help (4.34 QALYs) provide 54.5% of cohort QALYs.' },
            { val: 'Lets hospital and county teams view member health gains ($4.00M at $100K/QALY) next to bed savings.' },
            { val: 'Converts county death links (-2.38 yr; -4.32 13-yr, adj. p = 0.067) to 32:1 and 59:1 VSL if causal.' }
          ]
        },
        {
          label: 'Rule Against Double-Counting',
          cells: [
            { val: 'Assign each patient one main condition weight instead of adding diabetes and blood-pressure weights.' },
            { val: 'Divide the 750-client cohort into non-overlapping care groups (50% chronic, 30% mental, 20% social).' },
            { val: 'Never add dollar-valued QALYs to hospital cash savings in a single combined dollar total.' },
            { val: 'Keep federal VSL ($6.3M-$20.7M) separate and never add VSL dollars to QALY dollars.' }
          ]
        },
        {
          label: 'Range Tested in Model',
          cells: [
            { val: 'Changing chronic-care gains by +/-40% around 18.21 QALYs gives 10.93 to 25.49 QALYs.' },
            { val: 'Baseline gains last 2.0 years per annual cohort, tested across 1.0 to 3.0 years at 3% discounting.' },
            { val: 'A hospital stay lowers daily health quality from 0.75 to 0.40 while hospitalized.' },
            { val: 'If causal, HHS 2025 VSL rates ($6.3M-$20.7M) range from 15:1 to 49:1 yearly and 27:1 to 89:1 at 13 years.' }
          ]
        },
        {
          label: 'Budget &amp; Valuation Options',
          policyFit: true,
          cells: [
            { headline: 'Review Chronic Clinic Care', detail: 'Use chronic-care QALYs (18.21 QALYs across 375 clients) when reviewing clinic care-team staffing.' },
            { headline: 'Include Mental &amp; Social Help', detail: 'Use QALY totals (17.49 mental, 4.34 social) so California Advancing and Innovating Medi-Cal (CalAIM) support counts.' },
            { headline: 'Keep Cash &amp; QALYs Separate', detail: 'Report $4,004,083 in cohort QALY value in a health table separate from hospital cash savings.' },
            { headline: 'Label VSL as If Causal', detail: 'Label $6.3M-$20.7M VSL figures on county studies as illustrative resident value if causal, not cash.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Care-Group QALY Totals &amp; Conditional HHS 2025 VSL Calculations',
      notesBullets: [
        '<strong>Care-Group QALY Totals and Rounding.</strong> Across the illustrative 750-client annual cohort (two-year benefit period discounted at 3.0%/yr), non-overlapping care groups assign <strong>18.21046 QALYs/yr (18.21 QALYs; $1,821,046 at $100K/QALY; 0.0486 QALYs/client)</strong> across 375 chronic-care clients. They assign <strong>17.48573 QALYs/yr (17.49 QALYs; 0.0777 QALYs/client)</strong> across 225 mental-health clients, and <strong>4.34464 QALYs/yr (4.34 QALYs; 0.0290 QALYs/client)</strong> across 150 social-needs clients. Mental and social groups sum to <strong>21.83037 QALYs/yr (21.83 QALYs; $2,183,037)</strong>, and all three sum to <strong>40.04083 QALYs/yr (40.04 QALYs; $4,004,083; 0.0534 QALYs/client)</strong>. The companion 5-year cost-effectiveness schedule uses <strong>40.0404252 QALYs/yr</strong> (a $40 rounding difference at $100K/QALY). Group ratios divide QALY value by $675,000 ($1,800 &times; 375 clients: 2.70:1 and 3.23:1), and the cohort ratio divides by $1,405,000 ongoing cost ($1.35M direct + $55K spread setup: 2.85:1).',
        '<strong>Conditional HHS 2025 VSL Calculations.</strong> Assuming for illustration that the 57-county links are causal, -2.38 deaths per 100,000 per $10 spent each year equals <strong>$420,168</strong> per statistical life (<strong>15:1 at $6.3M Low</strong>, <strong>32:1 at $13.6M Central</strong>, <strong>49:1 at $20.7M High</strong>). The 13-year link (-4.32 per 100,000, unadjusted p = 0.0052, p = 0.067 after multiple-test adjustment) equals <strong>$231,481</strong> per statistical life (<strong>27:1 Low</strong>, <strong>59:1 Central</strong>, <strong>89:1 High</strong>).'
      ]
    },
    synthesis: {
      title: 'How Separate Health Units Help Counties Compare Mental Health and Clinic Care',
      p1: 'Judging programs only by single lab tests favors care tied to one blood test or code. Mental health help, housing aid, and county health work are then left out of budget reviews. Without a shared unit, budget teams cannot compare mood symptom relief for 225 Medi-Cal members with blood-sugar gains for 375 patients.',
      p2: 'Shared health units allow fair checks while keeping distinct measures apart. Across 750 clients served by CHWs, two-year gains total 40.04 QALYs per year, worth $4,004,083 at $100,000 per QALY. Mental health (17.49 QALYs) and social help (4.34 QALYs) make up $2,183,037 (54.5%). Chronic care makes up the other $1,821,046 (18.21 QALYs). In a separate unit, HHS Value of a Statistical Life (VSL) rates ($6.3M, $13.6M, and $20.7M) value death-risk cuts. In that unit, county health links equal 32:1 yearly and 59:1 at 13 years (adj. p = 0.067). Both show resident value if causal, not cash returns.'
    },
    methodologyParagraphs: [
      '<strong>Federal Valuation Standards, County Death Links, and Cohort QALY Inputs.</strong> HHS 2025 VSL rates ($6.3M / $13.6M / $20.7M), U.S. QALY benchmarks ($50K / $100K / $150K per QALY), and 3.0% annual discounting (<a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Second Panel</a>) come from published standards. Pre-2020 57-county LHA death links (-2.38 yearly; -4.32 over 13 years, p = 0.067 after multiple-test adjustment) come from county records, and VSL ratios show illustrative resident value if causal. Two-year discounted care-group QALY totals (18.21 chronic, 17.49 mental health, and 4.34 social needs across 50%/30%/20% of 750 clients = 40.04 QALYs/yr, or $4,004,083 at $100K/QALY) are illustrative scenario inputs.',
      '<strong>Main References &amp; Data Sources.</strong> Standards and records come from <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL Schedule)</a>, <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA Mortality Risk Valuation ($11.2M VSL)</a>, <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders et al. (2016), JAMA</a>, and <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a>.'
    ],
    faqs: [
      {
        question: 'What does a Quality-Adjusted Life Year (QALY) measure, and why is it discounted at 3%?',
        answer: 'One QALY equals one year lived in full health on a 0-to-1 scale, where 0.00 is death and 1.00 is full health. Second-year health gains are discounted by 3.0% per year to express two-year gains in present-year terms. Across the 750-client cohort, discounted two-year gains average 0.0534 QALYs per client, or 40.04 QALYs in total.'
      },
      {
        question: 'Why must analysts never add QALY dollar values and Value of a Statistical Life (VSL) figures together?',
        answer: 'QALYs ($50,000 to $150,000 per QALY) measure daily health quality and length of life in clinic studies. By contrast, federal VSL ($6.3M to $20.7M per statistical life) values small reductions in population death risk in policy studies. Adding both on the same group counts longer life twice.'
      },
      {
        question: 'How does assigning one main care group per patient prevent double-counting?',
        answer: 'Adding separate diabetes and depression gains for the same patient can overstate total health improvement. Instead, each person in the 750-client cohort is counted in one primary care group (50% chronic, 30% mental, 20% social), or measured with one combined health survey.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'Five-Year Contracts Divide First-Year Care Team Setup Costs Across Five Years of Care', note: 'Related case study applying $50K/$100K/$150K per QALY benchmarks across Year-1 and 5-year costs' },
      { slug: 'sensitivity-analysis-cea', title: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal', note: 'Related case study testing conditional 32:1 annual and 59:1 13-year VSL estimates across HHS rates' },
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Related case study pairing health value estimates with Year-1 cash and reserve plans' }
    ]
  },

  // =========================================================================
  // MODULE #23: cost-effectiveness-ratio (Track 3, community)
  // =========================================================================
  {
    slug: 'cost-effectiveness-ratio',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Fee Schedule Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,039 census tracts, a fixed $31.74 Medi-Cal visit fee pays 3.2% to 8.9% of modeled community health worker costs.'
      }
    ],
    tier: 'community',
    briefType: 'Program Cost &amp; Impact Model &middot; Community Health Workers',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; Year-One Setup Costs Compared With Five-Year Cost per QALY',
    pageTitle: 'Year-1 Setup vs. Five-Year Cost per QALY | CAPHE',
    metaDescription: 'Compare 5-year Community Health Worker cost per healthy year ($36,089 operating, $37,712 with setup) and net value (+$12.80M at $100K per QALY).',
    h1: 'Five-Year Contracts Divide First-Year Care Team Setup Costs Across Five Years of Care',
    subtitle: 'Comparing Year-1 hiring and setup costs with five-year ongoing and full costs per healthy year gained.',
    openingBeats: [
      {
        lead: 'In practice today',
        html: 'One-year county pilot reviews charge all first-year hiring, training, and IT setup costs to one year of patients [2]. That rule raises Year-1 cost per healthy year before caseloads reach ongoing operations [1,2].'
      },
      {
        lead: 'What our model estimates',
        html: 'Suppose a 10-worker care team serves <strong>750</strong> clients per year (<strong>$1,930,000</strong> in Year 1; <strong>$1,405,000/yr</strong> in Years 2–5) and adds <strong>40.04 QALYs/yr</strong> [1,2]. Cost drops from <strong>$48,202 / QALY</strong> in Year 1 to <strong>$37,712 / QALY</strong> over five years with setup (<strong>$36,089</strong> operating) [1,2].'
      },
      {
        lead: 'Policy option',
        html: 'Counties can write 3-to-5-year care-team contracts so startup costs divide across <strong>200.20</strong> five-year QALYs [1,2]. Budget tables can also list gross cost per QALY separately from hospital stay savings [2,3].'
      }
    ],
    endnotes: [
      '<strong>California 5-Year Community Health Worker (CHW) Scenario.</strong> Benefit rules follow <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a>. An illustrative 10-CHW team serving 750 clients per year over 5 years produces 200.20 two-year-discounted Quality-Adjusted Life Years (40.04 QALYs per annual cohort across five cohorts). Five-year direct operating cost is $7,225,000 ($36,089 / QALY), and total 5-year cost including $325,000 in setup is $7,550,000 ($37,712 / QALY).',
      '<strong>Year-1 Setup Costs Compared With Years 2&ndash;5 Ongoing Care.</strong> Year-1 spending totals $1,930,000 for 40.04 QALYs ($48,202 / QALY), combining $1,825,000 in Year-1 direct operating cost with $105,000 in Year-1 setup ($50,000 one-time onboarding plus $55,000 yearly IT and training). In Years 2&ndash;5, annual spending decreases by $525,000/yr to $1,405,000/yr ($35,090 / QALY), combining $1,350,000 ($1,800/client) direct operating cost with $55,000/yr spread setup. Over 5 years, direct operating costs sum to $7,225,000 and setup costs sum to $325,000 ($7,550,000 total).',
      '<strong>Net Dollar Value &amp; Randomized Trial Results.</strong> Using <a href="https://www.icer.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Institute for Clinical and Economic Review</a> U.S. benchmarks ($50K / $100K / $150K per QALY), 5-year operating net value is +$2.79M, +$12.80M, and +$22.81M (+$2.46M, +$12.47M, and +$22.48M with setup). In the <a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Individualized Management for Patient-Centered Targets (IMPaCT) randomized trial (Kangovi et al., 2020)</a>, hospital savings returned $2.47 per $1 spent.'
    ],
    block2: {
      title: 'Cost per Healthy Year Gained Compared With 5-Year Net Dollar Value',
      contextTag: '5-Year Cohort Totals ($36,089 Direct Operating vs. $37,712 With Setup)',
      ariaLabel: 'Comparison of cost per QALY across periods versus 5-year net dollar value across U.S. benchmarks',
      ruler1: {
        title: 'Cost per Healthy Year Gained',
        stat: '$36,089 / QALY Operating | $37,712 / QALY With Startup',
        ariaLabel: '5-year operating cost is $36,089 per QALY and full cost with startup is $37,712 per QALY',
        segments: [
          { cls: 'seg-rest', width: 35, label: 'Yrs 2-5: $35,090' },
          { cls: 'seg-primary', width: 37, label: '5-Yr: $36,089-$37,712 / QALY' },
          { cls: 'seg-gross', width: 28, label: 'Below $50K' }
        ],
        desc: 'Both 5-year ratios remain well below the $50,000 per QALY benchmark.'
      },
      ruler2: {
        title: '5-Year Net Dollar Value ($100,000 / QALY Benchmark)',
        stat: '+$12.80M Operating | +$12.47M With Startup',
        ariaLabel: '5-year net value is +$12.80M operating and +$12.47M with startup at $100,000 per QALY',
        segments: [
          { cls: 'seg-food', width: 15, label: '+$2.79M ($50K)' },
          { cls: 'seg-primary', width: 40, label: '+$12.80M ($100K)' },
          { cls: 'seg-rest', width: 45, label: '+$22.81M ($150K)' }
        ],
        desc: 'Valuing 200.20 QALYs at $100K and subtracting 5-year costs leaves +$12.47M to +$12.80M.'
      }
    },
    table1: {
      title: 'Table 1. Cost per Healthy Year Gained and Net Dollar Value Across Four Time Spans',
      subtitle: 'Checking Year-1 setup, Years 2-5 care, 5-year direct cost, and 5-year full cost before bed savings.',
      caption: 'Comparison of gross program spending, discounted QALYs, cost per healthy year gained, and net dollar value across Year 1, Years 2-5, 5-year direct operating, and 5-year full-setup periods.',
      cornerLabel: 'Cost &amp; Value Measure',
      columns: [
        { tag: 'Period 1: Year 1', tagHighlight: false, title: 'Year 1 Hiring &amp; Setup', subtitle: 'First-year operating ($1.825M) + setup ($105K).' },
        { tag: 'Period 2: Years 2-5', tagHighlight: true, title: 'Years 2 to 5 Ongoing', subtitle: 'Yearly operating ($1.35M) + setup ($55K).' },
        { tag: '5-Yr Operating', tagHighlight: true, title: 'Direct Operating Total', subtitle: '5-year direct operating only ($7.225M).' },
        { tag: '5-Yr Full Cost', tagHighlight: false, title: 'Total Cost With Setup', subtitle: '5-year operating + $325K setup ($7.55M).' }
      ],
      rows: [
        {
          label: 'Assumed Gross Program Cost<span class="block text-xs font-normal text-slate-500">Program spending before hospital savings</span>',
          modeled: false,
          cells: [
            { val: '$1,930,000 (Yr 1)' },
            { val: '$1,405,000 / yr (Yrs 2-5)' },
            { val: '$7,225,000 (5-yr operating)' },
            { val: '$7,550,000 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'Estimated Health Gain (QALYs)*<span class="block text-xs font-normal text-slate-500">3.0%/yr discount over 2-yr client gain</span>',
          modeled: true,
          cells: [
            { val: '40.04 QALYs (Yr 1)' },
            { val: '40.04 QALYs / yr (Yrs 2-5)' },
            { val: '200.20 QALYs (5-yr total)' },
            { val: '200.20 QALYs (5-yr total)' }
          ]
        },
        {
          label: 'Estimated Cost per Healthy Year*<span class="block text-xs font-normal text-slate-500">Gross cost divided by QALYs gained</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '$48,202 / QALY (Yr 1)', barWidth: 96, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '$35,090 / QALY (Yrs 2-5)', barWidth: 70, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$36,089 / QALY (operating)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$37,712 / QALY (w/ startup)', barWidth: 75, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Net Value at $50,000 / QALY*<span class="block text-xs font-normal text-slate-500">Lower U.S. value benchmark</span>',
          modeled: true,
          cells: [
            { val: '+$72,021 (Yr 1 net)' },
            { val: '+$597,021 / yr' },
            { val: '+$2,785,106 (5-yr operating)' },
            { val: '+$2,460,106 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'Net Value at $100,000 / QALY*<span class="block text-xs font-normal text-slate-500">Standard U.S. value benchmark</span>',
          modeled: true,
          cells: [
            { val: '+$2,074,043 (Yr 1 net)' },
            { val: '+$2,599,043 / yr' },
            { val: '+$12,795,213 (5-yr operating)' },
            { val: '+$12,470,213 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'Net Value at $150,000 / QALY*<span class="block text-xs font-normal text-slate-500">Upper U.S. value benchmark</span>',
          modeled: true,
          cells: [
            { val: '+$4,076,064 (Yr 1 net)' },
            { val: '+$4,601,064 / yr' },
            { val: '+$22,805,319 (5-yr operating)' },
            { val: '+$22,480,319 (5-yr w/ startup)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Separating Five-Year Cost per QALY From Hospital Cost Savings',
      subtitle: 'Keeping cost per healthy year, net value, and bed savings apart in county plans.',
      caption: 'Comparison of who receives benefits, how ratios and net value change, cost-effective versus cost-saving definitions, contract tradeoffs, and contract rules.',
      cornerLabel: 'Decision Factor',
      rows: [
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'The county pays Year-1 hiring and setup costs ($1,930,000) as first-year patient QALYs begin.' },
            { val: 'Yearly county spending falls to $1,405,000/yr in Years 2-5 while patient gains stay at 40.04 QALYs.' },
            { val: 'Patients gain 200.20 healthy years over 5 years for $7,225,000 in direct operating spending.' },
            { val: 'Five-year net value remains positive (+$12.47M at $100K/QALY) after including all $325,000 in setup.' }
          ]
        },
        {
          label: 'How Ratios &amp; Net Value Change',
          cells: [
            { val: 'First-year setup raises cost to $48,202/QALY, leaving +$72,021 net value at the $50,000 benchmark.' },
            { val: 'Moving from $1,930,000 in Year 1 to $1,405,000/yr in Years 2-5 lowers cost per QALY to $35,090.' },
            { val: 'Five-year operating net value rises from +$2.79M ($50K) to +$12.80M ($100K) and +$22.81M ($150K).' },
            { val: 'Dividing $325,000 in setup across 200.20 QALYs adds $1,623 per QALY ($36,089 to $37,712).' }
          ]
        },
        {
          label: 'Cost-Effective vs. Cost-Saving',
          cells: [
            { val: 'Before hospital savings ($48,202/QALY), the team is cost-effective (below $50K-$150K), not cost-saving.' },
            { val: 'A program is cost-saving only when avoided hospital bills exceed program costs while health improves.' },
            { val: 'Including modeled hospital savings ($1,823,330/yr vs. $1,405,000/yr cost) gives +$418,330/yr net cash savings.' },
            { val: 'Randomized Individualized Management for Patient-Centered Targets (IMPaCT) trials (Kangovi et al., 2020) saved $2.47 per $1.' }
          ]
        },
        {
          label: 'Contract Tradeoff',
          cells: [
            { val: 'Judging a pilot after 12 months charges initial training and setup before caseloads reach full capacity.' },
            { val: 'Basing renewals on $35,090/QALY ($1,405,000/yr in Years 2-5) measures ongoing care after Year 1.' },
            { val: 'Ratios alone leave out program size, whereas net dollar value compares small and large teams directly.' },
            { val: 'Leaving out setup omits $325,000, whereas 5-year full-cost tables include every startup dollar.' }
          ]
        },
        {
          label: 'Contracting Options',
          policyFit: true,
          cells: [
            { headline: 'Use 3-to-5-Year Contract Terms', detail: 'Divide Year-1 hiring and training costs across multi-year contracts instead of Year 1 alone.' },
            { headline: 'Separate Gross Cost &amp; Bed Savings', detail: 'Report gross cost per QALY ($35,090-$37,712) separately from modeled hospital savings (+$418K/yr).' },
            { headline: 'Compare Teams by Net Value', detail: 'Use 5-year net dollar value at $100,000/QALY (+$12.80M operating, +$12.47M full) to compare team sizes.' },
            { headline: 'Report Operating &amp; Full Totals', detail: 'List both $36,089/QALY (direct operating) and $37,712/QALY (with $325K setup) in budget tables.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Five-Year Cost Schedule, QALY Rounding &amp; Hospital Savings',
      notesBullets: [
        '<strong>Five-Year Cost Schedule and QALY Rounding.</strong> Across the illustrative 750-client annual cohort, discounted two-year gains are <strong>40.0404252 QALYs/yr</strong> (shown as <strong>40.04 QALYs</strong>; 0.0534 QALYs/client) and <strong>200.202126 QALYs</strong> over 5 years (shown as <strong>200.20 QALYs</strong>). Year-1 spending totals <strong>$1,930,000</strong> ($1,825,000 direct operating + $105,000 Year-1 setup [$50,000 one-time onboarding + $55,000 yearly IT/training]). Years 2&ndash;5 spending totals <strong>$1,405,000/yr</strong> ($1,350,000/yr direct operating at $1,800 &times; 750 clients + $55,000/yr spread setup, or $5,400,000 operating + $220,000 setup across 4 years). Across 5 years, direct operating costs sum to <strong>$7,225,000</strong> ($1,825,000 + $5,400,000), setup costs sum to <strong>$325,000</strong> ($105,000 + $220,000), and full costs sum to <strong>$7,550,000</strong> ($7,225,000 + $325,000). Dividing gross costs by 40.04 and 200.20 QALYs gives <strong>$48,202 / QALY</strong> in Year 1 ($48,201 unrounded), <strong>$35,090 / QALY</strong> in Years 2&ndash;5, <strong>$36,089 / QALY</strong> for 5-year direct operating, and <strong>$37,712 / QALY</strong> for 5-year full cost. Net Value cells multiply unrounded QALYs directly.',
        '<strong>Hospital Savings &amp; Trial Evidence.</strong> In <a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi et al. (2020, Health Affairs)</a>, hospital savings returned $2.47 per $1 spent. Comparing an illustrative $1,823,330/yr hospital offset with $1,405,000/yr ongoing cost gives +$418,330/yr in net cash savings (cost-saving).'
      ]
    },
    synthesis: {
      title: 'Why Five-Year Contracts and Net Dollar Value Clarify Cost-per-QALY Reviews',
      p1: 'Checking a single Year-1 ratio ($48,202 / QALY) or 5-year ratio ($36,089 / QALY direct; $37,712 / QALY with setup) leaves two questions open. First, why does Year 1 cost 37% more per QALY than Years 2 to 5 ($35,090 / QALY)? Second, how can counties compare a 10-worker team with a smaller team when ratios omit total QALYs? A 5-year contract divides first-year hiring and setup across all 200.20 QALYs. U.S. benchmarks ($50,000, $100,000, and $150,000 per QALY) also turn healthy years into net dollars.',
      p2: 'Subtracting gross 5-year costs ($7,225,000 direct; $7,550,000 with $325,000 setup) from valued QALYs gives one net sum. At the $100,000 per QALY benchmark, the 750-client-per-year CHW team brings +$12.80M in direct net value. Including all $325,000 in setup costs still leaves +$12.47M in net value. Even at the $50,000 benchmark, 5-year net value stays above zero (+$2.79M direct; +$2.46M with setup) before any avoided hospital stays.'
    },
    interactive: {
      badge: 'Health Value Benchmarks',
      title: 'Compare 5-Year Net Dollar Value Across U.S. Health Benchmarks',
      subtitle: 'Checking 5-year direct and full-setup net value at $50K, $100K, and $150K per QALY.',
      options: [
        {
          label: 'Benchmark 1 &middot; Lower Threshold',
          headline: '$50,000 per QALY Benchmark',
          metric: 'Net Value = +$2.79M (+$2.46M w/ Startup)',
          desc: 'Even at the $50,000 benchmark, both direct operating ($36,089 / QALY) and full-setup ($37,712 / QALY) 5-year totals remain positive.'
        },
        {
          label: 'Benchmark 2 &middot; U.S. Standard',
          headline: '$100,000 per QALY Benchmark',
          metric: 'Net Value = +$12.80M (+$12.47M w/ Startup)',
          desc: 'At the standard U.S. benchmark, 200.20 five-year QALYs produce +$12.80M operating net value (+$12.47M after $325,000 setup).'
        },
        {
          label: 'Benchmark 3 &middot; Upper Benchmark',
          headline: '$150,000 per QALY Benchmark',
          metric: 'Net Value = +$22.81M (+$22.48M w/ Startup)',
          desc: 'At the upper U.S. benchmark for complex care, 5-year net value reaches +$22.81M operating (+$22.48M with setup).'
        }
      ],
      notesTitle: 'Net Dollar Value Formula, Setup Costs &amp; Rounding Notes',
      notesBullets: [
        '<strong>Net Dollar Value Formula (<code>Value &times; QALYs &minus; Cost</code>).</strong> Over 5 years, the illustrative 10-CHW team produces <strong>200.202126 unrounded QALYs</strong> (5 &times; 40.0404252 QALYs/yr, shown as 200.20) for <strong>$7,225,000</strong> in direct operating cost (<strong>$7,550,000</strong> including $325,000 setup). Figures are calculated before Medi-Cal SPA 22-0001 visit fees or hospital savings.',
        '<strong>Exact Benchmark Totals.</strong> From unrounded QALYs (200.202126), net value at $50,000/QALY is <strong>+$2,785,106</strong> operating and <strong>+$2,460,106</strong> with setup. At $100,000/QALY, net value is <strong>+$12,795,213</strong> operating and <strong>+$12,470,213</strong> with setup. At $150,000/QALY, net value is <strong>+$22,805,319</strong> operating and <strong>+$22,480,319</strong> with setup.',
        '<strong>Cell Rounding.</strong> Each Table 1 cell is calculated from unrounded QALYs and rounded to the nearest dollar. That rounding explains $1&ndash;$2 differences when adding rounded annual cells across five years.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Cost-Effectiveness Inputs and Calculations.</strong> Cost inputs follow a 5-year schedule: $1,825,000 Year-1 direct operating plus $105,000 Year-1 setup equals $1,930,000 in Year 1, and $1,350,000/yr ($1,800/client) direct operating plus $55,000/yr spread setup equals $1,405,000/yr in Years 2&ndash;5. Five-year totals are $7,225,000 direct operating, $325,000 setup, and $7,550,000 full cost. Discounted QALYs (40.04/yr, 200.20 over 5 yrs), cost-per-QALY ratios ($48,202, $35,090, $36,089, $37,712), and net dollar values follow <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders et al. (2016) Second Panel on Cost-Effectiveness in Health and Medicine</a>.',
      '<strong>Average Compared With Added-Staff Cost per QALY.</strong> Compared with usual care, the 10-CHW team ($7,550,000 for 200.20 QALYs) averages $37,712 / QALY ($36,089 direct operating). Compared with an illustrative 5-to-6-CHW team ($3,115,606 for 112.11 QALYs = $27,790 / QALY), expanding to 10 CHWs adds +$4,434,394 for +88.09 added QALYs ($50,339 per added QALY).',
      '<strong>Main References &amp; Data Sources.</strong> Benchmarks and records come from the <a href="https://www.icer.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Institute for Clinical and Economic Review Value Assessment Framework ($50K&ndash;$150K/QALY)</a>, <a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann, Cohen &amp; Weinstein (2014), NEJM</a>, <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a>, and <a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi et al. (2020), Health Affairs</a>.'
    ],
    faqs: [
      {
        question: 'What is the difference between a "cost-effective" program and a "cost-saving" program?',
        answer: 'A program is cost-effective when its cost per QALY ($36,089 direct operating or $37,712 with setup) is below the chosen value benchmark ($50,000 to $150,000). A program is cost-saving only when avoided hospital bills exceed program costs, so total cash spending falls while health improves.'
      },
      {
        question: 'Why do health economists report net dollar value alongside cost per QALY?',
        answer: 'A cost-per-QALY ratio divides added cost by added QALYs, which leaves out total program size. A 20-patient pilot can have the same ratio as a 750-patient team. Net dollar value multiplies QALYs by the benchmark value and subtracts program costs, giving one total (+$12.80M operating at $100,000/QALY).'
      },
      {
        question: 'How much do Year-1 setup costs change the 5-year cost per QALY?',
        answer: 'Reviewed on Year 1 alone, initial hiring and setup bring cost to $48,202 / QALY ($1,930,000 for 40.04 QALYs). Divided across five years (200.20 QALYs), $325,000 in setup costs adds $1,623 per QALY. Five-year cost rises from $36,089 / QALY ($7,225,000 direct operating) to $37,712 / QALY ($7,550,000 full cost).'
      }
    ],
    related: [
      { slug: 'chw-health-outcomes', title: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs', note: 'Related case study comparing per-visit Medi-Cal billing with health plan and hospital savings' },
      { slug: 'measuring-health-common-unit', title: 'Distinct Healthy-Year and Death-Risk Units Help Counties Compare Care and Prevention', note: 'Related case study detailing the 40.04 cohort QALY estimate across chronic, mental, and social groups' },
      { slug: 'sensitivity-analysis-cea', title: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal', note: 'Related case study testing conditional VSL values and CHW cost assumptions across ranges' }
    ]
  }
];

for (const spec of wave3Modules) {
  renderModuleHtml(spec);
}
console.log('Wave 3 (9 Modules across Track 1 & Track 3) rendered successfully.');
