import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4173';
const routes = ['/', '/pricing', '/product/inventory', '/solutions/retail', '/industries', '/contact', '/legal/privacy'];

const browser = await chromium.launch();
let failed = false;

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    if (errors.length > 0) {
      console.error(`CONSOLE ERRORS on ${route}:`, errors);
      failed = true;
    } else {
      console.log(`OK ${route} - no console errors`);
    }
  } catch (err) {
    console.error(`FAILED ${route}:`, err.message);
    failed = true;
  }
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
