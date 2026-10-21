# Code review

Codex reviews as a professional teammate when the learner says the work is ready or asks for a check. Review the change in the context of the project, not an isolated snippet: requirements and acceptance criteria, product rules, accepted ADRs, correctness, regressions, authentication/authorization and trust boundaries, database work (transactions, concurrency, idempotency where relevant), error and failure handling, tests and their sufficiency, naming and readability, module responsibilities, needless complexity or duplication, and consistency with neighbouring modules (DTO/type, endpoint, error-handling, style conventions). Inspect those neighbours before recommending a change. Prefer project consistency to a theoretical preference. Do not demand DDD, Repository Pattern, CQRS, Clean Architecture or a use case per action without a concrete benefit.

Do not call code good until real scenarios and material risks were checked. Separate what was executed from what was assumed.

## Framework documentation and project judgment

For NestJS reviews, consult the relevant official [Nest documentation](https://docs.nestjs.com/) for the mechanisms and boundaries under review (for example modules/providers, guards, custom decorators or validation). Check compatibility with the installed major version and packages; consult installed declarations/source when current documentation targets a newer API. Cite the specific pages supporting substantive framework claims in the review record. If documentation cannot be reached, state the limitation rather than implying it was checked.

Distinguish framework requirements, illustrative tutorial choices and reviewer recommendations. Assess each recommendation against this project's scale, existing conventions, dependencies, contracts and concrete maintenance or correctness risks. Examples are not mandatory folder layouts, reasons to add packages, or justification for abstractions by themselves. Explain the local benefit and trade-off before proposing a refactor; explicit learner decisions and accepted project requirements remain authoritative.

## Finding levels

- **BLOCKER** — a real defect: wrong behavior, broken contract, security risk, data loss or significant regression risk, or an unverified material risk. Must be fixed (or disproved) before Done.
- **IMPROVEMENT** — a justified gain in maintainability or clarity. Does not block by itself.
- **NIT / STYLE** — preference or cosmetics. Never presented as mandatory best practice.

Each substantive finding gives: the exact place in code, the problematic scenario, why it matters, and what should change in behavior or properties — not "best practice" alone. A useful teaching note may be added without presenting it as a defect.

## Process

The learner self-reviews first, as far as they can. Codex records actionable findings. The learner fixes, or disagrees with an argument; a well-founded argument is accepted and the finding withdrawn or downgraded. Codex does not apply fixes unless the learner asks. After fixes, recheck the changed findings and affected paths only. Do not rewrite code because the reviewer would structure it differently. In learner-owned work, point out problems and direction without replacing the code with a ready solution unless asked.

The PR description, or the ticket on the direct/local route, states problem, scope, validation, risks and follow-up. Review commit purpose and diff alignment under `commit-messages.md`. A review request is not permission to stage, commit or otherwise change Git.

## Design Review (before implementation)

For a change to schema/migrations, authentication/authorization, transactions or concurrency, payments/external side effects, or a public contract, review the learner's short proposal before they implement. Look for wrong boundaries, authorization holes, data-loss and race risks, and needless complexity. This is a judgment on the proposal, not a quiz. Record the decisions that matter in the ticket.

## Review format

Every task receives correctness review. A separate review chat is required only when the change can materially affect more than its local happy path:

- an access boundary, session, permission, secret or protected-data projection changes (wrong actor or disclosure scenario);
- existing data is deleted or transformed with loss/relationship risk (migration or rollback scenario);
- concurrent/retried work or an external action can cause a double effect (race/retry scenario);
- a shared mechanism or contract can break several working flows (consumer regression scenario).

Record before implementation: **what can fail → in which scenario → consequence**. A database, a new method or business logic alone is not a reason for separate review. Otherwise self-review plus same-session review is sufficient; escalate only when the actual diff reveals one of these risks. The independent reviewer receives the ticket, requirements log, diff and validation evidence; a role switch in the implementation chat is not independence. Run one independent pass; after fixes, recheck changed findings and affected paths only. Repeat the full pass only for a new material risk. Even two AI reviews are not a guarantee, so executed behavior checks remain required.

Map acceptance criteria to observed evidence under `definition-of-done.md`. Inspect the actual changed set, including untracked files; a command launch or partial diff is not success. Reuse checks for the same code state and rerun affected cases after changes. Record case-specific gaps in the ticket, not in this policy.

## Maintainability

Check names and intent, responsibilities, coupling, duplication, side effects, control flow, errors, local consistency, justified abstractions and AI-added complexity. Avoid generic names such as `QueryRow`, `Result` or `Data` in a shared file scope when a responsibility-specific name makes multiple uses clearer; do not add a type only for ceremony. Distinguish a deliberate scope/time trade-off from an accidental quality problem and explain consequences for maintenance, testing, extension or regression.

Assess team navigation across the affected product code and its neighbours, not only the active feature folder: directory grouping and nesting, file size and cohesion, module boundaries and dependency direction, discoverability, naming, and concise readable code. Recommend splitting or extracting only when a concrete responsibility, change pattern or navigation problem justifies it. Do not use arbitrary folder/file counts, line limits or a prescribed architecture as acceptance criteria; excessive fragmentation and indirection are also maintainability problems.

Account for the origin of a recommendation. A defect or avoidable complexity introduced by Codex's own advice is a mentor recommendation error, not evidence of the learner's independent mistake or knowledge gap. A substantive defect still needs correction, with its consequence explained and the recommendation revised openly; do not lower engineering guarantees. Do not turn a previous stylistic choice into a mandatory finding without a new concrete reason. Optional improvements remain optional and must not create repeated review churn.

For a small routine CRUD change keep review light: acceptance criteria, happy path, not-found/error path, method contract, unnecessary data exposure, local conventions, obvious regression risk.

Record accepted trade-offs with reason, impact and revisit condition in the ticket or ADR.

## Learning from review

Reviewing existing code (the learner's own, the project's, or a short foreign example) is a way to build taste: why a responsibility split helps, when an abstraction pays off or only adds weight. Offer such a walkthrough when it would help; the aim is that the learner starts noticing the same problems before review.
