import type { Profile } from "@/lib/cv/types";

export const profile: Profile = {
  name: "Brian K. Fung",
  credentials: "PharmD, MPH, CNA",
  headline:
    "Clinician-Engineer · Founder · Clinical AI, Informatics, Interoperability & Public Policy",
  email: "brian@briankfung.com",
  location: "Brandon, FL",
  selfAuthor: "Fung",
  updated: "2026-10-18",
  links: [
    {
      label: "Website",
      display: "briankfung.com",
      url: "https://www.briankfung.com/",
    },
    {
      label: "LinkedIn",
      display: "linkedin.com/in/briankfung",
      url: "https://www.linkedin.com/in/briankfung/",
    },
    {
      label: "GitHub",
      display: "github.com/briankfung",
      url: "https://github.com/briankfung",
    },
  ],
  highlights: [
    "Built haau3, a consumer caregiving app listed in the CMS Medicare App Library.",
    "Built the haau3 platform, a B2B suite of FHIR APIs for scheduling, terminology, medication reconciliation, and plan benefits that powers haau3 and serves other organizations.",
    "Contributed to the electronic prescribing sections of the ONC's 21st Century Cures Act Final Rule.",
    "Modernized clinical systems across Mayo Clinic's 80 hospitals and clinics, converting 75+ legacy antimicrobial decision rules into Epic.",
    "Rose to Staff Clinical Informatics Data Architect at Verily and was appointed to its FHIR Council.",
    "Authored the FHIR implementation guides for HL7 SMART Scheduling Links and haau3.",
    "Teach clinicians to build software through OpenClinTech's nine courses and as a guest lecturer at Johns Hopkins.",
  ],
};
