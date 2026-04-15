# command-surface Specification

## Purpose
TBD - created by archiving change remove-novelty-commands. Update Purpose after archive.
## Requirements
### Requirement: Command surface is curated and focused

Reelshell SHALL ship only commands that serve its identity as a browser terminal with session DVR, virtual filesystem, and session persistence. Novelty commands — commands that exist purely as demos, jokes, or cosmetic filler and do not exercise a core capability — SHALL NOT be part of the built-in command set.

Every built-in command SHALL fall into at least one of these categories:

- **Shell fundamentals**: `help`, `clear`, `echo`, `date`, `whoami`, `uptime`, `history`, `banner`
- **Virtual filesystem**: `ls`, `cd`, `pwd`, `cat`, `mkdir`, `touch`, `write`, `rm`, `tree`
- **Session / identity**: `user`, `theme`, `sysinfo`, `export`, `wipe`
- **DVR and persistence**: any commands wired into `NX.DVR` or `NX.Persist` surfaces

A command that does not clearly belong to one of the categories above SHALL NOT be registered in `src/commands.js`.

#### Scenario: Developer proposes a toy command

- **WHEN** a contributor wants to add a command that does not serve a core capability (e.g., a joke generator, a mock weather line, an eval-based calculator, a random fortune, a color-swatch demo)
- **THEN** the command is rejected at review
- **AND** the contributor is pointed at this requirement

#### Scenario: `help` reflects the curated surface

- **WHEN** a user types `help` in the terminal
- **THEN** the listed commands all fall into one of the approved categories above
- **AND** no listed command is a novelty/filler command

#### Scenario: `sysinfo` command count is honest

- **WHEN** a user runs `sysinfo`
- **THEN** the "Commands loaded" count equals the number of commands registered in `src/commands.js`
- **AND** that count does not include any of the removed novelty commands (`weather`, `calc`, `joke`, `colors`, `fortune`)

### Requirement: Novelty commands removed

The built-in command set SHALL NOT include `weather`, `calc`, `joke`, `colors`, or `fortune`. Typing any of these at the Reelshell prompt SHALL produce the standard unknown-command error path, identical to any other unrecognized input.

#### Scenario: User types a removed command

- **WHEN** a user enters `weather`, `calc 2+2`, `joke`, `colors`, or `fortune` at the prompt
- **THEN** Reelshell prints `command not found` with the offending command highlighted
- **AND** the existing two-character "did you mean" suggestion path runs unchanged
- **AND** no residual output from the old implementation appears

#### Scenario: Grepping source for removed commands

- **WHEN** a reviewer searches `src/` for the strings `'weather'`, `'calc'`, `'joke'`, `'colors'`, or `'fortune'` as command-name string literals
- **THEN** no `register(...)` call matches
- **AND** `NX.State.FORTUNES` is no longer defined, since `fortune` was its only consumer

#### Scenario: Generated `terminal.html` is in sync

- **WHEN** the build is run after the removal (`node build.mjs`)
- **THEN** the regenerated `terminal.html` contains no `register('weather'`, `register('calc'`, `register('joke'`, `register('colors'`, or `register('fortune'` call sites
- **AND** the generated file boots cleanly with no console errors

