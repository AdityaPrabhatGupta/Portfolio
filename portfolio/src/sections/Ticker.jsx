// Ticker.jsx
// Purpose : Infinite scrolling skills marquee.
//           Items duplicated for a seamless loop.
//           Speed is accelerated on scroll by useScrollEffects.

import { tickerItems } from '../data/content';
import './Ticker.css';

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
