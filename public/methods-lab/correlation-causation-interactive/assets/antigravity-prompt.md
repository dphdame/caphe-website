# Antigravity Prompt: Lab 3 - Correlation ≠ Causation (Interactive)

## Image 3A: Spurious Correlation Example

**Filename:** `spurious-correlation.png`
**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/correlation-causation-interactive/assets/`
**Dimensions:** 800 x 500px

**Prompt:**
```
Clean, professional scatter plot on white background showing a classic spurious correlation example.

**Chart structure:**

X-axis: "Ice Cream Sales ($)"
Y-axis: "Drowning Deaths"

**Data points:**
- 12-15 dots showing a clear positive correlation (r ≈ 0.85)
- Points colored teal (#0D9488, filled circles, 10px diameter)
- Trend line through points (dashed teal line)

**Hidden confounder illustration:**
- Above the chart, a sun icon (amber/gold #F9A825) with label "Hot Weather"
- Two arrows emanating from the sun:
  - Arrow down-left to x-axis: "More ice cream"
  - Arrow down-right to y-axis: "More swimming"
- The sun and arrows should be prominent — the "reveal"

**Correlation coefficient display:**
- Box in corner: "r = 0.85" in large font
- Below: "Does ice cream cause drowning?" with red X mark

**Annotation at bottom:**
- "Both are caused by a third factor: temperature" in 14px Montserrat italic, #757575

Style: Flat design, minimalist. The sun (confounder) should visually "explain" the correlation. Montserrat font throughout.
```

---

## Image 3B: Epidemiologist vs Economist Approach

**Filename:** `approach-comparison.png`
**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/correlation-causation-interactive/assets/`
**Dimensions:** 800 x 450px

**Prompt:**
```
Clean, professional two-panel comparison diagram on white background showing different approaches to confounding.

**Left Panel — Epidemiologist Approach:**
- Header: "Adjust for Confounders" in dark blue (#0041A5)
- Icon: Funnel or filter symbol
- Diagram showing:
  - Box: "Observed Correlation"
  - Arrow down through filter labeled "Statistical Controls"
  - Box: "Adjusted Estimate"
- Subtext: "Add covariates to the model" in gray (#757575)
- Subtle red/amber warning indicator: "But what about unmeasured confounders?"

**Right Panel — Economist Approach:**
- Header: "Find Independent Variation" in teal (#0D9488)
- Icon: Key or lever symbol
- Diagram showing:
  - Box: "Policy Change / Natural Experiment"
  - Arrow down (labeled "Exogenous shock")
  - Box: "Variation unrelated to confounders"
  - Arrow to: "Causal Estimate"
- Subtext: "Find treatment variation that confounders don't affect" in gray (#757575)
- Subtle green checkmark indicator

**Dividing line:**
- Vertical thin line between panels
- Label at bottom: "Same goal: isolate causal effect. Different strategy." in 14px italic

**Visual emphasis:**
- The economist panel should feel like the "aha" / better solution
- Both approaches are valid but economist approach addresses unmeasured confounding
- Montserrat font, flat design, no shadows
```

---

## Image 3C: Confounder DAG

**Filename:** `confounder-dag.png`
**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/correlation-causation-interactive/assets/`
**Dimensions:** 800 x 400px

**Prompt:**
```
Clean, professional directed acyclic graph (DAG) on white background showing classic confounding structure.

**Three nodes arranged in inverted triangle:**

Top node: "Confounder (C)" in amber rounded rectangle (#F9A825 fill, white text, 14px Montserrat Semi-Bold)
- Positioned at top center
- Dashed border to indicate "often unmeasured"

Bottom left: "Treatment (X)" in teal rounded rectangle (#0D9488 fill, white text)

Bottom right: "Outcome (Y)" in dark blue rounded rectangle (#0041A5 fill, white text)

**Arrows:**
- Solid arrow from C down-left to X (gray #424242, 2px)
  - Label near arrow: "C affects who gets treatment"
- Solid arrow from C down-right to Y (gray #424242, 2px)
  - Label: "C also affects outcome"
- Dashed arrow from X to Y (teal #0D9488, 2px)
  - Label with "?" mark: "Causal effect?"

**Annotation below:**
- "The C → X and C → Y paths create a 'back door' — correlation without causation" in 14px italic gray

**Key insight callout:**
- Small box: "Key: We need variation in X that doesn't go through C"

Style: Flat design, no shadows. Nodes have 8px rounded corners and generous padding. Clean minimalist DAG.
```

---

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold (nodes), Regular (labels) |
| Font Size | 14-16px for node labels, 12px for annotations |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Amber | `#F9A825` |
| Arrow Gray | `#424242` |
| Text Muted | `#757575` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px, 800 x 450px, 800 x 400px |
| Format | PNG |

## CAPHE Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0041A5` | Outcome node, epidemiologist header |
| Secondary/Teal | `#0D9488` | Treatment node, economist header |
| Accent | `#F9A825` | Confounder node, warning elements |
| Success | `#2E7D32` | Checkmark on economist approach |
| Error | `#D32F2F` | X mark on spurious correlation |
