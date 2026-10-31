# OPS-019 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-10-30 | Why this slice? | Lists return every row; volume growth is the next operational risk. Backend only, no schema change. | Code inspection of list routes |
| 2026-10-30 | Default and maximum page size? | Learner proposes values with a reason; PO accepts any sensible pair. | PO policy |
| 2026-10-30 | Estimate? | 3 h from learner. Learner reports pagination is a new topic and asks for a walkthrough before proposing a design. | Learner |
| 2026-10-30 | Remaining-count in response? | No. Counting per request is extra cost and only needed with page numbers; has-more plus next cursor is enough. | PO decision |
| 2026-10-30 | Search changes while a cursor is held? | Client starts without a cursor; server applies search and cursor as sent. | Learner decision, PO accepted |
| 2026-10-30 | Status change between requests in operator queue? | Accepted known limit, not a defect. | PO decision |
| 2026-10-30 | Cursor format on the wire? | One opaque base64url string (`cursor` request param, `nextCursor` in response), same for both lists; separate fields rejected. Client never reads its structure and the content is not trusted: format and types are validated after decoding, and visibility comes from the session only. Field names (`items`, `hasMore`, `nextCursor`, `cursor`) are the learner's to confirm. | Learner decision |
| 2026-10-31 | Ordering after the id-only alternative discussion? | Learner explicitly retained createdAt+id. The extra chronological ordering is a chosen contract, not an inherent requirement of cursor pagination. | Learner decision |
| 2026-10-31 | Next action before OPERATOR pagination? | Address readability by extracting cursor parsing/validation first; share demonstrated common logic, not a speculative universal framework. This is a proposed next implementation step, not completed refactoring. | Learner request and mentor recommendation |
| 2026-10-31 | Save/push and pause? | Learner explicitly authorizes a checkpoint commit/push of current progress and will resume tomorrow. Ticket stays In Progress; actual time is unknown. | Learner |
