# Antigravity Prompt: Reverse Causation DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a 2x2 formation with two central focal nodes:

**Top row (centered):**
- "Chronic Disease" node - Gold fill (#F9A825), dark text (#1C1C1C)

**Middle row (spaced wide):**
- "?" label centered between the two central questions

**Bottom row (centered):**
- "Unemployment" node - Teal fill (#0D9488), white text

**Arrows (showing bidirectional uncertainty):**
- Curved arrow from "Chronic Disease" down to "Unemployment" - labeled with "?" - Gray (#424242), solid line with arrowhead
- Curved arrow from "Unemployment" up to "Chronic Disease" - labeled with "?" - Gray (#424242), solid line with arrowhead

The two arrows should curve outward to form a visible loop/cycle between the nodes, making the bidirectional nature clear.

**Central question text:**
- Small text between arrows: "Which way does causation run?"

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

Key visual emphasis: The two curved arrows forming a loop to show that both directions of causation are plausible and may operate simultaneously.

## Alternative Layout (Simpler)

If the curved arrows are difficult, use this simpler approach:

Two horizontal nodes side-by-side:
- Left node: "Chronic Disease" - Gold fill (#F9A825)
- Right node: "Unemployment" - Teal fill (#0D9488)

With two straight arrows:
- Top arrow: pointing right, from Disease to Unemployment, with "?" label
- Bottom arrow: pointing left, from Unemployment to Disease, with "?" label

This creates a clear visual of "both directions are possible."

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Gold (Disease) | `#F9A825` |
| Teal (Unemployment) | `#0D9488` |
| Arrow Gray | `#424242` |
| Text Dark | `#1C1C1C` |
| Text Light | `#FFFFFF` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 450px |
| Format | PNG |

## Color Reference (CAPHE Palette)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0041A5` | Available for labels if needed |
| Secondary/Teal | `#0D9488` | Unemployment node |
| Accent/Gold | `#F9A825` | Disease node |
| Text Dark | `#1C1C1C` | Node text, labels |
| Arrow Gray | `#424242` | All arrows |

## Output

**Filename:** `reverse-causation-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/reverse-causation-feedback/assets/`

## Notes for Generation

The key concept to communicate visually:
1. Two variables (Disease and Unemployment) are correlated
2. Either could cause the other (shown by bidirectional arrows)
3. Question marks emphasize the uncertainty about causal direction
4. The loop/cycle visual hints at feedback (both directions may be true)

This supports Panel 2 of the lab, which explains that cross-sectional correlation cannot distinguish:
- Disease causing unemployment
- Unemployment causing disease
- Both causing each other (feedback loop)
