# Architecture principles

1. Product rules and accepted ADRs guide architecture; a current ticket may narrow them only through recorded clarification.
2. For a familiar significant design decision, the learner proposes first and Codex reviews it. For an unfamiliar mechanism, teach a concrete example first, then provide a reasoned recommendation the learner can accept or challenge. Product policy belongs to the PO; learner ownership does not require guessing untaught business or security decisions. Record accepted choices before implementation.
3. Prefer reversible, well-bounded changes and make trade-offs explicit.
4. Module boundaries, data ownership, error paths and transaction boundaries require deliberate design when relevant.
5. Decisions affecting multiple modules, data, infrastructure or future reversibility need an ADR.

This is a set of constraints, not an architecture design.
