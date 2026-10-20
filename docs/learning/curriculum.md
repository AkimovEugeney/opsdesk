# Curriculum — 16-week adaptive framework

This is a framework, not a final syllabus. Sprint 0 defines the starting level. After diagnosis, update the focus, ordering and depth of each week from evidence in `skills-matrix.md`.

## Learning focus

Use this approximate learning-time balance across several tickets, not as a quota within every ticket:

- 60–70% backend, databases, architecture, HTTP, concurrency and system reasoning;
- 20–30% engineering frontend;
- 10% integration, debugging and infrastructure.

Choose proportions that total 100%, for example 65/25/10. Count work by its primary learning focus rather than counting the same time twice.

Work follows the model in `learning-contract.md`: a real product task, the learner's own solution, help and explanations on request, Code Review. External courses (for example the NestJS course in progress) are a parallel knowledge source, not a schedule to mirror; use what the learner reports when choosing tasks. Choose WRITE, UNDERSTAND or LOOKUP per concept and a Red/Yellow/Green decision-ownership band in `skills-matrix.md` when it helps; AI delegation is a separate work-split decision. Engineering reasoning and manual coding often develop in the same activity, not competing time quotas. Progress aims at learner-owned design and risk judgment first, then AI-assisted implementation and focused verification—not permanent manual typing.

## Engineering depth inside product work

Keep one fullstack project. For a relevant topic, extend the normal delivery path with a proportionate engineering loop: make it work, identify how it can fail or be abused, preserve the important invariant, then verify the behavior and inspect the diff as a reviewer would. This is part of the ticket, not a separate security, architecture or audit course.

- **Identity and access:** normal login/current-user flow → stolen or forged identity and missing permission → trusted identity boundary and denied path → allowed/denied checks plus review of a foreign implementation.
- **Database writes:** correct update → concurrent requests or duplicate action → transaction, constraint or idempotency boundary → reproduce/observe the race and explain what remains unguaranteed.
- **API work:** useful contract → malformed input, unauthorized call or abusive repetition → validation, access rule, rate/volume decision or logging appropriate to the risk → behavior checks and an API review against the contract.

Do not force every item into every small read ticket. Select one concrete risk only when it exposes the current concept or product consequence; record it in the ticket's risk and validation sections.

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

These are selection guides, not a checklist for one ticket: preserve one primary and at most one secondary learning goal, with at most one major new concept at the current level. For a relevant integration slice, practice the appropriate part of API design, request handling, state, rendering or Network inspection. Spread unfamiliar parts over tickets; do not require a repeated full-path explanation already covered by evidence.

Layout, SCSS, Tailwind, decorative UI, UI-library details, page titles and static list markup receive attention only when the product task needs them. They are normally delegated; learner manual work is reserved for a concrete frontend capability gap or an engineering concern from the list above.

SQL, design, architecture and manual coding develop through OpsDesk tickets. Examples on different data are available on request, without a separate exercise track. Optional unfamiliar open-source reading remains available once every 1–2 weeks when useful.

## Readiness and progression

Use task-manager.md to check both product and learner prerequisites before choosing a slice. For the current backend starting level, prefer useful practice of input/output contracts, HTTP behavior, basic SELECT/INSERT/UPDATE, simple relations, validation and error handling over a bundled auth/permissions programme. These are candidate areas, not a requirement to cover all of them before any auth topic.

Move to the next major topic when its actual prerequisites have been applied and explained independently on changed conditions, and no unresolved gap blocks the proposed work. Do not require all broad skills to be CONFIRMED or finish every recall interval before progressing. A prerequisite that is still unknown needs a smaller slice, or an explanation on request; do not hide it. Curiosity about an advanced topic is welcome without automatically adding it to the sprint.

Each sprint has a concise learning goal alongside its product goal, visible to the learner. Select repeats from the concept queue, including important neglected items; do not default to the same easy layer definitions. Review progress through independent transfer, retained ideas and reduced conceptual help, rather than completed endpoint count.

## Adaptive route to the target

Stages are a dependency guide, not fixed weeks or a compulsory linear course. State IDs below are stored in `learning-state.json`; target capability IDs refer to `target-profile.md`. Testing, debugging, product reasoning and AI review occur throughout rather than waiting for the last stage.

| Stage ID | Focus and approximate direction | Entry / exit evidence and target links |
|---|---|---|
| diagnosis | Establish the starting point. Already completed in OPS-000. | Preserve the original JS/TS/React/Node/SQL evidence; diagnose only new or contradictory gaps, never restart the baseline questionnaire. All capabilities. |
| read_foundations | Completed foundation: small API read flows, SQL result shapes, HTTP inputs/outputs and focused validation. | OPS-001/002/004/005 provide the current evidence. It remains available for changed-condition practice; it is not the active stage. api, data, runtime. |
| write_foundations | Introduce a useful write, input validation, simple relations/constraints and migration behavior in manageable slices. | Requires the relevant read/input basics. Exit evidence is a validated write with understood failure/data behavior; scope advanced integrity work separately if needed. api, data, quality. |
| identity_access | Current: authenticated current user is implemented; finish the bounded permission rule and protected write with observed behavior. | OPS-006 supplies identity. OPS-003 must still demonstrate authorization and the concurrent-write invariant; do not bundle tokens, guards and a flexible permission model. access, api, data. |
| fullstack_flow | Connect a useful React view/form to the backend, including loading/error/empty states and state ownership. | Can overlap earlier stages as soon as the necessary API exists; extend OPS-000 frontend evidence instead of treating frontend as unknown by default. frontend, runtime, api. |
| reliability | Investigate defects, test important behavior, preserve invariants under concurrency, inspect query performance and apply retries/idempotency only where justified. | Expand from an actual product risk with ready prerequisites. Exit evidence is a reproduced failure and a validated explanation/fix, not familiarity with pattern names. quality, data, runtime. |
| independent_delivery | Own a bounded cross-stack change, a requirement change and unfamiliar/AI-generated code with decreasing support. | Draw evidence from prior stages and new work. Review readiness against the observable target, including delivery and debugging, without a final memorization marathon. All capabilities. |

Before choosing the next task, locate the current stage, map the candidate to one concrete capability gap, check prerequisites, then choose the smallest meaningful product outcome. Familiar work may naturally count as retention; it does not need to become a second assignment. Record a stage change only when the relevant evidence warrants it, with source and reason in learning-state.json milestones and current-state.md. Advancing stages does not mark every concept in the previous stage mastered.
