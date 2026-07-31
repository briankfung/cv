import type { MetadataRoute } from "next";
import { variants } from "@/data/variants";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...variants.map((variant) => ({
      url: `${SITE_URL}/pdf/${variant.filename}.pdf`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
