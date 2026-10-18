import type { PositionEntry } from "@/lib/cv/types";

export const experience: PositionEntry[] = [
  {
    id: "founder-haau3",
    title: "Founder",
    org: "haau3",
    location: "Brandon, FL",
    url: "https://haau3.com",
    orgId: "https://haau3.com/#organization",
    dates: { start: "2025-11", end: "present" },
    tags: ["ai", "product", "engineering", "clinical", "standards"],
    summary:
      "Consumer caregiving app and the B2B healthcare API platform behind it, started during a period of full-time family caregiving.",
    bullets: [
      {
        text: "Conceived and built haau3, a FHIR-native app that gathers a loved one's health records in one place, explains them in plain language, and shares exactly what the caregiver chooses with care teams.",
      },
      {
        text: "Took haau3 to general availability in the CMS Health Tech Ecosystem for both the Conversational AI and Kill the Clipboard use cases, recognized by CMS at the program's first-anniversary event in July 2026, and listed it in the CMS Medicare App Library; earned the DiMe Seal in April 2026.",
      },
      {
        text: "Shipped Kill the Clipboard sharing, which sends a curated record summary to a provider as an encrypted SMART Health Link or QR code, drawing on records retrieved through a partner connected to TEFCA and a CMS Aligned Network.",
      },
      {
        text: "Built an early SMART Health Check-in flow in which a provider's check-in page asks haau3 for records and forms before a visit, extending Kill the Clipboard from sharing into intake.",
      },
      {
        text: "Launched the haau3 platform in preview with a free developer plan: six FHIR APIs that power haau3 and are open to other builders, covering scheduling, terminology, provider directory, questionnaires, medication reconciliation, and Medicare Advantage and ACA plan benefits.",
      },
      {
        text: "Built the Scheduling API as a slot aggregator for HL7 SMART Scheduling Links and the Plan Benefits API from the plan files CMS publishes, the capabilities behind haau3's CMS Early Adopter pledges for Modern Scheduling and Real-Time Benefits.",
      },
      {
        text: "Designed the platform contract-first, with API-key authentication, an interactive reference generated from its contracts, and services built on public sources: the CMS National Provider Directory, CMS plan files, LOINC, and a pinned RxNorm release.",
      },
      {
        text: "Evolved medlistIQ into the platform's MedList API, which turns one patient's medication records into a single reconciled FHIR medication list with the source records behind every entry.",
      },
      {
        text: "Authored the haau3 FHIR Implementation Guide on US Core 6.1.0 and SDC 4.0.0, defining 39 profiles, 16 extensions, 3 operations, and 40 code systems and value sets behind the app and platform.",
      },
      {
        text: "Built Cora, haau3's English and Spanish text and voice assistant on Google Gemini under a HIPAA business associate agreement, grounded in a person's own records and vetted public reference material and storing no conversations; moved its UX from text to speech-to-speech on caregiver feedback.",
      },
      {
        text: "Designed Cora's Smart 40 evaluation: 40 scripted scenarios in text and voice, English and Spanish, run as hash-chained sealed runs and reviewed by a person against a pass bar set in advance; the latest run passed 39 of 40 with zero confirmed hard failures.",
      },
    ],
  },
  {
    id: "founder-bkf-media",
    title: "Founder & AI Product Lead",
    org: "Brian K. Fung Media LLC",
    location: "Brandon, FL",
    orgId: "https://www.briankfung.com/#organization",
    dates: { start: "2025-06", end: "present" },
    tags: ["ai", "product", "engineering", "leadership"],
    summary:
      "Parent company of haau3, and home to independent products and advisory work. Part-time alongside full-time caregiving until January 2026.",
    bullets: [
      {
        text: "Launched Unscripted Rx from 0-to-1 in August 2025 as a modern pharmacy residency directory on a knowledge graph of 30,000+ connected entities, including 3,000+ programs and 1,700+ organizations, with a ranked shortlist, crowd rankings, and claimable person pages.",
      },
      {
        text: "Grew Unscripted Rx organically to 36,000+ people and 80,000+ pages read in the twelve months to August 2026, with top-10 Google search visibility, weekly-refreshed stipend benchmarks by program type and state, and NAPLEX pass-rate comparisons by school.",
      },
      {
        text: "Built the Unscripted Rx organization side: free page claiming checked by a person, a recruiting events calendar listing 259 events across 80 organizations, program analytics, and a Standard plan adding event registration, reminders, and attendance lists.",
      },
      {
        text: "Built Ovant, a job search tool open to everyone: candidates talk or type about each role once, then get a resume written for any job they paste, an application tracker, the terms their saved postings reward, and warm-intro paths.",
      },
      {
        text: "Advise CEOs, CTOs, CPOs, and product and engineering leaders on AI-enabled product strategy, platform architecture, and EHR-integrated workflows.",
      },
    ],
  },
  {
    id: "family-caregiver",
    title: "Full-time Family Caregiver",
    org: "Career break",
    location: "Brandon, FL",
    dates: { start: "2025-03", end: "2026-01" },
    tags: ["clinical"],
    summary:
      "Took family medical leave from Verily in March 2025, then left in June to care full-time for a grandparent at home.",
    bullets: [
      {
        text: "Trained as a nursing assistant and became a Florida Certified Nursing Assistant in January 2026 to provide hands-on care at home.",
      },
    ],
  },
  {
    id: "verily-staff-architect",
    title: "Staff Clinical Informatics Data Architect",
    org: "Verily",
    location: "Fairfax, VA",
    dates: { start: "2024-09", end: "2025-06" },
    tags: ["ai", "clinical", "product", "standards", "leadership"],
    summary:
      "Promoted to Staff after earning the top company performance rating (5 of 5) in the preceding review cycle; rated significantly above expectations in three of six cycles overall and recognized with a 2024 Verily Values Award.",
    bullets: [
      {
        text: "Directed enterprise FHIR governance as an appointed member of Verily's FHIR Council, defining 200+ implementation guidance artifacts, semantic models, review patterns, and developer tooling, and leading a company-wide proposal for FHIR proficiency assessments.",
      },
      {
        text: "Designed evaluation frameworks comparing deterministic clinical reasoning with frontier LLM approaches for AI-assisted type 2 diabetes decision support, clarifying accuracy, explainability, safety, and implementation tradeoffs to guide Verily's clinical AI strategy.",
      },
      {
        text: "Shaped strategic direction for EHR integration through SMART on FHIR, pharmacy management, and externalization of Verily's care platforms, translating digitized care pathways into requirements for productized platform APIs.",
      },
      {
        text: "Launched Verily's first medical-coding enrichment modules, standardizing procedure (HCPCS) and immunization coding across products, by building a FHIR terminology service that combined BigQuery with a FHIR proxy to an enterprise terminology-management platform, alongside FHIR terminology data-quality measures.",
      },
      {
        text: "Led harmonization and enrichment of third-party health information exchange data, turning an ambiguous company initiative into a scoped delivery roadmap by mapping C-CDA-to-FHIR transformation complexity and educating cross-functional teams on the tradeoffs.",
      },
      {
        text: "Advanced a new market opportunity with a value-based care provider by digitizing its clinical care pathways, mapping concepts to FHIR value sets and configuring executable BPM+ models, starting with heart failure and expanding to additional pathways.",
      },
      {
        text: "Delivered the medical-device shipment backend within Verily's device-integration initiative, extending a unified device data model across first- and third-party devices in support of connected-care programs.",
      },
      {
        text: "Influenced engineering and product practice through internal publications on EHR integration, Epic data models, device data models, FHIRPath and CQL, and applications of LLMs, establishing shared collaboration channels between informatics and partner teams.",
      },
    ],
  },
  {
    id: "verily-senior-architect",
    title: "Senior Clinical Informatics Data Architect",
    org: "Verily",
    location: "Fairfax, VA",
    dates: { start: "2022-04", end: "2024-09" },
    tags: ["ai", "clinical", "product", "standards", "engineering", "teaching"],
    summary:
      "Partnered across product, engineering, UX, research, clinical, legal, and privacy teams to translate ambiguous user and clinical needs into implementation-ready architecture, earning 10+ cross-team peer bonuses and mentoring pharmacy informatics interns and early-career engineers.",
    bullets: [
      {
        text: "Drove the Q1 2024 launch of Lightpath for type 1 diabetes with Highmark, earning a director spot bonus and an engineering peer bonus, by resolving launch-critical issues and automating device fulfillment from CRM through FHIR to BigQuery.",
      },
      {
        text: "Led semantic and workflow architecture using BPM+ and FHIR, producing 100+ CMMN, BPMN, DMN, and data artifacts that connected user journeys and clinical logic to APIs, decisions, and data contracts across all care teams.",
      },
      {
        text: "Shipped the clinical content behind the Verily Value Suite MVP, a flagship 2022 launch, by modeling 140+ Mayo Clinic heart-failure (HFrEF) pathway concepts into executable decision models and authoring the company's BPM+ modeling style guide.",
      },
      {
        text: "Established Verily's enterprise terminology-management capability by leading vendor analysis and selection of a clinical terminology and content-management platform, co-leading its implementation, and launching terminology extracts into BigQuery.",
      },
      {
        text: "Scaled care-pathway authoring beyond the informatics team by enlisting 20+ clinical data managers as authors, fully automating QA/QC of new models with a CI/CD pipeline, and creating FHIR and BPM+ curricula, including 14 tutorial videos among the company's most-viewed internal documentation.",
      },
      {
        text: "Standardized race and ethnicity data capture across Verily against federal standards and contributed key designs for laboratory results and error handling, care surveys, and professional task workflows adopted by all care teams.",
      },
      {
        text: "Partnered with data science teams throughout as the clinical and informatics subject-matter expert to build, train, and evaluate machine-learning and deep-learning applications across care programs, shaping training data, clinical validity, and FHIR-aligned model outputs.",
      },
      {
        text: "Designed Onduo's medication-review pipeline with data science and engineering, authoring the specification mapping model outputs to FHIR and proposing therapeutic-class-to-NDC eligibility mappings using a commercial drug compendium, aligned to ADA 2023 guidelines.",
      },
      {
        text: "Prototyped executable DMN and BPMN clinical decision models, spanning cardiac assessment, KCCQ-12 scoring, and an end-to-end CMS Enhanced Oncology Model flow, that guided Verily's strategic selection of care-pathway tooling.",
      },
      {
        text: "Organized and mapped 145 clinical concepts from the Mayo care-pathway program to UMLS, controlled vocabularies, and HL7 FHIR within the first months of joining, reconciling Mayo's existing decision models to eliminate duplicated mapping work.",
      },
      {
        text: "Served as Verily's pharmacist subject-matter expert for medications, pharmacy, and clinical workflows, consulting across product areas and delivering pharmacy cost-savings analyses, including IV-to-PO conversion opportunities for cardiac surgery populations.",
      },
    ],
  },
  {
    id: "mayo-clinical-informatics-pharmacist",
    title: "Clinical Informatics Pharmacist",
    org: "Mayo Clinic",
    location: "Rochester, MN",
    dates: { start: "2015-07", end: "2022-04" },
    tags: ["clinical", "product", "standards", "leadership"],
    bullets: [
      {
        text: "Led end-to-end product and workflow transformation across four Epic module implementations, covering antimicrobial stewardship, infection control, clinical decision support, and Willow pharmacy, spanning 80 hospitals and clinics within a $1.5B enterprise program, from discovery and requirements through validation, training, rollout, and iteration.",
      },
      {
        text: "Modernized a 25+ year rules-based antimicrobial monitoring platform, converting 75+ custom legacy rules from CBAM and TheraDoc into Epic through 2.5 years of system discovery, workflow redesign, decision-support configuration, testing, and production deployment.",
      },
      {
        text: "Built NHSN regulatory reporting for CAUTI, CLABSI, SSI, VAE, and LabID events, plus internal surveillance reporting for bloodstream infections, carbapenem-resistant organisms, and multidrug-resistant organisms, with a distribution strategy designed for low ongoing maintenance.",
      },
      {
        text: "Designed physician-facing reminder alerts for catheter-associated urinary tract infection, central line-associated bloodstream infection, and umbilical catheters, and coordinated the enterprise prevention workflows behind them.",
      },
      {
        text: "Enabled bidirectional laboratory interoperability between Mayo's SOFT laboratory system and two of the largest external reference labs, Quest Diagnostics and Labcorp, integrating 10,000+ external microbiology records by mapping laboratory tests, organisms, and susceptibilities with LOINC and SNOMED CT.",
      },
      {
        text: "Converged an enterprise list of indications for all systemic antimicrobials and built them into Epic, alongside restricted medication workflows using alternatives, order questions, best practice advisories, and scoring.",
      },
    ],
  },
  {
    id: "onc-graduate-intern",
    title: "Graduate Student Intern",
    org: "Office of the National Coordinator for Health IT",
    location: "Washington, DC",
    dates: { start: "2019-06", end: "2020-05" },
    tags: ["standards", "clinical", "research"],
    summary:
      "MPH practicum and capstone placement, concurrent with Mayo Clinic. Practicum supervisor: Debbie Bucci. Capstone advisor: Thomas Mason, MD.",
    bullets: [
      {
        text: "Assisted in drafting the electronic prescribing sections for the ONC's Cures Act Final Rule, fulfilling provisions of the 21st Century Cures Act.",
      },
      {
        text: "Assisted in summarizing public comments on the ONC's Cures Act proposed rule during the notice of proposed rulemaking for electronic prescribing.",
      },
      {
        text: "Analyzed the implications of the 21st Century Cures Act on clinician burden attributable to health information technology and electronic health records, work that became the MPH capstone.",
      },
      {
        text: "Coordinated a one-day national stakeholder symposium on patient matching for prescription drug monitoring programs.",
      },
    ],
  },
  {
    id: "va-pharmacy-intern",
    title: "Pharmacy Intern",
    org: "Malcom Randall Veterans Affairs Medical Center",
    location: "Gainesville, FL",
    dates: { start: "2011-06", end: "2011-08" },
    tags: ["clinical"],
  },
  {
    id: "walgreens-pharmacy-intern",
    title: "Pharmacy Intern",
    org: "Walgreens",
    location: "Boynton Beach, FL",
    dates: { start: "2010-06", end: "2010-08" },
    tags: ["clinical"],
  },
];
