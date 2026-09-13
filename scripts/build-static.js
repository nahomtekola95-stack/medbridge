/* Build the reference-only static bundle (no server, no accounts).
   Everything except accounts/practice notes works: drugs, cases, wards,
   calculators, country profiles, offline PWA. */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, process.env.MB_OUT || "docs");  // GitHub Pages serves main branch /docs
const FILES = ["index.html", "manifest.json", "sw.js", "README.md"];
const DIRS = ["css", "js", "icons"];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
for (const d of DIRS) fs.cpSync(path.join(ROOT, d), path.join(OUT, d), { recursive: true });

// flag that switches the app to reference-only mode
fs.writeFileSync(path.join(OUT, "js", "config.js"),
  "/* Static build: no server, so accounts and practice notes are disabled. */\nwindow.MB_NO_SERVER = true;\n");

let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
html = html.replace('<script src="js/drugs-data.js"></script>', '<script src="js/config.js"></script>\n  <script src="js/drugs-data.js"></script>');
fs.writeFileSync(path.join(OUT, "index.html"), html);

// the service worker must cache the flag too, and never look for /api
let sw = fs.readFileSync(path.join(OUT, "sw.js"), "utf8");
sw = sw.replace('"./js/books.js",', '"./js/config.js", "./js/books.js",');
fs.writeFileSync(path.join(OUT, "sw.js"), sw);

// GitHub Pages: don't run the output through Jekyll
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
// SPA fallback for hosts that support it
fs.copyFileSync(path.join(OUT, "index.html"), path.join(OUT, "404.html"));

const size = (p) => fs.readdirSync(p, { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory() ? size(path.join(p, e.name)) : fs.statSync(path.join(p, e.name)).size), 0);
console.log(`Static bundle built at ${path.relative(ROOT, OUT)}/ — ${(size(OUT) / 1024).toFixed(0)} KB`);
console.log("Reference-only: drugs, cases, wards, calculators, profiles, offline. No accounts or practice notes.");
