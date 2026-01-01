# Antigravity Prompts: Medicaid Expansion DAGs

This file contains prompts for generating DAG images using Antigravity for Lab 18.

---

## DAG 1: Basic Confounding Structure

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in a triangle formation:

- Top center: Blue node (`#0041A5`) with white text "State Healthcare Infrastructure"
- Bottom left: Teal node (`#0D9488`) with white text "Medicaid Expansion"
- Bottom right: Gold/amber node (`#F9A825`) with dark text "Hospital Utilization"

Arrows:
- Solid gray arrow (`#424242`) from "State Healthcare Infrastructure" down-left to "Medicaid Expansion"
- Solid gray arrow (`#424242`) from "State Healthcare Infrastructure" down-right to "Hospital Utilization"
- Dashed green arrow (`#2E7D32`) with question mark from "Medicaid Expansion" right to "Hospital Utilization"

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The dashed arrow should have a "?" label near it to indicate the uncertain causal relationship we want to estimate.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Gold (Outcome) | `#F9A825` |
| Arrow Gray | `#424242` |
| Dashed Arrow Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 450px |
| Format | PNG |

### Output

**Filename:** `medicaid-dag-confounding.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/medicaid-expansion/assets/`

---

## DAG 2: Unmeasured Confounding Structure

### Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
5 nodes arranged to show both measured and unmeasured confounders:

Top row (2 nodes):
- Left: Blue node (`#0041A5`) with white text "State Healthcare Infrastructure" and small label below "(Measured)"
- Right: Orange/warning node (`#F57C00`) with white text "Political Climate & Provider Willingness" and small label below "(Unmeasured)" - this node should have a dashed border to indicate it's unobserved

Middle row (1 node):
- Center-left: Teal node (`#0D9488`) with white text "Medicaid Expansion"

Bottom row (1 node):
- Center-right: Gold/amber node (`#F9A825`) with dark text "Hospital Utilization"

Arrows:
- Solid gray arrow from "State Healthcare Infrastructure" to "Medicaid Expansion"
- Solid gray arrow from "State Healthcare Infrastructure" to "Hospital Utilization"
- Dashed orange arrow from "Political Climate" to "Medicaid Expansion"
- Dashed orange arrow from "Political Climate" to "Hospital Utilization"
- Dashed green arrow with "?" from "Medicaid Expansion" to "Hospital Utilization"

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight.
The unmeasured confounder node should be visually distinct (dashed border or slightly transparent).

Key visual: The orange dashed arrows should suggest hidden pathways that we cannot observe or control for.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 12-14px for node labels, 10px for "(Measured)"/"(Unmeasured)" |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Gold (Outcome) | `#F9A825` |
| Warning Orange | `#F57C00` |
| Arrow Gray | `#424242` |
| Dashed Arrow Orange | `#F57C00` |
| Dashed Arrow Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

### Output

**Filename:** `medicaid-unmeasured-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/medicaid-expansion/assets/`

---

## CAPHE Color Reference

| Token | Hex | Usage in DAGs |
|-------|-----|---------------|
| Primary Blue | `#0041A5` | Measured confounder nodes |
| Secondary Teal | `#0D9488` | Treatment node (Medicaid Expansion) |
| Accent Gold | `#F9A825` | Outcome node (Hospital Utilization) |
| Warning Orange | `#F57C00` | Unmeasured confounder nodes |
| Text Secondary | `#424242` | Solid arrows (known relationships) |
| Success Green | `#2E7D32` | Dashed causal arrow with ? |
