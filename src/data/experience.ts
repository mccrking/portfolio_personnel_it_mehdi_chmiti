import type { Localized } from "./profile";
export type Experience = {
  company: string;
  date: Localized;
  role: Localized;
  description: Localized;
  contributions: Record<"fr" | "en", string[]>;
  stack: string[];
};
export const experiences: Experience[] = [
  {
    company: "MIFA MOTORS / Yamaha Maroc",
    // Confirmed by Mehdi: internship started 2026-07-09 and ended 2026-09-09.
    date: {
      fr: "9 juillet – 9 septembre 2026",
      en: "9 July – 9 September 2026",
    },
    role: {
      fr: "Stage — projet MIFA AI",
      en: "Internship — MIFA AI project",
    },
    description: {
      fr: "Conception de MIFA AI, un assistant commercial intégrant IA conversationnelle, RAG et outils administratifs.",
      en: "Design and development of MIFA AI, a sales assistant integrating conversational AI, RAG, and administrative tools.",
    },
    contributions: {
      fr: [
        "Architecture d’agent IA et intégration de modèles.",
        "Développement full stack et recherche sur les données métier.",
        "Tests et préparation au déploiement, soumis à l’approbation de l’entreprise.",
      ],
      en: [
        "AI agent architecture and model integration.",
        "Full-stack development and retrieval over business data.",
        "Testing and deployment preparation, subject to company approval.",
      ],
    },
    stack: ["Next.js", "TypeScript", "RAG", "Prisma", "SQLite"],
  },
  {
    company: "Primary System Technology",
    date: { fr: "Juillet 2025", en: "July 2025" },
    role: {
      fr: "Stagiaire en développement logiciel",
      en: "Software Development Intern",
    },
    description: {
      fr: "Développement en binôme d’une plateforme intelligente de surveillance réseau.",
      en: "Developed an intelligent network monitoring platform with a teammate.",
    },
    contributions: {
      fr: [
        "Contribution à la découverte automatique des équipements.",
        "Intégration de fonctionnalités de scan et de surveillance réseau.",
      ],
      en: [
        "Contributed to automatic equipment discovery.",
        "Integrated network scanning and monitoring functionality.",
      ],
    },
    stack: ["Python", "Flask", "Nmap", "SQLite", "JavaScript"],
  },
  {
    company: "Ets Consult",
    date: { fr: "Juillet 2024", en: "July 2024" },
    role: {
      fr: "Stagiaire en développement logiciel",
      en: "Software Development Intern",
    },
    description: {
      fr: "Composants d’interface pour un mini-ERP immobilier et de gestion de projets de construction.",
      en: "Interface components for a real estate and construction project management mini-ERP.",
    },
    contributions: {
      fr: [
        "Développement de composants d’interface pour le système de gestion.",
        "Travail avec Flask et les technologies web.",
      ],
      en: [
        "Developed interface components for the management system.",
        "Worked with Flask and web technologies.",
      ],
    },
    stack: ["Python", "Flask", "HTML5", "CSS3", "JavaScript"],
  },
];
