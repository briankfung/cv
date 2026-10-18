/**
 * AMA-style citation formatting, emitted as rich-text runs so the LaTeX and
 * HTML renderers apply their own emphasis and escaping.
 */

import { formatDate } from "./dates";
import { bold, italic, link, rich, text } from "./rich";
import type {
  PresentationEntry,
  PresentationScope,
  PresentationType,
  PublicationEntry,
  Rich,
} from "./types";

const PRESENTATION_SCOPE: Record<PresentationScope, string> = {
  international: "International",
  national: "National",
  regional: "Regional",
};

const PRESENTATION_ROLE: Record<PresentationType, string> = {
  invited: "Invited presentation",
  podium: "Podium presentation",
  panel: "Panel presentation",
  poster: "Poster presentation",
  workshop: "Workshop contributor",
  lecture: "Lecture",
  "continuing-education": "Continuing education presentation",
  "in-service": "In-service presentation",
};

/**
 * A title that already ends in terminal punctuation should not collect a second
 * full stop, or "Are We Doing This Right?" renders as "Right?.".
 */
function terminator(title: string): string {
  return /[.?!]$/.test(title.trim()) ? "" : ".";
}

/** Bolds the author entry that matches the CV owner's surname. */
function authorRuns(authors: string[], selfAuthor: string): Rich {
  return authors.flatMap((author, index) => {
    const separator = index < authors.length - 1 ? ", " : "";
    const run = author.startsWith(selfAuthor) ? bold(author) : text(author);
    return separator ? [run, text(separator)] : [run];
  });
}

/**
 * AMA locator. Proceedings abstracts often have pages but no volume, which AMA
 * writes as `2019:1582` rather than `2019;:1582`.
 */
function journalTail(pub: PublicationEntry): string {
  const volume = pub.volume ?? "";
  const issue = pub.issue ? `(${pub.issue})` : "";
  const pages = pub.pages ? `:${pub.pages}` : "";
  if (!volume && !issue) return `${pub.year}${pages}.`;
  return `${pub.year};${volume}${issue}${pages}.`;
}

/** Bracketed after the title, so the kind of item is visible in the citation. */
const PUBLICATION_LABEL: Partial<Record<PublicationEntry["type"], string>> = {
  letter: "letter",
  abstract: "abstract",
};

export function formatPublication(
  pub: PublicationEntry,
  selfAuthor: string,
): Rich {
  const authors = authorRuns(pub.authors, selfAuthor);
  const doi = pub.doi
    ? [text(" "), link(`doi:${pub.doi}`, `https://doi.org/${pub.doi}`)]
    : null;
  const pmid = pub.pmid
    ? [
        text(" PMID: "),
        link(pub.pmid, `https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`),
      ]
    : null;

  if (pub.type === "chapter") {
    // AMA order: authors. Chapter title. In: Editors, ed. Book title. Edition.
    // Publisher; year.
    const editors = pub.editors?.length
      ? text(`${pub.editors.join(", ")}, ed${pub.editors.length > 1 ? "s" : ""}. `)
      : null;
    const edition = pub.edition ? text(`${pub.edition}. `) : null;
    const imprint = [pub.place, pub.publisher].filter(Boolean).join(": ");
    const publisher = imprint ? `${imprint}; ` : "";
    return rich(
      authors,
      text(`. ${pub.title}${terminator(pub.title)} In: `),
      editors,
      italic(pub.venue),
      text(". "),
      edition,
      text(`${publisher}${pub.year}.`),
      doi,
      pmid,
    );
  }

  const label = PUBLICATION_LABEL[pub.type];
  const title = label
    ? `${pub.title} [${label}].`
    : `${pub.title}${terminator(pub.title)}`;

  return rich(
    authors,
    text(`. ${title} `),
    italic(pub.venue),
    text(`. ${journalTail(pub)}`),
    doi,
    pmid,
  );
}

export function formatPresentation(entry: PresentationEntry): Rich {
  const accreditation = entry.accreditation?.length
    ? ` (${entry.accreditation.join(", ")})`
    : "";
  const base = PRESENTATION_ROLE[entry.type];
  const role = entry.scope
    ? `${PRESENTATION_SCOPE[entry.scope]} ${base.toLowerCase()}${accreditation}`
    : `${base}${accreditation}`;
  const where = entry.location ? `${entry.venue}; ${entry.location}` : entry.venue;
  const when = formatDate(entry.date);

  if (entry.title) {
    return rich(
      italic(entry.title),
      text(`${terminator(entry.title)} ${where}; ${when}. ${role}.`),
    );
  }
  return rich(text(`${role}. ${where}; ${when}.`));
}
