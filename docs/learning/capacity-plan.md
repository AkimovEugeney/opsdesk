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

| Iteration | Capacity target | Recorded actual | Remaining to target | Status |
|---|---:|---:|---:|---|
| 2026-08-12 — 2026-08-18 | 8–12 h | 3.25 h | 4.75–8.75 h unused | Closed |
| 2026-09-07 — 2026-09-13 | 3–6 h | 0.75 h recorded | 2.25–5.25 h unused | Closed 2026-09-22, after its window |
| 2026-09-21 — 2026-09-27 | 5–8 h | 3.5 h | 1.5–4.5 h unassigned, not a quota | Closed 2026-09-26; OPS-006 Done |
| 2026-09-28 — 2026-10-04 | 3–4 h | 7 h 15 min | 3 h 15 min above the confirmed capacity | Closed 2026-10-03, inside its window — 7 tickets (3 planned, 4 unplanned); OPS-010 carried over for its understanding check (closed 2026-10-20 from existing evidence; no extra time recorded) |
| 2026-10-05 — 2026-10-11 | to confirm | — | — | Planning — capacity and planned total to be confirmed by the learner before any ticket is added |
| 2026-10-19 — 2026-10-25 | 12 h | approximately 7.5 h (OPS-014: 6 h; OPS-015: 1.5 h) | approximately 4.5 h against recorded time; not a quota | Capacity confirmed 2026-10-20; OPS-014 and OPS-015 Done via direct/local delivery |

Recorded time consists of OPS-000 (0.75 h), OPS-001 (2.5 h), OPS-004 (0.25 h), OPS-005 (0.50 h) and [OPS-006](../../work/tickets/OPS-006.md) (3 h 30 min). OPS-002 actual time was never recorded and is not reconstructed. Recorded iteration totals: Sprint 0 3.25 h, Sprint 1 0.75 h, Sprint 2 3.5 h. Sprint 2's unassigned capacity is recorded as available time, not a missed quota; its primary process finding is the learner-reported mentor friction inside the recorded actual.

OPS-006's [actual-time record](../../work/tickets/OPS-006-requirements-log.md) is the learner's report: 3 h 30 min total; approximately 1 h 30 min useful implementation/review/learning and 2 h mentor friction. The split is an estimate, not instrumented timing; retain the full total and record later verification/review time separately when reported.

OPS-014 actual: approximately 6 h, reported by the learner on 2026-10-21 including the guard walkthrough and refactoring. Exact timing is unknown; no pre-work estimate exists and none is reconstructed. The current-week row includes only this known actual, not inferred time for other work.

OPS-015 actual: approximately 1.5 h, reported by the learner on 2026-10-22 including discussion and fixes. Pre-work estimate 2–3 h remains unchanged. The current-week total now includes both known ticket actuals; no unreported time is inferred.

OPS-017 actual: 4 h total, reported by the learner on 2026-10-26; pre-work estimate 3–4 h. Work spans more than one calendar week and the daily/weekly split is unknown, so this total is not allocated to a weekly row or added to a reconstructed weekly total.

## Ticket estimate policy

Use a range before starting a ticket:

| Ticket size | Planning range |
|---|---:|
| Small read or write vertical slice | 1.5–3 h |
| Small slice with a new concept | 3–5 h |
| Larger flow or cross-module change | Split before estimating |

OPS-001 has no valid estimate because it was not recorded before implementation. Its 2.5 h is a baseline for the next comparable ticket, not an overrun.
