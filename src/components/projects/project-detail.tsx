"use client";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Project } from "@/data/projects";
import { categoryNames } from "@/data/projects";
import type { Locale } from "@/data/profile";
import { translations } from "@/data/translations";
import { Modal } from "../ui/modal";
import { ProjectVisual } from "../effects/system-visual";

export function ProjectDetail({
  project,
  locale,
  onClose,
}: {
  project: Project;
  locale: Locale;
  onClose: () => void;
}) {
  const t = translations[locale];
  return (
    <Modal titleId="project-title" closeLabel={t.close} onClose={onClose}>
      <div className="detail-hero">
        <span className="eyebrow">
          {categoryNames[project.category][locale]}
        </span>
        <h2 id="project-title">{project.name}</h2>
        <p>{project.description[locale]}</p>
        <div className="detail-meta">
          <span>
            {project.type === "private" ? (
              <>
                <LockKeyhole size={14} /> {t.private}
              </>
            ) : project.type === "academic" ? (
              t.academicProject
            ) : (
              t.public
            )}
          </span>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {t.repo}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
      <ProjectVisual variant={project.visual} />
      <p className="visual-note">{t.galleryNote}</p>
      <div className="detail-content">
        <section>
          <h3>{t.context}</h3>
          <p>{project.context[locale]}</p>
        </section>
        <section>
          <h3>{t.solution}</h3>
          <p>{project.approach[locale]}</p>
        </section>
        <section>
          <h3>{t.architecture}</h3>
          <ol className="architecture-flow">
            {project.flow.map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h3>{t.tech}</h3>
          <div className="chips">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>
        <section className="evaluation">
          <h3>{t.evaluation}</h3>
          <p>{project.evaluation[locale]}</p>
          {project.slug === "hotel-booking" && (
            <a
              className="text-link"
              href="https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hotel Booking Demand <ArrowUpRight size={16} />
            </a>
          )}
        </section>
      </div>
    </Modal>
  );
}
