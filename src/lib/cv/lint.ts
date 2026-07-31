/**
 * Checks that the zod schema cannot express: cross-entry invariants, and the
 * privacy rules that keep this public repository free of contact details
 * beyond the email address and city Brian has chosen to publish.
 */

import type { CvData } from "./types";

export interface LintIssue {
  path: string;
  message: string;
}

/** The only personal identifiers allowed to appear anywhere in the data. */
export const ALLOWED_EMAIL = "brian@briankfung.com";

const PHONE = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?\d{3}[\s.-]?\d{4}|\b\d{3}[.-]\d{3}[.-]\d{4}\b)/;

const STREET_SUFFIX =
  "Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Lane|Ln|Court|Ct|Circle|Cir|Terrace|Ter|Place|Pl|Parkway|Pkwy|Highway|Hwy";
const STREET_ADDRESS = new RegExp(
  String.raw`\b\d{1,6}\s+(?:[A-Z][A-Za-z0-9.'-]*\s+){0,3}(?:${STREET_SUFFIX})\b\.?`,
);

const PO_BOX = /\bP\.?\s?O\.?\s+Box\b/i;
const SSN = /\b\d{3}-\d{2}-\d{4}\b/;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

interface PrivacyRule {
  name: string;
  test: (value: string) => boolean;
  message: string;
}

const PRIVACY_RULES: PrivacyRule[] = [
  {
    name: "phone",
    test: (v) => PHONE.test(v),
    message: "looks like a phone number; this repository is public",
  },
  {
    name: "street-address",
    test: (v) => STREET_ADDRESS.test(v),
    message: "looks like a street address; publish city and state only",
  },
  {
    name: "po-box",
    test: (v) => PO_BOX.test(v),
    message: "looks like a PO box; publish city and state only",
  },
  {
    name: "ssn",
    test: (v) => SSN.test(v),
    message: "looks like a national identification number",
  },
  {
    name: "email",
    test: (v) => {
      const found = v.match(EMAIL);
      return found ? found.some((e) => e.toLowerCase() !== ALLOWED_EMAIL) : false;
    },
    message: `contains an email address other than ${ALLOWED_EMAIL}`,
  },
];

/** Yields every string in the structure, paired with its dotted path. */
export function* walkStrings(
  value: unknown,
  path = "",
): Generator<{ path: string; value: string }> {
  if (typeof value === "string") {
    yield { path, value };
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      yield* walkStrings(item, `${path}[${index}]`);
    }
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      yield* walkStrings(item, path ? `${path}.${key}` : key);
    }
  }
}

export function lintPrivacy(data: unknown): LintIssue[] {
  const issues: LintIssue[] = [];
  for (const { path, value } of walkStrings(data)) {
    for (const rule of PRIVACY_RULES) {
      if (rule.test(value)) {
        issues.push({ path, message: `${rule.message} (${rule.name})` });
      }
    }
  }
  return issues;
}

/** Entry ids must be unique across the whole CV so variants can target them. */
export function lintUniqueIds(data: CvData): LintIssue[] {
  const issues: LintIssue[] = [];
  const seen = new Map<string, string>();

  for (const [section, entries] of Object.entries(data)) {
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const id: unknown = (entry as { id?: unknown }).id;
      if (typeof id !== "string") continue;
      const previous = seen.get(id);
      if (previous) {
        issues.push({
          path: `${section}`,
          message: `duplicate id "${id}" (also used in ${previous})`,
        });
      } else {
        seen.set(id, section);
      }
    }
  }
  return issues;
}

/** A project's `partOf` must name another project in the same list. */
export function lintProjectParents(data: CvData): LintIssue[] {
  const ids = new Set(data.projects.map((project) => project.id));
  return data.projects
    .filter((project) => project.partOf && !ids.has(project.partOf))
    .map((project) => ({
      path: `projects.${project.id}`,
      message: `partOf "${project.partOf}" does not match any project id`,
    }));
}

export function lintCv(data: CvData): LintIssue[] {
  return [
    ...lintPrivacy(data),
    ...lintUniqueIds(data),
    ...lintProjectParents(data),
  ];
}
