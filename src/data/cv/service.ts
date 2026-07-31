import type { PositionEntry } from "@/lib/cv/types";

export const service: PositionEntry[] = [
  {
    id: "svc-smart-scheduling-links",
    // Lead author of the FHIR implementation guide specifically, not of the
    // SMART Scheduling Links project as a whole.
    title: "Lead Author, FHIR Implementation Guide",
    org: "HL7 SMART Scheduling Links",
    url: "https://build.fhir.org/ig/HL7/smart-scheduling-links/en/",
    tags: ["standards", "leadership"],
    summary:
      "Workgroup contributor. Translated multi-organization scheduling workflows into a balloted FHIR implementation guide with examples and developer-facing artifacts.",
  },
  {
    id: "svc-cms-health-tech-ecosystem",
    title: "Pledgee",
    org: "CMS Health Tech Ecosystem",
    dates: { start: "2026-01", end: "present" },
    tags: ["standards", "ai"],
    summary:
      "Pledged the Kill the Clipboard and Conversational AI use cases, both of which reached general availability, and the Year 2 advanced scheduling and consumer real-time benefits categories.",
  },
  {
    id: "svc-amia-25x5",
    title: "Task Force Member, Policy and Advocacy Workstream",
    org: "American Medical Informatics Association 25x5 Task Force",
    dates: { start: "2023", end: "2025" },
    tags: ["clinical", "leadership"],
  },
  {
    id: "svc-pharmacy-hit-collaborative",
    title: "Committee Member, Value Sets",
    org: "Pharmacy HIT Collaborative",
    dates: { start: "2022", end: "2025" },
    tags: ["standards", "leadership"],
  },
  {
    id: "svc-google-cs-mentorship",
    title: "Research Mentor, Computer Science Mentorship Program",
    org: "Google",
    dates: { start: "2023", end: "2023" },
    tags: ["teaching", "engineering"],
  },
  {
    id: "svc-ashp-forecast-panelist",
    title: "Panelist, Pharmacy Forecast",
    org: "ASHP Foundation",
    dates: { start: "2019", end: "present" },
    tags: ["clinical", "leadership"],
  },
  {
    id: "svc-sidp-social-media",
    title: "Committee Member, Social Media",
    org: "Society of Infectious Diseases Pharmacists",
    dates: { start: "2018", end: "2020" },
    tags: ["clinical"],
  },
  {
    id: "svc-ashp-advisory-group",
    title:
      "Member, Section Advisory Group for Pharmacy Informatics and Technology on Professional Development",
    org: "American Society of Health-System Pharmacists",
    dates: { start: "2016", end: "2020" },
    tags: ["clinical", "leadership"],
  },
];
