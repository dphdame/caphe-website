# CAPHE Methods Lab — 24-Module California Public Health Economics Decision Library

Open-access 30–60 second California public health economics decision library pairing standard administrative metrics (Ruler 1) with adjusted health-economic measures (Ruler 2) across 24 empirical modules in 4 tracks. Zero login walls; 100% authentic California datasets.

## Structure

```
methods-lab/
├── index.html                              # 24-module hub page with track & topic filtering
├── assets/                                 # Shared visual assets and SVG diagrams
└── [module-slug]/                          # 24 individual module directories
    └── index.html                          # 6-block Option C decision brief
```

## 24 Modules by Track

### Track 1: Longitudinal & Pre-Post Program Evaluation (5 Modules)
| Slug | Decision Focus |
|------|----------------|
| `before-after-trap` | Multi-Year Baseline Trends vs. Acute Shocks in Pre-Post Evaluations |
| `threat-regression-to-mean` | Regression to the Mean in Spike-Triggered County Funding |
| `threat-history-solutions` | Difference-in-Differences for Separating Statewide Shocks |
| `parallel-trends-power` | Pre-Trend Power & Rambachan-Roth ($M^*$) Sensitivity Bounds |
| `threat-maturation-solutions` | Interrupted Time Series for Statutory Policy Thresholds |

### Track 2: Cross-County & Subpopulation Comparisons (7 Modules)
| Slug | Decision Focus |
|------|----------------|
| `selection-into-treatment` | Selection Into Treatment Across Wage Replacement Tiers |
| `observational-to-experimental` | Nested Regression & Lewbel IV ($-9.16$) Across County Spending |
| `geographic-variables` | Geography as Proxy vs. Place as Mechanism in 9,033 Census Tracts |
| `identical-data-opposite-policies` | Nominal Parity vs. Purchasing-Power Parity Across Counties |
| `study-design-ladder` | Matching Study Designs to the Resource-Allocation Question |
| `reverse-causation-feedback` | Crisis-Driven Spending & Oster's $\delta$ Confounding Thresholds |
| `classifying-causal-mechanisms` | Distinguishing Confounders, Mediators, and Colliders |

### Track 3: Administrative Data, Claims & Measurement Integrity (4 Modules)
| Slug | Decision Focus |
|------|----------------|
| `threat-measurement-instrumentation` | Administrative Redefinitions vs. Real Infrastructure Change |
| `p-hacking-multiple-testing` | False Discovery Control Across 348 County-Specialty Alerts |
| `measurement-error-claims` | Directory Counts vs. Active FFS Billers & MCO Encounter Capture |
| `collider-bias` | Truncation & Collider Bias When Conditioning on Active Billers |

### Track 4: Fiscal Sustainability, CEA & Flagship California Case Studies (8 Modules)
| Slug | Decision Focus |
|------|----------------|
| `budget-impact` | Annual Cash-Flow Solvency vs. Multi-Year Social Return |
| `measuring-health-common-unit` | QALYs and HHS 2025 VSL Tiers ($\$6.3\text{M}$–$\$20.7\text{M}$) |
| `cost-effectiveness-ratio` | Opportunity Cost, ICERs, and Net Monetary Benefit |
| `sensitivity-analysis-cea` | Parameter Uncertainty & Decision Switching Points |
| `food-affordability-tradeoffs` | Flagship: California Regional Food Affordability vs. Nominal Thresholds |
| `chw-health-outcomes` | Flagship: Medi-Cal CHW Benefit (`SPA 22-0001`) Delivery & Procurement |
| `medicaid-expansion` | Flagship: Medi-Cal Redetermination Funnels & Procedural Churn |
| `food-insecurity-diabetes` | Flagship: Food Affordability Gaps & Adult Diabetes Prevalence |

## Consolidated Redirects (14 Single-Hop `301` Rules)
Fourteen legacy or overlapping slugs redirect permanently (`301`) in a single hop to their canonical partner module in `src/backend/server.js`.
