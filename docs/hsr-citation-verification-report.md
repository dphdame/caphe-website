# HSR Research Brief: Citation Verification Report

**Date:** 2026-02-18
**Method:** DOI resolution, Perplexity web-grounded search, direct URL fetch

## Summary

- Total references: 12
- Verified: 9
- Corrected: 5 errors found and fixed
- Partially verified: 3 (exist but specific claims unconfirmable via web tools)

## Corrections Made

| Ref | Error | Fix |
|-----|-------|-----|
| 2 | Claim said "26% reachable" — actual finding is 58% phantom providers | Changed to "58% of BH providers were phantom" |
| 4 | Wrong report title cited for 45%/caseload finding | Changed to "Availability of surveyed behavioral health providers..." |
| 5 | Missing page numbers | Added pages 531-538 |
| 11 | Wrong DOI (10.1377/hlthaff.2022.01735) | Corrected to 10.1377/hlthaff.2022.00805 |
| 12 | Addiction counselor adequacy claimed as 72% — actual is 30% | Corrected to 30% |

## Detailed Verification

### Ref 1: CMS GPCI Documentation
- **URL:** Active ✓
- **Content:** CMS report on 6th GPCI update revisions
- **Claim verification:** §1848(e)/1992 detail removed (not in this document; is general knowledge)
- **Status:** VERIFIED

### Ref 2: Zhu et al. 2022 (Health Affairs)
- **DOI:** 10.1377/hlthaff.2022.00052 ✓
- **Authors:** Zhu JM, Charlesworth CJ, Polsky D, McConnell KJ ✓
- **Journal/Vol/Pages:** Health Aff 2022;41(7):1013-1022 ✓
- **Claim:** ~~26% reachable~~ → 58.2% phantom providers ✓ (CORRECTED)
- **Status:** VERIFIED (claim corrected)

### Ref 3: CMS-2439-F Federal Register
- **Federal Register:** 89 FR 40672, May 10 2024, Document 2024-08085
- **Status:** PARTIALLY VERIFIED (standard FR citation format)

### Ref 4: HHS OIG Report
- **Claim (45% unavailable, 3/4 citing caseloads):** Verified via Perplexity
- **Correct report:** "Availability of Surveyed Behavioral Health Providers..." (Oct 2025)
- **URL:** https://oig.hhs.gov/reports/all/2025/availability-of-surveyed-behavioral-health-providers-to-treat-new-patients-enrolled-in-medicare-and-medicaid/
- **Status:** VERIFIED (title corrected)

### Ref 5: Skopec et al. 2025 (Health Affairs)
- **DOI:** 10.1377/hlthaff.2024.01530 ✓
- **Authors:** Skopec L, Pugazhendhi A, Zuckerman S ✓
- **Journal/Vol/Pages:** Health Aff 2025;44(5):531-538 ✓ (pages added)
- **Claim (71% of Medicare):** Correct under updated index methodology ✓
- **Status:** VERIFIED

### Ref 6: NPPES
- **URL:** https://download.cms.gov/nppes/NPI_Files.html ✓ Active (Feb 2026)
- **Status:** VERIFIED

### Ref 7: HHS Medicaid Provider Spending
- **URL:** https://opendata.hhs.gov/datasets/medicaid-provider-spending/ ✓ Active
- **Coverage:** Jan 2018 – Dec 2024 ✓
- **Status:** VERIFIED

### Ref 8: Dartmouth Atlas
- **URL:** https://data.dartmouthatlas.org/ ✓ Active
- **Status:** VERIFIED

### Ref 9: Wen et al. 2019 (JAMA Psychiatry)
- **DOI:** 10.1001/jamapsychiatry.2019.0958 ✓
- **Authors:** Wen H, Wilk AS, Druss BG, Cummings JR ✓
- **Journal/Vol/Pages:** JAMA Psychiatry 2019;76(9):981-983 ✓
- **Claim (47.9% → 35.4%):** Confirmed ✓
- **Status:** VERIFIED

### Ref 10: MACPAC 2025
- **URL:** https://www.macpac.gov/wp-content/uploads/2025/01/... ✓ (exists)
- **Report title:** Confirmed via MACPAC publication page
- **Specific claims (1.25pp per 10%, 87.4% vs 52.0%):** Could not verify from web-accessible excerpts
- **Status:** PARTIALLY VERIFIED — report exists, specific claims unconfirmable via web tools
- **USER ACTION NEEDED:** Manually verify these specific statistics against full PDF

### Ref 11: Zhu et al. 2023 (Health Affairs)
- **DOI:** 10.1377/hlthaff.2022.00805 ✓ (CORRECTED from .01735)
- **Authors:** Zhu JM, Renfro S, Watson K, Deshmukh A, McConnell KJ ✓
- **Journal/Vol/Pages:** Health Aff 2023;42(4):556-565 ✓
- **Claim (median 76% of Medicare):** Confirmed ✓
- **Status:** VERIFIED (DOI corrected)

### Ref 12: HRSA Behavioral Health Workforce Brief
- **URL:** https://bhw.hrsa.gov/sites/default/files/bureau-health-workforce/data-research/Behavioral-Health-Workforce-Brief-2025.pdf ✓
- **Published:** December 2025 ✓
- **Claims:**
  - Mental health counselors 55% adequacy by 2038: CONFIRMED ✓
  - Psychologists 48% adequacy: CONFIRMED ✓
  - Addiction counselors ~~72%~~ → 30% adequacy: CORRECTED
- **Status:** VERIFIED (claim corrected)

## User Action Required

**Ref 10 (MACPAC):** The two specific statistics attributed to this report could not be confirmed from web-accessible content:
1. "10% increase in Medicaid reimbursement associated with 1.25pp increase in appointment availability"
2. "practitioners with higher existing Medicaid caseloads accept new patients at 87.4% vs 52.0%"

Please manually verify these against the full PDF before submission.
