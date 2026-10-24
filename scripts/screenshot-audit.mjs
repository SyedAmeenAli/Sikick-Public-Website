import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4173';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const PATHS = [
  '/',
  '/pricing',
  '/product/inventory',
  '/solutions/retail',
  '/legal/privacy',
  '/contact',
  '/industries',
  '/industries/pharmacies-and-drugstores',
];

async function capture() {
  const browser = await chromium.launch();
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const path of PATHS) {
      try {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(1200);
        const filename = `screenshots/${viewport.name}${path.replace(/\//g, '_') || '_root'}.png`;
        await page.screenshot({ path: filename, fullPage: true });
        console.log(`Captured ${filename}`);
      } catch (err) {
        console.error(`Failed ${path} @ ${viewport.name}:`, err.message);
      }
    }
    await context.close();
  }
  await browser.close();
}

capture();
