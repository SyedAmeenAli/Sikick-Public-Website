import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4173/');
await page.waitForLoadState('networkidle');

const results = [];

// Collect all header and footer links that point outside
const links = await page.locator('a[href^="http"], a[href^="/dashboard"], a[href^="/signup"]').all();
for (const link of links) {
  const href = await link.getAttribute('href');
  const text = await link.textContent();
  results.push({ text: text.trim().replace(/\s+/g, ' '), href });
}

console.log(JSON.stringify(results, null, 2));

await browser.close();
