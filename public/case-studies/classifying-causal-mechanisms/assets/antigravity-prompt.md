# Antigravity Prompt: Classifying Causal Mechanisms DAG

## Prompt

Clean, professional flowchart diagram on white background showing the classification-to-design workflow.

Layout: Top-to-bottom flow with one entry point, four branches, and matching design outputs.

**Top Section - Entry:**
- Single rounded rectangle node at top: "Observed Correlation" in white text on primary blue (#0041A5)
- Arrow pointing down to diamond decision node

**Middle Section - Classification:**
- Diamond shape in center: "Classify Mechanism" in dark text (#1C1C1C) on light gray (#F5F5F5)
- Four arrows radiating out to four rectangular nodes arranged in a horizontal row:

From left to right:
1. "Confounding" - Orange fill (#F57C00), white text
2. "Reverse Causation" - Gold fill (#F9A825), dark text (#1C1C1C)
3. "Selection Bias" - Yellow-orange fill (#F57F17), dark text (#1C1C1C)
4. "True Effect" - Green fill (#2E7D32), white text

**Bottom Section - Designs:**
Each classification node has an arrow pointing down to a design recommendation:

1. Under Confounding: "IV, RD, DiD" in teal (#0D9488) rounded pill shape
2. Under Reverse Causation: "Panel Data, Event Study" in teal (#0D9488) rounded pill shape
3. Under Selection Bias: "Bounds, Heckman" in teal (#0D9488) rounded pill shape
4. Under True Effect: "RCT, Natural Experiment" in teal (#0D9488) rounded pill shape

**Connecting Elements:**
- All arrows in medium gray (#424242) with small arrowheads
- Arrows from diamond to mechanism nodes are labeled with question shortcuts:
  - To Confounding: "Third variable?"
  - To Reverse: "Y causes X?"
  - To Selection: "Sample changes?"
  - To True Effect: "X causes Y"

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight for all text.
Nodes have 8px rounded corners and generous padding.
Arrow labels in small italic text (#757575).

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 11px for arrow labels |
| Primary Blue | `#0041A5` |
| Teal (Designs) | `#0D9488` |
| Orange (Confounding) | `#F57C00` |
| Gold (Reverse) | `#F9A825` |
| Yellow-Orange (Selection) | `#F57F17` |
| Green (True Effect) | `#2E7D32` |
| Arrow Gray | `#424242` |
| Label Gray | `#757575` |
| Background | White (`#FFFFFF`) |
| Dimensions | 900 x 500px |
| Format | PNG |

## Visual Hierarchy

1. **Entry node** (top): Draws the eye first - bold blue
2. **Decision diamond** (center): Neutral gray, focal point
3. **Mechanism types** (middle row): Color-coded for quick recognition
4. **Design outputs** (bottom): Consistent teal shows these are the actionable outputs

## Key Visual Story

The diagram should communicate:
- One correlation can have multiple explanations
- Each explanation type maps to specific research designs
- The workflow is systematic: observe -> classify -> design

## Output

**Filename:** `classifying-causal-mechanisms-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/classifying-causal-mechanisms/assets/`
