# Antigravity Prompt: Regression to the Mean DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a diamond/cross formation:

**Top Center:** "Extreme Baseline Selection" in dark blue (`#0041A5`) with white text
**Left Center:** "Random Variation" in teal (`#0D9488`) with white text
**Right Center:** "Observed Improvement" in gold (`#F9A825`) with dark text (`#1C1C1C`)
**Bottom Center:** "True Performance" in gray (`#757575`) with white text

Arrows:
- From "Extreme Baseline Selection" to "Observed Improvement" (solid gray `#424242`, curved right)
- From "Random Variation" to "Extreme Baseline Selection" (solid gray, going up-right)
- From "Random Variation" to "Observed Improvement" (solid gray, going right)
- From "True Performance" to "Extreme Baseline Selection" (solid gray, going up)
- From "True Performance" to "Observed Improvement" (solid gray, going up-right)

Add a dashed green arrow with question mark from a small "Program Effect?" label (green `#2E7D32`) pointing to "Observed Improvement" - this represents the uncertain causal path we're trying to isolate.

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The visual story: Selection based on extreme values conflates random variation with true improvement. The program effect is uncertain because regression to the mean provides an alternative explanation.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Random) | `#0D9488` |
| Accent (Outcome) | `#F9A825` |
| Gray (True Performance) | `#757575` |
| Arrow Gray | `#424242` |
| Success Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Output

**Filename:** `threat-regression-to-mean-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/threat-regression-to-mean/assets/`
