import type { ProjectEntry } from "@/lib/cv/types";

export const projects: ProjectEntry[] = [
  {
    id: "proj-ovant",
    name: "Ovant",
    tagline:
      "Job search product that builds a structured record of a candidate's experience through conversational AI interviews, then writes resumes tailored to a specific role from it, tracks applications, surfaces the keywords a posting rewards, and finds warm referral paths.",
    url: "https://www.ovant.org",
    dates: { start: "2026-07", end: "present" },
    stack: ["Next.js", "TypeScript", "Postgres", "Anthropic API"],
    tags: ["ai", "product", "engineering"],
  },
  {
    id: "proj-haau3-platform",
    name: "haau3 platform",
    tagline:
      "B2B platform of microservice APIs that powers haau3 and is available to other organizations. Ships a scheduling slot aggregator conforming to the HL7 SMART Scheduling Links implementation guide, and a FHIR terminology service.",
    url: "https://platform.haau3.com",
    dates: { start: "2026-05", end: "present" },
    stack: ["FHIR", "SMART Scheduling Links", "LOINC", "TypeScript"],
    tags: ["standards", "engineering", "product"],
  },
  {
    id: "proj-haau3",
    name: "haau3",
    tagline:
      "FHIR-native, AI-powered care management that unifies longitudinal health records so caregivers can focus on the human side of care. Generally available and listed in the CMS Medicare App Library.",
    url: "https://haau3.com",
    dates: { start: "2025-11", end: "present" },
    stack: ["Next.js", "TypeScript", "FHIR", "GCP"],
    tags: ["ai", "product", "clinical", "engineering"],
  },
  {
    id: "proj-cora",
    name: "Cora",
    partOf: "proj-haau3",
    tagline:
      "Multilingual text and voice conversational AI assistant grounded in patient-authorized records, with source-linked explanations. Deployed independently on GCP and integrated into haau3.",
    dates: { start: "2025-11", end: "present" },
    stack: ["Gemini Live", "RAG", "TypeScript"],
    tags: ["ai", "product", "clinical"],
  },
  {
    id: "proj-unscripted-rx",
    name: "Unscripted Rx",
    tagline:
      "Pharmacy workforce and recruiting discovery product with 30,000+ connected entities and AI-assisted job-posting ingestion.",
    url: "https://unscripted-rx.com",
    dates: { start: "2025-08", end: "present" },
    stack: ["Next.js", "TypeScript", "Vercel"],
    tags: ["ai", "product", "engineering"],
  },
  {
    id: "proj-medlistiq",
    name: "medlistIQ",
    tagline:
      "API that embeds informatics pharmacist expertise to turn messy, multi-source FHIR medication data into a clean, inferred medication list.",
    url: "https://medlistiq.com",
    dates: { start: "2026-04", end: "present" },
    stack: ["FHIR", "RxNorm", "TypeScript"],
    tags: ["clinical", "engineering", "standards"],
  },
  {
    id: "proj-openclintech",
    name: "OpenClinTech",
    tagline:
      "Open and accessible initiative training the next generation of clinician engineers.",
    url: "https://openclintech.com",
    dates: { start: "2023", end: "present" },
    tags: ["teaching", "engineering", "leadership"],
  },
  {
    id: "proj-tecc",
    name: "Technology-Enabled Chronic Care",
    tagline:
      "Cardio-kidney-metabolic care using FHIR, CDS Hooks, and programmatic terminology services, aligned with CMS ACCESS and FDA TEMPO.",
    url: "https://tecc.dev",
    dates: { start: "2025-12", end: "present" },
    stack: ["FHIR", "CDS Hooks"],
    tags: ["clinical", "standards", "research"],
  },
  {
    id: "proj-pubmed-ai",
    name: "PubMed AI",
    tagline:
      "Retrieval-augmented literature search and summarization over the PubMed corpus, answering a question with cited sources.",
    dates: { start: "2024", end: "2024" },
    stack: ["Python", "RAG"],
    tags: ["ai", "research"],
  },
  {
    id: "proj-terminology-server",
    name: "Healthcare Terminology Server",
    tagline:
      "Web application for clinicians and informaticists to run terminology server operations in a modern UI, covering RxNorm, SNOMED CT, NPI, and LOINC.",
    url: "https://terminology-service.vercel.app/",
    dates: { start: "2025-04", end: "present" },
    stack: ["TypeScript", "SNOMED CT", "LOINC", "RxNorm"],
    tags: ["standards", "engineering", "clinical"],
  },
  {
    id: "proj-npi-directory",
    name: "NPI Directory",
    tagline:
      "Lookup for clinicians by National Provider Identifier or name, exposed both as an interactive frontend and as a FHIR terminology service $lookup endpoint.",
    dates: { start: "2025-04", end: "present" },
    stack: ["TypeScript", "FHIR"],
    tags: ["standards", "engineering"],
  },
  {
    id: "proj-cardiac-3d",
    name: "Cardiac 3D Reconstruction",
    tagline:
      "Python project exploring 3D reconstruction of the heart from imaging modalities, focused on accessible 2D echocardiography images.",
    url: "https://github.com/briankfung/cardiac-3d-reconstruction",
    dates: { start: "2023-06", end: "2023-06" },
    stack: ["Python"],
    tags: ["research", "engineering", "clinical"],
  },
  {
    id: "proj-public-fhir-server",
    name: "Public FHIR Server",
    tagline:
      "TypeScript and Postgres implementation of core FHIR R4 resource operations, deployed publicly for learning and reference.",
    url: "https://public-fhir-server.vercel.app",
    dates: { start: "2025-12", end: "2025-12" },
    stack: ["TypeScript", "Neon Postgres", "Vercel"],
    tags: ["engineering", "standards"],
  },
  {
    id: "proj-fhir-types",
    name: "@briankfung/fhir-types",
    tagline:
      "Hand-rolled FHIR R4 TypeScript types published as a public npm package.",
    url: "https://www.npmjs.com/package/@briankfung/fhir-types",
    dates: { start: "2025-12", end: "2025-12" },
    stack: ["TypeScript"],
    tags: ["engineering", "standards"],
  },
];
