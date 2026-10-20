# Current learning state

Last reconciled: 2026-10-19. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- No ticket is in progress. OPS-003, 007, 009, 010, 012 and 013 are Done (direct/local delivery); details, validation and open follow-ups are in their tickets under `work/tickets/`.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no HTTP-level automated tests (one service test file); `GET /appeals` and `GET /appeals/:id` are public; the web client is a static page.
- Stopped at (2026-10-20): OPS-014 is Ready, no code written. The learner chose default-deny, received the guard walkthrough and is deciding the design. Next: the learner reports an estimate and a short proposal (what changes, how public routes are marked, where role is checked, how it will be verified), then Design Review. Then OPS-015 (draft). Working-model fixes made after learner feedback are in `hint-policy.md`. Week 2026-10-19: 12 h.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` has one observed protected-write application and is not yet broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Connect a small React view to the verified API (mentor preliminary range: 4–6 h; estimate belongs to the learner at refinement).

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.