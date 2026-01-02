# CAPHE Website - System Patterns

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Heroku (caphegroup.org)                │
├─────────────────────────────────────────────────────────────┤
│  Express Server (src/backend/server.js)                     │
│  ├── Static Files (public/)                                 │
│  ├── API Routes (/api/*)                                    │
│  └── OAuth Handlers (/api/auth/*)                           │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ├── Supabase (Authentication & User Data)                  │
│  ├── Brevo (Email Marketing & Transactional)                │
│  └── LinkedIn/Google (OAuth Providers)                      │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### Supabase Configuration
```javascript
const SUPABASE_URL = 'https://yyetprjdxwunhtighnrq.supabase.co';
const SUPABASE_ANON_KEY = '...'; // Public anon key (safe for frontend)
```

### User Metadata Structure
```javascript
user.user_metadata = {
  membership_tier: 'affiliate' | 'member',  // affiliate = community, member = professional
  full_name: 'string',
  organization: 'string',
  // ... other profile fields
}
```

### Session Check Pattern
```javascript
const { data: { session } } = await supabaseClient.auth.getSession();
if (session?.user) {
  const tier = session.user.user_metadata?.membership_tier || 'community';
  // tier === 'member' means professional access
  // tier === 'affiliate' or 'community' means community access
}
```

## Methods Lab Access Control

### Index Page Pattern (`/methods-lab/index.html`)

```javascript
// Auth state tracked globally
let userAuth = { authenticated: false, tier: null };

// On page load
async function checkAuthAndUpdateUI() {
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session?.user) {
    userAuth.authenticated = true;
    userAuth.tier = session.user.user_metadata?.membership_tier || 'community';

    showCommunityLabs();
    if (userAuth.tier === 'member') {
      showMemberLabs();
    } else {
      hideMemberLabs();  // Completely hidden
    }
  } else {
    hideCommunityLabs();  // Dimmed, still clickable
    hideMemberLabs();     // Completely hidden
  }
}
```

### Individual Lab Page Pattern (`/methods-lab/*/index.html`)

Community labs include access control script:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/methods-lab/assets/lab-access-control.js"></script>
```

The script checks auth and shows preview gate if not authenticated:
- Shows partial content (top ~25% of page)
- Gradient fade to white overlay
- Scroll locked to prevent bypassing
- CTA buttons for login/signup with redirect param

## Key Patterns

### Preview-with-Gate Pattern
- User sees beginning of content
- Gradient overlay fades to white
- Modal with login/signup CTAs
- Redirect parameter preserves intended destination

### Redirect After Login
```javascript
// Login page reads redirect param
const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');

// After successful auth, redirect back
if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
  window.location.href = redirect;
} else {
  window.location.href = '/dashboard.html';
}
```

### Member Lab Visibility
```javascript
// Store original HTML before modification
const memberLabOriginalHTML = new Map();
document.querySelectorAll('.lab-card.member').forEach(card => {
  memberLabOriginalHTML.set(card, card.innerHTML);
});

// Hide: completely invisible
function hideMemberLabs() {
  document.querySelectorAll('.lab-card.member').forEach(card => {
    card.style.display = 'none';
  });
}

// Show: restore original HTML and make visible
function showMemberLabs() {
  document.querySelectorAll('.lab-card.member').forEach(card => {
    const originalHTML = memberLabOriginalHTML.get(card);
    if (originalHTML) card.innerHTML = originalHTML;
    card.style.display = '';
  });
}
```

## File Structure

```
public/
├── methods-lab/
│   ├── index.html                    # Lab listing page
│   ├── assets/
│   │   └── lab-access-control.js     # Access control for community labs
│   ├── counterfactual-basics/        # Public lab
│   ├── before-after-trap/            # Public lab
│   ├── threat-history-solutions/     # Community lab (has access control)
│   ├── comparing-two-programs/       # Member lab
│   └── ...
├── login.html
├── dashboard.html
├── membership.html
└── ...

src/
├── backend/
│   └── server.js                     # Express server & API routes
└── frontend/
    ├── css/
    │   └── style.css                 # Global styles
    └── js/
        ├── auth.js                   # Login/logout handling
        ├── admin.js                  # Admin panel
        └── main.js                   # Shared utilities
```
