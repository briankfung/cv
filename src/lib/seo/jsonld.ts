import type { CvData, PositionEntry } from "@/lib/cv/types";
import {
  ALTERNATE_NAMES,
  EXTRA_SAME_AS,
  ORCID_ID,
  PERSON_DESCRIPTION,
  PERSON_DISAMBIGUATION,
  PERSON_ID,
  PERSON_JOB_TITLE,
  PERSONAL_SITE,
  PROFILE_IMAGE_PATH,
  SITE_URL,
} from "./site";

/** Who the structured data says this CV is about; defaults come from site.ts. */
export interface PersonIdentity {
  id: string;
  description?: string;
  disambiguation?: string;
  alternateNames?: string[];
  jobTitle?: string;
}

const SITE_IDENTITY: PersonIdentity = {
  id: PERSON_ID,
  description: PERSON_DESCRIPTION,
  disambiguation: PERSON_DISAMBIGUATION,
  alternateNames: ALTERNATE_NAMES,
  jobTitle: PERSON_JOB_TITLE,
};

/** A single value stays scalar; several become an array, as schema.org allows. */
function oneOrMany<T>(values: T[]): T | T[] | undefined {
  if (values.length === 0) return undefined;
  return values.length === 1 ? values[0] : values;
}

function organization(name: string, url?: string) {
  return { "@type": "Organization", name, ...(url ? { url } : {}) };
}

/**
 * schema.org ProfilePage wrapping a Person, derived from the CV data rather
 * than hardcoded, so adding a degree or a job title updates the structured
 * data along with the page.
 */
export function buildProfileJsonLd(
  data: CvData,
  identity: PersonIdentity = SITE_IDENTITY,
) {
  const { profile } = data;

  // Every ongoing role, so someone running two ventures at once is described
  // as working for both.
  const currentRoles = data.experience.filter(
    (entry) => entry.dates?.end === "present",
  );
  const jobTitle =
    identity.jobTitle ??
    oneOrMany(Array.from(new Set(currentRoles.map((entry) => entry.title))));
  const employers = new Map<string, PositionEntry>();
  for (const role of currentRoles) {
    if (!employers.has(role.org)) employers.set(role.org, role);
  }
  const worksFor = oneOrMany(
    [...employers.values()].map((role) => organization(role.org, role.url)),
  );

  // A Role carries the membership term, which a bare Organization cannot.
  const memberOf = oneOrMany(
    (data.memberships ?? []).map((membership) => ({
      "@type": "OrganizationRole",
      memberOf: organization(membership.org, membership.url),
      ...(membership.role ? { roleName: membership.role } : {}),
      ...(membership.dates ? { startDate: membership.dates.start } : {}),
      ...(membership.dates && membership.dates.end !== "present"
        ? { endDate: membership.dates.end }
        : {}),
    })),
  );

  // Planned or unfinished programs would read as completed here, so only
  // finished education counts.
  const alumniOf = Array.from(
    new Set(
      data.education
        .filter((entry) => !entry.status)
        .map((entry) => entry.institution),
    ),
  ).map((name) => ({ "@type": "CollegeOrUniversity", name }));

  const knowsAbout = data.skills.flatMap((group) => group.items);

  const hasCredential = data.credentials.map((credential) => {
    const { dates } = credential;
    // An end that is neither ongoing nor the year it was earned is when the
    // credential lapsed (or will), so a lapsed one does not read as current.
    const expires =
      dates && dates.end !== "present" && dates.end !== dates.start
        ? dates.end
        : undefined;
    return {
      "@type": "EducationalOccupationalCredential",
      name: credential.name,
      ...(credential.issuer
        ? { recognizedBy: { "@type": "Organization", name: credential.issuer } }
        : {}),
      ...(dates ? { dateCreated: dates.start } : {}),
      ...(expires ? { expires } : {}),
    };
  });

  const [locality, region] = profile.location
    .split(",")
    .map((part) => part.trim());

  const opening = profile.summary ?? profile.highlights?.join(" ");

  // A Person shared with a personal site lists this CV among its profiles,
  // as the site's own Person does.
  const sharedPerson = !identity.id.startsWith(SITE_URL);
  const sameAs = [
    ...(sharedPerson ? [`${SITE_URL}/`] : []),
    ...profile.links.map((link) => link.url),
    ...EXTRA_SAME_AS,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    ...(opening ? { description: opening } : {}),
    // Google's recommended ProfilePage dates, both set by hand in profile.ts.
    ...(profile.created ? { dateCreated: profile.created } : {}),
    ...(profile.updated ? { dateModified: profile.updated } : {}),
    mainEntity: {
      "@type": "Person",
      "@id": identity.id,
      name: profile.name,
      ...(identity.alternateNames?.length
        ? { alternateName: oneOrMany(identity.alternateNames) }
        : {}),
      honorificSuffix: profile.credentials,
      image: `${SITE_URL}${PROFILE_IMAGE_PATH}`,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ORCID",
        value: ORCID_ID,
      },
      description: identity.description ?? opening,
      ...(identity.disambiguation
        ? { disambiguatingDescription: identity.disambiguation }
        : {}),
      ...(jobTitle ? { jobTitle } : {}),
      ...(worksFor ? { worksFor } : {}),
      ...(memberOf ? { memberOf } : {}),
      email: `mailto:${profile.email}`,
      // The person's home page; the CV itself is the ProfilePage's url.
      url: new URL(PERSONAL_SITE).href,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: region,
        addressCountry: "US",
      },
      alumniOf,
      hasCredential,
      knowsAbout,
      sameAs,
    },
  };
}

/**
 * Serializes for a <script type="application/ld+json"> tag. Escaping `<`
 * prevents the payload from closing the script element.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value, (_key, v) => (v === undefined ? undefined : v)).replace(
    /</g,
    "\\u003c",
  );
}
