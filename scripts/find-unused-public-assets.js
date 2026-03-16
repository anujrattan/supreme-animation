/**
 * Scan /public for assets that are not referenced anywhere in the codebase.
 *
 * For each file under public/, we:
 * - derive its URL path (e.g. public/foo/bar.png -> /foo/bar.png)
 * - search the repo (excluding public/) for that URL string
 * - if not found, print it as a candidate unused asset
 *
 * NOTE: This is conservative and only checks for literal string usage.
 */

const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function isBinaryCandidate(file) {
  // Restrict to common asset types (images, video, audio, fonts, misc)
  const lower = file.toLowerCase();
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".svg") ||
    lower.endsWith(".mp4") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".avi") ||
    lower.endsWith(".mp3") ||
    lower.endsWith(".wav") ||
    lower.endsWith(".woff") ||
    lower.endsWith(".woff2") ||
    lower.endsWith(".ttf") ||
    lower.endsWith(".otf")
  );
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error("public/ directory not found");
    process.exit(1);
  }

  const allFiles = walk(PUBLIC_DIR).filter(isBinaryCandidate);
  const unused = [];

  for (const full of allFiles) {
    const relFromRoot = path.relative(PROJECT_ROOT, full).replace(/\\/g, "/");
    // URL path as used in code (public/foo/bar.png -> /foo/bar.png)
    const urlPath = "/" + relFromRoot.replace(/^public\//, "");

    // Search for the URL string in the repo (excluding public/)
    const rg = spawnSync(
      "rg",
      ["-F", urlPath, ".", "--glob", "!public/**"],
      {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
      }
    );

    if (rg.status === 1) {
      // No matches found
      unused.push({ file: relFromRoot, url: urlPath });
    } else if (rg.status !== 0 && rg.status !== 1) {
      console.error("rg error for", relFromRoot, rg.stderr);
    }
  }

  if (unused.length === 0) {
    console.log("All public assets appear to be referenced somewhere.");
    return;
  }

  console.log("Potentially unused public assets (no literal URL references found):");
  for (const u of unused) {
    console.log(`- ${u.file}  (URL: ${u.url})`);
  }
}

main();

