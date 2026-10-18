export const SITE_URL = "https://cv.briankfung.com";

/** Kept in sync with the source site so canonical links point somewhere real. */
export const PERSONAL_SITE = "https://briankfung.com";

/**
 * The schema.org Person `@id` in the structured data. If your personal site
 * already publishes a Person, set this to that `@id` (often
 * `${PERSONAL_SITE}/#person`) so search engines read the CV and the site as
 * one person rather than two. Otherwise keep the CV's own.
 */
export const PERSON_ID = `${SITE_URL}/#person`;

/**
 * Short Person description for the structured data, typically the one-liner
 * your other profiles use. Undefined falls back to the CV's profile summary.
 */
export const PERSON_DESCRIPTION: string | undefined = undefined;

/**
 * schema.org `disambiguatingDescription`, for telling yourself apart from a
 * namesake. Structured data only; never shown on the page.
 */
export const PERSON_DISAMBIGUATION: string | undefined = undefined;

/** Public handle, identical on GitHub, LinkedIn, YouTube, X and Instagram. */
export const PROFILE_HANDLE = "briankfung";

export const ORCID_ID = "0000-0002-5951-3770";

/** Profiles that belong in the Person's sameAs but are not shown in the CV header. */
export const EXTRA_SAME_AS = [
  `https://orcid.org/${ORCID_ID}`,
  "https://www.youtube.com/@briankfung",
  "https://x.com/briankfung",
];

/** Headshot served from /public; referenced as the Person image in the structured data. */
export const PROFILE_IMAGE_PATH = "/brian-k-fung.png";
