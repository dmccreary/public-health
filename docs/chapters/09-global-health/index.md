---
title: "Global Health"
description: Global burden of disease metrics, epidemiological and demographic transitions, universal health coverage frameworks, Sustainable Development Goals, pandemic governance under the International Health Regulations, neglected tropical diseases, global health governance actors, and humanitarian health standards.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Global Health

## Summary

Public health problems do not respect national borders, and the dominant burden of disease falls on low- and middle-income countries. This chapter provides the quantitative and institutional framework for understanding global health: DALYs as a common currency for comparing disease burdens across causes and regions; epidemiological and demographic transition theory; universal health coverage as a policy goal with measurable indices; the SDG 3 health targets; the legal architecture of international disease surveillance (IHR 2005); the landscape of global health governance from WHO to philanthropic foundations; and the humanitarian standards that guide health response in conflict and displacement settings.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 8: Health Policy and Management](../08-health-policy-management/index.md)

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Global Burden of Disease
2. DALYs Concept
3. Years of Life Lost
4. Years Lived with Disability
5. Epidemiological Transition
6. Demographic Transition
7. Double Burden of Disease
8. Universal Health Coverage
9. Financial Protection Index
10. Service Coverage Index
11. Abuja Declaration
12. Catastrophic Health Expenditure
13. SDG 3 Health Targets
14. International Health Regulations
15. PHEIC Declaration
16. Global Health Security Index
17. Neglected Tropical Diseases
18. Preventive Chemotherapy
19. Global Health Governance
20. WHO Structure and Mandate
21. World Bank Health Financing
22. GAVI Vaccine Alliance
23. Global Fund HIV TB Malaria
24. PEPFAR Program
25. Sphere Humanitarian Standards

---

!!! mascot-welcome "What Does the Evidence Show — Globally?"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Global health invites a particular kind of intellectual humility: the patterns of disease and death that dominate low-income countries today look strikingly different from what high-income countries face — yet were not so different a generation or two ago. Understanding that difference, and the forces driving it, is the foundation of effective global health practice.

## Measuring Global Health Burden: DALYs, YLLs, and YLDs

Comparing the health of populations across countries, diseases, and time requires a common currency that captures both premature death and non-fatal disability. Mortality rates alone are insufficient — a condition like major depression kills relatively few people but generates enormous years lived in suffering. The **Global Burden of Disease (GBD)** study, led by the Institute for Health Metrics and Evaluation (IHME) and first published in *The Lancet* in 1993 with updated annual estimates since, addresses this by estimating the total loss of healthy life from hundreds of diseases and injuries across all countries.

The fundamental unit of the GBD framework is the **Disability-Adjusted Life Year (DALY)** — a single metric that combines years of life lost to premature death with years of healthy life lost to disability. Mathematically:

\[
\text{DALY} = \text{YLL} + \text{YLD}
\]

**Years of Life Lost (YLL)** measures premature mortality. For each death, YLL is calculated as the number of years the deceased would have lived had they survived to the reference life expectancy (the GBD uses a frontier life expectancy of approximately 86 years for females). A child dying at age 2 from malaria contributes roughly 84 YLLs to the malaria burden; an adult dying at age 65 from cardiovascular disease contributes approximately 21 YLLs. This weighting means that conditions killing young people — childhood diarrheal disease, complications of childbirth, road traffic injuries — carry disproportionately large YLL burdens.

**Years Lived with Disability (YLD)** measures non-fatal health loss. For each prevalent case of a condition, YLD is calculated as the duration of the condition multiplied by a disability weight — a number between 0 (perfect health) and 1 (death) reflecting the severity of the condition's impact on daily functioning. Disability weights are derived from large-scale population surveys asking people to rate hypothetical health states. Low back pain, for example, carries a disability weight of approximately 0.06 for mild cases; blindness carries a weight of 0.19. Conditions with high YLD contributions include mental disorders, musculoskeletal conditions, and sensory impairments — all of which kill relatively few people but affect hundreds of millions.

The DALYs framework reveals a picture of global health burden substantially different from what mortality statistics alone would suggest. Mental health conditions — depression, anxiety, schizophrenia, substance use disorders — account for approximately 12% of global DALYs despite contributing relatively few deaths, because their prevalence is high and their disability weights are substantial. This invisibility in mortality statistics has historically contributed to chronic underfunding of global mental health programs.

!!! mascot-thinking "Not All Life-Years Are Equal — Or Are They?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage looks at a clipboard thoughtfully">
    Early GBD calculations applied age-weighting (assigning more value to years lived at productive ages) and discount rates (valuing near-term health more than future health). Both practices were controversial on equity grounds and have since been dropped from the standard GBD methodology. The current GBD treats every year of healthy life as equally valuable, regardless of the age or productivity of the person living it. This is a methodological choice with profound ethical implications — and it's one worth examining critically.

#### Chart: Global Burden of Disease by Cause and Income Group

<iframe src="../../sims/gbd-burden-chart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Global Burden of Disease Interactive Chart — Specification</summary>
Type: microsim
**sim-id:** gbd-burden-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Grouped horizontal bar chart showing DALY burden (in millions) by cause category (communicable diseases, non-communicable diseases, injuries) and World Bank income group (low income, lower-middle income, upper-middle income, high income). Data sourced from GBD 2021 estimates. Hovering over any bar segment shows: cause category name, income group, total DALYs, percentage of total burden, and a one-sentence interpretation. A dropdown allows toggling between absolute DALYs and age-standardized DALYs per 100,000 population. A radio button switches the Y-axis from income group to WHO region. Color scheme: communicable = orange, NCD = blue, injuries = green. A horizontal reference line shows the global average for each metric when toggled on. Legend and axis labels clearly explain the data source and year.
</details>

## Epidemiological and Demographic Transitions

Population health patterns do not remain static; they shift predictably as countries develop economically and socially. Two theoretical frameworks — **epidemiological transition** theory and **demographic transition** theory — describe these shifts and explain the divergent disease burdens observed across countries at different development stages.

**Demographic transition** theory, developed by demographer Warren Thompson in the 1920s, describes the shift from high birth rates and high death rates (characteristic of pre-industrial societies) through falling death rates followed by falling birth rates, eventually reaching low birth rates and low death rates in industrialized societies. This transition is driven by improvements in nutrition, sanitation, and eventually medical care, which reduce child mortality and alter families' reproductive decision-making. The transition has profound implications for population age structure: societies early in the transition have young, rapidly growing populations; societies late in the transition have older, slowly growing or shrinking populations; and the resulting dependency ratio — the ratio of economically dependent people (children and elderly) to working-age adults — shifts dramatically across stages.

**Epidemiological transition** theory, formalized by Abdel Omran in 1971, describes a parallel shift in the dominant causes of death. Omran identified three original stages: (1) the Age of Pestilence and Famine, when infectious diseases, malnutrition, and maternal/child conditions dominate and life expectancy at birth is 20–40 years; (2) the Age of Receding Pandemics, as improved sanitation and nutrition reduce infectious disease mortality and life expectancy rises to 30–50 years; and (3) the Age of Degenerative and Man-made Diseases, when chronic non-communicable diseases (cardiovascular disease, cancer, stroke) become the leading causes of death and life expectancy exceeds 60 years. Later scholars added a fourth stage — the Age of Delayed Degenerative Diseases — in which chronic diseases are managed but not eliminated, and life expectancy continues to extend into the 70s, 80s, and beyond.

The **double burden of disease** refers to the situation facing many low- and middle-income countries, particularly those in the middle stages of epidemiological transition, in which substantial burdens of infectious disease, malnutrition, and maternal/child conditions coexist with rapidly rising prevalence of cardiovascular disease, type 2 diabetes, and cancers. Sub-Saharan African countries now face both high HIV/TB burden and rapidly rising rates of hypertension and obesity — conditions driven partly by the globalization of ultra-processed food markets. Health systems designed for acute infectious disease are ill-equipped to provide the chronic disease management that the double burden demands.

## Universal Health Coverage: Measuring Progress

**Universal health coverage (UHC)** is the principle that all people should be able to obtain the health services they need — prevention, treatment, rehabilitation, and palliation — without suffering financial hardship. UHC was endorsed as a global health goal by the United Nations General Assembly in 2012 and is embedded as target 3.8 within the Sustainable Development Goals.

The WHO and World Bank operationalize UHC through two complementary indices that together describe the two dimensions of coverage: the quality of services available and the financial protection they provide.

The **Service Coverage Index (SCI)** aggregates fourteen tracer indicators across four domains: reproductive, maternal, newborn, and child health; infectious diseases; non-communicable diseases; and service capacity and access. Each indicator captures a specific coverage rate (e.g., met need for family planning, antiretroviral therapy coverage, hypertension treatment coverage, hospital bed density per population). The SCI ranges from 0 to 100; the global average was approximately 68 in 2021, with high-income countries averaging above 80 and low-income countries averaging in the low 40s.

**Financial protection** is measured through two related indicators. The **catastrophic health expenditure** indicator captures the proportion of households spending more than 10% of total household consumption (or 25% of non-food consumption) on out-of-pocket health costs in a given year — a threshold above which health spending is likely to force trade-offs with other necessities. The **Financial Protection Index** aggregates catastrophic expenditure and impoverishment (households pushed below a poverty line by health costs) into a single coverage dimension complementary to the SCI. Globally, approximately 2 billion people face catastrophic or impoverishing health expenditure, with the burden heaviest in South Asia and Sub-Saharan Africa.

The **Abuja Declaration** of 2001 committed African Union member states to allocate at least 15% of their national budgets to health — a political commitment intended to address chronic underfunding of public health in low-income African countries. As of the most recent tracking, fewer than a third of African Union member states have consistently met the 15% target, though many have increased health budget shares since 2001. The declaration remains an important reference point for domestic resource mobilization advocacy.

#### Diagram: Universal Health Coverage Cube

<iframe src="../../sims/uhc-coverage-cube/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Universal Health Coverage Cube Interactive Diagram — Specification</summary>
Type: microsim
**sim-id:** uhc-coverage-cube<br/>
**Library:** p5.js<br/>
**Status:** Specified

Three-dimensional wireframe cube rendered in 2.5D perspective (isometric projection) representing the WHO UHC three-dimension model. The three axes are: Population covered (Who — from 0% to 100% of population), Services included (What — from narrow emergency care to comprehensive care), and Direct costs (How much — from 100% out-of-pocket to fully subsidized). An interactive slider controls the size of the shaded volume representing current coverage; the default fills roughly 50% of the cube to represent a middle-income country. Three buttons cycle through preset country profiles: "Low-income country," "Middle-income country," and "High-income country," each adjusting the shaded volume dimensions. Clicking any face of the cube opens an annotation panel explaining that dimension (population coverage, service range, financial protection). A tooltip on hover shows the numerical value for the selected country profile on each axis.
</details>

## The Sustainable Development Goals and Health

The **SDG 3 health targets**, part of the 2030 Agenda for Sustainable Development adopted by all UN member states in 2015, define an ambitious global health agenda organized around seventeen targets and twenty-eight indicators. Key SDG 3 targets include:

- Reducing the global maternal mortality ratio to fewer than 70 per 100,000 live births (Target 3.1)
- Ending preventable deaths of newborns and children under 5 (Target 3.2)
- Ending the epidemics of AIDS, tuberculosis, malaria, and neglected tropical diseases (Target 3.3)
- Reducing premature mortality from non-communicable diseases by one-third through prevention and treatment (Target 3.4)
- Achieving universal health coverage (Target 3.8)
- Achieving universal access to sexual and reproductive health care services (Target 3.7)
- Strengthening countries' capacity for health security and implementation of the International Health Regulations (Target 3.d)

Progress toward SDG 3 targets was uneven before COVID-19 and then dramatically disrupted by it. Maternal mortality had declined globally but remained starkly concentrated in Sub-Saharan Africa and South Asia. Child under-5 mortality had fallen substantially — from 9.1 million deaths in 2000 to 5.0 million in 2019 — but reductions were slower in the highest-burden settings. COVID-19 reversed gains in life expectancy in more than 80 countries, interrupted routine immunization and tuberculosis treatment programs, and overwhelmed health system capacity in settings that had made years of progress toward UHC.

## Pandemic Preparedness: IHR and the PHEIC System

The **International Health Regulations (IHR)**, revised in 2005 after the SARS outbreak, are the primary binding international legal instrument governing global disease surveillance and response. Member states of the WHO are legally obligated under IHR 2005 to: develop and maintain core public health capacities for surveillance and response; notify WHO of events that may constitute a Public Health Emergency of International Concern within 24 hours of assessment; and implement health measures at points of entry (airports, seaports, ground crossings) proportionate to public health risk.

The **Public Health Emergency of International Concern (PHEIC)** is the IHR's highest alert level, declared by the WHO Director-General on the advice of an Emergency Committee of independent experts when an event is (1) an extraordinary event, (2) constitutes a public health risk to other states through international spread, and (3) potentially requires a coordinated international response. A PHEIC declaration triggers formal WHO recommendations (Temporary Recommendations) to member states on travel, trade, surveillance, and response measures. PHEICs have been declared for H1N1 influenza (2009), polio (2014, ongoing), Ebola in West Africa (2014), Zika (2016), Ebola in the DRC (2019), COVID-19 (2020), monkeypox/mpox (2022), and mpox again (2024).

The **Global Health Security Index (GHSI)**, published by the Nuclear Threat Initiative and the Johns Hopkins Center for Health Security, independently assesses countries' preparedness for biological threats across six categories: prevention, detection and reporting, rapid response, health system capacity, compliance with international norms, and risk environment. The GHSI's 2021 findings — that no country was adequately prepared for a pandemic of COVID-19's scale — prompted significant reflection on the gap between formal IHR compliance and genuine preparedness capacity. Even high-GHSI countries performed poorly during COVID-19, suggesting that index scores capture structural features but not adaptive governmental capacity.

#### Timeline: IHR Evolution and PHEIC Declarations

<iframe src="../../sims/ihr-pheic-timeline/main.html" width="100%" height="420px" scrolling="no"></iframe>

<details markdown="1">
<summary>IHR and PHEIC Timeline Interactive Visualization — Specification</summary>
Type: microsim
**sim-id:** ihr-pheic-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Horizontal scrollable timeline from 1969 (original IHR) to 2024. Key milestone events are represented as labeled nodes on the timeline: 1969 IHR enacted (blue diamond), 2003 SARS (red circle), 2005 IHR revised (blue diamond), and then each PHEIC declaration as orange circles with disease name labels. Clicking any node opens a details panel showing: event name, date, brief description, and outcome or status. The timeline is divided into two swim lanes: "IHR Milestones" (top) and "PHEIC Declarations" (bottom). A zoom slider allows the user to expand the 2019–2024 period to see COVID-19 and mpox events in detail. Nodes are color-coded by category: IHR legal milestone = blue, PHEIC declared = orange, PHEIC ended = green, ongoing = pulsing orange animation. A "Compare Response" button opens an overlay comparing WHO response timelines for H1N1, Ebola 2014, and COVID-19.
</details>

## Neglected Tropical Diseases

**Neglected tropical diseases (NTDs)** are a group of communicable diseases that disproportionately affect the world's poorest populations, primarily in tropical and subtropical settings. The WHO NTD roadmap identifies 20 conditions as NTDs, including soil-transmitted helminths (ascariasis, hookworm, trichuriasis), schistosomiasis, lymphatic filariasis (elephantiasis), trachoma, onchocerciasis (river blindness), leishmaniasis, Chagas disease, human African trypanosomiasis (sleeping sickness), and leprosy. Globally, NTDs affect more than 1.6 billion people and are concentrated in settings with poor sanitation, contaminated water, dense vector populations, and limited health system capacity.

NTDs are "neglected" not because they are rare or medically unimportant but because they primarily affect poor populations with limited political voice, and because their chronic, disfiguring, and disabling effects — rather than high mortality — made them less visible to traditional disease burden metrics focused on mortality. The GBD's DALY framework helped reframe the importance of NTDs by quantifying their substantial YLD contributions.

**Preventive chemotherapy (PCT)** is the primary control strategy for five high-burden NTDs (soil-transmitted helminths, schistosomiasis, lymphatic filariasis, trachoma, and onchocerciasis). PCT involves periodic administration of safe, effective, low-cost drugs to entire at-risk populations, typically through school-based or community distribution programs, without individual diagnosis. The strategy is cost-effective because the drugs (albendazole, mebendazole, praziquantel, ivermectin, azithromycin) are donated at no cost by pharmaceutical companies, and because treating large populations regularly drives down transmission even among people who are asymptomatically infected. Mass drug administration programs for NTDs represent one of the strongest ROI cases in global health — estimated cost per DALY averted as low as $5–15 in high-burden settings.

## Global Health Governance: Institutions and Their Limits

**Global health governance** refers to the formal and informal rules, norms, institutions, and processes through which global health decisions are made and implemented. Unlike domestic governance, global health governance has no single sovereign authority; it operates through a web of intergovernmental organizations, bilateral programs, multilateral funds, public-private partnerships, and increasingly influential philanthropic actors.

The **World Health Organization (WHO)** is the primary intergovernmental body for global health, with 194 member states and a mandate to provide global health leadership, set norms and standards, articulate evidence-based policy options, support countries to strengthen health systems, and monitor global health status and trends. The WHO is organized into a World Health Assembly (the decision-making body of all member states), an Executive Board of 34 technically qualified members, a Director-General, and six regional offices. The WHO's two funding streams — assessed contributions (mandatory dues based on national income and population, comprising approximately 20% of the budget) and voluntary contributions (earmarked donations from member states, foundations, and private donors) — create structural tensions between the WHO's independent norm-setting mandate and donor priorities.

The **World Bank** plays an increasingly central role in global health financing, providing loans and grants for health system strengthening, disease control programs, and pandemic preparedness to low- and middle-income countries. The World Bank's 1993 *World Development Report: Investing in Health* introduced the DALY framework to a policy audience and established the economic case for health investment — arguably the single most influential publication in the history of global health economics.

The following table summarizes the major institutions of global health governance, which students should be able to distinguish by mandate, funding model, and COVID-19 role.

| Institution | Founded | Mandate | Funding Model | COVID-19 Role |
|---|---|---|---|---|
| WHO | 1948 | Global health leadership, norms, standards, surveillance | Assessed + voluntary contributions | PHEIC declarations; COVAX co-lead; technical guidance |
| World Bank | 1944 | Development lending; health systems investment | Capital markets + member contributions | $160B+ COVID response financing; pandemic preparedness fund |
| GAVI Vaccine Alliance | 2000 | Accelerate vaccine access in low-income countries | Donor governments + private sector | Co-led COVAX; procured 1.8B doses for low-income countries |
| Global Fund (HIV, TB, Malaria) | 2002 | Finance programs for three diseases | Pledges from donor governments | $1B COVID response; mitigated service disruptions |
| PEPFAR | 2003 | US bilateral HIV/AIDS program | US appropriations | Infrastructure used for COVID testing and vaccine delivery in Africa |
| CEPI | 2017 | Accelerate vaccine development for epidemic threats | Donor governments + private sector | Funded mRNA vaccine development; co-led COVAX |

**GAVI, the Vaccine Alliance** was established in 2000 to increase access to new and underused vaccines in the poorest countries, operating through a public-private partnership model that pools demand across low-income countries to negotiate lower vaccine prices, co-finances vaccine programs with national governments (on a sliding-scale basis tied to income), and invests in market shaping to incentivize vaccine manufacturers. GAVI's market-shaping role represents a novel governance approach: rather than simply purchasing vaccines, GAVI uses its purchasing power and advance market commitments to shift the economics of vaccine development toward diseases with limited commercial markets.

The **Global Fund to Fight AIDS, Tuberculosis and Malaria** operates as a financing mechanism rather than an implementing agency. The Global Fund raises money from donor governments through three-year replenishment cycles, then disburses grants to recipient countries through a country-led principal recipient model. This design was intentionally adopted to address critiques of top-down vertical disease programs by giving recipient countries ownership over program design. The Global Fund has disbursed more than $60 billion since 2002, contributing to the treatment of over 23 million people living with HIV, 6 million tuberculosis patients, and hundreds of millions of malaria cases and prevention interventions.

**PEPFAR (President's Emergency Plan for AIDS Relief)**, launched by President George W. Bush in 2003, is the largest bilateral global health program in history. PEPFAR has invested over $110 billion since inception and, as of 2023, supports antiretroviral treatment for approximately 20 million people living with HIV. PEPFAR's success in rapidly scaling HIV treatment in Sub-Saharan Africa represented a paradigm shift in what bilateral global health assistance could achieve — though the program has also faced critiques for prioritizing treatment over prevention and for exporting US cultural norms (including abstinence-only provisions in early authorizations) that are inconsistent with evidence-based prevention.

!!! mascot-thinking "Who Governs Global Health — and for Whom?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage examines a globe on their clipboard">
    The institutions of global health governance were largely designed by and for high-income countries. The WHO's voting structure gives equal weight to all member states, but funding is dominated by wealthy donors; GAVI and the Global Fund were created partly to circumvent WHO slowness. During COVID-19, high-income countries secured advance purchase agreements that pre-empted vaccine supply for low-income countries — a pattern critics named "vaccine nationalism." Whose interests does global health governance actually serve? Let's look at the data together before answering.

#### Map: Neglected Tropical Disease Geographic Distribution

<iframe src="../../sims/ntd-geographic-map/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>NTD Geographic Distribution Interactive Map — Specification</summary>
Type: microsim
**sim-id:** ntd-geographic-map<br/>
**Library:** p5.js<br/>
**Status:** Specified

Simplified world map rendered in p5.js using country polygon outlines. Countries are shaded by NTD burden intensity (lighter = lower burden, darker = higher burden) using GBD 2021 DALY estimates. Clicking any country opens a sidebar panel showing: country name, top 3 NTDs by burden, total NTD DALYs, and whether the country is currently receiving preventive chemotherapy program support. A dropdown allows selecting a specific NTD (soil-transmitted helminths, schistosomiasis, lymphatic filariasis, trachoma, onchocerciasis) to show its specific geographic distribution. A toggle switches between "Total DALY burden" and "DALYs per 100,000 population." Inset panels zoom in on the endemic belt regions (Sub-Saharan Africa, South Asia, Amazon basin). Color scale and legend are clearly labeled. A note explains data source (IHME GBD 2021) and year.
</details>

## Health in Humanitarian Settings

Humanitarian emergencies — armed conflict, forced displacement, natural disasters, and famine — create health conditions that are both distinct from and compounded by underlying disease burdens. As of 2024, more than 100 million people are forcibly displaced worldwide, and more than 300 million require humanitarian assistance. Understanding the health standards that govern humanitarian response is essential for global health practitioners who may work in or with organizations operating in these settings.

The **Sphere Humanitarian Standards**, now in their fourth edition (2018), are the most widely recognized set of minimum standards for humanitarian response. Originally developed by a consortium of NGOs and the Red Cross movement as the Sphere Project in 1997, the Sphere standards establish minimum indicators for four technical domains: water, sanitation, and hygiene (WASH); food security and nutrition; shelter and settlement; and health. Within the health domain, Sphere standards specify minimum ratios of health workers to population, minimum thresholds for healthcare facility access, vaccine coverage targets, clinical protocols for priority conditions, and indicators for health information management. The Sphere standards also embed a rights-based approach through the Humanitarian Charter, which roots the standards in international humanitarian law and human rights law.

Communicable disease burden in humanitarian settings differs systematically from stable development settings. Displacement into camps or informal settlements creates conditions — overcrowding, limited water and sanitation, disrupted immunization — that amplify transmission of cholera, measles, typhoid, and respiratory infections. Measles outbreaks in refugee camps have reached case fatality rates of 20–30% among malnourished children with no prior vaccination — more than twenty times the rates seen in well-nourished populations with vaccination coverage. Malnutrition is both a consequence and an amplifier of infectious disease in emergencies, creating a vicious cycle that drives excess mortality among children under five.

Mental health and psychosocial support (MHPSS) is an increasingly recognized dimension of humanitarian health response. Conflict-affected and displaced populations face dramatically elevated rates of depression, anxiety, post-traumatic stress disorder, and grief. The Mental Health Gap Action Programme (mhGAP) and the IASC Guidelines on MHPSS in Emergencies provide frameworks for integrating mental health into primary health care and community support systems even in settings with no specialized mental health workforce.

!!! mascot-encourage "A Field You Can Enter"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage offers an encouraging wing">
    Global health can feel overwhelming in scope — billions of people, dozens of institutions, conditions spanning from malaria to mental health. But the investigators who changed the trajectory of HIV, who eliminated smallpox, who drove child mortality from 12 million per year to 5 million in two decades — they were trained professionals who learned these frameworks, chose a focus, and showed up. You are already farther along than they were when they started.

## Key Terms

**DALY (Disability-Adjusted Life Year):** A summary measure of population health equal to YLL + YLD; represents the total burden of disease as years of healthy life lost.

**YLL (Years of Life Lost):** The component of DALYs attributable to premature death, calculated as deaths multiplied by remaining life expectancy at age of death.

**YLD (Years Lived with Disability):** The component of DALYs attributable to non-fatal health loss, calculated as prevalence multiplied by disability weight.

**Epidemiological Transition:** The shift from predominance of infectious diseases and malnutrition to predominance of chronic non-communicable diseases as countries develop economically.

**Universal Health Coverage (UHC):** The goal that all people receive needed health services without suffering financial hardship; operationalized by the WHO/World Bank Service Coverage Index and financial protection metrics.

**Catastrophic Health Expenditure:** Out-of-pocket health spending exceeding 10% of total household consumption; an indicator of inadequate financial protection in health systems.

**PHEIC (Public Health Emergency of International Concern):** The WHO's highest alert level under IHR 2005, triggering formal international response recommendations.

**Neglected Tropical Diseases (NTDs):** A group of 20 communicable diseases primarily affecting poor populations in tropical settings, for which preventive chemotherapy and vector control are primary control strategies.

**Sphere Standards:** Minimum humanitarian standards across WASH, food/nutrition, shelter, and health domains, rooted in international humanitarian law.

## Review Questions

1. Explain the difference between YLL and YLD. Give an example of a condition that would contribute substantially to YLL but minimally to YLD, and an example of the reverse. What does this distinction reveal about global health priorities?

2. A country is experiencing simultaneous high burdens of tuberculosis and rapidly rising rates of type 2 diabetes. What is this pattern called, and what are the health system implications of managing both conditions in a resource-constrained setting?

3. Describe the three criteria the WHO Director-General must apply when deciding whether to declare a Public Health Emergency of International Concern. Using the 2014 West Africa Ebola outbreak as an example, evaluate whether those criteria were clearly met.

4. Compare the governance models of GAVI and the Global Fund. What problem was each designed to solve, and what trade-offs does each model entail for recipient country ownership and donor accountability?

5. A humanitarian organization deploys to a refugee camp of 50,000 displaced persons following an armed conflict. Using the Sphere Humanitarian Standards framework, identify three health indicators you would prioritize for immediate assessment and explain why.

## References

1. GBD 2021 Causes of Death Collaborators. (2022). Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019. *The Lancet*, 396(10258), 1204–1222.
2. Omran, A. R. (1971). The epidemiologic transition: A theory of the epidemiology of population change. *Milbank Memorial Fund Quarterly*, 49(4), 509–538.
3. World Health Organization & World Bank. (2023). *Tracking Universal Health Coverage: 2023 Global Monitoring Report*. WHO.
4. United Nations. (2015). *Transforming Our World: The 2030 Agenda for Sustainable Development*. UN.
5. World Health Organization. (2016). *International Health Regulations (2005)* (3rd ed.). WHO.
6. Hotez, P. J., et al. (2021). Neglected tropical diseases: The sustainable development agenda. *PLOS Neglected Tropical Diseases*, 15(1).
7. Global Fund. (2023). *Global Fund Results Report 2023*. globalfund.org.
8. Sphere Association. (2018). *The Sphere Handbook: Humanitarian Charter and Minimum Standards in Humanitarian Response* (4th ed.). Sphere.
9. GHSIndex.org. (2021). *Global Health Security Index 2021*. NTI & Johns Hopkins.
10. Bump, J. B. (2010). The long road to universal health coverage. *Health Systems & Reform*, 1(1), 1–15.
