# Evidence of understanding

There is no separate understanding check, quiz or exam stage. Understanding is judged from what the learner actually did during the task: the design proposal, the code, debugging, explanations given while working, and the reaction to Code Review.

Use that evidence when closing a ticket. Ask a question only when a material risk or a possible gap is not already covered, and only one short, concrete question about the work itself (for example, what happens in this failure path). Never ask a question to produce a record, and never block a correct task because the learner cannot recall syntax, terminology or an artificial question. If a significant gap shows up, offer a short walkthrough instead of a test.

Evaluate meaning, not wording or length. A correct explanation in the learner's own words is enough; do not ask for it again.

Evidence from learner-written code counts as independent only if the learner authored the key logic without a supplied solution; record help honestly.

## AI-implemented work (`DESIGN_THEN_AI` / `AI_ROUTINE`)

Review the diff against the learner's brief. The learner should be able to say, from the work itself, what changed, why it works, where it can break and where they would look first when debugging. Reuse what has already been shown. Inspect by risk: data mutation, authorization, trust boundaries, concurrency, external side effects, retries/errors and sensitive logs. Verify the happy path and the relevant invalid, denied, missing, duplicate, race or dependency-failure path. An adversarial AI review can suggest checks; it does not replace executed evidence. Unexplained AI-written code is not skill evidence.

## Recording

Codex records material new observations once through `scripts/learning.py` (see `skills-matrix.md`) and keeps narrative outcomes in `learning-log.md`. Ticket completion does not wait for future recall dates and does not by itself confirm any skill.
