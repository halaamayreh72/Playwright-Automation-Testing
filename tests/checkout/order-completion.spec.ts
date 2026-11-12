import { test, expect } from '@playwright/test';

test('Completing checkout clears the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('Customer');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});