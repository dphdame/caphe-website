# Methods Lab

Interactive educational labs teaching causal inference and economic evaluation methods for public health professionals.

## Overview

The Methods Lab provides self-paced, interactive learning experiences using California-specific case studies. Content is tiered based on membership level.

## Structure

```
methods-lab/
├── index.html                              # Lab listing page with filtering
├── health-economics-education-landscape-analysis.md  # Research document
│
├── assets/                                 # Shared assets for all labs
│   ├── lab-access-control.js               # Community lab gating
│   ├── member-lab-access-control.js        # Professional lab gating
│   ├── antigravity-prompt.md               # AI image generation master prompt
│   ├── *.png                               # Shared DAG diagrams and images
│   └── unmeasured-confounder-dag.md        # Diagram specification
│
└── [lab-name]/                             # Individual lab directories
    ├── index.html                          # Lab content
    └── assets/                             # Lab-specific assets
        ├── antigravity-prompt.md           # AI prompt for this lab's images
        └── *.png                           # Lab-specific images (DAGs, diagrams)
```

## Labs by Access Tier

### Public Labs (12 labs) - No Account Required
| Lab | Topic |
|-----|-------|
| `counterfactual-basics` | What Is a Counterfactual? |
| `before-after-trap` | The Before-After Trap |
| `control-groups-not-enough` | Why Control Groups Aren't Enough |
| `correlation-causation-interactive` | Correlation vs Causation |
| `selection-into-treatment` | Selection Into Treatment |
| `collider-bias` | Collider Bias |
| `reverse-causation-feedback` | Reverse Causation |
| `geographic-variables` | Geographic Variables as Confounders |
| `measurement-error-claims` | Measurement Error in Claims Data |
| `threat-history-events` | Threat: History Events |
| `threat-maturation-trends` | Threat: Maturation |
| `threat-regression-to-mean` | Threat: Regression to Mean |

### Community Labs (21 labs) - Free Account Required
| Lab | Topic |
|-----|-------|
| `confounding-assessment-checklist` | Confounding Assessment |
| `identical-data-opposite-policies` | Same Data, Different Conclusions |
| `threat-history-maturation` | History vs Maturation |
| `threat-history-solutions` | Addressing History Threats |
| `threat-maturation-solutions` | Addressing Maturation |
| `threat-measurement-instrumentation` | Instrumentation Threats |
| `threat-confounding-selection` | Confounding & Selection |
| `observational-to-experimental` | Study Design Progression |
| `study-design-ladder` | Hierarchy of Evidence |
| `p-hacking-multiple-testing` | Multiple Testing Issues |
| `regression-tables-confounding` | Reading Regression Tables |
| `chw-health-outcomes` | Case: Community Health Workers |
| `medicaid-expansion` | Case: Medicaid Expansion |
| `food-insecurity-diabetes` | Case: Food Insecurity & Diabetes |
| `classifying-causal-mechanisms` | Causal Mechanisms |
| `why-it-works-isnt-enough` | Beyond Mechanism |
| `budget-impact` | Budget Impact Analysis |
| `cost-effectiveness-ratio` | Cost-Effectiveness Ratios |
| `measuring-health-common-unit` | QALYs and DALYs |
| `decision-thresholds` | Willingness-to-Pay Thresholds |
| `comparator-choice` | Choosing Comparators |

### Professional Labs (3 labs) - Paid Membership Required
| Lab | Topic |
|-----|-------|
| `comparing-two-programs` | Case: Comparing Program Alternatives |
| `sensitivity-analysis-cea` | Sensitivity Analysis in CEA |
| `cea-uncertain-effects` | CEA Under Uncertainty |

## Lab Anatomy

Each lab follows a consistent structure:
1. **Introduction** - Problem framing with real-world context
2. **Interactive Visualization** - Hands-on learning component
3. **Key Concepts** - Core takeaways
4. **Practice Questions** - Self-assessment
5. **Further Reading** - References and resources

### Access Control

Labs use JavaScript-based access control:
- `lab-access-control.js` - Gates community-tier labs
- `member-lab-access-control.js` - Gates professional-tier labs

Non-authenticated users see a preview with a call-to-action to join.

## Naming Conventions

### Lab Directories
- Use kebab-case: `threat-history-events`
- Descriptive but concise names
- Group related labs with common prefixes (e.g., `threat-*`)

### Asset Files
- DAG diagrams: `[topic]-dag.png` or `[topic]-dag-confounding.png`
- Concept diagrams: `[topic]-diagram.png` or `[topic]-concept.png`
- AI prompts: `antigravity-prompt.md`

## Development Notes

### Adding a New Lab

1. Create directory: `methods-lab/[lab-name]/`
2. Add `index.html` with lab content
3. Create `assets/` subdirectory for images
4. Add `antigravity-prompt.md` with image generation prompts
5. Generate and add images
6. Update `index.html` lab listing with proper tier badge

### Image Generation

Labs use Antigravity (AI image tool) for consistent diagram style:
- Each lab has an `antigravity-prompt.md` in its assets folder
- Prompts specify diagram type, colors, and content
- Generated PNGs are stored alongside the prompt

## Related Files

- `/src/frontend/css/style.css` - Lab styling (shares site styles)
- `/src/frontend/js/auth.js` - Authentication for gated content
