# Current learning state

Last reconciled: 2026-09-30. This is a pointer, not a second ledger or requirements log.

## Active work

- OPS-009 is Done — local DTO validation for protected owner assignment; learner actual 20 min; direct/local delivery without Git operations.
- OPS-003 remains Done — direct/local delivery through existing commit `3e0cafb`; no new Git operation is requested.
- OPS-007 remains Done — direct/local delivery; its `node:test` matrix passed 5/5 and API build passed.
- Routine frontend foundation: `apps/web` is a Next.js TypeScript App Router project. Build/lint passed; the local page rendered the static Russian title and empty state. The existing dev server on port 3001 belongs to a separate process and was not stopped.
- Learning evidence: learner independently identified that `useState` is for changing local state; the `react-state-hooks` application is recorded and status remains `PRACTICING`.
- Routine setup: `class-validator` and `class-transformer` installed. Local `ValidationPipe` behavior was verified by HTTP smoke checks; build and 5 existing service tests passed. `npm install` reported 6 high-severity audit findings; no audit fix was run.
- OPS-010 is validated and awaiting only its learning/completion records: service tests 10/10, build passed, authenticated runtime matrix covered `401`, `403`, `404`, `409`, `200` and the DTO `400` cases; temporary database data restored; learner actual 1 h recorded.
- [OPS-011](../../work/tickets/OPS-011.md) — show the active appeals queue in the web client. Deferred at refinement 2026-10-03: the learner rejected an anonymous first screen because the product's screens are authenticated; resumed once an authorization screen exists. Its fetch-boundary question stays open.
- Direction: deepen backend work, then return to the frontend in roughly four learner sessions. Backend gaps grounded in the code: no session termination anywhere (`logout`/`clearCookie` absent), no `POST /appeals` so the `CLIENT` role has no product action, and only one test file (`apps/api/test/appeals.service.test.ts`) with no HTTP-level coverage.
- OPS-012 is Done — direct/local delivery. Logout implemented, verified at runtime (`204` with an expired cookie, `401` on reuse of `GET /auth/me`, `PATCH /appeals/:id/close` and `PATCH /appeals/:id/owner`, other sessions untouched, and `500` without a cookie header when the store was unreachable), independently reviewed with PASS and the understanding check passed; learner actual 30 min. Open without blocking: no durable automated coverage, and the expired-row variant of the ended-session case.
- Active ticket: [OPS-013](../../work/tickets/OPS-013.md) — create an appeal as a client. Implemented ahead of refinement (15 min reported; fix and verification time unrecorded). All four divergences are fixed and every acceptance criterion is observed: `401`, `403` with no row created, `201` under the session author, body-supplied `clientId`/`ownerId`/`status` ignored, response projection clean, trimming applied. Independent review is in flight.
- Next session task: record the OPS-013 review verdict and close the ticket, then confirm the next iteration's capacity before starting new work.

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