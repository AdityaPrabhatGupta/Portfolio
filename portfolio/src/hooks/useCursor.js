// useCursor.js
// Purpose : Drives the custom dot + lagging-ring cursor.
//           Attaches mousemove listener, runs RAF loop
//           for the ring, cleans up on unmount.
import { useEffect } from 'react';

export default function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cur');
    const ring = document.getElementById('curRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const tick = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
