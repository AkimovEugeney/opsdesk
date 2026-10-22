# OPS-015 independent Code Review

- Date: 2026-10-22
- Reviewer: independent review agent; no implementation changes made
- Outcome: no open BLOCKER and no actionable code defect found in the bounded change. This record does not mark the ticket Done.
- Reason for independence: a CLIENT could receive another customer's appeal through list/search or a guessed detail id, exposing protected data or record existence.

## Reviewed delivery set

Inspected the actual working-tree diff in `appeals.controller.ts`, `appeals.service.ts`, `appeals.repository.ts`, the ticket/current-state edits, and all three initially untracked OPS-015 requirements/validation records. Also inspected authentication guard/current-user/session resolution, AppModule/AuthModule/AppealsModule, main bootstrap, id validation, schema/generated query types, neighbouring write methods, service tests and CI configuration. Applied AGENTS.md, apps/api/AGENTS.md, code-review.md and implementation-review/SKILL.md.

Reviewed source snapshot SHA-256: `56c6318bd8b91282c6e959ff4d8d8da5af92e5c31a819cdcaf3af881b5ebf996`. Independently recomputed using the HTTP report's ordered filenames plus raw file bytes; it exactly matches the final 149-case report. The ignored one-off HTTP harness was also inspected: real AppModule, actual login/session cookies, disposable migrated database, nonempty distinct client fixtures, empty client, both operator permission variants, exact expected ids/order, foreign/missing equality and cleanup. The earlier zero-assertion attempt and prior 135/14 result are historical evidence, not unresolved failures of this snapshot.

## Findings and boundary assessment

No BLOCKER, IMPROVEMENT or NIT requiring a code change is raised.

- `apps/api/src/appeals/appeals.controller.ts:14` and `:22`: both read routes receive caller context through the existing authenticated CurrentUser path; caller identity is not taken from query/body. Global SessionGuard remains registered through AuthModule. Existing id pipes remain intact.
- `apps/api/src/appeals/appeals.service.ts:60` and `:88`: explicit CLIENT/OPERATOR dispatch preserves operator reads independently of CAN_MANAGE_APPEALS and fails closed for other roles. Foreign and nonexistent client detail results use one null path and the same neutral 404. The shared operator message is an explicitly accepted product decision, not a contract finding.
- `apps/api/src/appeals/appeals.repository.ts:26` and `:132`: ownership is enforced in both database predicates. The unique-id detail query may include nonunique clientId in installed Prisma 7; a composite unique schema change is unnecessary. Client list includes every status and orders by createdAt/id descending. Selections expose required fields and only the related owner's name; no customer email, password, permissions or foreign appeal details are selected. Optional owner/outcome remain nullable. The extra owner name in a client's list is not forbidden by the ticket and is the same allowed data as the card.
- `apps/api/src/appeals/appeals.repository.ts:48`: operator active-status predicate, projections, ordering and unrestricted detail are retained. Tagged raw-query interpolation keeps search values parameterized. The delegated ESCAPE correction is compatible with PostgreSQL 16 literal LIKE semantics, and both roles' literal wildcard/backslash cases pass in the supplied HTTP evidence.
- Write paths, auth and logout logic have no functional change in this diff. No schema, migration or dependency change is introduced. Existing module boundaries, explicit names and small role dispatch are appropriate to the local module; no tutorial-driven restructuring is warranted. Loading/unmount states do not apply to these backend handlers; empty arrays and errors have actual HTTP evidence.

## Verification and limits

| Check | Evidence/result |
|---|---|
| Client isolation, every status, stable order and projections | Final HTTP report passes; fixture/oracle implementation inspected |
| Client own/foreign/missing details, nullable card values | Final HTTP report passes, including exact neutral 404 bodies |
| Case-insensitive literal search, blank/empty results | Final HTTP report passes for two clients and both operator permission variants |
| Operator active queue and all-status detail | Final HTTP report passes with and without management permission |
| Session rejection and authenticated invalid ids | Final HTTP report passes; guard and pipes inspected |
| Read HTTP matrix | Reused producer's 149 PASS / 0 FAIL; not rerun by independent reviewer; matching source snapshot verified |
| Existing assignment/closing tests | Independently executed `node --test -r ts-node/register test/appeals.service.test.ts`: exit 0, 10 PASS / 0 FAIL |
| Build | Producer's fresh successful build reused; CI workflow requires API build only |
| Whitespace | Independently executed `git diff --check`: exit 0 |
| Learning route | `scripts/learning.py status --intent continue` executed successfully with installed Python executable |

No new write/logout HTTP matrix was executed or claimed. Regression confidence is based on unchanged functional write/auth/logout code, the actual login/guard use in read HTTP validation and the existing ten write-service tests. This is proportionate to the bounded read change; it is not evidence of complete HTTP coverage of writes. Maintained access tests remain a recommended optional follow-up under the explicit ticket decision, not a completion blocker or a required test format.

The initial `pnpm test` launcher could not resolve Corepack's registry request in the restricted environment. The exact configured test program was then executed directly with Node and passed. Python/py Windows aliases were unavailable; the installed interpreter succeeded. Neither issue is a product defect.

## Framework/reference checks

Installed packages inspected: Nest common 11.2.5 and Prisma client 7.10.0 (package ranges target Nest 11 and Prisma 7). Nest declarations confirm APP_GUARD and createParamDecorator APIs. Generated AppealWhereUniqueInput requires id and permits clientId.

- [Nest guards](https://docs.nestjs.com/guards): global guard registration and authenticated request boundaries agree with the existing APP_GUARD wiring. Documentation examples do not require a new folder structure or abstraction.
- [Prisma ORM v7 Client API](https://www.prisma.io/docs/orm/v7/reference/prisma-client-reference#filter-on-non-unique-fields-with-userwhereuniqueinput): a unique identifier can be combined with additional nonunique filters, supporting ownership-scoped detail lookup.
- [PostgreSQL 16 LIKE](https://www.postgresql.org/docs/16/functions-matching.html#FUNCTIONS-LIKE): escape character and literal percent/underscore semantics support the search escaping assessment.
- Official Nest custom-decorator page could not be fetched after two attempts. The existing decorator implementation and installed API declarations were inspected instead; no claim that this page was consulted successfully is made.

## Remaining completion work, separate from code defects

The coordinating chat owns final DoD reconciliation: compact acceptance/evidence mapping, direct/local delivery and review link, actual-time entry (learner has now reported 1.5 h), and assisted learning evidence. Reuse existing demonstrated self-review/design/reaction evidence; no extra quiz or checklist recital is required. This independent review gate is satisfied for the inspected source snapshot. No branch, commit, push, database change or application source edit was performed by this reviewer.
