# Antigravity Prompt: P-Hacking and Multiple Testing DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
A visual flowchart showing how researcher degrees of freedom lead to spurious findings:

Top section - One large rounded rectangle node:
- Navy blue (`#0041A5`) fill, white text: "Researcher Degrees of Freedom"
- Subtitle in smaller text: "(Sample, Outcome, Model, Controls)"

Middle section - Four rounded rectangle nodes arranged horizontally:
- All in teal (`#0D9488`) fill, white text
- From left to right: "Sample A", "Sample B", "Sample C", "Sample D"

Bottom section - Eight small rounded rectangle nodes (two below each Sample):
- Four nodes in gray (`#757575`) fill: "p = 0.23", "p = 0.67", "p = 0.41", "p = 0.89"
- Two nodes in gray: "p = 0.15", "p = 0.32"
- One node in gold (`#F9A825`) fill, white text: "p = 0.04"
- One node in gray: "p = 0.56"

Arrows:
- One thick gray arrow from "Researcher Degrees of Freedom" to each of the four Sample nodes
- Two thin gray arrows from each Sample node to its two p-value results below

The gold "p = 0.04" node should be slightly larger and have a star or highlight effect to indicate this is the "significant" result that gets published.

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The visual story: Many choices lead to many tests, but only the single "significant" result (by chance) gets reported.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 12px for p-values |
| Primary Blue | `#0041A5` |
| Teal | `#0D9488` |
| Accent Gold | `#F9A825` |
| Gray | `#757575` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Alternative Simpler Version

If the above is too complex, a simpler version:

Clean diagram showing:
- Top: Large box "Many Tests Run" (blue `#0041A5`)
- Middle: Three arrows pointing down to three outcome boxes
- Bottom left: "Null Result 1" (gray)
- Bottom center: "Null Result 2" (gray)
- Bottom right: "Significant! p=0.04" (gold `#F9A825`, highlighted)
- A "Published" label with arrow pointing only to the gold box
- A "File Drawer" label with arrows pointing to the gray boxes

This simpler version tells the story of publication bias: many tests run, most null results hidden, one spurious significant result published.

## Output

**Filename:** `p-hacking-multiple-testing-dag-confounding.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/p-hacking-multiple-testing/assets/`
