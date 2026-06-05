// CaseStudyModal.jsx
// Purpose : Glassmorphic slide-up modal showcasing detailed project case study:
//           architecture, core features, challenges & solutions, links.

import { useEffect } from 'react';
import './CaseStudyModal.css';

export default function CaseStudyModal({ project, onClose }) {
  // Prevent body scrolling when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const cs = project.caseStudy;
  const liveHref = project.link;
  const githubHref = project.github;

  return (
    <div className="cs-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cs-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cs-modal-header">
          <div>
            <span className="cs-modal-badge">{project.tag}</span>
            <h2 className="cs-modal-title">{project.name}</h2>
          </div>
          <button className="cs-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="cs-modal-body">
          <div className="cs-modal-grid">
            
            {/* Left Column — Meta & Stack */}
            <div className="cs-col-left">
              <div className="cs-section">
                <h4 className="cs-section-title">System Architecture</h4>
                <p className="cs-text">{cs ? cs.architecture : 'Custom Web Architecture'}</p>
              </div>

              {cs && cs.database && (
                <div className="cs-section">
                  <h4 className="cs-section-title">Database & Persistence</h4>
                  <p className="cs-text">{cs.database}</p>
                </div>
              )}

              <div className="cs-section">
                <h4 className="cs-section-title">Technologies Used</h4>
                <div className="cs-stack-wrap">
                  {project.stack.map((s) => (
                    <span key={s} className="cs-stack-pill">{s}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="cs-actions">
                {liveHref && (
                  <a href={liveHref} target="_blank" rel="noreferrer" className="cs-btn cs-btn--accent">
                    Launch App ↗
                  </a>
                )}
                {githubHref && (
                  <a href={githubHref} target="_blank" rel="noreferrer" className="cs-btn cs-btn--ghost">
                    Source Code ⌥
                  </a>
                )}
              </div>
            </div>

            {/* Right Column — Features & Challenges */}
            <div className="cs-col-right">
              {cs && cs.features && (
                <div className="cs-section">
                  <h4 className="cs-section-title">Key Features</h4>
                  <ul className="cs-feature-list">
                    {cs.features.map((feat, idx) => (
                      <li key={idx} className="cs-feature-item">
                        <span className="cs-check">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cs && cs.challenges && (
                <div className="cs-section">
                  <h4 className="cs-section-title">Engineering Challenges & Solutions</h4>
                  <div className="cs-challenges-list">
                    {cs.challenges.map((c, idx) => (
                      <div key={idx} className="cs-challenge-box">
                        <div className="cs-challenge-problem">
                          <span className="cs-tag-problem">Challenge:</span> {c.problem}
                        </div>
                        <div className="cs-challenge-solution">
                          <span className="cs-tag-solution">Solution:</span> {c.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
