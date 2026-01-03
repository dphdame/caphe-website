# CAPHE Website - Project Structure Documentation

## Overview

This document provides a comprehensive map of the CAPHE website codebase, describing the purpose and organization of all major components.

## Directory Tree

```
/Users/victoriaperez/Projects/CAPHE/website/
│
├── public/                         # Static files served to browsers
│   ├── *.html                      # 18 main HTML pages
│   ├── methods-lab/                # 36 interactive educational labs
│   │   ├── index.html              # Lab listing with filtering
│   │   ├── assets/                 # Shared lab images and scripts
│   │   └── [lab-name]/             # Individual lab directories
│   ├── join/                       # 3 cohort landing pages
│   ├── membership/                 # 2 membership tier pages
│   └── assets/images/              # Public static images
│
├── src/                            # Source code
│   ├── backend/
│   │   └── server.js               # Express server (API + static serving)
│   └── frontend/
│       ├── css/style.css           # Main stylesheet
│       └── js/                     # 9 JavaScript modules
│
├── assets/                         # Source/original assets
│   ├── images/                     # Logos, icons, promotional images
│   └── prompts/                    # AI image generation prompts
│
├── database/                       # SQL schema files
│   ├── supabase-tables.sql         # Main schema
│   └── add-membership-tier.sql     # Migration script
│
├── migrations/                     # Database migrations
│   └── 001_membership_applications.sql
│
├── data/                           # Static data files
│   └── california_counties.json    # County reference data
│
├── docs/                           # Documentation
│   ├── MEMBERSHIP_MODEL.md         # Membership tier specs
│   └── PROJECT_STRUCTURE.md        # This file
│
├── memory-bank/                    # AI assistant context files
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── techContext.md
│   ├── systemPatterns.md
│   ├── activeContext.md
│   └── progress.md
│
├── node_modules/                   # Dependencies (gitignored)
├── package.json                    # Node.js configuration
├── package-lock.json               # Dependency lock file
├── Procfile                        # Heroku deployment config
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variable template
├── .env.local                      # Local environment (gitignored)
└── README.md                       # Project overview
```

## Component Relationships

### Request Flow
```
Browser Request
    │
    ▼
Express Server (src/backend/server.js)
    │
    ├──[Static Files]──► public/*.html, methods-lab/*, etc.
    │
    ├──[CSS/JS]──► src/frontend/css/, src/frontend/js/
    │
    └──[API Routes]──► /api/auth/*, /api/contact, /api/admin/*
                            │
                            ▼
                    External Services
                    (Supabase, Brevo)
```

### Authentication Flow
```
User Login
    │
    ├──[Email/Password]──► server.js ──► Supabase Auth
    │
    └──[OAuth]──► Google/LinkedIn ──► server.js ──► Supabase Auth
                                           │
                                           ▼
                                    Session Created
                                           │
                                           ▼
                                    Client (auth.js)
                                    stores in localStorage
```

### Content Tier Access
```
                    ┌─────────────────────────────────┐
                    │         Methods Lab             │
                    └─────────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
   ┌─────────┐              ┌─────────────┐            ┌────────────┐
   │ PUBLIC  │              │  COMMUNITY  │            │PROFESSIONAL│
   │12 labs  │              │   21 labs   │            │   3 labs   │
   │No login │              │ Free acct   │            │ Paid member│
   └─────────┘              └─────────────┘            └────────────┘
                                   │                          │
                                   ▼                          ▼
                            lab-access-control.js    member-lab-access-control.js
```

## File Statistics

| Category | Count | Notes |
|----------|-------|-------|
| HTML Pages | 18 | Main site pages |
| Methods Labs | 36 | Individual lab directories |
| JavaScript Files | 9 | Frontend modules |
| CSS Files | 1 | Single main stylesheet |
| Backend Files | 1 | Express server |
| SQL Files | 3 | Schema and migrations |
| Image Files | ~100 | Icons, DAGs, logos |
| Markdown Files | ~55 | Docs, prompts, context |

## Key Files Reference

### Core Application
| File | Purpose | Size |
|------|---------|------|
| `src/backend/server.js` | Express server, all API routes | ~50KB |
| `src/frontend/css/style.css` | Main stylesheet | ~50KB |
| `src/frontend/js/auth.js` | Authentication module | ~6KB |
| `public/index.html` | Homepage | ~10KB |
| `public/methods-lab/index.html` | Lab listing | ~41KB |

### Configuration
| File | Purpose |
|------|---------|
| `package.json` | Node.js dependencies and scripts |
| `Procfile` | Heroku deployment command |
| `.env.example` | Environment variable template |
| `.gitignore` | Git ignore patterns |

### Documentation
| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `docs/MEMBERSHIP_MODEL.md` | Membership tier specifications |
| `docs/PROJECT_STRUCTURE.md` | This file |
| `memory-bank/*.md` | AI assistant context |

## Naming Conventions

### Files
- HTML pages: `kebab-case.html` (e.g., `peer-review.html`)
- JavaScript: `kebab-case.js` (e.g., `auth.js`, `peer-review.js`)
- CSS: `style.css` (single file)
- Images: `descriptive-name.png` (e.g., `logo-icon.png`)
- DAG diagrams: `topic-dag.png` or `topic-dag-confounding.png`

### Directories
- Lab directories: `kebab-case` (e.g., `counterfactual-basics`)
- Grouped by prefix when related (e.g., `threat-*` labs)

### Variables
- CSS custom properties: `--color-primary`, `--font-sans`
- JavaScript: camelCase for variables, PascalCase for classes

## External Dependencies

### NPM Packages
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| @supabase/supabase-js | ^2.76.1 | Database and auth |
| @getbrevo/brevo | ^3.0.1 | Email service |
| nodemailer | ^7.0.10 | Email sending |

### External Services
| Service | Purpose | Configuration |
|---------|---------|---------------|
| Supabase | Auth, Database | SUPABASE_URL, SUPABASE_SERVICE_KEY |
| Google OAuth | Social login | GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET |
| LinkedIn OAuth | Social login | LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET |
| Brevo | Email marketing | BREVO_API_KEY |
| Heroku | Hosting | Git push deployment |
| Google Analytics | Tracking | G-E1LG1N11QE |

## Maintenance Notes

### Adding New Pages
1. Create HTML file in `public/`
2. Include standard head elements (CSS, fonts, analytics)
3. Add navigation from `style.css`
4. If authenticated, include `auth.js` and check session

### Adding New Labs
1. Create directory: `public/methods-lab/[lab-name]/`
2. Add `index.html` with lab content
3. Create `assets/` subdirectory
4. Add `antigravity-prompt.md` for images
5. Generate and add PNG images
6. Update lab listing in `public/methods-lab/index.html`
7. Apply appropriate access control script

### Updating Styles
- Single source: `src/frontend/css/style.css`
- Use CSS custom properties for theming
- Mobile-first responsive design

---

*Last updated: January 2026*
