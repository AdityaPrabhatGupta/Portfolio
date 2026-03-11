// ═══════════════════════════════════════════════════════
// Hero.jsx
// Purpose : Full-viewport hero — title, tagline, CTA buttons,
//           profile frame with hover animation.
// Edit    : All text content in src/data/content.js
// ═══════════════════════════════════════════════════════
import { personal, heroTags } from '../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* ── LEFT COLUMN ── */}
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="dot-green" />
          {personal.status}
        </div>

        <h1 className="hero-title">
          FULL<br />STACK<br />
          <span className="accent-word">DEVELOPER</span>
        </h1>

        <p className="hero-sub">{personal.tagline}</p>

        <div className="hero-tags">
          {heroTags.map((tag) => (
            <span key={tag} className="hero-tag">{tag}</span>
          ))}
        </div>

        <div className="hero-actions">
          <a href="#projects" className="btn-fill">View Projects</a>
          <a href={`mailto:${personal.email}`} className="btn-outline">Hire Me ↗</a>
          <a href={personal.resume} download className="btn-outline">Resume ↓</a>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="hero-right">
        <div className="hero-frame">

          {/* Hover overlay */}
          <div className="hero-photo-overlay">
            <span className="overlay-text">Aditya Prabhat Gupta</span>
          </div>

          {personal.profileImg
            ? <img src={personal.profileImg} alt={personal.name} className="hero-photo" />
            : (
              <div className="hero-photo-placeholder">
                <span className="hero-initials">{personal.initials}</span>
              </div>
            )
          }

        </div>
      </div>

    </section>
  );
}
