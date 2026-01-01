# Antigravity Prompt: Regression Tables for Confounding DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background illustrating omitted variable bias and sensitivity analysis.

Four rounded rectangle nodes arranged in a diamond formation:

**Top center:** "Measured Confounders" in primary blue (#0041A5) with white text
- Contains subtext: "Age, Education, Prior Earnings, Industry"

**Bottom center:** "Unmeasured Confounders" in accent gold (#F9A825) with dark text
- Contains subtext: "Motivation, Ability, Networks"
- Dashed border to indicate unobserved

**Left:** "Training Program" in teal (#0D9488) with white text

**Right:** "Earnings" in primary blue (#0041A5) with white text

Arrows:
1. "Measured Confounders" -> "Training Program" (solid gray #424242, labeled "Selection")
2. "Measured Confounders" -> "Earnings" (solid gray #424242, labeled "Direct effect")
3. "Unmeasured Confounders" -> "Training Program" (dashed gray #424242, labeled "?")
4. "Unmeasured Confounders" -> "Earnings" (dashed gray #424242, labeled "?")
5. "Training Program" -> "Earnings" (solid green #2E7D32, thicker, labeled "Causal effect?")

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

Visual emphasis: The dashed lines from "Unmeasured Confounders" should be prominent to show the uncertainty. Include a small annotation box in the bottom right that says "Oster bounds estimate how much bias these hidden paths create."

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 10-12px for subtext |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Gold | `#F9A825` |
| Arrow Gray | `#424242` |
| Success Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 450px |
| Format | PNG |

## Output

**Filename:** `regression-tables-confounding-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/regression-tables-confounding/assets/`

## Alternative Simpler Version

If the above is too complex, create a simpler 3-node version:

Three rounded rectangle nodes in a triangle:

**Top:** "Unmeasured Confounders (U)" in accent gold (#F9A825) with dashed border

**Bottom left:** "Training" in teal (#0D9488)

**Bottom right:** "Earnings" in primary blue (#0041A5)

Arrows:
1. U -> Training (dashed gray)
2. U -> Earnings (dashed gray)
3. Training -> Earnings (solid green, labeled "Observed effect: $2,800" and below "True effect: ?")

Include annotation: "Oster bounds ask: How strong would U need to be to eliminate the effect?"
