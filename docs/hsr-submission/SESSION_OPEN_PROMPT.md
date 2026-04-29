# /session-open Prompt for Medi-Cal Paper Revisions

When you're ready to start a focused revision session on this paper, paste the prompt below into a fresh Claude Code session.

---

## Pathname to load (paste this when opening session)

```
/Users/victoriaperez/Projects/CAPHE/docs/hsr-submission/REVISION_TODO.md
```

---

## /session-open prompt (paste this as the first message)

```
/session-open

Project: Medi-Cal Provider Participation paper revisions for Health Services Research resubmission.

Read the revision TODO first:
/Users/victoriaperez/Projects/CAPHE/docs/hsr-submission/REVISION_TODO.md

Background:
- Paper SSRN: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6280278
- Source files in: /Users/victoriaperez/Projects/CAPHE/docs/hsr-submission/
- Returned by HSR editorial office 2026-03-02 for formatting (3 issues)
- Previously rejected at JUE (likely on title-vs-design mismatch)
- Developmental edit + style-pass run on 2026-04-27 found 5 substantive must-fix items + 5 style must-fix items + ~9 nice-to-have items
- Total estimated revision time: 6-8 weeks

Today's goal: pick ONE must-fix item and complete it end-to-end before stopping.

Suggested order if undecided:
1. Phase 0 citation verification (run verify_citations.py first)
2. Must-fix #1: title-vs-design mismatch (pure-prose, fastest)
3. Must-fix #5: replace "crisis" framing (pure-prose, fast)
4. Must-fix #6-10: style fixes (mechanical, batchable)

Do NOT attempt all items in one session. Pick one, complete it, mark the checkbox in REVISION_TODO.md, end session.

After completing the chosen item:
- Update the checkbox in REVISION_TODO.md
- If item touched the .tex source, recompile and verify the PDF still builds
- Note any new questions or blockers in a session-end comment in REVISION_TODO.md
```

---

## Notes

- The TODO doc is the single source of truth. Update checkboxes as items complete.
- HSR formatting fixes (cover letter disclosures, title page funding/abstract/word count, table format) are bundled at the bottom of REVISION_TODO.md and should be addressed before resubmission, but are independent of substantive revisions.
- Citation verification (Phase 0) is mandatory per CLAUDE.md — do not skip.
- The agents run on the 4/27 review found the paper structurally clean except for the title-design mismatch, NPPES denominator, missing inference, and underspecified cost index. The style-pass was a near-pass except for 5 banned-adjective rewrites (all have ready solutions in the TODO doc).
