# CAPHE Website - Progress

## What Works

### Core Website
- [x] Homepage with organization overview
- [x] About page
- [x] Programs page (webinars, workshops, working groups)
- [x] Resources page
- [x] Contact page
- [x] Privacy policy and terms

### Authentication System
- [x] Supabase authentication integration
- [x] Email/password login
- [x] Password reset flow
- [x] Session persistence
- [x] Logout functionality
- [x] Login redirect parameter handling

### Methods Lab
- [x] Lab index page with filtering
- [x] Track-based filtering (Impact, Credibility, Value, Pitfalls)
- [x] Search functionality
- [x] 28 total labs (12 public, 13 community, 3 professional)
- [x] Tier-based visibility on index page
- [x] Access control on community lab pages
- [x] Preview-with-gate pattern
- [x] Scroll locking on gated content
- [x] Professional labs completely hidden from non-members

### Membership
- [x] Membership information page
- [x] Professional membership application form
- [x] Community (free) signup
- [x] Member dashboard

### Admin
- [x] Admin panel for membership approvals
- [x] Application review workflow

## What's Left to Build

### OAuth Integration (Planned)
- [ ] Google OAuth on login page
- [ ] LinkedIn OAuth on login page
- [ ] OAuth callback handling in frontend

### Membership Flow Improvements (Planned)
- [ ] Immediate community account creation for professional applicants
- [ ] Admin approval upgrades tier (vs creating new account)
- [ ] Password setup email for new applicants

### Future Enhancements
- [ ] Professional lab access control (individual page protection)
- [ ] Member-only event registration
- [ ] Webinar archive with gated access
- [ ] Working group collaboration tools

## Known Issues

### Resolved
- ~~Community labs accessible via direct URL~~ - Fixed with lab-access-control.js
- ~~Users could scroll past preview gate~~ - Fixed with scroll locking
- ~~Professional labs visible (dimmed) to non-members~~ - Fixed, now completely hidden
- ~~Login didn't redirect back to intended page~~ - Fixed redirect parameter handling

### Current
- None known

## Lab Inventory

### Public Labs (12)
1. What Is a Counterfactual?
2. The Before-After Trap
3. Why Control Groups Aren't Enough
4. Who Gets Treated?
5. Regression to the Mean
6. Correlation ≠ Causation
7. Same Data, Opposite Conclusions
8. Maturation Threat
9. History Threat
10. (+ others in tracks 1-2)

### Community Labs (13)
1. Difference-in-Differences
2. Interrupted Time Series
3. Case Study: CHW Programs
4. Case Study: Medicaid Expansion
5. Confounding vs. Selection Bias
6. Measurement Changes
7. Study Design Hierarchy
8. Detecting P-Hacking
9. Reading Regression Tables
10. Why "It Works" Isn't Enough
11. Measuring Health: QALYs
12. The Cost-Effectiveness Ratio
13. Choosing the Comparator
14. Decision Thresholds
15. Case Study: Food Security & Diabetes
16. Classifying Causal Mechanisms

### Professional Labs (3)
1. Case Study: Comparing Programs
2. Sensitivity Analysis
3. CEA Under Uncertainty

## 2026 Webinar Series - Slides Complete

### February 12: Introduction to Health Economics
- **Slides:** 22 slides in `outputs/presentations/CAPHE_Webinar_HealthEconomicsIntro_2026-02-12.pptx`
- **Generator:** `scripts/generate_health_economics_intro_slides.py`
- **Images:** 9 figures in `outputs/presentations/images/slide-*.png`
- **Prompts:** `outputs/presentations/antigravity-prompts-health-econ-intro-20260130.md`

### April 9: Understanding Cost-Effectiveness: The Basics
- **Slides:** 24 slides in `outputs/presentations/CAPHE_Webinar_CEABasics_2026-04-09.pptx`
- **Generator:** `scripts/generate_cea_basics_slides.py`
- **Images:** 8 figures in `outputs/presentations/images/cea-*.png`
- **Prompts:** `outputs/presentations/antigravity-prompts-cea-basics-20260130.md`
- **Polls:** `outputs/presentations/teams-polls-cea-basics-20260409.md`

### June 11: Return on Investment in Public Health
- **Slides:** 26 slides in `outputs/presentations/CAPHE_Webinar_ROI_2026-06-11.pptx`
- **Generator:** `scripts/generate_roi_webinar_slides.py`
- **Images:** 8 figures in `outputs/presentations/images/roi-*.png`
- **Prompts:** `outputs/presentations/antigravity-prompts-roi-20260130.md`
- **Polls:** `outputs/presentations/teams-polls-roi-20260611.md`

---

## Deployment History

| Date | Version | Changes |
|------|---------|---------|
| Jan 30, 2026 | - | Created 2026 webinar series slides (Feb, April, June) |
| Jan 2, 2026 | v125 | Remove lab count from filter bar |
| Jan 2, 2026 | v124 | Hide professional labs from non-members |
| Jan 2, 2026 | v123 | Fix scroll locking, member lab restoration |
| Earlier | v122 | Add lab access control script |
