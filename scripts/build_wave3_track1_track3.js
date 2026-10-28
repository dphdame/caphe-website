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
 *  - #20 budget-impact (public, Mode B/A: CA LHA 125:1 ROI vs SDI Reserve Floor & Medi-Cal Admin Cash Flow)
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
        claimCovered: 'Row grain, seven fields, and suppression rules of the HHS Medicaid provider-spending file (238,015,729 aggregated billing rows), and the clinical context a screening decision still requires.'
      },
      {
        visibleLabel: 'Medicaid Billing Feature Construction Guide',
        title: 'What Billing Patterns Actually Look Like',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-billing-patterns/',
        claimCovered: 'Provider-level billing features built from 84 months of aggregated billing rows; the excluded-provider billing comparisons are under reconciliation.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 1: Program Impact &middot; Pre-Post Study &amp; Base Trends (Mode A on HHS Medicaid Provider Spending)',
    pageTitle: 'Evaluating Pre-Post Changes vs. Baseline Trends | CAPHE',
    metaDescription: 'How a two-point 2019 vs 2023 comparison of Medicaid telehealth-eligible billing providers mixes a pre-existing growth trend with policy change.',
    h1: 'Pre-Existing Workforce Trends Account for a Large Share of Projected Medicaid Telehealth Growth',
    subtitle: 'Comparing multi-year provider trends with modeled post-policy jumps across Medicaid claims.',
    endnotes: [
      '<strong>Observed Medicaid Billing Series (2018-2024):</strong> <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a> monthly counts (84 months, Jan 2018 to Dec 2024). Mean monthly billing providers for telehealth-eligible care rose from 84,422 in 2018 and 91,399 in 2019 to 113,638 in 2023 and 101,978 in 2024.',
      '<strong>Base Pre-Trend Path:</strong> Billing providers grew +6,977 per year (+8.26%) from 2018 to 2019. Extending that straight line projects 119,307 providers in 2023 (-5,669 vs. actual) and 126,284 in 2024 (-24,306 vs. actual).',
      '<strong>Other Care Series &amp; Policy Rules:</strong> Other Medicaid care (101,905 in 2018, 109,087 in 2019, 129,492 in 2023, +18.71% growth from 2019 to 2023) and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    answerHtml: 'When auditing a telehealth rollout by comparing billing providers in 2019 against 2023, a two-year check mixes new pay rules with workforce growth that was already underway. Across <strong>84 months of Medicaid claims (2018 to 2024)</strong>, monthly billing providers for telehealth-eligible services grew from <strong>91,399 in 2019 to 113,638 in 2023 (+22,239 providers, or +24.33%)</strong> [1]. A modeled two-point check overstates the policy jump. That provider list was already adding <strong>6,977 billers per year (+8.26%)</strong> before 2020 [2]. Checking multi-year base slopes next to other care (<strong>+18.71%</strong>) keeps budget teams from over-funding routine trend growth [3].',
    block2: {
      title: 'Two Rulers on the Same Medicaid Series (2018 to 2024)',
      contextTag: 'Mode A Base-Trend Paths on HHS Medicaid Provider Spending (84 Months, Jan 2018 to Dec 2024)',
      ariaLabel: 'Comparison of the raw 2019 to 2023 change in billing providers versus the gap from extending the 2018 to 2019 base trend',
      ruler1: {
        title: 'Ruler 1: Raw Two-Point Change (2019 to 2023)',
        stat: '+22,239 Providers (+24.33%)',
        ariaLabel: 'Mean monthly billing providers rose from 91,399 in 2019 to 113,638 in 2023, a raw change of 22,239 providers or 24.33 percent',
        segments: [
          { cls: 'seg-primary', width: 80, label: '2019 Mean: 91,399' },
          { cls: 'seg-food', width: 20, label: '+22,239 to 113,638' }
        ],
        desc: 'Mean monthly billing providers rose from <strong>91,399</strong> in 2019 to <strong>113,638</strong> in 2023. A two-point check assigns all <strong>+22,239</strong> new billers to post-2019 rules. Yet the count was already rising from <strong>84,422</strong> in 2018. Measured through 2024, the raw gain shrinks to <strong>+10,579 (+11.57%)</strong> after a <strong>-11,660 (-10.26%)</strong> drop in 2024.'
      },
      ruler2: {
        title: 'Ruler 2: Mode A Base-Trend Gap',
        stat: '-5,669 vs. Base Path (2023)',
        ariaLabel: 'A straight line from the 2018 to 2019 base growth of 6,977 providers per year projects 119,307 providers in 2023; the actual 113,638 sits 5,669 providers below that path',
        segments: [
          { cls: 'seg-rest', width: 95, label: 'Actual 2023: 113,638' },
          { cls: 'seg-rent', width: 5, label: '-5,669' }
        ],
        desc: 'The straight-line path extends the 2018 to 2019 pace: 91,399 + 4 &times; 6,977 = <strong>119,307</strong> in 2023. The actual count of 113,638 sits <strong>5,669</strong> below that line (-4.75%). By 2024 the gap reaches <strong>-24,306</strong> (126,284 projected vs. 101,978 actual). A compound +8.26% annual rate gives <strong>-11,911</strong> in 2023. Both paths show how much the result rests on the chosen base trend.'
      }
    },
    table1: {
      title: 'Table 1. Medicaid Billing Providers Across 4 Study Windows',
      subtitle: 'Yearly means of monthly billing providers from HHS Medicaid claims (2018 to 2024) with modeled base-trend paths.',
      caption: 'Table 1 compares monthly Medicaid billing providers across four study windows from 2018 to 2024.',
      cornerLabel: 'Trend Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Counts come from the HHS Medicaid Provider Spending file (84 months, Jan 2018 to Dec 2024). Mode A rows extend the 2018 to 2019 base pace (+6,977 per year or +8.26% per year) through 2023 and 2024.',
      columns: [
        { tag: 'Base Window', tagHighlight: false, title: 'Pre-2020 Base', subtitle: 'Video Care, 2018 to 2019' },
        { tag: 'Peak Window', tagHighlight: true, title: '2023 Peak Window', subtitle: 'Video Care, 2019 to 2023' },
        { tag: 'Late Window', tagHighlight: true, title: '2024 Late Window', subtitle: 'Video Care, 2019 to 2024' },
        { tag: 'Other Care', tagHighlight: false, title: 'Other Medicaid Care', subtitle: 'Non-Video Care, 2018 to 2024' }
      ],
      rows: [
        {
          label: 'Monthly Billing Providers<span class="block text-xs font-normal text-slate-500">Start mean to end mean</span>',
          cells: [
            { val: '84,422 -> 91,399' },
            { val: '91,399 -> 113,638' },
            { val: '91,399 -> 101,978' },
            { val: '101,905 -> 116,690' }
          ]
        },
        {
          label: 'Ruler 1: Raw Two-Point Change<span class="block text-xs font-normal text-slate-500">End mean minus start mean</span>',
          cells: [
            { val: '+6,977 (+8.26%)' },
            { val: '+22,239 (+24.33%)' },
            { val: '+10,579 (+11.57%)' },
            { val: '+14,785 (+14.51%)' }
          ]
        },
        {
          label: 'Mean Gain per Year<span class="block text-xs font-normal text-slate-500">Two-point change per year</span>',
          cells: [
            { val: '+6,977 / yr' },
            { val: '+5,560 / yr' },
            { val: '+2,116 / yr' },
            { val: '+2,464 / yr' }
          ]
        },
        {
          label: 'Straight-Line End Value*<span class="block text-xs font-normal text-slate-500">2019 mean plus yearly base slope</span>',
          modeled: true,
          cells: [
            { val: 'Base slope (ref)' },
            { val: '119,307 (2023)' },
            { val: '126,284 (2024)' },
            { val: '144,997 (2024)' }
          ]
        },
        {
          label: 'Ruler 2: Straight-Line Gap*<span class="block text-xs font-normal text-slate-500">Actual minus straight-line path</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '0 (base ref)', barWidth: 2, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-5,669 (-4.75%)', barWidth: 24, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '-24,306 (-19.25%)', barWidth: 99, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '-28,307 (-19.52%)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Compound-Rate Gap*<span class="block text-xs font-normal text-slate-500">Projected vs. actual at base % rate</span>',
          modeled: true,
          cells: [
            { val: 'Base rate (ref)' },
            { val: '125,549 vs. 113,638 (-11,911)' },
            { val: '135,919 vs. 101,978 (-33,941)' },
            { val: '153,358 vs. 116,690 (-36,668)' }
          ]
        },
        {
          label: 'Total Medicaid Paid<span class="block text-xs font-normal text-slate-500">12-month paid sum</span>',
          cells: [
            { val: '$19.23B -> $23.56B' },
            { val: '$23.56B -> $40.29B' },
            { val: '$23.56B -> $34.93B' },
            { val: '$85.47B -> $145.72B' }
          ]
        },
        {
          label: 'Billing Codes per Month<span class="block text-xs font-normal text-slate-500">Monthly unique code mean</span>',
          cells: [
            { val: '171.0 -> 191.0' },
            { val: '191.0 -> 222.7' },
            { val: '191.0 -> 220.7' },
            { val: '4,424.2 -> 4,518.2' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Base Trends, Budget Tradeoffs &amp; Policy Fit',
      subtitle: 'How checking pre-2020 slopes and other Medicaid care guides budget review.',
      caption: 'Table 2 compares base trends, budget tradeoffs, and next steps across four study windows.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Observed Path in Window',
          cells: [
            { val: 'Monthly billers rose from 84,422 in 2018 to 91,399 in 2019 (+8.26%) before 2020.' },
            { val: 'Counts hit 113,638 in 2023, yet the yearly gain (+5,560) stayed below the 2019 pace.' },
            { val: 'The 2024 mean fell to 101,978 (-10.26%) while late-2024 claims were still pending.' },
            { val: 'Other care rose from 101,905 in 2018 to 129,492 in 2023 and 116,690 in 2024.' }
          ]
        },
        {
          label: 'What Base Trends Show',
          cells: [
            { val: 'Sets the base slope at +6,977 billers per year or +8.26% per year.' },
            { val: 'The +22,239 raw gain sits 5,669 below the straight-line path of 119,307.' },
            { val: 'The +10,579 gain sits 24,306 below the line as redetermination and claim lags mix.' },
            { val: 'Other care grew +18.71% through 2023, matching 77% of the +24.33% video care gain.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'One base year sets every later line, so shifting the start year moves the gap.' },
            { val: 'Crediting all +24.33% to new rules funds growth that tracks the pre-2020 slope.' },
            { val: 'Reading the -10.26% drop in 2024 as a real loss risks cutting funds before claims clear.' },
            { val: 'Budget teams can weigh the 6.29-point gap over other care instead of the raw gain.' }
          ]
        },
        {
          label: 'Next Step to Check',
          policyFit: true,
          cells: [
            { headline: 'Add Earlier Base Years', detail: 'Include pre-2018 months and test more than one base window before scoring pay rules.' },
            { headline: 'Pair With Other Care', detail: 'Compare the +24.33% gain against other care (+18.71%) before crediting policy.' },
            { headline: 'Wait for Full Claims', detail: 'Refresh Nov and Dec 2024 after claims clear to see if the 2024 dip lasts.' },
            { headline: 'Track as Base Benchmark', detail: 'Follow other care each month since it shares enrollment shifts without video pay rules.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Series Scope, Base-Trend Math &amp; Claim Lags',
      notesBullets: [
        '<strong>Data Source (Observed Series):</strong> Monthly counts (telehealth_month_summary.parquet, 168 rows = 84 months &times; 2 care groups, Jan 2018 to Dec 2024) come from the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> file. Each month tracks billing providers, code counts, claims, paid dollars, and members. Yearly provider and code figures are 12-month means. Paid dollars and claims are 12-month sums.',
        '<strong>Mode A Base-Trend Paths:</strong> Straight-line path: path(year) = 91,399 + (year &minus; 2019) &times; 6,977. For 2023, 119,307 vs. 113,638 actual = &minus;5,669. For 2024, 126,284 vs. 101,978 = &minus;24,306. Compound path: path(year) = 91,399 &times; 1.0826^(year &minus; 2019). That yields 125,549 (&minus;11,911) in 2023 and 135,919 (&minus;33,941) in 2024. Other care uses its own 2018 to 2019 change (+7,182, +7.05%). Both paths are Mode A checks.',
        '<strong>Late-2024 Claim Lags:</strong> In the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> series, billing providers drop to 88,364 in Nov 2024 and 47,562 in Dec 2024. Jan to Oct 2024 ranged from 101,691 to 119,937 (mean 108,781, +19.02% vs. 2019). Other care shows the same late-2024 dip (101,476 and 57,878). The 2024 full-year mean therefore mixes Medicaid redetermination with unpaid late-year claims.'
      ]
    },
    synthesis: {
      title: 'How Multi-Year Trends Improve on Two-Point Checks',
      p1: 'Yearly program reviews that compare one pre-policy year against the latest year mix prior workforce growth with the policy change. A simple two-point gap cannot tell whether a rule caused a jump. A multi-year trend may have kept climbing on its old slope, or a broad enrollment wave may have lifted every service line at once.',
      p2: 'Checking the full 2018 to 2024 series sharpens budget review. Billing providers for video care were already growing +8.26% per year before 2020. Other Medicaid care grew +18.71% from 2019 to 2023 next to the +24.33% video care gain. A straight-line path from 2018 to 2019 leaves 2023 at 5,669 providers below trend, and the compound path leaves it 11,911 below. Multi-year base trends thus work best as a check on two-point claims.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A on Observed Series):</strong> Billing provider counts, code counts, claims, paid dollars, and member-months come from the HHS Medicaid Provider Spending file (telehealth_month_summary.parquet, Jan 2018 to Dec 2024). The unit of analysis is care-group-month (2 groups &times; 84 months = 168 rows). The straight-line and compound paths are Mode A trend checks on these observed series.',
      '<strong>Primary Data Sources:</strong> <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a>, <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Medicaid.gov Open Data</a>, <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS T-MSIS Analytic Files Documentation</a>, and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    faqs: [
      {
        question: 'What is a raw pre-post check in health program review?',
        answer: 'A raw pre-post check subtracts one pre-policy year from one post-policy year. It credits the whole gap to the new rule and leaves out ongoing base trends and broad system shifts.'
      },
      {
        question: 'How does the Medicaid series show the limits of a two-point check?',
        answer: 'Monthly billing providers for telehealth-eligible care rose 22,239 (+24.33%) from 2019 to 2023. Yet the count had already grown 6,977 (+8.26%) from 2018 to 2019. Other Medicaid care also rose 18.71% from 2019 to 2023.'
      },
      {
        question: 'What is the first data check to run before using a pre-post number?',
        answer: 'Plot at least 12 to 24 months of pre-policy data to see if the count was already rising or falling. Then compare that path against a service line that did not get the policy change.'
      }
    ],
    related: [
      { slug: 'threat-history-solutions', title: 'Isolating Shared Shocks with Comparison Groups', note: 'Case study comparing video and non-video Medicaid care, 2018 to 2024' },
      { slug: 'identical-data-opposite-policies', title: 'Nominal vs. Cost-Adjusted Medi-Cal Pay', note: 'Case study on how local clinic costs shape care access' },
      { slug: 'parallel-trends-power', title: 'Multi-Year Pre-Policy Trend Checks Across 84 Months', note: 'Case study on pre-policy trend stability in Medicaid billing' }
    ]
  },

  // =========================================================================
  // MODULE #2: selection-into-treatment (Track 1, public)
  // =========================================================================
  {
    slug: 'selection-into-treatment',
    unlisted: true,
    tier: 'public',
    trackEyebrow: 'Track 1: Program Impact &middot; Worker Take-Up &amp; Tax Share (Mode A on ACS &amp; EDD Baselines)',
    pageTitle: 'Selection Into Treatment & CA Paid Leave | CAPHE',
    metaDescription: 'Analyze how California SB 951 wage replacement tiers (90% vs 70%) and CFRA job-protection gaps shape take-up and net transfers across wage quintiles.',
    h1: 'Wage-Tier Replacement Rates and Job Protection Shape Projected Paid Family Leave Take-Up',
    subtitle: 'Modeling how higher pay rates and job protection shift leave claims across low-wage and high-wage workers.',
    endnotes: [
      '<strong>California Paid Family Leave &amp; Workforce Baselines:</strong> <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a> (18.5M covered workers, $1,371.5B taxable wages, 330,000 forecast 2026 PFL claims) and <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019-2023 5-Year Microdata</a>.',
      '<strong>SB 951 Pay Tiers &amp; Tax Rules:</strong> <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC &sect; 3300 &amp; Gov. Code &sect; 12945.2)</a> sets 90% pay for low-wage workers starting Jan 1, 2025 and removes the SDI wage tax cap starting Jan 1, 2024. That yields a +$19.7M yearly net gain for Q1 workers and +$23.0M across Q1 and Q2.',
      '<strong>Expected Take-Up vs. Full-Use Cap:</strong> <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a> models 35% added-week take-up at $623.7M in yearly gross cost and $422.0M in net worker pay after 30% employer offset, versus $1,910.0M at 100% take-up.'
    ],
    answerHtml: 'When sizing a Paid Family Leave expansion from 8 to 12 weeks, using one statewide claim rate misprices fund reserves because low-wage and high-wage workers claim leave at different rates. Across California\'s <strong>18.5 million covered workers</strong>, pairing a 12-week cap with <strong>90% low-wage pay replacement</strong> delivers <strong>$422.0M per year in modeled net worker pay</strong> and a <strong>+$19.7M yearly net gain</strong> for the lowest-paid fifth of workers [1]. Assuming 100% of eligible claimants take every week overstates yearly fund outlays by <strong>3.1 times ($1,910.0M vs. $623.7M)</strong> because job rules and firm top-offs shape take-up [2]. Modeling take-up across all five wage groups prices the payroll tax shift at <strong>+0.045 percentage points</strong> [3].',
    block2: {
      title: 'Two Rulers on Leave Take-Up &amp; Fund Cost (8-to-12 Week PFL Expansion)',
      contextTag: 'Mode A Model on Observed Baselines: EDD 2025-2026 Claims &amp; ACS 5-Year Wage Groups (N = 18.5M Workers)',
      ariaLabel: 'Comparison of 100% full-use cap take-up versus expected 35% worker take-up and SB 951 net gains',
      ruler1: {
        title: 'Ruler 1: Full-Use Cap (100% Take-Up, 0% Firm Offset)',
        stat: '$1,910.0M Outlay (396K Claims)',
        ariaLabel: 'Assuming 100% take-up and 20% new claims projects 396,000 claims and $1,910.0M in yearly gross outlays',
        segments: [
          { cls: 'seg-rent', width: 100, label: '100% Cap: $1,910.0M Gross Outlay / Yr (396,000 Claims)' }
        ],
        desc: 'Unit: modeled claimants and yearly SDI fund totals. Suppose every modeled claimant took all 4 added weeks (100% take-up) and new claims rose 20% (<strong>396,000 claims</strong>) with zero firm offset. Yearly gross SDI outlays would hit <strong>$1,910.0M</strong>. That would push the modeled SDI reserve to a <strong>-$0.58B (-3.0%) deficit</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: Expected Choice &amp; SB 951 Net Share (35% Take-Up)',
        stat: '$623.7M Gross | +$19.7M to Q1',
        ariaLabel: 'Expected 35% take-up yields $623.7M gross outlay ($422.0M net after 30% firm offset) and +$19.7M net gain for Q1 workers',
        segments: [
          { cls: 'seg-primary', width: 68, label: 'Net Worker Pay $422.0M (67.7%)' },
          { cls: 'seg-food', width: 29, label: '30% Firm Offset $180.8M' },
          { cls: 'seg-gross', width: 3, label: 'Admin' }
        ],
        desc: 'Unit: modeled claimants, yearly SDI fund totals, and wage groups. Expected take-up (<strong>35.0%</strong> of added weeks, <strong>12.0%</strong> new claims = <strong>369,600 claims</strong>) costs <strong>$623.7M/yr</strong> in gross SDI outlay. Net worker gain is <strong>$422.0M</strong> after 30% firm offset. A <strong>+0.045 pp</strong> SDI tax shift funds the plan and sends a <strong>+$19.7M yearly net gain</strong> to Q1 (<$25K) workers.'
      }
    },
    table1: {
      title: 'Table 1. Leave Take-Up, Tax Share &amp; Net Gains Across Wage Groups',
      subtitle: 'How SB 951 pay rates (90% vs. 70%) and uncapped SDI payroll taxes shape net gains across California wage tiers.',
      caption: 'Table 1 shows modeled Paid Family Leave expansion costs and net gains across worker wage groups.',
      cornerLabel: 'Wage &amp; Tax Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Wage group shares come from U.S. Census ACS 5-year microdata (18.5M SDI-covered workers) anchored to the EDD May 2026 DI Fund Forecast (330,000 baseline claims, $1,371.5B taxable wages). Mode A rows model a 12-week PFL expansion at 35% added-week take-up.',
      columns: [
        { tag: 'Wage Group 1 (<$25K)', tagHighlight: true, title: 'Lowest Wage Group', subtitle: 'Mean Wage $18K (25% of Workers)' },
        { tag: 'Wage Group 2 ($25K-$45K)', tagHighlight: true, title: 'Second Wage Group', subtitle: 'Mean Wage $35K (22% of Workers)' },
        { tag: 'Wage Groups 3-4 ($45K-$110K)', tagHighlight: false, title: 'Middle Wage Groups', subtitle: '38% of Covered Workers' },
        { tag: 'Wage Group 5 ($110K+)', tagHighlight: false, title: 'Top Wage Group', subtitle: 'Mean Wage $165K (15% of Workers)' }
      ],
      rows: [
        {
          label: 'SB 951 Weekly Pay Rate<span class="block text-xs font-normal text-slate-500">Starts Jan 1, 2025 ($1,765/wk cap in 2026)</span>',
          cells: [
            { val: '90% of weekly wage' },
            { val: '90% of weekly wage' },
            { val: '90% (Mid) to 70% (Upper-Mid)' },
            { val: '70% (capped at $1,765/wk)' }
          ]
        },
        {
          label: 'Share of Covered Workers<span class="block text-xs font-normal text-slate-500">18.5M workers ($1,371.5B wage base)</span>',
          cells: [
            { val: '25.0% of workers' },
            { val: '22.0% of workers' },
            { val: '38.0% of workers' },
            { val: '15.0% of workers' }
          ]
        },
        {
          label: 'Share of Added SDI Tax*<span class="block text-xs font-normal text-slate-500">Uncapped employee tax (+0.045 pp to 1.345%)</span>',
          modeled: true,
          cells: [
            { val: '7.0% (+$43.7M tax)' },
            { val: '12.0% (+$74.8M tax)' },
            { val: '42.5% (+$264.7M tax)' },
            { val: '38.6% (+$240.5M tax)' }
          ]
        },
        {
          label: 'Share of Added PFL Pay*<span class="block text-xs font-normal text-slate-500">369,600 modeled claims (+39,600 new claims)</span>',
          modeled: true,
          cells: [
            { val: '15.4% (+$63.4M pay)' },
            { val: '19.0% (+$78.1M pay)' },
            { val: '45.3% (+$186.4M pay)' },
            { val: '20.2% (+$83.0M pay)' }
          ]
        },
        {
          label: 'Net Yearly Transfer (Pay Minus Tax)*<span class="block text-xs font-normal text-slate-500">Modeled yearly total per wage group</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '+$19.7M Net Gain', barWidth: 13, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '+$3.3M Net Gain', barWidth: 2, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-$78.2M Net Tax', barWidth: 50, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-$157.5M Net Tax', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Main Take-Up Factor<span class="block text-xs font-normal text-slate-500">Rule shaping weeks 9 to 12</span>',
          cells: [
            { val: '90% pay + CFRA gap' },
            { val: 'Cash need + firm size >=5' },
            { val: 'Partial firm top-off' },
            { val: '30% to 50% firm offset' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Take-Up Rules, Firm Offsets &amp; Policy Fit',
      subtitle: 'How worker take-up shapes who gains from paid leave and what the state fund pays.',
      caption: 'Table 2 compares take-up drivers, firm offsets, and policy rules across worker wage groups.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Cash &amp; Job-Rule Factor',
          cells: [
            { val: 'At the old 60% pay rate, low-wage workers could not afford a 40% pay cut.' },
            { val: 'CFRA protects jobs for 12 weeks at firms with 5+ staff, but PFL pays for 8 weeks.' },
            { val: 'Middle-wage workers weigh 70% to 90% PFL pay against sick days and home bills.' },
            { val: 'High-wage staff often get private firm leave that tops off or replaces state PFL pay.' }
          ]
        },
        {
          label: 'How Group Take-Up Shifts the Model',
          cells: [
            { val: 'Cash limits show why low-wage workers took shorter leave before the 90% pay tier.' },
            { val: 'Group take-up reflects job rules in small firms that a flat 100% cap leaves out.' },
            { val: 'Adding 12.0% new claims (+39,600 claims) captures higher use when pay and weeks rise.' },
            { val: 'Splitting $623.7M gross cost from $422.0M net worker pay accounts for 30% firm offset.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Adding 4 weeks without the 90% pay floor would shift added pay toward high earners.' },
            { val: 'Closing the 4-week gap between PFL and CFRA costs +$623.7M/yr (+0.045 pp tax).' },
            { val: 'The $1,765 weekly cap limits high-wage cost while keeping 90% pay below $63,000.' },
            { val: 'Removing the wage tax cap means top earners fund 38.6% (+$240.5M) and claim 20.2%.' }
          ]
        },
        {
          label: 'Best-Fit Policy Rule',
          policyFit: true,
          cells: [
            { headline: 'Pair 90% Pay With Clinic Outreach', detail: 'Link 90% pay with WIC and prenatal clinics so low-wage families claim their +$19.7M gain.' },
            { headline: 'Match 12-Week PFL to CFRA Rules', detail: 'Align 12-week PFL pay with 12-week CFRA job protection to close the 4-week unpaid gap.' },
            { headline: 'Split Gross Fund Cost From Net Gain', detail: 'Budget reserves for $623.7M gross cost while scoring worker gains on $422.0M net pay.' },
            { headline: 'Keep Uncapped SDI Tax Base', detail: 'Use the uncapped $1,371.5B wage base so a 4-week expansion adds +0.045 pp in tax.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Model Inputs, Firm Offset Math &amp; State Benchmarks',
      notesBullets: [
        '<strong>Mode A Model Disclosure:</strong> Individual EDD tax files are private. Group shares across Q1 to Q5 wage tiers are modeled with <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS 2019-2023 5-Year PUMS</a> wage data (18.5M covered workers). Totals are anchored to <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD May 2026 DI Fund Forecast</a> baselines (330,000 forecast 2026 PFL claims, $1,165 weekly pay, and $1,371.5B taxable wages).',
        '<strong>Firm Offset vs. Fund Cash Outlay:</strong> Private firm offset (50% Low, 30% Expected, 0% Cap) lowers <em>net added worker pay</em> ($422.0M Expected vs. $602.8M gross pay) when firms coordinate private paid leave with state PFL. Yet the state fund still pays the full <em>gross SDI cash outlay</em> ($623.7M with $21.1M admin).',
        '<strong>Peer State Rates:</strong> California\'s 90% low-wage pay tier under SB 951 matches Washington and Colorado (90%). It sits above New Jersey (85%) and New York (67%).'
      ]
    },
    synthesis: {
      title: 'Why Worker Take-Up Shapes Both Causal Models and Tax Fairness',
      p1: 'In program studies, selection into treatment means people who enroll differ from those who do not. For health economists and state budget leads, worker choice is also the policy path itself. California gives 12 weeks of unpaid job protection under CFRA, yet PFL pays for only 8 weeks. Low-wage workers without savings drop out at week 9, while salaried staff with firm top-offs take all 12 weeks.',
      p2: 'Modeling worker take-up next to tax shares avoids two budget errors. It avoids over-budgeting for a 100% cap ($1,910.0M/yr) and avoids assuming leave expansions only help top earners. SB 951 raised low-wage pay to 90% and removed the wage tax cap on high earners. At 35% expected take-up ($623.7M/yr gross cost), the plan scores +0.095 on progressivity and sends +$23.0M in net gains to the bottom two wage groups.'
    },
    interactive: {
      badge: 'Worker Take-Up Comparison',
      title: 'Compare How Worker Take-Up &amp; Firm Offset Shift Annual PFL Outlays',
      subtitle: 'Comparing modeled yearly SDI outlays and net worker gains across low, expected, and cap scenarios.',
      options: [
        {
          label: 'Scenario 1 · Low Bound',
          headline: '25% Added Take-Up | 50% Offset',
          metric: '$417.8M Gross | $201.8M Net',
          desc: 'Modeled yearly claims hit 346,500 (+0.030 pp tax shift), while firm offset halves net added worker pay.'
        },
        {
          label: 'Scenario 2 · Expected Choice',
          headline: '35% Added Take-Up | 30% Offset',
          metric: '$623.7M Gross | $422.0M Net',
          desc: 'Modeled yearly claims hit 369,600 (+0.045 pp tax shift) and send +$23.0M net to the lowest two wage groups.'
        },
        {
          label: 'Scenario 3 · Full-Use Cap',
          headline: '100% Added Take-Up | 0% Offset',
          metric: '$1,910.0M Gross | -$0.58B Deficit',
          desc: 'A 100% take-up stress test triples yearly gross outlay and pushes SDI cash reserves into a -3.0% deficit.'
        }
      ],
      notesTitle: 'Scenario Math, 6-Year Outlays &amp; SDI Reserve Notes',
      notesBullets: [
        '<strong>Scenario 1 Low Bound (25% Added Weeks / +5% New Claims):</strong> Adds +16,500 new claims (from 330,000 base to 346,500/yr). That creates <strong>$417.8M/yr</strong> in gross SDI outlay (<strong>$2.688B</strong> over 6 years, 1.33% SDI tax rate) and <strong>$201.8M/yr</strong> in net worker pay after 50% firm offset.',
        '<strong>Scenario 2 Expected Choice (35% Added Weeks / +12% New Claims):</strong> Adds +39,600 new claims (369,600/yr total). That creates <strong>$623.7M/yr</strong> in gross SDI outlay (<strong>$4.013B</strong> over 6 years, 1.345% SDI tax rate) and <strong>$422.0M/yr</strong> in net worker pay after 30% firm offset.',
        '<strong>Scenario 3 Full-Use Cap (100% Added Weeks / +20% New Claims):</strong> Adds +66,000 new claims (396,000/yr total). Gross outlay rises to <strong>$1,910.0M/yr</strong> (<strong>$12.286B</strong> over 6 years) and pushes the 2026 SDI reserve to a <strong>-$0.58B (-3.0%)</strong> deficit.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Model on Observed Baselines):</strong> Base 2025 PFL claims (325,055 yearly claims), weekly pay ($1,090), and SDI fund balance ($3.011B) are observed EDD records. Forecast 2026 baselines (330,000 claims, $1,165 weekly pay, $1,371.5B taxable wages) and wage-group shares are Mode A projections from the <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a>.',
      '<strong>Primary Data Sources:</strong> <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Employment Development Department (EDD) May 2026 Disability Insurance Fund Forecast</a>, <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Data Series</a>, <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC § 3300 &amp; Gov. Code § 12945.2)</a>, and <a href="https://www.census.gov/programs-surveys/acs/microdata.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census Bureau ACS 2019-2023 5-Year Microdata</a>.'
    ],
    faqs: [
      {
        question: 'Why does PFL take-up differ from total covered workers in California?',
        answer: 'All 18.5 million SDI-covered workers pay into the fund. Yet low-wage workers face cash limits when pay replacement sits below 90%. They also face job-protection gaps when PFL pays for 8 weeks while CFRA protects jobs for 12 unpaid weeks.'
      },
      {
        question: 'How did Senate Bill 951 shift tax and pay shares in California Paid Family Leave?',
        answer: 'SB 951 removed the SDI wage tax cap on January 1, 2024, so high earners pay tax on all wages. It then raised pay replacement to 90% for low-wage workers on January 1, 2025. Under a 12-week plan, Q1 (<$25K) workers gain +$19.7M net per year.'
      },
      {
        question: 'How does private firm offset affect SDI reserves versus worker income?',
        answer: 'When firms use state PFL pay to offset private paid leave (30% in the Expected case), net new cash to workers drops from $602.8M to $422.0M. Yet the state SDI fund still pays out the full $623.7M gross outlay.'
      }
    ],
    related: [
      { slug: 'threat-maturation-solutions', title: 'Multi-Year Trend Splits on PFL & SB 951', note: 'Case study separating base PFL claim growth from SB 951 shifts' },
      { slug: 'budget-impact', title: 'Budget Impact & SDI Reserve Floor Rules', note: 'Case study on 2025-2030 SDI reserve floors under PFL plans' },
      { slug: 'collider-bias', title: 'Filtered Subsets & Full-Pool Calibration', note: 'Case study on active-biller filters and full-pool base rates' }
    ]
  },

  // =========================================================================
  // MODULE #3: threat-regression-to-mean (Track 1, community)
  // =========================================================================
  {
    slug: 'threat-regression-to-mean',
    tetsCompanion: [
      {
        visibleLabel: 'Public Health Spending Regime Analysis',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'From 1992 to 2019 across 3,142 US counties, each 10 dollars per capita reduces Years of Potential Life Lost by 0.78 per 100,000 residents, versus +1.52 from 2020 to 2022.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 1: Program Impact &middot; Small-County Swings &amp; Pooled Means (Mode A on Observed County Populations)',
    pageTitle: 'Regression to the Mean in County Health | CAPHE',
    metaDescription: 'Learn why targeting California rural counties after a single-year mortality spike confuses random small-population noise with program impact.',
    h1: 'Multi-Year Pooled Baselines Separate Persistent Rural Mortality From Projected Small-County Bounce-Back',
    subtitle: 'Separating lasting county health gains from modeled regression to the mean after a one-year spike.',
    endnotes: [
      '<strong>California 21-Year County Public Health Panel (2003-2023):</strong> <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a> and <a href="https://wonder.cdc.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC WONDER</a> (57 counties, N = 1,197 county-years; -8.11 deaths/100K per $10/capita in small rural counties and -9.16 statewide).',
      '<strong>Small-County Headcounts &amp; One-Year Swings:</strong> <a href="https://dof.ca.gov/forecasting/demographics/estimates/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance E-1 Population Estimates</a> and <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH County Health Status Profiles</a>. In Alpine County (1,204 residents), 1 death shifts the rate by 83.1 per 100,000, and 71.5% of a -28.4 per 100,000 post-spike drop is bounce-back to the multi-year mean.',
      '<strong>Pooled Means &amp; Grant Targeting Method:</strong> <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology</a> (3-to-5-year pooled baselines and Empirical Bayes shrinkage weights).'
    ],
    answerHtml: 'When targeting multi-year rural health grants to whichever small counties had the highest one-year death rate, funding chases brief one-year spikes instead of lasting need. Across <strong>21 years of California county records (2003 to 2023)</strong>, steady public health funding averts <strong>8.11 deaths per 100,000 residents per $10 per person</strong> in small rural counties and <strong>9.16 statewide</strong> [1]. Ranking small counties on one year of data overstates next-year gains through modeled regression to the mean. Just <strong>1 death in Alpine County (1,204 residents)</strong> swings the rate by <strong>83.1 per 100,000</strong> and accounts for <strong>71%</strong> of a <strong>-28.4 per 100,000</strong> bounce-back [2]. Funding rural grants on 3-to-5-year pooled averages sends dollars to lasting local need [3].',
    block2: {
      title: 'Two Rulers After a Rural County Death-Rate Spike (One-Year Bounce-Back vs. 21-Year Panel)',
      contextTag: 'Mode A Rate Noise &amp; Shrinkage on DOF County Headcounts; Source Estimates From the 57-County, 21-Year LHA Panel (2003-2023, N = 1,197)',
      ariaLabel: 'Comparison of the raw post-spike one-year county death rate drop versus the 21-year, 57-county panel estimate',
      ruler1: {
        title: 'Ruler 1: Mode A Split of a 1-Year Drop After a Top-Decile Spike',
        stat: '-28.4 / 100K (71% Noise)',
        ariaLabel: 'Selecting small rural counties after a 90th-percentile spike shows an apparent -28.4 per 100,000 drop with 71% from mean reversion',
        segments: [
          { cls: 'seg-food', width: 71, label: 'Mean Reversion: -20.3 / 100K (71.5%)' },
          { cls: 'seg-primary', width: 29, label: 'Panel Effect -8.11' }
        ],
        desc: 'Small rural counties have small headcounts (Trinity 16,060; Mariposa 17,131; Colusa 22,280). Mode A 1-year binomial standard errors on the county rate reach <strong>&plusmn;57.9 to &plusmn;68.3 per 100,000</strong>. Picking counties right after a 90th-percentile spike builds in <strong>-20.3 per 100,000</strong> of automatic bounce-back.'
      },
      ruler2: {
        title: 'Ruler 2: Observed 21-Year Panel Source Estimates',
        stat: '-8.11 Small | -9.16 Full Panel',
        ariaLabel: 'Published 21-year panel estimates: -8.11 deaths per 100,000 per $10 per capita in small counties and -9.16 across all 57 counties',
        segments: [
          { cls: 'seg-primary', width: 89, label: 'Small-County 21-Yr Panel: -8.11 / 100K' },
          { cls: 'seg-rest', width: 11, label: 'Full 57-County: -9.16' }
        ],
        desc: 'Observed source estimates come from the 57-county, 21-year panel (2003 to 2023, <strong>N = 1,197</strong> county-years). The model finds <strong>-8.11 deaths per 100,000</strong> per $10/person in small counties and <strong>-9.16</strong> statewide (&plusmn;1.11 margin). These figures are published panel results, not Mode A projections.'
      }
    },
    table1: {
      title: 'Table 1. Rate Swings, Shrinkage Weights &amp; Panel Effects Across 4 County Groups',
      subtitle: 'Observed county headcounts and 21-year panel estimates paired with modeled one-year rate swings and shrinkage weights.',
      caption: 'Table 1 compares four California county size groups on single-death rate swings, shrinkage weights, and 21-year health effects.',
      cornerLabel: 'Swing &amp; Panel Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Frontier and small rural rate swings and shrinkage weights are Mode A calculations on California DOF county headcounts. The small-county (-8.11, p &lt; 0.05) and full-panel (-9.16, SE = 1.11, p &lt; 0.001) results come from the 57-county, 21-year CAPHE LHA panel (N = 1,197 county-years, Lewbel 2012 IV). In the Full 57-County column, &plusmn;1.38 per 100K is the Mode A 1-year Poisson rate SD at 750 per 100,000 across 39,538,223 residents. The &plusmn;1.11 per 100K margin in the effect row is the panel SE of the -9.16 coefficient.',
      columns: [
        { tag: 'Observed Pop < 10K', tagHighlight: true, title: 'Frontier Rural Group', subtitle: 'Alpine (1,204) to Modoc (8,700)' },
        { tag: 'Observed Pop 15K-25K', tagHighlight: false, title: 'Small Rural Group', subtitle: 'Trinity (16,060) to Colusa (22,280)' },
        { tag: 'Small Stratum Panel', tagHighlight: true, title: 'Small-County 21-Yr Pool', subtitle: '21-Year Pooled Subsample' },
        { tag: 'Full 57-County Panel', tagHighlight: false, title: 'Full 57-County Pool', subtitle: '39.5M Pop (2003 to 2023)' }
      ],
      rows: [
        {
          label: 'County Resident Count<span class="block text-xs font-normal text-slate-500">CA Dept. of Finance E-1 count</span>',
          cells: [
            { val: '1,204 (Alpine) to 8,700 (Modoc)' },
            { val: '16,060 (Trinity) to 22,280 (Colusa)' },
            { val: '< 100,000 rural group' },
            { val: '39,538,223 (57 counties)' }
          ]
        },
        {
          label: 'Rate Swing From 1 Death<span class="block text-xs font-normal text-slate-500">100,000 / County Residents</span>',
          cells: [
            { val: '11.49 to 83.06 per 100K' },
            { val: '4.49 to 6.23 per 100K' },
            { val: '1.00 to 6.23 per 100K' },
            { val: '0.01 (LA) to 0.05 (SCC)' }
          ]
        },
        {
          label: '1-Year Typical Rate Swing*<span class="block text-xs font-normal text-slate-500">Yearly random swing at 750/100K base</span>',
          modeled: true,
          cells: [
            { val: '±92.9 to ±249.6 per 100K' },
            { val: '±57.9 to ±68.3 per 100K' },
            { val: '±27.4 per 100K (pooled)' },
            { val: '±1.38 per 100K (state pool)' }
          ]
        },
        {
          label: 'Shrinkage Weight to Mean (B_i)*<span class="block text-xs font-normal text-slate-500">Share pulled toward regional mean</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '89.0% pulled (0.89)', barWidth: 89, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '68.0% pulled (0.68)', barWidth: 68, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '24.0% pulled (21-yr)', barWidth: 24, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '6.0% pulled (weighted)', barWidth: 6, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Deaths Averted per $10/Person<span class="block text-xs font-normal text-slate-500">Deaths averted per 100,000 residents</span>',
          highlight: true,
          cells: [
            { val: 'Unpowered in 1-yr cut', textColor: 'text-rose-800' },
            { val: 'Noise swamps 1-yr cut', textColor: 'text-amber-800' },
            { val: '-8.11 / 100K (21-yr pool)', barWidth: 89, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-9.16 / 100K (±1.11 margin)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Drop-One-County Shift<span class="block text-xs font-normal text-slate-500">Spread across 57 drop-one checks</span>',
          cells: [
            { val: 'High 1-yr outlier swing' },
            { val: 'High 1-yr rank churn' },
            { val: '±0.052 shift (57 checks)' },
            { val: '±0.052 shift (46 of 47)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Small-County Context, Grant Tradeoffs &amp; Policy Fit',
      subtitle: 'How state grant teams and rural health leads avoid shifting grants on one-year random swings.',
      caption: 'Table 2 compares small-county rate swings, pooled baselines, grant tradeoffs, and funding rules.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Local County Context',
          cells: [
            { val: 'In frontier counties (1,204 to 8,700 residents), one crash or flu cluster shifts the rate by 11 to 83 per 100K.' },
            { val: 'Small rural counties (16,060 to 22,280 residents) record 120 to 170 total deaths per year.' },
            { val: 'Small counties pooled across 21 budget years rely on public health staff as the main care net.' },
            { val: 'All 57 county health departments are tracked across 21 years (1,197 county-years).' }
          ]
        },
        {
          label: 'What Multi-Year Pools Add',
          cells: [
            { val: 'Pooled baselines keep tiny counties from flipping between top-spike and top-drop ranks each year.' },
            { val: 'A multi-year mean sets the base rate, so a +60/100K one-year jump is weighed against history.' },
            { val: 'Pooling years spots the -8.11 effect that one-year noise (±58 to ±250) swamps.' },
            { val: 'Raw cross-county averages (+0.18) mix long-run illness load with outbreak grants.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Tying base grants to 1-year death ranks destabilizes rural staff after a normal bounce-back.' },
            { val: 'Cutting a rural program after 2 or 3 extra deaths in one year disrupts clinic teams.' },
            { val: 'Small counties gain nearly the same life-saving return (-8.11) as the state (-9.16) over time.' },
            { val: 'State grant rules can pair per-person funds with a fixed base floor for small counties.' }
          ]
        },
        {
          label: 'Best-Fit Funding Rule',
          policyFit: true,
          cells: [
            { headline: 'Use 5-Year Means &amp; Shrinkage', detail: 'Pull 1-year frontier rates by 0.89 toward regional medians before ranking counties for grants.' },
            { headline: 'Compare Multi-Year Rural Pools', detail: 'Score small rural grants on 3-to-5-year pooled rates matched against rural peers.' },
            { headline: 'Anchor Rural Cases to -8.11', detail: 'Use the 21-year small-county estimate (-8.11 deaths/100K per $10/person) in board briefs.' },
            { headline: 'Fund Core Staff Over 1-Year Spikes', detail: 'Use the full-panel -9.16 estimate ($109,000/life saved, 125:1 return) for multi-year base budgets.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Rate Noise Formula &amp; Drop-One-County Check',
      notesBullets: [
        '<strong>Small-County Noise Math (Mode A on DOF Populations):</strong> At a base death rate of &mu; = 750 per 100,000 (0.0075), the 1-year Poisson SD per 100,000 is &sigma; = 100,000 &times; &radic;(0.0075 / N_pop). That equals &plusmn;249.6 per 100,000 in Alpine (N = 1,204), &plusmn;92.9 in Modoc (N = 8,700), and &plusmn;68.3 in Trinity (N = 16,060).',
        '<strong>Drop-One-County Check (Observed Source Estimates):</strong> Across all 57 counties over 2003 to 2023 (N = 1,197), dropping one county at a time yields a slope SD of just <strong>0.052</strong>. Rural outliers do not skew the <strong>-9.16</strong> panel result (<a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE LHA Methodology</a>).',
        '<strong>Panel Model Source:</strong> The -8.11 (small-county group) and -9.16 (full 57-county panel) estimates come from the CAPHE LHA panel using <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel (2012)</a> instruments over 2003 to 2023 (N = 1,197 county-years). They are reported here as published source estimates.'
      ]
    },
    synthesis: {
      title: 'Why Base Funding Beats Chasing One-Year Spikes',
      p1: 'Regression to the mean is a common hurdle in county grant design. Suppose an agency ranks California\'s 58 counties on one year of death data and sends short-term grants to the top tenth. Small rural counties under 25,000 residents top the list when a few random deaths swing their rate per 100,000 by 50 to 250 points. Next year, the rate drops back toward its long-run mean (-28.4 per 100,000) even without a program effect.',
      p2: 'Health economics fixes this funding problem in two steps. First, for grant targeting, Empirical Bayes shrinkage and 3-to-5-year pooled means pull noisy small-county rates toward regional norms. Second, for impact review, 21-year panel models across all 57 counties (N = 1,197 county-years) show that steady public health funding in small counties averts 8.11 deaths per 100,000 per $10/person, close to the statewide 9.16 result.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A on County Headcounts + Observed Panel Estimates):</strong> County resident counts (Alpine 1,204 to Los Angeles 9,721,138), the small-county IV estimate (-8.11), the full-panel IV estimate (-9.16, SE = 1.11, N = 1,197), and the drop-one-county SD (0.052) are observed values in the CAPHE LHA corpus. One-year Poisson noise SDs, the bounce-back share, and shrinkage weights (B_i) are Mode A calculations on those county headcounts.',
      '<strong>Primary Data Sources:</strong> <a href="https://dof.ca.gov/forecasting/demographics/estimates/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance (DOF) E-1 Population Estimates</a>, <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Public Health (CDPH) Vital Statistics Death Statistical Master Files (2003-2023)</a>, <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller\'s Office County Financial Transactions Reports</a>, and <a href="https://doi.org/10.1002/hec.2953" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown (2014, Health Economics)</a>.'
    ],
    faqs: [
      {
        question: 'Why do small rural counties sit at the top and bottom of one-year death rankings?',
        answer: 'Death rates are scaled per 100,000 residents. One death in Alpine County (1,204 residents) moves the rate by 83.06 per 100,000. One death in Los Angeles County (9.72 million residents) moves the rate by 0.01 per 100,000.'
      },
      {
        question: 'How does regression to the mean skew pre-post reviews of one-time grants?',
        answer: 'When counties get grants because they had a top-decile death spike in Year 1, that peak includes random upward noise. In Year 2, the random error averages zero and creates a modeled -20.3 per 100,000 bounce-back even with zero program effect.'
      },
      {
        question: 'What does the 57-county panel show for public health funding in small counties?',
        answer: 'Across 21 years (2003 to 2023), the published IV panel model links every $10 per person in local public health funding to 8.11 fewer deaths per 100,000 in small counties, compared with 9.16 statewide.'
      }
    ],
    related: [
      { slug: 'p-hacking-multiple-testing', title: 'Multiple Testing & Small-Group Swings', note: 'Case study on why small county cells trigger false alerts' },
      { slug: 'observational-to-experimental', title: 'From Simple Avg (+0.18) to 21-Year Budget Model (-9.16)', note: 'Case study on the 57-county California public health panel' },
      { slug: 'before-after-trap', title: 'Evaluating Pre-Post Changes vs. Base Trends', note: 'Case study on the 2018-2019 base trend in Medicaid billing providers' }
    ]
  },

  // =========================================================================
  // MODULE #4: threat-history-solutions (Track 1, community)
  // =========================================================================
  {
    slug: 'threat-history-solutions',
    tetsCompanion: [
      {
        visibleLabel: 'When Difference-in-Differences Fits',
        title: 'Using difference-in-differences in practice',
        url: 'https://tooearlytosay.com/research/methodology/when-to-use-did/',
        claimCovered: 'When a comparison group can stand in for the treated group, which assumptions matter, and worked cases labeled by whether their materials are public or article-reported.'
      },
      {
        visibleLabel: 'Medicaid Provider Spending File Guide',
        title: 'What 238 Million Medicaid Billing Rows Can Support',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
        claimCovered: 'Row grain of the HHS Medicaid provider-spending file (aggregated billing cells by provider, procedure code, and month) and its suppression rules for multi-period comparisons.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 1: Program Impact &middot; Two-Group Checks &amp; Shared Shocks (Mode A on HHS Medicaid Provider Spending)',
    pageTitle: 'Difference-in-Differences & History Shocks | CAPHE',
    metaDescription: 'Difference-in-Differences on telehealth-eligible vs. other Medicaid billing providers (2018-2024) separates shared shocks from service-specific change.',
    h1: 'Unaffected Comparison Groups Separate Program-Specific Provider Growth From System-Wide Enrollment Surges',
    subtitle: 'Comparing treated and comparison care lines to separate modeled policy shifts from broad enrollment waves.',
    endnotes: [
      '<strong>Two-Group Medicaid Provider Spending Panel (2018-2024):</strong> <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a> monthly counts (84 months). Billing providers for telehealth-eligible care grew +24.33% (91,399 to 113,638). Other Medicaid care grew +18.71% (109,087 to 129,492), leaving a +5.62 pp net gap through 2023 and +4.60 pp through 2024.',
      '<strong>Pre-2020 Base Trend Check (2018-2019):</strong> Billing providers for video care grew +8.26% (84,422 to 91,399) versus +7.05% (101,905 to 109,087) for other care, a +1.21 pp yearly pre-2020 gap.',
      '<strong>Medicaid Continuous Coverage &amp; Telehealth Rules:</strong> <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS T-MSIS Analytic Files Documentation</a> and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    answerHtml: 'When evaluating a county Medi-Cal service rollout by tracking only enrolled clinics, a single-group review credits statewide enrollment waves to the local pilot. Comparing telehealth-eligible Medicaid services against other Medicaid care across <strong>84 months (2018 to 2024)</strong> isolates a modeled net <strong>+5.62 percentage point provider gain through 2023</strong> and <strong>+4.60 percentage points through 2024</strong> [1]. A single-group pre-post check credits all <strong>+24.33%</strong> growth to telehealth without subtracting the <strong>+18.71%</strong> enrollment wave that lifted other care at the same time [2]. Pairing the two-group check with the <strong>+1.21-point</strong> pre-2020 base gap bounds the budget forecast [3].',
    block2: {
      title: 'Two Rulers on Billing Provider Growth (2019 Base vs. 2023 Peak)',
      contextTag: 'Mode A Two-Group Check on HHS Medicaid Provider Spending (84 Months, Jan 2018 to Dec 2024)',
      ariaLabel: 'Comparison of the single-group change in billing providers versus the two-group gap net of other Medicaid care',
      ruler1: {
        title: 'Ruler 1: Single-Group Pre-Post Change (Includes Shared Medicaid Waves)',
        stat: '+22,239 Providers (+24.33%)',
        ariaLabel: 'Billing providers rose 22,239, or 24.33 percent, from 2019 to 2023 before subtracting the change shared with other Medicaid care',
        segments: [
          { cls: 'seg-gross', width: 77, label: 'Matches Other Care Growth (+18.71%)' },
          { cls: 'seg-primary', width: 23, label: 'Net Gap (+5.62 pp)' }
        ],
        desc: 'Video care in Medicaid averaged <strong>91,399</strong> monthly billing providers in 2019 and <strong>113,638</strong> in 2023 (<strong>+22,239</strong>, <strong>+24.33%</strong>). That raw jump mixes broad enrollment growth, stay-enrolled rules, and any video pay shift into one count.'
      },
      ruler2: {
        title: 'Ruler 2: Mode A Two-Group Gap vs. Other Medicaid Care',
        stat: '+5.62 pp (2023); +4.60 pp (2024)',
        ariaLabel: 'Subtracting the 18.71 percent other-care change yields a 5.62 percentage point net gap through 2023 and 4.60 points through 2024',
        segments: [
          { cls: 'seg-primary', width: 55, label: '2019 to 2023: +5.62 pp' },
          { cls: 'seg-rest', width: 45, label: '2019 to 2024: +4.60 pp' }
        ],
        desc: 'In the Mode A two-group check, subtracting the other-care gain (<strong>+18.71%</strong>) leaves <strong>+5.62 pp</strong> (24.33 &minus; 18.71) through 2023 and <strong>+4.60 pp</strong> (11.57 &minus; 6.97) through 2024. The 2018 to 2019 growth gap was already <strong>+1.21 pp</strong> (8.26 &minus; 7.05). Part of the post-2019 gap may continue that earlier trend.'
      }
    },
    table1: {
      title: 'Table 1. Two-Group Medicaid Provider Panel Across 4 Study Windows (2018 to 2024)',
      subtitle: 'Yearly means of monthly billing providers from HHS Medicaid claims with modeled two-group gaps and base-trend checks.',
      caption: 'Table 1 compares treated video care and other Medicaid care across a pre-2020 base and three post-2019 windows.',
      cornerLabel: 'Two-Group Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Provider counts and paid dollars come from the HHS Medicaid Provider Spending file (84 months, Jan 2018 to Dec 2024). Mode A rows subtract the other-care % change from the video-care % change and test extending the +1.21 pp 2018-to-2019 gap.',
      columns: [
        { tag: 'Pre-2020 Check', tagHighlight: false, title: 'Base 2018 to 2019', subtitle: 'Before 2020 Pay Rules' },
        { tag: 'Peak Window', tagHighlight: true, title: '2019 to 2023', subtitle: 'Stay-Enrolled Years' },
        { tag: 'Full Post Window', tagHighlight: true, title: '2019 to 2024', subtitle: 'Includes 2024 Renewal Year' },
        { tag: 'Renewal Year', tagHighlight: false, title: '2023 to 2024', subtitle: 'Renewal Restart Window' }
      ],
      rows: [
        {
          label: 'Video Care Monthly Providers<span class="block text-xs font-normal text-slate-500">Start mean to end mean</span>',
          cells: [
            { val: '84,422 -> 91,399' },
            { val: '91,399 -> 113,638' },
            { val: '91,399 -> 101,978' },
            { val: '113,638 -> 101,978' }
          ]
        },
        {
          label: 'Video Care Change (Ruler 1)<span class="block text-xs font-normal text-slate-500">Single-group pre-post change</span>',
          cells: [
            { val: '+6,977 (+8.26%)' },
            { val: '+22,239 (+24.33%)' },
            { val: '+10,579 (+11.57%)' },
            { val: '-11,660 (-10.26%)' }
          ]
        },
        {
          label: 'Other Care Monthly Providers<span class="block text-xs font-normal text-slate-500">Start mean to end mean</span>',
          cells: [
            { val: '101,905 -> 109,087' },
            { val: '109,087 -> 129,492' },
            { val: '109,087 -> 116,690' },
            { val: '129,492 -> 116,690' }
          ]
        },
        {
          label: 'Other Care Change<span class="block text-xs font-normal text-slate-500">Shared wave in each window</span>',
          cells: [
            { val: '+7,182 (+7.05%)' },
            { val: '+20,405 (+18.71%)' },
            { val: '+7,603 (+6.97%)' },
            { val: '-12,802 (-9.89%)' }
          ]
        },
        {
          label: 'Ruler 2: Net Two-Group Gap*<span class="block text-xs font-normal text-slate-500">Video % minus Other %</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '+1.21 pp (base gap)', barWidth: 22, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '+5.62 pp', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '+4.60 pp', barWidth: 82, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-0.37 pp', barWidth: 7, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'Gap Minus Pre-2020 Slope*<span class="block text-xs font-normal text-slate-500">Net gap minus 1.21 pp per year</span>',
          modeled: true,
          cells: [
            { val: 'Base ref (0.00)' },
            { val: '+0.78 pp (after 4 yrs)' },
            { val: '-1.45 pp (after 5 yrs)' },
            { val: '-1.58 pp (after 1 yr)' }
          ]
        },
        {
          label: 'Medicaid Paid: Video vs. Other<span class="block text-xs font-normal text-slate-500">Start sum to end sum</span>',
          cells: [
            { val: '$19.23B->$23.56B | $85.47B->$99.06B' },
            { val: '$23.56B->$40.29B | $99.06B->$153.37B' },
            { val: '$23.56B->$34.93B | $99.06B->$145.72B' },
            { val: '$40.29B->$34.93B | $153.37B->$145.72B' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Shared Shocks, Base Trends &amp; Budget Fit',
      subtitle: 'How subtracting shared enrollment waves changes how much growth budget teams credit to policy.',
      caption: 'Table 2 compares shared waves, base-trend checks, budget tradeoffs, and next steps across four windows.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Shared Shift in Other Care',
          cells: [
            { val: 'Both care lines grew before 2020 (+8.26% vs. +7.05%), staying within 1.21 points.' },
            { val: 'Other care growth (+18.71%) matches 77% of the +24.33% gain, leaving +5.62 pp.' },
            { val: 'Through 2024, other care growth (+6.97%) matches 60% of the +11.57% gain (+4.60 pp).' },
            { val: 'Both groups dropped by ~10% in 2024 (-10.26% vs. -9.89%) from shared claim lags.' }
          ]
        },
        {
          label: 'Pre-2020 Base Trend Check',
          cells: [
            { val: 'Video care grew 1.21 points faster before 2020, so the two lines were not flat.' },
            { val: 'Extending the 1.21-point yearly gap for 4 years leaves +0.78 pp of the +5.62 pp gap.' },
            { val: 'Extending the gap for 5 years turns the +4.60 pp gap into -1.45 pp in 2024.' },
            { val: 'One pre-2020 year gives just two yearly means, so monthly leads give a fuller check.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Budget teams can show the net gap under both zero and 1.21-point pre-2020 drift.' },
            { val: 'Funding expansion on +24.33% alone credits video rules with broad Medicaid growth.' },
            { val: 'Paid dollars rose in lockstep (+48.26% vs. +47.10%), leaving a +1.16 pp paid gap.' },
            { val: 'Reading the 2024 dip as a video drop-off cuts a service line whose net gap is -0.37 pp.' }
          ]
        },
        {
          label: 'Best-Fit Policy Rule',
          policyFit: true,
          cells: [
            { headline: 'Add Earlier Base Months', detail: 'Include pre-2018 months or monthly leads to test if the 1.21-point gap stays steady.' },
            { headline: 'Show Net Gap Next to Raw Gain', detail: 'Present the +5.62 pp net gap beside the +24.33% raw change in budget briefs.' },
            { headline: 'Bound the 2024 Net Estimate', detail: 'Report the 2024 net gap under flat trends (+4.60 pp) and extended drift (-1.45 pp).' },
            { headline: 'Wait for Late-2024 Claims', detail: 'Refresh Nov and Dec 2024 after claims clear before reading the 2024 dip as real.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Shared Shock Timing &amp; Two-Group Math',
      notesBullets: [
        '<strong>Mode A Two-Group Math (2019 to 2023, <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> yearly means):</strong> &Delta;Video = (113,638 &minus; 91,399) / 91,399 = +24.33%. &Delta;Other = (129,492 &minus; 109,087) / 109,087 = +18.71%. Net gap = 24.33 &minus; 18.71 = <strong>+5.62 pp</strong>. Through 2024: (+11.57%) &minus; (+6.97%) = <strong>+4.60 pp</strong>. Pre-2020 (2018 to 2019): (+8.26%) &minus; (+7.05%) = <strong>+1.21 pp</strong>.',
        '<strong>Late-2024 Claim Lags:</strong> In the <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> series, billing providers drop in Nov and Dec 2024 for both groups (video 88,364 and 47,562; other 101,476 and 57,878). Jan to Oct 2024 ranged from 101,691 to 119,937 and 118,399 to 130,486. Using Jan to Oct 2024 means (108,781 video, +19.02% vs. 2019; 124,092 other, +13.76%) yields a 2019-to-2024 net gap of +5.26 pp.'
      ]
    },
    synthesis: {
      title: 'How Two-Group Comparisons Guide Budget Choices',
      p1: 'During broad shifts like the 2020 to 2024 enrollment wave and Medicaid redetermination, almost every Medicaid count moves at once. If an agency credits telehealth policy with the raw +24.33% rise in billing providers, it cannot tell if that gain came from new billing rules or a system-wide enrollment surge.',
      p2: 'A two-group comparison (Difference-in-Differences, or DiD) uses a second care line on the same timeline, here other Medicaid care (+18.71%), to subtract the shared shift. That step changes the budget takeaway. The +24.33% raw gain narrows to +5.62 pp through 2023 and +4.60 pp through 2024. Extending the +1.21-point pre-2020 gap trims it to +0.78 pp and -1.45 pp. The result rests on how closely the two groups tracked before the rule change.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Two-Group Check on Observed Series):</strong> Billing provider counts and paid dollars come from the HHS Medicaid Provider Spending file (telehealth_month_summary.parquet, Jan 2018 to Dec 2024), split by whether a code allows telehealth billing. Net two-group gaps and pre-trend bounds are Mode A calculations on these observed series. Unit of analysis: care-group-month (2 groups &times; 84 months = 168 rows).',
      '<strong>Primary Data Sources:</strong> <a href="https://opendata.hhs.gov/datasets/medicaid-provider-spending/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending File</a>, <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Medicaid.gov Open Data</a>, <a href="https://www.medicaid.gov/medicaid/data-systems/macbis/transformed-medicaid-statistical-information-system-t-msis/index.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CMS T-MSIS Analytic Files Documentation</a>, and <a href="https://www.dhcs.ca.gov/provgovpart/Pages/Telehealth.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Telehealth Policy Guidance</a>.'
    ],
    faqs: [
      {
        question: 'How does a two-group comparison (DiD) separate policy shifts from a shared wave?',
        answer: 'It subtracts the before-and-after change in a comparison group hit by the same wave (other Medicaid care, +18.71% from 2019 to 2023) from the change in the treated group (video care, +24.33%). That leaves a +5.62 percentage-point net gap.'
      },
      {
        question: 'Why does the 2019-to-2024 net gap (+4.60 pp) differ from the 2019-to-2023 gap (+5.62 pp)?',
        answer: 'From 2023 to 2024, video-care providers fell 10.26% and other-care providers fell 9.89%. Both drops reflect Medicaid redetermination and unpaid Nov and Dec 2024 claims.'
      },
      {
        question: 'What must hold for other Medicaid care to work as a valid comparison group?',
        answer: 'Both care groups must follow parallel paths when no new video rule is enacted. In 2018 to 2019, the treated group grew 1.21 points faster. Extending that pre-2020 gap trims the 2019-to-2023 net gap to +0.78 pp.'
      }
    ],
    related: [
      { slug: 'before-after-trap', title: 'Evaluating Pre-Post Changes vs. Base Trends', note: 'Case study on the 2018-2019 base trend in Medicaid billing providers' },
      { slug: 'parallel-trends-power', title: 'Pre-Trend Noise Bands & Drift Bounds', note: 'Case study on post-policy trend drift limits (M*)' },
      { slug: 'identical-data-opposite-policies', title: 'Nominal vs. Cost-Adjusted Medi-Cal Pay', note: 'Case study on how local clinic costs shape care access' }
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
        claimCovered: 'Article-reported bank-closure case (1,408 counties) in which a pre-trend test returned p = 0.9997 yet Rambachan-Roth bounds changed the conclusion; not publicly reproduced.'
      },
      {
        visibleLabel: 'Choosing Among Difference-in-Differences Designs',
        title: 'Using difference-in-differences in practice',
        url: 'https://tooearlytosay.com/research/methodology/when-to-use-did/',
        claimCovered: 'Decision rules for when difference-in-differences fits and which assumptions matter, with an article-reported rolling DiD simulation labeled by evidence status.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 1: Program Impact &middot; Pre-Trend Power &amp; Drift Limits (Mode A on Stated Baseline Inputs)',
    pageTitle: 'Parallel Trends Power & HonestDiD Bounds | CAPHE',
    metaDescription: 'See why passing a pre-trend F-test (p = 0.9997) does not confirm parallel trends and how Rambachan-Roth sensitivity thresholds (M* = 0.35) test robustness.',
    h1: 'Trend-Drift Sensitivity Bounds Quantify How Much Pre-Policy Noise a County Evaluation Can Withstand',
    subtitle: 'Testing how much post-policy trend drift a modeled county panel can take before its result crosses zero.',
    endnotes: [
      '<strong>Multi-State 1,408-County Event-Study Panel:</strong> <a href="https://www.ers.usda.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA SNAP Retailer Historical Database</a> and <a href="https://www.fdic.gov/resources/resolutions/bank-failures/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">FDIC Bank Failures &amp; Branch Panel</a> (N = 1,408 counties; base post-policy estimate -0.47 pp, SE = 0.22, p = 0.036; pre-policy leads -0.056, -0.030, 0.000 with 95% CIs from -1.27 to +1.16 pp).',
      '<strong>Methodological reference: <a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Roth, J. (2022), <em>AER: Insights</em></a> and <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline font-semibold">Rambachan, A., &amp; Roth, J. (2023), <em>Review of Economic Studies</em></a>. CAPHE case-study sensitivity calculation (1,408-county panel): post-policy trend drift limit M* = 0.35, where the 95% robust CI hits [-0.96, 0.00] pp.',
      '<strong>California 57-County LHA Panel Comparison (2003-2023):</strong> <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a> (N = 1,197 county-years; -9.16 deaths/100K per $10/person across 46 of 47 models; -3.07 pre-ACA vs. -8.93 post-ACA).'
    ],
    answerHtml: 'When auditing a county panel study that passes a pre-policy trend check, budget teams still face risk if wide pre-period noise bands let slow county drift pass unseen. In California\'s <strong>57-county public health panel (1,197 county-years)</strong>, the <strong>9.16 fewer deaths per 100,000</strong> finding holds across <strong>46 of 47</strong> model checks [1]. In a shorter <strong>1,408-county panel</strong>, a <strong>-0.47 percentage point</strong> result holds up only if modeled post-policy drift stays below <strong>35% (M* = 0.35)</strong> of pre-policy swing [2]. Passing a pre-trend check alone leaves a <strong>&plusmn;1.27 percentage point</strong> noise band (<strong>2.5 times</strong> the effect) unexamined, so reporting drift limits shows which findings can guide capital budgets [3].',
    block2: {
      title: 'Two Rulers on Parallel Trends Power (1,408-County Panel &amp; 57-County LHA Splits)',
      contextTag: 'Mode A Drift Bounds on Stated Event-Study Inputs (N = 1,408 Counties); Pre-Test Power &amp; Drift Limits',
      ariaLabel: 'Comparison of the standard pre-trend check result versus a post-policy trend drift limit of M* = 0.35 and county slope controls',
      ruler1: {
        title: 'Ruler 1: Standard Pre-Trend Gate (Passes Standard Trend Check)',
        stat: 'ATT = -0.47 pp (clear drop at zero drift)',
        ariaLabel: 'Base model passes the standard pre-trend check and reports a clear ATT drop of -0.47 pp when zero drift is assumed',
        segments: [
          { cls: 'seg-primary', width: 75, label: 'Base ATT: -0.47 pp (-0.91 to -0.03 pp range)' },
          { cls: 'seg-rest', width: 25, label: 'Passes Standard Pre-Trend Check' }
        ],
        desc: 'Stated base inputs (N = 1,408 counties): pre-policy lead points at <em>e = -3, -2, -1</em> are near zero (<strong>-0.056, -0.030, 0.000</strong>) and pass the joint pre-trend check. Standard practice treats parallel trends as met and reports a <strong>-0.47 pp (&plusmn;0.22 pp margin)</strong> effect.'
      },
      ruler2: {
        title: 'Ruler 2: Mode A Post-Policy Drift Limit (M* = 0.35)',
        stat: 'M* = 0.35 | Shifts to +0.003 pp',
        ariaLabel: 'The post-policy trend drift limit is M* = 0.35, and adding county linear slopes shifts the estimate to a null +0.003 pp',
        segments: [
          { cls: 'seg-rent', width: 35, label: 'Limit M* = 0.35' },
          { cls: 'seg-food', width: 65, label: 'Crosses Zero Above 35% of Pre-Period Drift (Slopes = +0.003 pp)' }
        ],
        desc: 'Pre-period noise bands span <strong>-1.27 to +1.16 pp</strong> (2.5x wider than the ATT). In the Mode A calculation on these inputs, if post-policy drift tops <strong>35% (M* = 0.35)</strong> of the max pre-period slope change, the range crosses zero. Method details sit in the Table Notes.'
      }
    },
    table1: {
      title: 'Table 1. Pre-Trend Noise Bands, Drift Bounds &amp; LHA Panel Checks',
      subtitle: 'Stated event-study inputs from the 1,408-county panel with modeled drift bounds and California 57-county panel benchmarks.',
      caption: 'Table 1 compares the base event study, pre-period noise band, drift bounds, and county slope controls.',
      cornerLabel: 'Trend-Check Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Exact statistics behind the plain cells (stated base inputs, N = 1,408-county DiD panel). <strong>Base TWFE:</strong> -0.47 pp, SE = 0.22 pp, 95% CI [-0.91, -0.03], p = 0.036 at M = 0. <strong>Pre-period leads:</strong> SE = 0.620 (e = -3), SE = 0.582 (e = -2), SE = 0.549 (e = -1); joint pre-trend test Pre-F p = 0.9997 (low power). <strong>Rambachan-Roth bounds:</strong> robust sets fold in pre-trend SE; M* = 0.35 is a Mode A calculation. <strong>County linear slopes:</strong> +0.003 pp, SE = 0.016 pp, p = 0.87; placebo date test p = 0.04. <strong>California LHA panel (57 counties, N = 1,197 county-years):</strong> Full Panel IV -9.16 deaths per 100,000 per $10/person, SE = 1.11; first-stage F = 314.1.',
      columns: [
        { tag: 'Stated Input: Zero Drift', tagHighlight: false, title: 'Base Event Study', subtitle: 'Assumes Zero Post-Trend Gap' },
        { tag: 'Stated Input: Noise Band', tagHighlight: true, title: 'Pre-Trend Noise Band', subtitle: '3-Year Pre-Policy Noise Check' },
        { tag: 'Drift Limit Bound', tagHighlight: true, title: 'Trend-Drift Bounds', subtitle: '35% Drift Limit vs. 2.0x Drift' },
        { tag: 'Stated Input: County Slopes', tagHighlight: false, title: 'County Linear Slopes', subtitle: 'County-Specific Slope Control' }
      ],
      rows: [
        {
          label: 'Post-Policy Point Estimate<span class="block text-xs font-normal text-slate-500">Estimated effect in percentage points</span>',
          cells: [
            { val: '-0.47 pp (clear drop)' },
            { val: 'Leads: -0.056, -0.030, 0.00' },
            { val: '-0.47 pp (bounded set)' },
            { val: '+0.003 pp (+109% shift)' }
          ]
        },
        {
          label: 'Year-to-Year Margin<span class="block text-xs font-normal text-slate-500">Spread in pre vs. post years</span>',
          cells: [
            { val: '±0.22 pp base margin' },
            { val: '±0.58 to ±0.62 pp pre-noise' },
            { val: 'Folds in pre-period noise' },
            { val: '±0.016 pp margin' }
          ]
        },
        {
          label: 'Plausible Effect Range*<span class="block text-xs font-normal text-slate-500">Range of values matching the data</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '-0.91 to -0.03 pp (0.88 span)', barWidth: 36, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-1.27 to +1.16 pp (2.43 span)', barWidth: 100, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: 'At 0.35x drift: -0.96 to 0.00 pp', barWidth: 40, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '-0.028 to +0.034 pp (0.062 span)', barWidth: 3, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: 'Trend Check &amp; Drift Limit*<span class="block text-xs font-normal text-slate-500">0.35x drift limit is a Mode A bound</span>',
          modeled: true,
          cells: [
            { val: 'Clear drop at zero drift' },
            { val: 'Passes check (wide band)' },
            { val: '35% drift limit (0.35x)' },
            { val: 'Crosses zero at 0.35x bound' }
          ]
        },
        {
          label: 'Unseen Drift vs. Effect Size<span class="block text-xs font-normal text-slate-500">Max pre-period band vs. effect</span>',
          cells: [
            { val: 'Assumes 0.00x drift' },
            { val: '±1.27 pp (>2.5x the effect)' },
            { val: 'At 2.0x drift: -1.08 to +0.15 pp' },
            { val: 'Placebo date check flags drift' }
          ]
        },
        {
          label: 'CA 57-County Panel Benchmark<span class="block text-xs font-normal text-slate-500">57 counties, 21 years (Cholette et al., 2026)</span>',
          cells: [
            { val: 'Full panel: 9.16 fewer deaths' },
            { val: 'Large-county cut: low power' },
            { val: 'Pre-ACA -3.07 vs Post -8.93' },
            { val: '21-Year Model (46 of 47 checks)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Trend Rules, Budget Risks &amp; Drift Limits',
      subtitle: 'How analysts separate a noisy pre-trend check from a sturdy multi-year finding.',
      caption: 'Table 2 compares zero-drift assumptions, noise bands, drift limits, and county slope controls.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Core Trend Assumption',
          cells: [
            { val: 'Post-policy paths stay 100% parallel across treated and comparison counties (M = 0).' },
            { val: 'A passing pre-policy trend check is read as proof that post-policy paths stay parallel.' },
            { val: 'Allows post-policy trend drift up to M times the max slope shift between pre-policy years.' },
            { val: 'Fits a straight-line time slope for each county using only 3 pre-policy years.' }
          ]
        },
        {
          label: 'What Drift Bounds Add',
          cells: [
            { val: 'Bounds fold pre-period lead noise into the post-policy range that [-0.91, -0.03] omits.' },
            { val: 'With ±0.62 pp pre-noise, a 1.0 pp/yr drift passes the check yet accounts for the -0.47 pp drop.' },
            { val: 'A drift limit of M* = 0.35 (below the 1.0 benchmark) shows how little drift crosses zero.' },
            { val: 'Fitting 1,408 county slopes on 3 pre-years overfits noise and absorbs real phased-in gains.' }
          ]
        },
        {
          label: 'Lesson for County Studies',
          cells: [
            { val: 'The 57-county LHA panel has high power across 21 years, while a big-city cut has too few groups.' },
            { val: 'When a small-count urban cut gives wide ranges, teams should not read low power as zero effect.' },
            { val: 'Big policy shifts like the 2014 ACA expansion (-3.07 to -8.93) shift flat trend lines.' },
            { val: 'Long 21-year panels with routine-budget models beat fitting county slopes on 3 pre-years.' }
          ]
        },
        {
          label: 'Best-Fit Policy Rule',
          policyFit: true,
          cells: [
            { headline: 'Never Report Zero-Drift Alone', detail: 'Pair base event-study numbers with pre-period noise widths and drift bounds.' },
            { headline: 'Show the Pre-Trend Noise Band', detail: 'Report the pre-period band (-1.27 to +1.16 pp) beside any pre-policy trend check.' },
            { headline: 'Check M* >= 1.0 for Capital Shifts', detail: 'If the drift limit sits below 1.0 (here 0.35), pair the study with a routine-budget model.' },
            { headline: 'Use 6+ Pre-Years for County Slopes', detail: 'Skip county linear slopes in 3-year pre-panels and lengthen the pre-policy window instead.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Roth (2022) Pre-Test Power &amp; Rambachan-Roth (2023) M* Bounds',
      notesBullets: [
        '<strong>Pre-Period Noise vs. Signal (Stated Base Inputs, N = 1,408 Counties):</strong> At lead e = -3, the point is -0.056 pp with SE = 0.620 (95% CI: [-1.27, +1.16]). At e = -2, it is -0.030 pp with SE = 0.582 ([-1.17, +1.11]). At e = -1, it is 0.000 pp with SE = 0.549 ([-1.08, +1.08]). The pre-period CIs are 2.5x wider than the -0.47 pp ATT, so the joint test (p = 0.9997) has low power (<a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Roth, 2022, AER: Insights</a>).',
        '<strong>HonestDiD Drift Limit (Mode A Calculation, M* = 0.35):</strong> Under <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023, Review of Economic Studies)</a>, M = 1.0 allows post-policy trend drift up to 100% of the max pre-period slope shift. Here, the 95% robust range hits 0.00 at M* = 0.35 ([-0.96, 0.00] pp) and widens to [-1.08, +0.15] pp at M = 2.0.',
        '<strong>Unit Rules:</strong> The ATT, leads, SEs, and M* bounds come from the 1,408-county panel (percentage points). The -9.16, -3.07, -8.93, and F = 314.1 figures come from the separate 57-county California LHA panel (deaths per 100,000 per $10/person; N = 1,197 county-years, N = 969 in model).'
      ]
    },
    synthesis: {
      title: 'Why Passing a Pre-Trend Check Is Only the First Step',
      p1: 'In county program reviews, analysts check that pre-policy lead points cross zero and cite a high joint p-value (such as p = 0.9997). Yet wide pre-period noise bands can let slow county drift pass that check. The smaller the sample or the wider the pre-period margin, the easier it is to pass a pre-trend check while an unseen slope accounts for the post-policy gap.',
      p2: 'Modern health economics pairs pre-trend checks with explicit drift bounds. Reporting the Rambachan-Roth drift limit (M* = 0.35, a Mode A bound) and comparing short panels against 21-year models (such as the 57-county California LHA panel, N = 1,197 county-years, where F = 314.1 and 46 of 47 models hold) shows leaders how much trend drift a finding can take.'
    },
    interactive: {
      badge: 'Trend-Drift Bound Check',
      title: 'Compare How Allowing Post-Policy Drift (M) Shifts the Plausible Effect Range',
      subtitle: 'Comparing the zero-drift base model against drift limits and county linear slopes across 1,408 counties.',
      options: [
        {
          label: 'Bound 1 · Exact Parallel Trends',
          headline: 'Zero Post-Policy Drift (M = 0)',
          metric: 'ATT = -0.47 pp | [-0.91, -0.03] pp',
          desc: 'Assuming post-policy county paths stay 100% parallel passes the pre-policy trend check and yields a clear drop.'
        },
        {
          label: 'Bound 2 · Drift Limit (M* = 0.35)',
          headline: 'Post Drift <= 35% of Pre-Period Drift',
          metric: 'M* = 0.35 | [-0.96, 0.00] pp',
          desc: 'Allowing post-policy drift equal to 35% of the max pre-period slope shift brings the top of the range to zero.'
        },
        {
          label: 'Bound 3 · County Linear Slopes',
          headline: 'County Slopes (Year x County)',
          metric: 'ATT = +0.003 pp | [-0.028, +0.034] pp',
          desc: 'Fitting county linear slopes across three pre-policy years shifts the point estimate to near zero (+0.003 pp).'
        }
      ],
      notesTitle: 'Scenario Math, Pre-Period Standard Errors &amp; HonestDiD Bounds',
      notesBullets: [
        '<strong>Bound 1 Base Event-Study Inputs (N = 1,408 Counties):</strong> Pre-policy leads are -0.056 pp (SE = 0.620) at e = -3, -0.030 pp (SE = 0.582) at e = -2, and 0.000 pp (SE = 0.549) at e = -1 (joint pre-trend F-test p = 0.9997). The post-policy M = 0 TWFE estimate is <strong>-0.47 pp (SE = 0.22, 95% CI: [-0.91, -0.03], p = 0.036)</strong>.',
        '<strong>Bound 2 Rambachan-Roth HonestDiD Limit (M* = 0.35):</strong> Under <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023)</a>, the 95% robust confidence set hits <strong>[-0.96, 0.00] pp at M* = 0.35</strong> (below the M = 1.0 benchmark) and widens to <strong>[-1.08, +0.15] pp at M = 2.0</strong>.',
        '<strong>Bound 3 Short-Window County Slopes:</strong> Adding 1,408 county linear trends fit on 3 pre-years shifts the estimate by +109%, from -0.47 pp to <strong>+0.003 pp (SE = 0.016, p = 0.87)</strong>.'
      ]
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Drift Bounds on Stated Base Inputs):</strong> Event-study pre-trend leads (-0.056, -0.030, 0.000), standard errors (0.620, 0.582, 0.549), and the base ATT (-0.47 pp, SE = 0.22, p = 0.036) are stated inputs from the 1,408-county DiD panel. The Rambachan-Roth limit (M* = 0.35) and its robust ranges are Mode A calculations on those inputs. California LHA splits (Pre-ACA -3.07 vs. Post-ACA -8.93; base-funding -4.56 vs. Full -9.16) come from the separate 57-county LHA panel (N = 1,197 county-years; N = 969 in model).',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.1093/restud/rdad018" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Rambachan &amp; Roth (2023), "A More Credible Approach to Parallel Trends," Review of Economic Studies</a>; <a href="https://doi.org/10.1257/aeri.20210236" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Roth (2022), "Pretest with Caution: Event-Study Estimates after Testing for Parallel Trends," AER: Insights</a>; <a href="https://www.ers.usda.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">USDA SNAP Retailer Historical Database</a>; and <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions (2003-2023)</a>.'
    ],
    faqs: [
      {
        question: 'Why does a high pre-trend p-value (such as p = 0.9997) not prove that parallel trends hold?',
        answer: 'A high p-value only means the data cannot rule out zero pre-trend. When pre-period standard errors are wide (0.55 to 0.62 pp), the 95% CI spans -1.27 to +1.16 pp. A drift slope 2.5 times larger than the -0.47 pp effect can still sit inside that band.'
      },
      {
        question: 'What does a sensitivity limit of M* = 0.35 mean for budget choices?',
        answer: 'If post-policy trend drift exceeds 35% of the max slope change seen in the pre-period, the 95% robust range crosses zero and the finding is no longer statistically clear.'
      },
      {
        question: 'Why do big-county splits in California often look statistically noisy?',
        answer: 'California has only a small count of very large urban counties. Restricting a county panel model to big cities cuts the cluster count, widens standard errors, and lowers statistical power even when the true effect is present.'
      }
    ],
    related: [
      { slug: 'threat-history-solutions', title: 'Two-Group Comparisons Across Medicaid Care Lines', note: 'Case study applying DiD to video vs. other Medicaid care' },
      { slug: 'observational-to-experimental', title: 'Comparing Simple Avg & 21-Year Budget Models (-9.16)', note: 'Case study on the 57-county LHA mortality panel' },
      { slug: 'reverse-causation-feedback', title: 'Outbreak Spending & Routine Prevention Returns', note: 'Case study on outbreak spending mix and stability across 47 checks' }
    ]
  },

  // =========================================================================
  // MODULE #6: threat-maturation-solutions (Track 1, member)
  // =========================================================================
  {
    slug: 'threat-maturation-solutions',
    unlisted: true,
    tier: 'public',
    trackEyebrow: 'Track 1: Program Impact &middot; Multi-Year Trend Splits &amp; Base Slopes (Mode A on Observed EDD Baselines)',
    pageTitle: 'Interrupted Time Series & Maturation Trends | CAPHE',
    metaDescription: 'Use California EDD Paid Family Leave and SDI trajectories (2025-2030) to separate baseline wage/claim maturation from SB 951 statutory policy shifts.',
    h1: 'Multi-Year Trend Splits Separate Ongoing Workforce Growth From Projected State-Law Benefit Jumps',
    subtitle: 'Separating steady yearly payroll growth from modeled level and slope shifts after state paid-leave laws.',
    endnotes: [
      '<strong>California EDD Paid Family Leave &amp; SDI Actuals and Forecast (2025-2026):</strong> <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a> (325,055 actual 2025 PFL claims, $1,090 weekly pay, $15.892B SDI payouts; projected 2026 base of 330,000 claims, $1,165 weekly pay, and $17.527B SDI payouts).',
      '<strong>State-Law Shifts Under SB 951 &amp; 12-Week Plans:</strong> <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Senate Bill 951 (UIC &sect; 3300 &amp; &sect; 984)</a> and <a href="/tools/pfl-simulator" class="text-[#0041A5] underline">CAPHE California PFL Simulator</a> (+39,600 added yearly claims to 369,600 and +$623.7M/yr gross outlay above the base slope).',
      '<strong>Multi-Year Reserve Path (2025-2030):</strong> Projected yearly SDI fund balance at 35% take-up dips from 18.2% ($3.19B) to 10.8% ($1.96B) in 2026, then rebuilds to 30.4% ($6.37B, above the 25.0% floor) by 2030.'
    ],
    answerHtml: 'When evaluating a statewide Paid Family Leave pay increase without a multi-year base trend, a one-year review mixes routine yearly claim growth into the first-year policy jump. In California Paid Family Leave, multi-year trend modeling projects <strong>+39,600 added yearly claims</strong> and <strong>+$623.7M per year in gross outlays</strong> from a 12-week plan while reserves rebuild to <strong>30.4% ($6.37B) by 2030</strong> [1]. Raw year-to-year spending checks mix that policy jump with <strong>+$1.635B</strong> in routine wage and workforce growth (325,055 to 330,000 base claims and $1,090 to $1,165 weekly pay) [2]. Tracking both the Year-1 level shift and the 5-year reserve slope keeps payroll tax rates steady [3].',
    block2: {
      title: 'Two Rulers on 2025-to-2026 SDI/PFL Growth (Base Trend Slope vs. Modeled 12-Week Jump)',
      contextTag: 'Mode A 2026-2030 Projections on Observed EDD Baselines (2025 Actuals as Inputs)',
      ariaLabel: 'Comparison of projected base growth in yearly PFL claims and SDI payouts versus a modeled 12-week expansion jump',
      ruler1: {
        title: 'Ruler 1: Base Trend Growth (No New 2026 Law)',
        stat: '+4,945 Claims | +$1.635B SDI',
        ariaLabel: 'Projected without a 12-week plan, yearly PFL claims grow +4,945 (+1.52%), weekly pay grows +$75 (+6.88%), and yearly SDI payouts grow +$1.635B (+10.29%)',
        segments: [
          { cls: 'seg-gross', width: 90, label: '2025 Actual SDI Payouts: $15.892B (325,055 PFL Claims)' },
          { cls: 'seg-food', width: 10, label: '+$1.635B Base Growth' }
        ],
        desc: 'Observed inputs are 2025 EDD actuals, and 2026 values are Mode A base projections. Workforce growth (<strong>+1.52%</strong> in yearly claims to <strong>330,000</strong>) and wage growth (weekly pay from <strong>$1,090 to $1,165</strong>, +6.88%) lift projected SDI payouts from <strong>$15.892B to $17.527B (+$1.635B)</strong> with no new law.'
      },
      ruler2: {
        title: 'Ruler 2: Mode A 12-Week Level Jump (Expected 35% Case)',
        stat: '+39,600 Claims | +$623.7M Modeled',
        ariaLabel: 'Modeled 8-to-12 week plan adds +39,600 yearly claims (+12.0% new claims) and +$623.7M in yearly gross outlay above base',
        segments: [
          { cls: 'seg-primary', width: 62, label: 'Projected 2026 Fund Balance: $1.96B (10.8%)' },
          { cls: 'seg-rest', width: 38, label: 'Projected 2030 Fund Balance: $6.37B (30.4%)' }
        ],
        desc: 'Subtracting the base slope leaves the modeled 12-week jump: <strong>+39,600</strong> added yearly claims (to <strong>369,600</strong>) and <strong>+$623.7M/yr</strong> in gross outlay. The projected 2026 reserve ratio dips from <strong>18.2% to 10.8%</strong> (<strong>$1.96B</strong> balance) before rebuilding to <strong>30.4% ($6.37B)</strong> by 2030.'
      }
    },
    table1: {
      title: 'Table 1. Multi-Year Trend Splits Across California SDI/PFL Paths (2025 to 2030)',
      subtitle: 'Observed 2025 EDD actuals paired with modeled 2026-to-2030 base and expansion fund paths.',
      caption: 'Table 1 compares California Paid Family Leave and SDI fund paths across base trend, expected, low-bound, and cap scenarios from 2025 to 2030.',
      cornerLabel: 'Time-Series Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes &amp; * Modeled Estimates.</strong> Year 2025 inputs (325,055 PFL claims, $1,090 weekly pay, $15.892B SDI payouts, $3.011B fund balance) are observed EDD actuals. Years 2026 to 2030 are Mode A projections calibrated on the EDD May 2026 DI Fund Forecast.',
      columns: [
        { tag: 'Projected Base', tagHighlight: false, title: 'Trend With No New Law', subtitle: '8-Wk Base (Post-SB 951)' },
        { tag: 'Expected Jump', tagHighlight: true, title: 'Expected 12-Wk Plan', subtitle: '35% Take-Up | 12% New Claims' },
        { tag: 'Low Bound', tagHighlight: false, title: 'Low-Bound 12-Wk Plan', subtitle: '25% Take-Up | 5% New Claims' },
        { tag: 'Stress Test', tagHighlight: false, title: 'Full-Use 100% Cap', subtitle: '100% Take-Up | 20% New Claims' }
      ],
      rows: [
        {
          label: '2025 Onset Fund Balance*<span class="block text-xs font-normal text-slate-500">325,055 claims, $1,090/wk pay, $15.892B SDI payouts</span>',
          modeled: true,
          cells: [
            { val: '$2.88B bal (18.1% ratio)' },
            { val: '$2.28B bal (13.8% ratio)' },
            { val: '$2.48B bal (15.2% ratio)' },
            { val: '$1.03B bal (5.8% ratio)' }
          ]
        },
        {
          label: '2026 Claims &amp; Added Outlay*<span class="block text-xs font-normal text-slate-500">Base: 330,000 claims (+1.52%), $1,165/wk pay</span>',
          modeled: true,
          cells: [
            { val: '330,000 | $0.0M jump' },
            { val: '369,600 | +$623.7M/yr' },
            { val: '346,500 | +$417.8M/yr' },
            { val: '396,000 | +$1,910.0M/yr' }
          ]
        },
        {
          label: '2026 Level Shift in Balance*<span class="block text-xs font-normal text-slate-500">Year-1 post-shift balance vs. $4.38B 25% floor</span>',
          modeled: true,
          highlight: true,
          cells: [
            { val: '$3.19B (18.2% ratio)', barWidth: 73, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$1.96B (10.8% ratio)', barWidth: 45, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '$2.36B (13.2% ratio)', barWidth: 54, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-$0.58B (-3.0% deficit)', barWidth: 13, barColor: '#E11D48', textColor: 'text-rose-800' }
          ]
        },
        {
          label: '2028 Rebuilding Slope*<span class="block text-xs font-normal text-slate-500">Uncapped wage base growth vs. $4.78B floor</span>',
          modeled: true,
          cells: [
            { val: '$6.23B (32.6% > floor)' },
            { val: '$3.69B (18.7% rebuilding)' },
            { val: '$4.53B (23.1% near floor)' },
            { val: '-$1.53B (-7.2% deficit)' }
          ]
        },
        {
          label: '2030 Year-6 Fund Balance*<span class="block text-xs font-normal text-slate-500">Year 6 balance vs. $5.07B 25% floor</span>',
          modeled: true,
          cells: [
            { val: '$10.29B (50.7% ratio)' },
            { val: '$6.37B (30.4% > floor)' },
            { val: '$7.67B (36.9% > floor)' },
            { val: '-$1.70B (-7.6% deficit)' }
          ]
        },
        {
          label: '6-Year Outlay &amp; Tax Rate*<span class="block text-xs font-normal text-slate-500">2025-2030 total &amp; needed SDI tax rate</span>',
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
      title: 'Table 2. Stacked State Laws, Slope Rules &amp; Forecast Fit',
      subtitle: 'How multi-year trend models separate stacked California paid-leave laws across 2024, 2025, and 2026.',
      caption: 'Table 2 compares base slopes, level jumps, reserve tradeoffs, and forecasting rules across four SDI/PFL paths.',
      cornerLabel: 'Choice Factor',
      rows: [
        {
          label: 'Base Slope &amp; Policy Shift Driver',
          cells: [
            { val: 'Wage growth lifts weekly pay +6.88%/yr ($1,090 to $1,165) while the uncapped $1,371.5B wage base grows faster.' },
            { val: 'A 12-week plan drops the 2026 balance by -$1.23B, then rebuilds at +$1.1B/yr through 2030.' },
            { val: 'Lower take-up (25%) softens the 2026 dip to $2.36B (13.2%) and clears the 25% floor in 2029.' },
            { val: 'A 100% take-up stress test swamps both the 2026 balance (-$0.58B) and the 2030 slope (-$1.70B).' }
          ]
        },
        {
          label: 'What Level-and-Slope Splits Add',
          cells: [
            { val: 'A base slope separates +$1.635B in routine wage and claim growth from any new law.' },
            { val: 'The slope term shows the post-2024 rebuild to 30.4% ($6.37B) that a 2026 snapshot (10.8%) omits.' },
            { val: 'Separate markers for the 2024 tax-cap repeal and 2025 90% pay tier keep tax and payout shifts distinct.' },
            { val: 'Modeling the post-2024 uncapped tax base on its own slope captures full reserve rebuilding speed.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Under the 8-week base, the 1.30% tax builds a $10.29B balance (50.7% ratio) by 2030.' },
            { val: 'Funding the $4.013B 6-year plan delays hitting the 25% floor from 2028 to 2030 without a +0.045 pp shift.' },
            { val: 'Even at 25% take-up ($2.688B over 6 yrs), the fund takes 3 years to cross the 25% floor in 2029.' },
            { val: 'Guarding against the 100% cap requires rate-setting rules (UIC § 984) up to 1.439% if claims surge.' }
          ]
        },
        {
          label: 'Best-Fit Forecast Rule',
          policyFit: true,
          cells: [
            { headline: 'Detrend Wage &amp; Claim Slopes First', detail: 'Model the +1.52% claim slope and +6.88% weekly wage growth before scoring any new leave bill.' },
            { headline: 'Track Both 2026 Dip &amp; 2030 Slope', detail: 'Pair the 12-week plan with a +0.045 pp tax shift (1.345%) or phase rollout along the rebuild slope.' },
            { headline: 'Split 2024 Tax &amp; 2025 Pay Laws', detail: 'Use separate step markers for the Jan 2024 wage-cap repeal and Jan 2025 90% pay tier.' },
            { headline: 'Add UIC § 984 Reserve Triggers', detail: 'Tie automatic payroll tax step-ups to the 25% EDD reserve floor to guard against cap deficits.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Stacked SB 951 Dates &amp; Claim Mix',
      notesBullets: [
        '<strong>Stacked State-Law Timeline (Law Dates vs. Mode A Projections):</strong> <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Senate Bill 951</a> set two state-law shifts. First, on <strong>January 1, 2024</strong>, it repealed the SDI wage tax cap, taxing 100% of covered wages ($1,371.5B in 2026). Second, on <strong>January 1, 2025</strong>, it raised pay replacement to 90% for low-wage workers. The level and slope paths shown here are Mode A projections.',
        '<strong>Claim Mix:</strong> Across the <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Series</a>, infant bonding makes up <strong>89.0%</strong> of PFL claims (293,700 of 330,000 in 2026). Family care makes up <strong>10.0%</strong>, and military assist makes up <strong>1.0%</strong>.'
      ]
    },
    synthesis: {
      title: 'Why Multi-Year Trend Splits Track Both the Year-1 Dip and the 5-Year Slope',
      p1: 'When a state passes a law like Senate Bill 951, every covered worker in California enters the new rule on the same day. Because there is no unexposed part of the state, analysts use a multi-year trend model (Interrupted Time Series, or ITS) across historical and forecast series. A simple two-year check cannot split policy from trend when wages, worker counts, and tax bases are already climbing.',
      p2: 'Splitting the base slope (+1.52% claim growth, +6.88% weekly wage growth, and the post-2024 uncapped tax slope that lifts base reserves from 18.1% to 50.7%) from the modeled 12-week jump (+39,600 claims, +$623.7M/yr outlay) clarifies the budget choice. A 1-year view in 2026 shows the reserve ratio dipping to 10.8% ($1.96B balance). Yet the post-shift slope through 2030 shows the uncapped wage base rebuilding the fund to $6.37B (30.4%, above EDD\'s 25% floor) without going negative.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Projections on Observed EDD Baselines):</strong> Year 2025 figures (325,055 PFL claims, $1,090.00 weekly pay, $15.892B SDI payouts, $3.011B fund balance, 18.9% reserve ratio) are observed EDD actuals. Years 2026 to 2030 base and expansion series, including the level-and-slope split, are Mode A projections from /public/tools/pfl-simulator/data/pfl_model_data.json anchored to the EDD May 2026 DI Fund Forecast.',
      '<strong>Primary Data Sources:</strong> <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD Disability Insurance (DI) Fund Forecast (May 2026 Report)</a>, <a href="https://data.edd.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EDD Paid Family Leave Monthly Data Series (July 2004 to Feb 2026)</a>, <a href="https://leginfo.legislature.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Unemployment Insurance Code §§ 984 &amp; 3300 (SB 951)</a>, and <a href="https://lao.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Legislative Analyst\'s Office (LAO) Fiscal Outlooks</a>.'
    ],
    faqs: [
      {
        question: 'How does a multi-year trend model (ITS) differ from a simple before-and-after check?',
        answer: 'A simple before-and-after check subtracts one pre-policy year from one post-policy year and mixes ongoing growth with the policy shift. A multi-year trend model tracks the pre-policy base slope (+1.52% claim growth and +6.88% wage growth) and measures both the Year-1 jump and the post-policy slope.'
      },
      {
        question: 'Why does the California SDI reserve ratio rise from 18.1% in 2025 to 50.7% by 2030 in the base forecast?',
        answer: 'SB 951 removed the wage tax cap on SDI employee taxes starting January 1, 2024 (taxing all wages across a $1,371.5B base). Weekly benefit payouts stay capped ($1,765/wk in 2026), so base tax revenue grows faster than base payouts.'
      },
      {
        question: 'What happens to the SDI fund reserve under the Expected 12-week PFL plan?',
        answer: 'In 2026, the +$623.7M outlay lowers the reserve ratio to 10.8% ($1.96B vs. $3.19B base). The post-SB 951 tax slope then rebuilds the fund balance each year, reaching $6.37B (30.4% reserve ratio, above EDD\'s 25% floor) by 2030.'
      }
    ],
    related: [
      { slug: 'selection-into-treatment', title: 'Selection Into Treatment Across PFL Wage Groups', note: 'Case study on SB 951 90% vs. 70% pay share' },
      { slug: 'budget-impact', title: 'Budget Impact vs. Long-Run Return Models', note: 'Case study comparing yearly reserve floors against social returns' },
      { slug: 'before-after-trap', title: 'Evaluating Pre-Post Changes vs. Base Trends', note: 'Case study on separating multi-year drift from policy shifts' }
    ]
  },

  // =========================================================================
  // MODULE #20: budget-impact (Track 3, public)
  // =========================================================================
  {
    slug: 'budget-impact',
    tetsCompanion: [
      {
        visibleLabel: 'Public Health Spending Regime Analysis',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'From 1992 to 2019 across 3,142 US counties, each 10 dollars per capita reduces Years of Potential Life Lost by 0.78 per 100,000 residents, versus +1.52 from 2020 to 2022.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; Cash Flow &amp; Reserve Floors (Mode A Fiscal Scenarios)',
    pageTitle: 'Budget Impact vs. ROI in Public Health | CAPHE',
    metaDescription: 'Understand why high-ROI California health investments (125:1 LHA return, PFL expansion, Medi-Cal navigation) still require annual cash-flow analysis.',
    h1: 'Multi-Year Return Models Require Year-One Cash-Flow and Reserve Schedules for Budget Approval',
    subtitle: 'Pairing modeled long-run returns with yearly cash outlays, reserve floors, and budget line rules.',
    endnotes: [
      '<strong>Multi-Year Returns Across State Programs:</strong> <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology</a>. It shows -9.16 deaths per 100K per $10 spent. Cost per life saved is $109,000. The return ratio is 125:1 at a $13.6M life value. A 42% Year 1 share gives a 52:1 return. Santa Clara renewal aid costs $35 to $140 per person-year.',
      '<strong>State SDI and PFL Cash Flow (2025-2030):</strong> <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a>. A $422.0M net worker gain after 30% firm offset needs $623.7M in 2026 cash. This drops the reserve to 10.8% ($1.96B) vs. the 25.0% ($4.38B) goal. Reserves rebuild to 30.4% ($6.37B) by 2030.',
      '<strong>FY 2026-27 Medi-Cal Budget Lines:</strong> <a href="https://ebudget.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance Enacted Budget Summary</a>. It sets $709M total ($196.8M General Fund) for county staff within $3.3B for county admin. Meanwhile, $20M AB 102 and $59.8M DHCS outreach grants ended June 30, 2025.'
    ],
    answerHtml: 'Hiring full-time Community Health Workers or expanding leave benefits creates a Year 1 cash gap when pay bills arrive before multi-year care savings. In California, county prevention spending yields a <strong>125:1 multi-year return</strong> and a modeled <strong>52:1 return in Year 1</strong>, while Paid Family Leave expansion brings a projected <strong>$422.0M per year in net worker pay</strong> [1]. Long-run return ratios omit single-year cash rules because leave expansion needs <strong>$623.7M in projected 2026 cash</strong>, dipping the state reserve to <strong>10.8% ($1.96B)</strong> against a <strong>25.0% ($4.38B)</strong> goal [2]. Pairing multi-year return models with a 6-year cash schedule (+0.045 rate points) gives budget staff a full funding plan [3].',
    block2: {
      title: 'Two Fiscal Rulers: Long-Run Value vs. Year-1 Cash &amp; Reserve Rules',
      contextTag: 'Mode A Cash-Flow, Reserve &amp; Lag Scenarios on FY 2026-27 Budgets',
      ariaLabel: 'Comparison of multi-year benefit-cost ratios versus annual cash-flow and reserve-floor rules',
      ruler1: {
        title: 'Ruler 1: Multi-Year Return (Social Value)',
        stat: '125:1 LHA | $35-$140 / PY',
        ariaLabel: 'County public health spending yields 125:1 return and Medi-Cal renewal aid costs $35 to $140 per retained person-year',
        segments: [
          { cls: 'seg-rest', width: 85, label: 'Social Value & Avoided Care (125:1 BCR / $422M Net PFL)' },
          { cls: 'seg-primary', width: 15, label: 'Direct Cost' }
        ],
        desc: 'On a multi-year ruler, public health spending saves lives at <strong>$109,000 per life</strong> (<strong>125:1 return</strong> at the <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS $13.6M value</a>). Renewal aid keeps care at <strong>$35 to $140 per person-year</strong>. PFL expansion adds <strong>$422.0M per year</strong> in net worker pay.'
      },
      ruler2: {
        title: 'Ruler 2: Year-1 Cash Outlay &amp; Reserve Floor',
        stat: '10.8% Reserve | $0 CBO Line',
        ariaLabel: '2026 cash outlays dip SDI reserves to 10.8% and FY 2026-27 state budget sets $0 for CBO outreach',
        segments: [
          { cls: 'seg-primary', width: 45, label: '2026 SDI Reserve: $1.96B (10.8%)' },
          { cls: 'seg-rent', width: 55, label: 'Gap to 25% EDD Target ($4.38B)' }
        ],
        desc: 'On a cash ruler, PFL expansion needs <strong>$623.7M</strong> in 2026 cash. This dips the SDI reserve to <strong>10.8% ($1.96B)</strong> vs. the <strong>25% ($4.38B)</strong> goal. The <a href="https://ebudget.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">FY 2026-27 State Budget</a> funds <strong>$709M</strong> for county staff but <strong>$0</strong> for outside groups after <a href="https://www.dhcs.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">AB 102</a> grants ended.'
      }
    },
    table1: {
      title: 'Table 1. Long-Run Return (Ruler 1) vs. Yearly Cash &amp; Reserve Rules (Ruler 2)',
      subtitle: 'Comparing four state fiscal cases across separate budget ledgers that do not add together.',
      caption: 'Comparison of four state health programs by return ratio, yearly cash cost, reserve floor, and budget line rules.',
      cornerLabel: 'Fiscal Metric',
      columns: [
        { tag: 'State SDI Fund: Base', tagHighlight: true, title: 'PFL 12-Wk Plan (35%)', subtitle: '369,600 Claims | 30% Offset' },
        { tag: 'State SDI Fund: Ceiling', tagHighlight: false, title: 'PFL 12-Wk Cap (100%)', subtitle: '396,000 Claims | 0% Offset' },
        { tag: 'Santa Clara Renewal Aid', tagHighlight: true, title: 'SCC Medi-Cal Aid Tool', subtitle: '120,239 Adult Enrollees' },
        { tag: '57-County LHA Panel', tagHighlight: false, title: 'County LHA Spending', subtitle: '+$10 / Person ($19.36M SCC)' }
      ],
      rows: [
        {
          label: 'Budget Ledger<span class="block text-xs font-normal text-slate-500">Whose fund pays the bill</span>',
          cells: [
            { val: 'State SDI reserve fund (EDD); 2025 actuals and 2026-2030 projections at 35% use' },
            { val: 'State SDI reserve fund (EDD); same cash model at a 100% use ceiling' },
            { val: 'Santa Clara Medi-Cal admin; renewal aid model on 120,239 adults' },
            { val: '57-county LHA panel (-9.16/100K, 5-yr lag) in SCC at $10 per person' }
          ]
        },
        {
          label: 'Long-Run Value (Ruler 1)<span class="block text-xs font-normal text-slate-500">Net social gain or cost per unit</span>',
          cells: [
            { val: '$422.0M/yr net (+$19.7M low-wage)' },
            { val: '$1,845.4M/yr net worker gain' },
            { val: '$35 to $140 / kept person-yr' },
            { val: '125:1 BCR ($109,000 / life)' }
          ]
        },
        {
          label: 'Year-1 Cash Outlay (Ruler 2)<span class="block text-xs font-normal text-slate-500">Upfront cash needed in Year 1</span>',
          cells: [
            { val: '$623.7M / yr in 2026' },
            { val: '$1,910.0M / yr in 2026' },
            { val: '$150K to $600K / yr operating' },
            { val: '$19.36M / yr (SCC $10/person)' }
          ]
        },
        {
          label: 'Multi-Year Cash Total<span class="block text-xs font-normal text-slate-500">4-to-6 year total cash bill</span>',
          cells: [
            { val: '$4.013B (6-yr 2025-2030)' },
            { val: '$12.286B (6-yr 2025-2030)' },
            { val: '$0.6M to $2.4M (4-yr 2027-30)' },
            { val: '$96.8M (5-yr SCC total)' }
          ]
        },
        {
          label: 'Year-1 Reserve or Lag Limit<span class="block text-xs font-normal text-slate-500">Short-run cash vs. rule floor</span>',
          highlight: true,
          cells: [
            { val: '10.8% Reserve ($1.96B)', barWidth: 11, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '-3.0% Deficit (-$0.58B)', barWidth: 3, barColor: '#E11D48', textColor: 'text-rose-800' },
            { val: '$0 Enacted CBO Line', textColor: 'text-rose-800' },
            { val: '42% Yr 1 Lag (52:1)', barWidth: 42, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Year 3-5 Solvency Path<span class="block text-xs font-normal text-slate-500">Reserve rebound or lag share</span>',
          cells: [
            { val: '30.4% ($6.37B) by 2030' },
            { val: '-7.6% (-$1.70B) in 2030' },
            { val: '11,804 py (tool) / 54,976 (both)' },
            { val: '82% Yr 3 (102:1) | 100% Yr 5' }
          ]
        },
        {
          label: 'Funding Source<span class="block text-xs font-normal text-slate-500">Revenue tool needed</span>',
          cells: [
            { val: '1.345% SDI rate (+0.045 pp)' },
            { val: '1.439% SDI rate (+0.139 pp)' },
            { val: 'MCP partner / county pool' },
            { val: 'General Fund / Realignment' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Budget Line Rules, Timing Gaps &amp; Funding Steps',
      subtitle: 'How analysts pair long-run returns with yearly cash and reserve rules.',
      caption: 'Comparison of budget timing gaps, line-item limits, tradeoffs, and funding tools across four state programs.',
      cornerLabel: 'Decision Choice',
      rows: [
        {
          label: 'Why High-Value Plans Hit Budget Limits',
          cells: [
            { val: 'The 2026 reserve dips to 10.8% ($1.96B), below the 25.0% ($4.38B) goal.' },
            { val: 'A 100% claim surge pushes the fund into a -$0.58B Year 1 deficit.' },
            { val: 'State funds ($709M) pay county staff while $20M AB 102 grants ended.' },
            { val: 'Counties pay full Year 1 wages while health gains build over 5 years.' }
          ]
        },
        {
          label: 'How Yearly Cash Adds to Long-Run Return',
          cells: [
            { val: 'Net worker gains ($422.0M) do not cut the $623.7M gross cash bill.' },
            { val: 'High worker gains ($1,845.4M) still drain cash if tax rates stay at 1.30%.' },
            { val: 'Low unit costs ($35-$140) still need a legal line item for outside tools.' },
            { val: 'Valuing lives at $13.6M (125:1) does not put cash into county funds.' }
          ]
        },
        {
          label: 'Funding Tradeoff',
          cells: [
            { val: 'A +0.045 point rate lift ($45.48 per $100K pay) covers the $4.013B bill.' },
            { val: 'Pricing taxes for a 100% cap (+0.139 points) overcharges workers at 35% use.' },
            { val: 'State data matching keeps 14,862 person-years per year compared to 2,951 for local tools.' },
            { val: 'Cutting county health funds loses a 52:1 Year 1 and 125:1 5-year return.' }
          ]
        },
        {
          label: 'Recommended Funding Plan',
          policyFit: true,
          cells: [
            { headline: 'Pair Leave Expansion with +0.045 Rate Lift', detail: 'Pair the 6-year reserve table with a +0.045 point (1.345%) rate lift.' },
            { headline: 'Use Reserve Floor Rate Triggers', detail: 'Trigger a 0.03-0.05 point rate lift only if reserves dip below 12%.' },
            { headline: 'Partner with Managed Care Plans', detail: 'Fund local renewal aid through health plans that keep monthly member fees.' },
            { headline: 'Lock In 3-to-5-Year County Budgets', detail: 'Use the Year 3 lag share (82%, 102:1 return) to set multi-year budgets.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Enacted FY 2026-27 Medi-Cal Budget Lines &amp; 5-Year Lag Schedule',
      notesBullets: [
        '<strong>Enacted State Medi-Cal Admin Figures (Mode B):</strong> The FY 2026-27 state budget sets <strong>$709M total ($196.8M General Fund)</strong> for county Medi-Cal staff within a <strong>$3.3B</strong> county admin pool. Meanwhile, outside outreach grants (<strong>$20M AB 102</strong> and <strong>$59.8M DHCS</strong>) ended on June 30, 2025.',
        '<strong>5-Year Koyck Lag Schedule (Mode A Schedule on Mode B -9.16 Slope):</strong> We apply a 5-year Koyck lag ([0.42, 0.67, 0.82, 0.91, 1.00]; scripts/build_value_of_public_health_deck.py:L304, public/tools/lha-calculator/methodology.html:L221-358) to the Mode B -9.16 5-year slope (<a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">Cholette, Patton &amp; Zarate-Gomez, 2026</a>). This gives <strong>42% in Year 1</strong> (-3.85 deaths per 100K, 52:1 return), <strong>67% in Year 2</strong> (-6.14), <strong>82% in Year 3</strong> (-7.51, 102:1 return), <strong>91% in Year 4</strong> (-8.34), and <strong>100% in Year 5</strong> (-9.16, 125:1 return).'
      ]
    },
    synthesis: {
      title: 'Why Analysts Pair Return Ratios with a Multi-Year Cash Table',
      p1: 'A frequent gap between long-run value models and yearly county budgets happens when an analyst shows a high social return (such as 125:1 for county health spending or $422M in net worker pay for Paid Family Leave) without a Year 1 cash and reserve schedule. Budget staff and fund actuaries do not doubt the social value. They pause because they must balance a 1-year cash ledger, hold reserve floors (such as the 25% EDD goal), and follow strict line-item rules.',
      p2: 'Showing both rulers side by side turns a budget dispute into a clear funding plan. Analysts can show how much gross cash is needed in Year 1 ($623.7M for PFL, or $150K-$600K for local renewal aid), when reserves dip (2026 at 10.8%) and rebuild (2030 at 30.4%), and which group holds the cash savings. Leaders can then set the exact payroll rate lift (+0.045 points) or plan transfer needed to pay the bill.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode B Enacted Budgets &amp; Slopes + Mode A Cash-Flow &amp; Lag Models):</strong> Enacted FY 2026-27 state Medi-Cal budget lines ($709M total / $196.8M GF, $3.3B county admin, ended $20M AB 102 grants), 2025 SDI actuals ($3.011B balance, 18.9% ratio), and the 5-year LHA slope (-9.16, -4.56 base split) are Mode B facts. Multi-year 2026-2030 SDI reserve paths, county renewal tool budgets ($150K-$600K per year), and the 5-year Koyck lag weights (0.42, 0.67, 0.82, 0.91, 1.00) are Mode A projections.',
      '<strong>Primary Data Sources:</strong> See the <a href="https://edd.ca.gov/en/about_edd/edd_releases_and_reports/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California EDD May 2026 Disability Insurance Fund Forecast</a> and the <a href="https://ebudget.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Finance Enacted Budget Summary</a>. We also use <a href="https://www.dhcs.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS Medi-Cal Local Assistance Estimates</a> and <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL)</a>.'
    ],
    faqs: [
      {
        question: 'What is the difference between Cost-Effectiveness Analysis (CEA) and Budget Impact Analysis (BIA)?',
        answer: 'CEA and return ratios measure long-run value per dollar across all groups. Budget Impact Analysis (BIA) tracks yearly cash inflows, cash bills, reserve floors, and line-item rules for one payer over 1 to 5 years.'
      },
      {
        question: 'Why must the state SDI fund budget $623.7M per year when net worker gains are $422.0M per year?',
        answer: 'A 30% private firm offset trims the net new pay gain for workers ($422.0M vs. $602.8M gross claims) when firms reduce their own top-off pay. However, the state SDI fund must still pay the full $602.8M in claims plus $21.1M in admin ($623.7M total).'
      },
      {
        question: 'How fast do the death reductions from county public health spending arrive?',
        answer: 'Under the 5-year Koyck lag in the 57-county CAPHE LHA model, 42% of the drop (-3.85 deaths per 100,000, a 52:1 return) arrives in Year 1. It rises to 67% in Year 2, 82% in Year 3 (102:1 return), 91% in Year 4, and 100% (-9.16 deaths per 100,000, 125:1 return) in Year 5.'
      }
    ],
    related: [
      { slug: 'chw-health-outcomes', title: 'CHW Program Impact: Medi-Cal DRG vs. Societal ROI', note: 'CHW case study on payer vs. societal cost offsets' },
      { slug: 'measuring-health-common-unit', title: 'Standardized Healthy Life-Years & Federal Life Valuations', note: 'Case study on QALY and VSL valuation units' },
      { slug: 'cost-effectiveness-ratio', title: 'Cost per Healthy Year Across 5-Year Horizons', note: 'Case study on Year 1 startup vs. Years 2-5 steady-state costs' }
    ]
  },

  // =========================================================================
  // MODULE #22: measuring-health-common-unit (Track 3, community)
  // =========================================================================
  {
    slug: 'measuring-health-common-unit',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,129 census tracts, a flat $26.66 Medi-Cal fee schedule covers less than 11% of community health worker labor costs.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; QALYs &amp; VSL Valuation (Mode A Standardization)',
    pageTitle: 'Measuring Health in QALYs & VSL Units | CAPHE',
    metaDescription: 'Translate condition-specific metrics (HbA1c, depression relief, hospitalizations, mortality) into QALYs and HHS 2025 VSL tiers ($6.3M / $13.6M / $20.7M).',
    h1: 'Standardized Healthy Life-Years and Federal Life Valuations Place Modeled Programs on Comparable Ledgers',
    subtitle: 'Putting modeled chronic care, mental health aid, and saved lives into shared budget units.',
    endnotes: [
      '<strong>Healthy Life-Year Gains (QALYs):</strong> <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Second Panel on Cost-Effectiveness in Health and Medicine</a>. We use a 3% yearly discount rate across 750 Santa Clara clients under <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a>. A weighted health lift of +0.0275 per year over 2 years gives 0.0534 QALYs per client. That totals 40.04 QALYs per year, worth $4.00M at $100K per QALY.',
      '<strong>Caseload Share Split (Mode A Scenario Assumptions):</strong> Each client gets one main weight in this illustrative cohort scenario: 50% chronic care (+0.025/yr = 18.21 QALYs/yr), 30% mental health (+0.040/yr = 17.49 QALYs/yr), and 20% social needs (+0.020/yr = 4.34 QALYs/yr).',
      '<strong>Federal Life Value Tiers (HHS 2025 VSL):</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS ASPE 2025 VSL Schedule</a>. Values are $6.3M Low (58:1 return), $13.6M Central (125:1 return), and $20.7M High (190:1 return) at $109,000 per life saved.'
    ],
    answerHtml: 'Comparing county funding plans across blood sugar clinics, mental health aid, and disease control on separate chart scores leaves budget staff without a shared unit to rank health gains. Putting outcomes into common units shows that a modeled <strong>750-client Santa Clara Community Health Worker cohort</strong> produces <strong>40.04 healthy life-years per year ($4.00M at $100K per year)</strong>, while county prevention saves lives at <strong>$109,000 each (125:1 return at $13.6M per life)</strong> [1]. Relying only on lab tests undervalues mental health and social aid, which have no blood test yet bring <strong>54.5% (21.83 of 40.04 healthy years)</strong> of modeled gains [2]. Keeping healthy years and saved-life values on separate ledgers avoids double-counting [3].',
    block2: {
      title: 'Two Common-Unit Rulers: Healthy Life-Years (QALYs) vs. Saved-Life Value (HHS 2025 VSL)',
      contextTag: 'Mode A: Two Parallel Scales, Cohort QALYs (N = 750) and Population VSL (1.94M), Never Summed',
      ariaLabel: 'Comparison of healthy life-year gains per client versus saved-life values under HHS 2025 VSL tiers',
      ruler1: {
        title: 'Ruler 1: Daily Health Ruler (Discounted QALYs)',
        stat: '0.0534 QALYs / Client ($4.0M Cohort)',
        ariaLabel: 'Weighted health gain of +0.0275 per year over 2 years discounted at 3% equals 0.0534 QALYs per client or 40.04 QALYs per year across 750 clients',
        segments: [
          { cls: 'seg-primary', width: 45, label: 'Chronic Care 18.21 QALYs (45.5%)' },
          { cls: 'seg-rest', width: 44, label: 'Mental Health 17.49 QALYs (43.7%)' },
          { cls: 'seg-food', width: 11, label: 'SDOH 4.34' }
        ],
        desc: 'From a <strong>0.74</strong> base health score (0 = dead, 1 = full health), weighted yearly gains (50% chronic at <strong>+0.025</strong>, 30% mental health at <strong>+0.040</strong>, 20% social needs at <strong>+0.020</strong> = <strong>+0.0275/yr</strong>) over 2 years (3% discount) yield <strong>40.04 QALYs/yr</strong> (worth <strong>$4.00M</strong> at $100K/QALY).'
      },
      ruler2: {
        title: 'Ruler 2: Saved-Life Value Ruler (HHS 2025 VSL Tiers)',
        stat: '$13.6M Central VSL (125:1 BCR)',
        ariaLabel: 'HHS 2025 central VSL of $13.6M per life saved yields a 125:1 benefit-cost ratio at $109,000 cost per life saved',
        segments: [
          { cls: 'seg-gross', width: 30, label: 'Low $6.3M (58:1)' },
          { cls: 'seg-primary', width: 36, label: 'Central $13.6M (125:1)' },
          { cls: 'seg-rest', width: 34, label: 'High $20.7M (190:1)' }
        ],
        desc: 'For county deaths (<a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">Cholette et al., 2026</a>: <strong>-9.16 deaths/100K per $10/person</strong> = <strong>$109,000/life saved</strong>), <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS 2025 VSL</a> tiers value each saved life at <strong>$6.3M (58:1)</strong>, <strong>$13.6M (125:1)</strong>, or <strong>$20.7M (190:1)</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Turning Clinic &amp; Public Health Scores into Shared Budget Units',
      subtitle: 'Mapping four county health streams from clinic chart scores into parallel QALY and VSL units.',
      caption: 'Comparison of four health streams from natural clinic scores into health weights, QALYs, VSL dollars, and return ratios.',
      cornerLabel: 'Valuation Step',
      columns: [
        { tag: 'Stream 1: Care (50%)', tagHighlight: false, title: 'Chronic Care Control', subtitle: '375 of 750 CHW Clients / Yr' },
        { tag: 'Stream 2: Care (50%)', tagHighlight: true, title: 'Mental &amp; Social Aid', subtitle: '225 MH + 150 SDOH Clients / Yr' },
        { tag: 'Stream 3: Full Cohort', tagHighlight: true, title: 'Full 750-Client Panel', subtitle: 'Health Lift + Bed Offsets' },
        { tag: 'Stream 4: Deaths (LHA)', tagHighlight: false, title: 'County Death Drop', subtitle: '1.94M Santa Clara Pop ($10/cap)' }
      ],
      rows: [
        {
          label: 'Valuation Rule &amp; Group<span class="block text-xs font-normal text-slate-500">CEA (QALY) and CBA (VSL) stay on separate ledgers</span>',
          cells: [
            { val: 'CEA: QALYs at $50K/$100K/$150K; 375 chronic care clients/yr' },
            { val: 'CEA: QALYs at $50K/$100K/$150K; 225 MH + 150 SDOH = 375 clients/yr' },
            { val: 'CEA: QALYs at $50K/$100K/$150K; 750-client CHW panel/yr' },
            { val: 'CBA: HHS 2025 VSL $6.3M / $13.6M / $20.7M; 1.94M SCC residents' }
          ]
        },
        {
          label: 'Natural Clinic Score<span class="block text-xs font-normal text-slate-500">Raw program chart metric</span>',
          cells: [
            { val: 'HbA1c %, BP mmHg, +25% screening' },
            { val: 'PHQ-9 mood &amp; Z55-Z65 social codes' },
            { val: '-22% ED, -30% IP, -23% Readmit' },
            { val: '-9.16 deaths / 100K per $10/cap' }
          ]
        },
        {
          label: 'Base Health Score (0 to 1)<span class="block text-xs font-normal text-slate-500">0.00 = Dead | 0.40 = In Bed | 1.00 = Full Health</span>',
          cells: [
            { val: '0.74 to 0.75 chronic base' },
            { val: '0.74 high-need Medi-Cal base' },
            { val: '0.40 hospital stay vs. 0.75 stable' },
            { val: '0.00 death endpoint' }
          ]
        },
        {
          label: 'Yearly Health Lift or Lives Saved<span class="block text-xs font-normal text-slate-500">Per-person gain or county lives saved</span>',
          cells: [
            { val: '+0.025 QALY / yr per client' },
            { val: '+0.040 (MH) &amp; +0.020 (SDOH) / yr' },
            { val: '+0.0275 / yr weighted mean' },
            { val: '17.74 lives / yr (per $19.36M SCC)' }
          ]
        },
        {
          label: 'Discounted Multi-Year Unit<span class="block text-xs font-normal text-slate-500">2-yr window at 3% discount (1.9417)</span>',
          cells: [
            { val: '0.0486/client (18.21 QALYs/yr)' },
            { val: '0.0777 MH / 0.0389 SDOH (21.83/yr)' },
            { val: '0.0534/client (40.04 QALYs/yr)' },
            { val: '9.16 lives / 100K ($109K / life)' }
          ]
        },
        {
          label: 'Dollar Value<span class="block text-xs font-normal text-slate-500">λ = $100K/QALY vs. HHS $13.6M VSL</span>',
          highlight: true,
          cells: [
            { val: '$1,821,046 / yr QALY Val.', barWidth: 13, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$2,183,037 / yr QALY Val.', barWidth: 16, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '$4,004,083 / yr Total QALY', barWidth: 29, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '$13.6M / Life ($6.3M-$20.7M)', barWidth: 100, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Value-to-Cost Ratio<span class="block text-xs font-normal text-slate-500">At $1,800/client cost or $109K/life</span>',
          cells: [
            { val: '2.70 : 1 (at λ = $100K/QALY)' },
            { val: '3.23 : 1 (at λ = $100K/QALY)' },
            { val: '2.85 : 1 QALY (2.58:1 HCUP)' },
            { val: '125 : 1 (58:1 Low to 190:1 High)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Shared Unit Rules, Double-Count Limits &amp; Policy Fit',
      subtitle: 'How analysts avoid double-counting and match the unit to the budget choice.',
      caption: 'Comparison of shared unit rules, double-count limits, score ranges, and policy fit across four streams.',
      cornerLabel: 'Decision Choice',
      rows: [
        {
          label: 'Why Shared Units Aid Budget Choices',
          cells: [
            { val: 'Lets clinics compare a 0.5% HbA1c drop against asthma or blood pressure care.' },
            { val: 'Mental health aid (+0.040/yr) brings 43.7% of cohort QALYs despite no lab test.' },
            { val: 'Places daily health gains (40.04 QALYs/yr) beside avoided hospital bed days.' },
            { val: 'Turns death drops (-9.16 per 100K) into dollar returns ($125 per $1 spent).' }
          ]
        },
        {
          label: 'Double-Counting Limit',
          cells: [
            { val: 'Give one primary health weight per client instead of adding two illness weights.' },
            { val: 'Keep caseload shares separate (50% chronic, 30% mental, 20% social = 100%).' },
            { val: 'Do not count hospital bill savings in both the top and bottom of a cost ratio.' },
            { val: 'Apply the $13.6M VSL only to saved lives, never to daily QALY gains.' }
          ]
        },
        {
          label: 'Score Range &amp; Sensitivity',
          cells: [
            { val: 'Varying the assumed chronic weight from +0.015 to +0.035 shifts QALYs by ±40%.' },
            { val: 'Health gains last 2.0 years in the base run (1.0 to 3.0 years in range checks).' },
            { val: 'Hospital stays cut the health score from 0.75 to 0.40 (-0.35 acute drop).' },
            { val: 'Federal life values span $6.3M (58:1), $11.2M EPA (103:1), and $20.7M (190:1).' }
          ]
        },
        {
          label: 'Recommended Policy Use',
          policyFit: true,
          cells: [
            { headline: 'Clinic &amp; Health Plan Quality Teams', detail: 'Use chronic QALYs (+0.025/yr, $4,859 value) to support CPT 98960 staffing.' },
            { headline: 'CalAIM &amp; Mental Health Programs', detail: 'Use mental (+0.040/yr) and social (+0.020/yr) weights for G0019/G0022 aid.' },
            { headline: 'Hospital &amp; Health System Leaders', detail: 'Show cohort QALY value ($4.00M/yr) beside HCUP bed savings ($2.91M/yr).' },
            { headline: 'County Boards &amp; State Lawmakers', detail: 'Use HHS VSL tiers ($6.3M to $20.7M, 58:1 to 190:1) to support base budgets.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Weighted QALY Math &amp; HHS 2025 VSL Tiers',
      notesBullets: [
        '<strong>Weighted QALY Math (Mode A Scenario Assumptions):</strong> Across 750 clients, the three illustrative cohort streams yield <strong>18.21 QALYs per year</strong> (375 chronic care clients at +0.025/yr), <strong>17.49 QALYs per year</strong> (225 mental health clients at +0.040/yr), and <strong>4.34 QALYs per year</strong> (150 social needs clients at +0.020/yr). Discounted over 2 years at 3.0% per year (factor 1.9417 on a +0.0275 yearly lift), this gives <strong>0.0534 QALYs per client</strong>, or <strong>40.0404252 QALYs per year (40.04 rounded)</strong> across 750 clients.',
        '<strong>HHS 2025 VSL &amp; LHA Death Math (Mode B):</strong> At -9.16 deaths per 100,000 per $10 spent (-0.9158 per $1), the cost per saved life is $10 / (9.158 / 100,000) = <strong>$109,170 ($109,000 rounded)</strong>. This gives return ratios of <strong>58:1 ($6.3M Low)</strong>, <strong>125:1 ($13.6M Central)</strong>, and <strong>190:1 ($20.7M High)</strong>.'
      ]
    },
    synthesis: {
      title: 'How Shared Units Keep Upstream Care from Being Priced at Zero',
      p1: 'In county health budgets, services with direct billing codes or lab blood tests easily win funding because their outputs are simple to count. Meanwhile, mental health aid, social-needs outreach, and countywide disease tracking face an uphill case. Without a shared unit, a budget office has no clear way to weigh a 20-person depression outreach team against a diabetes clinic or an environmental health unit.',
      p2: 'Turning daily health gains into QALYs and saved lives into HHS Value of a Statistical Life (VSL) tiers levels the playing field. It shows that mental health and social outreach bring more than half (54.5%, or 21.83 of 40.04 QALYs/yr) of a CHW cohort\'s total quality-of-life gain. At the same time, countywide public health spending saves lives at $109,000 each, returning $58 to $190 in social value per $1 spent.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode B Federal Schedules &amp; LHA Slopes + Mode A Cohort QALY Scenario):</strong> HHS 2025 VSL tiers ($6.3M / $13.6M / $20.7M), U.S. value benchmarks ($50K / $100K / $150K per QALY), and the CAPHE LHA death slope (-9.16 per 100K per $10 spent) are Mode B facts. Cohort QALY parameters (+0.025/yr chronic, +0.040/yr mental health, +0.020/yr social needs across a 50%/30%/20% split at $1,800/client ongoing cost) and totals (40.04 QALYs/yr across 750 clients, or 0.0534 QALYs/client over 2 years at 3% discounting) are illustrative Mode A scenario assumptions.',
      '<strong>Primary References &amp; Data Sources:</strong> See <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Department of Health and Human Services (HHS) ASPE Guidelines for Regulatory Impact Analysis (2025 VSL Schedule)</a> and <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA Mortality Risk Valuation ($11.2M VSL)</a>. We also use the <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Second Panel on Cost-Effectiveness in Health and Medicine (3% discount standard)</a> and <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a>.'
    ],
    faqs: [
      {
        question: 'What is a Quality-Adjusted Life Year (QALY) and how is it calculated?',
        answer: 'A QALY combines length of life and daily health quality into one unit, where 1.00 is one year in full health and 0.00 is death. If an outreach team lifts a client\'s health score from 0.74 to 0.7675 (+0.0275 per year) for 2 years, it produces 0.0534 discounted QALYs at a 3% yearly discount rate.'
      },
      {
        question: 'When should analysts use QALYs ($50K-$150K/QALY) versus the Value of a Statistical Life ($13.6M VSL)?',
        answer: 'QALYs and value benchmarks ($50K/$100K/$150K per QALY) are used in Cost-Effectiveness Analysis (CEA) to value daily health gains in care cohorts. VSL ($6.3M Low, $13.6M Central, $20.7M High) is used in Cost-Benefit Analysis (CBA) strictly to value prevented deaths across a population.'
      },
      {
        question: 'How do we avoid double-counting when a client has both diabetes and depression?',
        answer: 'Instead of adding two separate illness weights for the same person, assign one primary weight per client (50% chronic care at +0.025, 30% mental health at +0.040, 20% social needs at +0.020). Analysts can also use a single multi-symptom survey like the EQ-5D.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'Calculating ICERs & Net Monetary Benefit', note: 'Case study applying $50K/$100K/$150K per QALY thresholds to CHW cohorts' },
      { slug: 'sensitivity-analysis-cea', title: 'Multi-Way VSL & CI Sensitivity Analysis', note: 'Case study stress-testing the 125:1 LHA benefit-cost ratio across VSL tiers' },
      { slug: 'budget-impact', title: 'Budget Impact vs. Long-Run ROI', note: 'Case study on annual cash-flow versus multi-year societal returns' }
    ]
  },

  // =========================================================================
  // MODULE #23: cost-effectiveness-ratio (Track 3, community)
  // =========================================================================
  {
    slug: 'cost-effectiveness-ratio',
    tetsCompanion: [
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,129 census tracts, a flat $26.66 Medi-Cal fee schedule covers less than 11% of community health worker labor costs.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 3: Resource Allocation &amp; Economic Value &middot; ICER, NMB &amp; Thresholds (Mode A CEA Horizons)',
    pageTitle: 'Cost-Effectiveness Ratios & NMB Thresholds | CAPHE',
    metaDescription: 'Evaluate Incremental Cost-Effectiveness Ratios ($36,089/QALY operating, $37,712/QALY with startup) and Net Monetary Benefit (+$12.8M at $100K/QALY).',
    h1: 'Multi-Year Cost-Effectiveness Models Spread Year-One Startup Costs Across Ongoing Health Gains',
    subtitle: 'Scoring modeled county care teams across startup and ongoing years using cost per healthy year and net value.',
    endnotes: [
      '<strong>Santa Clara 5-Year CHW Value Scenario (Mode A):</strong> <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a> illustrative cohort scenario. Serving 750 clients per year over 5 years gives 200.20 discounted QALYs (40.04 QALYs/yr). Direct operating cost is $7,225,000 ($36,089/QALY), or $7,550,000 with $325,000 in startup ($37,712/QALY).',
      '<strong>Startup vs. Ongoing Years (Mode A):</strong> In this illustrative scenario, Year 1 cost per healthy year is $48,202/QALY ($1,930,000 for 40.04 QALYs: $2,500/client + $55,000 amortized startup). It drops to $35,090/QALY in Years 2 to 5 ($1,405,000/yr for 40.04 QALYs/yr: $1,800/client + $55,000 startup).',
      '<strong>Net Value &amp; Hospital Offset Benchmarks:</strong> <a href="https://www.icer.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">ICER Valuation Benchmarks</a>. Five-year operating net value is +$2.79M at $50K/QALY, +$12.80M at $100K/QALY, and +$22.81M at $150K/QALY (+$2.46M, +$12.47M, and +$22.48M with full startup). In the <a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">IMPaCT CHW RCT (Kangovi et al., 2020)</a>, acute-care savings yielded $2.47 per $1 invested.'
    ],
    answerHtml: 'Judging a multi-year care team on Year 1 unit costs alone overstates the ongoing price of services that pay one-time training bills before steady health gains arrive. Across Santa Clara County\'s modeled <strong>5-year, 750-client-per-year CHW program</strong>, direct operations produce <strong>200.20 healthy life-years at $36,089 per healthy year</strong> and create <strong>+$12.80M in net value</strong> at the standard <strong>$100,000 benchmark</strong> [1]. Judging the team on Year 1 alone raises the unit cost to <strong>$48,202 per healthy year</strong> because <strong>$325,000 in startup costs</strong> lands before ongoing costs drop to <strong>$35,090</strong> [2]. Even with full startup included (<strong>$7,550,000 total, or $37,712 per healthy year</strong>), the 5-year model clears the strict <strong>$50,000 benchmark (+$2.46M net value)</strong> [3].',
    block2: {
      title: 'Two Decision Rulers: Cost per QALY (ICER) vs. Net Dollar Value (NMB at λ = $100K/QALY)',
      contextTag: 'Mode A 5-Year Cohort Horizons ($36,089 Operating vs. $37,712 With Startup)',
      ariaLabel: 'Comparison of Incremental Cost-Effectiveness Ratio in dollars per QALY versus 5-year Net Monetary Benefit across benchmarks',
      ruler1: {
        title: 'Ruler 1: Cost per Healthy Year (ICER = ΔC / ΔE)',
        stat: '$36,089 Oper. | $37,712 Total',
        ariaLabel: '5-year operating ICER is $36,089/QALY and 5-year total ICER with startup is $37,712/QALY',
        segments: [
          { cls: 'seg-rest', width: 35, label: 'Yrs 2-5 $35.1K' },
          { cls: 'seg-primary', width: 37, label: '5-Yr $36.1K-$37.7K / QALY' },
          { cls: 'seg-gross', width: 28, label: 'Gap Below $50K' }
        ],
        desc: 'Dividing 5-year direct operating cost (<strong>$7,225,000</strong>) by <strong>200.20 QALYs</strong> gives <strong>$36,089/QALY</strong>, while dividing full cost with startup (<strong>$7,550,000</strong>) by <strong>200.20 QALYs</strong> gives <strong>$37,712/QALY</strong>. Both sit well below the <a href="https://www.icer.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">ICER</a> <strong>$50,000/QALY</strong> benchmark.'
      },
      ruler2: {
        title: 'Ruler 2: 5-Year Net Dollar Value (NMB = λ·ΔE − ΔC)',
        stat: '+$12.80M at λ = $100K/QALY',
        ariaLabel: '5-year Net Monetary Benefit is +$2.79M at $50K/QALY, +$12.80M at $100K/QALY, and +$22.81M at $150K/QALY',
        segments: [
          { cls: 'seg-food', width: 15, label: '+$2.8M ($50K)' },
          { cls: 'seg-primary', width: 40, label: '+$12.80M Net Value (at λ = $100K/QALY)' },
          { cls: 'seg-rest', width: 45, label: '+$22.81M (at λ = $150K)' }
        ],
        desc: 'Valuing <strong>200.20 QALYs</strong> in dollars (NMB = λ·ΔE − ΔC) gives a positive net gain at every U.S. benchmark: <strong>+$2.79M</strong> at &lambda; = $50K, <strong>+$12.80M</strong> at &lambda; = $100K, and <strong>+$22.81M</strong> at &lambda; = $150K (<strong>+$12.47M</strong> at $100K with startup).'
      }
    },
    table1: {
      title: 'Table 1. Cost per QALY &amp; Net Value Across 4 Accounting Horizons',
      subtitle: 'Comparing Year 1 launch, Years 2-5 ongoing care, 5-year operating totals, and 5-year full startup totals.',
      caption: 'Comparison of Cost-Effectiveness Ratios and Net Monetary Benefits across Year 1, Years 2-5, 5-year operating, and 5-year full startup horizons.',
      cornerLabel: 'CEA &amp; NMB Metric',
      columns: [
        { tag: 'Mode A: Year 1 Ramp', tagHighlight: false, title: 'Year 1 Launch', subtitle: '$2,500/Client + $55K Startup' },
        { tag: 'Mode A: Years 2 to 5', tagHighlight: true, title: 'Ongoing Care', subtitle: '$1,800/Client + $55K Startup' },
        { tag: 'Mode A: 5-Yr Operating', tagHighlight: true, title: '5-Year Direct Run', subtitle: '3,750 Client-Years (Excl. Startup)' },
        { tag: 'Mode A: 5-Yr Total', tagHighlight: false, title: '5-Year With Startup', subtitle: '$7.225M Operating + $325K Startup' }
      ],
      rows: [
        {
          label: 'Program Cost (ΔC)<span class="block text-xs font-normal text-slate-500">Gross outlay vs. usual care (before billing or bed offsets)</span>',
          cells: [
            { val: '$1,930,000 (Yr 1)' },
            { val: '$1,405,000 / yr (Yrs 2-5)' },
            { val: '$7,225,000 (5-yr operating)' },
            { val: '$7,550,000 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'Health Gain (ΔE in QALYs)<span class="block text-xs font-normal text-slate-500">Discounted at 3.0%/yr over 2-yr window</span>',
          cells: [
            { val: '40.04 QALYs (Yr 1)' },
            { val: '40.04 QALYs / yr (Yrs 2-5)' },
            { val: '200.20 QALYs (5-yr total)' },
            { val: '200.20 QALYs (5-yr total)' }
          ]
        },
        {
          label: 'Ruler 1: ICER (ΔCost / ΔQALYs)<span class="block text-xs font-normal text-slate-500">Price per healthy life-year gained</span>',
          highlight: true,
          cells: [
            { val: '$48,202 / QALY (Yr 1)', barWidth: 96, barColor: '#F59E0B', textColor: 'text-amber-800' },
            { val: '$35,090 / QALY (Yrs 2-5)', barWidth: 70, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$36,089 / QALY (operating)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$37,712 / QALY (w/ startup)', barWidth: 75, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'NMB at λ = $50,000 / QALY<span class="block text-xs font-normal text-slate-500">Strict Value Benchmark</span>',
          cells: [
            { val: '+$72,021 (Yr 1 net)' },
            { val: '+$597,021 / yr' },
            { val: '+$2,785,106 (5-yr operating)' },
            { val: '+$2,460,106 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'NMB at λ = $100,000 / QALY<span class="block text-xs font-normal text-slate-500">Standard benchmark: $100,000 × ΔE − gross ΔC</span>',
          cells: [
            { val: '+$2,074,043 (Yr 1 net)' },
            { val: '+$2,599,043 / yr' },
            { val: '+$12,795,213 (5-yr operating)' },
            { val: '+$12,470,213 (5-yr w/ startup)' }
          ]
        },
        {
          label: 'NMB at λ = $150,000 / QALY<span class="block text-xs font-normal text-slate-500">Upper U.S. Value Benchmark</span>',
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
      title: 'Table 2. Benchmark Math, Cost-Saving Terms &amp; Policy Rules',
      subtitle: 'Why analysts pair Net Monetary Benefit with cost ratios and separate cost-effective from cost-saving.',
      caption: 'Comparison of ICER vs NMB math, cost-saving terms, benchmark sensitivity, and policy rules.',
      cornerLabel: 'Decision Choice',
      rows: [
        {
          label: 'How ICER and NMB Behave',
          cells: [
            { val: 'Year 1 cost ($48,202/QALY) sits near $50K, giving +$72,021 net value.' },
            { val: 'Cutting unit cost to $1,800 saves $525,000/yr and lowers ICER by $13,112.' },
            { val: 'Five-year operating net value scales from +$2.79M ($50K) to +$22.81M ($150K).' },
            { val: 'Adding $325,000 startup lifts the 5-year ratio from $36,089 to $37,712/QALY.' }
          ]
        },
        {
          label: 'Cost-Effective vs. Cost-Saving',
          cells: [
            { val: 'A gross ICER of $48,202/QALY (ΔC > 0, ΔE > 0) is cost-effective, not cost-saving.' },
            { val: 'The term "dominant" (cost-saving) applies only when net ΔCost < 0 and ΔE > 0.' },
            { val: 'Counting modeled bed savings ($1,823,330/yr) makes net cost -$418,330/yr (cost-saving).' },
            { val: 'In the IMPaCT RCT (Kangovi et al., 2020), hospital savings returned $2.47 per $1 spent.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Judging a team only on Year 1 costs ($48,202) over-weights one-time training.' },
            { val: 'Setting ongoing contracts at $35,090/QALY ($1,800/client) keeps costs on track.' },
            { val: 'Using only a $50K benchmark omits $10.01M in value at the $100K standard.' },
            { val: 'Spreading $325,000 startup over 5 years adds just $1,623/QALY to the 5-year ratio.' }
          ]
        },
        {
          label: 'Recommended Policy Rule',
          policyFit: true,
          cells: [
            { headline: 'Score Pilots Over a 3-to-5-Year Contract', detail: 'Spread Year 1 training ($2,500/client + startup) over a multi-year contract.' },
            { headline: 'Report Both Gross ICER and Net Bed Savings', detail: 'Show gross ICER ($35.1K-$37.7K/QALY) beside net bed savings (-$418K/yr).' },
            { headline: 'Rank County Programs by Net Value at $100K', detail: 'Use 5-year net value (+$12.80M operating, +$12.47M w/ startup) to rank programs.' },
            { headline: 'Compare Both Operating and Full-Startup Ledgers', detail: 'Report both $36,089/QALY (operating) and $37,712/QALY (with $325K startup).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Exact 5-Year Horizon Math &amp; Trial Benchmarks',
      notesBullets: [
        '<strong>Exact 5-Year Horizon Arithmetic (Mode A Scenario Assumptions):</strong> Under the illustrative cohort assumptions (750 clients/yr, +0.0275/yr weighted lift over 2 years at 3.0% discount), each cohort year yields <strong>40.0404252 QALYs/yr</strong> (<strong>200.202126 QALYs</strong> over 5 years, displayed as 40.04 and 200.20). Dividing <strong>$1,930,000</strong> (Year 1: 750 &times; $2,500 + $55,000 amortized startup) by 40.0404252 gives <strong>$48,202/QALY</strong>; dividing <strong>$1,405,000/yr</strong> (Years 2 to 5: 750 &times; $1,800 + $55,000 startup) by 40.0404252 gives <strong>$35,090/QALY</strong>. Over 5 years, dividing <strong>$7,225,000</strong> (operating excluding $325,000 total startup) by 200.202126 gives <strong>$36,089/QALY</strong>, and dividing <strong>$7,550,000</strong> ($1,930,000 + 4 &times; $1,405,000, or $7,225,000 + $325,000 startup) by 200.202126 gives <strong>$37,712/QALY</strong>.',
        '<strong>Hospital Offset &amp; Trial Context:</strong> In the <a href="https://doi.org/10.1377/hlthaff.2019.00981" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">IMPaCT randomized trial (Kangovi et al., 2020, Health Affairs)</a> and <a href="https://www.cdc.gov/diabetes/php/toolkits/chw.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC Community Health Worker Evidence Base</a>, acute-care savings offset program outlays ($2.47 returned per $1 in IMPaCT). In our Mode A scenario, applying an illustrative $1,823,330/yr hospital bed offset against $1,405,000/yr ongoing cost yields a net saving of -$418,330/yr (dominant).'
      ]
    },
    synthesis: {
      title: 'Why Net Dollar Value Pairs with the Cost Ratio in County Budgets',
      p1: 'When analysts report a cost ratio ($36,089 per QALY operating, or $37,712 per QALY with startup), two practical questions arise from county leaders. First, how do we know whether $36,089 to $37,712 per QALY is a good value? Second, how do we compare a small team with a low ratio against a larger program with a slightly higher ratio? Value benchmarks ($50,000, $100,000, and $150,000 per QALY) answer the first question. Net Monetary Benefit (NMB = λ·ΔE − ΔC) answers the second.',
      p2: 'Valuing health gains in dollars at the $100,000 per QALY benchmark and subtracting program bills shows that a 10-CHW team creates +$12.80 million in operating net value over 5 years (+$12.47M with startup, and +$2.46M to +$2.79M even at the strict $50,000 benchmark). Pairing Year 1 startup tables with 5-year cumulative ledgers shows county boards that the program stays high-value across every U.S. threshold.'
    },
    interactive: {
      badge: 'Value Benchmark Check',
      title: 'Compare 5-Year Net Value Across Benchmarks (λ)',
      subtitle: 'Comparing modeled 5-year net value (operating and full startup) across three U.S. health value benchmarks.',
      options: [
        {
          label: 'Benchmark 1 · Strict',
          headline: 'λ = $50,000 per QALY',
          metric: '5-Yr NMB = +$2,785,106 (+$2.46M w/ Startup)',
          desc: 'Even at the strictest $50,000 benchmark, both the operating ($36,089/QALY) and full-startup ($37,712/QALY) ledgers give positive net value.'
        },
        {
          label: 'Benchmark 2 · U.S. Standard',
          headline: 'λ = $100,000 per QALY',
          metric: '5-Yr NMB = +$12,795,213 (+$12.47M w/ Startup)',
          desc: 'At the standard U.S. benchmark, the 10-CHW team creates +$12.80 million in modeled 5-year operating net value (+$12.47M with startup).'
        },
        {
          label: 'Benchmark 3 · Upper Bound',
          headline: 'λ = $150,000 per QALY',
          metric: '5-Yr NMB = +$22,805,319 (+$22.48M w/ Startup)',
          desc: 'At the upper benchmark for high-need chronic care, modeled 5-year operating net value reaches +$22.81 million (+$22.48M with startup).'
        }
      ],
      notesTitle: 'Scenario Math &amp; Startup Amortization Across Benchmarks',
      notesBullets: [
        '<strong>Net Value Formula (NMB = &lambda;&middot;&Delta;E &minus; &Delta;C):</strong> Over 5 years, the illustrative 10-CHW scenario produces <strong>200.202126 unrounded QALYs</strong> (5 &times; 40.0404252 QALYs/yr, displayed as 200.20) against <strong>$7,225,000</strong> in direct operating bills (<strong>$7,550,000</strong> with $325,000 total startup). Table 1 costs are gross outlays before Medi-Cal SPA 22-0001 billing or hospital bed offsets.',
        '<strong>Unrounded 5-Year Benchmark Math:</strong> Computing 5-year NMB from unrounded QALYs (200.202126) and rounding to the nearest dollar gives: at &lambda; = $50,000/QALY, $10,010,106.30 minus $7,225,000 = <strong>+$2,785,106</strong> operating (minus $7,550,000 = <strong>+$2,460,106</strong> with startup); at &lambda; = $100,000/QALY, $20,020,212.60 minus $7,225,000 = <strong>+$12,795,213</strong> operating (<strong>+$12,470,213</strong> with startup); at &lambda; = $150,000/QALY, $30,030,318.90 minus $7,225,000 = <strong>+$22,805,319</strong> operating (<strong>+$22,480,319</strong> with startup).',
        '<strong>Nearest-Dollar Rounding Rule Across Horizons:</strong> Each Table 1 cell is computed from unrounded QALYs (40.0404252/yr; 200.202126 over 5 years) and rounded independently to the nearest dollar. Because of nearest-dollar rounding, summing the rounded Year 1 cell and four rounded Years 2 to 5 cells (+$72,021 + 4 &times; $597,021 = +$2,460,105 at $50K; +$2,074,043 + 4 &times; $2,599,043 = +$12,470,215 at $100K; +$4,076,064 + 4 &times; $4,601,064 = +$22,480,320 at $150K) differs by $1 to $2 from the unrounded 5-year full-startup totals (+$2,460,106; +$12,470,213; +$22,480,319).'
      ]
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Cost-Effectiveness Model on Illustrative Cohort Assumptions):</strong> Program cost inputs ($2,500/client Year 1, $1,800/client ongoing, $55,000/yr amortized startup plus $50,000 Year 1 onboarding = $325,000 total startup; $1,930,000 Yr 1, $1,405,000/yr Yrs 2-5, $7,225,000 5-yr operating, $7,550,000 5-yr with startup), QALYs (40.0404252/yr, 200.202126 5-yr), hospital bed offset ($1,823,330/yr), ICERs ($48,202 Yr 1, $35,090 Yrs 2-5, $36,089 operating, $37,712 with startup), and net values are illustrative Mode A closed-form scenario calculations.',
      '<strong>Average vs. Incremental Scenario Comparison:</strong> Comparing the illustrative 10-CHW scenario ($7,550,000 with startup for 200.20 QALYs) against usual care gives an average ratio of $37,712/QALY ($36,089 operating). Compared against an illustrative smaller 5-to-6 CHW scenario ($3,115,606 for 112.11 QALYs = $27,790/QALY), the incremental step-up adds +$4,434,394 for +88.09 QALYs (ICER = $50,339/QALY), following the incremental framework in <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders et al. (2016) Second Panel on Cost-Effectiveness in Health and Medicine</a>.',
      '<strong>Primary References &amp; Data Sources:</strong> See <a href="https://www.icer.org/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Institute for Clinical and Economic Review (ICER) Value Assessment Framework ($50K-$150K/QALY)</a> and <a href="https://doi.org/10.1056/NEJMp1405158" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Neumann, Cohen &amp; Weinstein (2014), "Updating Cost-Effectiveness: The Curious Resilience of the $50,000-per-QALY Threshold," NEJM</a>. We also use <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS SPA 22-0001</a> and the <a href="https://www.cdc.gov/diabetes/php/toolkits/chw.html" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC Community Health Worker Evidence Base</a>.'
    ],
    faqs: [
      {
        question: 'What is the difference between a "cost-effective" program and a "dominant (cost-saving)" program?',
        answer: 'A program is cost-effective when it improves health (ΔE > 0) at an added cost (ΔC > 0) whose ratio (ICER = ΔC / ΔE) stays below the value benchmark (such as $36,089 to $37,712/QALY vs. $100,000/QALY). A program is dominant (cost-saving) only when it both improves health (ΔE > 0) and cuts net spending (ΔC < 0).'
      },
      {
        question: 'Why do analysts report Net Monetary Benefit (NMB) alongside the ICER?',
        answer: 'Because the ICER is a ratio (ΔC / ΔE), it does not show total program scale, and a negative ratio can mean either a cost-saving plan (ΔC < 0, ΔE > 0) or a worse plan (ΔC > 0, ΔE < 0). Net value (λ·ΔE − ΔC) is linear, additive, and clear across all cases.'
      },
      {
        question: 'How much does Year 1 startup training change the 5-year cost per QALY?',
        answer: 'In Year 1 alone, startup and ramp-up costs raise the ratio to $48,202 per QALY ($1,930,000 for 40.04 QALYs). Spread across the full 5-year horizon (200.20 QALYs), adding $325,000 in startup moves the ratio from $36,089/QALY ($7,225,000 operating) to $37,712/QALY ($7,550,000 total), well below the $50,000/QALY benchmark.'
      }
    ],
    related: [
      { slug: 'chw-health-outcomes', title: 'CHW Program Impact & Acute-Care Cost Offsets', note: 'CHW case study Case Study on Medi-Cal DRG vs. societal HCUP savings' },
      { slug: 'measuring-health-common-unit', title: 'Measuring Health in QALYs & HHS 2025 VSL Tiers', note: 'Case study on utility weights and mortality valuation' },
      { slug: 'sensitivity-analysis-cea', title: 'Multi-Way Sensitivity Analysis in CEA & CBA', note: 'Case study on stress-testing economic conclusions' }
    ]
  }
];

for (const spec of wave3Modules) {
  renderModuleHtml(spec);
}
console.log('Wave 3 (9 Modules across Track 1 & Track 3) rendered successfully.');
