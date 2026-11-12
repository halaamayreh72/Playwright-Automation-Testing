import { test, expect } from '@playwright/test';

test('Continue shopping preserves cart contents', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();

  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="continue-shopping"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText('Sauce Labs Backpack');
});