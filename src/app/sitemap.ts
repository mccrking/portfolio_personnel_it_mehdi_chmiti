import type { MetadataRoute } from "next";
import { config } from "@/data/profile";
export default function sitemap(): MetadataRoute.Sitemap {
  return config.siteUrl
    ? [{ url: config.siteUrl, changeFrequency: "monthly", priority: 1 }]
    : [];
}
