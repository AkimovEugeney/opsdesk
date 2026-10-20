# Skills matrix

| Skill | Status | Evidence / next step |
|---|---|---|
| JavaScript | NEW | Understands the basic closure model after guided explanation; practice async execution order. |
| TypeScript | PRACTICING | Wrote null-safe function with optional chaining and narrowing. |
| React | PRACTICING | Implemented `useState`; explained functional updates and the unconditional hook rule after guidance. |
| browser | UNKNOWN | — |
| HTTP | UNKNOWN | Individual endpoint behavior may be verified without upgrading this broad row. |
| Node.js | NEW | Identified unhandled rejected Promise and selected `try/catch`; practice event-loop ordering. |
| NestJS | PRACTICING | Read flows and an auth/protected-write slice exist. OPS-009 added one assisted local DTO/ValidationPipe application with observed invalid-input behavior; OPS-012 added an assisted session-termination endpoint whose invalidation, cookie expiry, idempotent and failure paths were observed at runtime, plus the framework's response-ownership rule. This does not establish broad pipe, guard, DI or endpoint mastery. |
| SQL | PRACTICING | Wrote an active-appeals query with two joins, status filtering and custom `CASE` ordering for OPS-001; explained `LEFT JOIN` behaviour. OPS-005 added literal case-insensitive title matching with escaped `%` and `_` plus an optional filter; the learner explained both the escaping and the no-criterion path. |
| PostgreSQL | UNKNOWN | — |
| indexes | UNKNOWN | — |
| transactions | UNKNOWN | — |
| testing | UNKNOWN | — |
| architecture | UNKNOWN | — |
| Git | UNKNOWN | — |
| ticket refinement | UNKNOWN | Follow `.skills/ticket-refinement`; identify ambiguity, dependencies and risks before estimating. |
| sprint planning | UNKNOWN | Follow `.skills/sprint-planning`; plan against real capacity and one Sprint Goal. |
| implementation review | UNKNOWN | See `.skills/implementation-review`. |
| PR review response | UNKNOWN | Follow `.skills/pr-review`; understand, answer and resolve or challenge review comments. |
| debugging / incident | UNKNOWN | Follow `.skills/debugging-incident`; collect evidence and test hypotheses before fixing. |
| sprint retrospective | UNKNOWN | Follow `.skills/sprint-retro`; explain planned versus actual and select a process improvement. |
| Docker | UNKNOWN | — |
| CI/CD | UNKNOWN | Read the failing step and error, form a hypothesis and localize the cause before fixing. |

Statuses: `UNKNOWN`, `NEW`, `PRACTICING`, `CONFIRMED`, `ROUTINE`.

## Status and delegation rules

Apply these to the most specific recorded scope; broad rows above summarize a domain and must not override a concept's evidence or parked schedule. Retention targets describe what to retain; status describes demonstrated proficiency, not whether a question is due.

Status suggests a default support level and work split; it never forces a lesson or a check.

- `UNKNOWN` or `NEW` → learner writes, with help available on request; the task may be split or a short explanation offered if the topic blocks safe work.
- `PRACTICING` → learner writes; Codex reviews.
- `CONFIRMED` → `DESIGN_THEN_AI` is available when the learner chooses it.
- `ROUTINE` → `AI_ROUTINE`.

A concrete concept becomes `CONFIRMED` through repeated independent application on different days/conditions, with evidence appropriate to WRITE or UNDERSTAND as described below. Correct learner-owned code and observed behavior can supply that evidence without a separate verbal test. A broad domain needs coverage of its relevant capabilities, including debugging/error handling, before its summary status changes. Do not upgrade all of NestJS from one confirmed concept. Record assistance honestly; employment, elapsed time and unexplained AI-generated code do not establish confirmation.

## Retention targets

Track three independent things: what capability is worth retaining (target), what the learner has demonstrated (status/evidence), and whether another recall is useful (schedule). Fundamental does not mean unfamiliar; familiar does not mean every related skill is confirmed.

| Target | Use when | Evidence and allowed assistance |
|---|---|---|
| WRITE | A compact, frequent foundation whose construction develops reasoning: a basic SELECT/WHERE/JOIN or null-handling decision. | Independently construct or change the key logic on different data, predict behavior and check it. No ready solution; syntax-only reference is allowed and noted. Do not require boilerplate or exact API spelling from memory. |
| UNDERSTAND | The mechanism, contract or trade-off matters more than reproducing its implementation. | Explain a concrete outcome, trace values, choose between alternatives or find an error. No mandatory code retyping or definition recital. |
| LOOKUP | Exact API options, generic spelling, CLI flags, setup steps or rare/version-sensitive syntax. | Find the relevant official reference when needed, apply it and verify behavior. No scheduled memorization and no penalty for looking it up. |

Evidence categories stay separate: code exists, behavior observed, skill shown independently, skill applied with AI help. Choose a target from frequency, transfer to other tools and the cost of misunderstanding, and record a short reason. Split a topic when necessary: Prisma's result contract is UNDERSTAND, its invocation syntax is LOOKUP, and the SQL inside a query can be WRITE. Targets can change from evidence or learner needs; do not build a complete taxonomy of the stack in advance.

`AI_ROUTINE` remains a work-allocation mode, not a fourth memory level. Mechanical, non-learning work can be delegated under the agreed split. LOOKUP does not authorize delegating business rules, data modelling or unfamiliar reasoning. Conversely, hand-writing a whole library integration is not required just to understand its contract.

## Decision ownership and delegation

Applied per bounded part of a ticket, not per technology. Used for planning the work split, never as a reason to lecture.

| Band | Meaning | Examples | AI use |
|---|---|---|---|
| Red — engineer-owned | The learner decides and writes the key logic. Codex reviews, compares options on request and explains unfamiliar mechanisms. | Requirements, architecture boundaries, business rules, API contract, schema/constraints, SQL semantics, transactions, concurrency/idempotency, authentication/authorization, security, destructive migrations, external side effects. | Review and explanation only; implementation on explicit permission. |
| Yellow — learn, then delegate | The learner writes it until they have used it independently, then may delegate from a brief. | Nest controller/DTO/pipe/guard/module, ORM usage, test shape, Docker/CI basics, React forms and request-state wiring. | `DESIGN_THEN_AI` once the learner chooses it. |
| Green — delegate and verify | State the intended result and check the relevant diff. | Repetitive CRUD shells, mappings/types, fixtures, formatting, imports, renames, CSS, routine configuration. | `AI_ROUTINE`. |

Red never requires memorizing syntax. Yellow may become Green only for the demonstrated local mechanism; a new security, integrity or business decision stays Red. Generated code is reviewed by risk (data mutation, authorization, trust boundaries, concurrency, external calls, failure paths, sensitive data) and checked by running it; see `learning-contract.md` and `docs/learning/understanding-check.md`.

## Recorded concepts and practice history

[learning-state.json](learning-state.json) is the single machine-readable source for concrete concepts, baseline evidence, practice events, repeat counts, optional review dates and parked state. The domain table above is an orientation summary, not a second schedule. [learning-log.md](learning-log.md) preserves the original diagnosis and meaningful narrative outcomes. Do not copy mutable dates/counters into tickets or a second table.

Each concept has a stable ID, capability links to target-profile.md, WRITE/UNDERSTAND/LOOKUP target, baseline evidence/status and retention preference. Each observed event records its date, context, evidence source, assistance/result and unique ID. The local tool derives current status, application counts, independent days, successful days since the last gap and next opportunity from these events. Historical repetition counts absent from the source stay unknown; they are not zero and must not be reconstructed.

The OPS-000 baseline is retained for closures, async ordering, TypeScript narrowing, React state/hooks, async errors and SQL. OPS-001/002 and the supplied dialogues extend it. Basic layer definitions are parked at learner request; raw result shape, nullish defaults and basic SQL remain practice candidates. Unintroduced topics have no recall date. LOOKUP never has a recall schedule.

## Task-first retention

The ledger is passive bookkeeping. It never triggers questions, quizzes or recall blocks, and it never blocks work. A greeting, "continue" or a request for new work starts with the task, not a queue of due items.

- The task itself is the repetition. Independent use of a concept in later work, confirmed by behavior or review, is recorded without asking the learner to repeat or explain it.
- Log only a material new observation; skip repeats that add nothing. One observation, one event ID.
- A recap happens only when the learner asks. A deferral or confidence statement is recorded as pacing (`defer`/`self_report`, default seven days), not mastery, and honored without argument.
- Scheduling: first understanding makes a concept eligible after one day, then 3, 7 and 21 days; three independent days in at least two contexts park it automatically. Dates are planning hints only. Several events on one day advance the stage once; help received resets the independent streak.
- A parked concept is assumed usable. Reopen only for an observed gap or on request. Parking does not confirm a whole domain.
- Missed sessions create no debt or catch-up exam.

## Operating the local learning ledger

Codex runs these commands from the repository root; the learner does not maintain counters or dates. This is local file tooling, not a background scheduler or a feature of the OpsDesk product.

- On greeting/resume/new work: `python scripts/learning.py status --intent continue` (use `hello` or `new` to match intent; this Windows workspace uses `python`). Pass `--today YYYY-MM-DD` when using the known session date, and optional repeated `--concept CONCEPT_ID` for skills relevant to the task. Output is internal planning context; `opening_quiz` is always false.
- At a requested recap or natural end-of-session review: use `--intent recall` or `--intent review`. Review opportunities remain optional unless the learner requested recall. The tool never sends questions or notifications.
- After a material observed learning episode: `python scripts/learning.py record --id OBSERVATION_ID --concept CONCEPT_ID --kind independent --on YYYY-MM-DD --context TICKET_OR_CHANGED_SCENARIO --source EVIDENCE_REFERENCE --note EVIDENCE_SUMMARY --verified`. Only use independent plus verified when the learner-owned reasoning/code and relevant behavior have actually been observed. Otherwise use introduced, assisted or gap.
- For a learner deferral or confidence statement: use kind defer or self_report and `--until YYYY-MM-DD`; include any requested task boundary in the note. A self-report changes pacing, not mastery. Use park for an explicit request to stop repeating; use reopen only with a source showing why.
- Reuse the same event ID when retrying a write. One observed episode gets one ID; reviewing the same diff or rereading the same answer is not another event. Exact retries do not increment counters; conflicting reuse is rejected. Log meaningful independent practice even before a due date. Do not write an event for every line of code or successful shell command.
- When encountering a genuinely new concept, add its bounded entry to learning-state.json with target, capability link, source and baseline UNKNOWN/unintroduced, then validate. Do not prepopulate a six-month flashcard catalogue. On an evidenced stage change, update current_stage and append a sourced milestone, then update the short current-state pointer. These judgments remain the mentor's responsibility.
- Validate after structural edits with `python scripts/learning.py validate`. Status is read-only; record writes atomically with a local file lock. Never repair invalid history by silently resetting the ledger.

The tool computes bookkeeping; Codex remains responsible for interpreting actual work, teaching, selecting useful tasks and respecting learner intent. Automatic state loading is an instruction to the agent, not a guarantee that software can independently judge mastery.
