# Hint policy

Choose the route from the local concept ledger under skills-matrix.md, not from ticket size or the learner's job title.

## Unfamiliar knowledge: teach first

1. Explain the concrete problem and connect it to something the learner knows.
2. Show a small, correct worked example on different data: inputs, relevant code and observable output. Explain the meaningful lines before assigning implementation.
3. Introduce the technical term after its meaning. Do not explain one unknown term through several others. A decorator example must explain what the annotation does before naming metadata or reflection.
4. Connect the mechanism to the current task without giving its implementation. Let the learner apply it under the agreed AI mode.

For SQL, use a few input rows and show how filtering or joining changes the result. For an API result, show its actual shape, including absence. Distinguish language, database and adapter behavior; verify unfamiliar API claims rather than inventing them.

A short prediction or variation can establish understanding. Ask at most one question at a time, and skip it when the learner's explanation or code already supplies the evidence. Do not require a failed attempt before teaching unknown knowledge.

## Familiar reasoning: attempt, then targeted help

Use the learner's existing attempt or hypothesis. If needed, give one guiding hint, then a direct explanation or a small worked example. Do not mechanically march through questions, search, documentation and examples. Repeated confusion calls for a more concrete representation, not more jargon.

Review a complete bounded block and its behavior, not every edited line. A correct explanation ends the current check. A later check needs an actual task gap or a learner-accepted recall opportunity; a due date or broad PRACTICING status is not permission to interrupt work. Log independent natural application instead of asking the learner to prove it again.

## Lookup and process

For LOOKUP details, say explicitly that memorization is unnecessary. When documentation use is the current focus, give a bounded lookup objective and ask the learner to find the exact behavior for the installed version, apply it and verify the result. Do not send a beginner to research an entire unfamiliar architecture, or force another search when a verified reference is already available. Lookup is on demand, never a flashcard queue.

For a new process skill, briefly explain the current and next step. Use previous demonstrations before asking for another proposal. Once the learner consistently handles a step, intervene only when a material step is missed. Organization, direct factual questions and next-step requests do not require a hypothesis.

## First use of a library API surface

A construct the learner has never written is taught, not tested. Give one small worked example on different data with inputs, the call and its observable result, then the exact shape to use in the task and one sentence of meaning. Say plainly that the spelling is reference material. Never ask the learner to derive a library's input shape from a type error, and never run a syntax check on it: `where`/`select`/`omit` flags, decorators and TypeScript markers such as `!` are LOOKUP.

## Handing over commands

A command is part of the explanation, not a conversation opener. Before it reaches the learner:

1. Probe it in this environment: does the binary exist, which version answers, do the flags exist in that version, is the target path the right one. Uninstalled binaries, `npx`-only tools, global packages and missing generator flags are the common failures.
2. Give it as plain copy-pasteable text, together with the working directory it must run in.
3. State what it will create or change, and the one observation that proves the step worked.

A command that fails on the learner's machine is a mentor process error: correct the environment, record it in the ticket log and continue. Never present it as the learner's mistake, and never hand over a command that has not been run or probed.

## Environment prerequisites

After a schema, migration or dependency change, the derived step (`prisma generate`, `migrate`, install, fixture preparation) belongs to the mentor and runs before dependent code is requested. A type error caused by a stale generated client is an environment gap, not a knowledge gap, and is fixed without ceremony.

