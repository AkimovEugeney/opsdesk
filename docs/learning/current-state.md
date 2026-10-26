# Current learning state

Last reconciled: 2026-10-26. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- OPS-003, 007, 009, 010, 012, 013, 014 and [015](../../work/tickets/OPS-015.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-016](../../work/tickets/OPS-016.md) is Deferred: learner explicitly prefers backend work for now; implementation not started.
- [OPS-017](../../work/tickets/OPS-017.md) is In Progress: API implementation and review fixes. Learner estimate 3–4 h; actual time unknown. Review and validation details belong to the ticket.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite (existing service tests and one-off real HTTP evidence for OPS-014/015); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-26): discussed caller-scoped appeal lookup, method grouping/splitting and async/await on current code. Learner applied async cleanup with guidance; review found no functional defect, API build and 10 existing service tests passed. No independent mastery or real HTTP/persistence validation claimed. Next validate OPS-017 publish/read behavior, then required independent review. Frontend OPS-016/011 stays deferred. Intermediate checkpoint b21567a and prior OPS-015 commit 247a699 were pushed on 2026-10-24. New cleanup checkpoint commit/push requested on 2026-10-26. OPS-017 actuals unknown.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Resume OPS-017 behavior validation: POST/GET access, input boundaries, neutral 404, ordering/empty history, author attribution and persistence/existing data; then required independent review. The saved discussion was covered on request on 2026-10-26; do not restart it or issue a quiz automatically. Frontend OPS-016 and OPS-011 stay deferred until the learner chooses to resume them.

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
