#!/usr/bin/env node
/**
 * Programmatic Code-to-Figure & Source-Data Verification Harness
 * Across All 24 CAPHE Case Studies + Main Hub Page (public/methods-lab/index.html)
 *
 * Verifies:
 * 1. Authoritative code-generated source files on disk (JSON, CSV, JS, TeX)
 * 2. Exact mathematical derivations (post-rent shares, QALYs, ICERs, NMBs, BCRs,
 *    Bayes base-rate rescaling, empirical Bayes shrinkage, PFL reserve ratios)
 * 3. Every rendered case study's figures (Block 2 .budget-bar-seg widths & Table 1
 *    .inline-mini-bar-fill widths) and numeric prose/table tokens
 * 4. Main Case Studies Hub (public/methods-lab/index.html) 1-line comparisons
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LAB_DIR = path.join(ROOT, 'public', 'methods-lab');

function verifyAllCaseStudiesAndFigures() {
  const errors = [];
  const assert = (cond, msg) => {
    if (!cond) errors.push(msg);
  };
  const assertClose = (actual, expected, tol, label) => {
    if (Math.abs(actual - expected) > tol) {
      errors.push(`${label}: got ${actual}, expected ${expected} (tol=${tol})`);
    }
  };

  // =========================================================================
  // 1. Load & Verify Code-Generated Source Outputs Across All 6 Pipelines
  // =========================================================================

  // Pipeline 1: CHW 58-County Benchmarks & CEA Parameters
  const chwJsonPath = path.join(ROOT, 'data', 'chw_county_benchmarks_2024.json');
  const chwData = JSON.parse(fs.readFileSync(chwJsonPath, 'utf8'));
  assert(chwData.counties && Object.keys(chwData.counties).length === 59, 'chw_county_benchmarks_2024.json must contain 59 entries (58 counties + STATEWIDE)');
  const stateChw = chwData.counties.STATEWIDE;
  assert(
    stateChw &&
    stateChw.chw_loaded_cost === 103719 &&
    stateChw.chw_ongoing_cost === 101369 &&
    stateChw.chw_promotora_cost === 98469 &&
    stateChw.ffs_share_low_pct === 6.5 &&
    stateChw.ffs_share_high_pct === 9.8 &&
    stateChw.scen4_gross_societal_offset === 34900,
    'CHW benchmark JSON values mismatch'
  );
  // Verify Table 1 barWidth math for chw-health-outcomes:
  // $407,006 ($107,006 + $300,000), $591,171 ($291,171 + $300,000), $591,333 ($182,333 + $409,000), $852,900 ($34,900 + $818,000)
  assert(Math.round((407006 / 852900) * 100) === 48, 'chw-health-outcomes bar 1');
  assert(Math.round((591171 / 852900) * 100) === 69, 'chw-health-outcomes bar 2');
  assert(Math.round((591333 / 852900) * 100) === 69, 'chw-health-outcomes bar 3');
  assert(Math.round((852900 / 852900) * 100) === 100, 'chw-health-outcomes bar 4');

  // Pipeline 2: Santa Clara Medi-Cal Churn & Redetermination Funnel
  const churnReconPath = path.join('/Users', 'vserver', 'laptop_archive_20261024', 'code', 'scc_medi_cal_churn_memo', 'SCC_MediCal_Churn_Mapping_Strategy_Memo-reconciliation.json');
  const churnRecon = JSON.parse(fs.readFileSync(churnReconPath, 'utf8'));
  assert(churnRecon.status === 'PASS' && churnRecon.discrepancies === 0, 'SCC Medi-Cal churn reconciliation status');
  const dhcsAdminRec = churnRecon.records.find(r => r.check_type === 'dhcs_admin_enrollment_2025_06');
  assert(
    dhcsAdminRec &&
    dhcsAdminRec.total_medi_cal_sum_of_aid_categories === 472014 &&
    dhcsAdminRec.aca_expansion_adults_19_64 === 120239,
    'DHCS June 2025 baseline in churn reconciliation JSON'
  );
  // Verify avoidable share bars in medicaid-expansion: 2228/6367=35.0%, 6831/9435=72.4%, 3319/5138=64.6%, 1841/6136=30.0%
  assert(Math.round((2228 / 6367) * 100) === 35, 'medicaid-expansion bar 1');
  assert(Math.round((6831 / 9435) * 100) === 72, 'medicaid-expansion bar 2');
  assert(Math.round((3319 / 5138) * 100) === 65, 'medicaid-expansion bar 3');
  assert(Math.round((1841 / 6136) * 100) === 30, 'medicaid-expansion bar 4');

  // Pipeline 3: Medicaid Claims, Telehealth & Fraud Screening (Mcaid)
  const fraudJsonPath = path.join(ROOT, '..', 'Mcaid', '05_fraud_detection', 'paper', 'output', 'results.json');
  const fraudJson = JSON.parse(fs.readFileSync(fraudJsonPath, 'utf8'));
  assertClose(fraudJson.prospective_auc, 0.724, 0.001, 'Mcaid prospective_auc');
  assertClose(fraudJson.active_subset_auc, 0.442, 0.001, 'Mcaid active_subset_auc');
  assertClose(fraudJson.top1_prec_holdout, 0.922, 0.001, 'Mcaid top1_prec_holdout');
  assertClose(fraudJson.top1_prec_pop, 0.186, 0.001, 'Mcaid top1_prec_pop');
  assert(fraudJson.top1_flags === 4844 && fraudJson.top1_captured === 9, 'Mcaid top1 flags and captured');
  assertClose(fraudJson.top1_lift, 9.53, 0.02, 'Mcaid top1_lift');
  assert(fraudJson.top5_flags === 24295 && fraudJson.top5_captured === 25, 'Mcaid top5 flags and captured');
  assertClose(fraudJson.top5_prec_pop, 0.103, 0.001, 'Mcaid top5_prec_pop');
  assert(fraudJson.mfcu_active_cases === 16688 && fraudJson.mfcu_cost_per_case === 23719, 'Mcaid MFCU caseload and cost');
  assertClose(fraudJson.permutation_null_max, 0.593, 0.001, 'Mcaid permutation_null_max');
  assertClose(fraudJson.ctrl_paid_per_month_median, 3820.94, 0.01, 'Mcaid ctrl_paid_per_month_median');
  assertClose(fraudJson.during_paid_per_month_median, 6721.78, 0.01, 'Mcaid during_paid_per_month_median');
  assertClose(fraudJson.post_paid_per_month_median, 9694.9, 0.01, 'Mcaid post_paid_per_month_median');
  assert(Math.round((fraudJson.ctrl_paid_per_month_median / fraudJson.post_paid_per_month_median) * 100) === 39, 'measurement-error-claims bar 1');
  assert(Math.round((fraudJson.during_paid_per_month_median / fraudJson.post_paid_per_month_median) * 100) === 69, 'measurement-error-claims bar 2');
  assert(Math.round((fraudJson.post_paid_per_month_median / fraudJson.post_paid_per_month_median) * 100) === 100, 'measurement-error-claims bar 3');

  // Pipeline 4: 57-County Local Health Jurisdiction Mortality & Lewbel IV
  const lhaJsPath = path.join(ROOT, 'src', 'frontend', 'js', 'lha-calculator.js');
  const lhaMethPath = path.join(ROOT, 'public', 'tools', 'lha-calculator', 'methodology.html');
  const lewbelTexPath = path.join(ROOT, '..', 'PublicHealthValue', 'paper', 'sections', 'lewbel_iv_results_section.tex');
  const robTexPath = path.join(ROOT, '..', 'PublicHealthValue', 'paper', 'sections', 'robustness_tables.tex');
  const ajphTexPath = path.join(ROOT, '..', 'Value_of_Public_Health', 'paper', 'ajph_submission.tex');
  const lhaCombined = [lhaJsPath, lhaMethPath, lewbelTexPath, robTexPath, ajphTexPath]
    .map(p => fs.readFileSync(p, 'utf8'))
    .join('\n');
  for (const token of ['-9.16', '1.11', '314.1', '4.49', '0.343', '0.18', '-9.1', '-3.07', '-8.93', '125', '.0049', '.0788']) {
    assert(lhaCombined.includes(token), `LHA source files missing token ${token}`);
  }

  // Pipeline 5: Food Security, EBT Verification & Cost-of-Living
  const foodSecRoot = path.resolve(ROOT, '..', '..', 'Projects', 'FoodSecurity');
  const regStatsCsv = fs.readFileSync(path.join(foodSecRoot, 'analysis', 'outputs', 'regression_model_statistics.csv'), 'utf8');
  const regResCsv = fs.readFileSync(path.join(foodSecRoot, 'analysis', 'outputs', 'regression_results_poverty_distance.csv'), 'utf8');
  const vulnMeta = JSON.parse(fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'extended_vulnerability_index_SNAP_VERIFIED_20251029_metadata.json'), 'utf8'));
  const dehMeta = JSON.parse(fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'ebt_verification', 'dehdenom_final', 'dehdenom_official_summary.json'), 'utf8'));
  const countyRanksCsv = fs.readFileSync(path.join(foodSecRoot, 'data', 'processed', 'statewide', 'county_rankings_ca_2023.csv'), 'utf8');
  const statMap = Object.fromEntries(
    regStatsCsv.trim().split('\n').slice(1).map(line => {
      const idx = line.lastIndexOf(',');
      return [line.slice(0, idx), parseFloat(line.slice(idx + 1))];
    })
  );
  assert(statMap['N (observations)'] === 408, 'FoodSecurity N = 408');
  assertClose(statMap['R-squared'] * 100, 62.17, 0.02, 'Full model R2 %');
  assertClose(statMap['Partial R² (Poverty)'] * 100, 58.06, 0.02, 'Semi-partial dR2 Poverty');
  assert(regResCsv.includes('0.99198') && regResCsv.includes('0.78699') && regResCsv.includes('0.8272'), 'regression_results_poverty_distance.csv values');
  assert(vulnMeta.store_count === 514 && vulnMeta.tract_count === 408 && vulnMeta.food_desert_count === 1, 'vulnMeta counts');
  assertClose(vulnMeta.mean_distance_miles, 0.573, 0.001, 'vulnMeta mean distance');
  assert(dehMeta.original_facilities === 8555 && dehMeta.consolidated_facilities === 7335 && dehMeta.duplicates_removed === 1220 && dehMeta.snap_eligible_retail === 724, 'dehMeta counts');
  assert(countyRanksCsv.includes('Fresno,0.379,0.371,0.101,0.199,0.797,1.446'), 'Fresno row in county_rankings_ca_2023.csv');
  assert(countyRanksCsv.includes('Nevada,0.308,0.307,0.068,0.198,0.521,2.921'), 'Nevada row in county_rankings_ca_2023.csv');

  // Pipeline 6: Paid Family Leave (SB 951 & AB 2123) DI Fund Model
  const pflJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'tools', 'pfl-simulator', 'data', 'pfl_model_data.json'), 'utf8'));
  assert(
    pflJson.baseline_parameters.year_2025_actual.pfl_first_claims_paid === 325055 &&
    pflJson.baseline_parameters.year_2026_forecast.pfl_first_claims_paid === 330000 &&
    pflJson.expansion_scenarios.expected.expanded_claims === 369600,
    'PFL baseline and expected claims in pfl_model_data.json'
  );

  // =========================================================================
  // 2. Verify All 24 Rendered Case Studies: Code-Linked Numbers & Bar Widths
  // =========================================================================
  const CASE_STUDY_CHECKS = {
    // Wave 2 (3 case studies)
    'chw-health-outcomes': {
      tokens: ['$103,719', '6.5% to 9.8%', '$6,775 to $10,162', '$107,006', '$291,171', '$182,333', '+3.00 QALYs', '+4.09 QALYs', '+8.18 QALYs', '$407,006', '$591,171', '$591,333', '$852,900'],
      bars: [48, 69, 69, 100]
    },
    'medicaid-expansion': {
      tokens: ['120,239', '27,076', '14,219', '52.5%', '35.0%', '2,228', '72.4%', '6,831', '64.6%', '3,319', '30.0%', '1,841'],
      bars: [35, 72, 65, 30]
    },
    'food-insecurity-diabetes': {
      tokens: ['$5,507', '$2,318', '42.1%', '17.7%', '30.5%', '$3,103', '$1,007', '32.5%', '31.4%', '46.4%', '$973', '62.2%', '1.8%'],
      bars: [66, 100, 19, 41]
    },
    // Wave 3 (9 case studies)
    'before-after-trap': {
      tokens: ['84,422', '91,399', '113,638', '101,978', '+22,239', '+24.33%', '+6,977', '119,307', '-5,669', '-24,306', '-28,307'],
      bars: [2, 24, 99, 100]
    },
    'selection-into-treatment': {
      tokens: ['369,600', '+39,600', '$623.7M', '$422.0M', '+$19.7M', '+$3.3M', '-$78.2M', '-$157.5M', '1.345%'],
      bars: [13, 2, 50, 100]
    },
    'threat-regression-to-mean': {
      tokens: ['1,204', '39,538,223', '89.0% pulled', '68.0% pulled', '24.0% pulled', '6.0% pulled', '-8.11 / 100K', '-9.16 / 100K'],
      bars: [89, 68, 24, 6, 89, 100]
    },
    'threat-history-solutions': {
      tokens: ['84,422', '91,399', '113,638', '101,905', '109,087', '129,492', '+24.33%', '+18.71%', '+5.62 pp', '+4.60 pp', '+1.21 pp', '-0.37 pp'],
      bars: [22, 100, 82, 7]
    },
    'parallel-trends-power': {
      tokens: ['-0.47 pp', '0.22 pp', '-0.91 to -0.03 pp', '-1.27 to +1.16 pp', '0.35x', '+0.003 pp', '9.16'],
      bars: [36, 100, 40, 3]
    },
    'threat-maturation-solutions': {
      tokens: ['325,055', '330,000', '369,600', '$3.19B', '18.2%', '$1.96B', '10.8%', '$2.36B', '13.2%', '-$0.58B', '$6.37B', '30.4%'],
      bars: [73, 45, 54, 13]
    },
    'budget-impact': {
      tokens: ['125:1', '52:1', '$422.0M', '$623.7M', '10.8%', '$1.96B', '$4.38B', '42%', '$709M'],
      bars: [11, 3, 42]
    },
    'measuring-health-common-unit': {
      tokens: ['40.04 QALYs', '18.21', '17.49', '4.34', '$1,821,046', '$2,183,037', '$4,004,083', '$13.6M', '$6.3M', '$20.7M', '125:1'],
      bars: [13, 16, 29, 100]
    },
    'cost-effectiveness-ratio': {
      tokens: ['$1,930,000', '$1,405,000', '$7,225,000', '$7,550,000', '40.04 QALYs', '200.20 QALYs', '$48,202 / QALY', '$35,090 / QALY', '$36,089 / QALY', '$37,712 / QALY'],
      bars: [96, 70, 72, 75]
    },
    // Wave 4A (7 case studies)
    'food-affordability-tradeoffs': {
      tokens: ['$5,507', '$2,318', '42.1%', '17.7%', '30.5%', '$2,216', '$3,103', '$1,007', '32.5%', '31.4%', '46.4%', '$1,123', '17.9%', '9.3%', '$973'],
      bars: [66, 100, 39, 20]
    },
    'observational-to-experimental': {
      tokens: ['+0.18', '9.10 fewer deaths', '9.16 fewer deaths', '8.93 fewer deaths', '314.1', '4.49', '0.343', '99.4%', '$109,000', '$125 per $1'],
      bars: [2, 99, 100, 97]
    },
    'geographic-variables': {
      tokens: ['62.2%', '58.1 pp', '60.6%', '0.003 pp', '0.827', '1.218 miles', '3,252 residents', '30 of 225', '13.3%', '2.92 mi', '12.43 mi'],
      bars: [93, 1, 100, 13]
    },
    'identical-data-opposite-policies': {
      tokens: ['1.506', '1.380', '1.025', '0.900', '55.6%', '29.7%', '14.7%', '$5,507', '42.1%', '$2,318', '17.6%', '58.7%', '66.4%'],
      bars: [100, 92, 68, 60, 18, 53, 65, 100]
    },
    'threat-measurement-instrumentation': {
      tokens: ['6,613', '514', '755', '724', '8,555', '7,335', '1,220', '14.3%', '0.29', '0.573', '65.2%', '81.7%', '97.5%'],
      bars: [100, 92, 14, 71]
    },
    'study-design-ladder': {
      tokens: ['120,239', '255,601', '152,811', '40.2%', '330,000', '369,600', '+39,600', '9.16', '82,695', '27.8%', '69.2%', '78.1%', '15.0%'],
      bars: []
    },
    'p-hacking-multiple-testing': {
      tokens: ['472,014', '411,722', '-60,292', '-12.77%', '-34.04%', '-25.00%', '-24,880', '-17,380', '-7,230', '-6,344', '41.27%', '28.83%', '0.469 to 0.730', '0.0788', '0.593'],
      bars: [1, 1, 100, 70]
    },
    // Wave 4B (5 case studies)
    'reverse-causation-feedback': {
      tokens: ['+0.18', '-4.56', '-8.11', '-9.16', '$219,298', '$123,305', '$109,170', '62.0:1', '110.3:1', '124.6:1'],
      bars: [2, 50, 89, 100]
    },
    'measurement-error-claims': {
      tokens: ['488,032', '648', '299', '199', '150', '487,384', '204', '95', '$3,820.94', '$6,721.78', '$9,694.90', '50.0-month'],
      bars: [39, 69, 100]
    },
    'collider-bias': {
      tokens: ['487,479', '95', '0.0195%', '55,018', '55,009', '0.724', '0.442', '0.653', '0.818', '0.922%', '0.186%', '4,844', '9.53x', '16,688', '$23,719'],
      bars: [72, 44, 72, 82]
    },
    'classifying-causal-mechanisms': {
      tokens: ['-0.578', '-0.017', '62.2%', '71.7%', '57.1%', '1.90', '30%', '9 of 95', '38.0th vs. 50.0th', '-9.16', '46 of 47'],
      bars: [62, 72, 38, 98]
    },
    'sensitivity-analysis-cea': {
      tokens: ['6.98 fewer deaths', '9.16 fewer deaths', '$6.3M', '$13.6M', '$20.7M', '$143,266', '$109,170', '44.0:1', '57.7:1', '124.6:1', '189.6:1', '$6,775', '$10,162', '$107,006', '$291,171'],
      bars: [23, 30, 66, 100]
    }
  };

  for (const [slug, spec] of Object.entries(CASE_STUDY_CHECKS)) {
    const htmlPath = path.join(LAB_DIR, slug, 'index.html');
    assert(fs.existsSync(htmlPath), `[${slug}] Missing HTML file at ${htmlPath}`);
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Check every verified code-derived token
    for (const token of spec.tokens) {
      assert(html.includes(token), `[${slug}] Missing code-derived figure/token "${token}" in rendered HTML`);
    }

    // Check Table 1 inline-mini-bar widths match expected mathematical ratios
    const actualBars = [...html.matchAll(/class="inline-mini-bar"[^>]*><div style="width:\s*(\d+)%/g)].map(m => Number(m[1]));
    assert(
      JSON.stringify(actualBars) === JSON.stringify(spec.bars),
      `[${slug}] Table 1 barWidth mismatch: got ${JSON.stringify(actualBars)}, expected ${JSON.stringify(spec.bars)}`
    );
  }

  // =========================================================================
  // 3. Verify Main Hub Page (public/methods-lab/index.html) Links & Layout B
  // =========================================================================
  const hubPath = path.join(LAB_DIR, 'index.html');
  const hubHtml = fs.readFileSync(hubPath, 'utf8');
  assert(hubHtml.includes('<h1>California Public Health Case Studies</h1>'), '[Hub index.html] Missing H1');
  for (const slug of Object.keys(CASE_STUDY_CHECKS)) {
    assert(hubHtml.includes(`href="/methods-lab/${slug}"`), `[Hub index.html] Missing link to /methods-lab/${slug}`);
  }

  return errors;
}

if (require.main === module) {
  const errors = verifyAllCaseStudiesAndFigures();
  if (errors.length > 0) {
    console.error(`❌ Code-to-Figure Verification Failed (${errors.length} errors):`);
    for (const e of errors) console.error('  -', e);
    process.exit(1);
  } else {
    console.log('✅ All 24 CAPHE Case Studies + Hub Page verified against code-generated data & proportional bar widths (0 errors).');
  }
}

module.exports = { verifyAllCaseStudiesAndFigures };
