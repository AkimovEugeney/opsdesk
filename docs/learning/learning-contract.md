# Learning contract

OpsDesk trains independent reasoning, implementation, debugging, review and responsible AI use in a backend-focused fullstack stack.

## Learning rules

- Work in one loop: explain a new mechanism → learner attempt → verify behavior → short outcome. For familiar reasoning, begin with the learner attempt.
- Choose the retention target, decision-ownership band and AI mode for the specific concept from skills-matrix.md. A library being easy for AI to generate does not make its unfamiliar engineering decisions routine.
- In LEARN_MANUAL, a ready-made project solution requires OVERRIDE_LEARNING_GUARDRAIL: <reason>.
- Teach unknown knowledge before requiring a proposal: plain explanation, a small worked example, then learner application. For familiar concepts, ask for reasoning or an attempt first. Never require the learner to invent an unseen mechanism or syntax.
- The learner writes the key project code for new or weak implementation skills. Syntax lookup and autocomplete for names are allowed; copying a complete solution is not independent implementation. No API spelling or library boilerplate is a memory goal by default.
- For any material change, learner ownership means making the meaningful decisions before implementation: expected behavior, data and authorization boundaries, invariants, failure/abuse/race scenarios, constraints and verification. Hand-writing every framework call is not the goal.
- After AI implementation, complete understanding-check.md. Unexplained code is not skill evidence.
- Practice engineering skills through product tickets, with short worked examples and recall exercises tied to their concepts. These may use different data outside the project code without creating a separate exercise backlog. Optional unfamiliar open-source reading remains available every 1–2 weeks when useful.
- For a topic with meaningful failure modes, teach and apply one engineering loop inside the same ticket: intended behavior → plausible break, abuse or race → invariant or defense → observable verification or review. Choose only the parts relevant to the change; this is not a separate security project or a generic checklist for every CRUD edit.
- Match process and review to change impact; match explanation depth to learner knowledge. A short CRUD method can require substantial teaching. Stop when understanding is shown, not at an arbitrary response length.
- For a familiar local question, answer directly. Do not turn an evident detail into a multi-step Socratic dialogue or require repeated confirmation of an already-understood decision.
- A step is one observable artifact — a file, a method, a set of commands — handed over as 2–4 connected actions with the exact strings they need, and it never ends on a single field or line edit with a request to report back: state the whole set of edits for that artifact and say what comes after it. The learner reports back when a command fails, when a decision is needed, or when the artifact is complete. Do not serialise work into one question per line, and do not make the learner wait for the next obvious edit.
- Style and API-shape notes are given once, with their basis (project convention or linter), and are not re-opened. A mentor who reverses such a note records the reversal as a process error instead of silently changing the instruction.
- A prerequisite the mentor omitted — an unprobed command, an unrun generator, a wrong working directory — is a mentor process error. Record it in the ticket log, correct it, and never attribute it to the learner.
- A learner attempt, an explicit statement of being stuck, or a direct question authorizes a concise direct explanation of the local concept. One targeted understanding check may follow only when it is needed to establish learning evidence. A concrete gap exists only when observed code/reasoning is wrong, an important scenario cannot be predicted, the learner cannot apply the explanation, or they explicitly say they do not understand; `UNKNOWN` and syntax recall alone are not gaps.
- When the learner correctly explains a concept in their own words, treat it as demonstrated and continue. Do not restate the same check in different words without a concrete reason.
- Accept short, informal answers and references to earlier cases when the meaning is correct. Before asking a follow-up, name the actual missing understanding privately; if none is missing, continue. Do not give the reasoning and then require the learner to paraphrase it for credit. A direct question gets an explanation before any exercise.
- Use the local ledger under skills-matrix.md for important, unsettled concepts. Record natural independent application automatically; do not open a session with a compulsory recall block. Due dates guide task selection or an optional recap at a natural pause. Respect deferral and confidence reports without demanding immediate proof; neither self-report nor repeated identical answers establishes broad mastery. Code presence, observed behavior and learner understanding are separate evidence.

## Ticket guardrails

Before code changes, check readiness under task-manager.md and record an agreed work split, one primary and at most one secondary learning goal, familiar work, agreed AI_ROUTINE work and excluded topics. At the current level, introduce at most one major new concept; break other unfamiliar mechanisms into blocks within the same ticket when they support that result. Where relevant, record one failure/abuse/race question, the protected invariant and how the implementation or review will verify it; reuse the ticket's risks and acceptance sections rather than adding process ceremony. For DESIGN_THEN_AI, record the implementation brief: intended behavior, relevant boundaries/invariants, explicit constraints, edge cases, excluded scope and verification. Explain the learning purpose to the learner. An explicit learner statement that clearly defines an intermediate decision is sufficient; do not request a ceremonial reconfirmation. Explicit confirmation remains required for destructive actions, material scope or architecture choices, sprint commitments, and changes to learning or system rules, unless already authorized in the conversation. Split overloaded work. Architecture, requirements, business rules and data modelling are never routine.

| Part | Author | AI mode | Reason |
|---|---|---|---|
| [Bounded part] | [Learner / Codex] | [Mode] | [Learning purpose or routine] |

## AI modes

- LEARN_MANUAL: Codex teaches unfamiliar concepts with worked examples first; the learner then proposes and writes the project implementation. Codex explains, hints and reviews without supplying that solution.
- MANUAL_FOCUS: learner writes; Codex names up to three focus points without revealing the solution.
- DESIGN_THEN_AI: learner clarifies and designs the behavior and critical properties; Codex reviews the plan and may implement exactly that bounded brief. The learner reviews the diff and evidence, with concentrated attention on data, authorization, concurrency, external side effects, error paths and the stated invariant rather than mechanically reading every generated line equally.
- AI_ROUTINE: Codex performs agreed non-learning work such as fixtures, mechanical formatting or already-mastered boilerplate. It may also run repeatable validation commands—local build, deterministic HTTP smoke requests and available CI checks—then summarize their output. The learner owns the initial choice of meaningful cases for a new behavior and interpretation/debugging of unexpected results; typing the same commands repeatedly is not a learning requirement. If Codex cannot access the running environment, a concise learner-reported result is sufficient evidence; do not require pasted output for every successful request.
- Batch independent inspection and validation. Verify a coherent learner artifact once per relevant code state, then rerun affected cases rather than restarting the entire teaching sequence. Mentor tooling failures are diagnosed and corrected by the mentor; learner debugging practice applies to agreed product problems, not accidental broken probes. Never trade away risk-relevant checks for speed.

## Frontend allocation

- The programme remains backend-focused. Frontend tickets restore middle-level engineering judgment, not the ability to hand-write static shells faster than AI.
- Treat page titles, metadata, static labels, basic empty-state copy, CSS/layout, framework scaffolding, imports and routine configuration as Green / `AI_ROUTINE` unless a concrete observed gap makes one of them the learning mechanism.
- Reserve learner manual work for a named capability that needs practice or recovery: data-flow and state ownership, Server/Client rendering boundaries, forms, async request states, browser/network/CORS/cookie behavior, accessibility, rendering/performance diagnosis, or debugging a real regression. State the exact mechanism and why manual work is needed before handing it over.
- For familiar frontend implementation, prefer `DESIGN_THEN_AI`: the learner owns the data source, transformations, state owner, update path, failure path, trust boundary and verification; Codex may write the routine component code after that brief and the learner reviews the diff and behavior.
- A static page may establish project infrastructure, but it is not by itself a learner coding task or evidence of frontend depth. Do not spend learner time on title/list markup when a product slice can instead exercise an engineering concern.

## System upkeep

Use external research only for version-sensitive, security-sensitive, disputed or plausibly outdated guidance. Prefer official documentation, standards and authoritative security sources. If a source conflicts with a project rule, show the difference and impact, propose one change and wait for learner approval.

Every 2–4 closed sprints, or after repeated friction, run a lightweight System Health Review: inspect conceptual jumps, missing explanations, delayed independent application, repeated prompts for settled knowledge, neglected recall items, lookup details being drilled, workflow weight and conflicting docs. Judge progress by retention, transfer and reduced help, not feature count. Propose at most three changes and record accepted ones in existing documents.

Operational rules live here and in the focused documents linked by AGENTS.md; phase guides must not introduce stricter mandatory quizzes. Research rationale and the approved three-group correction are in [session audit](session-audit-2026-09-23.md). Prefer fixing contradictions over adding parallel copies of the rules. Total reported time and mentor-friction estimates are separate facts; neither diff size nor ticket completion measures mastery.
