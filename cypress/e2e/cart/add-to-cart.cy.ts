import { Login } from "../../support/pages/login";
import { Products } from "../../support/pages/products";

const login = new Login();
const products = new Products();
let sotckValuePlusOne;
let stock;

describe("Cart Tests- Happy path", () => {
  // before(() => {
  //   cy.wait(20000);
  //   cy.task("exec", "docker compose up --build");
  // });

  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
  });

  it("Should add a product to the cart", () => {
    cy.get(products.buttonAdd).click();
    cy.get(products.cartCount).should("have.text", "1");
    cy.get(products.cartTotal).should("have.text", "199,90");
  });

  it("Should add multiple different products to the cart", () => {
    cy.get('[data-id="1"]').click();
    cy.get('[data-id="2"]').click();
    cy.get('[data-id="3"]').click();
    cy.get(products.cartCount).should("have.text", "3");
    cy.get(products.cartTotal).should("have.text", "598,40");
  });

  it("Should allow adding more than one unit of the same product", () => {
    cy.get("span.stock")
      .eq(0)
      .invoke("text")
      .then((fullText) => {
        const stockArray = fullText.split(": ");
        sotckValuePlusOne = Number(stockArray[1]) - 1;
        cy.get(products.inputQnt).clear();
        cy.get(products.inputQnt).type(sotckValuePlusOne);
        cy.get(products.buttonAdd).click();
        const stockString = String(sotckValuePlusOne);
        cy.get(products.cartCount).should("have.text", stockString);
      });
  });

  it("The cart total should be zero upon initialization", () => {
    cy.get(products.cartCount).should("have.text", "0");
  });
});

describe("Cart tests- Negatice Scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
  });

  after(() => {
    cy.task("exec", "docker compose up --build");
    cy.wait(20000);
  });

  it("Should not allow adding more products to the cart than available in stock", () => {
    cy.get("span.stock")
      .eq(0)
      .invoke("text")
      .then((fullText) => {
        const stockArray = fullText.split(": ");
        sotckValuePlusOne = Number(stockArray[1]) + 1;
        cy.get(products.inputQnt).clear();
        cy.get(products.inputQnt).type(sotckValuePlusOne);
        cy.get(products.buttonAdd).click();
        cy.on("window:alert", (alertText) => {
          expect(alertText).to.include("Quantidade indisponível. Estoque:");
        });
      });
  });

  // BUG: The stock count doesn't update after a purchase is completed. The user shouldn't have to reload the page to see the change.
  //BUG: The user should not need to logout after finalizing the purchase
  it("Should disable the 'Add' button for out-of-stock products", () => {
    cy.get(products.stock)
      .eq(0)
      .invoke("text")
      .then((fullText) => {
        const stockArray = fullText.split(": ");
        stock = Number(stockArray[1]);
        cy.get(products.inputQnt).clear();
        cy.get(products.inputQnt).type(stock);
        cy.get(products.buttonAdd).click();
        cy.get(products.buttonCheckoutPurchase).click();
        cy.reload();
        cy.get(products.buttonOutOfStock).should("exist");
      });
  });
});
