import type { Rich, Run } from "./types";

export const text = (value: string): Run => ({ text: value });
export const bold = (value: string): Run => ({ text: value, bold: true });
export const italic = (value: string): Run => ({ text: value, italic: true });
export const link = (value: string, href: string): Run => ({
  text: value,
  href,
});

/** Drops empty runs so callers can build citations with conditional pieces. */
export function rich(...runs: (Run | Rich | null | undefined)[]): Rich {
  return runs
    .flatMap((run) => (Array.isArray(run) ? run : run ? [run] : []))
    .filter((run) => run.text.length > 0);
}

/** Plain-text projection, used for `alt` text and OpenGraph descriptions. */
export function richToPlain(runs: Rich): string {
  return runs.map((run) => run.text).join("");
}
