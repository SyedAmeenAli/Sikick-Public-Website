import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:4173';
const routes = ['/legal/terms', '/industries/supermarkets-and-hypermarkets', '/industries/automotive-parts-and-spares', '/industries/textile-and-fabrics'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
fs.mkdirSync('screenshots/audit', { recursive: true });

for (const route of routes) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const safe = route.replace(/\//g, '_').replace(/^_/, '');
  await page.screenshot({ path: `screenshots/audit/${safe || 'home'}.png`, fullPage: true });
  console.log(`Captured ${route}`);
}

await browser.close();
