# API application rules

## Stack and architecture

- Use NestJS, Prisma and PostgreSQL.
- Build a modular monolith. Modules own coherent business capabilities and communicate through explicit application boundaries.
- Microservices are prohibited unless a separate accepted ADR authorizes them.

## Design before implementation

The learner reads the requirements and code and decides the approach. For a change to schema/migrations, authentication/authorization, transactions or concurrency, payments/external side effects, or a public contract, the learner gives a short proposal and Codex runs a Design Review (`docs/team/code-review.md`) before implementation. Unfamiliar mechanisms are explained on request or when the proposal is unsafe because of them; Codex can compare options and recommend one, and the learner decides. Product policy is not a guessing exercise: ask the Product Owner (Codex). A small read task needs no schema redesign and no separate design step. Do not write the studied implementation for the learner without permission.

## Data integrity

Every write flow must deliberately consider transactions, concurrent requests and idempotency where retries or duplicate delivery are plausible. Do not assume ORM usage automatically provides the required guarantees.

Codex checks these risks in Design Review and Code Review, and explains an unfamiliar mechanism when the learner asks or when its absence makes a proposal unsafe. If safe implementation needs several major unknown concepts, split the feature. Integrity and access requirements are never bypassed to simplify the work.

## SQL learning mode

Codex picks the SQL mode when preparing the ticket, from the task's nature and the learner's stated wish to practise SQL; a missing mode never blocks implementation (assume `ORM_SUFFICIENT` unless SQL practice was requested). Ask one short question only if the choice really changes the learning goal. Modes:

- `SQL_REQUIRED`: the user writes SQL independently;
- `SQL_RELEVANT`: Prisma is allowed, then inspect the SQL it produces;
- `ORM_SUFFICIENT`: manual SQL is not a task goal.

If mode is absent, stop and ask for it before backend implementation.
