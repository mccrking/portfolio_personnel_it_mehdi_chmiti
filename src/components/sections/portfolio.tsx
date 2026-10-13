"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  LockKeyhole,
  Sparkles,
  Plus,
  Minus,
  BrainCircuit,
  Database,
  Code2,
  Wrench,
  Copy,
  Check,
  Globe2,
} from "lucide-react";
import { profile, config, type Locale } from "@/data/profile";
import { translations } from "@/data/translations";
import {
  categoryNames,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { journey } from "@/data/education";
import { SystemVisual, ProjectVisual } from "../effects/system-visual";
import dynamic from "next/dynamic";
const ProjectDetail = dynamic(
  () =>
    import("../projects/project-detail").then((module) => module.ProjectDetail),
  { ssr: false },
);
const Modal = dynamic(
  () => import("../ui/modal").then((module) => module.Modal),
  { ssr: false },
);
const ProjectThumbnail = dynamic(() => import("../projects/project-thumbnail"));
const navIds = ["home", "about", "experience", "projects", "skills", "contact"];
const roles = {
  fr: [
    "AI & Data Engineering",
    "Machine Learning",
    "IA générative & RAG",
    "Applications intelligentes",
  ],
  en: [
    "AI & Data Engineering",
    "Machine Learning",
    "Generative AI & RAG",
    "Intelligent Applications",
  ],
};
const iconMap = {
  brain: BrainCircuit,
  sparkles: Sparkles,
  database: Database,
  code: Code2,
  tools: Wrench,
};
type PublicRepo = {
  name: string;
  url: string;
  language: string | null;
  updated: string;
};
export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>(config.defaultLocale);
  const [theme, setTheme] = useState("dark");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState<Category | "all" | "featured">(
    "all",
  );
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = translations[locale];
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let savedLocale: string | null = null,
      savedTheme: string | null = null;
    try {
      savedLocale = localStorage.getItem("portfolio-locale");
      savedTheme = localStorage.getItem("portfolio-theme");
    } catch {
      /* storage may be unavailable */
    }
    // Restore browser preferences after the server-rendered French/dark default.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedLocale === "en" || savedLocale === "fr") setLocale(savedLocale);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("portfolio-locale", locale);
    } catch {}
  }, [locale]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
      const current = [...sections]
        .reverse()
        .find((el) => el.getBoundingClientRect().top <= 180);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const first = mobileRef.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    function keyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const items = Array.from(
          mobileRef.current?.querySelectorAll<HTMLElement>("a, button") || [],
        );
        const targets = [menuButton.current, ...items].filter(
          (item): item is HTMLElement => !!item,
        );
        const index = targets.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          targets.at(-1)?.focus();
        }
        if (!event.shiftKey && index === targets.length - 1) {
          event.preventDefault();
          targets[0]?.focus();
        }
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, [menu]);
  const openCV = () => {
    if (config.cvPath && config.cvRevision === "current") {
      const link = document.createElement("a");
      link.href = config.cvPath;
      link.download = "Mehdi-Chmiti-CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else setCvOpen(true);
  };
  const selectedProjects = projects
    .filter(
      (project) =>
        showAll ||
        category !== "all" ||
        config.featuredOrder.includes(project.slug),
    )
    .filter(
      (project) =>
        category === "all" ||
        (category === "featured"
          ? project.featured
          : project.category === category),
    );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <>
      <>
        <div className="portfolio">
          <a href="#main" className="skip-link">
            {t.skip}
          </a>
          <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-inner">
              <a
                href="#home"
                className="brand"
                aria-label={
                  locale === "fr"
                    ? "Mehdi Chmiti — Accueil"
                    : "Mehdi Chmiti — Home"
                }
              >
                <span className="monogram">
                  m<span>c</span>
                  <i />
                </span>
                <span className="brand-name">
                  Mehdi Chmiti<span>AI & DATA ENGINEERING</span>
                </span>
              </a>
              <nav
                className="desktop-nav"
                aria-label={
                  locale === "fr" ? "Navigation principale" : "Main navigation"
                }
              >
                {navIds.map((id, i) => (
                  <a
                    href={`#${id}`}
                    key={id}
                    className={active === id ? "active" : ""}
                    aria-current={active === id ? "location" : undefined}
                  >
                    {t.nav[i]}
                  </a>
                ))}
              </nav>
              <div className="header-actions">
                <button
                  className="language-button"
                  aria-label={t.languageLabel}
                  onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
                >
                  {locale.toUpperCase()}
                  <span>/ {locale === "fr" ? "EN" : "FR"}</span>
                </button>
                <span className="header-divider" />
                <button
                  className="icon-button theme-button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={t.theme}
                >
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                </button>
                <button
                  className="button button-small header-cv"
                  onClick={openCV}
                >
                  {t.cv}
                  <Download size={14} />
                </button>
                <button
                  ref={menuButton}
                  className="icon-button mobile-toggle"
                  aria-label={menu ? t.close : t.menu}
                  aria-expanded={menu}
                  aria-controls="mobile-nav"
                  onClick={() => setMenu(!menu)}
                >
                  {menu ? <X size={23} /> : <Menu size={23} />}
                </button>
              </div>
            </div>
            {menu && (
              <div className="mobile-nav" id="mobile-nav" ref={mobileRef}>
                <nav
                  aria-label={
                    locale === "fr" ? "Navigation mobile" : "Mobile navigation"
                  }
                >
                  {navIds.map((id, i) => (
                    <a
                      href={`#${id}`}
                      key={id}
                      onClick={() => {
                        setMenu(false);
                        document
                          .getElementById(id)
                          ?.focus({ preventScroll: true });
                      }}
                    >
                      {t.nav[i]}
                      <ArrowUpRight size={17} />
                    </a>
                  ))}
                </nav>
                <button
                  className="button"
                  onClick={() => {
                    setMenu(false);
                    openCV();
                  }}
                >
                  {t.cv}
                  <Download size={16} />
                </button>
              </div>
            )}
          </header>
          <main id="main">
            <section id="home" className="hero section-anchor" tabIndex={-1}>
              <div className="hero-ambient" />
              <div className="container hero-content">
                <div className="hero-topline">
                  <span className="availability">
                    <span className="status-dot" />
                    {profile.availability[locale]}
                  </span>
                  <span className="mono hero-edition">{t.portfolio}</span>
                </div>
                <div className="hero-layout">
                  <div className="hero-copy">
                    <p className="eyebrow hero-eyebrow">{t.eyebrow}</p>
                    <h1>
                      <span>Mehdi</span>
                      <span className="gradient-text">
                        Chmiti<span className="name-period">.</span>
                      </span>
                    </h1>
                    <div className="hero-identity">
                      <span>
                        {t.heroFirst} {t.heroSecond}
                      </span>
                      <span className="identity-divider" />
                      <span>{t.role}</span>
                    </div>
                    <RoleRotator locale={locale} />
                    <p className="hero-description">{t.description}</p>
                    <div className="hero-buttons">
                      <a href="#projects" className="button button-primary">
                        {t.explore}
                        <ArrowUpRight size={18} />
                      </a>
                      <button
                        className="button button-secondary"
                        onClick={openCV}
                      >
                        {t.cv}
                        <Download size={16} />
                      </button>
                    </div>
                    <SocialLinks labelOnly={false} />
                  </div>
                  <SystemVisual locale={locale} />
                </div>
                <div className="hero-bottom">
                  <a href="#featured" className="scroll-cue">
                    <span className="scroll-circle">
                      <ArrowDown size={15} />
                    </span>
                    {t.scroll}
                  </a>
                  <span className="mono location">
                    <MapPin size={13} />
                    {t.based}
                  </span>
                </div>
              </div>
              <div className="stack-strip">
                <div className="container">
                  <span className="stack-label">{t.building}</span>
                  {[
                    "Python",
                    "Next.js",
                    "PyTorch",
                    "PostgreSQL",
                    "Apache Airflow",
                    "Docker",
                  ].map((tech, i) => (
                    <span key={tech}>
                      <span className="tech-symbol">
                        {["⌘", "↗", "◈", "▱", "✳", "▦"][i]}
                      </span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <Suspense fallback={null}>
              <section
                id="featured"
                className="featured section-pad section-anchor"
              >
                <div className="container">
                  <div className="section-top">
                    <span className="eyebrow">
                      <span className="tiny-star">✳</span>
                      {t.featured}
                    </span>
                    <span className="mono section-side">01 / 13</span>
                  </div>
                  <div
                    className="featured-card"
                    onPointerMove={(event) => {
                      if (event.pointerType === "mouse") {
                        const bounds =
                          event.currentTarget.getBoundingClientRect();
                        event.currentTarget.style.setProperty(
                          "--mouse-x",
                          `${event.clientX - bounds.left}px`,
                        );
                        event.currentTarget.style.setProperty(
                          "--mouse-y",
                          `${event.clientY - bounds.top}px`,
                        );
                      }
                    }}
                  >
                    <div className="featured-copy">
                      <span className="project-label">
                        <span className="status-dot" />
                        {t.enterprise}
                      </span>
                      <h2>
                        MIFA<span> AI</span>
                        <span className="heading-dot">.</span>
                      </h2>
                      <h3>{t.mifaSubtitle}</h3>
                      <p>{t.mifaDescription}</p>
                      <div className="chips">
                        {[
                          "Next.js",
                          "RAG",
                          "PostgreSQL",
                          "pgvector",
                          "TypeScript",
                        ].map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <button
                        className="button button-primary"
                        onClick={() => setSelected(projects[0])}
                      >
                        {t.caseStudy}
                        <ArrowUpRight size={17} />
                      </button>
                      <span className="private-label">
                        <LockKeyhole size={13} />
                        {t.private}
                      </span>
                    </div>
                    <div className="featured-preview">
                      <div className="preview-orbit" />
                      <div className="assistant-window">
                        <div className="window-top">
                          <span className="window-logo">
                            <Sparkles size={15} />
                          </span>
                          <div>
                            <strong>MIFA AI</strong>
                            <span>{t.assistant}</span>
                          </div>
                          <span className="window-online" />
                        </div>
                        <div className="window-body">
                          <div className="chat-bubble assistant-bubble">
                            <Sparkles size={13} />
                            <p>{t.assistantHello}</p>
                          </div>
                          <div className="chat-bubble user-bubble">
                            <p>{t.customer}</p>
                          </div>
                          <div className="retrieval-status">
                            <span className="status-dot" />
                            {t.retrieval}
                            <span>↗</span>
                          </div>
                          <div className="chat-bubble assistant-bubble">
                            <Sparkles size={13} />
                            <p>{t.assistantReply}</p>
                          </div>
                          <div className="source-chip">
                            <Database size={12} />
                            {t.source}
                          </div>
                        </div>
                        <div className="chat-input">
                          <span>{t.input}</span>
                          <span>
                            <ArrowUp size={14} />
                          </span>
                        </div>
                        <div className="window-footer">
                          FR <span>·</span> EN <span>·</span> AR{" "}
                          <span className="footer-model">RAG + LLM</span>
                        </div>
                      </div>
                      <div className="floating-pill">
                        <LayersIcon />
                        HYBRID RAG
                        <span className="status-dot" />
                      </div>
                      <p className="mockup-note">{t.mockup}</p>
                    </div>
                  </div>
                  <p className="featured-status">
                    <LockKeyhole size={12} />
                    {t.mifaStatus}
                  </p>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="about"
                className="section-pad section-anchor about"
                tabIndex={-1}
              >
                <div className="container about-layout">
                  <div className="about-art">
                    <span className="mono about-art-label">
                      {locale === "fr"
                        ? "LA PERSONNE DERRIÈRE LE SYSTÈME"
                        : "THE PERSON BEHIND THE SYSTEM"}
                    </span>
                    <div className="about-monogram">
                      m<span>c</span>
                      <i />
                    </div>
                    <div className="about-art-bottom">
                      <span>MEHDI CHMITI</span>
                      <span>33.5731° N / 7.5898° W</span>
                    </div>
                  </div>
                  <div className="about-copy">
                    <span className="eyebrow">{t.aboutEyebrow}</span>
                    <h2 className="section-heading">{t.aboutTitle}</h2>
                    <p>{t.aboutBody}</p>
                    <p>{t.aboutSecond}</p>
                    <dl className="profile-facts">
                      {[
                        profile.location[locale],
                        profile.school,
                        "AI & Data",
                        "FR B2 · EN B2 · AR",
                      ].map((value, i) => (
                        <div key={value}>
                          <dt>{t.facts[i]}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="values">
                      {t.values.map((value) => (
                        <span key={value}>
                          <Check size={13} />
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="experience"
                className="section-pad section-anchor experience"
                tabIndex={-1}
              >
                <div className="container">
                  <SectionHeading
                    eyebrow={t.experienceEyebrow}
                    title={t.experienceTitle}
                    description={t.experienceDesc}
                  />
                  <div className="timeline">
                    {experiences.map((item, i) => (
                      <article className="experience-row" key={item.company}>
                        <div className="experience-date">
                          <span
                            className={`timeline-dot ${i === 0 ? "current" : ""}`}
                          />
                          <span className="mono">{item.date[locale]}</span>
                          <span className="experience-number">0{i + 1}</span>
                        </div>
                        <div className="experience-body">
                          <div className="experience-title">
                            <div>
                              <h3>{item.company}</h3>
                              <span>{item.role[locale]}</span>
                            </div>
                            <ArrowUpRight size={21} />
                          </div>
                          <p>{item.description[locale]}</p>
                          <div className="chips">
                            {item.stack.map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                          <details>
                            <summary>
                              {t.details}
                              <Plus className="expand-plus" size={15} />
                              <Minus className="expand-minus" size={15} />
                            </summary>
                            <ul>
                              {item.contributions[locale].map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="projects"
                className="section-pad section-anchor projects-section"
                tabIndex={-1}
              >
                <div className="container">
                  <SectionHeading
                    eyebrow={t.projectsEyebrow}
                    title={t.projectsTitle}
                    description={t.projectsDesc}
                  />
                  <div className="project-filterbar">
                    <div
                      className="project-filters"
                      aria-label={
                        locale === "fr"
                          ? "Filtrer les projets"
                          : "Filter projects"
                      }
                    >
                      {(
                        [
                          "all",
                          "featured",
                          ...Object.keys(categoryNames),
                        ] as const
                      ).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setCategory(filter as typeof category)}
                          className={category === filter ? "selected" : ""}
                          aria-pressed={category === filter}
                        >
                          {filter === "all"
                            ? t.all
                            : filter === "featured"
                              ? t.featuredFilter
                              : categoryNames[filter as Category][locale]}
                        </button>
                      ))}
                    </div>
                    <span className="mono result-count" aria-live="polite">
                      {selectedProjects.length} {t.results}
                    </span>
                  </div>
                  <div className="project-grid" key={category}>
                    <>
                      {selectedProjects.map((project, i) => (
                        <article
                          key={project.slug}
                          className={`project-card ${i < 2 && category === "all" ? "project-wide" : ""}`}
                        >
                          <button
                            className="project-visual-button"
                            onClick={() => setSelected(project)}
                            aria-label={`${t.view} ${project.name}`}
                          >
                            {project.screenshot ? (
                              <ProjectThumbnail
                                src={project.screenshot}
                                name={project.name}
                                variant={project.visual}
                              />
                            ) : (
                              <ProjectVisual variant={project.visual} compact />
                            )}
                            <span className="card-open">
                              <ArrowUpRight size={20} />
                            </span>
                          </button>
                          <div className="project-card-body">
                            <div className="card-eyebrow">
                              <span>
                                {categoryNames[project.category][locale]}
                              </span>
                              {project.featured && (
                                <span className="featured-star">
                                  <Sparkles size={12} />
                                  {t.featuredFilter}
                                </span>
                              )}
                            </div>
                            <h3>
                              <button onClick={() => setSelected(project)}>
                                {project.name}
                                <ArrowUpRight size={18} />
                              </button>
                            </h3>
                            <p>{project.description[locale]}</p>
                            <div className="chips">
                              {project.stack.slice(0, 4).map((tech) => (
                                <span key={tech}>{tech}</span>
                              ))}
                            </div>
                            <div className="card-footer">
                              <span>
                                {project.type === "private" ? (
                                  <>
                                    <LockKeyhole size={11} />
                                    {t.private}
                                  </>
                                ) : project.type === "academic" ? (
                                  t.academicProject
                                ) : (
                                  t.public
                                )}
                              </span>
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${t.repo} — ${project.name}`}
                                >
                                  <Github size={14} />
                                  <ArrowUpRight size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </>
                  </div>
                  {!selectedProjects.length && (
                    <p className="empty-projects">{t.noResults}</p>
                  )}
                  <div className="all-projects">
                    <button
                      className="button button-secondary"
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? t.fewer : t.allProjects}
                      {showAll ? <Minus size={16} /> : <Plus size={16} />}
                      <span className="button-count">{projects.length}</span>
                    </button>
                  </div>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="skills"
                className="section-pad section-anchor skills-section"
                tabIndex={-1}
              >
                <div className="container">
                  <SectionHeading
                    eyebrow={t.skillsEyebrow}
                    title={t.skillsTitle}
                    description={t.skillsDesc}
                  />
                  <div className="skills-grid">
                    {skills.map((group, i) => {
                      const Icon = iconMap[group.icon];
                      return (
                        <article
                          className={`skill-card ${i === 3 ? "skill-wide" : ""}`}
                          key={group.icon}
                        >
                          <div className="skill-top">
                            <span className="skill-icon">
                              <Icon size={21} />
                            </span>
                            <span className="mono">0{i + 1}</span>
                          </div>
                          <h3>{group.name[locale]}</h3>
                          <span className="skill-subtitle">
                            {t.demonstrated}
                          </span>
                          <div className="chips skill-chips">
                            {group.applied.map((skill) => (
                              <span key={skill}>{skill}</span>
                            ))}
                          </div>
                          {group.academic.length > 0 && (
                            <>
                              <span className="skill-subtitle academic-label">
                                {t.academic}
                              </span>
                              <div className="chips academic-chips">
                                {group.academic.map((skill) => (
                                  <span key={skill}>{skill}</span>
                                ))}
                              </div>
                            </>
                          )}
                          <button
                            className="skill-evidence"
                            onClick={() =>
                              setSelected(
                                projects.find(
                                  (project) => project.slug === group.project,
                                )!,
                              )
                            }
                          >
                            {t.skillsEvidence}
                            <ArrowUpRight size={15} />
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="education"
                className="section-pad section-anchor education"
              >
                <div className="container">
                  <SectionHeading
                    eyebrow={t.educationEyebrow}
                    title={t.educationTitle}
                    description={t.educationDesc}
                  />
                  <div className="education-layout">
                    <div className="education-cards">
                      <article className="education-card">
                        <span className="eyebrow">{t.current}</span>
                        <h3>EMSI Casablanca</h3>
                        <p>{t.degree}</p>
                        <span>{t.specialty}</span>
                        <span className="education-icon">
                          <Globe2 size={25} />
                        </span>
                      </article>
                      <article className="education-card previous">
                        <span className="eyebrow">{t.previous}</span>
                        <h3>Établissement Lahlou</h3>
                        <p>{t.baccalaureate}</p>
                        <span>Casablanca</span>
                      </article>
                    </div>
                    <ol className="journey">
                      {journey.map((step, i) => (
                        <li key={i}>
                          <span className="journey-number">0{i + 1}</span>
                          <div>
                            <h3>{step.title[locale]}</h3>
                            <p>{step.description[locale]}</p>
                            <span className="mono">{step.tools}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section id="github" className="github-section section-pad">
                <div className="container github-layout">
                  <div>
                    <span className="eyebrow">{t.githubEyebrow}</span>
                    <h2 className="section-heading">{t.githubTitle}</h2>
                    <p>{t.githubDesc}</p>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      <Github size={18} />
                      {t.githubCta}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <GithubRepos locale={locale} />
                </div>
              </section>
            </Suspense>

            <Suspense fallback={null}>
              <section
                id="contact"
                className="contact-section section-anchor"
                tabIndex={-1}
              >
                <div className="contact-glow" />
                <div className="container">
                  <span className="eyebrow">{t.contactEyebrow}</span>
                  <div className="contact-top">
                    <h2>
                      {t.contactFirst}
                      <br />
                      <span className="gradient-text">{t.contactSecond}</span>
                    </h2>
                    <span className="contact-arrow">
                      <ArrowUpRight size={65} strokeWidth={1} />
                    </span>
                  </div>
                  <p>{t.contactDesc}</p>
                  <div className="contact-actions">
                    <a
                      className="button button-primary"
                      href={`mailto:${profile.email}`}
                    >
                      {t.emailCta}
                      <ArrowUpRight size={18} />
                    </a>
                    <button
                      className="button button-secondary"
                      onClick={openCV}
                    >
                      {t.download}
                      <Download size={16} />
                    </button>
                  </div>
                  <div className="contact-bottom">
                    <div className="email-copy">
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                      <button
                        className="icon-button"
                        onClick={copyEmail}
                        aria-label={copied ? t.copied : t.copy}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                      <span className="sr-only" aria-live="polite">
                        {copied ? t.copied : ""}
                      </span>
                    </div>
                    <SocialLinks labelOnly />
                  </div>
                </div>
              </section>
            </Suspense>
          </main>
          <footer className="footer">
            <div className="container">
              <a href="#home" className="footer-brand">
                Mehdi Chmiti<span>© {new Date().getFullYear()}</span>
              </a>
              <span>{t.rights}</span>
              <a href="#home">
                {t.top}
                <ArrowUp size={14} />
              </a>
            </div>
          </footer>
          {selected && (
            <ProjectDetail
              project={selected}
              locale={locale}
              onClose={() => setSelected(null)}
            />
          )}
          {cvOpen && (
            <Modal
              titleId="cv-title"
              closeLabel={t.close}
              onClose={() => setCvOpen(false)}
              small
            >
              <div className="cv-dialog">
                <span className="skill-icon">
                  <Download size={25} />
                </span>
                <h2 id="cv-title">
                  {config.cvPath ? t.cvBeforeTitle : t.cvTitle}
                </h2>
                <p>{config.cvPath ? t.cvBeforeBody : t.cvBody}</p>
                {config.cvPath && (
                  <a
                    className="button button-primary"
                    href={config.cvPath}
                    download="Mehdi-Chmiti-CV-avant-MIFA.pdf"
                  >
                    {t.cvBeforeDownload}
                    <Download size={16} />
                  </a>
                )}
                <a
                  className={`button ${config.cvPath ? "button-secondary" : "button-primary"}`}
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(locale === "fr" ? "Demande de CV — Mehdi Chmiti" : "CV request — Mehdi Chmiti")}`}
                >
                  {config.cvPath ? t.cvLatestRequest : t.cvEmail}
                  <Mail size={16} />
                </a>
              </div>
            </Modal>
          )}
        </div>
      </>
    </>
  );
}
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading-block">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-heading">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
function SocialLinks({ labelOnly }: { labelOnly: boolean }) {
  return (
    <div className={`social-links ${labelOnly ? "social-labels" : ""}`}>
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        <Github size={16} />
        GitHub
        <ArrowUpRight size={12} />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        <Linkedin size={15} />
        LinkedIn
        <ArrowUpRight size={12} />
      </a>
      {!labelOnly && (
        <a href={`mailto:${profile.email}`}>
          <Mail size={16} />
          Email
          <ArrowUpRight size={12} />
        </a>
      )}
    </div>
  );
}
function LayersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m8 2 6 3-6 3-6-3 6-3Zm-6 6 6 3 6-3M2 11l6 3 6-3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
function RoleRotator({ locale }: { locale: Locale }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setRoleIndex((index) => (index + 1) % roles.fr.length),
      4500,
    );
    return () => clearInterval(timer);
  }, [reduced]);
  return (
    <div className="rotating-role">
      <span className="role-marker">↳</span>
      <>
        <span key={roleIndex} className="role-text">
          {roles[locale][roleIndex]}
        </span>
      </>
    </div>
  );
}
function GithubRepos({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const [publicRepos, setPublicRepos] = useState<PublicRepo[]>([]);
  const [liveRepos, setLiveRepos] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          fetch("/api/github", { signal: controller.signal })
            .then((response) => response.json())
            .then((data) => {
              if (Array.isArray(data.repos) && data.repos.length) {
                setPublicRepos(data.repos);
                setLiveRepos(true);
              }
            })
            .catch(() => {});
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);
  const repos = liveRepos
    ? publicRepos
    : projects
        .filter((project) => project.github)
        .slice(0, 3)
        .map((project) => ({
          name: project.name,
          url: project.github!,
          language: project.stack[0],
          updated: "",
        }));
  return (
    <div className="github-repos" ref={ref}>
      <div className="repo-list-header">
        <span className="status-dot" />
        {liveRepos ? t.live : t.githubFallback}
        <span>@mccrking</span>
      </div>
      {repos.slice(0, 3).map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-row"
        >
          <div>
            <span>
              <Code2 size={15} />
              {repo.name}
            </span>
            <small>
              {repo.language || "Repository"}
              {repo.updated &&
                ` · ${t.updated} ${new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(repo.updated))}`}
            </small>
          </div>
          <ArrowUpRight size={18} />
        </a>
      ))}
    </div>
  );
}
