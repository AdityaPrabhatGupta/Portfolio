// Footer.jsx
// Purpose : Site footer — logo, copyright, social icons.
import { personal } from '../data/content';
import './Footer.css';

const SOCIALS = [
  { href: personal.linkedin, label: 'in',  title: 'LinkedIn' },
  { href: personal.github,   label: '⌥',  title: 'GitHub'   },
  { href: `mailto:${personal.email}`, label: '✉', title: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">ADITYA</div>
      <p className="footer-copy">© 2026 {personal.name} · Full Stack Developer</p>
      <div className="footer-socials">
        {SOCIALS.map(({ href, label, title }) => (
          <a
            key={title}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="social-icon"
            title={title}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
