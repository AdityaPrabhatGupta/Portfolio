// useScrollEffects.js
// Purpose : Scroll-driven side effects:
//           • Hero parallax (title + right column)
//           • Hero eyebrow fade-out
//           • Nav box-shadow elevation
//           • Active nav-link highlight
//           • Ticker animation speed acceleration

import { useEffect } from 'react';

export default function useScrollEffects() {
  useEffect(() => {
    const nav        = document.getElementById('mainNav');
    const heroTitle  = document.querySelector('.hero-title');
    const heroRight  = document.querySelector('.hero-right');
    const heroEyebrow= document.querySelector('.hero-eyebrow');

    const onScroll = () => {
      const sy = window.scrollY;

      // ── Parallax ──
      if (heroTitle)  heroTitle.style.transform  = `translateY(${sy * 0.25}px)`;
      if (heroRight)  heroRight.style.transform  = `translateY(${sy * 0.1}px)`;
      if (heroEyebrow) heroEyebrow.style.opacity = String(Math.max(0, 1 - sy / 250));

      // ── Nav elevation ──
      if (nav) {
        nav.style.boxShadow = sy > 60
          ? '0 8px 40px rgba(0,0,0,0.45)'
          : '0 8px 32px rgba(0,0,0,0.25)';
      }



      // ── Ticker speed ──
      const ticker = document.querySelector('.ticker-track');
      if (ticker) ticker.style.animationDuration = Math.max(8, 22 - sy * 0.015) + 's';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
