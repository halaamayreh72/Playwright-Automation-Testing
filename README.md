# Playwright Automation Testing Project
## About the Project
This project is a practical UI Automation Testing project using Playwright with TypeScript.
The project tests the main functionalities of the SauceDemo website.
Website: https://www.saucedemo.com/
## Tools & Technologies
- Playwright
- TypeScript
- Node.js
- Visual Studio Code
- Git & GitHub
## Test Scenarios
### 1. Login Testing
- Login with valid credentials
- Login with invalid password
- Login with empty username
- Login with empty password
- Locked out user login
### 2. Products Testing
- Verify products page title
- Verify products count
- Verify product names
- Open product details
- Verify product price
### 3. Sorting Testing
- Sort products by price (Low to High)
- Sort products by price (High to Low)
- Sort products by name (A to Z)
### 4. Cart Testing
- Add product to cart
- Verify product in cart
- Remove product from cart
- Remove all products from cart
- Continue shopping
### 5. Checkout Testing
- Complete checkout successfully
- Checkout with empty first name
- Checkout with empty last name
- Checkout with empty postal code
- Cancel checkout
### 6. Logout Testing
- Logout successfully
## How to Run the Tests
Install dependencies:
```bash
npm install
```
Run all tests:
```bash
npx playwright test
```
Run a specific test file:
```bash
npx playwright test tests/sorting.spec.ts
```
Run tests with browser visible:
```bash
npx playwright test --headed
```
Open HTML report:
```bash
npx playwright show-report
```
## Learning Goals
- Practice UI Automation Testing
- Write positive and negative test cases
- Use Playwright locators and assertions
- Validate application behavior
- Generate automated test reports
## Project Status
Completed as a hands-on learning project.