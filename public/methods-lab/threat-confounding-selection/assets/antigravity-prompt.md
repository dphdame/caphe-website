# Antigravity Prompt: Confounding vs Selection Bias DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
Four rounded rectangle nodes arranged in a diamond/kite formation:

Top node (centered): "Income" - Primary Blue (#0041A5) background, white text
Left node (middle-left): "Program Adoption" - Teal (#0D9488) background, white text
Right node (middle-right): "Health Outcomes" - Gold (#F9A825) background, dark text (#1C1C1C)
Bottom node (centered, optional): "Unmeasured Factors" - Light gray (#E0E0E0) background, gray text (#757575), slightly smaller with dashed border

Arrows:
1. Income -> Program Adoption: Solid dark gray (#424242) arrow pointing down-left
2. Income -> Health Outcomes: Solid dark gray (#424242) arrow pointing down-right
3. Program Adoption -> Health Outcomes: Dashed green (#2E7D32) arrow with "?" label, pointing right (this represents the causal effect we want to estimate)
4. Unmeasured Factors -> Program Adoption: Dashed gray (#757575) arrow pointing up-left
5. Unmeasured Factors -> Health Outcomes: Dashed gray (#757575) arrow pointing up-right

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The Income node should be visually prominent as the key confounder. The dashed arrow from Program to Outcomes with "?" emphasizes this is the causal effect we're trying to isolate. The Unmeasured Factors node should appear subtle/ghostly to show it represents hidden confounders.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Gold (Outcome) | `#F9A825` |
| Success Green | `#2E7D32` |
| Arrow Gray | `#424242` |
| Muted Gray | `#757575` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Node Text

- Top: "Income" (or "Median Income")
- Left: "Program Adoption" (or "Has Program")
- Right: "Health Outcomes" (or "Hospitalizations")
- Bottom: "Unmeasured Factors" (or "Health Consciousness, Capacity...")

## Visual Hierarchy

1. The Income -> Program and Income -> Outcomes paths should be visually strong (these show the confounding)
2. The Program -> Outcomes path should be dashed with "?" to show uncertainty
3. The Unmeasured Factors node and its arrows should be subtle/faded to suggest hidden variables

## Output

**Filename:** `confounding-selection-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/threat-confounding-selection/assets/`

## Alternative Simpler Version

If the four-node version is too complex, create a simpler three-node version:

Three rounded rectangle nodes in an inverted triangle:
- Top center: "Income" (Primary Blue)
- Bottom left: "Program" (Teal)
- Bottom right: "Outcomes" (Gold)

Arrows:
- Income -> Program (solid gray)
- Income -> Outcomes (solid gray)
- Program -> Outcomes (dashed green with "?")

This simpler version focuses purely on the classic confounding structure without the unmeasured factors complication.
