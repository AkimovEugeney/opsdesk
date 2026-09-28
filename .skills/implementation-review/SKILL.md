# Implementation review

Use after implementation, before delivery through the ticket's selected route (with or without a pull request).

1. Reuse the learner's observed self-review, case choices and reasoning. If a material self-review gap remains, ask one focused question; do not require a new checklist or recital when evidence already exists.
2. Check acceptance criteria, correctness, tests and relevant error paths.
3. Choose separate review only under `docs/team/code-review.md`: access/session/secret/protected-data boundary, risky data transformation, double-effect concurrency/external action, or shared contract/mechanism. Record what can fail, scenario and consequence; a new method or database alone is insufficient.
4. Check naming, responsibility boundaries, duplication, coupling, hidden side effects, control-flow complexity and consistency with nearby code.
5. For user-visible flows, check loading, error and empty states where applicable.
6. Separate a deliberate trade-off from accidental poor quality. Explain a concrete maintenance, testability, extensibility or regression consequence.
7. Record agreed trade-offs under the ticket work split; the learner resolves their own findings under the active AI mode. Do not label an untested risk or a mentor-only choice as an accepted trade-off.

Avoid “best practice” as the sole reason; explain the engineering consequence.
