# [TICKET-ID] Title

- User-facing brief language: Russian. Keep internal process instructions and source records in English.
- Status: Draft | Ready | In progress | In review | Done
- Estimate: [hours]
- Actual time: [hours, completed after work]
- Branch: [branch name]
- Pull request: [link]
- Jira issue: [key and link, or `Repository fallback — Jira unavailable`]
- Iteration: [link to current weekly sprint; preserve carry-over history]

## Business value

[Why this change matters to a product role.]

## Context

[Known background only.]

## Visible requirements

- [Requirement]

The brief states the business goal, the problem, expected behavior and rules. It does not name classes, decorators, files or patterns unless they are an accepted architectural constraint. Realistic open questions are fine when the learner can resolve them with the Product Owner; do not hide business requirements.

Prepare consistent PO answers before presenting the brief and record clarification decisions in the requirements log; never invent answers retrospectively. Disclose missing infrastructure before dependent work. The intended solution stays with the learner; explanations are available on request.

## Acceptance criteria

- [Observable result]

## AI mode

Learner writes (default) | `DESIGN_THEN_AI` | `AI_ROUTINE` — per part, see the work split. Support level: Supported | Independent | Work-like. (Older tickets use `LEARN_MANUAL` / `MANUAL_FOCUS`; both mean the learner writes.)

## SQL mode

`SQL_REQUIRED` | `SQL_RELEVANT` | `ORM_SUFFICIENT` | Not applicable

## Primary skill

[Optional: the main engineering skill this task exercises; it is for planning, not a lesson.]

## Secondary skills

- [At most one consolidation goal, or none; at most one major new concept in the whole ticket.]

## Readiness

- [Relevant existing code/infrastructure; missing prerequisites; decision to proceed or split.]

## Familiar parts

- [Already practiced parts supported by skills-matrix evidence]

## AI_ROUTINE parts

- [Agreed non-learning work; no architecture or business-rule design]

## Intentionally excluded

- [Topics outside this ticket; no hints about hidden technical traps]

## Risks

- [Risk already visible or discovered by the learner; do not reveal the intended technical solution]
- [When relevant: one failure, abuse or race scenario; the invariant to preserve; and the planned verification or review evidence. Omit when no material scenario applies.]

## Work split

| Part | Who writes it | AI mode | Reason |
|---|---|---|---|
| — | — | — | — |

For each material part, mark the decision-ownership band from `skills-matrix.md`: Red (engineer-owned), Yellow (learn then delegate) or Green (delegate and verify).

State explicitly after the table:

- User writes independently: [parts].
- User writes with focus on: [parts and 1–3 focus points].
- Codex may implement to save time: [parts].

## AI implementation brief and focused review

Required when `DESIGN_THEN_AI` implements a material change; omit for manual-only or mechanical routine work.

- Context and requested behavior: [bounded change]
- Inputs/outputs and invariants: [contract, data/access boundary]
- Edge/failure cases and excluded scope: [what must happen / what must not change]
- Definition of Done: [observable checks]
- Focused review: [data, authorization, concurrency, external side effects, errors/logging and/or other relevant critical paths]

## Requirements log

Create and link a separate `OPS-XXX-requirements-log.md` before clarification begins.

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| — | — | — | — |

## Validation and review

- Review format: [Independent review in a separate chat / Same-session Codex review].
- Review decision: [Why this format is appropriate for the ticket scope and learning goals].
- Tests: [result]
- Self-review: [result]
- Commit history: [learner's rationale for the number and grouping of commits; link or summary].
- Codex review: [result]
- CI: [required checks and result; local equivalent if hosting integration is unavailable].
- Design Review (when risk requires it): [proposal and outcome, or not required]
- Code Review findings (BLOCKER / IMPROVEMENT / NIT) and their resolution: [result]
- Evidence of understanding from the work: [short note, or none beyond the work itself]

## Outcome and learning evidence

- Learning log / skills matrix: [links to demonstrated evidence; no automatic skill upgrade].
- Accepted trade-offs: [reason, impact and condition for revisiting, or none].
- Remaining work / blocker: [facts and cause, or none].
- Scope / carry-over changes: [dated decision, reason and separate remaining estimate; preserve original estimate and actuals].
