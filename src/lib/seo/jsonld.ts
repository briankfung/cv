import type { CvData } from "@/lib/cv/types";
import {
  EXTRA_SAME_AS,
  ORCID_ID,
  PROFILE_HANDLE,
  PROFILE_IMAGE_PATH,
  SITE_URL,
} from "./site";

/**
 * schema.org ProfilePage wrapping a Person, derived from the CV data rather
 * than hardcoded, so adding a degree or a job title updates the structured
 * data along with the page.
 */
export function buildProfileJsonLd(data: CvData) {
  const { profile } = data;

  const currentRole = data.experience.find(
    (entry) => entry.dates?.end === "present",
  );

  const alumniOf = Array.from(
    new Set(data.education.map((entry) => entry.institution)),
  ).map((name) => ({ "@type": "CollegeOrUniversity", name }));

  const worksFor = currentRole
    ? { "@type": "Organization", name: currentRole.org }
    : undefined;

  const knowsAbout = data.skills.flatMap((group) => group.items);

  const hasCredential = data.credentials.map((credential) => ({
    "@type": "EducationalOccupationalCredential",
    name: credential.name,
    ...(credential.issuer
      ? { recognizedBy: { "@type": "Organization", name: credential.issuer } }
      : {}),
  }));

  const [locality, region] = profile.location
    .split(",")
    .map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      alternateName: PROFILE_HANDLE,
      honorificSuffix: profile.credentials,
      image: `${SITE_URL}${PROFILE_IMAGE_PATH}`,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ORCID",
        value: ORCID_ID,
      },
      description: profile.summary,
      ...(currentRole ? { jobTitle: currentRole.title } : {}),
      ...(worksFor ? { worksFor } : {}),
      email: `mailto:${profile.email}`,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion: region,
        addressCountry: "US",
      },
      alumniOf,
      hasCredential,
      knowsAbout,
      sameAs: [...profile.links.map((link) => link.url), ...EXTRA_SAME_AS],
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
