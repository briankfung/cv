/**
 * Turns (CV data + variant config) into the normalized render model that both
 * the LaTeX generator and the website consume. Pure and deterministic: given
 * the same inputs it always produces the same output, which is what lets the
 * PDF and the web page stay in lockstep.
 */

import { formatMedia, formatPresentation, formatPublication } from "./citations";
import { dateSortKey, formatOccurrences, formatRange } from "./dates";
import { bold, link, rich, text } from "./rich";
import type {
  Bullet,
  CvData,
  DateRange,
  IncludeRule,
  Rich,
  RenderEntry,
  RenderSection,
  ResolvedCv,
  SectionConfig,
  SectionId,
  SectionLayout,
  Tag,
  VariantConfig,
  VariantId,
} from "./types";

export const DEFAULT_SECTION_TITLES: Record<SectionId, string> = {
  profile: "Profile",
  education: "Education",
  training: "Postgraduate Training",
  credentials: "Licensure & Certifications",
  appointments: "Academic Appointments",
  experience: "Professional Experience",
  publications: "Publications",
  research: "Research",
  presentations: "Presentations",
  media: "Media & Podcasts",
  teaching: "Teaching",
  service: "Professional Service & Leadership",
  memberships: "Professional Memberships",
  honors: "Honors & Awards",
  projects: "Projects & Product Portfolio",
  skills: "Skills",
};

const SECTION_LAYOUTS: Record<SectionId, SectionLayout> = {
  profile: "prose",
  education: "entries",
  training: "entries",
  credentials: "entries",
  appointments: "entries",
  experience: "entries",
  publications: "numbered",
  research: "entries",
  presentations: "numbered",
  media: "numbered",
  teaching: "entries",
  service: "entries",
  memberships: "entries",
  honors: "entries",
  projects: "entries",
  skills: "skills",
};

interface Selectable {
  id: string;
  tags?: Tag[];
}

/**
 * Sections where reverse-chronological order is a hard CV convention. Skills is
 * excluded: those groups have no dates and read best in the file's order.
 *
 * Projects are included even though a portfolio could reasonably be ordered by
 * prominence. Once most entries carry a visible date, an unsorted date column
 * reads as a bug rather than as an editorial choice, and Experience already
 * carries prominence: its bullets lead with the work that matters most.
 */
const CHRONOLOGICAL: ReadonlySet<SectionId> = new Set([
  "education",
  "training",
  "credentials",
  "appointments",
  "experience",
  "research",
  "publications",
  "presentations",
  "media",
  "teaching",
  "service",
  "memberships",
  "honors",
  "projects",
]);

/**
 * Sections ranked by when something began rather than when it ends. A
 * certification's recency is the date it was earned; an expiry further out does
 * not make it newer. Roles are the opposite: an ongoing one outranks a finished
 * one that started later.
 */
const START_PRIMARY: ReadonlySet<SectionId> = new Set(["credentials"]);

interface Dated {
  dates?: DateRange;
  occurrences?: string[];
  date?: string;
  /** Publications carry a bare year rather than a range. */
  year?: number;
}

/**
 * Recency key. End date leads so that ongoing roles sort above finished ones
 * that started later; start date breaks ties. Undated entries sort last.
 */
function recency(entry: Dated, startPrimary: boolean): [number, number] {
  if (entry.occurrences?.length) {
    const latest = Math.max(...entry.occurrences.map(dateSortKey));
    return [latest, latest];
  }
  if (entry.dates) {
    const start = dateSortKey(entry.dates.start);
    const end = dateSortKey(entry.dates.end);
    return startPrimary ? [start, end] : [end, start];
  }
  if (entry.date) {
    const key = dateSortKey(entry.date);
    return [key, key];
  }
  if (entry.year !== undefined) {
    const key = entry.year * 100;
    return [key, key];
  }
  return [-1, -1];
}

/**
 * Newest first. The sort is stable, so entries that tie keep the order the data
 * file put them in — which is how two awards earned the same year stay in the
 * sequence the author intended.
 */
function chronological<T>(entries: T[], section: SectionId): T[] {
  if (!CHRONOLOGICAL.has(section)) return entries;
  const startPrimary = START_PRIMARY.has(section);
  return [...entries].sort((a, b) => {
    const [aFirst, aSecond] = recency(a as Dated, startPrimary);
    const [bFirst, bSecond] = recency(b as Dated, startPrimary);
    return bFirst - aFirst || bSecond - aSecond;
  });
}

function matchesInclude(entry: Selectable, rule: IncludeRule | undefined) {
  if (rule === undefined || rule === "all") return true;
  if ("ids" in rule) return rule.ids.includes(entry.id);
  return entry.tags?.some((tag) => rule.tags.includes(tag)) ?? false;
}

/** Applies include, exclude, and the entry cap, preserving data-file order. */
export function selectEntries<T extends Selectable>(
  entries: T[],
  config: SectionConfig,
): T[] {
  const excluded = new Set(config.excludeIds ?? []);
  const kept = entries.filter(
    (entry) => matchesInclude(entry, config.include) && !excluded.has(entry.id),
  );
  return config.maxEntries === undefined
    ? kept
    : kept.slice(0, config.maxEntries);
}

/** Applies per-bullet variant visibility, then the per-entry bullet cap. */
export function selectBullets(
  bullets: Bullet[] | undefined,
  variant: VariantId,
  max?: number,
): Rich[] {
  const visible = (bullets ?? []).filter((bullet) => {
    if (bullet.not?.includes(variant)) return false;
    if (bullet.only && !bullet.only.includes(variant)) return false;
    return true;
  });
  const capped = max === undefined ? visible : visible.slice(0, max);
  return capped.map((bullet) => rich(text(bullet.text)));
}

function dateFields(dates: DateRange | undefined) {
  return dates
    ? { dates: formatRange(dates), datesISO: dates.start }
    : {};
}

/** Links the heading when the entry has a URL, so both renderers get an anchor. */
function headingRuns(label: string, url?: string): Rich {
  return url ? rich({ ...link(label, url), bold: true }) : rich(bold(label));
}

/**
 * Places each component directly beneath the project it belongs to, so the
 * grouping survives a reorder of the data file.
 */
function groupByParent(projects: CvData["projects"]): CvData["projects"] {
  const children = new Map<string, CvData["projects"]>();
  for (const project of projects) {
    if (!project.partOf) continue;
    const siblings = children.get(project.partOf) ?? [];
    siblings.push(project);
    children.set(project.partOf, siblings);
  }
  return projects.flatMap((project) =>
    project.partOf ? [] : [project, ...(children.get(project.id) ?? [])],
  );
}

function buildEntries(
  section: SectionId,
  data: CvData,
  config: SectionConfig,
  variant: VariantId,
): RenderEntry[] {
  const maxBullets = config.maxBulletsPerEntry;

  switch (section) {
    case "education":
      return selectEntries(chronological(data.education, section), config).map((entry) => ({
        id: entry.id,
        heading: rich(
          bold(entry.degree),
          entry.field ? text(`, ${entry.field}`) : null,
        ),
        subheading: rich(text(entry.institution)),
        location: entry.location,
        summary: entry.note,
        bullets: [],
        ...dateFields(entry.dates),
      }));

    case "credentials":
      return selectEntries(chronological(data.credentials, section), config).map((entry) => ({
        id: entry.id,
        heading: rich(
          bold(entry.name),
          entry.abbreviation ? text(` (${entry.abbreviation})`) : null,
        ),
        subheading: entry.issuer ? rich(text(entry.issuer)) : undefined,
        summary: entry.items?.join(" · "),
        bullets: [],
        ...dateFields(entry.dates),
      }));

    case "honors":
      return selectEntries(chronological(data.honors, section), config).map((entry) => ({
        id: entry.id,
        heading: headingRuns(entry.title, entry.url),
        subheading: entry.org ? rich(text(entry.org)) : undefined,
        summary: entry.note,
        bullets: [],
        ...dateFields(entry.dates),
      }));

    case "memberships":
      return selectEntries(chronological(data.memberships ?? [], section), config).map((entry) => ({
        id: entry.id,
        heading: headingRuns(entry.org, entry.url),
        subheading: entry.role ? rich(text(entry.role)) : undefined,
        bullets: [],
        ...dateFields(entry.dates),
      }));

    case "projects": {
      const names = new Map(data.projects.map((p) => [p.id, p.name]));
      return selectEntries(groupByParent(chronological(data.projects, section)), config).map((entry) => ({
        id: entry.id,
        heading: headingRuns(entry.name, entry.url),
        subheading: entry.partOf
          ? rich(text(`Component of ${names.get(entry.partOf) ?? entry.partOf}`))
          : undefined,
        summary: entry.tagline,
        chips: entry.stack,
        bullets: selectBullets(entry.bullets, variant, maxBullets),
        ...dateFields(entry.dates),
      }));
    }

    case "research":
      return selectEntries(chronological(data.research, section), config).map((entry) => ({
        id: entry.id,
        heading: headingRuns(entry.title, entry.url),
        subheading: entry.org ? rich(text(entry.org)) : undefined,
        summary: entry.role,
        bullets: [],
        ...dateFields(entry.dates),
      }));

    case "publications":
      return selectEntries(chronological(data.publications, section), config).map((entry) => ({
        id: entry.id,
        heading: formatPublication(entry, data.profile.selfAuthor),
        bullets: [],
        datesISO: String(entry.year),
      }));

    case "presentations":
      return selectEntries(chronological(data.presentations, section), config).map((entry) => ({
        id: entry.id,
        heading: formatPresentation(entry),
        bullets: [],
        datesISO: entry.date,
      }));

    case "media":
      return selectEntries(chronological(data.media ?? [], section), config).map((entry) => ({
        id: entry.id,
        heading: formatMedia(entry),
        bullets: [],
        datesISO: entry.date,
      }));

    case "training":
    case "appointments":
    case "experience":
    case "teaching":
    case "service":
      return selectEntries(chronological(data[section], section), config).map((entry) => ({
        id: entry.id,
        heading: rich(bold(entry.title)),
        subheading: headingRuns(entry.org, entry.url).map((run) => ({
          ...run,
          bold: false,
        })),
        location: entry.location,
        summary: entry.summary,
        bullets: selectBullets(entry.bullets, variant, maxBullets),
        // No datesISO for occurrences: a single <time> cannot represent two
        // separate dates honestly.
        ...(entry.occurrences
          ? { dates: formatOccurrences(entry.occurrences) }
          : dateFields(entry.dates)),
      }));

    default:
      return [];
  }
}

export function resolveVariant(
  data: CvData,
  variant: VariantConfig,
): ResolvedCv {
  const profile = variant.summaryOverride
    ? { ...data.profile, summary: variant.summaryOverride }
    : data.profile;

  const sections: RenderSection[] = [];

  for (const config of variant.sections) {
    const id = config.section;
    const title = config.title ?? DEFAULT_SECTION_TITLES[id];
    const layout = SECTION_LAYOUTS[id];

    if (id === "profile") {
      const bullets = (profile.highlights ?? []).map((line) => rich(text(line)));
      if (!profile.summary && bullets.length === 0) continue;
      sections.push({
        id,
        title,
        layout,
        entries: [],
        ...(profile.summary ? { prose: profile.summary } : {}),
        ...(bullets.length > 0 ? { bullets } : {}),
      });
      continue;
    }

    if (id === "skills") {
      const groups = selectEntries(
        data.skills.map((group) => ({ ...group, tags: undefined })),
        config,
      );
      if (groups.length === 0) continue;
      sections.push({ id, title, layout, entries: [], groups });
      continue;
    }

    const entries = buildEntries(id, data, config, variant.id);
    if (entries.length === 0) continue;
    sections.push({ id, title, layout, entries });
  }

  return { variant, profile, sections };
}
