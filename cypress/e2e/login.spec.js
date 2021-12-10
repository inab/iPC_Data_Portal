import "cypress-localstorage-commands";

describe("Stories: Login - A user fill in the login form, and it is able to navigate through the portal with the proper role.", () => {
    beforeEach( () => {
      cy.visit('/');
    });
    afterEach( () => {
      cy.logout(Cypress.env("logoutUrl"));
    });
    it("Login and check this is a regular user", () => {
        cy.login(Cypress.env("regularUsername"), Cypress.env("regularUserPassword"));
        cy.getLocalStorage("role").should("equal", "user");
    })
    it("Login and check this is an admin user", () => {
        cy.login(Cypress.env("adminUsername"), Cypress.env("adminUserPassword"));
        cy.getLocalStorage("role").should("equal", "admin");
    })
});
