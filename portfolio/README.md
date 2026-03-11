# Aditya Prabhat Gupta — Portfolio (React + Vite)

A clean, modular React conversion of the original HTML portfolio.  
Every file has **one clear responsibility** so changes are quick and isolated.

---

## 🚀 Getting Started

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

---

## 📁 Folder Structure

```
portfolio/
├── index.html                  ← HTML shell (title, meta)
├── vite.config.js              ← Vite config
├── package.json
└── src/
    ├── main.jsx                ← React entry point
    ├── App.jsx                 ← Root: hooks + layout composition
    │
    ├── data/
    │   └── content.js          ★ EDIT THIS to update all site content
    │
    ├── styles/
    │   └── globals.css         ← CSS variables, resets, keyframes, utilities
    │
    ├── hooks/
    │   ├── useCursor.js        ← Custom dot + lagging-ring cursor
    │   ├── useTheme.js         ← Dark/light toggle + localStorage
    │   ├── useReveal.js        ← Scroll-triggered IntersectionObserver reveals
    │   ├── useScrollEffects.js ← Parallax, active nav, ticker speed
    │   └── useCounter.js       ← Animated number counter on viewport entry
    │
    ├── components/             ← Reusable UI pieces
    │   ├── Cursor.jsx / .css
    │   ├── Navbar.jsx / .css
    │   ├── ThemeToggle.jsx / .css
    │   └── Footer.jsx / .css
    │
    └── sections/               ← Full-page sections (top → bottom)
        ├── Hero.jsx / .css
        ├── Ticker.jsx / .css
        ├── Skills.jsx / .css
        ├── Experience.jsx / .css
        ├── Projects.jsx / .css
        ├── About.jsx / .css
        ├── Certifications.jsx / .css
        └── Contact.jsx / .css
```

---

## ✏️ How to Make Changes

| What you want to change | Where to go |
|---|---|
| **Any text, links, stats, skills, projects** | `src/data/content.js` |
| **Colors / fonts / theme** | `src/styles/globals.css` (`:root` and `[data-theme="light"]`) |
| **Add a new section** | Create `src/sections/NewSection.jsx` + `.css`, import into `App.jsx` |
| **Navigation links** | `src/components/Navbar.jsx` — `NAV_LINKS` array |
| **Profile photo** | Set `personal.profileImg` in `content.js` to your image path |
| **Contact form backend** | `src/sections/Contact.jsx` — `handleSubmit` function |
| **Cursor style** | `src/components/Cursor.css` |
| **Scroll/parallax behavior** | `src/hooks/useScrollEffects.js` |

---

## 🎨 Design System

- **Display font**: Bebas Neue (titles, numbers)
- **Body font**: DM Sans (readable, modern, not overused)
- **Accent font**: Cormorant Garamond italic (decorative "Hi")
- **Accent color**: `#c8ff00` (electric lime)
- **Theme**: Dark default, warm light variant
- **Animations**: CSS keyframes + IntersectionObserver reveals + RAF cursor

---

## 📦 Tech Stack

- **React 18** + **Vite 5** (fast HMR, zero-config)
- **No external dependencies** beyond React itself
- CSS Modules-style per-component `.css` files (no styled-components / Tailwind)
