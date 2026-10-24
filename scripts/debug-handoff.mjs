import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));
await page.goto('http://localhost:4173/trial', { waitUntil: 'networkidle' });
console.log('URL:', page.url());
console.log('TITLE:', await page.title());
console.log('BODY:', await page.locator('body').textContent());
await browser.close();
