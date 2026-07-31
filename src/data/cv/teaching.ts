import type { PositionEntry } from "@/lib/cv/types";

/** Guest lectures and preceptorships, most recent first. */
export const teaching: PositionEntry[] = [
  {
    id: "teach-openclintech",
    title: "Founder and Instructor",
    org: "OpenClinTech",
    url: "https://openclintech.com",
    dates: { start: "2023", end: "present" },
    tags: ["teaching", "ai", "engineering"],
    summary:
      "Nine self-paced courses and 137 lessons on AI, APIs, interoperability, and software development for clinicians entering engineering, now extended with live cohort instruction.",
  },
  {
    id: "teach-jhu-fhir",
    title:
      "Guest Lecturer — ME 250.778, Implementing Fast Healthcare Interoperability Resources",
    org: "Johns Hopkins University School of Medicine",
    // Taught once in each term, not continuously across the two years.
    occurrences: ["2025-02", "2026-02"],
    tags: ["teaching", "standards"],
  },
  {
    id: "teach-jhu-applied-informatics",
    title: "Guest Lecturer — ME 250.955, Applied Clinical Informatics",
    org: "Johns Hopkins University School of Medicine",
    dates: { start: "2025-03", end: "2025-03" },
    tags: ["teaching", "clinical"],
  },
  {
    id: "teach-preceptor-jhh",
    title: "Preceptor, Clinical Informatics Rotation at Verily",
    org: "PGY-2 Pharmacy Informatics Residents, Johns Hopkins Hospital",
    dates: { start: "2024", end: "2025" },
    tags: ["teaching", "clinical"],
  },
  {
    id: "teach-preceptor-une",
    title: "Preceptor, Clinical Informatics Capstone at Verily",
    org: "Health Informatics MS Students, University of New England",
    dates: { start: "2024", end: "2025" },
    tags: ["teaching", "clinical"],
  },
  {
    id: "teach-northwestern",
    title:
      "Guest Lecturer — HLTH_SCI 365-DL, Data Management and Analytics in Healthcare",
    org: "Northwestern University, Health Sciences",
    dates: { start: "2024-11", end: "2024-11" },
    tags: ["teaching", "engineering"],
  },
  {
    id: "teach-seneca",
    title:
      "Guest Lecturer — DME100, Essentials of Clinical Data Management and Electronic Data Capture",
    org: "Seneca Polytechnic",
    dates: { start: "2024-11", end: "2024-11" },
    tags: ["teaching", "research"],
  },
  {
    id: "teach-tufts",
    title: "Guest Lecturer — ENP 109, Medical Fundamentals",
    org: "Tufts University, Engineering Psychology and Human Factors Engineering",
    dates: { start: "2022", end: "present" },
    tags: ["teaching", "clinical"],
  },
  {
    id: "teach-high-point",
    title: "Guest Lecturer — PCS 8040, Pharmacy Management",
    org: "High Point University, Fred Wilson School of Pharmacy",
    dates: { start: "2022-09", end: "2022-09" },
    tags: ["teaching", "clinical"],
  },
  {
    id: "teach-ohio-state",
    title:
      "Guest Lecturer — PHR 8120, Information Systems for Health System Pharmacy",
    org: "The Ohio State University Wexner Medical Center",
    dates: { start: "2018-03", end: "2018-03" },
    tags: ["teaching", "clinical"],
  },
];
