# Code review

Review visible requirements, product rules, accepted ADRs, correctness, tests, error handling, security, performance, accessibility and maintainability when relevant. Review against the codebase, not an isolated snippet: inspect relevant neighbouring modules for naming, DTO/type, endpoint, error-handling and style conventions before recommending a change. Prefer project consistency to a theoretical preference. Label findings blocking, suggestion, question or nit; state impact and expected resolution, not “best practice” alone.

The author self-reviews first; reuse already demonstrated checks and explanations, asking only for material missing coverage. The reviewer records actionable findings. The author replies, agrees or argues with evidence, and makes learner-owned changes under the active AI mode; paraphrasing every comment is not required. Ask only about a material unresolved misunderstanding, not wording already explained correctly. Do not implement review comments automatically.

The PR description, or the repository ticket on the direct/local route, states the problem, scope, validation, risks and follow-up. Review commit purpose and diff alignment under commit-messages.md. Review requests and approved messages do not authorize staging, committing or other Git changes.

## Review format

Independent review in a separate chat is required for medium or large changes, new business logic, database or architecture changes, maintainability/code-quality goals, and material security, authentication or authorization risks. Record the decision and reason before implementation. A direct/local delivery route or local-only data does not exempt authentication or material database/security risk from independent review.

For a small routine change outside those categories, self-review plus same-session Codex review is sufficient. Escalate if the diff reveals new rules, data changes, unexpected complexity or material risk. The same-session review still applies all relevant quality checks; it is not called independent.

The independent reviewer receives the ticket, requirements log, diff and validation evidence. A role switch in the implementation chat does not establish independence.

Map acceptance criteria to observed evidence and remaining gaps under `definition-of-done.md`. Inspect the actual changed set, including untracked files; do not equate a command launch or a partial diff check with success. Reuse relevant checks for the same code state and rerun affected cases after changes. The OPS-006 same-session review does not satisfy its independent-review requirement; the audit's missing acceptance evidence and review follow-ups remain open until actually checked.

## Maintainability

Check names and intent, responsibilities, coupling, duplication, side effects, control flow, errors, local consistency, justified abstractions and AI-added complexity. Avoid generic names such as `QueryRow`, `Result` or `Data` in a shared file scope when a responsibility-specific name would make multiple uses clear; do not introduce a type solely for ceremony when it adds neither readability nor type safety. Distinguish a deliberate scope/time trade-off from an accidental quality problem. Explain consequences for maintenance, testing, extension or regression risk and distinguish required fixes from optional suggestions.

Classify each observation before presenting it:

- **Real issue:** a bug, wrong contract, inconsistent project style, material maintainability problem or regression risk. State the required resolution.
- **Improvement:** a non-blocking way to make the code clearer or simpler. State that it is optional.
- **Teaching note:** a useful concept that does not require a code change. Never present it as a defect.

For a small routine CRUD change, keep review lightweight: first check acceptance criteria, happy path, not-found/error path, method contract, unnecessary data exposure, local conventions and obvious regression risk. Do not introduce architectural abstractions or prolonged discussion unless the diff creates a real maintainability problem.

Record accepted trade-offs with reason, impact and revisit condition in the ticket or ADR. In LEARN_MANUAL, review without replacing the learner's code with a ready-made solution.
