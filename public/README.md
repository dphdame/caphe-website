# Public Directory

Static frontend files served by the Express server. All files in this directory are publicly accessible.

## Structure

```
public/
├── index.html              # Homepage
├── about.html              # About CAPHE page
├── programs.html           # Programs overview
├── resources.html          # External resources
├── tools.html              # Health economics tools
├── contact.html            # Contact form
├── login.html              # Authentication page
├── membership.html         # Membership information
├── dashboard.html          # Member dashboard (requires auth)
├── settings.html           # Account settings (requires auth)
├── admin.html              # Admin dashboard (requires admin role)
├── documents.html          # Document library
├── recordings.html         # Webinar recordings
├── peer-review.html        # Peer review sessions
├── auth-callback.html      # OAuth callback handler
├── reset-password.html     # Password reset flow
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── robots.txt              # Search engine directives
├── sitemap.xml             # Sitemap for SEO
│
├── methods-lab/            # Interactive educational labs
│   └── See methods-lab/README.md
│
├── join/                   # Cohort-specific landing pages
│   ├── feb.html            # February cohort
│   ├── apr.html            # April cohort
│   └── jun.html            # June cohort
│
├── membership/             # Membership tier details
│   ├── community.html      # Community (Affiliate) tier
│   └── professional.html   # Professional (Member) tier
│
└── assets/                 # Static assets for public pages
    └── images/
        └── methods-lab/    # Methods lab promotional images
```

## Page Categories

### Public Pages (No Authentication)
- `index.html` - Homepage
- `about.html` - About CAPHE
- `programs.html` - Programs overview
- `resources.html` - External resources
- `tools.html` - Calculators and tools
- `contact.html` - Contact form
- `login.html` - Login/registration
- `membership.html` - Membership tiers
- `privacy.html` - Privacy policy
- `terms.html` - Terms of service

### Authenticated Pages (Require Login)
- `dashboard.html` - Member dashboard
- `settings.html` - Account settings
- `documents.html` - Document library
- `recordings.html` - Webinar recordings
- `peer-review.html` - Peer review sessions

### Admin Pages (Require Admin Role)
- `admin.html` - Admin dashboard

### Utility Pages
- `auth-callback.html` - OAuth redirect handler
- `reset-password.html` - Password reset flow

## Notes

- All HTML pages include the global navigation from `src/frontend/css/style.css`
- Authentication state is managed client-side via `src/frontend/js/auth.js`
- Protected pages check auth status on load and redirect if needed
- Pages use Google Analytics (gtag) for tracking
