# Current learning state

Last reconciled: 2026-09-27. This is a pointer, not a second ledger or requirements log.

## Active work

- Ticket: [OPS-003](../../work/tickets/OPS-003.md) / SCRUM-6 — protected assignment of an appeal owner; status **Ready for delivery — acceptance, review and understanding complete**.
- Code present: permission enum/list and migration, trusted current-user permissions, `PATCH /appeals/:id/owner`, authorization, assignee checks and conditional persistence update are in `eb5c86e`.
- Build verified now: `apps/api` `npm run build` passes.
- Verified HTTP matrix: allowed assignment `200` with persisted `IN_PROGRESS`/owner; client `403`; missing session `401`; malformed id `400`; already closed appeal `409`. Temporary local data, sessions and permission were removed after the run.
- Historical defect: the source now catches only conditional-update `P2025` and rethrows other errors. The exact race branch is still not reproducible over HTTP because an already closed appeal is rejected by the earlier state check.
- Learner predicted the core matrix correctly; authorization has one observed application, not broad mastery.
- Verified remaining matrix: missing appeal `404`, missing owner `404`, selected client as owner `400`; rejected requests left the fixture appeal `NEW` without owner. Cleanup was verified.
- Independent review is approved with no blocking findings. A deterministic `P2025` service test is a non-blocking candidate for the planned testing slice; probe-file hygiene stays a separate delivery decision.
- Understanding check passed: the learner distinguished state conflict from unexpected server failure and explained why other database errors must propagate.
- Next action: make an explicit delivery decision; no staging, commit or history change is authorized yet. Do not redo migration, permissions or endpoint scaffolding.

## Learning evidence

- Current stage: `identity_access`; OPS-006 provides authenticated current-user context and OPS-003 is the first protected write. Stage means current work, not mastery.
- `authentication` has learner-owned prediction evidence from OPS-006; `authorization` remains unconfirmed until the learner explains/applies the protected-write invariant and behavior is observed.
- The ledger in [learning-state.json](learning-state.json) is the sole source for concrete learning evidence, retention and dates. Existing SQL and read-flow evidence remains preserved.

## Near route — planning signals, not commitments

1. Finish and verify OPS-003 (remaining estimate unknown; retain original learner estimate of 3–4 h).
2. Add the first repeatable tests for allowed assignment, denial and conflict (mentor preliminary range: 3–5 h; estimate belongs to the learner at refinement).
3. Connect a small React view to the verified API (mentor preliminary range: 4–6 h; estimate belongs to the learner at refinement).

## Source map and history

- Current requirements, decisions, validation and remaining defects: [OPS-003](../../work/tickets/OPS-003.md) and its [requirements log](../../work/tickets/OPS-003-requirements-log.md).
- Sprint/capacity are planning and time records: [Sprint 3](../../work/sprints/2026-09-28-sprint-3.md), [capacity plan](capacity-plan.md). No missing actual time is reconstructed.
- Historical sprint, learning-log and session-audit entries are retained as history; they do not set active status.