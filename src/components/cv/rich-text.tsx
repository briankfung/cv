import type { Rich } from "@/lib/cv/types";

/**
 * Renders the same rich-text runs the LaTeX renderer consumes, so emphasis and
 * links in a citation appear identically in the PDF and on the page.
 */
export function RichText({ runs }: { runs: Rich }) {
  return (
    <>
      {runs.map((run, index) => {
        let node = <>{run.text}</>;
        if (run.bold) node = <strong className="font-semibold">{node}</strong>;
        if (run.italic) node = <em>{node}</em>;
        if (run.href) {
          node = (
            <a
              href={run.href}
              className="underline decoration-muted-foreground/40 underline-offset-3 transition-colors hover:text-primary hover:decoration-primary print:no-underline"
              target={run.href.startsWith("http") ? "_blank" : undefined}
              rel={run.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {node}
            </a>
          );
        }
        return <span key={index}>{node}</span>;
      })}
    </>
  );
}
