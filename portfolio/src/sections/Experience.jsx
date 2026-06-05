// Experience.jsx
// Purpose : Beautiful work experience timeline.
// Edit    : experience array in src/data/content.js

import { experience } from '../data/content';
import './Experience.css';

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="s-label">My Journey</div>
      <h2 className="s-title">WORK<br /><em>EXPERIENCE</em></h2>

      <div className="exp-timeline">
        <div className="timeline-line" />

        {experience.map((exp, idx) => (
          <div key={idx} className="exp-item">
            <div className="exp-dot" />
            <div className="exp-date-col">
              <span className="exp-date">{exp.date}</span>
            </div>
            
            <div className="exp-card">
              <div className="exp-card-header">
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-meta">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-separator">·</span>
                  <span className="exp-type">{exp.type}</span>
                </div>
              </div>

              <ul className="exp-bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="exp-bullet-item">{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
