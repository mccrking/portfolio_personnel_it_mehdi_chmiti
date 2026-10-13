import type { Localized } from "./profile";
export type Category = "genai" | "ml" | "data" | "mining" | "deep" | "software";
export type Project = {
  slug: string;
  name: string;
  category: Category;
  featured: boolean;
  type: "private" | "public" | "academic";
  stack: string[];
  github?: string;
  description: Localized;
  context: Localized;
  approach: Localized;
  evaluation: Localized;
  flow: string[];
  visual:
    | "network"
    | "pipeline"
    | "signal"
    | "orbits"
    | "weather"
    | "sentiment"
    | "grid";
  // Only use approved public images. Undefined preserves the conceptual visual.
  screenshot?: string;
};
export const categoryNames: Record<Category, Localized> = {
  genai: { fr: "IA générative", en: "Generative AI" },
  ml: { fr: "Machine Learning", en: "Machine Learning" },
  data: { fr: "Data Engineering", en: "Data Engineering" },
  mining: { fr: "Data Mining", en: "Data Mining" },
  deep: { fr: "Deep Learning", en: "Deep Learning" },
  software: { fr: "Développement", en: "Software Development" },
};
const repo = (name: string) => `https://github.com/mccrking/${name}`;
export const projects: Project[] = [
  {
    slug: "mifa-ai",
    name: "MIFA AI",
    category: "genai",
    featured: true,
    type: "private",
    visual: "network",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "SQLite",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Docker",
      "RAG",
    ],
    description: {
      fr: "Un agent commercial conversationnel qui relie produits, connaissances métier et recommandations.",
      en: "A conversational sales agent connecting products, business knowledge, and recommendations.",
    },
    context: {
      fr: "Conçu pour MIFA MOTORS — Yamaha Maroc, MIFA AI accompagne la découverte produit et les interactions commerciales. Le projet associe un assistant multilingue et une plateforme administrative.",
      en: "Designed for MIFA MOTORS — Yamaha Morocco, MIFA AI supports product discovery and commercial conversations through a multilingual assistant and an administrative platform.",
    },
    approach: {
      fr: "L’approche combine recherche hybride RAG, embeddings multilingues et données produits structurées. L’assistant prend en charge le français, l’anglais et l’arabe, la compréhension multi-intention, la mémoire conversationnelle, la comparaison de produits et les recommandations. Le périmètre comprend aussi les points de vente, les prospects, la gestion documentaire, les rôles d’accès, les statistiques d’utilisation LLM et les journaux d’audit. La conception distingue les bases métier et conversationnelles et prévoit plusieurs fournisseurs de modèles.",
      en: "The approach combines hybrid RAG, multilingual embeddings, and structured product data. The assistant supports French, English, and Arabic, multi-intent understanding, conversational memory, product comparison, and recommendations. The scope also includes commercial locations, leads, document management, access roles, LLM usage statistics, and audit logs. The design separates business and conversation databases and accommodates multiple model providers.",
    },
    evaluation: {
      fr: "La documentation décrit 48 produits initiaux, 50 documents de connaissances, 26 points commerciaux, 22 intentions et 8 états émotionnels. Les totaux de tests les plus récents ne sont pas vérifiés et ne sont donc pas publiés ici. L’implémentation locale repose sur Next.js, TypeScript, Prisma et SQLite. L’architecture cible prévoit Docker, PostgreSQL, pgvector et Redis. L’implémentation locale et la préparation au déploiement ne constituent pas une mise en production : celle-ci dépend de l’infrastructure et de l’approbation de l’entreprise. Redis, Docker et la séparation des services font partie de l’architecture cible. Aucun impact commercial ni performance de production n’est revendiqué. Les visuels sont des concepts neutres, sans données ni captures internes.",
      en: "Documentation describes 48 initial products, 50 knowledge documents, 26 commercial locations, 22 intentions, and 8 emotional states. The latest test totals have not been verified and are not published here. The local implementation uses Next.js, TypeScript, Prisma, and SQLite. The target architecture includes Docker, PostgreSQL, pgvector, and Redis. Local implementation and deployment preparation do not constitute a production release: final deployment depends on company infrastructure and approval. Redis, Docker, and service separation are part of the target architecture. No commercial impact or production performance is claimed. Visuals are neutral concepts without internal data or screenshots.",
    },
    flow: [
      "Conversation",
      "Intent + memory",
      "Hybrid retrieval",
      "LLM + business data",
      "Response",
    ],
  },
  {
    slug: "mediapulse-360",
    name: "MediaPulse 360",
    category: "data",
    featured: true,
    type: "public",
    github: repo("media360_project"),
    visual: "pipeline",
    stack: [
      "Python",
      "Apache Airflow",
      "PostgreSQL",
      "MinIO",
      "Docker",
      "Streamlit",
    ],
    description: {
      fr: "De l’actualité brute à l’information exploitable. Un pipeline orchestré, une architecture Medallion.",
      en: "From raw news to usable intelligence. An orchestrated pipeline with a Medallion architecture.",
    },
    context: {
      fr: "Centraliser des flux d’actualité RSS et les transformer en données exploitables pour l’analyse, au sein d’une plateforme automatisée.",
      en: "Centralize RSS news feeds and transform them into usable analytical data within an automated platform.",
    },
    approach: {
      fr: "L’ingestion RSS alimente un stockage data lake MinIO. L’architecture Medallion structure les couches de données, Airflow orchestre les traitements et les tableaux de bord Streamlit présentent les données analytiques. PostgreSQL et Docker complètent le système.",
      en: "RSS ingestion feeds a MinIO data lake. A Medallion architecture structures data layers, Airflow orchestrates processing, and Streamlit dashboards present analytical data. PostgreSQL and Docker complete the system.",
    },
    evaluation: {
      fr: "Le dépôt public permet d’examiner les traitements et la configuration. Les garanties d’idempotence, la fraîcheur des flux, les volumes traités et la couverture des tests doivent être évalués à partir du code et d’une exécution reproductible. Aucun débit ni niveau de service n’est annoncé.",
      en: "The public repository allows inspection of processing and configuration. Idempotency guarantees, feed freshness, processing volumes, and test coverage should be assessed through the code and a reproducible run. No throughput or service level is claimed.",
    },
    flow: ["RSS", "Airflow", "Bronze / MinIO", "Silver", "Gold / dashboards"],
  },
  {
    slug: "fraudguard",
    name: "FraudGuard",
    category: "ml",
    featured: true,
    type: "public",
    github: repo("FraudGuard"),
    visual: "signal",
    stack: ["Python", "Scikit-learn", "Pandas", "SMOTE"],
    description: {
      fr: "Explorer la détection de fraude et le défi des classes déséquilibrées.",
      en: "Exploring fraud detection and the challenge of imbalanced classes.",
    },
    context: {
      fr: "Étudier un pipeline de classification pour la détection de fraude, en comparant des algorithmes et des approches du déséquilibre de classes.",
      en: "Study a classification pipeline for fraud detection by comparing algorithms and approaches to class imbalance.",
    },
    approach: {
      fr: "Le projet compare la régression logistique et Random Forest, avec préparation des données, rééquilibrage avec SMOTE et évaluation précision-rappel. Des artefacts de prédiction réutilisables rendent le travail exploitable au-delà de l’entraînement.",
      en: "The project compares logistic regression and Random Forest, with data preparation, SMOTE rebalancing, and precision-recall evaluation. Reusable prediction artifacts extend the work beyond training.",
    },
    evaluation: {
      fr: "Les données de démonstration peuvent être synthétiques : les résultats ne constituent pas une validation sur des transactions bancaires réelles. Toute comparaison doit tenir compte des classes déséquilibrées, de la séparation entraînement/test et des risques de fuite de données. Aucun score non vérifié n’est publié.",
      en: "Demonstration data may be synthetic: results do not establish validation on real bank transactions. Comparisons must account for class imbalance, train/test separation, and data leakage risks. No unverified scores are published.",
    },
    flow: [
      "Data",
      "Preprocessing",
      "SMOTE / training",
      "Validation",
      "Prediction",
    ],
  },
  {
    slug: "recomate",
    name: "RecoMate",
    category: "ml",
    featured: true,
    type: "public",
    github: repo("RecoMate"),
    visual: "orbits",
    stack: ["Python", "Scikit-learn", "FastAPI", "Streamlit", "SQLite"],
    description: {
      fr: "Des recommandations hybrides, à la croisée du contenu, des utilisateurs et de la popularité.",
      en: "Hybrid recommendations connecting content, users, and popularity signals.",
    },
    context: {
      fr: "Explorer plusieurs sources de pertinence pour proposer des recommandations, plutôt que de dépendre d’un seul signal.",
      en: "Explore multiple sources of relevance for recommendations instead of relying on a single signal.",
    },
    approach: {
      fr: "Combinaison du filtrage par contenu (TF-IDF), du filtrage collaboratif et des signaux de popularité, pour des films et des produits. FastAPI, Streamlit et SQLite soutiennent l’exposition et l’exploration du système.",
      en: "Combines content-based filtering (TF-IDF), collaborative filtering, and popularity signals for films and products. FastAPI, Streamlit, and SQLite support exposing and exploring the system.",
    },
    evaluation: {
      fr: "Les performances de recommandation et le comportement pour les nouveaux utilisateurs nécessitent une évaluation reproductible. Aucune amélioration chiffrée de pertinence ou d’engagement n’est revendiquée.",
      en: "Recommendation performance and behavior for new users require reproducible evaluation. No quantitative relevance or engagement improvement is claimed.",
    },
    flow: [
      "Content",
      "User signals",
      "Hybrid ranking",
      "FastAPI",
      "Recommendations",
    ],
  },
  {
    slug: "meteoflow",
    name: "MétéoFlow ETL",
    category: "data",
    featured: true,
    type: "public",
    github: repo("meteoflow-etl"),
    visual: "weather",
    stack: ["Python", "Pandas", "PostgreSQL", "Docker", "Cron"],
    description: {
      fr: "Extraire, valider et structurer les données météo pour l’analyse.",
      en: "Extracting, validating, and structuring weather data for analysis.",
    },
    context: {
      fr: "Automatiser la collecte de données météorologiques historiques et leur préparation pour des usages analytiques.",
      en: "Automate historical weather data collection and preparation for analytical use.",
    },
    approach: {
      fr: "Un pipeline ETL Python extrait les données, valide les observations et charge les enregistrements dans PostgreSQL. Pandas soutient les transformations ; Cron et Docker permettent l’exécution planifiée et l’environnement du pipeline.",
      en: "A Python ETL pipeline extracts data, validates observations, and loads records into PostgreSQL. Pandas supports transformations; Cron and Docker provide scheduled execution and the pipeline environment.",
    },
    evaluation: {
      fr: "La provenance exacte des observations, les règles de validation et les conditions de relance sont à consulter dans le dépôt. Les données manquantes et la couverture temporelle doivent être vérifiées avant toute analyse. Aucun volume ni taux de disponibilité n’est annoncé.",
      en: "Consult the repository for exact observation provenance, validation rules, and rerun behavior. Missing data and temporal coverage should be checked before analysis. No volume or availability rate is claimed.",
    },
    flow: [
      "Weather source",
      "Extract",
      "Validate / transform",
      "PostgreSQL",
      "Analytics",
    ],
  },
  {
    slug: "sentimentscope",
    name: "SentimentScope",
    category: "ml",
    featured: true,
    type: "public",
    github: repo("SentimentScope"),
    visual: "sentiment",
    stack: ["Python", "Transformers", "DistilBERT", "NLTK", "Streamlit"],
    description: {
      fr: "Comprendre les nuances du texte grâce à l’analyse de sentiment multilingue.",
      en: "Exploring the nuances of text through multilingual sentiment analysis.",
    },
    context: {
      fr: "Permettre l’exploration de sentiments dans des textes multilingues et des fichiers CSV via une application interactive.",
      en: "Enable sentiment exploration in multilingual texts and CSV files through an interactive application.",
    },
    approach: {
      fr: "L’application associe des modèles Transformers et des approches lexicales pour la classification. DistilBERT et NLTK font partie de la boîte à outils ; Streamlit permet le traitement CSV et l’analyse interactive.",
      en: "The application supports Transformer models and lexicon-based classification. DistilBERT and NLTK are part of the toolkit; Streamlit enables CSV processing and interactive analysis.",
    },
    evaluation: {
      fr: "L’ironie, les variations de langue et les textes hors domaine peuvent limiter la classification. Les résultats doivent être interprétés dans leur contexte et ne constituent pas une mesure certaine des émotions d’une personne. Aucun score de précision non vérifié n’est publié.",
      en: "Irony, language variation, and out-of-domain text can limit classification. Results require contextual interpretation and are not a definitive measure of a person’s emotions. No unverified accuracy score is published.",
    },
    flow: [
      "Text / CSV",
      "Preprocessing",
      "Transformer / lexicon",
      "Classification",
      "Exploration",
    ],
  },
  {
    slug: "hotel-booking",
    name: "Hotel Booking Prediction",
    category: "mining",
    featured: false,
    type: "academic",
    visual: "grid",
    stack: ["Data Mining", "EDA", "Feature engineering", "Classification"],
    description: {
      fr: "Explorer les facteurs d’annulation des réservations hôtelières.",
      en: "Exploring factors behind hotel booking cancellations.",
    },
    context: {
      fr: "Projet Data Mining sur Hotel Booking Demand : 119 390 lignes et 32 colonnes originales, avec is_canceled comme cible. Le contexte est celui de l’hôtellerie et de la gestion des revenus.",
      en: "A Data Mining project on Hotel Booking Demand: 119,390 records and 32 original columns, targeting is_canceled in hospitality and revenue management.",
    },
    approach: {
      fr: "Analyse exploratoire, prétraitement, ingénierie des variables, classification et interprétation métier. Source du jeu de données : Kaggle, Hotel Booking Demand, publié par jessemostipak.",
      en: "Exploratory analysis, preprocessing, feature engineering, classification, and business interpretation. Dataset source: Kaggle, Hotel Booking Demand, published by jessemostipak.",
    },
    evaluation: {
      fr: "Les algorithmes et résultats précis ne sont pas confirmés. Aucun score ni lien vers un dépôt n’est ajouté. La provenance et les conditions d’utilisation du jeu de données doivent être consultées avant réutilisation.",
      en: "Specific algorithms and results are not confirmed. No score or repository link is added. Review dataset provenance and usage conditions before reuse.",
    },
    flow: [
      "Hotel Booking Demand",
      "EDA",
      "Preprocessing",
      "Classification",
      "Interpretation",
    ],
  },
  {
    slug: "deep-learning",
    name: "Deep Learning Lab",
    category: "deep",
    featured: false,
    type: "public",
    github: repo("deeplearning"),
    visual: "network",
    stack: ["Python", "PyTorch", "Scikit-learn", "CIFAR-10"],
    description: {
      fr: "Comparer MLP, CNN, RNN, LSTM, GRU et CNN-LSTM sur CIFAR-10.",
      en: "Comparing MLP, CNN, RNN, LSTM, GRU, and CNN-LSTM on CIFAR-10.",
    },
    context: {
      fr: "Une exploration comparative de plusieurs architectures de réseaux de neurones à partir du jeu de données CIFAR-10.",
      en: "A comparative exploration of neural network architectures using the CIFAR-10 dataset.",
    },
    approach: {
      fr: "Implémentation et évaluation des architectures MLP, CNN, RNN, LSTM, GRU et hybride CNN-LSTM avec PyTorch. Le projet permet d’examiner différentes formulations d’un même problème de classification.",
      en: "Implementation and evaluation of MLP, CNN, RNN, LSTM, GRU, and hybrid CNN-LSTM architectures with PyTorch, exploring different formulations of a classification problem.",
    },
    evaluation: {
      fr: "Les configurations, protocoles d’entraînement et résultats sont à examiner dans le dépôt. Aucune architecture n’est présentée comme gagnante sans vérification des conditions de comparaison.",
      en: "Review configurations, training protocols, and results in the repository. No architecture is presented as the winner without verifying comparison conditions.",
    },
    flow: [
      "CIFAR-10",
      "Preparation",
      "Neural architectures",
      "Training",
      "Evaluation",
    ],
  },
  {
    slug: "calorie-ai",
    name: "CalorieAI",
    category: "software",
    featured: false,
    type: "public",
    github: repo("calorieAI"),
    visual: "orbits",
    stack: ["TypeScript", "Next.js", "React", "Prisma"],
    description: {
      fr: "Une application de suivi alimentaire et de gestion des calories.",
      en: "A food tracking and calorie management application.",
    },
    context: {
      fr: "Un projet applicatif consacré au suivi de l’alimentation.",
      en: "An application project focused on food tracking.",
    },
    approach: {
      fr: "Développement avec TypeScript, Next.js, React et Prisma. Le projet relie interface utilisateur et gestion des données.",
      en: "Built with TypeScript, Next.js, React, and Prisma, connecting the user interface with data management.",
    },
    evaluation: {
      fr: "Les fonctions d’IA détaillées ne sont pas confirmées. Ce portfolio ne revendique ni reconnaissance d’aliments ni recommandations médicales.",
      en: "Detailed AI features have not been confirmed. This portfolio does not claim food recognition or medical recommendations.",
    },
    flow: ["Interface", "Application", "Prisma", "Data"],
  },
  {
    slug: "student-health",
    name: "Student Health",
    category: "software",
    featured: false,
    type: "public",
    github: repo("application-sante-etudiante-v1"),
    visual: "signal",
    stack: ["Flutter", "Dart", "Firebase"],
    description: {
      fr: "Un projet mobile autour des services de santé étudiante.",
      en: "A mobile project addressing student health services.",
    },
    context: {
      fr: "Projet d’application mobile consacré à la santé étudiante.",
      en: "A mobile application project focused on student health.",
    },
    approach: {
      fr: "Le CV fourni décrit un socle Flutter, Dart et Firebase. Les détails fonctionnels sont à consulter dans le dépôt public.",
      en: "The supplied CV describes a Flutter, Dart, and Firebase stack. Consult the public repository for functional details.",
    },
    evaluation: {
      fr: "Aucune fonctionnalité clinique, validation médicale ou mise en production n’est revendiquée.",
      en: "No clinical functionality, medical validation, or production deployment is claimed.",
    },
    flow: ["Flutter", "Application", "Firebase"],
  },
  {
    slug: "student-management",
    name: "Student Management",
    category: "software",
    featured: false,
    type: "public",
    github: repo("gestion_etudiant_php"),
    visual: "grid",
    stack: ["PHP", "Laravel"],
    description: {
      fr: "Une plateforme web de gestion des étudiants avec PHP et Laravel.",
      en: "A web-based student management platform with PHP and Laravel.",
    },
    context: {
      fr: "Projet de développement web appliqué à la gestion des étudiants.",
      en: "A web development project applied to student management.",
    },
    approach: {
      fr: "Application construite avec PHP et Laravel. Le dépôt permet d’examiner la structure et les choix d’implémentation.",
      en: "An application built with PHP and Laravel. The repository provides insight into structure and implementation choices.",
    },
    evaluation: {
      fr: "Le périmètre détaillé et les tests sont à vérifier dans le dépôt. Aucun nombre d’utilisateurs ni résultat opérationnel n’est publié.",
      en: "Verify detailed scope and tests in the repository. No user counts or operational results are published.",
    },
    flow: ["Web interface", "Laravel", "Data"],
  },
  {
    slug: "school-management",
    name: "School Management",
    category: "software",
    featured: false,
    type: "public",
    github: repo("gestion_decole_v1"),
    visual: "grid",
    stack: ["Java", "OOP"],
    description: {
      fr: "Une application de gestion scolaire développée en Java.",
      en: "A school management application built in Java.",
    },
    context: {
      fr: "Un projet d’ingénierie logicielle autour de la gestion scolaire.",
      en: "A software engineering project focused on school management.",
    },
    approach: {
      fr: "Développement en Java pour mettre en pratique la structuration d’une application et les concepts de programmation orientée objet.",
      en: "Java development to practice application structure and object-oriented programming concepts.",
    },
    evaluation: {
      fr: "Les fonctionnalités et conditions d’exécution sont à consulter dans le dépôt public.",
      en: "Consult the public repository for functionality and execution requirements.",
    },
    flow: ["Interface", "Java application", "Domain model"],
  },
  {
    slug: "cpp-rpg",
    name: "C++ RPG",
    category: "software",
    featured: false,
    type: "public",
    github: repo("project_cpp_v3"),
    visual: "grid",
    stack: ["C++", "OOP", "Graphics"],
    description: {
      fr: "Un jeu de rôle pour explorer la programmation objet et graphique.",
      en: "A role-playing game exploring object-oriented and graphical programming.",
    },
    context: {
      fr: "Projet de jeu RPG développé en C++ pour appliquer les fondamentaux logiciels à un système interactif.",
      en: "An RPG game developed in C++ to apply software foundations to an interactive system.",
    },
    approach: {
      fr: "Programmation orientée objet et concepts de programmation graphique. Le dépôt public permet d’explorer l’implémentation.",
      en: "Object-oriented programming and graphical programming concepts. The public repository allows implementation exploration.",
    },
    evaluation: {
      fr: "Aucun moteur, contenu de jeu ou niveau de performance non confirmé n’est annoncé.",
      en: "No unconfirmed game engine, game content, or performance level is claimed.",
    },
    flow: ["Input", "Game objects", "Game loop", "Rendering"],
  },
];
