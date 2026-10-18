import { describe, expect, it } from "vitest";
import { formatPublication } from "./citations";
import { richToPlain } from "./rich";
import type { PublicationEntry } from "./types";

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
