---
title: p5.js MicroSim Anatomy
description: p5.js MicroSim Anatomy
status: scaffold
library: p5.js
bloom_level: TBD
---

# p5.js MicroSim Anatomy



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: "Simulation Design for Public Health Education"](../../chapters/18-simulation-design/index.md).

```text
Type: microsim
**sim-id:** p5-microsim-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Display a split-panel layout:

Left panel (50% width) — **Canvas View**: Show a running p5.js simulation (a simple 3-region SIR color visualization — green dots, yellow dots, red dots moving around). Four colored overlay regions with dashed borders and labels:
- Blue dashed border: "Canvas Region" (the simulation visualization area)
- Green dashed border: "Controls Region" (sliders and buttons below or beside the canvas)
- Orange dashed border: "Readout Region" (text outputs: current S/I/R counts, day number)
- Red dashed border: "Full Container (main element)"

Right panel (50% width) — **Code View**: Show annotated p5.js skeleton code with syntax highlighting (pseudocode style, not full working code):

```
function setup() {
  updateCanvasSize();   // ← ALWAYS FIRST
  canvas = createCanvas(cw, ch);
  canvas.parent(
    document.querySelector('main'));
  // Create controls
  rSlider = createSlider(0,1,.3,.01);
  resetBtn = createButton('Reset');
}

function draw() {
  background(245);
  updateSimulation();   // state logic
  drawAgents();         // visual output
  drawReadout();        // text overlay
}
```

Clicking any line or region label in either panel highlights the corresponding element in the other panel with a brief animation. A legend at the bottom maps each region to its function. A "Common Footgun" panel at the very bottom lists three p5.js mistakes: (1) Forgetting updateCanvasSize() → canvas has width=0 on load; (2) Drawing controls manually on canvas → breaks p5.js editor compatibility; (3) Putting state logic inside draw() that only runs once → duplicates side effects at 60fps.
```

## Related Resources

- [Chapter 18: "Simulation Design for Public Health Education"](../../chapters/18-simulation-design/index.md)
