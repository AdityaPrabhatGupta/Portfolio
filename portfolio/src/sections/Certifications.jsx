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
        {certifications.map((cert, i) => (
          <div key={cert.title} className="cert-card" style={{ '--card-idx': i }}>
            <div className="cert-card-header">
              <div className="cert-icon-container">
                <span className="cert-icon" role="img" aria-label="Icon">{cert.icon}</span>
              </div>
              <span className="cert-badge">{cert.org.includes('GDGoC') || cert.org.includes('Winner') || cert.org.includes('RIT') ? 'Award' : 'Certificate'}</span>
            </div>
            <h3 className="cert-card-title">{cert.title}</h3>
            <div className="cert-org">{cert.org}</div>
            <div className="cert-divider" />
            <p className="cert-desc">{cert.desc}</p>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                Verify Credential ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
