// ═══════════════════════════════════════════════════════
// Skills.jsx
// Purpose : 3-column grid of skill category cards.
// Edit    : skills array in src/data/content.js
// ═══════════════════════════════════════════════════════
import { skills } from '../data/content';
import './Skills.css';

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="s-label">What I Know</div>
      <h2 className="s-title">TECHNICAL<br /><em>SKILLS</em></h2>
      <p className="s-desc">
        Proficient in the full MERN stack with hands-on experience across
        frontend, backend, databases, and developer tooling.
      </p>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-tags">
              {skill.tags.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
