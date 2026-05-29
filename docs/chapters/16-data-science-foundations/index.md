---
title: "Data Science Foundations for Public Health"
description: Statistical computing with Python (primary) and R (context), reproducible research workflows, major public health data sources, data cleaning, missing data mechanisms, and record linkage.
generated_by: claude skill chapter-content-generator
date: 2026-05-28 14:30:00
version: 0.08
---

# Data Science Foundations for Public Health

## Summary

Data science skills have become essential for public health practitioners, enabling analysis at scales and complexities that were previously impossible. This chapter introduces statistical computing environments with Python as the primary tool (pandas, NumPy, scikit-learn, geopandas) and R as secondary context (tidyverse, survival packages), reproducible research workflows using Jupyter notebooks and Git/GitHub, the major public health data sources from CDC WONDER to the Global Burden of Disease study, and foundational data quality skills: cleaning, missing data mechanisms (MCAR, MAR, MNAR), and record linkage.

This chapter builds on concepts from:

- [Chapter 1: Public Health Foundations](../01-foundations/index.md)
- [Chapter 2: Epidemiology: Disease Measurement](../02-epidemiology-disease-measurement/index.md)
- [Chapter 4: Biostatistics: Statistical Foundations](../04-biostatistics-foundations/index.md)
- [Chapter 5: Biostatistics: Regression and Advanced Methods](../05-biostatistics-regression/index.md)

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

1. R Statistical Computing
2. tidyverse R Suite
3. ggplot2 Visualization
4. dplyr Data Manipulation
5. Python for Public Health
6. pandas Data Analysis
7. NumPy Scientific Computing
8. scikit-learn Machine Learning
9. Reproducible Research
10. R Markdown Documents
11. Jupyter Notebooks
12. Git Version Control
13. GitHub for Public Health
14. CDC WONDER Database
15. BRFSS Survey Data
16. NHANES Survey Data
17. SEER Cancer Registry
18. HCUP Hospital Data
19. Vital Statistics Data
20. American Community Survey
21. Data Cleaning Methods
22. Missing Data Handling
23. Record Linkage Methods

---

!!! mascot-welcome "What Does the Evidence Show? Let's Build the Tools to Find Out."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Sage waves welcome">
    Before you can answer a public health question, you need three things: data you can trust, tools to analyze it, and a workflow your collaborators — and future you — can reproduce. This chapter builds all three. Welcome to the engine room of modern public health.

---

## Statistical Computing: Python as Primary Tool, R as Context

### Why Computing Skills Are Now Core Competencies

The era of the hand-calculated chi-square test is over. Modern public health datasets contain millions of records, link across multiple administrative systems, and must be analyzed under the scrutiny of peer review and public accountability. Statistical computing is not a niche technical skill — it is as fundamental to practice as understanding rates and proportions.

Two languages dominate public health data analysis: **Python** and **R**. Understanding why each exists, where each excels, and how they relate is the first step toward choosing the right tool for a task. This course treats Python as the primary computing language and R as important historical and contextual knowledge. Many published analyses, package ecosystems, and research pipelines use R — students will encounter R code in journal papers, GitHub repositories, and health department reports. New analyses in this course are written in Python.

### Python for Public Health

**Python** is a general-purpose programming language that has become the dominant tool for data science, machine learning, and scientific computing across virtually every quantitative field. Its public health application rests on four core libraries.

**pandas** is the primary data manipulation library. It provides the `DataFrame` — a two-dimensional labeled data structure analogous to a spreadsheet or SQL table — and a rich toolkit for reading, filtering, grouping, merging, and reshaping data. Most public health data arrives as CSV, Excel, or database exports, and pandas handles all of these with a few lines of code.

**NumPy** (Numerical Python) provides the array operations that underlie nearly every scientific computing library in Python. When pandas performs a mean or a correlation, it delegates the computation to NumPy arrays. Direct NumPy use appears when performing matrix operations, custom statistical calculations, or simulations.

**scikit-learn** is the standard machine learning library, providing consistent interfaces for classification, regression, clustering, dimensionality reduction, and model evaluation. In public health contexts, scikit-learn supports disease risk prediction, population segmentation, and predictive surveillance.

**geopandas** extends pandas to handle geographic data — shapefiles, GeoJSON, coordinate projections — making spatial epidemiology accessible without dedicated GIS software. Chapter 17 uses geopandas extensively.

A typical public health Python workflow to load a BRFSS (Behavioral Risk Factor Surveillance System) dataset and compute state-level diabetes prevalence might look like this. First, the plain-language explanation: load the CSV file into a DataFrame, filter to completed interviews, group by state, compute the weighted proportion of respondents reporting diabetes, and sort the result. In code:

```python
import pandas as pd

# Load the BRFSS data (already downloaded from CDC)
brfss = pd.read_csv("brfss_2022.csv", low_memory=False)

# Keep only completed interviews
brfss = brfss[brfss["DISPCODE"] == 1100]

# Recode diabetes outcome (1 = yes, 2 = no, 3 = pre-diabetes)
brfss["diabetes"] = (brfss["DIABETE4"] == 1).astype(int)

# State-level prevalence (unweighted — see note on survey weights below)
state_prev = (
    brfss.groupby("_STATE")["diabetes"]
    .mean()
    .mul(100)
    .round(1)
    .reset_index()
    .rename(columns={"_STATE": "state_fips", "diabetes": "pct_diabetes"})
)
print(state_prev.sort_values("pct_diabetes", ascending=False).head(10))
```

!!! mascot-warning "Survey Weights Are Not Optional"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Sage holds up a warning sign">
    The code above uses unweighted proportions for illustration only. BRFSS and NHANES are complex survey designs with stratification, clustering, and post-stratification weights. Ignoring weights produces biased estimates. In Python, the `survey` package and the `statsmodels` `SurveyMethods` module provide weighted estimators. In R, the `survey` package by Thomas Lumley is the standard. Always check survey documentation for the correct weight variable before computing any prevalence estimate.

### R Statistical Computing: Historical Context and Ecosystem

**R** was developed in the early 1990s as a free, open-source implementation of the S statistical programming language. It became the lingua franca of academic biostatistics and epidemiology and remains deeply embedded in the published literature, regulatory submissions to the FDA, and the codebases of many health departments and academic research groups. Students who understand R can read and reproduce a vast archive of public health analyses.

The **tidyverse** is a coherent collection of R packages — developed primarily by Hadley Wickham and the RStudio (now Posit) team — that share a consistent philosophy: data should be "tidy" (one observation per row, one variable per column), and operations should be composable using the pipe operator (`%>%` or the native `|>`). The core tidyverse packages relevant to public health are:

- **dplyr**: data manipulation verbs (`filter()`, `select()`, `mutate()`, `group_by()`, `summarise()`) that mirror what pandas does in Python
- **ggplot2**: a grammar-of-graphics visualization system that builds plots layer by layer — the conceptual inspiration for Python's seaborn and plotnine libraries
- **tidyr**: tools for reshaping data between wide and long formats
- **readr**, **haven**, **readxl**: readers for CSV, SPSS/SAS/Stata, and Excel files

**R Markdown** documents combine R code, prose, and output (tables, figures) in a single `.Rmd` file that compiles to HTML, PDF, or Word. The concept directly inspired Jupyter notebooks, and the two formats serve the same reproducibility goal through different ecosystems. Posit's newer **Quarto** format supports both R and Python in a single document, partially bridging the two ecosystems.

#### Table: Python vs. R for Public Health Tasks

| Task | Python Approach | Key Python Library | R Approach | Key R Library | Notes |
|------|-----------------|-------------------|------------|---------------|-------|
| Data import (CSV) | `pd.read_csv()` | pandas | `read_csv()` | readr | Both handle large files; pandas has lower memory overhead for very large datasets |
| Data cleaning / wrangling | DataFrame operations | pandas | dplyr verbs | dplyr | Both are highly capable; syntax differs significantly |
| Statistical modeling | `formula` API or sklearn | statsmodels, scikit-learn | `lm()`, `glm()` | base R, lme4 | R has more specialized epidemiologic packages (epiR, survival) |
| Visualization | `plt` / `sns` / `px` | matplotlib, seaborn, plotly | `ggplot()` | ggplot2 | ggplot2 remains the gold standard for publication-quality static graphics |
| Survival analysis | `KaplanMeierFitter` | lifelines | `survfit()` | survival | R's survival package is more mature; lifelines is catching up |
| Spatial analysis | GeoDataFrame | geopandas | `sf` objects | sf, spdep | Python's geopandas has become competitive for most tasks |
| Survey-weighted analysis | `SurveyMethods` | statsmodels | `svydesign()` | survey (Lumley) | R's survey package is more complete |
| Machine learning | Estimator API | scikit-learn | `caret`, `tidymodels` | tidymodels | Python/scikit-learn has broader ML ecosystem and better GPU integration |
| Interactive dashboards | Dash / Streamlit | Dash, Streamlit | `shinyApp()` | Shiny | Both are production-capable; Shiny has more epidemiologic examples in the literature |

---

## Reproducible Research: Jupyter, R Markdown, Git, and GitHub

### The Reproducibility Crisis and Its Public Health Stakes

**Reproducible research** means that a second analyst — or the original analyst three years later — can re-run an analysis from raw data to final output and obtain identical results. This sounds obvious, yet the "reproducibility crisis" in science has shown that a large fraction of published findings cannot be reproduced, even with access to the original data. In public health, non-reproducible analyses can persist in policy guidance, clinical guidelines, or outbreak response protocols. The tools in this section are the technical infrastructure of reproducibility.

### Jupyter Notebooks

A **Jupyter notebook** is a document that interleaves executable code cells, rich text (Markdown), equations (LaTeX), and output — tables, figures, printed values — in a single browser-based interface. Notebooks support Python, R, Julia, and dozens of other kernels. The `.ipynb` file format stores all of this as JSON, making notebooks trackable in version control.

A well-structured Jupyter notebook for a public health analysis follows a predictable anatomy:

1. **Metadata cell**: project title, author, date, data sources, license
2. **Environment cell**: imports and constants (file paths, threshold values)
3. **Data loading cell(s)**: read raw data, display `df.head()` and `df.info()` to document the input
4. **Cleaning cell(s)**: documented transformations with before/after checks
5. **Analysis cell(s)**: each computation with an explanatory prose cell above it
6. **Visualization cell(s)**: figures with interpretation in the prose below
7. **Summary cell**: key findings and limitations

The biggest footgun in Jupyter notebooks is **out-of-order execution** — running cells in a non-sequential order leaves hidden state in the kernel that makes the notebook non-reproducible. Always "Restart and Run All" before committing or sharing a notebook.

### Git Version Control

**Git** is a distributed version control system that tracks every change to every file in a project, stores the full history, supports branching for experimental work, and enables multiple contributors to merge changes without overwriting each other. For a public health analyst working alone, Git serves as an infinitely deep undo history and a mechanism for tagging versions of an analysis (e.g., "analysis sent to MMWR reviewers" vs. "analysis after peer review revisions").

The core Git operations a public health analyst needs are:

- `git init` or `git clone`: start a repository or copy an existing one
- `git add <file>` / `git commit -m "message"`: stage and record a snapshot
- `git log`: browse the history of commits
- `git branch` / `git checkout -b`: create and switch branches
- `git merge`: integrate changes from another branch
- `git push` / `git pull`: synchronize with a remote repository (typically GitHub)

A commit message in a public health analysis should explain the scientific decision, not just the mechanical change. "Fixed bug" is uninformative. "Switched to age-standardized rates using 2000 US standard population per NCHS guidance" tells a future collaborator (or a peer reviewer) why the change was made.

### GitHub for Public Health

**GitHub** is the dominant web platform for hosting Git repositories, enabling collaboration, code review, and public sharing. GitHub has become important infrastructure for public health in three ways. First, major analysis pipelines — CDC surveillance systems, WHO Global Health Observatory tools, state health department dashboards — are openly developed on GitHub, allowing external contributors and public scrutiny. Second, publishing analysis code alongside a preprint or journal article is increasingly required by funders and journals. Third, GitHub Actions allows automated testing and rendering of analytical pipelines, so the output documents update automatically when new data arrives.

#### Diagram: Reproducible Research Workflow

<iframe src="../../sims/reproducible-research-workflow/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Reproducible Research Workflow — Interactive Diagram Specification</summary>
Type: microsim
**sim-id:** reproducible-research-workflow<br/>
**Library:** vis-network<br/>
**Status:** Specified

Show a directed graph of a Git-based reproducible research pipeline. Nodes (clickable, styled as rounded boxes):
1. Raw Data (gray) — CDC download, survey CSV, vital records extract
2. Data Dictionary (gray) — variable codebook, README
3. Cleaning Script (blue) — Python/pandas or R/dplyr transformations
4. Clean Data (blue) — versioned intermediate file
5. Analysis Notebook (blue) — Jupyter .ipynb or R Markdown .Rmd
6. Figures & Tables (green) — generated outputs (never manually edited)
7. Report / Paper (green) — synthesizes outputs
8. Git Commit (orange) — each arrow that crosses a stage boundary represents a commit
9. GitHub Repository (orange) — remote origin with DOI via Zenodo

Edges: Raw Data → Cleaning Script → Clean Data → Analysis Notebook → Figures & Tables → Report / Paper. Data Dictionary → Cleaning Script (dashed). Each node click opens a tooltip explaining the stage and its reproducibility role. Nodes are color-coded by stage: input (gray), processing (blue), output (green), version control (orange).
</details>

---

!!! mascot-thinking "Reproducibility as an Ethical Obligation"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Sage looks thoughtful">
    Reproducibility is not just a technical nicety — it is an ethical obligation in public health. Analyses that inform surveillance systems, outbreak responses, or policy recommendations affect real people. An unreproducible analysis cannot be audited, corrected, or built upon. The tools in this section are how public health professionals honor the commitment that "what does the evidence show?" has a verifiable answer.

---

## Major Public Health Data Sources

Understanding what data exists, what it measures, and what its limitations are is a core skill for any public health analyst. The landscape of public health data sources in the United States is rich but fragmented — built up over decades by different agencies with different mandates, collection methods, and access restrictions.

### National Surveillance and Survey Systems

**CDC WONDER** (Wide-ranging Online Data for Epidemiologic Research) is a query interface for multiple CDC databases, most prominently the National Vital Statistics System's mortality data. Analysts can query cause-specific death counts and rates by age, sex, race/ethnicity, geography (national, state, county), and year. Because mortality data is available at the county level going back to 1999, WONDER is the primary tool for tracking long-term trends in chronic and infectious disease mortality, analyzing geographic disparities, and producing age-standardized rates for comparative analysis.

The **Behavioral Risk Factor Surveillance System (BRFSS)** is the world's largest continuously conducted telephone health survey, fielded annually by state health departments with CDC coordination. BRFSS collects state-level data on health risk behaviors (smoking, physical inactivity, excessive alcohol use), chronic disease prevalence (diabetes, hypertension, asthma), and preventive health practices (vaccination, cancer screening). Because the survey is state-based and uses a complex multistage sampling design, estimates require proper survey-weighted analysis. The key limitation: telephone surveys systematically underrepresent people without phones, people who do not speak English or Spanish, and institutionalized populations.

**NHANES** (National Health and Nutrition Examination Survey) combines interview and physical examination data for a nationally representative sample of approximately 5,000 persons per year. Unlike BRFSS (self-reported), NHANES includes clinical measurements — blood pressure, fasting glucose, HbA1c, lipid panels, physical fitness assessments — and biospecimen analyses. NHANES is the primary source for national prevalence estimates of undiagnosed conditions and biological risk factors. Its limitation is small sample size: county- or state-level estimates are generally not available.

### Cancer and Hospital Data

The **SEER** (Surveillance, Epidemiology, and End Results) program is a network of population-based cancer registries covering approximately 48% of the US population, operated by NCI. SEER collects cancer incidence (new cases), stage at diagnosis, treatment received, and survival outcomes. Because SEER registries perform active case-finding (not relying on self-report or claims), incidence rates from SEER are among the most accurate available for any disease. The key limitation is that SEER was not designed to be nationally representative — registry coverage areas overrepresent certain geographic and demographic groups.

**HCUP** (Healthcare Cost and Utilization Project) is a family of administrative databases built from hospital discharge records. The Nationwide Inpatient Sample (NIS) contains data on approximately 7 million hospital stays per year, making it the largest all-payer inpatient care database in the United States. HCUP data include diagnosis codes (ICD-10-CM), procedure codes, length of stay, charges, and limited demographic information. Key uses include tracking hospitalization trends, studying racial/ethnic disparities in hospital care, and analyzing complications following specific procedures. The limitation: administrative data is coded for billing, not research — diagnoses may be under-coded, up-coded, or absent.

### Vital Statistics, ACS, and International Data

**Vital Statistics Data** — birth and death certificates — are collected by state vital registration systems and compiled nationally by the National Center for Health Statistics (NCHS). Birth certificates provide gestational age, birth weight, plurality, maternal demographics, and prenatal care indicators. Death certificates provide cause of death (ICD-coded), contributing causes, decedent demographics, and place of death. Vital statistics are the foundation of life table calculations, infant mortality analysis, and maternal mortality surveillance. The key limitation: cause-of-death coding varies by certifier training and jurisdiction, introducing classification noise.

The **American Community Survey (ACS)**, conducted annually by the US Census Bureau, is the primary source of demographic, economic, housing, and social characteristics for the US population. For public health, ACS provides the denominators for rate calculations (population counts by age, sex, race/ethnicity, geography) and measures of social determinants: income, poverty, educational attainment, health insurance coverage, disability status, and housing quality. ACS data are available at geographic levels from national down to census tract, with 5-year pooled estimates required for small areas.

#### Table: Major Public Health Data Sources

| Source | What It Measures | Approximate Sample / Coverage | Update Frequency | Access Method | Key Limitation |
|--------|-----------------|-------------------------------|-----------------|---------------|----------------|
| CDC WONDER | Mortality, cancer incidence, natality, environmental data | All US deaths; all birth certificates | Annual (2-year lag) | Web query interface; API | County-level suppressed for small counts (<10 deaths) |
| BRFSS | Health behaviors, chronic disease prevalence, preventive care | ~400,000 adults/year; all 50 states + DC | Annual | SAS/CSV download from CDC | Telephone survey; excludes institutionalized populations |
| NHANES | Clinical measurements, biospecimens, diet | ~5,000 persons/year; national | 2-year cycles | SAS/CSV download from NCHS | Too small for state/county estimates |
| SEER | Cancer incidence, stage, survival | ~48% of US population in registry areas | Annual | SEER*Stat software; ASCII data | Registry coverage areas not nationally representative |
| HCUP NIS | Hospital discharges (inpatient) | ~7 million stays/year; nationally representative | Annual | Data use agreement required; fee | Billing codes, not clinical diagnosis; no longitudinal follow-up |
| NVSS (Vital Statistics) | Births and deaths | All US vital events | Annual (with lag) | NCHS download; CDC WONDER | Cause-of-death coding variability across certifiers |
| American Community Survey | Demographics, income, housing, insurance | ~3.5 million households/year | Annual (1-yr, 5-yr estimates) | Census API; data.census.gov | Sampling error large for small areas; undercounts for some populations |
| Global Burden of Disease | Mortality, morbidity, DALYs — 204 countries | Modeled estimates for all countries | Annual | IHME GBD Results tool | Model-based estimates with wide uncertainty intervals for data-sparse countries |

---

## Data Quality: Cleaning, Missing Data Mechanisms, and Imputation

### The 80/20 Rule of Data Science

Practitioners consistently report that 80% of data science work is data cleaning — finding and correcting errors, standardizing formats, handling missing values, and documenting decisions. The remaining 20% is analysis. This ratio is not an indictment of the field but a reflection of reality: data are collected by human beings using imperfect systems, and the gap between "data as recorded" and "data as needed for analysis" always requires bridging.

**Data cleaning methods** encompass a range of operations that should be documented in a cleaning script or notebook: recoding variables to consistent formats (e.g., "Yes/No" → 1/0), resolving date inconsistencies, removing duplicate records, flagging and handling outliers, and standardizing string fields (names, addresses, diagnosis codes). Every cleaning decision is a scientific choice that should be recorded in version-controlled code, not performed silently in a spreadsheet.

### Missing Data Mechanisms: MCAR, MAR, MNAR

**Missing data** is ubiquitous in public health datasets. A respondent skips a sensitive question, a lab value is unavailable for a patient who left care, a county's data is suppressed for privacy. How missing data are handled has profound effects on the validity of an analysis — and the correct handling depends on the mechanism that caused the missingness.

The three canonical **missing data mechanisms** were formalized by Donald Rubin in 1976:

**Missing Completely At Random (MCAR)** occurs when the probability of a value being missing is unrelated to any observed or unobserved variable. For example, if survey data is randomly lost due to a server failure, the missingness is MCAR. Under MCAR, a complete-case analysis (dropping rows with any missing values) produces unbiased estimates, though with reduced precision. MCAR is the most benign mechanism but also the least plausible in real data.

**Missing At Random (MAR)** occurs when the probability of missingness depends on other observed variables, but not on the unobserved missing value itself. For example, older patients may be less likely to report income, but conditional on age, whether income is reported is unrelated to the actual income level. Under MAR, complete-case analysis is biased, but multiple imputation or maximum likelihood methods can recover unbiased estimates.

**Missing Not At Random (MNAR)** occurs when the probability of missingness depends on the unobserved value itself. For example, people with high alcohol intake may be less likely to report alcohol use. This mechanism is the most dangerous because no standard imputation method can correct for it without external information or strong assumptions. MNAR requires sensitivity analyses and explicit discussion of direction-of-bias.

**Multiple imputation** is the standard method for handling MAR data. It replaces each missing value with multiple plausible values drawn from a predictive distribution, runs the analysis on each imputed dataset, and combines results using Rubin's rules. In Python, the `IterativeImputer` from scikit-learn or the `miceforest` package implements multiple imputation. In R, the `mice` package is the standard.

#### MicroSim: Missing Data Mechanisms Visualizer

<iframe src="../../sims/missing-data-mechanisms/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Missing Data Mechanisms Visualizer — MicroSim Specification</summary>
Type: microsim
**sim-id:** missing-data-mechanisms<br/>
**Library:** p5.js<br/>
**Status:** Specified

Display a grid of cells representing a dataset (10 columns × 20 rows). Each row is an observation; each column is a variable. Cells are colored: light blue = observed value, dark gray = missing value. Three buttons at the top switch between MCAR, MAR, and MNAR patterns:

- MCAR: Missing cells scattered uniformly at random (no pattern visible)
- MAR: Missing cells concentrated in certain rows where another column (highlighted in orange) has a specific value — e.g., missingness in "income" column depends on "age" column being >65
- MNAR: Missing cells concentrated in the highest-value rows of the same variable — e.g., missing "alcohol" values are the heaviest drinkers

Clicking any gray cell opens a tooltip panel on the right explaining:
- Which mechanism is active
- Why this cell is missing under this mechanism
- Whether complete-case analysis is biased
- The recommended handling strategy

A legend at the bottom maps colors to meaning. Smooth animation transitions between patterns when buttons are clicked.
</details>

---

!!! mascot-encourage "Missing Data Is Not a Failure — It's a Feature of Reality"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Sage offers encouragement">
    Students often feel that missing data is a sign something went wrong in the data collection. In reality, every real-world dataset has missing values — the question is always "why is it missing?" Understanding the mechanism is the scientific work. MNAR in a substance use survey is not a data quality problem; it is information about stigma and disclosure that belongs in your methods section.

---

## Record Linkage: Connecting Datasets Across Systems

### Why Record Linkage Matters

Public health data are collected by many different systems — hospitals, pharmacies, laboratories, vital registration offices, schools, and social service agencies — that were not designed to talk to each other. **Record linkage** is the process of identifying records in two or more datasets that correspond to the same individual or entity, enabling analysts to construct longitudinal histories, study social determinants alongside clinical outcomes, or track patients across care settings.

The canonical public health application is linking birth certificate data (which contains maternal social characteristics) to infant death certificate data (which contains cause of death), enabling analysis of how prenatal care, maternal education, and access to housing affect infant mortality. Another common application links cancer registry records (SEER) to Medicare claims data, enabling long-term survival analysis that accounts for treatment received and comorbidities.

### Deterministic vs. Probabilistic Linkage

**Deterministic linkage** (also called exact matching) links records that share identical values on one or more identifying fields — typically a unique identifier such as a Social Security Number, state-issued patient identifier, or name-date-of-birth combination. When unique identifiers are available and consistently recorded, deterministic linkage is fast, transparent, and produces no false matches. Its limitation is that many datasets lack unique identifiers, and real data contain typographical errors, name changes (marriage), and format inconsistencies that break exact matches.

**Probabilistic linkage** (also called the Fellegi-Sunter method, after the 1969 paper that formalized the approach) computes a match weight for each candidate record pair based on the probability that agreement on each field is due to a true match versus chance. Fields that are more specific (date of birth, ZIP code) carry higher weight than fields that are less discriminating (sex, race). The match weight formula is:

\[
w = \sum_{i=1}^{k} \log_2\left(\frac{m_i}{u_i}\right) \cdot c_i
\]

where \( m_i \) is the probability of agreement on field \( i \) given a true match, \( u_i \) is the probability of chance agreement on field \( i \), and \( c_i \) is the observed agreement indicator (1 if the field agrees, 0 otherwise). Pairs with weight above a threshold are designated matches; pairs in a middle zone undergo clerical review.

In Python, the **recordlinkage** package implements both deterministic and probabilistic linkage, with preprocessing functions for standardizing names and addresses, blocking strategies to reduce the number of candidate pairs, and comparison vectors for string similarity metrics (Jaro-Winkler, Levenshtein distance). **Splink** (developed by the UK Ministry of Justice) is a newer, scalable implementation built on Apache Spark and DuckDB.

Privacy-preserving variants of record linkage — where the identifying fields themselves never leave their originating organization — use cryptographic hashing and secure multi-party computation to perform linkage without revealing personal information. These methods are increasingly required by IRBs and data use agreements.

#### Diagram: Record Linkage Process

<iframe src="../../sims/record-linkage-process/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Record Linkage Process — Interactive Diagram Specification</summary>
Type: microsim
**sim-id:** record-linkage-process<br/>
**Library:** p5.js<br/>
**Status:** Specified

Draw an interactive flowchart with two parallel swim lanes (Dataset A on the left, Dataset B on the right) flowing down into a central matching engine. Stages (clickable boxes):

Left lane: Dataset A (birth certificates) → Standardization (name, address, date normalization)
Right lane: Dataset B (death certificates) → Standardization

Both standardized flows → Blocking (reduce candidate pairs by restricting to same state + birth year) → Comparison Vector Generation (per-field agreement scores) → Branch: Deterministic Path (exact SSN match → Accept) | Probabilistic Path (Fellegi-Sunter weight → Accept / Clerical Review / Reject) → Linked Dataset

Clicking each stage opens a sidebar panel with:
- Stage name and description
- Example field transformations (for standardization)
- Example match weight calculation (for probabilistic stage)
- Python code snippet (2-4 lines showing the recordlinkage call)
- Key parameter to tune

Color code: blue = data, orange = transformation, green = decision/output. Animate flow lines to show data moving through the pipeline.
</details>

---

!!! mascot-celebration "From Raw Rows to Research-Grade Evidence"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Sage celebrates">
    You have now covered the full foundation of public health data science: the tools (Python and R), the practices (reproducible workflows with Jupyter and Git), the resources (the major national data systems), and the critical data quality skills (cleaning, missing data mechanisms, record linkage). These are the infrastructure on which every analysis in the chapters ahead is built. The next chapter extends these foundations into spatial analysis, machine learning, and novel data streams — the frontier of computational public health.

---

## Summary

This chapter established the technical and conceptual foundations of public health data science:

- **Python** is the primary computing language for this course, with pandas, NumPy, scikit-learn, and geopandas forming the core stack. **R** and the tidyverse are important context — the published literature, existing pipelines, and specialized packages (survival, survey) make R literacy essential.
- **Reproducible research** — combining Jupyter notebooks (or R Markdown) with Git version control and GitHub — ensures that analyses can be audited, corrected, and built upon. Reproducibility is an ethical obligation in public health.
- The **major US public health data sources** — CDC WONDER, BRFSS, NHANES, SEER, HCUP, vital statistics, and the ACS — each have distinct strengths, sampling designs, and limitations that must be understood before analysis.
- **Data cleaning** is the majority of data science work. Every transformation should be documented in version-controlled code.
- **Missing data mechanisms** (MCAR, MAR, MNAR) determine the correct handling strategy. MNAR requires explicit sensitivity analysis and discussion of bias direction.
- **Record linkage** connects datasets across systems using deterministic or probabilistic methods, enabling longitudinal analysis and social determinants research that no single dataset could support alone.

## Key Terms

- **pandas**: Python library providing DataFrame data structures and tools for data manipulation and analysis
- **tidyverse**: Collection of R packages sharing a tidy-data philosophy, including dplyr, ggplot2, tidyr, and readr
- **reproducible research**: Analytical practice in which code, data, and documentation are organized so that any analyst can re-run the full pipeline and obtain identical results
- **MCAR** (Missing Completely At Random): Missingness mechanism where the probability of a missing value is unrelated to any variable in the dataset
- **MAR** (Missing At Random): Missingness mechanism where probability of missingness depends on observed variables but not on the missing value itself
- **MNAR** (Missing Not At Random): Missingness mechanism where probability of missingness depends on the unobserved missing value — the most challenging to address
- **multiple imputation**: Statistical technique for handling MAR data by replacing missing values with multiple plausible draws and combining results using Rubin's rules
- **record linkage**: Process of identifying records from different datasets that correspond to the same individual, enabling cross-system analysis
- **probabilistic linkage**: Record linkage approach that computes match weights based on agreement probability rather than requiring exact identifier matches
- **CDC WONDER**: CDC's Wide-ranging Online Data for Epidemiologic Research, providing mortality, natality, and environmental data via a web query interface
