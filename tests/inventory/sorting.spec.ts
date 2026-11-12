import { test, expect, type Page } from '@playwright/test';

type InventoryItem = {
  name: string;
  price: string;
};

const pricesByName: Record<string, string> = {
  'Sauce Labs Backpack': '$29.99',
  'Sauce Labs Bike Light': '$9.99',
  'Sauce Labs Bolt T-Shirt': '$15.99',
  'Sauce Labs Fleece Jacket': '$49.99',
  'Sauce Labs Onesie': '$7.99',
  'Test.allTheThings() T-Shirt (Red)': '$15.99',
};

const productOrders = {
  nameAscending: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ],
  nameDescending: [
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack',
  ],
  priceAscending: [
    'Sauce Labs Onesie',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Backpack',
    'Sauce Labs Fleece Jacket',
  ],
  priceDescending: [
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Bike Light',
    'Sauce Labs Onesie',
  ],
};

async function readInventory(page: Page): Promise<InventoryItem[]> {
  const items = await page.locator('.inventory_item').all();
  const inventory: InventoryItem[] = [];

  for (const item of items) {
    inventory.push({
      name: await item.locator('.inventory_item_name').innerText(),
      price: await item.locator('.inventory_item_price').innerText(),
    });
  }

  return inventory;
}

function expectedInventory(names: string[]): InventoryItem[] {
  return names.map((name) => ({ name, price: pricesByName[name] }));
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('Sort products by name A to Z', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('az');

  expect(await readInventory(page)).toEqual(expectedInventory(productOrders.nameAscending));
});

test('Sort products by name Z to A', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  expect(await readInventory(page)).toEqual(expectedInventory(productOrders.nameDescending));
});

test('Sort products by price low to high', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  expect(await readInventory(page)).toEqual(expectedInventory(productOrders.priceAscending));
});

test('Sort products by price high to low', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  expect(await readInventory(page)).toEqual(expectedInventory(productOrders.priceDescending));
});