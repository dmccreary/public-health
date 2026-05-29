---
title: Reproducible Research Workflow
description: Reproducible Research Workflow
status: scaffold
library: vis-network
bloom_level: TBD
---

# Reproducible Research Workflow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: "Data Science Foundations for Public Health"](../../chapters/16-data-science-foundations/index.md).

```text
Type: microsim
**sim-id:** reproducible-research-workflow<br/>
**Library:** vis-network<br/>
**Status:** Specified

Show a directed graph of a Git-based reproducible research pipeline. Nodes (clickable, styled as rounded boxes):
1. Raw Data (gray) — CDC download, survey CSV, vital records extract
2. Data Dictionary (gray) — variable codebook, README
3. Cleaning Script (blue) — Python/pandas or R/dplyr transformations
4. Clean Data (blue) — versioned intermediate file
5. Analysis Notebook (blue) — Jupyter .ipynb or R Markdown .Rmd
6. Figures & Tables (green) — generated outputs (never manually edited)
7. Report / Paper (green) — synthesizes outputs
8. Git Commit (orange) — each arrow that crosses a stage boundary represents a commit
9. GitHub Repository (orange) — remote origin with DOI via Zenodo

Edges: Raw Data → Cleaning Script → Clean Data → Analysis Notebook → Figures & Tables → Report / Paper. Data Dictionary → Cleaning Script (dashed). Each node click opens a tooltip explaining the stage and its reproducibility role. Nodes are color-coded by stage: input (gray), processing (blue), output (green), version control (orange).
```

## Related Resources

- [Chapter 16: "Data Science Foundations for Public Health"](../../chapters/16-data-science-foundations/index.md)
