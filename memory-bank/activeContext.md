# CAPHE Website - Active Context

## Current State (January 2026)

The Methods Lab access control system has been fully implemented with tiered visibility:

### Access Tiers Working
- **Public**: 12 labs accessible without login
- **Community**: 13 labs require free account (preview-with-gate pattern)
- **Professional**: 3 labs completely hidden from non-professional members

## Recent Changes

### Methods Lab Access Control (January 2, 2026)

#### 1. Created Lab Access Control Script
**File**: `/public/methods-lab/assets/lab-access-control.js`

- Checks Supabase authentication on page load
- Shows preview gate overlay for unauthenticated users
- Implements scroll locking to prevent bypassing gate
- Includes redirect parameter for post-login navigation

#### 2. Updated Index Page Visibility Logic
**File**: `/public/methods-lab/index.html`

- Community labs: Dimmed (opacity 0.85) when logged out, fully visible when logged in
- Member labs: Completely hidden (`display: none`) for non-professional members
- Stores original HTML of member cards for restoration when professional logs in
- Removed lab count from filter bar

#### 3. Fixed Login Redirect
**File**: `/src/frontend/js/auth.js`

- Login now respects `?redirect=` parameter
- Users return to intended lab after authentication
- Validates redirect path (must start with `/`, not `//`)

### Key Implementation Details

#### Preview Gate Overlay
```css
#access-preview-gate {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 25%,
    rgba(255, 255, 255, 0.85) 35%,
    rgba(255, 255, 255, 0.98) 45%,
    rgba(255, 255, 255, 1) 55%
  );
  z-index: 10000;
}
```

#### Scroll Lock
```css
html.access-locked, html.access-locked body {
  overflow: hidden !important;
  height: 100% !important;
}
```

#### Member Lab Restoration Pattern
```javascript
// Store before any modification
const memberLabOriginalHTML = new Map();
document.querySelectorAll('.lab-card.member').forEach(card => {
  memberLabOriginalHTML.set(card, card.innerHTML);
});

// Restore when showing
function showMemberLabs() {
  document.querySelectorAll('.lab-card.member').forEach(card => {
    const originalHTML = memberLabOriginalHTML.get(card);
    if (originalHTML) card.innerHTML = originalHTML;
    card.style.display = '';
  });
}
```

## Pending Work

### OAuth Login Implementation
A plan exists at `~/.claude/plans/steady-growing-creek.md` for:
- Adding Google OAuth to login page
- Adding LinkedIn OAuth to login page
- Modifying professional membership flow (create community account immediately)

### Not Yet Implemented
- OAuth buttons on login page
- Immediate account creation for professional applicants
- Admin approval upgrades tier instead of creating account

## Active Decisions

1. **Preview-with-gate vs full block**: Chose preview pattern for better UX
2. **Member labs hidden vs dimmed**: Chose completely hidden for cleaner experience
3. **No lab count**: Removed from filter bar as unnecessary clutter

## Testing Checklist
- [x] Logged out user sees preview gate on community labs
- [x] Logged out user cannot scroll past gate
- [x] Login redirects back to intended lab
- [x] Community member sees all community labs
- [x] Community member cannot see professional labs
- [x] Professional member sees all labs
- [x] Filter counts exclude hidden labs
