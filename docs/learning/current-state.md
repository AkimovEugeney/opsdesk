# Current learning state

Last reconciled: 2026-10-22. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- No ticket is in progress. OPS-003, 007, 009, 010, 012, 013, 014 and [015](../../work/tickets/OPS-015.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite (existing service tests and one-off real HTTP evidence for OPS-014/015); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-22): OPS-015 accepted Done: build, 149/149 read HTTP cases, 10/10 service tests and independent review pass. Customer ownership and role-dependent reads work in tested cases; operator escaping fixed by Codex at learner request, shared neutral 404 accepted. Temporary database/listener cleaned, working data untouched. Actual approximately 1.5 h versus pre-work 2–3 h. Week capacity 12 h, approximately 7.5 h recorded total. Learner authorized committing all OPS-015 implementation/records as one feature commit; push not requested. OPS-014/docs already pushed (2dbd7b3, 2d314c2). Next refine the next product slice; do not silently start deferred OPS-011.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Connect a small React view to the verified API (mentor preliminary range: 4–6 h; estimate belongs to the learner at refinement).

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
