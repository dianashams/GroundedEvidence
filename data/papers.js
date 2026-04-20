// data/papers.js
// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to add, remove, or update papers shown on the home page.
// Each paper object has the following fields:
//
//   id          - unique short identifier, no spaces (e.g. "smith2023")
//   title       - full paper title
//   authors     - authors as a string (e.g. "Smith J, Jones A, Lee K")
//   year        - publication year
//   journal     - journal or conference name
//   abstract    - full abstract text
//   keyFindings - array of 3-5 bullet point strings summarising key findings
//   pdfUrl      - URL to the PDF (can be a link to PubMed, journal, or your own hosted PDF)
//
// ─────────────────────────────────────────────────────────────────────────────
  // Add more papers below by copying the block above and filling in the details.
  // Example:
  //
  // {
  //   id: "jones2023",
  //   title: "Another Paper Title",
  //   authors: "Jones A, Smith B",
  //   year: 2023,
  //   journal: "The Lancet",
  //   abstract: "Abstract text here...",
  //   keyFindings: [
  //     "Finding one",
  //     "Finding two",
  //   ],
  //   pdfUrl: "https://journals.lww.com/psychgenetics/fulltext/2023/10000/schizophrenia_polygenic_risk_score_and_type_2.3.aspx",
  // },

const papers = [

  {
    id: "Diabetologia2026",
    title: "Inequalities in type 2 diabetes incidence in a multiethnic population: a cohort study investigating the impact of ethnicity, migration and mental health comorbidities",
    authors: "Shamsutdinova D, Stahl D, Das-Munshi J",
    year: 2026,
    journal: "Diabetologia",
    abstract: "Background and aims Ethnic disparities in type 2 diabetes mellitus (T2DM) are well-documented in multiethnic urban populations, but the contributions of migration status and mental health are less understood. This study utilises a large dataset from South London that uniquely includes migration-related information along with mental and physical health comorbidities. We aimed to assess how migration status and mental health contribute to longitudinal associations of ethnicity and T2DM risk in a multiethnic urban population. Methods We conducted a longitudinal (2012–2019) cohort study of 340,000 adults without baseline T2DM. Cox proportional hazards models were applied with sequential adjustments for age and sex, migration status, and mental and physical health conditions as well as area-level deprivation. Results South Asian, Black African, and Black Caribbean groups had 2–3-fold higher T2DM risk compared to White British individuals, only partially explained by socioeconomic and clinical factors. Being born outside Great Britain increased T2DM risk by around 30% across all ethnic groups. Depression/anxiety and severe mental illness were associated with higher T2DM risk, with no strong evidence of interaction effects. Conclusion Ethnicity, migration status, and mental health conditions were each independently associated with T2DM risk, and ethnic disparities persisted after adjustment. These findings suggest that migration- and mental health–related mechanisms operate similarly across ethnic groups and that reducing diabetes inequalities will require addressing both post-migration challenges and broader structural determinants.",
    keyFindings: [
      "South Asian, Black African, and Black Caribbean groups had approximately 2–3 times higher T2DM incidence than White British individuals",
      "Being born outside Great Britain was associated with around a 30% higher risk of developing T2DM across all ethnic groups",
      "Depression and anxiety were linked to a modest increase in T2DM risk, while severe mental illness nearly doubled the risk",
      "Adjusting for migration status, mental health, physical health, and deprivation only partially explained ethnic inequalities",
      "No strong interaction effects were observed, suggesting largely independent contributions of ethnicity, migration, and mental health to T2DM risk"
    ],
    pdfUrl: "https://kclpure.kcl.ac.uk/portal/en/publications/d98f6dce-f59f-4983-ac34-f00381b65cc5",
  },



{
  id: "IJMI2023",
  title: "Predicting type 2 diabetes prevalence for people with severe mental illness in a multi-ethnic East London population",
  authors: "Shamsutdinova D, Das-Munshi J, Ashworth M, Roberts A, Stahl D",
  year: 2023,
  journal: "International Journal of Medical Informatics",
  abstract: `
Background and aims. Prevalence of type two diabetes mellitus (T2DM) in people with severe mental illness (SMI) is 2–3 times higher than in the general population. Predictive modelling has advanced greatly in the past decade, and it is important to apply cutting-edge methods to vulnerable groups. However, few T2DM prediction models account for the presence of mental illness, and none have been developed specifically for people with SMI. Therefore, we aimed to develop and internally validate a T2DM prevalence model for people with SMI.

Methods. We utilised a large cross-sectional sample representative of a multi-ethnic population from London (674,000 adults). A total of 10,159 people with SMI formed our analytical sample, including 1,513 T2DM cases. We fitted a linear logistic regression and XGBoost as stand-alone models and as a stacked ensemble. Predictors included age, sex, body mass index, ethnicity, area-based deprivation, past hypertension, cardiovascular diseases, prescribed antipsychotics, and SMI illness characteristics.

Results. Logistic regression performed well in detecting T2DM presence for people with SMI, with an area under the receiver operating characteristic curve (ROC-AUC) of 0.83 (95% CI 0.79–0.87). XGBoost and the LR–XGBoost ensemble performed equally well, indicating a negligible contribution of non-linear terms to predictive power. Ethnicity was the most important predictor after age. Using the model, we estimated a 2.14% (95% CI 2.03–2.24%) increase in T2DM prevalence in the East London SMI population over the next 20 years, driven by projected demographic change.

Conclusions. Primary care data provide sufficient information for well-performing T2DM prevalence models in people with SMI. Thorough internal cross-validation of linear and machine-learning models can help quantify the predictive value of non-linearity in routinely collected healthcare data.
`,

  keyFindings: [
    "Logistic regression predicted T2DM in people with SMI with good discrimination (ROC-AUC 0.83).",
    "Machine-learning models and stacked ensembles did not improve performance over linear models.",
    "Ethnicity was the strongest predictor of T2DM after age.",
    "Primary care data are sufficient for building accurate diabetes prevalence models for SMI.",
    "Demographic change alone may increase T2DM prevalence in people with SMI by ~2% over 20 years."
  ],
  pdfUrl: "https://www.sciencedirect.com/science/article/pii/S1386505623000369",
},



{ 
   id: "PsychiatricGenetics2023",
    title: "Schizophrenia polygenic risk score and type 2 diabetes onset in older adults with no schizophrenia diagnosis",
    authors: "Shamsutdinova D, Ajnakina O, Roberts A, Stahl D",
    year: 2023, 
    journal: "Psychiatric Genetics",
    abstract: "Objectives. An association between type 2 diabetes (T2DM) and schizophrenia has long been observed, and recent 	research revealed presence of shared genetic factors. However, epidemiological evidence was inconsistent, some reported insignificant contribution of genetic factors to T2DM-schizophrenia comorbidity. Prior works studied people with schizophrenia, particularly, antipsychotic-naive patients, or those during the first psychotic experience to limit schizophrenia-related environmental factors. In contrast, we controlled such factors by utilizing a general population sample of individuals undiagnosed with schizophrenia. We hypothesized that if schizophrenia genetics impact T2DM development and such impact is not fully mediated by schizophrenia-related environment, people with high polygenic schizophrenia risk would exhibit elevated T2DM incidence. Methods. Using a population-representative sample of adults aged ≥50 from English Longitudinal Study of Ageing (n = 5968, 493 T2DM cases, average follow-up 8.7 years), we investigated if schizophrenia polygenic risk score (PGS-SZ) is associated with T2DM onset. A proportional hazards model with interval censoring was adjusted for age and sex (Model 1), and age, sex, BMI, hypertension, cardiovascular diseases, exercise, smoking, depressive symptoms and T2DM polygenic risk score (Model 2). According to the power calculations, hazard rates > 1.14 per standard deviation in PGS-SZ could be detected. Results.  We did not observe a significant association between PGS-SZ and T2DM incidence (hazard ratio 1.04; 95% CI 0.93–1.15; and 1.01, 95% CI 0.94–1.09). Conclusion.  Our results suggest low contribution of the intrinsic biological mechanisms driven by the polygenic risk of schizophrenia on future T2DM onset. Further research is needed.",

     keyFindings: [
       "Our results provide alternative evidence suggestive of the low contribution of the intrinsic biological mechanisms driven by the polygenic risk of schizophrenia on a future T2DM onset.",
	"By undertaking a quantitative approach we could estimate a 30% population-wide upper limit on aggregated polygenic risk to schizophrenia’s impact on the instantaneous T2DM risk, compared to a median risk in the population. ",
	"Nevertheless, we do not exclude that schizophrenia-related environmental factors play a confounding or intermediating role in the clinical association of T2DM and schizophrenia, which we could not test in our setting, or that PGS-SZ did not fully represent schizophrenia-related genetic risk underlying T2DM development leading to a negative finding. Further research is needed.",
     ],
     pdfUrl: "https://journals.lww.com/psychgenetics/fulltext/2023/10000/schizophrenia_polygenic_risk_score_and_type_2.3.aspx",
   },


{ 
   id: "DiabeticMedicine2016",
    title: "Type 2 diabetes mellitus in people with severe mental illness: inequalities by ethnicity and age. Cross-sectional analysis of 588 408 records from the UK",
    authors: "Das-Munshi J, Ashworth M, Dewey M, Gaughran F, Hull S, Morgan C, Nazroo J, Petersen I,  Schofield P, Stewart R, Thornicroft G, Prince M",
    year: 2016, 
    journal: "Diabetic Medicine",
    abstract: "Aims. To investigate whether the association of severe mental illness with Type 2 diabetes varies by ethnicity and age. Methods. We conducted a cross-sectional analysis of data from an ethnically diverse sample of 588 408 individuals aged ≥18 years, registered to 98% of general practices (primary care) in London, UK. The outcome of interest was prevalent Type 2 diabetes. Results. Relative to people without severe mental illness, the relative risk of Type 2 diabetes in people with severe mental illness was greatest in the youngest age groups. In the white British group the relative risks were 9.99 (95% CI 5.34, 18.69) in those aged 18–34 years, 2.89 (95% CI 2.43, 3.45) in those aged 35–54 years and 1.16 (95% CI 1.04, 1.30) in those aged ≥55 years, with similar trends across all ethnic minority groups. Additional adjustment for anti-psychotic prescriptions only marginally attenuated the associations. Assessment of estimated prevalence of Type 2 diabetes in severe mental illness by ethnicity (absolute measures of effect) indicated that the association between severe mental illness and Type 2 diabetes was more marked in ethnic minorities than in the white British group with severe mental illness, especially for Indian, Pakistani and Bangladeshi individuals with severe mental illness. Conclusions. The relative risk of Type 2 diabetes is elevated in younger populations. Most associations persisted despite adjustment for anti-psychotic prescriptions. Ethnic minority groups had a higher prevalence of Type 2 diabetes in the presence of severe mental illness. Future research and policy, particularly with respect to screening and clinical care for Type 2 diabetes in populations with severe mental illness, should take these findings into account.",

     keyFindings: [ "Severe mental illness (SMI) is linked to much higher diabetes risk: Overall 16.0% of people with SMI had type 2 diabetes, compared with 7.6% of people without SMI.", 
"The relative risk is highest in young adults: Among 18–34 year olds, people with SMI had up to ~10‑times higher risk of type 2 diabetes than peers without SMI (e.g. RR 9.8 in White British).",
"Ethnic minority groups with SMI have the highest diabetes burden: In people aged ≥55 with SMI, diabetes prevalence reached ~64% in Bangladeshi, compared with ~17% in White British people with SMI.",
"Medication does not fully explain the inequality: Adjusting for antipsychotic prescriptions only slightly reduced risk estimates, indicating most of the excess diabetes risk remains unexplained by medication alone.",
"Screening needs to start earlier and be targeted: Diabetes risk in people with SMI is already high by early adulthood, especially in ethnically diverse populations, supporting earlier and more proactive screening."
     ],
     pdfUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/dme.13298",
},

{  
  id: "LancetPsychiatry2017",
    title: "Ethnicity and excess mortality in severe mental illness: a cohort study",
    authors: "Das-Munshi J, Chang C, Dutta R, Morgan C, Nazroo J, Stewart R, Prince M",
    year: 2017, 
    journal: "Lancet Psychiatry",
    abstract: "Background Excess mortality in severe mental illness (defined here as schizophrenia, schizoaffective disorders, and bipolar affective disorders) is well described, but little is known about this inequality in ethnic minorities. We aimed to estimate excess mortality for people with severe mental illness for five ethnic groups (white British, black Caribbean, black African, south Asian, and Irish) and to assess the association of ethnicity with mortality risk. Methods We conducted a longitudinal cohort study of individuals with a valid diagnosis of severe mental illness between Jan 1, 2007, and Dec 31, 2014, from the case registry of the South London and Maudsley Trust (London, UK). We linked mortality data from the UK Office for National Statistics for the general population in England and Wales to our cohort, and determined all-cause and cause-specific mortality by ethnicity, standardised by age and sex to this population in 2011. We used Cox proportional hazards regression to estimate hazard ratios and a modified Cox regression, taking into account competing risks to derive sub-hazard ratios, for the association of ethnicity with all-cause and cause-specific mortality. Findings We identified 18 201 individuals with a valid diagnosis of severe mental illness (median follow-up 6·36 years, IQR 3·26–9·92), of whom 1767 died. Compared with the general population, age-and-sex-standardised mortality ratios (SMRs) in people with severe mental illness were increased for a range of causes, including suicides (7·65, 95% CI 6·43–9·04), non-suicide unnatural causes (4·01, 3·34–4·78), respiratory disease (3·38, 3·04–3·74), cardiovascular disease (2·65, 2·45–2·86), and cancers (1·45, 1·32–1·60). SMRs were broadly similar in different ethnic groups with severe mental illness, although the south Asian group had a reduced SMR for cancer mortality (0·49, 0·21–0·96). Within the cohort with severe mental illness, hazard ratios for all-cause mortality and sub hazard ratios for natural-cause and unnatural-cause mortality were lower in most ethnic minority groups relative to the white British group. Interpretation. People with severe mental illness have excess mortality relative to the general population irrespective of ethnicity. Among those with severe mental illness, some ethnic minorities have lower mortality than the white British group, for which the reasons deserve further investigation.",

     keyFindings: [ "People with severe mental illness (SMI) had almost three times higher overall mortality than the general population (standardised mortality ratio [SMR] 2.67, 95% CI 2.56–2.78).", 
"Cause‑specific mortality was markedly elevated in SMI: suicide mortality was ~8‑fold higher (SMR 7.65), non‑suicide unnatural causes ~4‑fold higher (SMR 4.01), respiratory mortality ~3.4‑fold higher (SMR 3.38), and cardiovascular mortality ~2.7‑fold higher (SMR 2.65).",
  "Excess mortality in SMI was observed across all ethnic groups; however, among people with SMI, Black African, Black Caribbean and South Asian groups had lower all‑cause mortality than White British people with SMI (adjusted hazard ratios generally 0.3–0.7 depending on group and time since diagnosis).",
  "Cancer mortality was elevated overall in SMI (SMR 1.45), but South Asian people with SMI had lower cancer mortality than expected compared with the general population (SMR 0.49, 95% CI 0.21–0.96).",
  "Findings were robust after accounting for emigration and competing risks, indicating that excess mortality affects people with SMI irrespective of ethnicity, while some ethnic minority groups experience comparatively lower mortality within the SMI population."
],
     pdfUrl: "https://www.thelancet.com/journals/lanpsy/article/PIIS2215-0366(17)30097-4/fulltext",
},


{  
  id: "BMJ2023",
    title: "Improving our understanding of the social determinants of mental health: a data linkage study of mental health records and the 2011 UK census",
    authors: "Cybulski L, Chilman N, Jewell A, Dewey M, Hildersley R, Morgan C, Huck R, Hotopf M, Stewart R, Pritchard M, Wuerth M, Das-­Munshi J",
    year: 2023, 
    journal: "BMJ Open",
    abstract: "Objectives To address the lack of individual-¬level socioeconomic information in electronic healthcare records, we linked the 2011 census of England and Wales to patient records from a large mental healthcare provider. This paper describes the linkage process and methods for mitigating bias due to non-¬ matching. Setting South London and Maudsley NHS Foundation Trust (SLaM), a mental healthcare provider in Southeast London. Design Clinical records from SLaM were supplied to the Office of National Statistics for linkage to the census through a deterministic matching algorithm. We examined clinical (International Classification of Disease- 10 diagnosis, history of hospitalisation, frequency of servicecontact) and socio-demographic (age, gender, ethnicity, deprivation) information recorded in Clinical Record Interactive Search (CRIS) as predictors of linkage success with the 2011 census. To assess and adjust for potential biases caused by non-matching, we evaluated inverse probability weighting for mortality associations. Participants Individuals of all ages in contact with SLaM up until December 2019 (N=459 374). Outcome measures Likelihood of mental health records’ linkage to census. Results 220 864 (50.4%) records from CRIS linked to the 2011 census. Young adults (prevalence ratio (PR) 0.80, 95% CI 0.80 to 0.81), individuals living in more deprived areas (PR 0.78, 95% CI 0.78 to 0.79) and minority ethnic groups (eg, Black African, PR 0.67, 0.66 to 0.68) were less likely to match to census. After implementing inverse probability weighting, we observed little change in the strength of association between clinical/demographic characteristics and mortality (eg, presence of any psychiatric disorder: unweighted PR 2.66, 95% CI 2.52 to 2.80; weighted PR 2.70, 95% CI 2.56 to 2.84). Conclusions Lower response rates to the 2011 census among people with psychiatric disorders may have contributed to lower match rates, a potential concern as the census informs service planning and allocation of resources. Due to its size and unique characteristics, the linked data set will enable novel investigations into the relationship between socioeconomic factors and psychiatric disorders. STRENGTHS AND LIMITATIONS:  This is the first time mental healthcare electronic records have been linked to the Office of National Statistics census at the individual-­ level in England. Due to its scale, ethnic diversity and demographic characteristics and abundance of detailed information on a variety of socioeconomic and demographic indicators acquired through the linkage to census records, this data set will enable novel investigations into the causes, trajectories and outcomes of psychiatric disorders. A significant strength of the study is that we could assess and adjust for potential biases caused by non-­ matching related to age, gender and deprivation. While we observed differences between individuals that matched to census, and those that did not, our weighted analyses were able to show that these differences did not substantially alter associations with mortality outcomes. Due to the nature of the deterministic linkage algorithm, we could not determine the causes of non-­linkage.",

     keyFindings: [
  "Around half of mental health records successfully linked to census data: 220,864 of 459,374 records matched to the 2011 UK census (50.4%).",
  "Linkage was less likely for young adults, deprived groups, and ethnic minorities: for example, ages 25–34 had lower match rates (PR 0.80, 95% CI 0.80–0.81), people in the most deprived areas had PR 0.78 (0.78–0.79), and Black African individuals had PR 0.67 (0.66–0.68) compared with White British.",
  "Men were slightly less likely than women to match to census records (PR 0.92, 95% CI 0.91–0.92), while older adults were more likely to match (age 65+, PR 1.31, 95% CI 1.29–1.34).",
  "Having any recorded psychiatric disorder increased mortality risk substantially: individuals with any psychiatric diagnosis had about 2.7 times higher all‑cause mortality than those without (unweighted PR 2.66, 95% CI 2.52–2.80; weighted PR 2.70, 95% CI 2.56–2.84).",
  "Adjusting for non‑linkage using inverse probability weighting made little difference to mortality estimates, indicating that incomplete census linkage did not materially bias associations between mental disorders, socio‑demographic factors, and mortality."
],
     pdfUrl: "https://bmjopen.bmj.com/content/bmjopen/14/1/e073582.full.pdf",
}

];


export default papers;