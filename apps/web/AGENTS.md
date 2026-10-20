# Web application rules

## Stack and structure

- Use React, TypeScript and SCSS Modules.
- Organize code by product feature. Keep code shared only when there is a concrete, current reuse case.
- Do not introduce abstractions, generic layers or patterns without a practical reason demonstrated by the task.

## Design before implementation

For a significant UI task, the user describes the data flow (source, transformations, ownership, updates, failure path) and Codex reviews that proposal when the task has a real state, trust-boundary or contract risk. Small tasks need no separate design step. Codex does not write the studied implementation without permission.

## State classification

Classify state explicitly before choosing where it lives:

- **local state** — transient UI state owned by one component;
- **server state** — data read from or synchronized with a remote service;
- **URL state** — shareable or navigational state that must survive refresh and links;
- **form state** — values, validation and submission lifecycle of a form.

Do not mix categories merely for convenience. Record a justified exception in the current ticket's requirements log.

## UI quality baseline

Each user-visible flow considers loading, error and empty states. Effects and subscriptions have cleanup where applicable. UI is keyboard-operable, semantically structured and exposes accessible names and feedback. Validate rendering behavior deliberately, including list identity and avoidable re-renders.
