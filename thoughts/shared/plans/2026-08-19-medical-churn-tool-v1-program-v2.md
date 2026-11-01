# Program Plan v2: Medi-Cal Churn-Prevention Tool v1

**Date:** 2026-08-19 (supersedes v1 of the same date, retained as the error record)
**Spec of record:** `~/Projects/scc_hr1_medicaid/spec/{SCOPE_original,ARCHITECTURE_addendum,DECISIONS_v1}.md`
**Why v2:** two adversarial reviews returned 46 of 48 acceptance certificates unsound and six structural defects. v1 is kept unedited so the failure is legible.

## What v1 got wrong, in one place

1. **Every test it named was unregistered.** `"test": "node --test test/*.test.js"` is a flat glob. A deliberately throwing test placed in `test/medical/` leaves `npm run predeploy` at exit 0. All 48 assertions, the entire detection column of the error register, and all four adversarial gates would have audited an empty set and reported green.
2. **CI runs no tests at all.** `.github/workflows/seo-validation.yml` runs `node scripts/validate-seo.js` and nothing else, filtered to `public/**`. Changes to `src/`, `test/`, or `scripts/` trigger no job.
3. **Four load-bearing gates were agents that do not exist**, and no phase built them. They were the sole detection for two Critical error classes.
4. **No START certificates.** Phase entry was implied by ordinal position. Two preconditions are false today and were filed as prose.
5. **Entry point 2 has no phase.** The Contract mapped four entry points to Phases 2, 4, 5, 1; that mapping is off by one, and "I need to keep Medi-Cal" (Scope §2, the churn-navigation path with its risk list and Do-today/Do-next/Ask-a-helper format) has no deliverable and no assertion. A quarter of the first release, marked IMPLEMENTED.
6. **Silent scope reduction inside the assertions meant to prevent it.** Governance: 5 seats asserted, 7 in the spec, the two dropped being immigration legal-aid and technical/privacy oversight. Success measures: 4 asserted, 8 in the spec, the dropped one including "policy updates published on time," which is the direct measure of solo capacity.

Both reviews also made errors, recorded because agent output gets checked: the red-team cited an untracked `test/medical_probe/` that was actually its sibling's probe directory, and the certificate-auditor asserted PostHog is installed here when it is not.

---

## Phase 0 — Gate integrity. Nothing else is trustworthy first.

**START:** none. This is the chain root.

**Deliverables**
- Test collection recurses so `test/**` is actually run by `npm test`, `npm run gate`, `npm run predeploy`, and `.githooks/pre-push`.
- CI runs the test suite, with the path filter widened to `src/**`, `test/**`, `scripts/**`.

**DONE**
| # | Assertion |
|---|---|
| 0.1 | A deliberately throwing test placed in `test/medical/` causes `npm run predeploy` to exit non-zero. Demonstrated, not asserted. |
| 0.2 | Collected test-file count > count of top-level `test/*.test.js`, so a future narrowing fails the build |
| 0.3 | The 56 existing assertions still pass unchanged |
| 0.4 | A push touching only `src/backend/server.js` triggers a CI run that executes `node --test` |

---

## Phase 0.5 — Build the four detectors, and measure them

**START:** Phase 0 DONE. A detector that cannot fail the build is decoration.

Each detector ships with a red-team corpus and a measured rate. An unmeasured detector's silence means nothing.

| Detector | DONE |
|---|---|
| `determination-boundary-auditor` | Runs on **rendered** output, not source strings. Against 30 near-miss strings that paraphrase around Scope §5's three verbatim prohibitions: catch rate ≥ 28/30, false positives ≤ 2/30. Fails the build on any hit. |
| `plain-language-reviewer` | Flesch-Kincaid for EN, Fernández-Huerta/INFLESZ for ES, both versions pinned. Bar is **grade 3**, not 4 (v1 silently relaxed the spec's "approximately third-grade"). Recomputes at test time; never reads a stored score. |
| `pii-egress-auditor` | Proves absence at the OS boundary: read-only filesystem plus a tmpfs hashed before and after, byte-identity asserted on every writable mount. Asserts the only outbound socket is the pinned zero-retention host. |
| `medi-cal-policy-fidelity-reviewer` | **Not built as an agent.** The addendum names the Medi-Cal policy expert as a role that is never skipped; automating it is the substitution the addendum forbids. Replaced by a seated human reviewer plus a provenance script asserting each cited entry contains a stored verbatim span. |

Plus two scripts with their own rows: the referral-freshness gate and the policy-staleness watchdog, each carrying a **seven-tier** interval table.

---

## Phase 1 — Foundations, i18n, no-PHI invariant

**START:** Phases 0 and 0.5 DONE. Spanish reviewer seated and named. Medi-Cal policy reviewer seated and named.

**DONE**
| # | Assertion |
|---|---|
| 1.1 | `/medi-cal` responses contain the resolved value of a named registry key, and the `?lang=es` body differs from `?lang=en` at that key |
| 1.2 | Every rendered text node **and** every user-visible attribute (`alt`, `aria-label`, `title`, `placeholder`) set-differences to empty against `en.json`; registry key count ≥ a stated N so an empty page cannot pass |
| 1.3 | EN/ES key-set equality **and** count ≥ N **and** zero ES values byte-identical to their EN counterpart outside a `same_in_both` allowlist whose size is asserted and cannot rise. Guards `cp en.json es.json`. |
| 1.4 | No `Set-Cookie`; the module graph reachable from the handler contains no `@supabase/supabase-js`, no logger, no fs write API; every writable mount hashes identically before and after a request |
| 1.5 | Each registry entry carries the **five** named metadata fields; dates parse and are ≤ today; `source` resolves; `reading_grade` is recomputed at test time by the gate's own scorer |
| 1.6 | The four required affordances — "I'm not sure," "Skip for now," "Start over," "Talk to a person" — render on **every** screen, list derived from the router |
| 1.7 | Language switch preserves the current task state |
| 1.8 | Every screen carries the independence disclaimer and the do-not-enter-identifiers warning |
| 1.9 | a11y and contrast suites iterate a router-derived page list, not a literal |

---

## Phase 2 — Policy corpus and staleness watchdog

**START:** Phase 1 DONE. Moved ahead of every content phase, per v1's own stated principle, which v1 then violated.

**DONE**
| # | Assertion |
|---|---|
| 2.1 | Seven-tier interval table in code; boundary cases at interval−1 / interval / interval+1 for **each** of the seven tiers |
| 2.2 | The watchdog's input set is derived from **rendered** statements, not the corpus, so a hardcoded string cannot escape it |
| 2.3 | Non-vacuity: the watchdog examined ≥1 item per tier for which a statement is displayed. A corpus containing only Tier 7 cannot pass by having nothing to check. |
| 2.4 | Six adjacent-tier conflict pairs (1v2 … 6v7), one intra-tier supersession case, and one negative case that must **not** flag |
| 2.5 | Every policy-dependent answer renders an "as of [date]" marker (addendum Safeguard 5) |
| 2.6 | Grounding contract: every citation resolves to a chunk with document id and offset, verified before display (Safeguard 1) |
| 2.7 | Refusal on weak retrieval: below the stated relevance threshold, the response is "I could not find a current, verified answer," never a generated one (Safeguard 2) |

---

## Phase 3 — Referral card

**START:** Phase 2 DONE. Referral entries are Tier 6 corpus rows; v1's parallel 90-day mechanism is deleted.

**DONE**
| # | Assertion |
|---|---|
| 3.1 | Expiry boundary at 89/90/91 days **and** across a `America/Los_Angeles` DST transition |
| 3.2 | Every seeded row has a street address matching `/^\d+\s/`, a distinct site phone, and `verified_by` + `verified_on` recorded from a live call. Two of the six Gardner rows in the addendum have no street address; a fixture diff would have shipped "(San Jose area)" to someone without a car. |
| 3.3 | Post-state deep-equals pre-state except `last_confirmed`, over a body containing every column name, an unknown key, and `__proto__` |
| 3.4 | Token TTL stated; boundary at TTL−1s / TTL / TTL+1s; replay after use is non-200 and mutates nothing |
| 3.5 | ES: row-id set equality, every label resolves from `es.json`, zero untranslated values, language capacity visible |
| 3.6 | Population floor: below K confirmed entries, a static fallback block renders and an alert fires |

---

## Phase 4 — Entry point 1: "I got a Medi-Cal letter"

**START:** Phase 3 DONE.

**DONE**
| # | Assertion |
|---|---|
| 4.1 | Both clocks implemented, each citing its authority; the anchor event named for each; the rollover rule named. Asserted at 29/30/31, at Saturday, Sunday and observed-holiday landings, and across both DST transitions. |
| 4.2 | Checklist items resolve to real corpus entries current under their tier interval; count of unresolved ids is 0 |
| 4.3 | Terminals derived from the **rendered DOM** by click-reachability, not from the graph literal the code walks |
| 4.4 | `determination-boundary-auditor` clean on rendered output |
| 4.5 | `plain-language-reviewer` ≤ grade 3, EN and ES |

**Adversary at this gate:** produce a passing implementation that computes a wrong real-world deadline. Report whether it succeeded.

---

## Phase 5 — Entry point 2: "I need to keep Medi-Cal"

**START:** Phase 4 DONE. **This phase did not exist in v1.** Scope §2 in full: the risk list (missed letter, moved or lost mail, unclear request, unknown exemption, changed hours, not knowing where to get help, cannot use BenefitsCal) and the Do today / Do next / Ask a helper action-plan format.

**DONE**
| # | Assertion |
|---|---|
| 5.1 | Each of the seven §2 risks is reachable and produces a distinct action plan |
| 5.2 | Every plan renders all three bands: Do today, Do next, Ask a helper |
| 5.3 | Terminals click-reachable; no dead ends |
| 5.4 | Determination-boundary and plain-language gates clean |

---

## Phase 6 — Entry point 3: work-rule awareness

**START:** Phase 5 DONE.

**DONE**
| # | Assertion |
|---|---|
| 6.1 | Runtime proof of no model call: the 6.2 enumeration runs with `fetch`, `http`, `https`, and `net.Socket` stubbed to throw, and every branch still renders in full. A call-graph grep is not an absence proof. |
| 6.2 | Exhaustive enumeration; the `default` branch is **unreachable**, not merely handled |
| 6.3 | Each of the five DHCS step-3 TBD categories is reachable from ≥1 input vector and routes to a helper |
| 6.4 | The one-month lookback renders on a stated, enumerated set of applicable path ids whose count cannot fall |
| 6.5 | Determination-boundary gate on rendered output across all input vectors |
| 6.6 | Every branch stores a verbatim quotation span from its cited corpus entry, and the span appears in the source document |

---

## Phase 7 — Task list and warm handoff, deterministic

**START:** Phase 6 DONE. **The LLM is removed from this phase.** Inputs are five structured screener answers plus a date; string interpolation into the fixed template produces the same card, and "introduces no fact absent from the inputs" becomes true by construction rather than by fixture.

**DONE**
| # | Assertion |
|---|---|
| 7.1 | Card fields are a pure function of session inputs; property test over the full input space |
| 7.2 | No outbound request of any kind carries card fields; network layer stubbed, all flows exercised |
| 7.3 | Every ES token in a rendered card appears in `es.json`. Enforces the `DECISIONS_v1.md` invariant that member-facing Spanish is never generated live — absent from v1 entirely. |
| 7.4 | Print CSS asserted; overflow tested at the longest ES string (Spanish runs 20–25% longer) |
| 7.5 | Every card is stamped with corpus version, generation date, and a "verify after" line |

---

## Phase 8 — Public policy tracker

**START:** Phase 2 DONE and ≥30 days of watchdog operation, so the solo maintenance load is measured before six more components are committed.

**DONE**
| # | Assertion |
|---|---|
| 8.1 | `status` from a closed enum; `source` a resolving URL on a Tier 1–6 host allowlist; dates parse; `last_reviewed` within the tier interval; prose passes the readability gate |
| 8.2 | Publish fails when `approval.actor == publisher.actor` |
| 8.3 | Publish fails when `approved_at − queued_at` is below a stated minimum latency; same-minute approval count is 0 and cannot rise |
| 8.4 | Publish fails when the hash of the approved diff ≠ the hash of published content (approve-then-swap) |
| 8.5 | Kill the process at N injection points mid-write; the published tracker is byte-identical to pre-run at every one |
| 8.6 | Ingestion run queuing ten items leaves the published tracker's content hash unchanged |
| 8.7 | Weekly maintenance hours emitted as a metric against a pre-committed cut list |

---

## Phase 9 — Read-aloud

**START:** Phase 7 DONE. Native `window.speechSynthesis`. No vendor, no spend cap, no metering test, most of the benefit. **Voice input is deferred to v1.1** — see Deferred.

**DONE**
| # | Assertion |
|---|---|
| 9.1 | Read-aloud control on every router-derived screen, accessible name in both languages, activation produces the call |
| 9.2 | Rendered SSML carries correct `<say-as>` on every date, currency and telephone token |
| 9.3 | Voice model and version pinned; human listening check scheduled against version changes |

---

## Phase 10 — Notice upload

**START, all three blocking:** (a) a contracted zero-retention inference endpoint, (b) a labeled fixture set of ≥100 real notices spanning ≥K notice types, with an acquisition path that does not itself create a PII store, (c) `pii-egress-auditor` measured in Phase 0.5.

**Recommendation on the record:** both reviews argued this should leave v1. `SCOPE_original.md` §4 originally said the first version should not accept uploads; `DECISIONS_v1.md` overrode it. For a solo build against a January date, the original scope was probably right. The START gates above are written so this phase self-defers if the preconditions are not met, rather than shipping half-built.

**DONE**
| # | Assertion |
|---|---|
| 10.1 | Per-field format validation; `issuing_office` and `action_requested` from closed enums; explicit rejection fixture with a case number embedded in an allowed free-text field |
| 10.2 | OS-boundary absence proof (read-only fs + hashed tmpfs), covering success, failure, exception, **and async-rejection/process-abort** paths. Catches the multipart parser writing to `os.tmpdir()` before the handler runs. |
| 10.3 | Egress: the only outbound socket is the pinned zero-retention host, carrying the no-retain flag; fails closed on drift |
| 10.4 | Stated refusal rate on the unreadable set **and** a stated maximum false-refusal rate on the readable set, so a refuse-everything system cannot pass |
| 10.5 | **Confident-and-wrong rate of 0** on the held-out set; exact-date accuracy ≥ a stated X%; fixture set cannot shrink and error rate cannot rise in later phases |
| 10.6 | Rate limit and spend cap: numbers and key stated, boundary-tested, and the spend counter survives a dyno restart |

---

## Phase 11 — Measurement, governance, launch

**START:** Phases 1–9 DONE.

**DONE**
| # | Assertion |
|---|---|
| 11.1 | All **8** spec success measures covered, list extracted from `SCOPE_original.md` at test time or pinned by section hash. Human-collected measures either have a collection instrument or an explicit DEFERRED row. |
| 11.2 | Outbound payloads intercepted across a full run of all flows and checked against a key allowlist; any analytics excludes `/medi-cal/*` by path, asserted |
| 11.3 | All **7** governance seats signed off, each bound to a git SHA equal to the release SHA |
| 11.4 | Rollback executed for real: marked release deployed, rolled back, prior marker served, both release numbers and wall-clock duration recorded |
| 11.5 | Kill-criteria thresholds stated, boundary-tested, and end-to-end delivery to a real channel asserted |
| 11.6 | `noindex, noarchive` on flow screens; AI user-agents disallowed on the `/medi-cal` tree; only the tracker indexable |

---

## Error register additions beyond v1's E1–E26

| # | Class | Severity |
|---|---|---|
| E27 | **Phase 9/10 transmit member voice or images to a vendor with no PII assertion in v1.** A member saying "my case number is 12345678" into a microphone is the artifact `DECISIONS_v1.md` says must not exist. Every Phase 10 safeguard was bypassed by Phase 9. | **Critical** |
| E28 | The `high_stakes` flag is created in Phase 1 and never read by any assertion. E6 (Spanish fluent but wrong) had zero detection anywhere. | High |
| E29 | Approve-then-swap: content approved differs from content published | High |
| E30 | Refuse-everything passes every refusal assertion | Medium |

---

## Completeness Contract

| Requirement | Source | Status | Where |
|---|---|---|---|
| Entry point 1, I got a letter | Scope First Release | IMPLEMENTED | Phase 4 |
| Entry point 2, I need to keep Medi-Cal | Scope §2, First Release | IMPLEMENTED | **Phase 5 (absent from v1)** |
| Entry point 3, will a work rule affect my household | Scope §5, First Release | IMPLEMENTED | Phase 6 |
| Entry point 4, I need a person to help | Scope §6, First Release | IMPLEMENTED | Phase 3 |
| Do today / Do next / Ask a helper format | Scope §2 | IMPLEMENTED | Phase 5, assertion 5.2 |
| Policy change tracker, daily | Scope §3; decision 2026-08-19 | IMPLEMENTED | Phases 2, 8 |
| Notice and next-step support | Scope §4 | IMPLEMENTED | Phase 4 |
| Notice image upload | DECISIONS_v1 decision 1 | IMPLEMENTED, self-deferring | Phase 10, three blocking START gates |
| Work-rule awareness, no determination | Scope §5 | IMPLEMENTED | Phase 6; determination gate every phase |
| Human help and warm handoff | Scope §6 | IMPLEMENTED | Phases 3, 7 |
| CHW-assisted use, no dashboard | Scope §7 | IMPLEMENTED | Phase 7, shared client surface |
| English and Spanish | Scope Languages | IMPLEMENTED | Phase 1 structural, per-phase content |
| Language switch preserves context | Scope Languages | IMPLEMENTED | Assertion 1.7 |
| Spanish never generated live | DECISIONS_v1 | IMPLEMENTED | Assertion 7.3 |
| Third-grade reading level | Scope UX Principles | IMPLEMENTED | Phase 0.5 detector, bar grade 3 |
| Four affordances: not sure / skip / start over / talk to a person | Scope UX Principles | IMPLEMENTED | Assertion 1.6 |
| Works well on a phone | Scope UX Principles | IMPLEMENTED | Assertion 7.4, responsive checks |
| Read-aloud | Scope UX Principles; Addendum | IMPLEMENTED | Phase 9 |
| No account, no persistence, no PHI | Scope Out of Scope, Privacy | IMPLEMENTED | Assertion 1.4; Phase 10 gates |
| Do-not-enter-identifiers warning | Scope Privacy | IMPLEMENTED | Assertion 1.8 |
| Independence disclaimer | Scope Privacy | IMPLEMENTED | Assertion 1.8 |
| Visible path to human help, global | Scope Privacy | IMPLEMENTED | Assertion 1.6 |
| Rate limits and spending caps | Scope Privacy | IMPLEMENTED | Assertion 10.6 |
| Tiered source corpus with metadata | Addendum Data Sources | IMPLEMENTED | Phase 2 |
| Grounding contract, Safeguard 1 | Addendum | IMPLEMENTED | Assertion 2.6 |
| Refusal on weak retrieval, Safeguard 2 | Addendum | IMPLEMENTED | Assertion 2.7 |
| Span-level citation verification, Safeguard 3 | Addendum | IMPLEMENTED | Assertion 6.6 |
| Contradiction disclosure, Safeguard 4 | Addendum | IMPLEMENTED | Assertion 2.4, six adjacent pairs |
| Recency and authority-tier enforcement, as-of marker, Safeguard 5 | Addendum | IMPLEMENTED | Assertions 2.1, 2.5 |
| Human-in-the-loop on high-stakes, Safeguard 6 | Addendum | IMPLEMENTED | Phase 8 approval gates 8.2-8.4 |
| Evaluation harness with thresholds, Safeguard 7 | Addendum | IMPLEMENTED | Phase 0.5 detector rates; 10.4, 10.5 |
| No answering from memory, Safeguard 8 | Addendum | IMPLEMENTED | Assertions 2.6, 2.7, 6.1 |
| Governance review group | Scope Governance | IMPLEMENTED | Assertion 11.3, all seven seats |
| Success measures instrumented | Scope Measures of Success | IMPLEMENTED | Assertion 11.1, all eight |
| Voice input | Addendum Design | **DEFERRED to v1.1** | Vendor PII exposure unaddressed in v1; read-aloud ships in Phase 9 |
| WhatsApp / SMS / QR entry points | Addendum Design | **DEFERRED to v1.1** | No row existed in v1 at all |
| Vietnamese | Scope Languages | **DEFERRED to v2** | Decision 2026-08-19; ~183 person-years/yr; pipeline stays specified |
| Immigration and mixed-status content | Scope §1; Addendum | **DEFERRED to v2** | Decision 2026-08-19; v1 routes to legal aid |
| Hours log | Intervention design | **DEFERRED to 2027** | Self-attestation permitted through CY2027, 42 CFR 435.557(f)(1) |
| Appeals, state fair hearing, aid-paid-pending | Gap found in review (E18) | **NOT IN SPEC — awaiting decision; facts now verified** | Tool-right/county-wrong is the designed outcome; no content exists anywhere. Verified 2026-08-19: State Hearing right under 22 CCR §50951(a), administered by CDSS State Hearings Division; request deadline 90 days, currently 120 for eligibility-redetermination matters. Separately and much shorter: under 42 CFR §431.230 coverage continues during the appeal only if the hearing is requested **before the termination date printed on the Notice of Action**. Two deadlines, and the one that preserves coverage is the early one. The tool already collects the notice date for the 30-day clock and could emit both from the same input. |
| Non-Santa-Clara users | Gap found in review (E22) | **NOT IN SPEC — needs your decision** | Scope says Californians; corpus is SCC-only |
| Orchestrator agent | Addendum | N-A | Four fixed entry points; routing is a menu |
| Verifier/critic agent | Addendum | N-A for v1 | Human gate on the tracker; confidence threshold on the reader |
| Open-ended chat | Scope Privacy | N-A | Excluded from v1 |

## Open decision that still gates Phase 1

Whether to build inside the CAPHE app. Against: the regression suite errors on server-rendered routes, `Procfile` is web-only so the daily ingestion job has no runtime, Node 18 reached end of life 2025-04-30, and a health-economics association site is an audience mismatch for a low-literacy benefits tool. Distribution is QR codes at clinics rather than search, so the SEO apparatus taxes every change and returns nothing. The alternative is a separate repo, app and short domain, linked from caphegroup.org.

---

## Correction: browser speech recognition is not on-device (2026-08-19)

While building the demo I added voice input using the Web Speech API and told Victoria the audio "stays in the browser." **That is false**, and it is E27 — the exact failure the adversarial review had already named — walked into within an hour of recording it.

Verified: ordinary `webkitSpeechRecognition` sends captured audio to the browser vendor's recognition service. Chrome sends to Google; Safari on macOS shows an operating-system prompt stating the speech data goes to Apple. The specification's `processLocally = true` does force on-device recognition, but its default is `false`, and support is Chrome 139+ and Edge 139+ only — not Safari, not Safari iOS, not Firefox, not Chrome on Android. The majority of this tool's users, on phones, would be on an unsupported browser.

`SpeechSynthesis` (read-aloud) is a different API and usually uses local voices, but the specification offers no portable guarantee either, so it should not be described as guaranteed-local.

**What this means for the plan.** The Phase 9 deferral of voice input to v1.1 was correct and the reasoning is now stronger than when it was written: a member saying "my case number is 12345678" into an ordinary browser microphone ships that audio to a third party, which contradicts the Out-of-Scope rule against retaining case numbers and the addendum's treatment of immigration-adjacent data as the highest-liability content. Voice input returns to scope only when it can be pinned to `processLocally` with a hard failure — never a silent fallback to remote — or run against a recognizer under the project's own control.

**What the prototype now does**, so the demo shows the problem rather than hiding it: it attempts `processLocally` where the browser supports it; where it does not, the microphone is gated behind a plain-language warning that names where the audio goes and tells the person not to say identifying numbers, with a button to use the on-screen choices instead. The photo path is unaffected — that image genuinely never leaves the browser, because nothing uploads it.

The general lesson is the one this plan already encodes and I still failed to apply: an absence claim about data movement needs a proof, not an intuition. "It's a browser API so it must be local" is precisely the shape of reasoning assertion 6.1 exists to forbid.

---

## Reading level: the spec target conflicts with the evidence (2026-08-20)

**Measured on the prototype.** Flesch-Kincaid across all 48 English strings of six or more words: 25 are above grade 3, median 3.7, worst 11.0, mean 8.2 words per sentence. The worst offender is short but abstract, "Nothing here decides anything. Only the county decides," which is the useful lesson: abstraction drives the score, not length.

**The spec says approximately third grade. No authority found recommends that.** AHRQ's Health Literacy Universal Precautions Toolkit recommends grade 5 to 6 for health and benefits materials; CDC guidance says 4 to 6. The literature warns that over-simplification removes legally necessary distinctions, which is a live risk for content covering deadlines, exemptions, and appeal rights.

Recommended resolution, for Victoria to accept or reject: **grade 5 to 6 as the general target, with the single required action on each screen written as short as it can be written, and comprehension tested with real users rather than treated as satisfied by a readability score.** The Phase 0.5 `plain-language-reviewer` bar changes from 3 to 5 with a stricter floor for action strings, and the spec's UX Principles line is amended rather than quietly missed.

### Causal evidence that should govern the copy

| Finding | Source |
|---|---|
| Simplified notice: 23% response vs 17% complex. Stating the benefit amount: 31% vs 17%. Stigma-reduction messaging: **no measurable effect** | Bhargava and Manoli, IRS field experiment, n=35,050 |
| Application cut roughly 80% shorter: 90% completed independently, 90% under 20 minutes, staff error-correction time down 75% | Civilla, Michigan Project Re:Form |
| Renewal form redesign: 96% completion vs 73% | Michigan renewal redesign, secondary reporting, weaker evidence |
| Control 6%, information alone 11%, information plus assistance 18% | SNAP outreach summary |
| No more than four points of interest per theme; one primary action per screen | AHRQ Universal Precautions Toolkit |
| Do the arithmetic for the reader; give the calendar date rather than a day count; delete unnecessary numbers | CDC Clear Communication Index |

Two consequences for the build. Copy should state the required action first and the exact calendar date, never a day count the reader must compute. And the evidence for pictographs improving comprehension is thinner than assumed: icons must be labeled and user-tested, and no claim of icon benefit should enter the design record without one.
