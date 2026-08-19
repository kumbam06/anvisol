#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/web"
npm run build
# Publish the export at repo root for GitHub Pages (branch deploy).
cd "$ROOT"
# Remove previous generated routes without touching source or brand files.
rm -rf _next apps support privacy terms about 404 404.html index.html index.txt .nojekyll
rm -f styles.css script.js
cp -R web/out/. .
# Keep the canonical CNAME
printf 'anvilabs.com\n' > CNAME
touch .nojekyll
echo "Exported web/out to repo root."
