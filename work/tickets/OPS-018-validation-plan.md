# OPS-018 real behavior validation plan

- Prepared and executed: 2026-10-26. Learner explicitly authorized independent review and tests in response to the pending combined permission request.
- Final result: 30 PASS / 0 FAIL, producer exit 0; see OPS-018-http-validation.json and OPS-018-independent-review.md. Both temporary databases removed and cleanup verified. Working database untouched.

## Isolated execution boundary

Use a uniquely named disposable local PostgreSQL database with repository migrations and synthetic fixtures only, an owned API instance on a free loopback port and process-local connection configuration. Do not modify application source, dependency/configuration files, the working database, secrets, Git or existing shared services. Validation-only temporary scripts may be prepared outside studied source; final safe evidence belongs to the ticket. Never use the working database as a fallback.

The requested permission covers creation of that disposable database, migrations there, synthetic user/session/appeal/update records, login/session writes, workload reads and existing assignment/reassignment/closing requests there, plus closing owned connections/processes and dropping only the verified disposable database. Do not print credentials, cookies or connection strings.

## Cases

| Case | Required observation |
|---|---|
| Exact nonempty summary | Known NEW/IN_PROGRESS/CLOSED appeals across customers/operators produce exact total, NEW/unassigned and per-operator IN_PROGRESS counts |
| Operator identity/order | All operators included regardless of management permission, including a zero-load operator; duplicate names remain separate ids; ids ascend |
| Projection | Only the agreed counts and operator id/name/count fields; no customer, password, email, session or permission fields |
| Role/session boundary | Manager gets 200; CLIENT (including adversarial management permission) and nonmanager OPERATOR get 403 without data; absent/invalid/expired session gets 401 through actual guard |
| Empty data | Operators with no appeals have zero counts; no operators/appeals yields [] and zeros |
| Updates do not inflate load | Several progress updates on the same appeal leave all workload counts unchanged |
| Existing mutations reflected | Assignment, reassignment and closure produce exact subsequent summary counts, preserving valid status/owner transitions and recorded outcome/history |
| Concurrent assignment/read | Exercise existing assignment while reading workload and verify accurate, mutually consistent response components under the shared RepeatableRead snapshot; record the exact orchestration and limits of the concurrency evidence |
| Regression | Existing detail/id handling and the write flows used above continue to work; reuse unchanged passing service/type evidence |
| Cleanup | Owned API/fixture connections close; exact generated temporary DB is dropped and its absence verified |

Capture source/runtime/dependency identity, fixture preconditions, expected/actual case observations, producer exit status and cleanup result. Existing service tests and isolated stub-backed HTTP checks are useful partial evidence, not a substitute for this run. Required independent review remains after final behavior evidence; do not claim Done from preparation or code inspection alone.
