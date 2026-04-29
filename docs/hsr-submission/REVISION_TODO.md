# Medi-Cal Provider Participation Paper — Revision TODO

**Paper:** Flat-Rate Medicaid Reimbursement and Geographic Variation in Provider Participation: Evidence from California
**Author:** Victoria Cholette
**SSRN:** https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6280278
**Target journal:** Health Services Research (HSR)
**Status:** Returned by HSR editorial office 2026-03-02 for formatting; previously rejected at JUE
**Estimated revision time:** 6-8 weeks

This document captures the developmental-editor and style-pass findings from a review session on 2026-04-27. Work through items in priority order. The HSR formatting fixes are separate from these substantive revisions; do both before resubmission.

---

## Pre-flight: Phase 0 — Citation Verification

Before any other work, run citation verification per CLAUDE.md global rules.

```bash
python ~/.claude/scripts/verify_citations.py /Users/victoriaperez/Projects/CAPHE/docs/hsr-submission/main_text_ssrn.tex
```

Manual spot-checks needed regardless:
- [ ] Refs 2, 9, 11 (Zhu, Wen, Zhu et al.) — DOI resolution, confirm journal/volume/issue/pages
- [ ] Ref 5 (Skopec/Pugazhendhi/Zuckerman, *Health Aff* 2025;44(5):531-538) — Urban Institute typically authors this Medicaid-to-Medicare fee index; confirm volume/issue/pages match
- [ ] Refs 1, 3, 4, 6, 7, 8, 10, 12 (gray-lit URLs: CMS, OIG, MACPAC, HRSA, Dartmouth, NPPES, HHS) — confirm each URL still resolves
- [ ] In-text claim p.9: "psychiatrist Medicaid acceptance rates have declined to approximately 36%" cited as ref 9 (Wen et al. 2019). Wen et al. report 2010-2015 decline from 47.9% to 35.4%; the manuscript later quotes this correctly on p.12. **Confirm the 36% figure on p.9 is also drawn from Wen and not another source.**

---

## Must-Fix Items (5) — Substantive

### 1. Resolve title-vs-design mismatch ⚠️ likely cause of JUE rejection

**Problem:** Title "Flat-Rate Medicaid Reimbursement and Geographic Variation in Provider Participation" implies a causal claim about reimbursement structure. The data are purely cross-sectional and descriptive — there is no within-county, pre/post, or DiD variation in reimbursement structure to identify a flat-rate effect.

**Fix options:**
- (A) Retitle to a descriptive frame: *"Geographic and Specialty Variation in Medi-Cal Provider Participation: A County-Level Analysis"*
- (B) Add identification: panel variation, comparison state (Texas is also flat-rate), or specialty-by-specialty fee-ratio variation

Recommendation: (A) is cheaper and matches the body conclusion. (B) is a different paper.

- [ ] Choose (A) or (B)
- [ ] Revise title throughout manuscript and submission package
- [ ] Confirm abstract no longer asserts causal claim about flat-rate structure

### 2. Bound the NPPES denominator problem

**Problem:** NPPES includes retired, administrative, and out-of-state-affiliated NPIs. The paper concedes this in Limitations (p.7, p.13) but does not bound it. Every reported participation rate is ambiguous between "providers won't take Medi-Cal" and "providers aren't practicing clinically." Without a bound, the headline 40.1% number is contested.

**Fix:** Add a robustness check restricting to NPIs with any billing activity (Medicare or commercial) and report whether county rankings move.

- [ ] Pull billing activity for Medicare and commercial payers
- [ ] Re-compute participation rates restricting to clinically active NPIs
- [ ] Compare top-10 / bottom-10 county rankings vs. main spec
- [ ] Report results in Robustness section or Limitations expansion

### 3. Add minimal inferential discipline

**Problem:** No CIs, no statistical tests anywhere. Even for a descriptive paper, this is thin.

**Fix:**
- [ ] Spearman rank correlation between composite cost index and participation rate, with bootstrap CI
- [ ] Bootstrap CIs on the top-10 / bottom-10 county participation rates
- [ ] Annual breakdown OR a stricter "active = billed in 2023 or 2024" sensitivity (currently pooling 2018-2024 obscures COVID dynamics)

### 4. Specify the composite cost index weighting

**Problem:** Cost index is built from BLS wages, HUD rents, and "regional healthcare services price indices" but weights "to reflect relative contribution of each category to overall practice costs" are not given. The "paradox" rests on this index; readers cannot evaluate it without the weights.

**Fix:**
- [ ] State the weighting vector explicitly (drawn from MEI? Equal? Other?)
- [ ] Add a sensitivity check on alternative weights
- [ ] Acknowledge that wages/rents partially proxy for the same urban concentration that drives institutional infrastructure (the cost-participation correlation is mechanically near-tautological)

### 5. Drop "crisis" framing or anchor it

**Problem:** "Statewide crisis" language for behavioral health (Discussion p.12, Conclusion p.14) is rhetoric; 27.3% median participation alone cannot support "crisis" without a defensible benchmark.

**Fix:**
- [ ] Replace "crisis" with a comparator: 27.3% vs. (a) equivalent Medicare or commercial rate, (b) HRSA shortage thresholds, (c) a stated normative target
- [ ] Use the comparator number in every place "crisis" currently appears

---

## Must-Fix Items (5) — Style (Layer 1e: uncharacterized effect-size adjectives)

All have number-based rewrites available from data already in the paper.

### 6. p.9 — "Participation varied substantially by specialty"

- [ ] Rewrite: *"Specialty-level median participation ranged from 27.3% (behavioral health) to 72.2% (Pharmacy/DME), a 2.6-fold gap."*

### 7. p.9 — "behavioral health crisis is notable for its uniformity"

- [ ] Rewrite: *"The behavioral health pattern is uniform rather than driven by outliers: 44 of 57 reporting counties cluster between 25% and 30% participation."*

### 8. p.10 — "shift rates dramatically"

- [ ] Rewrite: *"...shift the rate by 10-25 percentage points in counties with fewer than 20 registered providers."* (or whatever the actual sensitivity is in the data)

### 9. p.12 — "with substantial state-to-state variation" (Zhu et al. Medicaid/Medicare ratio)

- [ ] Rewrite: insert the actual range from Zhu et al.: *"...with state-level ratios ranging from [X% to Y%]..."* OR delete "substantial" entirely.

### 10. p.11 — Soften "stark" with the actual range

- [ ] Rewrite: *"Medi-Cal's flat-rate reimbursement structure produces a 0%-48.3% range in county-level provider participation and a 2.6-fold gap across specialties..."*

---

## Nice-to-Have

- [ ] **Situate against existing Medicaid participation literature** in introduction (Decker, Polsky, Holgash & Heberlein, Berchick et al.). Currently only situates against Zhu phantom-network work.
- [ ] **Justify California-specific scope.** Why not 50-state? Why not Texas? Currently the "California is interesting" case isn't made beyond data availability.
- [ ] **Decide on Access Explorer tool framing.** Currently mentioned only in passing in Policy Implications (p.13). If part of the contribution, foreground it. If not, drop. Disclose authorship transparently or move URL to Data Availability statement (avoid self-promotion read).
- [ ] **Move Critical Access Alerts (p.10) to appendix or callout box.** Currently interrupts the argument between Cost-Participation Relationship and Discussion, and reintroduces small-N counties immediately after the paper warned against them.
- [ ] **Reconcile abstract vs body framing.** Abstract conclusion oversells ("flat-rate reimbursement... generates geographic disparities"); body conclusion correctly hedges ("institutional infrastructure, more than payment levels alone"). Match the body.
- [ ] **HRR-to-county plurality mapping (p.7):** show what fraction of county population the plurality assignment covers. Border counties may be substantially miscoded.
- [ ] **Citation typography:** fix superscript citations running into periods on p.4 ("insurance.1", "claims.2"). Use `\textsuperscript{}` in tex.
- [ ] **p.13** "Beyond the methodological limitations noted above..." — tighten to "Methodological limitations noted above are compounded by three further constraints..."
- [ ] **p.13** "Three policy directions emerge from these findings." — slightly boilerplate transition; could open directly with "First, a geographic payment adjustment for Medi-Cal..."

---

## HSR Resubmission Formatting (separate from substantive revisions)

The 2026-03-02 return cited three issues. Address before re-uploading:

- [ ] **Cover letter:** add 3 missing required disclosure answers (check HSR submission guidelines for the specific 3)
- [ ] **Title page:** add funding statement
- [ ] **Title page:** correct abstract headings (per HSR requirements)
- [ ] **Title page:** add word count
- [ ] **Tables:** convert to editable format (not images / not PDF-embedded)

---

## Sequencing Recommendation

1. **Week 1:** Phase 0 citation verification + must-fix items #1 (title) and #5 (drop "crisis"). These are pure-prose changes.
2. **Weeks 2-3:** Must-fix items #2-4 (NPPES robustness, statistical inference, cost-index weights). These touch the data work.
3. **Week 4:** Style-pass must-fix items #6-10. Mechanical, fast.
4. **Week 5:** Nice-to-have items + HSR formatting. Polish.
5. **Week 6:** Re-run dev-edit + style-pass on revised draft. Confirm verification step passes.
6. **Week 7-8:** Buffer for unexpected issues, re-read by collaborator if available, then resubmit.

---

## Decision Points During Revision

- **Title fix (#1):** retitle as descriptive (cheap) OR add identification (different paper). Recommended: retitle.
- **Continue at HSR or pivot?** HSR fit is reasonable for a descriptive Medi-Cal paper. Pivoting now means restarting the editorial clock and reformatting again. Stay at HSR unless substantive revisions reveal a better-fit venue.
