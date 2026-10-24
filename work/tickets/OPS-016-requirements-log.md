# OPS-016 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-22 | Start frontend now? | No. Learner explicitly chooses backend work for now. Defer this ticket without implementation or an invented estimate; no resumption date agreed. | Learner instruction |
| 2026-10-22 | What follows customer-scoped API reads? | Existing-account sign-in, current session and logout in the browser, with a minimal identity screen; appeal UI stays separate and OPS-011 remains deferred until login exists. | PO issuance grounded in current code and learner's prior deferral |
| 2026-10-22 | What must the visitor see on failures? | Distinguish wrong credentials, unavailable service and session checking. Show Russian feedback and retry; failed logout must not claim confirmed server logout. | PO issuance policy |
| 2026-10-22 | Is browser integration already configured? | No. API lacks CORS and web lacks proxy configuration. Session/origin and local cookie compatibility are open design decisions to review before implementation. Existing authentication guarantees remain. | Actual web/API inspection |
| 2026-10-22 | Is a polished UI or appeal queue included? | No. Accessible minimal login/identity/logout is sufficient; no registration/recovery or appeal UI. | PO scope boundary |
