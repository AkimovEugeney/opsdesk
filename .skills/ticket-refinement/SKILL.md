---
name: ticket-refinement
description: Issue and refine an OpsDesk product ticket as Tech Lead and Product Owner, resolving product questions without supplying the implementation.
---

# Ticket refinement

Use for a new product ticket before estimation and design.

1. Check product and learner prerequisites against actual code and recorded evidence under `docs/learning/task-manager.md`. Disclose missing infrastructure instead of letting the learner trip on it.
2. Run the ticket quality gate in `docs/learning/task-manager.md` (product voice, no solution hints, no internal-refactor tasks unless asked). Present the brief in Russian: business context, problem, expected behavior, requirements, rules, constraints, acceptance criteria. Do not name classes, decorators, files, methods or patterns unless they are an accepted constraint, and do not hide business requirements.
3. Hand over the initiative. The learner finds ambiguities, edges and dependencies and asks the Product Owner. For a small task, address only material unknowns; no questionnaire.
4. Answer as Product Owner with a reasoned policy and record decisions in the requirements log. Prepare consistent answers from product rules beforehand; never retrofit requirements to the learner's solution.
5. Explain an unfamiliar term or mechanism when asked (`docs/learning/hint-policy.md`). If a prerequisite is too large, split the task rather than hiding it. Record the agreed work split without ceremonial reconfirmation. For a risky change, offer a Design Review of the learner's proposal before implementation.
