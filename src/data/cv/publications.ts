import type { PublicationEntry } from "@/lib/cv/types";

export const publications: PublicationEntry[] = [
  {
    id: "pub-vancomycin-terminology-2023",
    type: "journal-article",
    authors: ["Lessard S", "Zimmermann E", "Patel L", "Fung B", "Rivera CG"],
    title:
      "Putting words into action: adopting vancomycin infusion reaction terminology",
    venue: "American Journal of Health-System Pharmacy",
    year: 2023,
    volume: "80",
    issue: "4",
    pages: "175-176",
    doi: "10.1093/ajhp/zxac345",
    tags: ["clinical", "standards"],
  },
  {
    id: "pub-nursing-informatics-chapter-2022",
    type: "chapter",
    authors: ["Franky", "Fung BK"],
    title: "Patient centered view through the lens of a pharmacist",
    venue:
      "Nursing Informatics: A Health Informatics, Interprofessional and Global Perspective",
    editors: ["Ball MJ"],
    edition: "5th ed",
    place: "New York",
    publisher: "Springer",
    year: 2022,
    tags: ["clinical"],
  },
];
