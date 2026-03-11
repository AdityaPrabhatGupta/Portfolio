// ═══════════════════════════════════════════════════════
// Ticker.jsx
// Purpose : Infinite scrolling skills marquee.
//           Items duplicated for a seamless loop.
//           Speed is accelerated on scroll by useScrollEffects.
// Edit    : tickerItems array in src/data/content.js
// ═══════════════════════════════════════════════════════
import { tickerItems } from '../data/content';
import './Ticker.css';

// Double the array so the CSS -50% translate loops seamlessly
const ITEMS = [...tickerItems, ...tickerItems];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {ITEMS.map((item, i) => (
          <div key={i} className="ticker-item">
            {item}
            <span className="ticker-dot">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
