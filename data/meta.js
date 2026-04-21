// data/meta.js
// ─────────────────────────────────────────────────────────────────────────────
// This file contains a collective summary of all indexed papers.
// It is automatically included in EVERY query sent to the LLM, so it helps
// answer cross-paper questions like:
//   - "Which paper has the most evidence about X?"
//   - "What do the papers collectively say about Y?"
//   - "How do the papers relate to each other?"
//
// Edit this file whenever you add or remove papers from the collection.
// Keep it concise — aim for 300-600 words total.
// ─────────────────────────────────────────────────────────────────────────────

const meta = {

  // A one-paragraph description of the collection as a whole
  collectionSummary: `
    This collection comprises six peer-reviewed studies focused on the intersection of 
    severe mental illness (SMI), ethnicity, migration, and cardiometabolic health — 
    particularly type 2 diabetes mellitus (T2DM) — in urban, multiethnic UK populations. 
    Together, the papers draw on large electronic health record datasets from South and 
    East London, as well as population-representative cohorts, to examine inequalities 
    in diabetes risk, mortality, and prediction. The collection spans epidemiological 
    cohort studies, cross-sectional analyses, predictive modelling, and genetic 
    epidemiology, providing both observational evidence and methodological advances.
  `,

  // A brief summary of each paper and its key contribution to the collection.
  // List them in a way that makes cross-paper reasoning easy.
  paperSummaries: [
    {
      id: "Diabetologia2026",
      shortTitle: "Shamsutdinova et al. 2026 (Diabetologia)",
      contribution: `The most direct evidence on migration and diabetes. Uses a longitudinal 
        cohort of 340,000 adults in South London (2012–2019) to show that being born outside 
        Great Britain independently increases T2DM risk by ~30% across all ethnic groups. 
        Also shows South Asian, Black African, and Black Caribbean groups have 2–3x higher 
        T2DM risk than White British, and that depression/anxiety and severe mental illness 
        are independently associated with higher T2DM risk. Migration, ethnicity, and mental 
        health each contribute separately to diabetes inequalities.`
    },
    {
      id: "IJMI2023",
      shortTitle: "Shamsutdinova et al. 2023 (Int J Medical Informatics)",
      contribution: `Focused on predictive modelling for T2DM in people with SMI. 
        Uses a cross-sectional sample of 674,000 adults in East London, with 10,159 people 
        with SMI. Develops and validates a T2DM prevalence model (logistic regression + 
        XGBoost ensemble, AUC 0.83) specifically for people with SMI. Finds ethnicity is 
        the most important predictor after age. Projects a 2.14% increase in T2DM prevalence 
        in the East London SMI population over 20 years due to demographic change.`
    },
    {
      id: "PsychiatricGenetics2023",
      shortTitle: "Shamsutdinova et al. 2023 (Psychiatric Genetics)",
      contribution: `Genetic epidemiology study examining whether schizophrenia polygenic 
        risk score (PGS-SZ) is associated with T2DM onset in people without schizophrenia. 
        Uses English Longitudinal Study of Ageing (n=5,968). Finds no significant association 
        (HR 1.04), suggesting that the clinical link between schizophrenia and T2DM is driven 
        more by environmental/medication factors than shared intrinsic biology.`
    },
    {
      id: "DiabeticMedicine2016",
      shortTitle: "2016 (Diabetic Medicine)",
      contribution: `Cross-sectional study of 588,408 adults in London primary care. 
        Shows T2DM prevalence is 16% in people with SMI vs 7.6% without. The relative risk 
        is highest in young adults (up to ~10x in 18–34 year olds). Ethnic minority groups 
        with SMI have the highest absolute diabetes burden (e.g. ~64% prevalence in 
        Bangladeshi people aged 55+ with SMI). Antipsychotic adjustment only marginally 
        attenuates associations.`
    },
    {
      id: "LancetPsychiatry2017",
      shortTitle: "Das-Munshi et al. 2017 (Lancet Psychiatry)",
      contribution: `Longitudinal cohort study of 18,201 people with SMI at South London 
        and Maudsley Trust. Examines all-cause and cause-specific mortality by ethnicity. 
        Finds SMI associated with ~3x higher mortality than general population across all 
        ethnic groups. Suicide mortality ~8x higher, cardiovascular ~2.7x higher. 
        Within the SMI cohort, ethnic minority groups have lower mortality than White British, 
        suggesting a relative survival advantage despite higher absolute disease burden.`
    },
    {
      id: "BMJ2023",
      shortTitle: "Cybulski et al. 2023 (BMJ Open)",
      contribution: `Methodological study describing linkage of mental health records from 
        South London and Maudsley NHS Trust to the 2011 UK Census (459,374 individuals, 
        50.4% match rate). Identifies that young adults, deprived groups, and ethnic minorities 
        are less likely to be linked. Demonstrates that inverse probability weighting can 
        adjust for non-linkage bias. Provides the foundational dataset enabling socioeconomic 
        analyses of psychiatric disorders. Confirms ~2.7x higher mortality in people with 
        any psychiatric disorder.`
    }
  ],

  // Key themes that cut across multiple papers — useful for synthesis questions
  crossCuttingThemes: [
    "Ethnic inequalities in T2DM risk are consistent across all papers, with South Asian and Black groups most affected.",
    "Migration status is an independent risk factor for T2DM, most directly evidenced in the Diabetologia 2026 paper.",
    "Severe mental illness consistently doubles or more the risk of T2DM across all study designs and populations.",
    "The excess risk associated with SMI is highest in younger age groups and ethnic minorities.",
    "Antipsychotic medication explains only a small part of the SMI-diabetes association.",
    "Shared genetics between schizophrenia and T2DM appear to play a limited role (Psychiatric Genetics 2023).",
    "People with SMI have substantially higher mortality than the general population, from multiple causes.",
    "Large South London datasets (SLaM, primary care records) underpin most of the evidence in this collection."
  ]

};

export default meta;
