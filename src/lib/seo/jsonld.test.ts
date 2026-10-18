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
    const entity = person(cvData, { id: "https://example.org/#person" });
    expect(entity["@id"]).toBe("https://example.org/#person");
    expect(entity.description).toBe(cvData.profile.summary);
    expect(entity).not.toHaveProperty("disambiguatingDescription");
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
    const entity = person(data);
    expect(entity.jobTitle).toEqual(["Founder", "Founder & Lead"]);
    expect(entity.worksFor).toEqual([
      { "@type": "Organization", name: "Venture A", url: "https://a.example" },
      { "@type": "Organization", name: "Holding Co" },
    ]);
  });

  it("keeps a single ongoing role scalar", () => {
    const data: CvData = {
      ...cvData,
      experience: [role("a", "Founder", "Venture A", "present")],
    };
    const entity = person(data);
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

describe("serializeJsonLd", () => {
  it("escapes < so the payload cannot close its script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).toBe('{"a":"\\u003c/script>"}');
  });
});
