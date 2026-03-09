#!/usr/bin/env python3
"""
Add Article + LearningResource JSON-LD schema to all CAPHE Methods Lab pages.
Idempotent: skips pages that already have application/ld+json.
"""

import glob
import json
import os
import re

METHODS_LAB_DIR = "/Users/victoriaperez/Projects/CAPHE/public/methods-lab"
PATTERN = os.path.join(METHODS_LAB_DIR, "*/index.html")

# Exclude the methods-lab index page itself (it's a collection page, not an article)
EXCLUDE_SLUGS = {"assets"}


def extract_tag(html, pattern):
    """Extract content matching a regex pattern from HTML."""
    match = re.search(pattern, html, re.IGNORECASE | re.DOTALL)
    return match.group(1).strip() if match else None


def build_schema(title, description, canonical_url):
    """Build the JSON-LD schema object."""
    return {
        "@context": "https://schema.org",
        "@type": ["Article", "LearningResource"],
        "headline": title,
        "description": description,
        "author": {
            "@type": "Organization",
            "name": "CAPHE",
            "url": "https://www.caphegroup.org"
        },
        "publisher": {
            "@type": "Organization",
            "name": "California Association of Public Health Economics",
            "url": "https://www.caphegroup.org",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.caphegroup.org/assets/images/logo.png"
            }
        },
        "mainEntityOfPage": canonical_url,
        "educationalLevel": "Professional",
        "isPartOf": {
            "@type": "CollectionPage",
            "name": "CAPHE Methods Lab",
            "url": "https://www.caphegroup.org/methods-lab"
        }
    }


def main():
    files = sorted(glob.glob(PATTERN))
    processed = 0
    skipped_existing = []
    skipped_missing = []
    errors = []

    for filepath in files:
        slug = os.path.basename(os.path.dirname(filepath))
        if slug in EXCLUDE_SLUGS:
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            html = f.read()

        # Idempotent: skip if already has JSON-LD
        if "application/ld+json" in html:
            skipped_existing.append(slug)
            continue

        # Extract metadata
        raw_title = extract_tag(html, r"<title>(.*?)</title>")
        description = extract_tag(html, r'<meta\s+name="description"\s+content="(.*?)"')
        canonical = extract_tag(html, r'<link\s+rel="canonical"\s+href="(.*?)"')

        if not raw_title or not description or not canonical:
            missing = []
            if not raw_title:
                missing.append("title")
            if not description:
                missing.append("description")
            if not canonical:
                missing.append("canonical")
            skipped_missing.append((slug, missing))
            continue

        # Strip suffix from title
        title = re.sub(r"\s*\|\s*CAPHE Methods Lab$", "", raw_title)

        # Build schema
        schema = build_schema(title, description, canonical)
        schema_block = (
            '<script type="application/ld+json">\n'
            + json.dumps(schema, indent=2, ensure_ascii=False)
            + "\n</script>"
        )

        # Inject right before </head>
        if "</head>" not in html:
            errors.append((slug, "no </head> tag found"))
            continue

        new_html = html.replace("</head>", schema_block + "\n</head>", 1)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_html)

        processed += 1

    # Summary
    print(f"\n{'='*60}")
    print(f"JSON-LD Schema Injection Summary")
    print(f"{'='*60}")
    print(f"Pages processed (schema added): {processed}")
    print(f"Pages skipped (already has JSON-LD): {len(skipped_existing)}")
    if skipped_existing:
        for s in skipped_existing:
            print(f"  - {s}")
    if skipped_missing:
        print(f"Pages skipped (missing metadata): {len(skipped_missing)}")
        for s, missing in skipped_missing:
            print(f"  - {s}: missing {', '.join(missing)}")
    if errors:
        print(f"Errors: {len(errors)}")
        for s, err in errors:
            print(f"  - {s}: {err}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
