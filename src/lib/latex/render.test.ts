import { describe, expect, it } from "vitest";
import { cvData } from "@/data/cv";
import { master } from "@/data/variants";
import { resolveVariant } from "@/lib/cv/resolve";
import { renderLatexDocument } from "./render";

const resolved = resolveVariant(cvData, master);

describe("renderLatexDocument metadata", () => {
  it("writes escaped PDF title, author and subject after the preamble", () => {
    const tex = renderLatexDocument(resolved, "% preamble", {
      title: "Jane Doe, MD & PhD — Curriculum Vitae",
      author: "Jane Doe",
      subject: "Founder of 50% of things.",
    });
    expect(tex).toContain("pdftitle={Jane Doe, MD \\& PhD — Curriculum Vitae}");
    expect(tex).toContain("pdfauthor={Jane Doe}");
    expect(tex).toContain("pdfsubject={Founder of 50\\% of things.}");
    expect(tex.indexOf("\\hypersetup{")).toBeGreaterThan(tex.indexOf("% preamble"));
    expect(tex.indexOf("\\hypersetup{")).toBeLessThan(tex.indexOf("\\begin{document}"));
  });

  it("omits the block when no metadata is given", () => {
    expect(renderLatexDocument(resolved, "% preamble")).not.toContain("pdftitle");
  });
});
