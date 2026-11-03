import type { VariantConfig } from "@/lib/cv/types";

/**
 * The same CV ordered for research roles. The summary and highlights lead
 * with evaluation and benchmark work, research projects come before
 * experience, and every other section is kept so the whole career stays on
 * record. Nothing here says anything the full CV does not.
 */
export const research: VariantConfig = {
  id: "research",
  label: "Research CV",
  filename: "brian-fung-research-cv",
  description: "Curriculum vitae ordered for research roles",
  summaryOverride:
    "Clinician-engineer building and evaluating software and AI for health care. Founder of haau3, a consumer caregiving app, and the haau3 platform, the suite of FHIR APIs behind it; designer of Cora's Smart 40 evaluation; and author of Phantom Codes, an open benchmark of hallucination, accuracy, and cost across 24 LLM and prompting configurations. Previously Staff Clinical Informatics Data Architect at Verily, where the work included evaluation frameworks comparing deterministic clinical reasoning with frontier LLM approaches, and an informatics pharmacist on Mayo Clinic's Epic transformation across 80 hospitals and clinics. Residency-trained pharmacist who contributed to the electronic prescribing sections of the ONC's 21st Century Cures Act Final Rule.",
  highlightsOverride: [
    "Designed Cora's Smart 40 evaluation: 40 scripted scenarios in text and voice, English and Spanish, run as hash-chained sealed runs and reviewed by a person against a pass bar set in advance; the latest run passed 39 of 40 with zero confirmed hard failures.",
    "Built Phantom Codes, an open benchmark of hallucination, hierarchical accuracy, abstention, robustness, and cost across 24 LLM and prompting configurations for medical concept normalization, with retrieval, classification, and string-matching baselines.",
    "Designed evaluation frameworks at Verily comparing deterministic clinical reasoning with frontier LLM approaches for AI-assisted type 2 diabetes decision support, and partnered with data science teams to build, train, and evaluate machine-learning models across care programs.",
    "Lead author of the HL7 SMART Scheduling Links FHIR Implementation Guide, and author of the haau3 FHIR Implementation Guide on US Core 6.1.0 and SDC 4.0.0, with 39 profiles, 16 extensions, and 3 operations.",
    "Founder of haau3, generally available in the CMS Health Tech Ecosystem and listed in the CMS Medicare App Library, and of the haau3 platform, six FHIR APIs in preview with a free developer plan.",
  ],
  sections: [
    { section: "profile", title: "Summary" },
    { section: "research", title: "Research Projects" },
    { section: "experience", title: "Professional Experience" },
    { section: "publications" },
    { section: "presentations", title: "Selected Presentations" },
    { section: "education" },
    { section: "training", title: "Postgraduate Training" },
    { section: "credentials", title: "Licensure & Certifications" },
    { section: "appointments", title: "Academic Appointments" },
    { section: "teaching", title: "Teaching" },
    { section: "service", title: "Professional Service & Leadership" },
    { section: "honors", title: "Honors & Awards" },
    { section: "projects", title: "Projects & Product Portfolio" },
    { section: "media", title: "Media & Podcasts" },
    { section: "memberships", title: "Professional Memberships" },
    { section: "skills", title: "Skills" },
  ],
};
