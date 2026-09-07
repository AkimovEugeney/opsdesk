# Skills matrix

| Skill | Status | Evidence / next step |
|---|---|---|
| JavaScript | NEW | Understands the basic closure model after guided explanation; practice async execution order. |
| TypeScript | PRACTICING | Wrote null-safe function with optional chaining and narrowing. |
| React | PRACTICING | Implemented `useState`; explained functional updates and the unconditional hook rule after guidance. |
| browser | UNKNOWN | — |
| HTTP | UNKNOWN | — |
| Node.js | NEW | Identified unhandled rejected Promise and selected `try/catch`; practice event-loop ordering. |
| NestJS | PRACTICING | Implemented and traced `Controller → Service → Repository → PrismaService → PostgreSQL` for OPS-001; endpoint passed manual acceptance check. |
| SQL | PRACTICING | Wrote an active-appeals query with two joins, status filtering and custom `CASE` ordering for OPS-001; explained `LEFT JOIN` behaviour. |
| PostgreSQL | UNKNOWN | — |
| indexes | UNKNOWN | — |
| transactions | UNKNOWN | — |
| testing | UNKNOWN | — |
| architecture | UNKNOWN | — |
| Git | UNKNOWN | Commit-message practice starts in `LEARN_MANUAL`; propose messages and explain commit boundaries before requesting review. |
| ticket refinement | UNKNOWN | Follow `.skills/ticket-refinement`; identify ambiguity, dependencies and risks before estimating. |
| sprint planning | UNKNOWN | Follow `.skills/sprint-planning`; plan against real capacity and one Sprint Goal. |
| implementation review | UNKNOWN | Follow `.skills/implementation-review`; lead self-review before Codex findings. |
| PR review response | UNKNOWN | Follow `.skills/pr-review`; understand, answer and resolve or challenge review comments. |
| debugging / incident | UNKNOWN | Follow `.skills/debugging-incident`; collect evidence and test hypotheses before fixing. |
| sprint retrospective | UNKNOWN | Follow `.skills/sprint-retro`; explain planned versus actual and select a process improvement. |
| Docker | UNKNOWN | — |
| CI/CD | UNKNOWN | Read the failing step and error, form a hypothesis and localize the cause before fixing. |

Statuses: `UNKNOWN`, `NEW`, `PRACTICING`, `CONFIRMED`, `ROUTINE`.

## Status and delegation rules

- `UNKNOWN` or `NEW` → `LEARN_MANUAL`.
- `PRACTICING` → `LEARN_MANUAL` or `MANUAL_FOCUS`.
- `CONFIRMED` → `DESIGN_THEN_AI`.
- `ROUTINE` → `AI_ROUTINE`.

A skill becomes `CONFIRMED` only after independent implementation, error correction, explanation and a repeat check. Record evidence in the learning log; elapsed time, prior employment and unexplained AI-generated code do not establish confirmation.
