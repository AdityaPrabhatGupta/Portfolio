// App.jsx  —  Root component
//
// Responsibility:
//   • Mount all global hooks (cursor, scroll effects, reveal)
//   • Manage theme state via useTheme
//   • Compose page layout from section + component imports
//
// To add a new section:
//   1. Create it in src/sections/
//   2. Import and drop it inside <main> below

import './styles/globals.css';

// ── Global hooks ──
import useCursor       from './hooks/useCursor';
import useTheme        from './hooks/useTheme';
import useReveal       from './hooks/useReveal';
import useScrollEffects from './hooks/useScrollEffects';

// ── Layout components ──
import Cursor      from './components/Cursor';
import Navbar      from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Footer      from './components/Footer';

// ── Page sections (top → bottom) ──
import Hero           from './sections/Hero';
import Ticker         from './sections/Ticker';
import Skills         from './sections/Skills';
import Projects       from './sections/Projects';
import About          from './sections/About';
import Certifications from './sections/Certifications';
import Contact        from './sections/Contact';

export default function App() {
  const { theme, toggle } = useTheme();

  // Global side-effects — called once on mount
  useCursor();
  useReveal();
  useScrollEffects();

  return (
    <>
      {/* Custom cursor elements */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero />
        <Ticker />
        <Skills />
        <Projects />
        <About />
        <Certifications />
        <Contact />
      </main>

      {/* Site footer */}
      <Footer />

      {/* Fixed theme toggle (bottom-center) */}
      <ThemeToggle theme={theme} onToggle={toggle} />
    </>
  );
}