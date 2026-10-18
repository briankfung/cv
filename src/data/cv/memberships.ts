import type { MembershipEntry } from "@/lib/cv/types";

/**
 * Terms follow the ASHP member profile. Rho Chi is listed under Honors, since
 * it is an honor society rather than a membership one joins.
 */
export const memberships: MembershipEntry[] = [
  {
    id: "mem-amia",
    org: "American Medical Informatics Association",
    dates: { start: "2016", end: "2025" },
    tags: ["clinical", "standards"],
  },
  {
    id: "mem-ashp",
    org: "American Society of Health-System Pharmacists",
    dates: { start: "2011", end: "2024" },
    tags: ["clinical"],
  },
  {
    id: "mem-sidp",
    org: "Society of Infectious Diseases Pharmacists",
    dates: { start: "2013", end: "2020" },
    tags: ["clinical"],
  },
  {
    id: "mem-mshp",
    org: "Minnesota Society of Health-System Pharmacists",
    dates: { start: "2015", end: "2020" },
    tags: ["clinical"],
  },
  {
    id: "mem-cpic",
    org: "Clinical Pharmacogenetics Implementation Consortium",
    dates: { start: "2015", end: "2020" },
    tags: ["clinical", "research"],
  },
  {
    id: "mem-apha",
    org: "American Pharmacists Association",
    tags: ["clinical"],
  },
  {
    id: "mem-amcp",
    org: "Academy of Managed Care Pharmacy",
    tags: ["clinical"],
  },
  {
    id: "mem-kappa-psi",
    org: "Kappa Psi Pharmaceutical Fraternity",
    tags: ["clinical"],
  },
];
