# Program Plan: Medi-Cal Churn-Prevention Tool v1

**Date:** 2026-08-19
**Repo:** `/Users/victoriaperez/Projects/CAPHE`
**Host:** caphegroup.org (Heroku app `caphegroup`, Node 18 / Express)
**Spec of record:** `~/Projects/scc_hr1_medicaid/spec/SCOPE_original.md`, `ARCHITECTURE_addendum.md`, `DECISIONS_v1.md`
**Impact model:** `~/Projects/scc_hr1_medicaid/churn_reduction_model.py`
**Method:** TDD per phase, matching this repo's existing convention (`node:test`, RED before GREEN).

## Project config

| Key | Value |
|---|---|
| DEFAULT_BRANCH | `master` (both remotes) |
| PREDEPLOY_CMD | `npm run predeploy` = `seo:validate && node --test test/*.test.js` |
| DEPLOY_TARGET | Heroku app `caphegroup` |
| CANONICAL_HOST | `www.caphegroup.org` |
| CI | `.github/workflows/seo-validation.yml` |
| Error monitoring | PostHog (no Sentry). Post-deploy sweep = PostHog + `heroku logs` |

**Deploy foot-gun, recorded once:** in this repo `origin` is **Heroku** and `github` is GitHub. `git push origin master` deploys to production. Merge goes to `github`; deploy is a separate deliberate `git push origin master`. Phase 9 of fix-and-ship must not treat merge as deploy here.

---

## Why this ordering

Risk-first, not value-first. Each phase is placed so that the thing most likely to invalidate later work is settled earlier, and so that the first shippable slice exercises the full deploy path with the least risk.

Two constraints drive it. Internationalization cannot be retrofitted, so English and Spanish are structural from Phase 0 rather than a late phase. And the policy corpus is the spine every other component reads from, so it lands before any component encodes a rule.

The highest-risk component, the notice reader, is deliberately late: by then the PII gates, the refusal patterns, and the test harness are mature enough to hold it.

---

## Phases

### Phase 0 — Foundations and standing gates

**Deliverables**
- `/medi-cal` route mounted in `src/backend/server.js`, rendering in EN and ES from a single string registry (`src/frontend/i18n/{en,es}.json`), no content yet.
- Architectural invariant enforced in code: no account, no persistence of member data, no PHI at rest.
- Content-string registry with per-string metadata: `source`, `effective_date`, `last_reviewed`, `reading_grade`, `high_stakes` boolean.
- Test harness extended: `test/medical/` suite added to the existing `node --test test/*.test.js` run.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 0.1 | `GET /medi-cal` and `/medi-cal?lang=es` both return 200 | route test |
| 0.2 | Every user-facing string resolves from the registry; zero hardcoded English in templates | test greps templates for bare text nodes |
| 0.3 | EN and ES registries have identical key sets | set-equality test, fails on any orphan key |
| 0.4 | No route under `/medi-cal` writes to disk, DB, or session | static check + a runtime test asserting no fs/session writes on the request path |
| 0.5 | Every registry entry carries all six metadata fields | schema test |
| 0.6 | Existing `npm run predeploy` still green (sitemap counts, meta, contrast, a11y) | full suite |

**Agents / skills:** `frontend-designer` (required by CLAUDE.md for new user-facing surfaces), `ux-design-qa-analyst`, `ada-compliance`, `codebase-claim-verifier` (before asserting anything about what CAPHE's server does today).

**Likely errors:** silently adding a session or cookie via an Express default; ES keys drifting from EN; breaking the repo's existing sitemap loc-count test by adding routes.

---

### Phase 1 — Referral card

**Deliverables**
- Partner-maintained referral table: organization, service, languages, address, phone, hours, `last_confirmed` date.
- 90-day auto-expiry: an entry past threshold stops displaying stated hours and shows "call to confirm."
- One-click confirmation flow for partners (tokenized link, no login).
- Seeded with Gardner's six sites and the county offices already verified in `INTERVENTION_DESIGN.md`.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 1.1 | An entry with `last_confirmed` older than 90 days never renders stated hours | unit test on the render function, boundary tested at 89/90/91 days |
| 1.2 | Every seeded entry's phone and address match the verified source table | fixture diff against `INTERVENTION_DESIGN.md` source rows |
| 1.3 | Confirmation link updates only `last_confirmed`, never other fields | handler test |
| 1.4 | Confirmation link is single-use and expires | token test |
| 1.5 | Referral list renders in ES with equivalent entries | parity test |

**Agents / skills:** `ux-design-qa-analyst`, `ada-compliance`, `security-review` (tokenized link is the first untrusted input).

**Likely errors:** the expiry defaulting open instead of closed; a partner confirmation endpoint that accepts arbitrary field updates; hours displayed without a timezone; assuming an entry is fresh because it was seeded rather than confirmed.

---

### Phase 2 — The 30-day clock

**Deliverables**
- Entry point "I got a Medi-Cal letter": notice date in, response deadline out, document checklist, route to the referral card.
- Deadline arithmetic covering both DHCS clocks: the request-for-information response window and the notice-of-noncompliance window.
- Explicit "the county makes the official decision" framing on every output.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 2.1 | Deadline = notice date + 30 calendar days, with weekend and holiday behavior stated and tested | table-driven date tests incl. leap year and DST boundary |
| 2.2 | No output string asserts eligibility, exemption, or outcome | determination-boundary gate (see New Agents) |
| 2.3 | Checklist content traces to a corpus entry with an effective date | content-provenance test |
| 2.4 | Every path terminates in either a next action or a referral, never a dead end | flow test enumerating all terminal nodes |
| 2.5 | Reading grade of every new string ≤ 4.0 in EN | readability gate |

**Agents / skills:** `determination-boundary-auditor` (NEW), `plain-language-reviewer` (NEW), `content-qa`, `style-pass`, `ux-design-qa-analyst`.

**Likely errors:** off-by-one on the deadline; treating 30 days as business days; the checklist quietly becoming advice; a flow branch with no exit.

**⛔ Adversarial gate 1** — `certificate-auditor` on Phases 0–2 acceptance criteria. Question: could every assertion pass while a user still cannot find their deadline?

---

### Phase 3 — Policy corpus and the daily tracker

**Deliverables**
- Tiered corpus store (Tiers 1–7 per the addendum) with per-document metadata: tier, jurisdiction, effective date, last verified, source URL.
- Daily ingestion job: fetch, diff against last known state, model-assisted triage, queue only changed items for human review.
- Human review gate: nothing publishes without an explicit approval artifact recording who approved what and when.
- Public policy tracker page: what changed, who is affected, when it starts, status (in effect / planned / blocked / challenged), what to do now, source, last reviewed.
- Staleness watchdog: build fails if any displayed policy statement exceeds its tier's review interval.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 3.1 | Every published tracker row has all seven required fields non-empty | schema test |
| 3.2 | No row publishes without an approval record referencing a human and a timestamp | pipeline test; attempt to publish unapproved must fail |
| 3.3 | Staleness watchdog fails the build when a Tier 3 item exceeds 14 days or a Tier 4 item exceeds 2 days | watchdog test with injected stale fixtures |
| 3.4 | Conflicting Tier 1–3 vs Tier 4 sources render BOTH with an explicit conflict flag, never silently resolved | contradiction test with a fixture pair |
| 3.5 | The daily job is idempotent and a failed run does not publish partial state | job test |
| 3.6 | Ingestion never writes to the public tracker directly, only to a review queue | architecture test |

**Agents / skills:** `medi-cal-policy-fidelity-reviewer` (NEW), `literature-review-agent` (corpus sourcing + citation verification), `doc-accuracy-auditor`, `citation-cross-validator`.

**Likely errors:** the human gate degrading into a rubber stamp under solo load; the differ missing a superseding ACWDL because DHCS obsoletes rather than deletes; litigation status going stale between daily runs; the model summarizing a change incorrectly and a tired reviewer approving it.

**⛔ Adversarial gate 2** — dedicated adversary on the tracker. Question: name three ways a wrong policy statement reaches a member with every gate green.

---

### Phase 4 — Work-rule awareness (deterministic rules engine)

**Deliverables**
- Five-question screener as a pure rules engine, no generation in the decision path.
- Output: "this may affect you" / "this may be an exemption to ask a trained helper about," never a determination.
- Rule provenance: every branch cites the corpus entry that authorizes it.
- Explicit routing of the DHCS step-3 TBD categories (medically frail, parent of a disabled person, total-rated veteran, half-time student, SNAP/TANF-aligned) to a helper, since these are the highest-yield unclaimed exemptions.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 4.1 | The decision path contains no model call | static import/call-graph test |
| 4.2 | Every rule branch references a corpus entry id that exists and is current | provenance test |
| 4.3 | Exhaustive input enumeration produces no unreachable branch and no unhandled combination | property test over the full input space |
| 4.4 | Zero outputs in the banned-assertion set across all branches | determination-boundary gate, exhaustive |
| 4.5 | The one-month lookback is stated on every path where it applies | content test |

**Agents / skills:** `determination-boundary-auditor` (NEW), `medi-cal-policy-fidelity-reviewer` (NEW), `codebase-claim-verifier`, `code-review`.

**Likely errors:** the rules engine drifting into advice through its explanatory copy; a branch encoding policy that changed; the lookback rule omitted on the exact paths where it matters most (buckets F and G); an input combination silently falling through to a default.

---

### Phase 5 — Task list and warm handoff

**Deliverables**
- Client card: short plain-language next steps.
- Helper card: issue, likely deadline, documents the person has, missing information, questions for the navigator.
- Client controls whether the helper card is shown, printed, texted, or shared. Nothing is transmitted without an explicit action.
- First LLM component: summarization into a fixed template.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 5.1 | The helper card renders only fields present in the fixed template; model output is schema-validated before render | schema test with adversarial model output fixtures |
| 5.2 | No card is transmitted anywhere without an explicit user action in the same request | handler test |
| 5.3 | Summarization introduces no fact absent from the session inputs | held-out fixture set with known inputs, checked for insertion |
| 5.4 | Model failure degrades to a template-filled card, never to an error page | failure-injection test |
| 5.5 | Cards render and print legibly in EN and ES | rendered check |

**Agents / skills:** `determination-boundary-auditor` (NEW), `plain-language-reviewer` (NEW), `ux-design-qa-analyst`, `security-review`.

**Likely errors:** the summarizer inventing a deadline or a document; the helper card becoming a de facto case record; sharing that leaks more than the client intended; the model output bypassing schema validation on an edge path.

---

### Phase 6 — Notice reader (image upload)

**Deliverables**
- Optional photo upload returning a closed field set: notice date, response deadline, action requested, issuing office, notice language.
- Field-restricted extraction, architecturally incapable of returning name, address, case number, or aid code.
- Ephemeral processing: in memory for the request, never to disk, queue, cache, or log, including on the error path.
- Zero-retention inference endpoint, contractually confirmed before implementation.
- Confidence threshold with an honest "I could not read this clearly" refusal.
- Published data-flow documentation making the no-retention claim testable.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 6.1 | Extractor output validates against the closed schema and rejects any additional property | schema test with adversarial model outputs containing a case number |
| 6.2 | No image bytes reach disk, logs, or any store on success, failure, or exception paths | fs and log spies across all three paths, including a forced exception |
| 6.3 | An unreadable or non-notice image returns the refusal path, never a guess | held-out fixture set incl. blank, rotated, wrong-document, and adversarial images |
| 6.4 | Extracted deadline matches ground truth on a labeled fixture set, with the error rate recorded | benchmark test with a stated pass threshold |
| 6.5 | Rate limit and spend cap enforced; exceeding either degrades to manual date entry | load test |
| 6.6 | The inference vendor's zero-retention configuration is documented and dated | provenance doc check |

**Agents / skills:** `pii-egress-auditor` (NEW), `security-review`, `code-review`, `ux-design-qa-analyst`.

**Likely errors:** an exception handler dumping the request body; a thumbnail or debug copy written during development and never removed; the model returning a case number inside a free-text field that passes schema validation; a vendor default that retains inputs for abuse monitoring; extraction confidently wrong on a notice type absent from the fixture set.

**⛔ Adversarial gate 3** — dedicated adversary on the upload path. Question: produce a sequence of requests that causes one byte of member PII to persist anywhere.

---

### Phase 7 — Read-aloud and voice

**Deliverables**
- Read-aloud on every screen, EN and ES, including extracted notice fields and the task list.
- Voice input mapping free speech onto the current question's answer set, with buttons always present.
- Confidence floor: unmapped utterances re-ask with choices visible rather than guessing.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 7.1 | Every screen exposes a read-aloud control reachable by keyboard and screen reader | a11y test |
| 7.2 | Voice input never advances the flow on a low-confidence mapping | threshold test with ambiguous fixtures |
| 7.3 | Every voice-enabled step is completable with buttons alone | flow test with voice disabled |
| 7.4 | Speech cost per session stays under the modeled cap | metered test |
| 7.5 | ES read-aloud pronounces dates, dollar amounts, and phone numbers correctly | reviewed sample with SSML |

**Agents / skills:** `ux-design-qa-analyst`, `ada-compliance`, `plain-language-reviewer` (NEW).

**Likely errors:** voice becoming a required path for some step; recognition failing disproportionately for accented Spanish and never being measured; TTS mispronouncing benefit terminology; cost scaling with abuse rather than use.

---

### Phase 8 — Measurement, review-group sign-off, launch readiness

**Deliverables**
- Instrumentation for the spec's own success measures: share identifying a next action, share identifying a deadline, share using or saving a task list, share clicking or calling human help, all without storing member data.
- Governance review-group sign-off: CHW/promotora, CEC, Medi-Cal policy, disability/accessibility, Spanish review.
- Launch runbook including the Heroku deploy foot-gun and the rollback path.
- Kill-criteria monitoring wired: tracker staleness and per-site initiation.

**Verifiable acceptance**
| # | Assertion | How checked |
|---|---|---|
| 8.1 | Every success measure in the spec has a corresponding metric that is actually emitted | measure-to-metric coverage test |
| 8.2 | No metric payload contains member-identifying data | payload inspection test |
| 8.3 | Every governance seat has a recorded sign-off before launch | artifact check |
| 8.4 | Rollback documented and rehearsed once against staging or a no-op release | runbook check |
| 8.5 | Kill-criteria alerts fire on injected stale-tracker and zero-initiation fixtures | alert test |

**Agents / skills:** `pressure-tester` re-run against the built product rather than the idea, `deck-workflow` for the working-group presentation, `doc-accuracy-auditor`.

**⛔ Adversarial gate 4** — pre-launch adversary across the whole system. Question: what would make this tool actively harmful to a member on 2 January 2027?

---

## New agents this program needs

Each is proposed because an existing agent covers an adjacent concern but not this one.

| Proposed agent | Job | Why existing agents do not cover it |
|---|---|---|
| `determination-boundary-auditor` | Scans every user-facing string, template, and model output schema for anything asserting eligibility, exemption, compliance, or outcome. Lexical banned-phrase gate plus semantic review of borderline phrasing. | Nothing enforces scope §5. `style-pass` owns voice and AI tells; `content-qa` owns specificity. Neither knows that "you qualify" is a liability event. |
| `medi-cal-policy-fidelity-reviewer` | Checks every user-facing policy statement against the tiered corpus, verifying the cited entry says what the string claims, is current, and is at an adequate authority tier. | `citation-cross-validator` and `literature-review-agent` verify academic citations. `doc-accuracy-auditor` checks docs against filesystem and git. None reads a benefits-policy corpus with effective dates. |
| `pii-egress-auditor` | Standing behavioral gate on the upload path: proves the closed schema holds, nothing persists on success, failure, or exception, and no identifier reaches logs or third parties. | `/security-review` is diff-scoped and hunts vulnerability classes. `multi-tenant-isolation-auditor` assumes accounts and tenancy, which this tool deliberately lacks. |
| `plain-language-reviewer` | Enforces the third-grade target in EN and ES: readability scoring, sentence length, glossary adherence, and meaning preservation across the two languages. | `style-pass` catches AI tells and banned constructions, not grade level. No agent handles ES parity. |

Two supporting scripts rather than agents: a **referral-freshness gate** (fails the build when a displayed entry is past its confirmation window) and a **policy-staleness watchdog** (fails the build when a displayed policy statement exceeds its tier interval).

---

## Standing gates, every phase

Run on every phase without exception, in addition to the phase-specific agents above.

1. `npm run predeploy` — the repo's existing SEO, meta, contrast, a11y, and sitemap suite must stay green. Adding routes is the most likely way to break the sitemap loc-count test.
2. `determination-boundary-auditor` on any new user-facing string.
3. `plain-language-reviewer` on any new user-facing string, EN and ES.
4. `ux-design-qa-analyst` per CLAUDE.md, on any new interactive surface.
5. `style-pass` before any drafted content is shown.
6. EN/ES key-parity test.
7. `python3 ~/.claude/scripts/check_plan_completeness.py` against this plan before each phase's implementation begins.

---

## Register of likely errors

Ordered by severity, each with the mechanism that is supposed to catch it. A phase is not done until its row's detection exists and has been shown to fire.

| # | Error class | Severity | Detection |
|---|---|---|---|
| E1 | Stale policy presented as current | Critical | Staleness watchdog fails the build; per-tier review intervals; every statement carries effective and last-reviewed dates |
| E2 | The tool asserts a determination | Critical | `determination-boundary-auditor`, exhaustive over branches, lexical plus semantic |
| E3 | Member PII persists from an upload | Critical | `pii-egress-auditor`; fs and log spies across success, failure, and exception paths |
| E4 | Model invents a deadline or document | High | Held-out labeled fixture set with a stated error threshold; refusal path on low confidence |
| E5 | Silent scope reduction across phases | High | Completeness Contract below; `check_plan_completeness.py`; `certificate-auditor` at gate 1 |
| E6 | Spanish fluent but wrong on a high-stakes string | High | Forward and back translation, locked glossary, human reviewer gate on `high_stakes` strings |
| E7 | Referral entry stale, sends someone to a closed office | High | 90-day auto-expiry, boundary-tested; partner one-click confirmation |
| E8 | Human review gate becomes a rubber stamp | High | Approval artifact per published change; flag same-minute approvals; measure review latency |
| E9 | Reading level drifts above the target | Medium | Readability score gate per string at build |
| E10 | Accessibility regression | Medium | `ada-compliance`, `ux-design-qa-analyst`, existing a11y and contrast suites |
| E11 | CAPHE's existing regression gate breaks | Medium | `npm run predeploy` as a standing gate from Phase 0 |
| E12 | Cost or abuse runaway on public model endpoints | Medium | Rate limit and hard spend cap, load-tested; degrade to manual entry |
| E13 | A number in user-facing content traces to nothing | Medium | Provenance field required on every content string; reconciliation script |
| E14 | Accidental production deploy via `origin` | Medium | Documented in this plan and the runbook; deploy is a deliberate separate step |
| E15 | Solo maintenance capacity exceeded | Medium | Tracker load measured from Phase 3; kill criteria monitored from Phase 8 |

---

## Completeness Contract

One row per requirement carried from the spec and this session's decisions.

| Requirement | Source | Status | Where |
|---|---|---|---|
| Four entry points | Scope, Proposed First Release | IMPLEMENTED | Phases 2, 4, 5, 1 respectively |
| Policy change tracker, daily | Scope §3; decision 2026-08-19 | IMPLEMENTED | Phase 3 |
| Notice and next-step support | Scope §4 | IMPLEMENTED | Phase 2 |
| Notice image upload | `DECISIONS_v1.md` decision 1 | IMPLEMENTED | Phase 6 |
| Work-rule awareness, no determination | Scope §5 | IMPLEMENTED | Phase 4 |
| Human help and warm handoff | Scope §6 | IMPLEMENTED | Phases 1, 5 |
| CHW-assisted use, no dashboard | Scope §7; decision 2026-08-18 | IMPLEMENTED | Phase 5, shared client surface |
| English and Spanish | Scope Languages; decision 2026-08-19 | IMPLEMENTED | Phase 0 structural, per-phase content |
| Third-grade reading level | Scope UX Principles | IMPLEMENTED | `plain-language-reviewer`, standing gate |
| Voice-first and read-aloud | Addendum, Design section | IMPLEMENTED | Phase 7 |
| No account, no persistence, no PHI | Scope Out of Scope and Privacy | IMPLEMENTED | Phase 0 invariant, Phase 6 gate |
| Tiered source corpus with metadata | Addendum, Data Sources | IMPLEMENTED | Phase 3 |
| Refusal on weak retrieval | Addendum, Safeguard 2 | IMPLEMENTED | Phases 3, 6 |
| Contradiction disclosure | Addendum, Safeguard 4 | IMPLEMENTED | Phase 3, assertion 3.4 |
| Human-in-the-loop on high-stakes | Addendum, Safeguard 6 | IMPLEMENTED | Phase 3 gate; `high_stakes` flag |
| Evaluation harness | Addendum, Safeguard 7 | IMPLEMENTED | Phases 5, 6 fixture sets; Phase 8 measures |
| Governance review group | Scope Governance | IMPLEMENTED | Phase 8, seats named |
| Success measures instrumented | Scope Measures of Success | IMPLEMENTED | Phase 8 |
| Vietnamese | Scope Languages | **DEFERRED to v2** | Decision 2026-08-19; costs ~183 person-years/yr; pipeline stays specified |
| Immigration and mixed-status content | Scope §1; Addendum | **DEFERRED to v2** | Decision 2026-08-19; v1 routes to legal aid as referral |
| Hours log | Intervention design | **DEFERRED to 2027** | Self-attestation permitted through CY2027 per 42 CFR 435.557(f)(1) |
| Orchestrator agent | Addendum | **N-A** | Four fixed entry points; routing is a menu |
| Verifier/critic agent | Addendum | **N-A for v1** | Human gate on the tracker; confidence threshold on the reader |
| Open-ended chat | Scope Privacy mentions a possible public chat | **N-A** | Excluded from v1 |

---

## Open items before implementation begins

1. **Inference vendor with a contractual zero-retention configuration** must be selected before Phase 6 is scoped in detail. This is a procurement decision, not an implementation detail.
2. **Spanish reviewer capacity** must be confirmed before Phase 2 content is authored, since every phase after it depends on a reviewer being available.
3. **The by-hand exemption pilot** remains unstarted. It resolves the impact model's least defended parameter and should run in parallel with Phases 0–2 rather than blocking them.

---

# Corrections from adversarial review, round 1 (2026-08-19)

A hostile review of this plan returned findings that were then independently verified against the repo. Recorded here rather than silently patched, so the plan's own error history stays legible. A second auditor is still running on the acceptance criteria; a fuller revision follows.

## Verified, and they invalidate parts of this plan as written

**C1 — The test gate is inert, and Phase 0's deliverable stated something false about the host.** `package.json` has `"test": "node --test test/*.test.js"`. That is a flat shell glob: 16 files at the top level, zero nested. Probed directly, a subdirectory-only case returns `no matches found`. Phase 0 said a `test/medical/` suite would be "added to the existing run"; it would never have been collected. Every acceptance assertion in every phase, the whole detection column of the error register, and all four adversarial gates would have audited an empty set and reported green.

Correction: the **first commit of Phase 0**, before any feature work, changes collection to recurse and adds a meta-test asserting the collected file count exceeds the count of top-level `test/*.test.js`, so a future narrowing fails the build. Then a new test is broken deliberately to confirm `npm run predeploy` goes red. Read the count; do not trust the exit code.

**C2 — The project-config table was wrong about error monitoring.** It listed PostHog as "Error monitoring." PostHog is product analytics, and it is not installed: zero references in `public/`, `src/`, or `scripts/`. The site has no error monitoring at all, so the post-deploy sweep as written pointed at nothing. A related hazard: `POSTHOG.md` specifies session replay ON with masking preset "Normal", which masks inputs but explicitly not text or images, and instructs site-wide installation. Installed as written it would record the rendered flow including an extracted deadline. Any analytics snippet must exclude `/medi-cal/*` by path, asserted by a test.

**C3 — The advocacy track is missing from this plan entirely.** The sequencing decision of 2026-08-19 put advocacy first at 14,862 person-years a year against the tool's 2,951. This plan contains no advocacy deliverable and no acknowledgment that both tracks draw on the same person in the same window. The by-hand pilot, which resolves the impact model's least defended parameter across a factor of roughly seven, was parked as an open item at the bottom. It requires no code and produces the step-3 evidence, the first usability signal, and notice fixtures from one activity. It belongs in Phase 0 as a blocking deliverable.

**C4 — The existing regression suite will fight a server-rendered route.** `test/regressions.test.js` filters internal links through `internalPathResolves()`, which looks for `public/<path>.html` or `public/<path>/index.html`. A server-rendered `/medi-cal` has neither, so the first internal link to it turns predeploy red. `scripts/validate-seo.js` also errors on any indexable page missing a canonical, and the flow screens must be noindex.

**C5 — The daily tracker has no runtime on this host.** `Procfile` is `web: node src/backend/server.js` and nothing else. No worker dyno, no clock process, no scheduler. Phase 3's daily ingestion job as specified cannot run.

**C6 — The GitHub remote does not match `package.json`.** Remote is `dphdame/caphe-website`; `package.json` records `caphegroup/caphe-website`.

## Reported but false

The review cited an untracked `test/medical_probe/` directory as evidence for C1. It does not exist in the working tree. The finding it supported is independently verified and stands; the supporting detail was fabricated. Agent findings get checked before they are accepted.

## Error classes to add to the register

| # | Error class | Severity | Why the current register misses it |
|---|---|---|---|
| E16 | Partners stop confirming; the referral card degrades to a phone book | High | E7 makes a single stale entry fail safe and says nothing about the population. Needs a floor: below K confirmed entries, render a static fallback and alert |
| E17 | A rule changes after a card is printed | High | The staleness watchdog is build-time. A card printed in November and shown to a navigator weeks later carries no "as of" date. Pin a corpus version per session; stamp every card |
| E18 | The tool is right and the county worker is wrong | **Critical** | This is the designed outcome for the exemption buckets, so collision is guaranteed, and neither this plan nor the scope contains appeal, state fair hearing, or aid-paid-pending content. Largest content gap in the program |
| E19 | Dropped connection destroys the session by design | High | No account plus no persistence means no recovery path, and 23.5% of Spanish-LEP in the exposed group are smartphone-only. Encode step state in the URL; resume without server storage |
| E20 | Abandonment and re-entry are unmeasured | Medium | Success measures count who reaches a next action, nothing counts who drops and where |
| E21 | Legal exposure and the correction path | High | No named publisher entity, no terms, no incident procedure, and with no accounts there is no way to notify anyone who saw a wrong statement. That consequence of the privacy stance must be written down |
| E22 | A user outside Santa Clara County | **Critical** | The scope says Californians; the corpus and referrals are SCC-only. A user in one of the ~22 high-unemployment counties would get materially wrong risk framing, undetected. County must be the first question |
| E23 | County SSA or SCFHP objects to the tool existing | High | Neither holds a governance seat, while the tool is built about the county's notices and depends on the partner network for distribution. Seat both in Phase 0 |
| E24 | Referral volume floods fixed CEC capacity | High | A warm handoff into a booked-out counselor is a dead end that also burns the partner relationship the distribution model rests on |
| E25 | AI crawlers cache policy content that outlives corrections | Medium | `robots.txt` currently allows GPTBot, ClaudeBot, PerplexityBot and others on everything but `/api/`. The staleness watchdog cannot reach a third party's index |
| E26 | Client-side analytics records the member's screen | High | E3 guards filesystem and log writes and is blind to a third-party recorder. See C2 |

**E15, solo maintenance capacity, is upgraded from Medium to Critical.** It is the parent cause of E1 and E8, both already rated Critical or High, and its detection was scheduled for Phase 8, which is to say the program would discover it was too large for one person at the end of the program. Detection moves to a load measurement in the first two weeks the tracker runs, against a pre-committed cut list.

## Open decision that changes Phase 0

Whether to host inside the CAPHE app at all. C4 and C5 are the operational case against it, alongside a Node 18 runtime that reached end of life on 2025-04-30 and an audience mismatch between a health-economics association site and a low-literacy benefits tool. Distribution is QR codes at clinics rather than organic search, so the SEO apparatus this host imposes buys the tool nothing while taxing every change. The alternative is a separate repo, app, and short domain, linked from caphegroup.org. This decision is pending and it determines the shape of Phase 0.
