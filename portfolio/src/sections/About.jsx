// About.jsx
// Purpose : Two-column about section with bio, animated
//           stat counters, social links, and education card.
// Edit    : about and personal objects in src/data/content.js
import { about, personal } from '../data/content';
import useCounter from '../hooks/useCounter';
import './About.css';

// Sub-component: one animated stat box
function StatBox({ count, suffix, label }) {
  const { ref, display } = useCounter(count, suffix);
  return (
    <div className="stat-box">
      <div className="stat-num" ref={ref}>{display}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">

        {/* ── Left: avatar placeholder ── */}
        <div className="reveal-left">
          <div className="about-photo-wrap">
            {personal.profileImg
              ? <img src={personal.profileImg} alt={personal.name} className="about-photo" />
              : (
                <div className="about-photo-placeholder">
                  <span className="about-name-glyph">
                    ADITYA<br />PRABHAT<br />GUPTA
                  </span>
                </div>
              )
            }
          </div>
        </div>

        {/* ── Right: bio, stats, education ── */}
        <div className="reveal-right">
          <div className="s-label">About Me</div>
          <h2 className="s-title">ABOUT<br /><em>ME</em></h2>
          <div className="about-full-name">{personal.name.toUpperCase()}</div>

          {about.bio.map((para, i) => (
            <p key={i} className="about-bio">{para}</p>
          ))}

          {/* Socials */}
          <div className="about-socials">
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="social-btn">LinkedIn ↗</a>
            <a href={personal.github}   target="_blank" rel="noreferrer" className="social-btn">GitHub ↗</a>
            <a href={`mailto:${personal.email}`}        className="social-btn">Email ↗</a>
          </div>

          {/* Animated stats */}
          <div className="about-stats">
            {about.stats.map((s) => (
              <StatBox key={s.label} count={s.count} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* Education card */}
          <div className="edu-card">
            <div className="edu-degree">{about.education.degree}</div>
            <div className="edu-school">{about.education.school}</div>
            <div className="edu-year">{about.education.year}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
