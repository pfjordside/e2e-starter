import { expect, test } from '@playwright/test';
import { OkNavigationMenu } from '../../shared-elements/ok-nav-menu.elm';
import { admin } from '../../config/test-users.const';
import { actAs } from '../../functions/act-as.fn';

actAs(admin); // Use the actAs function to set the storage state for the admin user

test.describe('Superuser role', () => {
  let navigationMenu: OkNavigationMenu;
  test.beforeEach(async ({ page }) => {
    navigationMenu = new OkNavigationMenu(page);
    await page.goto('/');
  });

  test('super user should see all menu items', async () => {
    const topNavChildren = navigationMenu.topNav.locator(navigationMenu.navItemSelector);
    await expect(topNavChildren).toHaveCount(4);
    await expect(topNavChildren.nth(0)).toHaveText('Opret Abonnement');
    await expect(topNavChildren.nth(1)).toHaveText('Administration');
    await expect(topNavChildren.nth(2)).toHaveText('Installation');
    await expect(topNavChildren.nth(3)).toHaveText('Henvisning');
  });

  test('super user should be able to create private or hlf subscription', async () => {
    // Click ok-nav-item with text 'Opret Abonnement'
    await navigationMenu.navItem.filter({ hasText: 'Opret Abonnement' }).click();

    // Expect Privatkunde to be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Privatkunde' })).toBeVisible();
    // Expect HLF to not be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Firmabil (HLF)' })).toBeVisible();
  });

  test('super user should be able to manage organizations, products, hardware products and upload product data', async () => {
    // Click ok-nav-item with text 'Opret Abonnement'
    await navigationMenu.navItem.filter({ hasText: 'Administration' }).click();

    // Expect subitems to be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Organisationer' })).toBeVisible();
    await expect(navigationMenu.navItem.filter({ hasText: 'Produkter' }).first()).toBeVisible();
    await expect(navigationMenu.navItem.filter({ hasText: 'Hardwareprodukter' })).toBeVisible();
    await expect(navigationMenu.navItem.filter({ hasText: 'Upload produktdata' })).toBeVisible();
  });

  test('super user should be able to manage installations and screenings', async () => {
    // Click ok-nav-item with text 'Opret Abonnement'
    await navigationMenu.navItem.filter({ hasText: 'Installation' }).click();

    // Expect subitems to be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Installationer' })).toBeVisible();
    await expect(navigationMenu.navItem.filter({ hasText: 'Screenings' })).toBeVisible();
  });

  test('super user should be able to create reference for private and hlf customers', async () => {
    // Click ok-nav-item with text 'Opret Abonnement'
    await navigationMenu.navItem.filter({ hasText: 'Henvisning' }).click();

    // Expect subitems to be visible
    await expect(navigationMenu.navItem.filter({ hasText: 'Privatkunde' })).toBeVisible();
    await expect(navigationMenu.navItem.filter({ hasText: 'Firmabil (HLF)' })).toBeVisible();
  });
});
