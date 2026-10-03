# OPS-013 Requirements log

Recorded on 2026-10-03 **after** the learner had already implemented `POST /appeals`, so these answers are not a refinement that preceded the code. They state the product rules independently of that implementation; where the code disagrees, the agreement is a defect.

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-03 | Which product slice is this? | A client files a new appeal. Until now the `CLIENT` role could authenticate but had no product action, and appeals existed only as seeded rows. | Product direction recorded in `current-state.md` |
| 2026-10-03 | Who may create an appeal? | Only an authenticated client. Creating on behalf of another client would need an explicit target selection plus a permission, neither of which exists, so it is out of scope; an operator is refused before any write. | PO recommendation, pending learner accept/reject |
| 2026-10-03 | Who is the author of the new appeal? | The authenticated session user. The request body can never set the author, the owner or the status; those are server decisions. | PO decision (trust boundary) |
| 2026-10-03 | What does the new appeal start as? | `NEW`, with no owner, no outcome and no `closedAt`. Assignment stays the separate assignment flow. | PO decision |
| 2026-10-03 | What input does the request carry? | A required `title` and a required `description`; each must be non-empty after trimming and stay within a maximum length. Invalid input returns `400` and writes nothing. | PO decision; trimming follows the existing close-flow DTO |
| 2026-10-03 | What does a successful create return? | The created appeal's own fields only — identifier, status, title, description and creation time. Internal ownership and outcome state are not part of the response, and the response must not be the raw stored row. | PO decision (projection) |
| 2026-10-03 | What stays out of scope? | Creating on behalf of another client, attachments, editing or deleting appeals, notifications and frontend work. | Scope boundary |
| 2026-10-03 | Process note | The learner implemented the endpoint without refinement or an agreed contract, so the rules above were recorded afterwards. The gap is recorded rather than hidden: it means the code was never checked against a stated contract before being written, and it is the reason the divergences below read as defects instead of design choices. | Fact recorded by the mentor |
| 2026-10-03 | Learner estimate | Not recorded — the learner did not state one, and 15 min was reported after the fact. | Learner report |
