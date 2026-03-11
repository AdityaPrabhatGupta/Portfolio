// ═══════════════════════════════════════════════════════
// Navbar.jsx
// Purpose : Fixed floating pill navigation bar.
//           Collapses to avatar + status chip on scroll down,
//           expands back to full nav on scroll up.
//           Avatar shows profile photo if set in content.js
// ═══════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import { personal } from '../data/content';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#home',     label: 'Home'     },
  { href: '#skills',   label: 'Skills'   },
  { href: '#projects', label: 'Projects' },
  { href: '#about',    label: 'About'    },
  { href: '#certs',    label: 'Awards'   },
];

const COLLAPSE_THRESHOLD = 80;

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > COLLAPSE_THRESHOLD && current > lastScrollY.current) setCollapsed(true);
      if (current < lastScrollY.current) setCollapsed(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="mainNav" className={collapsed ? 'navbar navbar--collapsed' : 'navbar'}>

      {/* Avatar — photo if available, initials fallback */}
      <div className="nav-avatar">
        {personal.profileImg
          ? <img src={personal.profileImg} alt={personal.name} className="nav-avatar-img" />
          : personal.navInitials
        }
      </div>

      {/* Status chip — only visible when collapsed */}
      <div className="nav-status">
        <span className="nav-status-dot" />
        Available to work
      </div>

      {/* Links */}
      <ul className="nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className={href === '#home' ? 'active' : ''}>{label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="nav-cta">Hire Me</a>
    </nav>
  );
}