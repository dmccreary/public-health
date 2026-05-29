---
title: SIR Model Compartment Flow
description: SIR Model Compartment Flow
status: scaffold
library: p5.js
bloom_level: TBD
---

# SIR Model Compartment Flow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: "Systems Thinking: Modeling and Policy"](../../chapters/15-systems-thinking-modeling/index.md).

```text
Type: microsim
**sim-id:** sir-compartments<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive compartment flow diagram showing the SIR model as three connected boxes (S → I → R). Each box displays the current stock value (initialized to S=9990, I=10, R=0). Clicking each arrow between compartments reveals the rate equation (infection rate = β·S·I/N; recovery rate = γ·I) with current parameter values substituted. Clicking each compartment box shows the level equation and a mini time-series of that compartment's trajectory. A toggle switches between SIR and SEIR (adding an E box between S and I with the σ progression rate). The diagram updates in real time as β and γ sliders are adjusted, showing how stock levels shift before running the full simulation.
```

## Related Resources

- [Chapter 15: "Systems Thinking: Modeling and Policy"](../../chapters/15-systems-thinking-modeling/index.md)
