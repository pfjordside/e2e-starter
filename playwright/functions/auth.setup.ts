import * as dotenv from '@dotenvx/dotenvx';
import { Page, test } from '@playwright/test';
import { testUsers } from '../config/test-users.const';
import { TestUser } from '../models/test-user.interface';
dotenv.config();

test('Authenticate test users', async ({ page }) => {
  for (const user of testUsers) {
    await loginUser(page, user);
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }
});

export async function loginUser(page: Page, user: TestUser) {
  const userPass = process.env[user.password];

  if (!userPass) {
    throw new Error(`Password for ${user.username} is not set in .env file`);
  }

  await page.goto('/'); // baseurl

  await page.waitForSelector('input#username');
  await dismissCookieBanner(page);

  await page.locator('input#username').fill(user.username);
  await page.locator('input#password').fill(userPass);
  await page.locator('input[type="submit"]').click();

  await page.waitForLoadState('domcontentloaded');
  await dismissCookieBanner(page);
  await page.waitForSelector('nav', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('text=Log ud', {
    state: 'visible',
    timeout: 10000,
  });

  // Save cookies state
  await page.context().storageState({
    path: `playwright/.auth/${user.username}.json`,
  });
}

async function dismissCookieBanner(page: Page) {
  // Dismiss a cookie banner, if not local debugging
  if (!page.url().includes('localhost')) {
    await page
      .waitForSelector('button#declineButton', {
        state: 'visible',
        timeout: 3000,
      })
      .then(async el => {
        await el.click();
      })
      .catch(() => {});
  }
}
