import type { MetadataRoute } from "next";
import { BLOCKED_CRAWLERS, SITE_URL } from "@/lib/seo/site";

export function buildRobots(blocked: string[]): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...(blocked.length > 0 ? [{ userAgent: blocked, disallow: "/" }] : []),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

export default function robots(): MetadataRoute.Robots {
  return buildRobots(BLOCKED_CRAWLERS);
}
