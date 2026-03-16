/**
 * Generic video compression utility using FFmpeg (via @ffmpeg-installer/ffmpeg).
 *
 * Usage:
 *   # From project root
 *   node scripts/compress-portfolio-videos.js public/portfolio/3d-animation/3d-animation-production
 *
 * You can pass ANY folder under public that contains videos.
 * - It will:
 *   - Look for main videos in that folder (extensions: .mp4, .mov)
 *   - Skip any files starting with "Thumbnail"
 *   - Write compressed versions to <folder>/compressed/<name>.mp4
 *   - Leave originals untouched
 */

const path = require("path");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const RELATIVE_DIR = process.argv[2]; // e.g. public/portfolio/3d-animation/3d-animation-production

if (!RELATIVE_DIR) {
  console.error(
    "Usage: node scripts/compress-portfolio-videos.js <relative-folder-path-under-project-root>"
  );
  console.error(
    "Example: node scripts/compress-portfolio-videos.js public/portfolio/3d-animation/3d-animation-production"
  );
  process.exit(1);
}

const VIDEO_DIR = path.join(PROJECT_ROOT, RELATIVE_DIR);
const OUT_DIR = path.join(VIDEO_DIR, "compressed");

const CRF = 23;
const PRESET = "slow";

function fmtSize(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function compressFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-c:v libx264",
        `-crf ${CRF}`,
        `-preset ${PRESET}`,
        "-c:a aac",
        "-b:a 128k",
        "-movflags +faststart",
      ])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}

async function main() {
  if (!fs.existsSync(VIDEO_DIR)) {
    console.error("Video directory not found:", VIDEO_DIR);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(VIDEO_DIR);
  const mainVideos = allFiles.filter((name) => {
    const lower = name.toLowerCase();
    const isVideo =
      lower.endsWith(".mp4") ||
      lower.endsWith(".mov") ||
      lower.endsWith(".m4v") ||
      lower.endsWith(".avi");
    const isThumbnail = name.startsWith("Thumbnail");
    const isDir = fs.statSync(path.join(VIDEO_DIR, name)).isDirectory();
    return isVideo && !isThumbnail && !isDir;
  });

  if (mainVideos.length === 0) {
    console.log("No main videos found in:", VIDEO_DIR);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Compressing videos in: ${RELATIVE_DIR}`);
  console.log(`Output folder: ${path.relative(PROJECT_ROOT, OUT_DIR)}`);
  console.log(`Settings: H.264, CRF=${CRF}, preset=${PRESET}\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of mainVideos) {
    const src = path.join(VIDEO_DIR, name);
    const base = path.basename(name, path.extname(name));
    const outName = `${base}.mp4`;
    const out = path.join(OUT_DIR, outName);

    const before = fs.statSync(src).size;
    totalBefore += before;

    process.stdout.write(`Compressing: ${name} ... `);

    try {
      await compressFile(src, out);
      const after = fs.statSync(out).size;
      totalAfter += after;
      const pct = before > 0 ? Math.round(100 - (after * 100) / before) : 0;
      console.log(`${fmtSize(before)} → ${fmtSize(after)} (${pct}% smaller)`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  console.log("\n---");
  console.log("Total before:", fmtSize(totalBefore));
  console.log("Total after:", fmtSize(totalAfter));
  if (totalBefore > 0) {
    const totalPct = Math.round(100 - (totalAfter * 100) / totalBefore);
    console.log("Total reduction:", totalPct + "%");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
