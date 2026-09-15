/* Build the public/ directory for Vercel: the FULL app, with accounts enabled.
   (scripts/build-static.js builds docs/ for GitHub Pages, which has no server
   and therefore sets MB_NO_SERVER.) */
const fs = require("node:fs");
const path = require("node:path");
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const f of ["index.html", "manifest.json", "sw.js"]) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
for (const d of ["css", "js", "icons", "fonts"]) fs.cpSync(path.join(ROOT, d), path.join(OUT, d), { recursive: true });
fs.copyFileSync(path.join(OUT, "index.html"), path.join(OUT, "404.html"));
console.log("public/ built — full app with accounts enabled");
