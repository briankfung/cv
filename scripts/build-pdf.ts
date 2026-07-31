/**
 * Compiles latex/generated/*.tex into public/pdf/*.pdf.
 *
 * Each document is compiled twice: the first pass writes the label that
 * `lastpage` needs, the second resolves "Page x of y" in the footer. There is
 * no latexmk on this machine, so the passes are explicit.
 */

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { relative } from "node:path";
import { variants } from "@/data/variants";
import type { VariantConfig } from "@/lib/cv/types";
import {
  BUILD_DIR,
  PDF_DIR,
  ROOT,
  XELATEX,
  builtPdfPath,
  publicPdfPath,
  texPath,
} from "./paths";

const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

if (!existsSync(XELATEX)) {
  console.error(
    red(`xelatex not found at ${XELATEX}.`) +
      "\n  Install MacTeX or BasicTeX, or set XELATEX_BIN to the binary.",
  );
  process.exit(1);
}

mkdirSync(BUILD_DIR, { recursive: true });
mkdirSync(PDF_DIR, { recursive: true });

function compile(variant: VariantConfig, pass: number) {
  const result = spawnSync(
    XELATEX,
    [
      "-interaction=nonstopmode",
      "-halt-on-error",
      `-output-directory=${BUILD_DIR}`,
      texPath(variant),
    ],
    { cwd: ROOT, encoding: "utf8" },
  );

  if (result.status !== 0) {
    const log = result.stdout ?? "";
    const errors = log
      .split("\n")
      .filter((line) => line.startsWith("!") || line.startsWith("l."))
      .slice(0, 12);
    console.error(
      red(`\n✗ ${variant.filename} failed to compile on pass ${pass}`),
    );
    for (const line of errors) console.error(`  ${line}`);
    console.error(dim(`\n  Full log: ${relative(ROOT, BUILD_DIR)}/${variant.filename}.log`));
    process.exit(1);
  }
}

/**
 * Reads the page count xelatex reports in its log. The log is hard-wrapped at
 * roughly 79 columns, often between the number and the word "pages", so
 * whitespace is collapsed before matching.
 */
function pageCount(variant: VariantConfig): number | undefined {
  const logPath = `${BUILD_DIR}/${variant.filename}.log`;
  if (!existsSync(logPath)) return undefined;
  const log = readFileSync(logPath, "utf8").replace(/\s+/g, " ");
  const match = log.match(/Output written on [^(]*\((\d+) pages?/);
  return match ? Number(match[1]) : undefined;
}

let warnings = 0;

for (const variant of variants) {
  compile(variant, 1);
  compile(variant, 2);
  copyFileSync(builtPdfPath(variant), publicPdfPath(variant));

  const pages = pageCount(variant);
  const budget = variant.maxPages;
  const over = budget !== undefined && pages !== undefined && pages > budget;
  if (over) warnings += 1;

  const label = `${variant.filename}.pdf`.padEnd(24);
  const pageLabel = pages === undefined ? "" : `${pages} page${pages === 1 ? "" : "s"}`;
  const note = over ? yellow(`  over the ${budget}-page budget`) : "";
  console.log(`  ${label} ${dim(pageLabel)}${note}`);
}

console.log(
  green(`✓ built ${variants.length} PDFs`) + dim(" → public/pdf/"),
);

if (warnings > 0) {
  console.log(
    yellow(
      `\n${warnings} document(s) exceeded their page budget. Tighten the variant's maxEntries or maxBulletsPerEntry in src/data/variants/.`,
    ),
  );
}
