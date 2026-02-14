# GEO Audit: caphegroup.org
## California Association of Public Health Economists (CAPHE)

**Audit Date:** February 14, 2026
**Auditor:** Victoria Cholette
**Scope:** Full-site GEO analysis across homepage, ROI Calculator, Methods Lab, Recordings, About, and Resources pages

---

## Executive Summary

CAPHE has strong foundational content -- particularly the Methods Lab (30+ educational articles), the peer-reviewed ROI Calculator, and clear organizational identity. However, the site is currently **invisible to AI systems** due to critical technical gaps: zero schema markup, zero Open Graph tags, no AI crawler directives, no FAQ sections, no visible dates or author credentials, and a generic robots.txt. The content itself is well-structured for human readers but lacks the explicit signals that AI models use to identify authoritative, citable sources.

**Current Overall GEO Score: 28/100**

The gap between content quality and AI discoverability represents a significant opportunity. Most fixes are low-effort, high-impact technical additions.

---

## Site-Wide Technical Findings

### AI Crawler Configuration

| Check | Status | Impact |
|-------|--------|--------|
| robots.txt exists | PASS | Generic `User-agent: *` allows all crawlers |
| AI-specific crawler rules (GPTBot, ClaudeBot, PerplexityBot) | FAIL | No explicit Allow directives for AI bots |
| Sitemap.xml exists | PASS | 50+ URLs listed with priorities |
| Sitemap lastmod dates | PARTIAL | All set to 2026-01-18 (27 days stale); ROI calculator 2026-01-27 |
| llms.txt file | FAIL | Does not exist |
| Content server-rendered | PASS | Static HTML, no JS-dependent rendering |
| HTTPS | PASS | Site served over HTTPS |
| Schema markup (any page) | FAIL | Zero JSON-LD blocks across entire site |
| Open Graph tags (any page) | FAIL | Zero OG tags across entire site |
| Twitter/X cards | FAIL | Zero Twitter card tags |
| Visible publication/update dates | FAIL | No dates shown on any content page |
| Author credentials displayed | FAIL | No author bios or credentials on any page |

### Critical Finding: Name Collision with CAPH

When searching for "CAPHE California Association Public Health Economists," 9 of 10 results return content about **CAPH** (California Association of Public Hospitals and Health Systems). Only caphegroup.org itself appears. This name collision is a severe AI discoverability problem -- LLMs will confuse the two entities.

---

## Page-by-Page Analysis

---

### 1. Homepage (caphegroup.org)

**GEO Score: 30/100**
- Clarity: 12/25
- Structure: 10/25
- Authority: 3/25
- Freshness: 5/25

#### What Works
- Clear H1: "Health Economics Methods for Public Health"
- Descriptive subtitle mentioning cost-effectiveness analysis, causal inference, economic evaluation
- Meta description present: "A learning collaborative of economists dedicated to applying data-driven methods to public health challenges in California."
- Clean heading hierarchy (H1 > H2 > H3)
- Canonical URL set

#### Critical Gaps

| Gap | Impact |
|-----|--------|
| No Organization schema markup | AI cannot identify CAPHE as a professional association entity |
| No Open Graph tags | Poor rendering when shared or indexed by social-aware crawlers |
| No FAQ section | Misses question-based AI queries entirely |
| No statistics or data points on homepage | Nothing quotable for AI responses |
| No founding date, membership count, or scope metrics visible | No authority signals for AI to extract |
| Meta description too vague | "Learning collaborative" does not convey unique value proposition |
| No "In Summary" or definition-style content | AI cannot extract a clean entity description |

#### Quotable Content Missing

The homepage needs at least one clear, factual, AI-extractable definition statement. Currently, nothing on the page would appear in an AI response to "What is CAPHE?" or "Are there health economics organizations in California?"

**Recommended addition (above the fold):**

> CAPHE (California Association of Public Health Economists) is a professional association founded in 2024 that provides health economics training, cost-effectiveness analysis tools, and peer collaboration for economists working across California's 57 county public health departments. CAPHE offers free interactive tutorials through its Methods Lab, a peer-reviewed Public Health ROI Calculator, and regular webinars on causal inference and economic evaluation methods.

---

### 2. ROI Calculator (/tools/lha-calculator/)

**GEO Score: 38/100**
- Clarity: 16/25
- Structure: 12/25
- Authority: 8/25
- Freshness: 2/25

#### What Works
- Clear H1: "Public Health ROI Calculator"
- Good meta description: "Calculate the return on investment for county public health spending."
- Peer-reviewed methodology cited (Cholette, Patton, & Zarate-Gomez, 2026; Brown 2014, 2016)
- Specific data: "$10 per capita -> 9.16 deaths per 100,000 mortality reduction"
- VSL methodology referenced ($13.6M HHS figure)
- Canonical URL set

#### Critical Gaps

| Gap | Impact |
|-----|--------|
| No WebApplication or SoftwareApplication schema | AI cannot identify this as a tool/calculator |
| No FAQ schema for methodology questions | Misses "how does public health ROI work" queries |
| No visible date (publication or last updated) | AI deprioritizes undated content |
| Calculator results are JS-rendered | AI crawlers cannot see computed outputs |
| Key finding ("$10 per capita reduces mortality by 9.16/100K") is buried in page | Not extractable as a standalone quotable fact |
| No comparison to competing tools | Misses comparative queries |
| Sitemap priority only 0.7 | Should be 0.9 -- this is the site's most unique, citable asset |

#### Citation Gap Analysis

When querying AI platforms for "public health ROI calculator," the following are cited instead:
- **Commonwealth Fund ROI Calculator** (general health ROI, not public-health-specific)
- **AHRQ ROI Estimation Tool** (hospital quality improvement focus)
- **CHCS ROI Toolkit** (social determinants focus)
- **AcademyHealth ROI research** (literature reviews, not a tool)

**CAPHE's calculator is not mentioned anywhere.** This is the single largest citation gap because no competing tool does exactly what CAPHE's does: county-level public health spending to mortality reduction using California-specific peer-reviewed data.

**Recommended static content block (visible to crawlers, above calculator form):**

> ## What This Calculator Does
>
> The CAPHE Public Health ROI Calculator is a free, peer-reviewed tool that estimates the mortality reduction and return on investment from county public health spending in California. Based on Lewbel IV estimation of California county longitudinal data (2003-2023), the calculator applies the finding that each $10 per capita increase in public health spending reduces mortality by approximately 9.16 deaths per 100,000 population (Cholette, Patton, & Zarate-Gomez, 2026, extending Brown 2014, 2016).
>
> **Key outputs:**
> - Estimated lives saved annually
> - Total social value (using HHS Value of Statistical Life: $13.6M per life, 2025)
> - Benefit-cost ratio
> - Cost per life saved vs. federal VSL benchmark
> - Peer county benchmarks for context
>
> The calculator serves public health directors, health officers, and budget analysts across California's 57 counties who need presentation-ready ROI documentation for budget justification.

---

### 3. Methods Lab (/methods-lab/)

**GEO Score: 32/100**
- Clarity: 14/25
- Structure: 10/25
- Authority: 5/25
- Freshness: 3/25

#### What Works
- 30+ substantive educational articles organized into 4 clear tracks
- Strong meta descriptions on individual articles (checked counterfactual-basics, chw-health-outcomes)
- Canonical URLs on all articles
- Content directly addresses health economics methods questions
- Clear topic taxonomy: Program Impact, Evidence Credibility, Value for Money, Causal Pitfalls

#### Critical Gaps

| Gap | Impact |
|-----|--------|
| No Article schema on any Methods Lab page | AI cannot identify these as educational articles |
| No author attribution on articles | Zero E-E-A-T signal for AI |
| No publication or update dates visible | AI cannot assess content freshness |
| No FAQ sections on articles | Misses question-based queries |
| Individual articles use inline CSS (not shared stylesheet) | Not a GEO issue, but indicates articles may be treated as standalone pages without site context |
| No "key takeaway" or summary boxes | AI prefers extractable summary statements |
| Access tiers (Public/Community/Professional) may block crawlers | Gated content behind Supabase auth is invisible to AI |
| No cross-references to academic literature | Reduces perceived authority |

#### This Is CAPHE's Biggest GEO Opportunity

The Methods Lab contains exactly the kind of educational content AI loves to cite: explanatory, well-structured, California-specific health economics tutorials. But without Article schema, author credentials, dates, and FAQ sections, AI has no way to evaluate or prioritize these pages.

**For the CHW Health Outcomes article specifically:** When users ask AI about community health worker program effectiveness or ROI, CAPHE is not cited. Instead, Health Affairs, ASTHO, NASHP, CHCF, and Cal Budget Center are referenced. The CAPHE Methods Lab article on CHW outcomes is a natural citation target but is invisible.

---

### 4. Recordings Page (/recordings)

**GEO Score: 18/100**
- Clarity: 8/25
- Structure: 5/25
- Authority: 3/25
- Freshness: 2/25

#### What Works
- Clear H1: "Webinar Recordings"
- Basic meta description present
- Canonical URL set

#### Critical Gaps

| Gap | Impact |
|-----|--------|
| No VideoObject schema | YouTube embed invisible to AI crawlers |
| No speaker names or credentials | Zero authority signal |
| No webinar descriptions or learning objectives | AI cannot understand what the content covers |
| No transcript or summary text | Video content is completely opaque to AI |
| Meta description is generic ("CAPHE member recordings") | No useful information for AI extraction |
| Copyright says 2025 (not 2026) | Stale signal |
| Only one recording listed | Thin content page |

#### Recommendation

Add full-text summaries, speaker bios, and key takeaways for each recording. AI cannot watch videos -- it can only read text about videos.

---

### 5. About Page (/about)

**GEO Score: 25/100**
- Clarity: 10/25
- Structure: 8/25
- Authority: 4/25
- Freshness: 3/25

#### What Works
- Mission statement present
- Founding year mentioned (2024)
- Scope defined (California's 57 counties)
- Programs described

#### Critical Gaps

| Gap | Impact |
|-----|--------|
| No Organization schema | AI cannot establish CAPHE as a named entity |
| No leadership names, titles, or bios | Zero authoritativeness signal |
| No membership statistics | Nothing quotable about scale |
| No institutional affiliations listed | No authority chain |
| Meta description too generic ("Learn about...and our mission") | Wasted indexing opportunity |

---

### 6. Resources Page (/resources)

**GEO Score: 22/100**
- Clarity: 8/25
- Structure: 7/25
- Authority: 5/25
- Freshness: 2/25

#### What Works
- Links to authoritative external sources (ISPOR, Tufts CEA Registry, HealthData.gov, CDPH, County Health Rankings)
- Internal resources (Methods Lab, ROI Calculator) prominently featured

#### Critical Gaps
- No descriptions of CAPHE's own resources beyond one-liners
- No schema markup
- Page functions as a link directory rather than authoritative content

---

## Citation Gap Analysis Summary

### Target Queries Where CAPHE Should Be Cited But Is Not

| Query | Who Gets Cited Instead | CAPHE Asset That Should Answer |
|-------|----------------------|-------------------------------|
| "health economics organizations in California" | CHEAC, CAPH, UCLA CHPR, PHI | Homepage + About page |
| "public health ROI calculator" | Commonwealth Fund, AHRQ, CHCS | ROI Calculator |
| "county public health spending mortality" | AcademyHealth, Health Affairs (Brown 2014) | ROI Calculator methodology |
| "cost-effectiveness analysis training public health" | Harvard CAUSALab, UCSF, Coursera, ISPOR | Methods Lab |
| "community health worker program effectiveness California" | Health Affairs, CACHW, CHCF, NASHP | Methods Lab CHW article |
| "what is a counterfactual in program evaluation" | Wikipedia, academic textbooks | Methods Lab counterfactual article |
| "causal inference methods public health" | Harvard, MIT, academic journals | Methods Lab (entire Program Impact track) |
| "public health budget justification ROI" | NACCHO, CDC, Trust for America's Health | ROI Calculator + generated reports |

### Competitor Citation Frequency (Estimated from Web Search)

| Organization | Likely AI Citation Rate | Why |
|-------------|------------------------|-----|
| AcademyHealth | High | Peer-reviewed publications, well-established entity |
| Commonwealth Fund | High | Named tools, extensive publications, strong schema |
| CHEAC | Medium | California-specific, established since 1950s |
| CDC/AHRQ | Very High | Federal authority, comprehensive schema markup |
| ISPOR | High | Global standard-setter for health economics methods |
| CAPHE | Near Zero | No schema, no visible authority signals, name collision |

---

## Priority Recommendations

### Tier 1: Quick Wins (1-2 Days Each, Highest Impact)

#### 1.1 Add Organization Schema to Homepage and About Page

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "additionalType": "https://schema.org/Organization",
  "name": "CAPHE - California Association of Public Health Economists",
  "alternateName": ["CAPHE", "California Association of Public Health Economists"],
  "url": "https://www.caphegroup.org",
  "description": "A professional association founded in 2024 that provides health economics training, cost-effectiveness analysis tools, and peer collaboration for economists working across California's 57 county public health departments.",
  "foundingDate": "2024",
  "areaServed": {
    "@type": "State",
    "name": "California",
    "sameAs": "https://en.wikipedia.org/wiki/California"
  },
  "memberOf": {
    "@type": "CategoryCode",
    "name": "Professional Association"
  },
  "knowsAbout": [
    "Health Economics",
    "Cost-Effectiveness Analysis",
    "Causal Inference",
    "Public Health ROI",
    "Economic Evaluation",
    "Community Health Worker Programs",
    "California Public Health"
  ],
  "sameAs": [
    "https://linkedin.com/company/caphe",
    "https://bsky.app/profile/caphegroup.org"
  ]
}
</script>
```

**Expected lift:** Organization schema has 16.1% AI crawler parse rate and is the foundation for entity establishment.

#### 1.2 Add Open Graph Tags to All Pages

Every page needs at minimum:

```html
<meta property="og:title" content="[Page Title] - CAPHE">
<meta property="og:description" content="[Page-specific description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.caphegroup.org/[path]">
<meta property="og:site_name" content="CAPHE - California Association of Public Health Economists">
<meta property="og:locale" content="en_US">
```

#### 1.3 Update robots.txt with AI Crawler Directives

Replace current robots.txt:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://www.caphegroup.org/sitemap.xml
```

#### 1.4 Create llms.txt at Site Root

```
# CAPHE - California Association of Public Health Economists
# https://www.caphegroup.org

## About
CAPHE is a professional association founded in 2024 providing health economics training, cost-effectiveness analysis tools, and peer collaboration for economists across California's 57 county public health departments.

## Key Resources

### ROI Calculator
> https://www.caphegroup.org/tools/lha-calculator/
Free peer-reviewed tool calculating mortality reduction and ROI from county public health spending. Based on Lewbel IV estimation of California county data (2003-2023). Finding: each $10 per capita in public health spending reduces mortality by 9.16 deaths per 100,000.

### Methods Lab
> https://www.caphegroup.org/methods-lab/
30+ interactive tutorials on health economics methods including causal inference, cost-effectiveness analysis, and program evaluation. Organized into 4 tracks: Program Impact, Evidence Credibility, Value for Money, and Causal Pitfalls.

### Programs
> https://www.caphegroup.org/programs
Webinars, workshops, working groups, and peer review sessions for health economists in California public health.

## Contact
research@caphegroup.org
```

#### 1.5 Add Visible Dates to All Content

Add "Last updated: [date]" to every page, especially:
- ROI Calculator: "Methodology last updated: January 2026"
- Methods Lab articles: "Published: [date] | Updated: [date]"
- Homepage: "Last updated: [month year]"

Content updated within 30 days gets 3.2x more AI citations.

---

### Tier 2: Medium Effort, High Impact (3-5 Days)

#### 2.1 Add WebApplication Schema to ROI Calculator

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CAPHE Public Health ROI Calculator",
  "url": "https://www.caphegroup.org/tools/lha-calculator/",
  "description": "Free peer-reviewed calculator estimating mortality reduction and return on investment from county public health spending in California, based on Lewbel IV estimation of 2003-2023 county longitudinal data.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "CAPHE - California Association of Public Health Economists"
  },
  "isBasedOn": {
    "@type": "ScholarlyArticle",
    "name": "California Public Health Spending Patterns",
    "author": [
      {"@type": "Person", "name": "Victoria Cholette"},
      {"@type": "Person", "name": "Patton"},
      {"@type": "Person", "name": "Zarate-Gomez"}
    ],
    "datePublished": "2026"
  },
  "featureList": [
    "County-level mortality reduction estimates",
    "Benefit-cost ratio calculation",
    "Peer county benchmarks",
    "PDF report generation",
    "Based on peer-reviewed California data"
  ]
}
</script>
```

#### 2.2 Add Article Schema to Every Methods Lab Page

Template for each article:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title]",
  "description": "[Meta description content]",
  "url": "https://www.caphegroup.org/methods-lab/[slug]/",
  "datePublished": "[Actual publish date]",
  "dateModified": "[Last update date]",
  "author": {
    "@type": "Organization",
    "name": "CAPHE - California Association of Public Health Economists",
    "url": "https://www.caphegroup.org"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CAPHE - California Association of Public Health Economists"
  },
  "isPartOf": {
    "@type": "WebPage",
    "name": "CAPHE Methods Lab"
  },
  "educationalLevel": "Professional",
  "about": ["Health Economics", "[Article-specific topic]"],
  "inLanguage": "en"
}
</script>
```

**Expected lift:** Article schema has 17.4% AI crawler parse rate and signals E-E-A-T.

#### 2.3 Add FAQ Sections to ROI Calculator and Key Methods Lab Pages

The ROI Calculator should include a static FAQ section:

```html
<section>
  <h2>Frequently Asked Questions</h2>

  <h3>What data does the ROI calculator use?</h3>
  <p>The calculator uses Lewbel IV estimates from California county longitudinal data spanning 2003-2023, extending the methodology of Brown (2014, 2016). The core finding: each $10 per capita increase in local public health spending is associated with a mortality reduction of approximately 9.16 deaths per 100,000 population.</p>

  <h3>How is the economic value of lives saved calculated?</h3>
  <p>Lives saved are valued using the U.S. Department of Health and Human Services Value of Statistical Life (VSL) of $13.6 million (2025 figure). This is the standard federal methodology used across regulatory agencies for cost-benefit analysis of health interventions.</p>

  <h3>Which California counties can use this calculator?</h3>
  <p>The calculator serves all 57 California counties. Quick estimates are available instantly. Detailed reports with peer county benchmarks are delivered within 24 hours and require a government or educational email address.</p>

  <h3>Is the calculator free?</h3>
  <p>Yes. The quick estimate tool is free and publicly available. Detailed PDF reports with peer county benchmarks are also free, provided as part of CAPHE's mission to support evidence-based public health decision-making.</p>

  <h3>Who developed this tool?</h3>
  <p>The calculator was developed by the California Association of Public Health Economists (CAPHE) based on research by Cholette, Patton, and Zarate-Gomez (2026), which extends Brown's foundational work on public health spending and mortality outcomes.</p>
</section>
```

Plus FAQPage schema:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What data does the CAPHE Public Health ROI calculator use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The calculator uses Lewbel IV estimates from California county longitudinal data spanning 2003-2023, extending the methodology of Brown (2014, 2016). The core finding: each $10 per capita increase in local public health spending is associated with a mortality reduction of approximately 9.16 deaths per 100,000 population."
      }
    },
    {
      "@type": "Question",
      "name": "How is the economic value of lives saved calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lives saved are valued using the U.S. Department of Health and Human Services Value of Statistical Life (VSL) of $13.6 million (2025 figure). This is the standard federal methodology used across regulatory agencies for cost-benefit analysis."
      }
    },
    {
      "@type": "Question",
      "name": "Which California counties can use the CAPHE ROI calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The calculator serves all 57 California counties. Quick estimates are available instantly. Detailed reports with peer county benchmarks are delivered within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Is the CAPHE Public Health ROI calculator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The quick estimate tool is free and publicly available. Detailed PDF reports with peer county benchmarks are also provided at no cost."
      }
    }
  ]
}
</script>
```

**Expected lift:** FAQPage schema has 11.0% AI parse rate and +19% answer accuracy for question-based queries.

#### 2.4 Add Static Methodology Summary to ROI Calculator (Above the Form)

AI crawlers cannot execute JavaScript and therefore cannot see calculator outputs. The methodology, key findings, and example outputs must exist as static HTML text.

#### 2.5 Add VideoObject Schema and Text Summaries to Recordings

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Introduction to Health Economics - CAPHE Public Webinar",
  "description": "CAPHE's inaugural public webinar covering foundational concepts in health economics for public health professionals working in California counties. Topics include cost-effectiveness analysis, economic evaluation methods, and applications to county public health programs.",
  "uploadDate": "2026-02-12",
  "duration": "PT60M",
  "thumbnailUrl": "[URL]",
  "embedUrl": "https://www.youtube.com/embed/T7haJyoGi6k",
  "contentUrl": "https://www.youtube.com/watch?v=T7haJyoGi6k",
  "publisher": {
    "@type": "Organization",
    "name": "CAPHE - California Association of Public Health Economists"
  }
}
</script>
```

**Critical addition:** Each recording needs a 200-400 word text summary with key topics, speaker credentials, and main takeaways. AI cannot process video content.

---

### Tier 3: Strategic Improvements (1-2 Weeks)

#### 3.1 Resolve CAPH/CAPHE Name Collision

This is a serious long-term problem. AI systems currently conflate CAPHE with CAPH (California Association of Public Hospitals). Recommendations:

1. **Always use the full name** "California Association of Public Health Economists (CAPHE)" rather than just "CAPHE" in meta descriptions and schema
2. **Add `sameAs` and `alternateName` to Organization schema** to explicitly differentiate
3. **Build external entity signals:** Wikipedia stub page, Wikidata entry, LinkedIn company page completeness, professional directory listings
4. **Content should reference "CAPHE" alongside distinguishing terms** like "health economists" (not "public hospitals")

#### 3.2 Add Author/Expert Attribution

Currently, no page on the site names any individual. For AI authority signals:
- Add author bios with credentials to Methods Lab articles
- Add Person schema for key contributors
- Add "About the Author" sections with professional affiliations
- At minimum, attribute Methods Lab content to "CAPHE economists" with a link to the About page

#### 3.3 Update Sitemap Priorities and Dates

| URL | Current Priority | Recommended Priority | Rationale |
|-----|-----------------|---------------------|-----------|
| /tools/lha-calculator | 0.7 | 0.9 | Most unique, citable asset |
| /methods-lab/ | 0.9 | 0.9 | Keep (correct) |
| /recordings | 0.7 | 0.8 | Growing content library |
| /about | 0.9 | 0.9 | Keep (correct) |

**Also:** Set up a process to update `<lastmod>` dates when content actually changes. All 50 URLs currently show 2026-01-18, which tells crawlers "nothing has changed" even when content has been updated.

#### 3.4 Build External Citation Signals

Brand search volume is the #1 predictor of LLM citations (0.334 correlation). CAPHE needs to exist in places AI models train on and reference:

- **Wikipedia:** Create a stub article for CAPHE (notability may be challenged but worth attempting)
- **Wikidata:** Create a Wikidata entry (lower notability bar than Wikipedia)
- **LinkedIn:** Ensure the company page has a detailed description matching schema markup
- **Reddit:** Participate in r/healtheconomics, r/publichealth, r/epidemiology with valuable content linking back to Methods Lab
- **Academic citations:** Ensure the Cholette, Patton, & Zarate-Gomez (2026) paper is indexed in Google Scholar and PubMed
- **Press/media mentions:** Seek coverage in California health policy outlets (CHCF, CalMatters health section)

#### 3.5 Create a "What Is Health Economics?" Pillar Page

CAPHE should own the definitive answer to "what is health economics for public health?" -- a question asked thousands of times to AI systems. A comprehensive, well-structured pillar page linking to Methods Lab content would serve as the primary citation target.

---

## Updated Sitemap Recommendations

Add these currently missing URLs to sitemap.xml:

```xml
<url>
  <loc>https://www.caphegroup.org/past-events</loc>
  <priority>0.5</priority>
  <changefreq>monthly</changefreq>
</url>
```

Update ROI Calculator priority:
```xml
<url>
  <loc>https://www.caphegroup.org/tools/lha-calculator</loc>
  <lastmod>2026-02-14</lastmod>
  <priority>0.9</priority>
  <changefreq>monthly</changefreq>
</url>
```

---

## Implementation Checklist

### Immediate (This Week)

- [ ] Add Organization JSON-LD to homepage and about page
- [ ] Add Open Graph meta tags to all pages (template in nav/head)
- [ ] Update robots.txt with AI crawler directives
- [ ] Create llms.txt at site root
- [ ] Add "Last updated: [date]" to homepage, ROI calculator, Methods Lab index
- [ ] Update sitemap.xml lastmod dates to current
- [ ] Raise ROI Calculator sitemap priority to 0.9
- [ ] Fix copyright year (2025 -> 2026) on recordings page

### This Month

- [ ] Add WebApplication schema to ROI Calculator
- [ ] Add static methodology summary text above ROI Calculator form
- [ ] Add FAQ section + FAQPage schema to ROI Calculator
- [ ] Add Article schema to all Methods Lab articles (template-based)
- [ ] Add VideoObject schema + text summary to recordings page
- [ ] Add speaker names and credentials to recordings
- [ ] Update meta descriptions to be more specific and keyword-rich

### Next Quarter

- [ ] Add author/expert attribution to Methods Lab articles
- [ ] Create Person schema for key contributors
- [ ] Create "What Is Health Economics?" pillar page
- [ ] Build external entity signals (Wikipedia, Wikidata, Reddit presence)
- [ ] Add FAQ sections to 5-10 most-visited Methods Lab articles
- [ ] Set up automated sitemap lastmod updates on content deployment
- [ ] Create comparison content (CAPHE ROI Calculator vs. other tools)

---

## Expected Impact

| Change | Expected AI Visibility Lift | Timeframe |
|--------|---------------------------|-----------|
| Organization schema | Establishes entity in knowledge graphs | 2-4 weeks |
| ROI Calculator FAQ + schema | +19% accuracy on calculator-related queries | 2-6 weeks |
| Article schema on Methods Lab | Methods Lab articles begin appearing in AI responses | 4-8 weeks |
| llms.txt + crawler directives | Improved crawl coverage and content understanding | 2-4 weeks |
| Visible dates + freshness signals | 3.2x citation lift for recently updated content | Immediate on next crawl |
| External entity signals (Wikipedia, Reddit) | Brand search volume increase -> citation likelihood | 2-6 months |
| FAQ sections across site | Captures question-based AI queries | 4-8 weeks |

---

## Monitoring Plan

### Manual Testing Protocol (Monthly)

Test these 10 prompts across ChatGPT, Claude, Perplexity, and Google AI Mode:

1. "What organizations help California counties with health economics?"
2. "Is there a free public health ROI calculator?"
3. "How does public health spending affect mortality rates?"
4. "Where can I learn about cost-effectiveness analysis for public health?"
5. "What is CAPHE?"
6. "How do community health worker programs affect health outcomes?"
7. "What is a counterfactual in program evaluation?"
8. "How do I justify my county public health budget?"
9. "California health economics training programs"
10. "Public health spending per capita mortality reduction"

Track: Whether CAPHE is cited, link included, content quoted, sentiment of mention.

### Recommended Tools

| Tool | Use Case | Cost |
|------|----------|------|
| Otterly AI | Monthly prompt tracking across ChatGPT + Perplexity | $29/mo |
| Google Search Console | Monitor AI Overview appearances | Free |
| Manual testing protocol above | Baseline and monthly tracking | Free (time) |

---

## Appendix: Current vs. Target GEO Scores

| Page | Current Score | Target (3 months) | Target (6 months) |
|------|--------------|-------------------|-------------------|
| Homepage | 30/100 | 65/100 | 80/100 |
| ROI Calculator | 38/100 | 72/100 | 85/100 |
| Methods Lab (index) | 32/100 | 60/100 | 75/100 |
| Methods Lab (articles, avg) | 28/100 | 55/100 | 70/100 |
| Recordings | 18/100 | 50/100 | 65/100 |
| About | 25/100 | 60/100 | 75/100 |
| Resources | 22/100 | 45/100 | 60/100 |
| **Site Average** | **28/100** | **58/100** | **73/100** |

---

*Audit methodology: Direct source code analysis of all HTML files in the CAPHE repository, live page content fetched via web crawl, citation gap testing via web search and AI platform queries. GEO scoring based on Princeton GEO study metrics (Clarity, Structure, Authority, Freshness) with weighting adjusted for professional/educational content.*
