// useTouchAnimations.js
// Purpose : Adds premium touch-triggered animations on mobile devices.
//   • Ripple effect — expanding accent ring from touch point
//   • Touch tilt   — subtle 3D perspective tilt on cards
//   Runs only on touch-capable devices. Cleans up on unmount.

import { useEffect } from 'react';

// ── Which elements get which effects ──
const RIPPLE_SELECTORS = [
  '.btn-fill', '.btn-outline', '.btn-submit',
  '.social-btn', '.social-icon',
  '.proj-btn', '.hero-tag', '.acc-tag',
  '.theme-toggle', '.nav-avatar',
  '.cert-link', '.cs-btn',
  '.res-mobile-btn',
];

const TILT_SELECTORS = [
  '.proj-card',
  '.cert-card',
  '.stat-box',
  '.exp-card',
  '.edu-card',
  '.skill-img-wrap',
];

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ── Ripple Effect ──
function createRipple(el, touch) {
  const rect = el.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  const size = Math.max(rect.width, rect.height) * 2.2;

  const ripple = document.createElement('span');
  ripple.className = 'touch-ripple';
  ripple.style.cssText = `
    position: absolute;
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
    z-index: 50;
  `;

  // Ensure parent can contain the ripple
  const pos = getComputedStyle(el).position;
  if (pos === 'static') el.style.position = 'relative';
  const prevOverflow = el.style.overflow;
  el.style.overflow = 'hidden';

  el.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
    el.style.overflow = prevOverflow;
  }, { once: true });
}

// ── Touch Tilt Effect ──
function handleTiltStart(el, touch) {
  const rect = el.getBoundingClientRect();
  const xPercent = (touch.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
  const yPercent = (touch.clientY - rect.top) / rect.height - 0.5;

  const rotateX = -yPercent * 6;  // degrees
  const rotateY = xPercent * 6;

  el.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
  el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
}

function handleTiltMove(el, touch) {
  const rect = el.getBoundingClientRect();
  const xPercent = (touch.clientX - rect.left) / rect.width - 0.5;
  const yPercent = (touch.clientY - rect.top) / rect.height - 0.5;

  const rotateX = -yPercent * 8;
  const rotateY = xPercent * 8;

  el.style.transition = 'transform 0.1s ease-out';
  el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
}

function handleTiltEnd(el) {
  el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
  el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
}

export default function useTouchAnimations() {
  useEffect(() => {
    if (!isTouchDevice()) return;

    // ── Ripple listeners ──
    const rippleHandler = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const target = e.target.closest(RIPPLE_SELECTORS.join(','));
      if (target) createRipple(target, touch);
    };

    // ── Tilt listeners ──
    const tiltMap = new WeakMap();

    const tiltStartHandler = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const target = e.target.closest(TILT_SELECTORS.join(','));
      if (target) {
        tiltMap.set(target, true);
        handleTiltStart(target, touch);
      }
    };

    const tiltMoveHandler = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const target = e.target.closest(TILT_SELECTORS.join(','));
      if (target && tiltMap.has(target)) {
        handleTiltMove(target, touch);
      }
    };

    const tiltEndHandler = (e) => {
      // Reset all tilted elements
      TILT_SELECTORS.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (tiltMap.has(el)) {
            handleTiltEnd(el);
            tiltMap.delete(el);
          }
        });
      });
    };

    document.addEventListener('touchstart', rippleHandler, { passive: true });
    document.addEventListener('touchstart', tiltStartHandler, { passive: true });
    document.addEventListener('touchmove', tiltMoveHandler, { passive: true });
    document.addEventListener('touchend', tiltEndHandler, { passive: true });
    document.addEventListener('touchcancel', tiltEndHandler, { passive: true });

    return () => {
      document.removeEventListener('touchstart', rippleHandler);
      document.removeEventListener('touchstart', tiltStartHandler);
      document.removeEventListener('touchmove', tiltMoveHandler);
      document.removeEventListener('touchend', tiltEndHandler);
      document.removeEventListener('touchcancel', tiltEndHandler);
    };
  }, []);
}
