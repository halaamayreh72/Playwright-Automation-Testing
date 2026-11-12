import { test, expect } from '@playwright/test';

function dollarsIn(text: string): number {
  const amount = text.match(/\$([\d.]+)/)?.[1];
  if (!amount) throw new Error(`Could not parse dollar amount from: ${text}`);
  return Math.round(Number(amount) * 100);
}

test('Checkout overview totals match cart items and cancel preserves cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('Customer');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(2);
  const prices = await page.locator('.cart_item .inventory_item_price').allTextContents();
  const itemTotal = dollarsIn(await page.locator('.summary_subtotal_label').innerText());
  const tax = dollarsIn(await page.locator('.summary_tax_label').innerText());
  const total = dollarsIn(await page.locator('.summary_total_label').innerText());
  expect(prices).toEqual(['$29.99', '$9.99']);
  expect(itemTotal).toBe(prices.reduce((sum, price) => sum + dollarsIn(price), 0));
  expect(itemTotal).toBe(3998);
  expect(tax).toBe(320);
  expect(total).toBe(itemTotal + tax);
  expect(total).toBe(4318);

  await page.locator('[data-test="cancel"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});