# OPS-018 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-26 | Why this backend slice? | Product operational view includes ownership and team load. Assignment/closing and progress history exist; no compact operator workload summary exists. Frontend remains deferred. | Approved product brief/workflows and actual code inspection |
| 2026-10-26 | Who may read it? | Existing OPERATOR role with CAN_MANAGE_APPEALS. Other authenticated callers receive 403; missing/invalid/expired session receives 401. No new lead role. | PO bounded access policy |
| 2026-10-26 | What is workload? | Number of owned NEW/IN_PROGRESS appeals, not updates. Include all operators with zero counts where appropriate, plus unassigned active and total active counts. CLOSED does not contribute. | PO product policy |
| 2026-10-26 | Empty data, ordering and safe fields? | Successful response with zero counts; operator list may be empty. Sort operators by ascending id, keep equal names distinct. Expose operator id/name/count and summary counts only. | PO response policy |
| 2026-10-26 | Is a new schema, UI or incident workflow part of this ticket? | No. Existing appeal/user/state data is sufficient. API contract remains learner-proposed and receives Design Review before implementation. | Scope/readiness check |
