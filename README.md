# Playwright UI Automation

Playwright end-to-end tests for the publicly hosted [SauceDemo](https://www.saucedemo.com/) shopping application. The suite uses TypeScript and `@playwright/test`.

## Project structure

```text
tests/
  authentication/  Login and session scenarios
  cart/            Cart contents, navigation, and quantity behavior
  checkout/        Validation, order totals, cancellation, and completion
  inventory/       Product details, inventory content, and sorting
specs/
  test.plan.md      Regression test plan
```

The tests use SauceDemo's public demo accounts and create their own state for each scenario. Cart quantities are displayed as one per item; the application does not provide an edit control.

## Run tests

Install dependencies:

```bash
npm install
```

Run the full suite in all configured browser projects (Chromium, Firefox, and WebKit):

```bash
npx playwright test
```

Run a feature folder in Chromium:

```bash
npx playwright test tests/cart --project=chromium
```

Run a single spec:

```bash
npx playwright test tests/inventory/sorting.spec.ts --project=chromium
```

Open the latest HTML report:

```bash
npx playwright show-report
```

Tests access the live SauceDemo site, so they require network access and may be affected by changes or outages of that external service.

## Coverage

- Authentication: valid and invalid credentials, locked accounts, logout, and browser history.
- Inventory: product details and inventory sorting in both directions by name and price.
- Cart: adding/removing items, retained contents, empty-cart behavior, and the lack of quantity editing.
- Checkout: required customer fields, order totals, cancellation, and order completion.

![Playwright Test Report](playwright-report.png)
