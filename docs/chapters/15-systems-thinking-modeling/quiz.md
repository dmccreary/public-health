# Quiz: Systems Thinking — Modeling and Networks

Test your understanding of compartmental epidemic models, agent-based models, network analysis, and model validation with these review questions.

---

#### 1. In a basic SIR model, the differential equation for the infectious compartment dI/dt = βSI/N − γI implies that the epidemic grows (dI/dt > 0) when:

<div class="upper-alpha" markdown>
1. The proportion susceptible (S/N) exceeds 1/R₀
2. The recovery rate γ exceeds the transmission rate β
3. The number of infectious individuals exceeds the number recovered
4. Population size N is sufficiently large
</div>
??? question "Show Answer"
    The correct answer is **A**. The epidemic grows when βSI/N > γI, which simplifies to βS/N > γ, or S/N > γ/β = 1/R₀. In other words, the epidemic grows as long as the susceptible fraction exceeds the threshold 1/R₀. As the susceptible pool is depleted through infection and recovery, S/N falls toward 1/R₀ — at which point the epidemic peaks — and continues declining. This is the mathematical basis for the herd immunity threshold: 1 − 1/R₀ of the population must be immune to stop growth.

    **Concept Tested:** SIR Model Epidemic Growth Condition

---

#### 2. The SEIR model differs from the SIR model by adding an "Exposed" compartment to represent:

<div class="upper-alpha" markdown>
1. Individuals who have been vaccinated but may not develop full immunity
2. Individuals who have been infected but are not yet infectious — the latent period
3. Individuals with immune suppression who may develop severe disease
4. Individuals exposed to the pathogen but who remain permanently susceptible
</div>
??? question "Show Answer"
    The correct answer is **B**. The SEIR model adds the Exposed (E) compartment for individuals who have been infected but have not yet become infectious — the latent period during which the pathogen replicates but transmission cannot yet occur. This is epidemiologically important for diseases like COVID-19 (latent period ~5 days), influenza (~2 days), and measles (~8 days), where the delay between exposure and infectiousness affects outbreak timing, peak height, and the window for contact tracing interventions.

    **Concept Tested:** SEIR Model — Exposed Compartment

---

#### 3. Agent-based models (ABMs) differ from compartmental (SIR/SEIR) models primarily in that ABMs:

<div class="upper-alpha" markdown>
1. Produce more mathematically precise results because they use stochastic algorithms
2. Simulate individual agents with heterogeneous attributes and behaviors interacting in a spatial or network environment
3. Require less computational power than differential equation models
4. Always produce the same result for a given set of parameters
</div>
??? question "Show Answer"
    The correct answer is **B**. Agent-based models simulate individual entities (agents) with their own attributes, behaviors, and rules for interaction — allowing for heterogeneity in age, behavior, household structure, and social network position that compartmental models average away. ABMs can model spatial spread, contact network structure, and individual-level interventions (contact tracing, targeted vaccination of superspreaders). They require more computation (option C is wrong) and produce stochastic variation (option D is wrong).

    **Concept Tested:** Agent-Based Models vs. Compartmental Models

---

#### 4. In network analysis applied to infectious disease transmission, a "superspreader" node is characterized by:

<div class="upper-alpha" markdown>
1. High betweenness centrality, indicating the node lies on many shortest paths between other nodes
2. High degree centrality, meaning the node has an unusually large number of contacts compared to the average
3. High clustering coefficient, meaning the node's contacts are densely interconnected
4. High eigenvector centrality, meaning the node is connected to other highly connected nodes
</div>
??? question "Show Answer"
    The correct answer is **B**. In transmission network terms, superspreaders are nodes with high degree — many contacts — meaning an infectious superspreader can potentially expose a large number of susceptible individuals. Power-law degree distributions (scale-free networks) produce a small number of very high-degree nodes that are disproportionately important for epidemic spread and make the epidemic threshold lower than in random networks. Targeting high-degree nodes for vaccination or contact tracing yields disproportionate epidemiological benefit.

    **Concept Tested:** Superspreaders and Network Degree

---

#### 5. Model validation in epidemic modeling refers to:

<div class="upper-alpha" markdown>
1. Having the model reviewed by a panel of clinical experts before publication
2. Testing whether the model reproduces observed data and behaves plausibly under conditions not used for calibration
3. Using only government-approved data sources as model inputs
4. Ensuring the model's code is open-source and publicly accessible
</div>
??? question "Show Answer"
    The correct answer is **B**. Model validation assesses whether a model is a credible representation of the system it models. This includes calibration (fitting parameters to reproduce historical data), face validity (experts confirm the model behavior is plausible), internal consistency testing, and out-of-sample validation (testing model predictions against data not used in fitting). Validation is distinct from model verification (confirming the code correctly implements the equations) and does not require any specific data source policy.

    **Concept Tested:** Model Validation

---

#### 6. The SEIR model extension that adds a vaccination compartment V and a waning immunity rate from R back to S is most appropriate for modeling:

<div class="upper-alpha" markdown>
1. A disease with lifelong immunity after infection, like measles
2. A disease like COVID-19 where immunity wanes and reinfection is possible
3. A vector-borne disease requiring an animal reservoir compartment
4. A bacterial infection with multiple antibiotic resistance profiles
</div>
??? question "Show Answer"
    The correct answer is **B**. When immunity is not permanent — as with SARS-CoV-2, influenza, and some other pathogens — a flow from the Recovered compartment back to Susceptible (rate ω, the waning rate) must be added to the model. This SEIRS structure produces endemic equilibria and oscillating dynamics rather than a single epidemic peak followed by extinction. Adding a Vaccinated compartment with its own waning pathway captures the additional complexity of multi-dose vaccine schedules and variant immune escape.

    **Concept Tested:** SEIRS Model with Waning Immunity

---

#### 7. Group model building (GMB) in systems thinking is a participatory process that involves:

<div class="upper-alpha" markdown>
1. Training statistical analysts to build epidemic models using publically available data
2. Engaging stakeholders, including community members and practitioners, in building system models together
3. Peer review of system dynamics models by independent technical experts
4. Combining outputs from multiple independent research teams' models
</div>
??? question "Show Answer"
    The correct answer is **B**. Group model building engages diverse stakeholders — public health practitioners, community members, policymakers, and researchers — in collaboratively constructing causal loop diagrams and stock-and-flow models. The process serves dual purposes: it incorporates tacit knowledge held by practitioners that might not appear in published data, and it builds shared understanding and commitment to action among participants who helped create the model. GMB is particularly valuable for complex, politically contested public health problems like opioid prevention or chronic disease systems.

    **Concept Tested:** Group Model Building

---

#### 8. Meadows' "leverage points in a system" framework suggests that changing which system element is most powerful?

<div class="upper-alpha" markdown>
1. The magnitudes of constants and parameters (e.g., tax rates, subsidy levels)
2. The goals of the system (e.g., shifting from GDP growth to well-being metrics)
3. The lengths of delays (e.g., reducing reporting lag in disease surveillance)
4. The sizes of buffers relative to their flows
</div>
??? question "Show Answer"
    The correct answer is **B**. In Meadows' hierarchy, changing the goals of the system ranks higher than changing parameters (option A), delays (option C), or buffer sizes (option D). A system's goals determine what balancing loops are trying to achieve — changing a goal reorients all the feedback mechanisms in the system. An example: shifting a healthcare system's goal from "maximize procedures performed" to "maximize population health outcomes" restructures all the incentive loops in the system.

    **Concept Tested:** Meadows' Leverage Points Hierarchy

---

#### 9. Basic reproduction number R₀ = β/γ in the SIR model. If β = 0.5 per day and γ = 0.1 per day, R₀ equals:

<div class="upper-alpha" markdown>
1. 0.05
2. 0.5
3. 2.0
4. 5.0
</div>
??? question "Show Answer"
    The correct answer is **D**. R₀ = β/γ = 0.5/0.1 = 5.0. β is the transmission rate (contacts per day × probability of transmission per contact) and γ is the recovery rate (1/mean infectious period). With β = 0.5 per day and γ = 0.1 per day, the mean infectious period is 10 days and each infectious case generates 5 secondary cases in a fully susceptible population. The herd immunity threshold for this disease is 1 − 1/5 = 80%.

    **Concept Tested:** R₀ Calculation from β and γ

---

#### 10. A system dynamics model of the opioid epidemic that includes a feedback loop where increased prescription opioid availability leads to diversion and non-medical use, which in turn increases addiction rates, which drives demand for more prescriptions, represents which archetype?

<div class="upper-alpha" markdown>
1. Limits to growth
2. Shifting the burden
3. Tragedy of the commons
4. Escalation
</div>
??? question "Show Answer"
    The correct answer is **B**. The opioid epidemic CLD illustrates the "shifting the burden" archetype: prescriptions provide a symptomatic fix for pain, reducing pressure to invest in fundamental solutions (physical therapy, mental health support, addiction treatment infrastructure). Meanwhile, the symptomatic fix creates a side-effect loop: addiction → demand for prescriptions → more prescriptions → more diversion → more addiction. The fundamental solution (comprehensive pain management without opioids) is crowded out as the system becomes dependent on the symptomatic fix.

    **Concept Tested:** System Archetypes Applied to Opioid Epidemic

---
