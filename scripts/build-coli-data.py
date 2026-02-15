#!/usr/bin/env python3
"""
Build county-level affordability data for the Medi-Cal Provider Access Explorer.

Downloads and merges BEA personal income, BLS QCEW wages (healthcare + all-industry),
HUD Fair Market Rents, and CMS Medicare Geographic Variation into a composite
cost-of-living index with GPCI-aligned weights.

Composite weights (derived from Medicare PE GPCI sub-component cost shares):
  56% healthcare employee wages (NAICS 62)
  30% facility rent (HUD FMR 2BR)
  14% purchased services proxy (all-industry wages)

Sources:
  - CMS CY 2026 PFS Final Rule, 90 FR 49266
  - CMS, "Draft Report on the Sixth GPCI Update," November 2010
  - AMA, "Geographic Practice Cost Indices (GPCIs)" reference document

Prerequisites:
  pip install polars requests openpyxl

Usage:
  python scripts/build-coli-data.py \\
    --bea-key YOUR_API_KEY \\
    --years 2017,2018,2019,2020,2021,2022 \\
    --state CA \\
    --output data/access-explorer/affordability/ \\
    --validate

  # With pre-downloaded files:
  python scripts/build-coli-data.py \\
    --bea-key YOUR_API_KEY \\
    --qcew-dir /path/to/qcew/ \\
    --hud-dir /path/to/hud/ \\
    --cms-file /path/to/medicare_geo_variation.csv \\
    --output data/access-explorer/affordability/ \\
    --validate
"""

import argparse
import csv
import io
import json
import os
import sys
import zipfile
from pathlib import Path

try:
    import polars as pl
except ImportError:
    print("Error: polars is required. Install with: pip install polars")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("Error: requests is required. Install with: pip install requests")
    sys.exit(1)

# Add scripts dir to path for qi_checks import
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from qi_checks import QIRunner

# GPCI-aligned composite weights
# Source: Medicare PE GPCI sub-component cost shares (2006-based MEI)
# Employee wages: 19.15% → 55.6% of adjusted PE → 56%
# Office rent: 10.22% → 29.7% of adjusted PE → 30%
# Purchased services: ~5.07% → 14.7% of adjusted PE → 14%
WEIGHT_WAGES = 0.56
WEIGHT_RENT = 0.30
WEIGHT_PURCHASED = 0.14

# Fallback weights when HUD FMR data unavailable
WEIGHT_WAGES_NO_RENT = 0.80
WEIGHT_PURCHASED_NO_RENT = 0.20

STATE_FIPS = {
    "CA": "06", "NY": "36", "TX": "48", "FL": "12",
}

# California county FIPS → name mapping
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


# ============================================================
# Module 1: BEA Per Capita Personal Income
# ============================================================

def fetch_bea_income(api_key: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Fetch CAINC1 LineCode=3 (per capita personal income) for all counties in state.

    Note: Per capita income is a SUPPLEMENTARY variable (demand-side).
    It does NOT enter the composite cost index (see Evidence Decision 3).
    """
    print("Fetching BEA per capita personal income...")
    year_str = ",".join(str(y) for y in years)
    url = (
        f"https://apps.bea.gov/api/data?"
        f"method=GetData&DataSetName=Regional"
        f"&TableName=CAINC1&LineCode=3&GeoFips=COUNTY"
        f"&Year={year_str}&ResultFormat=JSON"
        f"&UserID={api_key}"
    )

    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    data = resp.json()

    if "BEAAPI" not in data or "Results" not in data["BEAAPI"]:
        raise ValueError(f"BEA API error: {data}")

    rows = data["BEAAPI"]["Results"]["Data"]
    records = []
    for row in rows:
        fips = row.get("GeoFips", "")
        if not fips.startswith(state_fips) or len(fips) != 5:
            continue
        val = row.get("DataValue", "")
        if val in ("(NA)", "(D)", ""):
            continue
        val = val.replace(",", "")
        try:
            records.append({
                "county_fips": fips,
                "year": int(row["TimePeriod"]),
                "per_capita_income": float(val),
            })
        except (ValueError, KeyError):
            continue

    df = pl.DataFrame(records)
    print(f"  BEA income: {len(df)} county-year records")
    return df


# ============================================================
# Module 2: BLS QCEW Healthcare Wages (NAICS 62)
# ============================================================

def fetch_qcew_healthcare_wages(
    years: list[int], state_fips: str, qcew_dir: str | None
) -> pl.DataFrame:
    """
    Fetch/load QCEW annual averages for NAICS 62 (Healthcare and Social Assistance).

    GPCI analog: PE employee wage sub-index
    Composite weight: 56% (GPCI normalized: 55.6%)

    Evidence: MGMA (2025): 65% of practice leaders identify labor as biggest cost
    driver. Kaufman Hall (2024): labor = 84% of medical group expenses.
    """
    print("Loading QCEW healthcare wages (NAICS 62)...")
    all_records = []

    for year in years:
        if qcew_dir:
            csv_path = _find_qcew_file(qcew_dir, year)
            if csv_path is None:
                print(f"  WARNING: No QCEW file found for {year} in {qcew_dir}")
                continue
            records = _parse_qcew_csv(csv_path, state_fips, "62", 74, year)
        else:
            records = _download_qcew_year(year, state_fips, "62", 74)
        all_records.extend(records)
        print(f"  {year}: {len(records)} county records for NAICS 62")

    df = pl.DataFrame(all_records)
    df = df.rename({
        "avg_weekly_wage": "healthcare_avg_weekly_wage",
        "avg_annual_pay": "healthcare_avg_annual_pay",
        "annual_avg_emplvl": "healthcare_employment",
        "annual_avg_estabs": "healthcare_estabs",
    })
    print(f"  QCEW healthcare: {len(df)} total county-year records")
    return df


# ============================================================
# Module 3: BLS QCEW All-Industry Wages (Purchased Services Proxy)
# ============================================================

def fetch_qcew_allind_wages(
    years: list[int], state_fips: str, qcew_dir: str | None
) -> pl.DataFrame:
    """
    Fetch/load QCEW annual averages for all industries (total).
    Proxies the purchased services component.

    GPCI analog: PE purchased services sub-index
    Composite weight: 14% (GPCI normalized: 14.7%)
    """
    print("Loading QCEW all-industry wages (purchased services proxy)...")
    all_records = []

    for year in years:
        if qcew_dir:
            csv_path = _find_qcew_file(qcew_dir, year)
            if csv_path is None:
                continue
            records = _parse_qcew_csv(csv_path, state_fips, "10", 70, year)
        else:
            records = _download_qcew_year(year, state_fips, "10", 70)
        all_records.extend(records)
        print(f"  {year}: {len(records)} county records for all industries")

    df = pl.DataFrame(all_records)
    df = df.rename({
        "avg_weekly_wage": "allind_avg_weekly_wage",
    })
    df = df.select(["county_fips", "year", "allind_avg_weekly_wage"])
    print(f"  QCEW all-industry: {len(df)} total county-year records")
    return df


def _find_qcew_file(qcew_dir: str, year: int) -> str | None:
    """Find the QCEW annual singlefile CSV for a given year."""
    candidates = [
        os.path.join(qcew_dir, f"{year}.annual.singlefile.csv"),
        os.path.join(qcew_dir, f"{year}_annual_singlefile.csv"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None


def _download_qcew_year(
    year: int, state_fips: str, industry_code: str, agglvl_code: int
) -> list[dict]:
    """Download and parse QCEW annual averages ZIP for one year."""
    url = f"https://data.bls.gov/cew/data/files/{year}/csv/{year}_annual_singlefile.zip"
    print(f"  Downloading QCEW {year} from {url}...")
    resp = requests.get(url, timeout=300, stream=True)
    resp.raise_for_status()

    records = []
    with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
        csv_names = [n for n in zf.namelist() if n.endswith(".csv")]
        if not csv_names:
            print(f"  WARNING: No CSV found in QCEW ZIP for {year}")
            return records
        with zf.open(csv_names[0]) as f:
            reader = csv.DictReader(io.TextIOWrapper(f, encoding="utf-8"))
            for row in reader:
                if (
                    row.get("industry_code", "").strip() == industry_code
                    and row.get("own_code", "").strip() == "0"
                    and row.get("agglvl_code", "").strip() == str(agglvl_code)
                    and row.get("size_code", "").strip() == "0"
                    and row.get("area_fips", "").startswith(state_fips)
                    and row.get("disclosure_code", "").strip() == ""
                ):
                    try:
                        records.append({
                            "county_fips": row["area_fips"].strip(),
                            "year": year,
                            "avg_weekly_wage": float(row.get("avg_wkly_wage", 0)),
                            "avg_annual_pay": float(row.get("avg_annual_pay", 0)),
                            "annual_avg_emplvl": int(row.get("annual_avg_emplvl", 0)),
                            "annual_avg_estabs": int(row.get("annual_avg_estabs_count", 0)),
                        })
                    except (ValueError, KeyError):
                        continue
    return records


def _parse_qcew_csv(
    csv_path: str, state_fips: str, industry_code: str, agglvl_code: int, year: int
) -> list[dict]:
    """Parse a local QCEW annual singlefile CSV."""
    records = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if (
                row.get("industry_code", "").strip() == industry_code
                and row.get("own_code", "").strip() == "0"
                and row.get("agglvl_code", "").strip() == str(agglvl_code)
                and row.get("size_code", "").strip() == "0"
                and row.get("area_fips", "").startswith(state_fips)
                and row.get("disclosure_code", "").strip() == ""
            ):
                try:
                    records.append({
                        "county_fips": row["area_fips"].strip(),
                        "year": year,
                        "avg_weekly_wage": float(row.get("avg_wkly_wage", 0)),
                        "avg_annual_pay": float(row.get("avg_annual_pay", 0)),
                        "annual_avg_emplvl": int(row.get("annual_avg_emplvl", 0)),
                        "annual_avg_estabs": int(row.get("annual_avg_estabs_count", 0)),
                    })
                except (ValueError, KeyError):
                    continue
    return records


# ============================================================
# Module 4: HUD Fair Market Rents
# ============================================================

def load_hud_fmr(hud_dir: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Load HUD FMR Excel files. Use 2-bedroom FMR as standard.

    GPCI analog: PE office rent sub-index
    Composite weight: 30% (GPCI normalized: 29.7%)

    FY alignment: HUD FY2022 is effective Oct 2021.
    Calendar year 2017 → FY2018 FMR, etc.
    """
    print("Loading HUD Fair Market Rents...")
    all_records = []

    for cal_year in years:
        fy = cal_year + 1  # Calendar 2017 → FY2018
        excel_files = list(Path(hud_dir).glob(f"*{fy}*FMR*.xlsx")) + \
                      list(Path(hud_dir).glob(f"*{fy}*fmr*.xlsx")) + \
                      list(Path(hud_dir).glob(f"FY{fy}*.xlsx"))
        if not excel_files:
            print(f"  WARNING: No HUD FMR file found for FY{fy} in {hud_dir}")
            continue

        try:
            df = pl.read_excel(str(excel_files[0]))
        except Exception as e:
            print(f"  WARNING: Could not read {excel_files[0]}: {e}")
            continue

        # HUD FMR files have varying column names
        fips_col = None
        fmr_col = None
        for col in df.columns:
            if "fips" in col.lower() or col == "fips2010" or col == "county_code":
                fips_col = col
            if "fmr_2" in col.lower() or col.lower() in ("fmr2", "fmr_2br", "two_bedroom"):
                fmr_col = col

        if fips_col is None or fmr_col is None:
            print(f"  WARNING: Could not identify FIPS/FMR columns in {excel_files[0]}")
            print(f"    Available columns: {df.columns}")
            continue

        for row in df.iter_rows(named=True):
            fips = str(row[fips_col]).zfill(5)[:5]
            if not fips.startswith(state_fips):
                continue
            try:
                all_records.append({
                    "county_fips": fips,
                    "year": cal_year,
                    "fmr_2br": float(row[fmr_col]),
                })
            except (ValueError, TypeError):
                continue

        print(f"  FY{fy} (cal {cal_year}): {sum(1 for r in all_records if r['year'] == cal_year)} county records")

    if not all_records:
        print("  No HUD FMR data loaded")
        return pl.DataFrame({"county_fips": [], "year": [], "fmr_2br": []})

    df = pl.DataFrame(all_records)
    # Keep highest ratio county assignment if duplicates (metro vs non-metro areas)
    df = df.sort("fmr_2br", descending=True).unique(subset=["county_fips", "year"], keep="first")
    print(f"  HUD FMR: {len(df)} total county-year records")
    return df


# ============================================================
# Module 5: CMS Medicare Geographic Variation
# ============================================================

def load_cms_medicare(cms_file: str, years: list[int], state_fips: str) -> pl.DataFrame:
    """
    Load CMS Medicare Geographic Variation CSV.

    NOT a composite component — provides Medicare comparison benchmark.
    Shows what geographic adjustment looks like when applied (Medicaid doesn't have this).
    """
    print(f"Loading CMS Medicare Geographic Variation from {cms_file}...")

    df = pl.scan_csv(cms_file, infer_schema_length=10000, ignore_errors=True)

    # Filter to county level, state, and years
    df = df.filter(
        (pl.col("Bene_Geo_Lvl") == "County")
        & (pl.col("Bene_Geo_Cd").str.starts_with(state_fips))
        & (pl.col("Year").is_in(years))
    ).select([
        pl.col("Bene_Geo_Cd").alias("county_fips"),
        pl.col("Year").alias("year"),
        pl.col("Total_Mdcr_Pymt_PC").alias("medicare_actual_pc"),
        pl.col("Total_Mdcr_Stdzd_Pymt_PC").alias("medicare_standardized_pc"),
        pl.col("Bene_Dual_Pct").alias("dual_eligible_pct"),
    ]).collect()

    print(f"  CMS Medicare: {len(df)} county-year records")
    return df


# ============================================================
# Module 6: Merge + Compute Indices
# ============================================================

def build_affordability_index(
    income: pl.DataFrame,
    wages_healthcare: pl.DataFrame,
    wages_allind: pl.DataFrame,
    fmr: pl.DataFrame | None,
    medicare: pl.DataFrame | None,
    state_fips: str,
) -> pl.DataFrame:
    """
    Merge all sources and compute GPCI-aligned composite cost index.

    Composite = (wage_index × 0.56) + (rent_index × 0.30) + (purchased_svcs_index × 0.14)

    If HUD FMR unavailable:
    Composite = (wage_index × 0.80) + (purchased_svcs_index × 0.20)

    All indices normalized so state median = 100.
    """
    print("\nBuilding affordability index...")

    # Start with healthcare wages as the base
    df = wages_healthcare.select([
        "county_fips", "year", "healthcare_avg_weekly_wage",
    ])

    # Join all-industry wages
    df = df.join(
        wages_allind.select(["county_fips", "year", "allind_avg_weekly_wage"]),
        on=["county_fips", "year"],
        how="left",
    )

    # Join income (supplementary)
    df = df.join(
        income.select(["county_fips", "year", "per_capita_income"]),
        on=["county_fips", "year"],
        how="left",
    )

    has_rent = fmr is not None and len(fmr) > 0
    if has_rent:
        df = df.join(
            fmr.select(["county_fips", "year", "fmr_2br"]),
            on=["county_fips", "year"],
            how="left",
        )

    has_medicare = medicare is not None and len(medicare) > 0
    if has_medicare:
        df = df.join(
            medicare,
            on=["county_fips", "year"],
            how="left",
        )

    # Add county names
    fips_list = df["county_fips"].to_list()
    county_names = [CA_COUNTY_FIPS.get(f, f"Unknown ({f})") for f in fips_list]
    df = df.with_columns(pl.Series("county_name", county_names))

    # Compute indices normalized to state median = 100
    # Process each year separately to get year-specific medians
    result_frames = []
    for year in sorted(df["year"].unique().to_list()):
        year_df = df.filter(pl.col("year") == year)

        # State medians for this year
        wage_median = year_df["healthcare_avg_weekly_wage"].median()
        allind_median = year_df["allind_avg_weekly_wage"].median()
        income_median = year_df["per_capita_income"].median()

        year_df = year_df.with_columns([
            (pl.col("healthcare_avg_weekly_wage") / wage_median * 100).round(1).alias("wage_index"),
            (pl.col("allind_avg_weekly_wage") / allind_median * 100).round(1).alias("purchased_services_index"),
            (pl.col("per_capita_income") / income_median * 100).round(1).alias("income_index"),
        ])

        if has_rent:
            rent_median = year_df["fmr_2br"].median()
            year_df = year_df.with_columns(
                (pl.col("fmr_2br") / rent_median * 100).round(1).alias("rent_index")
            )
            # 3-component composite: 56/30/14
            year_df = year_df.with_columns(
                (
                    pl.col("wage_index") * WEIGHT_WAGES
                    + pl.col("rent_index") * WEIGHT_RENT
                    + pl.col("purchased_services_index") * WEIGHT_PURCHASED
                ).round(1).alias("composite_cost_index")
            )
        else:
            # 2-component fallback: 80/20
            year_df = year_df.with_columns([
                pl.lit(None).cast(pl.Float64).alias("rent_index"),
                (
                    pl.col("wage_index") * WEIGHT_WAGES_NO_RENT
                    + pl.col("purchased_services_index") * WEIGHT_PURCHASED_NO_RENT
                ).round(1).alias("composite_cost_index"),
            ])

        # Effective reimbursement index: 10000 / composite
        year_df = year_df.with_columns(
            (10000.0 / pl.col("composite_cost_index")).round(1).alias("effective_reimbursement_index")
        )

        # Medicare gap
        if has_medicare and "medicare_actual_pc" in year_df.columns:
            year_df = year_df.with_columns(
                (
                    (pl.col("medicare_actual_pc") - pl.col("medicare_standardized_pc"))
                    / pl.col("medicare_standardized_pc") * 100
                ).round(1).alias("medicare_gap_pct")
            )

        result_frames.append(year_df)

    result = pl.concat(result_frames)

    print(f"  Affordability index: {len(result)} county-year records")
    print(f"  Components: wages={WEIGHT_WAGES}, rent={'yes' if has_rent else 'NO (fallback weights)'}, purchased_svcs={WEIGHT_PURCHASED}")
    return result


# ============================================================
# Module 7: Output
# ============================================================

def write_affordability_json(df: pl.DataFrame, output_dir: str, has_rent: bool):
    """
    Write affordability.json (most recent year) and affordability_panel.csv (all years).
    """
    os.makedirs(output_dir, exist_ok=True)

    # Most recent year for JSON output
    max_year = df["year"].max()
    latest = df.filter(pl.col("year") == max_year)

    # State medians
    state_medians = {
        "per_capita_income": round(latest["per_capita_income"].median(), 0),
        "healthcare_avg_weekly_wage": round(latest["healthcare_avg_weekly_wage"].median(), 0),
        "composite_cost_index": 100.0,
    }
    if has_rent and "fmr_2br" in latest.columns:
        fmr_med = latest["fmr_2br"].median()
        if fmr_med is not None:
            state_medians["fmr_2br"] = round(fmr_med, 0)

    # Build counties dict
    counties = {}
    weights = {
        "healthcare_wages": WEIGHT_WAGES if has_rent else WEIGHT_WAGES_NO_RENT,
        "facility_rent": WEIGHT_RENT if has_rent else 0.0,
        "purchased_services": WEIGHT_PURCHASED if has_rent else WEIGHT_PURCHASED_NO_RENT,
    }

    for row in latest.iter_rows(named=True):
        county_data = {
            "name": row["county_name"],
            "per_capita_income": row.get("per_capita_income"),
            "healthcare_avg_weekly_wage": row.get("healthcare_avg_weekly_wage"),
            "allind_avg_weekly_wage": row.get("allind_avg_weekly_wage"),
            "income_index": row.get("income_index"),
            "wage_index": row.get("wage_index"),
            "purchased_services_index": row.get("purchased_services_index"),
            "composite_cost_index": row.get("composite_cost_index"),
            "effective_reimbursement_index": row.get("effective_reimbursement_index"),
        }
        if has_rent:
            county_data["fmr_2br"] = row.get("fmr_2br")
            county_data["rent_index"] = row.get("rent_index")
        if "medicare_actual_pc" in row and row["medicare_actual_pc"] is not None:
            county_data["medicare_actual_pc"] = row["medicare_actual_pc"]
            county_data["medicare_standardized_pc"] = row["medicare_standardized_pc"]
            county_data["medicare_gap_pct"] = row.get("medicare_gap_pct")
            county_data["dual_eligible_pct"] = row.get("dual_eligible_pct")

        counties[row["county_fips"]] = county_data

    output = {
        "lastUpdated": str(max_year),
        "methodology": {
            "composite_weights": weights,
            "weight_source": "Medicare PE GPCI sub-component cost shares (2006-based MEI)",
            "normalization": "State median = 100",
        },
        "stateMedian": state_medians,
        "counties": counties,
    }

    # Write JSON
    json_path = os.path.join(output_dir, "affordability.json")
    with open(json_path, "w") as f:
        json.dump(output, f, indent=2)
    print(f"\nWrote {json_path} ({len(counties)} counties, year {max_year})")

    # Write CSV panel
    csv_path = os.path.join(output_dir, "affordability_panel.csv")
    df.write_csv(csv_path)
    print(f"Wrote {csv_path} ({len(df)} rows)")


# ============================================================
# QI Validation
# ============================================================

def run_qi_checks(
    income: pl.DataFrame,
    wages_hc: pl.DataFrame,
    wages_all: pl.DataFrame,
    fmr: pl.DataFrame | None,
    medicare: pl.DataFrame | None,
    result: pl.DataFrame,
    years: list[int],
    has_rent: bool,
) -> QIRunner:
    """Run all QI checks on input and output data."""
    print("\n" + "=" * 60)
    print("Running QI checks...")
    print("=" * 60 + "\n")

    qi = QIRunner(verbose=True)
    ca_counties = list(CA_COUNTY_FIPS.keys())

    # --- BEA Income checks ---
    print("--- BEA Income ---")
    for year in years:
        year_df = income.filter(pl.col("year") == year)
        qi.check_completeness(year_df, "county_fips", 50, name=f"BEA {year} county count (≥50)")
    qi.check_no_nulls(income, ["per_capita_income"], name="BEA income no nulls")
    qi.check_range(income, "per_capita_income", 15000, 200000, name="BEA income range")
    qi.check_temporal_consistency(income, "per_capita_income", "year", "county_fips", 30.0, name="BEA income YoY")

    # --- QCEW Healthcare checks ---
    print("\n--- QCEW Healthcare (NAICS 62) ---")
    for year in years:
        year_df = wages_hc.filter(pl.col("year") == year)
        qi.check_completeness(year_df, "county_fips", 50, name=f"QCEW HC {year} count (≥50)")
    qi.check_no_nulls(wages_hc, ["healthcare_avg_weekly_wage"], name="QCEW HC no nulls")
    qi.check_range(wages_hc, "healthcare_avg_weekly_wage", 400, 5000, name="QCEW HC wage range")
    qi.check_disclosure(wages_hc, "county_fips", ca_counties, name="QCEW HC disclosure")

    # --- QCEW All-Industry checks ---
    print("\n--- QCEW All-Industry ---")
    for year in years:
        year_df = wages_all.filter(pl.col("year") == year)
        qi.check_completeness(year_df, "county_fips", 58, name=f"QCEW AllInd {year} count")
    qi.check_no_nulls(wages_all, ["allind_avg_weekly_wage"], name="QCEW AllInd no nulls")
    qi.check_range(wages_all, "allind_avg_weekly_wage", 300, 5000, name="QCEW AllInd wage range")

    # --- HUD FMR checks ---
    if has_rent and fmr is not None and len(fmr) > 0:
        print("\n--- HUD FMR ---")
        for year in years:
            year_df = fmr.filter(pl.col("year") == year)
            qi.check_completeness(year_df, "county_fips", 58, name=f"HUD FMR {year} count")
        qi.check_no_nulls(fmr, ["fmr_2br"], name="HUD FMR no nulls")
        qi.check_range(fmr, "fmr_2br", 400, 5000, name="HUD FMR range")

    # --- CMS Medicare checks ---
    if medicare is not None and len(medicare) > 0:
        print("\n--- CMS Medicare ---")
        qi.check_completeness(medicare, "county_fips", 50, name="CMS Medicare county count (≥50)")
        qi.check_range(medicare, "medicare_actual_pc", 2000, 30000, name="CMS Medicare spending range")
        qi.check_range(medicare, "dual_eligible_pct", 0, 100, name="CMS dual eligible range")

    # --- Computed index checks ---
    print("\n--- Computed Indices ---")
    index_cols = ["wage_index", "purchased_services_index", "composite_cost_index", "effective_reimbursement_index"]
    qi.check_no_nulls(result, index_cols, name="Index columns no nulls")
    qi.check_positive(result, index_cols, name="Index values positive")
    qi.check_no_duplicates(result, ["county_fips", "year"], name="Result no duplicates")

    weights = {"wages": WEIGHT_WAGES, "rent": WEIGHT_RENT, "purchased_services": WEIGHT_PURCHASED} if has_rent \
        else {"wages": WEIGHT_WAGES_NO_RENT, "purchased_services": WEIGHT_PURCHASED_NO_RENT}
    qi.check_weight_sum(weights, name="Composite weight sum")

    # Arithmetic check: effective_reimb = 10000 / composite
    result_with_check = result.with_columns(
        (10000.0 / pl.col("composite_cost_index")).round(1).alias("_expected_eff_reimb")
    )
    qi.check_arithmetic(
        result_with_check, "effective_reimbursement_index", "_expected_eff_reimb",
        tolerance=0.2, name="Effective reimb arithmetic"
    )

    # Distribution checks
    qi.check_distribution(result, "composite_cost_index", 3.0, name="Composite index outliers")
    qi.check_distribution(result, "wage_index", 3.0, name="Wage index outliers")

    # Cross-source correlation
    qi.check_cross_source_correlation(
        result, "wage_index", "purchased_services_index", 0.3,
        name="Wage vs purchased services correlation"
    )
    if has_rent:
        qi.check_cross_source_correlation(
            result, "wage_index", "rent_index", 0.3,
            name="Wage vs rent correlation"
        )

    return qi


# ============================================================
# Main
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Build county-level affordability data for Medi-Cal Provider Access Explorer"
    )
    parser.add_argument("--bea-key", required=True, help="BEA API key (register at apps.bea.gov/API/signup/)")
    parser.add_argument("--qcew-dir", default=None, help="Directory with pre-downloaded QCEW CSVs")
    parser.add_argument("--hud-dir", default=None, help="Directory with pre-downloaded HUD FMR Excel files")
    parser.add_argument("--cms-file", default=None, help="Path to CMS Medicare Geographic Variation CSV")
    parser.add_argument("--years", default="2017,2018,2019,2020,2021,2022", help="Comma-separated analysis years")
    parser.add_argument("--state", default="CA", help="State abbreviation")
    parser.add_argument("--output", required=True, help="Output directory")
    parser.add_argument("--validate", action="store_true", help="Run QI checks; abort on CRITICAL failure")

    args = parser.parse_args()
    years = [int(y) for y in args.years.split(",")]
    state_fips = STATE_FIPS.get(args.state)
    if state_fips is None:
        print(f"Error: Unknown state '{args.state}'. Supported: {list(STATE_FIPS.keys())}")
        sys.exit(1)

    print(f"Building affordability data for {args.state} ({state_fips}), years {years}")
    print(f"Composite weights: wages={WEIGHT_WAGES}, rent={WEIGHT_RENT}, purchased_svcs={WEIGHT_PURCHASED}")
    print()

    # Fetch/load data
    income = fetch_bea_income(args.bea_key, years, state_fips)
    wages_hc = fetch_qcew_healthcare_wages(years, state_fips, args.qcew_dir)
    wages_all = fetch_qcew_allind_wages(years, state_fips, args.qcew_dir)

    fmr = None
    if args.hud_dir:
        fmr = load_hud_fmr(args.hud_dir, years, state_fips)

    medicare = None
    if args.cms_file:
        medicare = load_cms_medicare(args.cms_file, years, state_fips)

    has_rent = fmr is not None and len(fmr) > 0

    # Build composite index
    result = build_affordability_index(income, wages_hc, wages_all, fmr, medicare, state_fips)

    # QI checks
    if args.validate:
        qi = run_qi_checks(income, wages_hc, wages_all, fmr, medicare, result, years, has_rent)
        qi.report()
        qi.assert_passed()

    # Write output
    write_affordability_json(result, args.output, has_rent)

    print("\nDone!")


if __name__ == "__main__":
    main()
