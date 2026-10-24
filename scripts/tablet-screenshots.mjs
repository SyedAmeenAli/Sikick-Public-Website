import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['iPad Pro 11'] });
const page = await context.newPage();

await page.goto('http://localhost:4173/pricing', { waitUntil: 'networkidle' });

// Tablet shows mobile accordion by default; click Annual billing
await page.getByRole('button', { name: 'Annual' }).click();
await page.waitForTimeout(300);
// Core is expanded by default
await page.screenshot({ path: 'screenshots/pricing-tablet-core-annual.png', fullPage: true });

// Expand AI accordion
await page.locator('.pricing-mobile-plan', { hasText: /^AI/ }).locator('summary').click();
await page.waitForTimeout(300);
await page.screenshot({ path: 'screenshots/pricing-tablet-ai-annual.png', fullPage: true });

// Homepage tablet
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshots/homepage-tablet.png', fullPage: true });

await browser.close();
console.log('Tablet screenshots captured.');
