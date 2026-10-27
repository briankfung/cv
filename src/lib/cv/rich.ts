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

/**
 * Splits a sentence into runs, linking each span in `links`. Spans are matched
 * left to right, each searched for after the previous one ends, so the same
 * words can be linked twice. Returns null when a span is not found: the schema
 * rejects that data, and the resolver refuses it, so a typo can never quietly
 * drop a link.
 */
export function linkSpans(
  value: string,
  links: readonly { text: string; href: string }[] = [],
): Rich | null {
  const runs: Run[] = [];
  let cursor = 0;
  for (const span of links) {
    const start = value.indexOf(span.text, cursor);
    if (start === -1) return null;
    runs.push(text(value.slice(cursor, start)), link(span.text, span.href));
    cursor = start + span.text.length;
  }
  runs.push(text(value.slice(cursor)));
  return rich(runs);
}

/** Plain-text projection, used for `alt` text and OpenGraph descriptions. */
export function richToPlain(runs: Rich): string {
  return runs.map((run) => run.text).join("");
}
