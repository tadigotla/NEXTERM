## 1. State and capture gating

- [ ] 1.1 In the DVR module of [terminal.html](terminal.html) (around line 548), declare `let recordingEnabled = true;` alongside the existing `snapshots` and `snapshotIdx` state.
- [ ] 1.2 Modify `pushSnapshot` (around [terminal.html:556](terminal.html#L556)) to early-return when `recordingEnabled === false`. Verify the welcome snapshot still captures because it runs before any user interaction.
- [ ] 1.3 Confirm that `goToSnapshot`, `goLive`, `playFrom`, scrubbing, and the progress bar still operate correctly when `recordingEnabled` is false (they read existing snapshots, never write).

## 2. STOP button

- [ ] 2.1 Add a `<button class="transport-btn" id="btnStop" title="Stop">⏹</button>` between Pause and Ahead in the transport markup (around [terminal.html:488](terminal.html#L488)). Use the existing SVG button pattern, not a literal glyph if other buttons use SVGs.
- [ ] 2.2 Add a `stopPlayback` (or equivalent) handler that: clears the auto-play interval, sets `isPlaying = false`, calls `goLive()`, and updates the UI state (`updateUiState`/`updateProgress`).
- [ ] 2.3 Wire `btnStop.addEventListener('click', stopPlaybackHandler)`.
- [ ] 2.4 Verify STOP is a no-op (no error) when already in live mode.

## 3. RECORD toggle

- [ ] 3.1 Add `<button class="transport-btn is-record active" id="btnRecord" title="Recording (click to toggle)">⏺</button>` after Fast Forward, preceded by a `.transport-divider` (around [terminal.html:494](terminal.html#L494)).
- [ ] 3.2 In CSS (around [terminal.html:282](terminal.html#L282)), add a `.transport-btn.is-record.active` rule that paints the glyph red (e.g. `#ff3b30`) with a matching glow, and ensure the idle (non-active) state reverts to the standard transport-btn styling.
- [ ] 3.3 Add a click handler that flips `recordingEnabled` and toggles the `active` class on `btnRecord`. No snapshot mutation, no `updateProgress` call needed.
- [ ] 3.4 On initial render, ensure the button has the `active` class so it visually matches `recordingEnabled = true`.

## 4. Status / discoverability

- [ ] 4.1 In the `status` command output (around [terminal.html:934](terminal.html#L934)) where `Snapshots` is printed, add a `Recording` row showing `ON` (in the active theme color) or `OFF` (in amber).
- [ ] 4.2 Update the welcome banner help text (around [terminal.html:1096](terminal.html#L1096)) to mention "STOP" and "RECORD" controls in passing — single sentence change, not a redesign.

## 5. Manual verification

- [ ] 5.1 Open [terminal.html](terminal.html) in a browser. Confirm the RECORD button renders in its red armed state on first paint and the welcome snapshot is present (Rewind works).
- [ ] 5.2 Run several commands; verify the snapshot count in `status` increments and the progress bar grows.
- [ ] 5.3 Click RECORD to disarm; run additional commands; verify snapshot count does not increase and the button visual reverts to idle.
- [ ] 5.4 Click RECORD again to re-arm; run another command; verify it is captured as a new snapshot at the end of the timeline.
- [ ] 5.5 Press Play; while auto-play is running, click STOP; verify auto-play halts immediately, the playback badge disappears, the input is re-enabled, and the status dot returns to green.
- [ ] 5.6 Manually rewind to snapshot 0, then click STOP; verify a clean return to live (no off-by-one or stuck state).
- [ ] 5.7 Confirm existing keyboard shortcuts (Space, Home, End, Arrow keys) still behave per the original spec.
- [ ] 5.8 Reload the page and confirm `recordingEnabled` resets to `true`.
