# Assets Directory

Source assets including images and AI generation prompts. These are original/source files that may be processed or copied to public directories.

## Structure

```
assets/
├── images/
│   ├── logo.png                        # Full color logo
│   ├── logo-bw.png                     # Black & white logo
│   ├── logo-bw-preview.png             # Logo preview
│   ├── logo-icon.png                   # Square icon version
│   ├── logo-linkedin.png               # LinkedIn-optimized logo
│   ├── hero-california-health-economics.png  # Homepage hero image
│   ├── CAPHE-LinkedIn-Cover-*.png      # LinkedIn cover images
│   ├── linkedin-cover-prompt.md        # AI prompt for cover image
│   │
│   ├── icons/                          # Site feature icons
│   │   ├── icon-*.png                  # Individual icons
│   │   ├── icon-prompts.md             # AI prompts for icons
│   │   └── ICON_PROMPTS.md             # Icon generation reference
│   │
│   └── vignettes/                      # Promotional/marketing images
│       ├── dag-food-diabetes.png       # DAG diagram
│       └── dag-food-diabetes-prompt.md # AI prompt for diagram
│
└── prompts/                            # AI image generation prompts
    ├── antigravity-icons.md            # Master prompt for icon style
    └── antigravity-logo-icon.md        # Logo icon generation prompt
```

## Image Types

### Logos
| File | Dimensions | Use Case |
|------|------------|----------|
| `logo.png` | Full size | Website header, documents |
| `logo-bw.png` | Full size | Print, monochrome contexts |
| `logo-icon.png` | Square | Favicons, app icons |
| `logo-linkedin.png` | Optimized | LinkedIn profile |

### Icons (assets/images/icons/)
Feature icons for membership benefits and programs:
- `icon-advocacy.png`
- `icon-collaborative-research.png`
- `icon-discount.png`
- `icon-feedback.png`
- `icon-methods-lab.png`
- `icon-peer-review.png`
- `icon-professional-development.png`
- `icon-resources.png`
- `icon-webinars.png`
- `icon-working-groups.png`
- `icon-workshops.png`
- `icon-admin.png`
- `icon-present.png`
- `icon-submit-document.png`
- And more...

### Vignettes
Marketing and promotional images, including DAG diagrams used in promotional materials.

## AI Prompts

The `prompts/` directory and various `*-prompt.md` files contain prompts for AI image generation tools (specifically Antigravity). These document:
- Visual style requirements
- Color palette specifications
- Diagram content and structure
- Consistency guidelines

## Relationship to Public Assets

Some assets are duplicated in `public/assets/` for web serving. The `assets/` directory serves as the source/archive, while `public/assets/` contains production-ready copies.

### Notable Duplicates
Files may exist in both locations:
- `assets/images/vignettes/dag-food-diabetes.png`
- `public/assets/images/methods-lab/dag-food-diabetes.png`

The `public/` version is the canonical served version.

## Notes

- All images are PNG format for quality
- AI-generated images use Antigravity tool
- Prompts are kept alongside images for reproducibility
- `.DS_Store` files may exist (macOS artifacts, gitignored)
