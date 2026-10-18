import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import type { Profile } from "@/lib/cv/types";
import { describeProfile, documentTitle } from "./meta";

const profile = (overrides: Partial<Profile>): Profile => ({
  ...cvData.profile,
  summary: undefined,
  highlights: undefined,
  ...overrides,
});

describe("documentTitle", () => {
  it("puts the post-nominals after the name", () => {
    expect(documentTitle(profile({ name: "Jane Doe", credentials: "MD, PhD" }))).toBe(
      "Jane Doe, MD, PhD — Curriculum Vitae",
    );
  });

  it("drops the comma when there are no post-nominals", () => {
    expect(documentTitle(profile({ name: "Jane Doe", credentials: "" }))).toBe(
      "Jane Doe — Curriculum Vitae",
    );
  });
});

describe("describeProfile", () => {
  it("prefers the configured description", () => {
    expect(describeProfile(profile({ summary: "A. B." }), "Configured.")).toBe(
      "Configured.",
    );
  });

  it("falls back to the summary's first sentence", () => {
    expect(
      describeProfile(profile({ summary: "First sentence here. Second one." }), undefined),
    ).toBe("First sentence here.");
  });

  it("falls back to the first highlight, then to a generic line", () => {
    expect(describeProfile(profile({ highlights: ["Did a thing."] }), undefined)).toBe(
      "Did a thing.",
    );
    expect(describeProfile(profile({ name: "Jane Doe" }), undefined)).toBe(
      "Curriculum vitae of Jane Doe.",
    );
  });
});
