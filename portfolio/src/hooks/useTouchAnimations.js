// useTouchAnimations.js
// Purpose : Adds premium interaction animations on ALL devices.
//   • Ripple effect — expanding accent ring from click / touch point
//   • Press class   — JS-driven '.tap-active' class on mousedown / touchstart
//   • Pointer tilt  — subtle 3D perspective tilt on cards following cursor / finger
//   Works on both desktop (mouse) and mobile (touch). Cleans up on unmount.

import { useEffect } from 'react';

// ── Selectors for each effect type ──

const RIPPLE_SELECTORS = [
  '.btn-fill', '.btn-outline', '.btn-submit',
  '.social-btn', '.social-icon',
  '.proj-btn', '.hero-tag', '.acc-tag',
  '.theme-toggle', '.nav-avatar',
  '.cert-link', '.cs-btn',
  '.res-mobile-btn',
];

const PRESS_SELECTORS = [
  '.btn-fill', '.btn-outline', '.btn-submit',
  '.social-btn', '.social-icon',
  '.proj-btn', '.hero-tag', '.acc-tag',
  '.theme-toggle', '.nav-avatar',
  '.cert-link', '.cs-btn',
  '.res-mobile-btn',
  '.proj-card', '.cert-card', '.stat-box',
  '.exp-card', '.edu-card',
  '.acc-header',
  '.skill-panel-badge',
  '.toggle-btn',
];

const TILT_SELECTORS = [
  '.proj-card',
  '.cert-card',
  '.stat-box',
  '.exp-card',
  '.edu-card',
  '.skill-img-wrap',
];

const RIPPLE_SEL = RIPPLE_SELECTORS.join(',');
const PRESS_SEL  = PRESS_SELECTORS.join(',');
const TILT_SEL   = TILT_SELECTORS.join(',');

// ── Ripple Effect ──
function createRipple(el, x, y) {
  const rect = el.getBoundingClientRect();
  const localX = x - rect.left;
  const localY = y - rect.top;
  const size = Math.max(rect.width, rect.height) * 2.5;

  const ripple = document.createElement('span');
  ripple.className = 'touch-ripple';
  ripple.style.cssText = `
    position: absolute;
    left: ${localX - size / 2}px;
    top: ${localY - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
    z-index: 50;
    border-radius: 50%;
  `;

  // Ensure parent is a positioning context
  const computed = getComputedStyle(el);
  if (computed.position === 'static') {
    el.style.position = 'relative';
  }
  el.style.overflow = 'hidden';

  el.appendChild(ripple);

  // Force reflow so the animation triggers immediately
  ripple.offsetWidth; // eslint-disable-line no-unused-expressions

  // Self-cleanup
  const cleanup = () => { if (ripple.parentNode) ripple.remove(); };
  ripple.addEventListener('animationend', cleanup, { once: true });
  setTimeout(cleanup, 700); // fallback
}

// ── Tilt Effect ──
function applyTilt(el, clientX, clientY, strength = 6) {
  const rect = el.getBoundingClientRect();
  const xPercent = (clientX - rect.left) / rect.width - 0.5;
  const yPercent = (clientY - rect.top) / rect.height - 0.5;
  const rotateX = -yPercent * strength;
  const rotateY = xPercent * strength;

  el.style.transition = 'transform 0.12s ease-out';
  el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
}

function resetTilt(el) {
  el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  el.style.transform = '';
}

export default function useTouchAnimations() {
  useEffect(() => {
    // Suppress iOS blue tap highlight
    document.documentElement.style.webkitTapHighlightColor = 'transparent';

    // Track last touch event time to prevent simulated mouse events
    let lastTouchTime = 0;
    const updateTouchTime = () => { lastTouchTime = Date.now(); };

    // Track active elements
    const activePressTargets = new Set();
    const activeTiltTargets  = new Set();

    // ═══════════════════════════════════════
    //  SHARED LOGIC (used by both pointer types)
    // ═══════════════════════════════════════

    function handlePointerDown(target, clientX, clientY) {
      if (!target) return;
      let curr = target;
      
      // Climb up the DOM tree from target to body
      while (curr && curr !== document && curr !== document.documentElement) {
        if (curr.matches) {
          // Ripple
          if (curr.matches(RIPPLE_SEL)) {
            createRipple(curr, clientX, clientY);
          }

          // Press class
          if (curr.matches(PRESS_SEL)) {
            curr.classList.add('tap-active');
            activePressTargets.add(curr);
          }

          // Tilt
          if (curr.matches(TILT_SEL)) {
            applyTilt(curr, clientX, clientY, 5);
            activeTiltTargets.add(curr);
          }
        }
        curr = curr.parentNode;
      }
    }

    function handlePointerMove(clientX, clientY) {
      activeTiltTargets.forEach(el => {
        applyTilt(el, clientX, clientY, 8);
      });
    }

    function handlePointerUp() {
      activePressTargets.forEach(el => el.classList.remove('tap-active'));
      activePressTargets.clear();

      activeTiltTargets.forEach(el => resetTilt(el));
      activeTiltTargets.clear();
    }

    // ═══════════════════════════════════════
    //  TOUCH HANDLERS (mobile)
    // ═══════════════════════════════════════

    const onTouchStart = (e) => {
      updateTouchTime();
      const t = e.touches[0];
      if (t) handlePointerDown(e.target, t.clientX, t.clientY);
    };

    const onTouchMove = (e) => {
      updateTouchTime();
      const t = e.touches[0];
      if (t) handlePointerMove(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      updateTouchTime();
      handlePointerUp();
    };

    // ═══════════════════════════════════════
    //  MOUSE HANDLERS (desktop)
    // ═══════════════════════════════════════

    const onMouseDown = (e) => {
      if (Date.now() - lastTouchTime < 1000) return; // ignore touch-emulated event
      handlePointerDown(e.target, e.clientX, e.clientY);
    };

    const onMouseMove = (e) => {
      if (Date.now() - lastTouchTime < 1000) return;
      // Only update tilt while mouse is pressed (dragging)
      if (activeTiltTargets.size > 0) {
        handlePointerMove(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      if (Date.now() - lastTouchTime < 1000) return;
      handlePointerUp();
    };

    // Also do a lighter hover-tilt for desktop (no click needed)
    const hoverTiltMap = new WeakMap();

    const onMouseEnterDelegate = (e) => {
      if (Date.now() - lastTouchTime < 1000) return;
      const el = e.target.closest ? e.target.closest(TILT_SEL) : null;
      if (!el || hoverTiltMap.has(el)) return;

      const moveHandler = (ev) => {
        if (Date.now() - lastTouchTime < 1000) return;
        applyTilt(el, ev.clientX, ev.clientY, 4);
      };
      const leaveHandler = () => {
        resetTilt(el);
        el.removeEventListener('mousemove', moveHandler);
        el.removeEventListener('mouseleave', leaveHandler);
        hoverTiltMap.delete(el);
      };

      el.addEventListener('mousemove', moveHandler);
      el.addEventListener('mouseleave', leaveHandler);
      hoverTiltMap.set(el, { moveHandler, leaveHandler });
    };

    // ═══════════════════════════════════════
    //  ATTACH LISTENERS
    // ═══════════════════════════════════════

    // Touch events
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Mouse events
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseEnterDelegate);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseEnterDelegate);
    };
  }, []);
}
