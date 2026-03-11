// Cursor.jsx
// Purpose : Renders the custom cursor elements (dot + ring).
//           Animation is handled by useCursor hook in App.jsx.

import './Cursor.css';

export default function Cursor() {
  return (
    <>
      <div className="cursor-dot"  id="cur" />
      <div className="cursor-ring" id="curRing" />
    </>
  );
}
