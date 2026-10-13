import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile, config } from "@/data/profile";
import "./globals.css";

const geist = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const space = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl || "http://localhost:3000"),
  ...(config.siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: "Mehdi Chmiti — AI & Data Engineering",
  description:
    "Portfolio de Mehdi Chmiti, élève ingénieur en dernière année à l’EMSI Casablanca. IA générative, Machine Learning, Data Engineering et développement full stack.",
  keywords: [
    "Mehdi Chmiti",
    "AI",
    "Data Engineering",
    "Machine Learning",
    "RAG",
    "EMSI",
    "Casablanca",
    "stage PFE",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Mehdi Chmiti — AI & Data Engineering",
    description:
      "De la donnée à l’intelligence. Découvrez mes projets en IA, Data et ingénierie logicielle.",
    type: "website",
    locale: "fr_MA",
    alternateLocale: "en_US",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Mehdi Chmiti — From data to intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehdi Chmiti — AI & Data Engineering",
    images: ["/social-preview.png"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(config.siteUrl ? { url: config.siteUrl } : {}),
    email: profile.email,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Artificial Intelligence",
      "Data Engineering",
      "Machine Learning",
      "Software Engineering",
    ],
    affiliation: { "@type": "EducationalOrganization", name: profile.school },
    homeLocation: { "@type": "Place", name: "Casablanca, Morocco" },
  };
  return (
    <html
      lang="fr"
      data-theme="dark"
      className={`${geist.variable} ${space.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
