import type { Localized } from "./profile";
export const skills: {
  name: Localized;
  icon: "brain" | "sparkles" | "database" | "code" | "tools";
  project: string;
  applied: string[];
  academic: string[];
}[] = [
  {
    name: { fr: "IA & Machine Learning", en: "AI & Machine Learning" },
    icon: "brain",
    project: "fraudguard",
    applied: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "PyTorch",
      "Transformers",
      "NLP",
      "Feature engineering",
      "Model evaluation",
    ],
    academic: ["NumPy", "Supervised learning", "Deep Learning"],
  },
  {
    name: { fr: "IA générative", en: "Generative AI" },
    icon: "sparkles",
    project: "mifa-ai",
    applied: [
      "LLM integration",
      "RAG",
      "Embeddings",
      "Vector search",
      "Hybrid retrieval",
      "Conversational memory",
      "AI agents",
      "Prompt engineering",
    ],
    academic: [],
  },
  {
    name: { fr: "Data Engineering", en: "Data Engineering" },
    icon: "database",
    project: "mediapulse-360",
    applied: [
      "SQL",
      "PostgreSQL",
      "ETL",
      "Apache Airflow",
      "MinIO",
      "Docker",
      "Data preprocessing",
      "Data modeling",
    ],
    academic: ["MySQL", "SQL Server / T-SQL", "MongoDB"],
  },
  {
    name: { fr: "Ingénierie logicielle", en: "Software Engineering" },
    icon: "code",
    project: "calorie-ai",
    applied: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Flask",
      "FastAPI",
      "Java",
      "PHP / Laravel",
      "Flutter / Dart",
      "C++",
    ],
    academic: ["Django", "C# / ASP.NET Core", "Node.js"],
  },
  {
    name: { fr: "Outils & environnement", en: "Tools & Environment" },
    icon: "tools",
    project: "meteoflow",
    applied: ["Git", "GitHub", "Docker", "Prisma", "VS Code"],
    academic: ["Postman", "PyCharm", "Spyder"],
  },
];
