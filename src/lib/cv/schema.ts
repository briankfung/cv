import { z } from "zod";
import { CV_DATE_PATTERN, dateSortKey } from "./dates";
import { SECTION_IDS, TAGS, VARIANT_IDS } from "./types";

const cvDate = z
  .string()
  .regex(CV_DATE_PATTERN, "expected YYYY or YYYY-MM");

const endDate = z.union([cvDate, z.literal("present")]);

const tag = z.enum(TAGS);
const variantId = z.enum(VARIANT_IDS);

const dateRange = z
  .object({ start: cvDate, end: endDate })
  .refine((r) => dateSortKey(r.start) <= dateSortKey(r.end), {
    message: "start date must not be after end date",
  });

const bullet = z.object({
  text: z.string().min(1),
  only: z.array(variantId).nonempty().optional(),
  not: z.array(variantId).nonempty().optional(),
});

const identified = {
  id: z.string().regex(/^[a-z0-9-]+$/, "ids are lowercase kebab-case"),
  tags: z.array(tag).optional(),
};

const positionEntry = z.object({
  ...identified,
  title: z.string().min(1),
  org: z.string().min(1),
  location: z.string().optional(),
  dates: dateRange.optional(),
  occurrences: z.array(cvDate).nonempty().optional(),
  summary: z.string().optional(),
  bullets: z.array(bullet).optional(),
  url: z.url().optional(),
});

const educationEntry = z.object({
  ...identified,
  degree: z.string().min(1),
  field: z.string().optional(),
  institution: z.string().min(1),
  location: z.string().optional(),
  dates: dateRange,
  note: z.string().optional(),
});

const credentialEntry = z.object({
  ...identified,
  name: z.string().min(1),
  issuer: z.string().optional(),
  dates: dateRange.optional(),
  abbreviation: z.string().optional(),
  items: z.array(z.string().min(1)).nonempty().optional(),
});

const publicationEntry = z.object({
  ...identified,
  type: z.enum(["journal-article", "letter", "abstract", "chapter", "preprint"]),
  authors: z.array(z.string().min(1)).nonempty(),
  title: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  editors: z.array(z.string().min(1)).optional(),
  place: z.string().optional(),
  publisher: z.string().optional(),
  edition: z.string().optional(),
  doi: z.string().optional(),
  pmid: z.string().regex(/^\d+$/, "PMIDs are digits only").optional(),
  url: z.url().optional(),
});

const researchEntry = z.object({
  ...identified,
  title: z.string().min(1),
  dates: dateRange,
  org: z.string().optional(),
  role: z.string().optional(),
  url: z.url().optional(),
});

const presentationEntry = z.object({
  ...identified,
  title: z.string().min(1).optional(),
  venue: z.string().min(1),
  location: z.string().optional(),
  date: cvDate,
  type: z.enum([
    "invited",
    "podium",
    "panel",
    "poster",
    "workshop",
    "lecture",
    "continuing-education",
    "in-service",
  ]),
  scope: z.enum(["international", "national", "regional"]).optional(),
  accreditation: z.array(z.string().min(1)).nonempty().optional(),
  url: z.url().optional(),
});

const mediaEntry = z.object({
  ...identified,
  kind: z.enum(["podcast", "press", "guest-post"]),
  title: z.string().min(1),
  outlet: z.string().min(1),
  date: cvDate,
  url: z.url().optional(),
  note: z.string().optional(),
});

const honorEntry = z.object({
  ...identified,
  title: z.string().min(1),
  org: z.string().optional(),
  dates: dateRange.optional(),
  note: z.string().optional(),
  url: z.url().optional(),
});

const membershipEntry = z.object({
  ...identified,
  org: z.string().min(1),
  dates: dateRange.optional(),
  role: z.string().optional(),
  url: z.url().optional(),
});

const projectEntry = z.object({
  ...identified,
  name: z.string().min(1),
  tagline: z.string().min(1),
  partOf: z.string().optional(),
  url: z.url().optional(),
  dates: dateRange.optional(),
  bullets: z.array(bullet).optional(),
  stack: z.array(z.string().min(1)).optional(),
});

const skillGroup = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  items: z.array(z.string().min(1)).nonempty(),
});

const profileLink = z.object({
  label: z.string().min(1),
  display: z.string().min(1),
  url: z.url(),
});

const profile = z.object({
  name: z.string().min(1),
  credentials: z.string(),
  headline: z.string().min(1),
  email: z.email(),
  location: z.string().min(1),
  links: z.array(profileLink),
  summary: z.string().min(1),
  selfAuthor: z.string().min(1),
});

export const cvDataSchema = z.object({
  profile,
  education: z.array(educationEntry),
  training: z.array(positionEntry),
  credentials: z.array(credentialEntry),
  appointments: z.array(positionEntry),
  experience: z.array(positionEntry),
  publications: z.array(publicationEntry),
  research: z.array(researchEntry),
  presentations: z.array(presentationEntry),
  media: z.array(mediaEntry).optional(),
  teaching: z.array(positionEntry),
  service: z.array(positionEntry),
  memberships: z.array(membershipEntry).optional(),
  honors: z.array(honorEntry),
  projects: z.array(projectEntry),
  skills: z.array(skillGroup),
});

const includeRule = z.union([
  z.literal("all"),
  z.object({ ids: z.array(z.string()).nonempty() }),
  z.object({ tags: z.array(tag).nonempty() }),
]);

export const variantConfigSchema = z.object({
  id: variantId,
  label: z.string().min(1),
  filename: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(1),
  summaryOverride: z.string().optional(),
  maxPages: z.number().int().positive().optional(),
  sections: z
    .array(
      z.object({
        section: z.enum(SECTION_IDS),
        title: z.string().optional(),
        include: includeRule.optional(),
        excludeIds: z.array(z.string()).optional(),
        maxEntries: z.number().int().positive().optional(),
        maxBulletsPerEntry: z.number().int().positive().optional(),
      }),
    )
    .nonempty(),
});
