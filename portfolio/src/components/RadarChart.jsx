// RadarChart.jsx
// Purpose : Sleek, interactive SVG-based Radar Chart visualizing skill proficiencies.
//           Pure React with zero dependencies. Highlights on hover.

import { skills } from '../data/content';

export default function RadarChart({ activeIdx, onHoverActive }) {
  const cx = 230;
  const cy = 180;
  const r = 110; // Max radius
  const totalSides = skills.length; // 5

  // Generate coordinates for any percentage level
  const getCoordinates = (value, index) => {
    const pct = value / 100;
    const angle = (index * 2 * Math.PI) / totalSides - Math.PI / 2; // Start from top
    const x = cx + r * pct * Math.cos(angle);
    const y = cy + r * pct * Math.sin(angle);
    return { x, y };
  };

  // Concentric helper grids (25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];
  const gridPolygons = gridLevels.map((lvl) => {
    const points = skills.map((_, idx) => {
      const { x, y } = getCoordinates(lvl, idx);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Main Skill polygon points
  const skillPoints = skills.map((s, idx) => {
    const { x, y } = getCoordinates(s.score, idx);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="radar-chart-container" style={{ position: 'relative', width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      
      {/* SVG Container */}
      <svg
        viewBox="0 0 460 360"
        className="radar-svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        
        {/* Glow Filters */}
        <defs>
          <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Concentric grid lines */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.65"
          />
        ))}

        {/* 2. Axis lines */}
        {skills.map((_, idx) => {
          const outer = getCoordinates(100, idx);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* 3. Skill area polygon (Neon Lime) */}
        <polygon
          points={skillPoints}
          fill="rgba(200, 255, 0, 0.08)"
          stroke="var(--accent)"
          strokeWidth="2.5"
          filter="url(#radar-glow)"
          style={{ transition: 'all 0.45s ease' }}
        />

        {/* 4. Active item sector outline (Dynamic highlight) */}
        {activeIdx !== -1 && activeIdx < totalSides && (
          <polygon
            points={`${cx},${cy} ${getCoordinates(100, activeIdx).x},${getCoordinates(100, activeIdx).y}`}
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.35"
          />
        )}

        {/* 5. Vertex points & category labels */}
        {skills.map((s, idx) => {
          const valCoord = getCoordinates(s.score, idx);
          const lblCoord = getCoordinates(125, idx); // place label slightly further out
          const isActive = activeIdx === idx;

          return (
            <g key={s.name} className="radar-vertex">
              {/* Vertex Circle */}
              <circle
                cx={valCoord.x}
                cy={valCoord.y}
                r={isActive ? 7 : 5}
                fill={isActive ? 'var(--bg)' : 'var(--accent)'}
                stroke="var(--accent)"
                strokeWidth="2"
                style={{ transition: 'all 0.25s' }}
              />

              {/* Category Label */}
              <text
                x={lblCoord.x}
                y={lblCoord.y + (idx === 0 ? -4 : idx === 3 || idx === 4 ? 6 : 4)} // vertical offset tweaks
                textAnchor={idx === 0 ? 'middle' : idx === 1 || idx === 2 ? 'start' : 'end'}
                fill={isActive ? 'var(--text)' : 'var(--muted)'}
                fontSize={isActive ? '12px' : '10.5px'}
                fontWeight={isActive ? '700' : '500'}
                fontFamily="inherit"
                letterSpacing="0.05em"
                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                onClick={() => onHoverActive(idx)}
                onMouseEnter={() => onHoverActive(idx)}
              >
                {s.name.toUpperCase()}
              </text>

              {/* Invisible larger hover zone circle to easily hover mouse over vertices */}
              <circle
                cx={valCoord.x}
                cy={valCoord.y}
                r="18"
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => onHoverActive(idx)}
                onClick={() => onHoverActive(idx)}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Center Badge representing score */}
      {activeIdx !== -1 && skills[activeIdx] && (
        <div
          className="radar-score-badge"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(200, 255, 0, 0.15)',
            pointerEvents: 'none',
            animation: 'fadeUp 0.25s ease'
          }}
        >
          <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>{skills[activeIdx].icon}</span>
          <span style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>
            {skills[activeIdx].score}%
          </span>
        </div>
      )}
    </div>
  );
}
