# Quiz: Simulation Design for Public Health Education

Test your understanding of MicroSim design principles, JavaScript visualization libraries, and interactive epidemic models with these review questions.

---

#### 1. Mayer's Cognitive Theory of Multimedia Learning (CTML) is foundational for MicroSim design primarily because it:

<div class="upper-alpha" markdown>
1. Provides a legal framework for using publicly available health data in educational simulations
2. Identifies evidence-based principles for designing multimedia materials that minimize cognitive overload and maximize learning
3. Specifies the programming languages that produce the most effective educational animations
4. Demonstrates that video-based learning always outperforms text-based instruction
</div>
??? question "Show Answer"
    The correct answer is **B**. CTML is grounded in cognitive science: its dual-channel assumption (verbal and visual processing channels), limited capacity assumption (working memory is constrained), and active processing assumption (learners must select, organize, and integrate) generate design principles including coherence (remove extraneous material), signaling, contiguity, interactivity, and segmenting. These principles directly guide every MicroSim design decision — how many controls to show, where to place labels, how to pace information.

    **Concept Tested:** Mayer's CTML Applied to MicroSim Design

---

#### 2. The "one-concept rule" for MicroSim design is operationalized by completing which sentence?

<div class="upper-alpha" markdown>
1. "This simulation demonstrates [number] of key public health concepts."
2. "After interacting with this simulation, students will be able to ___." — requiring only one completion without the word "and"
3. "This simulation is appropriate for [grade level] students with [prerequisite] background."
4. "The simulation uses [library] to render [visualization type] data."
</div>
??? question "Show Answer"
    The correct answer is **B**. The one-concept rule test is: complete the sentence "After interacting with this simulation, students will be able to ___." If the blank requires the word "and," the simulation has scope creep and teaches two concepts, not one. A simulation with a single, clearly stated learning objective drives every subsequent design decision — which controls to include, which variables to display, which labels to add — by filtering out anything not directly serving that objective.

    **Concept Tested:** One-Concept Rule for MicroSim Design

---

#### 3. p5.js is the recommended library for which type of public health MicroSim?

<div class="upper-alpha" markdown>
1. Standard statistical charts (line, bar, scatter) that update dynamically with parameter changes
2. Interactive network graphs showing contact transmission chains between individuals
3. Agent-based epidemic simulations with moving particles representing susceptible/infectious/recovered individuals
4. Explorable scientific charts requiring built-in zoom, pan, and hover tooltip functionality
</div>
??? question "Show Answer"
    The correct answer is **C**. p5.js provides a setup/draw game-loop architecture with direct canvas drawing API and built-in UI controls (sliders, buttons, checkboxes) — ideal for agent-based simulations where individual agents move, interact, and change state in real time. Chart.js (option A) is better for standard statistical charts; vis-network (option B) handles network graphs; Plotly (option D) provides built-in zoom/pan/hover. Choosing the right library for the simulation type reduces development time and improves pedagogical quality.

    **Concept Tested:** p5.js Library Selection

---

#### 4. In a p5.js MicroSim, calling `updateCanvasSize()` as the first line of `setup()` is required because:

<div class="upper-alpha" markdown>
1. It initializes the random number seed for reproducible simulation behavior
2. It captures the container width before canvas creation, ensuring the canvas fits the embedding iframe
3. It registers the p5.js canvas as a child of the document body element
4. It triggers the browser to load all necessary p5.js library files before simulation starts
</div>
??? question "Show Answer"
    The correct answer is **B**. The MicroSim canvas width must match the width of its container (the `<main>` element in the embedding iframe). If `updateCanvasSize()` is called after `createCanvas()`, the canvas is created with an incorrect width, producing a layout that does not fit the page. This is a footgun: it fails silently — the canvas renders but at the wrong size — and the error only appears on specific screen widths or when embedded in iframes. Always call `updateCanvasSize()` first in `setup()`.

    **Concept Tested:** p5.js Canvas Initialization

---

#### 5. The "five-minute test" for MicroSim quality assessment evaluates whether:

<div class="upper-alpha" markdown>
1. The simulation runs without performance degradation for at least five minutes on a mobile device
2. A naive user can discover the controls, understand what the simulation shows, and articulate the key insight within five minutes without instructions
3. The simulation loads within five seconds on a standard broadband connection
4. The code passes five categories of automated accessibility checks
</div>
??? question "Show Answer"
    The correct answer is **B**. The five-minute test is a practical usability evaluation: hand the simulation to someone who has never seen it and observe what they do in the first five minutes without instructions. Failure modes to watch for: controls not found within 30 seconds (discoverability problem); inability to articulate what the simulation demonstrates after exploration (design too complex or learning objective unclear); and asking "what am I supposed to do?" (learning objective needs to be stated on the page).

    **Concept Tested:** Five-Minute Usability Test

---

#### 6. An ICU surge capacity model implemented as a stock-and-flow simulation updates bed occupancy each day as:

<div class="upper-alpha" markdown>
1. Current occupancy × admission rate / discharge rate
2. New occupancy = current occupancy + admissions − discharges, where discharge rate ≈ current occupancy / mean LOS
3. Sum of all admitted patients since simulation start minus deaths
4. Admission rate × mean length of stay, independent of current occupancy
</div>
??? question "Show Answer"
    The correct answer is **B**. The stock-and-flow equation for ICU occupancy: dOccupancy/dt = Inflow − Outflow = admission_rate − (occupancy / mean_LOS). Each day, new patients are added (inflow) and a fraction of current patients are discharged (outflow). This difference is integrated over time. The system breaches capacity when inflow persistently exceeds outflow faster than the stock can drain. This is the same mathematical structure as all stocks: the bathtub model, the SIR S compartment, and any accumulation system.

    **Concept Tested:** ICU Surge Capacity Stock-and-Flow Logic

---

#### 7. Color accessibility in MicroSim design requires that:

<div class="upper-alpha" markdown>
1. A maximum of three colors are used in any single simulation to reduce visual complexity
2. Information is encoded using color plus an additional channel (shape, pattern, or label) so it is accessible to color-blind users
3. All simulations use a standardized CDC color palette approved for public health communications
4. Red is reserved exclusively for danger indicators and green for safe conditions
</div>
??? question "Show Answer"
    The correct answer is **B**. Approximately 8% of men have red-green color blindness — the most common form of color vision deficiency. Designs that rely solely on the red-green distinction (e.g., sick vs. healthy agents, above vs. below threshold) are inaccessible to these users. The solution is redundant encoding: use color AND shape, pattern, or label so the information is communicated through at least two visual channels. Designs should be tested with a color blindness simulator (e.g., Coblis).

    **Concept Tested:** Color Accessibility in Simulation Design

---

#### 8. vis-network is the most appropriate library for which type of public health education visualization?

<div class="upper-alpha" markdown>
1. An animated epidemic curve that updates as users adjust R₀ with a slider
2. A time-series line chart comparing COVID-19 case counts across multiple countries
3. A contact network showing transmission chains from a superspreader event
4. A dose-response scatter plot with confidence intervals and hover tooltips
</div>
??? question "Show Answer"
    The correct answer is **C**. vis-network renders interactive network graphs — nodes connected by edges — with physics-based layout, click events, and styling. For a contact network visualization showing who infected whom in a superspreader event, vis-network handles the node-edge structure automatically, allowing users to click nodes to see their details. Chart.js (options A and B) handles time-series and line charts; Plotly (option D) handles scientific scatter plots with hover.

    **Concept Tested:** vis-network Library Use Cases

---

#### 9. The herd immunity visualization that shows a grid of individuals as vaccinated (green), susceptible (red), or immune (gray) most effectively teaches which concept?

<div class="upper-alpha" markdown>
1. The statistical method for calculating vaccine efficacy from clinical trial data
2. How individual vaccination decisions create collective protection through the "Swiss cheese" effect on transmission chains
3. The pharmacokinetics of vaccine-induced antibody responses over time
4. The relationship between vaccine manufacturing capacity and rollout speed
</div>
??? question "Show Answer"
    The correct answer is **B**. The grid visualization makes herd immunity tangible: as the vaccination coverage slider increases, the immune "gaps" in the grid interrupt transmission chains — the visual metaphor of cheese holes blocking pathogen movement is immediate and memorable. Students discover for themselves the threshold at which new infections drop to near zero. This experiential discovery — finding the herd immunity threshold by manipulating coverage — produces deeper learning than any explanation of the formula 1 − 1/R₀.

    **Concept Tested:** Herd Immunity Grid Visualization

---

#### 10. According to Mayer's coherence principle, a MicroSim should:

<div class="upper-alpha" markdown>
1. Include as much relevant supplementary information as possible to provide full context
2. Use background music and ambient sound effects to maintain engagement
3. Remove extraneous material — every element not directly serving the learning objective adds cognitive load without adding learning value
4. Display all model parameters simultaneously so students can understand system complexity
</div>
??? question "Show Answer"
    The correct answer is **C**. The coherence principle states that learning is enhanced when extraneous material is excluded. Every label, visual element, control, or text block that does not directly serve the single learning objective consumes limited working memory capacity without contributing to learning. The most common MicroSim design failure is scope creep — adding "just one more" slider or display panel — which fragments attention and dilutes the core learning insight. Ruthlessly removing extraneous elements is good pedagogy, not laziness.

    **Concept Tested:** Mayer's Coherence Principle

---
