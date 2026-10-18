/**
 * Authoring types for the CV. These shapes are what the data files in
 * `src/data/cv/` are written against: semantic, one shape per section kind.
 *
 * Rendering (LaTeX and HTML) does not consume these directly. It consumes the
 * normalized `RenderSection`/`RenderEntry` shapes produced by `resolve.ts`, so
 * that both output formats stay in lockstep.
 */

/**
 * Add an id here and a config in src/data/variants to publish another document.
 * The PDF build, the download links, and the sitemap all read from that list.
 */
export const VARIANT_IDS = ["master"] as const;
export type VariantId = (typeof VARIANT_IDS)[number];

export const TAGS = [
  "ai",
  "clinical",
  "product",
  "engineering",
  "research",
  "leadership",
  "standards",
  "teaching",
  "trainee",
] as const;
export type Tag = (typeof TAGS)[number];

/** `YYYY` or `YYYY-MM`. */
export type CvDate = string;
/** A date, or the open-ended present. */
export type EndDate = CvDate | "present";

export interface DateRange {
  start: CvDate;
  end: EndDate;
}

/**
 * A bullet with optional per-variant visibility. `only` restricts the bullet to
 * the listed variants; `not` hides it from them.
 */
export interface Bullet {
  text: string;
  only?: VariantId[];
  not?: VariantId[];
}

interface Taggable {
  id: string;
  tags?: Tag[];
}

/** Experience, academic appointments, postgraduate training, teaching, service. */
export interface PositionEntry extends Taggable {
  title: string;
  org: string;
  location?: string;
  /** Optional because some service roles have no publicly recorded term. */
  dates?: DateRange;
  /**
   * Discrete dates for something delivered more than once, such as a guest
   * lecture given in two separate terms. Takes precedence over `dates`, which
   * would otherwise imply a continuous engagement across the whole span.
   */
  occurrences?: CvDate[];
  /** Shown under the org line, before bullets. */
  summary?: string;
  bullets?: Bullet[];
  url?: string;
}

export interface EducationEntry extends Taggable {
  degree: string;
  field?: string;
  institution: string;
  location?: string;
  dates: DateRange;
  note?: string;
}

export interface CredentialEntry extends Taggable {
  name: string;
  issuer?: string;
  /**
   * Period held. A credential that has lapsed keeps its real end year rather
   * than reading as current; omit entirely when no date is on record.
   */
  dates?: DateRange;
  abbreviation?: string;
  /** Sub-credentials, badges, or jurisdictions listed under the entry. */
  items?: string[];
}

/**
 * `letter` and `abstract` cite like a journal article but carry a bracketed
 * label, so a reader can tell correspondence and published conference
 * abstracts apart from peer-reviewed articles.
 */
export type PublicationType =
  | "journal-article"
  | "letter"
  | "abstract"
  | "chapter"
  | "preprint";

export interface PublicationEntry extends Taggable {
  type: PublicationType;
  /** AMA order, as printed. e.g. `["Lessard S", "Fung BK"]`. */
  authors: string[];
  title: string;
  /** Journal name, or book title for a chapter. */
  venue: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  /** Book editors, for chapters. Rendered as "In: Ball MJ, ed. <book>." */
  editors?: string[];
  /** Place of publication, for chapters. Rendered as "New York: Springer". */
  place?: string;
  /** Publisher, for chapters. */
  publisher?: string;
  edition?: string;
  doi?: string;
  /** PubMed identifier, rendered after the DOI as a link to PubMed. */
  pmid?: string;
  url?: string;
}

/** Investigator-led research projects, distinct from peer-reviewed output. */
export interface ResearchEntry extends Taggable {
  title: string;
  dates: DateRange;
  org?: string;
  role?: string;
  /** Public artifact, for work released as code or data. */
  url?: string;
}

export type PresentationType =
  | "invited"
  | "podium"
  | "panel"
  | "poster"
  | "workshop"
  | "lecture"
  | "continuing-education"
  | "in-service";

/**
 * Audience reach, which `type` does not capture. Left unset for institutional
 * talks, so the label only appears where it distinguishes something.
 */
export type PresentationScope = "international" | "national" | "regional";

export interface PresentationEntry extends Taggable {
  /**
   * Omit when the talk title is not on record. The renderer then leads with the
   * role and venue rather than inventing one.
   */
  title?: string;
  /** Conference, organization, or course hosting the talk. */
  venue: string;
  location?: string;
  date: CvDate;
  type: PresentationType;
  scope?: PresentationScope;
  /**
   * Accrediting bodies for a continuing education presentation, e.g. ACPE or
   * ANCC. Accredited CE is a different credential from an in-service talk, and
   * a pharmacy reader looks for the distinction.
   */
  accreditation?: string[];
  url?: string;
}

export type MediaKind = "podcast" | "press" | "guest-post";

/**
 * An appearance in someone else's outlet: a podcast interview, a press piece
 * about the CV owner, or a guest post. Optional as a section.
 */
export interface MediaEntry extends Taggable {
  kind: MediaKind;
  /** Episode, article, or post title as published. */
  title: string;
  /** Show, publication, or site. */
  outlet: string;
  date: CvDate;
  url?: string;
  /** One short sentence of context, printed after the citation. */
  note?: string;
}

export interface HonorEntry extends Taggable {
  title: string;
  org?: string;
  /**
   * A range for an honor held or earned across several years, such as a dean's
   * list. `start === end` collapses to a single year when rendered. Optional
   * because some honors have no recorded date.
   */
  dates?: DateRange;
  note?: string;
  /** Public record of the award, where one exists. */
  url?: string;
}

/**
 * A professional society or organization membership. Optional as a section:
 * a CV without memberships simply omits the data and the section.
 */
export interface MembershipEntry extends Taggable {
  org: string;
  /** Optional because many memberships have no recorded term. */
  dates?: DateRange;
  /** A held position such as "Fellow"; omit for ordinary membership. */
  role?: string;
  url?: string;
}

export interface ProjectEntry extends Taggable {
  name: string;
  tagline: string;
  /**
   * Id of the project this one is a component of. The renderer labels it and
   * keeps it directly beneath its parent, so a sub-component does not read as a
   * separate product.
   */
  partOf?: string;
  url?: string;
  dates?: DateRange;
  bullets?: Bullet[];
  /** Language/stack labels shown as chips on the web, inline in LaTeX. */
  stack?: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface ProfileLink {
  label: string;
  /** Shown as the link text; `url` is the target. */
  display: string;
  url: string;
}

export interface Profile {
  name: string;
  /** Post-nominals, e.g. "PharmD, MPH, BCPS". */
  credentials: string;
  headline: string;
  email: string;
  location: string;
  links: ProfileLink[];
  summary: string;
  /** Author surname to bold in publication citations; matched as a prefix. */
  selfAuthor: string;
}

export const SECTION_IDS = [
  "profile",
  "education",
  "training",
  "credentials",
  "appointments",
  "experience",
  "publications",
  "research",
  "presentations",
  "media",
  "teaching",
  "service",
  "memberships",
  "honors",
  "projects",
  "skills",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface CvData {
  profile: Profile;
  education: EducationEntry[];
  training: PositionEntry[];
  credentials: CredentialEntry[];
  appointments: PositionEntry[];
  experience: PositionEntry[];
  publications: PublicationEntry[];
  research: ResearchEntry[];
  presentations: PresentationEntry[];
  /** Optional section; omit or leave empty to drop it from every variant. */
  media?: MediaEntry[];
  teaching: PositionEntry[];
  service: PositionEntry[];
  /** Optional section; omit or leave empty to drop it from every variant. */
  memberships?: MembershipEntry[];
  honors: HonorEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
}

/* ------------------------------------------------------------------ *
 * Variant configuration
 * ------------------------------------------------------------------ */

/** Which entries of a section a variant keeps. */
export type IncludeRule =
  | "all"
  | { ids: string[] }
  | { tags: Tag[] };

export interface SectionConfig {
  section: SectionId;
  /** Overrides the default section heading. */
  title?: string;
  include?: IncludeRule;
  excludeIds?: string[];
  maxEntries?: number;
  maxBulletsPerEntry?: number;
}

export interface VariantConfig {
  id: VariantId;
  label: string;
  /** Basename for `latex/generated/<filename>.tex` and `public/pdf/<filename>.pdf`. */
  filename: string;
  /** Human-readable description used on the download menu. */
  description: string;
  /** Replaces `profile.summary` for this variant. */
  summaryOverride?: string;
  /** Soft page budget; `build-pdf` warns when the PDF exceeds it. */
  maxPages?: number;
  /** Render order. A section omitted here does not appear in this variant. */
  sections: SectionConfig[];
}

/* ------------------------------------------------------------------ *
 * Normalized render model — the shared contract for LaTeX and HTML
 * ------------------------------------------------------------------ */

/** An inline run of text. Renderers escape `text` at their own boundary. */
export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
}

export type Rich = Run[];

export interface RenderEntry {
  id: string;
  /** Primary line. For citations this is the whole formatted reference. */
  heading: Rich;
  /** Secondary line: organization, institution, publisher. */
  subheading?: Rich;
  /** Right-flushed date string, already formatted for display. */
  dates?: string;
  /** Machine-readable date for HTML `<time dateTime>`. */
  datesISO?: string;
  location?: string;
  summary?: string;
  bullets: Rich[];
  chips?: string[];
}

export type SectionLayout = "entries" | "numbered" | "skills" | "prose";

export interface RenderSection {
  id: SectionId;
  title: string;
  layout: SectionLayout;
  entries: RenderEntry[];
  /** Only set when `layout === "prose"`. */
  prose?: string;
  /** Only set when `layout === "skills"`. */
  groups?: SkillGroup[];
}

export interface ResolvedCv {
  variant: VariantConfig;
  profile: Profile;
  sections: RenderSection[];
}
