"""
Generate publication-quality figures for HSR Research Brief:
"Flat-Rate Medicaid Reimbursement and Geographic Variation in Provider Participation"

Exhibit 1: California county map colored by overall Medi-Cal participation rate
Exhibit 2: Behavioral Health vs Pharmacy/DME participation by county (bar chart)

Output: High-resolution PDFs in docs/hsr-figures/
"""

import json
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from matplotlib.patches import Patch
import geopandas as gpd

# Paths
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE, "data", "access-explorer", "_summary.json")
GEO_FILE = os.path.join(BASE, "data", "access-explorer", "ca-counties.geojson")
OUT_DIR = os.path.join(BASE, "docs", "hsr-figures")
os.makedirs(OUT_DIR, exist_ok=True)

# Load data
with open(DATA_FILE) as f:
    data = json.load(f)

counties_data = data["counties"]

# Build a dataframe-like dict for merging with GeoJSON
county_stats = {}
for name, info in counties_data.items():
    county_stats[name] = {
        "participationRate": info["participationRate"],
        "registered": info["registered"],
        "active": info["active"],
        "cost_index": info.get("composite_cost_index", None),
        "bh_rate": info.get("specialties", {}).get("behavioral_health", {}).get("participationRate", None),
        "pharma_rate": info.get("specialties", {}).get("pharmacy_dme", {}).get("participationRate", None),
    }

# Load GeoJSON
gdf = gpd.read_file(GEO_FILE)

# Match county names - GeoJSON uses NAME field
gdf["participationRate"] = gdf["name"].map(
    lambda x: county_stats.get(x, {}).get("participationRate", None)
)
gdf["bh_rate"] = gdf["name"].map(
    lambda x: county_stats.get(x, {}).get("bh_rate", None)
)
gdf["pharma_rate"] = gdf["name"].map(
    lambda x: county_stats.get(x, {}).get("pharma_rate", None)
)

# Check for unmatched counties
matched = gdf["participationRate"].notna().sum()
print(f"Matched {matched}/58 counties to GeoJSON")
if matched < 58:
    geo_names = set(gdf["name"].values)
    data_names = set(counties_data.keys())
    print(f"In GeoJSON but not data: {geo_names - data_names}")
    print(f"In data but not GeoJSON: {data_names - geo_names}")


# ============================================================
# EXHIBIT 1: Statewide participation rate map
# ============================================================
def generate_exhibit1():
    fig, ax = plt.subplots(1, 1, figsize=(8, 10))

    # Color scheme: sequential YlGnBu (colorblind-safe)
    cmap = plt.cm.YlGnBu
    norm = mcolors.Normalize(vmin=0, vmax=50)

    gdf.plot(
        column="participationRate",
        cmap=cmap,
        norm=norm,
        linewidth=0.3,
        edgecolor="0.4",
        ax=ax,
        missing_kwds={"color": "lightgrey", "edgecolor": "0.4", "linewidth": 0.3},
    )

    # Colorbar
    sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])
    cbar = fig.colorbar(sm, ax=ax, orientation="horizontal", fraction=0.04, pad=0.02,
                        aspect=30, shrink=0.7)
    cbar.set_label("Medi-Cal Provider Participation Rate (%)", fontsize=10)
    cbar.ax.tick_params(labelsize=9)

    ax.set_title(
        "Exhibit 1. Medi-Cal Provider Participation Rate\nby County, California, 2018\u20132024",
        fontsize=12, fontweight="bold", pad=12
    )
    ax.set_axis_off()

    # Annotations for key counties — manually positioned to avoid overlap
    annotations = [
        ("Modoc", 16.7, (-40, 15), "left"),
        ("Marin", 48.3, (-65, 25), "left"),
        ("San Francisco", 46.8, (-70, -15), "left"),
        ("Imperial", 22.4, (15, -10), "left"),
    ]

    for county_name, rate, offset, ha in annotations:
        row = gdf[gdf["name"] == county_name]
        if not row.empty:
            centroid = row.geometry.centroid.iloc[0]
            ax.annotate(
                f"{county_name}: {rate}%",
                xy=(centroid.x, centroid.y),
                xytext=offset,
                textcoords="offset points",
                fontsize=7,
                ha=ha,
                arrowprops=dict(arrowstyle="-", color="0.3", lw=0.5),
            )

    # Source note
    fig.text(
        0.15, 0.06,
        "Source: NPPES (December 2024); HHS Medicaid Provider Spending (2018\u20132024).\n"
        "Note: Participation rate = active Medi-Cal billers / NPPES-registered providers.",
        fontsize=7, color="0.4", ha="left"
    )

    fig.tight_layout(rect=[0, 0.08, 1, 1])
    outpath = os.path.join(OUT_DIR, "exhibit-1-map.pdf")
    fig.savefig(outpath, dpi=300, bbox_inches="tight")
    plt.close(fig)
    print(f"Saved: {outpath}")


# ============================================================
# EXHIBIT 2: Behavioral Health vs Pharmacy/DME bar chart
# ============================================================
def generate_exhibit2():
    # Get 20 most populous counties (by registered providers as proxy)
    sorted_counties = sorted(
        county_stats.items(),
        key=lambda x: x[1]["registered"],
        reverse=True
    )[:20]

    names = [c[0] for c in sorted_counties]
    bh_rates = [c[1].get("bh_rate", 0) or 0 for c in sorted_counties]
    pharma_rates = [c[1].get("pharma_rate", 0) or 0 for c in sorted_counties]

    # Sort by behavioral health rate for visual clarity
    combined = sorted(zip(names, bh_rates, pharma_rates), key=lambda x: x[1])
    names = [c[0] for c in combined]
    bh_rates = [c[1] for c in combined]
    pharma_rates = [c[2] for c in combined]

    fig, ax = plt.subplots(figsize=(10, 7))

    y = np.arange(len(names))
    bar_height = 0.35

    bars_pharma = ax.barh(y + bar_height/2, pharma_rates, bar_height,
                          label="Pharmacy/DME", color="#2171b5", edgecolor="white", linewidth=0.5)
    bars_bh = ax.barh(y - bar_height/2, bh_rates, bar_height,
                      label="Behavioral Health", color="#D4652F", edgecolor="white", linewidth=0.5)

    ax.set_yticks(y)
    ax.set_yticklabels(names, fontsize=9)
    ax.set_xlabel("Participation Rate (%)", fontsize=10)
    ax.set_title(
        "Exhibit 2. Behavioral Health vs. Pharmacy/DME\n"
        "Medi-Cal Provider Participation, 20 Largest Counties",
        fontsize=12, fontweight="bold", pad=12
    )

    # Add median lines
    bh_median = np.median([v.get("bh_rate", 0) or 0 for v in county_stats.values() if v.get("bh_rate")])
    pharma_median = np.median([v.get("pharma_rate", 0) or 0 for v in county_stats.values() if v.get("pharma_rate")])

    ax.axvline(bh_median, color="#D4652F", linestyle="--", linewidth=1, alpha=0.7)
    ax.axvline(pharma_median, color="#2171b5", linestyle="--", linewidth=1, alpha=0.7)

    ax.text(bh_median + 0.5, len(names) - 0.5, f"Median: {bh_median:.1f}%",
            fontsize=8, color="#D4652F", va="top")
    ax.text(pharma_median + 0.5, len(names) - 1.5, f"Median: {pharma_median:.1f}%",
            fontsize=8, color="#2171b5", va="top")

    ax.legend(loc="lower right", fontsize=9, framealpha=0.9)
    ax.set_xlim(0, 85)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.tick_params(axis="x", labelsize=9)

    # Source note
    fig.text(
        0.12, 0.02,
        "Source: NPPES (December 2024); HHS Medicaid Provider Spending (2018\u20132024).\n"
        "Dashed lines indicate statewide median across reporting counties.",
        fontsize=7, color="0.4", ha="left"
    )

    fig.tight_layout(rect=[0, 0.05, 1, 1])
    outpath = os.path.join(OUT_DIR, "exhibit-2-specialty.pdf")
    fig.savefig(outpath, dpi=300, bbox_inches="tight")
    plt.close(fig)
    print(f"Saved: {outpath}")


if __name__ == "__main__":
    print("Generating HSR Research Brief figures...")
    generate_exhibit1()
    generate_exhibit2()
    print("Done.")
