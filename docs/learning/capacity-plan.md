# Capacity plan

## Baseline

- Commitment: 8–12 hours per week.
- Programme framework: 16 weeks.
- Planned learning capacity: 128–192 hours.
- Tracking starts: 2026-08-12.

## Tracking rules

- Record the ticket estimate before implementation begins.
- Record actual time including analysis, implementation, debugging, review and learning dialogue.
- Compare actual time with the estimate only when the estimate was recorded before work.
- Review weekly capacity at the end of each weekly iteration, not after an incomplete week.
- Confirm the actual available hours for each new weekly plan; the baseline is a planning reference, not a daily quota.
- Include clarification, learning, tests and review in the commitment. Do not pad tracked hours or require a minimum number of hours per day.
- Preserve original estimates and weekly commitments. Record changed scope and remaining-work estimates separately with a date and reason, following `../team/workflow.md`.

## Current iteration

| Iteration | Capacity target | Completed | Remaining to target | Status |
|---|---:|---:|---:|---|
| 2026-08-12 — 2026-08-18 | 8–12 h | 3.25 h | 4.75–8.75 h unused | Closed |
| 2026-09-07 — 2026-09-13 | 3–6 h | 0.75 h recorded | 2.25–5.25 h unused | Closed 2026-09-22, after its window |
| 2026-09-21 — 2026-09-27 | 5–8 h | 0 h | — | Active (committed 3–4 h for OPS-006) |

Completed time consists of OPS-000 (0.75 h), OPS-001 (2.5 h), OPS-004 (0.25 h) and OPS-005 (0.50 h). OPS-002 actual time was never recorded and is not reconstructed. Recorded iteration totals: Sprint 0 3.25 h, Sprint 1 0.75 h. The cause of unused capacity is still not recorded; it is a retro item rather than a planning quota.

## Ticket estimate policy

Use a range before starting a ticket:

| Ticket size | Planning range |
|---|---:|
| Small read or write vertical slice | 1.5–3 h |
| Small slice with a new concept | 3–5 h |
| Larger flow or cross-module change | Split before estimating |

OPS-001 has no valid estimate because it was not recorded before implementation. Its 2.5 h is a baseline for the next comparable ticket, not an overrun.
