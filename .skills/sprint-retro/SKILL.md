---
name: sprint-retro
description: Review an OpsDesk iteration's outcomes, learning retention and unfinished work, then record a small evidence-based adjustment before the next commitment.
---

# Sprint retro

Use after Sprint Review, before the next iteration is committed.

1. Compare the Sprint Goal, planned work and delivered outcomes using recorded evidence.
2. Compare original estimates and actual time only where the original estimate exists.
3. Review unfinished work, blockers, scope changes and carry-over decisions.
4. Identify causes: decomposition, unknown technology, estimation, quality shortcuts, perfectionism, debugging, capacity or process friction. Ask when the cause is not recorded.
5. Read ledger status under `docs/learning/skills-matrix.md`: independent applications, remaining gaps and deferrals. Reuse natural task evidence. An optional brief recap may be offered at a suitable boundary; a request to continue coding does not authorize a retention interview.
6. Record unlogged material observations through scripts/learning.py with stable event IDs; counts, dates and automatic retirement are computed from learning-state.json. Honor learner deferrals and avoid duplicate evidence. Update `current-state.md` from facts, not completion-based skill upgrades.
7. Select at most one or two concrete teaching or process adjustments for the next sprint.

An unfinished ticket is not automatically a failure, and the retro does not rewrite past commitments to make the sprint look successful.
