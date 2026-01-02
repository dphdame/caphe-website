# CAPHE Website - Technical Context

## Technology Stack

### Frontend
- **HTML5/CSS3/JavaScript** - Static pages, no build step
- **Supabase JS SDK** - Client-side authentication
- **Google Fonts** - Montserrat, Source Sans Pro

### Backend
- **Node.js 18.x** - Runtime
- **Express.js** - Web framework
- **Supabase Admin SDK** - Server-side user management

### External Services
- **Supabase** - Authentication, user database
- **Brevo** - Email marketing, transactional emails
- **LinkedIn OAuth** - Social login
- **Google OAuth** - Social login
- **Heroku** - Hosting platform

### Domain & DNS
- **Domain**: caphegroup.org
- **SSL**: Heroku ACM (Automatic Certificate Management)

## Environment Variables

```bash
# Supabase
SUPABASE_URL=https://yyetprjdxwunhtighnrq.supabase.co
SUPABASE_SERVICE_KEY=<service_role_key>  # Server-side only

# OAuth
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
LINKEDIN_CLIENT_ID=<linkedin_client_id>
LINKEDIN_CLIENT_SECRET=<linkedin_client_secret>

# Email (Brevo)
BREVO_API_KEY=<brevo_api_key>

# App Config
BASE_URL=https://caphegroup.org
PORT=3000
```

## Development Setup

```bash
# Clone and install
cd /Users/victoriaperez/Projects/CAPHE/website
npm install

# Run locally
npm start
# Server runs on http://localhost:3000
```

## Deployment

```bash
# Push to Heroku
git push heroku master

# View logs
heroku logs --tail

# Check app status
heroku ps
```

## Key Files

| File | Purpose |
|------|---------|
| `src/backend/server.js` | Express server, API routes, OAuth handlers |
| `src/frontend/js/auth.js` | Login/logout, session management |
| `public/methods-lab/index.html` | Lab listing with tier-based visibility |
| `public/methods-lab/assets/lab-access-control.js` | Community lab access gating |
| `public/login.html` | Login page |
| `public/dashboard.html` | Member dashboard |
| `public/membership.html` | Join page |

## Supabase Configuration

### User Table Schema
Users are stored in Supabase Auth with metadata:
- `email` - User email
- `user_metadata.membership_tier` - 'affiliate' or 'member'
- `user_metadata.full_name` - Display name
- `user_metadata.organization` - Employer/affiliation

### Public (Anon) Key
Safe for frontend use - can only perform authenticated user operations:
```javascript
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Service Role Key
Server-side only - can perform admin operations:
```javascript
// Never expose in frontend code
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
```

## Dependencies

```json
{
  "dependencies": {
    "express": "^4.x",
    "@supabase/supabase-js": "^2.x",
    "cors": "^2.x",
    "dotenv": "^16.x"
  }
}
```
