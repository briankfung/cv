import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import type { CvData, PositionEntry } from "@/lib/cv/types";
import { buildProfileJsonLd, type PersonIdentity, serializeJsonLd } from "./jsonld";
import { PERSON_ID, SITE_URL } from "./site";

const role = (
  id: string,
  title: string,
  org: string,
  end: string,
  url?: string,
): PositionEntry => ({
  id,
  title,
  org,
  url,
  dates: { start: "2020", end },
});

/** An omitted identity falls through to the defaults from site.ts. */
const person = (data: CvData, identity?: PersonIdentity) =>
  buildProfileJsonLd(data, identity).mainEntity as Record<string, unknown>;

describe("buildProfileJsonLd", () => {
  it("uses the configured Person @id and keeps the CV as the ProfilePage url", () => {
    const page = buildProfileJsonLd(cvData);
    expect(page.url).toBe(SITE_URL);
    expect(page.mainEntity["@id"]).toBe(PERSON_ID);
  });

  it("falls back to the profile summary when no description is configured", () => {
    const data: CvData = {
      ...cvData,
      profile: { ...cvData.profile, summary: "A summary.", highlights: ["One."] },
    };
    const entity = person(data, { id: "https://example.org/#person" });
    expect(entity["@id"]).toBe("https://example.org/#person");
    expect(entity.description).toBe("A summary.");
    expect(entity).not.toHaveProperty("disambiguatingDescription");
  });

  it("falls back to the highlights when there is no summary or description", () => {
    const data: CvData = {
      ...cvData,
      profile: { ...cvData.profile, summary: undefined, highlights: ["One.", "Two."] },
    };
    expect(person(data, { id: "https://example.org/#person" }).description).toBe(
      "One. Two.",
    );
  });

  it("prefers a configured description and adds a disambiguation", () => {
    const entity = person(cvData, {
      id: "https://example.org/#person",
      description: "One-liner.",
      disambiguation: "Not the namesake.",
    });
    expect(entity.description).toBe("One-liner.");
    expect(entity.disambiguatingDescription).toBe("Not the namesake.");
  });

  it("lists every ongoing role, once per organization", () => {
    const data: CvData = {
      ...cvData,
      experience: [
        role("a", "Founder", "Venture A", "present", "https://a.example"),
        role("b", "Founder & Lead", "Holding Co", "present"),
        role("c", "Engineer", "Old Employer", "2019"),
      ],
    };
    // An identity with no configured title, so the roles decide it.
    const entity = person(data, { id: "https://example.org/#person" });
    expect(entity.jobTitle).toEqual(["Founder", "Founder & Lead"]);
    expect(entity.worksFor).toEqual([
      { "@type": "Organization", name: "Venture A", url: "https://a.example" },
      { "@type": "Organization", name: "Holding Co" },
    ]);
  });

  it("references an organization another site defines by its @id", () => {
    const data: CvData = {
      ...cvData,
      experience: [
        {
          ...role("a", "Founder", "Venture A", "present", "https://a.example"),
          orgId: "https://a.example/#organization",
        },
      ],
    };
    expect(person(data, { id: "https://example.org/#person" }).worksFor).toEqual({
      "@type": "Organization",
      "@id": "https://a.example/#organization",
      name: "Venture A",
      url: "https://a.example",
    });
  });

  it("keeps a single ongoing role scalar", () => {
    const data: CvData = {
      ...cvData,
      experience: [role("a", "Founder", "Venture A", "present")],
    };
    const entity = person(data, { id: "https://example.org/#person" });
    expect(entity.jobTitle).toBe("Founder");
    expect(entity.worksFor).toEqual({ "@type": "Organization", name: "Venture A" });
  });

  it("describes memberships as roles with their terms", () => {
    const data: CvData = {
      ...cvData,
      memberships: [
        { id: "m1", org: "Society A", dates: { start: "2011", end: "2024" } },
        { id: "m2", org: "Society B", dates: { start: "2016", end: "present" } },
        { id: "m3", org: "Society C" },
      ],
    };
    expect(person(data).memberOf).toEqual([
      {
        "@type": "OrganizationRole",
        memberOf: { "@type": "Organization", name: "Society A" },
        startDate: "2011",
        endDate: "2024",
      },
      {
        "@type": "OrganizationRole",
        memberOf: { "@type": "Organization", name: "Society B" },
        startDate: "2016",
      },
      {
        "@type": "OrganizationRole",
        memberOf: { "@type": "Organization", name: "Society C" },
      },
    ]);
  });

  it("omits memberOf when there are no memberships", () => {
    const data: CvData = { ...cvData, memberships: [] };
    expect(person(data)).not.toHaveProperty("memberOf");
  });
});

describe("shared Person details", () => {
  it("gives the CV page its own @id and opening description", () => {
    const data: CvData = {
      ...cvData,
      profile: { ...cvData.profile, summary: undefined, highlights: ["One.", "Two."] },
    };
    const page = buildProfileJsonLd(data, { id: "https://example.org/#person" });
    expect(page["@id"]).toBe(`${SITE_URL}/#profile`);
    expect(page.description).toBe("One. Two.");
  });

  it("lists the CV among the profiles of a Person shared with a personal site", () => {
    const shared = person(cvData, { id: "https://example.org/#person" });
    expect(shared.sameAs).toContain(`${SITE_URL}/`);
    const standalone = person(cvData, { id: `${SITE_URL}/#person` });
    expect(standalone.sameAs).not.toContain(`${SITE_URL}/`);
  });

  it("emits configured alternate names, one or many", () => {
    const id = "https://example.org/#person";
    expect(person(cvData, { id, alternateNames: ["handle"] }).alternateName).toBe("handle");
    expect(
      person(cvData, { id, alternateNames: ["A Name", "handle"] }).alternateName,
    ).toEqual(["A Name", "handle"]);
    expect(person(cvData, { id })).not.toHaveProperty("alternateName");
  });

  it("uses a configured job title over the derived roles", () => {
    const data: CvData = {
      ...cvData,
      experience: [
        role("a", "Founder", "Venture A", "present"),
        role("b", "Founder & Lead", "Holding Co", "present"),
      ],
    };
    expect(person(data, { id: "https://example.org/#person", jobTitle: "Founder" }).jobTitle).toBe(
      "Founder",
    );
  });
});

describe("profile page dates", () => {
  it("publishes the content dates Google recommends for a ProfilePage", () => {
    const data: CvData = {
      ...cvData,
      profile: { ...cvData.profile, created: "2024-01-15", updated: "2026-10-18" },
    };
    const page = buildProfileJsonLd(data);
    expect(page).toMatchObject({ dateCreated: "2024-01-15", dateModified: "2026-10-18" });
  });

  it("omits the dates when they are not set", () => {
    const data: CvData = {
      ...cvData,
      profile: { ...cvData.profile, created: undefined, updated: undefined },
    };
    const page = buildProfileJsonLd(data);
    expect(page).not.toHaveProperty("dateCreated");
    expect(page).not.toHaveProperty("dateModified");
  });
});

describe("person image", () => {
  const id = "https://example.org/#person";

  it("emits a plain URL by default", () => {
    expect(person(cvData, { id, image: { url: "https://example.org/me.png" } }).image).toBe(
      "https://example.org/me.png",
    );
  });

  it("references a personal site's headshot by @id when given one", () => {
    expect(
      person(cvData, {
        id,
        image: { url: "https://example.org/me.jpg", id: "https://example.org/#headshot" },
      }).image,
    ).toEqual({
      "@type": "ImageObject",
      "@id": "https://example.org/#headshot",
      url: "https://example.org/me.jpg",
      contentUrl: "https://example.org/me.jpg",
    });
  });

  it("omits the image when none is configured", () => {
    expect(person(cvData, { id })).not.toHaveProperty("image");
  });
});

describe("credential dates", () => {
  const credentials = (data: CvData) =>
    person(data).hasCredential as Record<string, unknown>[];

  it("dates every credential and marks a lapsed one as expired", () => {
    const data: CvData = {
      ...cvData,
      credentials: [
        { id: "c-lapsed", name: "Lapsed", dates: { start: "2016", end: "2023" } },
        { id: "c-once", name: "One-time", dates: { start: "2024-04", end: "2024-04" } },
        { id: "c-current", name: "Current", dates: { start: "2013", end: "present" } },
        { id: "c-undated", name: "Undated" },
      ],
    };
    const [lapsed, once, current, undated] = credentials(data);
    expect(lapsed).toMatchObject({ dateCreated: "2016", expires: "2023" });
    expect(once).toMatchObject({ dateCreated: "2024-04" });
    expect(once).not.toHaveProperty("expires");
    expect(current).not.toHaveProperty("expires");
    expect(undated).not.toHaveProperty("dateCreated");
  });
});

describe("alumniOf", () => {
  it("lists only finished education", () => {
    const edu = (id: string, institution: string, status?: "planned" | "in-progress") => ({
      id,
      degree: "Degree",
      institution,
      dates: { start: "2020", end: "2022" },
      status,
    });
    const data: CvData = {
      ...cvData,
      education: [
        edu("e1", "Finished U"),
        edu("e2", "Planned U", "planned"),
        edu("e3", "Ongoing U", "in-progress"),
      ],
    };
    expect(person(data).alumniOf).toEqual([
      { "@type": "CollegeOrUniversity", name: "Finished U" },
    ]);
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so the payload cannot close its script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).toBe('{"a":"\\u003c/script>"}');
  });
});
