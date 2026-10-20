# Team workflow

Work runs in weekly iterations with one business Sprint Goal. Each ticket is estimated by the learner in hours before implementation. Select and record its delivery route once: branch/PR, or the small-ticket direct/local route under `commit-messages.md`; record whether Jira is used. Codex selects product work as PM/PO under `../learning/task-manager.md`; the learner receives tasks as an engineer. Use the applicable process guide in `.skills/` at each phase.

Codex acts as Tech Lead and Code Reviewer throughout (see `../learning/learning-contract.md`): it issues the task without the solution, supports on request, runs Design Review for risky changes and Code Review after implementation. Process depth follows change impact. For a small bounded task, combine brief clarification, estimate/work split and lightweight review rather than adding a separate ceremony for each step; preserve relevant validation and ownership.

1. Select a ticket for the iteration and confirm its work split and learning mode.
2. Record an hour estimate before implementation.
3. Create a branch if the selected route uses one.
4. Implement and create coherent commits under `commit-messages.md`.
5. Test and self-review, including commit history.
6. Open a pull request if the selected route uses one, with its description completed; otherwise record scope, validation and risks in the ticket. Review commit grouping using any explanation already demonstrated.
7. Conduct review and resolve agreed feedback.
8. Record actual time and learning evidence.
9. Hold a sprint review and retrospective, recording explicit decisions about unfinished work.

Selecting a route, reviewing a diff or approving a message is not permission to execute Git changes. Obtain explicit permission for the intended staging, commit, push, merge or history-changing operation; an audit/review request grants none. Never repair unauthorized history without separate permission. Both routes retain the review and evidence gates in `code-review.md` and `definition-of-done.md`.

## Weekly planning

1. Review the previous iteration and unfinished work before committing to a new week.
2. Confirm available weekly hours using `../learning/capacity-plan.md`; do not assume that calendar availability or the previous commitment is unchanged.
3. Define one observable product Sprint Goal and a concise learning goal visible to the learner; choose candidates using the readiness check and concept queue in `../learning/task-manager.md`.
4. Let the learner ask clarifying questions and estimate candidate tickets in hours. Prepare detailed briefs when needed; record provisional estimates as provisional and refine them before implementation, preserving the original.
5. Check that the total fits capacity including learning, tests, review and debugging. Several tickets are allowed, but one is enough when that is the realistic capacity. Split oversized work rather than requiring 2–4 tickets.
6. Record the agreed plan, known risks and unknowns in `../../work/sprints/sprint-template.md` format. Include readiness dependencies discovered by Codex; do not conceal missing prerequisites as technical traps.

The learner owns the estimate; Codex may question an obvious inconsistency but must not replace it with its own estimate. Use hour ranges from the capacity policy, not story points or a second mandatory sizing scale. Once agreed, preserve the original plan and append dated changes with reasons.

## During the iteration

On a start/resume request, identify the sprint, active ticket and phase through `../learning/current-state.md`. Continue unfinished work before selecting new work. Act as PO for requirements, Tech Lead for Design Review of risky changes, and reviewer after implementation; preserve the ticket's confirmed work split.

At a session boundary or reported change, record the actual state, blockers and next action. Do not require daily reports or stand-ups.

If work is blocked or likely to miss the week, surface the risk and ask what caused it. Record the learner's explanation, remaining work and a decision to clarify, split, reduce agreed scope explicitly or carry over. Never silently rewrite scope or classify unfinished acceptance criteria as completed.

For a requirement change, record the Product Owner's business reason, original agreement, new agreement, impact on scope/estimate/architecture/Sprint Goal and carry-over decision. The learner assesses the impact before the plan changes. Do not introduce changes merely to create a learning exercise.

A new calendar week does not complete the old sprint automatically. If its review is missing, perform it before planning new commitments, using recorded results. Reuse an existing review/retro rather than repeating it; resolve only missing information. Do not invent hours, completion percentages or reasons for an absence. A long pause does not create a backlog of fictional sprints or an obligation to catch up on missed hours.

## Sprint review

- Demo or inspect delivered functionality and link validation/review evidence.
- Compare planned and delivered outcomes, including unplanned work.
- Assess whether the Sprint Goal was met separately from each ticket's completion under `definition-of-done.md`.
- Compare original estimates with actual time only where an estimate was recorded before work. Mark missing estimates as unavailable.
- List unfinished work, its remaining scope and blockers. Partial progress does not satisfy the ticket's definition of done.

## Retrospective and carry-over

Record what helped, what slowed progress, estimation errors and one concrete teaching or engineering/process change for the next week. Review retention from the local ledger under `.skills/sprint-retro`, counting natural practice and identifying useful future task opportunities. An extra learner recap is optional at a suitable pause; do not replace a request to continue coding with a retention interview. If a material cause is unknown, ask rather than assuming lack of effort or understanding.

Carry over only with an explicit reason and a recorded decision; keep the original ticket, estimate and spent time. Record a new remaining-work estimate separately, and include it in the next week's capacity. Do not retroactively reduce the original commitment to make the sprint appear successful.

Missing a ticket is not automatically a failed sprint. Assess the business goal honestly, understand the cause and use it in planning. Deadline pressure does not relax the learning contract or definition of done.

Update the sprint record, capacity tracking, learning log, skills matrix and `current-state.md` from demonstrated evidence. Only then mark the iteration closed. Do not upgrade a skill merely because the sprint finished.

Do not use story points, velocity, mandatory daily stand-ups or a minimum number of hours per day. Track real time; do not pad hours to meet a quota.

## Jira operational board

Jira is the operational board when the selected ticket route uses it and the Atlassian integration is available. Use the simple workflow `To Do → In Progress → In Review → Done` for backlog, priorities, sprint membership, ticket status, blockers, visible acceptance criteria and meaningful operational comments. Keep learning goals, recall records and AI modes in the repository and learning conversation; do not copy solution hints into Jira.

Repository documents remain the source of truth for learning behaviour, curriculum, learner state, architecture, ADRs and detailed learning evidence. Jira does not replace them. When a ticket exists in both places, record the stable Jira key in the repository ticket and avoid copying long learning records into Jira.

Do not create a Jira issue merely because a possible task was imagined. For an accepted candidate whose route uses Jira, create its issue with the visible scope, assign it to the active sprint and report its key before implementation starts; refine its description and estimate as those are agreed. Update Jira after meaningful operational changes: agreed scope, start, blocker, review, completion or carry-over. Short just-in-time tickets may remain repository-local even when Jira is available. For that route or when Jira is unavailable, use `work/tickets/` and `work/sprints/` as the operational representation and record the choice or fallback in the ticket.

## GitHub, pull requests and CI

For the branch/PR route, follow: Jira issue (or repository-local ticket) → learner-proposed branch name → implementation → coherent learner-written commits → self-review → pull request → CI → review → learner-owned fixes → approval → merge → ticket Done. For the small-ticket direct/local route, omit the separate branch, PR and merge, not relevant checks or required review; mark Jira Done only when a Jira issue exists. Git execution still requires explicit permission.

When GitHub is callable, use its repository context, branch, pull request, review comments, CI status and GitHub Actions output as applicable to the selected route. GitHub does not authorize writing learner-owned implementation or bypassing AI modes. While Git workflow skills are new and the route uses a branch/PR, ask the learner to propose the branch name, PR title and concise description first; review one concrete issue at a time; examples are available on request. Reduce prompts from recorded evidence.

The project CI configuration defines its required checks. Current CI runs the API TypeScript build because the repository currently provides no lint or test scripts. Add lint and test checks when corresponding project scripts exist; do not claim checks that the project cannot run. A red required CI check blocks Done.

For failing CI, apply `.skills/debugging-incident`: first inspect the failing step and error, state a possible cause and localize it, then fix. When GitHub is unavailable, inspect local Git state, `git diff`, the relevant local command output and repository review records. Continue learning rather than waiting for a plugin.
