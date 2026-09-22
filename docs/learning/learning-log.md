# Learning log

| Date | Ticket | Skill | AI mode | What was practiced | Evidence | Result / next step |
|---|---|---|---|---|---|---|
| 2026-08-12 | OPS-000 | JavaScript | LEARN_MANUAL | Closures and Promise versus timer order | Explained independent closure state after guided examples; initially missed async ordering | NEW; practise event loop through code. |
| 2026-08-12 | OPS-000 | TypeScript | LEARN_MANUAL | Nullable values and narrowing | Wrote `Task \| null` function using optional chaining | PRACTICING; apply to a feature. |
| 2026-08-12 | OPS-000 | React | LEARN_MANUAL | State, functional updates and hook ordering | Implemented counter; corrected conditional `useEffect` reasoning | PRACTICING; apply to a feature. |
| 2026-08-12 | OPS-000 | Node.js / NestJS | LEARN_MANUAL | `try/catch` with `await`; request layers | Chose error handling and correctly ordered Controller → Service → Repository → Controller | NEW; implement a small endpoint. |
| 2026-08-12 | OPS-000 | SQL | LEARN_MANUAL | `SELECT`, `WHERE`, `INNER JOIN`, `LEFT JOIN` | Wrote select and left join after a worked join example | NEW; practise queries independently. |
| 2026-09-22 | OPS-005 | SQL / NestJS | LEARN_MANUAL | Literal case-insensitive title search with escaped `%` and `_`, and an optional search input | Explained why an escaped `%` stays a literal character and why blank input passes no search to the repository; implementation and HTTP matrix were validated on 2026-09-08 | `sql-text-matching` recorded as PRACTICING; `sql-select-filter` gained its first independent application on a changed condition. No domain-wide upgrade. |
| 2026-09-22 | OPS-006 | access (identity and session modelling) | LEARN_MANUAL | Server session versus signed token; session lifetime, idle versus absolute timeouts; why consumer apps keep users signed in for weeks; why long-lived refresh credentials are riskier in a browser SPA than in a mobile app | Asked unprompted how sessions behave in production, which classes of product use which mechanism, and why a payment app does not sign the user out for days. Explained from OWASP and NIST sources, with the risk-based reasoning behind the numbers | Teaching received and questioned; no independent application yet. Applied and verified when the session timeouts and the current-user path are implemented in OPS-006 |

## Evidence reconciled during the 2026-09-08 system audit

These are retrospective source summaries, not new assessments performed today. Original practice dates are retained where recorded; missing dates, time and assistance are not reconstructed. The current concept data and practice events live in [learning-state.json](learning-state.json), with interpretation in [skills-matrix.md](skills-matrix.md).

| Source / practice date | Concept | Observed evidence and assistance | Interpretation / next action |
|---|---|---|---|
| [OPS-001](../../work/tickets/OPS-001.md); exact practice date unrecorded | Nest read flow; SELECT/filter/joins | Learner implemented the list endpoint, traced its path and explained LEFT JOIN. Ticket records successful verification; exact help during implementation is not recorded. | Preserve PRACTICING for the broad skills; delayed independent SQL transfer still needs evidence. |
| [OPS-002](../../work/tickets/OPS-002.md); manual verification recorded 2026-09-07 | Single-record read and missing-record behavior | Ticket records open/closed record checks, 404, self-review and understanding check. The detailed independent explanation is not recorded in the ticket. | Working behavior is evidenced; do not infer mastery of all HTTP input handling or invent an independent repeat check. |
| Learner-supplied OPS-002 dialogue, reviewed 2026-09-08; original date unrecorded | Raw SELECT result versus repository result | After explicit array examples and supplied conversion code, learner explained that this raw read produces an array and the method should expose one object or null. | Guided understanding demonstrated. It is not independent authorship or delayed retention; recall the contract on changed data. |
| Same supplied dialogue | Nullish versus falsy defaults | Learner asked about `??` and `\|\|`, received the zero-value example and said it would be easy to forget. No independent application was shown. | Add a WRITE recall item; do not mark confirmed or make the learner memorize Prisma invocation syntax. |
| Learner report, 2026-09-08, supported by OPS-000/001 traces | Basic layer responsibilities | Learner reports the same controller/service/repository explanation has been requested repeatedly and is already familiar. | Park this narrow topic at learner request. This is a prompt-selection decision, not a new confirmation of architecture or all NestJS. |
| Second supplied dialogue and learner report, reviewed 2026-09-08 | Auth, guards, decorators; teaching needs | Learner reports no prior auth implementation, unfamiliar/forgotten terms, and insufficient explanation and retention support. | Teach before designing; no automatic jump to an auth bundle. Use specific concept targets and spaced recall. |

## Accepted system changes — 2026-09-08

The learner requested the audit and correction after reviewing the proposal, emphasizing selective retention and stopping repeated layer questions. Three changes were applied: teach unfamiliar concepts with worked examples before independent implementation; choose product work from learner and infrastructure readiness; use specific WRITE/UNDERSTAND/LOOKUP targets and a bounded recall queue with parked topics.

Initial recalls were assigned for 2026-09-09 (raw result contract and nullish defaults), 2026-09-11 (basic SELECT/filter) and 2026-09-15 (LEFT JOIN). These are planned opportunities, not completed checks or attendance commitments. Assess on the next attended learning session when due; update from observed results.

Audit findings: PO-only response restrictions leaked into mentoring; small code changes were treated as small learning needs; broad skill labels hid concept gaps; repeats lacked selection and retirement rules. Existing code-review improvements remain. No product implementation, role model or new sprint commitment was approved by this system update.

### Follow-up: connected learning system and task-first sessions

The learner clarified that a fixed opening recall block undermines motivation and interrupts requested work. This supersedes the earlier opening-recall policy: dates are internal opportunities, natural verified independent application counts automatically, and an optional recap can be offered at a pause/end. Confidence statements and deferrals change pacing without pretending to prove mastery; familiar parked concepts are assumed usable.

The target now explicitly specifies middle fullstack capabilities and observable engineering outcomes. Curriculum stages connect those capabilities to the preserved OPS-000 baseline, current read-foundation work and the next likely slices. No baseline questionnaire is repeated. The new local learning-state.json and scripts/learning.py provide event history, counters, duplicate protection, optional dates and automatic retirement after three independent successful days in at least two contexts. Existing historical repetitions remain unknown; zero new events does not erase prior learning.

The teacher maintains this state on actual observations; the learner is not asked to track counts or announce repetitions. The tool performs bookkeeping and does not independently judge code authorship, correctness or professional level. No new product ticket, API, access model or sprint commitment is created by this learning-system update.

### Follow-up: engineering depth stays inside OpsDesk — 2026-09-09

The learner clarified that the existing NestJS, PostgreSQL, Prisma and architecture route remains unchanged. Each relevant topic now carries a proportionate engineering loop inside its product ticket: implementation, a concrete break/abuse/race scenario, the protecting invariant, and observable verification or review of another implementation. Authentication, database writes and public APIs are the common triggers; routine low-risk CRUD does not receive a synthetic security checklist. This change adds no separate project, product scope or automatic auth commitment.

### Follow-up: decision ownership and AI-assisted delivery — 2026-09-11

The learner requested a clearer distinction between durable engineering judgment, mechanisms to learn before delegation, and lookup/delegable framework work. The system now combines the existing WRITE/UNDERSTAND/LOOKUP retention targets with Red/Yellow/Green decision-ownership bands. Red keeps requirements, data integrity, authorization, concurrency, security and architecture decisions learner-owned; Yellow requires enough manual practice to understand a mechanism before `DESIGN_THEN_AI`; Green permits delegation with bounded verification. `DESIGN_THEN_AI` now requires a concise implementation brief and risk-weighted review of the critical paths. This changes learning workflow only; it creates no product scope or mandatory topic catalogue.
