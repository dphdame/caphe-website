# Antigravity Prompt: Observational vs Experimental DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background showing the contrast between observational studies and natural experiments.

Two-panel layout side by side:

**Left Panel - "Observational Study":**
- Three rounded rectangle nodes arranged in triangle:
  - Top center: "Unmeasured Confounders (U)" in primary blue (#0041A5)
  - Bottom left: "Treatment (T)" in teal (#0D9488)
  - Bottom right: "Outcome (Y)" in gold (#F9A825)
- Solid arrows from U to T and from U to Y (gray #424242)
- Dashed arrow with "?" from T to Y (green #2E7D32)
- Small "Biased estimate" label below in muted gray

**Right Panel - "Natural Experiment":**
- Four rounded rectangle nodes:
  - Far left: "Exogenous Source (Z)" in a light blue (#1565C0)
  - Top center: "Unmeasured Confounders (U)" in primary blue (#0041A5)
  - Bottom center-left: "Treatment (T)" in teal (#0D9488)
  - Bottom right: "Outcome (Y)" in gold (#F9A825)
- Solid arrow from Z to T only (gray #424242)
- Solid arrows from U to T and from U to Y (gray #424242, but these are "blocked" or faded)
- Solid arrow from T to Y (green #2E7D32) - the identified causal effect
- "X" mark on the U arrows to show they don't bias the Z-driven variation
- Small "Identified estimate" label below in green

**Divider:**
- Thin vertical line or gap between the two panels
- "vs" label in the middle

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight for labels. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The key visual: Show that in observational data, the confounder U creates back-door paths that bias the T->Y relationship. In natural experiments, the instrument Z provides variation in T that is unrelated to U, allowing identification of the causal effect.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 12px for small labels |
| Primary Blue | `#0041A5` |
| Primary Light | `#1565C0` |
| Teal (Treatment) | `#0D9488` |
| Gold (Outcome) | `#F9A825` |
| Green (Causal) | `#2E7D32` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 900 x 450px |
| Format | PNG |

## Visual Layout Sketch

```
+------------------------------------------+------------------------------------------+
|          OBSERVATIONAL STUDY             |           NATURAL EXPERIMENT             |
|                                          |                                          |
|              [U: Confounders]            |     [Z: Exogenous]     [U: Confounders]  |
|                /         \               |           |              /    \          |
|               v           v              |           v             /      \         |
|         [T: Treatment] --?--> [Y: Outcome]      [T: Treatment] ----> [Y: Outcome]  |
|                                          |                                          |
|          "Biased estimate"               |          "Identified estimate"           |
+------------------------------------------+------------------------------------------+
```

## Alternative Simpler Version

If the two-panel layout is too complex, create a single diagram showing:

Clean DAG diagram on white background. Four rounded rectangle nodes:

1. Top left: "Exogenous Source (Z)" - light blue (#1565C0)
2. Top right: "Confounders (U)" - primary blue (#0041A5)
3. Bottom left: "Treatment" - teal (#0D9488)
4. Bottom right: "Outcome" - gold (#F9A825)

Arrows:
- Z -> Treatment (solid gray, represents exogenous variation)
- U -> Treatment (solid gray, represents confounding)
- U -> Outcome (solid gray, represents confounding)
- Treatment -> Outcome (dashed green with "?", the causal effect we want)

Key visual: The Z provides "clean" variation that bypasses U. Label the Z->T arrow as "Exogenous variation" and circle it or highlight it as "the source of identification."

## Output

**Filename:** `observational-to-experimental-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/observational-to-experimental/assets/`

---

## Usage Instructions

1. Copy the prompt above into Antigravity
2. Generate the image
3. Download and save to the specified location
4. The lab HTML already references this image at `assets/observational-to-experimental-dag.png`
