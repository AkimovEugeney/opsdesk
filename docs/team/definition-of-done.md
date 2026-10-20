# Definition of done

A ticket is complete only when:

- every visible acceptance criterion is met and mapped to an actual observed result, evidence and any remaining gap in a compact validation table; failed or untested criteria and unresolved required-review gaps block Done;
- relevant tests pass;
- self-review is complete, reusing demonstrated checks rather than requiring another recital;
- commit messages and boundaries are reviewed under `commit-messages.md`, when the ticket contains commits;
- Code Review under `code-review.md` has no open BLOCKER; the required review type is complete: independent review where required, otherwise same-session Codex review;
- configured required CI checks are green; if the hosting integration is unavailable, equivalent local checks and their output are recorded;
- understanding is evidenced by the learner's own design, code, debugging and reaction to review under `../learning/understanding-check.md`; there is no separate exam and zero extra questions is valid;
- material new learning observations are recorded in the ledger/log once, without duplicate or ceremonial entries;
- actual time is recorded;
- the selected delivery route is recorded: when a PR is used it is reviewed and its description is complete; otherwise scope, validation, risks and review evidence are recorded in the repository ticket. Branch/PR/Jira ceremony is conditional, not the quality gates above.

Evidence must establish the claimed outcome, not merely command launch or a startup message. Preserve the producer's exit status; runtime claims need runtime observations, including process/build ownership and fixture preconditions where relevant. A compile-only check does not prove runtime behavior.

Check the actual delivery set, including untracked/new files omitted by ordinary `git diff`; a clean partial diff is not evidence that the whole change passed. Keep evidence secret-free and name missing coverage in the ticket explicitly. A small-ticket route does not waive acceptance or independent-review gaps.
