import type { Profile } from "@/lib/cv/types";
import { SITE_DESCRIPTION } from "./site";

/**
 * The document title for the page and the PDF. Post-nominals go in, so a
 * search result tells the CV owner apart from a namesake at a glance.
 */
export function documentTitle(profile: Profile): string {
  const name = profile.credentials
    ? `${profile.name}, ${profile.credentials}`
    : profile.name;
  return `${name} — Curriculum Vitae`;
}

function firstSentence(text: string | undefined): string | undefined {
  const match = text?.trim().match(/^.+?[.!?](?=\s|$)/);
  return match?.[0];
}

/**
 * The meta description. Search results show roughly the first 155
 * characters, so an explicit one is best; otherwise the opening sentence of
 * the summary (or the first highlight) stands in.
 */
export function documentDescription(
  profile: Profile,
  override: string | undefined = SITE_DESCRIPTION,
): string {
  return (
    override ??
    firstSentence(profile.summary) ??
    profile.highlights?.[0] ??
    `Curriculum vitae of ${profile.name}.`
  );
}
