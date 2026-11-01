# Antigravity Prompts: Food Security and Diabetes Lab

This file contains prompts for generating DAG images using Antigravity for CAPHE Lab 17.

---

## DAG 1: Confounding with Bidirectional Causation

### Filename
`food-diabetes-dag-confounding.png`

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a diamond formation:

- Top center: "Poverty" in dark blue (#0041A5) with white text
- Left middle: "Food Insecurity" in teal (#0D9488) with white text
- Right middle: "Diabetes Hospitalization" in gold (#F9A825) with dark text
- Bottom center: "Chronic Illness" in light gray (#757575) with white text

Arrows (solid gray #424242, 2px stroke):
- Poverty → Food Insecurity (solid arrow going down-left)
- Poverty → Diabetes Hospitalization (solid arrow going down-right)
- Food Insecurity → Diabetes Hospitalization (DASHED green #2E7D32 arrow with "?" label, horizontal)
- Chronic Illness → Poverty (solid arrow going up, representing reverse causation)
- Chronic Illness → Diabetes Hospitalization (solid arrow going up-right)

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The dashed arrow from Food Insecurity to Diabetes Hospitalization should be prominent, indicating this is the uncertain causal relationship we're investigating. The arrow from Chronic Illness to Poverty represents the bidirectional/reverse causation concern.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent (Outcome) | `#F9A825` |
| Arrow Gray | `#424242` |
| Success Green (Dashed) | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

### Save to
`/Users/victoriaperez/Projects/CAPHE/vignettes/food-insecurity-diabetes/assets/`

---

## DAG 2: Unmeasured Confounders

### Filename
`food-diabetes-unmeasured-dag.png`

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
5 rounded rectangle nodes:

Row 1 (top, measured confounders):
- "Poverty" in dark blue (#0041A5) with white text, solid border

Row 2 (middle, unmeasured confounders with DASHED borders):
- "Health Literacy" in orange (#F57C00) with dashed border, white text
- "Transportation Access" in orange (#F57C00) with dashed border, white text

Row 3 (bottom, main variables):
- "Food Insecurity" in teal (#0D9488) with white text
- "Diabetes Hospitalization" in gold (#F9A825) with dark text

Arrows (solid gray #424242 for measured, dashed gray for unmeasured paths):
- Poverty → Food Insecurity (solid)
- Poverty → Diabetes Hospitalization (solid)
- Health Literacy → Food Insecurity (dashed arrow)
- Health Literacy → Diabetes Hospitalization (dashed arrow)
- Transportation Access → Food Insecurity (dashed arrow)
- Transportation Access → Diabetes Hospitalization (dashed arrow)
- Food Insecurity → Diabetes Hospitalization (dashed green #2E7D32 with "?")

A subtle cloud or dotted region around Health Literacy and Transportation Access to indicate they are unmeasured/unobserved.

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Nodes have 8px rounded corners.

The unmeasured confounders should visually stand out as different from measured variables, using dashed borders to indicate they cannot be observed in the data.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal | `#0D9488` |
| Accent Gold | `#F9A825` |
| Warning Orange | `#F57C00` |
| Arrow Gray | `#424242` |
| Success Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

### Save to
`/Users/victoriaperez/Projects/CAPHE/vignettes/food-insecurity-diabetes/assets/`

---

## Usage Notes

1. Generate each image using Antigravity with the prompts above
2. Save with the exact filenames specified
3. The HTML file references these images in:
   - Panel 2 (The Problem): `food-diabetes-dag-confounding.png`
   - Panel 4 (What We Can't Measure): `food-diabetes-unmeasured-dag.png`

## CAPHE Brand Colors Reference

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0041A5` | Measured confounders |
| Secondary/Teal | `#0D9488` | Treatment/exposure variables |
| Accent Gold | `#F9A825` | Outcome variables |
| Warning Orange | `#F57C00` | Unmeasured confounders |
| Success Green | `#2E7D32` | Uncertain causal arrows |
| Text Secondary | `#424242` | Standard arrows |
