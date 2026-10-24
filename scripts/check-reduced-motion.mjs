import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// Check that hero content is visible immediately without waiting for animations
const heroVisible = await page.locator('h1').isVisible();
const heroText = await page.locator('h1').textContent();
console.log(`Reduced motion: hero visible = ${heroVisible}, text = "${heroText?.trim().slice(0, 40)}"`);

await page.goto('http://localhost:4173/pricing', { waitUntil: 'networkidle' });
await page.locator('.pricing-plan-v2.tint-rose').click();
await page.waitForTimeout(200);
const corePrice = await page.locator('.pricing-plan-v2.is-selected .pricing-price-v2').textContent();
console.log(`Reduced motion pricing click: selected price = ${corePrice?.trim()}`);

await browser.close();
