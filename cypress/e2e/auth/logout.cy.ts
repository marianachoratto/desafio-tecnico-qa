import { should } from "chai";
import { Login } from "../../support/pages/login";

const login = new Login();
const userAdmin = "admin@test.com";
const userTest = "user@test.com";
const password = Cypress.env("passwordUser");

describe("Logout tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should log out when the user click in sair button", () => {
    cy.intercept("POST", "/api/logout").as("logout");
    cy.get(login.inputEmail).type(userTest);
    cy.get(login.inputPassword).type(password);
    cy.get(login.buttonLogin).click();
    cy.get(login.buttonLogout).should("exist");
    cy.get(login.buttonLogout).click();
    cy.wait("@logout").then((res) => {
      expect(res.response.statusCode).to.equal(200);
      cy.get(login.inputEmail).should("exist");
    });
  });
});
