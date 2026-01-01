# Antigravity Prompt: Selection Into Treatment DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
5 rounded rectangle nodes arranged in a configuration showing selection into treatment:

**Top Row (Factors affecting selection):**
- Node 1 (left): "County Wealth" - Blue fill (#0041A5), white text
- Node 2 (center): "Health Infrastructure" - Blue fill (#0041A5), white text
- Node 3 (right): "Political Will" - Blue fill (#0041A5), white text

**Bottom Row (Treatment and Outcome):**
- Node 4 (left-center): "Maternal Health Program" - Teal fill (#0D9488), white text
- Node 5 (right-center): "Maternal Mortality" - Gold fill (#F9A825), dark text (#1C1C1C)

**Arrows (all gray #424242 unless specified):**
- County Wealth -> Maternal Health Program (solid arrow)
- County Wealth -> Maternal Mortality (solid arrow)
- Health Infrastructure -> Maternal Health Program (solid arrow)
- Health Infrastructure -> Maternal Mortality (solid arrow)
- Political Will -> Maternal Health Program (solid arrow)
- Political Will -> Maternal Mortality (dashed arrow, lighter)
- Maternal Health Program -> Maternal Mortality (dashed green #2E7D32 arrow with "?" label)

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

The key visual story: Multiple factors (wealth, infrastructure, political will) all flow into BOTH the treatment decision AND the outcome. The dashed arrow from Program to Mortality represents the uncertain causal effect we want to measure. The selection problem is visually clear because the same factors that determine who gets treated also determine outcomes directly.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Treatment) | `#0D9488` |
| Gold (Outcome) | `#F9A825` |
| Causal Arrow (dashed) | `#2E7D32` |
| Other Arrows | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Node Layout

```
        [County Wealth]     [Health Infrastructure]     [Political Will]
              \                      |                        /
               \                     |                       /
                v                    v                      v
           [Maternal Health Program]  ---- ? ---->  [Maternal Mortality]
```

The arrows from the top row should converge on both the Program node and the Mortality node, making it visually clear that selection and outcomes share common causes.

## Output

**Filename:** `selection-into-treatment-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/selection-into-treatment/assets/`

## Alternative Simpler Version

If the 5-node version is too complex, create a simpler 4-node version:

3 rounded rectangle nodes:
- Top center: "County Characteristics" (wealth, infrastructure, will) - Blue fill (#0041A5)
- Bottom left: "Program Adoption" - Teal fill (#0D9488)
- Bottom right: "Maternal Mortality" - Gold fill (#F9A825)

Arrows:
- County Characteristics -> Program Adoption (solid gray)
- County Characteristics -> Maternal Mortality (solid gray)
- Program Adoption -> Maternal Mortality (dashed green with "?")

This simpler version emphasizes the core selection problem: the same characteristics that predict treatment also predict outcomes.
