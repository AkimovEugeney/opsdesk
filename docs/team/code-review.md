# Code review

Review checks the ticket's visible requirements, product rules, accepted ADRs, correctness, tests, error handling, security, performance and accessibility when applicable.

The author self-reviews first. A reviewer records actionable findings with context and expected impact. The author resolves or explains each finding; unresolved trade-offs are documented in the ticket or an ADR when required.

The PR description must state the problem, scope, validation performed, risks and any follow-up work.

## Independent review

An independent Codex review in a separate chat is required for:

- medium or large changes;
- new business logic;
- database changes;
- architecture changes;
- tickets whose primary or secondary learning goal is maintainability or code quality.

Use the ticket's scope and learning goal to classify the review before implementation. Record the decision and reason in the ticket. The reviewer receives the ticket, requirements log, diff and validation evidence; record the result and link the review record. Switching from implementer to reviewer in the same chat does not establish independence.

For a small routine change outside these categories, self-review and a same-session Codex review are sufficient. The same-session review still checks the applicable requirements and quality criteria; it is not called independent review. Escalate it to an independent review when the diff reveals new business rules, data changes, unexpected complexity or a material risk.

## Maintainability review

Assess whether another engineer could safely understand and modify the code later:

- names and intent;
- function and module responsibilities;
- unnecessary coupling and duplicated business logic;
- hidden side effects and control-flow complexity;
- error handling and consistency with surrounding code;
- whether abstractions serve current requirements;
- unnecessary complexity introduced by AI-generated code.

Do not demand theoretical perfection. Distinguish a deliberate trade-off due to scope, time or product constraints from accidental poor quality caused by a gap in understanding. Ask for the author's reasoning when the intent is unclear.

Explain the engineering consequence of a finding, such as duplicated rules on the next entry point or an error path that hides failure; do not present personal style as a correctness requirement. Suggest the smallest justified improvement and distinguish required fixes from optional suggestions.

Record accepted trade-offs with their reason, impact and a condition for revisiting them in the ticket or ADR when required. An unexplained defect is not an accepted trade-off. In `LEARN_MANUAL`, give review feedback without replacing the learner's implementation with a ready-made solution.
