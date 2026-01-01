# CAPHE Methods Lab - Membership & Access Model

## Overview

The Methods Lab uses a tiered access model to balance open educational access with community building and sustainable growth.

## Access Tiers

### 1. Free (No Account Required)
- **Labs**: 9 foundational labs
- **Website term**: Public / Visitor
- **Purpose**: Lower barrier to entry, demonstrate value, SEO discovery
- **Target**: Anyone curious about health economics methods
- **Examples**:
  - What Is a Counterfactual?
  - The Before-After Trap
  - Why Control Groups Aren't Enough
  - Correlation ≠ Causation
  - History Threat / Maturation Threat

### 2. Community Member (Free Account Required)
- **Labs**: 19 intermediate labs
- **Website term**: **Community Member**
- **Purpose**: Build email list, create community, track engagement
- **Target**: Public health professionals wanting deeper learning
- **Requirement**: Create free account via Google, LinkedIn, or email
- **Benefits**:
  - Access to all Community learning labs
  - Public webinar invitations
  - White paper and resource announcements
  - Tool release notifications
  - Monthly event updates
- **Examples**:
  - Difference-in-Differences
  - Interrupted Time Series
  - Case Studies (CHW Programs, Medicaid Expansion)
  - Cost-Effectiveness Analysis labs
  - Reading Regression Tables

### 3. Professional Member (Eligibility Required)
- **Labs**: 7 advanced labs (hidden in current mockup)
- **Website term**: **Professional Member**
- **Purpose**: Professional community, peer collaboration
- **Target**: Trained economists in public health
- **Requirement**: PhD in economics, Master's with econometrics, or current PhD student
- **Benefits**:
  - Peer Review Sessions (present your work, get feedback)
  - Working Groups (collaborate on shared resources)
  - Member-only webinar sessions and learning labs
  - Webinar archive and all Community Member benefits

## Lab Distribution

| Tier | Count | Percentage |
|------|-------|------------|
| Free | 9 | 26% |
| Community Member | 19 | 54% |
| Professional Member | 7 | 20% |
| **Total** | **35** | 100% |

## Authentication Stack

### Providers
- **Google OAuth** - Primary (most users have Google accounts)
- **LinkedIn OAuth** - Professional audience preference
- **Email Magic Link** - Fallback for users who prefer email

### Technical Implementation
- **Supabase Auth** handles all authentication
- OAuth credentials stored in `.env.local` (not committed)
- Frontend detects auth state and unlocks Community Member labs
- Session persisted in localStorage

### Supabase Configuration
```
Project: yyetprjdxwunhtighnrq.supabase.co
Redirect URLs:
  - http://localhost:8000/index-mockup.html (dev)
  - https://caphegroup.org/labs/ (production - TBD)
```

## User Flow

### New Visitor
1. Lands on Methods Lab index page
2. Sees all labs with Free/Community Member badges
3. Can immediately access any Free lab
4. Clicking Community Member lab → Sign-in modal appears

### Sign-up Flow
1. User clicks Community Member lab or "Join the community" link
2. Modal offers: LinkedIn | Google | Email options
3. User authenticates via chosen provider
4. Redirected back to labs page, now logged in
5. Community Member labs unlocked (lock icons removed)
6. User added to Brevo email list (List ID: 13)

### Return Visitor
1. Session persisted in browser
2. Auto-logged in on page load
3. All Community Member labs accessible
4. Hero shows "Welcome back, [Name]!"

## Content Gating Strategy

### Why Gate Community Member Labs?
- Build addressable audience (email list)
- Track engagement and popular content
- Enable future features (progress tracking, certificates)
- Create path to paid offerings

### Why Keep Free Labs?
- SEO discovery (Google indexes free content)
- Demonstrate quality before asking for signup
- Lower barrier for casual learners
- Professional courtesy for educational content

## Email Integration (Brevo)

### Lists
- **List 9**: General newsletter subscribers
- **List 13**: Methods Lab members (Community Member tier)
- **List 14**: Event registrations
- **List 15**: Applications

### Triggers
- New Community Member signup → Add to List 13
- (Future) Welcome email sequence
- (Future) New lab notifications

## Files

### Mockup
`/Users/victoriaperez/Projects/CAPHE/vignettes/index-mockup.html`

### Credentials
`/Users/victoriaperez/Projects/CAPHE/website/.env.local`

### Original Index (Production)
`/Users/victoriaperez/Projects/CAPHE/vignettes/index.html`

## Future Considerations

1. **Progress Tracking**: Store which labs user has completed
2. **Certificates**: Issue completion certificates for tracks
3. **Professional Tier**: Implement payment for advanced labs
4. **Custom Domain**: `auth.caphegroup.org` for cleaner OAuth flow
5. **Analytics**: Track lab engagement by user segment
