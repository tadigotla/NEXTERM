## 1. Remove command registrations

- [x] 1.1 Open [src/commands.js](src/commands.js) and delete the `register('calc', ...)` block (currently around line 157).
- [x] 1.2 Delete the `register('weather', ...)` block (currently around line 166).
- [x] 1.3 Delete the `register('colors', ...)` block (currently around line 178).
- [x] 1.4 Delete the `register('joke', ...)` block (currently around line 182).
- [x] 1.5 Delete the `register('fortune', ...)` block (currently around line 191).
- [x] 1.6 Verify no other code in `src/commands.js` references the removed commands (grep for `weather`, `calc`, `joke`, `colors`, `fortune` as strings inside the file).

## 2. Remove dead state

- [x] 2.1 Open [src/state.js](src/state.js) and delete the `FORTUNES` array property from `NX.State` (around line 9).
- [x] 2.2 Grep `src/` for `FORTUNES` to confirm no other module consumed it; if any stragglers exist, remove them too.

## 3. Rebuild the generated artifact

- [x] 3.1 Run `node build.mjs` from the repo root.
- [x] 3.2 Confirm the build report prints without errors and that `src/commands.js` and `src/state.js` sizes decreased.
- [x] 3.3 Grep the regenerated [terminal.html](terminal.html) for `register('weather'`, `register('calc'`, `register('joke'`, `register('colors'`, and `register('fortune'` — each search MUST return zero matches.
- [x] 3.4 Grep the regenerated `terminal.html` for `FORTUNES` — MUST return zero matches.

## 4. Documentation cleanup

- [x] 4.1 Grep [README.md](README.md) for `weather`, `calc`, `joke`, `colors`, `fortune` (case-insensitive). Remove or rewrite any references that describe them as features.
- [x] 4.2 Grep [Reelshell-Specification.md](Reelshell-Specification.md) for the same terms. Remove or rewrite feature-level mentions.
- [x] 4.3 Grep [src/boot.js](src/boot.js) and any in-terminal banner/help text for explicit references to the removed commands. Remove them.
- [x] 4.4 Do NOT edit `openspec/specs/` directly — spec changes are applied by the archive step, not by hand.

## 5. Manual smoke test

- [ ] 5.1 Open the regenerated `terminal.html` in a browser with the devtools console visible.
- [ ] 5.2 Confirm the boot banner renders with no console errors or warnings.
- [ ] 5.3 Type `help` and verify none of `weather`, `calc`, `joke`, `colors`, `fortune` appear in the listing.
- [ ] 5.4 Type each removed command individually (`weather`, `calc 2+2`, `joke`, `colors`, `fortune`) and confirm each prints the standard `reelshell: command not found` error line.
- [ ] 5.5 Confirm the "Did you mean" suggestion path still fires on a typo like `weathr` or `jok` (existing behavior untouched).
- [ ] 5.6 Type `sysinfo` and confirm the "Commands" row count reflects the new total (previous count minus 5).
- [ ] 5.7 Exercise one command from each remaining category to confirm nothing adjacent broke: `ls` (filesystem), `theme amber` (themes), play/pause on the DVR transport (DVR), `history` (history), `wipe` then cancel (persistence path).
- [ ] 5.8 Reload the page and confirm persisted session state still restores cleanly (no errors tied to missing `FORTUNES`).

## 6. Wrap-up

- [x] 6.1 Run `openspec status --change remove-novelty-commands` and confirm all artifacts report `done`.
- [ ] 6.2 Stage the changes (`src/commands.js`, `src/state.js`, `terminal.html`, any touched docs) and review the diff once before handing off for commit.
- [ ] 6.3 Once merged and smoke-tested, run `/opsx:archive remove-novelty-commands` to fold the `command-surface` capability into `openspec/specs/`.
