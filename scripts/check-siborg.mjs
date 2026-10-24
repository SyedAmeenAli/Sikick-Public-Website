import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

// Open SiBorg
await page.click('button[aria-label^="Open SiBorg"]');
await page.waitForTimeout(400);
const panelVisible = await page.locator('.chatbot-panel[role="dialog"]').isVisible();
console.log(`SiBorg panel visible: ${panelVisible}`);

// Click a quick action that navigates
await page.click('button:has-text("Find the right plan")');
await page.waitForTimeout(800);
console.log(`After SiBorg action URL: ${page.url()}`);

await browser.close();
