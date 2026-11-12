import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('Opens product details', async ({ page }) => {
  await page.locator('.inventory_item_name').first().click();
  await expect(page.locator('.inventory_details_name')).toBeVisible();
});

test('Shows the product price on the details page', async ({ page }) => {
  await page.locator('.inventory_item_name').first().click();
  await expect(page.locator('.inventory_details_price')).toBeVisible();
});