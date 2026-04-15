## Why

The command surface has accumulated a handful of toy/demo commands (`weather`, `calc`, `joke`, `colors`, `fortune`) that don't belong to Reelshell's core identity as a browser-terminal-you-can-rewind. Users type `help` and see the shell padded with novelty filler that dilutes the real toolset. Trimming them tightens the command list, reduces the `sysinfo` "commands loaded" count honestly, and frees `NX.State.FORTUNES` (currently used only by `fortune`) for deletion.

## What Changes

- **BREAKING**: Remove the following commands from `src/commands.js`:
  - `weather` — mock weather report
  - `calc` — math expression evaluator (uses a `Function()` eval path, also a minor hardening win)
  - `joke` — random programming joke
  - `colors` — color-palette demo line
  - `fortune` — random fortune line
- Remove the `FORTUNES` array from `NX.State` in `src/state.js`, since `fortune` was its only consumer.
- Rebuild `terminal.html` from sources so the generated artifact no longer contains these commands.
- Update any in-terminal help/banner text only if it explicitly names these commands (verify during implementation).

Users who type any of the removed commands will get the standard `command not found` error, including the existing "did you mean" suggestion behavior — no special deprecation message.

## Capabilities

### New Capabilities
- `command-surface`: The product-level boundary of which built-in commands Reelshell ships with. Establishes the "no novelty filler" rule so future additions/removals are discussed as spec changes, not silent edits. Documents the current approved command list and explicitly excludes the five novelty commands being removed here.

### Modified Capabilities
<!-- None: `modular-source` mentions `commands.js` as a module but does not list individual commands, so removing commands changes implementation, not spec-level behavior there. -->


## Impact

- **Code**:
  - [src/commands.js](src/commands.js) — delete the five `register(...)` blocks (lines 157–193).
  - [src/state.js](src/state.js) — delete the `FORTUNES` array (line 9+).
  - [terminal.html](terminal.html) — regenerated via `node build.mjs`; not hand-edited.
- **APIs**: None — fully client-side.
- **Persisted state**: None. Removed commands had no persisted state of their own.
- **Docs**: [README.md](README.md) and [Reelshell-Specification.md](Reelshell-Specification.md) — scan for any explicit mention of the removed commands and remove.
- **Tests / smoke**: Manual smoke: `help` lists the trimmed set; each removed command triggers `command not found`; `sysinfo` "Commands loaded" decrements by 5; no console errors on boot.
