/**
 * Re-encodes raster assets in `public/images` to WebP, capped at MAX_WIDTH.
 *
 * The originals are 4000–8000 px PNG exports straight out of the mockup files
 * (~600 MB total), while nothing on the site is ever displayed wider than
 * `images.deviceSizes` in next.config.ts. Every image-optimizer cache miss had
 * to pull the full-size source into a Vercel function, which is what burned
 * through the Fast Origin Transfer quota.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --dry     report only
 *   node scripts/optimize-images.mjs           convert + rewrite references
 *
 * Source files are replaced; the originals stay in git history.
 */
import {
  readdir,
  stat,
  readFile,
  writeFile,
  unlink,
  access,
} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public/images");
const MAX_WIDTH = 2560;
/** Hard limit of the WebP format — tall strip exports can exceed it. */
const MAX_DIMENSION = 16383;
const QUALITY = 82;
/** Below this, re-encoding is not worth the reference churn. */
const MIN_BYTES = 150 * 1024;
/** Referenced from e-mail templates, where WebP support is unreliable. */
const SKIP = new Set(["/images/entei-logo-blurred.png"]);
/** Files whose references are rewritten when an asset is renamed. */
const CODE_EXTS = [".ts", ".tsx", ".css", ".json", ".js", ".mjs"];

const dry = process.argv.includes("--dry");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function collectCodeFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectCodeFiles(p)));
    else if (CODE_EXTS.includes(path.extname(entry.name))) out.push(p);
  }
  return out;
}

const files = (await walk(IMAGES_DIR)).filter((f) =>
  /\.(png|jpe?g)$/i.test(f),
);

const renames = new Map(); // "/images/a.png" -> "/images/a.webp"
let before = 0;
let after = 0;
let skipped = 0;

for (const file of files.sort()) {
  const url = "/" + path.relative(path.join(ROOT, "public"), file);
  const size = (await stat(file)).size;

  if (SKIP.has(url) || size < MIN_BYTES) {
    skipped++;
    continue;
  }

  const image = sharp(file, { limitInputPixels: false });
  const meta = await image.metadata();
  let width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

  // Very tall exports (e.g. full-page screenshots) can still blow the WebP
  // dimension limit after the width cap, so scale them down further.
  const height = (meta.height ?? 0) * (width / (meta.width ?? width));
  if (height > MAX_DIMENSION) {
    width = Math.floor(width * (MAX_DIMENSION / height));
  }

  const buf = await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  before += size;
  after += buf.length;

  const target = file.replace(/\.(png|jpe?g)$/i, ".webp");

  // A same-named .webp may already exist next to the source (e.g. a hand-made
  // export). Never clobber it — report and move on.
  if (target !== file && (await exists(target))) {
    console.warn(`SKIP (target exists): ${url}`);
    before -= size;
    after -= buf.length;
    skipped++;
    continue;
  }

  console.log(
    `${(size / 1048576).toFixed(2)} MB → ${(buf.length / 1048576).toFixed(2)} MB` +
      `  ${meta.width}×${meta.height} → ${width}px  ${url}`,
  );

  if (dry) continue;

  await writeFile(target, buf);
  if (target !== file) {
    await unlink(file);
    renames.set(url, url.replace(/\.(png|jpe?g)$/i, ".webp"));
  }
}

console.log(
  `\n${files.length - skipped} converted, ${skipped} left as-is\n` +
    `${(before / 1048576).toFixed(0)} MB → ${(after / 1048576).toFixed(1)} MB ` +
    `(-${(100 - (after / before) * 100).toFixed(1)}%)`,
);

if (dry || renames.size === 0) process.exit(0);

// Rewrite references. Paths are built from template literals in
// src/lib/caseStudies.ts, so match on the file name rather than the full URL.
const codeFiles = [
  ...(await collectCodeFiles(path.join(ROOT, "src"))),
  ...(await collectCodeFiles(path.join(ROOT, "messages"))),
];
let touched = 0;

for (const file of codeFiles) {
  const original = await readFile(file, "utf8");
  let next = original;
  for (const from of renames.keys()) {
    const name = path.basename(from);
    if (!next.includes(name)) continue;
    next = next.split(name).join(path.basename(renames.get(from)));
  }
  if (next !== original) {
    await writeFile(file, next);
    touched++;
  }
}

console.log(`references rewritten in ${touched} file(s)`);
