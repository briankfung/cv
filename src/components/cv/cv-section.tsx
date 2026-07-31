import type { RenderSection } from "@/lib/cv/types";
import { CvEntry } from "./cv-entry";
import { RichText } from "./rich-text";

export function CvSection({ section }: { section: RenderSection }) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className="scroll-mt-24 break-inside-avoid-page"
    >
      <h2
        id={headingId}
        className="mb-4 border-b border-border pb-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-primary"
      >
        {section.title}
      </h2>

      {section.layout === "prose" && (
        <p className="text-[0.95rem] leading-relaxed text-foreground/90">
          {section.prose}
        </p>
      )}

      {section.layout === "skills" && (
        <dl className="space-y-2.5">
          {section.groups?.map((group) => (
            <div key={group.id} className="sm:flex sm:gap-3">
              <dt className="font-serif text-sm font-semibold sm:w-44 sm:shrink-0">
                {group.label}
              </dt>
              <dd className="text-sm leading-relaxed text-foreground/85">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {section.layout === "numbered" && (
        <ol className="ml-5 list-outside list-decimal space-y-2 text-sm leading-relaxed marker:text-muted-foreground marker:text-xs">
          {section.entries.map((entry) => (
            <li key={entry.id} className="break-inside-avoid pl-1">
              <RichText runs={entry.heading} />
            </li>
          ))}
        </ol>
      )}

      {section.layout === "entries" && (
        <div className="space-y-5">
          {section.entries.map((entry) => (
            <CvEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </section>
  );
}
