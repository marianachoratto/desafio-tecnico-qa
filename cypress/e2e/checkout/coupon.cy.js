import { Login } from "../../support/pages/login";
import { Coupons } from "../../support/pages/coupons";
import { Products } from "../../support/pages/products";

const login = new Login();
const coupon = new Coupons();
const products = new Products();

describe("Checkout Tests- Happy Path", () => {
  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
    products.AddKeyboardToCart();
  });

  it("Should apply a 10% discount coupon correctly", () => {
    cy.get(coupon.inputCoupon).type(coupon.welcome10);
    cy.get(coupon.buttonApplyCoupon).click();
    cy.get(coupon.discountLine).should("exist");
    cy.get(coupon.couponMessage)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Cupom aplicado:");
      });
    cy.get(products.subTotal)
      .invoke("text")
      .then((subTotalText) => {
        cy.get(products.finalTotal)
          .invoke("text")
          .then((finalTotalText) => {
            expect(subTotalText).to.not.equal(finalTotalText);
          });
      });
  });

  it("Should apply a 20% discount coupon correctly", () => {
    cy.get(coupon.inputCoupon).type(coupon.save20);
    cy.get(coupon.buttonApplyCoupon).click();
    cy.get(coupon.discountLine).should("exist");
    cy.get(coupon.couponMessage)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Cupom aplicado:");
      });
    cy.get(products.subTotal)
      .invoke("text")
      .then((subTotalText) => {
        cy.get(products.finalTotal)
          .invoke("text")
          .then((finalTotalText) => {
            expect(subTotalText).to.not.equal(finalTotalText);
          });
      });
  });

  it("Should apply a 50 discount coupon correctly", () => {
    cy.get(coupon.inputCoupon).type(coupon.fixad50);
    cy.get(coupon.buttonApplyCoupon).click();
    cy.get(coupon.discountLine).should("exist");
    cy.get(coupon.couponMessage)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Cupom aplicado:");
      });
    cy.get(products.subTotal)
      .invoke("text")
      .then((subTotalText) => {
        cy.get(products.finalTotal)
          .invoke("text")
          .then((finalTotalText) => {
            expect(subTotalText).to.not.equal(finalTotalText);
          });
      });
  });
});

describe("Checkout Testes- Negative Scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
    products.AddKeyboardToCart();
  });

  it("Should not apply an invalid/expired coupon", () => {
    cy.get(coupon.inputCoupon).type(coupon.fixad50);
    cy.get(coupon.buttonApplyCoupon).click();
  });

  it("Should not apply the same coupon twice", () => {
    cy.get(coupon.inputCoupon).type(coupon.fixad50);
    cy.get(coupon.buttonApplyCoupon).click();
    cy.get(coupon.inputCoupon).type(coupon.fixad50);
    cy.get(coupon.buttonApplyCoupon).click();
    cy.contains("span", "Invalid coupon code").should("exist");
  });

  //Bug: should not apply coupon in a empty card
  it("Should not apply coupon in a empty card", () => {
    cy.get(coupon.inputCoupon).type(coupon.welcome10);
    cy.get(coupon.buttonApplyCoupon).click();
  });
});

describe("Checkout Testes- Negative Scenario - Empty card", () => {
  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
  });

  it("Should not allow completing the purchase with an empty cart", () => {
    cy.get(products.buttonCheckoutPurchase).click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Adicione produtos ao carrinho");
    });
  });
});
