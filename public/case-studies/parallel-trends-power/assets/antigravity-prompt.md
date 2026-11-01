# Antigravity Image Prompts: Parallel Trends Power Lab

**Lab:** Understanding the Limits of Parallel Trends Tests
**Author:** Victoria Cholette
**Date:** 2026-01-29

---

## Figure 1: Statistical Power Concept

**Purpose:** Visual explanation of why low power means failing to detect violations

**Dimensions:** 800x500px, webp format

**Prompt:**
```
Educational diagram showing statistical power for pre-trend detection.

Left side labeled "HIGH POWER": A narrow bell curve distribution with a small shaded rejection region, and a second distribution clearly outside the rejection region. Caption: "Can detect small violations"

Right side labeled "LOW POWER": A wide, flat bell curve distribution with a large overlap region. Caption: "Large violations still look like zero"

Clean academic style. Blue (#0041A5) for primary elements, gray for secondary. White background. Sans-serif labels. No decorative elements.

The key message: wide confidence intervals mean even large pre-trends would not be statistically significant.
```

**Alt text:** Diagram comparing high and low statistical power for detecting pre-treatment trends. High power setup shows narrow distributions that can distinguish pre-trends from zero. Low power setup shows wide, overlapping distributions where even large pre-trends cannot be distinguished from zero.

---

## Figure 2: Selection into Treatment DAG

**Purpose:** Show why counties experiencing bank closures might already be declining

**Dimensions:** 700x400px, webp format

**Prompt:**
```
Causal diagram (DAG) showing selection into treatment for bank closure study.

Nodes (rectangles with rounded corners):
- "Economic Decline" (top center)
- "Bank Closures" (middle left)
- "SNAP Participation" (middle right)
- "Unobserved County Factors" (bottom center, dashed border)

Arrows:
- Economic Decline → Bank Closures (solid)
- Economic Decline → SNAP Participation (solid)
- Bank Closures → SNAP Participation (dashed, with "?" label)
- Unobserved County Factors → Bank Closures (solid)
- Unobserved County Factors → SNAP Participation (solid)

Clean academic style. Primary blue (#0041A5) for solid arrows, red (#C62828) for dashed causal path of interest. White background. Clear labels.

The diagram illustrates confounding: economic decline affects both treatment assignment and outcomes.
```

**Alt text:** Directed acyclic graph showing confounding in bank closure study. Economic decline and unobserved county factors both affect bank closures (treatment) and SNAP participation (outcome), creating potential bias. The causal arrow from bank closures to SNAP participation is dashed with a question mark to indicate uncertainty.

---

## Figure 3: Rambachan-Roth Intuition

**Purpose:** Simple visual explanation of what M means

**Dimensions:** 800x350px, webp format

**Prompt:**
```
Simple educational diagram explaining the Rambachan-Roth M parameter.

Three panels side by side:

Panel 1 (M = 0):
- Horizontal line labeled "Pre-treatment" with small dots at equal height
- Vertical dashed line labeled "Treatment"
- Single dot on right side of dashed line
- Caption: "Assumes perfect parallel trends"

Panel 2 (M = 0.35, highlighted in red):
- Same structure but pre-treatment dots allowed small deviation (shaded band around zero)
- Caption: "Breakdown: small violations explain effect"

Panel 3 (M = 1):
- Wide shaded band showing large allowed deviation
- Caption: "Robust: tolerates violations as large as pre-trend"

Clean minimalist style. Blue dots, gray lines, red highlight for M = 0.35 breakdown. White background.
```

**Alt text:** Three-panel diagram explaining Rambachan-Roth M parameter. At M=0, perfect parallel trends are assumed. At M=0.35 (breakdown point, highlighted in red), small violations from parallel trends can explain the effect. At M=1, the effect is robust to violations as large as observed pre-treatment movement.

---

## Usage Notes

- All images should be 2x resolution for Retina displays
- Save as webp format with 85% quality
- These images are optional enhancements; the lab functions with SVG charts alone
- If generating, place in this assets/ directory
- Update index.html to include img tags where appropriate

---

*Prompts generated for use with Antigravity or similar image generation tools.*
