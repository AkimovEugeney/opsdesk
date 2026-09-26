# Mentoring session audit — 2026-09-23

Status: the learner approved all three correction groups with "погнали"; documentation corrections are applied. This approval does not authorize application-code changes, commits, resets or waived acceptance criteria.

## Scope and evidence

- The learner reports 3 h 30 min total, approximately 1 h 30 min useful implementation/review/learning and 2 h mentor friction. These are learner estimates, not instrumented timings; diff size alone is not a measure of learning.
- Read-only documentation audit covered 54 unique documents: 53 Markdown files and `docs/learning/learning-state.json`, 2701 lines at audit time. Coverage: root and app AGENTS, docs, work Markdown and six repository skill guides. No README was present. Dependencies, generated source, secrets and the ledger lock file were excluded.
- Inventory and detailed findings: `C:/professional-learn/opsdesk-audit-docs.json` (outside the repository). Parent verification confirmed 54 unique existing paths and the recorded line total.
- Session analysis uses the supplied conversation. Document conclusions were cross-checked against the current contract, workflow, review policy, skills matrix and current-state file. This is a process audit, not a new independent application security review.
- Git inspection confirms commit `ca34f58` exists and closure records remain modified. No new commit, staging, reset or application-code edit was made during this audit.

## Findings from the conversation

### 1. Commit attribution correction and mixed scope

Correction to this audit's first version: the transcript contains the learner's explicit "комить" immediately before `ca34f58` was created. The commit was authorized; the claim that it was executed instead of an audit request was incorrect. The later audit request was separate. Preserve the commit. The actual delivery concern is scope: independent process-document changes were mixed into the auth feature commit, and completion records were edited after committing, leaving another dirty state. Approval of this documentation correction does not authorize further Git operations.

### 2. Repeated questions replaced learning

The learner already predicted expiry rejection and unchanged activity. Repeated demands to restate `lastActivityAt` added no demonstrated learning. A short case list became a long fill-in form, and the assistant explained the commit grouping before asking the learner to repeat it. Existing `learning-contract.md:17-23` and `understanding-check.md:3-7` already prohibit this pattern. The main failure was applying the rules, not a missing rule.

### 3. The mentor defended a decision before teaching it

For `200` versus `201`, the assistant invoked PO authority and disputed authorship before answering why Nest returned `201`. The appropriate first explanation was: both are success statuses; Nest defaults POST to `201`; the documented login contract uses `200`; an override aligns that contract, not a security fix. A generated requirements log is not stronger evidence of learner authorship than the learner's explicit objection.

The earlier claim that `201` requires a Location header was incorrect: RFC 9110 section 15.3.2 permits identifying the created resource by the target URI when Location is absent. OAuth token responses do not establish a mandatory status for this cookie-session API.

### 4. An invented root cause caused an unnecessary learner edit

The assistant said `@Post` must precede `@HttpCode` to make the override work. In the installed Nest implementation they write different metadata keys. This audit invoked the two decorators in both orders: both produced `HTTP_CODE_METADATA=200`. The supplied process output instead shows the old listening PID and the replacement failing with `EADDRINUSE`. A startup log alone did not establish readiness. Changing the decorator order was not the demonstrated fix.

### 5. Validation mechanics created false failures and false confidence

- Fixture password extraction included its delimiters; a supposed valid login was actually sent with the wrong password.
- The first expiry script interpolated an identifier before login; some updates targeted no row or an earlier session rather than the tested session. Setup results were hidden.
- Builds piped through `tail` reported the pipeline/filter status rather than reliably preserving the build status.
- A compile-only probe was described as protecting against an emitted CommonJS runtime-import failure, although `--noEmit` cannot execute that failure path.
- Temporary probes were created/deleted in the studied source tree despite the requested scope, and one was itself syntactically invalid.
- Raw seed reads/diffs exposed fixture password material in tool output despite the explicit prohibition. Do not reproduce the values in this report.

The remedy is fewer reliable, batched checks with assertions, not abandoning validation or asking the learner to debug mentor tooling.

### 6. Completion claims exceeded the observed evidence

The record reports Done/full validation, but the supplied execution does not demonstrate HTTP login for all three fixture users, the appeal-detail regression case or a complete secret-in-logs check. Checking three password hashes is not three successful HTTP logins. Ordinary `git diff --check` did not inspect untracked auth files; the later staged check failed on generated whitespace and was bypassed, so the claim that the committed set was clean is not supported.

The review called activity races benign without testing or bounding delays. A read/check followed by an unconditional update deserves examination under delayed/concurrent requests; lack of a concurrency test is not evidence of negligible impact. `request.cookies` also crosses an untyped runtime boundary; a TypeScript annotation does not establish the runtime value is a string. These are follow-up review candidates, not defects claimed reproduced by this audit.

### 7. Evidence and state were overstated or duplicated

Parts of the case matrix and expected results were supplied by the mentor but the combined ledger entry was marked independent. Record assistance per demonstrated episode; do not silently rewrite immutable history. Repeated reports of the same result are not new practice. Multiple copies of status drifted while repeatedly rewriting them consumed time.

## Research and limits

1. [NSW CESE: Cognitive load theory in practice](https://education.nsw.gov.au/about-us/education-data-and-research/cese/publications/practical-guides-for-educators/cognitive-load-theory-in-practice): tailor to prior knowledge, use worked examples, gradually remove guidance, cut inessential content and present essential information together.
2. [IES/WWC: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/practiceguide/1): alternate worked examples with problem solving, connect concrete and abstract representations, use retrieval and delayed review.
3. [AERO: Managing cognitive load optimises learning](https://www.edresearch.edu.au/summaries-explainers/explainers/managing-cognitive-load-optimises-learning): small coherent chunks, explicit guidance, feedback and spaced varied practice; gradually reduce scaffolding.
4. [RFC 9110, 201 Created](https://www.rfc-editor.org/rfc/rfc9110#section-15.3.2): corrects the Location-header claim.

These sources concern learning broadly, substantially in school contexts; they do not directly validate AI pair-programming or a promised speedup. The proposed OpsDesk workflow is a practical adaptation to the learner's feedback. Retrieval practice is not a justification for repeatedly demanding the same sentence in one exchange. Removing friction must not remove relevant safety checks or substitute generated answers for learner reasoning.

## Documentation inconsistencies

| Area | Evidence | Minimal resolution proposed |
|---|---|---|
| Delivery | `docs/team/workflow.md:3-12,66-70` mandates branch/PR/Jira; `commit-messages.md:35-37` and `task-manager.md:38` allow direct/local small tickets; DoD requires a PR unconditionally | Document one explicit route and make PR/Jira requirements conditional; permission for Git operations remains separate |
| Review independence | `code-review.md:11-15` requires independent review for new business logic/DB, while OPS-006 records same-session and leaves review decision pending | Resolve the exception explicitly; never call same-session review independent or waive auth review for speed |
| Decision ownership | `skills-matrix.md:61`, architecture principles and API rules demand first proposals; `task-manager.md:42` gives untaught policy decisions to mentor/PO | Teach first; novice does not invent business policy; critical reasoning is still learner-owned once taught |
| Repeated checking | `.skills/implementation-review/SKILL.md:5`, `.skills/pr-review/SKILL.md:9`, `code-review.md:5` prompt mandatory explanations; understanding-check allows zero extra questions | Reuse observed evidence; ask only a material missing question |
| Stale status | `current-state.md:13` says capacity/estimate unconfirmed; Sprint 2 has them; capacity actual is zero while ticket has 3 h 30 min; ticket SQL/review fields remain pending | Reconcile facts once; keep current-state a short pointer rather than a duplicate history |
| Links | Audit found five broken relative links among 55 checked, all in current-state | Correct links to `../../work/sprints/...` and `../../work/tickets/...`; no product change |
| Technical history | Requirements log mixes credential format with transport, and calls 30–60 minutes the OWASP range despite an earlier 15–30 citation | Append sourced corrections; do not erase earlier proposals or infer acceptance |

## Approved changes — three groups only

### A. Teach once, then use the answer

Owner documents: learning-contract, hint-policy and understanding-check. Local guides reference these rather than restating stricter rules.

- Default handoff: a short principle, one concrete example only when new, 2–4 connected actions, one observable result. This is a default, not a hard word limit when the learner asks for depth.
- Direct questions receive direct explanations, not a request to guess an API or justify a policy.
- Accept correct informal answers and references to earlier cases. At most one clarification for a genuine unresolved misconception; stop once demonstrated. Zero extra closing questions is valid.
- For learning: the learner writes the studied logic and predicts behavior; syntax and routine mechanics remain reference/mentor work. Revisit important concepts later on changed conditions, not through repeated wording now.

### B. Make verification reliable and bounded

Owner documents: debugging guide, code-review and DoD; operational recipes live in the mentoring skill rather than every ticket.

- Batch independent reads/checks and run a repeatable check set once per relevant code state; rerun only affected cases unless integration changes justify more.
- Preserve real exit codes, verify the listening process/build and assert fixture preconditions and affected rows. Runtime readiness is an HTTP observation plus process ownership, not a startup string.
- Use allowlisted outputs; never print credential-bearing files, diffs, raw headers or cookie jars. Keep throwaway probes outside studied source with a suitable explicit config; runtime claims need runtime execution.
- Keep a compact acceptance matrix: criterion, observed result, evidence, remaining gap. Do not close a ticket with an untested named criterion or an unfulfilled required review.

### C. One consistent process and factual handoff

Owner documents: task-manager, workflow, code-review, DoD, commit-messages and current-state.

- A review/audit request never authorizes staging or committing. Keep feature changes separate from independent teaching-policy changes; never repair unauthorized history without permission.
- Make branch/PR/Jira conditional on the selected ticket route while preserving risk-based review requirements. Select the route once, not at every micro-step.
- Record product decisions in the requirements log, evidence in the ledger and a compact validation table, current phase/next action in current-state. Link rather than repeat detailed narratives.
- Reconcile the concrete stale fields/links above. Keep the learner's reported total and friction breakdown, do not infer duration from line counts.

## Acceptance for the next session

- No opening quiz; resume the verified next step.
- No re-asking an already correct answer; one complete artifact per handoff rather than one line per turn.
- One relevant validation batch after a learner artifact, with actual statuses and no secret values in output.
- No unsupported root-cause statements or unrelated Git actions.
- Session-end record names what was implemented, what was actually checked and what remains. Compare perceived friction with this session without promising a fixed speedup.

## Actions in this audit

- Corrected factual/behavioral defects in the external `training-repo-mentoring` skill: removed mandatory decorator-order advice and mandatory fill-in matrices, aligned zero-extra-question behavior with the repository, and reinforced existing permission/evidence/secret-handling constraints.
- Saved this report and inventory; after learner approval, reconciled learning rules, phase guides, workflow, review/Done policy and factual state. Application code and Git history were not changed.
- Corrected this audit's own false unauthorized-commit claim against the actual user message. Generic action-specific permission rules remain valid.
- The three groups were approved together; no per-file approval ceremony or extra learner quiz is required.
