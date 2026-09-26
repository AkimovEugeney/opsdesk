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

Keep independent process/teaching-policy documentation changes separate from feature commits by default; ticket-specific evidence may accompany the feature. Record a reason for any deliberate exception rather than silently mixing scopes.

Before a PR, when one is used, review the learner's explanation of the number and grouping of commits; reuse an explanation already demonstrated rather than asking for repetition. The reviewer checks purpose, diff alignment and absence of unrelated changes.

## Permission

A proposed message, its rationale, passing checks or an approved delivery route does not authorize Git execution. Obtain explicit permission for the intended staging, commit, push, merge or history-changing operation. A review/audit request grants none, and an unauthorized commit must not be reset, reverted or rewritten without separate permission. “Time to commit” below is a readiness signal, not authorization.

## Timing

While Git is UNKNOWN, NEW or PRACTICING, Codex explicitly marks:

- **Time to commit:** a coherent change is complete and its checks pass; ask for the learner's message.
- **Too early:** the diff is an incomplete fragment, not yet checkable or unclear in intent; name what boundary is missing.
- **Too late:** independent changes are mixed; ask the learner how to split them and preserve dependencies.

Natural boundaries include a completed vertical behavior, separately validated bug fix, isolated refactor, documentation change or focused test change. Ask before switching to unrelated work or starting a risky follow-up.

Do not ask after every edit, during an unfinished learning block or merely because time passed. Do not wait for the whole ticket when independently reviewable work is ready.

## Small-ticket delivery

For a short, bounded learning ticket, select and record the direct/local route once: one coherent commit on the current branch after the checks and required review pass, executed only with explicit permission. Ask the learner for the commit message and its rationale if not already demonstrated; this is useful Git practice, not a mandatory recital. A separate branch, PR and merge phase are not required, and short just-in-time tickets may remain repository-local without Jira. This route does not waive `code-review.md` or `definition-of-done.md`. Do not turn Git ceremony into part of every 15–20 minute exercise.
