---
title: "Health Equity and Social Determinants of Health"
description: Social determinants of health, the Dahlgren-Whitehead model, racial and socioeconomic health disparities, historical trauma, intersectionality, place-based interventions, and upstream policy levers.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Health Equity and Social Determinants of Health

## Summary

Health is not randomly distributed — it follows the contours of social advantage and disadvantage with remarkable consistency across every measure of disease and mortality. This chapter builds a systematic understanding of why, moving from descriptive frameworks (the Dahlgren-Whitehead rainbow model, the WHO Commission's overarching recommendations) through the specific causal pathways linking income, education, housing, and neighborhood conditions to health outcomes, to the structural and historical forces (redlining, criminal justice exposure, intergenerational poverty, intersecting identities) that produce persistent disparities. The chapter closes with evidence-based upstream interventions including place-based strategies and health-in-all-policies approaches.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 6: Environmental Health](../06-environmental-health/index.md)
- [Chapter 7: Social and Behavioral Health](../07-social-behavioral-health/index.md)
- [Chapter 8: Health Policy and Management](../08-health-policy-management/index.md)

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Health Equity Definition
2. Health Disparities Definition
3. Social Determinants of Health
4. Dahlgren-Whitehead Model
5. WHO CSDH Commission Findings
6. Income Gradient Health
7. Education as Health Determinant
8. Housing Quality and Health
9. Food Security and Health
10. Employment and Health
11. Transportation Access Health
12. Neighborhood Effects Health
13. Racial Health Disparities
14. Maternal Mortality Disparities
15. Infant Mortality Disparities
16. Life Expectancy Gaps
17. Historical Trauma
18. Intergenerational Poverty
19. Intersectionality Framework
20. Place-Based Interventions
21. Moving to Opportunity Study
22. Community Development Finance
23. Upstream Policy Levers
24. Healthy People 2030 Goals
25. Root Cause Analysis PH
26. Health in All Policies
27. Structural Competency
28. Redlining Health Effects
29. Criminal Justice Health Impact
30. Long COVID Equity Burden

---

!!! mascot-welcome "What Does the Evidence Show?"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Welcome, investigators. This chapter asks a question that sits at the heart of public health: why do health outcomes differ so predictably across social groups? The evidence points consistently toward forces that operate long before any individual reaches a clinic — in the neighborhoods, schools, workplaces, and policy environments that shape life chances from birth. Let's look at the data together.

---

## Defining Health Equity and Health Disparities

Two terms anchor every discussion in this chapter, and they mean distinct things. **Health disparities** are measurable differences in health outcomes or the determinants of health between population groups. They are empirical observations: Black Americans die from preventable cardiovascular disease at higher rates than white Americans; children born into poverty have lower life expectancy than children born into wealth. The term is descriptive, not evaluative — it simply documents the gap.

**Health equity**, by contrast, is a normative concept. Health equity is the principle that every person should have a fair opportunity to attain their highest level of health, and that no one should be disadvantaged from achieving this potential because of social position or other socially determined circumstances. The distinction matters practically: reducing a disparity does not always advance equity. If an intervention improves health for both high- and low-income groups but improves it more for high-income groups, the disparity widens even though the population is healthier overall.

The Healthy People 2030 initiative, the federal government's decade-long health objective framework, defines health equity as "the attainment of the highest level of health for all people" and names health disparities as differences that are "closely linked with social, economic, and/or environmental disadvantage." This framing centers the social origin of disparities — they are not natural, inevitable, or random.

A useful organizing question for any disparities analysis comes from Margaret Whitehead's foundational 1991 paper: is the difference in health outcome **avoidable**? Differences in health that are unavoidable (e.g., men are biologically more susceptible to certain cancers) are not inequities. Differences that stem from unjust social arrangements — unequal access to quality housing, education, or healthcare — are inequities precisely because they could be otherwise.

---

## The Social Determinants Framework: Dahlgren-Whitehead and WHO CSDH

The dominant conceptual model organizing social determinants research is the **Dahlgren-Whitehead rainbow model**, first published in 1991. The model depicts health as the product of nested layers of influence, from the fixed constitutional factors at the individual core to the distal macroeconomic and cultural environment at the outer ring.

The innermost layer represents **age, sex, and hereditary factors** — biological attributes that shape baseline health risk. Surrounding this core are **individual lifestyle factors** such as diet, physical activity, and smoking, which public health sometimes erroneously treats as the primary drivers of health. The model's main conceptual contribution is to show that lifestyle choices are themselves shaped by the layers outside them: **social and community networks**, which provide or withhold social support and norms; **living and working conditions**, including housing, employment, education, and food access; and the outermost layer, **general socioeconomic, cultural and environmental conditions** — the macrostructural context of national income distribution, welfare state generosity, labor market regulation, and historical policy decisions.

The rainbow metaphor is deliberate: the layers blend into each other, each influencing the others, and they all affect the individual at the center. The implication for intervention is equally deliberate — acting only on the innermost layer (individual behavior) while ignoring the outer layers is unlikely to produce durable population-level change.

#### Diagram: Dahlgren-Whitehead Rainbow Model

<iframe src="../../sims/dahlgren-whitehead-rainbow/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Rainbow Model Specification</summary>
Type: microsim
**sim-id:** dahlgren-whitehead-rainbow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw six concentric arc bands (upper hemisphere) representing, from innermost to outermost: (1) Age, Sex, Heredity [dark blue], (2) Individual Lifestyle Factors [orange], (3) Social and Community Networks [green], (4) Living and Working Conditions [teal], (5) General Socioeconomic, Cultural & Environmental Conditions [purple], (6) a label ring with the layer name. Each band is clickable. On hover, the band brightens and shows a tooltip with the layer name. On click, a panel to the right of the arc displays: the layer name as heading, a 2-sentence definition, and three concrete public health examples. A "Reset" button clears the panel. Responsive to container width.
</details>

The **WHO Commission on Social Determinants of Health (CSDH)**, chaired by Sir Michael Marmot and reporting in 2008, synthesized the global evidence base and issued three overarching recommendations that remain the organizing framework for international SDOH policy:

1. **Improve daily living conditions** — the circumstances in which people are born, grow, live, work, and age, including early childhood development, education, employment, housing, and social protection.
2. **Tackle the inequitable distribution of power, money, and resources** — the structural drivers of daily living conditions, including fiscal policy, labor market regulation, and anti-discrimination law.
3. **Measure the problem, understand the causes, and assess the impact of action** — develop national monitoring systems, build evaluation capacity, and train a health equity workforce.

The Commission's report, *Closing the Gap in a Generation*, concluded starkly that "social injustice is killing people on a grand scale" and that the conditions causing poor health are "the result of a poor social policies and programmes, unfair economic arrangements, and bad politics." This framing explicitly positions health equity as a political and economic challenge, not merely a clinical or behavioral one.

---

## The Social Gradient: Income, Education, and Employment

One of the most replicated findings in epidemiology is the **income gradient in health** — a continuous, stepwise relationship between socioeconomic position and health outcomes that holds across all levels of income, not just at the poverty threshold. Michael Marmot's Whitehall studies of British civil servants demonstrated this gradient with particular clarity: even among employed, non-poor professionals, those in lower-grade positions had worse health outcomes than those in higher-grade positions. The gradient runs from the bottom to the top of the socioeconomic ladder; there is no threshold above which additional income no longer improves health.

The pathways from income to health operate through multiple mechanisms. **Material deprivation** — insufficient income for adequate nutrition, safe housing, or healthcare — directly produces disease. **Psychosocial stress** from chronic economic insecurity activates the hypothalamic-pituitary-adrenal axis, elevating cortisol and inflammatory markers in ways that damage cardiovascular and immune function over decades. **Behavioral pathways** include the observation that chronic stress increases the appeal of short-term relief behaviors (smoking, alcohol use, caloric-dense food consumption) that carry long-term health costs.

**Education** functions as a health determinant through overlapping pathways. Higher educational attainment is associated with greater health literacy — the ability to understand and act on health information. Education confers cognitive resources for navigating complex healthcare systems, evaluating health claims, and engaging in preventive behaviors. More fundamentally, education determines labor market access, which in turn determines income, occupational exposures, and the social capital networks that buffer stress. Research consistently shows that each additional year of schooling is associated with measurable improvements in self-reported health, lower mortality rates, and reduced prevalence of chronic disease.

**Employment** shapes health through income, occupational exposures, and psychosocial mechanisms. Job insecurity, low job control, high demands with low rewards, and lack of autonomy — conditions prevalent in low-wage service work — are independent risk factors for cardiovascular disease. Unemployment itself causes excess mortality beyond what income loss alone would predict, operating through social isolation, loss of daily structure, and diminished sense of purpose.

!!! mascot-thinking "The Gradient, Not Just the Gap"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinking">
    A common misconception is that the income-health relationship only matters at the extreme: that poverty causes bad health but once you clear the poverty line, income no longer matters. The gradient evidence shows the opposite. Investigators often ask: why would a manager's health be worse than a director's, when both have adequate incomes? The answer lies in relative position, control over work, and the biological toll of chronic social stress — not just material deprivation.

---

## Place and Health: Housing, Neighborhoods, Food, and Transportation

Where a person lives is as powerful a determinant of health as who they are. Public health researchers use the concept of **neighborhood effects** to describe the independent influence of the physical and social environment on health outcomes, above and beyond the characteristics of individuals living there. The evidence for neighborhood effects comes from natural experiments, longitudinal cohort studies, and the Moving to Opportunity study discussed below.

**Housing quality and health** links are well-documented across multiple pathways. Physical housing conditions — lead paint exposure in pre-1978 housing, inadequate heating, water intrusion and mold, pest infestation, structural deficiencies — directly generate disease burden, particularly in children. Lead exposure is causally linked to neurodevelopmental deficits with no safe lower threshold; housing is the dominant exposure source for children in affected zip codes. Overcrowding facilitates respiratory pathogen transmission and disrupts sleep, which is itself a determinant of metabolic and cardiovascular health. Housing insecurity — including the threat of eviction and frequent forced moves — is associated with depression, delayed pediatric vaccination, and worse chronic disease management.

**Food security** refers to consistent access to nutritious food sufficient for active, healthy living. Approximately 10–15% of U.S. households experience food insecurity in any given year; rates are substantially higher among Black and Hispanic households, households with children, and households below 130% of the federal poverty level. Food insecurity is not simply a caloric deficit — it is the chronic stress of unpredictable access, the cognitive burden of food rationing, and the diet quality consequences of constrained food environments. Food deserts — areas with limited access to supermarkets offering fresh produce — are geographically concentrated in low-income, minority neighborhoods, the result of decades of grocery store disinvestment and zoning decisions.

**Transportation access** shapes health through its mediation of access to employment, healthcare, and healthy food. In American metro areas with limited transit infrastructure, lack of reliable transportation is a major reported barrier to keeping medical appointments, accessing specialty care, maintaining employment, and accessing pharmacies for chronic disease medications. Transit deserts overlap substantially with low-income and minority neighborhoods, compounding other place-based disadvantages.

#### Table: Social Determinants Domains

| Domain | Key Pathways to Health | Policy Lever Examples | Strength of Evidence |
|---|---|---|---|
| Income & Wealth | Material deprivation, psychosocial stress, behavioral | Earned income tax credit, minimum wage, progressive taxation | Very strong (gradient well-replicated) |
| Education | Health literacy, labor market access, cognitive resources | Universal pre-K, school funding equity, debt relief | Strong |
| Employment | Occupational exposures, income, job control, identity | Workplace safety standards, living wage laws, anti-discrimination | Strong |
| Housing Quality | Lead/mold/pests, overcrowding, insecurity, displacement | Housing codes enforcement, affordable housing investment, eviction protection | Strong |
| Food Security | Diet quality, chronic stress, cognitive load | SNAP, WIC, grocery incentive programs, zoning reform | Strong |
| Transportation | Healthcare access, employment access, social participation | Transit investment, Medicaid transportation benefits | Moderate to strong |
| Neighborhood Safety | Chronic stress, physical activity, trauma | Violence interruption, environmental remediation, policing reform | Moderate |
| Social Support | Stress buffering, health behavior modeling, care access | Community center investment, social prescribing programs | Moderate |

---

## Racial Health Disparities: Evidence and Structural Mechanisms

Racial health disparities in the United States are large, persistent, and well-documented across virtually every health indicator. These disparities are not primarily attributable to biological differences between racial groups — race is a social category, not a biological one — but to the accumulated effects of structural racism operating through multiple pathways over generations.

**Life expectancy** provides a summary measure of population health. In 2021, life expectancy at birth was 74.8 years for white Americans and 70.8 years for Black Americans — a four-year gap that persisted despite narrowing since the 1980s, and that widened sharply during COVID-19. The gap reflects elevated mortality from cardiovascular disease, homicide, maternal mortality, COVID-19, and diabetes, all of which are disproportionately elevated in Black populations.

**Maternal mortality** is among the most stark indicators. Black women die from pregnancy-related causes at approximately 2.6 times the rate of white women. The disparity holds even after controlling for income, education, and access to prenatal care — evidence that social position alone cannot fully explain it. Research implicates the biological weathering hypothesis (the cumulative physiological toll of chronic exposure to racism and discrimination) and provider bias in clinical assessment as contributing mechanisms. Notably, Black women with college degrees have higher maternal mortality rates than white women who did not complete high school.

**Infant mortality** follows a similar pattern: Black infants die in the first year of life at approximately twice the rate of white infants. The disparity in preterm birth rates — a major driver of infant mortality — is not explained by known medical risk factors and persists across income and education levels, again pointing toward the chronic stress of racism as a biological mechanism.

The concept of **weathering**, developed by epidemiologist Arline Geronimus, proposes that the continuous stress of navigating racial discrimination, microaggressions, and structural disadvantage accelerates biological aging — measured through telomere length, allostatic load, and inflammation markers — in Black Americans relative to white Americans of the same chronological age. This biological aging effect explains why health advantages of higher socioeconomic status are weaker for Black Americans than for white Americans: social advancement does not provide the same physiological buffer when discrimination follows across income levels.

**Redlining** — the systematic denial of mortgage insurance and home loans by the Federal Housing Administration to residents of neighborhoods designated as high-risk on the basis of racial composition — operated from the 1930s through the Fair Housing Act of 1968 and produced lasting geographic segregation of wealth and poverty. Contemporary analyses using digitized Home Owners' Loan Corporation maps find that formerly redlined neighborhoods have significantly higher rates of asthma hospitalizations, cardiovascular disease, obesity, preterm birth, COVID-19 mortality, and urban heat island exposure compared to formerly "greenlined" neighborhoods in the same cities. Redlining's health legacy is, in part, the legacy of four decades of systematic disinvestment in Black urban neighborhoods during the post-WWII period of peak American wealth accumulation.

**Criminal justice system exposure** generates health impacts through multiple mechanisms. Incarceration concentrates individuals in environments with poor nutrition, limited physical activity, high violence exposure, and inadequate healthcare. Post-release, formerly incarcerated individuals face barriers to employment, housing, and public benefits that compound poverty and social isolation. Mass incarceration's geographic concentration — the majority of incarcerated individuals come from a small number of high-poverty, predominantly Black and Latino urban neighborhoods — strips these communities of working-age adults, destabilizes families, and reduces the social cohesion that buffers population health.

#### Diagram: Life Expectancy and Infant Mortality by Race and Income

<iframe src="../../sims/health-disparities-bar-chart/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Health Disparities Interactive Chart Specification</summary>
Type: microsim
**sim-id:** health-disparities-bar-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Grouped bar chart with two panels side-by-side. Panel 1 (Life Expectancy): grouped bars showing life expectancy at birth for white, Black, Hispanic, and Asian Americans for years 2010, 2015, 2019, and 2021, with COVID dip visible. Panel 2 (Infant Mortality): grouped bars for white and Black Americans 2000–2021, showing the persistent 2:1 ratio. Both panels have a dropdown to switch between "By Race" and "By Income Quartile" views. Tooltip shows exact values on hover. Color palette is accessible (colorblind-safe). Data sourced from CDC WONDER and NCHS. Chart title, axis labels, source attribution all rendered. Legend displayed below each chart.
</details>

!!! mascot-warning "Race Is Not Biology"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage warning">
    A persistent error in health disparities research is treating racial categories as biological rather than social. When a study reports that Black patients have worse outcomes than white patients, the explanation is not genetic — it is structural. Race is a social construct that shapes exposure to discrimination, neighborhood conditions, wealth accumulation, and healthcare quality. When you see racial disparities in data, the correct analytical question is: what social mechanisms produced this difference?

---

## Historical Trauma and Intergenerational Health Effects

**Historical trauma** refers to the cumulative emotional and psychological wounding across generations that results from catastrophic group experiences — including slavery, colonialism, forced relocation, and genocide. The concept was developed by Maria Yellow Horse Brave Heart in the context of Indigenous communities and has since been applied to the descendants of enslaved Africans, Holocaust survivors, and other groups subjected to mass atrocity.

The mechanisms through which historical trauma transmits health consequences across generations are multiple. **Epigenetic transmission** — heritable changes in gene expression that do not involve changes to DNA sequence, but that can be induced by severe stress and passed to offspring — represents one pathway under active research. Studies of Holocaust survivor descendants and children born during the Dutch Hunger Winter of 1944-45 find measurable physiological differences consistent with epigenetic transmission of stress responses. **Socialized trauma responses** — patterns of hypervigilance, distrust of institutions (including healthcare providers), and disrupted family structures that originate in historical victimization and are transmitted through child-rearing practices — represent behavioral pathways. **Material dispossession** — the direct economic consequences of enslavement, land theft, and exclusion from wealth-building programs — operates through the income and wealth gradient pathways described earlier.

**Intergenerational poverty** is the empirical pattern by which economic disadvantage persists across generations within families. The probability that a child born into the lowest income quintile will remain in the lowest quintile as an adult is approximately 40% in the United States — far higher than in peer nations with greater investment in early childhood programs, educational equity, and social protection. Intergenerational poverty concentrates health disadvantage not simply through income effects in each generation, but through the accumulation of developmental adversity — adverse childhood experiences, inadequate nutrition, environmental toxin exposure, trauma — that compound over the lifecourse and transmit through both biological and social pathways.

The **Long COVID equity burden** illustrates how historical disadvantages compound in novel disease contexts. Long COVID — persistent symptoms following acute SARS-CoV-2 infection — disproportionately affects lower-income, Black, Hispanic, and disabled Americans, reflecting both higher rates of initial COVID-19 infection (driven by occupational exposures, housing density, and transit dependence) and lower access to post-acute care. The occupational distribution of essential work, the housing density of low-income neighborhoods, and the absence of paid sick leave for service workers are all SDOH features that mediated COVID-19 disparities from the beginning of the pandemic.

---

## Intersectionality: Compounding Disadvantage

**Intersectionality** is an analytical framework, first developed by legal scholar Kimberlé Crenshaw in 1989, for understanding how multiple social identities — race, gender, class, disability status, sexual orientation, immigration status — interact to produce specific forms of disadvantage and privilege that cannot be understood by examining any one identity in isolation. In public health, intersectionality challenges the common practice of examining racial health disparities or gender health disparities as if these categories were independent.

The practical implication is that the health experience of a Black woman cannot be predicted by averaging the health experiences of white women (who share gender) and Black men (who share race). At each intersection, specific mechanisms of structural disadvantage operate that are distinct from those operating on any single-identity group. A Black woman experiencing maternal mortality, for example, faces both race-based clinical bias (her pain reports being discounted relative to white patients) and gender-based dismissal of reproductive health concerns that white women also face, but with compounding severity.

Intersectionality also has policy implications: interventions designed for a homogeneous population often fail those at multiply-disadvantaged intersections. A workplace wellness program designed for a "typical" worker may be inaccessible to workers with disabilities, those working multiple part-time jobs, or those with caregiving responsibilities — who are disproportionately women of color. **Structural competency** — the clinical and public health capacity to recognize how social structures produce the conditions presenting in clinical encounters — requires an intersectional lens that moves beyond individual-level cultural competence training.

!!! mascot-thinking "Not All at Once, But All Together"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage thinking">
    Intersectionality is sometimes misunderstood as simply "adding up" disadvantages. The framework is more sophisticated: it says that the *combination* of identities creates distinct social positions with their own specific mechanisms of disadvantage. A useful thought experiment: would a universal race-blind, gender-blind policy address the specific barriers facing, say, undocumented Latina farmworkers? The intersectional answer is that you cannot get there from universal alone.

---

## Place-Based and Upstream Interventions

Understanding SDOH is only useful if it produces actionable strategies. Public health distinguishes **upstream** interventions (addressing root causes — income inequality, housing policy, educational equity) from **midstream** interventions (addressing intermediate risk factors — stress, smoking, diet) from **downstream** interventions (treating disease after it occurs). The dominant historical investment in healthcare systems is downstream; the strongest evidence for cost-effective population health improvement points upstream.

The river metaphor — attributed to John McKinlay's 1979 essay — describes a doctor so busy pulling drowning people from a river that they never walk upstream to see who is pushing them in. **Root cause analysis in public health** applies this logic systematically: when a community experiences elevated asthma rates, the clinical response treats individual patients; the public health response asks why the community has elevated rates; the upstream response asks why housing in that neighborhood has elevated mold and pest burdens, who benefits from lax enforcement, and what policy changes would address the source.

The **Moving to Opportunity (MTO) study** provides one of the strongest natural experiments on place-based effects. MTO randomly assigned residents of high-poverty public housing in five cities to receive housing vouchers that could be used only in low-poverty neighborhoods, regular vouchers without geographic restriction, or to stay in public housing. Long-term follow-up studies found that children who moved to lower-poverty neighborhoods before age 13 had substantially higher adult earnings, higher rates of college attendance, and lower rates of single parenthood than control-group children. Adult movers experienced improved mental health and reduced rates of diabetes and extreme obesity, though effects on physical health were more modest. MTO is frequently cited as proof-of-concept that neighborhood conditions causally affect life outcomes.

**Community Development Finance Institutions (CDFIs)** are federally certified financial institutions that provide capital for economic development in underserved communities. CDFIs fund affordable housing construction, small business development, community health centers, and grocery store development in food deserts. While CDFIs operate primarily as financial tools, their health relevance lies in addressing the material infrastructure of health — affordable housing, employment, and food access — in communities where conventional finance has disinvested.

**Health in All Policies (HiAP)** is a collaborative governance approach that systematically incorporates health considerations into decision-making across non-health sectors — transportation, housing, education, agriculture, criminal justice, and economic development. HiAP is institutionalized in Finland, the European Union, and in some U.S. states and cities. A HiAP lens applied to a transportation planning decision would evaluate not just mobility outcomes but also air quality impacts, walkability, transit access for low-income residents, and pedestrian safety in low-income neighborhoods.

**Healthy People 2030** organizes U.S. federal health objectives into five overarching goals and 355 measurable objectives, with a dedicated focus area on social determinants organized around five domains: education access and quality; healthcare access and quality; neighborhood and built environment; economic stability; and social and community context. The inclusion of SDOH objectives alongside clinical disease objectives marks a policy evolution: the federal government now formally treats housing, income, and education as health issues.

#### MicroSim: Upstream vs. Downstream Intervention Visualizer

<iframe src="../../sims/upstream-downstream-river/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Upstream-Downstream River MicroSim Specification</summary>
Type: microsim
**sim-id:** upstream-downstream-river<br/>
**Library:** p5.js<br/>
**Status:** Specified

Animated river flowing from top-left to bottom-right. People (small circles) flow downstream and some fall into the water ("become ill"). Three clickable intervention levers are positioned along the river: (1) Upstream: "Housing Policy" lever — when activated, reduces the number of people entering the water; (2) Midstream: "Smoking Cessation" lever — when activated, some people in the water are redirected to shore; (3) Downstream: "Hospital" icon — shows a counter of people being treated. A running counter in the upper right shows: People ill, People treated, Health burden remaining. A sidebar shows cost per QALY for each lever type (upstream lowest, downstream highest) based on published estimates. Reset button restores default state. Instruction text: "Click levers to activate interventions. Compare effectiveness and cost."
</details>

#### Timeline: Redlining to Present — Key Events and Health Consequences

<iframe src="../../sims/redlining-health-timeline/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Redlining Health Timeline Specification</summary>
Type: microsim
**sim-id:** redlining-health-timeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Horizontal scrollable timeline from 1933 to 2025. Key events are represented as clickable nodes above the timeline axis (policy events) or below (health outcome documentation). Above-axis nodes include: 1933 HOLC established; 1934 FHA redlining maps begin; 1944 GI Bill housing loans (racially restricted); 1968 Fair Housing Act; 1977 Community Reinvestment Act; 1980s subprime lending targeting minority neighborhoods; 2008 foreclosure crisis; 2020 HUD equity rule suspended. Below-axis nodes include: 1975 first studies on residential segregation and health; 2003 Geronimus weathering hypothesis; 2020 Nelson et al. HOLC-asthma mapping study; 2023 heat island analysis. Clicking any node opens a text panel with a 3-sentence summary and a relevant statistic. Color coding: red for discriminatory policy, green for reform, orange for health research finding.
</details>

The broader principle unifying these interventions is captured by the **Health in All Policies** framework: health is produced not primarily by the healthcare system but by the total social environment, and improving health equity requires engaging sectors — housing, education, criminal justice, economic development — that have historically been outside the purview of public health agencies. The shift from a purely clinical to a structural framing does not eliminate clinical medicine's importance; it situates it appropriately within a larger system of causes.

---

!!! mascot-celebration "Equity Is the Work"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrating">
    You have covered thirty concepts in this chapter — from the definition of health equity to the mechanisms of redlining's health legacy to the evidence from Moving to Opportunity. The through-line is that health outcomes are not the product of individual choices made in a vacuum, but of the social structures that shape the options available to each person. Investigators who understand this are equipped to ask better questions, design more effective interventions, and advocate for the upstream changes that produce durable population health improvement. What does the evidence show? It shows that equity is not a slogan — it is a measurable, achievable goal with specific policy levers attached.
