# Antigravity Prompt: Measurement Error in Claims Data DAG

## Prompt

Clean, professional directed acyclic graph (DAG) diagram on white background.
4 rounded rectangle nodes arranged in a diamond formation:

**Top node (center):**
- Label: "True Diabetes Status"
- Background: Primary Blue (#0041A5)
- Text: White

**Left node (middle level):**
- Label: "Claims-Based Measure"
- Background: Gold (#F9A825)
- Text: Dark text (#1C1C1C)
- Note: This represents the mismeasured variable

**Right node (middle level):**
- Label: "Healthcare Costs"
- Background: Teal (#0D9488)
- Text: White
- Note: This is the outcome

**Bottom node (center):**
- Label: "Measurement Error"
- Background: Light gray (#E0E0E0)
- Text: Dark gray (#424242)
- Note: This affects only the measurement

Arrows:
1. Solid dark gray (#424242) arrow from "True Diabetes Status" to "Healthcare Costs" (the causal effect we want)
2. Solid dark gray arrow from "True Diabetes Status" to "Claims-Based Measure" (true status determines measured status)
3. Dashed dark gray arrow from "Measurement Error" to "Claims-Based Measure" (error corrupts the measure)
4. Dashed green (#2E7D32) arrow with "?" from "Claims-Based Measure" to "Healthcare Costs" (what we observe, but it's attenuated)

Style: Flat design, no gradients, no shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Arrows have small arrowheads.
Nodes have 8px rounded corners and generous padding.

Key visual emphasis: The "Claims-Based Measure" node should look distinct as it's the problematic mismeasured variable. The arrow from True Status to Costs is the real relationship; the arrow from Claims to Costs (with ?) is what we estimate but it's biased.

## Alternative Layout (Classical Error Focus)

If the diamond layout is too complex, use a horizontal layout:

```
[True X] -----> [Observed Y]
    |               ^
    v               |
[Measured X*] ------+ (attenuated)
    ^
    |
[Error]
```

This shows:
- True X causes Y (the real effect)
- True X determines Measured X* (with error added)
- Measured X* is what we use to estimate the effect on Y
- The estimate is attenuated (shrunk toward zero)

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels |
| Primary Blue | `#0041A5` |
| Teal (Outcome) | `#0D9488` |
| Gold (Mismeasured) | `#F9A825` |
| Arrow Gray | `#424242` |
| Success Green | `#2E7D32` |
| Light Gray | `#E0E0E0` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Output

**Filename:** `measurement-error-claims-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/measurement-error-claims/assets/`

## Usage Notes

This DAG is optional for Lab 33 since the lab focuses more on the mathematical formula and interactive attenuation demonstration. However, if used, it should appear in a "Types of Error" or supplementary section to illustrate how measurement error enters the causal model.

The key insight to convey visually:
- We want to estimate the effect of True Diabetes on Costs
- We only observe Claims-Based Diabetes (which has error)
- The error attenuates (shrinks) our estimate toward zero
