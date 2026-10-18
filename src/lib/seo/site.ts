export const SITE_URL = "https://cv.briankfung.com";

/** Kept in sync with the source site so canonical links point somewhere real. */
export const PERSONAL_SITE = "https://www.briankfung.com";

/**
 * The schema.org Person `@id` in the structured data. If your personal site
 * already publishes a Person, set this to that `@id` (often
 * `${PERSONAL_SITE}/#person`) so search engines read the CV and the site as
 * one person rather than two. Otherwise keep the CV's own.
 */
export const PERSON_ID = `${PERSONAL_SITE}/#person`;

/**
 * Short Person description for the structured data, typically the one-liner
 * your other profiles use. Undefined falls back to the CV's profile summary,
 * or to its highlights when there is no summary.
 */
export const PERSON_DESCRIPTION: string | undefined =
  "Clinician-engineer working to connect the world's healthcare data. Founder of haau3, a free app that gathers a loved one's health records in one place for caregivers, and of OpenClinTech, where I teach clinicians to build software. PharmD, MPH, CNA.";

/**
 * schema.org `disambiguatingDescription`, for telling yourself apart from a
 * namesake. Structured data only; never shown on the page.
 */
export const PERSON_DISAMBIGUATION: string | undefined =
  "Not the technology journalist of the same name.";

/** Public handle, identical on GitHub, LinkedIn, YouTube, X and Instagram. */
export const PROFILE_HANDLE = "briankfung";

/** Other names the Person is known by, for schema.org `alternateName`. */
export const ALTERNATE_NAMES: string[] = [PROFILE_HANDLE];

/**
 * schema.org `jobTitle`. Undefined derives it from every ongoing role in
 * Experience; set it when a personal site already states one title, so the
 * shared Person does not carry two.
 */
export const PERSON_JOB_TITLE: string | undefined = undefined;

export const ORCID_ID = "0000-0002-5951-3770";

/** Profiles that belong in the Person's sameAs but are not shown in the CV header. */
export const EXTRA_SAME_AS = [
  `https://orcid.org/${ORCID_ID}`,
  "https://scholar.google.com/citations?user=y4XyGLwAAAAJ",
  "https://www.wikidata.org/wiki/Q141756710",
  "https://www.youtube.com/@briankfung",
  "https://x.com/briankfung",
  "https://www.instagram.com/briankfung/",
];

/**
 * Crawlers to turn away in robots.txt, e.g. bulk scrapers and training-data
 * collectors. Everything else, search engines included, stays allowed.
 */
export const BLOCKED_CRAWLERS: string[] = [];

/** Headshot served from /public; referenced as the Person image in the structured data. */
export const PROFILE_IMAGE_PATH = "/brian-k-fung.png";
