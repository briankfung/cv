import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("stamps every URL with the content date, never the build clock", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(1);
    for (const entry of entries) {
      expect(entry.lastModified).toBe(cvData.profile.updated);
    }
  });
});
