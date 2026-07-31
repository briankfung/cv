import { join } from "node:path";
import type { VariantConfig } from "@/lib/cv/types";

export const ROOT = process.cwd();

export const LATEX_DIR = join(ROOT, "latex");
export const PREAMBLE_PATH = join(LATEX_DIR, "preamble.tex");
export const GENERATED_DIR = join(LATEX_DIR, "generated");
export const BUILD_DIR = join(LATEX_DIR, "build");
export const PDF_DIR = join(ROOT, "public", "pdf");

export const texPath = (variant: VariantConfig) =>
  join(GENERATED_DIR, `${variant.filename}.tex`);

export const builtPdfPath = (variant: VariantConfig) =>
  join(BUILD_DIR, `${variant.filename}.pdf`);

export const publicPdfPath = (variant: VariantConfig) =>
  join(PDF_DIR, `${variant.filename}.pdf`);

/**
 * Absolute path so the build works from a GUI-launched shell, where
 * /Library/TeX/texbin is often missing from PATH. Overridable for CI, where
 * xelatex comes from the container image instead.
 */
export const XELATEX =
  process.env.XELATEX_BIN ?? "/Library/TeX/texbin/xelatex";
