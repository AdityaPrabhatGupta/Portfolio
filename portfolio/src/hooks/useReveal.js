// useReveal.js
// Purpose : Adds scroll-triggered reveal classes to
//           matched DOM elements using IntersectionObserver.
//           Runs after first render; cleans up observer on unmount.
import { useEffect } from 'react';

// [ CSS selector, animation class to add ]
const REVEAL_MAP = [
  ['.skill-card',  'reveal'],
  ['.proj-card',   'reveal-scale'],
  ['.cert-card',   'reveal'],
  ['.exp-item',    'reveal'],
  ['.stat-box',    'reveal'],
  ['.s-label',     'reveal'],
  ['.s-desc',      'reveal'],
  ['.s-title',     'reveal'],
];

export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    REVEAL_MAP.forEach(([sel, cls]) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add(cls);
        el.style.transitionDelay = (i * 0.08) + 's';
        observer.observe(el);
      });
    });

    // Directional reveals (already have their class in JSX)
    document.querySelectorAll('.reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
