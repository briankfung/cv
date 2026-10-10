import type { ResearchEntry } from "@/lib/cv/types";

/**
 * Investigator-led research projects, kept separate from peer-reviewed output
 * in `publications.ts` so the CV does not imply publication where there is none.
 */
export const research: ResearchEntry[] = [
  {
    id: "res-phantom-codes",
    title:
      "Phantom Codes: benchmarking hallucination, hierarchical accuracy, abstention, robustness, and cost across 24 LLM and prompting configurations for medical concept normalization",
    role: "Independent research; open evaluation harness released publicly, with retrieval, classification, and string-matching baselines.",
    url: "https://github.com/briankfung/phantom-codes",
    dates: { start: "2026-05", end: "2026-05" },
    tags: ["ai", "research", "engineering"],
  },
  {
    id: "res-cures-act-clinician-burden",
    title:
      "Analysis of the 21st Century Cures Act on reducing clinician burden attributable to health information technology and electronic health records",
    dates: { start: "2019", end: "2020" },
    tags: ["research", "standards", "clinical"],
  },
  {
    id: "res-antibiotic-order-indications",
    title: "Mandatory antibiotic order-associated treatment indications",
    dates: { start: "2017", end: "2018" },
    tags: ["research", "clinical"],
  },
  {
    id: "res-renal-dosing-decision-support",
    title:
      "Renal dosing decision support post-electronic medical record implementation",
    dates: { start: "2014", end: "2015" },
    tags: ["research", "clinical"],
  },
  {
    id: "res-febrile-pediatric-antibiotic-timeliness",
    title:
      "Identification of barriers associated with timeliness of antibiotic administration in febrile pediatric patients presenting to the emergency department",
    dates: { start: "2013", end: "2014" },
    tags: ["research", "clinical"],
  },
  {
    id: "res-unfractionated-heparin",
    title: "Evaluation of unfractionated heparin utilization",
    dates: { start: "2013", end: "2014" },
    tags: ["research", "clinical"],
  },
  {
    id: "res-saccharomyces-boulardii",
    title: "Evaluation of Saccharomyces boulardii utilization",
    dates: { start: "2012", end: "2013" },
    tags: ["research", "clinical"],
  },
];
