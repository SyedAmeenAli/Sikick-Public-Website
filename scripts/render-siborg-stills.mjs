// Renders SiBorg 3D stills (transparent, dark, alternate angle) with a headless browser.
// Needs the dev server on :5173 and puppeteer-core (installed in ../sikick-film-tooling).
//   node scripts/render-siborg-stills.mjs
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const tooling = resolve(import.meta.dirname, '..', '..', 'sikick-film-tooling');
const puppeteer = createRequire(join(tooling, 'package.json'))('puppeteer-core');
const chrome = process.env.CHROME_PATH
  ?? join(process.env.USERPROFILE ?? '', '.cache/puppeteer/chrome-headless-shell/win64-152.0.7977.42/chrome-headless-shell-win64/chrome-headless-shell.exe');
const out = resolve(import.meta.dirname, '..', 'public', 'brand', 'siborg', 'render');
mkdirSync(out, { recursive: true });

const shots = [
  { file: 'siborg-3d-front-transparent.png', q: 'yaw=0.1', w: 1400, h: 1600, transparent: true },
  { file: 'siborg-3d-front-dark.png', q: 'yaw=0.1&bg=0d0a0c', w: 1400, h: 1600, transparent: false },
  { file: 'siborg-3d-front-light.png', q: 'yaw=0.1&bg=f3ece6', w: 1400, h: 1600, transparent: false },
  { file: 'siborg-3d-three-quarter-dark.png', q: 'yaw=0.45&bg=0d0a0c', w: 1400, h: 1600, transparent: false },
  { file: 'siborg-3d-side-dark.png', q: 'yaw=1.45&bg=0d0a0c', w: 1400, h: 1600, transparent: false },
];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'],
});
for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:5173/siborg-render.html?${s.q}`, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.__ready === true');
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: join(out, s.file), omitBackground: s.transparent });
  console.log('wrote', s.file);
  await page.close();
}
await browser.close();
