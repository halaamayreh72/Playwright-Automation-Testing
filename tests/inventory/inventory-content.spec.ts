import { test, expect } from '@playwright/test';

test('Inventory products include details, images, prices, and cart actions', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.title')).toHaveText('Products');
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);
  for (const product of await products.all()) {
    await expect(product.locator('.inventory_item_name')).toBeVisible();
    await expect(product.locator('.inventory_item_desc')).not.toBeEmpty();
    await expect(product.locator('.inventory_item_price')).toBeVisible();
    await expect(product.locator('img')).toBeVisible();
    await expect(product.locator('button')).toHaveText('Add to cart');
  }
  await expect(page.locator('.shopping_cart_link')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});