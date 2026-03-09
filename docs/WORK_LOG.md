# CAPHE Website Work Log

## 2026-03-09: SEO Performance Audit + 4-Stream Improvement Sprint

### Completed
- Full performance audit: GA4 (178 sessions/28d, 81% direct, 6% organic) + GSC (7 clicks total, ~150 impressions)
- Stream A: Removed .html from all internal links across 76 files (62 HTML + 9 JS/server + scripts)
- Stream B: Optimized meta titles/descriptions on 10 Methods Lab pages with GSC impressions but 0 clicks
- Stream C: Added Article + LearningResource JSON-LD schema to all 37 Methods Lab pages via batch script
- Stream D Phase 1: Built county-to-HRR crosswalk (58 counties → 24 HRRs) from Dartmouth Atlas + Census data
- Added OG tags to 10 Methods Lab pages
- Committed HSR revision files (exhibit tables, revised manuscript)
- Deployed v209

### Files Modified
- 76 files across `public/`, `src/`, `scripts/` — .html link cleanup
- 10 `public/methods-lab/*/index.html` — meta title/description rewrites + OG tags
- 37 `public/methods-lab/*/index.html` — Article + LearningResource JSON-LD injection
- `scripts/add-article-schema.py` — NEW: batch schema injection (idempotent)
- `scripts/build-hrr-crosswalk.py` — NEW: Dartmouth/Census crosswalk builder
- `data/access-explorer/county_hrr_crosswalk.json` — NEW: 58 counties → 24 HRRs
- `src/backend/server.js` — cleaned .html from redirect URLs

### Decisions Made
- Article schema uses dual type `["Article", "LearningResource"]` for richer SERP treatment + educational semantics
- Author attribution: CAPHE (organization), not personal — these are institutional tools
- Dates omitted from schema (no reliable publish/modify tracking)
- Riverside manually assigned to Palm Springs/Rancho Mira HRR (preserves distinct Dartmouth HRR #69)

### Next Steps
- Monitor GSC over next 2-4 weeks for indexing of clean URLs and schema pickup
- Stream D Phases 2-4: HRR aggregation in build script, frontend toggle, QI checks
- Add OG tags to remaining 27 Methods Lab pages (only 10 done this session)
- Add Article schema to other site pages (tools, recordings, etc.)
- Request GSC re-indexing of .html variant pages to speed deindexing

### Extracted Artifacts
- `scripts/add-article-schema.py` — reusable for new lab pages

---

## 2026-02-21: HSR Manuscript — Final Corrections, Submission, SSRN Prep

### Completed
- Applied hallucination corrections #6 (FQHC "cost-based" → "prospective...cost-related payment system"), #7 (FQHCs "disproportionately urban" → "serve both urban and rural communities"), #8 (1115 waiver "2% increases" → "2 percentage points in the rate ratio")
- Verified MACPAC Ref 10 against actual PDF — found 2 fabricated statistics (1.25pp elasticity, 87.4% vs 52.0% acceptance rates), removed both and replaced with what the report actually says
- Corrected author credential: MPP → PhD across all manuscript files
- Created title-page.docx for ScholarOne double-blind submission
- Submitted manuscript to HSR via ScholarOne (Research Brief, submitted Feb 20)
- Created SSRN version: LaTeX source → 17-page PDF (Times, double-spaced, all 4 exhibits inline)
- SSRN PDF uses CAPHE-only affiliation (no Berkeley/email)
- Set up publication tracker: 3 manuscripts tracked (HSR submitted, SNAP submitted to JPAM, Income Dynamics under review at JRS)
- Copied all submission files to Desktop for easy Chrome upload

### Files Modified
- `docs/hsr-research-brief.md` — Corrections #6, #7, #8; MACPAC stats removal; MPP→PhD
- `docs/hsr-submission/manuscript.docx` — Regenerated 3x (after corrections, MACPAC fix, PhD fix)
- `docs/hsr-submission/manuscript-blinded.docx` — Regenerated in parallel
- `docs/hsr-submission/cover-letter.docx` — Regenerated in parallel
- `docs/hsr-submission/title-page.docx` — NEW: separate title page for double-blind
- `docs/hsr-submission/main_text_ssrn.tex` — NEW: LaTeX source for SSRN
- `docs/hsr-submission/main_text_ssrn.pdf` — NEW: 17-page SSRN PDF
- `docs/hsr-submission/SUBMISSION_CHECKLIST.md` — Added hallucination review section
- `~/.claude/projects/-Users-victoriaperez/memory/publications.json` — HSR submitted, SNAP + Income Dynamics added
- `~/.claude/projects/-Users-victoriaperez/memory/journals.json` — HSR, JPAM, JRS entries

### Decisions Made
- SSRN affiliation: CAPHE only (no Berkeley, no email) — brand-focused
- JEL codes: I11, I13, I18
- SSRN classifications: Health Economics (primary), Public Economics (secondary)
- Post as working paper, not published/accepted

### Next Steps
- Upload SSRN PDF via Chrome Claude (file on Desktop, prompt provided)
- Update publications.json with SSRN abstract_id once posted
- Monitor HSR ScholarOne for status changes (expect 8-12 weeks)
- Access Explorer: implement specialty rankings panel (plan exists)

### Extracted Artifacts
- None this session

---

## 2026-02-16: Homepage Redesign — What's New Section with Tag Filters

### Completed
- Redesigned homepage from 5 sections to 3: Hero → What's New → Mission
- Removed "What We Do" (Workshops/Webinars/Working Groups cards) — redundant with nav
- Removed "Upcoming Events" section — folded into What's New cards
- Built "What's New" section with filterable tag pills (All / Tools / Events / Learning)
- 5 cards: Access Explorer, CEA Basics webinar, Methods Lab, ROI Calculator, Health Econ recording
- Synthesized hero subtitle merging old hero + "What We Do" copy into single statement
- Removed hero CTA buttons (redundant with nav bar)
- Added ItemList schema for tools (GEO/AI discoverability)
- Added Access Explorer to sitemap.xml (was missing entirely) and llms.txt
- Iteratively tightened spacing: hero padding, card sizes, tag pills, section gaps
- CSS cache-bust across all pages (style.css?v=N)
- Deployed v181 (initial redesign); spacing refinements pending deploy

### Files Modified
- `public/index.html` — Full homepage restructure, ItemList schema, tag filter JS
- `src/frontend/css/style.css` — .filter-tag, .card-badge, .whats-new-card, #whats-new/#mission spacing
- `public/sitemap.xml` — Added Access Explorer URL, updated homepage lastmod
- `public/llms.txt` — Added Access Explorer entry under Key Resources
- 60+ files — CSS cache-bust (style.css?v=N)

### Decisions Made
- Two agents (UX + GEO) both recommended Option C (Tools section + Latest section), but user preferred single compact "What's New" section with tag filters to reduce scrolling
- Removed hero CTA buttons — nav already has "Join CAPHE" and program links
- Card descriptions trimmed to one line each for compact layout
- "Stay Up to Date — Sign Up Free" CTA links to community membership signup (future newsletter channel)
- Filter tags use pill-button UI with color-coded card badges (green=Tool, blue=Event, orange=Learning)

### Next Steps
- Deploy spacing refinements (v182)
- Continue HRR Market Area view implementation (plan at ~/.claude/plans/rustling-napping-lemon.md)
- Build county-to-HRR crosswalk (Phase 1 of plan)
- Post LinkedIn draft for Access Explorer (at /tmp/linkedin-access-explorer-v2.md)
- Article schema on 37 Methods Lab pages (deferred from Feb 14)

### Extracted Artifacts
- None this session

---

## 2026-02-15: Access Explorer — Participation Rate Reframe + LinkedIn Post

### Completed
- Reframed entire Access Explorer from "phantom network detection" to "Medicaid participation rate measurement"
- Key methodological distinction: NPPES = all licensed providers (full pool), not Medicaid directory listings. A provider absent from Medicaid billing may never have opted in. Phantom networks (Zhu et al. 2023) use plan directory listings as the denominator.
- Updated meta descriptions (3 tags), WebApplication schema, FAQPage schema (3 entries), About section (2 subsections rewritten), 2 FAQ entries
- Fixed specialty FAQ: "highest phantom rates" → "lowest Medicaid participation rates"
- Fixed duplicate footer (two copyright lines → one clean line)
- Drafted and style-passed LinkedIn post (117 words) tied to Feb 14 HHS/DOGE Medicaid data release (10.3 GB, opendata.hhs.gov)
- Deployed v178 (reframe) and v179 (footer fix) to Heroku

### Files Modified
- `public/tools/access-explorer/index.html` — Meta descriptions, schema, About section, FAQ entries, specialty FAQ, footer dedup

### Decisions Made
- Tool measures participation rates, not phantom networks — NPPES captures all licensed providers, not Medicaid-specific directories
- Kept phantom network discussion in About section as context ("What this measures and what it doesn't") rather than removing entirely
- Removed #PhantomNetworks from LinkedIn hashtags
- HHS data release (Feb 14, 2026) used as LinkedIn post hook

### Next Steps
- Post LinkedIn draft (at /tmp/linkedin-access-explorer-v2.md)
- Continue HRR Market Area view implementation (plan at ~/.claude/plans/rustling-napping-lemon.md)
- Build county-to-HRR crosswalk (Phase 1 of plan)
- Add QI checks script (Phase 4 of plan)

### Extracted Artifacts
- None this session

---

## 2026-02-14: GEO Optimization — Schema Markup, OG Tags, AI Crawler Directives

### Completed
- Ran full GEO audit (score: 28/100) identifying zero schema, zero OG tags, no AI directives
- Implemented Tier 1+2 GEO recommendations across 62 files
- Added Organization JSON-LD to homepage and about page
- Added WebApplication + FAQPage JSON-LD to ROI Calculator
- Added VideoObject JSON-LD to recordings page
- Added OG + Twitter Card + og:image meta tags to 12 public pages
- Created `llms.txt` at site root for AI crawler discoverability
- Updated `robots.txt` with GPTBot, ClaudeBot, PerplexityBot, Google-Extended directives
- Added static FAQ section with methodology summary to ROI Calculator page
- Updated sitemap: ROI Calculator priority 0.7 → 0.9, recordings 0.7 → 0.8
- Fixed copyright year 2025 → 2026 across 57 files
- Updated meta descriptions (homepage, about, recordings)
- Fixed canonical URL on recordings page (removed .html extension)
- Deployed as v170-v171 to Heroku
- Validated: Rich Results Test detected schemas, Facebook Debugger confirmed OG tags
- Investigated tooearlytosay.com DNS error in Rich Results Test — confirmed site is indexed fine via GSC API (tool bug, not real issue)

### Files Modified
- `public/robots.txt` — AI crawler Allow directives
- `public/llms.txt` — NEW: AI discoverability file
- `public/sitemap.xml` — Regenerated with current dates and updated priorities
- `scripts/generate-sitemap.js` — Added ROI Calculator (0.9) and recordings (0.8) to PRIORITY_MAP
- `public/index.html` — Organization JSON-LD, OG tags, og:image, updated meta description, "Last updated" date
- `public/about.html` — Organization JSON-LD, OG tags, og:image, updated meta description
- `public/tools/lha-calculator/index.html` — WebApplication + FAQPage JSON-LD, OG tags, og:image, static FAQ section, copyright fix
- `public/recordings.html` — VideoObject JSON-LD, OG tags, og:image, updated meta description, canonical fix, "Last updated" date
- `public/methods-lab/index.html` — OG tags, og:image, "Last updated" date
- `public/programs.html` — OG tags, og:image
- `public/resources.html` — OG tags, og:image
- `public/membership.html` — OG tags, og:image
- `public/membership/community.html` — OG tags, og:image
- `public/membership/professional.html` — OG tags, og:image
- `public/contact.html` — OG tags, og:image
- `public/past-events.html` — OG tags, og:image
- `public/terms.html` — Citation year fix, copyright fix
- 57 files total — Copyright year 2025 → 2026

### Decisions Made
- Use `logo.png` (1024x1024) as og:image — not ideal aspect ratio for social preview but better than nothing
- Skip `fb:app_id` — non-critical, only needed for Facebook Insights analytics
- Skip Article schema on 37 Methods Lab pages — deferred to next month (separate effort)
- Skip author attribution — deferred to next quarter
- Heroku remote is `origin` (not `heroku`) — must use `git push origin master`

### Next Steps
- Add Article JSON-LD to 37 Methods Lab pages (template-based batch)
- Add author/expert attribution to Methods Lab articles
- Add text summaries + speaker credentials to recordings page
- Add FAQ sections to top 5-10 Methods Lab pages
- Build external entity signals (Wikipedia, Wikidata) to resolve CAPH/CAPHE name collision
- Create proper 1200x630 OG social image
- Monthly monitoring: test 10 AI prompts across ChatGPT, Claude, Perplexity (see audit)

### Extracted Artifacts
- None this session (geo-optimization-expert agent already exists)

---

## 2026-01-20: County ROI Report PDF - Style Spec Alignment & Header Redesign

### Completed
- Implemented Phase 2 style specification alignment for PDF reports
- Redesigned header with actual CAPHE logo (California silhouette + arrow + cross)
- Added gradient divider (blue → gold) and navy title block
- Added metric card subtitles explaining each metric for non-economists
- Added plain-language methodology section with coefficient context
- Added limitations acknowledgment
- Workshopped and added research partnership callout to footer
- Created `/caphe-report` skill for future report generation
- Created `/session-exit` skill for structured session closeout

### Files Modified
- `src/backend/report-templates/report-full.html` - Executive headline, metric subtitles, methodology improvements, research callout
- `src/backend/report-templates/report-styles.css` - New header design, subtitle styles, callout boxes
- `src/backend/pdf-generator.js` - Embedded actual CAPHE logo as base64
- `~/.claude/skills/caphe-report/SKILL.md` - NEW: Skill for CAPHE report generation
- `~/.claude/skills/session-exit/SKILL.md` - NEW: Skill for session closeout workflow
- `~/.claude/SKILLS_INVENTORY.md` - Added both skills

### Decisions Made
- Use actual logo PNG (not SVG placeholder) - professional quality matters
- Research callout copy: "Interested in deeper analysis? CAPHE is conducting ongoing research into ROI variation across program areas. Partner with us and receive more detailed, individualized findings for your county."
- Style spec is source of truth for all CAPHE content

### Next Steps
- Test PDF with screen reader (VoiceOver)
- Verify email delivery with attachment
- Run Lighthouse accessibility audit on HTML template

### Extracted Artifacts
- `/caphe-report` skill
- `/session-exit` skill
