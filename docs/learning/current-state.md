# Current learning state

Last reconciled: 2026-10-19. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- No ticket is in progress. OPS-003, 007, 009, 010, 012, 013 and 014 are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite (one service test file; OPS-014 now has one-off real HTTP evidence); caller-specific appeal visibility remains OPS-015; the web client is a static page.
- Stopped at (2026-10-21): OPS-014 accepted and delivered locally with learner-approved `feat: add global SessionGuard` on master; no push. [Independent final review](../../work/tickets/OPS-014-auth-review.md) has no BLOCKER; build, 10 service tests and 103 real HTTP checks pass. Approximately 6 h learner-reported actual; implementation assisted. Independent teaching/review-policy changes are excluded from the product commit and remain uncommitted. Next product work: refine OPS-015 (Draft, not started), customers see only their own appeals; learner owns estimate and design, with Design Review before access-boundary implementation. Docker remains running; temporary DBs/listeners removed. Teaching stays gradual. Week capacity 12 h, approximately 6 h recorded.

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
