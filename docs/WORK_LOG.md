# CAPHE Website Work Log

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
