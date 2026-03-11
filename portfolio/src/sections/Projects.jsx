// Projects.jsx
// Purpose : Featured projects grid. First project spans
//           full width. Others are 2-column cards.
// Edit    : projects array in src/data/content.js
import { useState } from 'react';
import { projects, personal } from '../data/content';
import './Projects.css';

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-head">
        <div>
          <div className="s-label">Portfolio</div>
          <h2 className="s-title">FEATURED<br /><em>PROJECTS</em></h2>
        </div>
        <a href={personal.github} target="_blank" rel="noreferrer" className="link-arrow">
          GitHub Profile →
        </a>
      </div>

      <div className="projects-grid">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ proj }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = proj.image && !imgFailed;

  return (
    <div className={`proj-card${proj.featured ? ' featured' : ''}`}>

      {/* Visual banner */}
      <div className="proj-banner" style={{ background: proj.gradient }}>

        {showImage ? (
          <img
            src={proj.image}
            alt={proj.name}
            className="proj-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="proj-glyph">{proj.glyph}</span>
        )}

        {/* Tag pill overlaid on banner */}
        <span className="proj-tag-pill">{proj.tag}</span>
      </div>

      {/* Body */}
      <div className="proj-body">
        {proj.award && (
          <div className="proj-award">{proj.award}</div>
        )}
        <div className="proj-name">{proj.name}</div>
        <div className="proj-desc">{proj.desc}</div>
        <div className="proj-stack">
          {proj.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
        {proj.link && (
          <a href={proj.link} target="_blank" rel="noreferrer" className="proj-link">
            {proj.linkLabel} →
          </a>
        )}
      </div>

    </div>
  );
}