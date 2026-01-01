# Antigravity Prompt: Confounding Assessment Checklist DAG

This lab does not require a traditional DAG image since it is a tool/checklist-focused lab rather than a scenario-specific confounding demonstration.

However, if you wish to create supporting visuals, here are two optional prompts:

---

## Option 1: Sensitivity Analysis Concept Diagram

### Prompt

Clean, professional infographic diagram on white background showing the concept of sensitivity analysis for unmeasured confounding.

Central flow with 3 elements arranged horizontally:

LEFT BOX - Teal rounded rectangle (#0D9488):
- Text: "Observed Effect"
- Subtitle: "RR = 1.5"

CENTER BOX - Gold/Amber rounded rectangle (#F9A825) with dashed border:
- Text: "Unmeasured Confounder"
- Question mark icon inside
- Subtitle: "How strong?"

RIGHT BOX - Blue rounded rectangle (#0041A5):
- Text: "True Effect"
- Subtitle: "RR = ?"

Arrows:
- Solid gray arrow (#424242) from LEFT to CENTER labeled "Could explain"
- Dashed gray arrow from CENTER to RIGHT labeled "Would need..."

Below the diagram, a horizontal scale labeled:
- Left end: "Small confounder needed" (green #2E7D32)
- Right end: "Large confounder needed" (red #C62828)

Style: Flat design, no gradients, no heavy shadows. Minimalist infographic style.
Montserrat font, semi-bold weight. Rounded rectangles have 8px corners.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14-16px for labels, 12px for subtitles |
| Teal (Observed) | `#0D9488` |
| Gold (Unknown) | `#F9A825` |
| Primary Blue (True) | `#0041A5` |
| Success Green | `#2E7D32` |
| Danger Red | `#C62828` |
| Arrow Gray | `#424242` |
| Background | White (`#FFFFFF`) |
| Dimensions | 800 x 400px |
| Format | PNG |

### Output

**Filename:** `sensitivity-analysis-concept.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/confounding-assessment-checklist/assets/`

---

## Option 2: Checklist Flow Diagram

### Prompt

Clean, professional flowchart diagram on white background showing the 6-step confounding assessment checklist.

6 numbered boxes arranged in 2 rows of 3, connected by arrows:

Row 1 (left to right):
1. Blue box (#0041A5): "Define Treatment & Outcome"
2. Teal box (#0D9488): "Map Selection Process"
3. Blue box (#0041A5): "Inventory Measured Confounders"

Row 2 (left to right):
4. Gold box (#F9A825): "Identify Unmeasured Confounders"
5. Gold box (#F9A825): "Conduct Sensitivity Analysis"
6. Teal box (#0D9488): "Consider Alternative Designs"

Arrows:
- Gray arrows (#424242) connecting 1->2->3
- Arrow from 3 down to 4
- Gray arrows connecting 4->5->6

Each box has white text and a number badge in the top-left corner.

Style: Flat design, no gradients, minimal shadows. Clean infographic style.
Montserrat font, semi-bold weight. Boxes have 12px rounded corners.

### Specifications

| Property | Value |
|----------|-------|
| Font | Montserrat Semi-Bold |
| Font Size | 14px for box labels |
| Primary Blue | `#0041A5` |
| Secondary Teal | `#0D9488` |
| Accent Gold | `#F9A825` |
| Arrow Gray | `#424242` |
| Text on colored boxes | White (`#FFFFFF`) |
| Background | White (`#FFFFFF`) |
| Dimensions | 900 x 450px |
| Format | PNG |

### Output

**Filename:** `checklist-flow.png`

**Save to:** `/Users/victoriaperez/Projects/CAPHE/vignettes/confounding-assessment-checklist/assets/`

---

## Notes

These visuals are optional enhancements. The lab is fully functional without them since it uses interactive JavaScript elements rather than static DAG diagrams to convey its concepts.

If images are generated, they can be added to Panel 2 (The Checklist) to provide visual reinforcement of the structured approach.
