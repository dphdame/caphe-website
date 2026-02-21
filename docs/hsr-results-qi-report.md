# HSR Research Brief: Results QI Report

**Date:** 2026-02-18

## Summary

- Total checks: 23
- PASS: 23
- FAIL: 0

## Correlation Robustness

| Specification | r | N |
|---|---|---|
| Base Pearson (N≥20) | 0.935 | 50 |
| Pearson (N≥50) | 0.931 | 44 |
| Pearson (N≥100) | 0.931 | 38 |
| Spearman (N≥20) | 0.956 | 50 |
| Weighted Pearson (N≥20) | 0.933 | 50 |
| Pearson (all counties) | 0.86 | 58 |

## Behavioral Health Distribution

- Median: 27.3%
- Mean: 27.2%
- Std Dev: 5.0%
- IQR: 1.4%
- Counties in 25-30% cluster: 44/57

## Full Results

- [PASS] Base Pearson r = 0.935 — r = 0.935
- [PASS] r robust to N≥50 threshold — r = 0.931
- [PASS] r robust to N≥100 threshold — r = 0.931
- [PASS] Spearman rank correlation strong — r = 0.956
- [PASS] Weighted Pearson correlation strong — r = 0.933
- [PASS] r robust including all counties — r = 0.86
- [PASS] HRR tiers = 8/11/5 — High=8, Mod=11, Low=5
- [PASS] Moderate tier spans reasonable range (34-40%) — 6 percentage point band centered near mean
- [PASS] I-5 corridor HRR population ≈ 3.6 million — actual = 3,583,881
- [PASS] I-5 corridor has 4 low-participation HRRs — HRRs: ['Bakersfield', 'Modesto', 'Redding', 'Stockton']
- [PASS] San Francisco is a valid county with AMC — Teaching hospitals: UCSF Medical Center
- [PASS] Los Angeles is a valid county with AMC — Teaching hospitals: UCLA Health, Cedars-Sinai, USC Keck, LAC+USC
- [PASS] Sacramento is a valid county with AMC — Teaching hospitals: UC Davis Medical Center
- [PASS] San Diego is a valid county with AMC — Teaching hospitals: UC San Diego Health
- [PASS] Alameda is a valid county with AMC — Teaching hospitals: Highland Hospital (Alameda Health System)
- [PASS] AMC effect is positive and substantial — diff = 10.4pp
- [PASS] BH cluster 25-30% = 44 — actual = 44
- [PASS] 'Nearly three in four' BH non-participation claim — 72.7% = 'nearly three in four'
- [PASS] BH median (27.3%) below national psychiatrist acceptance (36%) — Our broader definition should yield lower rates than psychiatrist-only
- [PASS] Pharmacy median = 72.2% — actual = 72.2%
- [PASS] SF/Bakersfield density ratio ≈ 4:1 — ratio = 3.9:1
- [PASS] All top 10 counties have cost index > 145 — minimum = 145.1
- [PASS] All bottom 10 counties have cost index < 91 — maximum = 90.8
