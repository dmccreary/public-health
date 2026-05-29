---
title: Universal Health Coverage Cube
description: Universal Health Coverage Cube
status: scaffold
library: p5.js
bloom_level: TBD
---

# Universal Health Coverage Cube



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: "Global Health"](../../chapters/09-global-health/index.md).

```text
Type: microsim
**sim-id:** uhc-coverage-cube<br/>
**Library:** p5.js<br/>
**Status:** Specified

Three-dimensional wireframe cube rendered in 2.5D perspective (isometric projection) representing the WHO UHC three-dimension model. The three axes are: Population covered (Who — from 0% to 100% of population), Services included (What — from narrow emergency care to comprehensive care), and Direct costs (How much — from 100% out-of-pocket to fully subsidized). An interactive slider controls the size of the shaded volume representing current coverage; the default fills roughly 50% of the cube to represent a middle-income country. Three buttons cycle through preset country profiles: "Low-income country," "Middle-income country," and "High-income country," each adjusting the shaded volume dimensions. Clicking any face of the cube opens an annotation panel explaining that dimension (population coverage, service range, financial protection). A tooltip on hover shows the numerical value for the selected country profile on each axis.
```

## Related Resources

- [Chapter 9: "Global Health"](../../chapters/09-global-health/index.md)
