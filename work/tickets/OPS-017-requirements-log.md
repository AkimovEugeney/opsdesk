# OPS-017 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-22 | Why this backend slice? | Learner defers frontend. Product workflow requires customer-visible material progress; API currently has status/outcome but no progress updates. | Learner preference, product workflows/rules and actual code |
| 2026-10-22 | Who publishes and who reads? | Any operator publishes regardless of assignment/management permission; operators read any appeal history, customers read only their own. Updates are all customer-visible. | PO issuance policy |
| 2026-10-22 | Closed appeals, empty history and text limits? | Closed appeals allow clarification updates. Existing readable parent with no updates gives 200 []; missing/foreign client parent gives identical 404. Trim text and accept 1–2000 characters. | PO issuance policy |
| 2026-10-22 | Does publishing change appeal status or deduplicate retries? | No status change. Append-only; separate submissions are separate records. No edit/delete, client replies, notifications or internal notes. | PO bounded scope |
| 2026-10-26 | Are exponent/hex URL id forms valid if JavaScript can convert them to an integer? | No. The existing invalid-id 400 requirement applies to textual syntax as well as numeric range; use positive decimal integer ids within int32. `1e0`, `1e2` and `0x1` must not reach read/write behavior. This does not introduce a ban on leading zeros. | PO clarification during actual HTTP validation |
| 2026-10-26 | Actual time? | 4 h total for OPS-017. Preserve the pre-work estimate of 3–4 h; daily/weekly allocation is unknown. | Learner self-report |
