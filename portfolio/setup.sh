#!/bin/bash
# ═══════════════════════════════════════════════════
# setup.sh  —  Run this ONCE to create a working
#              Vite + React project with our files.
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
#   cd portfolio-app
#   npm run dev
# ═══════════════════════════════════════════════════

set -e

echo "→ Creating fresh Vite + React scaffold..."
npm create vite@latest portfolio-app -- --template react

echo "→ Copying portfolio source files..."
cp -r src/   portfolio-app/src/
cp index.html portfolio-app/index.html

echo "→ Removing Vite default files that conflict..."
rm -f portfolio-app/src/App.css
rm -f portfolio-app/src/index.css
rm -f portfolio-app/public/vite.svg
rm -f portfolio-app/src/assets/react.svg

echo "→ Installing dependencies..."
cd portfolio-app
npm install

echo ""
echo "✅ Done! Now run:"
echo "   cd portfolio-app"
echo "   npm run dev"
