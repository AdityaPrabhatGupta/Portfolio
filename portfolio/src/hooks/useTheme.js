// ═══════════════════════════════════════════════════════
// useTheme.js
// Purpose : Manages dark / light theme.
//           Reads from localStorage on first load,
//           writes back on every toggle.
//           Sets data-theme attribute on <html>.
// Usage   : const { theme, toggle } = useTheme();
// ═══════════════════════════════════════════════════════
import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('apg-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('apg-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}
