---
title: "Data Science Advanced: Spatial Analysis and Machine Learning"
description: GIS and spatial epidemiology, disease mapping and dashboards, time-series analysis, supervised and unsupervised machine learning for public health, NLP surveillance, wastewater epidemiology, and social media data mining.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Data Science Advanced: Spatial Analysis and Machine Learning

## Summary

Advanced computational methods are reshaping disease surveillance, risk prediction, and intervention targeting. This chapter covers geographic information systems and spatial epidemiology methods from choropleth maps to spatial clustering, disease mapping and interactive dashboards, time-series analysis including interrupted time series for policy evaluation, supervised machine learning for disease risk prediction (random forests, gradient boosting), unsupervised clustering for population segmentation, natural language processing for infoveillance, and novel data sources including wastewater epidemiology and social media mining.

This chapter builds on concepts from:

- [Chapter 3: Epidemiology: Study Design and Causal Inference](../03-epidemiology-study-design/index.md)
- [Chapter 12: Public Health Communication](../12-public-health-communication/index.md)
- [Chapter 16: Data Science for Public Health: Foundations](../16-data-science-foundations/index.md)

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. GIS Spatial Analysis
2. Choropleth Map Design
3. Kernel Density Estimation
4. Spatial Autocorrelation
5. Moran's I Statistic
6. SaTScan Cluster Detection
7. QGIS for Public Health
8. R Leaflet Mapping
9. R Shiny Dashboards
10. Time-Series Analysis PH
11. Machine Learning Basics
12. Supervised Learning
13. Random Forest Model
14. Gradient Boosting Model
15. Cross-Validation Methods
16. AUC ROC Performance
17. Unsupervised Learning
18. K-Means Clustering
19. NLP for Surveillance
20. Sentiment Analysis PH
21. Wastewater Epidemiology
22. Social Media Data Mining

---

!!! mascot-welcome "Where Data Meets Geography — and the Future"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Disease does not distribute randomly across space, time, or communities. The methods in this chapter — spatial analysis, machine learning, natural language processing, wastewater surveillance — are how public health moves from describing that pattern to predicting and disrupting it. Let's look at the data together.

---

## GIS and Spatial Epidemiology: From Maps to Clusters

### Why Place Is a Public Health Variable

Geography is not just a backdrop for public health data — it is a determinant of health in its own right. Proximity to industrial pollution, food deserts, green space, and healthcare facilities all shape health outcomes in ways that demographic characteristics alone cannot capture. **GIS (Geographic Information Systems) spatial analysis** provides the methods to quantify these relationships: mapping disease distributions, testing for geographic clustering, identifying environmental exposures, and locating intervention resources relative to high-burden populations.

A **choropleth map** displays a geographic area divided into units (states, counties, census tracts, ZIP codes) with each unit shaded according to the value of a variable — typically a rate, proportion, or index. Choropleth maps are the most common form of public health cartography, but they carry design choices that profoundly affect the message a viewer receives. The two most consequential decisions are the choice of geographic unit and the choice of color scale classification (equal intervals vs. quantile breaks vs. natural breaks). Equal-interval classification spreads the color ramp evenly across the data range, which can make moderate geographic variation look dramatic. Quantile classification assigns equal numbers of geographic units to each color class, which can overstate differences in the tails while flattening central variation.

**Kernel Density Estimation (KDE)** produces a smooth continuous surface from point-event data (e.g., individual case locations, overdose calls, gunshot wounds) by placing a kernel function over each point and summing the contributions across space. KDE converts a point pattern into a density map — the height of the surface at any location estimates the local rate of events. KDE maps avoid the boundary artifacts of choropleth maps but are sensitive to the bandwidth parameter: a narrow bandwidth highlights fine-scale clustering; a wide bandwidth reveals regional gradients.

### Spatial Autocorrelation and Moran's I

A fundamental assumption of classical statistics is that observations are independent. In geographic data, this assumption almost always fails: nearby areas tend to have similar disease rates because they share environmental exposures, demographic composition, economic conditions, and healthcare access. This tendency for nearby values to be more similar than distant values is called **spatial autocorrelation**.

**Moran's I** is the most widely used statistic for global spatial autocorrelation. It compares the values at each location to the average value of its spatial neighbors (as defined by an adjacency or distance-based spatial weights matrix), and summarizes the degree of clustering across the entire study area:

\[
I = \frac{n}{\sum_i \sum_j w_{ij}} \cdot \frac{\sum_i \sum_j w_{ij}(x_i - \bar{x})(x_j - \bar{x})}{\sum_i (x_i - \bar{x})^2}
\]

where \( n \) is the number of areas, \( w_{ij} \) is the spatial weight between areas \( i \) and \( j \), and \( x_i \) is the value (e.g., disease rate) at area \( i \). Moran's I ranges from approximately -1 (perfect spatial dispersion) through 0 (spatial randomness) to +1 (perfect spatial clustering). Statistical significance is assessed by permutation test: the observed \( I \) is compared to the distribution of \( I \) values under random spatial arrangements.

**Local Moran's I** (LISA — Local Indicators of Spatial Association) decomposes the global statistic to identify specific locations that contribute to global clustering or that represent outliers. LISA maps reveal four types of spatial patterns: High-High clusters (a high-rate area surrounded by high-rate neighbors), Low-Low clusters, and spatial outliers (High-Low or Low-High — a high-rate area surrounded by low-rate neighbors, potentially indicating a local anomaly or data error).

#### MicroSim: Moran's I Spatial Autocorrelation Visualizer

<iframe src="../../sims/morans-i-visualizer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Moran's I Spatial Autocorrelation Visualizer — MicroSim Specification</summary>
Type: microsim
**sim-id:** morans-i-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Display a 10×10 grid of counties, each colored by a simulated disease rate (five-color sequential scale, light yellow to dark red). Three sliders control the simulation:

1. **Clustering Strength** (0 to 1): At 0, rates are random (Moran's I ≈ 0). At 1, a spatial smoothing algorithm creates strong regional clusters.
2. **Spatial Dispersion** (-1 to 0): Creates a checkerboard-like alternating pattern (negative spatial autocorrelation).
3. **Outlier Injection** (0 to 5): Introduces N high-rate cells surrounded by low-rate neighbors (spatial outliers).

A real-time Moran's I value (computed from the queen-contiguity spatial weights matrix) updates in a large display panel to the right of the grid as sliders change. Below the Moran's I value, display:
- Interpretation text (clustered / random / dispersed)
- A small Moran's I scatter plot (spatial lag on y-axis, value on x-axis, with the four quadrant labels: HH, HL, LL, LH)

Clicking any cell highlights it and its queen-contiguous neighbors with orange borders, displaying the local contribution to Moran's I in a tooltip.
</details>

### SaTScan and Cluster Detection

**SaTScan** is a specialized software tool developed by Martin Kulldorff for detecting space-time clusters of disease using a spatial scan statistic. The algorithm places a cylindrical scanning window (spatial radius × time period) over the study area and moves it systematically, computing the likelihood ratio comparing the rate inside the window to the rate outside. The window size and position with the maximum likelihood ratio is reported as the most likely cluster, with significance assessed by Monte Carlo simulation. SaTScan is used by CDC, state health departments, and local epidemiologists for outbreak detection, cancer cluster investigation, and syndromic surveillance.

### GIS Software: QGIS, Leaflet, and Python

**QGIS** is a free, open-source desktop GIS application that provides a full suite of spatial analysis tools — projection management, spatial joins, geoprocessing, raster analysis, and cartographic output — without a software license cost. QGIS is widely used in local and state health departments that cannot afford ArcGIS.

**R Leaflet** is an R package wrapping the Leaflet.js mapping library, enabling the production of interactive, zoomable web maps from R code. Leaflet maps are HTML objects that can be embedded in R Markdown documents, R Shiny applications, or standalone web pages. In Python, the `folium` package provides equivalent functionality. These tools have displaced static cartography for most surveillance communication purposes because stakeholders can explore data at multiple geographic scales.

**R Shiny Dashboards** — and their Python equivalents (Dash, Streamlit, Panel) — allow analysts to wrap an analysis in a reactive web application, so non-technical users can change parameters (time period, geography, disease) and see updated visualizations without writing code. During COVID-19, Shiny and Dash dashboards became the primary medium through which state and local health departments communicated case counts, vaccination rates, and hospital capacity to the public and decision-makers.

#### Diagram: Spatial Analysis Workflow

<iframe src="../../sims/spatial-analysis-workflow/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Spatial Analysis Workflow — Interactive Diagram Specification</summary>
Type: microsim
**sim-id:** spatial-analysis-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a horizontal pipeline diagram with five clickable stages arranged left to right, connected by arrows:

1. **Data Acquisition** (blue) — Point data (cases, addresses) + Boundary files (shapefiles, GeoJSON) + Rate denominators (Census ACS)
2. **Preprocessing** (blue) — Geocoding addresses → coordinates; Spatial join cases to census tracts; Compute age-standardized rates
3. **Exploratory Mapping** (green) — Choropleth map (choropleth); KDE surface (heat map); Dot density map
4. **Cluster Detection** (orange) — Moran's I (global autocorrelation); LISA map (local clusters); SaTScan (space-time scan)
5. **Communication** (red) — Static map (publication); Leaflet/Folium web map (interactive); Shiny/Dash dashboard (stakeholder)

Each stage box is clickable and expands a panel below the pipeline showing:
- The key tools used at that stage (Python: geopandas, pysal, folium; R: sf, spdep, leaflet)
- A 3-4 sentence description of what happens at this stage
- A "common mistake" warning (e.g., at Preprocessing: "Forgetting to reproject to a common CRS before spatial join produces silently wrong results" — a classic footgun)

Color scheme: blue = data operations, green = visualization, orange = statistics, red = output.
</details>

---

## Time-Series Analysis and Interrupted Time Series

### Decomposing Temporal Patterns in Health Data

**Time-series analysis in public health** encompasses methods for describing temporal patterns in health events, forecasting future counts, and evaluating the effects of interventions or policy changes on health outcomes. Public health time series — weekly influenza-like illness rates, monthly opioid overdose deaths, annual teen birth rates — typically contain several superimposed components:

- **Trend**: a long-term directional change (declining smoking rates, rising obesity prevalence)
- **Seasonality**: regular, repeating fluctuations tied to calendar periods (respiratory illness peaking in winter)
- **Cyclicity**: longer irregular cycles (influenza pandemic waves)
- **Noise/residuals**: irregular variation after removing trend, seasonality, and cycles

Classical decomposition separates these components using moving averages (trend extraction) and ratio-to-moving-average methods (seasonal indices). More flexible approaches include STL (Seasonal and Trend decomposition using LOESS) in Python's `statsmodels` and R's `stats` package, and Facebook's Prophet library (available in both Python and R) which handles multiple seasonality periods and holiday effects.

### Interrupted Time Series for Policy Evaluation

**Interrupted time series (ITS)** is the quasi-experimental design of choice when a policy intervention applies to an entire population at a known point in time — and no comparable control population exists to serve as a parallel control group. Examples include analyzing the effect of a state's naloxone access law on opioid overdose mortality, or evaluating whether a "sugar tax" reduced sugar-sweetened beverage sales.

The ITS model specifies a segmented regression:

\[
Y_t = \beta_0 + \beta_1 \cdot t + \beta_2 \cdot D_t + \beta_3 \cdot (t - T_0) \cdot D_t + \epsilon_t
\]

where \( Y_t \) is the outcome at time \( t \), \( D_t \) is an indicator for the post-intervention period (0 before, 1 after), and \( T_0 \) is the intervention time point. The coefficients have direct substantive interpretations: \( \beta_1 \) is the pre-intervention trend, \( \beta_2 \) is the immediate level change at the intervention point, and \( \beta_3 \) is the change in trend following the intervention. Confidence intervals account for autocorrelation in the error terms using Newey-West or ARIMA-based approaches.

!!! mascot-thinking "Counterfactual Thinking in Time Series"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage looks thoughtful">
    The fundamental question in interrupted time series is: "What would have happened if the intervention had not occurred?" The counterfactual is the extrapolated pre-intervention trend line. The observed post-intervention series is compared to this counterfactual. This is the same causal reasoning as in Chapter 3's discussion of causal inference — the difference is that ITS makes the counterfactual explicit in the regression model rather than relying on a concurrent control group.

---

## Machine Learning for Risk Prediction

### Machine Learning Basics for Public Health

**Machine learning** refers to algorithms that learn predictive relationships from data rather than from explicit programmed rules. In public health, machine learning applications fall into two broad categories: **supervised learning** (where a labeled outcome is available and the goal is prediction) and **unsupervised learning** (where no outcome label is available and the goal is pattern discovery).

The machine learning workflow in public health follows a consistent pattern: define the prediction problem and outcome; assemble a feature matrix from available data sources; split the data into training and test sets (or use cross-validation); train candidate models; evaluate performance on held-out data using appropriate metrics; and deploy the model with monitoring for performance drift over time.

### Supervised Learning: Random Forests and Gradient Boosting

**Random forest** models are an ensemble method that trains many decision trees on bootstrap samples of the training data, with each tree using a random subset of features at each split. Predictions are made by majority vote (classification) or averaging (regression) across all trees. Random forests have several properties that make them well-suited to public health data: they handle mixed data types (continuous, categorical, ordinal), are robust to outliers, handle missing data through surrogate splits, provide variable importance measures (identifying which features most drive prediction), and resist overfitting through the averaging of diverse trees.

A decision tree splits the feature space by finding thresholds that best separate outcome classes. For disease risk prediction, a tree might first split on age (≥65 vs. <65), then on smoking status, then on BMI — producing a set of leaf nodes, each with an estimated disease probability. In a random forest, hundreds of such trees vote together, and the ensemble prediction is far more stable and accurate than any single tree.

**Gradient boosting** (implemented in Python as XGBoost, LightGBM, or scikit-learn's `GradientBoostingClassifier`) builds an ensemble sequentially: each new tree is trained to correct the residual errors of all previous trees. Gradient boosting typically achieves higher accuracy than random forests on structured tabular data — the format most public health data takes — and has won numerous machine learning competitions on healthcare prediction tasks. The trade-off is higher computational cost and more hyperparameters to tune.

### Evaluating Classifier Performance: Cross-Validation and AUC-ROC

**Cross-validation** is the standard method for estimating how well a model will generalize to new data, without having to withhold a large test set. In k-fold cross-validation, the training data is divided into k equal-sized folds. The model is trained on k-1 folds and evaluated on the remaining fold, repeating k times so each fold serves as the evaluation set once. The average performance across folds estimates out-of-sample performance. For public health data with temporal structure (time series, cohort data), time-series cross-validation (training only on past data, predicting future observations) preserves the temporal direction and prevents data leakage.

**AUC-ROC** (Area Under the Receiver Operating Characteristic Curve) is the most widely used performance metric for binary classifiers in public health. The ROC curve plots the true positive rate (sensitivity) against the false positive rate (1-specificity) as the classification threshold varies from 0 to 1. The AUC summarizes this curve as a single number: 0.5 corresponds to random prediction; 1.0 to perfect prediction; values above 0.7 are generally considered acceptable for screening applications.

The choice of threshold — and therefore the balance between sensitivity and specificity — is a policy decision, not a statistical one. In newborn screening, maximizing sensitivity (catching all cases) is paramount, even at the cost of false positives that trigger follow-up testing. In an intervention program with limited slots and high intervention cost, maximizing positive predictive value may be more appropriate.

#### Table: Machine Learning Methods for Public Health

| Method | Type | Output | Public Health Use Case | Key Hyperparameter | Key Limitation |
|--------|------|--------|------------------------|-------------------|----------------|
| Logistic Regression | Supervised | Probability (0–1) | Baseline risk score, odds ratio estimation | Regularization strength (C) | Assumes linear decision boundary; poor with complex interactions |
| Random Forest | Supervised | Probability + variable importance | Disease risk prediction, readmission prediction | Number of trees, max depth, features per split | Black-box; requires large training set; biased toward high-cardinality features |
| Gradient Boosting (XGBoost) | Supervised | Probability + SHAP values | Mortality prediction, sepsis screening | Learning rate, max depth, subsampling | Risk of overfitting; many hyperparameters; computationally intensive |
| Support Vector Machine | Supervised | Binary classification | High-dimensional genomics, small sample sizes | Kernel type, C, gamma | Does not output calibrated probabilities; slow on large datasets |
| K-Means Clustering | Unsupervised | Cluster assignment | Patient segmentation, geographic burden grouping | Number of clusters (K) | Assumes spherical clusters; sensitive to initialization and outliers |
| DBSCAN | Unsupervised | Cluster assignment + noise labels | Outbreak spatial clustering, geographic anomaly detection | Epsilon (radius), min points | Struggles with varying density clusters; sensitive to epsilon |
| Principal Component Analysis | Unsupervised | Component scores | Survey data dimensionality reduction, SES index construction | Number of components | Assumes linearity; components may lack interpretable meaning |
| LSTM Neural Network | Supervised (sequence) | Forecast values | Influenza forecasting, opioid overdose trend prediction | Hidden units, layers, dropout | Requires large time series; difficult to interpret |

#### MicroSim: Random Forest Decision Tree Visualizer

<iframe src="../../sims/random-forest-visualizer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Random Forest Decision Tree Visualizer — MicroSim Specification</summary>
Type: microsim
**sim-id:** random-forest-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Display a panel with two sections side by side:

Left section — **Individual Tree View**: Show a single decision tree for disease risk prediction (3 levels deep, branching binary at each node). Node labels show the split condition (e.g., "Age ≥ 65?", "Smoker?", "BMI ≥ 30?"). Leaf nodes show predicted probability (red = high risk, green = low risk) and class label.

Right section — **Forest Vote Display**: Show a 5×4 grid of 20 miniature tree icons. Each tree icon is colored by its prediction for the current patient profile (red = high risk, green = low risk). A vote tally bar at the bottom shows "14 trees say HIGH RISK / 6 trees say LOW RISK → Forest prediction: HIGH RISK (70%)".

Controls at the top (sliders/dropdowns for a hypothetical patient profile):
- Age (30–80)
- Smoking status (never / former / current)
- BMI (18–45)
- Hypertension (yes/no)
- Physical activity (active/sedentary)

As the user adjusts controls, the individual tree traversal animates (highlight the active branch at each split), the leaf node lights up with a probability, and the forest vote grid updates all 20 tree icons. The AUC-ROC curve (pre-computed for the synthetic model) updates to show where this threshold sits on the curve.

A "Show Another Tree" button cycles through different tree structures to illustrate how individual trees vary while the forest average is stable.
</details>

---

## Unsupervised Learning for Population Segmentation

### K-Means Clustering for Public Health

**Unsupervised learning** finds structure in data without predefined outcome labels. In public health, the primary application is population segmentation — grouping individuals, geographic areas, or health facilities into clusters that share similar profiles, so that interventions can be tailored to each cluster's specific needs rather than applied uniformly.

**K-means clustering** partitions a dataset into K groups by iteratively assigning each observation to the nearest cluster centroid (defined by Euclidean distance in feature space) and then recomputing centroids as the mean of assigned observations. The algorithm terminates when assignments stop changing. K-means requires choosing K in advance; the elbow method (plotting within-cluster sum of squares against K and looking for the inflection point) and the silhouette score (measuring how similar each observation is to its own cluster versus neighboring clusters) help guide this choice.

A worked public health example: segmenting US counties into groups based on chronic disease burden profiles (diabetes prevalence, obesity prevalence, physical inactivity, smoking rate, food insecurity index, primary care physician density). K-means with K=5 might identify: (1) urban high-income counties with low burden across all indicators; (2) suburban counties with high obesity but moderate other factors; (3) rural Southern counties with very high burden across all indicators; (4) rural Midwestern counties with high smoking but lower obesity; (5) inner-city counties with high poverty and burden but also higher healthcare access than rural clusters. Each cluster calls for a different intervention mix.

---

## NLP and Social Media for Public Health Surveillance

### Natural Language Processing for Infoveillance

**Natural Language Processing (NLP)** applies computational methods to text data, enabling automated extraction of health-relevant signals from unstructured sources that cannot be analyzed using conventional tabular methods. The application of NLP to public health surveillance — scanning news feeds, clinical notes, social media, and search queries for disease signals — is called **infoveillance**.

HealthMap, developed at Boston Children's Hospital, uses NLP to scan news reports, ProMED posts, and official health agency communications in multiple languages, extract disease and location entities, and plot emerging outbreaks on a world map — often providing earlier warning than official surveillance systems. During the 2013-2016 Ebola outbreak, HealthMap detected early signals from local news reports nine days before the WHO was notified.

The NLP pipeline for public health surveillance typically involves: text collection (web scraping, API access), preprocessing (tokenization, stop-word removal, lemmatization), named entity recognition (identifying disease names, geographic locations, population references), and classification (is this report describing a genuine outbreak, a historical reference, or a fictional account?). Modern implementations use transformer-based language models (BERT, RoBERTa, BioBERT) fine-tuned on health-domain corpora.

**Sentiment analysis in public health** quantifies the emotional valence of text — positive, negative, or neutral — toward specific health topics: vaccine hesitancy on Twitter, public mood during lockdowns, trust in public health institutions after a communication failure. Sentiment scores derived from social media data have been used to predict vaccine uptake, identify communities where health messaging is failing, and monitor the spread of health misinformation.

!!! mascot-warning "Social Media Data Is Not a Population Survey"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage holds up a warning sign">
    Social media users are not representative of the general population — they are younger, more educated, more urban, and disproportionately from high-income countries with smartphone access. Sentiment signals from Twitter or Reddit reflect the views of a self-selected, platform-active subpopulation. Always characterize the data source's representativeness explicitly when reporting social media-derived public health findings. Presenting social media sentiment as population-level opinion is a common and consequential error.

---

## Novel Data Sources: Wastewater Epidemiology

### The Logic of Environmental Surveillance

**Wastewater epidemiology** — also called wastewater-based epidemiology (WBE) — detects disease markers in untreated sewage to estimate community-level pathogen prevalence. The method exploits a simple biological fact: humans shed pathogens and their byproducts (viral RNA, bacterial cells, drug metabolites) in feces and urine before, during, and after symptomatic illness. A sewage sample collected at a treatment plant integrates the biological signals of the entire contributing population — typically tens of thousands to millions of people — in a single measurement.

The COVID-19 pandemic transformed wastewater surveillance from a niche research method to a central public health tool. The National Wastewater Surveillance System (NWSS), launched by CDC in September 2020, grew to include hundreds of sampling sites across all 50 states. Studies consistently showed that SARS-CoV-2 RNA concentrations in wastewater predicted reported case increases by 4–7 days, providing an early warning signal unaffected by testing access, health-seeking behavior, or clinical case definitions.

The wastewater epidemiology pipeline involves several technical stages with distinct quantitative challenges:

1. **Sample collection**: 24-hour composite samples from wastewater treatment plant influent, or grab samples from upstream manholes for neighborhood-level resolution
2. **Concentration and RNA extraction**: ultrafiltration, ultracentrifugation, or direct capture methods to concentrate the analyte from large water volumes
3. **Quantification**: RT-qPCR (quantitative PCR) or digital PCR to measure copies per liter; sequencing for variant tracking
4. **Normalization**: adjusting for population contribution, flow rate, and fecal indicator (PMMoV — Pepper Mild Mottle Virus — is a fecal normalization biomarker)
5. **Trend analysis**: time-series modeling to estimate the community prevalence trajectory from wastewater concentrations

Beyond SARS-CoV-2, active WBE programs now track influenza, RSV, norovirus, monkeypox, polio, antimicrobial resistance genes, and illicit drug consumption.

#### Diagram: Wastewater Epidemiology Pipeline

<iframe src="../../sims/wastewater-epi-pipeline/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Wastewater Epidemiology Pipeline — Interactive Diagram Specification</summary>
Type: microsim
**sim-id:** wastewater-epi-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw a vertical or horizontal pipeline showing the flow from sewage collection to disease trend reporting. Seven clickable stages, connected by animated flow lines (blue for liquid/sample flow, green for data flow):

1. **Community Shedding** (gray) — animated icons of a neighborhood; text: "People shed viral RNA in feces 1-7 days before symptoms"
2. **Sewage Collection** (blue) — illustration of a manhole and treatment plant influent pipe; text: "24-hour composite samples; upstream manholes for neighborhood resolution"
3. **Lab Processing** (orange) — centrifuge/filter icon; text: "Concentration, RNA extraction, RT-qPCR quantification (copies/liter)"
4. **Normalization** (orange) — formula display: "Normalized signal = (N gene copies/L) / (PMMoV copies/L)"; text: "Corrects for population variation and dilution"
5. **Trend Modeling** (green) — mini time-series chart icon; text: "7-day moving average; exponential smoothing; anomaly detection"
6. **Lead Indicator Comparison** (green) — split panel showing wastewater signal leading clinical cases by ~5 days
7. **Public Health Action** (red) — dashboard icon; text: "NWSS dashboard; surge preparation; outbreak investigation trigger"

Clicking each stage opens a detailed sidebar panel explaining:
- Technical methods used at that stage
- Key quality control considerations
- Limitations and sources of uncertainty
- Notable COVID-19 examples

Include a small interactive toggle at the bottom: "Show pathogen panel" lists 6 other pathogens (influenza, polio, mpox, RSV, opioids, AMR genes) with a one-sentence description of each WBE application.
</details>

---

!!! mascot-celebration "From Pixels to Pipelines: The Full Computational Toolkit"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrates">
    You have now moved through the full arc of computational public health — from mapping a disease rate on a choropleth to detecting spatial clusters with Moran's I, from predicting individual risk with random forests to tracking population-level trends in a sewage pipe. These are the methods that define surveillance, intervention targeting, and policy evaluation in the 21st century. The next chapter turns to building the interactive visualizations that make this analysis comprehensible and actionable for public health practitioners and the public.

---

## Summary

This chapter extended public health data science into advanced analytical methods:

- **Spatial epidemiology** quantifies geographic patterns through choropleth mapping, KDE surfaces, and spatial autocorrelation statistics. Moran's I and LISA maps identify where disease clusters are concentrated. SaTScan detects space-time clusters using a scan statistic.
- **GIS tools** include QGIS for desktop analysis and geopandas/folium (Python) and sf/leaflet (R) for scripted spatial analysis and interactive web maps. Shiny and Dash dashboards wrap analyses in reactive interfaces for non-technical stakeholders.
- **Interrupted time series** is the premier quasi-experimental method for population-level policy evaluation, estimating the level change and trend change at a known intervention point.
- **Random forests** and **gradient boosting** are the standard supervised learning methods for disease risk prediction on tabular public health data. Cross-validation and AUC-ROC measure generalizability and discrimination.
- **K-means clustering** segments populations or geographic areas into groups with similar health profiles, enabling targeted intervention planning.
- **NLP and sentiment analysis** extract health signals from text data — news, social media, clinical notes — enabling infoveillance systems that detect outbreak signals days before official reporting.
- **Wastewater epidemiology** detects community-level pathogen prevalence from sewage samples, providing an early warning signal unaffected by healthcare access or testing behavior.

## Key Terms

- **choropleth map**: A thematic map in which geographic units are shaded according to a variable's value, typically a rate or proportion
- **spatial autocorrelation**: The tendency for nearby geographic units to have more similar values than distant units
- **Moran's I**: A global statistic for spatial autocorrelation ranging from -1 (dispersion) through 0 (random) to +1 (clustering)
- **SaTScan**: Software implementing the spatial scan statistic for detecting space-time clusters using a cylindrical scanning window
- **interrupted time series (ITS)**: A quasi-experimental design that estimates the effect of a population-level intervention by comparing the pre- and post-intervention trend and level of a time series outcome
- **random forest**: An ensemble supervised learning method that averages predictions from many decision trees trained on bootstrap samples with random feature subsets
- **gradient boosting**: A sequential ensemble method that iteratively adds trees to correct residual errors of the previous ensemble
- **AUC-ROC**: Area under the receiver operating characteristic curve; a threshold-independent measure of a binary classifier's discrimination ability
- **k-means clustering**: An unsupervised algorithm that partitions data into K clusters by iteratively minimizing within-cluster distances to centroids
- **wastewater epidemiology**: Surveillance approach that detects pathogens or their markers in untreated sewage to estimate community-level disease prevalence
- **infoveillance**: Surveillance of health-relevant information from news, social media, and other text sources using NLP methods
