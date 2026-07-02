/**
 * One-off visual verification for <ScrollStackGrid> on the homepage.
 * Scrolls the pinned works section to several scroll-progress points and
 * screenshots the viewport at each, so we can eyeball the scaler → grid reveal.
 *
 * Usage: node scripts/verify-stack.mjs --base http://localhost:51146
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../design/screenshots");

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const base = arg("base", "http://localhost:3000").replace(/\/$/, "");

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await ctx.addInitScript(() =>
  window.localStorage.setItem("entei-cookie-consent", "granted"),
);
const page = await ctx.newPage();
await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForLoadState("load").catch(() => {});
await page
  .waitForFunction(
    () => {
      const bg = getComputedStyle(document.body).backgroundColor;
      return bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
    },
    { timeout: 15000 },
  )
  .catch(() => {});
await page.waitForTimeout(1500);

const geo = await page.evaluate(() => {
  const s = document.querySelector("[data-scroll-stack]");
  if (!s) return null;
  const top = s.getBoundingClientRect().top + window.scrollY;
  return { top, travel: s.offsetHeight - window.innerHeight };
});
if (!geo) {
  console.error("✗ pinned section not found (is viewport ≥768 & animated?)");
  await browser.close();
  process.exit(1);
}

async function scrollToProgress(p) {
  const targetY = Math.round(geo.top + geo.travel * p);
  for (let i = 0; i < 25; i++) {
    const y = await page.evaluate(() => window.scrollY);
    const diff = targetY - y;
    if (Math.abs(diff) < 30) break;
    await page.mouse.wheel(0, Math.max(-600, Math.min(600, diff)));
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(1500);
  return page.evaluate(() => {
    const s = document.querySelector("[data-scroll-stack]");
    const cells = [...s.querySelectorAll(".origin-center")];
    const info = (el) => {
      const r = el.getBoundingClientRect();
      return `${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    };
    const stg = s.querySelector(".sticky").getBoundingClientRect();
    const heroEl = s.querySelector(".z-30");
    const hr = heroEl.getBoundingClientRect();
    return {
      scrollY: Math.round(window.scrollY),
      stageTop: Math.round(stg.top),
      // hero box: left,top WxH  (+ how far its centre is from viewport centre)
      hero: `${Math.round(hr.left)},${Math.round(hr.top)} ${Math.round(hr.width)}x${Math.round(hr.height)} cY=${Math.round(hr.top + hr.height / 2)} vCY=${Math.round(window.innerHeight / 2)}`,
      rects: cells.map(info),
    };
  });
}

for (const p of [0.0, 0.4, 0.85, 1.0]) {
  const state = await scrollToProgress(p);
  const file = resolve(OUT, `stack-p${String(p).replace("0.", "")}.png`);
  await page.screenshot({ path: file });
  console.log(`p=${p}  ${JSON.stringify(state)}  → ${file}`);
}

await browser.close();
