#!/usr/bin/env node
'use strict';

/**
 * Wave 4B Builder: Track 4 (5 Modules: #25, #26, #27, #29, #30)
 * Note: Module #28 (food-insecurity-diabetes) was completed in Wave 2.
 *
 * Modules built:
 *  - #25 reverse-causation-feedback (Track 4, public): COVID-19 aid years +2.47 vs. pre-2020 yearly (-2.38), 13-yr (-4.32, adj. p = 0.067), and two-step check (-5.31)
 *  - #26 measurement-error-claims (Track 4, community): One-list counts vs. matched Medicaid claims, OIG LEIE, and California DHCS S&I records
 *  - #27 collider-bias (Track 4, public): 2024-biller subset selection bias (0.442 vs. 0.724 score) and Bayes full-list alert-rate adjustment
 *  - #29 classifying-causal-mechanisms (Track 4, public): Confounder, care step, sample filter, and Stage 1 check across four separate CAPHE datasets
 *  - #30 sensitivity-analysis-cea (Track 4, public): Single middle estimate vs. HHS 2025 VSL range, plus CHW payments and savings by payer
 */

const { renderModuleHtml } = require('./render_option_c');

const modules = [
  // =========================================================================
  // MODULE #25: reverse-causation-feedback (Track 4, public)
  // =========================================================================
  {
    slug: 'reverse-causation-feedback',
    tetsCompanion: [
      {
        visibleLabel: 'County Health Spending by Period',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 yearly county records), each extra dollar spent per person links with -0.238 deaths per 100,000 in 2003 to 2019. In 2020 to 2023, it links with +0.247 deaths per 100,000.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: Health Needs &amp; Funding Links &middot; Relief Aid vs. Pre-2020 Spending',
    pageTitle: 'Pandemic Aid & Routine County Health Budgets | CAPHE',
    metaDescription: 'In 2020-2023, $10 per person linked with +2.47 deaths/100K during pandemic aid. Pre-2020 models showed 2.38 to 5.31 fewer deaths, without proving cause.',
    h1: 'Combining Pandemic Aid With Routine County Health Budgets Mixes Relief Grants With Pre-2020 Links',
    subtitle: 'Testing 2020-2023 pandemic grant years apart from pre-2020 county spending over 1 and 13 years.',
    endnotes: [
      '<strong>California County Health Spending Records (2003-2023).</strong> <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a> matched with <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Public Health (CDPH) Vital Statistics</a> death records across 57 counties. The file has 1,163 yearly county records in total. It covers 943 records in 2003-2019, 779 in 2003-2016 on one reporting form, and 220 in 2020-2023.',
      '<strong>Relief Aid in Response to Need vs. Pre-2020 Links.</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), <em>Journal of Business &amp; Economic Statistics</em>, 30(1), 67-80</a> gives the two-step check using differences in how county data vary. Before 2020, each extra $10 spent per person links with 2.38 fewer yearly deaths per 100,000. Over 13-year changes, the link is 4.32 fewer deaths (unadjusted p = 0.0052; adjusted p = 0.067 across multiple tests). The two-step check estimates 5.31 fewer deaths (first-step F = 111.20). In 2020-2023, $10 per person links with +2.47 more deaths (p = 0.0010), consistent with relief aid going to counties with rising deaths. Combining 2003-2023 gives -0.25 (p = 0.710). If spending caused fewer deaths, costs per death avoided at the $13.6M federal value are $420,168 (32.4:1), $231,481 (58.8:1, adjusted p = 0.067), and $188,324 (72.2:1).',
      '<strong>County Government Study and Federal Death-Risk Values.</strong> <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), <em>Economics &amp; Human Biology</em>, 13, 34-45</a> studies county health spending links in California. <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Department of Health and Human Services (HHS) ASPE 2025 Guidelines</a> set the $13.6M middle Value of a Statistical Life (VSL).'
    ],
    policySettingHtml: 'County health spending and local death rates show opposite links before and during COVID-19. Before 2020, higher routine county spending links with lower death rates. From 2020 to 2023, higher spending instead appears in the same years as higher death rates. Reverse causation is one possible reason when agencies send more relief aid where deaths rise. Combining pandemic grant years with pre-2020 budgets mixes these two opposite periods.',
    answerHtml: `Testing pre-2020 budgets across <strong>943 yearly county records</strong> from California (2003 to 2019) shows how routine spending links with death rates [1]. In yearly models, each extra <strong>$10 spent per resident</strong> links with <strong>2.38 fewer deaths per 100,000</strong> per year [2]. Over 13-year changes, the link is <strong>4.32 fewer deaths per 100,000</strong> per year (unadjusted <em>p</em> = 0.0052; adjusted <em>p</em> = 0.067) [2]. A second two-step check gives <strong>5.31 fewer deaths per 100,000</strong> per year over 13 years [2]. Federal rules value reduced death risk equal to one expected death at $13.6M, called the Value of a Statistical Life (VSL) [3]. If spending caused fewer deaths, costs per death avoided are <strong>$420,168</strong> (<strong>32.4:1</strong>), <strong>$231,481</strong> (<strong>58.8:1</strong>, adjusted <em>p</em> = 0.067), and <strong>$188,324</strong> (<strong>72.2:1</strong>) [2,3]. Those dollar figures are resident health values, not county cash [3]. In 2020 to 2023, spending rose 64.2% ($102.75 to $168.70 per resident) with a <strong>+2.47</strong> link, and combining 2003 to 2023 gives <strong>-0.25</strong> [1,2].`,
    block2: {
      title: 'Pandemic Aid Years vs. Pre-2020 Links Across 57 Counties',
      contextTag: '57 Counties, 943 Pre-2020 Records and 220 COVID-19 Records, 2003 to 2023',
      ariaLabel: 'Comparison of the 2020-2023 COVID-19 aid period link of +2.47 deaths per 100,000 versus pre-2020 links of -2.38 yearly and -4.32 (adjusted p = 0.067) to -5.31 over 13-year spans',
      ruler1: {
        title: 'COVID-19 Aid Period (2020-2023)',
        stat: '+2.47 Deaths / 100K (4.85-Point Sign Change)',
        ariaLabel: 'COVID-19 2020-2023 link is +2.47 deaths per 100,000 per $10 per resident, 4.85 points above the -2.38 pre-2020 yearly link during emergency grant years',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '4.85-Point Change (+2.47 COVID Aid vs. -2.38 Pre-2020)' },
          { cls: 'seg-rest', width: 8, label: '+2.47 COVID' }
        ],
        desc: 'From 2020 to 2023, average county spending rose 64.2% ($102.75 to $168.70 per resident) with a <strong>+2.47</strong> link (<strong>4.85 points above</strong> pre-2020). Combining 2003-2023 gives <strong>-0.25</strong>. Relief aid to counties with large death increases is one possible reason.'
      },
      ruler2: {
        title: 'Pre-2020 Links Over 1 and 13 Years',
        stat: '-2.38 Yearly | -4.32 13-Yr (adj. p = 0.067) | -5.31 Check',
        ariaLabel: 'Pre-2020 models estimate links of -2.38 deaths per 100,000 per year and -4.32 over 13-year changes (adjusted p = 0.067), plus -5.31 in two-step checks',
        segments: [
          { cls: 'seg-primary', width: 55, label: 'Yearly Link: -2.38 / 100K' },
          { cls: 'seg-food', width: 45, label: '13-Yr Link: -4.32 (adj. p = 0.067)' }
        ],
        desc: 'Pre-2020 records show links of <strong>-2.38 deaths/100K</strong> per year, <strong>-4.32</strong> over 13-year changes (<strong>adjusted p = 0.067</strong>), and <strong>-5.31</strong> in two-step checks. If spending caused fewer deaths, costs per death avoided are <strong>$420,168</strong> (<strong>32.4:1</strong>), <strong>$231,481</strong> (<strong>58.8:1</strong>, <strong>adjusted p = 0.067</strong>), and <strong>$188,324</strong> (<strong>72.2:1</strong>).'
      }
    },
    table1: {
      title: 'Table 1. Comparing Years With Increased Pandemic Aid and Pre-2020 Links',
      subtitle: 'How 2020-2023 pandemic aid years compare with pre-2020 yearly and 13-year death-rate links per $10 per person.',
      caption: 'Compare pandemic years, yearly county records before 2020, changes over 13 years, and a second-method check per $10 per person.',
      cornerLabel: 'Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Reported County Links and Dollar Estimates Assuming Cause and Effect).</strong> In 2020-2023 (220 records), the county and year model gives +2.47 deaths per 100,000 per $10 (SE = 0.75 per $10; +0.247 per $1, SE = 0.075 per $1, p = 0.0010). Combining 2003-2023 (1,163 records) gives -0.25 per $10 (SE = 0.67 per $10; -0.025 per $1, SE = 0.067 per $1, p = 0.710). Before COVID-19 in 2003-2019 (943 records), the model gives -2.38 per $10 (SE = 0.78 per $10; -0.238 per $1, SE = 0.078 per $1, p = 0.0022; repeat-sample check p = 0.007). City counties show -2.59 per $10 (p &lt; 0.0001) and smaller counties show -2.42 per $10 (p = 0.0136). Comparing 13-year changes in 2003-2016 (57 counties) gives -4.32 per $10 (SE = 1.54 per $10, unadjusted p = 0.0052, adjusted p = 0.067). Over 16 years (2003-2019, leaving out 5 reporting-change outliers), the link is -5.91 per $10 (SE = 2.77 per $10, p = 0.0330). The 13-year Lewbel two-step check gives -5.31 per $10 (SE = 1.67 per $10, p = 0.0015, first-step F = 111.20). Its Hansen J check gives p = 0.2132, which does not prove causal assumptions. Rows with * assume spending caused fewer deaths under 2025 HHS values ($6.3M, $13.6M, $20.7M) for $10 more per resident statewide.',
      columns: [
        { tag: 'Increased Pandemic Aid', tagHighlight: false, title: 'COVID-19 Aid Period', subtitle: '2020-2023 records, N = 220' },
        { tag: 'Yearly Baseline', tagHighlight: true, title: 'Yearly Pre-2020 Records', subtitle: '2003-2019 records, N = 943' },
        { tag: '13-Yr Span', tagHighlight: false, title: 'Changes Over 13 Years', subtitle: '2003-2016 form, N = 57 (adj. p = 0.067)' },
        { tag: 'Second Check', tagHighlight: true, title: 'Second-Method 13-Yr Check', subtitle: '2003-2016 two-step check, N = 57' }
      ],
      rows: [
        {
          label: 'Study Records &amp; Method',
          cells: [
            { val: 'COVID-19 years (2020-2023)' },
            { val: 'Pre-2020 records (2003-2019)' },
            { val: '13-yr changes (2003-2016)' },
            { val: '13-yr two-step check (2003-2016)' }
          ]
        },
        {
          label: 'Reported Link With Deaths',
          cells: [
            { val: 'Positive COVID-19 link (+2.47)' },
            { val: 'Yearly spending and death link' },
            { val: '13-yr change link (adj. p = 0.067)' },
            { val: 'Check using county data spread' }
          ]
        },
        {
          label: 'How Relief Aid Is Handled',
          cells: [
            { val: 'Spending rose 64.2% in COVID-19' },
            { val: 'Leaves out 2020-2023 COVID years' },
            { val: '13 years on one reporting form' },
            { val: 'Appendix check on 13-yr form' }
          ]
        },
        {
          label: 'Yearly Death Change per 100K ($10/Person)',
          highlight: true,
          cells: [
            { val: '+2.47 more deaths (2020-2023 COVID)', barWidth: 2, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '-2.38 deaths / 100K (per yr)', barWidth: 45, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-4.32 deaths / 100K (13-yr, adj. p=0.067)', barWidth: 81, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-5.31 deaths / 100K (per yr, check)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Cost per Death Avoided (If Causal)*',
          modeled: true,
          cells: [
            { val: 'Not calculated (+2.47 COVID link)' },
            { val: '$420,168 per death (if causal)' },
            { val: '$231,481 per death (if causal, adj. p=0.067)' },
            { val: '$188,324 per death (if causal)' }
          ]
        },
        {
          label: 'Health Value per $1 (If Causal)*',
          modeled: true,
          cells: [
            { val: 'Not calculated (+2.47 COVID link)' },
            { val: '32.4:1 if causal (15.0:1-49.3:1)' },
            { val: '58.8:1 if causal (27.2:1-89.4:1, adj. p=0.067)' },
            { val: '72.2:1 if causal (33.5:1-109.9:1)' }
          ]
        },
        {
          label: 'Statewide $10/Person Total (If Causal)*',
          modeled: true,
          cells: [
            { val: 'Not calculated (+2.47 COVID link)' },
            { val: '928 deaths/yr ($12.6B if causal)' },
            { val: '1,685 deaths/yr ($22.9B if causal)' },
            { val: '2,071 deaths/yr ($28.2B if causal)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Testing County Health Budgets Apart From Pandemic Grants',
      subtitle: 'How testing pandemic grant years apart from routine budgets guides county board reviews.',
      caption: 'The table compares spending links, errors from combining periods, limits on dollar estimates, and rules for county reviews.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'COVID-19 Aid Period', subtitle: '220 records, 57 CA counties; 2020-2023 (+2.47)' },
        { title: 'Yearly Pre-2020 Records', subtitle: '943 records, 57 CA counties; 2003-2019 (-2.38)' },
        { title: 'Changes Over 13 Years', subtitle: '57 CA counties; 2003-2016 changes (-4.32, adj. p = 0.067)' },
        { title: 'Second-Method 13-Yr Check', subtitle: '57 CA counties; 2003-2016 check (-5.31)' }
      ],
      rows: [
        {
          label: 'Reported Link by Period',
          cells: [
            { val: 'Spending rose 64.2% ($102.75 to $168.70) with a +2.47 link during relief aid.' },
            { val: 'Pre-2020 spending links with lower death rates in city (-2.59) and rural (-2.42) counties.' },
            { val: 'The 13-year link (-4.32, adj. p = 0.067) is larger than the yearly link (-2.38).' },
            { val: 'A second method checks the 13-year link on records before the 2017 form change.' }
          ]
        },
        {
          label: 'Error When Periods Mix',
          cells: [
            { val: 'Combining pre-2020 years and pandemic years in 2003-2023 gives a -0.25 link.' },
            { val: 'Reading county spending links as cash savings overstates what non-random data show.' },
            { val: 'Reporting the 13-year link (-4.32) without adj. p = 0.067 overstates certainty.' },
            { val: 'Log models have weak Stage 1 strength (F = 0.85), and causal rules cannot be tested.' }
          ]
        },
        {
          label: 'Dollar Estimates If Causal',
          cells: [
            { val: 'Combining relief aid with routine budgets averages out pre-2020 links in board reviews.' },
            { val: 'The 2.38 estimate implies $420,168 per death avoided (32.4:1), if spending caused it.' },
            { val: 'The 13-year estimate (adj. p = 0.067) implies $231,481 (58.8:1), if spending caused it.' },
            { val: 'The second-method check (-5.31) implies $188,324 (72.2:1), if spending caused it.' }
          ]
        },
        {
          label: 'Recommended County Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'Test Pandemic Years Apart', detail: 'Review 2020-2023 pandemic aid years apart from pre-2020 routine county spending links.' },
            { headline: 'State Yearly Results as Links', detail: 'Report 2.38 fewer deaths/100K as a link, and state $420,168 (32.4:1) assumes cause.' },
            { headline: 'Show adj. p = 0.067 With 4.32', detail: 'Report the 4.32 13-year link with adj. p = 0.067, and state $231,481 (58.8:1) assumes cause.' },
            { headline: 'Keep Two-Step Runs as Checks', detail: 'Treat -5.31 ($188,324 per death if causal) as an extra check, not cash savings.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Methods, Time Spans, and Data Sources',
      notesBullets: [
        '<strong>Methods and County Groups.</strong> Across 57 counties in 2003-2019 (943 records), the county and year model gives -2.38 deaths per 100,000 per $10 (SE = 0.78 per $10; -0.238 per $1, SE = 0.078 per $1, p = 0.0022; repeat-sample check p = 0.007). Links are also reported in large city counties (-2.59 per $10, p &lt; 0.0001) and smaller counties (-2.42 per $10, p = 0.0136). On the 2003-2016 reporting form (779 records), the yearly link is -2.62 per $10 (p = 0.0128).',
        '<strong>Pandemic Aid Period and 13-Year Spans.</strong> Each model relates yearly county death rates to health spending while accounting for county traits, lasting county differences, and statewide yearly changes. In 2020-2023 (220 records), unadjusted spending rose 64.2% ($102.75 to $168.70 per person) during COVID-19 deaths and linked with +2.47 per $10 (SE = 0.75 per $10; +0.247 per $1, SE = 0.075 per $1, p = 0.0010). Comparing 13-year changes in 2003-2016 (57 counties) gives -4.32 per $10 (SE = 1.54 per $10, unadjusted p = 0.0052, adjusted p = 0.067). Over 16 years (2003-2019, 49 counties after dropping 5 reporting outliers), the link is -5.91 per $10 (SE = 2.77 per $10, p = 0.0330). The 13-year Lewbel two-step check gives -5.31 per $10 (SE = 1.67 per $10, p = 0.0015, first-step F = 111.20, Hansen J p = 0.2132). In log units, first-step F is only 0.85, so two-step models stay appendix checks.',
        '<strong>Why $1 and $10 Units Give the Same Dollar Estimates.</strong> Links per $1 per person (-0.238 yearly, -0.432 over 13 years with adjusted p = 0.067, and -0.531 in the two-step check) multiply both cost and deaths by 10 at the $10 scale (-2.38, -4.32, and -5.31). Because both sides multiply by 10, both units imply the same costs per death avoided if spending caused the change: $420,168 (32.4:1), $231,481 (58.8:1, adjusted p = 0.067), and $188,324 (72.2:1) at the $13.6M HHS value.',
        '<strong>Where the Data and Results Come From.</strong> Estimates come from the CAPHE Local Health Authority (LHA) calculator code, methods notes, and the 57-county California public health spending study.'
      ]
    },
    synthesis: {
      title: 'Testing Pandemic Aid Years Apart From Pre-2020 County Spending',
      p1: 'County health spending and death rates show two distinct links across time periods. From 2020 to 2023, average county spending rose 64.2% ($102.75 to $168.70 per resident) with a +2.47 death-rate link per $10 (p = 0.0010). Reverse causation is one possible reason because state and federal agencies sent relief grants to counties with large increases in deaths. When all years from 2003 to 2023 are combined, the link is -0.25 (p = 0.710). Testing the two periods apart keeps emergency grant years separate from routine budget links.',
      p2: 'Checking pre-2020 budgets alone (943 county records) shows how spending links compare over 1 and 13 years. Yearly models report links with 2.38 fewer deaths per 100,000 per $10 across city (-2.59) and smaller (-2.42) counties. Based on 13-year changes, the link is 4.32 fewer deaths per 100,000 per year (unadjusted p = 0.0052; adjusted p = 0.067), and a two-step check gives 5.31. At the $13.6M federal value, these imply $420,168 per death avoided (32.4:1), $231,481 (58.8:1, adjusted p = 0.067), and $188,324 (72.2:1). These figures estimate health value only if spending caused fewer deaths, not county cash savings.'
    },
    methodologyParagraphs: [
      '<strong>Reported County Links and Dollar Estimates Using Federal Values.</strong> County spending links (+2.47 in 2020-2023, -0.25 across 2003-2023, -2.38 in 2003-2019, -2.42 in smaller counties, -2.59 in city counties, -4.32 over 13-year changes with unadjusted p = 0.0052 and adjusted p = 0.067, -5.91 over 16 years, and -5.31 in the 13-year Lewbel two-step check) come from the 57-county California spending study and CAPHE LHA calculator files. Costs per death avoided and value ratios ($420,168 and 32.4:1; $231,481 and 58.8:1 with adjusted p = 0.067; $188,324 and 72.2:1) apply 2025 HHS values ($6.3M, $13.6M, $20.7M) and assume spending caused fewer deaths.',
      '<strong>Primary References &amp; Data Sources.</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES, 30(1), 67-80</a>; <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), Economics &amp; Human Biology, 13, 34-45</a>; <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a>; <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics Mortality Data</a>; and <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 VSL Guidelines</a>.'
    ],
    faqs: [
      {
        question: 'What is reverse causation in county health budgets, and when might it occur?',
        answer: 'Reverse causation occurs when agencies send more health aid because local health worsened, rather than spending causing deaths. From 2020 to 2023, county spending rose 64.2% with a +2.47 death-rate link per $10 (p = 0.0010). Combining 2003 to 2023 gives -0.25. Relief grants to counties with large death increases are one possible reason, though models cannot prove grant timing caused it.'
      },
      {
        question: 'How do the $1 per resident spending links relate to the $10 per resident figures?',
        answer: 'The study reports links per $1 spent per person: -0.238 per year, -0.432 over 13 years (adjusted p = 0.067), and -0.531 in two-step checks. Multiplying both cost and death-rate change by 10 gives -2.38, -4.32 (adjusted p = 0.067), and -5.31 per $10. This unit change does not alter death rates. Both units give the same dollar values if causal ($420,168 and $231,481).'
      },
      {
        question: 'How should county boards read $420,168 per death avoided, 32.4:1, and 58.8:1 (adj. p = 0.067)?',
        answer: 'Those figures estimate resident health value only if spending caused lower death rates. They are not cash paid to county budgets. If causal, the -2.38 yearly link implies $420,168 per death avoided and 32.4:1 at $13.6M (15.0:1 to 49.3:1). Under that same rule, the -4.32 13-year link (adjusted p = 0.067) implies $231,481 and 58.8:1 (27.2:1 to 89.4:1, adjusted p = 0.067).'
      }
    ],
    related: [
      { slug: 'observational-to-experimental', title: 'Routine County Health Spending Links With Lower Death Rates Outside Pandemic Grant Years', note: 'Case study comparing 2020-2023 pandemic spending (+2.47) with yearly (-2.38) and 13-year (-4.32, adj. p = 0.067) links' },
      { slug: 'budget-impact', title: 'Programs With Large Long-Term Health Gains Still Need Plans for Yearly Cash and Reserves', note: 'Case study comparing death-risk dollar values, if causal, with Year-1 county payroll plans' },
      { slug: 'sensitivity-analysis-cea', title: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal', note: 'Case study testing 32.4:1 yearly and 58.8:1 (adj. p = 0.067) 13-year values across federal rates if causal' }
    ]
  },

  // =========================================================================
  // MODULE #26: measurement-error-claims (Track 4, community)
  // =========================================================================
  {
    slug: 'measurement-error-claims',
    tetsCompanion: [
      {
        visibleLabel: 'Why Federal Exclusions Differ From Fraud',
        title: 'The Label That Isn\'t: Why "Excluded" Doesn\'t Mean "Fraudulent"',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-labels/',
        claimCovered: 'Reasons federal law allows exclusions under Section 1128 and why an LEIE exclusion also occurs for non-fraud reasons. The 40% license-loss share and matched counts are article-reported.'
      },
      {
        visibleLabel: 'Guide to 238 Million Medicaid Billing Rows',
        title: 'What 238 Million Medicaid Billing Rows Can Support',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
        claimCovered: 'Fields in the HHS Medicaid spending file, including IDs for the provider who bills and the provider who gives care, rules for withheld small counts, and its 238,015,729 rows.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 4: Checking Program Rules by Matching Records &middot; Matching Claims With Federal &amp; State Ban Lists',
    pageTitle: 'Matching Medicaid Claims With Ban Lists | CAPHE',
    metaDescription: 'Matching 488,032 Medicaid billers with federal OIG and CA ban lists finds 199 California-only bans (30.7%) and a 50-month median wait after final claims.',
    h1: 'Matching Paid Medicaid Claims With Federal and State Ban Lists Finds Providers One List Leaves Out',
    subtitle: 'Matching paid Medicaid claims with federal and state ban lists to find state-only bans and 50-month waits.',
    endnotes: [
      '<strong>National Medicaid Claims and Matched Ban Records (2018-2024).</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending</a> records cover 488,032 billing National Provider Identifiers (NPIs). These include 487,384 billers with no ban-list match and 449 matches on the federal <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Office of Inspector General List of Excluded Individuals/Entities (OIG LEIE)</a>. Those 449 federal matches include 299 exclusions under fraud-related rules and 150 other federal exclusions.',
      '<strong>California-Only Suspension Records.</strong> <a href="https://files.medi-cal.ca.gov/pubsdoco/SandILanding.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California Department of Health Care Services (DHCS) Suspended &amp; Ineligible (S&amp;I) Provider List</a> is the single state ban list matched in this study. It identifies 199 of the 648 banned or suspended billers (30.7%) who have zero federal OIG LEIE match.',
      '<strong>Wait Until a Ban and Directory Context.</strong> Exactly 95 billers banned under fraud-related rules in 2025 or later had paid claims in 2018-2024 ($9,694.90 median monthly pay vs. $3,820.94 for comparison billers). Their federal bans posted a median 50.0-month wait after their final paid claim, and 90.5% stopped billing before 2024. <a href="https://doi.org/10.1377/hlthaff.2022.00383" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Zhu, J. M., et al. (2023), <em>Health Affairs</em>, 42(1), 49-57</a> reports that 58% of listed Oregon Medicaid mental health providers saw few or no Medicaid patients.'
    ],
    policySettingHtml: 'Health plans check clinic lists and ban lists to count doctors and block banned billers. Yet federal and state ban lists do not update each other, so their records differ. Fraud cases also take years to close after a biller sends a final paid claim. So formal bans often post long after billing ends. Checking one list on one date leaves out state-only bans and misses past claims.',
    answerHtml: 'Health and Human Services (HHS) files record <strong>488,032 national Medicaid billers</strong> from 2018 to 2024 [1]. Matching paid claims with federal OIG and state ban lists finds <strong>487,384 billers with no match</strong> [1,2]. The remaining <strong>648</strong> matched billers split into three groups [1,2]. They include <strong>299</strong> bans under federal fraud rules, <strong>199</strong> on the California list only, and <strong>150</strong> other federal bans [1,2]. Checking the federal list alone leaves out all <strong>199</strong> state-only records (30.7%) [2]. Meanwhile, <strong>95</strong> billers banned under fraud rules in 2025 or later received a median <strong>$9,694.90</strong> per month [3]. That monthly paid amount exceeds comparison billers (<strong>$3,820.94</strong>) and <strong>204</strong> billers banned in 2018 to 2024 (<strong>$6,721.78</strong>) [1,3]. The median time from final paid claim to federal ban was a <strong>50.0-month</strong> wait [3].',
    block2: {
      title: 'One-List Counts vs. Matched Claims and Two Ban Lists',
      contextTag: 'Matched Records From HHS Medicaid Spending (2018-2024), OIG LEIE (Feb 2026), and CA DHCS S&amp;I List',
      ariaLabel: 'Comparison of 648 banned or suspended NPIs counted as one total versus the same 648 NPIs matched into 299 fraud-related exclusions, 199 California-only suspensions, and 150 other federal exclusions',
      ruler1: {
        title: 'Single Total Without Ban Type or Date',
        stat: '488,032 Billers; 648 Banned or Suspended as One Total',
        ariaLabel: 'The single count lists 488,032 Medicaid billing NPIs, of which 648 appear on a ban list as one combined total',
        segments: [
          { cls: 'seg-gross', width: 100, label: '648 Matched Billers Counted Without Ban Type or Date (100%)' }
        ],
        desc: 'Counting <strong>488,032 Medicaid billers</strong> and <strong>648 (0.13%)</strong> banned billers as one single total does not separate fraud-related bans, state-only records, or the 50.0-month wait after final claims.'
      },
      ruler2: {
        title: 'Matched Paid Claims and Both Ban Lists',
        stat: '299 Fraud-Related + 199 CA-Only + 150 Other',
        ariaLabel: 'Matching both lists separates the 648 NPIs into 299 fraud-related exclusions (46.1 percent), 199 California-only suspensions (30.7 percent), and 150 other federal exclusions (23.1 percent), beside 487,384 comparison billers',
        segments: [
          { cls: 'seg-primary', width: 46, label: '299 Fraud-Related (46.1%)' },
          { cls: 'seg-Housing', width: 31, label: '199 CA Only (30.7%)' },
          { cls: 'seg-food', width: 23, label: '150 Other Federal (23.1%)' }
        ],
        desc: 'Matching paid claims with both lists separates <strong>487,384 billers with no match</strong> from <strong>299 fraud-related federal bans</strong> (204 in 2018-2024; 95 in 2025+), <strong>199 California-only records (30.7%)</strong>, and <strong>150 other federal bans</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Paid Claims and Ban Timing Across Four Provider Groups',
      subtitle: 'How paid Medicaid claims from 2018-2024 match federal OIG and California ban records.',
      caption: 'Compare four provider groups by number of providers, ban-list source, monthly payments, patient counts, and time until a ban.',
      cornerLabel: 'Matched Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Matched Payment and Ban Records).</strong> This study matches 2018-2024 HHS Medicaid payment records using each biller\'s National Provider Identifier (NPI), which may identify a person or an organization. It checks the February 2026 federal OIG LEIE and California\'s Suspended and Ineligible (S&amp;I) list. Each column reports medians for its group. For billers banned in 2025 or later, the median time from the final paid claim to a federal ban is 50.0 months (average 50.7 months). Separate directory study context: Zhu et al. (2023) found that 58% of listed Oregon Medicaid mental health providers saw few or no Medicaid patients.',
      columns: [
        { tag: 'Group 1: Baseline', tagHighlight: false, title: 'No Match on Either Ban List', subtitle: '487,384 billing IDs in 2018-2024 claims' },
        { tag: 'Group 2: 2018-2024 Ban', tagHighlight: true, title: 'Banned in 2018-2024', subtitle: '204 billing IDs under Spec A fraud rules' },
        { tag: 'Group 3: Later Ban', tagHighlight: true, title: 'Banned in 2025 or Later', subtitle: '95 billing IDs paid in 2018-2024 before ban' },
        { tag: 'Group 4: State File', tagHighlight: true, title: 'California List Only', subtitle: '199 of 648 matched IDs with no federal record' }
      ],
      rows: [
        {
          label: 'Provider Group Count (% of 488,032)',
          cells: [
            { val: '487,384 providers (99.87%)' },
            { val: '204 providers (0.042%)' },
            { val: '95 providers (0.019%)' },
            { val: '199 providers (0.041%; 30.7% of 648)' }
          ]
        },
        {
          label: 'Source of Ban or Suspension Record',
          cells: [
            { val: 'No federal or CA ban match' },
            { val: 'Federal OIG list (2018-2024)' },
            { val: 'Federal OIG list (2025 or later)' },
            { val: 'California list only (no federal match)' }
          ]
        },
        {
          label: 'Monthly Paid Claims (Median)',
          highlight: true,
          cells: [
            { val: '$3,820.94 (comparison median)', barWidth: 39, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$6,721.78 (1.76x comparison)', barWidth: 69, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '$9,694.90 (2.54x comparison)', barWidth: 100, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: 'Not reported in source tables' }
          ]
        },
        {
          label: 'Patients per Month &amp; Total Paid',
          cells: [
            { val: '33.42 patients/mo | $83,867 paid' },
            { val: '50.76 patients/mo | $81,474 paid' },
            { val: 'Median total paid: $242,405' },
            { val: 'Not reported in source tables' }
          ]
        },
        {
          label: 'Ban Timing &amp; File Status',
          cells: [
            { val: 'Paid claims without ban match' },
            { val: 'Banned during 2018-2024' },
            { val: '50.0-month wait after final claim' },
            { val: 'CA suspension (no date in file)' }
          ]
        },
        {
          label: 'Claims &amp; List Details',
          cells: [
            { val: 'National HHS Medicaid billers' },
            { val: 'Includes months before and after bans' },
            { val: '90.5% stopped billing before 2024' },
            { val: '199 CA-only records (30.7% of 648)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How Differences Between Ban Lists Affect Provider Counts and Audits',
      subtitle: 'How matching paid claims with both ban lists guides provider counts and monthly checks.',
      caption: 'Compare billing findings, records that one list leaves out, risks for health plans, and checks using both lists.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'No Match on Either Ban List', subtitle: '487,384 billing IDs in 2018-2024 HHS claims' },
        { title: 'Banned in 2018-2024', subtitle: '204 billing IDs under OIG Spec A fraud rules' },
        { title: 'Banned in 2025 or Later', subtitle: '95 billing IDs banned after the 2018-2024 period' },
        { title: 'California List Only', subtitle: '199 of 648 matched IDs with no federal record' }
      ],
      rows: [
        {
          label: 'Matched Claims Finding',
          cells: [
            { val: 'Billers with no ban-list match received a median $3,820.94 per month for 33.42 patients.' },
            { val: 'Billers banned in 2018-2024 received $6,721.78 per month (1.76x comparison) while billing.' },
            { val: 'Billers banned in 2025 or later received $9,694.90 per month (2.54x comparison) while billing.' },
            { val: 'Exactly 199 billers appear on the California list with zero federal OIG match.' }
          ]
        },
        {
          label: 'What One List Check Leaves Out',
          cells: [
            { val: 'Provider lists can count a doctor who sees no Medicaid patients like a busy clinic.' },
            { val: 'A match without a ban date cannot separate pay before a ban from stops after it.' },
            { val: 'Formal federal bans post a median 50.0 months after a provider\'s final paid claim.' },
            { val: 'Federal OIG checks leave out 30.7% of matched billers listed only by California.' }
          ]
        },
        {
          label: 'Risk When Not Matched',
          cells: [
            { val: 'Counting all 487,384 billers as equal care supply overstates patient access.' },
            { val: 'Removing all records for 204 banned billers also deletes their paid claims before bans.' },
            { val: 'A 2024 federal list check shows no recorded ban for 95 billers who were banned later.' },
            { val: 'Plans that check only the federal list do not catch California bans for 199 billers.' }
          ]
        },
        {
          label: 'Recommended Audit Rule',
          policyFit: true,
          cells: [
            { headline: 'Count Paid Claims and Patients', detail: 'Measure care access using paid claims and monthly patient counts, not list names.' },
            { headline: 'Match Ban Dates to Claim Months', detail: 'Match ban dates to monthly claims to separate pre-ban pay from post-ban changes.' },
            { headline: 'Re-Check Past Claims With New Lists', detail: 'Match updated ban lists to older claims because bans post 50 months after final claims.' },
            { headline: 'Check Federal and State Lists', detail: 'Match every billing ID against both federal OIG and state ban lists each month.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: How Counts Add Up, Payment Ratios, and Directory Studies',
      notesBullets: [
        '<strong>Matching Counts Across Ban Lists.</strong> Out of 488,032 Medicaid billing IDs (487,384 with no match plus 648 matched), the 648 matched providers include 299 federal exclusions under fraud-related rules (204 dated 2018-2024 and 95 dated 2025 or later under Social Security Act sections 1128(a)(1), 1128(a)(3), and 1128(b)(1)). They also include 199 California-only suspensions (30.7%) and 150 other federal exclusions (449 federal matches in total, or 69.3%).',
        '<strong>Monthly Payments and Wait Until a Ban.</strong> Median monthly payments are 1.76 times as high as comparison billers for 2018-2024 fraud-related bans ($6,721.78 vs. $3,820.94) and 2.54 times as high for 2025+ bans ($9,694.90 vs. $3,820.94). The 50.0-month median wait (average 50.7; middle half 32.5 to 68.0 months) measures time from the final paid claim to a federal ban. Matching updated lists corrects past records, while plans still need to watch current claims.',
        '<strong>Separate Findings on Provider Directories.</strong> Zhu et al. (2023, <em>Health Affairs</em>) found that 58% of listed Oregon Medicaid mental health providers saw few or no Medicaid patients. That finding shows why plans should check paid claims alongside provider lists.',
        '<strong>Data Sources.</strong> Counts, payment medians, and wait times come from the Medicaid claims and ban-list matching study tables.'
      ]
    },
    synthesis: {
      title: 'Matching Paid Claims With Both Federal and State Ban Lists',
      p1: 'Clinic lists and ban lists show records from one date. They show who held a license or ban that day, not who billed for care. Across 488,032 Medicaid billers and 648 matched billers, one list leaves out two facts. First, clinic lists keep doctors who see few or no Medicaid patients (58% in Oregon). Second, federal OIG checks leave out 199 billers on the state list (30.7% of 648).',
      p2: 'Checking both ban lists still shows closed cases rather than fraud occurring now. Formal bans often post years after billing stops. Here, 95 billers banned under fraud rules in 2025 or later received $9,694.90 per month (2.54x the $3,820.94 median). Among those 95 billers, 90.5% stopped billing before 2024. Their federal bans posted a median 50.0-month wait after their final paid claim. Matching monthly paid claims with both lists helps plans count care and check past bills.'
    },
    methodologyParagraphs: [
      '<strong>Sources for the Matched Payment and Ban Records.</strong> Provider counts (488,032 billing IDs; 487,384 with no match; 204 during-period and 95 later federal fraud-related bans; 199 California-only suspensions; 150 other federal bans; 648 matched in total) come from the Medicaid claims matching study. Monthly payment medians ($3,820.94, $6,721.78, $9,694.90), patient medians (33.42, 50.76), and the 50.0-month median wait come from the same linked records. The 58% Oregon directory share comes from Zhu et al. (2023).',
      '<strong>Primary References &amp; Data Sources.</strong> <a href="https://doi.org/10.1377/hlthaff.2022.00383" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Zhu, J. M., Charlesworth, C. J., Polsky, D., &amp; McConnell, K. J. (2023), <em>Health Affairs</em>, 42(1), 49-57</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG List of Excluded Individuals/Entities (LEIE)</a>; and the <a href="https://files.medi-cal.ca.gov/pubsdoco/SandILanding.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Suspended &amp; Ineligible Provider List</a>.'
    ],
    faqs: [
      {
        question: 'Why does checking only the federal OIG ban list miss suspended Medi-Cal billers?',
        answer: 'State Medicaid rules let states suspend billers without updating the federal OIG list right away. As a result, state and federal files can list different billers. Out of 648 matched Medicaid billers in the 2018 to 2024 file, 199 (30.7%) appear on the California list only, with zero federal match.'
      },
      {
        question: 'Why do billers later banned for fraud have no recorded ban in checks from the billing year?',
        answer: 'Fraud cases and formal ban orders take years to close after a biller stops filing claims. Here, the median wait from the final paid claim to a federal ban is 50.0 months. Among 95 billers banned in 2025 or later, 90.5% stopped paid claims before 2024. While billing, they received a median $9,694.90 per month.'
      },
      {
        question: 'What steps should health plans and audit teams use to check provider lists?',
        answer: 'Plans should match every billing ID each month against paid claims, the federal OIG list, and state ban files. Next, teams should count care access using paid claims and patients, not names on a clinic list. Finally, staff should match new ban lists to older claims when checking past bills.'
      }
    ],
    related: [
      { slug: 'collider-bias', title: 'Testing Fraud Checks Only on Current Billers Leaves Out Banned Providers Who Stopped Early', note: 'Case study comparing full-list scores (0.724) with 2024 billers (0.442) and adjusting alert rates to all billers' },
      { slug: 'threat-measurement-instrumentation', title: 'Changes in Data Counting Rules Change Food-Access Scores Even When Store Counts Stay the Same', note: 'Case study comparing map directories with SNAP-listed grocers and deduplicated health permits' },
      { slug: 'identical-data-opposite-policies', title: 'Fixed Medi-Cal Visit Fees Do Not Meet City Clinic Costs While Poor Inland Areas Lack Care', note: 'Case study comparing clinic wage and rent scores with local poverty ranks' }
    ]
  },

  // =========================================================================
  // MODULE #27: collider-bias (Track 4, public)
  // =========================================================================
  {
    slug: 'collider-bias',
    tetsCompanion: [
      {
        visibleLabel: 'Testing Fraud Models on Later Bans',
        title: 'Can a Classifier Find What Investigators Miss?',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-classifier/',
        claimCovered: 'Testing fraud models on later cases and comparing them with simpler models. The article-reported model scores are under reconciliation because reported sample sizes and case rates do not agree.'
      },
      {
        visibleLabel: 'How to Test a Model When Cases Are Rare',
        title: 'Imbalanced Classification: An Article-Reported Example',
        url: 'https://tooearlytosay.com/research/methodology/imbalanced-classifier-python/',
        claimCovered: 'A teaching example in scikit-learn for rare events, showing why a model that calls every case negative can score about 91% accuracy. Counts and scores are article-reported.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: Fraud Testing &amp; Alert-Rate Adjustments &middot; Billing Stop Dates &amp; Full-List Rates',
    pageTitle: 'Full-List vs. Current-Biller Fraud Checks | CAPHE',
    metaDescription: 'Testing fraud scores only on 2024 billers leaves out 86 of 95 later-banned billers (0.724 vs 0.442). Adjusted to all billers, Top 1% alerts match 0.186%.',
    h1: 'Testing Fraud Checks Only on Current Billers Leaves Out Banned Providers Who Stopped Early',
    subtitle: 'Comparing full-list fraud scores with 2024 billers and adjusting alert rates to all billers.',
    endnotes: [
      '<strong>Test of the Full Medicaid Biller List (2018-2024).</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. HHS Medicaid Provider Spending</a> records cover 487,479 billing providers: 95 banned in 2025 or later under fraud-related rules and 487,384 comparison billers. Matched with <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>, the full-list ranking score (AUC) is 0.724 (95% range 0.667-0.777, with 9.53x lift in the highest-scoring 1%). After adjusting comparison billers to match billing stop dates, the score is 0.653.',
      '<strong>2024 Current-Biller Group and Early Stop Dates.</strong> Limiting the test to 55,018 providers still billing in 2024 (9 later-banned billers and 55,009 comparison billers) gives an AUC of 0.442 (95% range 0.212-0.664). That result provides no clear evidence of useful ranking among current billers in this small group. Across the full list, 90.5% of later-banned billers stopped billing before 2024, compared with 43.6% of comparison billers (38.0th vs. 50.0th percentile for months billed).',
      '<strong>Adjusting Alert Rates to the Full List and Review Counts.</strong> Bayes\' rule adjusts the correct alert rate in the highest-scoring 1% from the 1-in-5 comparison sample (0.922%) to the full 487,479-biller list (0.186% vs. 0.0195% exclusion rate). For context, Medicaid Fraud Control Units (MFCUs) had 16,688 active cases at an average cost of $23,719 per active case.'
    ],
    policySettingHtml: 'Audit teams use risk scores to rank Medicaid billers and send top cases for review. Two test rules shape what those scores show. First, full-list tests keep billers who stopped billing before 2024 ahead of later bans. By contrast, 2024-only tests check billers who still bill now. Second, test sets that keep 1 in 5 comparison billers cut false alerts. That choice overstates the share of alerts that find later-banned billers.',
    answerHtml: 'Across all <strong>487,479</strong> Medicaid billers (<strong>95</strong> banned in 2025+ and <strong>487,384</strong> comparison billers, a <strong>0.0195%</strong> rate), the test scores <strong>0.724</strong> on AUC [1]. An AUC of 0.50 means chance ranking, while 1.00 ranks all banned billers higher [1]. Yet 90.5% of later-banned billers stopped before 2024, and stop-date reweighting gives <strong>0.653</strong> [1,2]. Among <strong>55,018</strong> billers active in 2024 (<strong>55,009</strong> comparison and <strong>9</strong> bans), the score is <strong>0.442</strong> [2]. That small group gives no clear sign of ranking above chance [2]. A 1-in-5 sample reports a <strong>0.922%</strong> correct alert rate in the top 1% [3]. Adjusted to the full list, the rate is <strong>0.186%</strong>: <strong>9</strong> bans in <strong>4,844</strong> alerts (<strong>9.53x lift</strong>) [1,3]. Fraud units had <strong>16,688</strong> active cases at <strong>$23,719</strong> per case on average, not per alert [3].',
    block2: {
      title: 'Test-Sample Results vs. Results Adjusted to the Full List',
      contextTag: 'Alert-Rate Adjustment Applied to Random Forest Scores (95 Later-Banned Billers vs. 487,384 Comparison Billers)',
      ariaLabel: 'Comparison of a fraud test evaluated on providers billing in 2024, score 0.442, versus the full list, score 0.724, with Top 1 percent correct alerts at 0.922 percent in the 1-in-5 sample and 0.186 percent on the full list',
      ruler1: {
        title: 'Providers Still Billing in 2024 and 1-in-5 Sample',
        stat: '0.442 Score in 2024 Group; 0.922% Sample Alert Rate',
        ariaLabel: 'Among providers still billing in 2024, 9 later-banned versus 55,009 comparison billers, the test scores 0.442 with 95 percent range 0.212 to 0.664',
        segments: [
          { cls: 'seg-Housing', width: 44, label: '0.442 Score (2024 Billers, 9 Bans)' },
          { cls: 'seg-gross', width: 56, label: 'Remaining Distance to 1.0' }
        ],
        desc: 'Testing only providers <strong>still billing in 2024</strong> (9 later-banned billers and 55,009 comparison billers) gives a ranking score of <strong>0.442</strong>. The separate full-list score is <strong>0.653</strong> after adjusting for billing stop dates. A 1-in-5 comparison sample reports a <strong>0.922%</strong> correct alert rate.'
      },
      ruler2: {
        title: 'Full-List Score and Adjusted Correct Alert Rate',
        stat: '0.724 Full-List Score; 0.186% Adjusted Top 1% Rate',
        ariaLabel: 'Across the full list of 487,479 providers, the test scores 0.724 with 95 percent range 0.667 to 0.777, and the Top 1 percent correct alert rate adjusts to 0.186 percent',
        segments: [
          { cls: 'seg-food', width: 72, label: '0.724 Score (Full 487,479 List)' },
          { cls: 'seg-gross', width: 28, label: 'Remaining Distance to 1.0' }
        ],
        desc: 'Across all <strong>487,479 billers</strong> (<strong>0.0195%</strong> later-ban rate), the model scores <strong>0.724</strong>. Adjusting the top 1% cutoff to the full list gives <strong>4,844 alerts</strong>, <strong>9 identified bans</strong>, a <strong>0.186%</strong> correct alert rate, and <strong>9.53x lift</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Fraud Test Scores, Correct Alert Rates, and Review Counts',
      subtitle: 'How ranking scores and correct alert rates adjusted to the full list compare across four test settings.',
      caption: 'Compare four test settings by provider count, ranking score, correct alert rate in the sample and full list, alert count, lift over random selection, and months billed.',
      cornerLabel: 'Test Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Recorded Test Results and Full-List Adjustments).</strong> A case is positive when a provider has a formal financial-fraud exclusion on the federal OIG LEIE dated 2025 or later (Settings 1-3) or during 2018-2024 (Setting 4). AUC scores how well the model ranks excluded providers above comparison providers (0.50 means chance ranking; 1.00 means all excluded providers rank higher). Full-list AUC is 0.724 (95% range 0.667-0.777, N = 487,479; 0.653 after stop-date reweighting). For providers still billing in 2024 (9 excluded and 55,009 comparison billers), AUC is 0.442 (95% range 0.212-0.664). Comparing similar providers banned during 2018-2024 gives AUC = 0.818, which may reflect billing that ended at the ban. The test sample keeps 20% of comparison providers, and Bayes\' rule adjusts its correct alert rate to the full list\'s 0.0195% rate.',
      columns: [
        { tag: 'Setting 1: Full List', tagHighlight: false, title: 'All Billers, Top 1% Cutoff', subtitle: '487,479 billing IDs (95 later bans + 487,384 comparison)' },
        { tag: 'Setting 2: 2024 Billers', tagHighlight: true, title: 'Still Billing in 2024', subtitle: '55,018 billing IDs in 2024 (9 later bans + 55,009 comparison)' },
        { tag: 'Setting 3: Top 5%', tagHighlight: true, title: 'Top 5% Cutoff Check', subtitle: '487,479 billing IDs; 16,688 active MFCU cases' },
        { tag: 'Setting 4: 2018-2024 Bans', tagHighlight: false, title: 'Banned During 2018-2024', subtitle: '204 bans (peer ranks) and 230 vs. 1,150 matched IDs' }
      ],
      rows: [
        {
          label: 'Test Group Size',
          cells: [
            { val: '95 bans | 487,384 comparison (0.0195%)' },
            { val: '9 bans | 55,009 comparison in 2024' },
            { val: '95 bans | 487,384 comparison (0.0195%)' },
            { val: '230 bans vs. 1,150 matched comparison' }
          ]
        },
        {
          label: 'Ranking Score (0.50 = Chance)',
          highlight: true,
          cells: [
            { val: '0.724 score (0.653 reweighted)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.442 score (2024 billers)', barWidth: 44, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '0.724 score (full list)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.818 score (records end at ban)', barWidth: 82, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Correct Alerts: Sample vs. Full List',
          cells: [
            { val: '0.922% sample | 0.186% full list' },
            { val: 'Not scored at cutoff (9 bans)' },
            { val: '0.512% sample | 0.103% full list' },
            { val: 'Not comparable (2018-2024 bans)' }
          ]
        },
        {
          label: 'Alerts &amp; Later Bans Identified',
          cells: [
            { val: '4,844 alerts | 9 identified (9.47%)' },
            { val: 'No cutoff scored' },
            { val: '24,295 alerts | 25 identified (26.32%)' },
            { val: 'No cutoff scored' }
          ]
        },
        {
          label: 'Lift &amp; MFCU Case Comparison',
          cells: [
            { val: '9.53x lift | 29.0% of active cases' },
            { val: 'Not scored' },
            { val: '5.28x lift | 145.6% of active cases' },
            { val: 'Not scored' }
          ]
        },
        {
          label: 'Peer Rank for Months Billed',
          cells: [
            { val: '90.5% stopped billing before 2024' },
            { val: '38.0th vs. 50.0th percentile' },
            { val: '90.5% stopped billing before 2024' },
            { val: '204 bans: 38.0th vs. 50.0th percentile' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Accounting for Early Billing Stops and 1-in-5 Samples in Reviews',
      subtitle: 'How pre-2024 billing stops and 1-in-5 comparison samples change alert rates and staffing plans.',
      caption: 'This table explains how choosing records changes test scores, correct alert rates, and staffing estimates.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'All Billers, Top 1% Cutoff', subtitle: '487,479 billing IDs (95 later bans, 0.0195% rate)' },
        { title: 'Still Billing in 2024', subtitle: '55,018 billing IDs in 2024 (9 later bans)' },
        { title: 'Top 5% Cutoff Check', subtitle: '24,295 alerts vs. 16,688 active MFCU cases' },
        { title: 'Banned During 2018-2024', subtitle: '204 peer-ranked and 230 vs. 1,150 matched IDs' }
      ],
      rows: [
        {
          label: 'How Records Are Chosen',
          cells: [
            { val: 'Includes all 2018-2024 billers, including providers who stopped billing before 2024.' },
            { val: 'Includes only 2024 billers after 86 of 95 later-banned billers (90.5%) stopped.' },
            { val: 'Scores all 487,479 billers and selects the highest-scoring 5% instead of 1%.' },
            { val: 'Scores providers banned in 2018-2024 whose billing records ended at the ban date.' }
          ]
        },
        {
          label: 'Effect on Test Numbers',
          cells: [
            { val: 'Full-list score is 0.724 (0.653 reweighted); the 1-in-5 sample rate is 4.96x higher.' },
            { val: 'Score is 0.442, giving no clear evidence of ranking above chance in 2024 billers.' },
            { val: 'Adjusted correct alerts drop to 0.103% as alerts reach 24,295 (145.6% of MFCU cases).' },
            { val: 'The 0.818 score may reflect billing that ended at the ban, not pre-ban detection.' }
          ]
        },
        {
          label: 'Review Staffing Context',
          cells: [
            { val: 'At the $23,719 active-case average, 4,844 alerts equal $114.9M and identify 9 bans.' },
            { val: 'Treating the 0.724 full-list score as current-biller accuracy overstates performance.' },
            { val: 'The 24,295 alerts exceed all 16,688 active national MFCU cases (not spare capacity).' },
            { val: 'Using 2018-2024 scores to buy tools mistakes post-ban stops for pre-ban detection.' }
          ]
        },
        {
          label: 'Recommended Adjustment Rule',
          policyFit: true,
          cells: [
            { headline: 'Adjust Alert Rates to Full List', detail: 'Adjust 1-in-5 sample alert rates to the 0.0195% full-list rate before planning reviews.' },
            { headline: 'Report Full and 2024 Scores', detail: 'Show the 0.724 full-list score (0.653 reweighted) beside the 0.442 2024-biller score.' },
            { headline: 'Set Alerts by Review Capacity', detail: 'Compare alerts with 16,688 active MFCU cases ($23,719 average) and measure review time.' },
            { headline: 'Keep In-Period Bans Separate', detail: 'Do not judge pre-ban detection using bans whose billing records ended at the ban date.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Adjusting Alert Rates, Choosing Groups, and Data Sources',
      notesBullets: [
        '<strong>How Cases Are Defined.</strong> Positive cases are federal OIG LEIE exclusions under the fraud-related laws in the study\'s Specification A (Social Security Act sections 1128(a)(1), 1128(a)(3), and 1128(b)(1)). Testing earlier claims against later bans compares 95 providers banned in 2025 or later with 487,384 comparison billers (487,479 total).',
        '<strong>Adjusting Alert Rates With Bayes\' Rule.</strong> The separate test sample keeps all 95 later-banned billers and 20% of comparison billers (97,476 of 487,384). In the full list, comparison billers are 5 times as numerous, so full-list odds equal sample odds divided by 5 (<code>Odds_pop = Odds_holdout / 5</code>). For the top 1%, the 0.922% sample rate (odds 0.009306) divides by 5 to give <strong>0.186%</strong> on the full list (lift = 0.1858% / 0.0195% = 9.53x). For the top 5%, 0.512% adjusts to <strong>0.103%</strong> (5.28x lift).',
        '<strong>2024 Biller Group and Billing Stop Dates.</strong> In the full file, 90.5% of later-banned billers stopped billing before 2024, compared with 43.6% of comparison billers (38.0th vs. 50.0th peer percentile for months billed). Shorter billing length links strongly with higher model scores (SHAP correlation r = -0.9009, describing model predictions rather than cause). Reweighting comparison billers by stop year gives AUC = 0.653, and testing the 55,018 billers active in 2024 (9 bans and 55,009 comparison billers) gives AUC = 0.442 (95% range 0.212-0.664). These checks show how choosing 2024 billers changes which providers are tested, without claiming stop dates alone explain the 9-case score.',
        '<strong>Active MFCU Cases and Average Cost.</strong> National Medicaid Fraud Control Units averaged $23,719 per active case ($395.8M across 16,688 active cases in FY 2024). Applying that active-case average to 4,844 top 1% alerts gives an illustrative $114.9M comparison (not a measured cost of reviewing one alert), while 24,295 top 5% alerts equal 145.6% of active cases.',
        '<strong>Data Sources.</strong> Scores, alert counts, and cost comparisons come from the Medicaid fraud model study outputs and HHS-OIG FY 2024 MFCU tables.'
      ]
    },
    synthesis: {
      title: 'Why Fraud Tests Must Account for Billing Stop Dates and Sample Rates',
      p1: 'Choosing billers by later billing status can bias a test when past bills and inquiries shape stops. Researchers call this selection, or collider, bias. Across 487,479 billers, 90.5% of billers banned in 2025+ stopped before 2024, vs. 43.6% of comparison billers. The model uses billing length, which may help explain the 0.724 score (0.653 reweighted). Testing only 55,018 billers active in 2024 leaves out 86 stopped bans and keeps 9 of 95, scoring 0.442 (0.50 is chance).',
      p2: 'Testing alert rates on a 1-in-5 sample creates a second planning error. Keeping 95 banned billers with 1 in 5 comparison billers cuts false alerts and gives a 0.922% sample rate. Adjusted to the full list\'s 0.0195% ban rate across 487,479 billers, the top 1% rate is 0.186% (9 bans in 4,844 alerts). Fraud units had 16,688 active cases averaging $23,719 per active case, though single-alert costs were not measured. Showing full-list, reweighted, and 2024 scores with adjusted rates keeps plans clear.'
    },
    methodologyParagraphs: [
      '<strong>Data Sources: Recorded Test Results and Adjusted Correct Alert Rates.</strong> Ranking scores (0.724 full list, 0.653 stop-date reweighted, 0.442 in the 55,018 billers active in 2024, and 0.818 for matched 2018-2024 bans), sample alert rates, alert counts, excluded providers identified, lift over random selection, and months-billed percentiles come from the Medicaid fraud model study tables. Full-list correct alert rates apply Bayes\' rule and match the full-list rate in the study outputs (0.1858%).',
      '<strong>Primary References &amp; Data Sources.</strong> <a href="https://doi.org/10.2307/2526310" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Berkson, J. (1946), "Limitations of the Application of Fourfold Table Analysis to Hospital Data", Biometrics Bulletin, 2(3), 47-53</a>; <a href="https://doi.org/10.1038/s41467-020-19478-2" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Griffith, G. J., et al. (2020), "Collider bias undermines our understanding of COVID-19 disease risk and severity", Nature Communications, 11, 5749</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>; and HHS-OIG Medicaid Fraud Control Unit FY 2024 annual statistics.'
    ],
    faqs: [
      {
        question: 'How does filtering to 2024 billers differ from adjusting for a pre-program factor?',
        answer: 'A pre-program factor like poverty exists before care starts and affects both program entry and health. Adjusting for it can cut bias when model rules hold. By contrast, still billing in 2024 comes later and reflects past bills and inquiries. Keeping only 2024 billers leaves out 90.5% of later-banned billers who stopped early and changes the test group.'
      },
      {
        question: 'Why do 2024 billers score 0.442 while the full 487,479 list scores 0.724?',
        answer: 'On all 487,479 billers, the model uses short billing spans and scores 0.724. Because 90.5% of later-banned billers stopped before 2024 (38.0th vs. 50.0th rank for months billed), stop-date reweighting gives 0.653. Keeping only 55,018 billers in 2024 leaves 9 bans and a 0.442 score, with no clear ranking above chance.'
      },
      {
        question: 'Why must correct alert rates from a 1-in-5 sample be adjusted before planning reviews?',
        answer: 'The correct alert rate is the share of alerts matching the formal bans studied here. That share depends on how rare bans are. Keeping 95 banned billers with 1 in 5 comparison billers cuts false alerts and gives a 0.922% sample rate. Adjusting to the full list\'s 0.0195% rate gives 0.186% (9 bans in 4,844 alerts).'
      }
    ],
    related: [
      { slug: 'classifying-causal-mechanisms', title: 'Controlling for Post-Start Clinic Visits Subtracts the Care Step That Reduces Hospital Stays', note: 'Case study separating pre-start causes, post-start care steps, 2024-biller filters, and Stage 1 checks' },
      { slug: 'measurement-error-claims', title: 'Matching Paid Medicaid Claims With Federal and State Ban Lists Finds Providers One List Leaves Out', note: 'Case study matching 488,032 Medicaid billers across federal OIG and California suspension lists' },
      { slug: 'p-hacking-multiple-testing', title: 'Minimum Group Sizes and Net Member Losses Help Counties Set Medi-Cal Call Lists', note: 'Case study separating large county group losses from small-group rate changes' }
    ]
  },

  // =========================================================================
  // MODULE #29: classifying-causal-mechanisms (Track 4, public)
  // =========================================================================
  {
    slug: 'classifying-causal-mechanisms',
    tier: 'public',
    trackEyebrow: 'Track 4: Choosing Model Controls &middot; Shared Causes, Care Steps &amp; Record Filters',
    pageTitle: 'Baseline Controls vs. Care Steps in Models | CAPHE',
    metaDescription: 'Separate pre-start shared causes, post-start care steps, current-biller filters, and two-step checks across four California health data sets.',
    h1: 'Controlling for Post-Start Clinic Visits Subtracts the Care Step That Reduces Hospital Stays',
    subtitle: 'Separating pre-start causes from post-start care steps, sample filters, and Stage 1 checks in health models.',
    endnotes: [
      '<strong>Earlier Shared Causes vs. Later Care Steps.</strong> <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census American Community Survey (ACS)</a> data for Santa Clara County cover 408 census tracts. Tract poverty accounts for 62.2% of differences in food-need scores, and the store-distance estimate changes from -0.578 before adjustment to -0.017 after poverty adjustment (-0.0026 on a common scale, p = 0.827). <a href="https://doi.org/10.1377/hlthaff.2019.01568" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi, S., et al. (2020), <em>Health Affairs</em></a> reports 71.7% vs. 57.1% primary care completion (odds ratio 1.90) and 30% fewer hospital stays.',
      '<strong>Later Sample Filters and Two-Step Model Checks.</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> matched with <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a> gives a 0.724 full-list AUC (0.653 stop-date reweighted) vs. 0.442 among providers still billing in 2024 (9 of 95 bans). Across 57 California counties, models report links of 2.38 fewer yearly deaths per 100,000, 4.32 fewer over 13-year changes (unadjusted p = 0.0052, adjusted p = 0.067), and 5.31 fewer in Lewbel two-step checks (first-step F = 111.20, Hansen J p = 0.2132).',
      '<strong>Guide to Choosing Model Controls.</strong> <a href="https://doi.org/10.1177/00491241221099552" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Cinelli, C., Forney, A., &amp; Pearl, J. (2022), "A Crash Course in Good and Bad Controls", <em>Sociological Methods &amp; Research</em></a>.'
    ],
    policySettingHtml: 'Before testing a health program, analysts pick which family, clinic, and biller factors to adjust for. Timing sets each factor\'s role. A factor like poverty may affect both who joins a program and health. When it exists before program start, researchers call it a baseline confounder. By contrast, clinic visits occur after start as a care step. Adjusting for every column without checking timing can leave out program gains or bias the test group.',
    answerHtml: 'In Community Health Worker (CHW) trials, not adjusting for later doctor visits keeps gains that occur through visits [1,3]. Those trials found <strong>30%</strong> fewer hospital stays, and primary care visits rose from <strong>57.1% to 71.7%</strong> (odds ratio <strong>1.90</strong>) [1]. Adjusting for later visits can remove primary care gains, though the trial did not measure that share alone [1,3]. Three other data sets show the next roles. Poverty accounts for <strong>62.2%</strong> of Santa Clara food-need differences, moving store distance from <strong>-0.578 to -0.017</strong> [1]. Limiting a fraud test to <strong>55,018</strong> billers in 2024 leaves out 86 stopped billers and keeps <strong>9 of 95</strong> bans [2]. A two-step check (<strong>111.20</strong> first-step F) estimates <strong>5.31</strong> fewer deaths per 100,000 per $10 beside <strong>4.32</strong> over 13 years (adjusted <em>p</em> = 0.067) [2].',
    block2: {
      title: 'Adjusting for Later Visits vs. Adjusting Only for Pre-Start Factors',
      contextTag: 'Summary Built on Observed Inputs From Separate CAPHE Studies',
      ariaLabel: 'Comparison of a regression that adjusts for post-enrollment primary care visits versus a model that adjusts only for pre-start shared causes',
      ruler1: {
        title: 'Model Adjusting for Post-Start Clinic Visits',
        stat: 'Aims to Estimate Effects Apart From Visits',
        ariaLabel: 'Adjusting for post-enrollment primary care visits holds the care step fixed',
        segments: [
          { cls: 'seg-primary', width: 50, label: 'Direct Part Kept' },
          { cls: 'seg-Housing', width: 50, label: 'Care Step Removed' }
        ],
        desc: 'Adjusting for clinic visits after enrollment can leave out hospital stays avoided through primary care, and needs added assumptions.'
      },
      ruler2: {
        title: 'Model Adjusting Only for Pre-Start Factors',
        stat: 'Aims to Estimate Total Program Effect',
        ariaLabel: 'Adjusting only for pre-start factors keeps the total causal effect',
        segments: [
          { cls: 'seg-primary', width: 50, label: 'Direct Part' },
          { cls: 'seg-food', width: 50, label: 'Care Step Included' }
        ],
        desc: 'Adjusting for pre-start factors while not adjusting for later clinic visits keeps effects that occur through primary care in the 30% hospital stay drop.'
      }
    },
    table1: {
      title: 'Table 1. Four Examples of How a Model Uses Different Factors',
      subtitle: 'Each column uses one data set to show an earlier shared cause, a care step, a record filter, or a Stage 1 check.',
      caption: 'Compare four data sets by when each factor occurs, how adjusting for it changes results, source numbers, and rules for using it.',
      cornerLabel: 'Factor Role',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Summary of Results From Separate Data Sets).</strong> Each column uses a separate CAPHE data set rather than one combined model. Role 1 (Baseline Confounder): before adjustment, greater store distance links with a lower food-need score (-0.578, p &lt; 0.0001). After adjusting for tract poverty (accounting for 62.2% of score differences across 408 tracts), the estimate is -0.017 (p = 0.827). Role 2 (Care Step): primary care visits rose from 57.1% to 71.7% (odds ratio 1.90 among treated patients) alongside 30% fewer hospital stays. Role 3 (Later Record Filter): a later selection rule affected by earlier billing and inquiries can bias the test group. The fraud test\'s ranking score (AUC) is 0.724 (95% range 0.667-0.777) across 487,479 billers vs. 0.442 (95% range 0.212-0.664) among 55,018 providers still billing in 2024 (9 of 95 bans; 0.653 after stop-date reweighting). Role 4 (Two-Step Check): Lewbel\'s two-step method using 13-year changes and differences in data spread estimates 5.31 fewer deaths per 100,000 per $10 (first-step F = 111.20) beside the 4.32 13-year link (unadjusted p = 0.0052; adjusted p = 0.067). The Hansen J check gives p = 0.2132, which checks input agreement rather than proving causal assumptions.',
      columns: [
        { tag: 'Role 1: Confounder', tagHighlight: true, title: 'Pre-Start Tract Poverty', subtitle: '408 Santa Clara County census tracts (ACS)' },
        { tag: 'Role 2: Care Step', tagHighlight: true, title: 'Post-Start Clinic Visits', subtitle: 'CHW randomized trials; patient level' },
        { tag: 'Role 3: Sample Filter', tagHighlight: false, title: 'Still Billing in 2024', subtitle: '488,032 Medicaid billers (55,018 billing in 2024)' },
        { tag: 'Role 4: Stage 1 Check', tagHighlight: false, title: 'Two-Step Data-Spread Check', subtitle: '57 CA counties, 2003-2016 13-yr changes' }
      ],
      rows: [
        {
          label: 'Source Data',
          cells: [
            { val: 'Santa Clara County tracts (408 tracts)' },
            { val: 'Community Health Worker randomized trials' },
            { val: 'National Medicaid claims &amp; ban list' },
            { val: 'County health budgets (57 counties)' }
          ]
        },
        {
          label: 'When It Occurs &amp; What It Affects',
          cells: [
            { val: 'Exists before store sites &amp; food needs' },
            { val: 'Rises after start alongside lower stays' },
            { val: 'Past billing &amp; inquiries affect 2024 stops' },
            { val: 'Data spread helps predict budget changes' }
          ]
        },
        {
          label: 'Result Without Adjusting or Filtering',
          cells: [
            { val: 'Unadjusted distance estimate: -0.578' },
            { val: 'Includes visit step in 30% stay drop' },
            { val: 'All past billers: 0.724 score (95 bans)' },
            { val: '13-yr link: -4.32 / 100K (adj. p = 0.067)' }
          ]
        },
        {
          label: 'Result When Adjusted or Filtered',
          cells: [
            { val: 'Distance changes to -0.017 (p = 0.827)', textColor: 'text-emerald-800' },
            { val: 'Can leave out gains from clinic visits', textColor: 'text-amber-900' },
            { val: '9 of 95 bans (0.442 in 2024 billers)', textColor: 'text-rose-800' },
            { val: 'Two-step check: 5.31 fewer / 100K', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Observed Source Figure',
          highlight: true,
          cells: [
            { val: 'Poverty accounts for 62.2% of score differences', barWidth: 62, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '71.7% vs. 57.1% clinic visits (1.90 odds ratio)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: 'Months billed: 38.0th vs. 50.0th percentile', barWidth: 38, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '5.31 fewer / 100K (F = 111.20 strength check)', barWidth: 98, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Rule for Using the Factor',
          cells: [
            { val: 'Adjust for as a pre-start factor' },
            { val: 'Do not adjust when estimating total effect' },
            { val: 'Report all past billers &amp; 2024 billers' },
            { val: 'Use only in Stage 1 as an extra check' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Picking Model Controls Without Leaving Out Care Steps',
      subtitle: 'How each factor\'s timing sets a model rule that cuts bias and keeps key records.',
      caption: 'Table matching pre-start shared causes, post-start care steps, later record filters, and two-step checks to model rules.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Confounder: Tract Poverty', subtitle: '408 Santa Clara County census tracts (ACS)' },
        { title: 'Care Step: Clinic Visits', subtitle: 'CHW randomized trials; patient level' },
        { title: 'Filter: 2024 Billers', subtitle: '488,032 billers; 55,018 billing in 2024 (9 bans)' },
        { title: 'Two-Step Data-Spread Check', subtitle: '57 CA counties, 2003-2016 13-yr changes' }
      ],
      rows: [
        {
          label: 'How to Spot the Role',
          cells: [
            { val: 'Measured before the program and accounts for 62.2% of food-need score differences.' },
            { val: 'Changes after enrollment as CHW support raises clinic visits from 57.1% to 71.7%.' },
            { val: 'Reflects later billing after 90.5% of later-banned billers stopped before 2024.' },
            { val: 'Predicts county budget changes in Stage 1 rather than serving as an outcome control.' }
          ]
        },
        {
          label: 'Right Model Rule',
          cells: [
            { val: 'Adjust for poverty so differences linked to poverty are not assigned to store distance.' },
            { val: 'Do not adjust for later visits when estimating the total reduction in hospital stays.' },
            { val: 'Report all 487,479 past billers (0.724; 0.653 reweighted) beside 2024 billers (0.442).' },
            { val: 'Compare the -5.31 check with the -4.32 13-year link (adj. p = 0.067) in study notes.' }
          ]
        },
        {
          label: 'Error When Misused',
          cells: [
            { val: 'Leaving poverty out may wrongly assign poverty differences to store distance.' },
            { val: 'Adjusting for later doctor visits can remove effects that occur through clinic care.' },
            { val: 'Full-list scores overstate 2024 accuracy, while 2024-only filters leave out 86 bans.' },
            { val: 'Treating two-step checks like trials overstates proof because causal rules are untestable.' }
          ]
        },
        {
          label: 'Best-Fit Review Rule',
          policyFit: true,
          cells: [
            { headline: 'Use Factors Before Start', detail: 'Measure income and age before program start so care cannot change those controls.' },
            { headline: 'Estimate Total Effect First', detail: 'Report total hospital stay reductions before testing how much occurred through visits.' },
            { headline: 'Compare All &amp; Current Billers', detail: 'Check stop-date reweighted full scores and 2024 biller scores before buying tools.' },
            { headline: 'Keep Stage 1 as a Check', detail: 'Report two-step results only as extra checks beside county links (adj. p = 0.067).' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Clinic-Visit Effects, Group Rules, and Data Sources',
      notesBullets: [
        '<strong>How Adjusting for Later Clinic Visits Changes the Estimate.</strong> In this model, X means program entry, M means primary care visits, and Y means hospital stays. The total effect combines the direct effect with any effect through visits (<code>&tau;_total = &beta;_direct + &alpha;&middot;&gamma;</code>). Adjusting for later visits M removes <code>&alpha;&middot;&gamma;</code>. Trials show CHWs raised primary care visits (71.7% vs. 57.1%, odds ratio 1.90) and cut hospital stays by 30%, though the exact share caused by visits requires added assumptions to measure.',
        '<strong>Separate Data Sets and Common-Scale Estimate.</strong> Each column uses its own CAPHE study rather than one shared model. Across 408 Santa Clara County tracts, adjusting for poverty and putting measures on a common scale gives a store-distance estimate of -0.0026 (p = 0.827; -0.578 unadjusted and -0.017 in original units).',
        '<strong>Past Billers vs. 2024 Billers.</strong> Across all 487,479 billers, the fraud test\'s AUC is 0.724 (95% range 0.667-0.777), compared with 0.653 after stop-date reweighting and 0.442 (95% range 0.212-0.664) among 55,018 providers still billing in 2024 (9 bans vs. 55,009 comparison billers; months billed ranked at the 38.0th vs. 50.0th peer percentile).',
        '<strong>Checks on Stage 1 Predictors.</strong> Across 57 counties in 2003-2016, Lewbel\'s predictors created from differences in data spread get a first-step F-statistic of 111.20. That F-score tests Stage 1 prediction strength, not the untestable assumption that predictors affect deaths only through budgets. Hansen J gives p = 0.2132, and the check estimates 5.31 fewer deaths per 100,000 per $10 beside 2.38 yearly and 4.32 over 13 years (adjusted p = 0.067).',
        '<strong>Data Sources.</strong> Results come from CAPHE Santa Clara tract tables, CHW trial summaries, Medicaid fraud test outputs, and LHA county spending files.'
      ]
    },
    synthesis: {
      title: 'Why Factor Timing Comes Before Choosing Model Controls',
      p1: 'Putting all columns into one model treats pre-start causes like care steps after start. A shared cause like neighborhood poverty exists before the factors it may affect. Across 408 Santa Clara tracts, poverty accounts for 62.2% of food-need score differences. Before poverty adjustment, store distance is -0.578, vs. -0.017 after poverty adjustment. By contrast, clinic visits in CHW trials rise from 57.1% to 71.7% (odds ratio 1.90) alongside 30% fewer hospital stays.',
      p2: 'Checking when each factor occurs keeps every column in its proper role. Analysts adjust for pre-start causes and do not adjust for later care steps when estimating total effects. Audit teams likewise show full-list fraud scores (0.724; 0.653 reweighted) beside 2024 billers (0.442 across 9 of 95 bans). County checks keep budget predictors in Stage 1 (first-step F = 111.20), not in outcome controls. If predictors affect deaths only through budgets, that check gives 5.31 fewer deaths per 100,000 beside 4.32 (adjusted p = 0.067).'
    },
    methodologyParagraphs: [
      '<strong>Data Sources: A Summary of Results From Separate Studies.</strong> These rules bring together findings from four separate CAPHE studies. First, Santa Clara tract models report 62.2% poverty variance share and -0.578 vs. -0.017 store-distance slopes. Second, CHW trials report 71.7% vs. 57.1% clinic visits (1.90 odds ratio) and 30% fewer hospital stays. Third, the Medicaid fraud test gives 0.724 on the full list vs. 0.442 in 55,018 current 2024 billers (9 of 95 bans). Fourth, 57-county checks give 5.31 fewer deaths per 100,000 (first-step F = 111.20; Hansen J p = 0.2132) beside 4.32 over 13 years (adjusted p = 0.067).',
      '<strong>Primary References &amp; Data Sources.</strong> <a href="https://doi.org/10.1177/00491241221099552" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Cinelli, C., Forney, A., &amp; Pearl, J. (2022), "A Crash Course in Good and Bad Controls", Sociological Methods &amp; Research</a>; <a href="https://doi.org/10.1377/hlthaff.2019.01568" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi, S., et al. (2020), Health Affairs</a>; <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), Journal of Business &amp; Economic Statistics</a>; <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; and <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>.'
    ],
    faqs: [
      {
        question: 'Why can adjusting for post-start clinic visits understate CHW hospital drops?',
        answer: 'More clinic visits (rising from 57.1% to 71.7%, odds ratio 1.90) may help explain 30% fewer hospital stays. The trial did not measure that share alone. Adjusting for later visits aims to test effects apart from clinic care and needs added assumptions. So adjusting for visits can remove hospital drops that happen through primary care.'
      },
      {
        question: 'How can an analyst tell a baseline confounder from a post-start care step?',
        answer: 'Check whether the factor existed before start or changed after the program began. A baseline confounder like pre-start poverty or age exists first and affects both entry and health. Adjusting for it can cut bias when model rules hold. By contrast, a care step changes after start and may cause part of the gain.'
      },
      {
        question: 'Why is the budget predictor used in the first step of the two-step model?',
        answer: 'Two-step models assume the Stage 1 predictor affects death rates only through county spending. Adding it as an outcome control instead adjusts for budget changes that Stage 1 uses. Here, first-step F = 111.20 tests predictor strength, not whether that untestable causal rule holds. Because that rule cannot be tested directly, 5.31 stays an extra check beside 4.32 (adjusted p = 0.067).'
      }
    ],
    related: [
      { slug: 'collider-bias', title: 'Testing Fraud Checks Only on Current Billers Leaves Out Banned Providers Who Stopped Early', note: 'Case study on 2024-biller record selection and full-list alert-rate adjustments' },
      { slug: 'reverse-causation-feedback', title: 'Combining Pandemic Aid With Routine County Health Budgets Mixes Relief Grants With Pre-2020 Links', note: 'Case study separating 2020-2023 relief grants from pre-2020 county spending links' },
      { slug: 'chw-health-outcomes', title: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs', note: 'Case study on 58-county California Community Health Worker clinical trials and payer savings' }
    ]
  },

  // =========================================================================
  // MODULE #30: sensitivity-analysis-cea (Track 4, public)
  // =========================================================================
  {
    slug: 'sensitivity-analysis-cea',
    tetsCompanion: [
      {
        visibleLabel: 'County Health Spending by Period',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 yearly county records), each extra dollar spent per person links with -0.238 deaths per 100,000 in 2003 to 2019. In 2020 to 2023, it links with +0.247 deaths per 100,000.'
      },
      {
        visibleLabel: 'California Care Worker Pay Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,039 census tracts, a fixed $31.74 Medi-Cal fee covers 3.2% to 8.9% of modeled field care worker costs.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: Costs, Benefits &amp; Tested Ranges &middot; Death-Risk Values &amp; Payments by Payer',
    pageTitle: 'Death-Risk Dollar Values & County Links | CAPHE',
    metaDescription: 'Compare federal death-risk values ($6.3M-$20.7M; 15:1-89:1 if county links are causal) next to separate Community Health Worker payment and savings cases.',
    h1: 'County Health Spending Links Show Higher Value Than Cost Under Three Federal Rates If Causal',
    subtitle: 'Testing death-risk dollar values for pre-2020 county links, if causal, next to clinic pay offsets.',
    endnotes: [
      '<strong>Federal Death-Risk Values (2025).</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 Guidelines for Regulatory Impact Analysis</a> set low ($6.3M), middle ($13.6M), and high ($20.7M) Value of a Statistical Life (VSL) rates. Using the <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA VSL</a> of $11.2M implies $26.70 per $1 (26.7:1) yearly and $48.40 (48.4:1) over 13 years if spending caused fewer deaths (13-year adjusted p = 0.067, above 0.05).',
      '<strong>County Death-Rate Links and Uncertainty Ranges.</strong> <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology (Cholette et al., 2026)</a> reports the pre-2020 yearly county link of 2.38 fewer deaths per 100,000 per $10 (unadjusted 95% range -3.91 to -0.85). If causal, cost per death avoided is $420,168, giving 15.0:1 to 49.3:1 across HHS values and 5.4:1 in the unadjusted low case. Over 13-year changes, the link is 4.32 fewer deaths (unadjusted p = 0.0052; adjusted p = 0.067, above 0.05; unadjusted 95% range -7.34 to -1.30). If causal, cost per death avoided is $231,481, giving 27.2:1 to 89.4:1 across HHS values (adjusted p = 0.067) and 8.2:1 using the unadjusted -1.30 bound.',
      '<strong>Payments and Savings Compared With Care Worker Costs.</strong> <a href="https://www.dhcs.ca.gov/formsandpubs/laws/Pages/CalAIM-SPA.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a> per-visit fees pay $6,775 to $10,162 per year (6.5% to 9.8% of a $103,719 worker position). By contrast, Medi-Cal plan hospital savings equal $107,006 (103.2%) and hospital savings across all payers equal $291,171 (280.7%).'
    ],
    policySettingHtml: 'In county budget talks, boards ask how dollar estimates change under stricter inputs. A one-way test changes one input at a time, such as using a lower federal value per death avoided. A joint test changes two inputs at once. Here, it pairs the smallest death drop in the unadjusted 95% range with the lowest federal rate. Showing all cases beside separate worker fees and savings helps boards see what matters.',
    answerHtml: 'Health and Human Services (HHS) sets three rates: <strong>$6.3M</strong>, <strong>$13.6M</strong>, and <strong>$20.7M</strong> per Value of a Statistical Life (VSL) [1]. VSL puts a dollar rate on small death-risk drops summing to one expected death [1]. Pre-2020 county links ($10 per resident) give dollar value only if spending caused fewer deaths, not cash [1,2]. At <strong>2.38</strong> fewer deaths per 100,000 per year (<strong>$420,168</strong> per death if causal), ratios span <strong>15.0:1</strong> to <strong>49.3:1</strong> (<strong>32.4:1</strong> middle) [2]. Over 13 years, <strong>4.32</strong> fewer deaths (adjusted <em>p</em> = 0.067, above 0.05) gives <strong>$231,481</strong> and <strong>27.2:1 to 89.4:1</strong> (<strong>58.8:1</strong> middle) if causal [2]. Pairing 0.85 from the unadjusted range with $6.3M gives <strong>5.4:1</strong> if causal [2]. Separately, worker fees pay <strong>$6,775</strong> to <strong>$10,162</strong>, while plan and hospital savings reach <strong>$107,006</strong> and <strong>$291,171</strong> [3].',
    block2: {
      title: 'One Dollar Value vs. Tested Range of Federal Values',
      contextTag: 'Estimates Using Pre-2020 County Links and 2025 HHS Dollar Values, Assuming Spending Caused Fewer Deaths',
      ariaLabel: 'Comparison of a single middle ratio at $13.6M VSL versus the full HHS VSL range from $6.3M to $20.7M',
      ruler1: {
        title: 'Middle Federal Value Only ($13.6M, If Causal)',
        stat: '32.4:1 (Yearly) | 58.8:1 (13-Yr, adj. p = 0.067)',
        ariaLabel: 'Ratios of 32.4 to 1 yearly and 58.8 to 1 over 13 years with adjusted p = 0.067, assuming cause and effect',
        segments: [
          { cls: 'seg-primary', width: 66, label: 'Middle $13.6M: 32.4:1 / 58.8:1 (adj. p=0.067)' },
          { cls: 'seg-rest', width: 34, label: 'Other Rates Omitted' }
        ],
        desc: 'Reporting only one VSL ratio can focus board talks on a single federal dollar rate instead of causal evidence.'
      },
      ruler2: {
        title: 'All Three HHS Values and Unadjusted Low Case ($6.3M-$20.7M, If Causal)',
        stat: '5.4:1 Unadjusted Case | 15.0:1 to 89.4:1 Main Range (13-yr adj. p = 0.067)',
        ariaLabel: 'Range from 5.4 to 1 in the unadjusted yearly case through 89.4 to 1 across HHS VSL rates',
        segments: [
          { cls: 'seg-gross', width: 30, label: 'Low $6.3M: 15.0:1 / 27.2:1 (adj. p=0.067)' },
          { cls: 'seg-primary', width: 36, label: 'Middle $13.6M: 32.4:1 / 58.8:1 (adj. p=0.067)' },
          { cls: 'seg-food', width: 34, label: 'High $20.7M: 49.3:1 / 89.4:1 (adj. p=0.067)' }
        ],
        desc: 'If spending caused fewer deaths, main estimates span 15.0:1 to 89.4:1 across HHS values (13-year adjusted p = 0.067, above 0.05), and the unadjusted low case is 5.4:1 per year.'
      }
    },
    table1: {
      title: 'Table 1. Death-Risk Dollar Estimates (If Causal) and Separate Care Worker Costs',
      subtitle: 'Top rows apply federal rates to 57-county death links if causal. Bottom rows compare worker costs, fees, and savings.',
      caption: 'Four columns compare an unadjusted low case with low, middle, and high federal dollar values alongside separate care worker cost rows.',
      cornerLabel: 'Tested Case',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Separate Programs and How Estimates Are Calculated).</strong> County rows (Unit A) and Community Health Worker rows (Unit B) measure separate programs and are never added together. In Unit A, dollar figures apply only if $10 more per resident caused fewer deaths. The pre-2020 yearly link is -2.38 deaths per 100,000 per $10 (SE = 0.78 per $10, unadjusted 95% range -3.91 to -0.85). If causal, cost per death avoided is $420,168 at -2.38 ($1,176,471 at -0.85), giving 5.4:1 in the unadjusted case and 15.0:1 to 49.3:1 across HHS values. Over 13-year changes (-4.32 per $10, SE = 1.54 per $10, unadjusted p = 0.0052, adjusted p = 0.067, unadjusted 95% range -7.34 to -1.30), cost per death avoided is $231,481 at -4.32 ($769,231 at -1.30), giving 8.2:1 in the unadjusted case and 27.2:1 to 89.4:1 across HHS values. Because adjusted p = 0.067 is above the 0.05 cutoff, the -1.30 and 8.2:1 figures use the unadjusted range rather than an adjusted lower limit.',
      columns: [
        { tag: 'Case 1: Unadjusted Low Case', tagHighlight: true, title: 'Unadjusted 95% Range + Low Rate', subtitle: '0.85 yr / 1.30 13-yr unadj. range (adj. p = 0.067) &amp; $6.3M | 213 billable units' },
        { tag: 'Case 2: Low Federal Rate', tagHighlight: false, title: 'Main Estimate + Low Rate', subtitle: '2.38 yr / 4.32 13-yr (adj. p = 0.067) &amp; $6.3M | 320 billable units' },
        { tag: 'Case 3: Middle Federal Rate', tagHighlight: true, title: 'Main Estimate + Middle Rate', subtitle: '2.38 yr / 4.32 13-yr (adj. p = 0.067) &amp; $13.6M | Medi-Cal plan savings' },
        { tag: 'Case 4: High Federal Rate', tagHighlight: false, title: 'Main Estimate + High Rate', subtitle: '2.38 yr / 4.32 13-yr (adj. p = 0.067) &amp; $20.7M | All-payer hospital savings' }
      ],
      rows: [
        {
          label: 'Fewer Deaths per 100K per $10',
          cells: [
            { val: '0.85 yr | 1.30 cumul fewer (unadj. range)' },
            { val: '2.38 yr | 4.32 cumul fewer (main, adj. p=0.067)' },
            { val: '2.38 yr | 4.32 cumul fewer (main, adj. p=0.067)' },
            { val: '2.38 yr | 4.32 cumul fewer (main, adj. p=0.067)' }
          ]
        },
        {
          label: 'Federal Death-Risk Value (Input)',
          cells: [
            { val: '$6.3M (HHS Low Rate)' },
            { val: '$6.3M (HHS Low Rate)' },
            { val: '$13.6M (HHS Middle Rate)' },
            { val: '$20.7M (HHS High Rate)' }
          ]
        },
        {
          label: 'Cost per Death Avoided (If Causal)*',
          modeled: true,
          cells: [
            { val: '$1,176,471 (Yr) | $769,231 (13-Yr unadj.)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr, adj. p=0.067)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr, adj. p=0.067)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr, adj. p=0.067)' }
          ]
        },
        {
          label: 'Estimated Value per $1 (If Causal)*',
          modeled: true,
          highlight: true,
          cells: [
            { val: '5.4:1 (Yr) | 8.2:1 (13-Yr unadj.)', barWidth: 9, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '15.0:1 (Yr) | 27.2:1 (13-Yr, adj. p=0.067)', barWidth: 30, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '32.4:1 (Yr) | 58.8:1 (13-Yr, adj. p=0.067)', barWidth: 66, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '49.3:1 (Yr) | 89.4:1 (13-Yr, adj. p=0.067)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: '57-County $10/Person Total (If Causal)*',
          modeled: true,
          cells: [
            { val: '332 yr | 507 13-yr deaths ($2.1B-$3.2B)' },
            { val: '928 yr | 1,685 13-yr deaths ($5.8B-$10.6B)' },
            { val: '928 yr | 1,685 13-yr deaths ($12.6B-$22.9B)' },
            { val: '928 yr | 1,685 13-yr deaths ($19.2B-$34.9B)' }
          ]
        },
        {
          label: 'Separate Worker Cost Case ($103,719)*',
          modeled: true,
          cells: [
            { val: '$6,775 (213 billable service units)' },
            { val: '$10,162 (320 billable service units)' },
            { val: '$107,006 (Medi-Cal plan savings)' },
            { val: '$291,171 (all-payer hospital savings)' }
          ]
        },
        {
          label: 'Payments or Savings vs. Worker Cost*',
          modeled: true,
          cells: [
            { val: '0.07 : 1 (6.5% of worker cost)' },
            { val: '0.10 : 1 (9.8% of worker cost)' },
            { val: '1.03 : 1 (103.2% of worker cost)' },
            { val: '2.81 : 1 (280.7% of worker cost)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Keeping Death-Risk Values Apart From Causal Checks and Pay Rules',
      subtitle: 'How death-risk dollar rates, if causal, differ from care worker fees and hospital stay savings.',
      caption: 'The table shows who receives benefits or payments in each case, how benefits compare with costs, and how counties can fund workers.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Case 1: Unadjusted Low Case', subtitle: 'Unit A: unadjusted 95% range (-0.85 yr / -1.30 13-yr, adj. p = 0.067, $6.3M); Unit B: 213 billable units ($103,719 cost)' },
        { title: 'Case 2: Low Federal Rate', subtitle: 'Unit A: main link (-2.38 yr / -4.32 13-yr, adj. p = 0.067, $6.3M); Unit B: 320 billable units' },
        { title: 'Case 3: Middle Federal Rate', subtitle: 'Unit A: main link (-2.38 yr / -4.32 13-yr, adj. p = 0.067, $13.6M); Unit B: Medi-Cal plan savings' },
        { title: 'Case 4: High Federal Rate', subtitle: 'Unit A: main link (-2.38 yr / -4.32 13-yr, adj. p = 0.067, $20.7M); Unit B: all-payer hospital savings' }
      ],
      rows: [
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'Resident value uses $6.3M in this unadjusted case; clinics receive 6.5% of worker cost.' },
            { val: 'Resident value uses $6.3M if causal; clinics receive 9.8% of worker cost at 320 units.' },
            { val: 'Resident value uses $13.6M if causal; hospital savings equal 103.2% of cost for plans.' },
            { val: 'Resident value uses $20.7M if causal; hospital savings across payers equal 280.7% of cost.' }
          ]
        },
        {
          label: 'Inputs Tested in Each Case',
          cells: [
            { val: 'Pairs the unadjusted 95% range bound with the $6.3M federal rate.' },
            { val: 'Keeps the main death-rate estimate and uses the low federal rate of $6.3M.' },
            { val: 'Applies the $13.6M middle rate to yearly (-2.38) and 13-year (-4.32, adj. p = 0.067) links.' },
            { val: 'Applies the $20.7M rate to county results and reports hospital savings across payers.' }
          ]
        },
        {
          label: 'Benefits Compared With Costs',
          cells: [
            { val: 'Unadjusted case gives 5.4:1 yr (8.2:1 unadj. 13-yr; adj. p = 0.067); fees pay 6.5%, leaving 93.5% unpaid.' },
            { val: 'If causal, links give 15.0:1 (27.2:1 13-yr, adj. p = 0.067); fees pay 9.8%, leaving 90.2% unpaid.' },
            { val: 'If causal, links give 32.4:1 (58.8:1 13-yr, adj. p = 0.067); plan savings reach 1.03:1.' },
            { val: 'If causal, links give 49.3:1 (89.4:1 13-yr, adj. p = 0.067); all-payer savings reach 2.81:1.' }
          ]
        },
        {
          label: 'What These Tests Show',
          cells: [
            { val: 'Estimated value exceeds cost at all federal rates if causal; 13-yr adj. p = 0.067 exceeds 0.05.' },
            { val: 'Raising billable service units 50% (213 to 320) raises paid worker costs only from 6.5% to 9.8%.' },
            { val: 'Showing $6.3M to $20.7M rates beside adj. p = 0.067 keeps uncertainty clear.' },
            { val: 'Keeping death-risk values separate from worker payments avoids adding distinct dollars.' }
          ]
        },
        {
          label: 'Best-Fit Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'State Causal &amp; Range Rules', detail: 'State VSL ratios assume cause and label Case 1 (5.4:1 yr; 8.2:1 unadj.) as unadjusted.' },
            { headline: 'Use Plan Contracts Over Quotas', detail: 'Do not rely on higher visit quotas when fixed fees pay under 10% of worker cost.' },
            { headline: 'Show Rates With adj. p = 0.067', detail: 'Show $6.3M-$20.7M ratios (58.8:1 at 13 yrs) beside adj. p = 0.067 (above 0.05).' },
            { headline: 'Keep Cash &amp; VSL Tables Apart', detail: 'Fund workers through health plan contracts and keep VSL tables separate if causal.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Inputs, Calculations, Time Spans, and Separate Measures',
      notesBullets: [
        '<strong>Observed Links and Published Inputs.</strong> County death-rate links (-2.38 yearly per $10, SE = 0.78 per $10, unadjusted 95% range [-3.91, -0.85]; -4.32 over 13-year changes per $10, SE = 1.54 per $10, unadjusted p = 0.0052, adjusted p = 0.067, unadjusted 95% range [-7.34, -1.30]; and -5.31 in the Lewbel two-step check) come from CAPHE LHA files. Federal death-risk values follow 2025 HHS guidance ($6.3M, $13.6M, $20.7M) and EPA ($11.2M). Care worker inputs ($103,719 full-time worker cost with pay and benefits; $6,775 to $10,162 visit pay for 213 to 320 units under DHCS SPA 22-0001; $107,006 Medi-Cal plan savings; $291,171 hospital savings across payers) come from CAPHE CHW study files.',
        '<strong>How County Value per Dollar Is Calculated (Unit A).</strong> If $10 more in county public health spending per resident caused the estimated decrease in deaths, value per dollar equals <code>(fewer deaths per 100,000 / 100,000) &times; federal value / $10</code>. At 2.38 fewer deaths per 100,000 and $13.6M, this gives <code>0.0000238 &times; $13,600,000 / $10 = 32.4:1</code> ($420,168 per death avoided). Equal benefits and costs (1.0:1) would require 0.0735 fewer deaths per 100,000 at $13.6M.',
        '<strong>Why County Results and Worker Costs Stay Separate.</strong> The county cases show how changing the death estimate or federal dollar value changes resident health value if causal. The worker cases show how clinic fees and hospital savings compare with one $103,719 worker position by payer. Their dollar amounts are never added together.'
      ]
    },
    synthesis: {
      title: 'Keeping Death-Risk Dollar Rates Apart From Causal Checks and Clinic Pay',
      p1: 'Boards should check whether spending caused fewer deaths and how wide the 13-year range is. Across 2025 HHS values ($6.3M to $20.7M), all three rates exceed cost if spending caused fewer deaths. These figures are resident health values, not cash paid to counties. If causal, the -2.38 yearly link spans 15.0:1 to 49.3:1 (32.4:1 middle, or $420,168 per death). Under that rule, the -4.32 13-year link (adjusted p = 0.067, above 0.05) spans 27.2:1 to 89.4:1 (58.8:1 middle). Pairing unadjusted bounds with $6.3M gives 5.4:1 yearly and 8.2:1 over 13 years.',
      p2: 'For care workers, changing who pays matters more than billing more clinic visits. Raising service units by 50%, from 213 to 320, moves paid worker costs from 6.5% ($6,775) to 9.8% ($10,162) of $103,719. By contrast, savings from fewer hospital stays reach 103.2% ($107,006) for Medi-Cal plans. Across all hospital payers, hospital stay savings reach 280.7% ($291,171). Thus, county estimates depend on causal proof and 13-year bounds (adjusted p = 0.067), while worker teams need plan contracts.'
    },
    methodologyParagraphs: [
      '<strong>How the Estimates Were Made: Observed County Results and Published Federal Values.</strong> Unit A ratios and dollar figures (5.4:1 to 49.3:1 yearly, 8.2:1 in the unadjusted case, 27.2:1 to 89.4:1 over 13 years with adjusted p = 0.067, and $420,168 and $231,481 per death avoided) are calculated from fixed inputs, assuming spending caused fewer deaths. They combine pre-2020 California county links (-2.38 yearly, unadjusted 95% range [-3.91, -0.85]; -4.32 over 13 years, unadjusted p = 0.0052, adjusted p = 0.067, unadjusted 95% range [-7.34, -1.30]) with 2025 HHS values ($6.3M, $13.6M, $20.7M). Unit B worker ratios (0.07:1 to 2.81:1) use Medi-Cal fees set by law, California worker cost estimates, and hospital savings.',
      '<strong>Primary References &amp; Data Sources.</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL Schedule)</a>; <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA Mortality Risk Valuation ($11.2M VSL)</a>; <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders, G. D., et al. (2016), Second Panel on Cost-Effectiveness in Health and Medicine, JAMA, 316(10), 1093-1103</a>; <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS Medi-Cal CHW Benefit (SPA 22-0001)</a>; and <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a>.'
    ],
    faqs: [
      {
        question: 'How do tests that change one or two inputs help explain these dollar estimates?',
        answer: 'A one-way test changes one input, such as testing $6.3M, $13.6M, and $20.7M rates on the -2.38 yearly link (15.0:1 to 49.3:1 if causal). A two-input test pairs 0.85 from the unadjusted 95% range with $6.3M to give 5.4:1 per year if causal. Over 13 years, 8.2:1 uses the unadjusted -1.30 bound, while 4.32 has adjusted p = 0.067 (above 0.05). Showing all cases keeps causal rules and ranges clear.'
      },
      {
        question: 'How small could the decrease in deaths be before estimated benefits no longer exceed costs?',
        answer: 'This check asks how many deaths $10 more per resident must prevent for value to equal cost (1.0:1) at federal rates. At the $13.6M middle HHS rate, equal value and cost need 0.0735 fewer deaths per 100,000 people. Pre-2020 links are 2.38 fewer deaths per 100,000 per year and 4.32 over 13 years (adjusted p = 0.067).'
      },
      {
        question: 'Why are care worker cost comparisons kept separate from death-risk dollar ratios?',
        answer: 'County ratios estimate resident health value only if spending caused fewer deaths. They do not show cash paid to counties. Worker rows instead compare visit fees ($6,775-$10,162) and hospital stay savings ($107,006-$291,171) with one $103,719 worker. Keeping them apart shows worker teams need Medi-Cal plan contracts, not VSL talks.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'Five-Year Contracts Divide First-Year Care Team Setup Costs Across Five Years of Care', note: 'Case study on cost per healthy year gained, net value, and five-year setup costs' },
      { slug: 'measuring-health-common-unit', title: 'Distinct Healthy-Year and Death-Risk Units Help Counties Compare Care and Prevention', note: 'Case study explaining how healthy life-years and federal death-risk values stay in separate tables' },
      { slug: 'chw-health-outcomes', title: 'Fixed Medi-Cal Visit Fees Pay Less Than One Tenth of County Care Worker Costs', note: 'Case study on Community Health Worker visit fees, health plan savings, and hospital savings' }
    ]
  }
];

for (const spec of modules) {
  renderModuleHtml(spec);
}

console.log('Wave 4B (5 Modules in Track 4) rendered successfully.');
