# Antigravity Prompt: CEA Under Uncertainty Decision Diagram

## Prompt

Clean, professional decision flow diagram on white background showing the economic framework for decisions under uncertainty.

5 rounded rectangle nodes arranged in a decision flow:

**Left side (Decision Point):**
- Diamond shape node, primary blue (#0041A5), white text: "DECISION"

**Two branches from decision:**

**Upper path (Implement Now):**
- Teal node (#0D9488), white text: "Implement Now"
- Arrow leads to gold node (#F9A825), dark text: "Uncertain Outcomes"
- From uncertain outcomes, two thin arrows: one to green text "Benefits if effective", one to orange text "Waste if ineffective"

**Lower path (Wait for Evidence):**
- Orange/warning node (#F57C00), white text: "Wait for Evidence"
- Arrow leads to two outcomes:
  - Gray text: "Research Costs"
  - Teal text: "Delayed Benefits"

**Center element:**
- Dashed box with gold border around "VALUE OF INFORMATION" text
- Small arrows connecting this box to both the "Uncertain Outcomes" node and the "Wait" path
- This represents the bridge between uncertainty and the decision to research

**Final destination (right side):**
- Large rounded rectangle, gradient from teal to blue: "Net Health Benefit"
- Both paths ultimately lead here

Arrows:
- Solid gray (#424242) arrows for main decision flow
- Dashed gold (#F9A825) arrows connecting VOI concept to uncertainty and waiting
- Arrow heads are small and clean

Style: Flat design, no gradients on nodes (except final destination), no drop shadows.
Minimalist infographic style with clear visual hierarchy.
Montserrat font, semi-bold weight for node labels.
Nodes have 8px rounded corners and generous padding.

Key visual emphasis: The "Value of Information" concept bridges the gap between uncertainty (upper path) and the decision to wait/research (lower path), showing that VOI analysis quantifies whether waiting is worth it.

## Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for node labels, 12px for outcomes |
| Primary Blue (Decision) | `#0041A5` |
| Teal (Implement) | `#0D9488` |
| Gold/Accent (Uncertainty, VOI) | `#F9A825` |
| Orange/Warning (Wait) | `#F57C00` |
| Success Green | `#2E7D32` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 500px |
| Format | PNG |

## Visual Layout Guide

```
                    [Implement Now]---->[Uncertain Outcomes]
                   /     (teal)              (gold)
                  /                            |
[DECISION]-------                    Benefits / Waste
  (diamond)      \
   (blue)         \
                   \                  - - - - - - - - -
                    [Wait for Evidence]  | VOI Analysis |
                         (orange)        - - - - - - - -
                              |                |
                        Research Costs    connects to
                        Delayed Benefits   both paths
                              |
                              v
                    [Net Health Benefit]
                      (gradient teal-blue)
```

## Key Message

The diagram should visually communicate that:
1. There are two choices: act now or wait
2. Acting now faces uncertainty (could work or waste resources)
3. Waiting has its own costs (research expense, delayed benefits)
4. Value of Information analysis connects these trade-offs
5. Both paths ultimately affect net health benefit

## Output

**Filename:** `cea-uncertain-effects-dag.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/cea-uncertain-effects/assets/`
