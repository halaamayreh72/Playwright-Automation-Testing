import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await page.locator('.shopping_cart_link').click();
 await page.locator('[data-test="checkout"]').click();
});
test('Complete checkout successfully', async ({ page }) => {
 await page.locator('[data-test="firstName"]').fill('Hala');
 await page.locator('[data-test="lastName"]').fill('Amayreh');
 await page.locator('[data-test="postalCode"]').fill('11118');
 await page.locator('[data-test="continue"]').click();
 await page.locator('[data-test="finish"]').click();
 await expect(page.locator('.complete-header'))
   .toHaveText('Thank you for your order!');
});
test('Checkout with empty first name', async ({ page }) => {
 await page.locator('[data-test="lastName"]').fill('Amayreh');
 await page.locator('[data-test="postalCode"]').fill('11118');
 await page.locator('[data-test="continue"]').click();
 await expect(page.locator('[data-test="error"]'))
   .toContainText('First Name is required');
});