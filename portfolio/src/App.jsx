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

import { useState } from 'react';
import './styles/globals.css';

// ── Global hooks ──
import useCursor          from './hooks/useCursor';
import useTheme           from './hooks/useTheme';
import useReveal          from './hooks/useReveal';
import useScrollEffects   from './hooks/useScrollEffects';
import useTouchAnimations from './hooks/useTouchAnimations';

// ── Layout components ──
import Cursor      from './components/Cursor';
import Navbar      from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Footer      from './components/Footer';
import ResumeModal from './components/ResumeModal';

// ── Page sections (top → bottom) ──
import Hero           from './sections/Hero';
import Ticker         from './sections/Ticker';
import Skills         from './sections/Skills';
import Experience     from './sections/Experience';
import Projects       from './sections/Projects';
import About          from './sections/About';
import Certifications from './sections/Certifications';
import Contact        from './sections/Contact';

export default function App() {
  const { theme, toggle } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);

  // Global side-effects — called once on mount
  useCursor();
  useReveal();
  useScrollEffects();
  useTouchAnimations();

  return (
    <>
      {/* Custom cursor elements */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Ticker />
        <Skills />
        <Experience />
        <Projects />
        <About />
        <Certifications />
        <Contact />
      </main>

      {/* Site footer */}
      <Footer />

      {/* Fixed theme toggle (bottom-center) */}
      <ThemeToggle theme={theme} onToggle={toggle} />

      {/* Printable Resume Viewer Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}