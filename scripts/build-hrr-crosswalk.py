#!/usr/bin/env python3
"""
Build county-to-HRR (Hospital Referral Region) crosswalk for California.

Joins Dartmouth Atlas ZIP-HSA-HRR crosswalk with Census ZCTA-County relationship
to map each of California's 58 counties to one of 24 HRR healthcare markets.

Data sources:
  - Dartmouth Atlas ZipHsaHrr19.csv (ZIP → HRR mapping)
  - Census 2020 ZCTA-County Relationship File (ZCTA → County mapping)

Output:
  data/access-explorer/county_hrr_crosswalk.json

Usage:
  python scripts/build-hrr-crosswalk.py \
    --dartmouth /tmp/dartmouth/ZipHsaHrr19.csv \
    --zcta-county /tmp/zcta_county.txt \
    --output data/access-explorer/county_hrr_crosswalk.json
"""

import argparse
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

# California county FIPS codes → names (matches build-access-data.py)
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

# Manual overrides for border counties that don't have enough ZCTAs
# to map automatically, based on geographic proximity and referral patterns.
# Also preserves Palm Springs HRR which exists entirely within Riverside County
# but gets outweighed in area-based assignment by San Bernardino/San Diego ZCTAs
# covering Riverside's desert and western portions.
MANUAL_OVERRIDES = {
    "Del Norte": "Redding",                    # Nearest CA HRR geographically
    "Modoc": "Redding",                        # Nearest CA HRR geographically
    "Mono": "Los Angeles",                     # Mammoth referral patterns go south
    "Riverside": "Palm Springs/Rancho Mira",   # Preserves Dartmouth HRR #69
}


def load_dartmouth(path: str) -> dict:
    """Load Dartmouth ZIP-HRR crosswalk, return {zip5: (hrrnum, hrrcity)}."""
    zip_to_hrr = {}
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            state = row["hrrstate"]
            if state != "CA":
                continue
            zip5 = row["zipcode19"].zfill(5)
            hrrnum = int(row["hrrnum"])
            hrrcity = row["hrrcity"]
            zip_to_hrr[zip5] = (hrrnum, hrrcity)
    print(f"  Dartmouth: {len(zip_to_hrr)} CA ZIP-to-HRR mappings")
    return zip_to_hrr


def load_zcta_county(path: str) -> list:
    """Load Census ZCTA-County relationship, return list of (zcta, county_fips, area_land)."""
    rows = []
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter="|")
        for row in reader:
            zcta = row.get("GEOID_ZCTA5_20", "").strip()
            county_fips = row.get("GEOID_COUNTY_20", "").strip()
            area_land_str = row.get("AREALAND_PART", "0").strip()

            if not zcta or not county_fips:
                continue
            if not county_fips.startswith("06"):
                continue

            try:
                area_land = int(area_land_str)
            except ValueError:
                area_land = 0

            rows.append((zcta, county_fips, area_land))

    print(f"  Census: {len(rows)} ZCTA-to-CA-county mappings")
    return rows


def build_crosswalk(zip_to_hrr: dict, zcta_county: list) -> dict:
    """
    For each CA county, find the HRR containing the majority of its ZCTAs
    (weighted by land area from ZCTA-County file).
    """
    # county_fips -> {hrr_city: total_area}
    county_hrr_area = defaultdict(lambda: defaultdict(int))

    matched = 0
    unmatched = 0

    for zcta, county_fips, area_land in zcta_county:
        if zcta in zip_to_hrr:
            _, hrrcity = zip_to_hrr[zcta]
            county_hrr_area[county_fips][hrrcity] += area_land
            matched += 1
        else:
            unmatched += 1

    print(f"  Joined: {matched} matched, {unmatched} unmatched ZCTAs")

    # Assign each county to its dominant HRR
    county_to_hrr = {}
    for county_fips, hrr_areas in county_hrr_area.items():
        county_name = CA_COUNTY_FIPS.get(county_fips)
        if not county_name:
            continue
        dominant_hrr = max(hrr_areas.items(), key=lambda x: x[1])[0]
        county_to_hrr[county_name] = dominant_hrr

    # Apply manual overrides for unmapped or border counties
    for county_name, hrr_name in MANUAL_OVERRIDES.items():
        if county_name not in county_to_hrr:
            print(f"  Manual override: {county_name} -> {hrr_name} (unmapped)")
        else:
            print(f"  Manual override: {county_name} -> {hrr_name} (was {county_to_hrr[county_name]})")
        county_to_hrr[county_name] = hrr_name

    return county_to_hrr


def build_hrr_lookup(zip_to_hrr: dict) -> dict:
    """Build {hrr_city: hrrnum} lookup from Dartmouth data."""
    hrr_lookup = {}
    for _, (hrrnum, hrrcity) in zip_to_hrr.items():
        hrr_lookup[hrrcity] = hrrnum
    return hrr_lookup


def build_output(county_to_hrr: dict, hrr_lookup: dict) -> dict:
    """Build the final crosswalk JSON structure."""
    # Group counties by HRR
    hrr_counties = defaultdict(list)
    for county_name, hrr_name in sorted(county_to_hrr.items()):
        hrr_counties[hrr_name].append(county_name)

    # Build HRR entries
    hrrs = {}
    for hrr_name in sorted(hrr_counties.keys()):
        counties = sorted(hrr_counties[hrr_name])
        population = sum(CA_COUNTY_POPULATIONS.get(c, 0) for c in counties)
        hrrs[hrr_name] = {
            "hrrnum": hrr_lookup.get(hrr_name, 0),
            "counties": counties,
            "population": population,
        }

    # Build county-to-HRR flat lookup
    county_to_hrr_sorted = dict(sorted(county_to_hrr.items()))

    output = {
        "lastUpdated": "2026-03",
        "source": "Dartmouth Atlas ZipHsaHrr19 + Census 2020 ZCTA-County",
        "hrrs": hrrs,
        "county_to_hrr": county_to_hrr_sorted,
    }

    return output


def main():
    parser = argparse.ArgumentParser(
        description="Build county-to-HRR crosswalk for California"
    )
    parser.add_argument(
        "--dartmouth",
        default="/tmp/dartmouth/ZipHsaHrr19.csv",
        help="Path to Dartmouth ZipHsaHrr19.csv",
    )
    parser.add_argument(
        "--zcta-county",
        default="/tmp/zcta_county.txt",
        help="Path to Census ZCTA-County relationship file",
    )
    parser.add_argument(
        "--output",
        default="data/access-explorer/county_hrr_crosswalk.json",
        help="Output JSON file",
    )
    args = parser.parse_args()

    print("Loading Dartmouth ZIP-HRR crosswalk...")
    zip_to_hrr = load_dartmouth(args.dartmouth)

    print("Loading Census ZCTA-County relationship...")
    zcta_county = load_zcta_county(args.zcta_county)

    print("Building county-to-HRR crosswalk...")
    county_to_hrr = build_crosswalk(zip_to_hrr, zcta_county)
    hrr_lookup = build_hrr_lookup(zip_to_hrr)

    # Check coverage
    all_counties = set(CA_COUNTY_FIPS.values())
    mapped = set(county_to_hrr.keys())
    missing = all_counties - mapped
    if missing:
        print(f"\n  WARNING: {len(missing)} counties unmapped: {sorted(missing)}")
        sys.exit(1)

    print(f"\n  Mapped all {len(mapped)} counties to {len(set(county_to_hrr.values()))} HRRs")

    output = build_output(county_to_hrr, hrr_lookup)

    # Write output
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nOutput written to {output_path}")
    print(f"  {len(output['hrrs'])} HRRs")
    print(f"  {len(output['county_to_hrr'])} county mappings")

    # Summary table
    print("\nHRR Summary:")
    print(f"  {'HRR':<25} {'#':<6} {'Counties':<6} {'Population':>12}")
    print(f"  {'-'*25} {'-'*6} {'-'*6} {'-'*12}")
    for hrr_name, hrr_data in sorted(output["hrrs"].items()):
        print(
            f"  {hrr_name:<25} {hrr_data['hrrnum']:<6} "
            f"{len(hrr_data['counties']):<6} {hrr_data['population']:>12,}"
        )


if __name__ == "__main__":
    main()
