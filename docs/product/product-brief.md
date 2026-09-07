# OpsDesk Product Brief

- Status: Approved
- Version: MVP

## Business goal

OpsDesk combines customer requests and internal incidents in one workspace. Teams can see ownership, current state, outcome and whether response or resolution targets are being met.

## Users

| User | Product responsibility |
|---|---|
| Customer | Create a request, provide context and receive progress information. |
| Operator | Receive, clarify, classify and work on customer requests. |
| Incident reporter | Report an internal problem and record operational context. |
| Incident responder | Coordinate incident handling and closure. |
| Team lead | See team load, ownership and outcomes. |
| Administrator | Maintain users and product reference data. |

## Core workflows

- Customer request: a customer submits a request; an operator clarifies and assigns it; the responsible team works it to a recorded outcome; the customer receives material updates.
- Internal incident: a team member reports an incident; a responder coordinates handling and mitigation; the team records material updates and the outcome before closure.
- Operational view: the team sees active work, owner, state, target and material history; the team lead uses it to manage distribution and timeliness.

## MVP scope

Includes request and incident handling, ownership changes, current state and material updates, target tracking, an active-work list for search and prioritization, and notifications about material changes.

Excludes deep analytics, arbitrary reports, omnichannel support, automated classification, broad workflow automation, separate mobile products and integrations that are not needed for the core workflow.

## Stable product rules

Stable rules live in product-rules.md. This brief does not repeat them.

## Out of scope for this brief

This document does not define frontend, backend, API, database, storage, technical architecture, integration contracts or notification implementation. Those decisions belong in tickets and ADRs after learner-led design.

## Requirement changes

This brief is the source for stable product intent. Ticket-specific clarifications belong in the ticket requirements log and override this brief only for that ticket.
