# OPS-020 Requirements log

| Date | Question | Product-owner answer | Source |
|---|---|---|---|
| 2026-11-04 | What counts as completed? | CLOSED only. Return the recorded outcome as stored. | PO decision |
| 2026-11-04 | What happens on filter changes? | Start from the first page when changing search or completed-only selection. A continuation must never extend visibility. | PO decision |
| 2026-11-04 | Who may use the new option? | Signed-in customers only. Omission preserves both existing lists. Invalid values return 400 for signed-in customers. | PO decision |
| 2026-11-04 | What is the option called and what values does it accept? | Learner proposes the wire contract for Design Review. | PO decision |
| 2026-11-05 | Public contract? | Learner proposed GET /appeals?filter=closed; accepted. Omission preserves existing behavior. Other supplied values return 400 for authenticated customers and operators. | Learner proposal and contract review |
| 2026-11-05 | Should operators see completed appeals too? | Yes. Supersedes the original customer-only rule and operator 403. Customers see their own completed appeals; operators see all completed appeals. Recorded outcomes are included. | Learner request, PO agreement, learner acceptance |
| 2026-11-05 | Operator completed-list ordering? | createdAt descending, then id descending. Existing search semantics and page envelope remain. Start without a cursor when changing the filter. | PO proposal accepted by learner |
| 2026-11-05 | Scope impact? | Add operator implementation and HTTP validation alongside the customer path. No schema change. Estimate pending; actual time unknown. | Agreed scope expansion |
