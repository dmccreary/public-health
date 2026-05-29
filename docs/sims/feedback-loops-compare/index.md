---
title: Reinforcing vs. Balancing Feedback Loops
description: Reinforcing vs. Balancing Feedback Loops
status: scaffold
library: p5.js
bloom_level: TBD
---

# Reinforcing vs. Balancing Feedback Loops



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: "Systems Thinking: Foundations and Causal Diagrams"](../../chapters/14-systems-thinking-foundations/index.md).

```text
Type: microsim
**sim-id:** feedback-loops-compare<br/>
**Library:** p5.js<br/>
**Status:** Specified

Side-by-side interactive comparison of a reinforcing loop (epidemic growth) and a balancing loop (population immunity). Left panel shows epidemic spread: a reinforcing loop with variables "Infected Individuals," "Transmission Events," and "New Cases." Right panel shows population immunity: a balancing loop with variables "Susceptible Population," "Vaccination Rate," "Immune Population," and "Transmission Rate." Each arrow can be clicked to reveal its polarity (+/−) and a plain-English explanation. A "run simulation" button animates both loops simultaneously, showing exponential growth on the left and S-shaped stabilization on the right, illustrating why epidemic curves flatten. Labels show R-loop and B-loop notation clearly.
```

## Related Resources

- [Chapter 14: "Systems Thinking: Foundations and Causal Diagrams"](../../chapters/14-systems-thinking-foundations/index.md)
