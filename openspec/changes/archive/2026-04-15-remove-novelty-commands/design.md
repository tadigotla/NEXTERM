## Context

Reelshell's command registry lives in [src/commands.js](src/commands.js), where each built-in is a `register(name, desc, usage, fn)` call. Five of the current entries — `weather`, `calc`, `joke`, `colors`, `fortune` — are toy commands that don't serve any core capability (DVR, filesystem, persistence, identity). They were added early for demo energy and have outlived their purpose.

Additionally, `src/state.js` defines a `FORTUNES` array on `NX.State` whose sole consumer is the `fortune` command. Removing `fortune` makes that array dead data.

The codebase is built via `node build.mjs`, which concatenates `src/*.js` into [terminal.html](terminal.html). All edits happen in `src/`; `terminal.html` is a generated artifact.

## Goals / Non-Goals

**Goals:**
- Physically remove the five `register(...)` blocks for `weather`, `calc`, `joke`, `colors`, `fortune` from `src/commands.js`.
- Delete `NX.State.FORTUNES` from `src/state.js` since it is now unused.
- Regenerate `terminal.html` so the shipped artifact matches source.
- Leave the unknown-command error path untouched so users typing a removed command get the same feedback as any other typo.
- Establish a durable spec (`command-surface`) that codifies the "no novelty filler" rule so this doesn't regrow.

**Non-Goals:**
- No deprecation warning, no transition period, no alias, no "please use X instead" message for the removed commands.
- No refactor of the remaining command registrations or the `execute()` dispatch path.
- No change to `help` formatting, banner text, or theme behavior.
- No touch to persisted state or migrations — removed commands had no persistent surface.
- No tests added (repo has no test harness; smoke test is manual per `modular-source`).

## Decisions

### Decision 1: Hard removal, not deprecation

**Choice**: Delete the `register(...)` blocks outright. No soft-deprecation path, no console warning, no alias.

**Rationale**: These commands are toys — no user workflow depends on them. A deprecation window adds code complexity (warning text, alias plumbing, a future removal date) for zero benefit. The existing `command not found` path with its "did you mean" suggestions already handles the user-facing experience gracefully.

**Alternative considered**: Mark each command as deprecated and print a warning for one release before removal. Rejected because (a) there's no "release" concept — the repo ships from `main`, and (b) the existing unknown-command error with `did you mean` suggestions is already a perfectly good UX for this case.

### Decision 2: Remove `NX.State.FORTUNES` in the same change

**Choice**: Delete the `FORTUNES` array from `src/state.js` as part of this change, not in a follow-up.

**Rationale**: Dead data is a smell. The only reason to leave it would be "someone might want it back", which contradicts the whole premise of removing `fortune`. If it's ever wanted again, git history has it.

**Alternative considered**: Keep `FORTUNES` "in case". Rejected — fits the "don't design for hypothetical future requirements" principle.

### Decision 3: Create a `command-surface` capability spec

**Choice**: Introduce a new spec capability that documents which command categories are allowed and explicitly lists the removed novelty commands as forbidden.

**Rationale**: Without a spec-level rule, the same novelty commands (or their cousins) will drift back in unchallenged. Codifying the "curated command surface" as a requirement makes any future addition a visible spec-change conversation rather than a silent commit.

**Alternative considered**: Leave the rule implicit in reviewer judgment. Rejected — OpenSpec's whole point is that product-level boundaries live in specs, not tribal knowledge.

### Decision 4: Use `calc` removal to also shed a `Function()` eval path

**Choice**: The `calc` command constructs `new Function('"use strict"; return (' + expr + ')')()`. Even though it sanitizes input, removing it eliminates a dynamic-eval code path entirely.

**Rationale**: Not the primary reason for removal (`calc` goes because it's novelty, not because it's dangerous), but it's a minor hardening bonus worth naming so it doesn't look like an oversight.

## Risks / Trade-offs

- **Risk**: A user has muscle-memory for one of the removed commands and is confused when it vanishes.
  **Mitigation**: The existing "did you mean" suggestion will surface similarly-prefixed commands when possible. Worst case, they type `help` and see the trimmed list.

- **Risk**: Documentation or the in-terminal banner references one of the removed commands, so removal leaves a dangling mention.
  **Mitigation**: Tasks include an explicit grep pass across `README.md`, `Reelshell-Specification.md`, `src/boot.js`, and `src/commands.js` help/banner text for the removed names.

- **Risk**: Build is forgotten and `terminal.html` drifts from sources.
  **Mitigation**: Tasks explicitly call out running `node build.mjs` and verifying the regenerated `terminal.html` contains none of the removed `register(...)` call sites.

- **Trade-off**: The change is tiny but ships with a full new spec capability. This is deliberate: the spec is the durable artifact, the code deletion is the one-shot consequence. Future "should we add command X" conversations can now cite `command-surface`.

## Migration Plan

No runtime migration required — removed commands had no persisted state. Users on an existing Reelshell session who reload after pulling this change simply stop seeing the five commands in `help` and `sysinfo`'s command count drops by 5. Rollback is `git revert`.

## Open Questions

- None. Scope is deliberately narrow.
