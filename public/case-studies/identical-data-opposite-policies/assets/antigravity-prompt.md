# Antigravity Prompt: Identical Data Opposite Policies DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in a triangle formation:

**Top center:** "County Capacity" node in primary blue (#0041A5) with white text. This represents unmeasured factors like grant-writing ability, health department infrastructure, and political will.

**Bottom left:** "CHW Program Adoption" node in teal (#0D9488) with white text. This is the treatment/exposure variable.

**Bottom right:** "Health Outcomes" node in gold/amber (#F9A825) with dark text. This is the outcome variable.

Arrows:
1. Solid dark gray arrow (#424242) from "County Capacity" down to "CHW Program Adoption" (capacity enables program adoption)
2. Solid dark gray arrow (#424242) from "County Capacity" down to "Health Outcomes" (capacity directly improves outcomes)
3. Dashed green arrow (#2E7D32) from "CHW Program Adoption" to "Health Outcomes" with a "?" label near the arrowhead (the causal effect we want to measure but cannot identify)

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The visual should emphasize that County Capacity is the "backdoor path" that confounds the CHW-Outcomes relationship. The dashed arrow with "?" should clearly indicate uncertainty about whether CHWs actually cause better outcomes or if the association is entirely due to confounding.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Gold (Outcome) | `#F9A825` |
| Arrow Gray | `#424242` |
| Causal Arrow Green | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Node Text

- Top: "County Capacity" (subtitle: "Infrastructure, Political Will, Resources")
- Bottom Left: "CHW Program"
- Bottom Right: "Health Outcomes"

## Output

**Filename:** `identical-data-opposite-policies-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/identical-data-opposite-policies/assets/`

## Alternative Version (Optional)

You may also want to create a simplified version without the subtitle for cleaner presentation:

**Filename:** `identical-data-opposite-policies-dag-simple.png`
