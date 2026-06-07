// ResumeModal.jsx
// Purpose : High-fidelity overlay showing the candidate's actual PDF resume.
//           Includes fallback preview cards and quick-action buttons for mobile responsiveness.

import { useState, useEffect } from 'react';
import { personal } from '../data/content';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check window size for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    const iframe = document.getElementById('resume-pdf-viewer');
    if (iframe) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (e) {
        console.error('Failed to print iframe directly:', e);
        window.open(personal.resume, '_blank');
      }
    } else {
      window.open(personal.resume, '_blank');
    }
  };

  return (
    <div className="res-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="res-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Print & Close Controls */}
        <div className="res-modal-controls">
          {!isMobile && (
            <button className="res-btn-print" onClick={handlePrint}>
              Print / Save PDF 🖨
            </button>
          )}
          <a href={personal.resume} download className="res-btn-download">
            Download File ↓
          </a>
          <button className="res-btn-close" onClick={onClose} aria-label="Close resume">
            Close &times;
          </button>
        </div>

        {/* Scrollable Document Container */}
        <div className="res-document-container">
          {isMobile ? (
            <div className="res-mobile-preview-card">
              <div className="res-mobile-icon-wrapper">
                <svg className="res-pdf-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="res-mobile-title">{personal.name}</h3>
              <p className="res-mobile-subtitle">{personal.role}</p>
              <span className="res-mobile-badge">PDF Resume / CV</span>
              
              <div className="res-mobile-actions">
                <a href={personal.resume} target="_blank" rel="noreferrer" className="res-mobile-btn res-mobile-btn-primary">
                  Open PDF in New Tab ↗
                </a>
                <a href={personal.resume} download className="res-mobile-btn res-mobile-btn-secondary">
                  Download PDF ↓
                </a>
              </div>

              <div className="res-mobile-contact-section">
                <h4>Quick Contacts</h4>
                <div className="res-mobile-contacts">
                  <a href={`mailto:${personal.email}`} className="res-mobile-contact-link">
                    ✉ {personal.email}
                  </a>
                  <a href={`tel:${personal.phone}`} className="res-mobile-contact-link">
                    ☎ {personal.phone}
                  </a>
                  <a href={personal.linkedin} target="_blank" rel="noreferrer" className="res-mobile-contact-link">
                    in LinkedIn Profile ↗
                  </a>
                  <a href={personal.github} target="_blank" rel="noreferrer" className="res-mobile-contact-link">
                    ⌥ GitHub Profile ↗
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={`${personal.resume}#toolbar=0&navpanes=0`}
              title="Aditya Prabhat Gupta Resume"
              className="res-pdf-viewer"
              id="resume-pdf-viewer"
            />
          )}
        </div>

      </div>
    </div>
  );
}

