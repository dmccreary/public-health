---
title: "Environmental Health"
description: Environmental risk assessment framework, air and water quality standards, toxicology principles, built environment and health, climate change health impacts, and environmental justice.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Environmental Health

!!! mascot-welcome "Welcome to Environmental Health"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    "What does the evidence show? Today we examine the world around us — the air we breathe, the water we drink, the neighborhoods we inhabit — and ask how each shapes population health. Environmental health connects biology, chemistry, policy, and justice in ways no other field quite matches."

## Summary

Environmental health examines how the physical, chemical, and biological world around people shapes their health outcomes. This chapter moves through the four-step risk assessment framework, the major pollutant categories and their health effects, water safety from source to tap, the toxicological principles governing dose-response relationships, built environment features (walkability, food access, green space) that affect daily health, climate change as a multiplier of environmental health risks, and the environmental justice evidence showing that pollution burdens fall disproportionately on low-income communities and communities of color.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology and Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 3: Epidemiology Study Design](../03-epidemiology-study-design/index.md)

## Concepts Covered

This chapter covers the following 28 concepts from the learning graph:

1. Environmental Risk Assessment
2. Hazard Identification
3. Dose-Response Assessment
4. Exposure Assessment
5. Risk Characterization
6. Air Quality Index
7. Criteria Air Pollutants
8. Particulate Matter PM2.5
9. Ozone Health Effects
10. Indoor Air Quality
11. Water Safety Standards
12. Drinking Water Treatment
13. Waterborne Disease Pathogens
14. Safe Drinking Water Act
15. Toxicology Dose-Response
16. Bioaccumulation
17. Endocrine Disruption
18. Built Environment Health
19. Urban Heat Island Effect
20. Food Desert Definition
21. Climate Change Health Impacts
22. Vector-Borne Disease Expansion
23. Wildfire and Air Quality
24. Environmental Justice
25. Cumulative Exposure Burden
26. EJScreen Tool
27. Legacy Contamination
28. Green Space Health Benefits

---

## The Four-Step Environmental Risk Assessment Framework

When a community raises concern about a nearby chemical plant, a contaminated well, or a new highway cutting through a residential area, public health agencies rely on a structured methodology to convert scientific uncertainty into policy-relevant conclusions. **Environmental risk assessment** is that methodology — a four-step analytical process developed by the National Academy of Sciences in 1983 and refined by the U.S. Environmental Protection Agency (EPA) into the standard framework used worldwide. The four steps are: (1) hazard identification, (2) dose-response assessment, (3) exposure assessment, and (4) risk characterization.

**Hazard identification** is the first step and the most qualitative. It asks a deceptively simple question: can this agent cause harm in humans? Analysts review toxicological studies, animal experiments, occupational epidemiology, and mechanistic evidence to determine whether a chemical, pathogen, or physical stressor has the *potential* to cause adverse effects. The International Agency for Research on Cancer (IARC) classification system — which sorts agents into Groups 1 through 4 based on evidence strength — is one familiar output of hazard identification. Identifying a hazard does not mean exposure is causing harm; it means harm is biologically plausible.

**Dose-response assessment** quantifies the relationship between the level of exposure and the magnitude or probability of a health effect. Different agents follow different curve shapes: some exhibit a threshold below which no effect occurs, while others — especially certain carcinogens — are modeled as having no safe threshold, producing a linear extrapolation from high-dose animal studies down to the low doses humans typically encounter. Key parameters derived in this step include the Reference Dose (RfD) for non-cancer endpoints (the daily exposure level estimated to be without appreciable risk over a lifetime) and the Cancer Slope Factor (CSF) for carcinogens.

**Exposure assessment** shifts focus from what an agent can do to how much of it actually reaches a human body. This step estimates the magnitude, frequency, duration, and route of exposure — whether ingestion, inhalation, or dermal contact. Exposure modelers combine environmental monitoring data (measured contaminant concentrations in air, water, or soil) with human behavior data (time spent indoors, water consumption rates, body weight by age group) to produce an estimate of the **Chronic Daily Intake (CDI)**.

**Risk characterization** integrates the preceding three steps to produce a final estimate of risk — typically expressed as an excess lifetime cancer risk (e.g., "1 in 100,000 additional cancer cases") or a Hazard Quotient (HQ) for non-cancer effects (the ratio of estimated exposure to the RfD; HQ > 1 signals potential concern). Risk characterization also explicitly acknowledges uncertainty at each step and communicates the assumptions that most strongly influence the final number.

#### Diagram: Four-Step Risk Assessment Framework

<iframe src="../../sims/risk-assessment-framework/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Risk Assessment Framework — Interactive Workflow Specification</summary>
Type: microsim
**sim-id:** risk-assessment-framework<br/>
**Library:** vis-network<br/>
**Status:** Specified

Interactive directed graph showing the four steps of environmental risk assessment as nodes connected by directional edges. Each node is clickable and expands a side panel with: (1) a brief definition of the step, (2) the key question the step answers, (3) an example output metric (e.g., IARC classification for Hazard Identification, RfD/CSF for Dose-Response, CDI for Exposure, HQ/excess cancer risk for Risk Characterization). Nodes are color-coded by step number (blue gradient from light to dark). A "Reset" button returns all panels to collapsed state. Hovering a node highlights its outgoing edge in orange. The layout is left-to-right, emphasizing the sequential flow.
</details>

---

## Air Quality: From Criteria Pollutants to the AQI

The **Clean Air Act** of 1970 and its subsequent amendments charge the EPA with setting National Ambient Air Quality Standards (NAAQS) for a specific list of widespread pollutants whose effects on public health and welfare are well documented. These are the **criteria air pollutants** — six substances for which the EPA must establish and periodically revise health-based standards. Understanding them requires knowing each pollutant's major emission sources, its primary health effects, and the standard that defines acceptable ambient concentrations.

The six criteria pollutants are particulate matter (PM), ground-level ozone, carbon monoxide, sulfur dioxide, nitrogen dioxide, and lead. Of these, **particulate matter PM2.5** — particles with an aerodynamic diameter of 2.5 micrometers or less — has attracted the most research attention over the past three decades because of its extraordinary penetrating power. PM2.5 particles are small enough to bypass the nose and upper airway, lodge in the alveolar spaces of the lung, and enter the systemic circulation. Short-term exposure is associated with hospital admissions for respiratory and cardiovascular disease; long-term exposure is associated with reduced lung function, lung cancer, and premature death. The 2023 NAAQS revision tightened the annual PM2.5 standard from 12 µg/m³ to 9 µg/m³, acknowledging evidence that health effects persist at concentrations previously thought safe.

**Ozone health effects** differ markedly from those of particulate matter. Tropospheric (ground-level) ozone is not directly emitted; it forms photochemically when nitrogen oxides (NOx) and volatile organic compounds (VOCs) react in sunlight. Ozone is a powerful oxidant that inflames airway tissue, reduces lung capacity, and triggers asthma attacks — which is why ozone episodes cluster on hot, sunny summer days in urban areas. People who spend time outdoors exercising during high-ozone periods face the greatest risk. Unlike PM2.5, which has no known safe threshold, ozone standards are set at a level where a margin of safety for sensitive groups (children, elderly, asthmatics) is maintained.

The following table summarizes all six criteria pollutants, including their primary sources, principal health effects, and current primary NAAQS standards. Note that "primary" standards protect human health, while "secondary" standards (not shown) protect welfare — crops, visibility, and ecosystems.

| Pollutant | Major Sources | Primary Health Effects | Primary NAAQS Standard |
|-----------|--------------|----------------------|----------------------|
| Particulate Matter PM2.5 | Combustion (vehicles, power plants, wildfires), secondary formation | Respiratory and cardiovascular disease, premature death | 9 µg/m³ (annual); 35 µg/m³ (24-hr) |
| Ground-Level Ozone (O₃) | Photochemical reaction of NOx + VOCs from vehicles and industry | Airway inflammation, reduced lung function, asthma exacerbation | 70 ppb (8-hr average) |
| Carbon Monoxide (CO) | Incomplete combustion (vehicles, heating) | Reduces oxygen delivery; cardiac effects at high levels | 9 ppm (8-hr); 35 ppm (1-hr) |
| Sulfur Dioxide (SO₂) | Coal combustion, smelting | Bronchoconstriction, asthma; acid rain precursor | 75 ppb (1-hr) |
| Nitrogen Dioxide (NO₂) | Vehicle exhaust, power plants | Airway inflammation; contributes to ozone and PM formation | 53 ppb (annual); 100 ppb (1-hr) |
| Lead (Pb) | Aircraft (leaded avgas), legacy paint, some industrial sources | Neurodevelopmental harm in children; cardiovascular effects in adults | 0.15 µg/m³ (rolling 3-month average) |

The **Air Quality Index (AQI)** translates these technical standards into a single daily public-facing number ranging from 0 to 500, divided into six color-coded categories from "Good" (0–50, green) to "Hazardous" (301–500, maroon). The AQI for a given day and location equals the highest AQI value calculated across all monitored criteria pollutants. When the AQI exceeds 100, sensitive groups face risk; when it exceeds 150, the general public faces risk. Public health communicators use the AQI to issue action advisories — recommending, for example, that people with asthma remain indoors when AQI exceeds 150.

**Indoor air quality** deserves separate attention because Americans spend roughly 90 percent of their time indoors, where concentrations of some pollutants can be two to five times higher than outdoors. Indoor air hazards include radon (a naturally occurring radioactive gas that is the second-leading cause of lung cancer in the United States), secondhand tobacco smoke, combustion products from gas stoves and space heaters, volatile organic compounds off-gassed from building materials and furniture, biological contaminants (mold, dust mites, pet dander), and carbon monoxide from faulty appliances. Unlike outdoor air, indoor air quality is not directly regulated by NAAQS, making building codes, product standards, and individual behavior the primary tools.

!!! mascot-thinking "PM2.5 and the Cardiovascular System"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinking">
    "It's counterintuitive that a lung pollutant drives heart disease — but the evidence is strong. PM2.5 particles that enter the bloodstream trigger systemic inflammation, accelerate atherosclerotic plaque formation, and promote clotting. For every 10 µg/m³ increase in long-term PM2.5 exposure, studies find roughly a 6–13% increase in cardiovascular mortality. The 2.5-micron cutoff is not arbitrary: it marks the size below which alveolar deposition becomes the dominant pathway."

---

## Water Safety: Standards, Treatment, and Pathogens

Safe drinking water is one of public health's most consequential achievements. Before chlorination became widespread in U.S. cities in the early twentieth century, typhoid fever killed tens of thousands of Americans annually. Understanding how that protection is maintained — and where it breaks down — requires examining the regulatory framework, the treatment process, and the biological agents that remain threats when systems fail.

The **Safe Drinking Water Act (SDWA)** of 1974, with major amendments in 1986 and 1996, is the primary federal law governing public water systems in the United States. The SDWA directs the EPA to establish Maximum Contaminant Levels (MCLs) — legally enforceable limits on contaminant concentrations in public water supplies — for microorganisms, disinfection byproducts, inorganic chemicals, organic chemicals, and radionuclides. The Act also requires community water systems to monitor water quality and issue annual Consumer Confidence Reports. Notably, the SDWA covers only public water systems serving at least 15 connections or 25 people; the roughly 43 million Americans relying on private wells are outside its jurisdiction.

**Water safety standards** rest on the concept of treatment techniques when an MCL is technically infeasible or when the contaminant is a pathogen for which no reliable real-time test exists. Cryptosporidium, for example, is regulated through filtration and disinfection treatment requirements rather than a concentration-based MCL because monitoring for the oocyst is slow and expensive.

**Drinking water treatment** for surface water sources typically moves through six stages: (1) coagulation and flocculation, where aluminum sulfate or ferric chloride causes small particles and pathogens to aggregate; (2) sedimentation, allowing aggregated flocs to settle; (3) filtration through sand, gravel, and sometimes activated carbon beds; (4) disinfection with chlorine, chloramine, ozone, or ultraviolet light; (5) pH adjustment and corrosion control (critical after the Flint, Michigan crisis demonstrated how failure here causes lead leaching from service lines); and (6) fluoridation at 0.7 mg/L to prevent dental caries.

**Waterborne disease pathogens** fall into three categories. *Bacterial* pathogens include *Vibrio cholerae* (cholera), *Salmonella typhi* (typhoid), enterotoxigenic *E. coli* (traveler's diarrhea), and *Legionella pneumophila* (Legionnaires' disease, typically from engineered water systems). *Viral* pathogens include hepatitis A virus and norovirus, both of which can survive treatment inadequacies and spread via recreational water. *Protozoan* pathogens — particularly *Cryptosporidium parvum* and *Giardia lamblia* — are chlorine-resistant and caused some of the largest documented waterborne outbreaks in the United States, including the 1993 Milwaukee *Cryptosporidium* outbreak that sickened an estimated 400,000 people.

!!! mascot-warning "The Flint Water Crisis: A Treatment Failure with Lasting Consequences"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage warning">
    "Flint illustrates a critical point: water safety is not a single-point problem. When the city switched its source water in 2014 without adding corrosion inhibitors, lead leached from aging service lines into household taps. Lead has no safe level for children — it causes irreversible neurodevelopmental harm. The crisis was not merely a technical failure; it was a regulatory and environmental justice failure, concentrated in a predominantly Black, low-income community. Let's look at the data together: blood lead levels in Flint children nearly doubled during the exposure period."

---

## Toxicology Principles: Dose-Response, Bioaccumulation, and Endocrine Disruption

The sixteenth-century physician Paracelsus famously wrote that "the dose makes the poison" — a principle that remains the foundation of modern toxicology. **Toxicology dose-response** analysis examines how the magnitude of a biological effect changes as a function of exposure level, and it underlies the dose-response assessment step of risk assessment described earlier.

A standard dose-response curve plots observed effect (on the y-axis, often as percent of a population affected) against dose (on the x-axis, on a log scale). Several landmark points on this curve carry regulatory significance. The **No Observed Adverse Effect Level (NOAEL)** is the highest tested dose at which no statistically significant adverse effect is observed. The **Lowest Observed Adverse Effect Level (LOAEL)** is the lowest dose at which an adverse effect *is* detected. Regulatory agencies divide the NOAEL by safety factors (typically 10-fold for each source of uncertainty: animal-to-human extrapolation, human variability) to derive the Reference Dose. The **LD50** — the dose lethal to 50 percent of a test population — summarizes acute toxicity for comparative purposes and is useful for ranking relative potency across agents.

Not all chemicals distribute equally through the body and environment. **Bioaccumulation** describes the process by which certain lipophilic (fat-soluble) compounds — organochlorine pesticides like DDT, polychlorinated biphenyls (PCBs), methylmercury — accumulate in an organism's tissues at concentrations far exceeding those in the surrounding environment. When a predator eats many contaminated prey organisms, it concentrates the compound further — a process called **biomagnification**. Through biomagnification in aquatic food webs, methylmercury concentrations in large predatory fish (tuna, swordfish, shark) can be one million times higher than concentrations in the surrounding water. This explains federal advisories limiting fish consumption for pregnant women, who risk fetal neurotoxicity.

**Endocrine disruption** represents a paradigm-shifting category of toxicity that challenges classical dose-response assumptions. Endocrine-disrupting compounds (EDCs) — including bisphenol A (BPA), phthalates, certain pesticides, and per- and polyfluoroalkyl substances (PFAS) — interfere with hormone signaling systems at doses far below those that cause traditional toxicological effects. EDCs can mimic natural hormones (acting as agonists), block receptor binding (antagonists), or alter hormone synthesis and metabolism. Because the endocrine system is particularly sensitive during fetal development and puberty, EDC effects may be most pronounced at developmentally timed exposures rather than simply at high doses — a pattern that undermines the classical assumption of a monotonic (uniformly increasing) dose-response relationship.

#### MicroSim: Dose-Response Curve Explorer

<iframe src="../../sims/dose-response-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dose-Response Curve Explorer — MicroSim Specification</summary>
Type: microsim
**sim-id:** dose-response-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive dose-response curve visualization. The canvas (700×460px) shows a sigmoid dose-response curve on a log-dose x-axis. Three sliders control: (1) slope steepness (Hill coefficient), (2) NOAEL/LOAEL threshold position, (3) whether the curve is threshold vs. linear-no-threshold (LNT) for carcinogens. Labeled markers appear on the curve for NOAEL (green triangle), LOAEL (orange triangle), EC50/LD50 (red circle), and the derived Reference Dose (blue dashed vertical line). Hovering over any marker shows a tooltip with the definition and typical regulatory use. A dropdown allows switching between "Threshold" (classic S-curve) and "Linear No-Threshold" (straight line through origin) models. A legend explains each marker. The background shades in three zones: "No Effect" (below NOAEL, light green), "Uncertain Zone" (NOAEL to LOAEL, light yellow), and "Effect Zone" (above LOAEL, light red).
</details>

---

## The Built Environment and Health

The **built environment** encompasses all of the human-made physical surroundings in which people live, work, learn, and play — streets, buildings, parks, transit systems, food retail, and land-use patterns. Research over the past three decades has established that the configuration of the built environment shapes physical activity, diet, social interaction, and exposure to environmental hazards, producing measurable effects on chronic disease rates, mental health, and longevity.

**Urban heat island effect** is a well-documented built environment phenomenon in which cities are measurably warmer than surrounding rural areas, typically by 1–7°C. The effect arises because dark impervious surfaces (asphalt, roofing materials) absorb and retain solar radiation, while the absence of vegetation eliminates the cooling from evapotranspiration. Urban heat islands amplify the health effects of heat waves — extreme heat is the leading weather-related cause of death in the United States — and the effect is strongest in low-income urban neighborhoods that have fewer trees and more industrial uses.

**Food desert definition** in federal policy (USDA) refers to a low-income census tract where a substantial number of residents have low access to a supermarket or large grocery store — specifically, more than one mile from such a store in urban areas or more than ten miles in rural areas. The food desert concept links built environment to dietary quality: when healthful foods are physically inaccessible or unaffordable, people rely on corner stores and fast-food outlets with limited fresh produce. However, more recent research complicates the simple access narrative, finding that simply opening a new grocery store in a food desert does not reliably improve dietary outcomes without also addressing food affordability and cultural preferences. The term **food swamp** — a neighborhood saturated with fast-food and convenience food outlets relative to healthful options — has been proposed as a more complete descriptor of the food environment.

**Green space health benefits** operate through multiple pathways. Vegetation reduces air pollution concentrations, mitigates the urban heat island effect, attenuates noise, and provides habitat for biodiversity. Psychologically, green space exposure is associated with reduced stress hormone levels (cortisol), improved attention, and lower rates of depression and anxiety — mechanisms theorized in Attention Restoration Theory and Stress Recovery Theory. Socially, parks and green corridors facilitate physical activity and serve as settings for community interaction that builds social cohesion. Epidemiologically, studies controlling for confounders consistently find that residents with greater green space access have lower all-cause mortality, even after adjusting for income, education, and baseline health.

**Built environment health** research also encompasses walkability (the degree to which an area supports walking for transportation and recreation), access to transit, housing quality, and noise exposure. The Walk Score metric operationalizes walkability by weighting proximity to destinations; higher walkability scores are associated with lower body mass index and reduced rates of type 2 diabetes in cross-sectional studies. Noise pollution from traffic and aviation is an underappreciated built environment hazard, associated with sleep disruption, cognitive impairment in children, hypertension, and ischemic heart disease through stress-pathway and sleep-fragmentation mechanisms.

!!! mascot-tip "Measuring the Built Environment in Practice"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Sage giving a tip">
    "When reading built environment research, pay close attention to whether the study measures *access* (objective distance to resources) or *use* (whether people actually patronize them). These are not interchangeable. Geographic Information Systems (GIS) tools can calculate a food store within 0.5 miles, but if the store is across a highway with no crosswalk, access and use diverge sharply. Investigators always ask: how was the exposure measured, and does it capture the mechanism you care about?"

---

## Climate Change and Population Health

**Climate change health impacts** are wide-ranging, affecting virtually every domain of public health through multiple interlocking pathways. The Intergovernmental Panel on Climate Change (IPCC) describes these pathways as: direct effects of extreme weather, indirect effects mediated through ecosystems, and effects mediated through disrupted human systems including food, water, and infrastructure. No single section can be exhaustive; the table below organizes the major climate drivers, their health pathways, the resulting diseases or outcomes, and the populations most affected.

The following table summarizes climate change health impact pathways. Each row connects a specific climate driver to its biological mechanism and population impact, illustrating the breadth of the threat.

| Climate Driver | Health Pathway | Disease / Outcome | Most-Affected Populations |
|----------------|---------------|-------------------|--------------------------|
| Rising mean temperatures and heat waves | Heat stress, cardiovascular strain, air quality degradation | Heat stroke, heat exhaustion, CVD exacerbation | Elderly, outdoor workers, urban poor, infants |
| Altered precipitation patterns and flooding | Contamination of water supplies; displacement | Waterborne disease outbreaks, mental health impacts | Low-lying and coastal communities, low-income |
| Extended warm seasons | Range expansion of disease vectors | Lyme disease, dengue, West Nile, malaria (at new latitudes) | Immunocompromised, those without healthcare access |
| Drought and extreme heat | Crop failures, food price volatility | Malnutrition, undernutrition, conflict-driven displacement | Rural poor globally, subsistence farmers |
| Wildfire frequency and intensity | Fine particulate smoke over wide areas | Respiratory disease, cardiovascular events, perinatal effects | Rural/suburban interface communities, farmworkers |
| Ocean warming and acidification | Harmful algal bloom expansion | Paralytic shellfish poisoning, ciguatera, vibriosis | Coastal fishing communities |
| Extreme storms | Physical trauma, infrastructure disruption, displacement | Injury, PTSD, chronic disease management gaps | Coastal, low-income, elderly |

**Vector-borne disease expansion** is one of the most extensively studied climate-health connections. As average temperatures rise and winters become milder, the geographic range of competent disease vectors expands poleward and to higher elevations. The black-legged tick (*Ixodes scapularis*), which transmits *Borrelia burgdorferi* (Lyme disease), has spread northward into Canada and to higher elevations in the Appalachians. *Aedes aegypti* and *Aedes albopictus*, the mosquitoes that transmit dengue, Zika, and chikungunya, are projected to reach the continental United States' mid-Atlantic coast under high-emission scenarios. These expansions are not merely theoretical: dengue is already endemic in southern Florida and South Texas, and locally acquired malaria cases — once thought eliminated from the continental U.S. — reappeared in Florida and Texas in 2023.

**Wildfire and air quality** represent a rapidly worsening intersection of climate and environmental health. Wildfires produce dense plumes of PM2.5 that can travel thousands of miles, overwhelming air quality monitoring systems designed for urban industrial pollution. Wildfire smoke contains not only PM2.5 but also a complex mixture of acrolein, formaldehyde, benzene, and polycyclic aromatic hydrocarbons — a combination more toxic per unit of PM2.5 than typical urban pollution. Epidemiological studies have linked wildfire smoke exposure to increases in asthma emergency visits, preterm birth, and cardiovascular hospitalizations. Agricultural workers in the western United States — who cannot simply stay indoors — face disproportionate occupational wildfire smoke exposure.

---

## Environmental Justice and Cumulative Burden

**Environmental justice** (EJ) is the principle that all people, regardless of race, income, or national origin, deserve equal protection from environmental and health hazards and equal access to a healthy environment. The EJ movement emerged in the 1980s from grassroots organizing, particularly in communities of color facing disproportionate siting of hazardous waste facilities, industrial plants, and polluted infrastructure. The 1987 United Church of Christ report *Toxic Wastes and Race in the United States* provided early systematic evidence that race — more than income — predicted proximity to hazardous waste facilities.

**Environmental justice** as a federal policy concept gained formal recognition in President Clinton's 1994 Executive Order 12898, which directed all federal agencies to identify and address disproportionate environmental health burdens on minority and low-income populations. The EPA's Office of Environmental Justice carries out this mandate, but critics note that the order lacked enforcement mechanisms and that disparities have persisted or widened in some domains.

**Cumulative exposure burden** captures a key insight that single-pollutant risk assessment misses: real communities are not exposed to one chemical at a time. Residents of a community near a highway, a petroleum refinery, and a Superfund site face simultaneous exposures to traffic-related air pollution, industrial emissions, and contaminated groundwater — on top of stressors like poverty, food insecurity, and limited healthcare access that amplify physiological susceptibility. Cumulative burden frameworks attempt to aggregate these multiple exposures and vulnerabilities into a composite index that reflects the actual lived experience of environmental risk.

**Legacy contamination** refers to hazardous substances left behind by historical industrial activity — lead paint in pre-1978 housing, PCBs in river sediments, trichloroethylene (TCE) in groundwater from former dry-cleaning and manufacturing sites, arsenic in soil from pesticide application, and radionuclides from Cold War uranium mining on Navajo Nation lands. Legacy contamination is concentrated in the same communities that face current industrial pollution, amplifying cumulative burdens. Brownfields — vacant or underutilized properties with known or suspected contamination — number approximately 450,000 across the United States and are disproportionately located in communities of color.

The **EJScreen tool** is the EPA's publicly accessible online mapping and screening tool for environmental justice analysis. Users can select any U.S. census tract and view a composite EJ Index that incorporates eleven environmental indicators (including PM2.5, ozone, proximity to Superfund sites, wastewater discharge, and traffic proximity) combined with six demographic factors (percent low income, percent minority, percent with less than a high school diploma, percent linguistically isolated, percent under age 5, and percent over age 64). EJScreen scores are expressed as percentile rankings relative to the state or national average, enabling practitioners to identify communities where multiple burdens converge and where intervention is most urgently needed.

#### Map: Environmental Justice Hotspots — Cumulative Burden Explorer

<iframe src="../../sims/ej-cumulative-burden/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Environmental Justice Cumulative Burden Explorer — MicroSim Specification</summary>
Type: microsim
**sim-id:** ej-cumulative-burden<br/>
**Library:** p5.js<br/>
**Status:** Specified

Interactive concept map of environmental justice cumulative burden. The canvas displays a stylized U.S. map outline (simplified polygon shapes for states, not detailed boundaries) with six clickable "hotspot" regions representing archetypes: (1) Gulf Coast petrochemical corridor, (2) Appalachian coalfield community, (3) Los Angeles basin (traffic + port pollution), (4) Chicago industrial South Side, (5) Navajo Nation uranium legacy, (6) Mississippi Delta agricultural runoff. Clicking a hotspot opens a pop-up panel listing: top three environmental hazards, top two demographic vulnerability factors, illustrative EJScreen percentile, and a one-sentence description of the community's historical exposure history. A slider labeled "Cumulative Burden Threshold" adjusts which hotspots are highlighted (showing that at higher thresholds fewer communities qualify, illustrating the policy tradeoff). A legend distinguishes "environmental indicators" (red icons) from "demographic vulnerability factors" (blue icons). The purpose is conceptual illustration of EJScreen methodology, not real data mapping.
</details>

**Green space health benefits** intersect directly with environmental justice: wealthy, predominantly white neighborhoods have roughly 50 percent more tree canopy cover than low-income and predominantly non-white neighborhoods in most U.S. cities. The urban heat island effect is therefore not uniformly distributed — its greatest intensity falls on communities already facing pollution and social disadvantages. This pattern illustrates the environmental justice concept that environmental *benefits* (parks, tree cover, clean air) as well as *burdens* (pollution, hazardous waste) are inequitably distributed.

!!! mascot-encourage "Environmental Justice Can Feel Overwhelming — That's Okay"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage encouraging">
    "When you look at the cumulative picture — legacy contamination, industrial siting, climate vulnerability, and social disadvantage all concentrated in the same communities — it can feel like an insurmountable problem. The next generation of public health workers felt that way too, and then they got to work. EJScreen was built because advocates demanded data. Lead paint abatement succeeded because researchers proved the harm. Change in environmental justice is slow, uneven, and hard-won — and it happens."

---

## Summary and Key Takeaways

Environmental health encompasses an extraordinarily wide scope — from the molecular (how a lipophilic chemical accumulates across a food web) to the global (how rising temperatures expand the range of disease vectors) to the political (why pollution burdens are not distributed randomly across populations). Several integrating themes run through this chapter:

**Risk assessment provides structure but not certainty.** The four-step framework — hazard identification, dose-response assessment, exposure assessment, risk characterization — is science's best tool for converting incomplete evidence into regulatory decisions. Understanding its assumptions and limitations is prerequisite to interpreting environmental health policies intelligently.

**Exposure is multidimensional.** Air quality, water quality, soil contamination, food environment, and the physical design of neighborhoods all constitute environmental exposures. Single-agent standards (NAAQS, MCLs) are necessary regulatory tools, but they underestimate real-world risk because people are simultaneously exposed to many agents in communities that compound their effects.

**Toxicological dose-response assumptions matter.** Whether a chemical has a threshold or follows a linear-no-threshold model, whether it bioaccumulates, and whether it disrupts endocrine signaling at low doses all determine how standards should be set — and whether current standards are adequate.

**Environmental justice connects science to ethics.** The evidence that environmental burdens are systematically concentrated in low-income and minority communities is robust and reproducible. This is not a natural outcome of geography or risk preferences; it reflects historical policy decisions about industrial siting, housing, and infrastructure investment. Addressing it requires both better data tools (like EJScreen) and deliberate policy intervention.

!!! mascot-celebration "Chapter 6 Complete — You've Mapped the Environment-Health Connection"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrating">
    "You've moved from the molecular — dose-response curves and bioaccumulation — all the way to the global — climate change and vector-borne disease expansion — and back to your own community with the EJScreen tool. The next generation of public health investigators uses this full spectrum. What does the evidence show? It shows that where you live shapes how long you live — and that is something public health can change."
