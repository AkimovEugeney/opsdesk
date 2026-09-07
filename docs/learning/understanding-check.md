# Understanding check

After each completed ticket, the user explains:

1. The execution path from UI to database and back, where applicable.
2. The architectural boundaries involved.
3. Likely failure modes.
4. What the tests prove and what they do not.
5. Expected behavior if a relevant condition changes.
6. Any AI-generated code used in the task.

After an AI-generated solution, including `DESIGN_THEN_AI`, review the diff and answer these four questions:

1. What did AI change?
2. Why does the solution work?
3. Where can it break?
4. What will I check first when debugging a bug?

Codex asks one question at a time. If the user cannot explain the solution, the code is not yet understood; do not use it as evidence for confirming the skill. Resolve the gap before completing the understanding check.

Codex records the outcome in the learning log and uses it when updating the skill status.
