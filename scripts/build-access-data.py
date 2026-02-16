#!/usr/bin/env python3
"""
Build Medi-Cal Provider Access Explorer data from NPPES + HHS spending files.

This script:
1. Extracts California providers from NPPES monthly extract
2. Maps provider ZIP codes to counties via HUD crosswalk
3. Classifies providers into 6 specialty categories by taxonomy code
4. Identifies active providers from HHS Medicaid Provider Spending data
5. Computes participation rates, phantom gaps, and monthly trend indices
6. Outputs per-county JSON files + summary JSON for the Access Explorer

Prerequisites:
  pip install polars duckdb requests

Data files (not included in repo due to size):
  - NPPES NPI download: https://download.cms.gov/nppes/NPI_Files.html
  - HHS Medicaid spending: https://data.cms.gov/provider-summary-by-type-of-service/
  - HUD ZIP-County crosswalk: https://www.huduser.gov/portal/datasets/usps_crosswalk.html

Usage:
  python scripts/build-access-data.py \
    --nppes /path/to/npidata_pfile.csv \
    --spending /path/to/MUP_*.csv \
    --crosswalk /path/to/ZIP_COUNTY_*.xlsx \
    --output data/access-explorer/

Designed to run offline against ~11GB of source data. Not executed in CI/CD.
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    import polars as pl
except ImportError:
    print("Error: polars is required. Install with: pip install polars")
    sys.exit(1)


# ============ Taxonomy Code → Specialty Mapping ============

TAXONOMY_MAP = {
    "primary_care": [
        "207Q00000X",  # Family Medicine
        "207QA0505X",  # Family Medicine - Adult Medicine
        "208D00000X",  # General Practice
        "207R00000X",  # Internal Medicine
        "208000000X",  # Pediatrics
        "207RG0100X",  # Internal Medicine - Geriatric Medicine
        "363L00000X",  # Nurse Practitioner
        "363LA2200X",  # Nurse Practitioner - Adult Health
        "363LF0000X",  # Nurse Practitioner - Family
        "363LP0200X",  # Nurse Practitioner - Pediatrics
    ],
    "behavioral_health": [
        "2084P0800X",  # Psychiatry
        "103T00000X",  # Psychologist
        "103TA0400X",  # Psychologist - Addiction
        "103TC0700X",  # Psychologist - Clinical
        "104100000X",  # Social Worker
        "1041C0700X",  # Social Worker - Clinical
        "106H00000X",  # Marriage & Family Therapist
        "101YM0800X",  # Counselor - Mental Health
        "101YA0400X",  # Counselor - Addiction
        "363LP0808X",  # Nurse Practitioner - Psychiatric
    ],
    "dental": [
        "1223G0001X",  # General Dentistry
        "1223P0221X",  # Pediatric Dentistry
        "1223S0112X",  # Oral Surgery
        "1223X0400X",  # Orthodontics
        "1223E0200X",  # Endodontics
        "1223P0106X",  # Periodontics
        "124Q00000X",  # Dental Hygienist
    ],
    "obgyn": [
        "207V00000X",  # OB/GYN
        "207VB0002X",  # OB/GYN - Bariatric
        "207VM0101X",  # OB/GYN - Maternal-Fetal
        "207VX0201X",  # OB/GYN - Gynecologic Oncology
        "176B00000X",  # Midwife
    ],
    "other_surgical": [
        "208600000X",  # Surgery
        "207X00000X",  # Orthopedic Surgery
        "207W00000X",  # Ophthalmology
        "207Y00000X",  # Otolaryngology
        "208800000X",  # Urology
        "207T00000X",  # Neurological Surgery
        "208G00000X",  # Thoracic Surgery
    ],
    "pharmacy_dme": [
        "183500000X",  # Pharmacist
        "3336C0003X",  # Community Pharmacy
        "332B00000X",  # DME Supplier
        "335E00000X",  # Prosthetic/Orthotic Supplier
    ],
}

# Invert for lookup: taxonomy_code -> specialty
TAXONOMY_LOOKUP = {}
for specialty, codes in TAXONOMY_MAP.items():
    for code in codes:
        TAXONOMY_LOOKUP[code] = specialty

SPECIALTY_LABELS = {
    "primary_care": "Primary Care",
    "behavioral_health": "Behavioral Health",
    "dental": "Dental",
    "obgyn": "OB/GYN",
    "other_surgical": "Other Surgical",
    "pharmacy_dme": "Pharmacy & DME",
}


def load_nppes(nppes_path: str) -> pl.DataFrame:
    """Load NPPES data, filter to CA, classify by specialty."""
    print(f"Loading NPPES from {nppes_path}...")

    # NPPES is a large CSV (~8GB). Use lazy evaluation.
    nppes = pl.scan_csv(
        nppes_path,
        infer_schema_length=10000,
        ignore_errors=True,
    ).filter(
        # California providers only
        (pl.col("Provider Business Practice Location Address State Name") == "CA")
        & (pl.col("NPI Deactivation Date").is_null())  # Active NPIs only
    ).select([
        "NPI",
        pl.col("Provider Business Practice Location Address Postal Code").alias("zip_code"),
        pl.col("Healthcare Provider Taxonomy Code_1").alias("taxonomy_code"),
    ]).collect()

    print(f"  CA providers with active NPIs: {len(nppes):,}")

    # Clean ZIP codes to 5 digits
    nppes = nppes.with_columns(
        pl.col("zip_code").str.slice(0, 5).alias("zip5")
    )

    # Map taxonomy codes to specialties
    taxonomy_series = nppes["taxonomy_code"].to_list()
    specialties = [TAXONOMY_LOOKUP.get(t, None) for t in taxonomy_series]
    nppes = nppes.with_columns(
        pl.Series("specialty", specialties)
    ).filter(pl.col("specialty").is_not_null())

    print(f"  After specialty classification: {len(nppes):,}")
    return nppes


def load_crosswalk(crosswalk_path: str) -> pl.DataFrame:
    """Load HUD ZIP-to-county crosswalk."""
    print(f"Loading ZIP-county crosswalk from {crosswalk_path}...")

    xwalk = pl.read_excel(crosswalk_path)

    # Keep the county assignment with highest residential ratio
    xwalk = xwalk.sort("RES_RATIO", descending=True).group_by("ZIP").first()

    xwalk = xwalk.select([
        pl.col("ZIP").alias("zip5"),
        pl.col("COUNTY").alias("county_fips"),
        pl.col("USPS_ZIP_PREF_CITY").alias("city"),
    ])

    print(f"  ZIP-county mappings: {len(xwalk):,}")
    return xwalk


def load_spending(spending_path: str) -> pl.DataFrame:
    """Load HHS Medicaid Provider Spending data, filter to CA."""
    print(f"Loading HHS Medicaid spending from {spending_path}...")

    spending = pl.scan_csv(
        spending_path,
        infer_schema_length=10000,
        ignore_errors=True,
    ).filter(
        pl.col("Rndrng_Prvdr_State_Abrvtn") == "CA"
    ).select([
        pl.col("Rndrng_NPI").cast(pl.Utf8).alias("NPI"),
        pl.col("Year").alias("year"),
    ]).collect()

    # Deduplicate: one row per NPI per year
    spending = spending.unique(subset=["NPI", "year"])

    print(f"  CA Medicaid billing records: {len(spending):,}")
    return spending


# California county FIPS codes → names
CA_COUNTY_FIPS = {
    "06001": "Alameda", "06003": "Alpine", "06005": "Amador",
    "06007": "Butte", "06009": "Calaveras", "06011": "Colusa",
    "06013": "Contra Costa", "06015": "Del Norte", "06017": "El Dorado",
    "06019": "Fresno", "06021": "Glenn", "06023": "Humboldt",
    "06025": "Imperial", "06027": "Inyo", "06029": "Kern",
    "06031": "Kings", "06033": "Lake", "06035": "Lassen",
    "06037": "Los Angeles", "06039": "Madera", "06041": "Marin",
    "06043": "Mariposa", "06045": "Mendocino", "06047": "Merced",
    "06049": "Modoc", "06051": "Mono", "06053": "Monterey",
    "06055": "Napa", "06057": "Nevada", "06059": "Orange",
    "06061": "Placer", "06063": "Plumas", "06065": "Riverside",
    "06067": "Sacramento", "06069": "San Benito", "06071": "San Bernardino",
    "06073": "San Diego", "06075": "San Francisco", "06077": "San Joaquin",
    "06079": "San Luis Obispo", "06081": "San Mateo",
    "06083": "Santa Barbara", "06085": "Santa Clara", "06087": "Santa Cruz",
    "06089": "Shasta", "06091": "Sierra", "06093": "Siskiyou",
    "06095": "Solano", "06097": "Sonoma", "06099": "Stanislaus",
    "06101": "Sutter", "06103": "Tehama", "06105": "Trinity",
    "06107": "Tulare", "06109": "Tuolumne", "06111": "Ventura",
    "06113": "Yolo", "06115": "Yuba",
}

CA_COUNTY_POPULATIONS = {
    "Alameda": 1682353, "Alpine": 1204, "Amador": 41259,
    "Butte": 211632, "Calaveras": 46221, "Colusa": 22280,
    "Contra Costa": 1165927, "Del Norte": 27743, "El Dorado": 193221,
    "Fresno": 1013581, "Glenn": 29316, "Humboldt": 136463,
    "Imperial": 179851, "Inyo": 18584, "Kern": 909235,
    "Kings": 153443, "Lake": 68766, "Lassen": 33159,
    "Los Angeles": 9721138, "Madera": 160089, "Marin": 262321,
    "Mariposa": 17131, "Mendocino": 91305, "Merced": 286461,
    "Modoc": 8700, "Mono": 13247, "Monterey": 439035,
    "Napa": 138019, "Nevada": 103487, "Orange": 3186989,
    "Placer": 412300, "Plumas": 19790, "Riverside": 2470546,
    "Sacramento": 1585055, "San Benito": 66677, "San Bernardino": 2194710,
    "San Diego": 3298634, "San Francisco": 808437, "San Joaquin": 789410,
    "San Luis Obispo": 283111, "San Mateo": 764442,
    "Santa Barbara": 448229, "Santa Clara": 1936259, "Santa Cruz": 270861,
    "Shasta": 182155, "Sierra": 3236, "Siskiyou": 44076,
    "Solano": 451716, "Sonoma": 488863, "Stanislaus": 552999,
    "Sutter": 99063, "Tehama": 65829, "Trinity": 16060,
    "Tulare": 477054, "Tuolumne": 55810, "Ventura": 839784,
    "Yolo": 216403, "Yuba": 81575,
}


def build_county_data(
    nppes: pl.DataFrame,
    spending: pl.DataFrame,
    crosswalk: pl.DataFrame,
    output_dir: str,
    affordability: dict | None = None,
):
    """Build per-county JSON files and summary."""
    print("\nBuilding county-level data...")

    # Join NPPES with crosswalk to get county
    providers = nppes.join(crosswalk, on="zip5", how="left")

    # Map FIPS to county name
    fips_list = providers["county_fips"].to_list()
    county_names = [CA_COUNTY_FIPS.get(f, None) for f in fips_list]
    providers = providers.with_columns(
        pl.Series("county", county_names)
    ).filter(pl.col("county").is_not_null())

    # Mark active providers (those with Medicaid billing)
    active_npis = set(spending["NPI"].to_list())
    npi_list = providers["NPI"].to_list()
    is_active = [npi in active_npis for npi in npi_list]
    providers = providers.with_columns(
        pl.Series("is_active", is_active)
    )

    print(f"  Providers mapped to counties: {len(providers):,}")
    print(f"  Active (billing Medicaid): {sum(is_active):,}")

    # Aggregate by county × specialty
    summary_counties = {}
    alerts = []

    os.makedirs(output_dir, exist_ok=True)

    for county_name in sorted(CA_COUNTY_FIPS.values()):
        county_df = providers.filter(pl.col("county") == county_name)

        if len(county_df) == 0:
            continue

        specialties = {}
        total_registered = 0
        total_active = 0

        for spec_key in TAXONOMY_MAP.keys():
            spec_df = county_df.filter(pl.col("specialty") == spec_key)
            registered = len(spec_df)
            active = spec_df.filter(pl.col("is_active"))
            active_count = len(active)

            if registered == 0:
                continue

            rate = round(active_count / registered * 100, 1)

            specialties[spec_key] = {
                "label": SPECIALTY_LABELS[spec_key],
                "registered": registered,
                "active": active_count,
                "participationRate": rate,
                "phantomGap": registered - active_count,
                "changeFrom2019": 0.0,  # TODO: compute from monthly data
            }

            total_registered += registered
            total_active += active_count

            # Flag alerts
            if rate < 15:
                alerts.append({
                    "county": county_name,
                    "specialty": spec_key,
                    "rate": rate,
                    "type": "critical",
                })
            elif rate == 0 and registered > 0:
                alerts.append({
                    "county": county_name,
                    "specialty": spec_key,
                    "rate": 0,
                    "type": "no_providers",
                })

        overall_rate = round(total_active / total_registered * 100, 1) if total_registered > 0 else 0

        # Build county JSON
        county_data = {
            "county": county_name,
            "population": CA_COUNTY_POPULATIONS.get(county_name, 0),
            "lastUpdated": "2024-12",  # Update with actual data date
            "stateMedians": {},  # Computed after all counties processed
            "specialties": specialties,
            "trends": {
                "months": [],  # TODO: build from monthly spending data
            },
        }

        # Merge affordability data if available
        if affordability:
            county_fips = next(
                (k for k, v in CA_COUNTY_FIPS.items() if v == county_name), None
            )
            aff_counties = affordability.get("counties", {})
            if county_fips and county_fips in aff_counties:
                aff = aff_counties[county_fips]
                county_data["affordability"] = {
                    "year": int(affordability.get("lastUpdated", 2022)),
                    "per_capita_income": aff.get("per_capita_income"),
                    "healthcare_avg_weekly_wage": aff.get("healthcare_avg_weekly_wage"),
                    "allind_avg_weekly_wage": aff.get("allind_avg_weekly_wage"),
                    "fmr_2br": aff.get("fmr_2br"),
                    "income_index": aff.get("income_index"),
                    "wage_index": aff.get("wage_index"),
                    "rent_index": aff.get("rent_index"),
                    "purchased_services_index": aff.get("purchased_services_index"),
                    "composite_cost_index": aff.get("composite_cost_index"),
                    "composite_weights": affordability.get("methodology", {}).get(
                        "composite_weights",
                        {"healthcare_wages": 0.56, "facility_rent": 0.30, "purchased_services": 0.14}
                    ),
                    "effective_reimbursement_index": aff.get("effective_reimbursement_index"),
                    "medicare_actual_pc": aff.get("medicare_actual_pc"),
                    "medicare_standardized_pc": aff.get("medicare_standardized_pc"),
                    "medicare_gap_pct": aff.get("medicare_gap_pct"),
                    "dual_eligible_pct": aff.get("dual_eligible_pct"),
                }

        # Write county file
        file_name = county_name.lower().replace(" ", "_")
        output_path = os.path.join(output_dir, f"{file_name}.json")
        with open(output_path, "w") as f:
            json.dump(county_data, f, indent=2)

        summary_counties[county_name] = {
            "participationRate": overall_rate,
            "registered": total_registered,
            "active": total_active,
            "specialties": {
                key: {
                    "participationRate": spec["participationRate"],
                    "registered": spec["registered"],
                    "active": spec["active"],
                }
                for key, spec in specialties.items()
            },
        }

        # Add affordability to summary
        if affordability:
            county_fips = next(
                (k for k, v in CA_COUNTY_FIPS.items() if v == county_name), None
            )
            aff_counties = affordability.get("counties", {})
            if county_fips and county_fips in aff_counties:
                aff = aff_counties[county_fips]
                summary_counties[county_name]["composite_cost_index"] = aff.get("composite_cost_index")
                summary_counties[county_name]["effective_reimbursement_index"] = aff.get("effective_reimbursement_index")

        print(f"  {county_name}: {total_registered} registered, {total_active} active ({overall_rate}%)")

    # Build summary JSON
    summary = {
        "lastUpdated": "2024-12",
        "counties": summary_counties,
        "alerts": alerts,
    }

    summary_path = os.path.join(output_dir, "_summary.json")
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)

    print(f"\nOutput: {len(summary_counties)} county files + _summary.json")
    print(f"Alerts: {len(alerts)} critical access gaps identified")

    return summary_counties


def build_hrr_summary(summary_counties, crosswalk_path):
    """Aggregate county data into HRR-level summaries."""
    with open(crosswalk_path) as f:
        crosswalk = json.load(f)

    hrr_summary = {}
    for hrr_name, hrr_data in crosswalk["hrrs"].items():
        total_reg = sum(
            summary_counties.get(c, {}).get("registered", 0)
            for c in hrr_data["counties"]
        )
        total_active = sum(
            summary_counties.get(c, {}).get("active", 0)
            for c in hrr_data["counties"]
        )
        rate = round(total_active / total_reg * 100, 1) if total_reg > 0 else 0

        # Aggregate per-specialty data across counties in this HRR
        hrr_specialties = {}
        for spec_key in TAXONOMY_MAP.keys():
            spec_reg = sum(
                summary_counties.get(c, {}).get("specialties", {}).get(spec_key, {}).get("registered", 0)
                for c in hrr_data["counties"]
            )
            spec_active = sum(
                summary_counties.get(c, {}).get("specialties", {}).get(spec_key, {}).get("active", 0)
                for c in hrr_data["counties"]
            )
            if spec_reg > 0:
                hrr_specialties[spec_key] = {
                    "participationRate": round(spec_active / spec_reg * 100, 1),
                    "registered": spec_reg,
                    "active": spec_active,
                }

        hrr_summary[hrr_name] = {
            "participationRate": rate,
            "registered": total_reg,
            "active": total_active,
            "population": hrr_data["population"],
            "counties": hrr_data["counties"],
            "specialties": hrr_specialties,
        }

    print(f"\nHRR aggregation: {len(hrr_summary)} HRRs from {len(summary_counties)} counties")
    return hrr_summary


def main():
    parser = argparse.ArgumentParser(
        description="Build Medi-Cal Provider Access Explorer data"
    )
    parser.add_argument("--nppes", required=True, help="Path to NPPES NPI CSV")
    parser.add_argument("--spending", required=True, help="Path to HHS Medicaid spending CSV")
    parser.add_argument("--crosswalk", required=True, help="Path to HUD ZIP-County crosswalk XLSX")
    parser.add_argument("--output", default="data/access-explorer/", help="Output directory")
    parser.add_argument("--affordability", default=None,
                        help="Path to affordability.json from build-coli-data.py")
    parser.add_argument("--hrr-crosswalk", default=None,
                        help="Path to county_hrr_crosswalk.json for HRR aggregation")

    args = parser.parse_args()

    nppes = load_nppes(args.nppes)
    crosswalk = load_crosswalk(args.crosswalk)
    spending = load_spending(args.spending)

    # Load affordability data if provided
    affordability = None
    if args.affordability and os.path.exists(args.affordability):
        print(f"Loading affordability data from {args.affordability}...")
        with open(args.affordability) as f:
            affordability = json.load(f)
        print(f"  {len(affordability.get('counties', {}))} counties with affordability data")

    summary_counties = build_county_data(
        nppes, spending, crosswalk, args.output, affordability=affordability
    )

    # Add HRR aggregation to _summary.json if crosswalk provided
    if args.hrr_crosswalk and os.path.exists(args.hrr_crosswalk):
        hrr_summary = build_hrr_summary(summary_counties, args.hrr_crosswalk)

        summary_path = os.path.join(args.output, "_summary.json")
        with open(summary_path) as f:
            summary = json.load(f)
        summary["hrrs"] = hrr_summary
        with open(summary_path, "w") as f:
            json.dump(summary, f, indent=2)
        print(f"  Added {len(hrr_summary)} HRRs to _summary.json")

    print("\nDone! Run the local server to verify: node src/backend/server.js")


if __name__ == "__main__":
    main()
