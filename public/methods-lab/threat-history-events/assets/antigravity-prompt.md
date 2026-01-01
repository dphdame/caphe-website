# Antigravity Prompt: History Threat DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a diamond formation:

**Top center node (Confounder):**
- Label: "Statewide Event" with subtitle "(Medi-Cal Expansion)"
- Background: Primary Blue (#0041A5)
- Text: White

**Left node (Treatment):**
- Label: "Local Program" with subtitle "(Diabetes Prevention)"
- Background: Teal (#0D9488)
- Text: White

**Right node (Time):**
- Label: "Time Period" with subtitle "(Post-2020)"
- Background: Light Gray (#E0E0E0)
- Text: Dark (#424242)

**Bottom center node (Outcome):**
- Label: "ED Visits" with subtitle "(Diabetes Complications)"
- Background: Accent Gold (#F9A825)
- Text: Dark (#1C1C1C)

**Arrows:**
1. From "Statewide Event" to "Local Program" - solid gray arrow (#424242)
   - The statewide event may have prompted the local program launch
2. From "Statewide Event" to "ED Visits" - solid gray arrow (#424242), thicker (3px)
   - The main confounding path: statewide event directly improves outcomes everywhere
3. From "Time Period" to "Statewide Event" - solid gray arrow (#424242)
   - The event happened at a specific time
4. From "Time Period" to "Local Program" - solid gray arrow (#424242)
   - Program also launched at specific time
5. From "Local Program" to "ED Visits" - dashed green arrow (#2E7D32) with "?" label
   - This is the causal effect we want to estimate, but cannot isolate

**Visual emphasis:**
- The path from "Statewide Event" to "ED Visits" should be visually prominent (thicker arrow)
- Add a subtle annotation or callout: "This path affects ALL counties equally"
- The dashed arrow from "Local Program" to "ED Visits" should have a small "?" near it to indicate uncertainty

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 11-12px for subtitles |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Accent Gold (Outcome) | `#F9A825` |
| Success Green (Causal arrow) | `#2E7D32` |
| Arrow Gray | `#424242` |
| Light Gray (Time) | `#E0E0E0` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Output

**Filename:** `threat-history-events-dag-confounding.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/threat-history-events/assets/`

## Alternative Simplified Version

If the 4-node diagram is too complex, use this 3-node version:

3 rounded rectangle nodes in a triangle:

**Top node (Confounder):**
- Label: "Statewide Medi-Cal Expansion"
- Background: Primary Blue (#0041A5)
- Text: White

**Bottom left node (Treatment):**
- Label: "Local Diabetes Program"
- Background: Teal (#0D9488)
- Text: White

**Bottom right node (Outcome):**
- Label: "ED Visits"
- Background: Accent Gold (#F9A825)
- Text: Dark (#1C1C1C)

**Arrows:**
1. From "Statewide Medi-Cal Expansion" down to "Local Diabetes Program" - solid gray
2. From "Statewide Medi-Cal Expansion" down to "ED Visits" - solid gray, thicker
3. From "Local Diabetes Program" right to "ED Visits" - dashed green with "?"

This shows: The statewide event affects both the program timing AND outcomes directly, making it impossible to know how much of the outcome improvement came from the local program.
