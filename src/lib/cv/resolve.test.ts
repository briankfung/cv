import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import { master } from "@/data/variants";
import { richToPlain } from "./rich";
import { resolveVariant, selectBullets, selectEntries } from "./resolve";
import type { Bullet, CvData, SectionConfig, VariantConfig } from "./types";

const entry = (id: string, tags?: CvData["experience"][number]["tags"]) => ({
  id,
  tags,
});

const section = (config: Partial<SectionConfig> = {}): SectionConfig => ({
  section: "experience",
  ...config,
});

describe("selectEntries", () => {
  const entries = [
    entry("a", ["ai"]),
    entry("b", ["clinical"]),
    entry("c", ["ai", "research"]),
  ];

  it("keeps everything by default", () => {
    expect(selectEntries(entries, section()).map((e) => e.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("selects by id, preserving data order rather than the listed order", () => {
    const picked = selectEntries(entries, section({ include: { ids: ["c", "a"] } }));
    expect(picked.map((e) => e.id)).toEqual(["a", "c"]);
  });

  it("selects by tag intersection", () => {
    const picked = selectEntries(entries, section({ include: { tags: ["ai"] } }));
    expect(picked.map((e) => e.id)).toEqual(["a", "c"]);
  });

  it("drops untagged entries when selecting by tag", () => {
    const picked = selectEntries(
      [entry("untagged")],
      section({ include: { tags: ["ai"] } }),
    );
    expect(picked).toEqual([]);
  });

  it("applies excludeIds after include", () => {
    const picked = selectEntries(
      entries,
      section({ include: { tags: ["ai"] }, excludeIds: ["a"] }),
    );
    expect(picked.map((e) => e.id)).toEqual(["c"]);
  });

  it("caps with maxEntries after filtering", () => {
    const picked = selectEntries(
      entries,
      section({ include: { tags: ["ai"] }, maxEntries: 1 }),
    );
    expect(picked.map((e) => e.id)).toEqual(["a"]);
  });
});

describe("selectBullets", () => {
  const bullets: Bullet[] = [
    { text: "untagged" },
    { text: "opted in", only: ["master"] },
    { text: "opted out", not: ["master"] },
  ];

  it("keeps untagged bullets", () => {
    expect(selectBullets([{ text: "untagged" }], "master")).toHaveLength(1);
  });

  it("keeps a bullet whose only list names the variant", () => {
    const picked = selectBullets(bullets, "master").map(richToPlain);
    expect(picked).toContain("opted in");
  });

  it("drops a bullet whose not list names the variant", () => {
    const picked = selectBullets(bullets, "master").map(richToPlain);
    expect(picked).not.toContain("opted out");
  });

  it("caps after filtering, not before", () => {
    const picked = selectBullets(bullets, "master", 1).map(richToPlain);
    expect(picked).toEqual(["untagged"]);
  });

  it("treats a missing bullet list as empty", () => {
    expect(selectBullets(undefined, "master")).toEqual([]);
  });
});

/** A second variant, defined here so the resolver keeps coverage of
 *  reordering, section omission, and caps now that only master is published. */
const trimmed: VariantConfig = {
  id: "master",
  label: "Trimmed",
  filename: "trimmed",
  description: "Fixture",
  sections: [
    { section: "profile" },
    { section: "experience", title: "Experience", maxBulletsPerEntry: 2 },
    { section: "education", maxEntries: 2 },
  ],
};

describe("resolveVariant", () => {
  it("renders master sections in configured order", () => {
    const resolved = resolveVariant(cvData, master);
    expect(resolved.sections.map((s) => s.id)).toEqual([
      "profile",
      "education",
      "training",
      "credentials",
      "appointments",
      "experience",
      "publications",
      "research",
      "presentations",
      "teaching",
      "service",
      "honors",
      "projects",
      "skills",
    ]);
  });

  it("omits sections the variant does not list", () => {
    const ids = resolveVariant(cvData, trimmed).sections.map((s) => s.id);
    expect(ids).toEqual(["profile", "experience", "education"]);
  });

  it("applies a section title override", () => {
    const resolved = resolveVariant(cvData, trimmed);
    const experience = resolved.sections.find((s) => s.id === "experience");
    expect(experience?.title).toBe("Experience");
  });

  it("caps entries within a section", () => {
    const resolved = resolveVariant(cvData, trimmed);
    const education = resolved.sections.find((s) => s.id === "education");
    expect(education?.entries).toHaveLength(2);
  });

  it("falls back to the default section title", () => {
    const resolved = resolveVariant(cvData, master);
    expect(resolved.sections.find((s) => s.id === "education")?.title).toBe(
      "Education",
    );
  });

  it("applies summaryOverride without mutating the source data", () => {
    const variant: VariantConfig = {
      ...master,
      summaryOverride: "Short summary.",
    };
    expect(resolveVariant(cvData, variant).profile.summary).toBe(
      "Short summary.",
    );
    expect(cvData.profile.summary).not.toBe("Short summary.");
  });

  it("drops a section whose entries all filter out", () => {
    const variant: VariantConfig = {
      ...master,
      sections: [{ section: "experience", include: { ids: ["nonexistent"] } }],
    };
    expect(resolveVariant(cvData, variant).sections).toEqual([]);
  });

  it("bolds the CV owner in a publication citation", () => {
    const resolved = resolveVariant(cvData, master);
    const pubs = resolved.sections.find((s) => s.id === "publications");
    const bolded = pubs?.entries[0].heading.filter((run) => run.bold);
    expect(bolded?.map((run) => run.text)).toEqual(["Fung B"]);
  });

  it("leads a titleless presentation with its role", () => {
    const resolved = resolveVariant(cvData, master);
    const talks = resolved.sections.find((s) => s.id === "presentations");
    const titleless = talks!.entries.find(
      (e) => e.id === "pres-cms-connectathon-2026",
    );
    expect(richToPlain(titleless!.heading)).toMatch(/^National workshop contributor/);
  });

  it("leads a titled presentation with its title", () => {
    const resolved = resolveVariant(cvData, master);
    const talks = resolved.sections.find((s) => s.id === "presentations");
    const titled = talks!.entries.find((e) => e.id === "pres-amia-symposium-2019");
    expect(richToPlain(titled!.heading)).toMatch(
      /^Conversion of a Complex Legacy Antimicrobial Stewardship/,
    );
  });

  it("formats a book chapter with its editors", () => {
    const resolved = resolveVariant(cvData, master);
    const pubs = resolved.sections.find((s) => s.id === "publications");
    const chapter = pubs!.entries.find(
      (e) => e.id === "pub-nursing-informatics-chapter-2022",
    );
    expect(richToPlain(chapter!.heading)).toContain("In: Ball MJ, ed.");
  });

  it("assigns each section a layout", () => {
    const resolved = resolveVariant(cvData, master);
    const layouts = Object.fromEntries(
      resolved.sections.map((s) => [s.id, s.layout]),
    );
    expect(layouts.profile).toBe("prose");
    expect(layouts.publications).toBe("numbered");
    expect(layouts.skills).toBe("skills");
    expect(layouts.experience).toBe("entries");
  });

  it("caps bullets per entry", () => {
    const resolved = resolveVariant(cvData, trimmed);
    const experience = resolved.sections.find((s) => s.id === "experience");
    for (const item of experience!.entries) {
      expect(item.bullets.length).toBeLessThanOrEqual(2);
    }
  });

  it("lists discrete occurrences instead of implying a continuous span", () => {
    const resolved = resolveVariant(cvData, master);
    const teaching = resolved.sections.find((s) => s.id === "teaching");
    const repeated = teaching!.entries.find((e) => e.id === "teach-jhu-fhir");
    expect(repeated?.dates).toBe("Feb 2026, Feb 2025");
    // A single <time> cannot represent two separate dates.
    expect(repeated?.datesISO).toBeUndefined();
  });

  it("sorts roles so an ongoing one outranks a finished one that started later", () => {
    const resolved = resolveVariant(cvData, master);
    const ids = resolved
      .sections.find((s) => s.id === "appointments")!
      .entries.map((e) => e.id);
    // UF started 2016 and is ongoing; Mayo started 2019 and ended in 2022.
    expect(ids).toEqual(["uf-clinical-assistant-professor", "mayo-instructor"]);
  });

  it("ranks credentials by when they were earned, not when they expire", () => {
    const resolved = resolveVariant(cvData, master);
    const ids = resolved
      .sections.find((s) => s.id === "credentials")!
      .entries.map((e) => e.id);
    // Earned Jan 2026, so it leads despite Epic and licensure running to present.
    expect(ids[0]).toBe("cna-florida");
    expect(ids.indexOf("fhir-foundation-implementer")).toBeLessThan(
      ids.indexOf("hl7-fhir-r4-proficiency"),
    );
  });

  it("keeps data-file order for entries that tie", () => {
    const resolved = resolveVariant(cvData, master);
    const ids = resolved
      .sections.find((s) => s.id === "credentials")!
      .entries.map((e) => e.id);
    expect(ids.indexOf("mayo-quality-fellow-silver")).toBeLessThan(
      ids.indexOf("mayo-quality-fellow-bronze"),
    );
  });

  it("orders publications newest first", () => {
    const resolved = resolveVariant(cvData, master);
    const years = resolved
      .sections.find((s) => s.id === "publications")!
      .entries.map((e) => Number(e.datesISO));
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("labels a project component and keeps it beneath its parent", () => {
    const resolved = resolveVariant(cvData, master);
    const projects = resolved.sections.find((s) => s.id === "projects")!;
    const ids = projects.entries.map((e) => e.id);
    expect(ids.indexOf("proj-cora")).toBe(ids.indexOf("proj-haau3") + 1);
    const cora = projects.entries.find((e) => e.id === "proj-cora");
    expect(richToPlain(cora!.subheading!)).toBe("Component of haau3");
  });

  it("prefixes a presentation's reach when its scope is known", () => {
    const resolved = resolveVariant(cvData, master);
    const talks = resolved.sections.find((s) => s.id === "presentations")!;
    const amia = talks.entries.find((e) => e.id === "pres-amia-symposium-2019");
    expect(richToPlain(amia!.heading)).toContain("National poster presentation.");
    // Institutional talks carry no scope, so the label stays unqualified.
    const inService = talks.entries.find((e) => e.id === "pres-smh-mupirocin-2014");
    expect(richToPlain(inService!.heading)).toContain("In-service presentation.");
  });

  it("does not double the full stop after a title ending in punctuation", () => {
    const resolved = resolveVariant(cvData, master);
    const talks = resolved.sections.find((s) => s.id === "presentations")!;
    const question = talks.entries.find(
      (e) => e.id === "pres-utah-meaningful-use-2014",
    );
    expect(richToPlain(question!.heading)).toContain("Right? University of Utah");
    expect(richToPlain(question!.heading)).not.toContain("?.");
  });

  it("sorts projects but keeps a component beneath its parent", () => {
    const resolved = resolveVariant(cvData, master);
    const ids = resolved
      .sections.find((s) => s.id === "projects")!
      .entries.map((e) => e.id);
    expect(ids.indexOf("proj-cora")).toBe(ids.indexOf("proj-haau3") + 1);
    // Ongoing projects outrank finished ones: Ovant (Jul 2026 – present)
    // outranks haau3 (Nov 2025 – present), which outranks medlistIQ (ended
    // May 2026) even though medlistIQ started later.
    expect(ids.indexOf("proj-ovant")).toBeLessThan(ids.indexOf("proj-haau3"));
    expect(ids.indexOf("proj-haau3")).toBeLessThan(ids.indexOf("proj-medlistiq"));
  });

  it("omits dates for an entry that has none on record", () => {
    const resolved = resolveVariant(cvData, master);
    const service = resolved.sections.find((s) => s.id === "service");
    const smart = service!.entries.find(
      (e) => e.id === "svc-smart-scheduling-links",
    );
    expect(smart?.dates).toBeUndefined();
  });
});

describe("optional memberships section", () => {
  const variant: VariantConfig = {
    ...master,
    sections: [{ section: "memberships" }],
  };

  it("is skipped when the data has no memberships", () => {
    const withoutMemberships: CvData = { ...cvData };
    delete withoutMemberships.memberships;
    expect(resolveVariant(withoutMemberships, variant).sections).toEqual([]);
    expect(
      resolveVariant({ ...cvData, memberships: [] }, variant).sections,
    ).toEqual([]);
  });

  it("orders ongoing first, then by end date, with undated entries last", () => {
    const data: CvData = {
      ...cvData,
      memberships: [
        { id: "m-undated", org: "Undated Society" },
        { id: "m-old", org: "Old Society", dates: { start: "2011", end: "2015" } },
        { id: "m-current", org: "Current Society", dates: { start: "2016", end: "present" } },
        { id: "m-recent", org: "Recent Society", dates: { start: "2013", end: "2020" } },
      ],
    };
    const section = resolveVariant(data, variant).sections[0];
    expect(section.title).toBe("Professional Memberships");
    expect(section.layout).toBe("entries");
    expect(section.entries.map((e) => e.id)).toEqual([
      "m-current",
      "m-recent",
      "m-old",
      "m-undated",
    ]);
    expect(section.entries[3].dates).toBeUndefined();
  });

  it("links the organization and shows a held role", () => {
    const data: CvData = {
      ...cvData,
      memberships: [
        {
          id: "m-fellow",
          org: "Some Society",
          role: "Fellow",
          url: "https://example.org",
          dates: { start: "2020", end: "present" },
        },
      ],
    };
    const [entry] = resolveVariant(data, variant).sections[0].entries;
    expect(entry.heading).toEqual([
      { text: "Some Society", href: "https://example.org", bold: true },
    ]);
    expect(richToPlain(entry.subheading!)).toBe("Fellow");
    expect(entry.dates).toBe("2020 – Present");
  });
});

describe("optional media section", () => {
  const variant: VariantConfig = {
    ...master,
    sections: [{ section: "media" }],
  };

  it("is skipped when the data has no media", () => {
    const withoutMedia: CvData = { ...cvData };
    delete withoutMedia.media;
    expect(resolveVariant(withoutMedia, variant).sections).toEqual([]);
  });

  it("renders a numbered list, newest first", () => {
    const data: CvData = {
      ...cvData,
      media: [
        { id: "media-old", kind: "podcast", title: "Old", outlet: "Show", date: "2017-12" },
        { id: "media-new", kind: "press", title: "New", outlet: "Paper", date: "2026-09" },
      ],
    };
    const section = resolveVariant(data, variant).sections[0];
    expect(section.title).toBe("Media & Podcasts");
    expect(section.layout).toBe("numbered");
    expect(section.entries.map((e) => e.id)).toEqual(["media-new", "media-old"]);
    expect(section.entries[0].datesISO).toBe("2026-09");
  });
});
