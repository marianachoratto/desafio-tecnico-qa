# BIX Mini E-commerce 

<img width="751" height="303" alt="image" src="https://github.com/user-attachments/assets/34bb9943-3e4e-43b3-83f6-312c4a996ee4" />

# 🧪 E-commerce QA Test Suite

This repository contains the automated test suite for the "Desafio Técnico QA" project. The goal of these tests is to ensure the quality, reliability, and functionality of the e-commerce application's core features, from user authentication to final purchase.

-----

## 🚀 Features Under Test

The test cases are organized by application functionality and cover both positive and negative scenarios.

### **Authentication (Login & Logout)**

  * ✅ Should allow a user with valid credentials to log in.
  * ✅ Should keep the user logged in after a page reload.
  * ✅ Should log the user out when they click the 'Logout' button.
  * ❌ Should not allow login with an incorrect password.
  * ❌ Should not allow login with a non-existent email.

### **Shopping Cart Management**

  * ✅ Should add a product to the cart.
  * ✅ Should add multiple different products to the cart.
  * ✅ Should allow adding more than one unit of the same product.
  * ✅ The cart total should be zero for a new session.
  * ✅ Should disable the 'Add' button for out-of-stock products.
  * ❌ Should not allow adding more products to the cart than available in stock.
  * ❌ Should not allow completing the purchase with an empty cart.

### **Coupon & Discount Logic**

  * ✅ Should correctly apply a 10% discount coupon.
  * ✅ Should correctly apply a 20% discount coupon.
  * ✅ Should correctly apply a 50% discount coupon.
  * ❌ Should not apply an invalid or expired coupon.
  * ❌ Should not allow the same coupon to be applied twice.
  * ❌ Should not allow a coupon to be applied to an empty cart.

### **Checkout Process**

  * ✅ Should complete the purchase successfully with items in the cart.

-----

## 🔧 Technologies Used

  * **Framework:** `Cypress e Docker`
  * **Language:** `JavaScript, TypeScript`

-----

## ⚙️ How to Run the Tests

To run the tests locally, please follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/marianachoratto/desafio-tecnico-qa.git
    cd desafio-tecnico-qa
    ```

2.  **Install dependencies and docker:**

    ```bash
    npm install
    docker compose up --build
    ```

3.  **Run the test suite:**

    ```bash
    npx cypress open
    npx cypress run (for running all the tests in terminal)
    ```
