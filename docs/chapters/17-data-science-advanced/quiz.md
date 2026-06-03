# Quiz: Data Science for Public Health — Advanced Analytics

Test your understanding of spatial epidemiology, machine learning, NLP, wastewater surveillance, and time-series methods with these review questions.

---

#### 1. Moran's I is a spatial statistic that measures:

<div class="upper-alpha" markdown>
1. The distance between disease clusters and environmental exposure sources
2. The degree to which similar values of a variable cluster together in geographic space
3. The ratio of observed to expected cases in a geographic unit
4. The statistical significance of the difference in disease rates between regions
</div>
??? question "Show Answer"
    The correct answer is **B**. Moran's I is a global measure of spatial autocorrelation, ranging from −1 (perfect spatial dispersion — neighboring areas have very different values) through 0 (spatial randomness) to +1 (perfect spatial clustering — neighboring areas have similar values). In disease mapping, a significantly positive Moran's I indicates that areas with high disease rates are geographically clustered rather than randomly distributed, warranting investigation of shared environmental, demographic, or social exposures.

    **Concept Tested:** Moran's I

---

#### 2. SaTScan's spatial scan statistic identifies disease clusters by:

<div class="upper-alpha" markdown>
1. Mapping all cases on a GIS platform and visually identifying concentrations
2. Scanning all possible circular or elliptical windows across a study region to find the one with the highest likelihood ratio comparing observed to expected cases
3. Comparing disease rates in census tracts to national rates using standardized ratios
4. Applying kernel density estimation to smooth case distributions across the study area
</div>
??? question "Show Answer"
    The correct answer is **B**. SaTScan uses a moving variable-size circular (or elliptical) window that is centered at each centroid in the study region and scanned across all possible locations and sizes. For each window, it compares observed cases to expected cases, computing a likelihood ratio. The window with the highest likelihood ratio is the most likely cluster. Monte Carlo randomization tests whether the cluster is more pronounced than would occur by chance. It simultaneously controls for multiple testing across many windows.

    **Concept Tested:** SaTScan Spatial Scan Statistic

---

#### 3. Random forests are an ensemble machine learning method that improves on single decision trees by:

<div class="upper-alpha" markdown>
1. Using deeper, more complex tree structures to capture nonlinear relationships
2. Averaging predictions from many trees, each trained on a random subset of data and features, to reduce variance and overfitting
3. Applying gradient boosting to iteratively correct the errors of previous trees
4. Using neural network layers to combine the outputs of individual decision trees
</div>
??? question "Show Answer"
    The correct answer is **B**. Random forests build a large number of decision trees, each trained on a bootstrap sample of the training data (bagging) and using a random subset of features at each split. Predictions are aggregated by majority vote (classification) or averaging (regression). This "wisdom of crowds" approach dramatically reduces the variance (overfitting) of single trees while maintaining low bias. Option C describes gradient boosting (XGBoost, LightGBM) — a different ensemble approach.

    **Concept Tested:** Random Forest Ensemble Method

---

#### 4. Wastewater epidemiology (environmental surveillance) detects SARS-CoV-2 RNA in municipal sewage primarily because:

<div class="upper-alpha" markdown>
1. SARS-CoV-2 replicates in water treatment facilities and can be concentrated for detection
2. Infected individuals shed viral RNA in feces 2–3 days before symptom onset, providing a population-level leading indicator
3. Wastewater testing is cheaper than clinical PCR testing and produces equivalent results
4. SARS-CoV-2 is primarily transmitted through fecal-oral routes via contaminated water
</div>
??? question "Show Answer"
    The correct answer is **B**. SARS-CoV-2 RNA is shed in feces during the incubation period — before symptoms appear and before most individuals seek clinical testing. Wastewater samples from municipal treatment plants aggregate this signal from the entire served population, providing a community-level leading indicator of infection trends that precedes clinical case detection by 4–7 days. Importantly, wastewater signal is independent of testing behavior, healthcare access, and symptom severity — overcoming key limitations of clinical surveillance.

    **Concept Tested:** Wastewater Epidemiology

---

#### 5. In an interrupted time series (ITS) analysis, the "slope change" parameter estimates:

<div class="upper-alpha" markdown>
1. The immediate step change in the outcome level at the point of intervention
2. The change in the trend (rate of change over time) after the intervention, compared to the pre-intervention trend
3. The cumulative effect of the intervention summed across all post-intervention time points
4. The difference in variance between the pre- and post-intervention series
</div>
??? question "Show Answer"
    The correct answer is **B**. An ITS regression model estimates two intervention effects: (1) a level change — the immediate step change in the outcome value at the time of intervention (intercept shift), and (2) a slope change — the difference between the post-intervention trend and the pre-intervention trend (change in rate of change over time). An intervention might produce an immediate level change (e.g., a tobacco tax reduces sales immediately) or a gradual slope change (e.g., a prevention program that builds slowly), or both.

    **Concept Tested:** ITS Slope Change Parameter

---

#### 6. The choropleth map is the most common geographic visualization for public health data, but it can be misleading because:

<div class="upper-alpha" markdown>
1. Color gradients cannot accurately represent categorical data
2. Large geographic areas visually dominate the map regardless of their population size
3. It requires continuous data, making it unsuitable for count data
4. It cannot show spatial autocorrelation patterns effectively
</div>
??? question "Show Answer"
    The correct answer is **B**. A choropleth map shades geographic units (counties, states, countries) by attribute value. Large, sparsely populated areas (e.g., rural western US states) visually dominate because they occupy more map space, even if their population and public health burden is small compared to dense urban areas. This creates a "modifiable areal unit problem" distortion. Alternatives include cartograms (areas scaled to population), dot density maps, or tile maps using equal-area hexagons.

    **Concept Tested:** Choropleth Map Limitations

---

#### 7. Natural language processing (NLP) in public health has been applied most extensively to:

<div class="upper-alpha" markdown>
1. Converting laboratory test results from numeric to categorical format
2. Extracting clinical information from unstructured text in electronic health records and social media
3. Translating public health guidelines from English to other languages automatically
4. Generating synthetic patient records for training machine learning models
</div>
??? question "Show Answer"
    The correct answer is **B**. NLP techniques — named entity recognition, information extraction, sentiment analysis, topic modeling — have been applied in public health to: extract diagnoses, symptoms, and exposures from clinical notes in EHR systems; analyze social media posts for syndromic surveillance and vaccine sentiment; process free-text adverse event reports; and mine PubMed abstracts for systematic reviews. The richness of information in unstructured clinical text makes NLP a high-value application in health informatics.

    **Concept Tested:** NLP Applications in Public Health

---

#### 8. Gradient boosting differs from random forests primarily because gradient boosting:

<div class="upper-alpha" markdown>
1. Uses decision stumps (single-split trees) rather than full-depth trees
2. Builds trees sequentially, with each tree correcting the errors of the previous ensemble
3. Requires no hyperparameter tuning and is robust to all data types
4. Uses bootstrap sampling without replacement rather than with replacement
</div>
??? question "Show Answer"
    The correct answer is **B**. Gradient boosting (XGBoost, LightGBM, CatBoost) builds trees sequentially rather than in parallel (as random forests do). Each new tree is trained to predict the residuals (errors) of the current ensemble, gradually reducing prediction error. This additive approach produces highly accurate models but is more prone to overfitting than random forests if not properly regularized. Random forests build trees independently in parallel (option A describes a characteristic of some boosting implementations, not a distinguishing feature).

    **Concept Tested:** Gradient Boosting vs. Random Forests

---

#### 9. The area under the ROC curve (AUC) in a machine learning classification model is interpreted as:

<div class="upper-alpha" markdown>
1. The proportion of positive cases correctly identified by the model at the optimal threshold
2. The probability that the model ranks a randomly chosen positive case higher than a randomly chosen negative case
3. The average accuracy of the model across all possible classification thresholds
4. The ratio of true positives to all positives predicted by the model at a fixed threshold
</div>
??? question "Show Answer"
    The correct answer is **B**. The AUC (Area Under the Receiver Operating Characteristic Curve) has a specific probabilistic interpretation: it equals the probability that the model assigns a higher predicted probability to a randomly drawn positive case than to a randomly drawn negative case. An AUC of 0.5 indicates no discriminatory power; 1.0 indicates perfect discrimination. AUC is threshold-independent — it summarizes model performance across all classification thresholds simultaneously.

    **Concept Tested:** AUC-ROC Interpretation

---

#### 10. Geographically weighted regression (GWR) differs from ordinary regression in that GWR:

<div class="upper-alpha" markdown>
1. Accounts for spatial autocorrelation by adding a spatial lag term to the regression model
2. Fits local regression coefficients at each geographic location, allowing relationships between variables to vary across space
3. Restricts analysis to geographically contiguous spatial units to reduce ecological fallacy
4. Uses inverse distance weighting to impute missing outcome values across the study region
</div>
??? question "Show Answer"
    The correct answer is **B**. Geographically weighted regression (GWR) extends ordinary regression by estimating separate coefficients for each geographic location using a spatially weighted subset of observations centered at that location. The result is a map of how the relationship between predictors and outcomes varies geographically — revealing spatial heterogeneity in effect sizes that a global regression model would average away. For example, the association between poverty and obesity may be stronger in rural than urban areas, which GWR would reveal.

    **Concept Tested:** Geographically Weighted Regression

---
