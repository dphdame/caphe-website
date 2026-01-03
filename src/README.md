# Source Code Directory

Contains the backend server and frontend JavaScript/CSS source files.

## Structure

```
src/
├── backend/
│   └── server.js           # Express server (50KB, ~1500 lines)
│
└── frontend/
    ├── css/
    │   └── style.css       # Main site stylesheet (50KB)
    │
    └── js/                 # Client-side JavaScript modules
        ├── auth.js         # Authentication & session management
        ├── admin.js        # Admin dashboard functionality
        ├── dashboard.js    # Member dashboard
        ├── main.js         # Common site functionality
        ├── calculator.js   # Health economics calculators
        ├── documents.js    # Document library
        ├── recordings.js   # Webinar recordings
        ├── peer-review.js  # Peer review system
        └── settings.js     # Account settings
```

## Backend (server.js)

The Express server handles:

### Static File Serving
- Serves all files from `/public` directory
- Serves CSS/JS from `/src/frontend`

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/auth/login` | POST | Email/password login |
| `/api/auth/register` | POST | User registration |
| `/api/auth/google` | GET | Google OAuth initiation |
| `/api/auth/google/callback` | GET | Google OAuth callback |
| `/api/auth/linkedin` | GET | LinkedIn OAuth initiation |
| `/api/auth/linkedin/callback` | GET | LinkedIn OAuth callback |
| `/api/auth/reset-password` | POST | Password reset email |
| `/api/contact` | POST | Contact form submission |
| `/api/membership/apply` | POST | Membership application |
| `/api/admin/*` | Various | Admin operations |

### Authentication Flow
1. User initiates login (email/password or OAuth)
2. Server validates credentials via Supabase
3. Session established with Supabase Auth
4. Client stores session in localStorage
5. Protected API routes verify session

### External Services Integration
- **Supabase** - User authentication and database
- **Brevo** - Transactional and marketing emails
- **Google OAuth** - Social login
- **LinkedIn OAuth** - Social login

## Frontend JavaScript

### auth.js
Core authentication module:
- `initAuth()` - Initialize auth state on page load
- `login(email, password)` - Email/password login
- `logout()` - Sign out user
- `getCurrentUser()` - Get current session
- `requireAuth()` - Redirect if not authenticated
- OAuth redirect handlers

### admin.js
Admin dashboard operations:
- User management (view, approve, modify)
- Membership tier updates
- Application review

### dashboard.js
Member dashboard:
- Display user profile
- Show membership status
- Access to member resources

### main.js
Common functionality:
- Navigation state
- Mobile menu toggle
- Utility functions

### calculator.js
Health economics calculators:
- QALY calculations
- Cost-effectiveness ratios
- Budget impact models

### documents.js / recordings.js
Content library management:
- List available resources
- Filter by category
- Access control based on tier

### peer-review.js
Peer review system:
- Submit work for review
- View assigned reviews
- Provide feedback

### settings.js
Account management:
- Update profile information
- Change password
- Notification preferences

## Frontend CSS (style.css)

Single stylesheet for entire site:
- CSS custom properties for theming
- Responsive design (mobile-first)
- Component styles (nav, cards, forms, etc.)
- Page-specific sections
- Utility classes

### Key Variables
```css
--color-primary: #0041A5;      /* CAPHE blue */
--color-secondary: #0D9488;    /* Teal accent */
--color-accent: #F9A825;       /* Gold accent */
--font-heading: 'Montserrat';
--font-body: 'Source Sans Pro';
```

## Development Notes

### No Build Step
Frontend uses vanilla JavaScript and CSS - no bundler or transpiler required. Files are served directly by Express.

### Module Pattern
JS files use the revealing module pattern or simple namespacing. No ES6 modules (for browser compatibility without bundling).

### Authentication State
Auth state is managed client-side via Supabase JS SDK. The server validates tokens on protected API routes but doesn't maintain server-side sessions.
