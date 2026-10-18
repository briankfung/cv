/**
 * Regenerates latex/generated/*.tex from the CV data.
 *
 * The output is committed. CI regenerates and diffs it, so data changes that
 * were never regenerated fail the build rather than shipping a stale PDF.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cvData } from "@/data/cv";
import { variants } from "@/data/variants";
import { resolveVariant } from "@/lib/cv/resolve";
import { renderLatexDocument } from "@/lib/latex/render";
import { documentDescription, documentTitle } from "@/lib/seo/meta";
import { GENERATED_DIR, PREAMBLE_PATH, texPath } from "./paths";

const preamble = readFileSync(PREAMBLE_PATH, "utf8");

// The PDF carries the same title and description as the web page.
const metadata = {
  title: documentTitle(cvData.profile),
  author: cvData.profile.name,
  subject: documentDescription(cvData.profile),
};
mkdirSync(GENERATED_DIR, { recursive: true });

for (const variant of variants) {
  const resolved = resolveVariant(cvData, variant);
  const document = renderLatexDocument(resolved, preamble, metadata);
  const path = texPath(variant);
  writeFileSync(path, document, "utf8");
  console.log(
    `  ${variant.id.padEnd(9)} ${resolved.sections.length} sections  →  ${join(
      "latex/generated",
      `${variant.filename}.tex`,
    )}`,
  );
}

console.log(`\x1b[32m✓ generated ${variants.length} LaTeX documents\x1b[0m`);
