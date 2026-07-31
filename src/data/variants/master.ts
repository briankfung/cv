import type { VariantConfig } from "@/lib/cv/types";

/**
 * The complete academic CV. Section order follows health-sciences convention:
 * training lineage first (education, residencies, credentials, appointments),
 * then practice, then scholarship, then service.
 */
export const master: VariantConfig = {
  id: "master",
  label: "Full CV",
  filename: "brian-fung-cv",
  description: "Complete academic curriculum vitae",
  sections: [
    { section: "profile" },
    { section: "education" },
    { section: "training", title: "Postgraduate Training" },
    { section: "credentials", title: "Licensure & Certifications" },
    { section: "appointments", title: "Academic Appointments" },
    { section: "experience", title: "Professional Experience" },
    { section: "publications" },
    { section: "research", title: "Research Projects" },
    { section: "presentations", title: "Selected Presentations" },
    { section: "teaching", title: "Teaching" },
    { section: "service", title: "Professional Service & Leadership" },
    { section: "honors", title: "Honors & Awards" },
    { section: "projects", title: "Projects & Product Portfolio" },
    { section: "skills", title: "Skills" },
  ],
};
