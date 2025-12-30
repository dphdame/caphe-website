# Antigravity Prompt: Causal DAG for Food Insecurity & Diabetes

**Output file:** `dag-food-diabetes.png`
**Dimensions:** 700 x 400 pixels

---

## Prompt

Create a clean, professional causal diagram (DAG) for an academic public health website showing how poverty might confound the relationship between food access and diabetes hospitalizations.

### LAYOUT
- Horizontal orientation, 700x400 pixels
- White background
- 4 rectangular nodes with rounded corners (8px radius)
- Directional arrows connecting nodes

### NODES

| Node | Label | Color | Position | Size |
|------|-------|-------|----------|------|
| 1 | Food Access | Green (#2d7d46) at 15% opacity, green border | Left center (x=100, y=175) | 120x50px |
| 2 | Hospitalizations | Terra cotta (#c9553a) at 15% opacity, matching border | Right center (x=480, y=175) | 140x50px |
| 3 | Poverty | Light gray (#f1f3f5), gray border (#dee2e6) | Top center (x=290, y=50) | 100x50px |
| 4 | Healthcare | Light gray (#f1f3f5), gray border (#dee2e6) | Bottom center (x=290, y=300) | 100x50px |

### ARROWS
All arrows: dark blue (#1e3a5f), 2px stroke

- Poverty → Food Access (diagonal down-left)
- Poverty → Hospitalizations (diagonal down-right)
- Healthcare → Food Access (diagonal up-left)
- Healthcare → Hospitalizations (diagonal up-right)
- Food Access → Hospitalizations (horizontal, center) — **DASHED LINE with "?" to indicate the causal path being tested**

### TEXT STYLING
- Font: Sans-serif (Inter, Source Sans Pro, or similar)
- Font size: 14px
- Color: Dark gray (#343a40)
- Alignment: Center within each node

### STYLE
- Academic, clean, minimal
- No drop shadows
- Subtle, professional appearance
- The dashed arrow from Food Access to Hospitalizations should have a small "?" near it to indicate uncertainty about whether this relationship is causal

---

## Color Reference

| Purpose | Hex Code | Usage |
|---------|----------|-------|
| Primary (dark blue) | #1e3a5f | Arrows |
| Success (green) | #2d7d46 | Treatment node (Food Access) |
| Accent (terra cotta) | #c9553a | Outcome node (Hospitalizations) |
| Border gray | #dee2e6 | Confounder node borders |
| Background gray | #f1f3f5 | Confounder node fills |
| Text | #343a40 | All labels |
