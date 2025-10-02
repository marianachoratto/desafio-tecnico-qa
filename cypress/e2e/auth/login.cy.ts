import { Login } from "../../support/pages/login";
import { Interception } from "cypress/types/net-stubbing";

const login = new Login();
const userAdmin = "admin@test.com";
const userTest = "user@test.com";
const password = Cypress.env("passwordUser");

describe("Login tests- Happy path", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should allow a user with valid credentials to log in", () => {
    cy.intercept("POST", "/api/login").as("login");
    cy.get(login.inputEmail).type(userTest);
    cy.get(login.inputPassword).type(password);
    cy.get(login.buttonLogin).click();
    cy.wait("@login").then((res: Interception) => {
      expect(res.response.statusCode).to.equal(200);
      cy.contains("Regular User").should("be.visible");
    });
  });

  it("Should keep the user logged in after a page reload", () => {
    cy.intercept("POST", "/api/login").as("login");
    cy.get(login.inputEmail).type(userTest);
    cy.get(login.inputPassword).type(password);
    cy.get(login.buttonLogin).click();
    cy.wait("@login");
    cy.reload();
    cy.contains("Regular User").should("be.visible");
  });

  // TODO: See if clients and user permissions are the same
});

describe("Login tests- negative scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should not allow login with an incorrect password", () => {
    cy.intercept("POST", "/api/login").as("login");
    cy.get(login.inputEmail).type(userTest);
    cy.get(login.inputPassword).type("oi");
    cy.get(login.buttonLogin).click();
    cy.wait("@login").then((res: Interception) => {
      expect(res.response.statusCode).to.equal(401);
      cy.get(login.buttonLogin).should("exist");
    });
  });

  it("Should not allow login with a non-existent email", () => {
    cy.intercept("POST", "/api/login").as("login");
    cy.get(login.inputEmail).type("qualqueremail@gmail.com");
    cy.get(login.inputPassword).type(password);
    cy.get(login.buttonLogin).click();
    cy.wait("@login").then((res: Interception) => {
      expect(res.response.statusCode).to.equal(401);
      cy.get(login.buttonLogin).should("exist");
    });
  });
});
