import type { EducationEntry } from "@/lib/cv/types";

export const education: EducationEntry[] = [
  {
    id: "stanford-hails",
    degree: "Stanford Healthcare AI Leadership & Strategy (HAILS)",
    institution: "Stanford University School of Medicine",
    location: "Stanford, CA",
    dates: { start: "2027-05", end: "2027-06" },
    tags: ["ai", "clinical", "leadership"],
    note: "A hybrid Stanford executive program for healthcare leaders focused on AI innovation, implementation, and strategy.",
  },
  {
    id: "stanford-biomedical-data-science",
    degree: "Graduate Certificate",
    field: "Biomedical Data Science",
    institution: "Stanford University School of Medicine",
    location: "Stanford, CA",
    dates: { start: "2022", end: "2023" },
    tags: ["ai", "clinical", "research"],
    note: "Hands-on model development across machine learning, deep learning, and large language models, including training, fine-tuning, and evaluation.",
  },
  {
    id: "jhu-mph",
    degree: "Master of Public Health",
    institution: "Johns Hopkins Bloomberg School of Public Health",
    location: "Baltimore, MD",
    dates: { start: "2018", end: "2020" },
    tags: ["clinical", "research"],
  },
  {
    id: "uf-pharmd",
    degree: "Doctor of Pharmacy",
    institution: "University of Florida",
    location: "Gainesville, FL",
    dates: { start: "2009", end: "2013" },
    tags: ["clinical"],
  },
  {
    id: "uf-bs-nutrition",
    degree: "Bachelor of Science",
    field: "Human Nutrition",
    institution: "University of Florida",
    location: "Gainesville, FL",
    dates: { start: "2005", end: "2009" },
  },
];
