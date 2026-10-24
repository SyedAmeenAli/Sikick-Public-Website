import { chromium } from 'playwright';
import fs from 'fs';

const content = fs.readFileSync('src/data/industries.ts', 'utf-8');
const slugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
console.log(`Found ${slugs.length} industry slugs`);

const browser = await chromium.launch();
const failures = [];

for (const slug of slugs) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(`http://localhost:4173/industries/${slug}`, { waitUntil: 'networkidle' });
    const status = response ? response.status() : 'no-response';
    const title = await page.title();
    const notFound = await page.locator('text=Page not found').count() > 0;
    if (status !== 200 || notFound || title.includes('Page not found')) {
      failures.push({ slug, status, title });
    }
  } catch (err) {
    failures.push({ slug, error: err.message });
  }
  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error('FAILURES:', JSON.stringify(failures.slice(0, 20), null, 2));
  process.exit(1);
} else {
  console.log(`All ${slugs.length} industry routes rendered successfully.`);
}
