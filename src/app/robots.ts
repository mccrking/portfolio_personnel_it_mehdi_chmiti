import type { MetadataRoute } from "next";
import { config } from "@/data/profile";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(config.siteUrl ? { sitemap: `${config.siteUrl}/sitemap.xml` } : {}),
  };
}
