# OPS-018 independent Code Review

- Date: 2026-10-26.
- Reviewer: separate read-only agent with clean context, explicitly authorized by learner. Reviewer did not participate in OPS-018 implementation. Coordinating chat transcribes this report.
- Outcome: **no open BLOCKER, IMPROVEMENT or NIT**. Required independent-review gate satisfied for the current source/evidence; OPS-018 is not marked Done.
- Reviewer changed no files, database, secrets or Git state; no source fixes or commit/push are authorized by this review.

## Scope and risks

Reviewed the complete delivery set against HEAD `5e5455b`: application diff, all untracked validation scripts/reports and process records. Followed AGENTS.md, API AGENTS.md, code-review.md, implementation-review/SKILL.md and definition-of-done.md.

Independence is needed for protected operational data and a public read contract, plus a concurrent assignment between summary reads that can distort workload. Valid workflow invariant is NEW without owner and IN_PROGRESS with an OPERATOR owner; category counts must be accurate and mutually consistent.

## Findings and design assessment

No actionable finding remains.

- Controller registers workload before conflicting single-segment detail id. The existing id/updateMessages route has a different segment count and does not intercept workload. Existing routes remain available.
- Service requires both OPERATOR and CAN_MANAGE_APPEALS before reading repository data. Public output is limited to agreed counts and operator id/name/appealsCount. All operators, including managers, duplicate names and zero-load operators remain in the summary.
- Repository passes original PrismaPromise values into one sequential RepeatableRead transaction. Reviewer inspected installed Prisma 7.10.0 promise transaction binding, batch id/isolation propagation and adapter-pg isolation setup. Counts and operator projection therefore participate in the same snapshot; promises are not prematurely awaited or wrapped as ordinary async promises.
- Filtered relation count includes only IN_PROGRESS owned appeals, counts are not multiplied by progress updates, ordering is explicitly id ascending. Under the declared workflow invariant, categories are disjoint and exhaust active appeals.
- Service's derived OperatorWithCount type follows the generated result and explicitly annotates the mapper parameter; no any/cast or duplicate hand-maintained field shape required.
- Current controller/service/repository responsibilities are clear at this scale. No additional layer, custom SQL, schema/index change, new abstraction or naming rewrite is justified by a concrete problem. Code-level operation does not introduce per-operator N+1 requests.

## Independently executed checks

| Check | Result |
|---|---|
| TypeScript build configuration, no output files | `tsc -p tsconfig.build.json --noEmit --incremental false`: exit 0 |
| Existing service suite | 10 PASS / 0 FAIL, exit 0 |
| Whitespace | git diff --check: exit 0; line-ending warnings only |
| Installed implementation | Nest core/common 11.2.5; Prisma client/adapter-pg 7.10.0; actual route discovery/registration and transaction binding inspected |
| Source/test evidence identity | Recomputed ordered source hash and both harness hashes; all match final report |

## Inspected and reused runtime evidence

[Final report](OPS-018-http-validation.json): **30 PASS / 0 FAIL**, producer exit **0**. Coordinator ran freshly compiled actual dist/main.js with real login/session guard, Prisma and PostgreSQL in a uniquely named disposable local database. Reviewer inspected both [parent harness](../validation/OPS-018-http-validation.ts) and [probe runner](../validation/OPS-018-probe-server.ts) fully; reviewer did not rerun DB tests.

The deterministic concurrency evidence is persuasive:

- Driver wrapper is temporary and process-scoped; SQL, parameters and real database results are forwarded unchanged. It pauses after completion of the actual second Appeal COUNT.
- Count1/count2/operator query share PostgreSQL backend **667**, with RepeatableRead and an open transaction; pg_stat_activity independently confirms idle in transaction in the exact temporary database at the pause.
- Assignment executes through another real HTTP request/backend and its committed state is independently read before release. Actual assignment commits while the read snapshot remains open.
- Current response retains exact pre-assignment counts: total 7 / unassigned 3, operator41 count 2. Next GET returns total 7 / unassigned 2, operator41 count 3. Both full operator arrays and safe fields are asserted, not only arithmetic equality.
- Separate explicit ReadCommitted SQL negative control reproduces original mixed-read defect: total **8**, component sum **9**. It does not change application isolation or source. Expected control failure is correctly reported as a successful sensitivity check, not a new application failure.
- Both runs stopped owned API processes/connections, dropped their exact generated DB and verified absence. Working DB was not queried or mutated.

Identity:

- Source SHA-256: `f7a8ae53933c5eb2f69c0c8b6e4e63393faecb6370466b9edc158a3eca4c2884` (ordered complete source/config list in report; unchanged throughout run).
- Harness SHA-256: `f58391ce21ad838643c4220c070d2d5abcc0a4a8692b656255a414d3c8584f8b`.
- Probe runner SHA-256: `8c25fd54835f3d05f567a57c472c5112de23318488c5a568fe26fc9903a5d9f8`.
- Owned Node API pid: 3864. Dist entry point/controller/service/repository fingerprints and actual dependency versions are recorded in the final report.

Limits are explicit: full DB run was executed by coordinator, reviewed rather than rerun independently. Runtime dependencies are local installed versions; no CI run for this uncommitted change is claimed. Migrations initialize the disposable DB by repository SQL without a deployment-ledger simulation. This is a functional/concurrency matrix, not a load benchmark.

The no-operator/no-appeal case was checked using the actual repository on an empty real database. A real authorized OPERATOR cannot coexist with zero operators, so an HTTP200 fixture for that state is unreachable under current authentication. Prior service empty mapping and full real HTTP zero-appeal/existing-operator checks provide the appropriate separated evidence; no fake actor headers were used to claim full empty-DB HTTP validation.

First report [attempt 1](OPS-018-http-validation-attempt-1.json) had 30 successful assertions, but a recorded expected-state object was later mutated during negative-control fixture setup. Coordinator preserved it, cloned final captured state and reran. The final report supersedes that artifact. This is a mentor-owned evidence bug, not a learner implementation/knowledge finding.

## Primary references

- [Nest v11 route order](https://docs.nestjs.com/v11/controllers#route-parameters), [global guards](https://docs.nestjs.com/guards): match installed source and exercised real access boundary.
- [Prisma v7 transactions](https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions), [filtered relation counts](https://www.prisma.io/docs/orm/v7/prisma-client/queries/aggregation-grouping-summarizing#filter-the-relation-count): agree with generated/installed APIs and explicit selections.
- [PostgreSQL 16 Repeatable Read](https://www.postgresql.org/docs/16/transaction-iso.html#XACT-REPEATABLE-READ): explains the shared read snapshot confirmed by barrier and negative control.

## Remaining completion work

Independent correctness review is complete with no open findings. Actual time remains unknown (estimate 4 h); final delivery/CI and DoD reconciliation remain with the coordinator and learner. No independent transaction mastery is claimed: correction was implemented with guided assistance. No new exam or repeat review is required unless a later material change justifies it.
