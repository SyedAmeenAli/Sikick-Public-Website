import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// Mobile menu navigation
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.click('button[aria-label="Menu"]');
await page.waitForTimeout(300);
await page.locator('#mobile-nav').locator('a:has-text("Pricing")').click();
await page.waitForTimeout(500);
console.log(`Mobile nav to Pricing: ${page.url()}`);

// Language switch via mobile menu
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.click('button[aria-label="Menu"]');
await page.waitForTimeout(300);
await page.locator('#mobile-nav').locator('button[aria-label="Language"]').click();
await page.waitForTimeout(200);
await page.locator('#mobile-nav').locator('text=हिन्दी').click();
await page.waitForTimeout(500);
const langAttr = await page.locator('html').getAttribute('lang');
const bodyText = await page.locator('body').textContent();
const hasHindi = bodyText.includes('अपना स्टॉक जानें') || bodyText.includes('स्टॉक');
console.log(`Language switch: html lang = ${langAttr}, has Hindi text = ${hasHindi}`);

await browser.close();
