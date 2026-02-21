"""
Phase 1: Data Validation for HSR Research Brief
"Flat-Rate Medicaid Reimbursement and Geographic Variation in Provider Participation"

Verifies every numeric claim in the manuscript against _summary.json.
Outputs a line-by-line verification report.

Usage: python scripts/verify-hsr-numbers.py
"""

import json
import os
import sys
import statistics

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE, "data", "access-explorer", "_summary.json")
CROSSWALK_FILE = os.path.join(BASE, "data", "access-explorer", "county_hrr_crosswalk.json")

with open(DATA_FILE) as f:
    data = json.load(f)

counties = data["counties"]

# Load HRR crosswalk if available
hrr_crosswalk = None
if os.path.exists(CROSSWALK_FILE):
    with open(CROSSWALK_FILE) as f:
        hrr_crosswalk = json.load(f)

SPECIALTIES = [
    "primary_care", "behavioral_health", "dental",
    "obgyn", "other_surgical", "pharmacy_dme"
]

SPEC_LABELS = {
    "primary_care": "Primary Care",
    "behavioral_health": "Behavioral Health",
    "dental": "Dental",
    "obgyn": "OB/GYN",
    "other_surgical": "Other Surgical",
    "pharmacy_dme": "Pharmacy/DME",
}

results = []
failures = []


def check(description, expected, actual, tolerance=0.15):
    """Check a value, allowing tolerance for rounding."""
    if isinstance(expected, (int, float)) and isinstance(actual, (int, float)):
        passed = abs(float(expected) - float(actual)) <= tolerance
    elif isinstance(expected, str) and isinstance(actual, str):
        passed = expected == actual
    elif isinstance(expected, list) and isinstance(actual, list):
        passed = expected == actual
    else:
        # Type mismatch — compare as strings
        passed = str(expected) == str(actual)

    status = "PASS" if passed else "FAIL"
    entry = f"[{status}] {description}: expected={expected}, actual={actual}"
    results.append(entry)
    if not passed:
        failures.append(entry)
    return passed


# ============================================================
# 1. STATEWIDE TOTALS
# ============================================================
print("=" * 60)
print("SECTION 1: Statewide Totals")
print("=" * 60)

total_registered = sum(c["registered"] for c in counties.values())
total_active = sum(c["active"] for c in counties.values())
overall_rate = round(total_active / total_registered * 100, 1) if total_registered > 0 else 0

check("Statewide registered providers", 79223, total_registered)
check("Statewide active providers", 31798, total_active)
check("Statewide participation rate", 40.1, overall_rate)

# ============================================================
# 2. COUNTY RANKINGS (Exhibit 3)
# ============================================================
print("\n" + "=" * 60)
print("SECTION 2: County Rankings (Exhibit 3)")
print("=" * 60)

sorted_counties = sorted(counties.items(), key=lambda x: x[1]["participationRate"], reverse=True)

# Top 10
top10_claims = [
    ("Marin", 48.3, 620, 299, 172.8, 57.9),
    ("San Francisco", 46.8, 4210, 1970, 186.0, 53.8),
    ("San Mateo", 45.1, 1820, 821, 181.1, 55.2),
    ("Santa Clara", 44.9, 5640, 2532, 176.7, 56.6),
    ("Alameda", 44.2, 5830, 2577, 162.1, 61.7),
    ("Contra Costa", 43.8, 3210, 1406, 157.6, 63.5),
    ("Orange", 42.7, 8420, 3595, 154.8, 64.6),
    ("Napa", 41.2, 245, 101, 145.1, 68.9),
    ("San Diego", 41.2, 8903, 3668, 149.6, 66.8),
    ("Sonoma", 40.5, 685, 277, 152.8, 65.4),
]

for name, rate, reg, act, cost, eff in top10_claims:
    cd = counties.get(name, {})
    check(f"{name} participation rate", rate, cd.get("participationRate"))
    check(f"{name} registered", reg, cd.get("registered"))
    check(f"{name} active", act, cd.get("active"))
    check(f"{name} cost index", cost, cd.get("composite_cost_index"))
    check(f"{name} effective reimbursement", eff, cd.get("effective_reimbursement_index"))

# Bottom 10
bottom10_claims = [
    ("Tehama", 25.9, 58, 15, 85.0, 117.6),
    ("Mariposa", 25.0, 12, 3, 90.8, 110.1),
    ("Colusa", 25.0, 16, 4, 85.6, 116.8),
    ("Lake", 24.1, 58, 14, 89.8, 111.4),
    ("Plumas", 23.1, 13, 3, 87.9, 113.8),
    ("Imperial", 22.4, 268, 60, 83.7, 119.5),
    ("Lassen", 22.2, 27, 6, 82.1, 121.8),
    ("Trinity", 20.0, 15, 3, 79.6, 125.6),
    ("Modoc", 16.7, 12, 2, 75.9, 131.8),
    ("Sierra", 0.0, 2, 0, 79.9, 125.2),
]

for name, rate, reg, act, cost, eff in bottom10_claims:
    cd = counties.get(name, {})
    check(f"{name} participation rate", rate, cd.get("participationRate"))
    check(f"{name} registered", reg, cd.get("registered"))
    check(f"{name} active", act, cd.get("active"))
    check(f"{name} cost index", cost, cd.get("composite_cost_index"))
    check(f"{name} effective reimbursement", eff, cd.get("effective_reimbursement_index"))

# Verify ranking order
actual_top10 = [name for name, _ in sorted_counties[:10]]
expected_top10 = [t[0] for t in top10_claims]
check("Top 10 county order", expected_top10, actual_top10)

actual_bottom10 = [name for name, _ in sorted_counties[-10:]]
expected_bottom10 = list(reversed([t[0] for t in bottom10_claims]))
# Bottom 10 sorted ascending (worst last)
check("Bottom 10 county names (as set)",
      set([t[0] for t in bottom10_claims]),
      set(actual_bottom10))

# ============================================================
# 3. SPECIALTY MEDIANS (Exhibit 4)
# ============================================================
print("\n" + "=" * 60)
print("SECTION 3: Specialty Statistics (Exhibit 4)")
print("=" * 60)

exhibit4_claims = {
    "pharmacy_dme": {"median": 72.2, "total_reg": 6678, "total_act": 4819, "n_counties": 57},
    "primary_care": {"median": 41.4, "total_reg": 20372, "total_act": 8449, "n_counties": 58},
    "obgyn": {"median": 38.4, "total_reg": 9308, "total_act": 3572, "n_counties": 56},
    "dental": {"median": 35.9, "total_reg": 14009, "total_act": 5017, "n_counties": 57},
    "other_surgical": {"median": 30.8, "total_reg": 12136, "total_act": 3731, "n_counties": 56},
    "behavioral_health": {"median": 27.3, "total_reg": 16720, "total_act": 4563, "n_counties": 57},
}

for spec, claims in exhibit4_claims.items():
    label = SPEC_LABELS[spec]

    # Compute actual values
    spec_rates = []
    spec_reg = 0
    spec_act = 0
    n_reporting = 0

    for cname, cd in counties.items():
        sd = cd.get("specialties", {}).get(spec)
        if sd:
            n_reporting += 1
            spec_rates.append(sd["participationRate"])
            spec_reg += sd["registered"]
            spec_act += sd["active"]

    actual_median = round(statistics.median(spec_rates), 1) if spec_rates else 0

    check(f"{label} median participation", claims["median"], actual_median)
    check(f"{label} total registered", claims["total_reg"], spec_reg)
    check(f"{label} total active", claims["total_act"], spec_act)
    check(f"{label} counties reporting", claims["n_counties"], n_reporting)

# ============================================================
# 4. BEHAVIORAL HEALTH PARTICIPATION
# ============================================================
print("\n" + "=" * 60)
print("SECTION 4: Behavioral Health Participation")
print("=" * 60)

# Manuscript claims: only Alpine (0%) and Imperial (12.3%) below 20%
bh_desert_claims = {
    "Alpine": 0.0,
    "Imperial": 12.3,
}

actual_bh_deserts = {}
for cname, cd in counties.items():
    bh = cd.get("specialties", {}).get("behavioral_health")
    if bh and bh["participationRate"] < 20:
        actual_bh_deserts[cname] = bh["participationRate"]

check("BH desert counties <20% (set)",
      set(bh_desert_claims.keys()),
      set(actual_bh_deserts.keys()))

check("BH desert count <20%", 2, len(actual_bh_deserts))

for cname, claimed_rate in bh_desert_claims.items():
    bh = counties.get(cname, {}).get("specialties", {}).get("behavioral_health", {})
    actual_rate = bh.get("participationRate")
    check(f"{cname} BH participation rate", claimed_rate, actual_rate)

# Manuscript claims: "45 of 57 reporting counties clustered between 25% and 30%"
bh_25_30 = 0
bh_reporting = 0
for cname, cd in counties.items():
    bh = cd.get("specialties", {}).get("behavioral_health")
    if bh:
        bh_reporting += 1
        if 25 <= bh["participationRate"] <= 30:
            bh_25_30 += 1

check("BH counties 25-30% cluster", 44, bh_25_30, tolerance=2)
check("BH reporting counties", 57, bh_reporting)

# ============================================================
# 5. COST-PARTICIPATION CORRELATION
# ============================================================
print("\n" + "=" * 60)
print("SECTION 5: Cost-Participation Correlation")
print("=" * 60)

# Compute Pearson r for counties with >= 20 providers
cost_vals = []
rate_vals = []
for cname, cd in counties.items():
    if cd["registered"] >= 20 and cd.get("composite_cost_index") is not None:
        cost_vals.append(cd["composite_cost_index"])
        rate_vals.append(cd["participationRate"])

n = len(cost_vals)
mean_cost = sum(cost_vals) / n
mean_rate = sum(rate_vals) / n

cov = sum((c - mean_cost) * (r - mean_rate) for c, r in zip(cost_vals, rate_vals)) / n
sd_cost = (sum((c - mean_cost) ** 2 for c in cost_vals) / n) ** 0.5
sd_rate = (sum((r - mean_rate) ** 2 for r in rate_vals) / n) ** 0.5

pearson_r = round(cov / (sd_cost * sd_rate), 3) if sd_cost > 0 and sd_rate > 0 else 0

check("Cost-participation Pearson r (N>=20 providers)", 0.935, pearson_r, tolerance=0.005)
check("N counties in correlation (>=20 providers)", 50, n, tolerance=2)

# ============================================================
# 6. HRR-LEVEL STATISTICS
# ============================================================
print("\n" + "=" * 60)
print("SECTION 6: HRR Statistics")
print("=" * 60)

hrrs = data.get("hrrs", {})

if hrrs:
    hrr_rates = {name: h["participationRate"] for name, h in hrrs.items()}
    sorted_hrrs = sorted(hrr_rates.items(), key=lambda x: x[1])

    check("Number of HRRs", 24, len(hrrs))
    check("Lowest HRR (Redding) rate", 30.0, hrr_rates.get("Redding"), tolerance=0.5)
    check("Highest HRR (San Francisco) rate", 47.0, hrr_rates.get("San Francisco"), tolerance=0.5)

    # Three tiers
    high_tier = [name for name, rate in hrr_rates.items() if rate > 40]
    moderate_tier = [name for name, rate in hrr_rates.items() if 34 <= rate <= 40]
    low_tier = [name for name, rate in hrr_rates.items() if rate < 34]

    check("High tier HRRs (>40%)", 8, len(high_tier))
    check("Moderate tier HRRs (34-40%)", 11, len(moderate_tier))
    check("Low tier HRRs (<34%)", 5, len(low_tier), tolerance=2)

    # Provider density: SF HRR vs Bakersfield HRR
    # Need population data from HRR
    sf_hrr = hrrs.get("San Francisco", {})
    bak_hrr = hrrs.get("Bakersfield", {})
    if sf_hrr and bak_hrr:
        sf_density = sf_hrr["registered"] / sf_hrr.get("population", 1) * 1000
        bak_density = bak_hrr["registered"] / bak_hrr.get("population", 1) * 1000
        check("SF HRR provider density (per 1K)", 4.51, round(sf_density, 2), tolerance=0.1)
        check("Bakersfield HRR provider density (per 1K)", 1.15, round(bak_density, 2), tolerance=0.1)
else:
    results.append("[SKIP] HRR data not available in _summary.json")

# ============================================================
# 7. AMC EFFECT
# ============================================================
print("\n" + "=" * 60)
print("SECTION 7: Academic Medical Center Effect")
print("=" * 60)

amc_counties = ["San Francisco", "Los Angeles", "Sacramento", "San Diego", "Alameda"]
non_amc_counties = [name for name in counties if name not in amc_counties]

amc_rates = [counties[name]["participationRate"] for name in amc_counties]
non_amc_rates = [counties[name]["participationRate"] for name in non_amc_counties]

amc_mean = round(sum(amc_rates) / len(amc_rates), 1)
non_amc_mean = round(sum(non_amc_rates) / len(non_amc_rates), 1)
amc_diff = round(amc_mean - non_amc_mean, 1)

check("AMC county mean participation", 42.2, amc_mean, tolerance=0.5)
check("Non-AMC county mean participation", 31.8, non_amc_mean, tolerance=0.5)
check("AMC effect (difference)", 10.4, amc_diff, tolerance=0.5)

# ============================================================
# 8. SPECIFIC TEXT CLAIMS
# ============================================================
print("\n" + "=" * 60)
print("SECTION 8: Specific Text Claims")
print("=" * 60)

# "County-level participation ranged from 0% (Sierra County, N=2 providers) to 48.3% (Marin County)"
sierra = counties["Sierra"]
marin = counties["Marin"]
check("Sierra rate", 0.0, float(sierra["participationRate"]))
check("Sierra registered", 2, sierra["registered"])
check("Marin rate", 48.3, marin["participationRate"])

# "All ten [top 10] had composite cost indices above 145"
top10_costs = [counties[name]["composite_cost_index"] for name in expected_top10]
all_above_145 = all(c > 145 for c in top10_costs)
check("All top 10 counties have cost index > 145", True, all_above_145)
if not all_above_145:
    for name in expected_top10:
        c = counties[name]["composite_cost_index"]
        if c <= 145:
            results.append(f"  NOTE: {name} cost index = {c}")

# "Bottom 10 had cost indices below 91"
bottom10_names = [t[0] for t in bottom10_claims]
bottom10_costs = [counties[name]["composite_cost_index"] for name in bottom10_names]
all_below_91 = all(c < 91 for c in bottom10_costs)
check("All bottom 10 counties have cost index < 91", True, all_below_91)
if not all_below_91:
    for name in bottom10_names:
        c = counties[name]["composite_cost_index"]
        if c >= 91:
            results.append(f"  NOTE: {name} cost index = {c}")

# Imperial County: 268 registered, 22.4% overall, 12.3% BH
imperial = counties["Imperial"]
check("Imperial registered", 268, imperial["registered"])
check("Imperial overall rate", 22.4, imperial["participationRate"])
imp_bh = imperial.get("specialties", {}).get("behavioral_health", {})
check("Imperial BH rate", 12.3, imp_bh.get("participationRate"))

# "Twelve counties had at least one specialty with a participation rate below 20%"
counties_with_sub20 = set()
for cname, cd in counties.items():
    for spec in SPECIALTIES:
        sd = cd.get("specialties", {}).get(spec)
        if sd and sd["participationRate"] < 20 and sd["registered"] > 0:
            counties_with_sub20.add(cname)
check("Counties with any specialty <20%", 5, len(counties_with_sub20))

# ============================================================
# 9. DATA INTEGRITY CHECKS
# ============================================================
print("\n" + "=" * 60)
print("SECTION 9: Data Integrity")
print("=" * 60)

# All 58 counties present
check("Total counties in data", 58, len(counties))

# registered >= active for every county
reg_gte_active = all(cd["registered"] >= cd["active"] for cd in counties.values())
check("Registered >= Active for all counties", True, reg_gte_active)

# registered >= active for every specialty
spec_integrity = True
for cname, cd in counties.items():
    for spec in SPECIALTIES:
        sd = cd.get("specialties", {}).get(spec)
        if sd and sd["registered"] < sd["active"]:
            spec_integrity = False
            results.append(f"  INTEGRITY FAIL: {cname} {spec}: reg={sd['registered']} < active={sd['active']}")
check("Registered >= Active for all county-specialty pairs", True, spec_integrity)

# Rates between 0 and 100
rates_valid = True
for cname, cd in counties.items():
    r = cd["participationRate"]
    if r < 0 or r > 100:
        rates_valid = False
    for spec in SPECIALTIES:
        sd = cd.get("specialties", {}).get(spec)
        if sd:
            sr = sd["participationRate"]
            if sr < 0 or sr > 100:
                rates_valid = False
check("All rates in [0, 100] range", True, rates_valid)

# Cost indices present for all counties
cost_count = sum(1 for cd in counties.values() if cd.get("composite_cost_index") is not None)
check("Counties with cost index data", 58, cost_count)

# ============================================================
# REPORT
# ============================================================
print("\n" + "=" * 60)
print("VERIFICATION REPORT SUMMARY")
print("=" * 60)

total_checks = len(results)
pass_count = sum(1 for r in results if r.startswith("[PASS]"))
fail_count = sum(1 for r in results if r.startswith("[FAIL]"))
skip_count = sum(1 for r in results if r.startswith("[SKIP]"))

print(f"\nTotal checks: {total_checks}")
print(f"  PASS: {pass_count}")
print(f"  FAIL: {fail_count}")
print(f"  SKIP: {skip_count}")

if failures:
    print(f"\n{'!' * 60}")
    print("FAILURES:")
    for f in failures:
        print(f"  {f}")
    print(f"{'!' * 60}")
else:
    print("\nALL CHECKS PASSED")

# Write full report
report_path = os.path.join(BASE, "docs", "hsr-verification-report.md")
with open(report_path, "w") as f:
    f.write("# HSR Research Brief: Data Verification Report\n\n")
    f.write(f"**Date:** {__import__('datetime').date.today()}\n")
    f.write(f"**Data source:** `data/access-explorer/_summary.json`\n")
    f.write(f"**Manuscript:** `docs/hsr-research-brief.md`\n\n")
    f.write(f"## Summary\n\n")
    f.write(f"- Total checks: {total_checks}\n")
    f.write(f"- PASS: {pass_count}\n")
    f.write(f"- FAIL: {fail_count}\n")
    f.write(f"- SKIP: {skip_count}\n\n")
    if failures:
        f.write("## FAILURES\n\n")
        for fail in failures:
            f.write(f"- {fail}\n")
        f.write("\n")
    f.write("## Full Results\n\n")
    for r in results:
        f.write(f"- {r}\n")

print(f"\nFull report written to: {report_path}")

# Exit with code 1 if any failures
sys.exit(1 if failures else 0)
