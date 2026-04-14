# NEXTERM

A retro CRT terminal emulator that lives in a single HTML file.

NEXTERM is a fully client-side, browser-based shell with a virtual filesystem, 25+ built-in commands, four color themes, a brushed-metal DVR transport for replaying your session, and a glass-pane stardate clock. Zero dependencies, zero build step, zero server — just open [terminal.html](terminal.html) in any modern browser.

## Quick start

```sh
open terminal.html        # macOS
xdg-open terminal.html    # Linux
start terminal.html       # Windows
```

That's it. The whole product is a single ~50KB HTML file.

## Highlights

- **Authentic CRT aesthetic** — phosphor glow, scanlines, screen flicker, BIOS-style boot sequence, four color themes (green / amber / cyan / red), all desaturated for comfortable extended use.
- **Virtual filesystem** with the commands you'd expect: `ls`, `cd`, `pwd`, `cat`, `tree`, `mkdir`, `touch`, `write`, `rm`. Supports `~`, `..`, `.`, absolute and relative paths.
- **Session DVR** — every command snapshots the terminal output. A brushed-metal transport bar lets you scrub, step, play back, stop, or toggle recording mid-session.
- **Stardate panel** — the DVR's right-hand glass pane shows a live clock, day/date, and a slowly cycling ambient line (uptime, command count, active theme, fortunes). Pure-CSS frosted-glass effect over the brushed-metal substrate.
- **Keyboard-first** — full command history (`↑` / `↓`), tab completion, transport shortcuts (`Space`, `Home`, `End`, `←`, `→`), and a focus model that puts you back in the prompt the moment you click anywhere outside the transport.

## Built-in commands

| Command | Description |
|---|---|
| `help [command]` | Show available commands or details for one |
| `clear` | Clear the terminal output |
| `echo <text>` | Print text |
| `date` / `uptime` | Current date / session uptime |
| `whoami` / `user <name>` | Show or change the active username |
| `ls [path]` / `tree [path]` | List directory contents |
| `cd <path>` / `pwd` | Navigate the virtual filesystem |
| `cat <file>` | Display file contents |
| `mkdir <name>` / `touch <name>` / `rm <file>` | Manipulate filesystem entries |
| `write <file> <content>` | Write content to a file |
| `calc <expr>` | Evaluate a math expression |
| `weather [city]` | Mock weather report |
| `colors` | Show the active color palette |
| `joke` / `fortune` | Programming jokes and fortunes |
| `sysinfo` | OS / shell / user / snapshot / recording state |
| `history` | Command history |
| `theme <green\|amber\|cyan\|red>` | Switch color theme |
| `banner` | Re-display the boot banner |
| `export` | Download the session as a text file |

## Session DVR

Every command appends a snapshot of the terminal output to an in-memory timeline. The DVR transport bar lives at the bottom of the screen:

| Button | Action | Shortcut |
|---|---|---|
| ⏪ Rewind | Jump to snapshot zero | `Home` |
| ⏮ Back | Step to previous snapshot | `←` |
| ▶ Play | Auto-advance at 1.2s intervals | `Space` |
| ⏸ Pause | Hold current snapshot | `Space` |
| ⏹ Stop | Halt playback and return to live | — |
| ⏭ Ahead | Step to next snapshot | `→` |
| ⏩ Fast forward | Jump to latest and return to live | `End` |
| ⏺ Record | Toggle snapshot capture (default on) | — |

Run `status` (well — `sysinfo`) any time to see how many snapshots you've recorded and whether recording is currently armed.

## Project layout

```
.
├── terminal.html              # The entire product
├── NEXTERM-Specification.md   # Long-form spec — architecture, design system, edge cases
├── openspec/                  # Spec-driven change tracking
│   ├── specs/                 # Current capabilities (dvr-transport, glass-pane-stardate, ...)
│   └── changes/archive/       # Historical change proposals with their design + tasks
└── README.md
```

## Development

NEXTERM uses [OpenSpec](https://github.com/Fission-AI/OpenSpec) for spec-driven changes. Each feature lands as a proposal → design → spec deltas → task list → implementation, then archives into `openspec/changes/archive/`. The `openspec/specs/` directory is the source of truth for what the terminal currently does. Browse the archive to see how the brushed-metal panel, stardate clock, and subdued themes were each scoped and shipped.

There is no build step. Edit [terminal.html](terminal.html) and reload the browser.

## License

MIT — see [LICENSE](LICENSE).
