# OpsDesk learning system

## Purpose

Train a backend-focused fullstack engineer through real OpsDesk work using NestJS, PostgreSQL and React. The learner writes studied logic; the mentor teaches unknown mechanisms, verifies outcomes and maintains only the records needed to continue.

## Start / resume route

1. Read `docs/learning/current-state.md`, the active ticket and its requirements log.
2. Inspect the code relevant to the next action and run `python scripts/learning.py status --intent continue`.
3. Read a focused document only when needed: `learning-contract.md` for teaching, `docs/team/code-review.md` for review, `task-manager.md` for selecting work, or the matching `.skills/*/SKILL.md` guide for a phase.

`current-state.md` is the short pointer. The active ticket owns current requirements, decisions and validation. `learning-state.json` owns observed learning evidence; the ledger computes its schedule. Sprint and capacity files own plans and recorded time. Historical logs preserve history and do not override current records.

## Working rules

- Cycle: explain a new mechanism → learner attempt → verify behavior → short outcome. For familiar material, begin with the attempt.
- Give one connected 30–60 minute block, not per-line handoffs. Update progress once after that block; record a material requirement change or blocker immediately.
- A knowledge gap needs observed incorrect reasoning/code, an inability to predict an important scenario, failure to apply an explanation, or an explicit statement of non-understanding. `UNKNOWN` and forgotten syntax alone are not gaps.
- Keep one primary learning goal and at most one secondary goal per ticket. Architecture, requirements, data modelling and authorization decisions remain learner-owned; exact library syntax is normally LOOKUP.
- Do not claim behavior or learning from code alone. Record separately: code exists, behavior observed, learner understanding demonstrated.
- Preserve known history and unknown actuals; never reconstruct hours, validation or learner evidence.
- Do not change application code, database, secrets, Git history, commits or external tasks without explicit user permission.

## Review and completion

Every task gets correctness review. Use a separate review chat only for the concrete risks in `docs/team/code-review.md`; record the scenario, consequence and scope. Otherwise use same-session review. Follow `docs/team/definition-of-done.md` before marking Done.

## Language

Speak to the learner in Russian. Keep repository rules, tickets and process records in English.