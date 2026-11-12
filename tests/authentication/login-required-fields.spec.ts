import { test, expect } from '@playwright/test';

test('Login with both credential fields empty reports username required', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
});