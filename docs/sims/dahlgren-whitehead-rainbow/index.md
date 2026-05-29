---
title: Dahlgren-Whitehead Rainbow Model
description: Dahlgren-Whitehead Rainbow Model
status: scaffold
library: p5.js
bloom_level: TBD
---

# Dahlgren-Whitehead Rainbow Model



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: "Health Equity and Social Determinants of Health"](../../chapters/10-health-equity-sdoh/index.md).

```text
Type: microsim
**sim-id:** dahlgren-whitehead-rainbow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw six concentric arc bands (upper hemisphere) representing, from innermost to outermost: (1) Age, Sex, Heredity [dark blue], (2) Individual Lifestyle Factors [orange], (3) Social and Community Networks [green], (4) Living and Working Conditions [teal], (5) General Socioeconomic, Cultural & Environmental Conditions [purple], (6) a label ring with the layer name. Each band is clickable. On hover, the band brightens and shows a tooltip with the layer name. On click, a panel to the right of the arc displays: the layer name as heading, a 2-sentence definition, and three concrete public health examples. A "Reset" button clears the panel. Responsive to container width.
```

## Related Resources

- [Chapter 10: "Health Equity and Social Determinants of Health"](../../chapters/10-health-equity-sdoh/index.md)
