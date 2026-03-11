// ═══════════════════════════════════════════════════════
// useCounter.js
// Purpose : Animates a number from 0 → target with an
//           ease-out cubic curve when element enters viewport.
// Usage   :
//   const { ref, display } = useCounter(95, '%');
//   return <div ref={ref}>{display}</div>;
// ═══════════════════════════════════════════════════════
import { useRef, useState, useEffect } from 'react';

export default function useCounter(target, suffix = '', duration = 1400) {
  const ref     = useRef(null);
  const [display, setDisplay] = useState('0' + suffix);
  const fired   = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true;
        let start = null;
        const tick = (ts) => {
          if (!start) start = ts;
          const pct  = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);          // cubic ease-out
          setDisplay(Math.round(ease * target) + suffix);
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.5 });

    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, duration]);

  return { ref, display };
}
