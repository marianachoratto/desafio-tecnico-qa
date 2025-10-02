import { Login } from "../../support/pages/login";
import { Coupons } from "../../support/pages/coupons";
import { Products } from "../../support/pages/products";

const login = new Login();
const coupon = new Coupons();
const products = new Products();

describe("Full-checkout Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    login.DoLogin();
  });
  it("Should complete the purchase successfully", () => {
    cy.get(products.buttonAdd).click();
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
    cy.get(products.buttonCheckoutPurchase).click();
    cy.get(products.jsonResult).should("exist");
  });
});
