"use client";

import { useEffect, useState } from "react";
import type { RenderSection, SectionId } from "@/lib/cv/types";
import { cn } from "@/lib/utils";

/**
 * Sticky section index for wide screens. Highlights the section currently
 * nearest the top of the viewport.
 */
export function TocNav({ sections }: { sections: RenderSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sections" className="sticky top-8 print:hidden">
      <ul className="space-y-1.5 border-l border-border text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "-ml-px block border-l pl-3 py-0.5 transition-colors",
                active === section.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
