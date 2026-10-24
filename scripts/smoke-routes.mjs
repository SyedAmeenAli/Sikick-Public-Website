import { chromium } from 'playwright';

const browser = await chromium.launch();
const routes = [
  '/',
  '/pricing',
  '/product',
  '/product/inventory',
  '/product/pos',
  '/product/purchasing',
  '/product/stock-control',
  '/product/reports',
  '/product/siborg',
  '/solutions/retail',
  '/solutions/wholesale',
  '/solutions/distribution',
  '/solutions/manufacturing',
  '/industries',
  '/industries/pharmacies-and-drugstores',
  '/about',
  '/contact',
  '/security',
  '/resources',
  '/integrations',
  '/request-quote',
  '/legal/privacy',
  '/legal/terms',
];
// Handoff pages redirect externally; verify separately before the replace happens.
const handoffRoutes = ['/trial', '/login'];

const failures = [];
for (const route of routes) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle' });
    const status = response ? response.status() : 'no-response';
    const title = await page.title();
    const hasMain = await page.locator('main').count() > 0;
    const hasFooter = await page.locator('footer').count() > 0;
    if (status !== 200 || !hasMain || !hasFooter) {
      failures.push({ route, status, title, hasMain, hasFooter });
    } else {
      console.log(`OK ${route} - ${title}`);
    }
  } catch (err) {
    failures.push({ route, error: err.message });
  }
  await page.close();
}

for (const route of handoffRoutes) {
  const page = await browser.newPage();
  try {
    const expectedUrl = route === '/trial' ? 'https://ims-web-902186518684.asia-south2.run.app/signup' : 'https://ims-web-902186518684.asia-south2.run.app/dashboard';
    await page.goto(`http://localhost:4173${route}`);
    await page.waitForURL(expectedUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
    console.log(`OK ${route} -> ${page.url()}`);
  } catch (err) {
    failures.push({ route, error: err.message, url: page.url() });
  }
  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error('FAILURES:', JSON.stringify(failures, null, 2));
  process.exit(1);
} else {
  console.log(`All ${routes.length} routes rendered successfully.`);
}
