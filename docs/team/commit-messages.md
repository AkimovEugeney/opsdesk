# Commit message training

The learner writes the message first. Codex reviews the diff and gives one hint; it provides an example only after an attempt. A suggested message without an explanation does not confirm Git skill.

## Message

Prefer Conventional Commits when appropriate:

    type(scope): meaningful change

Types: feat (capability), fix (bug), refactor (internal structure), test, docs, chore (maintenance), perf (performance). Use a scope only when it clarifies the affected feature or module.

Use a short imperative subject that describes the meaningful result or responsibility. Avoid “update”, “changes”, “done”, or a ticket number without a summary.

Examples: feat(appeals): add appeal details page; fix(auth): prevent redirect loop after logout; refactor(appeals): extract status transition logic.

## Boundaries

One commit is one coherent, reviewable thought. Keep dependent changes together when splitting would make a commit incomplete or untestable. Split independent behaviours, unrelated refactoring, documentation or separable tests when that improves review or revertability. Do not make mechanical micro-commits for trivial edits. A single clean commit is valid for one bounded change.

Before a PR, when one is used, the learner explains the number and grouping of commits. The reviewer checks purpose, diff alignment and absence of unrelated changes.

## Timing

While Git is UNKNOWN, NEW or PRACTICING, Codex explicitly marks:

- **Time to commit:** a coherent change is complete and its checks pass; ask for the learner's message.
- **Too early:** the diff is an incomplete fragment, not yet checkable or unclear in intent; name what boundary is missing.
- **Too late:** independent changes are mixed; ask the learner how to split them and preserve dependencies.

Natural boundaries include a completed vertical behavior, separately validated bug fix, isolated refactor, documentation change or focused test change. Ask before switching to unrelated work or starting a risky follow-up.

Do not ask after every edit, during an unfinished learning block or merely because time passed. Do not wait for the whole ticket when independently reviewable work is ready.

## Small-ticket delivery

For a short, bounded learning ticket, use one coherent commit directly on the current branch after the checks pass. Ask the learner for the commit message and its rationale; this is useful Git practice. A separate branch, PR and merge phase are not required for that ticket. Do not turn Git ceremony into part of every 15–20 minute exercise.
