// Certifications.jsx
// Purpose : 3-column grid of certifications and awards.
// Edit    : certifications array in src/data/content.js
import { certifications } from '../data/content';
import './Certifications.css';

export default function Certifications() {
  return (
    <section className="certs" id="certs">
      <div className="s-label">Achievements</div>
      <h2 className="s-title">CERTS &amp;<br /><em>AWARDS</em></h2>

      <div className="certs-grid">
        {certifications.map((cert) => (
          <div key={cert.title} className="cert-card">
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-title">{cert.title}</div>
            <div className="cert-org">{cert.org}</div>
            <p className="cert-desc">{cert.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
