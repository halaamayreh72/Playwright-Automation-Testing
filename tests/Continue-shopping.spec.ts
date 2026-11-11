import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
 await page.locator('.shopping_cart_link').click();
});
test('Continue shopping from cart', async ({ page }) => {
 await page.locator('[data-test="continue-shopping"]').click();
 await expect(page).toHaveURL(/inventory.html/);
 await expect(page.locator('.title')).toHaveText('Products');
});