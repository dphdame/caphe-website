# CAPHE Website

California Association of Public Health Economists - Professional Organization Website

## Overview

This repository contains the website for CAPHE (caphegroup.org), a professional organization providing resources, programs, and educational content for public health economists in California.

## Project Structure

```
website/
├── public/                    # Static frontend files served by Express
│   ├── *.html                 # Main site pages (index, about, programs, etc.)
│   ├── methods-lab/           # Interactive educational labs
│   │   ├── index.html         # Lab listing page
│   │   ├── assets/            # Shared lab assets (images, JS)
│   │   └── [lab-name]/        # Individual lab directories
│   │       ├── index.html     # Lab content
│   │       └── assets/        # Lab-specific images
│   ├── join/                  # Join cohort landing pages
│   ├── membership/            # Membership tier pages
│   └── assets/                # Public static assets
│       └── images/
├── src/                       # Source code
│   ├── backend/
│   │   └── server.js          # Express server, API routes, OAuth
│   └── frontend/
│       ├── css/
│       │   └── style.css      # Main site stylesheet
│       └── js/                # Client-side JavaScript modules
│           ├── auth.js        # Authentication & session management
│           ├── admin.js       # Admin dashboard functionality
│           ├── dashboard.js   # Member dashboard
│           ├── main.js        # Common site functionality
│           └── ...
├── assets/                    # Source assets (images, prompts)
│   ├── images/
│   │   ├── icons/             # Site icons
│   │   └── vignettes/         # Promotional images
│   └── prompts/               # AI image generation prompts
├── database/                  # Database schema files
│   ├── supabase-tables.sql    # Main database schema
│   └── add-membership-tier.sql
├── migrations/                # Database migrations
├── data/                      # Static data files
│   └── california_counties.json
├── docs/                      # Documentation
│   └── MEMBERSHIP_MODEL.md    # Membership tier documentation
├── memory-bank/               # Project context files (Cursor/Claude)
├── package.json               # Node.js dependencies
├── Procfile                   # Heroku deployment config
└── .env.example               # Environment variable template
```

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js 18.x, Express.js |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth, Google/LinkedIn OAuth |
| Email | Brevo (transactional & marketing) |
| Hosting | Heroku |
| Domain | caphegroup.org |

## Membership Tiers

1. **Public** - No account required
   - Access to foundational Methods Lab content
   - Public website pages

2. **Community (Affiliate)** - Free account
   - 16+ advanced methodology labs
   - California case studies
   - Webinar recordings

3. **Professional (Member)** - Paid/approved
   - Full content access
   - Working groups
   - Peer review sessions

## Development

### Prerequisites
- Node.js 18.x
- npm

### Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev

# Or start production server
npm start
```

Server runs on http://localhost:3000

### Environment Variables

See `.env.example` for required variables:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `GOOGLE_CLIENT_ID/SECRET` - Google OAuth credentials
- `LINKEDIN_CLIENT_ID/SECRET` - LinkedIn OAuth credentials
- `BREVO_API_KEY` - Email service API key
- `BASE_URL` - Production URL (https://caphegroup.org)

## Deployment

```bash
# Deploy to Heroku
git push heroku master

# View logs
heroku logs --tail
```

## Key Features

### Methods Lab
Interactive educational labs teaching:
- Causal inference methods
- Threats to validity
- Cost-effectiveness analysis
- California-specific case studies

### Programs
- Monthly webinars
- Annual workshops
- Working groups
- Peer review sessions

## License

MIT License - See LICENSE file for details.

## Repository

https://github.com/caphegroup/caphe-website
