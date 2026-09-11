# Skills matrix

| Skill | Status | Evidence / next step |
|---|---|---|
| JavaScript | NEW | Understands the basic closure model after guided explanation; practice async execution order. |
| TypeScript | PRACTICING | Wrote null-safe function with optional chaining and narrowing. |
| React | PRACTICING | Implemented `useState`; explained functional updates and the unconditional hook rule after guidance. |
| browser | UNKNOWN | — |
| HTTP | UNKNOWN | — |
| Node.js | NEW | Identified unhandled rejected Promise and selected `try/catch`; practice event-loop ordering. |
| NestJS | PRACTICING | Implemented read flows in OPS-001/002. Basic layer responsibilities are familiar and parked below; this does not establish guards, DI internals or auth knowledge. |
| SQL | PRACTICING | Wrote an active-appeals query with two joins, status filtering and custom `CASE` ordering for OPS-001; explained `LEFT JOIN` behaviour. |
| PostgreSQL | UNKNOWN | — |
| indexes | UNKNOWN | — |
| transactions | UNKNOWN | — |
| testing | UNKNOWN | — |
| architecture | UNKNOWN | — |
| Git | UNKNOWN | Commit-message practice starts in `LEARN_MANUAL`; propose messages and explain commit boundaries before requesting review. |
| ticket refinement | UNKNOWN | Follow `.skills/ticket-refinement`; identify ambiguity, dependencies and risks before estimating. |
| sprint planning | UNKNOWN | Follow `.skills/sprint-planning`; plan against real capacity and one Sprint Goal. |
| implementation review | UNKNOWN | Follow `.skills/implementation-review`; lead self-review before Codex findings. |
| PR review response | UNKNOWN | Follow `.skills/pr-review`; understand, answer and resolve or challenge review comments. |
| debugging / incident | UNKNOWN | Follow `.skills/debugging-incident`; collect evidence and test hypotheses before fixing. |
| sprint retrospective | UNKNOWN | Follow `.skills/sprint-retro`; explain planned versus actual and select a process improvement. |
| Docker | UNKNOWN | — |
| CI/CD | UNKNOWN | Read the failing step and error, form a hypothesis and localize the cause before fixing. |

Statuses: `UNKNOWN`, `NEW`, `PRACTICING`, `CONFIRMED`, `ROUTINE`.

## Status and delegation rules

Apply these to the most specific recorded scope; broad rows above summarize a domain and must not override a concept's evidence or parked schedule. Retention targets describe what to retain; status describes demonstrated proficiency, not whether a question is due.

- `UNKNOWN` or `NEW` → `LEARN_MANUAL`.
- `PRACTICING` → `LEARN_MANUAL` or `MANUAL_FOCUS`.
- `CONFIRMED` → `DESIGN_THEN_AI`.
- `ROUTINE` → `AI_ROUTINE`.

A concrete concept becomes `CONFIRMED` through repeated independent application on different days/conditions, with evidence appropriate to WRITE or UNDERSTAND as described below. Correct learner-owned code and observed behavior can supply that evidence without a separate verbal test. A broad domain needs coverage of its relevant capabilities, including debugging/error handling, before its summary status changes. Do not upgrade all of NestJS from one confirmed concept. Record assistance honestly; employment, elapsed time and unexplained AI-generated code do not establish confirmation.

## Retention targets

Track three independent things: what capability is worth retaining (target), what the learner has demonstrated (status/evidence), and whether another recall is useful (schedule). Fundamental does not mean unfamiliar; familiar does not mean every related skill is confirmed.

| Target | Use when | Evidence and allowed assistance |
|---|---|---|
| WRITE | A compact, frequent foundation whose construction develops reasoning: a basic SELECT/WHERE/JOIN or null-handling decision. | Independently construct or change the key logic on different data, predict behavior and check it. No ready solution; syntax-only reference is allowed and noted. Do not require boilerplate or exact API spelling from memory. |
| UNDERSTAND | The mechanism, contract or trade-off matters more than reproducing its implementation. | Explain a concrete outcome, trace values, choose between alternatives or find an error. No mandatory code retyping or definition recital. |
| LOOKUP | Exact API options, generic spelling, CLI flags, setup steps or rare/version-sensitive syntax. | Find the relevant official reference when needed, apply it and verify behavior. No scheduled memorization and no penalty for looking it up. |

Choose a target from frequency, transfer to other tools and the cost of misunderstanding, and record a short reason. Split a topic when necessary: Prisma's result contract is UNDERSTAND, its invocation syntax is LOOKUP, and the SQL inside a query can be WRITE. Targets can change from evidence or learner needs; do not build a complete taxonomy of the stack in advance.

`AI_ROUTINE` remains a work-allocation mode, not a fourth memory level. Mechanical, non-learning work can be delegated under the agreed split. LOOKUP does not authorize delegating business rules, data modelling or unfamiliar reasoning. Conversely, hand-writing a whole library integration is not required just to understand its contract.

## Decision ownership and AI delegation

Retention target answers what must remain available in the learner's mind; decision ownership answers who must reason about the change before code is generated. Apply both per bounded part of a ticket, not as a permanent label for an entire technology.

| Band | Learner responsibility | Typical examples | Appropriate AI use |
|---|---|---|---|
| Red — engineer-owned | Make the first proposal and, while learning, implement the key logic. Explain the invariant, trade-off and failure path. | Requirements, architecture boundaries, domain/business rules, API contract, schema/constraints/indexes, SQL semantics, transactions, concurrency/idempotency, auth/authz/ownership, security threats, destructive migrations and external side effects. | Teach, challenge assumptions, review, test and propose alternatives. Do not silently decide the unresolved part. |
| Yellow — learn mechanism, then delegate | Learn the lifecycle/contract and write or modify it enough times to demonstrate independent use. Retain why it is needed and how to verify it, not decorator or library spelling. | Nest controller/DTO/pipe/guard/interceptor/filter/module, ORM usage, test shape, Docker/CI basics, React forms/data fetching and request-state wiring. | After evidence is sufficient, use DESIGN_THEN_AI for implementation from the learner's brief; review the changed behavior and integration points. |
| Green — delegate and verify | State the intended output and inspect only the relevant contract/diff. Learn a detail only when it becomes a blocker or exposes a misconception. | Repetitive CRUD shells, mappings/types, Swagger annotations, fixtures/mock data, formatting/imports/renames, CSS, routine configuration and rare framework syntax. | AI_ROUTINE or a bounded DESIGN_THEN_AI request. Do not treat generated output as correct without running the agreed checks. |

Red does not require memorizing syntax or refusing tools. A learner may use documentation for a database API while still independently deciding that a unique constraint, transaction or authorization check is necessary. Yellow may become Green only for the demonstrated local mechanism; a new security, data-integrity or business decision remains Red.

### AI handoff and review loop

For `DESIGN_THEN_AI`, use separate passes: (1) learner supplies the implementation brief, (2) Codex identifies ambiguities/risks and implements only after they are resolved, (3) learner compares the diff and behavior to the brief, and (4) Codex may perform an adversarial review and test-design pass. The implementation brief states: context; requested behavior; inputs/outputs; invariants and authorization/data boundaries; error and edge cases; prohibited changes; and observable Definition of Done.

Review generated code by risk, not line count. Always inspect the paths that read or mutate protected data, enforce authorization, cross a trust boundary, run concurrently, call an external system, handle failure/retry, or can disclose sensitive data. Verify happy path plus the relevant denied/invalid/not-found/duplicate/race/dependency-failure cases. The learner accepts the final solution only when they can explain why its critical choices are correct and where they would investigate a failure.

## Recorded concepts and practice history

[learning-state.json](learning-state.json) is the single machine-readable source for concrete concepts, baseline evidence, practice events, repeat counts, optional review dates and parked state. The domain table above is an orientation summary, not a second schedule. [learning-log.md](learning-log.md) preserves the original diagnosis and meaningful narrative outcomes. Do not copy mutable dates/counters into tickets or a second table.

Each concept has a stable ID, capability links to target-profile.md, WRITE/UNDERSTAND/LOOKUP target, baseline evidence/status and retention preference. Each observed event records its date, context, evidence source, assistance/result and unique ID. The local tool derives current status, application counts, independent days, successful days since the last gap and next opportunity from these events. Historical repetition counts absent from the source stay unknown; they are not zero and must not be reconstructed.

The OPS-000 baseline is retained for closures, async ordering, TypeScript narrowing, React state/hooks, async errors and SQL. OPS-001/002 and the supplied dialogues extend it. Basic layer definitions are parked at learner request; raw result shape, nullish defaults and basic SQL remain practice candidates. Unintroduced topics have no recall date. LOOKUP never has a recall schedule.

## Task-first retention

- Silently load state at session start. A greeting, continuation or request for new work never triggers a compulsory opening quiz or reading out the overdue queue. Resume the task or introduce its next useful step first. Due dates are planning signals, not prerequisites for working.
- Use the task itself as the default repetition. If the learner independently writes a guard in a later feature and relevant review/validation shows it works, record that practice without asking them to announce a repeat or explain the same definition. Merely seeing a guard file, copied code or silence about confusion is insufficient evidence of independent work.
- Use changed conditions in actual implementation, reasoning or debugging as active recall. Do not manufacture another question when the observed work already demonstrates the target.
- If an important concept has not appeared naturally, offer one brief optional recap at a natural pause or session end. The learner can choose a topic, say they remember it, postpone or decline. Record a deferral/self-report without claiming demonstrated mastery or presenting the same offer again that session. If no date is stated, use an internal seven-day deferral; if they name a task boundary, record that context and wait for it. No automatic exercise follows the offer without agreement.
- Optional recall usually takes 2–5 minutes total and at most two concepts. It does not silently replace the planned session. Explicit requests for a longer recap are allowed; an actual blocker in the current task gets focused teaching when encountered.
- First understanding makes a concept eligible after one day; independent practice then spaces opportunities by 3, 7 and 21 days. Dates can be deferred. Three successful independent days across at least two materially different contexts settle the narrow target and park it automatically. Natural applications count toward this threshold; scheduled quizzes are not required. Do not insist on completing all calendar intervals if practice already supplies the evidence.
- Multiple actions or explanations on one day are recorded when distinct but advance the repetition stage at most once. Guided application on the teaching day is learning evidence, not delayed recall. Conceptual help resets that concept's successful streak and suggests another opportunity after a day; syntax-only lookup does not invalidate independent reasoning.
- A parked concept is assumed usable for ordinary work, without repeated proof requests. Reopen only for an observed gap or learner request; a new mechanism gets its own entry. Parking at learner request is distinct from demonstrated confirmation. Neither confirms an entire domain.
- Missed sessions create no debt or catch-up exam. Record future opportunities from actual activity; review repeated deferrals privately when choosing useful product work, not by forcing a quiz. LOOKUP or mechanical routine may reveal a misconception worth a separate concept, but is never itself drilled.

## Operating the local learning ledger

Codex runs these commands from the repository root; the learner does not maintain counters or dates. This is local file tooling, not a background scheduler or a feature of the OpsDesk product.

- On greeting/resume/new work: `python3 scripts/learning.py status --intent continue` (use `hello` or `new` to match intent). Pass `--today YYYY-MM-DD` when using the known session date, and optional repeated `--concept CONCEPT_ID` for skills relevant to the task. Output is internal planning context; `opening_quiz` is always false.
- At a requested recap or natural end-of-session review: use `--intent recall` or `--intent review`. Review opportunities remain optional unless the learner requested recall. The tool never sends questions or notifications.
- After a material observed learning episode: `python3 scripts/learning.py record --id OBSERVATION_ID --concept CONCEPT_ID --kind independent --on YYYY-MM-DD --context TICKET_OR_CHANGED_SCENARIO --source EVIDENCE_REFERENCE --note EVIDENCE_SUMMARY --verified`. Only use independent plus verified when the learner-owned reasoning/code and relevant behavior have actually been observed. Otherwise use introduced, assisted or gap.
- For a learner deferral or confidence statement: use kind defer or self_report and `--until YYYY-MM-DD`; include any requested task boundary in the note. A self-report changes pacing, not mastery. Use park for an explicit request to stop repeating; use reopen only with a source showing why.
- Reuse the same event ID when retrying a write. One observed episode gets one ID; reviewing the same diff or rereading the same answer is not another event. Exact retries do not increment counters; conflicting reuse is rejected. Log meaningful independent practice even before a due date. Do not write an event for every line of code or successful shell command.
- When encountering a genuinely new concept, add its bounded entry to learning-state.json with target, capability link, source and baseline UNKNOWN/unintroduced, then validate. Do not prepopulate a six-month flashcard catalogue. On an evidenced stage change, update current_stage and append a sourced milestone, then update the short current-state pointer. These judgments remain the mentor's responsibility.
- Validate after structural edits with `python3 scripts/learning.py validate`. Status is read-only; record writes atomically with a local file lock. Never repair invalid history by silently resetting the ledger.

The tool computes bookkeeping; Codex remains responsible for interpreting actual work, teaching, selecting useful tasks and respecting learner intent. Automatic state loading is an instruction to the agent, not a guarantee that software can independently judge mastery.
