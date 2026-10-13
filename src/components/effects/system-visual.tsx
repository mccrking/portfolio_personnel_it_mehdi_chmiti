"use client";
import { Database, Layers3, Sparkles, Braces, Cpu } from "lucide-react";
import type { Locale } from "@/data/profile";

export function SystemVisual({ locale }: { locale: Locale }) {
  return (
    <div
      className="system-visual"
      aria-label={
        locale === "fr"
          ? "Système conceptuel : les données et les modèles alimentent des applications intelligentes"
          : "Conceptual data system: data and models power intelligent applications"
      }
      role="img"
    >
      <div className="system-grid" />
      <div className="system-orbit orbit-one" />
      <div className="system-orbit orbit-two" />
      <div className="system-orbit orbit-three" />
      <svg className="system-paths" viewBox="0 0 620 540" aria-hidden="true">
        <defs>
          <linearGradient id="connection" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#4469b4" stopOpacity=".1" />
            <stop offset=".5" stopColor="#8caeff" stopOpacity=".8" />
            <stop offset="1" stopColor="#8170df" stopOpacity=".1" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#connection)" strokeWidth="1">
          <path d="M100 160 L310 270 L520 155" />
          <path d="M140 395 L310 270 L505 385" />
          <path d="M310 80 L310 270 L310 465" />
          <path d="M100 160 L140 395 L505 385 L520 155 Z" />
        </g>
        <g fill="#a8b8ec">
          <circle cx="207" cy="216" r="3" />
          <circle cx="410" cy="216" r="3" />
          <circle cx="220" cy="333" r="3" />
          <circle cx="411" cy="330" r="3" />
          <circle cx="310" cy="162" r="3" />
        </g>
      </svg>
      <div className="system-node node-data">
        <Database size={18} />
        <span>{locale === "fr" ? "DONNÉES" : "DATA LAYER"}</span>
        <small>PostgreSQL · pgvector</small>
      </div>
      <div className="system-node node-model">
        <Cpu size={18} />
        <span>INTELLIGENCE</span>
        <small>ML · LLMs</small>
      </div>
      <div className="system-node node-retrieval">
        <Layers3 size={18} />
        <span>{locale === "fr" ? "RECHERCHE" : "RETRIEVAL"}</span>
        <small>RAG · Embeddings</small>
      </div>
      <div className="system-node node-app">
        <Braces size={18} />
        <span>APPLICATION</span>
        <small>Next.js · TypeScript</small>
      </div>
      <div className="system-core">
        <div className="core-shape">
          <Sparkles size={35} strokeWidth={1.2} />
        </div>
        <span>
          {locale === "fr"
            ? "INTELLIGENCE CONNECTÉE"
            : "CONNECTED INTELLIGENCE"}
        </span>
      </div>
      <span className="visual-coordinate coordinate-top">
        {locale === "fr" ? "SYSTÈME" : "SYSTEM"} / 001
      </span>
      <span className="visual-coordinate coordinate-bottom">
        {locale === "fr" ? "DONNÉES" : "DATA"} → INTELLIGENCE → IMPACT
      </span>
      <div className="system-tag">
        <span className="status-dot" /> PYTHON POWERED
      </div>
    </div>
  );
}

export function ProjectVisual({
  variant,
  compact = false,
}: {
  variant: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`project-art art-${variant} ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <div className="art-grid" />
      {variant === "pipeline" ? (
        <div className="pipeline-art">
          <div className="pipeline-source">
            RSS<span>↓</span>
            <i />
            <i />
            <i />
          </div>
          <span className="pipeline-line" />
          <div className="pipeline-block bronze">
            <span>01</span>BRONZE
          </div>
          <span className="pipeline-line" />
          <div className="pipeline-block silver">
            <span>02</span>SILVER
          </div>
          <span className="pipeline-line" />
          <div className="pipeline-block gold">
            <span>03</span>GOLD
          </div>
        </div>
      ) : variant === "signal" ? (
        <svg viewBox="0 0 600 220">
          <path className="signal-baseline" d="M40 120 H560" />
          <path
            className="signal-wave"
            d="M40 120 L105 120 L118 100 L134 142 L151 120 L215 120 L231 60 L250 175 L267 112 L286 120 L358 120 L374 88 L393 142 L411 120 L560 120"
          />
          <circle cx="231" cy="60" r="13" className="signal-point" />
          <text x="255" y="55">
            ANOMALY DETECTED
          </text>
        </svg>
      ) : variant === "weather" ? (
        <div className="weather-art">
          <div className="weather-sun" />
          <div className="weather-cloud" />
          <svg viewBox="0 0 450 150">
            <path d="M0 125 Q50 70 90 100 T180 80 T270 60 T360 50 T450 20" />
          </svg>
          <span>EXTRACT → TRANSFORM → LOAD</span>
        </div>
      ) : variant === "sentiment" ? (
        <div className="sentiment-art">
          <span className="sentiment-negative">−</span>
          <span className="sentiment-neutral">~</span>
          <span className="sentiment-positive">+</span>
          <div className="sentiment-bars">
            {[25, 40, 32, 60, 45, 75, 65, 90, 70, 95, 80, 60, 75, 90, 66].map(
              (height, i) => (
                <i key={i} style={{ height }} />
              ),
            )}
          </div>
        </div>
      ) : variant === "orbits" ? (
        <div className="reco-art">
          <div />
          <div />
          <div />
          <span className="reco-center">
            <Sparkles size={25} />
          </span>
          <i className="reco-dot a" />
          <i className="reco-dot b" />
          <i className="reco-dot c" />
          <span className="reco-label">CONTENT × COLLABORATIVE</span>
        </div>
      ) : variant === "network" ? (
        <svg viewBox="0 0 600 220">
          <g stroke="currentColor" strokeOpacity=".3">
            {[60, 110, 160].flatMap((y, i) =>
              [40, 80, 120, 160, 200].map((y2, j) => (
                <path
                  key={`${i}-${j}`}
                  d={`M180 ${y} L300 ${y2} M300 ${y2} L420 ${[65, 110, 155][i]}`}
                />
              )),
            )}
          </g>
          <g fill="currentColor">
            {[60, 110, 160].map((y) => (
              <circle key={y} cx="180" cy={y} r="7" />
            ))}
            {[40, 80, 120, 160, 200].map((y) => (
              <circle key={y} cx="300" cy={y} r="7" />
            ))}
            {[65, 110, 155].map((y) => (
              <circle key={y} cx="420" cy={y} r="7" />
            ))}
          </g>
        </svg>
      ) : (
        <div className="grid-art">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} style={{ opacity: 0.15 + ((i * 7) % 10) / 14 }} />
          ))}
          <Braces size={38} />
        </div>
      )}
      <span className="art-corner">
        {variant === "pipeline"
          ? "MEDALLION ARCHITECTURE"
          : variant === "network"
            ? "INTELLIGENT SYSTEMS"
            : variant === "signal"
              ? "CLASSIFICATION PIPELINE"
              : "ENGINEERING EXPLORATION"}
      </span>
    </div>
  );
}
