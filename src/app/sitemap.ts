import type { MetadataRoute } from "next";
import { cvData } from "@/data/cv";
import { variants } from "@/data/variants";
import { SITE_URL } from "@/lib/seo/site";

/** Both the page and the PDFs change only when the content does. */
const lastModified = cvData.profile.updated;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...variants.map((variant) => ({
      url: `${SITE_URL}/pdf/${variant.filename}.pdf`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
