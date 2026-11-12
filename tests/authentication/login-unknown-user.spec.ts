import { test, expect } from '@playwright/test';

test('Reject an unknown username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('unknown_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  await expect(page.locator('.inventory_list')).toHaveCount(0);
});