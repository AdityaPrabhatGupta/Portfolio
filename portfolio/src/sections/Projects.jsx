import { useRef, useEffect, useState } from 'react';
import { projects, personal } from '../data/content';
import './Projects.css';

import CaseStudyModal from '../components/CaseStudyModal';

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectCard({ proj, index, onOpenCaseStudy }) {
  const cardRef = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Pre-load hover image as soon as component mounts
  useEffect(() => {
    if (!proj.hoverImage) return;
    const img = new Image();
    img.src = proj.hoverImage;
  }, [proj.hoverImage]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  const liveHref   = proj.link   || null;
  const githubHref = proj.github || personal.github;

  const hasDefault = Boolean(proj.image);
  const hasHover   = Boolean(proj.hoverImage);

  return (
    <div
      ref={cardRef}
      className={'proj-card' + (visible ? ' proj-card--visible' : '') + (hovered ? ' proj-card--hovered' : '')}
      style={{ '--entry-delay': `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenCaseStudy(proj)}
    >
      {/* ── IMAGE AREA ── */}
      <div
        className="proj-card-image-link"
        role="button"
        tabIndex={0}
        aria-label={`View case study for ${proj.name}`}
      >
        <div className="proj-card-image-wrap">

          {/* Skeleton while default image loads */}
          {!imgLoaded && hasDefault && (
            <div className="proj-card-skeleton" aria-hidden="true" />
          )}

          {/* DEFAULT image — fades out on hover */}
          {hasDefault && (
            <img
              src={proj.image}
              alt={proj.name}
              className="proj-card-image proj-card-image--default"
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
            />
          )}

          {/* HOVER image — fades in on hover, always in DOM so it pre-caches */}
          {hasHover && (
            <img
              src={proj.hoverImage}
              alt=""
              aria-hidden="true"
              className="proj-card-image proj-card-image--hover"
              loading="lazy"
              decoding="async"
            />
          )}

          {/* GLYPH — shown when no default image; hidden on hover if hoverImage exists */}
          {!hasDefault && (
            <div
              className={'proj-card-image-fallback' + (hasHover && hovered ? ' proj-card-image-fallback--hidden' : '')}
              aria-hidden="true"
            >
              {proj.glyph}
            </div>
          )}

          {liveHref && (
            <div className="proj-live-badge">
              <span className="proj-live-dot" />
              Live
            </div>
          )}
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div className="proj-card-body">

        {(proj.stack?.length > 0 || proj.category) && (
          <div className="proj-card-tags">
            {proj.stack.slice(0, 3).map(s => (
              <span key={s} className="proj-tag">{s}</span>
            ))}
            {proj.category && (
              <span className="proj-tag proj-tag--category">{proj.category}</span>
            )}
          </div>
        )}

        {proj.award && <div className="proj-award-badge">{proj.award}</div>}

        <h3 className="proj-card-title">{proj.name}</h3>
        <p className="proj-card-desc">{proj.desc}</p>

        <div className="proj-card-footer">
          <span className="proj-card-number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="proj-card-actions">
            <a
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              className="proj-btn proj-btn--ghost"
              aria-label={`${proj.name} — View source on GitHub`}
              onClick={e => e.stopPropagation()}
            >
              <GitHubIcon />
              Code
            </a>
            {liveHref && (
              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="proj-btn proj-btn--accent"
                aria-label={`${proj.name} — View live site`}
                onClick={e => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  return (
    <section className="projects" id="projects">
      <div className="proj-bg-blob proj-bg-blob-1" aria-hidden="true" />
      <div className="proj-bg-blob proj-bg-blob-2" aria-hidden="true" />

      <div className="projects-head">
        <div>
          <p className="s-label">Portfolio</p>
          <h2 className="s-title">FEATURED<br /><em>PROJECTS</em></h2>
        </div>
        <a href={personal.github} target="_blank" rel="noreferrer" className="link-arrow">
          GitHub Profile →
        </a>
      </div>

      <div className="projects-grid">
        {projects.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            proj={proj}
            index={i}
            onOpenCaseStudy={setActiveCaseStudy}
          />
        ))}
      </div>

      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}
    </section>
  );
}