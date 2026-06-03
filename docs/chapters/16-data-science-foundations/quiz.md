# Quiz: Data Science for Public Health — Foundations

Test your understanding of reproducible research, public health data sources, data cleaning, and record linkage with these review questions.

---

#### 1. Reproducible research in public health data science requires that:

<div class="upper-alpha" markdown>
1. All analyses are conducted using the same programming language across research teams
2. An independent analyst can obtain the same results using the original data and documented code
3. All study participants consent to having their data publicly shared
4. Statistical analyses are pre-registered before any data collection begins
</div>
??? question "Show Answer"
    The correct answer is **B**. Reproducibility means that given the same raw data and documented analytic code, an independent researcher can reproduce the exact results reported in the publication. This requires: documented, executable code; version-controlled scripts; clear data provenance documentation; and accessible (or archived) data. Reproducibility is a minimum standard for computational research and is distinguished from replicability (same findings with new data from a new sample).

    **Concept Tested:** Reproducibility in Data Science

---

#### 2. The National Health and Nutrition Examination Survey (NHANES) is distinguished from administrative health data primarily because:

<div class="upper-alpha" markdown>
1. NHANES data are collected passively through electronic health records rather than active surveys
2. NHANES combines interview, dietary, and physical examination data in a nationally representative probability sample
3. NHANES focuses exclusively on elderly and Medicare-eligible populations
4. NHANES is designed primarily for longitudinal tracking of individuals over decades
</div>
??? question "Show Answer"
    The correct answer is **B**. NHANES is a cross-sectional survey conducted by the CDC that combines in-home interviews, dietary recall, and standardized physical examinations (including laboratory measurements) in a complex probability sample designed to be nationally representative of the civilian non-institutionalized US population. This combination of self-report and objective physical measurement — including biomarkers — is rare in public health surveillance and enables analysis of conditions not captured in administrative data.

    **Concept Tested:** NHANES Data Structure

---

#### 3. In the context of data cleaning, "outlier detection" is important because:

<div class="upper-alpha" markdown>
1. Extreme values are always errors that must be removed before analysis
2. Outliers may represent data entry errors, measurement problems, or genuinely unusual observations that each require different handling
3. Statistical tests require all observations to be within two standard deviations of the mean
4. Most public health datasets contain at least 10% outlier observations by standard definitions
</div>
??? question "Show Answer"
    The correct answer is **B**. Outlier detection identifies values that are inconsistent with the expected distribution of a variable. The key judgment is whether the outlier represents: a data entry error (fix or flag), an equipment or measurement error (investigate and possibly exclude), or a genuine extreme observation (retain, investigate, and report transparently). Automatically removing outliers without investigation can introduce bias by discarding valid data from unusual but real cases — particularly important in public health where rare extreme events may be scientifically significant.

    **Concept Tested:** Outlier Detection in Data Cleaning

---

#### 4. Record linkage in public health combines data from multiple sources using:

<div class="upper-alpha" markdown>
1. A single unique identifier that is universally present across all datasets
2. Probabilistic matching on combinations of identifying variables when unique identifiers are unavailable
3. Randomization to assign records from one dataset to records in another
4. Spatial geocoding to join records based on approximate residential address
</div>
??? question "Show Answer"
    The correct answer is **B**. Probabilistic record linkage (Fellegi-Sunter method) computes match probabilities based on agreement/disagreement on multiple identifying variables — first name, last name, date of birth, sex, address — even when a universal identifier like Social Security Number is absent, inconsistently recorded, or protected. Linking health records to vital statistics, claims data, or social services data enables analyses not possible from any single source but requires careful quality assessment of match accuracy.

    **Concept Tested:** Probabilistic Record Linkage

---

#### 5. The Behavioral Risk Factor Surveillance System (BRFSS) is best characterized as:

<div class="upper-alpha" markdown>
1. A passive surveillance system based on electronic health record data from sentinel hospitals
2. A state-based telephone survey system that produces annual state-level estimates of health behaviors and risk factors
3. A national vital statistics system tracking birth and death records across all US states
4. A longitudinal cohort study following a nationally representative sample from birth to death
</div>
??? question "Show Answer"
    The correct answer is **B**. The BRFSS is the world's largest health survey, conducted annually by state health departments in collaboration with the CDC. It uses telephone interviews (landline and cellular) to collect data on health behaviors, chronic conditions, preventive services use, and social determinants across all 50 states plus DC and territories. The BRFSS produces state- and sometimes metropolitan-level estimates, enabling geographic comparisons not possible with national-only surveys.

    **Concept Tested:** BRFSS Survey Design

---

#### 6. A tidy data structure, as defined by Hadley Wickham, requires that:

<div class="upper-alpha" markdown>
1. All variables are stored in a single column, separated by commas
2. Each variable forms a column, each observation forms a row, and each observational unit forms a table
3. Data are sorted alphabetically by the primary identifier variable
4. Continuous variables are standardized to have mean zero and unit variance
</div>
??? question "Show Answer"
    The correct answer is **B**. Tidy data (Wickham 2014) is a consistent data structure that makes analysis and visualization easier: each variable is a column; each observation (one unit at one time point) is a row; and each type of observational unit is a separate table. Most real-world public health data arrive in "untidy" forms — wide format (one row per subject, multiple time points as columns), values in variable names, multiple variables in one column — that must be reshaped before analysis.

    **Concept Tested:** Tidy Data Structure

---

#### 7. Missing data classified as "Missing Completely at Random" (MCAR) means:

<div class="upper-alpha" markdown>
1. Missingness has no systematic relationship to any variable in the dataset, observed or unobserved
2. Missingness is related to other observed variables but not to the unobserved missing value itself
3. Missingness is related to the value of the missing variable — the data that would have been observed
4. Data are missing because participants deliberately skipped sensitive questions
</div>
??? question "Show Answer"
    The correct answer is **A**. Under MCAR, the probability of a value being missing is unrelated to both observed and unobserved data — missing is essentially random noise. Complete-case analysis is unbiased under MCAR. MAR (option B) means missingness depends on other observed variables but not the missing value itself — multiple imputation is valid. MNAR (option C) means missingness depends on the value that would have been observed — the hardest case, requiring sensitivity analysis. Option D describes one possible MNAR mechanism.

    **Concept Tested:** Missing Data Mechanisms (MCAR/MAR/MNAR)

---

#### 8. Version control using Git supports reproducibility in public health data science by:

<div class="upper-alpha" markdown>
1. Automatically backing up datasets to cloud storage at regular intervals
2. Maintaining a complete, auditable history of all changes to analytic code and enabling rollback to any previous state
3. Sharing analysis results directly with collaborators without email attachments
4. Encrypting sensitive health data to ensure HIPAA compliance
</div>
??? question "Show Answer"
    The correct answer is **B**. Git is a distributed version control system that records every change made to tracked files, with a commit message, timestamp, and author identity. This creates a complete, auditable trail of the analytic process — showing exactly what changed, when, and why. Researchers can return to any historical state, compare versions, collaborate without overwriting each other's work, and document the analytic decisions that led from raw data to published results.

    **Concept Tested:** Version Control for Reproducibility

---

#### 9. The National Vital Statistics System (NVSS) is the primary source for which type of public health data?

<div class="upper-alpha" markdown>
1. Hospital inpatient diagnoses and procedure codes
2. Birth and death records from all US states and territories
3. Prescription drug dispensing data from licensed pharmacies
4. Emergency department visit diagnoses in sentinel hospitals
</div>
??? question "Show Answer"
    The correct answer is **B**. The NVSS compiles and standardizes vital statistics — birth certificates, death certificates, fetal death reports, and marriage/divorce records — from all US states and territories through cooperative agreements with state vital registration systems. Mortality data from the NVSS (via death certificates) are the primary source for cause-of-death statistics, years of potential life lost calculations, and excess mortality analyses.

    **Concept Tested:** National Vital Statistics System

---

#### 10. Data governance in public health settings refers to:

<div class="upper-alpha" markdown>
1. Elected officials' authority to direct public health department data collection priorities
2. The policies, standards, and processes that ensure data quality, security, privacy, and appropriate use within and across organizations
3. The funding mechanisms that support ongoing public health surveillance systems
4. Statistical methodologies applied to ensure data accuracy before publication
</div>
??? question "Show Answer"
    The correct answer is **B**. Data governance encompasses the frameworks, policies, roles, and processes that manage how data are collected, stored, accessed, shared, and retired. In public health, governance must balance data utility (using data to improve population health) against privacy protection (HIPAA, state laws), security (preventing breaches), and data quality (ensuring accuracy and completeness). Good governance includes data stewardship roles, access control policies, de-identification standards, and inter-agency data sharing agreements.

    **Concept Tested:** Data Governance

---
