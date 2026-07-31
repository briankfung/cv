import type { CredentialEntry } from "@/lib/cv/types";

/**
 * Reverse chronological by start year.
 *
 * License numbers are deliberately not stored here. They are additional
 * personal identifiers, and this repository and the site it publishes are both
 * public; the issuing state is enough for a reader to verify through the board
 * lookup. Add them to `items` if you want them published.
 */
export const credentials: CredentialEntry[] = [
  {
    id: "cna-florida",
    name: "Certified Nursing Assistant",
    abbreviation: "CNA",
    issuer: "Florida Department of Health",
    dates: { start: "2026-01", end: "2028" },
    tags: ["clinical"],
  },
  {
    id: "hl7-fhir-r4-proficiency",
    name: "HL7 FHIR R4 Proficiency Certificate",
    issuer: "HL7 International",
    dates: { start: "2024-04", end: "2024-04" },
    tags: ["standards"],
  },
  {
    id: "fhir-foundation-implementer",
    name: "FHIR Foundation Implementer",
    issuer: "FHIR Foundation",
    dates: { start: "2024-07", end: "2024-07" },
    tags: ["standards"],
  },
  {
    id: "mayo-quality-fellow-silver",
    name: "Mayo Quality Fellow, Silver",
    issuer: "Mayo Clinic",
    dates: { start: "2018", end: "2018" },
    tags: ["clinical", "leadership"],
  },
  {
    id: "mayo-quality-fellow-bronze",
    name: "Mayo Quality Fellow, Bronze",
    issuer: "Mayo Clinic",
    dates: { start: "2018", end: "2018" },
    tags: ["clinical", "leadership"],
  },
  {
    id: "bcps",
    name: "Board Certified Pharmacotherapy Specialist",
    abbreviation: "BCPS",
    issuer: "Board of Pharmacy Specialties",
    dates: { start: "2016", end: "2023" },
    tags: ["clinical"],
  },
  {
    id: "epic-certifications",
    name: "Epic Certifications",
    issuer: "Epic Systems",
    dates: { start: "2014", end: "2025" },
    items: [
      "Willow Inpatient",
      "Willow Inpatient Graduate",
      "Inpatient Clinical Decision Support",
      "Bugsy Infection Control",
      "Reporting Workbench",
      "BestPractice Advisories, Basic Badge",
      "Alternatives Badge",
      "Usability Badge",
    ],
    tags: ["clinical", "engineering"],
  },
  {
    id: "mad-id",
    name: "Making a Difference in Infectious Disease Pharmacotherapy",
    abbreviation: "MAD-ID",
    // No expiry and no renewal cycle, so the year earned is the whole story.
    // start === end collapses to a single year, as with the other one-time
    // credentials.
    dates: { start: "2014", end: "2014" },
    tags: ["clinical"],
  },
  {
    id: "pharmacist-licensure",
    name: "Pharmacist Licensure",
    dates: { start: "2013", end: "present" },
    items: ["Minnesota", "Utah", "Florida"],
    tags: ["clinical"],
  },
];
