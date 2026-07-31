import { CvHeader } from "@/components/cv/cv-header";
import { CvSection } from "@/components/cv/cv-section";
import { DownloadLinks } from "@/components/cv/download-links";
import { TocNav } from "@/components/cv/toc-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cvData } from "@/data/cv";
import { master } from "@/data/variants";
import { resolveVariant } from "@/lib/cv/resolve";
import { buildProfileJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";

export default function Page() {
  const cv = resolveVariant(cvData, master);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-8 lg:py-16 print:max-w-none print:p-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProfileJsonLd(cvData)),
        }}
      />
      <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
        <DownloadLinks />
        <ThemeToggle />
      </div>

      <div className="gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_11rem]">
        <main className="min-w-0 space-y-8 print:space-y-6">
          <CvHeader profile={cv.profile} />
          {cv.sections.map((section) => (
            <CvSection key={section.id} section={section} />
          ))}
        </main>

        <aside className="hidden lg:block">
          <TocNav sections={cv.sections} />
        </aside>
      </div>
    </div>
  );
}
