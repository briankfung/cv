import { describe, expect, it } from "vitest";
import { escapeLatex, escapeLatexUrl } from "./escape";

describe("escapeLatex", () => {
  it.each([
    ["&", "\\&"],
    ["%", "\\%"],
    ["$", "\\$"],
    ["#", "\\#"],
    ["_", "\\_"],
    ["{", "\\{"],
    ["}", "\\}"],
    ["~", "\\textasciitilde{}"],
    ["^", "\\textasciicircum{}"],
    ["\\", "\\textbackslash{}"],
  ])("escapes %s", (input, expected) => {
    expect(escapeLatex(input)).toBe(expected);
  });

  it("does not double-escape the braces it introduces for a backslash", () => {
    expect(escapeLatex("\\")).toBe("\\textbackslash{}");
    expect(escapeLatex("a\\b")).toBe("a\\textbackslash{}b");
  });

  it("handles every special character in one string", () => {
    expect(escapeLatex("\\{}&%$#_~^")).toBe(
      "\\textbackslash{}\\{\\}\\&\\%\\$\\#\\_\\textasciitilde{}\\textasciicircum{}",
    );
  });

  it("escapes repeated occurrences", () => {
    expect(escapeLatex("R&D and Q&A")).toBe("R\\&D and Q\\&A");
  });

  it.each([
    ["Product, Engineering, UX & Research", "Product, Engineering, UX \\& Research"],
    ["a $1.5B enterprise program", "a \\$1.5B enterprise program"],
    ["@briankfung/fhir-types", "@briankfung/fhir-types"],
    ["speech_to_speech", "speech\\_to\\_speech"],
    ["top-10 Google search visibility", "top-10 Google search visibility"],
    ["100% coverage", "100\\% coverage"],
  ])("escapes real CV text: %s", (input, expected) => {
    expect(escapeLatex(input)).toBe(expected);
  });

  it("passes Unicode through for xelatex to handle", () => {
    expect(escapeLatex("Jun 2025 – Present")).toBe("Jun 2025 – Present");
    expect(escapeLatex("café — naïve “quoted”")).toBe("café — naïve “quoted”");
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeLatex("Clinical Informatics Pharmacist")).toBe(
      "Clinical Informatics Pharmacist",
    );
  });

  it("returns an empty string unchanged", () => {
    expect(escapeLatex("")).toBe("");
  });

  it("is idempotent only in the sense that output is stable input for TeX", () => {
    // Escaping twice is a bug at the call site, and this documents what it costs.
    expect(escapeLatex(escapeLatex("&"))).toBe("\\textbackslash{}\\&");
  });
});

describe("escapeLatexUrl", () => {
  it("escapes percent and hash, which break \\href", () => {
    expect(escapeLatexUrl("https://x.test/a%20b#frag")).toBe(
      "https://x.test/a\\%20b\\#frag",
    );
  });

  it("leaves tildes and underscores alone, since they are legal in a URL argument", () => {
    expect(escapeLatexUrl("https://x.test/~user/a_b")).toBe(
      "https://x.test/~user/a_b",
    );
  });

  it("leaves the real CV links unchanged", () => {
    for (const url of [
      "https://briankfung.com",
      "https://www.linkedin.com/in/briankfung/",
      "https://github.com/briankfung",
      "https://www.npmjs.com/package/@briankfung/fhir-types",
      "https://public-fhir-server.vercel.app",
    ]) {
      expect(escapeLatexUrl(url)).toBe(url);
    }
  });
});
