# Target profile

Target: a middle fullstack/software engineer with a backend focus who can independently own a bounded product task from clarification through design, implementation, validation and delivery, use AI to accelerate work and take responsibility for the result. "Middle" is the programme's capability target, not an automatic title awarded by elapsed time or ticket count.

## Observable capability map

These capability IDs connect this target to `curriculum.md` and `learning-state.json`. Depth means applying and explaining a pattern when needed, not memorizing its name or implementing every pattern in advance.

| ID | Expected capability and engineering patterns | Evidence of readiness |
|---|---|---|
| runtime | Trace JS/TS/Node execution, promises, errors, closures and reference changes; use types and narrowing to express contracts. | Diagnose a concrete async/type/state bug, predict the behavior and verify a correction. |
| api | Design HTTP inputs/outputs, validation and error behavior; separate transport, business decisions and persistence; use dependency injection and cohesive modules when useful. | Independently deliver and change a bounded API flow, including malformed input and missing-data behavior, explaining relevant boundaries without a definition recital. |
| data | Model keys, nullability, relations and constraints; use SELECT/JOIN/INSERT/UPDATE, migrations, transactions and indexes at practical depth. | Write/explain core queries, preserve invariants during a write, and investigate a wrong or slow query using evidence. Exact database/ORM syntax may be looked up. |
| access | Distinguish identity from permission; enforce access using a trusted current user, with appropriate validation and failure paths. | Implement or change a bounded protected action and verify both allowed and denied cases. Security-sensitive details are checked against authoritative references. |
| frontend | Build React data flow with clear state ownership, forms and async request states; understand rendering, browser/network behavior and relevant accessibility. | Deliver a usable UI-to-database slice and diagnose a stale-state, request or rendering problem. Visual styling is not a separate mastery gate. |
| quality | Select useful unit/integration/HTTP tests; reproduce defects, inspect logs, isolate causes; reason about transactions, concurrency, idempotency and retries where applicable. | Demonstrate a failure, choose a proportionate fix/test, and explain what is still not guaranteed. Do not demand distributed-system expertise. |
| delivery | Clarify product intent, estimate/decompose, make explicit trade-offs, review changes, use Git/CI and basic deployment; control AI-generated work. | Own a changed requirement through a reviewable delivery, communicate a blocker, hand AI a bounded implementation brief, and debug an unfamiliar/AI-generated part without surrendering judgment to the tool. |

Assess these through several real product changes with reduced support, including changed conditions and a debugging/review episode. A single successful recall confirms only its narrow concept. Use recorded evidence to choose the next gap; do not run a seven-area entrance exam on every visit. Team process supports technical learning and motivation rather than displacing them.

React, NestJS and PostgreSQL are the current training stack, not a professional identity. The transferable capabilities are to:

- clarify incomplete requirements;
- decompose and estimate work;
- design frontend, backend, API and a data model;
- implement vertical React → NestJS → PostgreSQL features;
- understand code execution in the browser and Node.js;
- work with SQL, indexes, transactions and concurrency;
- test and debug a system;
- read and control AI-generated code;
- self-review and participate in code review;
- work with Git, Docker and basic CI;
- explain decisions in a middle-level interview.

Frontend remains part of the system: restore JS/TS and React fundamentals through data flow, browser behavior, async scenarios, performance and debugging in project features. Relearning layout, SCSS or UI libraries is not a separate learning goal.

Learning-time balance across tickets: 60–70% backend/database/architecture/HTTP/concurrency/system reasoning, 20–30% engineering frontend and 10% integration/debugging/infrastructure. See `curriculum.md` for the frontend scope and how this fits the existing concept limit.

This target deliberately excludes deep study of Kubernetes, Kafka, microservices and DevOps. They are not required outcomes of this four-month programme.

## Workplace readiness

Reduce the gap between the learner's current commercial experience and a typical middle-level team environment. The goal is practical readiness to enter a new team, not to simulate a perfect senior engineer or claim mastery after four months.

The learner should become reasonably comfortable with:

- receiving an incomplete business ticket instead of inventing tasks;
- asking clarifying questions before implementation;
- estimating work and identifying risks;
- working toward a weekly Sprint Goal and communicating blockers or unfinished work;
- writing maintainable code another developer can understand and safely change;
- performing self-review, receiving feedback and resolving review findings;
- explaining code structure and distinguishing a deliberate “good enough” trade-off from an unnoticed quality problem;
- understanding and validating AI-generated code;
- working with branches, commits, pull requests, Docker and the command line;
- taking responsibility for correctness and the delivered result beyond making a feature appear to work.

Deliberately practice team-development habits that may have been missing from earlier commercial experience inside OpsDesk tickets. The programme develops technical skills, engineering quality and team maturity together, within the existing concept and capacity limits.
