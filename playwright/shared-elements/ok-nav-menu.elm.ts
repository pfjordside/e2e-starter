import { Page } from '@playwright/test';

export class OkNavigationMenu {
  navItemSelector = 'ok-nav-item';
  navigationSelector = 'ok-navigation';

  constructor(private page: Page) {}

  navItem = this.page.locator(this.navItemSelector);
  topNav = this.page.locator(this.navigationSelector).locator('nav').first();
  bottomNav = this.page.locator(this.navigationSelector).locator('nav').last();
}
