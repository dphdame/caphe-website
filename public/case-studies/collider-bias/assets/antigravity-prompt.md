# Antigravity Prompt: Collider Bias DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in an inverted triangle formation:

**Top row (side by side):**
- Left node: Teal background (#0D9488), white text "Hypertension"
- Right node: Primary blue background (#0041A5), white text "Respiratory Illness"

**Bottom center:**
- Gold/amber background (#F9A825), dark text (#1C1C1C) "Hospitalization"

Arrows:
- Solid dark gray (#424242) arrow from "Hypertension" down to "Hospitalization" (diagonal, pointing down-right)
- Solid dark gray (#424242) arrow from "Respiratory Illness" down to "Hospitalization" (diagonal, pointing down-left)
- Red dashed line (#C62828) connecting "Hypertension" and "Respiratory Illness" horizontally across the top, with small "X" or strikethrough indicating "no direct relationship" OR a label beneath saying "spurious correlation when conditioning"

**Additional element:**
- A subtle box or highlight around "Hospitalization" with text nearby: "COLLIDER" in small caps

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The key visual emphasis: Both top nodes point INTO the bottom node (hospitalization), creating the "collider" structure. The dashed line between the top nodes represents the spurious correlation that appears only when conditioning on the collider.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 10-12px for annotations |
| Primary Blue | `#0041A5` |
| Teal (Hypertension) | `#0D9488` |
| Accent/Gold (Hospitalization) | `#F9A825` |
| Arrow Gray | `#424242` |
| Red (spurious line) | `#C62828` |
| Dark Text | `#1C1C1C` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Alternative Simplified Version

If the above is too complex, use this simpler version:

3 nodes in inverted V shape:
- "Hypertension" (teal, top-left)
- "Respiratory Illness" (blue, top-right)
- "Hospitalization" (gold, bottom-center)

Two solid arrows pointing from the top nodes down to hospitalization.
One dashed red curved line between the top two nodes with annotation "Spurious correlation (in hospital sample only)"

Label beneath hospitalization: "COLLIDER"

## Visual Reference

```
    [Hypertension]     - - - - -     [Respiratory]
         \              spurious          /
          \           correlation        /
           \             ?              /
            \                          /
             v                        v
              [   HOSPITALIZATION   ]
                    (collider)
```

## Output

**Filename:** `collider-bias-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/collider-bias/assets/`
