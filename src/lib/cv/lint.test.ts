import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import { lintCanonicalSite, lintPrivacy, lintUniqueIds } from "./lint";
import { PERSONAL_SITE } from "@/lib/seo/site";
import type { CvData } from "./types";

const leaks = (value: unknown) => lintPrivacy(value).map((i) => i.message);

describe("lintPrivacy", () => {
  it("passes the real CV data", () => {
    expect(lintPrivacy(cvData)).toEqual([]);
  });

  it.each([
    ["(813) 555-0134", "phone"],
    ["813-555-0134", "phone"],
    ["+1 813.555.0134", "phone"],
    ["1234 Bayshore Blvd", "street-address"],
    ["77 Sunset Ct.", "street-address"],
    ["PO Box 4021", "po-box"],
    ["123-45-6789", "ssn"],
    ["someone-else@example.com", "email"],
  ])("flags %s", (value, rule) => {
    expect(leaks({ field: value }).join()).toContain(rule);
  });

  it.each([
    "Brandon, FL",
    "brian@briankfung.com",
    "Am J Health Syst Pharm. 2023;80(4):175-176",
    "80 hospitals and clinics within a $1.5B enterprise program",
    "grew it organically to 10,000+ monthly views",
    "an enterprise authentication transition affecting 3,500+ nurses",
    "created 9 courses and 137 lessons",
    "Doctor of Pharmacy, 2009 - 2013",
    "benchmarking 24 LLM and prompting configurations",
  ])("allows %s", (value) => {
    expect(leaks({ field: value })).toEqual([]);
  });

  it("reports the path of the offending value", () => {
    const issues = lintPrivacy({ profile: { links: [{ url: "x@y.com" }] } });
    expect(issues[0]?.path).toBe("profile.links[0].url");
  });
});

describe("lintUniqueIds", () => {
  it("passes the real CV data", () => {
    expect(lintUniqueIds(cvData)).toEqual([]);
  });

  it("flags an id reused across sections", () => {
    const data = {
      experience: [{ id: "verily" }],
      projects: [{ id: "verily" }],
    } as unknown as CvData;
    expect(lintUniqueIds(data)).toHaveLength(1);
    expect(lintUniqueIds(data)[0].message).toContain('duplicate id "verily"');
  });
});

describe("lintCanonicalSite", () => {
  const flagged = (value: string, site = "https://www.example.com") =>
    lintCanonicalSite({ field: value }, site).length > 0;

  it("passes the real CV data", () => {
    expect(lintCanonicalSite(cvData, PERSONAL_SITE)).toEqual([]);
  });

  it.each([
    "https://example.com",
    "https://example.com/",
    "see http://example.com/page",
    "http://www.example.com",
  ])("flags %s when the site is www", (value) => {
    expect(flagged(value)).toBe(true);
  });

  it.each([
    "https://www.example.com/",
    "https://cv.example.com",
    "https://example.com.au",
    "example.com",
  ])("allows %s when the site is www", (value) => {
    expect(flagged(value)).toBe(false);
  });

  it("flags the www form when the canonical site is the bare domain", () => {
    expect(flagged("https://www.example.com", "https://example.com")).toBe(true);
    expect(flagged("https://example.com/about", "https://example.com")).toBe(false);
  });
});
