import type { HonorEntry } from "@/lib/cv/types";

/** Reverse chronological; the resolver sorts, so file order is only a tiebreak. */
export const honors: HonorEntry[] = [
  {
    id: "honor-cms-hte-general-availability",
    title: "General Availability Recognition, Health Tech Ecosystem",
    org: "Centers for Medicare & Medicaid Services",
    dates: { start: "2026-07", end: "2026-07" },
    note: "Awarded to haau3 for reaching general availability as a patient-facing app in the Conversational AI and Kill the Clipboard categories.",
    url: "https://www.cms.gov/initiatives/health-technology-ecosystem/overview/pledge-demo-showcase/haau3",
    tags: ["ai", "product", "standards"],
  },
  {
    id: "honor-cms-hte-early-adopter",
    title: "Early Adopter Recognition, Health Tech Ecosystem",
    org: "Centers for Medicare & Medicaid Services",
    dates: { start: "2026-07", end: "2026-07" },
    note: "Awarded for pledging two new use cases, Modern Scheduling and Real-Time Benefits.",
    tags: ["standards", "leadership"],
  },
  {
    id: "honor-verily-values-award",
    title: "Verily Values Award, Respect Individuals",
    org: "Verily",
    dates: { start: "2024-12", end: "2024-12" },
    tags: ["leadership"],
  },
  {
    id: "honor-linkedin-top-voice",
    title: "LinkedIn Top Voice",
    org: "LinkedIn",
    dates: { start: "2022-11", end: "2022-11" },
    tags: ["leadership"],
  },
  {
    id: "honor-linkedin-top-healthcare-creators",
    title: "Top 15 Healthcare Creators",
    org: "LinkedIn",
    dates: { start: "2022-01", end: "2022-01" },
    tags: ["leadership"],
  },
  {
    id: "honor-linkedin-creator-accelerator",
    title: "Creator Accelerator Program",
    org: "LinkedIn",
    dates: { start: "2022-01", end: "2022-01" },
    note: "Inaugural cohort, one of 100 creators selected.",
    tags: ["leadership"],
  },
  {
    id: "honor-deans-list",
    title: "Dean's List",
    org: "University of Florida College of Pharmacy",
    dates: { start: "2009", end: "2013" },
    tags: ["clinical"],
  },
  {
    id: "honor-phi-kappa-phi",
    title: "Phi Kappa Phi Honor Society",
    org: "Phi Kappa Phi",
    dates: { start: "2012-12", end: "2012-12" },
    tags: ["research"],
  },
  {
    id: "honor-rho-chi",
    title: "Rho Chi Honor Society",
    org: "The Rho Chi Society",
    // Eligibility follows the first three semesters; announced Feb 2011.
    dates: { start: "2011-02", end: "2011-02" },
    tags: ["clinical"],
  },
];
