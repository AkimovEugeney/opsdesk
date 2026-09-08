# OPS-003 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-09-08 | Which role may assign an operator to an appeal? | Superseded: the earlier answer allowing every operator was an unsupported assumption. | Correction |
| 2026-09-08 | Which operator may assign an operator to an appeal? | Only an operator with the separate permission to manage appeals may assign a responsible operator or change an appeal status. This adds a permission, not a third role. A client may not perform either action. | Product Owner decision |
| 2026-09-08 | Initial learner formulation | The task needs access control for operator and client roles; an operator changes an appeal's status and responsible operator only while the appeal is not already in progress. | Learner input |
| 2026-09-08 | May an appeal already in progress be reassigned? | Yes. A `NEW` appeal may be assigned and becomes `IN_PROGRESS`; an `IN_PROGRESS` appeal may be reassigned, updating its modification date. A `CLOSED` appeal cannot be changed. | Product Owner decision based on learner clarification |
| 2026-09-08 | How is elevated access represented? | An operator with a separate permission to manage appeals is the senior operator for this capability; no third role is introduced. | Product Owner decision |
| 2026-09-08 | Can the assignment task implement permission checks before authentication exists? | No. Authentication, a current-user context and permission enforcement are a prerequisite product task. Assignment behaviour remains in OPS-003 / SCRUM-6 and resumes after that prerequisite is complete. | Agreed scope split |
