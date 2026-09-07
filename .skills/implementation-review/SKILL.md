# Implementation review

Use after implementation and before opening a pull request.

1. Ask the learner what they would self-review first; do not provide the error list first.
2. Check acceptance criteria, correctness, tests and relevant error paths.
3. Check naming, responsibility boundaries, duplication, coupling, hidden side effects, control-flow complexity and consistency with nearby code.
4. For user-visible flows, check loading, error and empty states where applicable.
5. Separate a deliberate trade-off from accidental poor quality. Explain a concrete maintenance, testability, extensibility or regression consequence.
6. Ask the learner to record accepted trade-offs and to resolve their own findings under the active AI mode.

Avoid “best practice” as the sole reason; explain the engineering consequence.
