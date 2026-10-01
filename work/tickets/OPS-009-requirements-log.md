# OPS-009 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-09-28 | Which next backend-focused slice follows OPS-008? | Add a bounded local DTO validation boundary for protected owner assignment. OPS-003 previously deferred this to avoid mixing it with authorization. | Product selection / OPS-003 follow-up |
| 2026-09-28 | Which endpoint and field change? | Only `PATCH /appeals/:id/owner` body field `ownerId`. The route `:id`, login and all other endpoints retain their current behavior. | Agreed scope |
| 2026-09-28 | What input contract is preserved? | Accept only a JSON number that is a positive signed 32-bit integer. Reject numeric strings, fractions, zero/negative values and values above `2147483647` with `400`; do not enable automatic coercion. | Product contract / existing behavior preserved |
| 2026-09-28 | Why local validation rather than a global pipe? | A global pipe can change unrelated endpoint contracts. This ticket changes only the protected assignment boundary and must leave login and existing route-ID validation unaffected. | Engineering constraint |
| 2026-09-28 | Learner estimate | 1–2 h. | Learner estimate |
