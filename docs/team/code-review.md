# Code review

Review visible requirements, product rules, accepted ADRs, correctness, tests, error handling, security, performance, accessibility and maintainability when relevant. Label findings blocking, suggestion, question or nit; state impact and expected resolution, not “best practice” alone.

The author self-reviews first and states what they checked. The reviewer records actionable findings. The author explains each comment, replies, agrees or argues with evidence, and makes learner-owned changes under the active AI mode. Do not implement review comments automatically.

The PR description states the problem, scope, validation, risks and follow-up. Review commit purpose and diff alignment under commit-messages.md.

## Review format

Independent review in a separate chat is required for medium or large changes, new business logic, database or architecture changes, and maintainability/code-quality goals. Record the decision before implementation.

For a small routine change outside those categories, self-review plus same-session Codex review is sufficient. Escalate if the diff reveals new rules, data changes, unexpected complexity or material risk. The same-session review still applies all relevant quality checks; it is not called independent.

The independent reviewer receives the ticket, requirements log, diff and validation evidence. A role switch in the implementation chat does not establish independence.

## Maintainability

Check names and intent, responsibilities, coupling, duplication, side effects, control flow, errors, local consistency, justified abstractions and AI-added complexity. Distinguish a deliberate scope/time trade-off from an accidental quality problem. Explain consequences for maintenance, testing, extension or regression risk and distinguish required fixes from optional suggestions.

Record accepted trade-offs with reason, impact and revisit condition in the ticket or ADR. In LEARN_MANUAL, review without replacing the learner's code with a ready-made solution.
