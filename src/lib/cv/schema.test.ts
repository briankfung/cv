import { describe, expect, it } from "vitest";
import { cvDataSchema } from "./schema";
import type { Bullet } from "./types";

/** A minimal project carrying one bullet, parsed the way `pnpm validate` parses the data. */
const parseBullet = (bullet: Bullet) =>
  cvDataSchema.shape.projects.element.safeParse({
    id: "proj-example",
    name: "Example",
    tagline: "An example project.",
    bullets: [bullet],
  });

describe("bullet links", () => {
  it("accept spans that appear in the text, in order", () => {
    const result = parseBullet({
      text: "Read the guide and the source.",
      links: [
        { text: "the guide", href: "https://example.org/guide" },
        { text: "the source", href: "https://example.org/source" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it.each([
    ["a span missing from the text", [{ text: "the docs", href: "https://example.org/docs" }]],
    [
      "spans listed out of order",
      [
        { text: "the source", href: "https://example.org/source" },
        { text: "the guide", href: "https://example.org/guide" },
      ],
    ],
    ["a link that is not a URL", [{ text: "the guide", href: "not a url" }]],
  ])("reject %s", (_, links) => {
    const result = parseBullet({ text: "Read the guide and the source.", links });
    expect(result.success).toBe(false);
  });
});
