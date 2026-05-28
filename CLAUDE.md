# CLAUDE.md — Introduction to Public Health

Project-specific guidance for Claude Code working in this repository.
See `~/.claude/CLAUDE.md` for global rules that apply across all of
Dan's projects.

## Learning Mascot: Sage the Crane

### Mascot File Index

The canonical files for this mascot. When editing any of these, update
the others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name:** Sage
- **Species:** Crane
- **Personality:** Calm, evidence-based, curious, systems-minded, equity-aware, quietly funny
- **Catchphrase:** "What does the evidence show?"
- **Visual:** White crane with light-gray feather shading, small teal scarf, round wire-frame glasses, deep-orange beak and legs, clipboard tucked under one wing. Modern flat cartoon vector style.

### Voice Characteristics

- Asks short, open questions before giving answers
- Uses simple, encouraging language; defines technical terms inline the first time
- Refers to students as "investigators" or "the next generation of public health workers"
- Never moralizes; lets the evidence carry the weight
- Uses light, well-timed humor — a pun on a technical term, a wry aside about being a bird with a clipboard, a self-deprecating quip about cranes standing still for hours. Humor is a seasoning, not the main course.
- Signature phrases: "What does the evidence show?", "Let's look at the data together.", "Who is being counted — and who isn't?"
- Always gender-neutral — refer to Sage by name; never use he/she pronouns

### Humor Guardrails

Sage can be funny, but public health covers topics where a joke would
land badly. Stay straight-faced on:

- Mortality, suicide, overdose, excess-death figures
- Health disparities, racism in medicine, discrimination
- Active outbreaks and individual patient stories
- Pediatric harm or children's deaths

Humor is welcome around methodological quirks (correlation vs. causation),
technical-term puns (R-naught/R-not, incidence/incidents), Sage's own
bird-ness, and bureaucratic absurdity (acronyms, form-filling).

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waving welcome">
        Admonition text goes here after the img tag.

**Image-path depth rule:** the `src` is relative to the rendered page URL,
not the markdown file path. For a chapter at
`docs/chapters/01-intro/index.md` (which renders at `chapters/01-intro/`),
use `../../img/mascot/`. For a page at `docs/learning-graph/mascot-test.md`
(renders at `learning-graph/mascot-test/`), also use `../../img/mascot/`.
Count `../` segments from the rendered URL, not the source path.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|-----------------|-----------|
| General note / sidebar | `mascot-neutral` | As needed |
| Chapter opening | `mascot-welcome` | One per chapter |
| Key concept | `mascot-thinking` | 2–3 per chapter |
| Helpful tip | `mascot-tip` | As needed |
| Common mistake | `mascot-warning` | As needed |
| Difficult content | `mascot-encourage` | Where students may struggle |
| Section / chapter completion | `mascot-celebration` | One per chapter, at the end |

### Do's and Don'ts

**Do:**

- Use Sage to introduce new topics warmly
- Include the catchphrase in welcome admonitions where it fits naturally
- Keep dialogue brief — 1 to 3 sentences per admonition
- Match the pose/image to the content type
- Keep Sage's voice calm and evidence-based

**Don't:**

- Use Sage more than 5–6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Sage's personality or speech patterns
- Use gendered pronouns for Sage
