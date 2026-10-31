# Current learning state

Last reconciled: 2026-10-31. This is a pointer, not a second ledger or requirements log.

## Working model

Since 2026-10-19 the format is Tech Lead + Code Reviewer (Supported Independence): tasks without a prepared solution, own design, Design Review for risky changes, Code Review, help on request. See [learning contract](learning-contract.md). Earlier ticket records keep their original wording as history.

## Active work

- OPS-003, 007, 009, 010, 012, 013, 014, [015](../../work/tickets/OPS-015.md) and [017](../../work/tickets/OPS-017.md) are Done (direct/local delivery); details, validation and follow-ups are in their tickets under `work/tickets/`.
- [OPS-016](../../work/tickets/OPS-016.md) is Deferred: learner explicitly prefers backend work for now; implementation not started.
- [OPS-018](../../work/tickets/OPS-018.md) is Done (2026-10-30): 10 service tests, 30 real HTTP/DB scenarios, independent review and CI for commit 658e5be passed. Actual time 3 h (estimate 4 h).
- [OPS-019](../../work/tickets/OPS-019.md) is In Progress: assisted CLIENT cursor implementation passed 65 isolated HTTP/DB checks, no-emit TypeScript and 10 existing service tests. OPERATOR pagination remains unimplemented. Estimate 3 h; actual unknown.
- [OPS-011](../../work/tickets/OPS-011.md) (active appeals queue in the web client) is Deferred by the learner until an authorization screen exists.
- Sprint 3 is Closed ([record](../../work/sprints/2026-09-28-sprint-3.md)). The current week is unplanned.
- Known gaps in the product: no maintained HTTP test suite integrated into CI (existing service tests and bounded HTTP evidence/harness for OPS-014/015/017); the web client is a static page and lacks an authorization screen.
- Stopped at (2026-10-31): learner requested save/commit/push and will return tomorrow. OPS-019 CLIENT verification passed; report in work/validation/OPS-019-client-http-validation.md. Learner then identified findAll readability and repeated cursor logic as the next concern. Resume by extracting CLIENT cursor parsing/validation and its type within appeals, preserving behavior; refactor not implemented yet. Then extend to OPERATOR and share only proven common encoding/page assembly, not a speculative app-wide pagination framework. Disposable DB/API/container removed; working DB untouched; OrbStack remains running. No new ticket or quiz. OPS-016/011 stay deferred.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` includes protected-write evidence and an assisted caller-scoped read episode from OPS-015, not broad mastery.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.
- OPS-018 introduced read transactions/Repeatable Read and row locks on learner request. Learner applied supplied transaction/mapping patterns with help. Actual read snapshot behavior is now observed by Codex's controlled DB test; independent mastery or observed concurrent close/row-lock skill is not claimed. Row annotation is corrected.

## Near route — planning signals, not commitments

1. Resume OPS-019 at the requested readability/refactoring discussion before OPERATOR pagination. CLIENT behavior already has bounded real HTTP/DB evidence; rerun affected checks after refactoring. Full review and completion remain pending; do not claim Done from the CLIENT checks.

## Source map and history

- Current requirements and decisions: [OPS-019](../../work/tickets/OPS-019.md) and its [requirements log](../../work/tickets/OPS-019-requirements-log.md). Completed-task evidence remains in each ticket.
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.
