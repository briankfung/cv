import { Badge } from "@/components/ui/badge";
import type { RenderEntry } from "@/lib/cv/types";
import { RichText } from "./rich-text";

/**
 * Mirrors the LaTeX \cventry layout: title over organization on the left,
 * dates over location flush right. Explicit row and column placement keeps the
 * two right-hand lines aligned with their left-hand counterparts even when one
 * of them is absent. On narrow screens the four parts stack in reading order.
 */
export function CvEntry({ entry }: { entry: RenderEntry }) {
  return (
    <article className="break-inside-avoid space-y-1.5">
      <div className="flex flex-col gap-y-0.5 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6">
        <h3 className="order-1 font-serif text-base leading-snug text-foreground sm:order-none sm:col-start-1 sm:row-start-1">
          <RichText runs={entry.heading} />
        </h3>

        {entry.subheading && (
          <p className="order-2 text-sm text-muted-foreground sm:order-none sm:col-start-1 sm:row-start-2">
            <RichText runs={entry.subheading} />
          </p>
        )}

        {entry.dates && (
          <p className="order-3 text-xs text-muted-foreground sm:order-none sm:col-start-2 sm:row-start-1 sm:text-right">
            {entry.datesISO ? (
              <time dateTime={entry.datesISO}>{entry.dates}</time>
            ) : (
              entry.dates
            )}
          </p>
        )}

        {entry.location && (
          <p className="order-4 text-xs italic text-muted-foreground sm:order-none sm:col-start-2 sm:row-start-2 sm:text-right">
            {entry.location}
          </p>
        )}
      </div>

      {entry.summary && (
        <p className="text-sm leading-relaxed text-foreground/85">
          {entry.summary}
        </p>
      )}

      {entry.chips && entry.chips.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-0.5">
          {entry.chips.map((chip) => (
            <li key={chip}>
              <Badge
                variant="secondary"
                className="text-[0.7rem] font-normal tracking-wide"
              >
                {chip}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      {entry.bullets.length > 0 && (
        <ul className="ml-4 list-outside list-disc space-y-1.5 text-sm leading-relaxed marker:text-muted-foreground">
          {entry.bullets.map((bullet, index) => (
            <li key={index} className="pl-1">
              <RichText runs={bullet} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
