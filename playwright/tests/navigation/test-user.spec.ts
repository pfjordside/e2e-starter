import { expect, test } from '@playwright/test';
import { OkNavigationMenu } from '../../shared-elements/ok-nav-menu.elm';
import { testUser } from '../../config/test-users.const';

test.use({ storageState: `playwright/.auth/${testUser.username}.json` });

test.describe('Test role', () => {
  let navigationMenu: OkNavigationMenu;
  test.beforeEach(async ({ page }) => {
    navigationMenu = new OkNavigationMenu(page);
    await page.goto('/');
  });

  test('test user should only see create subscription', async () => {
    const topNavChildren = navigationMenu.topNav.locator(navigationMenu.navItemSelector);
    await expect(topNavChildren).toHaveCount(1);
    await expect(topNavChildren.first()).toHaveText('Opret Abonnement');
  });

  test('test user should only be able to create private subscription', async () => {
    // Click ok-nav-item with text 'Opret Abonnement'
    await navigationMenu.navItem.filter({ hasText: 'Opret Abonnement' }).click();

    // Expect Privatkunde to be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Privatkunde' })).toBeVisible();
    // Expect HLF to not be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Firmabil (HLF)' })).not.toBeVisible();
  });
});
