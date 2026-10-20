# Debugging incident

Use for a production bug, regression, failing integration, incorrect data, performance degradation or failing CI.

1. Collect symptoms and define impact.
2. Inspect available logs, errors, metrics or CI output.
3. Reproduce the behavior when feasible.
4. Separate observed facts from assumptions.
5. For learner-owned product debugging, let the learner lead with their own hypothesis; help with diagnosis, explain errors and unfamiliar mechanisms on request. Mentor tooling and fixture failures are corrected by Codex, not turned into learner exercises.
6. Localize the source before proposing a fix.
7. Validate the fix and regression risk.
8. Record root cause and a justified prevention or follow-up when needed.

In an agreed diagnosis task, do not reveal the cause at ticket creation. This never justifies withholding explanations the learner asks for. If the learner tries to patch before diagnosing, return to the earliest missing diagnostic step.

## Trustworthy observations

- Preserve the command's real exit code; successful output filtering is not a passed build. Batch independent checks and rerun the relevant subset after changes.
- Before blaming source changes, verify the actual listener, its build and process output. A startup line can precede a port-binding failure; check readiness through the intended HTTP endpoint and listening ownership.
- Assert fixture preconditions and affected-row counts, read back the exact target and include a control case. A setup that changed nothing is not a behavior test.
- Print only allowlisted non-secret facts. Never dump credential-bearing fixture files/diffs, cookie jars, raw Set-Cookie values or environment secrets.
- Keep uncertain diagnoses labelled as hypotheses. Source inspection, type checking and runtime execution establish different facts; report only what the observation supports.
