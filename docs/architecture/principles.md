# Architecture principles

1. Product rules and accepted ADRs guide architecture; a current ticket may narrow them only through recorded clarification.
2. The user proposes significant design decisions first. Codex reviews the proposal before suggesting alternatives.
3. Prefer reversible, well-bounded changes and make trade-offs explicit.
4. Module boundaries, data ownership, error paths and transaction boundaries require deliberate design when relevant.
5. Decisions affecting multiple modules, data, infrastructure or future reversibility need an ADR.

This is a set of constraints, not an architecture design.
