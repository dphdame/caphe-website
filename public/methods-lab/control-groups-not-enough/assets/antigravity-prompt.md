# Antigravity Prompt: Why Control Groups Aren't Enough - DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a diamond formation:

**Top node (centered):**
- Label: "Pre-Existing\nDifferences"
- Background: Primary Blue (#0041A5)
- Text: White

**Left middle node:**
- Label: "Diabetes Prevention\nProgram"
- Background: Teal (#0D9488)
- Text: White

**Right middle node:**
- Label: "Baseline Health\n& Resources"
- Background: Teal (#0D9488)
- Text: White

**Bottom node (centered):**
- Label: "Health\nOutcomes"
- Background: Gold (#F9A825)
- Text: Dark (#1C1C1C)

**Arrows:**
1. From "Pre-Existing Differences" to "Diabetes Prevention Program" (solid gray, #424242)
2. From "Pre-Existing Differences" to "Baseline Health & Resources" (solid gray, #424242)
3. From "Baseline Health & Resources" to "Health Outcomes" (solid gray, #424242)
4. From "Diabetes Prevention Program" to "Health Outcomes" (dashed green, #2E7D32, with "?" label near arrowhead)

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The key visual story: Even with a control group (counties without the program), the treated and control groups are not exchangeable because pre-existing differences drove which counties got the program AND affected their baseline health.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment/Mechanism) | `#0D9488` |
| Accent Gold (Outcome) | `#F9A825` |
| Arrow Gray | `#424242` |
| Causal Arrow (dashed) | `#2E7D32` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Output

**Filename:** `control-groups-dag-confounding.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/control-groups-not-enough/assets/`

---

# Antigravity Prompt: Non-Exchangeability DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
3 rounded rectangle nodes arranged in a simple flow:

**Left node:**
- Label: "Program\nCounties"
- Background: Teal (#0D9488)
- Text: White
- Additional small badge/label: "Wealthier, better access" in smaller text below

**Right node:**
- Label: "Control\nCounties"
- Background: Teal (#0D9488)
- Text: White
- Additional small badge/label: "Less wealthy, less access" in smaller text below

**Center bottom node (larger, emphasized):**
- Label: "NOT EXCHANGEABLE"
- Background: Warning Orange (#F57C00)
- Text: White
- Slightly larger than other nodes

**Arrows:**
1. From "Program Counties" down to center (solid gray)
2. From "Control Counties" down to center (solid gray)

Visual element: A "not equal" sign (≠) between the two top nodes

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight.
Nodes have 8px rounded corners and generous padding.

The key visual story: Even though we have two groups, they are not truly comparable because of systematic differences.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Teal | `#0D9488` |
| Warning Orange | `#F57C00` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 600 x 400px |
| Format | PNG |

## Output

**Filename:** `non-exchangeability.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/control-groups-not-enough/assets/`
