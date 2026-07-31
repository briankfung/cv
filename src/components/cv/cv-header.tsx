import { Mail, MapPin } from "lucide-react";
import type { Profile } from "@/lib/cv/types";

export function CvHeader({ profile }: { profile: Profile }) {
  return (
    <header className="space-y-3 border-b border-border pb-6">
      <div>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {profile.name}
        </h1>
        {profile.credentials && (
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            {profile.credentials}
          </p>
        )}
      </div>

      <p className="font-serif text-base italic text-primary">
        {profile.headline}
      </p>

      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail aria-hidden className="size-3.5" />
            {profile.email}
          </a>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <MapPin aria-hidden className="size-3.5" />
          {profile.location}
        </li>
        {profile.links.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="me noreferrer"
              className="underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              {item.display}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
