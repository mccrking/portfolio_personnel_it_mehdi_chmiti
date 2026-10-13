import type { Localized } from "./profile";
export const journey: {
  title: Localized;
  description: Localized;
  tools: string;
}[] = [
  {
    title: { fr: "Les fondamentaux", en: "Foundations" },
    description: {
      fr: "Comprendre les mécanismes de la programmation et structurer la pensée.",
      en: "Understanding programming mechanics and developing structured thinking.",
    },
    tools: "C · C++ · Web",
  },
  {
    title: { fr: "L’ingénierie applicative", en: "Application engineering" },
    description: {
      fr: "Relier interfaces, logique métier, bases de données et applications mobiles.",
      en: "Connecting interfaces, business logic, databases, and mobile applications.",
    },
    tools: "Java · SQL · Flutter · Frameworks",
  },
  {
    title: { fr: "La donnée & les modèles", en: "Data & models" },
    description: {
      fr: "Construire des pipelines et explorer l’apprentissage supervisé et profond.",
      en: "Building pipelines and exploring supervised and deep learning.",
    },
    tools: "Python · ETL · ML · Deep Learning",
  },
  {
    title: { fr: "L’IA en entreprise", en: "Enterprise AI" },
    description: {
      fr: "Assembler retrieval, agents conversationnels et applications full stack.",
      en: "Bringing together retrieval, conversational agents, and full-stack applications.",
    },
    tools: "MIFA AI · RAG · LLM · Next.js",
  },
];
