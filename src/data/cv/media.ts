import type { MediaEntry } from "@/lib/cv/types";

/**
 * Podcasts, press, and guest posts, kept in step with the appearances page on
 * briankfung.com. Titles are as published. The resolver sorts by date.
 */
export const media: MediaEntry[] = [
  {
    id: "media-out-of-the-fhir-2026",
    kind: "podcast",
    title:
      "Caregivers Are the Interoperability Layer: Brian K Fung on Building haau3",
    outlet: "Out of the FHIR Podcast",
    date: "2026-09",
    url: "https://evestel.substack.com/p/caregivers-are-the-interoperability",
    tags: ["product", "standards"],
  },
  {
    id: "media-ashp-informatics-bytes-2025",
    kind: "podcast",
    title: "The Future of Data Analytics for Pharmacy Professionals",
    outlet: "ASHP Informatics Bytes",
    date: "2025-07",
    url: "https://www.ashp.org/professional-development/ashp-podcasts/informatics-bytes/2025/the-future-of-data-analytics-for-pharmacy-professionals",
    note: "Panel discussion",
    tags: ["clinical", "ai"],
  },
  {
    id: "media-pharmacy-it-me-309-2023",
    kind: "podcast",
    title: "309. Health Tech and Interoperability feat. Dr. Brian Fung",
    outlet: "Pharmacy, IT, & Me",
    date: "2023-08",
    url: "https://pharmacyitme.com/2023/08/23/309-health-tech-and-interoperability-feat-dr-brian-fung/",
    tags: ["standards"],
  },
  {
    id: "media-physician-pharmacist-2023",
    kind: "podcast",
    title:
      "17. Clinical Informatics and the Future of Medicine with Dr. Brian Fung",
    outlet: "The Physician Pharmacist Podcast",
    date: "2023-05",
    url: "https://podcasts.apple.com/us/podcast/17-clinical-informatics-and-the-future-of-medicine/id1667050986?i=1000611717041",
    tags: ["clinical"],
  },
  {
    id: "media-net-influencer-profile-2022",
    kind: "press",
    title: "Brian K. Fung: Sharing Pharmacy Informatics Content Online",
    outlet: "Net Influencer",
    date: "2022-09",
    url: "https://www.netinfluencer.com/brian-k-fung/",
    tags: ["leadership"],
  },
  {
    id: "media-net-influencer-accelerator-2022",
    kind: "press",
    title: "LinkedIn Accelerator Program: What Is It And How To Access",
    outlet: "Net Influencer",
    date: "2022-08",
    url: "https://www.netinfluencer.com/linkedin-accelerator-program/",
    note: "One of five creators featured from the program",
    tags: ["leadership"],
  },
  {
    id: "media-ashp-informatics-bytes-2022",
    kind: "podcast",
    title:
      "Staying Current in Healthcare, Information and Technology: Perspectives from Pharmacy Leaders, Part 2 of 2",
    outlet: "ASHP Informatics Bytes",
    date: "2022-08",
    url: "https://www.ashp.org/professional-development/ashp-podcasts/informatics-bytes/staying-current-in-healthcare-information-and-technology-perspectives-part-2-of-2",
    note: "Panel discussion",
    tags: ["clinical"],
  },
  {
    id: "media-rho-chi-post-2021",
    kind: "press",
    title: "Pharmacy Meets Technology: Pharmacy Informatics",
    outlet:
      "Rho Chi Post, St. John's University College of Pharmacy and Health Sciences",
    date: "2021-10",
    url: "https://rhochistj.org/RhoChiPost/pharmacy-meets-technology-pharmacy-informatics/",
    note: "Student article that quotes Brian on the informatics pharmacist's role",
    tags: ["clinical"],
  },
  {
    id: "media-burnout-doctor-2020",
    kind: "podcast",
    title: "Burnout Stories with Dr. Brian Fung",
    outlet: "The Burnout Doctor Podcast",
    date: "2020-10",
    url: "https://drjessicalouie.com/podcast89/",
    tags: ["clinical"],
  },
  {
    id: "media-pharmacy-it-me-229-2020",
    kind: "podcast",
    title:
      "229. The Journey from Student to Resident to Informatics Pharmacist feat. Youtuber Dr. Brian Fung",
    outlet: "Pharmacy, IT, & Me",
    date: "2020-10",
    url: "https://pharmacyitme.com/2020/10/21/229-the-journey-from-student-to-resident-to-informatics-pharmacist-feat-youtuber-dr-brian-fung/",
    tags: ["clinical"],
  },
  {
    id: "media-pharmacy-it-me-99-2019",
    kind: "podcast",
    title:
      "99. Special Episode: One Goal, Many Paths – Essential Q&A by a Pharmacist to Four Informatics Professionals",
    outlet: "Pharmacy, IT, & Me",
    date: "2019-08",
    url: "https://pharmacyitme.com/2019/08/14/99-special-episode-one-goal-many-paths-essential-qa-by-a-pharmacist-to-four-informatics-professionals/",
    note: "Panel discussion",
    tags: ["clinical", "teaching"],
  },
  {
    id: "media-pharmacy-it-me-not-matching-2019",
    kind: "podcast",
    title:
      "One Goal, Many Paths: Next Steps After Not Matching feat. Drs. Beju Shah, Brian Fung, David Vu, and Tony Dao",
    outlet: "Pharmacy, IT, & Me",
    date: "2019-06",
    url: "https://pharmacyitme.com/2019/06/12/one-goal-many-paths-next-steps-after-not-matching-feat-drs-beju-shah-brian-fung-david-vu-and-tony-dao/",
    tags: ["clinical", "teaching"],
  },
  {
    id: "media-happy-pharmd-2018",
    kind: "guest-post",
    title: "How to Enter Pharmacy Informatics Without an Residency",
    outlet: "The Happy PharmD",
    date: "2018-08",
    url: "https://thehappypharmd.com/how-to-enter-pharmacy-informatics-without-an-residency/",
    tags: ["clinical", "teaching"],
  },
  {
    id: "media-pharmacy-leaders-2017",
    kind: "podcast",
    title:
      "Ep 15. Residency and BCPS Advice with the Persistent Pharmacist Brian K Fung PharmD",
    outlet: "Pharmacy Leaders Podcast",
    date: "2017-12",
    url: "https://pharmacy.libsyn.com/ep-15-the-persistent-pharmacist-with-pgy-1-pgy-2-and-bcps-advice-brian-k-fung-pharmd",
    tags: ["clinical", "teaching"],
  },
];
