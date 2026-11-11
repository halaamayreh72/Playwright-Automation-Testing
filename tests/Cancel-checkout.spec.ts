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
test('Cancel checkout and return to cart', async ({ page }) => {
 await page.locator('[data-test="cancel"]').click();
 await expect(page).toHaveURL(/cart.html/);
 await expect(page.locator('.cart_item')).toHaveCount(1);
});