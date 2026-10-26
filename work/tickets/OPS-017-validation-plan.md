# OPS-017 behavior validation plan

- Prepared: 2026-10-26; not executed.
- Source: `13e482afe098ba42bb425c11ba050e01bbc8d910`; local `origin/master` points to the same commit. No remote fetch performed.
- Routes: POST `/appeals/:id/updateMessage`, GET `/appeals/:id/updateMessages`.
- Request field: `message`. Expected update projection: `id`, `message`, `createdAt`, `author: { name }`.

## Execution boundary — explicitly authorized on 2026-10-26

Execution results and subsequent validation fix are recorded in OPS-017.md. Current HTTP report: 208 PASS / 0 FAIL; independent review remains pending.

Use a uniquely named disposable local PostgreSQL database and an owned API instance on a free local port. Override DATABASE_URL only for the test process; never edit environment files or use the working database as a fallback. Refuse execution if the target is not positively identified as the disposable database. Do not modify application source, commits or existing database records.

The requested permission covers creating the disposable database, applying repository migrations there, inserting synthetic fixtures, real HTTP login/session activity and product writes there, restarting the owned API instance, and dropping only that exact database after closing its connections. Stop and report if the required infrastructure is unavailable; starting/reconfiguring shared services is outside this plan.

Authenticated GET requests are writes to Session.lastActivityAt in this implementation. Login creates sessions; these effects also belong exclusively in the disposable database. Keep credentials, cookies, connection strings and real customer data out of evidence.

## Fixtures and execution

Use two distinct customers, two operators (with/without CAN_MANAGE_APPEALS), active and closed appeals for both customers, an unassigned appeal, an appeal assigned to a different operator, an empty history, and a verified nonexistent positive int32 id. Assert fixture preconditions rather than assuming ids or roles. Use synthetic credentials only.

| Scenario | Required observation |
|---|---|
| Migration with existing data | Apply migrations preceding OPS-017, create synthetic existing users/appeals, snapshot every existing business field, apply the new migration, compare unchanged records/relations and read old appeals over HTTP. This proves preservation for the fixture; it cannot reconstruct the learner's past migration execution. |
| Operator publishing | Both permission variants publish on active and closed appeals, including unassigned/other-owned parents; POST succeeds (current Nest default: 201), GET reads back exact saved content and identity. |
| Attribution/trust boundary | Submit forged authorId, author, createdAt, appealId and id alongside valid message; only session author, URL parent, generated id and server time are stored. Check the other parent remains unchanged. |
| Text acceptance | Trimmed length 1 and 2000 accepted; surrounding whitespace removed; internal whitespace preserved. |
| Text rejection | Missing, null, number, boolean, object, array, empty, whitespace-only and 2001-character trimmed text return 400; compare history before/after to prove no insertion. |
| Client read isolation | Each client reads own active/closed histories; known foreign and nonexistent parents return exactly equal neutral 404 bodies, even if foreign history is nonempty. Operators read either client's history. |
| Client publishing | Valid body/id on own, foreign and missing parents returns the same 403 without insertion or parent disclosure. Invalid-body precedence for clients is not an extra product requirement. |
| Missing parent/empty history | Operator POST/GET missing valid parent returns 404. Readable empty parent returns 200 with exact []. |
| Session and id validation | For both routes, missing/invalid/expired sessions return 401 even with invalid ids or DTO-invalid JSON bodies. Authenticated callers get 400 for text ids, fractions, exponent forms, zero, negatives, int32 overflow and unsafe integers. Use syntactically valid JSON when asserting guard-before-pipe precedence. |
| Projection/order | Exact required public keys, expected author names and parseable server dates; no sensitive user fields. Fixture records with reverse chronological insertion and identical timestamps demonstrate createdAt ascending then id ascending, checked against explicit expected ids. |
| Append-only/status | Repeated valid submissions create distinct ids. Existing messages and all appeal business fields, including status/assignment/outcome, remain unchanged after publishing and rejected requests. |
| Persistence | Save POST response and GET history, fully close the owned application and its DB connections, start a new application instance against the same disposable DB, authenticate again and compare saved ids/content/authors/timestamps. |
| Regressions | Real login/me/logout, existing appeal create/read/list, assignment and closing on dedicated fixtures; verify role restrictions and existing outcomes. Reuse passing checks for the same source state; rerun affected scenarios if source changes. |

Capture case-level PASS/FAIL, expected/actual status and safe response evidence, fixture preconditions, source snapshot, process/build ownership, producer exit status and cleanup result. A startup message or build alone is not a runtime pass. Report failed runs honestly and distinguish a harness defect from an application defect. Do not fix learner code automatically.

## Independent review handoff

After behavior evidence is available, provide an independent reviewer with AGENTS.md, apps/api/AGENTS.md, the ticket and requirements log, actual full delivery diff (baseline `247a699`, head `13e482a`, plus any later working-tree changes/untracked files), build/test evidence and HTTP report. Include generated schema/client changes and shared auth async cleanup, not only the two new handlers. Recheck the source state before handoff.

Risk scenarios: a client guesses a foreign parent and receives customer-visible history; a forged request attributes an update to another author or parent; migration/persistence loses existing appeals or saved updates. Consequences are protected-data disclosure, false attribution and data loss. Review access boundaries, projections, validation precedence, relation/migration safety, ordering, append-only behavior and shared-flow regressions. Consult official framework references under code-review.md. A role switch in this chat does not satisfy independence. No application fixes are authorized by the review request.

Map observed results to acceptance criteria in the ticket. OPS-017 remains In Progress until behavior checks, independent review and remaining Definition of Done requirements are satisfied. Actual time stays unknown until reported by the learner.
