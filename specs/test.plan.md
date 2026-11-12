# SauceDemo UI Regression and Edge-Case Test Plan

## Application Overview

# Purpose and scope
This plan is based on the current repository and the publicly accessible SauceDemo application identified in `README.md` (`https://www.saucedemo.com/`). The live login page was inspected: it exposes Username and Password fields, a Login button, and documents the public demo accounts/password. Authenticated behavior and detailed expected results are derived from the project’s existing Playwright tests and its stated SauceDemo scenarios; this plan is not a claim that every planned case was executed against the live site.

## Starting-state assumptions
Every scenario is independent and begins in a fresh browser context with no prior test state. Navigate to the base URL at the beginning of each scenario. Unless a test explicitly covers another account, use the public `standard_user` demo account and the password displayed by the demo site. Build all cart/checkout prerequisites within that scenario; do not rely on state left by another test. For checkout validation, add one known product and navigate through Cart to Checkout. Do not rely on persistence across browser contexts.

## Existing coverage considered
Executable tests are organized under `tests/authentication`, `tests/inventory`, `tests/cart`, and `tests/checkout`. They cover valid and invalid login, locked accounts and logout history; inventory content, product details and all four sort options; cart additions, removals, empty-cart behavior, retained contents and quantity-edit limitations; and checkout validation, totals, cancellation and order completion. The plan below maps scenarios to those suites and describes the intended assertions.

## Project and execution constraints
The project uses `@playwright/test` and TypeScript. `playwright.config.ts` targets `tests` and configures Desktop Chromium, Firefox, and WebKit. There is no `baseURL` or local web server, so tests navigate to SauceDemo directly. Tests depend on the external site and network availability; browser/platform variations or changes to the demo may affect results.

## Suggested execution
Run each scenario separately during diagnosis, then run the suite in the configured browser projects. Treat a failed assertion as a product/test failure; treat inability to load the external site as an environment limitation. Record the browser, URL, and observed message/state for failures.

## Test Scenarios

### 1. Authentication and session

#### 1.1. Valid standard-user login opens the inventory

**File:** `tests/authentication/login-positive.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://www.saucedemo.com/ and verify the login form is shown.
    - expect: Username and Password fields and the Login button are available.
  2. Enter the documented standard_user credentials and activate Login.
    - expect: The browser navigates to the inventory/products page.
    - expect: The page identifies itself as Products and displays the inventory.

#### 1.2. Login validates missing credentials and field priority

**Files:** `tests/authentication/login-required-fields.spec.ts`, `tests/authentication/login-negative.spec.ts`

**Steps:**
  1. In a fresh context, submit the login form with both fields empty.
    - expect: Login is rejected and an inline error indicates that Username is required.
  2. Clear the error if necessary, enter a valid username only, and submit.
    - expect: Login is rejected and an inline error indicates that Password is required.
  3. Clear the form, enter a password only, and submit.
    - expect: Login is rejected and an inline error indicates that Username is required.

#### 1.3. Unknown user and incorrect password are rejected

**Files:** `tests/authentication/login-unknown-user.spec.ts`, `tests/authentication/login-negative.spec.ts`

**Steps:**
  1. In a fresh context, submit an unrecognized username with the public demo password.
    - expect: The user remains on the login page and sees a credential error; no authenticated inventory is shown.
  2. In a fresh context, submit standard_user with an incorrect password.
    - expect: The user remains on the login page and sees the invalid-credentials error.

#### 1.4. Locked-out account cannot enter the inventory

**File:** `tests/authentication/locked-user.spec.ts`

**Steps:**
  1. In a fresh context, submit the documented locked_out_user account and public demo password.
    - expect: Login is rejected with a locked-out account message.
    - expect: The inventory page is not opened.

#### 1.5. Logout ends the session and browser history does not restore authenticated access

**File:** `tests/authentication/logout-history.spec.ts`

**Steps:**
  1. In a fresh context, log in as standard_user, open the navigation menu, and choose Logout.
    - expect: The login form is displayed and authenticated inventory content is no longer visible.
  2. Use browser Back once after logout.
    - expect: The user is not granted an active authenticated session; verify current behavior and record any redirect or access restriction.
    - expect: No authenticated purchase action can be completed without logging in again.

### 2. Inventory, product details, and sorting

#### 2.1. Inventory renders the expected products and actionable controls

**File:** `tests/inventory/inventory-content.spec.ts`

**Steps:**
  1. In a fresh context, log in as standard_user and inspect the inventory page.
    - expect: The Products heading is visible.
    - expect: Six inventory items are rendered.
    - expect: Each item has a name, description, price, image, and add-to-cart action.
    - expect: The cart link is available and the initial cart badge is absent.

#### 2.2. Product details show the selected item and return to inventory

**File:** `tests/inventory/product-details.spec.ts`

**Steps:**
  1. Log in as standard_user and open the Sauce Labs Backpack details from the inventory list.
    - expect: The details page identifies Sauce Labs Backpack and shows its description, image, and price.
  2. Use the page Back to products control.
    - expect: The inventory page is restored and the selected product remains accessible.

#### 2.3. All four inventory sort options produce the requested order

**File:** `tests/inventory/sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and select Name (A to Z) in the product sort control.
    - expect: Displayed names are in ascending alphabetical order.
  2. Select Name (Z to A).
    - expect: Displayed names are in descending alphabetical order.
  3. Select Price (low to high).
    - expect: Displayed numeric prices are nondecreasing.
  4. Select Price (high to low).
    - expect: Displayed numeric prices are nonincreasing.

### 3. Cart and shopping navigation

#### 3.1. Adding multiple products updates cart count and item actions

**File:** `tests/cart/cart-positive.spec.ts`

**Steps:**
  1. Log in as standard_user, add Sauce Labs Backpack, then add Sauce Labs Bike Light.
    - expect: The cart badge updates to 1 after the first add and 2 after the second.
    - expect: Each added product action changes to a remove action.

#### 3.2. Cart contents match additions and removing one item updates the cart

**File:** `tests/cart/cart-positive.spec.ts`

**Steps:**
  1. Log in, add Backpack and Bike Light, and open the cart.
    - expect: Both selected product names, quantities, and prices are present in the cart.
    - expect: The cart badge reflects two items.
  2. Remove Backpack from the cart.
    - expect: Backpack is absent and Bike Light remains.
    - expect: The cart badge reflects one remaining item.

#### 3.3. Removing every cart item leaves an empty cart

**File:** `tests/cart/cart-positive.spec.ts`

**Steps:**
  1. Log in, add two different products, open the cart, and remove both.
    - expect: No cart item rows remain.
    - expect: The cart badge is absent.
    - expect: The cart page remains usable and does not retain removed products.

#### 3.4. Continue shopping returns to inventory without losing cart contents

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Log in, add Backpack, open the cart, and choose Continue Shopping.
    - expect: The inventory page is displayed.
    - expect: The cart badge still reflects the Backpack.
  2. Reopen the cart.
    - expect: Backpack remains in the cart exactly once.

### 4. Checkout and order completion

#### 4.1. Checkout requires each customer information field

**File:** `tests/checkout/checkout-validation.spec.ts`

**Steps:**
  1. In a fresh context, log in, add one product, open the cart, and select Checkout. Leave all fields blank and submit Continue.
    - expect: Checkout does not advance and reports First Name is required.
  2. In a fresh context, enter only a last name and postal code, then submit Continue.
    - expect: Checkout does not advance and reports First Name is required.
  3. In a fresh context, enter only a first name and postal code, then submit Continue.
    - expect: Checkout does not advance and reports Last Name is required.
  4. In a fresh context, enter first and last names but leave postal code blank, then submit Continue.
    - expect: Checkout does not advance and reports Postal Code is required.

#### 4.2. Checkout overview totals are coherent and Cancel preserves the cart

**File:** `tests/checkout/overview.spec.ts`

**Steps:**
  1. In a fresh context, log in, add two products, open Cart, and proceed to Checkout. Enter valid customer information and continue.
    - expect: The overview shows the same two products and their prices.
    - expect: Item total equals the sum of listed item prices; tax and order total are displayed and total equals item total plus tax.
  2. Select Cancel from checkout overview.
    - expect: The user returns to the inventory page; reopening the cart shows both products still present.
    - expect: The cart badge remains consistent.

#### 4.3. Canceling checkout information returns to the cart

**File:** `tests/checkout/cancel-information.spec.ts`

**Steps:**
  1. In a fresh context, log in, add one product, open the cart, and start Checkout.
    - expect: The checkout information form is displayed.
  2. Select Cancel.
    - expect: The cart page is shown and the product remains in the cart.

#### 4.4. An empty cart has no items or item actions

**File:** `tests/cart/cart-negative.spec.ts`

**Steps:**
  1. In a fresh context, log in and open the cart without adding products.
    - expect: The cart contains no item rows and no nonzero cart badge.
  2. Inspect the cart for item-specific controls.
    - expect: No remove action or quantity value is shown for an absent product.

#### 4.5. Completing checkout confirms the order and clears the cart

**File:** `tests/checkout/order-completion.spec.ts`

**Steps:**
  1. In a fresh context, log in, add one product, open Cart, and start Checkout.
    - expect: The checkout information form is displayed.
  2. Enter non-empty first name, last name, and postal code; continue, review the order, then select Finish.
    - expect: The order completion page displays the success confirmation.
    - expect: The order is not left in an active checkout state.
  3. Use the available return-to-products action and inspect the cart.
    - expect: The inventory page is available.
    - expect: The completed order's cart is empty and no stale cart badge remains.
