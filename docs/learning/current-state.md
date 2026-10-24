# Current learning state

Last reconciled: 2026-10-24. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- OPS-003, 007, 009, 010, 012, 013, 014 and [015](../../work/tickets/OPS-015.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-016](../../work/tickets/OPS-016.md) is Deferred: learner explicitly prefers backend work for now; implementation not started.
- [OPS-017](../../work/tickets/OPS-017.md) is In Progress: API implementation and review fixes. Learner estimate 3–4 h; actual time unknown. Review and validation details belong to the ticket.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite (existing service tests and one-off real HTTP evidence for OPS-014/015); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-24): OPS-017 GET review fixes and API behavior validation remain. Learner requested later discussion of access lookup, method ordering/splitting and async/await across all three layers; topics are saved in the ticket, no automatic lesson. Frontend OPS-016/011 stays deferred. OPS-015 committed as 247a699, push not requested. Week capacity 12 h, approximately 7.5 h previously recorded; OPS-017 actuals unknown.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Resume OPS-017 from the intermediate checkpoint requested on 2026-10-24: GET fixes are present by inspection; next validate publish/read behavior, then complete required review. Deferred discussion topics remain in the ticket until requested. Frontend OPS-016 and OPS-011 stay deferred until the learner chooses to resume them.

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
