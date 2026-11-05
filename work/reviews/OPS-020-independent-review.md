# OPS-020 independent focused review — 2026-11-05

Verdict: PASS. No blocking or substantive non-blocking findings in the reviewed change.

## Scope and risk

Independent reviewer context inspected the ticket, requirements log, full API diff and current controller, query DTO, service, repository, session guard and guard registration. The reviewed risk is disclosure of another customer's completed appeals through filtering or an untrusted continuation, with operator ordering and existing-list regressions in scope. No application files were edited.

- CLIENT queries derive clientId exclusively from the authenticated user. The clientId, CLOSED predicate and search remain top-level AND constraints around the cursor OR. Foreign, operator or forged cursors can change the requested boundary but cannot widen ownership or status visibility.
- OPERATOR closed queries select CLOSED across customers and project the stored outcome. Ordering by constant status followed by createdAt descending and id descending is equivalent to the accepted date/id order; the extra status sort is not a defect.
- Closed continuations use the date/id parser and matching strict lexicographic predicate. Existing operator lists retain the status-aware parser, predicate and cursor payload. Pagination retains limit + 1 lookahead and emits no continuation for terminal or empty pages.
- The concrete query DTO rejects supplied filter values outside closed; the controller forwards it to the role-specific service paths. The existing global session guard remains in place. Both role projections include outcome for the completed view; client projection does not add foreign customer data.
- New repository/service code follows the neighbouring list paths without adding storage, dependencies or unrelated refactoring.

## Evidence and limitations

Reviewed [saved HTTP/PostgreSQL acceptance](../validation/OPS-020-http-validation.json): 49/49 checks, including 44 functional checks and five cleanup/source-integrity checks, with 126 list-page requests. Evidence includes exact ordered walks, tied timestamps, search with pagination, both roles, outcomes, empty/terminal pages, invalid filter/cursor handling, unauthenticated access and foreign-cursor ownership isolation. Every sourceAfter file hash was independently compared with the current workspace: no mismatches. Build/type-check and ten existing write-flow tests were reported by the parent reviewer; this independent pass did not rerun runtime checks or infer new learner skill from them.

Framework compatibility was checked against installed Nest 11 ValidationPipe implementation (plainToInstance followed by class-validator validation), installed IsIn/IsOptional implementations and local APP_GUARD registration. Official online Nest documentation was not fetched in this pass because external network calls were explicitly excluded after prior service timeouts. Relevant reference pages are [Validation](https://docs.nestjs.com/techniques/validation) and [Guards](https://docs.nestjs.com/guards); these links are reference pointers, not a claim that their current content was accessed. No new framework mechanism or framework refactor is proposed.

The acceptance harness remains bounded manual evidence rather than maintained CI coverage. This review clears the independent correctness/access review gate for the inspected code state; overall ticket closure remains the owning session's Definition of Done decision.
