# OPS-014 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-20 | Which task comes first: customer appeal views or caller identification? | Caller identification first, so the customer slice builds on a single rule for user and role. | Learner decision, accepted by Codex |
| 2026-10-20 | Does behavior visible to clients change? | No. Codes, error bodies and refusal order stay. Public endpoints stay public until OPS-015. | PO scope boundary |
| 2026-10-20 | Is the mechanism fixed? | No. Guards are the learner's proposal, assessed in Design Review. | Scope boundary |
| 2026-10-20 | Default protection or per-endpoint opt-in? | Default-deny: every endpoint requires a session unless explicitly marked public, so a forgotten endpoint stays closed. | Learner decision, accepted by Codex |
| 2026-10-20 | Guard runs before body validation, so an unauthenticated request with an invalid body now gets `401` instead of `400`. | Accepted as a deliberate exception to "refusal order unchanged": an unauthenticated caller should not learn validation rules. Learner may contest. | PO decision, pending learner confirmation |
| 2026-10-20 | Weekly capacity | 12 h for 2026-10-19 — 2026-10-25. | Learner |
