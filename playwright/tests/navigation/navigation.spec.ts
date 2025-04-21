import { testUser } from '../../config/test-users.const';
import { actAs } from '../../functions/act-as.fn';
import { test, expect } from '@playwright/test';
import { OkNavigationMenu } from '../../shared-elements/ok-nav-menu.elm';

actAs(testUser);

test.describe('Navigation Menu Tests', () => {
  let navigationMenu: OkNavigationMenu;

  test.beforeEach(async ({ page }) => {
    navigationMenu = new OkNavigationMenu(page);
    await page.goto('/installations');
  });

  test('top navigation should be visible', async () => {
    await expect(navigationMenu.topNav).toBeVisible();
  });

  test('bottom navigation menu should be visible', async () => {
    await expect(navigationMenu.bottomNav).toBeVisible();
  });

  test('navigation items are visible', async () => {
    await expect(navigationMenu.navItem.first()).toBeVisible();
  });

  test('sub navigation items are visible', async () => {
    await navigationMenu.navItem.first().click();
    await expect(navigationMenu.navItem.first().locator('a')).toBeVisible();
  });
});
