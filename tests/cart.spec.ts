import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
});
test('Add product to cart', async ({ page }) => {
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
test('Verify product in cart', async ({ page }) => {
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await page.locator('.shopping_cart_link').click();
 await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
 
});
test('Remove product from cart', async ({ page }) => {
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await page.locator('.shopping_cart_link').click();
 await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
 await expect(page.locator('.cart_item')).toHaveCount(0);
});