# Current learning state

Last reconciled: 2026-10-26. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- OPS-003, 007, 009, 010, 012, 013, 014 and [015](../../work/tickets/OPS-015.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-016](../../work/tickets/OPS-016.md) is Deferred: learner explicitly prefers backend work for now; implementation not started.
- [OPS-017](../../work/tickets/OPS-017.md) is In Progress: API implementation and review fixes. Learner estimate 3–4 h; actual time 4 h (learner self-report, 2026-10-26). Review and validation details belong to the ticket.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite (existing service tests and one-off real HTTP evidence for OPS-014/015); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-26): learner-selected validation fix passed 208 HTTP cases plus build/10 service tests. User-authorized independent read-only reviewer found no open BLOCKER and accepted current readability/design; required independent review gate is satisfied. One optional improvement concerns the Codex-authored search-test oracle. Learner removed explicit transform:false (default false); reviewer proved exact source difference and behavioral equivalence, reusing HTTP evidence with that stated limit. Review/risks/evidence are in OPS-017 and OPS-017-independent-review.md. No code or DB changes authorized in the review block; future code changes need explicit permission. Changes remain uncommitted over 13e482a; actual time 4 h (learner self-report, 2026-10-26). Next final DoD reconciliation. OPS-016/011 deferred; no independent-mastery claim.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Resume OPS-017 with remaining DoD reconciliation: independent review has passed, actual time is recorded as 4 h and delivery is uncommitted. Reuse reviewed source/equivalent-edit evidence; no automatic code fixes, commits or repeat review. Future code changes require explicit learner permission. Do not restart saved explanations or issue a quiz. Frontend OPS-016 and OPS-011 stay deferred until the learner chooses to resume them.

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
