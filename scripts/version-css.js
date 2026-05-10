#!/usr/bin/env node
// Cache-busts local CSS <link> hrefs by appending ?v=<content-hash>.
// Walks every .html file under the project root, hashes each referenced
// local .css file, and rewrites the href so browsers re-fetch only files
// whose contents actually changed. External (http/https/protocol-relative)
// URLs are left alone. Safe to run repeatedly — existing ?v=... values
// are replaced.
//
// Usage:  node scripts/version-css.js

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "scripts"]);

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const hashCache = new Map();
function hashFile(absPath) {
  const cached = hashCache.get(absPath);
  if (cached) return cached;
  const buf = fs.readFileSync(absPath);
  const hash = crypto.createHash("md5").update(buf).digest("hex").slice(0, 8);
  hashCache.set(absPath, hash);
  return hash;
}

// Match href="...css" or href="...css?v=old" inside any tag.
// Group 1: the .css path (no query). Group 2: optional pre-existing query.
const HREF_RE = /href="([^"#?]+\.css)(\?[^"]*)?"/g;

const htmlFiles = walkHtml(ROOT);
let totalUpdates = 0;
let filesChanged = 0;

for (const htmlPath of htmlFiles) {
  const original = fs.readFileSync(htmlPath, "utf8");
  const htmlDir = path.dirname(htmlPath);
  let fileUpdates = 0;

  const updated = original.replace(HREF_RE, (match, href) => {
    if (/^(?:https?:)?\/\//i.test(href)) return match;

    const cssAbs = path.resolve(htmlDir, href);
    if (!fs.existsSync(cssAbs)) {
      console.warn(
        `  [skip] missing file in ${path.relative(ROOT, htmlPath)}: ${href}`
      );
      return match;
    }

    fileUpdates++;
    return `href="${href}?v=${hashFile(cssAbs)}"`;
  });

  if (updated !== original) {
    fs.writeFileSync(htmlPath, updated, "utf8");
    totalUpdates += fileUpdates;
    filesChanged++;
    console.log(
      `  updated ${fileUpdates} link(s) in ${path.relative(ROOT, htmlPath)}`
    );
  }
}

console.log(
  `\nDone. Versioned ${totalUpdates} CSS link(s) across ${filesChanged}/${htmlFiles.length} HTML file(s).`
);
