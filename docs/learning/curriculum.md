# Curriculum — 16-week adaptive framework

This is a framework, not a final syllabus. Sprint 0 defines the starting level. After diagnosis, update the focus, ordering and depth of each week from evidence in `skills-matrix.md`.

## Learning focus

Use this approximate learning-time balance across several tickets, not as a quota within every ticket:

- 60–70% backend, databases, architecture, HTTP, concurrency and system reasoning;
- 20–30% engineering frontend;
- 10% integration, debugging and infrastructure.

Choose proportions that total 100%, for example 65/25/10. Count work by its primary learning focus rather than counting the same time twice.

Every new topic follows problem → transferable engineering principle → implementation in NestJS/React/PostgreSQL. The user thinks first and writes the key code for new or weak skills; AI delegation expands as skills are demonstrated in `skills-matrix.md`.

## Engineering frontend inside project tickets

Restore the fundamentals through relevant fullstack features, rather than a separate frontend course:

- **JavaScript/TypeScript:** scope, closures, event loop, promises, async/await, references, mutation/immutability, prototypes/classes, generics and narrowing.
- **React mental model:** render cycle, state, props, effects, refs, controlled/uncontrolled inputs, memoization, lifting state and derived state.
- **Data flow:** data sources, ownership, storage and who can change data; server state versus client state.
- **HTTP/browser basics:** request/response, cookies, headers, CORS and caching.
- **Async behavior:** loading, errors, retries, race conditions and cancellation.
- **Performance:** avoidable renders, expensive computations and network bottlenecks.
- **Frontend architecture:** component boundaries, hooks/services, dependency direction and separation of concerns.
- **Debugging:** React DevTools, Network, Sources and tracing data flow.

These are selection guides, not a checklist for one ticket: preserve one primary and at most one secondary new concept. For a relevant integration slice, the user designs the API, connects the request manually, reasons about state and loading/errors, inspects rendering and Network, and explains the database-to-UI path. Spread unfamiliar parts over tickets as needed.

Layout, SCSS, Tailwind, decorative UI and UI-library details receive attention only when the product task needs them.

SQL, design, architecture and coding without AI stay inside OpsDesk tickets; no separate exercise track is added. The only additional practice outside the project is a small reading of good unfamiliar open-source code once every 1–2 weeks, focused on understanding an unfamiliar system.

## Adaptive schedule

| Week | Focus after diagnosis | Planned outcome | Evidence |
|---|---|---|---|
| 1 | Sprint 0 and programme adaptation | Diagnostic completed and evidence recorded | OPS-000 |
| 2 | SQL foundations and NestJS request path | Independently build and query one small vertical backend slice | SQL and NestJS marked NEW in OPS-000 |
| 3 | React integration with the backend slice | Use typed HTTP state and error handling in a small screen | React and TypeScript marked PRACTICING in OPS-000 |
| 4 | To be determined | — | — |
| 5 | To be determined | — | — |
| 6 | To be determined | — | — |
| 7 | To be determined | — | — |
| 8 | To be determined | — | — |
| 9 | To be determined | — | — |
| 10 | To be determined | — | — |
| 11 | To be determined | — | — |
| 12 | To be determined | — | — |
| 13 | To be determined | — | — |
| 14 | To be determined | — | — |
| 15 | To be determined | — | — |
| 16 | To be determined | — | — |

Do not turn this framework into detailed weekly tasks before Sprint 0 is reviewed.
