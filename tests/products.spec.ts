import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
});
test('Verify products page title', async ({ page }) => {
 await expect(page.locator('.title')).toHaveText('Products');
});
test('Verify products count', async ({ page }) => {
 await expect(page.locator('.inventory_item')).toHaveCount(6);
});
test('Verify product names are visible', async ({ page }) => {
 await expect(page.locator('.inventory_item_name').first()).toBeVisible();
});