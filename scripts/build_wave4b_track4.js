#!/usr/bin/env node
'use strict';

/**
 * Wave 4B Builder: Track 4 System Dynamics & Feedback (5 Remaining Modules: #25, #26, #27, #29, #30)
 * Note: Module #28 (food-insecurity-diabetes) was completed in Wave 2.
 *
 * Modules built:
 *  - #25 reverse-causation-feedback (Track 4, public, Mode B) — Simultaneous OLS +0.18 vs. instrumental variables isolation across pre-pandemic (-4.56), small-county (-8.11), and full-panel (-9.16) samples
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
        claimCovered: 'From 1992 to 2019 across 3,142 US counties, each 10 dollars per capita reduces Years of Potential Life Lost by 0.78 per 100,000 residents, versus +1.52 from 2020 to 2022.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; Needs-Driven Spending &amp; Simultaneity (Mode B Panel)',
    pageTitle: 'Needs-Driven Spending & Prevention ROI | CAPHE',
    metaDescription: 'Needs-driven health spending pulls simple OLS to +0.18 deaths/100K; IV isolates -4.56 to -9.16 deaths/100K across 57 California counties (2003-2023).',
    h1: 'Same-Year County Spending Averages Combine Routine Prevention Budgets With Outbreak Emergency Funds',
    subtitle: 'Splitting emergency outbreak fund surges from steady base prevention budgets across county years.',
    endnotes: [
      '<strong>California County Public Health Spending Panel (2003-2023):</strong> <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a> linked to <a href="https://wonder.cdc.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC WONDER</a> death records across 57 counties. N = 1,197 county-years (N = 969 in the 2003-2019 pre-pandemic window; N = 684 in the 3-lag distributed lag check).',
      '<strong>Needs-Driven Feedback vs. Routine Budget Isolation:</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), <em>Journal of Business &amp; Economic Statistics</em>, 30(1), 67-80</a> provides the variance-based IV framework. The CAPHE California 57-county LHA panel (2003-2023) finds a -9.16 deaths/100K IV coefficient (first-stage F = 314.1), -4.56 in 2003-2019, and -8.11 in small counties, versus +0.18 in same-year OLS (p = 0.644) and +1.58 on a 2-year spending lag (p = 0.001). Across CAPHE source files, Tables 1-5 of the working paper label these slopes per $1/capita ($10,919/life, 1,246:1 BCR), while Section 4.4 of the paper and the LHA Calculator standardize -9.16 on Brown (2014)\'s $10/capita scale (-0.916 per $1/capita; $109,170/life, 125:1 BCR).',
      '<strong>Independent Governance Check &amp; Valuation:</strong> <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), <em>Economics &amp; Human Biology</em>, 13, 34-45</a> finds -9.10 deaths/100K per $10/capita (-0.91 per $1/capita). <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 VSL Guidelines</a> sets a $13.6M central value.'
    ],
    answerHtml: `When a county board audits public health spending and death rates in the same year, the review mixes steady base prevention with emergency funds added after past spikes. Across <strong>1,197 California county-years</strong> (2003 to 2023), routine-budget models isolate a <strong>-9.16 deaths per 100,000</strong> slope, equal to <strong>$109,170 per life saved</strong> on the LHA calculator's $10-per-resident scale (or <strong>$10,919</strong> on the working paper's $1 table scale) [1,2]. Same-year averages show a flat <strong>+0.18 slope</strong> because counties raise budgets after death spikes, with a <strong>+1.58 two-year lag slope</strong> [2]. Checking the <strong>-4.56</strong> calm-year floor and the <strong>-9.16</strong> full-panel slope protects multi-year grants from early cuts [3].`,
    block2: {
      title: 'Two Rulers: Same-Year OLS Slope vs. Routine-Budget Model',
      contextTag: 'Mode B Panel (57 Counties, 1,197 County-Years, 2003 to 2023)',
      ariaLabel: 'Comparison of the same-year OLS slope of +0.18 deaths per 100,000 versus the routine-budget IV estimate of -9.16 deaths per 100,000, a 9.34-point arithmetic gap between the two estimators',
      ruler1: {
        title: 'Ruler 1: Same-Year OLS Slope (Spending and Deaths Move Together)',
        stat: '+0.18 Deaths / 100K (9.34-Point Gap vs. IV)',
        ariaLabel: 'Same-year OLS slope is +0.18 deaths per 100,000, a range that crosses zero, sitting 9.34 points above the -9.16 IV slope because reactive spending and confounding mix with prevention',
        segments: [
          { cls: 'seg-Housing', width: 92, label: '9.34-Point Estimator Gap (+0.18 OLS vs. -9.16 IV)' },
          { cls: 'seg-rest', width: 8, label: '+0.18 OLS' }
        ],
        desc: 'When death rates rise, counties add funds over the next budget cycle. The raw OLS slope is <strong>+0.18 (crosses zero)</strong>, sitting <strong>9.34 points above the -9.16 IV slope</strong> due to combined feedback and confounding.'
      },
      ruler2: {
        title: 'Ruler 2: Routine-Budget Model (Budget Shifts Apart From Local Need)',
        stat: '-9.16 Deaths / 100K (Range -11.34 to -6.98)',
        ariaLabel: 'Routine-budget isolation yields -9.16 deaths per 100,000, with a range of -11.34 to -6.98, equal to $109,170 per life saved on the $10 calculator scale or $10,919 on the $1 table scale',
        segments: [
          { cls: 'seg-primary', width: 70, label: 'Routine-Budget Effect: -9.16 Deaths / 100K' },
          { cls: 'seg-food', width: 30, label: '$109,170 / Life ($10 Scale)' }
        ],
        desc: 'Tracking budget shifts apart from local death spikes isolates <strong>-9.16 deaths/100K (range -11.34 to -6.98)</strong>. That equals <strong>$109,170 per life saved</strong> on the LHA calculator $10 scale (or <strong>$10,919</strong> on the paper\'s $1 table scale).'
      }
    },
    table1: {
      title: 'Table 1. Splitting Outbreak Feedback From the Routine-Budget Effect',
      subtitle: 'Comparing same-year OLS against pre-pandemic, small-county, and full-panel routine-budget estimates.',
      caption: 'Comparison of same-year OLS, 2003 to 2019 pre-pandemic IV, small-county IV, and full 21-year IV results under both the $10 calculator scale and $1 regression table scale.',
      cornerLabel: 'Budget Measure',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode B Panel Estimates; Mode A Valuations &amp; Unit Reconciliation):</strong> Same-year OLS is +0.184 deaths per 100,000 (SE = 0.399, p = 0.644, N = 1,197). Pre-pandemic 2003-2019 IV is -4.56 (p &lt; 0.01, N = 969). Small-county IV is -8.11 (p &lt; 0.05). Full 2003-2023 IV is -9.158 (SE = 1.108, 95% CI -11.34 to -6.98; first-stage F = 314.1, N = 1,197). The 9.34-point difference between +0.18 and -9.16 is the arithmetic gap between the two estimators. Across source files, Tables 1-5 of Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex report the regressor per $1/capita (implying -91.58 per $10/capita, $10,919 per life saved, and 1,246:1 BCR at $13.6M VSL), whereas Section 4.4 of the same paper (3,572 lives across 39M residents for a $10/capita [$390M] outlay = $109,000/life, 125:1 BCR) and the CAPHE LHA Calculator (src/frontend/js/lha-calculator.js: coefficientPer10 = -9.16, coefficient = -0.916 per $1) standardize the -9.16 slope per $10/capita to match Brown (2014). Both scales are shown above.',
      columns: [
        { tag: 'Same-Year OLS', tagHighlight: false, title: 'Same-Year Average', subtitle: 'Pooled OLS 2003-2023, N = 1,197 (Mode B)' },
        { tag: 'Calm-Era IV', tagHighlight: true, title: 'Pre-Pandemic Baseline', subtitle: '2003-2019 Subsample, N = 969 (Mode B)' },
        { tag: 'Small-County IV', tagHighlight: false, title: 'Small-County Subsample', subtitle: 'Rural &amp; Small Counties 2003-2023 (Mode B)' },
        { tag: 'Full-Panel IV', tagHighlight: true, title: 'Full Routine-Budget Effect', subtitle: '57 Counties 2003-2023, N = 1,197 (Mode B)' }
      ],
      rows: [
        {
          label: 'Panel Sample &amp; Method',
          cells: [
            { val: 'Pooled OLS (N = 1,197)' },
            { val: 'Pre-COVID IV (N = 969)' },
            { val: 'Small-county IV subsample' },
            { val: 'Full 21-year IV (N = 1,197)' }
          ]
        },
        {
          label: 'Active Path in Model',
          cells: [
            { val: 'Two-Way (Deaths <-> Budget)' },
            { val: 'Routine Budget -> Calm-Era Health' },
            { val: 'Routine Budget -> Small-County Health' },
            { val: 'Routine Budget -> Full-Panel Health' }
          ]
        },
        {
          label: 'Outbreak Surge Handling',
          cells: [
            { val: 'Unadjusted (+1.58 at 2-yr lag)' },
            { val: 'Omits 2020-2023 pandemic years' },
            { val: 'Variance IV in small counties' },
            { val: 'Variance IV (46 of 47 checks)' }
          ]
        },
        {
          label: 'Deaths Averted per 100,000',
          highlight: true,
          cells: [
            { val: '+0.18 (Crosses Zero)', barWidth: 2, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: '-4.56 deaths / 100K (2003-19)', barWidth: 50, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '-8.11 deaths / 100K (small)', barWidth: 89, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '-9.16 deaths / 100K (full)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Cost per Life ($10 Calc | $1 Table)',
          cells: [
            { val: 'Not defined (positive slope)' },
            { val: '$219,298 ($10) | $21,930 ($1)' },
            { val: '$123,305 ($10) | $12,330 ($1)' },
            { val: '$109,170 ($10) | $10,919 ($1)' }
          ]
        },
        {
          label: 'BCR at $13.6M ($10 Calc | $1 Table)',
          cells: [
            { val: 'Reads as 0:1 (flat)' },
            { val: '62.0:1 ($10) | 620:1 ($1)' },
            { val: '110.3:1 ($10) | 1,103:1 ($1)' },
            { val: '124.6:1 ($10) | 1,246:1 ($1)' }
          ]
        },
        {
          label: 'Implied Value at 1.94M Pop ($10 Scale)',
          cells: [
            { val: 'Reads as +3.5 deaths (flat)' },
            { val: '88.3 lives ($1.20B, floor)' },
            { val: '157.0 lives ($2.14B, scale)' },
            { val: '177.4 lives ($2.41B, full)' }
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
        { title: 'Same-Year Average', subtitle: 'N = 1,197 county-years, 57 CA counties; pooled OLS (+0.18, crosses zero)' },
        { title: 'Pre-Pandemic Baseline', subtitle: 'N = 969 county-years, 57 CA counties; 2003-2019 pre-COVID IV (-4.56)' },
        { title: 'Small-County Subsample', subtitle: '57-county LHA panel subsample; small and rural counties IV (-8.11)' },
        { title: 'Full Routine-Budget Effect', subtitle: 'N = 1,197 county-years, 57 CA counties; full 2003-2023 IV (-9.16)' }
      ],
      rows: [
        {
          label: 'Feedback &amp; Sample Path',
          cells: [
            { val: 'Death spikes trigger added county budgets two years later (+1.58 two-year lag slope).' },
            { val: 'Calm-year budgets (2003-2019) test steady disease control before COVID-19 surge aid.' },
            { val: 'Small and rural counties rely on county health clinics as core safety-net providers.' },
            { val: 'Full 2003-2023 panel captures both calm-year prevention and pandemic surge capacity.' }
          ]
        },
        {
          label: 'Why 1-Year Audits Misread This Stage',
          cells: [
            { val: 'Same-year checks count reactive outbreak aid as routine program cost during severe flu waves.' },
            { val: 'Judging capacity only in calm years leaves out half the lives saved when an outbreak hits.' },
            { val: 'Statewide raw averages leave out strong gains in smaller counties with fewer private clinics.' },
            { val: 'Short one-year pilots stop chronic disease and clinic links before multi-year gains appear.' }
          ]
        },
        {
          label: 'Budget Tradeoff',
          cells: [
            { val: 'Cutting base budgets in a calm year removes local staff needed for the next outbreak.' },
            { val: 'Even without pandemic years, the -4.56 calm-era floor yields a 62:1 calculator return (620:1 on $1 table scale).' },
            { val: 'In smaller counties, the -8.11 slope yields a 110:1 calculator return (1,103:1 on $1 table scale).' },
            { val: 'At the -9.16 slope, a 1.94M-resident county outlay implies 177.4 lives on the calculator scale.' }
          ]
        },
        {
          label: 'Best-Fit Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'Split Outbreak Aid From Base Budgets', detail: 'Use variance or board-rule models to separate outbreak aid before scoring county results.' },
            { headline: 'Use Calm-Era Floor as Base Case', detail: 'Anchor conservative budget memos in the -4.56 pre-pandemic floor (62:1 calculator return).' },
            { headline: 'Protect Small-County Core Grants', detail: 'Keep steady base grants in smaller counties where public clinics lead local care.' },
            { headline: 'Use 3-to-5-Year Grant Cycles', detail: 'Fund county health grants in multi-year blocks so calm and pandemic gains can build.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Estimator Details, Distributed Lag Check, Unit Reconciliation &amp; Provenance',
      notesBullets: [
        '<strong>Estimator Details &amp; Robustness (Mode B):</strong> The working-paper IV estimate uses Lewbel (2012) variance-based instruments built from first-stage residuals. Diagnostics show first-stage F = 314.1, Breusch-Pagan LM = 91.68 (F = 12.32, p &lt; 0.001), and Hansen J = 4.49 (p = 0.343). Brown (2014) yields a close -9.10 per $10/capita (-0.91 per $1/capita). Across 47 model checks, 46 pass at p &lt; 0.05 (97.9% pass rate). The leave-one-county-out SD is 0.05 (range -9.21 to -9.02). The 2003-2019 pre-pandemic subsample (N = 969) yields -4.56, and the small-county subsample yields -8.11.',
        '<strong>Simultaneous Equations &amp; Distributed Lag Evidence (Mode B):</strong> In the system Mortality_it = β·Spending_it + γ·X_it + α_i + τ_t + ε_it and Spending_it = θ·Mortality_it + Π·Z_it + u_it, needs-driven funding (θ &gt; 0) and unobserved confounding create a 9.34-point arithmetic gap between the same-year OLS slope (+0.184, SE = 0.399, p = 0.644) and the IV slope (-9.158, SE = 1.108, p &lt; 0.001). That 9.34-point gap is the difference between the two estimators, not a separately identified causal effect of outbreak spending. Direct distributed-lag testing (N = 684, joint F = 6.73, p = 0.001) finds a current-year slope of -0.919 (SE = 0.284, p = 0.001) and a positive 2-year lag slope of +1.581 (SE = 0.491, p = 0.001), showing that counties raise public health budgets about two years after mortality shocks. In the 2003-2016 consistent SCO series, 5-year first differences (-1.561 OLS, p &lt; 0.001; -2.996 IV, p = 0.002, N = 500) and 13-year differences (-2.947 OLS vs. -3.476 IV, p &lt; 0.001, N = 57) also turn negative once short-run budget feedback is differenced out.',
        '<strong>Unit Convention Reconciliation ($10 Calculator Scale vs. $1 Regression Table Scale):</strong> As documented in GOAL_2026-06-18_value_deck_v2.md (L31-39), the working-paper files contain two unit conventions for the -9.158 coefficient. In Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex (L18-20 and Table 5, L298-303), the regressor is labeled per $1/capita (-9.158 per $1/capita, or -91.58 per $10/capita; +0.184 OLS per $1/capita, or +1.84 per $10/capita), which yields a cost per life saved of $1 × 100,000 / 9.158 = $10,919 ($21,930 at -4.56; $12,330 at -8.11) and a 1,246:1 BCR at $13.6M VSL. However, Section 4.4 of the same paper (L336-338: $10/capita [$390M] across 39M residents saving 3,572 lives = $109,000/life and 125:1 BCR), public/tools/lha-calculator/methodology.html (L231-357), and src/frontend/js/lha-calculator.js (L40-47: coefficientPer10 = -9.16, coefficient = -0.916 per $1) evaluate -9.16 on the conservative $10/capita scale ($10 × 100,000 / |β| = $109,170/life, 124.6:1 BCR; 177.4 lives across 1,936,259 Santa Clara residents for a $19.36M [$10/capita] outlay, or for a $1.94M [$1/capita] outlay under the $1 table scale). Table 1 reports both scales side by side and uses the conservative $10 calculator scale as the primary policy benchmark.',
        '<strong>Data Provenance:</strong> Panel estimates (+0.184 OLS, +1.581 2-year lag, -3.07 Pre-ACA, -4.56 pre-pandemic 2003-2019, -8.11 Small Counties, -8.93 Post-ACA, -9.10 Brown 2014, -9.158 Full Sample IV) and VSL inputs come from src/frontend/js/lha-calculator.js (L20-72), scripts/build_value_of_public_health_deck.py (L304, L354-439), public/tools/lha-calculator/methodology.html (L221-358), and Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex (Tables 1-5 and Section 4.4, L10-338).'
      ]
    },
    synthesis: {
      title: 'Splitting Outbreak Aid From Steady Prevention Gains',
      p1: 'Every public health budget works inside a feedback loop. When deaths or disease outbreaks rise, boards add funds over the next budget cycle. In the 57-county panel, distributed-lag models show a positive +1.58 slope at a two-year lag (p = 0.001) as counties respond to past death spikes. Because spending reacts to sickness, simple same-year averages (+0.18, p = 0.644) mix reactive funding and confounding with steady prevention.',
      p2: 'Health economics separates the direction of cause across both calm and pandemic windows. Routine-budget IV models isolate funding shifts that happen apart from local outbreaks, finding a -9.16 deaths per 100,000 slope across the full 2003-2023 panel (F = 314.1; 125:1 return on the conservative $10 calculator scale, or 1,246:1 on the paper\'s $1 table scale). Excluding the 2020-2023 pandemic years still yields -4.56 (62:1 calculator return), and small counties show -8.11 (110:1 calculator return). Showing boards both the calm-year floor and the full-panel return helps keep effective programs funded across multi-year budget cycles.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification &amp; Unit Reconciliation (Mode B Panel Estimates; Mode A Valuations in Table 1):</strong> All regression slopes (+0.184 same-year OLS, +1.581 two-year lag, -4.56 pre-pandemic 2003-2019 IV, -8.11 small-county IV, -8.93 post-ACA IV, and -9.158 full-panel IV) and Santa Clara population (1,936,259) are observed Mode B inputs from src/frontend/js/lha-calculator.js (L20-72), scripts/build_value_of_public_health_deck.py (L354-439), and Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex. The 9.34-point difference between +0.18 and -9.16 is reported strictly as the arithmetic gap between the OLS and IV slopes. Because Tables 1-5 of lewbel_iv_results_section.tex label the regressor per $1/capita while Section 4.4 of the paper and lha-calculator.js evaluate -9.16 per $10/capita (-0.916 per $1/capita), Table 1 reports both the conservative $10 calculator valuations ($219,298, $123,305, and $109,170 per life; 62:1 to 125:1 BCR) and the $1 regression-table valuations ($21,930, $12,330, and $10,919 per life; 620:1 to 1,246:1 BCR).',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://doi.org/10.1080/07350015.2012.643126" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Lewbel, A. (2012), JBES, 30(1), 67-80</a>; <a href="https://doi.org/10.1016/j.ehb.2013.10.001" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Brown, T. T. (2014), Economics &amp; Human Biology, 13, 34-45</a>; <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller County Financial Transactions</a>; <a href="https://wonder.cdc.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">CDC WONDER Mortality Data</a>; and <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 VSL Guidelines</a>.'
    ],
    faqs: [
      {
        question: 'What is "reverse causation" in public health budgets?',
        answer: 'It happens when the health outcome (death or disease rates) causes changes in the budget input (public health spending). In the California county panel, distributed-lag tests show a positive two-year lag slope (+1.58, p = 0.001) because counties raise public health budgets after mortality spikes. That reactive pattern and unobserved confounding create a 9.34-point gap between the same-year OLS slope (+0.18) and the IV estimate (-9.16).'
      },
      {
        question: 'Why does Table 1 show both a $10 calculator scale and a $1 regression table scale?',
        answer: 'In the working paper (lewbel_iv_results_section.tex), Tables 1-5 label the -9.158 slope per $1/capita ($10,919 per life saved, 1,246:1 BCR at $13.6M VSL), while Section 4.4 of the paper and the CAPHE LHA Calculator (lha-calculator.js) evaluate -9.16 per $10/capita (-0.916 per $1/capita) to match Brown (2014)\'s -9.10 per $10/capita scale ($109,170 per life saved, 125:1 BCR). Reporting both scales shows that county public health spending is highly cost-effective under either unit convention.'
      },
      {
        question: 'Does county public health spending still pay off if a board uses only the pre-pandemic calm-year floor?',
        answer: 'Yes. Using the observed 2003-2019 pre-pandemic estimate of -4.56 deaths per 100,000 on the conservative $10 calculator scale yields $219,298 per life saved and a 62.0:1 benefit-cost ratio at the $13.6M HHS central VSL (or $21,930 per life and 620:1 on the $1 table scale).'
      }
    ],
    related: [
      { slug: 'observational-to-experimental', title: 'Observational OLS vs. Quasi-Experimental IV', note: 'Case study comparing OLS (+0.18) with Brown (2014) (-9.10) and Cholette (2026) (-9.16)' },
      { slug: 'budget-impact', title: 'Budget Impact vs. Multi-Year ROI', note: 'Case study on managing Year 1 cash-flow outlays while multi-year benefits mature' },
      { slug: 'sensitivity-analysis-cea', title: 'Sensitivity Analysis Across HHS VSL Tiers', note: 'Case study testing the 125:1 LHA return across HHS 2025 VSL tiers and confidence bounds' }
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
    answerHtml: 'A state or county team that audits Medicaid provider networks using raw directories instead of paid claims overstates clinic capacity and leaves older state sanctions unlinked. Linking <strong>488,032 Medicaid billing providers</strong> (2018 to 2024) across paid claims, federal exclusions, and California suspension lists finds <strong>487,384 active non-excluded providers</strong> and <strong>648 sanctioned providers</strong> [1]. A federal-only check leaves out <strong>199 state-suspended providers (30.7%)</strong>, while <strong>95</strong> later-excluded fraud billers took in <strong>$9,694.90 per month</strong> unflagged [2]. Because formal exclusion trails final billing by a <strong>50.0-month</strong> median gap, teams must pair federal and state list checks with paid-claims volume reviews [3].',
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
        { tag: 'Active Controls', tagHighlight: false, title: 'Active Non-Excluded Controls', subtitle: 'N = 487,384 NPIs; unit: billing NPI, 2018-2024 claims' },
        { tag: 'In-Panel Fraud', tagHighlight: true, title: 'Sanctioned in 2018-2024', subtitle: 'N = 204 financial fraud NPIs (LEIE Spec A); unit: billing NPI' },
        { tag: 'Post-Panel Fraud', tagHighlight: true, title: 'Sanctioned in 2025 or Later', subtitle: 'N = 95 NPIs billing unflagged in 2018-2024; unit: billing NPI' },
        { tag: 'State-Only List', tagHighlight: true, title: 'California State-Only List', subtitle: 'N = 199 of 648 sanctioned NPIs with zero LEIE match; unit: billing NPI' }
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
    answerHtml: 'When an audit team tests a Medicaid billing risk model only on providers still active in the latest year, the check drops sanctioned billers who already left the program. Across <strong>487,479 Medicaid billing providers</strong>, the screening model flags sanctioned providers at <strong>9.5 times the random rate</strong> in the top 1% of alerts (<strong>9 caught cases</strong> across <strong>4,844 flags</strong>) [1]. In the subset of <strong>55,018 providers still billing in 2024</strong> (<strong>9</strong> exclusions), the screen falls below a coin-flip rank alongside shorter prior tenure (<strong>38.0th vs. 50.0th</strong> percentile), an observed subgroup difference rather than an isolated causal effect [2]. Calibrated alert rates across the full provider list set realistic caseload goals for audit staff [3].',
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
        { tag: 'Setting 1: Full List', tagHighlight: false, title: 'Full Unfiltered List, Top 1%', subtitle: 'N = 487,479 providers (95 exclusions + 487,384 controls); unit: billing NPI' },
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
      '<strong>Pre-Program Baseline Confounders vs. Program Mechanisms:</strong> <a href="https://data.census.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. Census ACS</a> Santa Clara tract panel covers 408 tracts (baseline poverty explains 62.2% of food-need variance). <a href="https://doi.org/10.1377/hlthaff.2019.01568" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Kangovi, S., et al. (2020), <em>Health Affairs</em></a> shows 71.7% vs. 57.1% primary care visits (OR = 1.90) and -30% hospital stays.',
      '<strong>Filtered Subsample &amp; Supply-Side Variables:</strong> <a href="https://data.medicaid.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS Medicaid Provider Spending</a> linked to <a href="https://oig.hhs.gov/exclusions/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">OIG LEIE</a> shows a 0.724 full-list AUC vs. 0.442 AUC in the 2024 active-biller subset (0.653 when exit-year reweighted). The 57-county LHA spending panel finds a -9.16 deaths/100K IV slope (first-stage F = 314.1; evaluated per $10/capita in the LHA Calculator and labeled per $1/capita in working-paper Tables 1-5).',
      '<strong>Methodological Reference on Control Selection:</strong> <a href="https://doi.org/10.1177/00491241221099552" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Cinelli, C., Forney, A., &amp; Pearl, J. (2022), <em>Sociological Methods &amp; Research</em></a>.'
    ],
    answerHtml: 'When an analyst models how food access links to diabetes while holding high blood pressure fixed, the regression drops part of the diet-to-disease path, while adjusting for baseline poverty isolates the income gap. In California Community Health Worker evaluations, leaving post-start clinic visits open keeps the full <strong>30% drop in hospital stays</strong> tied to a <strong>14.6 point rise in primary care visits (71.7% vs. 57.1%)</strong> [1]. Controlling for post-start clinic visits removes that care path, while restricting a provider test set to <strong>55,018 active 2024 billers</strong> leaves only <strong>9 of 95 excluded providers</strong> (after <strong>90.5%</strong> exited before 2024) [2]. Adjusting only for pre-program traits keeps the full policy impact intact [3].',
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
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode A Synthesis on Exact Source Statistics):</strong> Each column draws on a separate CAPHE dataset; the four roles are not estimated in one joint regression. Role 1: raw distance β = -0.578 (p &lt; 0.0001); with poverty controlled, distance β = -0.017 (p = 0.827); poverty model R² = 62.2%. Role 2: visit uptake 71.7% vs. 57.1%, OR = 1.90 (TOT). Role 3: full-universe screening AUC = 0.724 (95% CI 0.667-0.777) vs. observed active-only subgroup AUC = 0.442 (95% CI 0.212-0.664; exit-year reweighted AUC = 0.653). Role 4: -9.16 IV slope (first-stage F = 314.1; Hansen J = 4.49, p = 0.343; holds in 46 of 47 models; standardized per $10/capita in the LHA Calculator and labeled per $1/capita in working-paper Tables 1-5).',
      columns: [
        { tag: 'Role 1: Confounder', tagHighlight: true, title: 'Baseline County Poverty', subtitle: 'Shared Cause (X <- C -> Y) | N = 408 Santa Clara tracts (ACS); unit: tract' },
        { tag: 'Role 2: Care Step', tagHighlight: true, title: 'Primary Care Visits', subtitle: 'Program Path (X -> M -> Y) | Santa Clara CHW cohort (TOT); unit: member' },
        { tag: 'Role 3: Collider', tagHighlight: false, title: 'Active Billing Subset', subtitle: 'Shared Effect (X -> K <- Y) | N = 488,032 Medicaid billing NPIs (55,018 active in 2024); unit: billing NPI' },
        { tag: 'Role 4: Instrument', tagHighlight: false, title: 'Supply-Side Budget Shift', subtitle: 'Stage 1 Shift (Z -> X -> Y) | 57 CA counties, 2003-2023 panel; unit: county-year' }
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
            { val: 'Same-year slope mixes outbreak aid' }
          ]
        },
        {
          label: 'Result When Added as Control',
          cells: [
            { val: 'Distance: -0.017 flat slope', textColor: 'text-emerald-800' },
            { val: 'Direct part only (path dropped)', textColor: 'text-amber-900' },
            { val: 'Active-only subset: 9 of 95 left', textColor: 'text-rose-800' },
            { val: 'Stage 1 use: -9.16 deaths / 100K', textColor: 'text-[#003080]' }
          ]
        },
        {
          label: 'Observed Base Input',
          highlight: true,
          cells: [
            { val: 'Poverty explains 62.2% of gap', barWidth: 62, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '71.7% vs. 57.1% visits (1.90x)', barWidth: 72, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: 'Active months: 38.0th vs. 50.0th', barWidth: 38, barColor: '#DC2626', textColor: 'text-rose-800' },
            { val: 'Holds across 46 of 47 models (97.9%)', barWidth: 98, barColor: '#0041A5', textColor: 'text-[#003080]' }
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
        { title: 'Confounder: Baseline Poverty', subtitle: 'Food access tract panel, N = 408 Santa Clara census tracts (ACS); unit: tract' },
        { title: 'Care Step: Primary Care Visits', subtitle: 'Santa Clara CHW cohort (TOT estimates); unit: member' },
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
        '<strong>Instrument &amp; Unit Note:</strong> Instruments play a different role from controls. In the LHA panel (57 California counties, 2003-2023), county budgets react to death rates. The -9.16 deaths/100K IV estimate uses Lewbel (2012) instruments (first-stage F = 314.1, Hansen J = 4.49, p = 0.343) in Stage 1 of 2SLS rather than as outcome controls. Across source files, Tables 1-5 of lewbel_iv_results_section.tex label -9.158 per $1/capita, while Section 4.4 and lha-calculator.js standardize -9.16 per $10/capita (-0.916 per $1/capita).',
        '<strong>Data Provenance:</strong> Inputs come from FoodSecurity/analysis/outputs/regression_results_poverty_distance.csv and regression_model_statistics.csv (R² = 62.2%), METHODOLOGICAL_REVIEW_ARTICLES_5-12.md (disability OR = 1.76), CHWs/08_PhD_Final/DERIVATIONS.md and Kangovi et al. (2020) (71.7% vs. 57.1% TOT, OR = 1.90, -30% hospital stays), Mcaid/05_fraud_detection/paper/output/results.json (prospective_auc = 0.724, active_subset_auc = 0.442, shap_months_active_r; peer ranks in output/tables/tab_a3_base_rates.tex), and public/tools/lha-calculator/methodology.html (-9.158, F = 314.1, Hansen J = 4.49, p = 0.343, 57 counties, 2003-2023).'
      ]
    },
    synthesis: {
      title: 'Why Mapping the System Path Comes Before Running the Model',
      p1: 'Adding every health and income variable to a tract regression mixes pre-program income gaps with health steps that sit on the path between food and chronic disease. If a variable is a pre-program confounder (such as poverty explaining 62.2% of tract food-need variance), leaving it out slants the slope. If a variable is a post-start care step, such as a Community Health Worker linking a patient to primary care (raising visits from 57.1% to 71.7%, OR = 1.90) to prevent a hospital stay, controlling for clinic visits subtracts part of the program\'s gain.',
      p2: 'Before running a model, health economists map each variable in a causal diagram. Confounders are shared causes measured before treatment, so analysts control for them. Care steps sit on the causal path, so analysts leave them open when measuring total impact. Colliders and post-outcome filters like active 2024 billing alter the evaluation sample (where the 2024 active subset shows an observed 0.442 AUC vs. 0.724 on the full list), so analysts avoid filtering on them. Instruments shift treatment with no direct link to the outcome, so analysts use them in Stage 1 (as the LHA panel does with F = 314.1).'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification (Mode A Synthesis on Observed Inputs):</strong> The role rules and model guide are a Mode A synthesis. The numbers in Table 1 (tract poverty R² = 62.2%; CHW primary care visits 71.7% vs. 57.1% TOT, OR = 1.90, and -30% hospital stays; Medicaid screening AUC = 0.724 full list vs. observed AUC = 0.442 in the 2024 active subset; LHA first-stage F = 314.1, J = 4.49, p = 0.343) are observed outputs from four separate CAPHE files.',
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
        answer: 'An instrument shifts the policy input (here, county public health spending) without a direct path to the health outcome. It enters Stage 1 of two-stage least squares to isolate spending shifts that are not caused by death spikes. In the LHA panel of 57 California counties (2003-2023), the instruments have a first-stage F of 314.1 and Hansen J of 4.49 (p = 0.343). Adding an instrument as an outcome control would absorb the clean spending variation.'
      }
    ],
    related: [
      { slug: 'collider-bias', title: 'Active-Only Subsample Selection Bias', note: 'Case study on conditioning on active billers or admissions and rescaling precision to population base rates' },
      { slug: 'reverse-causation-feedback', title: 'Needs-Driven Spending & Prevention ROI', note: 'Case study separating reverse causation from preventive health returns' },
      { slug: 'chw-health-outcomes', title: 'Evaluating CHW Impact & Medi-Cal Billing', note: 'CHW case study case study on Santa Clara County CHW clinical and fiscal outcomes' }
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
        claimCovered: 'From 1992 to 2019 across 3,142 US counties, each 10 dollars per capita reduces Years of Potential Life Lost by 0.78 per 100,000 residents, versus +1.52 from 2020 to 2022.'
      },
      {
        visibleLabel: 'Statewide CHW Reimbursement Analysis',
        title: 'Why Flat Medi-Cal Rates Underfund Community Health Care',
        url: 'https://tooearlytosay.com/research/health-policy/chw-spatial-financing-medi-cal/',
        claimCovered: 'Across 58 California counties and 9,129 census tracts, a flat $26.66 Medi-Cal fee schedule covers less than 11% of community health worker labor costs.'
      }
    ],
    tier: 'public',
    trackEyebrow: 'Track 4: System Dynamics &amp; Feedback &middot; VSL Tiers &amp; Parameter Uncertainty (Mode A Scenario Grid)',
    pageTitle: 'Sensitivity Analysis in Funding Choices | CAPHE',
    metaDescription: 'Test California\'s county public health benefit-cost ratio across HHS 2025 VSL tiers ($6.3M-$20.7M, 58:1 to 190:1 on $10 scale) and CHW cost-capture cases.',
    h1: 'Modeled County Public Health Prevention Clears Cost-Neutral Thresholds Across All Federal Valuation Standards',
    subtitle: 'Testing modeled returns across low, middle, and high federal life value tiers. Checking both point estimates and lower bounds.',
    endnotes: [
      '<strong>Federal Value of a Statistical Life (VSL) Tiers (2025):</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE 2025 Guidelines for Regulatory Impact Analysis</a> ($6.3M Low, $13.6M Central, and $20.7M High VSL tiers; <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">EPA VSL</a> benchmark $11.2M = 103:1 on the $10 calculator scale).',
      '<strong>California County Public Health Mortality Reduction, Bounds &amp; Unit Scales:</strong> <a href="/tools/lha-calculator/methodology" class="text-[#0041A5] underline">CAPHE Local Health Authority (LHA) Calculator Methodology (Cholette et al., 2026)</a> standardizes the -9.16 deaths/100K IV slope (95% CI -11.34 to -6.98) on Brown (2014)\'s $10/capita scale (-0.916 per $1/capita; $109,170 per life saved, 58:1 to 190:1 across HHS tiers, and 44:1 at the joint lower bound), while Tables 1-5 of the working paper label -9.158 per $1/capita ($10,919 per life saved, 577:1 to 1,896:1 across HHS tiers, and 440:1 at the joint lower bound).',
      '<strong>California CHW Cost-Capture Scenarios:</strong> <a href="https://www.dhcs.ca.gov/formsandpubs/laws/Pages/CalAIM-SPA.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS SPA 22-0001</a> fee-for-service reimbursement (6.5% to 9.8% wage capture) vs. inpatient/emergency cost offsets ($285,900/yr vs. $98,469/yr wage) and full health value ($852,900/yr at $100K/QALY).'
    ],
    answerHtml: 'When a county board reviews a prevention budget with one benefit rule, staff ask if the return holds under lower life values or smaller effect bounds. Across all <strong>three federal tiers ($6.3M, $13.6M, and $20.7M per life)</strong>, California county public health spending (<strong>-9.16 deaths per 100,000</strong>) yields a modeled <strong>58:1 to 190:1</strong> return on the conservative $10 calculator scale (or <strong>577:1 to 1,896:1</strong> on the paper\'s $1 table scale) [1,2]. Using one middle number (<strong>125:1 at $13.6M</strong>) leaves a plan open to debate over one input [2]. Showing that the lowest joint bound still yields <strong>44:1</strong> (<strong>440:1</strong> on the $1 scale) shows that the spending pays off under every federal rule [3].',
    block2: {
      title: 'Two Valuation Rulers: Single Central Point Estimate vs. HHS VSL Range',
      contextTag: 'Mode A Scenario Grid Built on Observed Effect Estimates and Published HHS 2025 VSL Tiers',
      ariaLabel: 'Comparison of a single central point estimate of 125 to 1 at the $13.6M HHS central VSL on the $10 calculator scale versus the HHS VSL range of $6.3M to $20.7M, which yields 58 to 1 through 190 to 1',
      ruler1: {
        title: 'Ruler 1: Single Central Point Estimate ($13.6M VSL / 125:1 Calculator BCR)',
        stat: '125 : 1 ($10 Scale) | 1,246 : 1 ($1 Scale)',
        ariaLabel: 'At the point estimate of -9.16 deaths per 100,000, cost per statistical life is $109,170 on the $10 calculator scale or $10,919 on the $1 table scale, yielding a 125 to 1 or 1,246 to 1 benefit-cost ratio at the $13.6M HHS central VSL',
        segments: [
          { cls: 'seg-primary', width: 66, label: 'Central: -9.16 Slope × $13.6M VSL = 125:1 ($10 Scale)' },
          { cls: 'seg-rest', width: 34, label: 'Range Not Shown' }
        ],
        desc: 'Holding the effect at <strong>-9.16 deaths/100K ($109,170 per life on the $10 calculator scale; $10,919 on the $1 table scale)</strong> and using the HHS central <strong>$13.6M</strong> gives one number: <strong>125:1</strong> (or <strong>1,246:1</strong>). Debate over one value input can then stall the budget choice.'
      },
      ruler2: {
        title: 'Ruler 2: HHS VSL Range ($6.3M-$20.7M / 58:1-190:1 Calculator BCR)',
        stat: '58 : 1 to 190 : 1 Across HHS 2025 Tiers ($10 Scale)',
        ariaLabel: 'At the same -9.16 effect on the $10 calculator scale, the benefit-cost ratio is 58 to 1 at the $6.3M HHS low VSL, 125 to 1 at the $13.6M central VSL, and 190 to 1 at the $20.7M high VSL',
        segments: [
          { cls: 'seg-gross', width: 30, label: 'Low $6.3M: 58:1' },
          { cls: 'seg-primary', width: 36, label: 'Central $13.6M: 125:1' },
          { cls: 'seg-food', width: 34, label: 'High $20.7M: 190:1' }
        ],
        desc: 'Varying the HHS 2025 VSL tier moves the conservative $10-scale ratio from <strong>58:1 ($6.3M Low)</strong> through <strong>125:1 ($13.6M Central)</strong> to <strong>190:1 ($20.7M High)</strong> (or <strong>577:1 to 1,896:1</strong> on the $1 table scale). Every tier stays far above the <strong>1.0:1 cost-neutral line</strong>.'
      }
    },
    table1: {
      title: 'Table 1. Four Value and Cost Recovery Cases Across HHS 2025 Tiers',
      subtitle: 'Unit A rows value county spending under both $10 and $1 scales. Unit B rows show CHW cost recovery per worker.',
      caption: 'Four-column grid comparing the Joint Floor, Low VSL, Central VSL, and High VSL cases for county spending, with CHW cost recovery shown in separate rows.',
      cornerLabel: 'Case Input',
      footnote: '<strong class="text-slate-800">Table 1 Notes (Mode A Scenario Grid on Mode B Inputs &amp; Unit Reconciliation):</strong> Unit A and Unit B are never multiplied or summed. All Unit A values use the full estimated effect with no phase-in schedule. The lower effect bound is the lower 95% CI of the instrumented estimate: -9.16 + 1.96 × 1.11 = -6.98 deaths per 100,000 (95% CI -11.34 to -6.98; SE = 1.11). On the conservative LHA Calculator $10/capita scale (src/frontend/js/lha-calculator.js and Section 4.4 of lewbel_iv_results_section.tex), cost per life = $10 × 100,000 / |β| ($143,266 at -6.98; $109,170 at -9.16), yielding 44.0:1 to 189.6:1 BCR. On the working-paper Tables 1-5 $1/capita scale ($1 × 100,000 / |β|), cost per life is $14,327 at -6.98 and $10,919 at -9.158, yielding 440:1 to 1,896:1 BCR.',
      columns: [
        { tag: 'Case 1: Joint Floor', tagHighlight: true, title: 'Low Effect Bound + Low VSL', subtitle: 'Effect -6.98 &amp; $6.3M | CHW FFS, 213 Units' },
        { tag: 'Case 2: Low VSL', tagHighlight: false, title: 'Main Effect + Low VSL', subtitle: 'Effect -9.16 &amp; $6.3M | CHW FFS, 320 Units' },
        { tag: 'Case 3: Central', tagHighlight: true, title: 'Main Effect + Central VSL', subtitle: 'Effect -9.16 &amp; $13.6M | CHW Plan Offsets' },
        { tag: 'Case 4: High VSL', tagHighlight: false, title: 'Main Effect + High VSL', subtitle: 'Effect -9.16 &amp; $20.7M | CHW System Offsets' }
      ],
      rows: [
        {
          label: 'Deaths Averted per 100,000',
          cells: [
            { val: '6.98 fewer deaths (low bound)' },
            { val: '9.16 fewer deaths (main)' },
            { val: '9.16 fewer deaths (main)' },
            { val: '9.16 fewer deaths (main)' }
          ]
        },
        {
          label: 'HHS 2025 VSL Tier',
          cells: [
            { val: '$6.3M (HHS Low)' },
            { val: '$6.3M (HHS Low)' },
            { val: '$13.6M (HHS Central)' },
            { val: '$20.7M (HHS High)' }
          ]
        },
        {
          label: 'Cost per Life ($10 Calc | $1 Table)',
          cells: [
            { val: '$143,266 ($10) | $14,327 ($1)' },
            { val: '$109,170 ($10) | $10,919 ($1)' },
            { val: '$109,170 ($10) | $10,919 ($1)' },
            { val: '$109,170 ($10) | $10,919 ($1)' }
          ]
        },
        {
          label: 'BCR at Full Effect ($10 | $1 Scale)',
          highlight: true,
          cells: [
            { val: '44.0:1 ($10) | 440:1 ($1)', barWidth: 23, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '57.7:1 ($10) | 577:1 ($1)', barWidth: 30, barColor: '#0041A5', textColor: 'text-[#003080]' },
            { val: '124.6:1 ($10) | 1,246:1 ($1)', barWidth: 66, barColor: '#0D9488', textColor: 'text-emerald-800' },
            { val: '189.6:1 ($10) | 1,896:1 ($1)', barWidth: 100, barColor: '#0D9488', textColor: 'text-emerald-800' }
          ]
        },
        {
          label: 'Santa Clara Value ($10 Calc Scale)',
          cells: [
            { val: '135.2 lives ($851M / yr)' },
            { val: '177.4 lives ($1.12B / yr)' },
            { val: '177.4 lives ($2.41B / yr)' },
            { val: '177.4 lives ($3.67B / yr)' }
          ]
        },
        {
          label: 'CHW Cost Recovery Case',
          cells: [
            { val: '$6,775 (visit bills, 213 units)' },
            { val: '$10,162 (visit bills, 320 units)' },
            { val: '$107,006 (Medi-Cal plan offsets)' },
            { val: '$291,171 (system hospital offsets)' }
          ]
        },
        {
          label: 'CHW Cost Recovery Ratio',
          cells: [
            { val: '0.06 : 1 (6.0% of cost)' },
            { val: '0.09 : 1 (9.0% of cost)' },
            { val: '0.95 : 1 (94.8% of cost)' },
            { val: '2.58 : 1 (257.9% of cost)' }
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
        { title: 'Case 1: Joint Floor', subtitle: 'Unit A: 57-county LHA spending (effect -6.98, $6.3M VSL; $10 calc &amp; $1 table scales); Unit B: one CHW FTE/year, $112,915 loaded cost (FFS, 213 units)' },
        { title: 'Case 2: Low VSL', subtitle: 'Unit A: 57-county LHA spending (effect -9.16, $6.3M VSL; $10 calc &amp; $1 table scales); Unit B: one CHW FTE/year, $112,915 loaded cost (FFS, 320 units)' },
        { title: 'Case 3: Central', subtitle: 'Unit A: 57-county LHA spending (effect -9.16, $13.6M VSL; $10 calc &amp; $1 table scales); Unit B: one CHW FTE/year, $112,915 loaded cost (payer offsets)' },
        { title: 'Case 4: High VSL', subtitle: 'Unit A: 57-county LHA spending (effect -9.16, $20.7M VSL; $10 calc &amp; $1 table scales); Unit B: one CHW FTE/year, $112,915 loaded cost (societal offsets)' }
      ],
      rows: [
        {
          label: 'Which Question This Case Answers',
          cells: [
            { val: 'Tests the low effect bound at the $6.3M VSL and 213 CHW visit units.' },
            { val: 'Tests the main effect at the $6.3M VSL and 320 CHW visit units.' },
            { val: 'Tests the 21-year panel effect at the $13.6M VSL with plan offsets.' },
            { val: 'Tests the $20.7M High VSL alongside full system hospital savings.' }
          ]
        },
        {
          label: 'Distance From the 1.0:1 Line',
          cells: [
            { val: 'County spending returns 44.0:1 ($10 scale; 440:1 on $1), while CHW visit billing covers 6.0% of pay.' },
            { val: 'County spending returns 57.7:1 ($10 scale; 577:1 on $1), while CHW visit billing covers 9.0% of pay.' },
            { val: 'County spending returns 124.6:1 ($10 scale; 1,246:1 on $1), and CHW plan offsets return 0.95:1.' },
            { val: 'County spending returns 189.6:1 ($10 scale; 1,896:1 on $1), and CHW hospital savings return 2.58:1.' }
          ]
        },
        {
          label: 'Why Multi-Way Checks Help Here',
          cells: [
            { val: 'Varying the effect and VSL together still clears the 1.0:1 line by 44 to 1 on the conservative scale.' },
            { val: 'Varying VSL alone spans 58:1 to 190:1 ($10 scale), while the joint floor adds effect bounds.' },
            { val: 'Matching both HHS $13.6M and EPA $11.2M rules fits federal grant forms.' },
            { val: 'Keeping Unit A and Unit B apart avoids mixing per-worker and per-resident scales.' }
          ]
        },
        {
          label: 'Best-Fit Budget Rule',
          policyFit: true,
          cells: [
            { headline: 'Lead With the Joint Floor', detail: 'Grant the lowest VSL and lower effect bound together to show a 44:1 conservative return.' },
            { headline: 'Show the Full HHS Range', detail: 'Pair the 125:1 central ratio with the 58:1 to 190:1 HHS range.' },
            { headline: 'Use Central HHS VSL as Base', detail: 'Anchor county benefit-cost memos in the $13.6M HHS Central VSL at 125:1.' },
            { headline: 'Split Cash Capture From Health Value', detail: 'Report CHW visit billing and plan savings apart from VSL life values.' }
          ]
        }
      ],
      notesTitle: 'Table 2 Notes: Scenario Inputs, Benefit-Cost Formula, Unit Reconciliation &amp; Fencing',
      notesBullets: [
        '<strong>Inputs (Observed and Published):</strong> Mode B empirical coefficients (-9.158, SE = 1.108, 95% CI [-11.34, -6.98]; -4.56 2003-2019 baseline-allocation subsample) from src/frontend/js/lha-calculator.js (L39-72), scripts/build_value_of_public_health_deck.py (L354-439), and Value_of_Public_Health/paper/sections/lewbel_iv_results_section.tex. Published HHS 2025 VSL schedule ($6.3M / $13.6M / $20.7M) and EPA VSL ($11.2M). CHW cost-capture inputs ($112,915 loaded FTE cost; $6,775 to $10,162 direct FFS billing at 213 to 320 units under DHCS SPA 22-0001; $107,006 Medi-Cal payer offsets; $291,171 societal hospital offsets) from the CHW case study (scripts/build_wave2_flagships.js) and CHWs/08_PhD_Final/DERIVATIONS.md.',
        '<strong>Benefit-Cost Formula &amp; Unit Reconciliation (Mode A Scenario Grid, Unit A):</strong> On the conservative LHA Calculator $10/capita scale (src/frontend/js/lha-calculator.js: coefficientPer10 = -9.16, coefficient = -0.916 per $1; and Section 4.4 of lewbel_iv_results_section.tex, L336-338), BCR(β, VSL) = (|β| / 100,000) × VSL / $10. Central case (|β| = 9.16, VSL = $13.6M): BCR = 0.0000916 × $13,600,000 / $10 = 124.6 (joint floor at |β| = 6.98, VSL = $6.3M: 43.97; cost-neutral |β*| at $13.6M = 0.0735 deaths/100K per $10/capita; -4.56 subsample at $6.3M = 28.7:1). On the working-paper Tables 1-5 $1/capita scale (lewbel_iv_results_section.tex, L18-20 and L298-303, where -9.158 is labeled per $1/capita and -91.58 per $10/capita), cost per life is $1 × 100,000 / |β| ($10,919 at -9.158; $14,327 at -6.98) and BCR is 10x larger (440:1 joint floor, 577:1 low, 1,246:1 central, 1,896:1 high). Table 1 reports both scales side by side.',
        '<strong>Unit-of-Analysis Fencing:</strong> Unit A rows value county public health mortality reductions with VSL. Unit B rows describe one CHW FTE per year and use cash or resource offsets with no VSL. CHW scenarios are placed in columns by conservatism order only; they are not linked to the VSL tier in the same column.'
      ]
    },
    synthesis: {
      title: 'Why the Goal of Sensitivity Analysis Is Decision Robustness, Not Parameter Perfection',
      p1: 'County fiscal reviews test whether a public health investment remains cost-effective across conservative and upper-bound federal valuation tiers: should the analysis use the U.S. EPA $11.2M Value of a Statistical Life, the HHS $13.6M central benchmark, or the $6.3M HHS low tier? When an analyst presents only a single point estimate (125:1), any disagreement over one input casts doubt on the entire recommendation.',
      p2: 'Sensitivity analysis reframes the conversation around which assumptions change the decision. Across the HHS 2025 VSL range, county public health spending returns 58:1 to 190:1 on the conservative $10 calculator scale (577:1 to 1,896:1 on the paper\'s $1 table scale), and the joint floor (lower confidence bound at $6.3M) still returns 44:1 (440:1 on the $1 scale), so the funding verdict does not depend on the VSL tier or unit scale. CHW cost capture behaves differently: direct FFS billing recovers 6% to 9% of a $112,915 position and payer offsets recover 95%, so for CHW programs the financing perspective, not the valuation tier, determines whether the budget closes.'
    },
    methodologyParagraphs: [
      '<strong>Mode Classification &amp; Unit Reconciliation (Mode A Scenario Grid on Observed and Published Inputs):</strong> The cross-multiplied scenario cells in Table 1 (44:1 to 190:1 on the $10 calculator scale, 440:1 to 1,896:1 on the $1 regression-table scale, model-implied Santa Clara $851M to $3.67B valuations that assume the statewide estimate applies locally, and CHW recovery ratios 0.06:1 to 2.58:1) are Mode A sensitivity calculations. Their inputs are observed econometric estimates (-9.158, SE = 1.108, 95% CI [-11.34, -6.98]), published HHS 2025 VSL schedules ($6.3M / $13.6M / $20.7M), the EPA VSL ($11.2M), and calibrated CHW cost and offset values from the CHW case study.',
      '<strong>Primary References &amp; Data Sources:</strong> <a href="https://aspe.hhs.gov/reports/guidelines-regulatory-impact-analysis" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">HHS ASPE Guidelines for Regulatory Impact Analysis (2025 VSL Schedule: $6.3M Low, $13.6M Central, $20.7M High)</a>; <a href="https://www.epa.gov/environmental-economics/mortality-risk-valuation" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">U.S. EPA Mortality Risk Valuation ($11.2M VSL)</a>; <a href="https://doi.org/10.1001/jama.2016.12195" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">Sanders, G. D., et al. (2016), "Recommendations for Conduct, Methodological Practices, and Reporting of Cost-effectiveness Analyses: Second Panel on Cost-Effectiveness in Health and Medicine", JAMA, 316(10), 1093-1103</a>; <a href="https://www.dhcs.ca.gov/services/medi-cal/Pages/CHW-Benefit.aspx" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">DHCS Medi-Cal CHW Benefit (SPA 22-0001)</a>; and <a href="https://bythenumbers.sco.ca.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0041A5] underline">California State Controller</a>.'
    ],
    faqs: [
      {
        question: 'What is the difference between one-way and multi-way sensitivity analysis?',
        answer: 'One-way sensitivity analysis varies a single parameter at a time while holding all other inputs at their central values (for example, varying VSL from $6.3M to $20.7M at the -9.16 effect size, yielding 58:1 to 190:1 on the $10 calculator scale or 577:1 to 1,896:1 on the $1 table scale). Multi-way sensitivity analysis varies two or more uncertain parameters together (such as combining the $6.3M Low VSL with the -6.98 lower 95% confidence bound to test a 44:1 conservative joint floor).'
      },
      {
        question: 'What is a "cost-neutral threshold analysis" in cost-benefit modeling?',
        answer: 'Cost-neutral analysis asks how small the program effect would have to be for benefits to just equal costs (BCR = 1.0:1). At the $13.6M HHS Central VSL, a $10/capita investment reaches cost neutrality if it averts 0.0735 deaths per 100,000 residents (or 0.00735 per $1/capita), meaning the observed -9.16 effect is at least 125 times larger than the cost-neutral minimum.'
      },
      {
        question: 'Why are CHW cost-capture scenarios reported in separate rows from VSL-based returns?',
        answer: 'The two measure different units. VSL-based returns value mortality reductions from county public health spending, while CHW cost capture compares cash or resource offsets with the $112,915 annual cost of one CHW position. Direct FFS billing recovers 6% to 9% of that cost and Medi-Cal payer offsets recover about 95%, so the CHW financing question depends on who captures the savings rather than on the VSL tier.'
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
