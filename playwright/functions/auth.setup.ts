import * as dotenv from '@dotenvx/dotenvx';
import { Page, test } from '@playwright/test';
import { TestUser } from '../models/test-user.interface';
import { admin, testUser } from '../config/test-users.const';
dotenv.config();

test('authenticate as test user', async ({ page }) => {
  await loginUser(page, testUser);
});

test('authenticate as admin', async ({ page }) => {
  await loginUser(page, admin);
});

export async function loginUser(page: Page, user: TestUser) {
  const userPass = process.env[user.password];

  if (!userPass) {
    throw new Error(`Password for ${user.username} is not set in .env file`);
  }

  await page.goto('/'); // baseurl

  // Dismiss a cookie banner, if visible
  await page
    .waitForSelector('button#declineButton', { state: 'visible', timeout: 1000 })
    .then(async el => {
      await el.click();
    })
    .catch(() => {});

  await page.locator('input#username').fill(user.username);
  await page.locator('input#password').fill(userPass);
  await page.locator('input[type="submit"]').click();

  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('nav', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('text=Log ud', { state: 'visible', timeout: 10000 });

  // Save cookies state
  await page.context().storageState({
    path: `playwright/.auth/${user.username}.json`,
  });
}
