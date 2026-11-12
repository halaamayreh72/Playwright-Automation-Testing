import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('Add products and verify cart items, quantities, and prices', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(
    page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('button'),
  ).toHaveText('Remove');

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await expect(
    page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).locator('button'),
  ).toHaveText('Remove');

  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
  await expect(page.locator('.cart_quantity')).toHaveText(['1', '1']);
  await expect(page.locator('.cart_item .inventory_item_price')).toHaveText(['$29.99', '$9.99']);
});

test('Removing products updates cart contents and badge', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('.shopping_cart_link').click();

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Bike Light');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});