#!/usr/bin/env python3
"""
Regenerate the alerts section in _summary.json from current county specialty data.

The alerts section became stale after enrich-summary-specialties.py updated county
specialty allocations without updating alerts. This script rebuilds alerts using
the same thresholds as build-access-data.py (rate < 15 = critical, rate == 0 with
registered > 0 = no_providers).
"""

import json
import os

data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "access-explorer")
summary_path = os.path.join(data_dir, "_summary.json")

with open(summary_path) as f:
    summary = json.load(f)

old_alerts = summary.get("alerts", [])
print(f"Old alerts: {len(old_alerts)}")
for a in old_alerts:
    print(f"  {a['county']} / {a['specialty']}: {a['rate']}% ({a['type']})")

# Rebuild alerts from current county specialty data
new_alerts = []
for county_name, county_data in sorted(summary["counties"].items()):
    specialties = county_data.get("specialties", {})
    for spec_key, spec_data in specialties.items():
        rate = spec_data.get("participationRate", 0)
        registered = spec_data.get("registered", 0)
        if rate == 0 and registered > 0:
            new_alerts.append({
                "county": county_name,
                "specialty": spec_key,
                "rate": 0,
                "type": "no_providers",
            })
        elif rate < 15 and rate > 0:
            new_alerts.append({
                "county": county_name,
                "specialty": spec_key,
                "rate": rate,
                "type": "critical",
            })

print(f"\nNew alerts: {len(new_alerts)}")
for a in new_alerts:
    print(f"  {a['county']} / {a['specialty']}: {a['rate']}% ({a['type']})")

# Show diff
old_set = {(a["county"], a["specialty"]): a["rate"] for a in old_alerts}
new_set = {(a["county"], a["specialty"]): a["rate"] for a in new_alerts}

removed = set(old_set.keys()) - set(new_set.keys())
added = set(new_set.keys()) - set(old_set.keys())
changed = {k for k in old_set.keys() & new_set.keys() if old_set[k] != new_set[k]}

if removed:
    print(f"\nRemoved ({len(removed)}):")
    for k in sorted(removed):
        print(f"  {k[0]} / {k[1]}: was {old_set[k]}%")
if added:
    print(f"\nAdded ({len(added)}):")
    for k in sorted(added):
        print(f"  {k[0]} / {k[1]}: {new_set[k]}%")
if changed:
    print(f"\nChanged ({len(changed)}):")
    for k in sorted(changed):
        print(f"  {k[0]} / {k[1]}: {old_set[k]}% → {new_set[k]}%")

# Update and save
summary["alerts"] = new_alerts
with open(summary_path, "w") as f:
    json.dump(summary, f, indent=2)

print(f"\nUpdated _summary.json with {len(new_alerts)} alerts")
