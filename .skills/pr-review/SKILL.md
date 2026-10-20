# Pull request review

Use after self-review at the PR or code-review stage.

1. Choose independent or same-session review using `docs/team/code-review.md` and record the reason.
2. Check the PR title and description: what changed, why, validation and material risks or limitations.
3. Check commit messages and boundaries under `docs/team/commit-messages.md` without proposing the learner's message first.
4. Classify every finding as BLOCKER, IMPROVEMENT or NIT (a question or teaching note may be added); include place, scenario, impact and expected change.
5. Let the learner agree or argue; accept sound arguments. The learner makes learner-owned fixes. Do not require paraphrasing comments. Explain an unfamiliar mechanism when asked or when it blocks the fix.
6. Run one independent pass when `code-review.md` names a concrete material scenario. After fixes, recheck only the changed findings and affected paths; repeat the full pass only for a new material risk. Suggestions do not block delivery.

When GitHub is callable, use the actual PR, review comments and CI state. Otherwise use local diff, branch state and review records. A reviewer behaves like a teammate, not a solution generator.
