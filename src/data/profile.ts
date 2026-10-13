export type Locale = "fr" | "en";
export type Localized = Record<Locale, string>;
export const profile = {
  name: "Mehdi Chmiti",
  email: "mehdi.chmiti.ing@gmail.com",
  github: "https://github.com/mccrking",
  linkedin: "https://www.linkedin.com/in/mehdi-chmiti",
  location: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
  school: "EMSI Casablanca",
  availability: {
    fr: "Stage PFE ou emploi en IA & Data",
    en: "PFE internship / AI & Data roles",
  },
  languages: [
    { name: "Français", level: "B2" },
    { name: "English", level: "B2" },
    { name: "العربية", level: "Native" },
  ],
};
export const config = {
  defaultLocale: "fr" as Locale,
  // Public copy of the supplied CV: personal phone/address removed, original preserved.
  cvPath: "/cv/Mehdi-Chmiti-CV.pdf" as string | null,
  // Switch to "current" only after replacing the PDF with an approved updated CV.
  cvRevision: "current" as "before-mifa" | "current",
  featuredOrder: [
    "mifa-ai",
    "mediapulse-360",
    "fraudguard",
    "recomate",
    "meteoflow",
    "sentimentscope",
    "hotel-booking",
    "deep-learning",
  ],
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : undefined),
};
