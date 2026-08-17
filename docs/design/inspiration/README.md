# Inspiration

Reference screenshots for the `base-maia` / taupe design language. Open these
images directly when building UI — they show intent that prose can't carry.
The rules derived from them live in [`../README.md`](../README.md).

These sheets are the **current** style, generated from the same preset the app
runs, so shape, palette, and elevation can all be read straight off them. Values
still come from `app/globals.css` — when a pixel measured here disagrees with a
token, the token wins.

Kept here rather than in `public/` on purpose: `public/` is served to browsers
and ships with the deploy, and these are internal references.

## Where we deviate on purpose

Two things in the app do not match the sheets. Both are deliberate — don't
"fix" them back:

| | Sheets | Bibliotek |
| --- | --- | --- |
| Dividers inside cards | some cards rule off the header and footer (`Codespaces`) | **never** — spacing alone separates header, content, footer |
| Table row separators | inset, stopping short of the card edge | edge to edge, from the `Table` primitive |

## `maia-app-surfaces.png`

Applied product surfaces — the language in real use, not in isolation.

- Stat blocks: uppercase micro-label over a large serif figure, with a terracotta
  progress bar and a `65% achieved` / `$273,000` caption row beneath. Sits in a
  `muted` tile inside the card, not on the card ground
- Transaction lists: leading icon tile, two-line title/subtitle, muted date
  column, right-aligned amount, trailing **three-dot vertical overflow button** —
  a list, never a grid of cards. No divider under the header; hairlines only
  *between* rows, never above the first or below the last
- Money deltas: negative in default foreground, positive in green (`+$4,200.00`)
- Forms in context: filled inputs, a `$` prefix inside the amount field, sliders
  with `$50 (MIN)` / `$10,000 (MAX)` captions, and a **full-width** terracotta
  submit at the card foot — pills go full width when they close a card
- A disabled/pending primary in a lighter terracotta tint (`Save Payout Settings`)
- Radio cards (`Bank Transfer` / `PayPal`): two-line tiles, the selected one
  ringed in terracotta — the pattern for a small either/or choice
- Inset rows for secondary entry points: `Danger Zone` with an alert icon and a
  chevron, `Change transfer limit` with a gear. Neither is a button
- Dismissible cards carry a quiet `×` in the header, not a labelled Cancel
- Sidebar nav with a filled active row under an uppercase group label, and a
  `Home › … › Payments` breadcrumb that collapses its middle
- Small paired stat cards (`Card Balance`, `Payment Due`) with a quiet inline
  outline action

## `maia-components.png`

The component gallery and the palette itself.

- Swatch rows naming the tokens: `--background`, `--foreground`, `--primary`,
  `--secondary`, `--muted`, `--accent`, then `--border` and `--chart-1..5`.
  `--accent` reads terracotta here, the same as `--primary` — that is Maia, and
  it is why `bg-accent` is never a subtle tint
- The type pairing stated outright: `NOTO SERIF · DM SANS`, with a serif
  headline over sans body
- Button row: `Button` (solid terracotta) · `Secondary` · `Outline` · `Ghost`
- Badge row in the same weights, plus radio, checkbox, and toggle — all
  terracotta when active
- Toolbar icon buttons: ghost, unlabelled, packed in rows — the density to copy
  for a table toolbar
- Charts: taupe `chart-*` bars, stacked and grouped, with a donut (serif figure
  in the hole) and an area chart. Terracotta appears only as an accent, never as
  the whole series
- Charts end in a **stat row** — `DESKTOP 1 224` / `MOBILE 860` / `MIX DELTA
  +42%` — splitting the series into labelled figures under the plot
- Empty states (`No Team Members`, `No codespaces`): centred, icon tile or
  avatar cluster, serif title, muted explanation, one terracotta pill action,
  optionally an underlined text link beneath it
- Segmented control, file upload dropzone (dashed), skeleton loaders, time-slot
  chips, inline `Warning` badge, and a masked-value list (`••••••••`) for secrets
