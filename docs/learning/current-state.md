# Current learning state

Last reconciled: 2026-09-28. This is a pointer, not a second ledger or requirements log.

## Active work

- Ticket: [OPS-008](../../work/tickets/OPS-008.md) — static active-appeals frontend foundation; status **Done — direct/local delivery recorded**.
- OPS-003 remains Done — direct/local delivery through existing commit `3e0cafb`; no new Git operation is requested.
- OPS-007 remains Done — direct/local delivery; its `node:test` matrix passed 5/5 and API build passed.
- Routine frontend foundation: `apps/web` is a Next.js TypeScript App Router project. Build/lint passed; the local page rendered the static Russian title and empty state. The existing dev server on port 3001 belongs to a separate process and was not stopped.
- Learning evidence: learner independently identified that `useState` is for changing local state; the `react-state-hooks` application is recorded and status remains `PRACTICING`.
- Delivery: learner reported 10 min actual; direct/local route without Git operations. The learner separately attributed 30 min to Codex routine setup, excluded from learner capacity actual.
- Next action: choose and refine a backend-focused product slice. When frontend is involved, select a concrete middle-level engineering concern (data flow, async lifecycle, browser boundary, performance/accessibility or debugging), not static markup; resolve CORS and session/auth boundaries rather than inventing client identity.

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