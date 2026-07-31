import type { PositionEntry } from "@/lib/cv/types";

/** Postgraduate pharmacy residencies. */
export const training: PositionEntry[] = [
  {
    id: "pgy2-utah",
    title: "PGY-2 Pharmacy Informatics Resident",
    org: "University of Utah Health",
    location: "Salt Lake City, UT",
    dates: { start: "2014-07", end: "2015-06" },
    tags: ["clinical", "leadership"],
    bullets: [
      {
        text: "Led cross-hospital medication workflow and security initiatives across seven hospitals, including an enterprise authentication transition affecting 3,500+ nurses.",
      },
    ],
  },
  {
    id: "pgy1-sarasota",
    title: "PGY-1 Pharmacy Practice Resident",
    org: "Sarasota Memorial Hospital",
    location: "Sarasota, FL",
    dates: { start: "2013-06", end: "2014-06" },
    tags: ["clinical"],
    bullets: [
      {
        text: "Led EHR training for a 40+ FTE pharmacy department during conversion from McKesson Horizon Meds Manager to Allscripts while maintaining clinical pharmacist responsibilities.",
      },
    ],
  },
];
