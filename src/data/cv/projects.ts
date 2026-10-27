import type { ProjectEntry } from "@/lib/cv/types";

export const projects: ProjectEntry[] = [
  {
    id: "proj-ovant",
    name: "Ovant",
    tagline:
      "Job search tool, open to everyone, that builds a knowledge base of a candidate's career from an imported resume and what they say or type about each role, then writes a resume for any job they paste, tracks applications, ranks the terms their saved postings reward, and finds warm-intro paths.",
    url: "https://www.ovant.org",
    dates: { start: "2026-07", end: "present" },
    stack: ["Next.js", "TypeScript", "Postgres", "Anthropic API"],
    tags: ["ai", "product", "engineering"],
  },
  {
    id: "proj-haau3-platform",
    name: "haau3 platform",
    tagline:
      "Healthcare API platform, in preview with a free developer plan, that powers haau3 and is open to other builders: six FHIR APIs for scheduling (HL7 SMART Scheduling Links), terminology, provider directory, questionnaires, medication reconciliation, and Medicare Advantage and ACA plan benefits.",
    url: "https://platform.haau3.com",
    dates: { start: "2026-06", end: "present" },
    stack: ["FHIR", "SMART Scheduling Links", "LOINC", "RxNorm", "OpenAPI", "TypeScript"],
    tags: ["standards", "engineering", "product"],
  },
  {
    id: "proj-haau3-ig",
    name: "haau3 FHIR Implementation Guide",
    partOf: "proj-haau3-platform",
    tagline:
      "FHIR implementation guide on US Core 6.1.0 and SDC 4.0.0 defining the profiles, extensions, operations, and terminology behind the haau3 app and platform.",
    url: "https://fhir.haau3.com",
    dates: { start: "2026-05", end: "present" },
    stack: ["FHIR", "US Core", "SDC", "FHIR Shorthand"],
    tags: ["standards", "engineering"],
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
      "English and Spanish text and voice assistant that explains a person's own health records in plain language, grounded in vetted public reference material. Evaluated with the Smart 40 suite.",
    dates: { start: "2025-11", end: "present" },
    stack: ["Gemini Live", "RAG", "TypeScript"],
    tags: ["ai", "product", "clinical"],
  },
  {
    id: "proj-unscripted-rx",
    name: "Unscripted Rx",
    tagline:
      "Modern pharmacy residency directory and recruiting events platform on a knowledge graph of 30,000+ connected entities, including 3,000+ programs and 1,700+ organizations.",
    url: "https://www.unscripted-rx.com",
    dates: { start: "2025-08", end: "present" },
    stack: ["Next.js", "TypeScript", "Vercel"],
    tags: ["product", "engineering"],
  },
  {
    id: "proj-us-pharmacy-ig",
    name: "US Pharmacy FHIR Implementation Guide",
    partOf: "proj-unscripted-rx",
    tagline:
      "Work-in-progress FHIR R4 implementation guide for US pharmacy, published by Unscripted Rx and built live on stream, starting with pharmacists and their licenses, degrees, and board certifications.",
    url: "https://build.fhir.org/ig/unscripted-rx/us-pharmacy-fhir-ig/",
    dates: { start: "2026-10", end: "present" },
    bullets: [
      {
        text: "Building it live in the Modeling US Pharmacy using HL7 FHIR series, streamed to YouTube, LinkedIn, Facebook, and Twitch.",
        links: [
          {
            text: "Modeling US Pharmacy using HL7 FHIR",
            href: "https://www.youtube.com/playlist?list=PLP28Q1m8c58E",
          },
        ],
      },
    ],
    stack: ["FHIR", "FHIR Shorthand"],
    tags: ["standards", "teaching"],
  },
  {
    id: "proj-medlistiq",
    name: "medlistIQ",
    tagline:
      "API that embeds informatics pharmacist expertise to turn messy, multi-source FHIR medication data into a clean, inferred medication list. Evolved into the haau3 platform's MedList API.",
    url: "https://medlistiq.com",
    dates: { start: "2026-04", end: "2026-05" },
    stack: ["FHIR", "RxNorm", "TypeScript"],
    tags: ["clinical", "engineering", "standards"],
  },
  {
    id: "proj-cv-web-app",
    name: "CV Web App",
    tagline:
      "Open-source CV pipeline that renders one typed data source as both an indexable website and a LaTeX-typeset PDF, published as a reference implementation others can fork.",
    url: "https://github.com/briankfung/cv",
    dates: { start: "2026-07", end: "present" },
    stack: ["Next.js", "TypeScript", "LaTeX", "Vercel"],
    tags: ["engineering", "product"],
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
    dates: { start: "2025-12", end: "2025-12" },
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
    dates: { start: "2025-04", end: "2025-04" },
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
      "Python imaging project exploring methods for 3D reconstruction of the heart from 3D echocardiography images to predict ejection fraction.",
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
