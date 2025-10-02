export class Login {
  inputEmail = "#email";
  inputPassword = "#password";
  buttonLogin = 'button[id="login-btn"]';
  buttonLogout = "#logout-btn";
  userAdmin = "admin@test.com";
  userTest = "user@test.com";
  password = Cypress.env("passwordUser");

  DoLogin() {
    cy.get(this.inputEmail).type(this.userTest);
    cy.get(this.inputPassword).type(this.password);
    cy.get(this.buttonLogin).click();
  }
}
