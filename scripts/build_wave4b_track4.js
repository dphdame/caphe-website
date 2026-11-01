#!/usr/bin/env node
'use strict';

/**
 * Wave 4B Builder: Track 4 System Dynamics & Feedback (5 Remaining Modules: #25, #26, #27, #29, #30)
 * Note: Module #28 (food-insecurity-diabetes) was completed in Wave 2.
 *
 * Modules built:
 *  - #25 reverse-causation-feedback (Track 4, public, Mode B) — Pandemic surge +2.47 vs. pre-pandemic routine TWFE (-2.38), 13-yr cumulative OLS (-4.32), and Long-Difference 2SLS (-5.31)
 *  - #26 measurement-error-claims (Track 4, community, Mode B) — Single-registry counts vs. linked Medicaid claims, OIG LEIE, and California DHCS S&I records
 *  - #27 collider-bias (Track 4, member, Mode A) — Active-only subsample selection bias (0.442 vs. 0.724 AUC) and Bayes base-rate calibrated precision
 *  - #29 classifying-causal-mechanisms (Track 4, member, Mode A) — Confounder, mediator, collider, and instrument roles across four separate CAPHE datasets
 *  - #30 sensitivity-analysis-cea (Track 4, member, Mode A) — Single central point estimate vs. HHS 2025 VSL range, plus CHW cost-capture sensitivity
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
        visibleLabel: 'Public Health Spending Regime Analysis',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 county-years), each dollar per capita corresponds to -0.238 fewer deaths per 100,000 in 2003 to 2019 versus +0.247 in 2020 to 2023.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Needs-Driven Spending &amp; Simultaneity (Mode B Panel)',
    pageTitle: 'Needs-Driven Spending & Prevention ROI | CAPHE',
    metaDescription: 'Pandemic emergency grants pull 2020-2023 slopes to +2.47 deaths/100K; pre-COVID budgets isolate -2.38 to -5.31 deaths/100K across 57 California counties.',
    h1: 'Same-Year County Spending Averages Combine Routine Prevention Budgets With Outbreak Emergency Funds',
    subtitle: 'Splitting emergency outbreak fund surges from steady base prevention budgets across county years.',
    endnotes: [
      '<strong>California County Public Health Spending Panel (2003-2023):</strong> <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a> linked to <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics</a> death records across 57 counties. N = 1,163 county-years (N = 943 in the 2003-2019 pre-pandemic window; N = 779 in 2003-2016 single-regime; N = 220 in the 2020-2023 COVID-19 window).',
      '<strong>Needs-Driven Feedback vs. Routine Budget Isolation:</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), <em>Journal of Business &amp; Economic Statistics</em>, 30(1), 67-80</a> provides the heteroskedasticity-based IV framework. The CAPHE California 57-county LHA panel finds -2.38 deaths/100K per $10/capita in 2003-2019 annual TWFE OLS ($420,168/life, 32.4:1 BCR), -4.32 in 13-year cumulative long-difference OLS ($231,481/life, 58.8:1 BCR), and -5.31 in 13-year Long-Difference Lewbel 2SLS (first-stage F = 111.20, $188,324/life, 72.2:1 BCR), versus +2.47 in the 2020-2023 pandemic surge window (p = 0.0010) and -0.25 in pooled 2003-2023 TWFE (p = 0.710).',
      '<strong>Independent Governance Check &amp; Valuation:</strong> <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), <em>Economics &amp; Human Biology</em>, 13, 34-45</a> finds protective effects of county health spending in California. <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 VSL Guidelines</a> sets a $13.6M central value.'
    ],
    policySettingHtml: 'Health spending and county death rates move both ways when an outbreak hits. State and federal relief grants flow to counties where death rates jump. Splitting outbreak grant surges from base care shows how steady local health funds save lives over time.',
    answerHtml: `Across <strong>943 pre-pandemic California county-years</strong> (2003 to 2019), routine-budget models isolate <strong>-2.38 deaths per 100,000 per $10/resident annually</strong> (<strong>$420,168 per life saved, 32.4:1 return</strong>), building to <strong>-4.32 over 13-year cumulative horizons</strong> (<strong>$231,481 per life, 58.8:1 return</strong>) and <strong>-5.31 in multi-year routine-budget models</strong> [1,2]. During 2020 to 2023, emergency COVID-19 grants surged 64.2% and show a <strong>+2.47 slope</strong> because relief funds followed pandemic death spikes, pulling the pooled 2003 to 2023 average to <strong>-0.25</strong> [2]. Checking both the <strong>-2.38</strong> annual floor and the <strong>-4.32 to -5.31</strong> cumulative slopes protects multi-year grants from early cuts [3].`,
    block2: {
      title: 'Two Rulers: Pandemic Surge Feedback vs. Routine-Budget Horizons',
      contextTag: 'Mode B Panel (57 Counties, N = 943 Pre-COVID &amp; N = 220 COVID-19 County-Years, 2003 to 2023)',
      ariaLabel: 'Comparison of the 2020-2023 pandemic surge slope of +2.47 deaths per 100,000 versus the pre-COVID routine-budget estimates of -2.38 annual and -4.32 to -5.31 cumulative deaths per 100,000',
      ruler1: {
        title: 'Ruler 1: Pandemic Emergency Surge Window (2020-2023)',
        stat: '+2.47 Deaths / 100K (4.85-Point Sign Flip)',
        ariaLabel: 'Pandemic 2020-2023 slope is +2.47 deaths per 100,000 per $10 per capita, sitting 4.85 points above the -2.38 pre-COVID annual slope because reactive COVID-19 grants followed mortality waves',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '4.85-Point Regime Shift (+2.47 COVID Surge vs. -2.38 Pre-COVID)' },
          { cls: 'seg-rest', width: 8, label: '+2.47 Surge' }
        ],
        desc: 'When pandemic death waves hit in 2020 to 2023, emergency grants pushed county health spending up 64.2% ($99.65 to $168.70/capita). The 2020-2023 slope is <strong>+2.47</strong>, sitting <strong>4.85 points above the -2.38 pre-COVID slope</strong> and attenuating pooled 2003-2023 TWFE to <strong>-0.25</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: Routine-Budget Horizons (Annual TWFE &amp; 13-Yr Cumulative)',
        stat: '-2.38 Annual | -4.32 Cumul. | -5.31 2SLS / 100K',
        ariaLabel: 'Routine-budget isolation yields -2.38 deaths per 100,000 annually ($420,168 per life) and -4.32 to -5.31 over 13-year cumulative horizons ($231,481 to $188,324 per life)',
        segments: [
          { cls: 'seg-primary', width: 55, label: 'Annual TWFE: -2.38 / 100K ($420,168 / Life)' },
          { cls: 'seg-food', width: 45, label: '13-Yr Cumulative: -4.32 OLS / -5.31 2SLS' }
        ],
        desc: 'Tracking pre-pandemic routine budgets isolates <strong>-2.38 deaths/100K annually ($420,168/life, 32.4:1 BCR)</strong>. Over 13-year cumulative horizons, chronic-disease prevention builds to <strong>-4.32 in OLS ($231,481/life, 58.8:1 BCR)</strong> and <strong>-5.31 in 2SLS ($188,324/life, 72.2:1 BCR)</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Splitting Outbreak Feedback From Annual and Cumulative Routine-Budget Effects',
      subtitle: 'Comparing 2020-2023 pandemic surge feedback against the pre-pandemic annual county panel, 13-year cumulative differences, and 13-year routine-budget IV models.',
      caption: 'Comparison of 2020-2023 pandemic surge panel, 2003-2019 pre-pandemic annual county panel, 13-year cumulative change, and 13-year routine-budget IV results on the $10 per resident scale.',
      cornerLabel: 'Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Panel Estimates; Mode A Valuations):</strong> Pandemic 2020-2023 TWFE OLS is +2.47 deaths per 100,000 per $10/capita (β = +0.247 per $1, SE = 0.075, p = 0.0010, N = 220), while pooled 2003-2023 TWFE OLS is -0.25 per $10 (β = -0.025, SE = 0.067, p = 0.710, N = 1,163). Pre-pandemic 2003-2019 TWFE OLS is -2.38 per $10 (β = -0.238, SE = 0.078, p = 0.0022, wild cluster bootstrap p = 0.007, N = 943; urban -2.59, p &lt; 0.0001; smaller/rural -2.42, p = 0.0136). Single-regime 13-year cumulative long-difference OLS (2003-2016, N = 57) is -4.32 per $10 (SE = 1.54, p = 0.0052; 16-year 2003-2019 excl. 5 LGRS outliers is -5.91, p = 0.0330). Single-regime 13-year Long-Difference Lewbel 2SLS (2003-2016, N = 57) is -5.31 per $10 (SE = 1.67, p = 0.0015, first-stage F = 111.20, Hansen J p = 0.2132; 16-year 2003-2019 Long-Difference 2SLS is -11.49, p = 0.0009, F = 13.09).',
      columns: [
        { tag: 'Pandemic Surge', tagHighlight: false, title: 'COVID-19 Surge Window', subtitle: 'County Panel 2020-2023, N = 220' },
        { tag: 'Annual Baseline', tagHighlight: true, title: 'Pre-Pandemic Annual Panel', subtitle: '2003-2019 Subsample, N = 943' },
        { tag: '13-Yr Span', tagHighlight: false, title: '13-Year Cumulative Change', subtitle: 'Single-Regime 2003-2016, N = 57' },
        { tag: 'Routine-Budget IV', tagHighlight: true, title: 'Multi-Year Formula Check', subtitle: '13-Yr Routine-Budget Model, N = 57' }
      ],
      rows: [
        {
          label: 'Panel Sample &amp; Method',
          cells: [
            { val: 'COVID-19 Panel (N = 220)' },
            { val: 'Pre-COVID Panel (N = 943)' },
            { val: '13-Yr Cumulative Model (N = 57)' },
            { val: '13-Yr Routine-Budget IV (N = 57)' }
          ]
        },
        {
          label: 'Active Path in Model',
          cells: [
            { val: 'Two-Way (Deaths <-> Surge Aid)' },
            { val: 'Routine Budget -> Annual Health' },
            { val: 'Sustained Budget -> 13-Yr Health' },
            { val: 'Instrumented Budget -> 13-Yr Health' }
          ]
        },
        {
          label: 'Outbreak Surge Handling',
          cells: [
            { val: '+64.2% emergency grant surge' },
            { val: 'Separates 2020-2023 COVID era' },
            { val: '13-yr pre-LGRS cumulative change' },
            { val: 'Variance-based routine-budget check' }
          ]
        },
        {
          label: 'Mortality Shift per 100,000',
          highlight: true,
          cells: [
            { val: '+2.47 (Pandemic Surge)', barWidth: 2, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '-2.38 deaths / 100K (annual)', barWidth: 45, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-4.32 deaths / 100K (13-yr)', barWidth: 81, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-5.31 deaths / 100K (routine IV)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Cost per Life ($10 Scale)',
          modeled: true,
          cells: [
            { val: 'Not defined (positive slope)' },
            { val: '$420,168 per life saved' },
            { val: '$231,481 per life saved' },
            { val: '$188,324 per life saved' }
          ]
        },
        {
          label: 'Return per $1 Spent ($13.6M Life Value)',
          modeled: true,
          cells: [
            { val: 'Reads as 0:1 (reverse feedback)' },
            { val: '32.4:1 (15.0:1 Low to 49.3:1 High)' },
            { val: '58.8:1 (27.2:1 Low to 89.4:1 High)' },
            { val: '72.2:1 (33.5:1 Low to 109.9:1 High)' }
          ]
        },
        {
          label: 'Statewide Value at 39M Pop ($10 Scale)',
          modeled: true,
          cells: [
            { val: 'Surge aid tracks death waves' },
            { val: '928 lives ($12.6B, annual)' },
            { val: '1,685 lives ($22.9B, 13-yr)' },
            { val: '2,071 lives ($28.2B, routine IV)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Managing Budget Cycles When Outbreak Surges Cloud Base Gains',
      subtitle: 'How separating reactive outbreak aid across calm and pandemic windows guides county budget rules.',
      caption: 'Decision grid showing feedback paths, audit pitfalls, budget tradeoffs, and multi-year grant rules.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Pandemic Surge Window', subtitle: 'N = 220 county-years, 57 CA counties; 2020-2023 panel (+2.47)' },
        { title: 'Pre-Pandemic Annual Baseline', subtitle: 'N = 943 county-years, 57 CA counties; 2003-2019 panel (-2.38)' },
        { title: '13-Year Cumulative Horizon', subtitle: 'N = 57 CA counties; 2003-2016 cumulative model (-4.32)' },
        { title: '13-Yr Routine-Budget IV', subtitle: 'N = 57 CA counties; 2003-2016 routine-budget IV (-5.31)' }
      ],
      rows: [
        {
          label: 'Feedback &amp; Sample Path',
          cells: [
            { val: 'Emergency COVID-19 grants rose 64.2% ($99.65 to $168.70/capita) as death rates spiked.' },
            { val: 'Calm-year budgets (2003-2019) test steady disease control in both urban (-2.59) and rural (-2.42) counties.' },
            { val: 'Sustained 13-year changes capture compounding cardiovascular (-1.15, 48.4%) and chronic disease gains.' },
            { val: '13-year routine-budget IV corrects for residual feedback with strong variance-based instruments.' }
          ]
        },
        {
          label: 'Why 1-Year Audits Misread This Stage',
          cells: [
            { val: 'Pooling 2020-2023 emergency grants with routine budgets attenuates the full-panel slope to -0.25.' },
            { val: 'Single-year models capture only 55% of the 13-year cumulative mortality reduction (-2.38 vs. -4.32).' },
            { val: 'Short one-year pilots stop chronic disease and hypertension control before multi-year gains mature.' },
            { val: 'Single-year IV has weak first stages, whereas 13-year routine-budget IV is strongly identified.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Cutting base budgets after emergency grants expire removes staff needed for chronic disease control.' },
            { val: 'Even in Year 1 alone, the -2.38 pre-pandemic baseline yields a 32.4:1 return ($420,168 per life saved).' },
            { val: 'Over 13-year cumulative horizons, the -4.32 slope yields a 58.8:1 return ($231,481 per life saved).' },
            { val: 'At the -5.31 routine-budget IV slope, a statewide $10/resident outlay implies ~2,071 lives saved ($188,324 per life).' }
          ]
        },
        {
          label: 'Best-Fit Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'Split Outbreak Aid From Base Budgets', detail: 'Separate emergency pandemic grants from routine prevention before scoring county results.' },
            { headline: 'Use -2.38 (32:1) as Annual Floor', detail: 'Anchor conservative 1-year budget memos in the -2.38 pre-pandemic baseline (32.4:1 return).' },
            { headline: 'Report Cumulative Multi-Year ROI', detail: 'Pair the annual floor with the -4.32 13-year cumulative return (58.8:1) in board reports.' },
            { headline: 'Use Multi-Year Grant Cycles', detail: 'Fund county health grants in multi-year blocks so chronic-disease prevention can compound.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Estimator Details, Pandemic Regime Shift, Exposure Horizons &amp; Provenance',
      notesBullets: [
        '<strong>Estimator Details &amp; Robustness:</strong> In the audited 57-county panel (Value_of_Public_Health/paper/ajph_submission.tex), the primary 2003-2019 pre-COVID TWFE OLS specification (N = 943) yields -2.38 deaths per 100,000 per $10/capita (β = -0.238, SE = 0.078, p = 0.0022, wild cluster bootstrap p = 0.007). The effect holds in both large urban counties (&gt;500,000 residents: -2.59, p &lt; 0.0001) and smaller/rural counties (&le;500,000 residents: -2.42, p = 0.0136), and in the single-regime 2003-2016 SCO schedule (-2.62, p = 0.0128).',
        '<strong>Pandemic Regime Reversal &amp; Multi-Year Long Differences:</strong> In the system Mortality_it = β·Spending_it + γ·X_it + α_i + τ_t + ε_it, the 2020-2023 COVID-19 emergency window (N = 220) saw a 64.2% spending surge ($99.65 to $168.70 per capita) directed toward pandemic mortality waves, producing a positive slope of +2.47 per $10 (β = +0.247, SE = 0.075, p = 0.0010) and a 4.85-point regime shift above the pre-pandemic baseline (-2.38). Over multi-year cumulative horizons, 13-year long-difference OLS (2003-2016, N = 57) yields -4.32 per $10 (SE = 1.54, p = 0.0052), 16-year long-difference OLS (2003-2019 excl. 5 LGRS boundary outliers, N = 49) yields -5.91 per $10 (SE = 2.77, p = 0.0330), and 13-year Long-Difference Lewbel (2012) 2SLS yields -5.31 per $10 (SE = 1.67, p = 0.0015, first-stage F = 111.20, Hansen J p = 0.2132; 16-year Long-Difference 2SLS = -11.49, p = 0.0009, F = 13.09).',
        '<strong>Unit Convention ($1 per Capita Regression Tables vs. $10 per Capita Policy Scale):</strong> In Value_of_Public_Health/paper/ajph_submission.tex (Tables 2-3 and Online Appendix Table A3), regression slopes β are reported per $1 per capita (-0.238 annual TWFE, -0.432 13-year long difference, -0.531 13-year Long-Difference 2SLS) alongside the policy-scaled effect per $10 per capita (10 × β = -2.38, -4.32, and -5.31 deaths per 100,000). Because both scales represent the exact same underlying ratio ($10 × 100,000 / 2.38 = $1 × 100,000 / 0.238 = $420,168 per statistical life saved), cost per life saved and Benefit-Cost Ratios (32.4:1 annual, 58.8:1 13-year cumulative, 72.2:1 Long-Difference 2SLS at $13.6M VSL) are invariant to whether the table is read per $1 or per $10.',
        '<strong>Data Provenance:</strong> Panel estimates (+2.47 COVID-19 surge, -0.25 pooled 2003-2023, -2.38 pre-COVID annual TWFE, -2.42 smaller/rural, -2.59 urban, -4.32 13-year cumulative OLS, -5.91 16-year cumulative OLS, -5.31 and -11.49 Long-Difference Lewbel 2SLS) and VSL inputs come from src/frontend/js/lha-calculator.js, public/tools/lha-calculator/methodology.html, and Value_of_Public_Health/paper/ajph_submission.tex.'
      ]
    },
    synthesis: {
      title: 'Splitting Outbreak Aid From Steady Prevention Gains',
      p1: 'Every public health budget works inside a feedback loop during public health emergencies. When pandemic death waves hit in 2020 to 2023, federal and state relief grants boosted county health spending by 64.2% ($99.65 to $168.70 per capita), producing a positive +2.47 slope per $10 (p = 0.0010). Because emergency aid chased pandemic mortality spikes, pooling 2020 to 2023 with routine years attenuates the full-panel county slope to -0.25 (p = 0.710).',
      p2: 'Health economics separates routine pre-pandemic prevention budgets (2003 to 2019, N = 943) from emergency outbreak surges and tracks how chronic-disease prevention compounds over time. Annual within-county panel models isolate -2.38 deaths per 100,000 per $10 ($420,168 per life saved, $32.40 return per $1), holding in both urban (-2.59) and smaller/rural (-2.42) counties. Over 13-year cumulative horizons, the effect nearly doubles to -4.32 in cumulative differences ($231,481 per life, $58.80 return per $1) and -5.31 in 13-year routine-budget IV models ($188,324 per life, $72.20 return per $1). Showing boards both the annual baseline and the multi-year cumulative return helps keep effective programs funded across budget cycles.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode B Panel Estimates; Mode A Valuations in Table 1):</strong> All regression slopes (+2.47 COVID-19 window, -0.25 pooled 2003-2023, -2.38 pre-pandemic 2003-2019 TWFE OLS, -2.42 smaller/rural, -2.59 urban, -4.32 13-year cumulative OLS, -5.91 16-year cumulative OLS, and -5.31 / -11.49 Long-Difference Lewbel 2SLS) and 57-county California population baselines are observed Mode B inputs from src/frontend/js/lha-calculator.js, public/tools/lha-calculator/methodology.html, and Value_of_Public_Health/paper/ajph_submission.tex. Table 1 valuations apply the HHS 2025 VSL schedule ($6.3M Low, $13.6M Central, $20.7M High) to those observed slopes.',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES, 30(1), 67-80</a>; <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), Economics &amp; Human Biology, 13, 34-45</a>; <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a>; <a href="https://www.cdph.ca.gov/Programs/CHSI/Pages/Data-and-Statistics-.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDPH Vital Statistics Mortality Data</a>; and <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 VSL Guidelines</a>.'
    ],
    faqs: [
      {
        question: 'What is "reverse causation" in public health budgets?',
        answer: 'It happens when the health outcome (death or disease rates) drives changes in the budget input (public health spending). During the 2020-2023 COVID-19 pandemic, emergency relief grants raised county public health budgets by 64.2% in response to mortality spikes, producing a +2.47 slope per $10 (p = 0.0010) that masks the -2.38 pre-pandemic protective effect when the two regimes are pooled.'
      },
      {
        question: 'How do the $1 per capita regression coefficients and $10 per capita policy figures relate?',
        answer: 'In the working paper (ajph_submission.tex), regression slopes β are reported per $1 per capita (-0.238 annual TWFE, -0.432 13-year cumulative OLS, -0.531 Long-Difference 2SLS) alongside the scaled impact per $10 per capita (-2.38, -4.32, and -5.31 deaths per 100,000). Both express the exact same cost-effectiveness ratio ($420,168 per life saved annually and $231,481 over 13-year cumulative horizons).'
      },
      {
        question: 'Does county public health spending still pay off if a board uses only the Year 1 annual baseline?',
        answer: 'Yes. Using the conservative 2003-2019 annual TWFE estimate of -2.38 deaths per 100,000 per $10/capita yields $420,168 per life saved and a 32.4:1 benefit-cost ratio at the $13.6M HHS central VSL (15.0:1 at the $6.3M Low VSL and 49.3:1 at the $20.7M High VSL).'
      }
    ],
    related: [
      { slug: 'observational-to-experimental', title: 'Pandemic Surge vs. Routine-Budget Horizons', note: 'Case study comparing pandemic surge feedback (+2.47) with annual (-2.38) and cumulative (-4.32 to -5.31) prevention' },
      { slug: 'budget-impact', title: 'Budget Impact vs. Multi-Year ROI', note: 'Case study on managing Year 1 cash-flow outlays while multi-year benefits mature' },
      { slug: 'sensitivity-analysis-cea', title: 'Sensitivity Analysis Across HHS VSL Tiers', note: 'Case study testing the 32:1 annual and 59:1 cumulative LHA returns across HHS 2025 VSL tiers' }
    ]
  },

  // =========================================================================
  // MODULE #26: measurement-error-claims (Track 4, community)
  // =========================================================================
  {
    slug: 'measurement-error-claims',
    tetsCompanion: [
      {
        visibleLabel: 'OIG Exclusion List Label Audit',
        title: 'The Label That Isn\'t: Why "Excluded" Doesn\'t Mean "Fraudulent"',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-labels/',
        claimCovered: 'Section 1128 exclusion authorities and why LEIE exclusion is a contaminated fraud label; the 40% license-revocation share and matched-provider counts are article-reported.'
      },
      {
        visibleLabel: 'Medicaid Provider Spending File Guide',
        title: 'What 238 Million Medicaid Billing Rows Can Support',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-data-landscape/',
        claimCovered: 'Field definitions of the HHS Medicaid provider-spending file, including billing and servicing NPIs, suppression rules, and the 238,015,729-row artifact.'
      }
    ],
    tier: 'community',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Single-Registry Counts vs. Multi-Registry Reconciliation (Mode B Linked Claims &amp; Exclusion Records)',
    pageTitle: 'Directory Counts vs. Active Claims | CAPHE',
    metaDescription: 'Linking 488,032 Medicaid billing NPIs to OIG LEIE and California DHCS S&I records shows a federal-only lookup omits 199 of 648 sanctioned NPIs (30.7%).',
    h1: 'Linked Federal and State Sanction Lists Identify More Excluded Medicaid Providers Than Federal Checks Alone',
    subtitle: 'Linking paid Medicaid claims with federal exclusion files and state lists to check active providers.',
    endnotes: [
      '<strong>Linked Medicaid Claims &amp; Sanction Universe (2018-2024):</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> claims cover 488,032 billing NPIs and 487,384 non-excluded controls. These link to the <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG List of Excluded Individuals/Entities (LEIE)</a> with 449 federal matches, including 299 financial fraud exclusions.',
      '<strong>California State-Only Suspension Records:</strong> <a href="https://files.medi-cal.ca.gov/pubsdoco/SandILanding.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Suspended &amp; Ineligible Provider List</a> holds 199 of 648 sanctioned NPIs (30.7%) with zero federal LEIE match.',
      '<strong>Enforcement Lag &amp; Directory Benchmarks:</strong> Post-panel financial fraud exclusions cover 95 NPIs dated 2025 or later ($9,694.90/mo median paid vs. $3,820.94/mo controls, 50.0-month median gap from final billing to exclusion). <a href="https://doi.org/10.1377/hlthaff.2022.00383" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Zhu, J. M., et al. (2023), <em>Health Affairs</em>, 42(1), 49-57</a> reports a 58% inactive-directory benchmark.'
    ],
    policySettingHtml: 'State and county Medicaid teams audit provider directories and sanction lists to check clinic capacity and program integrity. However, single registries record only one status snapshot and lag behind active billing by years. Linking paid Medicaid claims with both federal exclusion files and California suspension lists gives a complete provider picture.',
    answerHtml: 'Linking <strong>488,032 Medicaid billing providers</strong> (2018 to 2024) across paid claims, federal exclusions, and California suspension lists finds <strong>487,384 active non-excluded providers</strong> and <strong>648 sanctioned providers</strong> [1]. A federal-only check leaves out <strong>199 state-suspended providers (30.7%)</strong>, while <strong>95</strong> later-excluded fraud billers took in <strong>$9,694.90 per month</strong> unflagged [2]. Because formal exclusion trails final billing by a <strong>50.0-month</strong> median gap, teams pair federal and state list checks with paid-claims volume reviews [3].',
    block2: {
      title: 'Two Rulers: One Raw Registry Count vs. Linked Claims &amp; Multi-List Check',
      contextTag: 'Mode B Observed Linked Records (HHS Medicaid Provider Spending 2018-2024, OIG LEIE February 2026, California DHCS S&amp;I List)',
      ariaLabel: 'Comparison of 648 sanctioned NPIs counted as one registry total versus the same 648 NPIs reconciled into 299 financial fraud exclusions, 199 state-only suspensions, and 150 other federal exclusions',
      ruler1: {
        title: 'Ruler 1: Single-List Count',
        stat: '488,032 Billing NPIs; 648 Sanctioned NPIs Counted as One Total',
        ariaLabel: 'The unadjusted count lists 488,032 Medicaid billing NPIs, of which 648 appear on any sanction registry, treated as a single undifferentiated group',
        segments: [
          { cls: 'seg-gross', width: 100, label: '648 Sanctioned NPIs Counted as One List Total (100% Base)' }
        ],
        desc: 'The single-list count shows <strong>488,032 Medicaid billing NPIs</strong>, with <strong>648 (0.13%)</strong> on a sanction list. Read as one total, it does not show which cases involve fraud. It also does not show state-only bans or how long providers billed before action.'
      },
      ruler2: {
        title: 'Ruler 2: Linked Claims &amp; Multi-List Check',
        stat: '299 Fraud Exclusions + 199 State-Only Suspensions + 150 Other',
        ariaLabel: 'Reconciliation splits the 648 sanctioned NPIs into 299 financial fraud exclusions (46.1 percent), 199 California state-only suspensions with no federal match (30.7 percent), and 150 other federal exclusions (23.1 percent), against 487,384 non-excluded controls',
        segments: [
          { cls: 'seg-primary', width: 46, label: '299 Financial Fraud (46.1%)' },
          { cls: 'seg-Housing', width: 31, label: '199 State S&amp;I Only (30.7%)' },
          { cls: 'seg-food', width: 23, label: '150 Other LEIE (23.1%)' }
        ],
        desc: 'Linking claims to both lists splits <strong>487,384 non-excluded controls</strong> from <strong>299 financial fraud exclusions</strong> (204 in 2018-2024 and 95 in 2025 or later). It also finds <strong>199 California-only suspensions</strong> with no federal match. A federal-only check sees <strong>449 of 648</strong> sanctioned NPIs (69.3%).'
      }
    },
    table1: {
      title: 'Table 1. Linked Billing and Sanction Records Across Four Provider Groups',
      subtitle: 'Observed 2018 to 2024 Medicaid paid claims linked to federal OIG and California DHCS sanction lists.',
      caption: 'Four provider groups compared on group size, source list, monthly paid amounts, total payments, billing timing, and directory benchmarks.',
      cornerLabel: 'Linked Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Observed Linked Records):</strong> Observed 2018-2024 HHS Medicaid Provider Spending claims linked to OIG LEIE (February 2026) and the California DHCS S&amp;I list. Each column states its own group total. Cells report medians within that column. Post-panel gap is 50.0 months median (mean 50.7) from final billing month to LEIE exclusion. External benchmark: Zhu et al. (2023) found 58% of listed Oregon Medicaid mental health providers saw few or no Medicaid patients.',
      columns: [
        { tag: 'Group 1: Baseline', tagHighlight: false, title: 'Active Non-Excluded Controls', subtitle: 'N = 487,384 NPIs; unit: billing NPI, 2018-2024 claims' },
        { tag: 'Group 2: In-Panel', tagHighlight: true, title: 'Sanctioned in 2018-2024', subtitle: 'N = 204 financial fraud NPIs (LEIE Spec A); unit: billing NPI' },
        { tag: 'Group 3: Delayed', tagHighlight: true, title: 'Sanctioned in 2025 or Later', subtitle: 'N = 95 NPIs billing unflagged in 2018-2024; unit: billing NPI' },
        { tag: 'Group 4: State File', tagHighlight: true, title: 'California State-Only List', subtitle: 'N = 199 of 648 sanctioned NPIs with zero LEIE match; unit: billing NPI' }
      ],
      rows: [
        {
          label: 'Group Size',
          cells: [
            { val: '487,384 NPIs (99.87% of all)' },
            { val: '204 NPIs (0.042% of all)' },
            { val: '95 NPIs (0.019% of all)' },
            { val: '199 NPIs (30.7% of 648)' }
          ]
        },
        {
          label: 'List Recording Status',
          cells: [
            { val: 'No LEIE or S&amp;I match' },
            { val: 'OIG LEIE fraud (2018-2024)' },
            { val: 'OIG LEIE fraud (2025+)' },
            { val: 'DHCS S&amp;I list only (no LEIE)' }
          ]
        },
        {
          label: 'Monthly Paid (Median)',
          highlight: true,
          cells: [
            { val: '$3,820.94 (base)', barWidth: 39, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '$6,721.78 (1.76x base)', barWidth: 69, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: '$9,694.90 (2.54x base)', barWidth: 100, barColor: '#D97706', textColor: 'text-amber-900' },
            { val: 'Not reported in source tables' }
          ]
        },
        {
          label: 'Patients &amp; Total Paid',
          cells: [
            { val: '33.42 patients | $83,867 paid' },
            { val: '50.76 patients | $81,474 paid' },
            { val: '$242,405 paid (64.8th pct)' },
            { val: 'Not reported in source tables' }
          ]
        },
        {
          label: 'Billing Timing',
          cells: [
            { val: 'No sanction date (base group)' },
            { val: 'Sanction dated in 2018-2024' },
            { val: '50.0-month gap to exclusion' },
            { val: 'No date on state S&amp;I list' }
          ]
        },
        {
          label: 'Published Benchmark',
          cells: [
            { val: 'Zhu 2023 (58% low-volume)' },
            { val: 'No matched external study' },
            { val: 'No matched external study' },
            { val: 'Single lists omit linked cases' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Reading Each Provider Group Before Drawing Access or Audit Rules',
      subtitle: 'Why one list count needs a link to paid claims and to both federal and state lists.',
      caption: 'Decision grid showing what the linked file sees, the data gap, planning risks, and the matching data step.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Active Non-Excluded Controls', subtitle: 'N = 487,384 NPIs; unit: billing NPI; HHS Medicaid Provider Spending 2018-2024' },
        { title: 'Sanctioned in 2018-2024', subtitle: 'N = 204 financial fraud NPIs; unit: billing NPI; OIG LEIE Specification A' },
        { title: 'Sanctioned in 2025 or Later', subtitle: 'N = 95 NPIs; unit: billing NPI; LEIE exclusion dated after the claims window' },
        { title: 'California State-Only List', subtitle: 'N = 199 of 648 sanctioned NPIs; unit: billing NPI; no federal LEIE match' }
      ],
      rows: [
        {
          label: 'What the Linked File Sees',
          cells: [
            { val: 'Controls bill $3,820.94 per month to 33.42 patients and serve as the base group.' },
            { val: 'In-panel fraud billers take in $6,721.78 per month, or 1.76 times the base median.' },
            { val: 'Post-2025 exclusions bill $9,694.90 per month, or 2.54 times controls, with no flag.' },
            { val: '199 providers sit on the state list with no federal LEIE record.' }
          ]
        },
        {
          label: 'Data Gap the Group Shows',
          cells: [
            { val: 'A directory headcount treats every listed provider the same, while claims show real volume.' },
            { val: 'A sanction date inside the window mixes pre-action billing with post-action stops.' },
            { val: 'A 50.0-month median lag passes between final billing and formal federal exclusion.' },
            { val: 'Checking only the federal list leaves out 30.7% of sanctioned providers (199 of 648).' }
          ]
        },
        {
          label: 'Planning Risk From One List',
          cells: [
            { val: 'Counting all 487,384 controls as equal capacity equates one-time billers with full-time clinics.' },
            { val: 'Treating 204 excluded providers as never active leaves out claims paid before action.' },
            { val: 'Directories built in 2024 list all 95 post-panel fraud billers as clean.' },
            { val: 'Audits that check only the federal LEIE list 199 state-suspended providers as clean.' }
          ]
        },
        {
          label: 'Best-Fit Data &amp; Audit Fix',
          policyFit: true,
          cells: [
            { headline: 'Weight Lists by Paid Claims', detail: 'Report billing providers next to monthly pay and patient counts to measure real access.' },
            { headline: 'Track Sanction Dates by Month', detail: 'Store the sanction date with the last billed month to split pre-ban claims.' },
            { headline: 'Pair List Checks With Claims', detail: 'Monitor high-volume billing during the 50-month lag and relink past claims when bans post.' },
            { headline: 'Match Federal and State Lists', detail: 'Check every provider against both OIG LEIE and the state list before reporting totals.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Reconciliation Math, Payment Ratios &amp; External Benchmarks',
      notesBullets: [
        '<strong>Reconciliation Math (Mode B):</strong> 488,032 billing NPIs equal 487,384 non-excluded controls plus 648 sanctioned NPIs. The 648 sanctioned NPIs split into 299 Specification A financial fraud exclusions (204 dated 2018-2024 and 95 dated 2025 or later; statutes 1128(a)(1), 1128(a)(3), 1128(b)(1)). Another 199 are California S&amp;I-only suspensions. The remaining 150 are other LEIE exclusions (patient abuse, license actions, controlled substances, and pre-2018 cases). The state-only share is 199 / 648 = 30.7%. The federal share is 449 / 648 = 69.3%.',
        '<strong>Payment Ratios &amp; Enforcement Lag (Mode B):</strong> Median monthly paid compared to controls is 6,721.78 / 3,820.94 = 1.76x for in-panel cases. For post-panel cases, it is 9,694.90 / 3,820.94 = 2.54x. The enforcement lag is the historical median gap from a provider\'s final billing month to formal LEIE exclusion (50.0 months, mean 50.7, IQR 32.5-68.0). Refreshing registry linkages updates historical labels once exclusions post, but does not shorten OIG\'s investigation-to-exclusion timeline.',
        '<strong>External Benchmark:</strong> The Zhu et al. (2023) Oregon Medicaid number (58% of listed mental health providers) is cited in public/tools/access-explorer/methodology.html. It describes directory lists in another state and is not subtracted from any count here.',
        '<strong>Data Provenance:</strong> All counts and medians come from Mcaid/05_fraud_detection/paper/output/results.json (controls_total_n, in_panel_fraud_n, prospective_fraud_n, ctrl_paid_per_month_median, during_paid_per_month_median, post_paid_per_month_median, post_pct_rank_total_paid, gap_median_months) and output/tables/tab_a2_exclusions.tex (199 S&amp;I-only, 648 total, 488,032 universe).'
      ]
    },
    synthesis: {
      title: 'Why Counting Names on a List Differs From Measuring Active Billers',
      p1: 'Provider directories and sanction files are both static lists. Each records a status on the day it was last updated. Read alone, the HHS Medicaid file lists 488,032 billing NPIs and 648 sanctioned providers as one sum. Linked to paid claims and to both federal and state lists, those 648 split into 299 fraud exclusions, 199 California-only suspensions, and 150 other cases.',
      p2: 'Health economics treats list records as a data system that needs cross-checks on both sides. Directories keep listing providers who see few Medicaid patients. For example, Zhu et al. (2023) found 58% of listed Oregon Medicaid mental health providers saw few or no patients. Sanction lists also lag behind billing by years. The 95 providers excluded in 2025 or later billed a median $9,694.90 per month through 2024 without a flag. Formal exclusion arrived a median 50.0 months after final billing, so list lookups alone cannot flag active billing during that pre-exclusion window and must be paired with paid-claims volume checks.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode B Observed Linked Records &amp; Published Literature):</strong> All provider counts (488,032 total; 487,384 controls; 204 in-panel and 95 post-panel fraud exclusions; 199 S&amp;I-only; 648 sanctioned) are observed Mode B records in output/results.json and output/tables/tab_a2_exclusions.tex. Median monthly payments ($3,820.94, $6,721.78, $9,694.90), patient counts (33.42, 50.76), and the 50.0-month lag come from the same files. The 58% Oregon figure (Zhu et al., 2023) is external context in public/tools/access-explorer/methodology.html.',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.1377/hlthaff.2022.00383" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Zhu, J. M., Charlesworth, C. J., Polsky, D., &amp; McConnell, K. J. (2023), <em>Health Affairs</em>, 42(1), 49-57</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG List of Excluded Individuals/Entities (LEIE)</a>; and the <a href="https://files.medi-cal.ca.gov/pubsdoco/SandILanding.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California DHCS Suspended &amp; Ineligible Provider List</a>.'
    ],
    faqs: [
      {
        question: 'What does a single sanction list leave out in Medicaid provider data?',
        answer: 'A single list records one status per provider as of its last update. In the linked 2018-2024 Medicaid file, 199 of 648 sanctioned NPIs (30.7%) appear only on the California DHCS Suspended and Ineligible list. A check of the federal LEIE alone does not return them.'
      },
      {
        question: 'Why do some sanctioned providers show up as active billers in claims data?',
        answer: 'Formal exclusion lags behind billing. Among providers excluded for financial fraud, the median gap from the final billing month to the LEIE exclusion date is 50.0 months. The 95 providers excluded in 2025 or later billed a median $9,694.90 per month during 2018-2024 with no list flag.'
      },
      {
        question: 'How should analysts link directory, claims, and sanction records?',
        answer: 'Match every NPI against paid claims, the federal LEIE, and the state suspension list. Record exclusion dates next to the last billed month, relink past claims when new bans post, and monitor high-volume paid claims during the 50.0-month window before formal exclusion.'
      }
    ],
    related: [
      { slug: 'collider-bias', title: 'Active-Only Subsample Selection Bias', note: 'Case study on how conditioning on active billers shifts screening AUC from 0.724 to 0.442 and rescales precision to the full billing universe' },
      { slug: 'threat-measurement-instrumentation', title: 'Instrumentation Shifts in Retail & Transit Data', note: 'Case study comparing 6,613 commercial food listings against 514 SNAP-verified EBT stores' },
      { slug: 'identical-data-opposite-policies', title: 'Nominal vs. Real Reimbursement Indices', note: 'Case study comparing CMS Practice Expense GPCI (1.506 vs. 0.900) against Area Deprivation Index need' }
    ]
  },

  // =========================================================================
  // MODULE #27: collider-bias (Track 4, member)
  // =========================================================================
  {
    slug: 'collider-bias',
    tetsCompanion: [
      {
        visibleLabel: 'Medicaid Fraud Classifier Validation Guide',
        title: 'Can a Classifier Find What Investigators Miss?',
        url: 'https://tooearlytosay.com/research/methodology/medicaid-fraud-classifier/',
        claimCovered: 'Temporal validation and interpretable baselines for fraud screening; the article-reported classifier metrics are under reconciliation because sample sizes and base rates conflict.'
      },
      {
        visibleLabel: 'Rare-Outcome Classifier Evaluation Workflow',
        title: 'Imbalanced Classification: An Article-Reported Example',
        url: 'https://tooearlytosay.com/research/methodology/imbalanced-classifier-python/',
        claimCovered: 'Instructional scikit-learn workflow for rare outcomes, including why a model that labels every case negative can score about 91% accuracy; dataset counts and metrics are article-reported.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Selection Skew &amp; Base-Rate Calibration (Mode A Calibration on Observed Screening Results)',
    pageTitle: 'Active-Only Subsample Selection Bias | CAPHE',
    metaDescription: 'A Medicaid fraud screen scores 0.724 AUC on 487,479 billers vs. 0.442 in the 2024 active subset; Top 1% precision rescales from 0.922% to 0.186%.',
    h1: 'Active-Only Provider Subsets Omit Earlier-Exiting Sanctioned Billers in Modeled Risk Audits',
    subtitle: 'Comparing modeled full-list provider risk screens against active-biller subsets that drop providers who left early.',
    endnotes: [
      '<strong>Full Medicaid Billing Universe Evaluation (2018-2024):</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> claims cover 487,479 billing providers (95 post-panel fraud exclusions vs. 487,384 non-excluded controls). Linked to <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>, the full-list ranking score is 0.724 AUC (95% CI 0.667-0.777, 9.5x lift in Top 1%).',
      '<strong>Observed Active-Only Subgroup Comparison &amp; Tenure Differences:</strong> In the subset of 55,018 providers still billing in 2024 (9 exclusions vs. 55,009 controls), the observed ranking score is 0.442 AUC (95% CI 0.212-0.664). Sanctioned providers also show shorter observed billing tenure (38.0th vs. 50.0th median peer percentile of active months; 90.5% exited before 2024 vs. 43.6% of controls, with exit-year reweighted AUC = 0.653). Because the 2024 active subset contains only 9 excluded providers and a wide confidence interval, the subgroup difference does not isolate early exit as the sole cause of the lower score.',
      '<strong>Population Base-Rate Calibration:</strong> Exact Bayes base-rate math rescales Top 1% precision from the 20%-control holdout (0.922%) to the full 487,479-provider billing list (0.186%, vs. 0.0195% random base rate).'
    ],
    policySettingHtml: 'Program integrity teams use billing alerts to decide which Medicaid providers to audit first. Many sanctioned providers stop billing years before a formal ban posts, and confirmed fraud cases make up a tiny fraction of all active billers. Checking alerts across every historical biller helps audit managers plan investigator workloads.',
    answerHtml: 'Across <strong>487,479 Medicaid billing providers</strong>, the screening model flags sanctioned providers at <strong>9.5 times the random rate</strong> in the top 1% of alerts (<strong>9 caught cases</strong> across <strong>4,844 flags</strong>) [1]. In the subset of <strong>55,018 providers still billing in 2024</strong> (<strong>9</strong> exclusions), the screen falls below a coin-flip rank alongside shorter prior tenure (<strong>38.0th vs. 50.0th</strong> percentile), an observed subgroup difference rather than an isolated causal effect [2]. Calibrated alert rates across the full provider list set realistic caseload goals for audit staff [3].',
    block2: {
      title: 'Two Rulers: Active-Only &amp; Holdout Subset vs. Full-List Base-Rate Calibration',
      contextTag: 'Mode A Calibration Applied to Observed Screening Results (Random Forest, 95 Post-Panel Exclusions vs. 487,384 Controls)',
      ariaLabel: 'Comparison of a fraud screen evaluated on providers active in 2024, AUC 0.442, versus the full billing universe, AUC 0.724, with Top 1 percent precision of 0.922 percent on the downsampled holdout and 0.186 percent at the full-population base rate',
      ruler1: {
        title: 'Ruler 1: Active-Only &amp; Holdout Check',
        stat: '0.442 AUC Active-Only; 0.922% Top 1% Holdout Precision',
        ariaLabel: 'Among providers still billing in 2024, 9 excluded versus 55,009 controls, the screen scores AUC 0.442 with 95 percent interval 0.212 to 0.664',
        segments: [
          { cls: 'seg-Housing', width: 44, label: 'AUC 0.442 (Active in 2024)' },
          { cls: 'seg-gross', width: 56, label: 'Remaining Distance to AUC 1.0' }
        ],
        desc: 'In the subset of providers <strong>still billing in 2024</strong> (9 excluded vs. 55,009 controls), observed AUC is <strong>0.442</strong> (95% CI 0.212-0.664; exit-year reweighted AUC is <strong>0.653</strong>). Excluded providers sit at the <strong>38.0th</strong> vs. <strong>50.0th</strong> median peer percentile of active months. A holdout with <strong>97,476 controls</strong> (20%) shows <strong>0.922%</strong> Top 1% precision.'
      },
      ruler2: {
        title: 'Ruler 2: Full-List Base-Rate Calibrated Check',
        stat: '0.724 AUC; 0.186% Top 1% Precision at 0.0195% Base Rate',
        ariaLabel: 'Across the full billing universe of 487,479 providers, the screen scores AUC 0.724 with 95 percent interval 0.667 to 0.777, and Top 1 percent precision rescales to 0.186 percent',
        segments: [
          { cls: 'seg-food', width: 72, label: 'AUC 0.724 (Full List)' },
          { cls: 'seg-gross', width: 28, label: 'Remaining Distance to AUC 1.0' }
        ],
        desc: 'Across all <strong>487,479 providers</strong> (95 post-panel exclusions, a <strong>0.0195%</strong> base rate), the same model reaches <strong>0.724 AUC</strong> (95% CI 0.667-0.777). Rescaled to that base rate, the Top 1% cutoff gives <strong>4,844 flags</strong>, <strong>9 caught cases</strong>, <strong>0.186% precision</strong>, and <strong>9.53x lift</strong> over random choice.'
      }
    },
    table1: {
      title: 'Table 1. Subset Results vs. Full-List Calibrated Results for One Fraud Screen',
      subtitle: 'Observed screening scores with Bayes base-rate rescaling of holdout precision across four test settings.',
      caption: 'Four test settings compared on group size, ranking score, holdout and full-list precision, flags and caught cases, lift, and caseload.',
      cornerLabel: 'Screen Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Observed Screening Results; Mode A Base-Rate Calibration):</strong> Each column states its own group size. The target is a formal LEIE financial fraud exclusion. Ranges are 95% CI bounds on AUC: full universe AUC = 0.724 (95% CI 0.667-0.777, 487,479 providers); active-only subset AUC = 0.442 (95% CI 0.212-0.664; 9 exclusions vs. 55,009 controls; exit-year reweighted AUC = 0.653). Holdout precision is rescaled to the 0.0195% full-population base rate.',
      columns: [
        { tag: 'Setting 1: Unfiltered', tagHighlight: false, title: 'All Billers, Top 1% Cutoff', subtitle: 'N = 487,479 providers (95 exclusions + 487,384 controls); unit: billing NPI' },
        { tag: 'Setting 2: Filtered', tagHighlight: true, title: 'Active-Biller Subset Only', subtitle: 'N = 55,018 providers billing in 2024 (9 exclusions + 55,009 controls); unit: billing NPI' },
        { tag: 'Setting 3: Caseload', tagHighlight: true, title: 'Top 5% Cutoff, Caseload Check', subtitle: 'N = 487,479 providers; 16,688 national MFCU active cases; unit: billing NPI' },
        { tag: 'Setting 4: Peer Check', tagHighlight: false, title: 'Peer-Group &amp; Matched Checks', subtitle: 'N = 204 exclusions vs. 487,384 controls (peer ranks); 230 vs. 1,150 (matched); unit: billing NPI' }
      ],
      rows: [
        {
          label: 'Test Group Size',
          cells: [
            { val: '95 | 487,384 (0.0195% base rate)' },
            { val: '9 | 55,009 (active in 2024)' },
            { val: '95 | 487,384 (0.0195% base rate)' },
            { val: '204 | 487,384 (230 vs. 1,150)' }
          ]
        },
        {
          label: 'Risk Ranking Pattern',
          highlight: true,
          cells: [
            { val: '0.724 rank score (full list)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.442 rank score (active billers)', barWidth: 44, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '0.724 rank score (Top 5%)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '0.818 rank score (peer match)', barWidth: 82, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Precision: Holdout vs. Full List',
          cells: [
            { val: '0.922% holdout | 0.186% full list' },
            { val: 'Not reported at a cutoff (9 cases, wide bounds)' },
            { val: '0.512% holdout | 0.103% full list' },
            { val: 'Not reported at a cutoff (in-panel)' }
          ]
        },
        {
          label: 'Flags &amp; Caught Cases',
          cells: [
            { val: '4,844 flags | 9 caught (9.47%)' },
            { val: 'No cutoff scored' },
            { val: '24,295 flags | 25 caught (26.32%)' },
            { val: 'No cutoff scored' }
          ]
        },
        {
          label: 'Lift &amp; Audit Caseload',
          cells: [
            { val: '9.53x lift | 29.0% of caseload' },
            { val: 'Not scored' },
            { val: '5.28x lift | 145.6% of caseload' },
            { val: 'Not scored' }
          ]
        },
        {
          label: 'Active Months Peer Percentile',
          cells: [
            { val: 'Months active kept (no filter)' },
            { val: '38.0th vs. 50.0th (0.653 reweighted)' },
            { val: 'Months active kept (no filter)' },
            { val: '38.0th vs. 50.0th (peer cells)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How Filtering on a Shared Effect Shifts Screen Scores',
      subtitle: 'Why subset scores should be rescaled to the full billing list before setting audit cutoffs.',
      caption: 'Decision grid showing the filter path, how it shifts accuracy and precision, the staffing impact, and the calibration rule.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Full Unfiltered List, Top 1%', subtitle: 'N = 487,479 providers (95 exclusions, 0.0195% base rate); unit: billing NPI' },
        { title: 'Active-Biller Subset Only', subtitle: 'N = 55,018 providers billing in 2024 (9 exclusions); unit: billing NPI' },
        { title: 'Top 5% Cutoff, Caseload Check', subtitle: 'N = 487,479 providers; 24,295 flags vs. 16,688 MFCU active cases; unit: billing NPI' },
        { title: 'Peer-Group &amp; Matched Checks', subtitle: 'N = 204 vs. 487,384 (peer ranks) and 230 vs. 1,150 (matched); unit: billing NPI' }
      ],
      rows: [
        {
          label: 'Filter Path in Each Setting',
          cells: [
            { val: 'Every billing provider stays in the list, so active months remain a model input.' },
            { val: 'Keeping only 2024 billers leaves 9 of 95 excluded providers after 90.5% exited before 2024.' },
            { val: 'The full list stays in place, while a wider cutoff sends more flags to staff.' },
            { val: 'Ranks are scored inside state and specialty peer cells, and matching reweights controls.' }
          ]
        },
        {
          label: 'How the Setting Shifts Scores',
          cells: [
            { val: 'Holdout precision (0.922%) is 4.96 times full-list precision (0.186%) due to 20% control sampling.' },
            { val: 'Ranks fall below a coin flip in the 9-case 2024 subset and recover when exit years are reweighted.' },
            { val: 'Full-list precision drops to 0.103% while flags rise to 24,295, or 145.6% of caseload.' },
            { val: 'Matched and balanced checks keep strong risk ranking on in-panel cases.' }
          ]
        },
        {
          label: 'Staffing Impact for Audit Teams',
          cells: [
            { val: 'At $23,719 per case, 4,844 Top 1% flags cost $114.9M to review and catch 9 cases.' },
            { val: 'With only 9 excluded billers left in 2024, active-only claims scores have wide bounds.' },
            { val: 'A Top 5% cutoff exceeds the 16,688-case national caseload, so cutoffs need capacity checks.' },
            { val: 'Peer-group ranks keep normal state and specialty billing differences from triggering flags.' }
          ]
        },
        {
          label: 'Best-Fit Calibration Rule',
          policyFit: true,
          cells: [
            { headline: 'Rescale Precision to the Full List', detail: 'Adjust downsampled holdout precision to the 0.0195% full-list base rate before setting rules.' },
            { headline: 'Keep All Providers in the Test Set', detail: 'Score the full provider list first and show active-only results as a separate subgroup check.' },
            { headline: 'Match Cutoffs to Staff Caseload', detail: 'Compare total flags against the 16,688 active MFCU cases before picking a cutoff.' },
            { headline: 'Rank Within Peer Cells', detail: 'Score billing features inside state and specialty cells and report matched checks.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Bayes Base-Rate Rescaling, Subgroup Selection Structure &amp; Data Provenance',
      notesBullets: [
        '<strong>Target Definition:</strong> The positive class is a formal OIG LEIE exclusion under Specification A financial fraud statutes (1128(a)(1), 1128(a)(3), 1128(b)(1)). The prospective check scores the 95 providers excluded in 2025 or later against 487,384 non-excluded controls (487,479 total).',
        '<strong>Bayes Base-Rate Rescaling (Mode A Calibration):</strong> The holdout keeps all 95 cases and 97,476 of 487,384 controls (20%). False positives scale by 1 / 0.20 = 5. In odds form, Odds_pop = Odds_holdout / 5. For Top 1%, 0.922% / 99.078% = 0.009306, and dividing by 5 gives 0.001861, or 0.186% precision. For Top 5%, 0.512% rescales to 0.103%. Lift equals precision divided by base rate: 0.1858% / 0.0195% = 9.53x, and 0.1029% / 0.0195% = 5.28x.',
        '<strong>Observed Subgroup Difference &amp; Exit-Timing Sensitivity:</strong> In the empirical data, 90.5% of post-panel fraud providers stopped billing prior to 2024 (vs. 43.6% of controls), and excluded providers sit at the 38.0th vs. 50.0th median peer percentile of active months (Months Active SHAP correlation r = -0.9009). Reweighting controls to match the fraud exit-year distribution shifts prospective AUC from 0.724 to 0.653, and restricting to the 55,018 providers still billing in 2024 (9 exclusions vs. 55,009 controls) yields an observed AUC of 0.442 (95% CI 0.212-0.664). These descriptive subgroup and reweighting comparisons document how conditioning on active 2024 billing alters the evaluation sample, but do not separately isolate early exit as the sole cause of the 0.442 subgroup score.',
        '<strong>Caseload &amp; Cost:</strong> MFCU unit cost is $23,719 ($395.8M / 16,688 active cases, HHS-OIG FY 2024). Top 1% gives 4,844 × $23,719 = $114.9M and 4,844 / 16,688 = 29.0% of caseload. Top 5% gives 24,295 / 16,688 = 145.6%.',
        '<strong>Data Provenance:</strong> Values come from Mcaid/05_fraud_detection/paper/output/results.json (prospective_auc, active_subset_auc, top1_prec_holdout, top1_prec_pop, top1_flags, top1_captured, top1_lift, top5_*, mfcu_*, shap_months_active_r, matched_sample_rf_auc, entropy_balanced_rf_auc), Mcaid/05_fraud_detection/paper/main.tex (L398-402: 90.5% vs. 43.6% pre-2024 exit, 0.653 exit-year reweighted AUC), output/tables/tab6_economics.tex (N = 487,479, 0.0195%), and output/tables/tab_a3_base_rates.tex (peer percentiles).'
      ]
    },
    synthesis: {
      title: 'Why Limiting a File to "Providers Still Billing" Shifts Every Ratio',
      p1: 'Collider bias was first noted by Joseph Berkson in 1946 in hospital data. A related sample-selection shift appears in health claims when a team keeps only providers still billing in the latest year. In the linked Medicaid file, 90.5% of post-panel excluded billers stopped billing before 2024 (vs. 43.6% of controls), and reweighting controls by exit year shifts AUC from 0.724 to 0.653. In the subset of 55,018 providers still billing in 2024 (9 exclusions), the observed AUC is 0.442 (95% CI 0.212 to 0.664), reflecting both sample selection and the small number of remaining cases.',
      p2: 'Downsampling shifts precision in a similar way. A holdout that keeps all 95 cases and 20% of controls reports 0.922% Top 1% precision. At the full-list base rate of 0.0195%, that same cutoff gives 0.186% precision, or 9 caught cases among 4,844 flags. Rescaling every subset score to the full billing list and checking the 16,688-case national MFCU caseload keeps agencies from sizing audit budgets on a filtered sample.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Calibration on Observed Screening Results):</strong> AUC scores (0.724 full list, 0.653 exit-year reweighted, and 0.442 active-only subgroup), holdout precision, flags, caught cases, lift, and peer percentiles are observed outputs in output/results.json, main.tex (L398-402), output/tables/tab6_economics.tex, and output/tables/tab_a3_base_rates.tex. Rescaling from holdout to full-list precision is a Mode A calibration using Bayes rule. It matches the full-population precision in output/results.json (0.1858%).',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.2307/2526310" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Berkson, J. (1946), "Limitations of the Application of Fourfold Table Analysis to Hospital Data", Biometrics Bulletin, 2(3), 47-53</a>; <a href="https://doi.org/10.1038/s41467-020-19478-2" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Griffith, G. J., et al. (2020), "Collider bias undermines our understanding of COVID-19 disease risk and severity", Nature Communications, 11, 5749</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>; and HHS-OIG Medicaid Fraud Control Unit FY 2024 annual statistics.'
    ],
    faqs: [
      {
        question: 'What is a "collider" in a causal diagram, and how does it differ from a confounder?',
        answer: 'A confounder is a shared CAUSE of both the treatment and the outcome (A &lt;- C -&gt; Y). Analysts control for it to remove bias. A collider is a shared EFFECT of two variables (A -&gt; C &lt;- Y). Filtering or controlling on a collider opens a false link between its causes.'
      },
      {
        question: 'How does the active-only subgroup score compare with the full-list score?',
        answer: 'Across all 487,479 providers, the screen scores 0.724 AUC (95% CI 0.667 to 0.777). Because 90.5% of post-panel excluded providers stopped billing before 2024 (38.0th vs. 50.0th active-months percentile), reweighting controls by exit year shifts AUC to 0.653, and the 2024 active-biller subset (9 exclusions vs. 55,009 controls) shows an observed AUC of 0.442 (95% CI 0.212 to 0.664). That subgroup difference reflects sample restriction and the small 9-case sample rather than isolating a single cause.'
      },
      {
        question: 'How should analysts report precision from a downsampled holdout?',
        answer: 'Rescale it to the full-list base rate. The holdout here keeps every case and 20% of controls. Top 1% precision of 0.922% rescales to 0.186% across the full billing list (0.0195% base rate), or 9 caught cases among 4,844 flags.'
      }
    ],
    related: [
      { slug: 'classifying-causal-mechanisms', title: 'Separating Mediators From Confounders', note: 'Case study providing a decision rule for confounders, mediators, colliders, and instruments' },
      { slug: 'measurement-error-claims', title: 'Directory Counts vs. Active Claims', note: 'Case study reconciling 488,032 Medicaid billing NPIs with federal and California sanction registries' },
      { slug: 'p-hacking-multiple-testing', title: 'Testing Subgroup Drops With Multiple-Group Checks', note: 'Case study on separating real subgroup drops from small-group swings' }
    ]
  },

  // =========================================================================
  // MODULE #29: classifying-causal-mechanisms (Track 4, member)
  // =========================================================================
  {
    slug: 'classifying-causal-mechanisms',
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Confounders, Mediators, Colliders &amp; Instruments (Mode A Synthesis)',
    pageTitle: 'Separating Mediators From Confounders | CAPHE',
    metaDescription: 'Classify confounders, mediators, colliders, and instruments before choosing regression controls, using four separate verified CAPHE datasets as inputs.',
    h1: 'Post-Enrollment Clinic-Visit Controls Remove the Primary Care Pathway From Modeled Hospital Evaluations',
    subtitle: 'Splitting pre-program background factors from care steps on the path in modeled hospital savings checks.',
    endnotes: [
      '<strong>Pre-Program Baseline Confounders vs. Program Mechanisms:</strong> <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS</a> California urban tract panel covers 408 tracts (baseline poverty explains 62.2% of food-need variance). <a href="https://doi.org/10.1377/hlthaff.2019.01568" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi, S., et al. (2020), <em>Health Affairs</em></a> shows 71.7% vs. 57.1% primary care visits (OR = 1.90) and -30% hospital stays.',
      '<strong>Filtered Subsample &amp; Supply-Side Variables:</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> linked to <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a> shows a 0.724 full-list AUC vs. 0.442 AUC in the 2024 active-biller subset (0.653 when exit-year reweighted). The 57-county LHA spending panel finds a -2.38 annual TWFE slope, -4.32 13-year cumulative OLS slope, and -5.31 Long-Difference Lewbel 2SLS slope (first-stage F = 111.20, Hansen J p = 0.2132).',
      '<strong>Methodological Reference on Control Selection:</strong> <a href="https://doi.org/10.1177/00491241221099552" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Cinelli, C., Forney, A., &amp; Pearl, J. (2022), <em>Sociological Methods &amp; Research</em></a>.'
    ],
    policySettingHtml: 'Health teams decide which household and clinic measures to hold constant before scoring a program. Pre-existing conditions like family poverty come before the program starts, whereas scheduled doctor visits happen as part of the care plan. Keeping pre-existing traits separate from active care steps shows the full program impact.',
    answerHtml: 'In California Community Health Worker evaluations, leaving post-start clinic visits open keeps the full <strong>30% drop in hospital stays</strong> tied to a <strong>14.6 point rise in primary care visits (71.7% vs. 57.1%)</strong> [1]. Controlling for post-start clinic visits removes that care path, while restricting a provider test set to <strong>55,018 active 2024 billers</strong> leaves only <strong>9 of 95 excluded providers</strong> (after <strong>90.5%</strong> exited before 2024) [2]. Adjusting only for pre-program traits keeps the full policy impact intact [3].',
    block2: {
      title: 'Two Rulers: Full-Control Model vs. Path-Matched Model',
      contextTag: 'Mode A Synthesis With Observed CAPHE Estimates as Base Inputs',
      ariaLabel: 'Comparison of a full-control regression that controls for the preventive care step and reports only the direct effect versus a path-matched model that reports the total causal effect',
      ruler1: {
        title: 'Ruler 1: Model Controlling for the Care Step',
        stat: 'Reports β_direct Only (Care Path α·γ Held Fixed)',
        ariaLabel: 'Controlling for post-enrollment preventive care visits holds the care pathway fixed, so the coefficient reports only the direct effect; the size of the care share varies by study',
        segments: [
          { cls: 'seg-primary', width: 50, label: 'Direct Part Kept (β_direct)' },
          { cls: 'seg-Housing', width: 50, label: 'Care Path Absorbed by Control (Share Varies)' }
        ],
        desc: 'Adding post-start primary care visits as a control holds the care step fixed. The model then reports only the direct part. It leaves out the gain that runs through the <strong>+14.6 point rise in clinic visits (71.7% vs. 57.1%)</strong>.'
      },
      ruler2: {
        title: 'Ruler 2: Path-Matched Model (Total Effect)',
        stat: 'Reports τ_total = β_direct + α·γ',
        ariaLabel: 'Controlling only for pre-treatment factors such as baseline poverty and leaving preventive care use open recovers the total causal effect, which corresponds to a 30 percent reduction in hospital stays in the CHW evidence base',
        segments: [
          { cls: 'seg-primary', width: 50, label: 'Direct Part (β_direct)' },
          { cls: 'seg-food', width: 50, label: 'Care Path Kept Open (α·γ)' }
        ],
        desc: 'Controlling only for pre-program traits like baseline poverty, and leaving clinic visits open, keeps the <strong>total effect</strong>. In the CHW trials, that total effect is a <strong>30% drop in hospital stays</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Four Variable Roles in Health Policy Data and Models',
      subtitle: 'Each column uses a separate CAPHE dataset to show how variable roles guide model controls.',
      caption: 'Four-column grid showing the source file, causal path, estimate when left out or added as a control, base input, and model rule.',
      cornerLabel: 'Variable Role',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode A Synthesis on Exact Source Statistics):</strong> Each column draws on a separate CAPHE dataset; the four roles are not estimated in one joint regression. Role 1: raw distance β = -0.578 (p &lt; 0.0001); with poverty controlled, distance β = -0.017 (p = 0.827); poverty model R² = 62.2%. Role 2: visit uptake 71.7% vs. 57.1%, OR = 1.90 (TOT). Role 3: full-universe screening AUC = 0.724 (95% CI 0.667-0.777) vs. observed active-only subgroup AUC = 0.442 (95% CI 0.212-0.664; exit-year reweighted AUC = 0.653). Role 4: -5.31 Long-Difference Lewbel 2SLS slope per $10/capita (first-stage F = 111.20; Hansen J p = 0.2132; alongside -2.38 annual TWFE and -4.32 13-year cumulative OLS).',
      columns: [
        { tag: 'Role 1: Confounder', tagHighlight: true, title: 'Baseline County Poverty', subtitle: 'Shared Cause (X <- C -> Y) | N = 408 California urban tracts (ACS); unit: tract' },
        { tag: 'Role 2: Care Step', tagHighlight: true, title: 'Primary Care Visits', subtitle: 'Program Path (X -> M -> Y) | IMPaCT CHW RCTs / CA CHW model (TOT); unit: member' },
        { tag: 'Role 3: Collider', tagHighlight: false, title: 'Active Billing Subset', subtitle: 'Shared Effect (X -> K <- Y) | N = 488,032 Medicaid billing NPIs (55,018 active in 2024); unit: billing NPI' },
        { tag: 'Role 4: Instrument', tagHighlight: false, title: 'Supply-Side Budget Shift', subtitle: 'Stage 1 Shift (Z -> X -> Y) | 57 CA counties, 2003-2016 long-diff; unit: county' }
      ],
      rows: [
        {
          label: 'Source File',
          cells: [
            { val: 'Food access tracts (408 tracts)' },
            { val: 'CHW trial data (TOT rates)' },
            { val: 'Medicaid claims &amp; OIG list' },
            { val: 'County spending panel (57 counties)' }
          ]
        },
        {
          label: 'Causal Path',
          cells: [
            { val: 'Poverty -> Distance &amp; Food Need' },
            { val: 'CHW -> Clinic Visits -> Stays' },
            { val: 'Bans -> Tenure <- Bill Features' },
            { val: 'Shift -> Spending -> Deaths' }
          ]
        },
        {
          label: 'Result When Left Out',
          cells: [
            { val: 'Distance looks helpful (-0.578 slope)' },
            { val: 'Total effect kept (-30% stays)' },
            { val: 'Full list kept: 95 of 95 exclusions' },
            { val: 'Pandemic slope mixes surge aid (+2.47)' }
          ]
        },
        {
          label: 'Result When Added as Control',
          cells: [
            { val: 'Distance: -0.017 flat slope', textColor: 'text-emerald-800' },
            { val: 'Direct part only (path dropped)', textColor: 'text-amber-900' },
            { val: 'Active-only subset: 9 of 95 left', textColor: 'text-rose-800' },
            { val: 'Stage 1 use: -5.31 deaths / 100K', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Observed Base Input',
          highlight: true,
          cells: [
            { val: 'Poverty explains 62.2% of gap', barWidth: 62, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '71.7% vs. 57.1% visits (1.90x)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: 'Active months: 38.0th vs. 50.0th', barWidth: 38, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: 'Long-Diff 2SLS: 5.31 fewer / 100K', barWidth: 98, barColor: '#0041A5', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Model Rule',
          cells: [
            { val: 'ADD as baseline control' },
            { val: 'LEAVE OPEN in total model' },
            { val: 'DO NOT filter or control' },
            { val: 'USE in Stage 1 only' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. Decision Guide: When to Control, Leave Open, or Use Stage 1',
      subtitle: 'Choosing model controls that match each variable\'s role in county health evaluations.',
      caption: 'Decision grid mapping each variable role to its timing, model choice, budget impact, and audit rule.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Confounder: Baseline Poverty', subtitle: 'Food access tract panel, N = 408 California urban census tracts (ACS); unit: tract' },
        { title: 'Care Step: Primary Care Visits', subtitle: 'IMPaCT CHW RCTs / California CHW model (TOT estimates); unit: member' },
        { title: 'Collider: Active Billing Subset', subtitle: 'N = 488,032 Medicaid billing NPIs; 55,018 active in 2024 (9 exclusions); unit: billing NPI' },
        { title: 'Instrument: Supply-Side Shift', subtitle: '57 CA counties, 2003-2023 panel; unit: county-year' }
      ],
      rows: [
        {
          label: 'Timing &amp; Path Check',
          cells: [
            { val: 'Set before the program starts, such as baseline tract poverty (62.2% of food need gap).' },
            { val: 'Changed by the program on the way to health gains, such as CHW clinic visits (+14.6 points).' },
            { val: 'A post-billing status where 90.5% of excluded billers exited before 2024.' },
            { val: 'Shifts county health spending in Stage 1 without a direct link to death rates.' }
          ]
        },
        {
          label: 'Model Choice by Role',
          cells: [
            { val: 'Add baseline poverty as a control so income gaps do not slant store distance slopes.' },
            { val: 'Measure the CHW effect on hospital stays without controlling for post-start clinic visits.' },
            { val: 'Keep the full provider list rather than limiting the test set to 2024 active billers.' },
            { val: 'Put the budget shift in Stage 1 and report first-stage strength in the table notes.' }
          ]
        },
        {
          label: 'Budget Consequence',
          cells: [
            { val: 'Skipping baseline controls can steer food grants toward high-income areas.' },
            { val: 'Controlling for clinic visits removes the care path and understates CHW hospital savings.' },
            { val: 'The 2024 active subset drops 86 of 95 excluded billers and falls below a coin-flip rank.' },
            { val: 'Adding the Stage 1 shift as a control absorbs the clean spending changes.' }
          ]
        },
        {
          label: 'Best-Fit Audit Rule',
          policyFit: true,
          cells: [
            { headline: 'Lock Pre-Program Controls', detail: 'Measure and control for background factors at baseline before enrollment starts.' },
            { headline: 'Report Total Effect First', detail: 'Estimate the total program effect first, then show care-path shares in a second step.' },
            { headline: 'Keep Full List Totals', detail: 'Run full-list checks before looking at active-biller or admitted-patient subsets.' },
            { headline: 'Keep Instruments in Stage 1', detail: 'Use instruments only in Stage 1 and never add them as outcome controls.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Over-Control Math, Collider &amp; Instrument Notes, Data Provenance',
      notesBullets: [
        '<strong>Mediator Over-Control Math:</strong> Suppose treatment X shifts care step M (M = α·X + u) and Y = β_direct·X + γ·M + ε. The total effect of X on Y is τ_total = β_direct + α·γ. Adding M as a control estimates only β_direct. The share removed is α·γ / τ_total. It reaches 100% only when β_direct = 0. The CAPHE CHW inputs (71.7% vs. 57.1%, OR = 1.90; -30% hospital stays) do not split those two pieces.',
        '<strong>Separate Datasets (Mode A Synthesis):</strong> The four columns show roles using four separate CAPHE files. Values are observed base inputs from each file. They are not from one joint regression and should not be compared across columns.',
        '<strong>Subgroup Selection Note:</strong> In the linked Medicaid file, the 55,018 providers still billing in 2024 (9 exclusions vs. 55,009 controls) show an observed screening AUC of 0.442 (95% CI 0.212-0.664), compared with 0.724 (95% CI 0.667-0.777) across all 487,479 providers and 0.653 when exit-year reweighted. Months Active has a SHAP correlation of r = -0.9009, and excluded providers sit at the 38.0th vs. 50.0th median peer percentile of active months, though with 9 active cases the subgroup difference does not isolate early exit as the sole cause.',
        '<strong>Instrument &amp; Unit Note:</strong> Instruments play a different role from controls. In the LHA panel (57 California counties, 2003-2023), long-difference Lewbel (2012) instruments isolate multi-year budget changes from residual endogeneity. The -5.31 deaths/100K per $10/capita Long-Difference 2SLS estimate (2003-2016, first-stage F = 111.20, Hansen J p = 0.2132; and -11.49 in 2003-2019 excl. 5 LGRS outliers, F = 13.09, J p = 0.4726) uses these instruments in Stage 1 of 2SLS rather than as outcome controls.',
        '<strong>Data Provenance:</strong> Inputs come from FoodSecurity/analysis/outputs/regression_results_poverty_distance.csv and regression_model_statistics.csv (R² = 62.2%), METHODOLOGICAL_REVIEW_ARTICLES_5-12.md (disability OR = 1.76), CHWs/08_PhD_Final/DERIVATIONS.md and Kangovi et al. (2020) (71.7% vs. 57.1% TOT, OR = 1.90, -30% hospital stays), Mcaid/05_fraud_detection/paper/output/results.json (prospective_auc = 0.724, active_subset_auc = 0.442, shap_months_active_r; peer ranks in output/tables/tab_a3_base_rates.tex), and public/tools/lha-calculator/methodology.html (-2.38 annual TWFE, -4.32 13-yr cumulative OLS, -5.31 Long-Difference 2SLS, F = 111.20, Hansen J p = 0.2132, 57 counties).'
      ]
    },
    synthesis: {
      title: 'Why Mapping the System Path Comes Before Running the Model',
      p1: 'Adding every health and income variable to a tract regression mixes pre-program income gaps with health steps that sit on the path between food and chronic disease. If a variable is a pre-program confounder (such as poverty explaining 62.2% of tract food-need variance), leaving it out slants the slope. If a variable is a post-start care step, such as a Community Health Worker linking a patient to primary care (raising visits from 57.1% to 71.7%, OR = 1.90) to prevent a hospital stay, controlling for clinic visits subtracts part of the program\'s gain.',
      p2: 'Before running a model, health economists map each variable in a causal diagram. Confounders are shared causes measured before treatment, so analysts control for them. Care steps sit on the causal path, so analysts leave them open when measuring total impact. Colliders and post-outcome filters like active 2024 billing alter the evaluation sample (where the 2024 active subset shows an observed 0.442 AUC vs. 0.724 on the full list), so analysts avoid filtering on them. Instruments shift treatment with no direct link to the outcome, so analysts use them in Stage 1 (as the LHA long-difference 2SLS model does with F = 111.20).'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Synthesis on Observed Inputs):</strong> The role rules and model guide are a Mode A synthesis. The numbers in Table 1 (tract poverty R² = 62.2%; CHW primary care visits 71.7% vs. 57.1% TOT, OR = 1.90, and -30% hospital stays; Medicaid screening AUC = 0.724 full list vs. observed AUC = 0.442 in the 2024 active subset; LHA Long-Difference 2SLS -5.31, first-stage F = 111.20, Hansen J p = 0.2132) are observed outputs from four separate CAPHE files.',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.1177/00491241221099552" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Cinelli, C., Forney, A., &amp; Pearl, J. (2022), "A Crash Course in Good and Bad Controls", Sociological Methods &amp; Research</a>; <a href="https://doi.org/10.1377/hlthaff.2019.01568" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi, S., et al. (2020), Health Affairs (IMPaCT CHW RCTs)</a>; <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES</a>; <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS</a>; <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a>; and <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a>.'
    ],
    faqs: [
      {
        question: 'Why shouldn\'t an analyst control for post-start clinic visits when measuring whether CHWs cut hospital stays?',
        answer: 'Raising primary care visits (from 57.1% to 71.7% TOT, OR = 1.90) is a main care step through which CHWs prevent hospital stays (-30%). Controlling for post-start clinic visits holds that step fixed. That blocks part of the program path and understates total CHW value.'
      },
      {
        question: 'How can an analyst tell whether a variable is a confounder or a care step?',
        answer: 'Check the clock and the direction of cause. A confounder is set BEFORE the program starts (like baseline age, pre-program poverty, or county land area) and affects both participation and health. A care step changes AFTER the program starts because of the program.'
      },
      {
        question: 'What is an instrument, and why is it kept out of the outcome controls?',
        answer: 'An instrument shifts the policy input (here, county public health spending) without a direct path to the health outcome. It enters Stage 1 of two-stage least squares to isolate spending shifts that are not driven by mortality shocks. In the LHA long-difference model of 57 California counties (2003-2016), the Lewbel instruments have a first-stage F of 111.20 and Hansen J p-value of 0.2132. Adding an instrument as an outcome control would absorb the clean spending variation.'
      }
    ],
    related: [
      { slug: 'collider-bias', title: 'Active-Only Subsample Selection Bias', note: 'Case study on conditioning on active billers or admissions and rescaling precision to population base rates' },
      { slug: 'reverse-causation-feedback', title: 'Needs-Driven Spending & Prevention ROI', note: 'Case study separating reverse causation from preventive health returns' },
      { slug: 'chw-health-outcomes', title: 'Evaluating CHW Impact & Medi-Cal Billing', note: 'Flagship case study on 58-county California CHW clinical and fiscal outcomes' }
    ]
  },

  // =========================================================================
  // MODULE #30: sensitivity-analysis-cea (Track 4, member)
  // =========================================================================
  {
    slug: 'sensitivity-analysis-cea',
    tetsCompanion: [
      {
        visibleLabel: 'Public Health Spending Regime Analysis',
        title: 'Public Health Spending: When Emergency Aid Flips the Sign',
        url: 'https://tooearlytosay.com/research/health-policy/public-health-spending-regime-shifts/',
        claimCovered: 'Across 57 California counties from 2003 to 2023 (1,163 county-years), each dollar per capita corresponds to -0.238 fewer deaths per 100,000 in 2003 to 2019 versus +0.247 in 2020 to 2023.'
      },
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,039 census tracts, a flat $31.74 Medi-Cal fee schedule covers 3.2% to 8.9% of modeled field community health worker costs.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; VSL Tiers &amp; Parameter Uncertainty (Mode A Scenario Grid)',
    pageTitle: 'Sensitivity Analysis in Funding Choices | CAPHE',
    metaDescription: 'Test California\'s county public health benefit-cost ratio across HHS 2025 VSL tiers ($6.3M-$20.7M, 15:1 to 89:1 return) and CHW cost-capture cases.',
    h1: 'Modeled County Public Health Prevention Clears Cost-Neutral Thresholds Across All Federal Valuation Standards',
    subtitle: 'Testing modeled returns across low, middle, and high federal life value tiers. Checking both point estimates and lower bounds.',
    endnotes: [
      '<strong>Federal Value of a Statistical Life (VSL) Tiers (2025):</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 Guidelines for Regulatory Impact Analysis</a> ($6.3M Low, $13.6M Central, and $20.7M High VSL tiers; <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EPA VSL</a> benchmark $11.2M = 26.7:1 annual and 48.4:1 cumulative).',
      '<strong>California County Public Health Mortality Reduction, Bounds &amp; Exposure Horizons:</strong> <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology (Cholette et al., 2026)</a> evaluates both the annual pre-pandemic TWFE slope of -2.38 deaths/100K per $10/capita (95% CI -3.91 to -0.85; $420,168 per life saved, 15.0:1 to 49.3:1 across HHS tiers, and 5.4:1 at the joint lower bound) and the 13-year cumulative long-difference slope of -4.32 deaths/100K per $10/capita (95% CI -7.34 to -1.30; $231,481 per life saved, 27.2:1 to 89.4:1 across HHS tiers, and 8.2:1 at the joint lower bound).',
      '<strong>California CHW Cost-Capture Scenarios:</strong> <a href="https://www.dhcs.ca.gov/formsandpubs/laws/Pages/CalAIM-SPA.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a> fee-for-service reimbursement (6.5% to 9.8% wage capture) vs. inpatient/emergency cost offsets ($285,900/yr vs. $98,469/yr wage) and net cost per healthy year gained ($7,771/QALY at +8.18 QALYs over 2 years).'
    ],
    policySettingHtml: 'County boards and budget officers ask whether a public health program still pays off under cautious assumptions. Federal agencies publish low, middle, and high dollar values for each saved life alongside different hospital savings rules. Checking program returns across all of those cases shows which funding choices stay above breakeven.',
    answerHtml: 'Across all <strong>three federal tiers ($6.3M, $13.6M, and $20.7M per life)</strong>, California county public health spending yields a modeled <strong>15.0:1 to 49.3:1</strong> annual return at <strong>-2.38 deaths per 100,000</strong> and a <strong>27.2:1 to 89.4:1</strong> cumulative return at <strong>-4.32 deaths per 100,000</strong> [1,2]. Using one middle number (<strong>32.4:1 annual or 58.8:1 cumulative at $13.6M</strong>) leaves a plan open to debate over one input [2]. Showing that the lowest joint bound still yields <strong>5.4:1 annually</strong> (<strong>8.2:1 cumulatively</strong>) confirms that the spending pays off under every federal rule [3].',
    block2: {
      title: 'Two Valuation Rulers: Single Central Point Estimate vs. HHS VSL Range',
      contextTag: 'Mode A Scenario Grid Built on Observed Effect Estimates and Published HHS 2025 VSL Tiers',
      ariaLabel: 'Comparison of a single central point estimate of 32.4 to 1 annual and 58.8 to 1 cumulative at the $13.6M HHS central VSL versus the HHS VSL range of $6.3M to $20.7M',
      ruler1: {
        title: 'Ruler 1: Single Central Point Estimate ($13.6M VSL)',
        stat: '32.4 : 1 (Annual) | 58.8 : 1 (13-Yr Cumulative)',
        ariaLabel: 'At the point estimate of -2.38 annual and -4.32 cumulative deaths per 100,000, cost per statistical life is $420,168 annually or $231,481 cumulatively, yielding a 32.4 to 1 or 58.8 to 1 benefit-cost ratio at the $13.6M HHS central VSL',
        segments: [
          { cls: 'seg-primary', width: 66, label: 'Central: -2.38 Yr (32.4:1) & -4.32 Cumul. (58.8:1) at $13.6M' },
          { cls: 'seg-rest', width: 34, label: 'Range Not Shown' }
        ],
        desc: 'Holding the effect at <strong>-2.38 deaths/100K annually ($420,168 per life)</strong> or <strong>-4.32 cumulatively ($231,481 per life)</strong> and using the HHS central <strong>$13.6M</strong> gives one number: <strong>32.4:1</strong> (or <strong>58.8:1</strong>). Debate over one value input can then stall the budget choice.'
      },
      ruler2: {
        title: 'Ruler 2: HHS VSL Range ($6.3M-$20.7M Across Annual &amp; Cumulative Horizons)',
        stat: '15.0:1 to 49.3:1 (Yr) | 27.2:1 to 89.4:1 (13-Yr)',
        ariaLabel: 'Across HHS 2025 VSL tiers, the annual benefit-cost ratio spans 15.0 to 1 through 49.3 to 1 and the 13-year cumulative ratio spans 27.2 to 1 through 89.4 to 1',
        segments: [
          { cls: 'seg-gross', width: 30, label: 'Low $6.3M: 15.0:1 / 27.2:1' },
          { cls: 'seg-primary', width: 36, label: 'Central $13.6M: 32.4:1 / 58.8:1' },
          { cls: 'seg-food', width: 34, label: 'High $20.7M: 49.3:1 / 89.4:1' }
        ],
        desc: 'Varying the HHS 2025 VSL tier moves the annual ratio from <strong>15.0:1 ($6.3M Low)</strong> through <strong>32.4:1 ($13.6M Central)</strong> to <strong>49.3:1 ($20.7M High)</strong> (and <strong>27.2:1 to 89.4:1</strong> over 13-year cumulative horizons). Every tier stays far above the <strong>1.0:1 cost-neutral line</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Four Value and Cost Recovery Cases Across HHS 2025 Tiers',
      subtitle: 'Unit A rows value county spending across annual and 13-year cumulative horizons. Unit B rows show CHW cost recovery per worker.',
      caption: 'Four-column grid comparing the Joint Floor, Low VSL, Central VSL, and High VSL cases for county spending, with CHW cost recovery shown in separate rows.',
      cornerLabel: 'Case Input',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode A Scenario Grid on Mode B Inputs &amp; Exposure Horizons):</strong> Unit A and Unit B are never multiplied or summed. In Unit A, the annual pre-pandemic TWFE OLS slope is -2.38 deaths per 100,000 per $10/capita (SE = 0.78, 95% CI -3.91 to -0.85; cost per life = $10 × 100,000 / |β_10| = $420,168 at -2.38 and $1,176,471 at the -0.85 lower 95% CI bound), yielding 5.4:1 at the joint floor and 15.0:1 to 49.3:1 across HHS tiers. Over the 13-year cumulative long-difference horizon (-4.32 per 100,000 per $10/capita, SE = 1.54, 95% CI -7.34 to -1.30), cost per life is $231,481 at -4.32 ($769,231 at the -1.30 lower bound), yielding 8.2:1 at the joint floor and 27.2:1 to 89.4:1 across HHS tiers.',
      columns: [
        { tag: 'Case 1: Joint Floor', tagHighlight: true, title: 'Low Effect Bound + Low Life Value', subtitle: 'Societal &amp; Clinic | -0.85 Yr / -1.30 Cumul &amp; $6.3M | CHW FFS, 213 Units' },
        { tag: 'Case 2: Conservative', tagHighlight: false, title: 'Main Effect + Low Life Value', subtitle: 'Societal &amp; Clinic | -2.38 Yr / -4.32 Cumul &amp; $6.3M | CHW FFS, 320 Units' },
        { tag: 'Case 3: Central', tagHighlight: true, title: 'Main Effect + Middle Life Value', subtitle: 'Societal &amp; Plan | -2.38 Yr / -4.32 Cumul &amp; $13.6M | CHW Plan Offsets' },
        { tag: 'Case 4: Upper Tier', tagHighlight: false, title: 'Main Effect + High Life Value', subtitle: 'Societal &amp; System | -2.38 Yr / -4.32 Cumul &amp; $20.7M | CHW System Offsets' }
      ],
      rows: [
        {
          label: 'Deaths Averted per 100,000',
          cells: [
            { val: '0.85 yr | 1.30 cumul fewer (low CI)' },
            { val: '2.38 yr | 4.32 cumul fewer (main)' },
            { val: '2.38 yr | 4.32 cumul fewer (main)' },
            { val: '2.38 yr | 4.32 cumul fewer (main)' }
          ]
        },
        {
          label: 'Assumed Federal Life Value Tier (Model Input)',
          cells: [
            { val: '$6.3M (HHS Low)' },
            { val: '$6.3M (HHS Low)' },
            { val: '$13.6M (HHS Central)' },
            { val: '$20.7M (HHS High)' }
          ]
        },
        {
          label: 'Cost per Life (Annual | 13-Yr)',
          modeled: true,
          cells: [
            { val: '$1,176,471 (Yr) | $769,231 (13-Yr)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr)' },
            { val: '$420,168 (Yr) | $231,481 (13-Yr)' }
          ]
        },
        {
          label: 'Return per $1 Spent (Annual | 13-Yr)',
          modeled: true,
          highlight: true,
          cells: [
            { val: '5.4:1 (Yr) | 8.2:1 (13-Yr)', barWidth: 9, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '15.0:1 (Yr) | 27.2:1 (13-Yr)', barWidth: 30, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '32.4:1 (Yr) | 58.8:1 (13-Yr)', barWidth: 66, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '49.3:1 (Yr) | 89.4:1 (13-Yr)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Statewide 57-County Value ($10 Scale)',
          modeled: true,
          cells: [
            { val: '332 yr | 507 cumul lives ($2.1B-$3.2B)' },
            { val: '928 yr | 1,685 cumul lives ($5.8B-$10.6B)' },
            { val: '928 yr | 1,685 cumul lives ($12.6B-$22.9B)' },
            { val: '928 yr | 1,685 cumul lives ($19.2B-$34.9B)' }
          ]
        },
        {
          label: 'Assumed CHW Billing &amp; Offset Case (Model Input)',
          modeled: true,
          cells: [
            { val: '$6,775 (visit bills, 213 units)' },
            { val: '$10,162 (visit bills, 320 units)' },
            { val: '$107,006 (Medi-Cal plan offsets)' },
            { val: '$291,171 (system hospital offsets)' }
          ]
        },
        {
          label: 'CHW Cost Recovery Ratio',
          modeled: true,
          cells: [
            { val: '0.07 : 1 (6.5% of cost)' },
            { val: '0.10 : 1 (9.8% of cost)' },
            { val: '1.03 : 1 (103.2% of cost)' },
            { val: '2.81 : 1 (280.7% of cost)' }
          ]
        }
      ]
    },
    table2: {
      title: 'Table 2. How Sensitivity Analysis Turns Input Debates into Funding Choices',
      subtitle: 'Showing which inputs change the return, and which keep it above 1.0:1, focuses budget talks.',
      caption: 'Decision grid showing the question each case answers, distance from the 1.0:1 line, multi-way checks, and budget steps.',
      cornerLabel: 'Choice Factor',
      colHeaders: [
        { title: 'Case 1: Joint Floor', subtitle: 'Unit A: 57-county LHA spending (-0.85 yr / -1.30 cumul, $6.3M life value); Unit B: one CHW FTE/year, $103,719 statewide cost (FFS, 213 units)' },
        { title: 'Case 2: Low Life Value', subtitle: 'Unit A: 57-county LHA spending (-2.38 yr / -4.32 cumul, $6.3M life value); Unit B: one CHW FTE/year, $103,719 statewide cost (FFS, 320 units)' },
        { title: 'Case 3: Middle Life Value', subtitle: 'Unit A: 57-county LHA spending (-2.38 yr / -4.32 cumul, $13.6M life value); Unit B: one CHW FTE/year, $103,719 statewide cost (payer offsets)' },
        { title: 'Case 4: High Life Value', subtitle: 'Unit A: 57-county LHA spending (-2.38 yr / -4.32 cumul, $20.7M life value); Unit B: one CHW FTE/year, $103,719 statewide cost (societal offsets)' }
      ],
      rows: [
        {
          label: 'Where the Return Shows Up',
          cells: [
            { val: 'Communities gain saved lives at the $6.3M floor while clinics recover 6.5% via FFS.' },
            { val: 'Communities gain saved lives at the $6.3M life-value tier while clinics recover 9.8% via FFS.' },
            { val: 'Communities gain saved lives at the $13.6M life-value tier while Medi-Cal plans recover 103.2% of CHW pay.' },
            { val: 'Communities gain saved lives at the $20.7M life-value tier while hospital systems save 280.7% of CHW pay.' }
          ]
        },
        {
          label: 'Which Question This Case Answers',
          cells: [
            { val: 'Tests the low effect bound at the $6.3M life-value tier and 213 CHW visit units.' },
            { val: 'Tests the main effect at the $6.3M life-value tier and 320 CHW visit units.' },
            { val: 'Tests the annual and 13-yr effects at the $13.6M life-value tier with plan offsets.' },
            { val: 'Tests the $20.7M high life-value tier alongside full system hospital savings.' }
          ]
        },
        {
          label: 'Distance From the 1.0:1 Line',
          cells: [
            { val: 'County spending returns 5.4:1 annually (8.2:1 cumulatively), while CHW visit billing covers 6.5% of pay.' },
            { val: 'County spending returns 15.0:1 annually (27.2:1 cumulatively), while CHW visit billing covers 9.8% of pay.' },
            { val: 'County spending returns 32.4:1 annually (58.8:1 cumulatively), and CHW plan offsets return 1.03:1.' },
            { val: 'County spending returns 49.3:1 annually (89.4:1 cumulatively), and CHW hospital savings return 2.81:1.' }
          ]
        },
        {
          label: 'Why Multi-Way Checks Help Here',
          cells: [
            { val: 'Varying the effect and life-value tier together still clears the 1.0:1 line by 5.4 to 1 annually and 8.2 to 1 cumulatively.' },
            { val: 'Varying the life-value tier alone spans 15.0:1 to 49.3:1 annually (27.2:1 to 89.4:1 cumulatively).' },
            { val: 'Matching both HHS $13.6M and EPA $11.2M rules fits federal grant forms.' },
            { val: 'Keeping Unit A and Unit B apart avoids mixing per-worker and per-resident scales.' }
          ]
        },
        {
          label: 'Best-Fit Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'Lead With the Joint Floor', detail: 'Grant the lowest life-value tier and lower effect bound together to show a 5.4:1 annual (8.2:1 cumulative) return.' },
            { headline: 'Show the Full HHS Range', detail: 'Pair the 32.4:1 annual (58.8:1 cumulative) central ratio with the full HHS life-value range.' },
            { headline: 'Use Central HHS Tier as Base', detail: 'Anchor county benefit-cost memos in the $13.6M HHS Central tier at 32.4:1 annual and 58.8:1 cumulative.' },
            { headline: 'Split Cash Capture From Health Value', detail: 'Report CHW visit billing and plan savings apart from saved-life values.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Scenario Inputs, Benefit-Cost Formula, Exposure Horizons &amp; Fencing',
      notesBullets: [
        '<strong>Inputs (Observed and Published):</strong> Mode B empirical coefficients (-2.38 annual TWFE per $10/capita, SE = 0.78, 95% CI [-3.91, -0.85]; -4.32 13-year cumulative long-difference OLS per $10/capita, SE = 1.54, 95% CI [-7.34, -1.30]; -5.31 Long-Difference Lewbel 2SLS) from src/frontend/js/lha-calculator.js, public/tools/lha-calculator/methodology.html, and Value_of_Public_Health/paper/ajph_submission.tex. Published HHS 2025 VSL schedule ($6.3M / $13.6M / $20.7M) and EPA VSL ($11.2M). CHW cost-capture inputs ($103,719 statewide loaded FTE cost; $6,775 to $10,162 direct FFS billing at 213 to 320 units under DHCS SPA 22-0001; $107,006 Medi-Cal payer offsets; $291,171 societal hospital offsets) from the CHW case study (scripts/build_wave2_flagships.js) and CHWs/08_PhD_Final/DERIVATIONS.md.',
        '<strong>Benefit-Cost Formula &amp; Exposure Horizons (Mode A Scenario Grid, Unit A):</strong> On the LHA Calculator $10/capita scale (src/frontend/js/lha-calculator.js: coefficientPer10 = -2.38 annual, cumulativeCoefficientPer10 = -4.32), BCR(β_10, VSL) = (|β_10| / 100,000) × VSL / $10. Annual central case (|β_10| = 2.38, VSL = $13.6M): BCR = 0.0000238 × $13,600,000 / $10 = 32.4 (joint floor at |β_10| = 0.85, VSL = $6.3M: 5.4; cost-neutral |β_10*| at $13.6M = 0.0735 deaths/100K per $10/capita). Over the 13-year cumulative horizon (|β_10| = 4.32), cost per life is $231,481 and BCR spans 8.2:1 (joint floor at |β_10| = 1.30, $6.3M VSL), 27.2:1 ($6.3M Low), 58.8:1 ($13.6M Central), and 89.4:1 ($20.7M High).',
        '<strong>Unit-of-Analysis Fencing:</strong> Unit A rows value county public health mortality reductions with VSL. Unit B rows describe one CHW FTE per year and use cash or resource offsets with no VSL. CHW scenarios are placed in columns by conservatism order only; they are not linked to the VSL tier in the same column.'
      ]
    },
    synthesis: {
      title: 'Why the Goal of Sensitivity Analysis Is Decision Robustness, Not Parameter Perfection',
      p1: 'County fiscal reviews test whether a public health investment remains cost-effective across conservative and upper-bound federal valuation tiers: should the analysis use the U.S. EPA $11.2M Value of a Statistical Life, the HHS $13.6M central benchmark, or the $6.3M HHS low tier? When an analyst presents only a single point estimate (32.4:1 annual or 58.8:1 cumulative), any disagreement over one input casts doubt on the entire recommendation.',
      p2: 'Sensitivity analysis reframes the conversation around which assumptions change the decision. Across the HHS 2025 VSL range, county public health spending returns 15.0:1 to 49.3:1 annually and 27.2:1 to 89.4:1 over 13-year cumulative horizons, and the joint floor (lower confidence bound at $6.3M) still returns 5.4:1 annually and 8.2:1 cumulatively, so the funding verdict does not depend on the VSL tier or exposure horizon. CHW cost capture behaves differently: direct FFS billing recovers 6.5% to 9.8% of a $103,719 position and payer offsets recover 103%, so for CHW programs the financing perspective, not the valuation tier, determines whether the budget closes.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Scenario Grid on Observed and Published Inputs):</strong> The cross-multiplied scenario cells in Table 1 (5.4:1 to 49.3:1 annual, 8.2:1 to 89.4:1 13-year cumulative, model-implied statewide valuations across 39M California residents, and CHW recovery ratios 0.07:1 to 2.81:1) are Mode A sensitivity calculations. Their inputs are observed econometric estimates (-2.38 annual TWFE, 95% CI [-3.91, -0.85]; -4.32 13-year cumulative OLS, 95% CI [-7.34, -1.30]), published HHS 2025 VSL schedules ($6.3M / $13.6M / $20.7M), the EPA VSL ($11.2M), and calibrated CHW cost and offset values from the CHW case study.',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL Schedule: $6.3M Low, $13.6M Central, $20.7M High)</a>; <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA Mortality Risk Valuation ($11.2M VSL)</a>; <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders, G. D., et al. (2016), "Recommendations for Conduct, Methodological Practices, and Reporting of Cost-effectiveness Analyses: Second Panel on Cost-Effectiveness in Health and Medicine", JAMA, 316(10), 1093-1103</a>; <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS Medi-Cal CHW Benefit (SPA 22-0001)</a>; and <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a>.'
    ],
    faqs: [
      {
        question: 'What is the difference between one-way and multi-way sensitivity analysis?',
        answer: 'One-way sensitivity analysis varies a single parameter at a time while holding all other inputs at their central values (for example, varying VSL from $6.3M to $20.7M at the -2.38 annual effect size, yielding 15.0:1 to 49.3:1, or 27.2:1 to 89.4:1 at the -4.32 cumulative effect size). Multi-way sensitivity analysis varies two or more uncertain parameters together (such as combining the $6.3M Low VSL with the -0.85 annual or -1.30 cumulative lower 95% confidence bound to test a 5.4:1 to 8.2:1 conservative joint floor).'
      },
      {
        question: 'What is a "cost-neutral threshold analysis" in cost-benefit modeling?',
        answer: 'Cost-neutral analysis asks how small the program effect would have to be for benefits to just equal costs (BCR = 1.0:1). At the $13.6M HHS Central VSL, a $10/capita investment reaches cost neutrality if it averts 0.0735 deaths per 100,000 residents, meaning the observed -2.38 annual effect is 32 times larger (and the -4.32 cumulative effect is 59 times larger) than the cost-neutral minimum.'
      },
      {
        question: 'Why are CHW cost-capture scenarios reported in separate rows from VSL-based returns?',
        answer: 'The two measure different units. VSL-based returns value mortality reductions from county public health spending, while CHW cost capture compares cash or resource offsets with the $103,719 annual cost of one California CHW position. Direct FFS billing recovers 6.5% to 9.8% of that cost and Medi-Cal payer offsets recover about 103%, so the CHW financing question depends on who captures the savings rather than on the VSL tier.'
      }
    ],
    related: [
      { slug: 'cost-effectiveness-ratio', title: 'ICERs, NMB & 1,000-Draw Monte Carlo PSA', note: 'Case study on probabilistic sensitivity analysis and willingness-to-pay thresholds' },
      { slug: 'measuring-health-common-unit', title: 'Measuring Health in QALYs & VSL Tiers', note: 'Case study explaining how HHS 2025 VSL tiers and QALY weights are constructed' },
      { slug: 'chw-health-outcomes', title: 'Evaluating CHW Impact & Medi-Cal Billing', note: 'Case study on CHW direct billing, payer offsets, and societal hospital savings' }
    ]
  }
];

for (const spec of modules) {
  renderModuleHtml(spec);
}

console.log('Wave 4B (5 Modules in Track 4) rendered successfully.');
