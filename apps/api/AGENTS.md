# API application rules

## Stack and architecture

- Use NestJS, Prisma and PostgreSQL.
- Build a modular monolith. Modules own coherent business capabilities and communicate through explicit application boundaries.
- Microservices are prohibited unless a separate accepted ADR authorizes them.

## Design before implementation

Before a backend task is implemented, the learner proposes the relevant data model and application of agreed business rules after unfamiliar prerequisites have been explained under `docs/learning/hint-policy.md`. Do not redesign an unchanged schema for a small read task. For meaningful changes, discuss error behavior and relevant integrity trade-offs. Codex teaches missing concepts and critiques the proposal without writing the studied solution.

## Data integrity

Every write flow must deliberately consider transactions, concurrent requests and idempotency where retries or duplicate delivery are plausible. Do not assume ORM usage automatically provides the required guarantees.

Codex checks these risks during readiness review; the learner is not expected to know untaught mechanisms. If safe implementation requires several major unknown concepts, defer or split the feature. Preserve integrity and access requirements rather than bypassing them to fit a lesson.

## SQL learning mode

Follow the SQL mode stated in the current ticket:

- `SQL_REQUIRED`: the user writes SQL independently;
- `SQL_RELEVANT`: Prisma is allowed, then inspect the SQL it produces;
- `ORM_SUFFICIENT`: manual SQL is not a task goal.

If mode is absent, stop and ask for it before backend implementation.
