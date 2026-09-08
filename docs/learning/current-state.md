# Current learning state

Last checked: 2026-09-08. This snapshot points to recorded evidence; it does not replace ticket status or skill assessment.

- Active work: [OPS-005](../../work/tickets/OPS-005.md) implementation and validation are committed as `8b7a6eb`; actual time is 30 min including teaching, implementation, validation and review, and closure needs only a brief understanding check. [OPS-004](../../work/tickets/OPS-004.md) / SCRUM-7 is Done: implementation, reported acceptance/build checks, same-session review, focused commit and merge to `master`; actual time 15 min against a 10 min estimate. [OPS-003](../../work/tickets/OPS-003.md) / Jira SCRUM-6 remains blocked; auth foundation is deferred pending readiness.
- Target and route: [middle fullstack capability map](target-profile.md#observable-capability-map) → [adaptive stages](curriculum.md#adaptive-route-to-the-target). Current learning stage: `read_foundations`; diagnosis completed, two read outcomes recorded. Write flows, access and fullstack integration remain ahead, selected by prerequisites rather than calendar weeks.
- Current phase: Sprint 1 active; OPS-002 / Jira SCRUM-5 is recorded merged and Done. Select a manageable next learning slice using readiness; do not automatically start the auth prerequisite bundle.
- Active primary/secondary skill and AI/SQL mode: literal case-insensitive SQL text matching; SELECT/filter behavior as consolidation. LEARN_MANUAL / SQL_REQUIRED.
- Process skills: refinement, planning, self-review, PR response, incident debugging and retro are `UNKNOWN`; use their `.skills/` guides explicitly until evidence accumulates.
- Operational tooling: Jira checked 2026-09-08: SCRUM-5 and SCRUM-7 are Done. SCRUM-6 is in the active sprint with workflow status To Do. Its stale description was synchronized with agreed OPS-003 requirements and a blocked label was added; no workflow transition was performed. SCRUM-4 is an empty subtask with no established learning scope and is not selected. SCRUM-8 was created under a superseded workflow then moved to backlog; short tickets now remain repository-local. Local Git and the API build CI are available.
- Latest closed iteration: [2026-08-12 — 2026-08-18](../../work/sprints/2026-08-12-sprint-0.md). Actuals, review and retro are recorded; capacity was 3.25 h against the 8–12 h plan, with no cause recorded for unused capacity.
- Active iteration: [2026-09-07 — 2026-09-13](../../work/sprints/2026-09-07-sprint-1.md), available capacity 3–6 h; prerequisite and SCRUM-6 are not yet estimated.

## Recent evidence

- [OPS-000](../../work/tickets/OPS-000.md): recorded Done; diagnosis completed, actual 0.75 h.
- [OPS-001](../../work/tickets/OPS-001.md): recorded Done; `GET /appeals`, actual 2.5 h. Traced Controller → Service → Repository → database and explained `LEFT JOIN`.
- [Skills matrix](skills-matrix.md): NestJS and SQL are `PRACTICING`; HTTP, browser, transactions and indexes remain `UNKNOWN`.
- [Local learning ledger](learning-state.json) preserves the OPS-000 baseline and later evidence. [Operating rules](skills-matrix.md#operating-the-local-learning-ledger) describe automatic counts and optional practice opportunities. Basic layer definitions are parked; Prisma API spelling is lookup-only. Dates and counters are read from the tool rather than duplicated here.
- [Learning log](learning-log.md): OPS-001/002 records and supplied dialogue evidence reconciled without inventing independent mastery or original dates. Learner requests teaching before unfamiliar code and selective spaced practice.

## Gaps to reconcile

- OPS-001 has no pre-work estimate; do not reconstruct one. Its branch and PR fields remain placeholders, and review independence is not separately evidenced in the ticket.
- OPS-002 actual time and PR link remain unrecorded; broad skill statuses do not establish recall of individual concepts.
- The reason for unused capacity in Sprint 0 is not recorded; it does not affect the current plan.

Next action: close [OPS-005](../../work/tickets/OPS-005.md) with a brief understanding check; actual time is recorded as 30 min including teaching, implementation, validation and review. Then refine the authentication/current-user prerequisite for [OPS-003](../../work/tickets/OPS-003.md): all currently grounded small read slices are complete, while further write/access flows need a trusted identity source. Do not invent its identity mechanism, credential storage or token/session contract: this is a material security and data-model decision with no accepted source. Ask one focused question only if the learner has not already selected an identity source. Short just-in-time tickets stay in repository records: SCRUM-8, created under the earlier workflow, was moved to Jira backlog and is not required for this work. Direct commits on `master` apply; separate branch, PR and merge steps do not. Do not give an opening quiz or repeat Pipe/layer questions. Routine command runs are Codex AI_ROUTINE when environment access permits; learner defines new behavior cases and investigates unexpected output. OPS-003 remains blocked; no ADMIN/JWT product-model decision is recorded as accepted.

System Health Review: completed 2026-09-07 after repeated process friction. Guidance, confirmation and review rules were made proportional to task impact in [learning contract](learning-contract.md), [hint policy](hint-policy.md), [task manager](task-manager.md) and [code review](../team/code-review.md).

System Health Review: completed 2026-09-08 after learner feedback and two supplied dialogues, then refined to connect the middle target, adaptive route and executable learning ledger. The latest clarification replaces opening recall with task-first, optional, naturally observed practice. Decisions are in the [learning log](learning-log.md#accepted-system-changes--2026-09-08). Verify their effect through actual sessions rather than declaring teaching quality solved by documentation alone.
