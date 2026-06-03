# MicroSim Generation Log: missing-data-mechanisms

- **Sim ID:** missing-data-mechanisms
- **Source chapter:** docs/chapters/16-data-science-foundations/index.md
- **Library:** p5.js
- **Bloom Level:** Analyze (L4)
- **CANVAS_HEIGHT:** 530 (iframe height = 532)
- **Status:** implemented

## Learning Objective

Analyze (L4) the three canonical missing-data mechanisms — MCAR, MAR,
and MNAR — by clicking individual missing cells and seeing which observed
or unobserved variable is driving the missingness pattern, then identify
when complete-case analysis is unbiased, biased-but-recoverable, or
biased-and-unrecoverable.

## Instructional Design Decision

- **Pattern:** Compare-and-contrast switching + click-to-inspect cells.
- **Why p5.js, not Chart.js:** the spec requires a 10x20 grid of
  colored cells with click affordance on each cell and a dynamic side
  panel — none of Chart.js's built-in chart types fit this cleanly,
  while p5.js handles a grid + click + side panel in a single canvas
  with no DOM overhead.
- **Rationale for Analyze level fit:** the learner is asked to look at
  three different spatial patterns and infer which observed/unobserved
  variable is driving the missingness — a classic L4 analyze-the-pattern
  task, not a passive viewing or step-through worked example.

## Implementation Notes

- Grid is 10 columns x 20 rows, headers showing 10 variable names
  (ID, Age, Sex, BMI, BP, Income, Smoke, Alcohol, Diet, Exercise).
- Each row carries `_meta` with the latent values (age, incomeNorm,
  alcoholNorm) that drive the missingness rules. This is what lets a
  per-cell click explain *why* a specific gray cell is missing.
- MCAR: independent ~15% probability per cell.
- MAR: Income missing with p=0.80 if Age > 65 else p=0.05, plus light
  background MCAR noise (p=0.04) on other columns so the demo dataset
  doesn't look unrealistically clean.
- MNAR: Alcohol cell missing with probability proportional to the
  Alcohol value itself ((value - 0.55) * 1.8, clipped at 0), plus light
  background noise. Heavier drinkers are systematically dropped.
- The Age column header is highlighted orange ONLY in MAR mode — this
  is the visual cue that an OBSERVED variable is driving missingness.
- The bottom legend shows the trigger swatch only when MAR is active,
  so it correctly disappears in MCAR/MNAR (where no observed variable
  is driving the pattern).
- Active-mechanism indicator: a 3px navy bar drawn under the active
  button's row.
- Click a missing cell to update the right panel with a cell-specific
  explanation (column name, mechanism, why-this-cell-specifically, and
  the bias / handling recommendation).

## Layout Review

- **Screenshot:** missing-data-mechanisms.png (800x530, 46KB)
- **Verdict:** PASS on first capture.
  - Title visible at top.
  - All 10 column headers labeled and not clipped.
  - Grid renders cleanly with observed (light blue) and missing (dark
    gray) cells.
  - Right panel has full mechanism overview text with no overflow.
  - Bottom legend visible inside the drawing area.
  - All four controls (MCAR, MAR, MNAR, New Dataset) fully visible in
    the controls strip below the drawing area.
  - Mechanism short-description line under the buttons is visible.
- No patch cycles needed.

## Files Created

- `docs/sims/missing-data-mechanisms/main.html` (replaced stub)
- `docs/sims/missing-data-mechanisms/missing-data-mechanisms.js`
- `docs/sims/missing-data-mechanisms/index.md`
- `docs/sims/missing-data-mechanisms/metadata.json`
- `docs/sims/missing-data-mechanisms/missing-data-mechanisms.png`

## Chapter File

Not modified. The chapter already embeds the iframe at
`../../sims/missing-data-mechanisms/main.html` with `height="480px"`.
The recommended iframe height is `CANVAS_HEIGHT + 2 = 532` — this can
be fixed by a later batch run of `fix-iframe-heights.py` and is out of
scope for this single-sim generation per the constraint "DO NOT edit
chapter files".
