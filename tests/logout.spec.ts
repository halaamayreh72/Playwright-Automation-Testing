import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');

  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

});

test('Logout successfully', async ({ page }) => {

  await page.locator('#react-burger-menu-btn').click();

  await page.locator('[data-test="logout-sidebar-link"]').click();

  await expect(page.locator('[data-test="login-button"]'))

    .toBeVisible();

});

 