export class Products {
  buttonAdd = '[data-id="1"]';
  inputQnt = "#qty-1";
  cartCount = "span#cart-count";
  cartTotal = "span#cart-total";
  productList = "#product-list";
  productInfo = ".product-info";
  stock = ".stock";
  buttonOutOfStock = "button:disabled";
  subTotal = "span#subtotal";
  finalTotal = "span#final-total";
  buttonCheckoutPurchase = "#checkout-btn";
  jsonResult = "#result";

  AddKeyboardToCart() {
    cy.get(this.buttonAdd).click();
  }
}
