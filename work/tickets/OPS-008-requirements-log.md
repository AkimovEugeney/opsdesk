# OPS-008 Requirements log

| Date | Question / clarification | Product-owner answer | Source |
|---|---|---|---|
| 2026-09-28 | Which next slice should follow OPS-007? | Create a small frontend foundation before connecting a React view to the API, because no frontend application currently exists. | Learner selected candidate |
| 2026-09-28 | Which frontend foundation should be used? | Use Next.js, selected by the learner. Keep TypeScript, App Router, npm and no nested Git repository. | Learner technical decision |
| 2026-09-28 | What is the first visible page? | A static Russian-language “Активные обращения” page with an honest empty state. It contains no API request, fake data, authentication or client-supplied identity. | Product Owner decision / learner selection |
| 2026-09-28 | What is the work split? | Codex handles routine scaffold, dependency setup and mechanical verification. The learner owns the static page composition, empty-state presentation and boundary explanation. | Learner work-split decision |
| 2026-09-28 | Learner estimate | 1–2 h. | Learner estimate |
| 2026-09-28 | Is styling required for the first static page? | No. Keep the semantic static screen and honest empty state, but defer styles/SCSS Modules to a later UI slice. Sass remains installed as routine foundation and no styling code is required now. | Learner scope decision |
| 2026-09-28 | Actual time and delivery | Learner actual: 10 min. Direct/local delivery without Git operations. Learner separately attributed 30 min to Codex routine project setup; that is not recorded as learner capacity actual. | Learner report / delivery decision |
| 2026-09-28 | Mentor process correction: frontend learning allocation | The ticket asked the learner to hand-write static title/list/empty-state markup after the scaffold even though it did not exercise a meaningful frontend engineering gap. Future frontend work keeps static shells, metadata and CSS as AI routine; learner manual work targets a named recovery need such as state/data flow, async lifecycle, browser boundary, accessibility/performance or debugging. | Learner feedback; mentor process correction |
