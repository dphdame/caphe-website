# Antigravity Prompt: Difference-in-Differences DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
5 rounded rectangle nodes arranged in a clear layout showing the DiD identification strategy:

**Top row (left to right):**
- "Common Shock" node (Primary Blue `#0041A5`) - represents statewide events affecting both groups
- "Program" node (Teal `#0D9488`) - represents the treatment

**Middle row:**
- "Treatment County" node (Teal `#0D9488`) - Riverside
- "Comparison County" node (Gold `#F9A825`) - San Joaquin

**Bottom row (centered):**
- "ED Visits" node (Gold `#F9A825`) - the outcome

**Arrows:**
1. "Common Shock" -> "Treatment County" (gray `#424242`, solid)
2. "Common Shock" -> "Comparison County" (gray `#424242`, solid)
3. "Program" -> "Treatment County" (teal `#0D9488`, solid)
4. "Treatment County" -> "ED Visits" (gray `#424242`, solid)
5. "Comparison County" -> "ED Visits" (gray `#424242`, solid)
6. Small "X" or strikethrough on the "Common Shock" -> "ED Visits" indirect path, indicating DiD removes this

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

**Key visual emphasis:** Show that the "Common Shock" affects both counties equally, and DiD removes this shared influence to isolate the program effect.

## Alternative Simpler Design

If the above is too complex, use this simpler 4-node design:

**Left side (stacked vertically):**
- "Common Shock" node (Primary Blue `#0041A5`)

**Center (2 nodes side by side):**
- "Treatment Group" node (Teal `#0D9488`)
- "Comparison Group" node (Gold `#F9A825`)

**Right side:**
- "Outcome" node (Gold `#F9A825`)

**Arrows:**
1. "Common Shock" -> "Treatment Group" (gray, solid)
2. "Common Shock" -> "Comparison Group" (gray, solid)
3. "Treatment Group" -> "Outcome" (gray, solid)
4. "Comparison Group" -> "Outcome" (gray, solid)
5. Dashed box around "Common Shock" -> both groups connection labeled "Differenced Out"

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Gold (Outcome/Comparison) | `#F9A825` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## CAPHE Color Reference

| Token | Hex | Usage in DAG |
|-------|-----|--------------|
| Primary | `#0041A5` | Common shock / confounding nodes |
| Secondary/Teal | `#0D9488` | Treatment-related nodes |
| Accent | `#F9A825` | Outcome / comparison group nodes |
| Text Secondary | `#424242` | Arrows |
| Success Green | `#059669` | DiD-specific highlighting (optional) |

## Output

**Filename:** `threat-history-solutions-dag-did.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/threat-history-solutions/assets/`

## Usage Note

This DAG is optional for Lab 13. The lab focuses on the DiD calculation and visualization rather than causal diagram representation. If generated, it would be added to the "How DiD Works" panel to visually explain how differencing removes common shocks.
