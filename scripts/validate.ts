/**
 * Build gate for the CV data. Runs before `next build` and in CI.
 *
 * Catches three classes of problem: shape errors the TypeScript types cannot
 * express (date formats, id casing), cross-entry invariants (duplicate ids),
 * and privacy leaks — this repository is public, so the only personal
 * identifiers allowed are the published email address and city.
 */

import { cvData } from "@/data/cv";
import { variants } from "@/data/variants";
import { lintCv } from "@/lib/cv/lint";
import { cvDataSchema, variantConfigSchema } from "@/lib/cv/schema";
import { PERSONAL_SITE } from "@/lib/seo/site";

const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

function fail(heading: string, lines: string[]): never {
  console.error(red(`\n${heading}`));
  for (const line of lines) console.error(`  ${line}`);
  console.error("");
  process.exit(1);
}

const parsed = cvDataSchema.safeParse(cvData);
if (!parsed.success) {
  fail(
    "CV data failed schema validation:",
    parsed.error.issues.map(
      (issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`,
    ),
  );
}

for (const variant of variants) {
  const result = variantConfigSchema.safeParse(variant);
  if (!result.success) {
    fail(
      `Variant "${variant.id}" failed schema validation:`,
      result.error.issues.map(
        (issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`,
      ),
    );
  }
}

const issues = lintCv(cvData, { personalSite: PERSONAL_SITE });
if (issues.length > 0) {
  fail(
    "CV data failed lint checks:",
    issues.map((issue) => `${issue.path}: ${issue.message}`),
  );
}

const entryCount = Object.values(cvData)
  .filter(Array.isArray)
  .reduce((total, list) => total + list.length, 0);

console.log(
  green("✓ CV data valid") +
    dim(` — ${entryCount} entries, ${variants.length} variants`),
);
