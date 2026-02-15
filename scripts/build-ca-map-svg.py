#!/usr/bin/env python3
"""
Build California county heatmap SVG for the Access Explorer.

Pipeline:
1. Load CA counties GeoJSON (data/access-explorer/ca-counties.geojson)
2. Run mapshaper: project to EPSG:3310 (CA Albers), simplify, output SVG
3. Post-process: add data-county attributes, slugify IDs, set viewBox
4. Output to public/tools/access-explorer/ca-counties.svg

Requirements: Node.js (npx mapshaper)
"""
import os
import re
import subprocess
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
GEOJSON_PATH = os.path.join(PROJECT_ROOT, "data", "access-explorer", "ca-counties.geojson")
SVG_OUTPUT = os.path.join(PROJECT_ROOT, "public", "tools", "access-explorer", "ca-counties.svg")
TMP_SVG = "/tmp/ca-counties-raw.svg"


def slugify(name):
    return name.lower().replace(" ", "-")


def run_mapshaper():
    """Run mapshaper to project and simplify GeoJSON into SVG."""
    cmd = [
        "npx", "mapshaper", GEOJSON_PATH,
        "-proj", "EPSG:3310",
        "-simplify", "0.5%", "keep-shapes",
        "-o", "format=svg", "id-field=NAME", f"svg-data=NAME", TMP_SVG,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("mapshaper error:", result.stderr, file=sys.stderr)
        sys.exit(1)
    print(f"mapshaper wrote {TMP_SVG}")


def post_process_svg():
    """Add data-county attributes and slugified IDs to each path."""
    with open(TMP_SVG) as f:
        svg = f.read()

    # Replace each path's id with slugified version and add data-county
    def replace_path(match):
        full = match.group(0)
        county_name = match.group(1)
        slug = slugify(county_name)
        # Replace id="County Name" with id="county-slug" data-county="County Name"
        full = full.replace(
            f'id="{county_name}"',
            f'id="county-{slug}" data-county="{county_name}"',
        )
        # Remove data-name attribute (redundant with data-county)
        full = re.sub(r'\s*data-name="[^"]*"', "", full)
        return full

    svg = re.sub(r'<path [^>]*id="([^"]+)"[^>]*/>', replace_path, svg)

    # Update SVG root: add role and aria-label for accessibility
    svg = svg.replace(
        "<svg ",
        '<svg role="img" aria-label="California county map colored by Medi-Cal participation rate" ',
        1,
    )

    # Verify path count
    count = len(re.findall(r"data-county=", svg))
    print(f"Post-processed: {count} county paths")

    os.makedirs(os.path.dirname(SVG_OUTPUT), exist_ok=True)
    with open(SVG_OUTPUT, "w") as f:
        f.write(svg)
    print(f"Wrote {SVG_OUTPUT} ({os.path.getsize(SVG_OUTPUT)} bytes)")


if __name__ == "__main__":
    if not os.path.exists(GEOJSON_PATH):
        print(f"GeoJSON not found: {GEOJSON_PATH}", file=sys.stderr)
        sys.exit(1)
    run_mapshaper()
    post_process_svg()
