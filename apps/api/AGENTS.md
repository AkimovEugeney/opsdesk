# API application rules

## Stack and architecture

- Use NestJS, Prisma and PostgreSQL.
- Build a modular monolith. Modules own coherent business capabilities and communicate through explicit application boundaries.
- Microservices are prohibited unless a separate accepted ADR authorizes them.

## Design before implementation

Before a backend task is implemented, the user first proposes the data model and business rules. For meaningful changes, also propose transaction boundary, error behavior and trade-offs. Codex critiques the proposal before implementation.

## Data integrity

Every write flow must deliberately consider transactions, concurrent requests and idempotency where retries or duplicate delivery are plausible. Do not assume ORM usage automatically provides the required guarantees.

## SQL learning mode

Follow the SQL mode stated in the current ticket:

- `SQL_REQUIRED`: the user writes SQL independently;
- `SQL_RELEVANT`: Prisma is allowed, then inspect the SQL it produces;
- `ORM_SUFFICIENT`: manual SQL is not a task goal.

If mode is absent, stop and ask for it before backend implementation.
