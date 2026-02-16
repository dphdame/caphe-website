#!/usr/bin/env python3
"""
QI (Quality Improvement) checks for Access Explorer data.

Validates data integrity, HRR crosswalk integrity, frontend data contracts,
and SVG map consistency before deployment.

Usage:
  python scripts/qi_access_explorer.py [--data-dir data/access-explorer/] [--svg public/tools/access-explorer/ca-counties.svg]
"""

import argparse
import json
import re
import sys
from pathlib import Path


class QIChecker:
    def __init__(self, data_dir: str, svg_path: str):
        self.data_dir = Path(data_dir)
        self.svg_path = Path(svg_path)
        self.results = []
        self.summary = None
        self.crosswalk = None

    def check(self, name: str, passed: bool, detail: str = ""):
        status = "PASS" if passed else "FAIL"
        self.results.append((status, name, detail))

    def load_data(self):
        """Load summary and crosswalk data."""
        summary_path = self.data_dir / "_summary.json"
        crosswalk_path = self.data_dir / "county_hrr_crosswalk.json"

        try:
            with open(summary_path) as f:
                self.summary = json.load(f)
            self.check("_summary.json exists and valid JSON", True)
        except FileNotFoundError:
            self.check("_summary.json exists and valid JSON", False, "File not found")
            return False
        except json.JSONDecodeError as e:
            self.check("_summary.json exists and valid JSON", False, str(e))
            return False

        try:
            with open(crosswalk_path) as f:
                self.crosswalk = json.load(f)
            self.check("county_hrr_crosswalk.json exists and valid JSON", True)
        except FileNotFoundError:
            self.check("county_hrr_crosswalk.json exists and valid JSON", False, "File not found")
            return False
        except json.JSONDecodeError as e:
            self.check("county_hrr_crosswalk.json exists and valid JSON", False, str(e))
            return False

        return True

    def check_data_integrity(self):
        """Check _summary.json data integrity."""
        counties = self.summary.get("counties", {})

        # All 58 counties present
        self.check(
            "All 58 counties present in _summary.json",
            len(counties) == 58,
            f"Found {len(counties)} counties"
        )

        # Participation rates between 0-100
        bad_rates = []
        for name, data in counties.items():
            rate = data.get("participationRate", -1)
            if rate < 0 or rate > 100:
                bad_rates.append(f"{name}: {rate}")
        self.check(
            "All participation rates between 0-100%",
            len(bad_rates) == 0,
            "; ".join(bad_rates) if bad_rates else ""
        )

        # registered >= active for every county
        bad_counts = []
        for name, data in counties.items():
            reg = data.get("registered", 0)
            act = data.get("active", 0)
            if reg < act:
                bad_counts.append(f"{name}: {reg} reg < {act} active")
        self.check(
            "registered >= active for every county",
            len(bad_counts) == 0,
            "; ".join(bad_counts) if bad_counts else ""
        )

        # No NaN or null values in required fields
        required_fields = ["participationRate", "registered", "active"]
        bad_values = []
        for name, data in counties.items():
            for field in required_fields:
                val = data.get(field)
                if val is None:
                    bad_values.append(f"{name}.{field} is null")
                elif isinstance(val, float) and (val != val):  # NaN check
                    bad_values.append(f"{name}.{field} is NaN")
        self.check(
            "No NaN or null values in required fields",
            len(bad_values) == 0,
            "; ".join(bad_values) if bad_values else ""
        )

    def check_crosswalk_integrity(self):
        """Check HRR crosswalk data integrity."""
        county_to_hrr = self.crosswalk.get("county_to_hrr", {})
        hrrs = self.crosswalk.get("hrrs", {})

        # All 58 counties mapped to an HRR
        self.check(
            "All 58 counties mapped to an HRR",
            len(county_to_hrr) == 58,
            f"Found {len(county_to_hrr)} county mappings"
        )

        # All 24 CA HRRs have at least 1 county
        empty_hrrs = [name for name, data in hrrs.items() if len(data.get("counties", [])) == 0]
        self.check(
            "All HRRs have at least 1 county",
            len(empty_hrrs) == 0,
            f"Empty HRRs: {empty_hrrs}" if empty_hrrs else f"{len(hrrs)} HRRs with counties"
        )

        # HRR population totals match sum of county populations
        bad_pops = []
        for hrr_name, hrr_data in hrrs.items():
            expected_pop = sum(CA_COUNTY_POPULATIONS.get(c, 0) for c in hrr_data.get("counties", []))
            actual_pop = hrr_data.get("population", 0)
            if expected_pop != actual_pop:
                bad_pops.append(f"{hrr_name}: expected {expected_pop}, got {actual_pop}")
        self.check(
            "HRR population totals match sum of county populations",
            len(bad_pops) == 0,
            "; ".join(bad_pops) if bad_pops else ""
        )

        # HRR aggregate rates match weighted county calculation (if hrrs key exists in summary)
        hrr_summary = self.summary.get("hrrs", {})
        if hrr_summary:
            counties_data = self.summary.get("counties", {})
            bad_rates = []
            for hrr_name, hrr_data in hrr_summary.items():
                hrr_counties = self.crosswalk["hrrs"].get(hrr_name, {}).get("counties", [])
                total_reg = sum(counties_data.get(c, {}).get("registered", 0) for c in hrr_counties)
                total_act = sum(counties_data.get(c, {}).get("active", 0) for c in hrr_counties)
                expected_rate = round(total_act / total_reg * 100, 1) if total_reg > 0 else 0
                actual_rate = hrr_data.get("participationRate", 0)
                if abs(expected_rate - actual_rate) > 0.15:
                    bad_rates.append(f"{hrr_name}: expected {expected_rate}, got {actual_rate}")
            self.check(
                "HRR aggregate rates match weighted county calculation",
                len(bad_rates) == 0,
                "; ".join(bad_rates) if bad_rates else ""
            )
        else:
            self.check(
                "HRR aggregate rates match weighted county calculation",
                False,
                "_summary.json missing 'hrrs' key (run build-access-data.py with --hrr-crosswalk)"
            )

    def check_frontend_contract(self):
        """Check frontend data contract."""
        # _summary.json has 'counties' key
        self.check(
            "_summary.json has 'counties' key",
            "counties" in self.summary,
        )

        # Every county in crosswalk exists in _summary.json
        counties_data = self.summary.get("counties", {})
        crosswalk_counties = set(self.crosswalk.get("county_to_hrr", {}).keys())
        summary_counties = set(counties_data.keys())
        missing = crosswalk_counties - summary_counties
        self.check(
            "Every county in crosswalk exists in _summary.json",
            len(missing) == 0,
            f"Missing: {sorted(missing)}" if missing else ""
        )

        extra = summary_counties - crosswalk_counties
        self.check(
            "Every county in _summary.json exists in crosswalk",
            len(extra) == 0,
            f"Extra: {sorted(extra)}" if extra else ""
        )

    def check_svg_integrity(self):
        """Check SVG map has all counties with matching names."""
        if not self.svg_path.exists():
            self.check("SVG file exists", False, str(self.svg_path))
            return

        svg_content = self.svg_path.read_text()

        # Count data-county attributes
        svg_counties = re.findall(r'data-county="([^"]+)"', svg_content)
        self.check(
            "58 data-county attributes in ca-counties.svg",
            len(svg_counties) == 58,
            f"Found {len(svg_counties)} data-county attributes"
        )

        # Every SVG county name matches _summary.json key
        summary_counties = set(self.summary.get("counties", {}).keys())
        svg_county_set = set(svg_counties)
        missing_in_summary = svg_county_set - summary_counties
        missing_in_svg = summary_counties - svg_county_set
        all_match = len(missing_in_summary) == 0 and len(missing_in_svg) == 0

        detail = ""
        if missing_in_summary:
            detail += f"In SVG but not summary: {sorted(missing_in_summary)}. "
        if missing_in_svg:
            detail += f"In summary but not SVG: {sorted(missing_in_svg)}."

        self.check(
            "Every SVG county name matches _summary.json key",
            all_match,
            detail
        )

    def run_all(self):
        """Run all QI checks."""
        print("=" * 60)
        print("  Access Explorer QI Checks")
        print("=" * 60)
        print()

        if not self.load_data():
            self.print_results()
            return False

        self.check_data_integrity()
        self.check_crosswalk_integrity()
        self.check_frontend_contract()
        self.check_svg_integrity()

        return self.print_results()

    def print_results(self):
        """Print results table, return True if all passed."""
        passed = sum(1 for s, _, _ in self.results if s == "PASS")
        failed = sum(1 for s, _, _ in self.results if s == "FAIL")

        for status, name, detail in self.results:
            icon = "+" if status == "PASS" else "X"
            line = f"  [{icon}] {name}"
            if detail:
                line += f"  ({detail})"
            print(line)

        print()
        print(f"  Results: {passed} passed, {failed} failed, {passed + failed} total")
        print("=" * 60)

        return failed == 0


# Inline population data to avoid import issues
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


def main():
    parser = argparse.ArgumentParser(description="QI checks for Access Explorer")
    parser.add_argument(
        "--data-dir",
        default="data/access-explorer/",
        help="Path to data directory",
    )
    parser.add_argument(
        "--svg",
        default="public/tools/access-explorer/ca-counties.svg",
        help="Path to SVG map file",
    )
    args = parser.parse_args()

    checker = QIChecker(args.data_dir, args.svg)

    all_passed = checker.run_all()
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
