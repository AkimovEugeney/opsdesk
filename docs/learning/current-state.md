# Current learning state

Last reconciled: 2026-10-26. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- OPS-003, 007, 009, 010, 012, 013, 014, [015](../../work/tickets/OPS-015.md) and [017](../../work/tickets/OPS-017.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-016](../../work/tickets/OPS-016.md) is Deferred: learner explicitly prefers backend work for now; implementation not started.
- [OPS-018](../../work/tickets/OPS-018.md) is Ready: management-authorized operator workload summary, API-only. Learner estimate and short design proposal pending; implementation not started. See its requirements log for current PO policy.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite integrated into CI (existing service tests and bounded HTTP evidence/harness for OPS-014/015/017); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-26): OPS-017 delivered via 3e31591 and authorized lockfile repair 0f7b0e3, pushed to origin/master. GitHub CI run 40341471768 succeeded; independent review has no open BLOCKER. Actual time 4 h. Evidence/limits are in the ticket; no independent mastery inferred. Learner requested the next task: OPS-018 is issued, estimate/design pending. No OPS-018 implementation authorized. Future source/test/config changes by Codex require explicit permission. OPS-016/011 stay deferred.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Continue OPS-018 from the learner's initiative: estimate, product questions or design proposal. Review the permission/public-contract proposal before implementation; give no prepared technical solution. No automatic quiz or repeated async/access/validation lesson. OPS-016/011 remain deferred.

## Source map and history

- Current requirements and decisions: [OPS-018](../../work/tickets/OPS-018.md) and its [requirements log](../../work/tickets/OPS-018-requirements-log.md). Completed-task evidence remains in each ticket.
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
