import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4173';

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Pricing states
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/pricing-default.png', fullPage: false });

  // Click Core - use the plan header
  await page.locator('.pricing-selector-desktop .pricing-plan-v2.tint-rose').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/pricing-core.png', fullPage: false });

  // Click Enterprise
  await page.locator('.pricing-selector-desktop .pricing-plan-v2.tint-champagne').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/pricing-enterprise.png', fullPage: false });

  // Click Annual
  await page.locator('button[aria-pressed="false"]').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/pricing-annual.png', fullPage: false });

  // Mobile menu
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  await mobilePage.click('button[aria-label="Menu"]');
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: 'screenshots/mobile-menu.png', fullPage: false });

  // Language selector
  const desktopPage = await context.newPage();
  await desktopPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(800);
  await desktopPage.click('button[aria-label="Language"]');
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: 'screenshots/language-selector.png', fullPage: false });

  // SiBorg drawer
  await desktopPage.click('button[aria-label^="Open SiBorg"]');
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: 'screenshots/siborg-drawer.png', fullPage: false });

  await mobileContext.close();
  await context.close();
  await browser.close();
}

capture();
