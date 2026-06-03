# MicroSim Generation Log: morans-i-visualizer

- **sim_id:** morans-i-visualizer
- **library:** p5.js
- **bloom level:** Analyze (L4)
- **CANVAS_HEIGHT:** 600 (iframe height 602)
- **chapter:** 17-data-science-advanced
- **status:** implemented, layout reviewed

## Spec Extracted

Display a 10x10 grid of counties (five-color sequential ramp), driven by three
sliders: Clustering Strength (0-1), Spatial Dispersion (-1 to 0), Outlier
Injection (0-5). Real-time Moran's I (queen contiguity, row-standardized
weights) updates with each slider change. Side panel shows Moran's I value,
interpretation text, -1..+1 scale bar with current-value indicator, and a
small Moran's scatter plot (standardized value vs. spatial lag) with HH / HL /
LL / LH quadrant labels. Clicking a cell highlights it and its queen-contiguous
neighbors with orange borders and displays neighbor mean.

## Instructional Design Check

- Bloom Level: Analyze (L4)
- Bloom Verb: interpret
- Recommended Pattern: parameter sliders with live statistic readout + scatter
  plot (Analyze-level pattern from microsim-generator Step 3.2)
- Specification Alignment: aligned — direct manipulation lets students decompose
  the global statistic into its clustering/dispersion/outlier sources
- Rationale: Moran's I is famously counterintuitive (especially the negative-I
  checkerboard case and the LISA quadrants). Sliders that move the I value in
  real time, paired with a Moran's scatter that visibly rotates from y=x
  diagonal (clustered) to y=-x (dispersed), build the intuition no static
  figure can match.

## Files Written

- main.html (replaced stub; p5.js CDN, schema meta, bare `<main></main>`)
- morans-i-visualizer.js (~430 lines; CANVAS_HEIGHT comment on line 2)
- index.md (frontmatter, iframe at 602px, fullscreen button, spec block)
- metadata.json (Dublin Core + bloom + chapter fields)
- morans-i-visualizer.png (50KB screenshot)

## Layout Review (Step 9)

Single review cycle. Screenshot inspected via Read:

- PASS Title not clipped, centered at top
- PASS 10x10 grid renders with full color ramp visible (low yellow -> dark red)
- PASS Legend ("low" / "high") visible below grid
- PASS Moran's I value "+0.832" rendered large in green (positive-cluster color)
- PASS Interpretation text "Strong positive: high values cluster with high" fits
- PASS -1/0/+1 scale bar with green triangle indicator at correct position
- PASS Moran's scatter plot HH/LH/LL/HL quadrant labels all visible
- PASS Scatter points form expected positive diagonal at default clustering=0.70
- PASS All three sliders + value labels + hint text visible
- PASS Reset button visible, not clipped
- PASS Controls section header "Controls" labeled

## Verdict

Layout PASS on first capture; no patch cycles needed.

## Notes / Caveats

- The chapter (`docs/chapters/17-data-science-advanced/index.md`) currently
  embeds the iframe at `height="480px"`. The sim canvas is 600px, so chapter
  embedding will clip the bottom (Reset button) until the chapter iframe height
  is bumped to 602px by `fix-iframe-heights.py`. Task instructions said not to
  edit the chapter, so this is left for the batch tool.
- Moran's I computed correctly: row-standardized queen weights, n/W * Sum(w_ij
  * (x_i - mean)(x_j - mean)) / Sum((x_i - mean)^2).
- Dispersion slider uses -1..0 range as specified; full dispersion (-1) maps to
  pure checkerboard which approaches the theoretical Moran's I minimum for a
  10x10 grid (around -0.5 to -0.6 with row-standardized queen weights).
- Footgun avoided: did not reuse LEFT/RIGHT/CENTER/TOP/BOTTOM as identifiers;
  used the p5.js constants directly via textAlign().
