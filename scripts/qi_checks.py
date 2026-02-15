#!/usr/bin/env python3
"""
Data Quality Indicator (QI) checks for Access Explorer pipeline.

Provides a reusable QIRunner class that accumulates check results and
gates pipeline output: CRITICAL failures abort, WARNINGs log only.

Usage:
    from qi_checks import QIRunner

    qi = QIRunner()
    qi.check_completeness(df, 'county_fips', expected_count=58, name='CA counties')
    qi.check_no_nulls(df, ['wage_index', 'rent_index'], name='index columns')
    qi.check_range(df, 'participation_rate', 0, 100, name='participation rate')

    qi.report()          # prints summary
    qi.assert_passed()   # raises if any CRITICAL checks failed
"""

import sys
from dataclasses import dataclass, field
from typing import Any

try:
    import polars as pl
except ImportError:
    print("Error: polars is required. Install with: pip install polars")
    sys.exit(1)


@dataclass
class CheckResult:
    name: str
    level: str  # "CRITICAL" or "WARNING"
    passed: bool
    message: str
    details: list[str] = field(default_factory=list)


class QIRunner:
    """Accumulates QI check results and reports pass/fail status."""

    def __init__(self, verbose: bool = True):
        self.results: list[CheckResult] = []
        self.verbose = verbose

    def _add(self, result: CheckResult):
        self.results.append(result)
        if self.verbose:
            status = "PASS" if result.passed else "FAIL"
            symbol = "✓" if result.passed else "✗"
            print(f"  {symbol} [{result.level}] {result.name}: {status} — {result.message}")
            for d in result.details[:5]:
                print(f"      {d}")
            if len(result.details) > 5:
                print(f"      ... and {len(result.details) - 5} more")

    # ---- CRITICAL checks ----

    def check_completeness(
        self,
        df: pl.DataFrame,
        column: str,
        expected_count: int,
        name: str = "completeness",
    ):
        """Check that a column has the expected number of unique values."""
        actual = df[column].n_unique()
        passed = actual >= expected_count
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"{actual}/{expected_count} unique values in '{column}'",
            details=[] if passed else [f"Missing {expected_count - actual} entries"],
        ))

    def check_no_nulls(
        self,
        df: pl.DataFrame,
        columns: list[str],
        name: str = "no nulls",
    ):
        """Check that specified columns contain no null/NaN values."""
        null_cols = []
        for col in columns:
            if col not in df.columns:
                null_cols.append(f"'{col}' not found in DataFrame")
                continue
            null_count = df[col].null_count()
            if null_count > 0:
                null_cols.append(f"'{col}': {null_count} nulls")
        passed = len(null_cols) == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message="No nulls found" if passed else f"{len(null_cols)} column(s) with nulls",
            details=null_cols,
        ))

    def check_range(
        self,
        df: pl.DataFrame,
        column: str,
        min_val: float,
        max_val: float,
        name: str = "range check",
    ):
        """Check that all values in a column fall within [min_val, max_val]."""
        below = df.filter(pl.col(column) < min_val)
        above = df.filter(pl.col(column) > max_val)
        violations = len(below) + len(above)
        passed = violations == 0
        details = []
        if len(below) > 0:
            details.append(f"{len(below)} values below {min_val}")
        if len(above) > 0:
            details.append(f"{len(above)} values above {max_val}")
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"All values in [{min_val}, {max_val}]" if passed else f"{violations} out-of-range values",
            details=details,
        ))

    def check_referential_integrity(
        self,
        df: pl.DataFrame,
        column: str,
        ref_df: pl.DataFrame,
        ref_column: str,
        name: str = "referential integrity",
    ):
        """Check that all values in column exist in ref_df[ref_column]."""
        ref_values = set(ref_df[ref_column].to_list())
        actual_values = set(df[column].to_list())
        missing = actual_values - ref_values
        passed = len(missing) == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message="All keys found in reference" if passed else f"{len(missing)} unmatched keys",
            details=[str(m) for m in sorted(missing)[:10]],
        ))

    def check_no_duplicates(
        self,
        df: pl.DataFrame,
        key_columns: list[str],
        name: str = "no duplicates",
    ):
        """Check that no duplicate rows exist on the specified key columns."""
        total = len(df)
        unique = df.unique(subset=key_columns)
        dupes = total - len(unique)
        passed = dupes == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"No duplicates on {key_columns}" if passed else f"{dupes} duplicate rows",
        ))

    def check_year_coverage(
        self,
        df: pl.DataFrame,
        year_column: str,
        group_column: str,
        expected_years: list[int],
        name: str = "year coverage",
    ):
        """Check that each group has all expected years."""
        groups = df.group_by(group_column).agg(
            pl.col(year_column).unique().alias("years")
        )
        incomplete = []
        for row in groups.iter_rows(named=True):
            years = set(row["years"])
            missing = set(expected_years) - years
            if missing:
                incomplete.append(f"{row[group_column]}: missing {sorted(missing)}")
        passed = len(incomplete) == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"All groups have years {expected_years}" if passed else f"{len(incomplete)} groups with missing years",
            details=incomplete[:10],
        ))

    def check_weight_sum(
        self,
        weights: dict[str, float],
        name: str = "weight sum",
    ):
        """Check that composite weights sum to 1.00."""
        total = sum(weights.values())
        passed = abs(total - 1.0) < 0.001
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"Weights sum to {total:.4f}" if passed else f"Weights sum to {total:.4f}, expected 1.0000",
            details=[f"{k}: {v}" for k, v in weights.items()],
        ))

    def check_positive(
        self,
        df: pl.DataFrame,
        columns: list[str],
        name: str = "positive values",
    ):
        """Check that all values in specified columns are > 0."""
        violations = []
        for col in columns:
            if col not in df.columns:
                continue
            non_positive = df.filter(pl.col(col) <= 0)
            if len(non_positive) > 0:
                violations.append(f"'{col}': {len(non_positive)} values <= 0")
        passed = len(violations) == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message="All index values positive" if passed else f"{len(violations)} column(s) with non-positive values",
            details=violations,
        ))

    def check_arithmetic(
        self,
        df: pl.DataFrame,
        computed_col: str,
        formula_col: str,
        tolerance: float = 0.1,
        name: str = "arithmetic check",
    ):
        """Check that computed_col matches formula_col within tolerance."""
        diff = (df[computed_col] - df[formula_col]).abs()
        max_diff = diff.max()
        violations = df.filter(diff > tolerance)
        passed = len(violations) == 0
        self._add(CheckResult(
            name=name,
            level="CRITICAL",
            passed=passed,
            message=f"Max difference: {max_diff:.4f} (tolerance: {tolerance})" if passed else f"{len(violations)} rows exceed tolerance",
        ))

    # ---- WARNING checks ----

    def check_disclosure(
        self,
        df: pl.DataFrame,
        county_col: str,
        expected_counties: list[str],
        name: str = "disclosure check",
    ):
        """Flag counties missing from data (likely suppressed)."""
        present = set(df[county_col].to_list())
        missing = set(expected_counties) - present
        passed = len(missing) == 0
        self._add(CheckResult(
            name=name,
            level="WARNING",
            passed=passed,
            message=f"All {len(expected_counties)} counties present" if passed else f"{len(missing)} counties suppressed/missing",
            details=sorted(missing),
        ))

    def check_distribution(
        self,
        df: pl.DataFrame,
        column: str,
        sd_threshold: float = 3.0,
        name: str = "distribution check",
    ):
        """Flag outliers beyond sd_threshold standard deviations from mean."""
        mean = df[column].mean()
        std = df[column].std()
        if std is None or std == 0:
            self._add(CheckResult(
                name=name, level="WARNING", passed=True,
                message=f"Cannot compute std for '{column}' (zero variance or null)",
            ))
            return
        outliers = df.filter(
            ((pl.col(column) - mean).abs() / std) > sd_threshold
        )
        passed = len(outliers) == 0
        details = []
        if not passed and "county_name" in df.columns:
            for row in outliers.iter_rows(named=True):
                details.append(f"{row.get('county_name', '?')}: {row[column]:.1f}")
        self._add(CheckResult(
            name=name,
            level="WARNING",
            passed=passed,
            message=f"No outliers beyond {sd_threshold} SD" if passed else f"{len(outliers)} outlier(s) in '{column}'",
            details=details[:10],
        ))

    def check_temporal_consistency(
        self,
        df: pl.DataFrame,
        value_col: str,
        year_col: str,
        group_col: str,
        max_pct_change: float = 30.0,
        name: str = "temporal consistency",
    ):
        """Flag year-over-year changes exceeding max_pct_change."""
        violations = []
        for group in df[group_col].unique().to_list():
            group_df = df.filter(pl.col(group_col) == group).sort(year_col)
            values = group_df[value_col].to_list()
            years = group_df[year_col].to_list()
            for i in range(1, len(values)):
                if values[i - 1] == 0 or values[i - 1] is None:
                    continue
                pct_change = abs((values[i] - values[i - 1]) / values[i - 1] * 100)
                if pct_change > max_pct_change:
                    violations.append(
                        f"{group}: {years[i-1]}→{years[i]}: {pct_change:.1f}% change in {value_col}"
                    )
        passed = len(violations) == 0
        self._add(CheckResult(
            name=name,
            level="WARNING",
            passed=passed,
            message=f"All YoY changes < {max_pct_change}%" if passed else f"{len(violations)} large YoY changes",
            details=violations[:10],
        ))

    def check_cross_source_correlation(
        self,
        df: pl.DataFrame,
        col_a: str,
        col_b: str,
        min_r: float = 0.3,
        name: str = "cross-source correlation",
    ):
        """Check that two columns are positively correlated above min_r."""
        if col_a not in df.columns or col_b not in df.columns:
            self._add(CheckResult(
                name=name, level="WARNING", passed=True,
                message=f"Skipped — '{col_a}' or '{col_b}' not in data",
            ))
            return
        clean = df.select([col_a, col_b]).drop_nulls()
        if len(clean) < 5:
            self._add(CheckResult(
                name=name, level="WARNING", passed=True,
                message=f"Skipped — only {len(clean)} non-null pairs",
            ))
            return
        r = clean[col_a].pearson_corr(clean[col_b])
        passed = r is not None and r > min_r
        self._add(CheckResult(
            name=name,
            level="WARNING",
            passed=passed,
            message=f"r({col_a}, {col_b}) = {r:.3f}" if r else "Could not compute correlation",
            details=[f"Threshold: r > {min_r}", f"N = {len(clean)}"],
        ))

    # ---- Reporting ----

    def report(self) -> str:
        """Print and return a human-readable summary of all checks."""
        lines = ["\n" + "=" * 60, "QI CHECK REPORT", "=" * 60]

        critical_results = [r for r in self.results if r.level == "CRITICAL"]
        warning_results = [r for r in self.results if r.level == "WARNING"]

        critical_pass = sum(1 for r in critical_results if r.passed)
        critical_fail = len(critical_results) - critical_pass
        warning_pass = sum(1 for r in warning_results if r.passed)
        warning_fail = len(warning_results) - warning_pass

        lines.append(f"\nCRITICAL: {critical_pass}/{len(critical_results)} passed")
        if critical_fail > 0:
            lines.append(f"  FAILURES:")
            for r in critical_results:
                if not r.passed:
                    lines.append(f"    ✗ {r.name}: {r.message}")
                    for d in r.details[:3]:
                        lines.append(f"        {d}")

        lines.append(f"\nWARNING:  {warning_pass}/{len(warning_results)} passed")
        if warning_fail > 0:
            lines.append(f"  FLAGS:")
            for r in warning_results:
                if not r.passed:
                    lines.append(f"    ⚠ {r.name}: {r.message}")
                    for d in r.details[:3]:
                        lines.append(f"        {d}")

        verdict = "PASS" if critical_fail == 0 else "FAIL"
        lines.append(f"\n{'=' * 60}")
        lines.append(f"VERDICT: {verdict}")
        if critical_fail > 0:
            lines.append(f"  {critical_fail} CRITICAL check(s) failed — pipeline should abort")
        lines.append("=" * 60 + "\n")

        report_text = "\n".join(lines)
        print(report_text)
        return report_text

    def assert_passed(self):
        """Raise SystemExit if any CRITICAL checks failed."""
        critical_failures = [r for r in self.results if r.level == "CRITICAL" and not r.passed]
        if critical_failures:
            print(f"\nABORTING: {len(critical_failures)} CRITICAL QI check(s) failed.")
            for r in critical_failures:
                print(f"  ✗ {r.name}: {r.message}")
            sys.exit(1)

    @property
    def passed(self) -> bool:
        """True if no CRITICAL checks failed."""
        return all(r.passed for r in self.results if r.level == "CRITICAL")

    @property
    def warnings(self) -> list[CheckResult]:
        """Return all WARNING-level failures."""
        return [r for r in self.results if r.level == "WARNING" and not r.passed]


if __name__ == "__main__":
    print("QI Checks module loaded successfully.")
    print("Usage: from qi_checks import QIRunner")
    print("\nRunning self-test with sample data...")

    # Self-test with sample data
    qi = QIRunner(verbose=True)

    test_df = pl.DataFrame({
        "county_fips": ["06001", "06037", "06073"],
        "county_name": ["Alameda", "Los Angeles", "San Diego"],
        "year": [2022, 2022, 2022],
        "wage_index": [120.5, 114.3, 98.7],
        "rent_index": [135.2, 122.0, 105.3],
    })

    print("\n--- Running sample checks ---")
    qi.check_completeness(test_df, "county_fips", expected_count=3, name="test completeness")
    qi.check_no_nulls(test_df, ["wage_index", "rent_index"], name="test nulls")
    qi.check_range(test_df, "wage_index", 50, 200, name="test wage range")
    qi.check_no_duplicates(test_df, ["county_fips", "year"], name="test duplicates")
    qi.check_weight_sum({"wages": 0.56, "rent": 0.30, "purchased_services": 0.14}, name="test weights")
    qi.check_positive(test_df, ["wage_index", "rent_index"], name="test positive")

    qi.report()
    print("Self-test complete.")
