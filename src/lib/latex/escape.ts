/**
 * LaTeX escaping for CV content.
 *
 * The replacement is a single pass over the string. A chain of sequential
 * `.replace()` calls is wrong here: escaping `\` first produces
 * `\textbackslash{}`, whose braces are then escaped again by the later rules,
 * corrupting the output. One regex with a lookup table cannot double-escape.
 *
 * Non-ASCII characters are deliberately left alone. The documents compile with
 * xelatex and fontspec, which handles en dashes, curly quotes, and accented
 * names natively.
 */

const ESCAPES: Record<string, string> = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  "&": "\\&",
  "%": "\\%",
  $: "\\$",
  "#": "\\#",
  _: "\\_",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
};

const SPECIAL = /[\\{}&%$#_~^]/g;

/** Escapes body text destined for a LaTeX document. */
export function escapeLatex(value: string): string {
  return value.replace(SPECIAL, (char) => ESCAPES[char]);
}

/**
 * Escapes a URL for use as the first argument of `\href`. Only `%` and `#` need
 * escaping there; the other specials are legal inside a URL argument and
 * escaping them would change the link target.
 */
export function escapeLatexUrl(url: string): string {
  return url.replace(/[%#\\]/g, (char) => `\\${char}`);
}
