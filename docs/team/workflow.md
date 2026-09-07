# Team workflow

Work runs in weekly iterations with one business Sprint Goal. Each ticket is estimated by the learner in hours before implementation and is implemented on its own branch. Codex selects product work as PM/PO under `../learning/task-manager.md`; the learner receives tasks as an engineer.

1. Select a ticket for the iteration and confirm its work split and learning mode.
2. Record an hour estimate before implementation.
3. Create a branch for the ticket.
4. Implement, test and self-review.
5. Open a pull request with the PR description completed.
6. Conduct review and resolve agreed feedback.
7. Record actual time and learning evidence.
8. Hold a sprint review and retrospective, recording explicit decisions about unfinished work.

## Weekly planning

1. Review the previous iteration and unfinished work before committing to a new week.
2. Confirm available weekly hours using `../learning/capacity-plan.md`; do not assume that calendar availability or the previous commitment is unchanged.
3. Define one observable product Sprint Goal and choose realistic backlog candidates.
4. Let the learner ask clarifying questions and estimate candidate tickets in hours. Prepare detailed briefs when needed; record provisional estimates as provisional and refine them before implementation, preserving the original.
5. Check that the total fits capacity including learning, tests, review and debugging. Several tickets are allowed, but one is enough when that is the realistic capacity. Split oversized work rather than requiring 2–4 tickets.
6. Record the agreed plan, known risks and unknowns in `../../work/sprints/sprint-template.md` format. Record only risks already discovered by the learner or explicitly visible in the brief; do not disclose prepared technical traps.

The learner owns the estimate; Codex may question an obvious inconsistency but must not replace it with its own estimate. Use hour ranges from the capacity policy, not story points or a second mandatory sizing scale. Once agreed, preserve the original plan and append dated changes with reasons.

## During the iteration

On «Приступаем» or «Продолжаем», identify the sprint, active ticket and phase through `../learning/current-state.md`. Continue unfinished work before selecting new work. Act as PO for requirements, Tech Lead for design, and reviewer after implementation; preserve the ticket's learning mode and confirmed work split.

At a session boundary or reported change, record the actual state, blockers and next action. Do not require daily reports or stand-ups.

If work is blocked or likely to miss the week, surface the risk and ask what caused it. Record the learner's explanation, remaining work and a decision to clarify, split, reduce agreed scope explicitly or carry over. Never silently rewrite scope or classify unfinished acceptance criteria as completed.

A new calendar week does not complete the old sprint automatically. If its review is missing, perform it before planning new commitments, using recorded results. Reuse an existing review/retro rather than repeating it; resolve only missing information. Do not invent hours, completion percentages or reasons for an absence. A long pause does not create a backlog of fictional sprints or an obligation to catch up on missed hours.

## Sprint review

- Demo or inspect delivered functionality and link validation/review evidence.
- Compare planned and delivered outcomes, including unplanned work.
- Assess whether the Sprint Goal was met separately from each ticket's completion under `definition-of-done.md`.
- Compare original estimates with actual time only where an estimate was recorded before work. Mark missing estimates as unavailable.
- List unfinished work, its remaining scope and blockers. Partial progress does not satisfy the ticket's definition of done.

## Retrospective and carry-over

Record what helped, what slowed progress, estimation errors and one concrete engineering/process change for the next week. If a cause is unknown, ask rather than assuming lack of effort or understanding.

Carry over only with an explicit reason and a recorded decision; keep the original ticket, estimate and spent time. Record a new remaining-work estimate separately, and include it in the next week's capacity. Do not retroactively reduce the original commitment to make the sprint appear successful.

Missing a ticket is not automatically a failed sprint. Assess the business goal honestly, understand the cause and use it in planning. Deadline pressure does not relax the learning contract or definition of done.

Update the sprint record, capacity tracking, learning log, skills matrix and `current-state.md` from demonstrated evidence. Only then mark the iteration closed. Do not upgrade a skill merely because the sprint finished.

Do not use story points, velocity, mandatory daily stand-ups or a minimum number of hours per day. Track real time; do not pad hours to meet a quota.
