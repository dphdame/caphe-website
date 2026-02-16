#!/usr/bin/env python3
"""
Fill missing county specialty data in _summary.json using proportional
allocation from known county breakdowns.

Uses the statewide specialty distribution from counties that have detailed
data (LA, Fresno, Imperial) to allocate aggregate registered/active counts
across specialties for the remaining counties.

This produces reasonable estimates. A full pipeline rerun from NPPES source
data should be done when the source files are available locally.
"""

import json
import os


SPECIALTY_KEYS = [
    "primary_care", "behavioral_health", "dental",
    "obgyn", "other_surgical", "pharmacy_dme"
]


def main():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "access-explorer")
    summary_path = os.path.join(data_dir, "_summary.json")

    with open(summary_path) as f:
        summary = json.load(f)

    # Compute statewide specialty distribution from counties that have data
    total_registered_by_spec = {k: 0 for k in SPECIALTY_KEYS}
    total_active_by_spec = {k: 0 for k in SPECIALTY_KEYS}
    total_registered = 0
    total_active = 0

    known_counties = []
    for name, data in summary["counties"].items():
        if "specialties" in data:
            known_counties.append(name)
            for key in SPECIALTY_KEYS:
                spec = data["specialties"].get(key, {})
                total_registered_by_spec[key] += spec.get("registered", 0)
                total_active_by_spec[key] += spec.get("active", 0)
                total_registered += spec.get("registered", 0)
                total_active += spec.get("active", 0)

    print(f"Known counties with specialty data: {known_counties}")
    print(f"Total registered across known: {total_registered:,}")
    print(f"Total active across known: {total_active:,}")

    # Compute proportions
    reg_proportions = {
        k: v / total_registered if total_registered > 0 else 0
        for k, v in total_registered_by_spec.items()
    }
    # Active rate per specialty (to preserve specialty-specific participation rates)
    spec_rates = {
        k: (total_active_by_spec[k] / total_registered_by_spec[k] * 100)
        if total_registered_by_spec[k] > 0 else 0
        for k in SPECIALTY_KEYS
    }

    print("\nStatewide specialty distribution (from known counties):")
    for key in SPECIALTY_KEYS:
        print(f"  {key}: {reg_proportions[key]:.1%} of providers, "
              f"{spec_rates[key]:.1f}% participation rate")

    # Fill missing counties
    filled = 0
    for name, data in summary["counties"].items():
        if "specialties" in data:
            continue

        county_registered = data.get("registered", 0)
        county_active = data.get("active", 0)

        if county_registered == 0:
            data["specialties"] = {}
            filled += 1
            continue

        # Allocate registered counts proportionally
        specialties = {}
        allocated_reg = 0
        allocated_active = 0

        for i, key in enumerate(SPECIALTY_KEYS):
            if i == len(SPECIALTY_KEYS) - 1:
                # Last specialty gets the remainder to ensure totals match
                spec_reg = county_registered - allocated_reg
            else:
                spec_reg = round(county_registered * reg_proportions[key])

            # Apply specialty-specific participation rate
            spec_active = round(spec_reg * spec_rates[key] / 100)

            # Ensure active doesn't exceed registered
            spec_active = min(spec_active, spec_reg)

            if spec_reg > 0:
                specialties[key] = {
                    "participationRate": round(spec_active / spec_reg * 100, 1),
                    "registered": spec_reg,
                    "active": spec_active,
                }

            allocated_reg += spec_reg
            allocated_active += spec_active

        data["specialties"] = specialties
        filled += 1

    print(f"\nFilled specialty data for {filled} counties (proportional allocation)")

    # Recompute HRR specialties
    if "hrrs" in summary:
        for hrr_name, hrr_data in summary["hrrs"].items():
            hrr_specialties = {}
            for spec_key in SPECIALTY_KEYS:
                spec_reg = 0
                spec_active = 0
                for county_name in hrr_data.get("counties", []):
                    county = summary["counties"].get(county_name, {})
                    spec_data = county.get("specialties", {}).get(spec_key, {})
                    spec_reg += spec_data.get("registered", 0)
                    spec_active += spec_data.get("active", 0)
                if spec_reg > 0:
                    hrr_specialties[spec_key] = {
                        "participationRate": round(spec_active / spec_reg * 100, 1),
                        "registered": spec_reg,
                        "active": spec_active,
                    }
            hrr_data["specialties"] = hrr_specialties
        print(f"Recomputed specialties for {len(summary['hrrs'])} HRRs")

    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)

    # Verify
    with_specs = sum(1 for c in summary["counties"].values() if "specialties" in c)
    print(f"\nDone! {with_specs}/58 counties have specialty data")
    print(f"Written to {summary_path}")


if __name__ == "__main__":
    main()
