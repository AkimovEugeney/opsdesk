# OPS-017 independent Code Review

- Date: 2026-10-26.
- Reviewer: independent agent with clean context, explicitly authorized by the learner; no implementation participation. Report transcribed by the coordinating chat.
- Outcome: **no open BLOCKER**. Required independent review gate satisfied for the inspected source and bounded evidence. This does not mark OPS-017 Done.
- Permissions: reviewer performed read-only inspection, no-emit type checking, existing tests and in-memory probes. No file, database, Git or external-task changes. Coordinating chat records this report and process pointers only; user requires fresh permission before any further code change.

## Scope and concrete risks

Reviewed baseline `247a699` through HEAD `13e482a` plus current working tree: controller/service/repository, DTO, schema/migration, generated Prisma changes, shared auth async cleanup, latest global/local validation settings, all untracked HTTP harness/reports, ticket/requirements/plan and process documents. Followed AGENTS.md, apps/api/AGENTS.md, code-review.md, implementation-review/SKILL.md, definition-of-done.md and commit-messages.md.

Independent review is required because a guessed foreign parent could expose another customer's history, forged author/parent input could misattribute an update, persistent changes could lose existing records, and shared validation could regress existing search/login/write consumers.

## Correctness and maintainability assessment

- Publish role check precedes parent lookup; actual author is taken from the session. Closed, unassigned and other-owned appeals are not incorrectly excluded. Client history uses the existing caller-scoped parent lookup, with identical foreign/missing 404 handling.
- Repository projects required update fields and author name only; ordering is createdAt ascending then id ascending. Creation takes parent from the route and author from authenticated context, uses a server default creation time and does not modify appeal state.
- Migration adds a table and restrictive foreign keys without deleting or transforming existing records. Generated model agrees with schema. The ownedAppeals to ownerAppeals Prisma relation rename does not alter database columns and has no remaining application consumer of the old property.
- Append-only insertion needs no retry-deduplication transaction under this explicit contract: repeated requests are separate updates. Current API has no concurrent customer-ownership transfer or appeal-deletion operation creating an uncovered lookup/insert correctness requirement.
- Async cleanup retains lookup waits, logout sequencing and local P2025 translation. Controller promise returns remain within Nest handling.
- Controller, service and repository have readable responsibilities: HTTP boundary, access/application sequence, queries/projections. Shared lookup and constructor injection remain simple. Additional services, repository abstractions, class splitting or extraction of a short repeated projection have no demonstrated benefit at this scale. Existing naming/whitespace nits are optional cosmetics.
- Default-false global transformation with explicit ParseIntPipe and positive-int32 validation is supported by Nest. Local string conversion of search preserves existing repeated-query behavior. Parameter DTOs are a valid alternative, not a required rewrite.
- Installed Nest 11.2.5 plus whitelist validation retains DTO trims and strips extra fields while returning a plain object when transform is omitted. Current consumers do not require DTO class methods or identity. This installed behavior was inspected and probed; the finding is not a general promise about all framework versions or configuration combinations. Rationale is already in the ticket; restoring a removed comment is not a requirement.

## Nonblocking finding

**IMPROVEMENT — search-regression oracle can pass on an always-empty response.**

- Location: `apps/api/test/ops017-http-validation.ts:470` (search checks around lines 470–479).
- Scenario: scalar search uses a predicate over returned rows and repeated/coerced search compares two responses. An implementation that always returns [] can satisfy those assertions.
- Consequence: limited evidence for that search regression, not an observed application search defect. Local query conversion was separately inspected/probed and feature access has its own nonempty fixtures.
- Optional improvement if the harness is extended: use a known matching active fixture, assert its exact id is present and a known nonmatching fixture is absent.
- The harness was authored by Codex. This limitation is not learner error or learning-gap evidence. No test or application edit was authorized or applied during review.

## Verification and source identity

| Check | Result / evidence |
|---|---|
| Existing service tests, independently executed | `node --test -r ts-node/register test/appeals.service.test.ts`: 10 PASS, exit 0 |
| Types, independently executed without build output | TypeScript build configuration with `--noEmit --incremental false`: exit 0 |
| Installed-framework in-memory probes | PASS: omitted/explicit-false equivalence; DTO trim/whitelist/invalid values; exponent/hex/fraction/range id rejection; leading-zero id; repeated-search conversion |
| Real HTTP behavior | Reused producer's inspected 208 PASS / 0 FAIL, exit 0; not rerun by reviewer |
| Migration/persistence | Inspected synthetic pre-migration preservation, complete API process exit/restart (PID 24664/27852), exact history/storage comparisons and verified disposable-database cleanup |
| Historical failures | 147/20 and 159/25 retained in attempt reports; final pass supersedes those runs for the tested implementation |

HTTP report source hash: `47963f9ee215a29e72bade611ec1841757ade52fcb2673df659cc8570f647234`.

Current hash of the same ordered source-file list: `40fa097872f5f5a07fbbaa0516aea4159808137ae5e76c09cce34db2f3e23808`.

The learner subsequently removed the main.ts comment and explicit `transform: false`, leaving the default false. Reviewer reconstructed only those two lines **in memory**, preserving CRLF, and exactly recovered the report hash. This fully explains the difference among the listed source files. Omitted/default-false equivalence was also executed in memory. The current bytes have not had a new HTTP run; reuse is justified by this checked equivalent edit, not by claiming a matching hash.

Harness hash independently matches `8046d99d92e68afce14a6e8a1fac846998867821c789b0ca4f69abf52eac757f`.

Limits: the source hash covers report.sourceFiles, not the entire delivery set; the full delivery set was separately inspected. Fresh dist ownership relies on the producer's preceding successful build, not a freshness check inside the harness. Migration evidence uses repository SQL rather than simulating the Prisma deployment ledger. Historical migration execution in the working database is not reconstructed. No reviewer HTTP, DB, build-output or source modification is claimed.

## Framework sources and engineering judgment

- [Nest explicit conversion](https://docs.nestjs.com/techniques/validation#explicit-conversion): documents ParseIntPipe/ParseBoolPipe with automatic transformation disabled. This supports the present approach without making either it or a DTO approach universal.
- [Nest pipes](https://docs.nestjs.com/pipes): parameter-scoped parsing and validation are framework-supported boundaries.
- [Nest 11.2.5 ValidationPipe source](https://github.com/nestjs/nest/blob/v11.2.5/packages/common/pipes/validation.pipe.ts) and [ParseIntPipe source](https://github.com/nestjs/nest/blob/v11.2.5/packages/common/pipes/parse-int.pipe.ts): version-specific source agrees with installed implementation; automatic primitive number conversion is distinct from validation of raw URL spelling.
- [Nest guards](https://docs.nestjs.com/guards) and [asynchronous controllers](https://docs.nestjs.com/controllers#asynchronicity): global session boundary and returning promises agree with current handlers and reused HTTP evidence. Reviewer could not load the separate request-lifecycle page; no claim that it was consulted successfully.

Research conclusion: numeric coercion accepts exponent notation because it is valid numeric syntax, whereas this ticket chooses decimal integer URL ids. Strict URL spelling therefore needs validation before coercion. For OpsDesk's few id parameters, existing explicit pipes are an understandable implementation. Global or local DTO transformation remains available when DTO instances or more involved parameter validation have a concrete consumer need; a new abstraction is unnecessary here.

## Delivery and remaining completion work

Commit 13e482a aligns with the async-refactor purpose. Intermediate checkpoint b21567a includes broader planning records under an explicitly recorded learner request; no history rewrite is required. This review request authorizes no commit/push/merge.

Required independent review is complete with no open BLOCKER. OPS-017 remains In Progress pending remaining DoD reconciliation, including learner-reported actual time (still unknown), final selected delivery/CI evidence and any required learning-record reconciliation. No exam or repetition of prior explanations is required.
