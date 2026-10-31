# OPS-019 — partial CLIENT cursor HTTP/PostgreSQL verification

## Outcome

- Final run: **65 PASS / 0 FAIL**, HTTP producer exit **0**, container wrapper exit **0** (terminal-observed).
- Real terminal timestamps: 2026-10-31T16:46:15+0300 → 2026-10-31T16:46:16+0300.
- Source HEAD: `dab0c2469815ec3b65959766c5f487a91e9acb40` plus the existing uncommitted CLIENT implementation. Ticket status is unchanged; this is not full OPS-019 acceptance.
- Fresh `src/main.ts` loaded through standard `ts-node/register`: actual Nest app, login, SessionGuard, Prisma and PostgreSQL. No dist, mocks or replaced query results.
- Compiler: `npm exec -- tsc -p tsconfig.build.json --noEmit --incremental false` in `apps/api`, exit 0. Ordinary permitted npm execution; no security-guard bypass and no emitted build artifacts.
- Existing `npm test` in `apps/api`: **10 passed / 0 failed**, exit 0. This suite covers existing assignment/close service behavior, not cursor integration.

## Isolation and fixtures

- postgres (PostgreSQL) 17.11 (Debian 17.11-1.pgdg13+2); owned `postgres:17` container, immutable pulled digest `sha256:31ba9c94a03ada9988f2bb493a22a75eef3a185884533e5cdbcd498ea835b08f`, tmpfs storage and randomly assigned loopback port.
- Working DB was never connected, queried or written. `.env` was read only programmatically to inspect local connection settings. Once that server proved unavailable, all successful DB activity used the separate owned container, not a restarted working DB.
- 6 exact repository migration SQL files applied in lexical order; no fake Prisma deployment ledger. Verified `createdAt` precision: timestamp without time zone, milliseconds (3).
- 6 synthetic identities with fresh generated Argon2 password hash; login/session writes through actual HTTP authentication. No password/hash/session cookie/connection URL is included in the evidence.
- Initial appeal fixtures: **106**, including 37 primary-customer, 10 interleaved foreign-customer, 3 exact-page-size and 56 maximum-limit fixtures. One additional newer primary-customer row inserted between page requests.
- Primary-customer creation timestamps include **8 equal-time groups**, maximum group size **5**. IDs are intentionally shuffled independently of time.

## Oracle and observed coverage

The independent in-memory fixture oracle filters by synthetic session customer and case-insensitive title, then sorts ISO millisecond timestamps descending and numeric IDs descending. Every page is compared to its exact expected ordered ID slice; complete walks compare full ID arrays and uniqueness. The JSON evidence stores the expected and actual arrays and terminal flags per walk.

Verified default 15, explicit 3, minimum 1 and maximum 50; 61 successful page requests in the final producer. Checked precise `hasMore`, cursor boundary based on last delivered row, last-page `nextCursor=null`, empty client and exact-size result. Full walks cover same-date ties and foreign rows. A newer insert after page one is visible on a fresh first page but does not disturb any original continuation ID. Search is trimmed, case-insensitive and applied on all pages, including continuation; blank and no-match cases pass. A forged foreign-row cursor with extra attacker-supplied `clientId` remains constrained by the session's customer.

Invalid cursor JSON/scalar/null/array/object/id/date/alphabet/length, invalid/oversize/repeated limits, repeated cursors and oversize search return 400. Missing/invalid session returns 401. Owned detail remains 200, foreign detail 404; static workload route remains 200 for an authorized manager and 403 for CLIENT.

Actual driver SQL text was observed without parameters or result changes. It contains client scoping AND search AND the descending date/id keyset OR, `ORDER BY createdAt DESC, id DESC`, and a bound LIMIT. Full SQL samples are in JSON. Standard Prisma emits an OFFSET parameter as well; no claim about its value is inferred from text-only observation.

## Commands and artifacts

```sh
# API cwd: /Volumes/easy/development/learning/opsdesk/apps/api
npm exec -- tsc -p tsconfig.build.json --noEmit --incremental false
npm test
# Repository cwd: /Volumes/easy/development/learning/opsdesk
open -a OrbStack
docker pull postgres:17
python /Users/eugeney/.hermes/cache/scratch/ops019-owned-postgres.py
# Wrapper internally runs:
node /Users/eugeney/.hermes/cache/scratch/ops019-http-validation.cjs
# API child (resolved ts-node path):
node -r /Volumes/easy/development/learning/opsdesk/apps/api/node_modules/ts-node/register /Users/eugeney/.hermes/cache/scratch/ops019-source-server.cjs
```

Container creation/inspection/removal argv (no secret values) is recorded in `OPS-019-client-container-evidence.json`. Synthetic credentials are supplied only via process environment; do not reproduce them in shell output. Harnesses are in scratch, not application source:

- `/Users/eugeney/.hermes/cache/scratch/ops019-owned-postgres.py`
- `/Users/eugeney/.hermes/cache/scratch/ops019-http-validation.cjs` (SHA-256 `fd51d2af0f959303ff06590682b05b229ba4e2a7e945e936cdb7f60a62c8d2f2`)
- `/Users/eugeney/.hermes/cache/scratch/ops019-source-server.cjs` (SHA-256 `fbbbcc4aac323bbfdc31ab749304b74471ec9e14e982d19f40b54a569fc36731`)

Repository reports created:

- `/Volumes/easy/development/learning/opsdesk/work/validation/OPS-019-client-http-validation.md` — this report.
- `/Volumes/easy/development/learning/opsdesk/work/validation/OPS-019-client-http-validation.json` — assertions, full ordered oracles, SQL text, fingerprints, migrations, cleanup and producer status.
- `/Volumes/easy/development/learning/opsdesk/work/validation/OPS-019-client-container-evidence.json` — isolated runtime and container cleanup evidence.

## Fingerprints and cleanup

- Before/after repository file manifest SHA-256: `9cf10131854dab31c6c295ec4300d47d7674668cbd5ef39a0c318eb51b67eba7`; **173 files**, identical. Manifest includes tracked/untracked nonignored files except `.DS_Store` and OPS-019 validation reports; application/config/dependency files were not modified. Ignored `.env`/node_modules are not hashed or exposed.
- Exact disposable database `ops019_validation_4f510296fc90469798dd21f42af64ccd` dropped; absence read back from `pg_database` before removing the container.
- Owned API PID 6797 exited with `SIGTERM`; process absence verified with signal-0 probe.
- Owned container `ops019-validation-3ab5f6a00f0643cb9f6d92505f39d146` removed; exact-target inspect confirmed absence. No owned DB/API/container remains.
- OrbStack was launched because the Docker daemon was initially down; it remains running. The downloaded PostgreSQL image remains in the Docker cache. No existing containers were started.

## Attempts, limitations and exclusions

1. Initial direct local connection failed before any DB or API was created (Docker/PostgreSQL unavailable). No HTTP result from that attempt is counted.
2. First isolated run passed 65/65 and removed its DB/API/container, but the wrapper wrongly treated lowercase `no such object` as a cleanup failure because of a case-sensitive string test. Exact-target inspect independently verified absence. The scratch-only wrapper check was corrected; the complete final run above passed with verified cleanup and wrapper exit 0. This was a validation-harness defect, not an application defect.
3. Operator pagination is not implemented and was intentionally not evaluated. No independent review, ticket closure, commit or push performed.
4. This is a bounded CLIENT contract check, not proof of snapshot semantics for arbitrary record mutations, performance/index behavior, a full auth/search regression, or a complete write-route HTTP regression. Existing write service tests pass; HTTP detail/workload reachability only was retained. Search literal wildcard escaping is not separately retested here. Extra cursor fields are not rejected by the implementation; the forged clientId case confirms that they cannot replace session scoping.

## Assertion inventory

| # | Check | Result |
|---|---|---|
| 1 | Real login 101 | PASS |
| 2 | Real login 102 | PASS |
| 3 | Real login 103 | PASS |
| 4 | Real login 104 | PASS |
| 5 | Real login 105 | PASS |
| 6 | Real login 201 | PASS |
| 7 | Missing session yields 401 on list | PASS |
| 8 | Invalid session yields 401 on list | PASS |
| 9 | Default first page is exactly 15, ordered and bounded | PASS |
| 10 | Default-size full walk exact IDs and final null | PASS |
| 11 | Small size 3 full walk including date ties, no gaps/duplicates | PASS |
| 12 | Minimum size 1 full walk | PASS |
| 13 | Exact page size 3 is terminal (not false-positive hasMore) | PASS |
| 14 | Empty client list normal 200 envelope | PASS |
| 15 | Maximum size 50 returns bounded page and complete remainder | PASS |
| 16 | Case-insensitive trimmed search across all pages | PASS |
| 17 | Blank search preserves ordinary list across pages | PASS |
| 18 | No-match search gives empty terminal envelope | PASS |
| 19 | Foreign customer complete walk never exposes primary customer | PASS |
| 20 | Forged foreign boundary with attacker clientId stays session scoped | PASS |
| 21 | Newer insertion between requests leaves original remaining sequence unchanged | PASS |
| 22 | 400 invalid cursor: invalid JSON | PASS |
| 23 | 400 invalid cursor: null | PASS |
| 24 | 400 invalid cursor: array | PASS |
| 25 | 400 invalid cursor: string | PASS |
| 26 | 400 invalid cursor: number | PASS |
| 27 | 400 invalid cursor: boolean | PASS |
| 28 | 400 invalid cursor: missing fields | PASS |
| 29 | 400 invalid cursor: missing id | PASS |
| 30 | 400 invalid cursor: id string | PASS |
| 31 | 400 invalid cursor: id zero | PASS |
| 32 | 400 invalid cursor: id negative | PASS |
| 33 | 400 invalid cursor: id fractional | PASS |
| 34 | 400 invalid cursor: id too large | PASS |
| 35 | 400 invalid cursor: id null | PASS |
| 36 | 400 invalid cursor: missing date | PASS |
| 37 | 400 invalid cursor: date number | PASS |
| 38 | 400 invalid cursor: invalid date | PASS |
| 39 | 400 invalid cursor: impossible date | PASS |
| 40 | 400 invalid cursor: noncanonical ISO | PASS |
| 41 | 400 invalid cursor: date timezone offset | PASS |
| 42 | 400 invalid cursor: empty | PASS |
| 43 | 400 invalid cursor: bad alphabet | PASS |
| 44 | 400 invalid cursor: oversize | PASS |
| 45 | 400 invalid limit: "0" | PASS |
| 46 | 400 invalid limit: "-1" | PASS |
| 47 | 400 invalid limit: "1.5" | PASS |
| 48 | 400 invalid limit: "51" | PASS |
| 49 | 400 invalid limit: "1000000" | PASS |
| 50 | 400 invalid limit: "abc" | PASS |
| 51 | 400 invalid limit: "" | PASS |
| 52 | 400 invalid limit: "NaN" | PASS |
| 53 | 400 invalid limit: "Infinity" | PASS |
| 54 | 400 invalid limit: "2147483648" | PASS |
| 55 | 400 repeated limit values | PASS |
| 56 | 400 repeated cursor values | PASS |
| 57 | 400 oversize search | PASS |
| 58 | Detail owned route remains reachable and foreign detail forbidden as 404 | PASS |
| 59 | Workload static route reaches authorized operator and denies CLIENT | PASS |
| 60 | Real emitted SQL has ordering, scoping, keyset and bound | PASS |
| 61 | Cleanup owned source API and verify process absent | PASS |
| 62 | Cleanup fixture SQL connection | PASS |
| 63 | Drop exact disposable DB and verify absent | PASS |
| 64 | Cleanup admin connection | PASS |
| 65 | Repository source/config/dependencies unchanged | PASS |
