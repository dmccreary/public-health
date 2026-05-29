---
title: "Simulation Design for Public Health Education"
description: MicroSim design principles, p5.js for epidemic simulations, Chart.js and Plotly, vis-network for network diagrams, interactive SEIR and CLD simulations, health equity and surge capacity models, and behavioral intervention visualizations.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Simulation Design for Public Health Education

## Summary

Interactive simulations — MicroSims — are the distinctive pedagogical feature of this intelligent textbook, and this chapter is about designing them. Effective MicroSims embody one concept per simulation, provide immediate interactive feedback, and encode system dynamics visually in ways that static text cannot. This chapter covers MicroSim design principles rooted in Mayer's multimedia learning theory, the JavaScript libraries best suited to different simulation types (p5.js, Chart.js, Plotly, vis-network), the design of key public health simulations (SEIR, CLD, health equity, surge capacity), and the principles for making simulations adaptive and accessible.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 6: Environmental Health](../06-environmental-health/index.md)
- [Chapter 7: Social and Behavioral Health](../07-social-behavioral-health/index.md)
- [Chapter 9: Global Health](../09-global-health/index.md)
- [Chapter 10: Health Equity and Social Determinants](../10-health-equity-sdoh/index.md)
- [Chapter 13: Prevention Science](../13-prevention-science/index.md)
- [Chapter 14: Systems Thinking: Foundations and Causal Diagrams](../14-systems-thinking-foundations/index.md)
- [Chapter 15: Systems Thinking: Modeling and Networks](../15-systems-thinking-modeling/index.md)

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. MicroSim Design Principles
2. p5.js for Health Sims
3. Chart.js Visualization
4. Plotly Interactive Charts
5. vis-network Library
6. Interactive SEIR Simulator
7. SIR Parameter Sliders
8. Epidemic Curve Animation
9. CLD Interactive Simulation
10. Health Equity Simulation
11. ICU Surge Capacity Model
12. Behavioral Intervention Sim
13. Network Spread Simulation
14. Herd Immunity Visualization
15. Dose-Response Explorer
16. Policy Lever Simulation
17. Demographic Pyramid Sim
18. Vaccination Coverage Sim
19. Contact Tracing Sim
20. Health Disparities Viz
21. Supply Chain Surge Sim
22. Environmental Exposure Sim

---

!!! mascot-welcome "Building the Tools That Make the Invisible Visible"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    An R₀ of 2.5 is an abstraction. Watching an epidemic curve explode on your screen when you drag a slider from R₀ = 1.2 to R₀ = 2.5 is an experience. This chapter is about designing those experiences — simulations that let students discover public health principles rather than merely read about them.

---

## MicroSim Design Principles: Mayer's Theory Applied

### What Is a MicroSim?

A **MicroSim** (micro-simulation) is a focused, self-contained interactive visualization embedded in a web page, designed to teach a single well-defined concept through direct manipulation. The prefix "micro" signals the design constraint: one concept, one page, five minutes of meaningful interaction. MicroSims are not full simulation suites or dashboards — they are pedagogical instruments, each optimized for a single learning objective.

The distinction matters because scope creep is the most common failure mode in educational simulation design. A simulation that tries to model the entire COVID-19 pandemic — including behavioral responses, hospital capacity, variant evolution, vaccination rollout, and policy variation — teaches everything and nothing simultaneously. A simulation that lets a student change a single \( R_0 \) slider and observe what happens to the epidemic curve teaches one concept unforgettably.

### Mayer's Cognitive Theory of Multimedia Learning

Richard Mayer's **Cognitive Theory of Multimedia Learning** (CTML) provides the theoretical foundation for MicroSim design. CTML rests on three core principles drawn from cognitive psychology:

1. **Dual-channel assumption**: humans process verbal (text/narration) and visual (images/animation) information through separate cognitive channels, each with limited capacity
2. **Limited capacity assumption**: each channel can only process a small amount of information at one time — this is working memory
3. **Active processing assumption**: meaningful learning requires the learner to actively select, organize, and integrate information — passive exposure is insufficient

From these principles, Mayer derived evidence-based design guidelines for multimedia learning materials. The ones most relevant to MicroSim design are:

- **Coherence principle**: remove extraneous material — every visual element, label, and control that does not directly serve the learning objective adds cognitive load without adding learning value
- **Signaling principle**: use visual cues (arrows, highlighting, color coding) to direct attention to the most important elements
- **Contiguity principle**: place related text and graphics near each other spatially and temporally — labels should appear adjacent to the elements they describe
- **Interactivity principle**: learner control over the simulation (adjusting parameters, pausing, replaying) improves learning compared to passive animation
- **Segmenting principle**: present complex processes in stages, allowing learners to pace through each step, rather than all at once

Applied to an epidemic simulation: the simulation should display only the epidemic curve, the slider for the parameter being studied, and a minimal legend. Not a full dashboard. Not multiple simultaneous variables. Not a data table with 12 columns. The learning objective — "students can predict the effect of changing \( R_0 \) on the epidemic curve shape" — drives every design decision.

### The One-Concept Rule

The most important MicroSim design principle has no formal name in the pedagogical literature, but practitioners consistently rediscover it: **one concept per MicroSim**. This does not mean the simulation can only show one variable — it means the simulation has exactly one learning objective, one thing the learner will discover through manipulation, and one core insight they take away.

Testing whether a MicroSim obeys the one-concept rule is simple: complete this sentence — "After interacting with this simulation, students will be able to \_\_\_\_\_." If the blank requires the word "and," the simulation has scope creep.

!!! mascot-thinking "Designing for Discovery, Not Demonstration"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage looks thoughtful">
    The most powerful MicroSims are designed so that students discover the concept themselves through manipulation, rather than watching a demonstration. A herd immunity simulation where the student drags the vaccination coverage slider from 0% to 90% and watches new cases drop to near zero — and then discovers for themselves that the threshold is around 70-80% for a disease with R₀ = 5 — produces deeper learning than any explanation. Design the simulation so the surprise is the teacher.

---

## Library Selection Guide: p5.js, Chart.js, Plotly, vis-network

Choosing the right JavaScript library for a MicroSim affects both development efficiency and the quality of the resulting simulation. Each library has a different design philosophy, API style, and range of suitable applications.

### p5.js for Health Simulations

**p5.js** is a JavaScript library that brings the Processing creative coding environment to the web browser. p5.js provides a `setup()` function (runs once at initialization) and a `draw()` function (runs continuously at the frame rate, typically 60 fps), a 2D canvas drawing API, and built-in UI controls (sliders, buttons, checkboxes, dropdowns) that integrate directly with the canvas animation loop. This architecture makes p5.js ideal for:

- **Agent-based simulations**: moving particles representing susceptible/infected/recovered individuals, contact network nodes, or cells in a tissue
- **Animated flows**: particles moving through a pipeline or system diagram
- **Game-loop style simulations**: any simulation where the state updates continuously over time — epidemic curves evolving in real time, stock-and-flow models
- **Custom interactive diagrams**: flowcharts, annotated code anatomy views, anything requiring pixel-level layout control

In p5.js, always call `updateCanvasSize()` as the first line of `setup()` to capture the container width, and parent the canvas to `document.querySelector('main')` for compatibility with the p5.js editor. Controls are created using `createSlider()`, `createButton()`, and `createCheckbox()` — never draw controls manually on the canvas.

The key strength of p5.js is creative flexibility: any visual that can be described algorithmically can be built. The limitation is that p5.js requires more code for standard chart types (line charts, bar charts, scatter plots) than purpose-built charting libraries.

### Chart.js for Time-Series and Bar Charts

**Chart.js** is a charting library optimized for standard statistical charts — line charts, bar charts, pie/donut charts, scatter plots, radar charts — with clean default styles and smooth animation. Chart.js renders to a `<canvas>` element and provides a declarative configuration API: the chart type, data arrays, and display options are specified as a JavaScript object passed to the `Chart()` constructor.

Chart.js is the right choice when the visualization is fundamentally a statistical chart that updates dynamically. An epidemic curve that updates as the user changes parameters is an ideal Chart.js application: the animation between parameter states is handled automatically, the axes rescale automatically, tooltips appear on hover with zero additional code, and the chart is immediately responsive. Chart.js is the wrong choice for agent-based simulations, network diagrams, or anything requiring direct canvas drawing.

### Plotly for Interactive Scientific Charts

**Plotly** is a scientific charting library with richer interactivity than Chart.js: built-in zoom, pan, and selection tools; hover templates with full control over tooltip formatting; subplots and facets; 3D surface plots; geographic choropleths; and a consistent API across Python (plotly.py), R (plotly.R/ggplotly), and JavaScript. Plotly charts export to SVG or PNG with one click.

In MicroSim contexts, Plotly is the right choice when the chart needs to be explorable (zoom into a time series to see fine structure) or when multiple linked views are needed (selecting a point on a scatter plot highlights the same row in a separate chart). Plotly's limitation is larger file size and slower initial load compared to Chart.js.

### vis-network for Network and Graph Diagrams

**vis-network** renders interactive network graphs — nodes connected by edges — in an HTML `<div>` element using HTML5 Canvas. Nodes and edges can be styled, labeled, colored, and grouped; the physics engine handles layout automatically (with several layout algorithms available: force-directed, hierarchical, random). Clicking a node or edge triggers configurable events, enabling interactive navigation through the graph.

In public health education, vis-network is the natural choice for contact networks (who infected whom), flowcharts and process diagrams (the stages of an analytical pipeline, a disease surveillance system, a patient care pathway), knowledge graphs (concept dependencies in a learning graph), and causal loop diagrams where the node-edge structure is the primary content.

#### Table: JavaScript Library Selection Guide for MicroSims

| Library | Best For | Key Strength | Public Health Use Case | Example Simulation | Learning Curve |
|---------|----------|--------------|------------------------|-------------------|----------------|
| p5.js | Agent-based, animated, custom interactive | Maximum creative flexibility; direct canvas control; built-in controls | Epidemic spread animation, contact tracing sim, dose-response explorer, demographic pyramid | SIR agent simulation with moving susceptible/infected/recovered particles | Moderate — requires understanding game-loop architecture |
| Chart.js | Standard statistical charts, dynamic updates | Clean defaults; automatic animation between data states; tiny bundle | Epidemic curve with R₀ slider, vaccination coverage over time, ICU occupancy bar chart | Epidemic curve that redraws in real time as parameters change | Low — declarative config; no canvas programming needed |
| Plotly | Scientific charts, explorable data, subplots | Zoom/pan/select built in; ggplotly bridge for R users; 3D and geo | Dose-response scatter with hover, choropleth map, survival curve comparison | Kaplan-Meier curve with confidence intervals and group comparison | Low-moderate — extensive documentation; Python/R familiarity helps |
| vis-network | Network graphs, flowcharts, process diagrams | Automatic physics layout; click events on nodes/edges; hierarchical mode | Contact network, outbreak investigation flowchart, care pathway, learning graph | Transmission network showing superspreader events | Low — declarative node/edge data; physics handles layout |

---

## Epidemic Simulation Design: SIR/SEIR with Interactive Controls

### The SIR and SEIR Mathematical Frameworks

The **SIR model** divides a closed population of size \( N \) into three compartments: **S** (susceptible — not yet infected), **I** (infectious — currently infected and capable of transmitting), and **R** (recovered — immune or deceased, no longer susceptible or infectious). The compartments change over time according to differential equations:

\[
\frac{dS}{dt} = -\frac{\beta S I}{N}
\]

\[
\frac{dI}{dt} = \frac{\beta S I}{N} - \gamma I
\]

\[
\frac{dR}{dt} = \gamma I
\]

where \( \beta \) is the transmission rate (contacts per unit time × probability of transmission per contact) and \( \gamma \) is the recovery rate (1 / mean infectious period). The basic reproduction number \( R_0 = \beta / \gamma \) is the number of secondary infections produced by one infectious case in a fully susceptible population. The epidemic grows when \( R_0 \cdot S/N > 1 \) and declines when \( R_0 \cdot S/N < 1 \).

The **SEIR model** adds an **E** (exposed) compartment for diseases with a latent period — the time between infection and onset of infectiousness. An exposed individual has been infected but is not yet capable of transmitting. The additional equation:

\[
\frac{dE}{dt} = \frac{\beta S I}{N} - \sigma E
\]

\[
\frac{dI}{dt} = \sigma E - \gamma I
\]

where \( \sigma \) is the rate of progression from exposed to infectious (1 / mean latent period). SEIR is the appropriate model for diseases with a meaningful latent period: COVID-19 (latent period ~5 days), influenza (~2 days), measles (~8-12 days before infectious).

**SIR parameter sliders** allow students to move \( R_0 \), initial infectious seed, and intervention timing, and see in real time how the epidemic curve responds. This interactive discovery encodes the most important public health insight of epidemic modeling: the relationship between \( R_0 \), the herd immunity threshold \( (1 - 1/R_0) \), and epidemic size.

An **epidemic curve animation** shows the epidemic unfolding over time — bars or a curve growing and falling — so the temporal dynamics are experienced, not just read about. Adding a vaccination scenario (start vaccinating at time T at rate V per day) lets students see how the curve collapses when coverage approaches the herd immunity threshold.

### Herd Immunity Visualization

**Herd immunity** is achieved when a sufficient proportion of the population is immune (through infection or vaccination) that the pathogen can no longer sustain transmission — each infectious case produces fewer than one new case on average, and the outbreak dies out. The herd immunity threshold \( p_c \) is:

\[
p_c = 1 - \frac{1}{R_0}
\]

For measles (\( R_0 \approx 15 \)), \( p_c \approx 93\% \). For COVID-19 (original strain, \( R_0 \approx 2.5 \)), \( p_c \approx 60\% \). For seasonal influenza (\( R_0 \approx 1.3 \)), \( p_c \approx 23\% \). A **vaccination coverage simulation** overlays the vaccination trajectory on the epidemic curve, showing the threshold effect: once coverage crosses \( p_c \), the epidemic does not merely slow — it collapses.

---

## Health Equity and Disparity Simulations

### Designing Simulations That Make Inequity Visible

**Health disparities** are not random — they follow the contours of social structure. A simulation that shows a single average epidemic curve hides the fact that some populations face 3× or 5× the burden. **Health equity simulations** make these differential exposures visible by disaggregating the simulation output by social group and encoding the social determinants that produce the disparity.

A well-designed health equity simulation for a chronic disease (type 2 diabetes, hypertension) might display four population groups defined by income quartile, with baseline risk rates reflecting observed data from NHANES. Sliders for social determinants — food environment quality, access to safe physical activity, healthcare access, housing stability — update the risk trajectories for each group. The visualization shows not only that low-income populations have higher burden but also which levers reduce the disparity and by how much.

The **health disparities visualization** design principle: always show absolute and relative differences between groups simultaneously. A 20% relative risk reduction that moves the high-burden group from 30% to 24% prevalence still leaves a 14-percentage-point absolute gap compared to the low-burden group's 10% prevalence. Displaying only the relative measure hides the persistent disparity.

**Behavioral intervention simulations** model the effect of health behavior change programs — smoking cessation, physical activity promotion, dietary improvement — under different uptake assumptions and social gradient scenarios. These simulations teach that the same intervention, uniformly applied, can widen health disparities if uptake is concentrated among already-advantaged populations (the inverse care law in simulation form).

---

## Surge Capacity and Healthcare System Models

### ICU Capacity as a Stock-and-Flow System

Hospital intensive care unit (ICU) capacity is a classic **stock-and-flow** system (introduced in Chapter 14): the ICU bed occupancy (the stock) is determined by the inflow of new admissions and the outflow of discharges and deaths. The system has a hard capacity constraint — when the stock exceeds the number of licensed ICU beds, the system is in crisis.

A **surge capacity model** makes this dynamic tangible. The simulation lets students set:

- Baseline ICU beds (physical stock)
- Daily COVID-19 admission rate (inflow slider)
- Mean length of ICU stay (determines outflow rate)
- Surge capacity options: converting step-down units (+20%), opening regional overflow sites (+15%), National Guard field hospitals (+25%)

The simulation displays ICU occupancy over time as a line chart, with a horizontal red line at 100% capacity. Students learn by direct experience: at moderate admission rates, the system stays below capacity. As the admission rate increases past a threshold, the stock accumulates faster than the outflow can drain it, and the system breaches capacity — exactly the phenomenon that characterized COVID-19 peaks in winter 2020-2021.

#### MicroSim: ICU Surge Capacity Model

<iframe src="../../sims/icu-surge-capacity/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>ICU Surge Capacity Model — MicroSim Specification</summary>
Type: microsim
**sim-id:** icu-surge-capacity<br/>
**Library:** p5.js<br/>
**Status:** Specified

Display a stock-and-flow simulation of ICU bed occupancy with the following layout:

Top section — **Stock-and-Flow Diagram** (visual):
- A large blue rectangle labeled "ICU Bed Occupancy" with a fill level that animates up and down
- Red line at 100% capacity with label "CAPACITY BREACHED"
- Orange line at 85% with label "Crisis Standard of Care Threshold"
- Left arrow (green) labeled "Admissions/day" flowing in
- Right arrow (red) labeled "Discharges + Deaths/day" flowing out

Middle section — **Controls** (p5.js built-in controls):
- Slider: Admission Rate (0–50 patients/day, default 10)
- Slider: Mean ICU Length of Stay (3–21 days, default 10)
- Slider: Baseline ICU Beds (50–500, default 200)
- Checkbox row: Surge Options (each adds beds when checked):
  - "Convert step-down units (+40 beds)"
  - "Regional overflow site (+60 beds)"
  - "Field hospital (+100 beds)"
- Button: "Reset / Restart Simulation"
- Button: "Pause / Resume"

Bottom section — **Time-Series Chart**:
- Line chart of ICU occupancy over 90 days
- Y-axis: 0 to 150% of baseline capacity
- Horizontal bands: green (<85%), yellow (85-100%), red (>100%)
- Current day marker (vertical dashed line)

Simulation logic: each "day" (one animation frame at reduced speed), new patients = admission_rate; discharged patients = current_occupancy / mean_los. Stock updates: new_occupancy = current + admitted - discharged. When the red band is entered, a banner "CRISIS STANDARDS ACTIVATED" flashes. When the simulation ends (day 90), display summary statistics: peak occupancy %, days above capacity, total patients admitted.
</details>

---

## Behavioral and Network Simulations

### Network Spread Simulation

**Contact networks** determine who can infect whom. Random-mixing models (SIR/SEIR) assume every individual has an equal probability of contact with every other individual — an assumption that is never true in reality. **Network spread simulations** place agents on a contact network (family, workplace, school, random contacts) and spread infection along edges, revealing that network structure profoundly shapes epidemic dynamics.

Key network properties that affect epidemic spread include: degree distribution (the distribution of how many contacts each node has), clustering coefficient (the tendency for contacts to also be connected to each other), and community structure (tightly connected groups with sparse inter-group connections). A **contact tracing simulation** models the process of identifying, notifying, and isolating the contacts of an infectious case — showing how contact tracing effectiveness (the fraction of contacts successfully traced and isolated before they become infectious) interacts with the generation time of the disease to determine whether an outbreak can be brought under control.

### Vaccination Coverage Simulation

A **vaccination coverage simulation** shows the population as a grid of individuals, each color-coded as vaccinated (green), susceptible (red), or naturally immune (gray). An infectious seed (yellow) is introduced. The epidemic spreads neighbor to neighbor. As vaccination coverage increases, the grid develops a "Swiss cheese" structure of immune individuals that interrupts transmission chains. The visual insight — that protecting individuals has the secondary effect of protecting nearby unvaccinated individuals through herd immunity — is far more viscerally clear in a grid simulation than in a text description.

### Dose-Response Explorer

**Dose-response relationships** in environmental health and toxicology describe how the magnitude of an exposure determines the probability and severity of a health effect. The **dose-response explorer** simulation allows students to adjust a substance's threshold dose, steepness of the dose-response curve, and population exposure distribution, and see in real time how many individuals in the population exceed the adverse effect threshold.

Key dose-response concepts students can discover through simulation: the threshold effect (no harm below a certain dose, for non-carcinogens); the linear no-threshold model (used for carcinogens, where any exposure carries some risk proportional to dose); the hormesis phenomenon (low doses may be beneficial while high doses are harmful — a J-shaped curve); and the relationship between population variance in exposure and population-level disease burden.

---

## Causal Loop Diagram Simulations

### From Diagram to Dynamic Model

**CLD interactive simulations** bridge the conceptual tool (the causal loop diagram drawn in Chapter 14) and the dynamic stock-and-flow model (quantified in Chapter 15). A CLD interactive simulation displays the causal loop diagram with animated flows — when a slider changes a variable's value, highlighted arrows show which downstream variables are affected and in which direction.

The most powerful CLD simulations encode system archetypes: the **limits-to-growth archetype** (a reinforcing loop constrained by a balancing loop — e.g., population growth limited by resource depletion), the **shifting-the-burden archetype** (a symptomatic solution that weakens the fundamental solution — e.g., opioid prescribing that reduces the investment in pain rehabilitation), and the **tragedy of the commons** (shared resource depletion when individual actors optimize their own extraction without coordinating on the collective).

**Policy lever simulations** let students test interventions in a simple system model and observe whether the intended effect materializes, whether unintended consequences emerge (from feedback loops they did not anticipate), and whether the intervention is undermined by system dynamics over time. The opioid epidemic CLD is a particularly powerful teaching example: policies that reduce prescription opioid supply without simultaneously expanding addiction treatment shift users to illicit fentanyl and may increase mortality rather than decrease it — a Fixes that Fail archetype playing out with lethal consequences.

---

## Accessibility and Responsive Design

### Designing Simulations for All Learners

A MicroSim that cannot be used by a student with a visual impairment, a student on a mobile device, or a student with a slow internet connection is not meeting the full mission of accessible public health education. Accessible MicroSim design requires attention to several principles.

**Color accessibility**: never encode information in color alone. All MicroSims should use color plus shape, pattern, or label to distinguish categories. The red/green color combination used intuitively in many public health simulations (healthy vs. at risk, below vs. above threshold) is the most common form of color blindness (red-green, affecting ~8% of men). Use a color palette tested with a color blindness simulator (e.g., Coblis) and add texture or icon differentiation where color is the primary encoding.

**Screen reader compatibility**: while full screen-reader compatibility for interactive canvas simulations is technically challenging, providing a text description of the simulation's key findings (equivalent to alternative text for images) ensures that students using assistive technology can access the educational content. Place a `<details>` block beneath each MicroSim with a prose description of what the simulation demonstrates and what students should discover.

**Responsive layout**: all MicroSims in this textbook are embedded in iframes at `width="100%"`. The p5.js canvas inside must respond to the container width at initialization by calling `updateCanvasSize()` in `setup()`. Controls should stack vertically on narrow screens (< 600px width) rather than requiring horizontal scrolling.

**Performance**: p5.js agent-based simulations that run thousands of agents at 60 fps can exceed the computational capacity of older mobile devices, causing the simulation to freeze. Design simulations with a maximum of 500 visible agents, or use a mathematical (differential equation) approximation for the large-population limit, with an agent-based view available as an option for capable devices.

#### Diagram: MicroSim Design Process

<iframe src="../../sims/microsim-design-process/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Design Process — Interactive Flowchart Specification</summary>
Type: microsim
**sim-id:** microsim-design-process<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical flowchart with eight clickable stages, connected by downward arrows. Each stage is a rounded rectangle:

1. **Define Learning Objective** (blue) — "Complete the sentence: After using this sim, students can ___." Red gate: Does the objective require 'and'? → If yes, loop back with "Split into two sims"
2. **Choose Interaction Type** (blue) — Taxonomy: Parameter slider / Toggle scenario / Explore network / Observe animation — map to Bloom level (Remember → Create)
3. **Select Library** (orange) — Decision diamond: Agent-based? → p5.js. Standard chart? → Chart.js. Explorable data? → Plotly. Network/flow? → vis-network
4. **Sketch Canvas Layout** (orange) — Canvas region + control region + output/readout region. Mobile layout stack.
5. **Implement Controls First** (green) — Build sliders/buttons before the simulation logic — test that controls fire events correctly
6. **Implement Core Loop** (green) — setup() + draw() for p5.js; config object for Chart.js; data binding for Plotly/vis-network
7. **Apply Accessibility Checks** (red) — Color blindness test; mobile layout test; screen reader description; performance test (500-agent cap)
8. **Write Specification** (red) — Complete the details block: sim-id, library, status, full specification text

Clicking each stage expands a right-side panel with:
- 2-3 sentence description of the stage
- A "Common Mistake" callout (footgun) specific to that stage
- A checklist of 3-4 completion criteria

The stages that have a decision gate (1, 3) show a diamond branch node. Completed stages can be checked off by clicking a checkbox in the panel.
</details>

---

!!! mascot-tip "The Five-Minute Test"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sage offers a helpful tip">
    A reliable quality check for any MicroSim: hand it to someone who has never seen it and watch what they do in the first five minutes without any instructions. If they do not find the interactive controls within 30 seconds, the controls are not discoverable enough. If they cannot articulate what the simulation is showing after five minutes of exploration, the design is too complex. If they ask "what am I supposed to do?" — the learning objective needs to be stated more explicitly on the page. The five-minute test catches design failures that the developer cannot see because they know too much.

---

#### Diagram: p5.js MicroSim Anatomy

<iframe src="../../sims/p5-microsim-anatomy/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>p5.js MicroSim Anatomy — Interactive Annotation Specification</summary>
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
</details>

---

!!! mascot-celebration "You Are Now a MicroSim Designer"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrates">
    From Mayer's cognitive theory to the p5.js draw loop, from ICU surge capacity models to network spread simulations, you now have the conceptual and technical vocabulary to design educational simulations that make public health dynamics explorable. The simulations throughout this textbook were built with the principles in this chapter. Every time you interact with one, you are using a design decision made on behalf of your learning — and now you know why that decision was made.

---

## Summary

This chapter covered the design and implementation of MicroSims for public health education:

- **MicroSim design principles** are grounded in Mayer's Cognitive Theory of Multimedia Learning: one concept per simulation, coherence (remove extraneous elements), contiguity (related text and graphics adjacent), and active processing (learner-controlled interaction produces deeper learning than passive animation).
- **Library selection** is a key design decision: p5.js for agent-based and animated simulations, Chart.js for standard statistical charts with dynamic updates, Plotly for explorable scientific charts, and vis-network for network graphs and process flowcharts.
- **Epidemic simulations** (SIR/SEIR) with interactive parameter sliders let students discover the relationship between \( R_0 \), herd immunity thresholds, and epidemic curve shape through direct manipulation.
- **ICU surge capacity models** implement the stock-and-flow architecture from systems thinking, making the non-linear capacity dynamics of healthcare surge visible and interactive.
- **Health equity simulations** disaggregate outcomes by social group and allow students to manipulate social determinant levers, making the mechanisms of health disparity explorable rather than abstract.
- **CLD interactive simulations** animate causal loop diagrams, bridging the conceptual diagram and the dynamic model.
- **Accessibility and responsive design** ensure MicroSims work for all learners: color-plus-shape encoding, text alternative descriptions, responsive layouts, and performance caps for mobile devices.

## Key Terms

- **MicroSim**: A focused, self-contained interactive visualization designed to teach a single concept through direct manipulation, embedded in a web page
- **Mayer's Cognitive Theory of Multimedia Learning (CTML)**: A theoretical framework positing that learning is best supported by multimedia materials that respect the dual-channel, limited-capacity nature of working memory
- **p5.js**: A JavaScript library for creative coding that provides a setup/draw game loop, canvas drawing API, and built-in UI controls — the primary library for agent-based and animated public health simulations
- **Chart.js**: A charting library for standard statistical chart types (line, bar, scatter) with declarative configuration and automatic animation between data states
- **Plotly**: A scientific charting library with built-in zoom/pan/select interactivity and consistent APIs across JavaScript, Python, and R
- **vis-network**: A JavaScript library for rendering interactive network graphs and flowcharts using physics-based layout
- **SIR model**: Compartmental epidemic model dividing a population into Susceptible, Infectious, and Recovered states
- **SEIR model**: Extension of SIR that adds an Exposed compartment for the latent period between infection and infectiousness
- **herd immunity threshold**: The proportion of a population that must be immune to prevent sustained transmission, equal to \( 1 - 1/R_0 \)
- **stock-and-flow**: Systems modeling architecture where stocks (accumulations) are changed by inflows and outflows — the architecture underlying ICU capacity, epidemic compartments, and supply chain models
- **interrupted time series (ITS)**: Also relevant here as a policy evaluation design teachable through simulation (see Chapter 17)
- **contact network**: A graph representation of who can transmit disease to whom, where nodes are individuals and edges represent contact events
