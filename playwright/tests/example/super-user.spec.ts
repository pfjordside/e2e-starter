import test, { expect } from '@playwright/test';
import { admin } from '../../config/test-users.const';
import { actAs } from '../../functions/act-as.fn';

actAs(admin);

test.describe('Admin user can login and access all features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display top and bottom navigation', async ({ page }) => {
    await expect(page.locator('nav')).toHaveCount(2);
  });

  test('should show create subscription, administration, installations, screenings, leads, change theme and log out', async ({ page }) => {
    await expect(page.locator('nav ok-nav-item')).toHaveCount(7);
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Opret abonnement' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Administration' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Installationer' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Screeninger' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Henvisning' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Mørkt tema' })).toBeVisible();
    await expect(page.locator('nav ok-nav-item').filter({ hasText: 'Log ud' })).toBeVisible();
  });
});
