import type { PublicationEntry } from "@/lib/cv/types";

/**
 * Citation details follow the publishers' records (Crossref, PubMed, and the
 * AMIA 2019 proceedings). The resolver sorts by year, so file order is only a
 * tiebreak.
 */
export const publications: PublicationEntry[] = [
  {
    id: "pub-vancomycin-terminology-2023",
    type: "letter",
    authors: ["Lessard S", "Zimmermann E", "Patel L", "Fung B", "Rivera CG"],
    title:
      "Putting words into action: adopting vancomycin infusion reaction terminology",
    venue: "American Journal of Health-System Pharmacy",
    year: 2023,
    volume: "80",
    issue: "4",
    pages: "175-176",
    doi: "10.1093/ajhp/zxac345",
    pmid: "36377862",
    tags: ["clinical", "standards"],
  },
  {
    id: "pub-nursing-informatics-chapter-2022",
    type: "chapter",
    authors: ["Franky", "Fung BK"],
    title:
      "The pharmacist's view: patient-centered care through the lens of a pharmacist",
    venue:
      "Nursing Informatics: A Health Informatics, Interprofessional and Global Perspective",
    editors: ["Hübner UH", "Mustata Wilson G", "Morawski TS", "Ball MJ"],
    edition: "5th ed",
    publisher: "Springer",
    year: 2022,
    pages: "69-77",
    doi: "10.1007/978-3-030-91237-6_6",
    tags: ["clinical"],
  },
  {
    id: "pub-amia-2019-legacy-cds-conversion",
    type: "abstract",
    authors: [
      "Fung BK",
      "Draper E",
      "Steckelberg J",
      "Virk A",
      "Ausman S",
      "Lessard S",
      "Tande A",
      "Estes LL",
    ],
    title:
      "Conversion of a complex legacy antimicrobial stewardship clinical decision support system into Epic",
    venue: "AMIA Annual Symposium Proceedings",
    year: 2019,
    pages: "1582",
    tags: ["clinical", "research", "standards"],
  },
  {
    id: "pub-amia-2019-asp-module-customization",
    type: "abstract",
    authors: [
      "Draper E",
      "Fung BK",
      "Steckelberg J",
      "Virk A",
      "Ausman S",
      "Tande A",
      "Lessard S",
      "Estes LL",
    ],
    title:
      "Customization of an antimicrobial stewardship clinical decision support module: reducing the noise and improving reporting",
    venue: "AMIA Annual Symposium Proceedings",
    year: 2019,
    pages: "1566",
    tags: ["clinical", "research"],
  },
];
