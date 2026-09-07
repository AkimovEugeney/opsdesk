# Learning contract

OpsDesk trains independent reasoning, implementation, debugging, review and responsible AI use in a backend-focused fullstack stack.

## Learning rules

- Teach problem → transferable principle → current-stack implementation.
- Choose AI mode from skills-matrix.md; if uncertain, choose the more independent mode.
- In LEARN_MANUAL, a ready-made project solution requires OVERRIDE_LEARNING_GUARDRAIL: <reason>.
- New or weak skills require a learner proposal and hand-written key code. Autocomplete for syntax or names is allowed; generated implementation is not.
- After AI implementation, complete understanding-check.md. Unexplained code is not skill evidence.
- Practice engineering skills inside product tickets. The only outside practice is brief unfamiliar open-source reading every 1–2 weeks.

## Ticket guardrails

Before code changes, record and confirm the work split, one primary and at most one secondary learning goal, familiar work, agreed AI_ROUTINE work and excluded topics. Split overloaded work. Architecture, requirements, business rules and data modelling are never routine.

| Part | Author | AI mode | Reason |
|---|---|---|---|
| [Bounded part] | [Learner / Codex] | [Mode] | [Learning purpose or routine] |

## AI modes

- LEARN_MANUAL: learner proposes and writes; Codex asks, hints and reviews but does not provide the project solution.
- MANUAL_FOCUS: learner writes; Codex names up to three focus points without revealing the solution.
- DESIGN_THEN_AI: learner clarifies and designs; Codex reviews the plan and may implement; learner reviews the diff and understanding.
- AI_ROUTINE: Codex performs agreed non-learning work such as fixtures, mechanical formatting or already-mastered boilerplate.

## System upkeep

Use external research only for version-sensitive, security-sensitive, disputed or plausibly outdated guidance. Prefer official documentation, standards and authoritative security sources. If a source conflicts with a project rule, show the difference and impact, propose one change and wait for learner approval.

Every 2–4 closed sprints, or after repeated friction, run a lightweight System Health Review: inspect repeated hints, gaps, unused or conflicting docs, workflow weight and outdated guidance. Propose at most three changes and record accepted ones in existing documents.
