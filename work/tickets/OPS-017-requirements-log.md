# OPS-017 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-22 | Why this backend slice? | Learner defers frontend. Product workflow requires customer-visible material progress; API currently has status/outcome but no progress updates. | Learner preference, product workflows/rules and actual code |
| 2026-10-22 | Who publishes and who reads? | Any operator publishes regardless of assignment/management permission; operators read any appeal history, customers read only their own. Updates are all customer-visible. | PO issuance policy |
| 2026-10-22 | Closed appeals, empty history and text limits? | Closed appeals allow clarification updates. Existing readable parent with no updates gives 200 []; missing/foreign client parent gives identical 404. Trim text and accept 1–2000 characters. | PO issuance policy |
| 2026-10-22 | Does publishing change appeal status or deduplicate retries? | No status change. Append-only; separate submissions are separate records. No edit/delete, client replies, notifications or internal notes. | PO bounded scope |
