import { describe, expect, it } from "vitest";
import { formatMedia, formatPresentation, formatPublication } from "./citations";
import { richToPlain } from "./rich";
import type { MediaEntry, PresentationEntry, PublicationEntry } from "./types";

const base: PublicationEntry = {
  id: "pub-fixture",
  type: "journal-article",
  authors: ["Doe J", "Roe A"],
  title: "A study of things",
  venue: "Journal of Things",
  year: 2023,
  volume: "80",
  issue: "4",
  pages: "175-176",
};

const cite = (pub: Partial<PublicationEntry>) =>
  richToPlain(formatPublication({ ...base, ...pub }, "Roe"));

describe("formatPublication", () => {
  it("cites a journal article without a type label", () => {
    expect(cite({})).toBe(
      "Doe J, Roe A. A study of things. Journal of Things. 2023;80(4):175-176.",
    );
  });

  it("labels a letter so it does not read as a research article", () => {
    expect(cite({ type: "letter" })).toBe(
      "Doe J, Roe A. A study of things [letter]. Journal of Things. 2023;80(4):175-176.",
    );
  });

  it("labels a proceedings abstract and drops the empty volume separator", () => {
    expect(
      cite({
        type: "abstract",
        venue: "Annual Symposium Proceedings",
        year: 2019,
        volume: undefined,
        issue: undefined,
        pages: "1582",
      }),
    ).toBe(
      "Doe J, Roe A. A study of things [abstract]. Annual Symposium Proceedings. 2019:1582.",
    );
  });

  it("links a PMID to PubMed after the DOI", () => {
    const runs = formatPublication(
      { ...base, doi: "10.1000/xyz", pmid: "36377862" },
      "Roe",
    );
    expect(richToPlain(runs)).toMatch(/doi:10\.1000\/xyz PMID: 36377862$/);
    expect(runs.find((run) => run.text === "36377862")?.href).toBe(
      "https://pubmed.ncbi.nlm.nih.gov/36377862/",
    );
  });

  it("bolds the CV owner whatever the publication type", () => {
    const runs = formatPublication({ ...base, type: "abstract" }, "Roe");
    expect(runs.filter((run) => run.bold).map((run) => run.text)).toEqual([
      "Roe A",
    ]);
  });
});

describe("formatPresentation", () => {
  const talk: PresentationEntry = {
    id: "pres-fixture",
    title: "On things",
    venue: "Things Conference",
    date: "2024-04",
    type: "invited",
    scope: "national",
  };

  it("links an italic title when the talk has a public URL", () => {
    const runs = formatPresentation({ ...talk, url: "https://example.org/talk" });
    const title = runs.find((run) => run.text === "On things");
    expect(title).toMatchObject({ italic: true, href: "https://example.org/talk" });
    expect(richToPlain(runs)).toBe(
      "On things. Things Conference; Apr 2024. National invited presentation.",
    );
  });

  it("links the venue of a titleless talk instead", () => {
    const runs = formatPresentation({
      ...talk,
      title: undefined,
      url: "https://example.org/agenda",
    });
    expect(runs.find((run) => run.href)?.text).toBe("Things Conference");
    expect(richToPlain(runs)).toBe(
      "National invited presentation. Things Conference; Apr 2024.",
    );
  });

  it("renders unchanged without a URL", () => {
    const runs = formatPresentation({ ...talk, location: "Denver, CO" });
    expect(runs.some((run) => run.href)).toBe(false);
    expect(richToPlain(runs)).toBe(
      "On things. Things Conference; Denver, CO; Apr 2024. National invited presentation.",
    );
  });
});

describe("formatMedia", () => {
  const episode: MediaEntry = {
    id: "media-fixture",
    kind: "podcast",
    title: "Episode 12: On things",
    outlet: "Things Podcast",
    date: "2023-08",
  };

  it("cites a podcast with a role label", () => {
    expect(richToPlain(formatMedia(episode))).toBe(
      "Episode 12: On things. Things Podcast; Aug 2023. Podcast guest.",
    );
  });

  it("links the italic title and appends a note", () => {
    const runs = formatMedia({
      ...episode,
      kind: "press",
      url: "https://example.org/a",
      note: "Profile of the author's work",
    });
    expect(runs[0]).toMatchObject({ italic: true, href: "https://example.org/a" });
    expect(richToPlain(runs)).toBe(
      "Episode 12: On things. Things Podcast; Aug 2023. Press feature. Profile of the author's work.",
    );
  });

  it("does not double punctuation after a question title", () => {
    expect(
      richToPlain(formatMedia({ ...episode, kind: "guest-post", title: "Why things?" })),
    ).toBe("Why things? Things Podcast; Aug 2023. Guest post.");
  });
});
