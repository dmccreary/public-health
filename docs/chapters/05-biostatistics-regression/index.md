---
title: "Biostatistics: Regression and Advanced Methods"
description: Regression methods for public health including linear, logistic, Poisson, and Cox models; survival analysis; meta-analysis and systematic review methods; multiple comparisons, missing data, interrupted time-series, and excess mortality estimation.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Biostatistics: Regression and Advanced Methods

## Summary

This chapter extends biostatistical foundations into the regression and advanced analysis methods that dominate the public health research literature. Students learn to match regression type to data structure — continuous outcomes → linear; binary → logistic; count rates → Poisson; time-to-event → Cox — interpret survival curves, pool evidence across studies through meta-analysis, and handle the common analytical challenges of multiple comparisons, missing data, interrupted time series for policy evaluation, and excess mortality estimation.

This chapter builds on concepts from:

- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 3: Epidemiology: Study Design and Causal Inference](../03-epidemiology-study-design/index.md)
- [Chapter 4: Biostatistics: Statistical Foundations](../04-biostatistics-foundations/index.md)

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Linear Regression
2. Logistic Regression
3. Poisson Regression for Rates
4. Cox Proportional Hazards
5. Kaplan-Meier Survival Curve
6. Meta-Analysis Methods
7. Forest Plot Interpretation
8. Heterogeneity in Meta-Analysis
9. Multiple Comparisons Problem
10. Standardization Methods
11. Missing Data Mechanisms
12. Multiple Imputation Methods
13. Interrupted Time-Series Analysis
14. Excess Mortality Estimation
15. Sensitivity Analysis Stats

---

!!! mascot-welcome "From Single Numbers to Models"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Chapter 4 gave you the vocabulary of individual statistical tests. This chapter gives you the grammar — the multivariate regression and advanced analytical methods that let public health researchers model complex relationships, control for confounders, synthesize evidence across dozens of studies, and evaluate the population-level effects of policies. Every major public health finding you have ever read — a vaccine efficacy number, a hazard ratio from a survival study, a pooled effect size from a meta-analysis — emerged from one of the methods in this chapter. *What does the evidence show?* This chapter teaches you how those numbers are built.

---

## Regression Models and When to Use Each

Regression analysis is the foundational tool for examining associations between an outcome and one or more predictor variables while accounting for other covariates. The choice of regression model is determined primarily by the nature of the outcome variable. Using the wrong regression model is a footgun: the analysis runs without errors, the output looks plausible, and the estimates are systematically biased in ways that may not be obvious from the residual plots.

The four regression models covered in this chapter — linear, logistic, Poisson, and Cox — share a common mathematical structure: the **generalized linear model (GLM)** framework, in which a *link function* connects the linear predictor to the expected outcome. Each model uses a different link function matched to the distributional family of the outcome.

### Linear Regression

**Linear regression** models a continuous, approximately normally distributed outcome as a linear function of predictor variables. The multiple linear regression equation is:

\[
Y_i = \beta_0 + \beta_1 X_{1i} + \beta_2 X_{2i} + \cdots + \beta_p X_{pi} + \varepsilon_i
\]

Where \( Y_i \) is the outcome for individual i, \( \beta_0 \) is the intercept, \( \beta_j \) are slope coefficients for each predictor \( X_j \), and \( \varepsilon_i \) is the residual error term assumed to be normally distributed with mean 0 and constant variance.

The coefficient \( \beta_j \) is interpreted as the expected change in Y for a one-unit increase in \( X_j \), holding all other predictors constant. This "holding constant" operation is how regression controls for confounders — a major advantage over simple bivariate comparisons.

Key assumptions of linear regression: linearity between predictors and outcome; independence of observations; constant residual variance (homoscedasticity); normally distributed residuals (especially important for small samples); and no severe multicollinearity among predictors. Residual diagnostic plots (residuals vs. fitted values, Q-Q plots) are always required before trusting model output.

Public health applications include: modeling the association between air pollution concentration and systolic blood pressure; predicting hospital length of stay from patient characteristics; estimating the dose-response relationship between sodium intake and blood pressure change.

### Logistic Regression

**Logistic regression** is used when the outcome is binary — disease/no disease, died/survived, vaccinated/unvaccinated. Because probabilities are bounded between 0 and 1, ordinary linear regression is inappropriate (it can predict probabilities outside [0,1] and assumes constant additive effects that are unrealistic for binary outcomes). Logistic regression uses the **logit link function**, modeling the log-odds of the outcome:

\[
\log\left(\frac{P(Y=1)}{1-P(Y=1)}\right) = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \cdots
\]

Exponentiating a logistic regression coefficient gives the **odds ratio (OR)**: \( e^{\beta_j} \) is the OR for the outcome associated with a one-unit increase in \( X_j \), holding other predictors constant. For rare outcomes (disease prevalence < 10%), the OR approximates the relative risk; for common outcomes, OR and RR diverge substantially, and interpreting ORs as if they were RRs overstates the association — a common error in the published literature.

Logistic regression assumptions: the log-odds of the outcome has a linear relationship with continuous predictors; observations are independent; there is no severe multicollinearity. Unlike linear regression, residuals from logistic regression are not normally distributed, so model fit is assessed through the Hosmer-Lemeshow test, calibration curves, and discrimination metrics (area under the ROC curve, C-statistic).

Public health applications include: modeling the probability of COVID-19 hospitalization as a function of age, vaccination status, and comorbidities; estimating the odds of low birth weight as a function of maternal smoking and prenatal care; identifying predictors of obesity in national survey data.

### Poisson Regression for Rates

When the outcome is a **count** — number of cases, number of deaths, number of hospitalizations — and it follows a Poisson distribution, **Poisson regression** is the appropriate model. Poisson regression models the log of the expected count as a linear function of predictors:

\[
\log(E[Y_i]) = \beta_0 + \beta_1 X_{1i} + \cdots + \log(t_i)
\]

The \( \log(t_i) \) term is an **offset** — a covariate with coefficient fixed at 1 that converts a count model into a rate model. Including \( \log(\text{person-time}) \) as an offset allows the model to compare incidence rates across groups with different amounts of follow-up time. Exponentiating a Poisson regression coefficient gives the **incidence rate ratio (IRR)**: the expected multiplicative change in the rate per one-unit increase in the predictor.

A critical assumption is that the variance equals the mean (equidispersion). In most real public health datasets, count outcomes are **overdispersed**: the observed variance exceeds the mean, violating the Poisson assumption. Symptoms of overdispersion include inflated coefficient standard errors and poor model fit. Remedies include the **negative binomial regression model** (which adds a dispersion parameter) or using robust "sandwich" standard errors. Using standard Poisson regression on overdispersed data is another footgun: the point estimates are unbiased, but the standard errors are too small, producing falsely narrow confidence intervals and p-values that are too small.

Public health applications include: modeling influenza case counts by week adjusting for population size and vaccination coverage; estimating injury rates per work-hour by industry sector; analyzing cancer mortality rates across counties after controlling for age distribution.

### Cox Proportional Hazards Regression

When the outcome is **time to an event** — time to death, time to disease onset, time to hospital discharge — the appropriate regression model is the **Cox proportional hazards model**. Survival outcomes require specialized methods because of **censoring**: some participants have not experienced the event by the end of the study period, so their exact event time is unknown but their follow-up time provides partial information.

The Cox model estimates the **hazard ratio (HR)** — the multiplicative effect of a predictor on the instantaneous rate of event occurrence at any given time:

\[
h(t | X) = h_0(t) \cdot e^{\beta_1 X_1 + \beta_2 X_2 + \cdots}
\]

Where \( h_0(t) \) is the baseline hazard function (the hazard when all predictors are 0), and the exponential term scales the baseline hazard multiplicatively based on the predictors. Crucially, the Cox model does not assume any specific shape for \( h_0(t) \) — it is estimated nonparametrically from the data — making it a **semi-parametric** method. This flexibility is why the Cox model is by far the most commonly used survival regression in the medical and public health literature.

The **proportional hazards assumption** — that the hazard ratio between any two groups remains constant over time — must be verified. Violations (for example, where the treatment benefit decreases over time as populations age differentially) require time-varying covariate models or stratified Cox models.

The table below synthesizes the regression selection framework for all four models. All four models have been described in full above; this table serves as a reference summary for matching data structure to method.

| Outcome Type | Link Function | Model | Key Output | Public Health Example |
|---|---|---|---|---|
| Continuous (normal) | Identity | **Linear Regression** | β coefficient (mean difference) | Blood pressure change per SD of salt intake |
| Binary (0/1) | Logit | **Logistic Regression** | Odds Ratio (e^β) | OR of hospitalization by vaccination status |
| Count / rate (Poisson) | Log + offset | **Poisson Regression** | Incidence Rate Ratio (e^β) | Weekly influenza rate ratio by county |
| Time-to-event (survival) | Log (semi-parametric) | **Cox Proportional Hazards** | Hazard Ratio (e^β) | HR of mortality by smoking status |

## Survival Analysis

### The Kaplan-Meier Survival Curve

Before fitting the Cox regression model, analysts typically **describe** survival data graphically using the **Kaplan-Meier (KM) survival curve** — a nonparametric estimate of the probability of surviving (or remaining event-free) past each observed event time.

The KM estimator is computed as:

\[
\hat{S}(t) = \prod_{t_i \leq t} \left(1 - \frac{d_i}{n_i}\right)
\]

Where at each event time \( t_i \), \( d_i \) individuals experience the event and \( n_i \) are at risk (still alive and uncensored). The KM curve is a step function that drops at each event time; censored observations are often shown as tick marks on the curve.

The **log-rank test** is the standard nonparametric test for comparing two or more KM curves. It tests whether the survival functions differ significantly across groups by comparing observed and expected numbers of events at each event time, assuming the null hypothesis that the survival curves are identical. For comparing survival by multiple categorical groups (for example, treatment arm, disease stage, vaccine type), the log-rank test is the appropriate starting point before formal Cox regression.

Interpreting KM curves requires attention to:

- **Crossing curves** — curves that cross early suggest non-proportional hazards, violating the key assumption of the log-rank test and Cox model
- **Tail behavior** — survival estimates become unreliable when few individuals remain at risk, typically shown by widening confidence bands
- **Median survival** — the time at which the estimated survival probability crosses 50%; reported when the outcome of interest is time-to-death or time-to-recovery

The interactive explorer below allows you to examine Kaplan-Meier curves for two comparison groups with adjustable parameters, observe the effect of censoring, and run the log-rank test.

#### Diagram: Kaplan-Meier Survival Curve Explorer

<iframe src="../../sims/kaplan-meier-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Kaplan-Meier Survival Curve Explorer — Interactive MicroSim</summary>
Type: microsim
**sim-id:** kaplan-meier-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: compare
Learning Objective: Students can interpret a Kaplan-Meier survival curve, identify median survival for each group, recognize the effect of censoring, and interpret the log-rank test result comparing two groups.

Purpose: Provide an interactive survival curve visualization that makes key interpretation concepts (step function, censoring tick marks, group comparison, log-rank test) explicit and manipulable.

Layout: Main canvas area (top 70%): Chart.js line chart showing two KM step-function curves — Group A (teal) and Group B (orange), with 95% confidence band shading. Tick marks indicate censored observations. Dashed horizontal line at survival = 0.5 with vertical drop lines to the x-axis marking median survival for each group. Bottom 30%: controls and output panel.

Controls:
- Group A median survival slider: range 6 to 60 months, step 1, default 24 months. Changes the simulated event distribution for Group A.
- Group B median survival slider: range 6 to 60 months, step 1, default 36 months.
- Censoring rate slider: range 0% to 50%, step 5%, default 20%. Adds censored observations (tick marks) to both curves.
- Sample size per group: 20, 50, 100, 200 (dropdown). Larger n narrows the confidence bands.
- "Draw New Simulation" button: redraws curves with fresh random samples using current parameters.

Output panel (updates live):
- Group A median survival (months) with 95% CI
- Group B median survival (months) with 95% CI
- Log-rank test statistic and p-value
- Plain-language interpretation: "Group A has significantly longer survival than Group B (p = 0.02)." or "No significant difference in survival between groups (p = 0.31)."

Interactive behavior:
- Hovering a point on either curve: shows tooltip with time, estimated survival probability, number at risk, and number of events to that point.
- Checkbox: "Show confidence bands" — toggles shaded 95% CI around each curve.
- Checkbox: "Show number at risk table" — shows a small table below the x-axis with n at risk at 0, 6, 12, 24, 36 months for each group.

Visual style: Clean Chart.js style; teal = Group A, orange = Group B; confidence bands semi-transparent; step-function curves; tick marks for censored observations.

Canvas: Responsive full container width, 500px height.

Instructional Rationale: Adjusting median survival and censoring rate in real time builds direct intuition for how censoring affects curve shape and how the log-rank test responds to the magnitude of group differences and sample size.
</details>

## Synthesizing Evidence: Meta-Analysis and Systematic Reviews

### Meta-Analysis Methods

Individual studies are rarely large enough to provide definitive evidence on their own, and the results of multiple studies addressing the same question often differ. **Meta-analysis** is a set of statistical methods for quantitatively synthesizing the results of two or more independent studies addressing the same research question, producing a single pooled effect size estimate.

The standard meta-analysis procedure involves:

1. **Systematic search and selection** — identifying all studies meeting pre-specified eligibility criteria, documented in a PRISMA flow diagram
2. **Data extraction** — recording the effect size and its standard error (or CI) from each study
3. **Pooling** — computing a weighted average of effect sizes, where weights reflect the precision of each study
4. **Assessing heterogeneity** — testing whether the studies estimate a common effect or whether their true effects vary

The two fundamental meta-analysis models are:

- **Fixed-effects model**: assumes all studies estimate the same underlying true effect size, and that observed differences reflect only sampling error. Studies are weighted by the inverse of their variance (larger, more precise studies get more weight). Appropriate when studies are closely similar in population, intervention, and outcome.
- **Random-effects model** (DerSimonian-Laird): assumes that the true effect size varies across studies due to genuine differences in population, dose, follow-up, or context. Adds a between-study variance component \( \tau^2 \) to the weights. Produces wider CIs than fixed-effects models, reflecting the additional uncertainty from between-study heterogeneity. More commonly appropriate in public health where studies differ meaningfully in design.

The pooled effect size from a random-effects model is the estimated mean of the distribution of true effects across similar studies — a statement about the average effect that can be expected in a new, similar study.

### Forest Plot Interpretation

The standard display for meta-analysis results is the **forest plot** — a graphical summary showing the effect size and confidence interval for each individual study alongside the pooled estimate. Reading a forest plot:

- Each horizontal line represents one study. The center point (square) is the study's effect size; the width of the line represents the 95% CI; the area of the square is proportional to the study's statistical weight.
- The vertical reference line typically marks the null value (OR = 1.0 for odds ratios, mean difference = 0 for continuous outcomes). Studies whose CI crosses this line have non-significant individual findings.
- The **diamond** at the bottom represents the pooled estimate. Its horizontal width is the 95% CI of the pooled effect. A diamond that does not cross the null line indicates a statistically significant pooled result.
- Below the diamond: the pooled effect size with CI, the test of overall effect (Z-statistic and p-value), and the heterogeneity statistics.

The interactive forest plot below demonstrates how to read individual study contributions, identify outliers, and interpret the pooled estimate across a simulated meta-analysis.

#### Diagram: Interactive Forest Plot

<iframe src="../../sims/forest-plot-interactive/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Forest Plot — MicroSim</summary>
Type: microsim
**sim-id:** forest-plot-interactive<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: interpret
Learning Objective: Students can read a forest plot, identify each study's contribution (effect size, CI, weight), recognize the pooled estimate diamond, and interpret heterogeneity statistics.

Purpose: Teach forest plot literacy — the ability to extract information from the most common summary graphic in systematic review literature — through direct interaction with each component.

Layout: Classic forest plot layout. Left column (30%): study names and year (8–12 simulated studies). Center area (50%): horizontal lines with squares. Right column (20%): numerical summary (OR, 95% CI, weight %). Bottom row: diamond for pooled estimate, heterogeneity statistics (I², τ², Cochran's Q, p for heterogeneity).

Simulated studies: 10 hypothetical studies with plausible ORs ranging from ~0.5 to ~2.5, varying sample sizes (n = 50 to 2000), and corresponding CIs. Weights vary with precision. True pooled OR approximately 1.25.

Interactive features:
- Hovering any study row: that row highlights (background turns light yellow), and an info panel on the right side of the canvas shows: study name, year, n, OR, 95% CI, weight, and a one-sentence description of the simulated study design.
- Hovering the diamond: info panel shows pooled OR, 95% CI, Z-statistic, and p-value in plain language: "The pooled odds ratio of X.XX (95% CI Y–Z) suggests a moderate positive association. The result is statistically significant (p = 0.01)."
- Toggle button "Fixed Effects / Random Effects": switches between fixed-effects and random-effects pooling. The diamond position and width change; weights update. A note appears: "Random-effects model used because I² > 50%."
- Heterogeneity panel: shows I² (the percentage of total variation attributable to between-study differences, rather than chance), τ², and Cochran's Q p-value, with traffic-light color coding: I² < 25% = green (low heterogeneity), 25–75% = yellow (moderate), > 75% = red (high).

Visual style: Classic forest plot aesthetic. Black squares (size proportional to weight), horizontal CI lines, vertical null line (OR = 1.0 in red), diamond in teal. Column headers at top: Study, OR (95% CI), Weight.

Canvas: Responsive full container width, 520px height.

Instructional Rationale: Forest plots are the single most important graphic in evidence synthesis, and students cannot learn to read them from a static textbook image. Hovering each study row to see its details connects the visual element to its meaning, while the fixed/random toggle demonstrates why heterogeneity changes the pooled estimate.
</details>

### Heterogeneity in Meta-Analysis

**Heterogeneity** in meta-analysis refers to genuine variability in effect sizes across studies, beyond what is expected from sampling error alone. It is quantified by:

- **Cochran's Q**: tests whether observed variation exceeds what is expected by chance. Significant Q (p < 0.10 conventionally) suggests real between-study differences. Low power limits its utility in small meta-analyses.
- **I²**: the percentage of total variance attributable to between-study heterogeneity. Ranges 0–100%: values of 0–25% are typically "low," 25–75% are "moderate," and >75% are "high." I² is more interpretable than Q because it does not depend on the number of studies.
- **τ²**: the estimated between-study variance. Used to quantify the absolute magnitude of heterogeneity on the effect size scale.

High heterogeneity calls for **subgroup analyses** and **meta-regression** to explain it. For example, if a pooled OR for a vaccine's efficacy shows I² = 70%, analysts might examine whether trials in high-income versus low-income countries, or those using different adjuvants, explain the variation. Unexplained high heterogeneity weakens the clinical and policy utility of the pooled estimate — a single number may misrepresent a genuinely heterogeneous literature.

!!! mascot-thinking "Why do two studies of the same intervention produce such different results?"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage holds clipboard and looks thoughtful">
    Real-world studies differ in population age and comorbidity profiles, intervention dose and duration, length of follow-up, concomitant treatments, background disease prevalence, and measurement instruments. All of these create genuine differences in the true effect — what epidemiologists call "clinical heterogeneity" and "methodological heterogeneity." Statistical heterogeneity (high I²) is usually a symptom of these underlying differences, not a problem in itself. The solution is not to average everything together and report a single number; it is to investigate *why* the effects differ and report the distribution of effects across contexts, not just the mean.

## Analytical Challenges

### Multiple Comparisons Problem

The **multiple comparisons problem** arises when a study performs many hypothesis tests simultaneously. With each test set at α = 0.05, the probability of at least one false positive among k independent tests is \( 1 - (1 - 0.05)^k \). For k = 20 tests, the probability of at least one false positive exceeds 64% even when every null hypothesis is true. This is why analyses of large genomic datasets or metabolomic screens routinely produce dozens of "significant" associations that fail to replicate.

Solutions include:

- **Bonferroni correction**: divide α by the number of tests (α* = 0.05/k). The most conservative approach; appropriate when the family of tests is small and independence is approximately met.
- **False Discovery Rate (FDR) control** (Benjamini-Hochberg procedure): controls the expected proportion of rejected hypotheses that are false positives, rather than the probability of any false positive. Less conservative than Bonferroni and preferred for large exploratory analyses.
- **Pre-specification**: pre-registering the primary outcome and analysis plan before data collection eliminates post-hoc p-hacking and eliminates the need for correction because the number of pre-specified tests is small and justified.

In public health surveillance and outbreak investigations, multiple comparisons arise when testing for geographic, temporal, or demographic clusters. Spatial scan statistics (SaTScan) use permutation-based methods to correct for the many possible window sizes and locations tested.

### Standardization Methods

When comparing mortality rates or disease rates across populations with different age distributions, raw rates are misleading. Older populations have higher mortality simply because of their age structure, not because their healthcare is worse. **Standardization methods** remove the effect of confounders like age, sex, or race from rate comparisons.

**Direct standardization** applies the age-specific rates from each population to a common standard population (for example, the 2000 US census population), computing a weighted average rate as if both populations had the same age structure. The resulting **age-standardized rate** reflects each population's true risk experience independent of its demographic composition.

**Indirect standardization** applies the age-specific rates from a reference population to the study population's actual age distribution, computing the expected number of events. The **Standardized Mortality Ratio (SMR)** is the observed deaths divided by expected deaths:

\[
SMR = \frac{\text{Observed deaths}}{\text{Expected deaths}}
\]

An SMR > 1 indicates excess mortality in the study population compared to the reference; SMR < 1 indicates lower mortality. Indirect standardization is used when age-specific rates in the study population are unreliable due to small numbers — a common situation in occupational epidemiology where industry-specific disease rates are compared to general population rates.

### Missing Data Mechanisms

Nearly every public health dataset has missing values. The appropriate analytical response depends entirely on the **mechanism** by which data are missing — a classification that determines whether missingness is ignorable (safe to work around) or informative (potentially biasing).

Three missing data mechanisms are recognized:

- **Missing Completely at Random (MCAR)**: the probability of a value being missing is unrelated to both the observed and unobserved data. Rare in practice; complete-case analysis (deleting rows with any missing values) produces unbiased estimates when MCAR holds, though it reduces power.
- **Missing at Random (MAR)**: the probability of missingness depends on observed variables in the dataset but not on the unobserved value itself, conditional on those observed variables. Example: older participants are more likely to skip a survey item about digital health use, but conditional on age, the missing values are random. MAR is the standard assumption under which modern imputation methods are valid.
- **Missing Not at Random (MNAR)**: the probability of missingness depends on the missing value itself. Example: participants with high alcohol consumption are more likely to skip questions about alcohol intake. MNAR is the most problematic mechanism; standard imputation methods are biased, and sensitivity analyses are required to bound the conclusions.

The table below defines all three mechanisms and their analytical consequences. Each has been described above; the table provides a direct comparison.

| Mechanism | Definition | Missing Depends On | Complete-Case Analysis | Imputation Valid? |
|---|---|---|---|---|
| **MCAR** | Missing completely at random | Neither observed nor missing data | Unbiased (reduced power) | Yes, but unnecessary |
| **MAR** | Missing at random | Observed data only | Biased if missingness related to outcome | Yes (multiple imputation) |
| **MNAR** | Missing not at random | The missing value itself | Biased | No — requires sensitivity analysis |

### Multiple Imputation Methods

**Multiple imputation (MI)** is the recommended method for handling missing data when MAR is plausible. The procedure has three stages:

1. **Imputation**: create M complete datasets (typically M = 5–20) by replacing each missing value with a draw from the predictive distribution of that value given all observed data in the dataset. Each imputed dataset is slightly different because the imputed values are random draws, not single point estimates.
2. **Analysis**: run the substantive statistical analysis (regression, t-test, etc.) independently on each of the M complete datasets, obtaining M sets of results.
3. **Pooling** (Rubin's Rules): combine the M analyses by averaging the point estimates; the standard errors incorporate both within-imputation variability and between-imputation variability (which captures uncertainty about the true missing values).

Multiple imputation produces unbiased estimates and correctly calibrated standard errors when the MAR assumption holds and the imputation model includes all relevant predictors of the missing data mechanism and the outcome. A common error is to include only the predictors from the substantive model in the imputation — the imputation model should be richer, including the outcome variable and any auxiliary variables correlated with missingness.

!!! mascot-warning "Never use single imputation (mean imputation) in a research analysis."
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage holds up a cautionary claw">
    Mean imputation — replacing all missing values with the variable's observed mean — produces biased standard errors regardless of the missing data mechanism. It artificially reduces the variance of the imputed variable (because all missing values are set to the same number), producing standard errors that are too small and p-values that are too significant. It also distorts the correlation structure between variables. Mean imputation is easy to implement and silently destroys the calibration of every statistical test that uses the imputed variable. Use multiple imputation. The software overhead is modest and the difference in validity is substantial.

### Sensitivity Analysis

**Sensitivity analysis** in statistics refers to a family of methods that test how robust a study's conclusions are to specific analytical assumptions. A result is robust if its direction and magnitude are preserved across plausible variations in model specification, covariate inclusion, and data handling.

Common forms of sensitivity analysis in public health research include:

- **Assumption sensitivity**: fitting alternative model specifications (for example, a Poisson regression instead of a negative binomial) and checking whether conclusions change
- **E-value analysis**: calculating the minimum strength of association an unmeasured confounder would need to have with both exposure and outcome to explain away the observed association completely — a standardized way to assess unmeasured confounding
- **Tipping-point analysis for missing data**: determining what proportion of missing values, if they all had the opposite outcome, would change the study conclusion from significant to non-significant
- **Influential observations analysis**: identifying specific observations whose removal would substantially change model estimates (Cook's distance, DFBETAS)

A study that reports only primary analysis results and no sensitivity analyses is a study whose results the reader cannot fully trust. The absence of sensitivity analyses does not mean the findings are wrong — it means the robustness of the findings is unknown.

## Applied Methods: Interrupted Time-Series and Excess Mortality

### Interrupted Time-Series Analysis

When a policy intervention or exposure event is applied to an entire population at a known point in time, a **randomized controlled trial is impossible** — there is only one policy, one country, one time. The **interrupted time-series (ITS) analysis** is the most rigorous quasi-experimental design available in this situation. It uses the pre-intervention time series as the counterfactual (what outcomes would have looked like had the intervention not occurred) to estimate the intervention's impact on the level and slope of the outcome trend.

The standard ITS segmented regression model is:

\[
Y_t = \beta_0 + \beta_1 \cdot \text{Time}_t + \beta_2 \cdot \text{Intervention}_t + \beta_3 \cdot (\text{Time}_t \times \text{Intervention}_t) + \varepsilon_t
\]

Where:

- \( \beta_0 \): baseline level at time 0
- \( \beta_1 \): pre-intervention slope (underlying trend)
- \( \beta_2 \): immediate change in level at the intervention point
- \( \beta_3 \): change in slope after the intervention (difference between post- and pre-intervention slopes)

Public health examples of ITS applications include: evaluating the effect of indoor smoking bans on heart attack admissions (Scotland's 2006 smoking ban reduced acute myocardial infarction admissions by 17% in the first year); assessing the impact of sugar-sweetened beverage taxes on purchasing behavior; measuring the effect of opioid prescribing guidelines on dispensing rates.

Threats to ITS validity include: **co-interventions** (other changes occurring simultaneously that could explain the trend change); **autocorrelation** in the time series (consecutive time points are correlated, violating the independence assumption of ordinary least squares); **secular trends** (pre-existing trends that could produce apparent effects regardless of the intervention). Correcting for autocorrelation using ARIMA models or Newey-West standard errors is standard practice.

The diagram below illustrates the ITS workflow from data assembly through interpretation, making each analytical step and decision point interactive.

#### Diagram: Interrupted Time-Series Analysis Workflow

<iframe src="../../sims/its-analysis-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interrupted Time-Series Workflow — Interactive Diagram</summary>
Type: microsim
**sim-id:** its-analysis-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: apply
Learning Objective: Students can describe each step of an interrupted time-series analysis, identify the four regression coefficients and their interpretations, and recognize threats to validity such as co-interventions and autocorrelation.

Purpose: Make the ITS analytical workflow concrete and navigable through a clickable step-by-step diagram with embedded visualizations at each step.

Layout: Vertical flowchart of 6 steps on the left 40% of canvas. Each step is a rounded rectangle node with a step number, short title, and brief description. On click, the right 60% updates with:
- Step 1 "Assemble time series data": a scatter plot showing monthly outcome data over 36 months, with the intervention point marked as a vertical red dashed line
- Step 2 "Fit pre-intervention trend": same scatter plot with a linear regression line for the pre-intervention period only
- Step 3 "Extend counterfactual": the pre-intervention trend line projected forward past the intervention as a dashed line (what would have happened without intervention)
- Step 4 "Fit ITS segmented regression": both segments fitted with solid lines; coefficients β0, β1, β2, β3 labeled with arrows and plain-language interpretations
- Step 5 "Check autocorrelation": autocorrelation function (ACF) plot of residuals; note about Durbin-Watson test
- Step 6 "Interpret and report": table showing β0–β3 estimates, SEs, p-values, and a two-sentence plain-language interpretation of the intervention's level and slope effects

Step nodes:
1. Assemble Time Series Data
2. Fit Pre-Intervention Trend
3. Extend the Counterfactual Trend
4. Fit Segmented Regression (Level + Slope Change)
5. Check Autocorrelation in Residuals
6. Interpret Level Change (β2) and Slope Change (β3)

Active node (most recently clicked): teal fill, white text. Inactive nodes: light gray fill, dark text. Arrows between nodes: dark gray.

Simulated dataset: 36 monthly observations; pre-intervention (months 1–18) with gentle upward trend; intervention at month 18; post-intervention period (months 19–36) with lower level and steeper downward slope. Outcome: "Monthly acute myocardial infarction admissions per 100,000."

Canvas: Responsive full container width, 500px height.

Instructional Rationale: ITS analysis is difficult to teach with equations alone because the visual logic of segmented regression — the gap at the intervention point and the slope change — is more intuitive than the algebra. Walking through the workflow step by step with the visualization updating at each step builds procedural understanding that transfers to evaluating published ITS studies.
</details>

### Excess Mortality Estimation

**Excess mortality** is the difference between observed deaths during a period of crisis and the number of deaths that would have been expected in the absence of that crisis, based on historical trends. It has become one of the most important tools for estimating the total mortality burden of major events — pandemics, extreme weather events, wars — that affect reporting systems themselves, often producing systematic undercounts of cause-specific deaths.

The general framework is:

\[
\text{Excess Deaths} = \text{Observed Deaths} - \text{Expected Deaths}
\]

Expected deaths are estimated from historical data (typically 5 years preceding the crisis), accounting for long-term trends, seasonality, and population growth. Methods range from simple averaging of historical weekly deaths to sophisticated time-series models (Poisson regression with spline terms for trend and seasonal sine-cosine terms for cyclical patterns).

During the COVID-19 pandemic, excess mortality became critical because cause-specific COVID-19 death counts were systematically undercounted (through incomplete testing, reporting delays, and miscoding). National excess mortality estimates from the Economist and the Institute for Health Metrics and Evaluation (IHME) suggested global COVID-19 excess deaths of 15–21 million through 2021 — three to four times the official COVID-19 death count. In countries with weak vital registration systems, excess mortality may be the only reliable estimate of pandemic mortality.

Beyond pandemics, excess mortality estimation is used to quantify deaths from heat waves (the 2003 European heat wave killed an estimated 70,000 more than baseline, far exceeding initial counts), air quality episodes (the 2018 California Camp Fire produced measurable excess cardiovascular mortality beyond direct fire deaths), and the healthcare disruption effects of crises on non-COVID mortality.

Uncertainty quantification is essential in excess mortality work. Prediction intervals around the expected baseline — not just point estimates — determine whether observed deaths are statistically distinguishable from normal variation. A week with 200 observed deaths versus an expected 190 may fall well within the prediction interval; 200 versus an expected 150 with a tight prediction interval represents genuine excess.

## Key Takeaways

This chapter has extended the statistical toolkit from foundational tests to the multivariate, synthesis, and applied methods that power modern public health research:

- **Linear regression** models continuous outcomes and estimates mean differences; **logistic regression** models binary outcomes and estimates odds ratios; **Poisson regression** models count rates and estimates incidence rate ratios; **Cox regression** models time-to-event outcomes and estimates hazard ratios. Match the model to the outcome type.
- **Kaplan-Meier curves** describe survival data nonparametrically; the **log-rank test** compares survival functions between groups; the **Cox model** estimates the multivariate-adjusted hazard ratio.
- **Meta-analysis** pools effect sizes across studies; the **forest plot** displays individual and pooled results; **heterogeneity** (I²) quantifies whether studies estimate a common effect or a distribution of effects.
- The **multiple comparisons problem** inflates Type I error when many tests are performed; Bonferroni correction and FDR control are standard remedies.
- **Standardization** (direct and indirect, producing SMRs) removes demographic confounding from rate comparisons across populations.
- **Missing data mechanisms** (MCAR, MAR, MNAR) determine appropriate analytical responses; **multiple imputation** is the recommended approach when MAR holds.
- **Interrupted time-series analysis** is the leading quasi-experimental design for evaluating population-level policy impacts when RCTs are impossible.
- **Excess mortality** estimates total crisis mortality by comparing observed deaths to modeled baselines, correcting for systematic undercount of cause-specific deaths.
- **Sensitivity analyses** are required in any rigorous publication to test the robustness of conclusions to key assumptions.

??? question "Self-Check: Can you match the method to the question? — Click to check your answers"
    **Question 1:** A study measures time from HIV diagnosis to AIDS-defining illness in patients on two antiretroviral regimens. What analysis? → Cox proportional hazards regression (time-to-event outcome with censoring); supplement with Kaplan-Meier curves and log-rank test.

    **Question 2:** A systematic review of 15 RCTs finds I² = 72% for the pooled OR of a vaccine's efficacy. What does this mean? → High heterogeneity — 72% of variance in effect sizes is between studies, not within. A single pooled estimate is misleading; subgroup analyses or meta-regression are needed to explain the variation.

    **Question 3:** A dataset on emergency department visits has 18% missing values for insurance status. Analysts delete rows with missing values. Under what condition is this unbiased? → Only if insurance status is MCAR — the probability of it being missing is unrelated to both the observed and missing data. Under MAR or MNAR, complete-case analysis is biased.

    **Question 4:** A city evaluates a new bicycle safety ordinance using monthly injury counts. The policy was implemented citywide overnight. What design? → Interrupted time-series analysis. Pre-intervention counts establish the counterfactual trend; the ITS segmented regression estimates the level change (β2) and slope change (β3).

    **Question 5:** A county's crude mortality rate is higher than a neighboring county, but its age-standardized rate is lower. What explains this? → The first county has an older population. Direct age-standardization removes the confounding effect of age structure, revealing that the age-specific mortality rates in the first county are actually lower.

!!! mascot-celebration "Chapter 5 complete — you can now build and evaluate the evidence."
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage raises a wing in celebration">
    You have now completed the two-chapter biostatistics sequence that underpins virtually every quantitative finding in public health. Regression models, survival analysis, meta-analysis, missing data, interrupted time-series, excess mortality — these are the methods behind the headlines, the policy recommendations, and the clinical guidelines. The next chapters apply these tools to specific domains: environmental health, social and behavioral sciences, health policy, and global health. Every association you will encounter there — every OR, HR, pooled RR, and excess death estimate — was produced by methods you now understand. *Let's look at the data together.*

---

## Further Reading

- Hosmer, D. W., Lemeshow, S., & Sturdivant, R. X. (2013). *Applied Logistic Regression* (3rd ed.). Wiley.
- Borenstein, M., Hedges, L. V., Higgins, J. P. T., & Rothstein, H. R. (2021). *Introduction to Meta-Analysis* (2nd ed.). Wiley.
- Sterne, J. A. C., et al. (2009). Multiple imputation for missing data in epidemiological and clinical research. *BMJ*, 338, b2393.
- Kontopantelis, E., Doran, T., Springate, D. A., Buchan, I., & Reeves, D. (2015). Regression based quasi-experimental approach when randomisation is not an option. *BMJ*, 350, h2750.
- Excess mortality during the COVID-19 pandemic: Economist Intelligence Unit. (2021). The pandemic's true death toll. *The Economist*. economist.com/graphic-detail/coronavirus-excess-deaths
