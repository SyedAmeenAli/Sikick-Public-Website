// Builds the Sikick favicon and app-icon set from the official mark geometry
// (public/brand/sikick-mark-light.svg): ivory mark on a wine tile, so it reads on
// both light and dark browser chrome. Needs the dev tooling's puppeteer-core.
//   node scripts/generate-favicons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pub = join(root, 'public');
const tooling = resolve(root, '..', 'sikick-film-tooling');
const puppeteer = createRequire(join(tooling, 'package.json'))('puppeteer-core');
const chrome = join(process.env.USERPROFILE ?? '', '.cache/puppeteer/chrome-headless-shell/win64-152.0.7977.42/chrome-headless-shell-win64/chrome-headless-shell.exe');

const mark = readFileSync(join(pub, 'brand', 'sikick-mark-light.svg'), 'utf8');
const paths = [...mark.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
if (paths.length < 2) throw new Error('mark paths not found');
// the mark's own viewBox is "20 15 320 272"; its centre is (180, 151)
const glyph = (fill, scale) => `<g transform="translate(32 32.5) scale(${scale}) translate(-180 -151)" fill="${fill}">${paths.map((d) => `<path d="${d}"/>`).join('')}</g>`;

const defs = '<defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a3194a"/><stop offset="1" stop-color="#5a081b"/></linearGradient></defs>';
const tile = (rx, scale, bleed = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${defs}<rect width="64" height="64" rx="${bleed ? 0 : rx}" fill="url(#t)"/>${glyph('#f6efe9', scale)}</svg>`;

const svgs = {
  'favicon.svg': tile(14, 0.15),
  'safari-pinned-tab.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${glyph('#000', 0.17)}</svg>`,
};
for (const [name, svg] of Object.entries(svgs)) writeFileSync(join(pub, name), svg + '\n');

const png = {
  'favicon-16.png': [16, tile(10, 0.17)],
  'favicon-32.png': [32, tile(12, 0.16)],
  'favicon-48.png': [48, tile(13, 0.155)],
  'apple-touch-icon.png': [180, tile(0, 0.15, true)],
  'icon-192.png': [192, tile(14, 0.15)],
  'icon-512.png': [512, tile(14, 0.15)],
  'icon-maskable-512.png': [512, tile(0, 0.11, true)],
};

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const buffers = {};
for (const [name, [size, svg]] of Object.entries(png)) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  buffers[name] = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  writeFileSync(join(pub, name), buffers[name]);
}
await browser.close();

// ICO with embedded PNGs at 16, 32 and 48
const parts = ['favicon-16.png', 'favicon-32.png', 'favicon-48.png'].map((n) => ({ size: +n.match(/\d+/)[0], data: buffers[n] }));
const head = Buffer.alloc(6);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(parts.length, 4);
let offset = 6 + parts.length * 16;
const dir = Buffer.concat(parts.map((p) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(p.size, 0); e.writeUInt8(p.size, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(p.data.length, 8); e.writeUInt32LE(offset, 12);
  offset += p.data.length;
  return e;
}));
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([head, dir, ...parts.map((p) => p.data)]));

writeFileSync(join(pub, 'site.webmanifest'), JSON.stringify({
  name: 'Sikick',
  short_name: 'Sikick',
  description: 'Inventory, sales and purchasing on one stock count.',
  start_url: '/',
  display: 'browser',
  background_color: '#0d0a0c',
  theme_color: '#0d0a0c',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');
console.log('favicons written');
