# Antigravity Prompt: Unmeasured Confounder DAG

## File Specifications

| Property | Value |
|----------|-------|
| **Filename** | `unmeasured-confounder-dag.png` |
| **Save Path** | `/Users/victoriaperez/Projects/CAPHE/vignettes/chw-health-outcomes/assets/` |
| **Dimensions** | 800 x 450 pixels |
| **Background** | White (#FFFFFF) |

---

## Prompt for Antigravity

Create a clean, professional directed acyclic graph (DAG) showing unmeasured confounding in a health policy context. The visual should make clear that even after adjusting for measured confounders, hidden variables still bias the estimate.

### Layout

Four nodes arranged in a diamond pattern:

- **Top center:** "Community Trust & Social Cohesion" (UNMEASURED - the hidden problem)
- **Middle left:** "Community Resources" (measured - what we adjusted for)
- **Bottom left:** "CHW Program" (treatment)
- **Bottom right:** "Health Outcomes" (outcome)

### Node Specifications

**1. Unmeasured node (Community Trust):**
- Dashed rounded rectangle border (4px dash pattern)
- Border color: Amber (#F9A825)
- Fill: Very light amber (#FFF8E1)
- Text: "Community Trust & Social Cohesion" in dark gray (#424242)
- Font: 13px Montserrat Semi-Bold
- Add a "?" symbol in amber (#F9A825) to the right of the node

**2. Measured confounder (Community Resources):**
- Solid rounded rectangle
- Fill: Light gray (#E0E0E0)
- Border: 2px solid medium gray (#9E9E9E)
- Text: "Community Resources" in dark gray (#424242)
- Font: 12px Montserrat Semi-Bold
- Small checkmark or "✓" nearby to indicate "measured"

**3. Treatment node (CHW Program):**
- Solid rounded rectangle
- Fill: Teal (#0D9488)
- Text: "CHW Program" in white
- Font: 14px Montserrat Semi-Bold

**4. Outcome node (Health Outcomes):**
- Solid rounded rectangle
- Fill: Primary Blue (#0041A5)
- Text: "Health Outcomes" in white
- Font: 14px Montserrat Semi-Bold

### Arrow Specifications

| From | To | Style | Color | Width |
|------|-----|-------|-------|-------|
| Community Trust | Community Resources | Dashed, curved | Amber (#F9A825) | 2.5px |
| Community Trust | CHW Program | Dashed, curved | Amber (#F9A825) | 2.5px |
| Community Trust | Health Outcomes | Dashed, curved | Amber (#F9A825) | 2.5px |
| Community Resources | CHW Program | Solid | Gray (#757575) | 2px |
| Community Resources | Health Outcomes | Solid | Gray (#757575) | 2px |
| CHW Program | Health Outcomes | Dashed with "?" label | Teal (#0D9488) | 3px |

- Arrowheads: Small filled triangles
- Dashed pattern: 8px dash, 4px gap

### Annotations

**Bottom center annotation:**
- Text: "We adjusted for resources. But what about trust?"
- Font: 14px Montserrat Regular, italic
- Color: #757575

### Style Notes

- Clean, minimal flat design - no gradients or shadows
- The unmeasured node (amber, dashed) should visually "pop" as the problem
- The measured node (gray, solid, checkmark) shows what we DID control for
- Contrast between gray "solved" pathways and amber "unsolved" pathways
- Generous whitespace
- Professional but approachable

---

## Color Reference (CAPHE Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #0041A5 | Outcome node |
| Secondary Teal | #0D9488 | Treatment node |
| Accent Amber | #F9A825 | Unmeasured pathways, warning |
| Light Amber | #FFF8E1 | Unmeasured node fill |
| Gray | #757575 | Measured pathways |
| Light Gray | #E0E0E0 | Measured confounder node |
| Text Dark | #424242 | Labels |
| White | #FFFFFF | Background |

---

## Usage Context

This DAG appears in Lab 1 (CHW Health Outcomes) after the stratification exercise. It shows that even after adjusting for Community Resources, the unmeasured "Community Trust" variable still creates a backdoor path. The full lesson ("this is what economists mean by identification") comes in the Questions to Consider panel.
