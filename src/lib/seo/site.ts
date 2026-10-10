export const SITE_URL = "https://cv.briankfung.com";

/** Kept in sync with the source site so canonical links point somewhere real. */
export const PERSONAL_SITE = "https://briankfung.com";

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
