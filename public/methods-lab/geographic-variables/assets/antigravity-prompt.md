# Antigravity Prompts: Geographic Variables DAGs

This file contains two prompts for generating DAG images for Lab 26: Geographic Variables.

---

## Prompt 1: Geography as Treatment DAG

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in an inverted triangle formation:

Top center: "Geographic Location" node in primary blue (#0041A5) with white text
Bottom left: "Place-Based Features" node in teal (#0D9488) with white text
Bottom right: "Health Outcome" node in gold (#F9A825) with dark text (#1C1C1C)

Arrows (all in dark gray #424242, 2px stroke):
- From "Geographic Location" to "Place-Based Features" (solid arrow pointing down-left)
- From "Place-Based Features" to "Health Outcome" (solid arrow pointing right, labeled "Causal Effect")
- From "Geographic Location" to "Health Outcome" (dashed arrow pointing down-right, labeled with "?")

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding (16px horizontal, 12px vertical).

Key visual emphasis: The path from Location through Place-Based Features to Outcome should be visually prominent. The dashed arrow with "?" indicates the uncertain direct effect.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 11px for arrow labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Gold (Outcome) | `#F9A825` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 450px |
| Format | PNG |

### Output

**Filename:** `geographic-variables-treatment-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/geographic-variables/assets/`

---

## Prompt 2: Geography as Confounder DAG

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in an inverted triangle formation:

Top center: "Geographic Location" node in gold/amber (#F9A825) with dark text (#1C1C1C) - this is the CONFOUNDER
Bottom left: "Treatment/Exposure" node in teal (#0D9488) with white text
Bottom right: "Health Outcome" node in primary blue (#0041A5) with white text

Arrows (all in dark gray #424242, 2px stroke):
- From "Geographic Location" to "Treatment/Exposure" (solid arrow pointing down-left, labeled "Back-door path")
- From "Geographic Location" to "Health Outcome" (solid arrow pointing down-right, labeled "Back-door path")
- From "Treatment/Exposure" to "Health Outcome" (dashed green (#2E7D32) arrow pointing right, labeled "Causal Effect?")

Add a small "X" or strike-through symbol on the two back-door arrows to indicate "blocked by fixed effects"

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding (16px horizontal, 12px vertical).

Key visual emphasis: The confounder (Geographic Location) at top should be visually distinct as the source of bias. The X marks on back-door paths show how fixed effects block confounding.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 11px for arrow labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Gold/Amber (Confounder) | `#F9A825` |
| Green (Causal) | `#2E7D32` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 450px |
| Format | PNG |

### Output

**Filename:** `geographic-variables-confounder-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/geographic-variables/assets/`

---

## CAPHE Color Reference

| Token | Hex | Usage in DAGs |
|-------|-----|---------------|
| Primary | `#0041A5` | Key nodes, outcome when geography is treatment |
| Secondary/Teal | `#0D9488` | Treatment nodes |
| Accent/Gold | `#F9A825` | Outcome (treatment DAG), Confounder (confounder DAG) |
| Success/Green | `#2E7D32` | Causal arrows (dashed with ?) |
| Text Secondary | `#424242` | Arrows, labels |
| Text Dark | `#1C1C1C` | Dark text on light backgrounds |

---

## Usage Notes

1. Generate both images using Antigravity
2. Save to the `/assets/` folder within the vignette directory
3. The HTML file references these images in Panel 2 (Treatment DAG) and Panel 3 (Confounder DAG)
4. Both images should have consistent styling and node sizes for visual coherence
