import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('An empty cart has no items, remove actions, or quantity values', async ({ page }) => {
  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  await expect(page.locator('[data-test^="remove-"]')).toHaveCount(0);
  await expect(page.locator('.cart_quantity')).toHaveCount(0);
});

test('Cart quantity cannot be edited from the cart page', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();

  const item = page.locator('.cart_item');
  await expect(item.locator('.cart_quantity')).toHaveText('1');
  await expect(item.locator('input, select')).toHaveCount(0);
  await expect(item.locator('[data-test^="remove-"]')).toHaveText('Remove');
});