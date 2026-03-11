// ThemeToggle.jsx
// Purpose : Fixed bottom-centre dark / light toggle pill.
// Props   : theme ('dark' | 'light'), onToggle (fn)
import './ThemeToggle.css';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <div className="theme-wrap">
      <div
        className="theme-toggle"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <span className="theme-label">{theme === 'dark' ? '☾ Dark' : '☀ Light'}</span>
        <div className="toggle-track">
          <div className="toggle-thumb" />
        </div>
      </div>
    </div>
  );
}
