# Antigravity Prompt: Causal DAG for Food Insecurity & Diabetes

**Output file:** `dag-food-diabetes.png`
**Save to:** `/Users/victoriaperez/Projects/CAPHE/website/public/assets/images/methods-lab/`
**Dimensions:** 700 x 400 pixels

---

## Prompt

Create a clean, professional causal diagram (DAG) for an academic public health website showing how poverty might confound the relationship between food access and diabetes hospitalizations. Use the CAPHE brand color palette (institutional blue with California poppy gold accent).

### LAYOUT
- Horizontal orientation, 700x400 pixels
- White background (#FFFFFF)
- 4 rectangular nodes with rounded corners (8px radius)
- Directional arrows connecting nodes

### NODES

| Node | Label | Color | Position | Size |
|------|-------|-------|----------|------|
| 1 | Food Access | Green (#2E7D32) at 15% opacity, green border (#2E7D32) | Left center (x=100, y=175) | 120x50px |
| 2 | Hospitalizations | Gold (#F9A825) at 15% opacity, gold border (#F9A825) | Right center (x=480, y=175) | 140x50px |
| 3 | Poverty | Light gray (#F5F5F5), gray border (#E0E0E0) | Top center (x=290, y=50) | 100x50px |
| 4 | Healthcare | Light gray (#F5F5F5), gray border (#E0E0E0) | Bottom center (x=290, y=300) | 100x50px |

### ARROWS
All arrows: CAPHE institutional blue (#0041A5), 2px stroke

- Poverty → Food Access (diagonal down-left)
- Poverty → Hospitalizations (diagonal down-right)
- Healthcare → Food Access (diagonal up-left)
- Healthcare → Hospitalizations (diagonal up-right)
- Food Access → Hospitalizations (horizontal, center) — **DASHED LINE with "?" to indicate the causal path being tested**

### TEXT STYLING
- Font: Source Sans Pro (or similar clean sans-serif like Inter, Segoe UI)
- Font size: 14px
- Font weight: 600 (semibold) for node labels
- Color: Dark text (#1C1C1C)
- Alignment: Center within each node

### STYLE
- Academic, clean, minimal
- No drop shadows
- Subtle, professional appearance
- The dashed arrow from Food Access to Hospitalizations should have a small "?" near it to indicate uncertainty about whether this relationship is causal

---

## CAPHE Brand Color Reference

| Purpose | Hex Code | Usage |
|---------|----------|-------|
| Primary Blue | #0041A5 | Arrows |
| Success Green | #2E7D32 | Treatment node (Food Access) |
| Accent Gold | #F9A825 | Outcome node (Hospitalizations) |
| Border Gray | #E0E0E0 | Confounder node borders |
| Background Gray | #F5F5F5 | Confounder node fills |
| Text | #1C1C1C | All labels |

---

## Corresponding HTML Text (update in food-insecurity-diabetes.html)

```
Reading This Diagram
Food Access (green) — What we want to change through food programs.

Hospitalizations (gold) — What we want to reduce.

Poverty & Healthcare (gray) — Alternative explanations that might create a fake connection.

The dashed arrow with "?" — This is the relationship we're testing. Is it real, or just created by the gray boxes?
```
