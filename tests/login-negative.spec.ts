import { test, expect } from '@playwright/test';
test('Login with wrong password', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('wrong123');
 await page.locator('[data-test="login-button"]').click();
 await expect(page.locator('[data-test="error"]'))
   .toContainText('Username and password do not match');
});
test('Login with empty username', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
 await expect(page.locator('[data-test="error"]'))
   .toContainText('Username is required');
});
test('Login with empty password', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="login-button"]').click();
 await expect(page.locator('[data-test="error"]'))
   .toContainText('Password is required');
});