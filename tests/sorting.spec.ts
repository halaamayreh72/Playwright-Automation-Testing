import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.locator('[data-test="username"]').fill('standard_user');
 await page.locator('[data-test="password"]').fill('secret_sauce');
 await page.locator('[data-test="login-button"]').click();
});
test('Sort products by price - Low to High', async ({ page }) => {
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 const prices = await page.locator('.inventory_item_price').allTextContents();
 const numbers = prices.map(price => Number(price.replace('$', '')));
 expect(numbers).toEqual([...numbers].sort((a, b) => a - b));

  await page.pause();

});
test('Sort products by price - High to Low', async ({ page }) => {
 await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
 const prices = await page.locator('.inventory_item_price').allTextContents();
 const numbers = prices.map(price => Number(price.replace('$', '')));
 expect(numbers).toEqual([...numbers].sort((a, b) => b - a));

});
test('Sort products by name - A to Z', async ({ page }) => {
 await page.locator('[data-test="product-sort-container"]').selectOption('az');
 const names = await page.locator('.inventory_item_name').allTextContents();
 expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));

});