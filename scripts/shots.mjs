/**
 * Visual screenshot helper for the Design Reviewer loop.
 *
 * Usage:
 *   npm run shots -- --url /                       # homepage
 *   npm run shots -- --url /portfolio --name portfolio
 *   npm run shots -- --url / --name home --base http://localhost:3000
 *
 * Captures the given route at desktop (1440x900) and mobile (390x844),
 * full page, into design/screenshots/<name>.<viewport>.png
 *
 * Requires @playwright/test (devDependency). First run also needs:
 *   npx playwright install chromium
 */
import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../design/screenshots');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const base = arg('base', 'http://localhost:3000').replace(/\/$/, '');
const url = arg('url', '/');
const name = arg('name', url === '/' ? 'home' : url.replace(/[^\w]+/g, '-').replace(/^-|-$/g, ''));

const VIEWPORTS = [
  {label: 'desktop', width: 1440, height: 900},
  {label: 'mobile', width: 390, height: 844},
];

await mkdir(OUT_DIR, {recursive: true});
const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: {width: vp.width, height: vp.height},
    deviceScaleFactor: 2,
  });
  // Pre-accept cookie consent so the banner doesn't obstruct full-page shots.
  // Consent is persisted in localStorage (see ConsentProvider STORAGE_KEY).
  await ctx.addInitScript(() => {
    try {
      window.localStorage.setItem('entei-cookie-consent', 'granted');
    } catch {
      // ignore — private mode etc.
    }
  });
  const page = await ctx.newPage();
  const target = `${base}${url}`;
  // `networkidle` never settles here (analytics/pixel keep connections open),
  // so wait for the DOM then give reveal animations / lazy media time to settle.
  await page.goto(target, {waitUntil: 'domcontentloaded', timeout: 60000});
  await page.waitForLoadState('load').catch(() => {});
  // Guard against Next dev's lazy CSS compile: wait until the app stylesheet has
  // actually applied (body is painted on the dark surface) before capturing,
  // so we never screenshot an unstyled flash.
  await page
    .waitForFunction(
      () => {
        const bg = getComputedStyle(document.body).backgroundColor;
        return bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
      },
      {timeout: 15000},
    )
    .catch(() => {});
  await page.waitForTimeout(1500);
  const file = resolve(OUT_DIR, `${name}.${vp.label}.png`);
  await page.screenshot({path: file, fullPage: true});
  console.log(`✓ ${vp.label.padEnd(7)} ${target} → design/screenshots/${name}.${vp.label}.png`);
  await ctx.close();
}

await browser.close();
