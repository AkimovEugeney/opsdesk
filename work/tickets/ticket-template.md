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

The brief contains enough information to understand the business goal, but intentionally leaves open questions that a middle developer must discover and clarify.

Before clarification, Codex does not reveal disputed access rights, concurrency scenarios, boundary states, partial-failure behavior, technical architecture, data model, API contract or the questions the developer is expected to ask. Prepare and persist consistent PO answers before presenting the brief under `docs/learning/task-manager.md`, and record answers in the requirements log when asked; answers are never invented retrospectively.

## Acceptance criteria

- [Observable result]

## AI mode

`LEARN_MANUAL` | `MANUAL_FOCUS` | `DESIGN_THEN_AI` | `AI_ROUTINE`

## SQL mode

`SQL_REQUIRED` | `SQL_RELEVANT` | `ORM_SUFFICIENT` | Not applicable

## Primary skill

[One skill from skills matrix]

## Secondary skills

- [At most one additional learning goal, or none]

## Familiar parts

- [Already practiced parts supported by skills-matrix evidence]

## AI_ROUTINE parts

- [Agreed non-learning work; no architecture or business-rule design]

## Intentionally excluded

- [Topics outside this ticket; no hints about hidden technical traps]

## Risks

- [Risk already visible or discovered by the learner; do not reveal the intended technical solution]

## Work split

| Part | Who writes it | AI mode | Reason |
|---|---|---|---|
| — | — | — | — |

State explicitly after the table:

- User writes independently: [parts].
- User writes with focus on: [parts and 1–3 focus points].
- Codex may implement to save time: [parts].

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
- Understanding check: [result]

## Outcome and learning evidence

- Learning log / skills matrix: [links to demonstrated evidence; no automatic skill upgrade].
- Accepted trade-offs: [reason, impact and condition for revisiting, or none].
- Remaining work / blocker: [facts and cause, or none].
- Scope / carry-over changes: [dated decision, reason and separate remaining estimate; preserve original estimate and actuals].
