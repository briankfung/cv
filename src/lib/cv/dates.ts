import type { CvDate, DateRange, EndDate } from "./types";

export const CV_DATE_PATTERN = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** En dash, the correct separator for a date range. */
const RANGE_DASH = "–";

export function isCvDate(value: string): boolean {
  return CV_DATE_PATTERN.test(value);
}

/** Sortable integer: `2022-09` becomes 202209, bare `2022` becomes 202200. */
export function dateSortKey(value: EndDate): number {
  if (value === "present") return Number.MAX_SAFE_INTEGER;
  const [year, month] = value.split("-");
  return Number(year) * 100 + (month ? Number(month) : 0);
}

/** `2022-09` becomes "Sep 2022"; `2022` stays "2022". */
export function formatDate(value: EndDate): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/**
 * Formats a range for display. A range that starts and ends inside the same
 * single year collapses to that year rather than repeating it.
 */
export function formatRange(range: DateRange): string {
  const start = formatDate(range.start);
  const end = formatDate(range.end);
  if (start === end) return start;
  return `${start} ${RANGE_DASH} ${end}`;
}

/** The value for an HTML `<time dateTime>` attribute. */
export function toISO(value: CvDate): string {
  return value;
}

/**
 * "Feb 2026, Feb 2025" — discrete dates for a repeated event, newest first so
 * the leading date matches the one the entry is sorted on.
 */
export function formatOccurrences(dates: CvDate[]): string {
  return [...dates]
    .sort((a, b) => dateSortKey(b) - dateSortKey(a))
    .map(formatDate)
    .join(", ");
}

export function rangeStartKey(range: DateRange): number {
  return dateSortKey(range.start);
}
