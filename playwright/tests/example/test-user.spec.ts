import { test, expect } from '@playwright/test';
import { actAs } from '../../functions/act-as.fn';
import { testUser } from '../../config/test-users.const';

actAs(testUser);

test.describe('Test user can login and access create subscription', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display top and bottom navigation', async ({ page }) => {
    await expect(page.locator('nav')).toHaveCount(2);
  });

  test('should show create subscription, change theme and log out', async ({ page }) => {
    await expect(page.locator('nav ok-nav-item')).toHaveCount(3);
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Opret abonnement' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Mørkt tema' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Log ud' })).toBeVisible();
  });
});
