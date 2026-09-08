# Understanding check

Before completing a ticket, reuse the learner's explanations, code, debugging and validation already observed during the work. Identify only missing evidence for the primary goal and material risks. There is no mandatory six-question recital.

For a small manual ticket, zero extra questions is valid when evidence is sufficient; otherwise use one or two short application questions, one at a time. Check a changed condition, an important failure or what the validation proves. Do not ask for the complete layer path when the relevant concept is parked in skills-matrix.md.

Match the check to the retention target: WRITE needs independent key logic or a meaningful modification; UNDERSTAND needs a concrete explanation/prediction; LOOKUP needs correct reference use and behavior verification only when relevant. Syntax recall is not a proxy for engineering understanding.

After an AI-generated solution, including `DESIGN_THEN_AI`, review the diff and establish evidence for these four points. Reuse answers already demonstrated instead of asking them again:

1. What did AI change?
2. Why does the solution work?
3. Where can it break?
4. What will I check first when debugging a bug?

If the learner cannot explain an important part of the solution, teach the missing knowledge, then check its application once. Resolve material understanding gaps before completing the check; do not use assisted answers as evidence of independent mastery.

Codex records material observations once through scripts/learning.py under skills-matrix.md, using learning-state.json for counts and dates. Keep meaningful narrative outcomes in learning-log.md. Natural independent application can establish retention without a separate quiz. Ticket completion does not wait for future recall dates and does not automatically confirm retention.
