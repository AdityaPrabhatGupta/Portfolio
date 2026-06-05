// ResumeModal.jsx
// Purpose : High-fidelity overlay showing candidate CV.
//           Includes browser print command integration for clean PDF exports.

import { useEffect } from 'react';
import { personal, skills, experience, projects, certifications } from '../data/content';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  // Lock body scroll when resume is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="res-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="res-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Print & Close Controls */}
        <div className="res-modal-controls">
          <button className="res-btn-print" onClick={handlePrint}>
            Print / Save PDF 🖨
          </button>
          <a href={personal.resume} download className="res-btn-download">
            Download File ↓
          </a>
          <button className="res-btn-close" onClick={onClose} aria-label="Close resume">
            Close &times;
          </button>
        </div>

        {/* Scrollable Document Container */}
        <div className="res-document-scroll">
          <div className="res-paper-sheet" id="printable-resume-content">
            
            {/* Header / Contact */}
            <header className="res-doc-header">
              <h1 className="res-doc-name">{personal.name}</h1>
              <h2 className="res-doc-title">{personal.role} · MERN Specialist</h2>
              
              <div className="res-doc-contacts">
                <span>✉ {personal.email}</span>
                <span>☎ {personal.phone}</span>
                <span>in <a href={personal.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/adityaprabhatgupta</a></span>
                <span>⌥ <a href={personal.github} target="_blank" rel="noreferrer">github.com/AdityaPrabhatGupta</a></span>
              </div>
            </header>

            <div className="res-doc-divider" />

            {/* Core Summary */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Professional Summary</h3>
              <p className="res-doc-text">{personal.tagline}</p>
            </section>

            {/* Education */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Education</h3>
              <div className="res-doc-edu-row">
                <div>
                  <strong>Bachelor of Technology in Computer Science & Engineering</strong>
                  <div className="res-sub-text">Specialization in Artificial Intelligence & Machine Learning (AI & ML)</div>
                </div>
                <div className="res-doc-date">Class of 2025</div>
              </div>
            </section>

            {/* Work Experience */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Professional Experience</h3>
              {experience.map((exp, idx) => (
                <div key={idx} className="res-doc-item">
                  <div className="res-doc-item-header">
                    <div>
                      <strong>{exp.role}</strong> — <span className="res-sub-company">{exp.company}</span>
                      <div className="res-sub-text">{exp.type}</div>
                    </div>
                    <div className="res-doc-date">{exp.date}</div>
                  </div>
                  <ul className="res-doc-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Featured Projects</h3>
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="res-doc-item res-doc-item--project">
                  <div className="res-doc-item-header">
                    <div>
                      <strong>{proj.name}</strong> 
                      <span className="res-doc-stack-list"> ({proj.stack.join(', ')})</span>
                    </div>
                    {proj.link && (
                      <div className="res-doc-date">
                        <a href={proj.link} target="_blank" rel="noreferrer">Live App ↗</a>
                      </div>
                    )}
                  </div>
                  <p className="res-doc-project-desc">{proj.desc}</p>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Skills Inventory</h3>
              <div className="res-doc-skills-grid">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.name} className="res-doc-skill-col">
                    <strong>{skillGroup.name}: </strong>
                    <span>{skillGroup.tags.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements & Certifications */}
            <section className="res-doc-section">
              <h3 className="res-doc-sec-title">Certifications & Awards</h3>
              <ul className="res-doc-bullets res-doc-bullets--certs">
                {certifications.map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.title}</strong> — <span>{c.org}</span>. <span className="res-doc-cert-desc">{c.desc}</span>
                    {c.link && (
                      <span className="res-doc-stack-list"> [<a href={c.link} target="_blank" rel="noreferrer">Verify</a>]</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
