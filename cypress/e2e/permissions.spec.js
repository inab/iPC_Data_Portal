import "cypress-localstorage-commands";
import { addItem } from '../../src/Redux/cart/cart.actions.js';

describe("Stories: Permissions-API - Authenticated users can add items to the cart and documents are automatically assigned to the whitelist/blacklist based on user file permissions.", () => {
    beforeEach(() => {
        cy.visit("/");
        // Login as a regular user.
        cy.login(Cypress.env("regularUsername"), Cypress.env("regularUserPassword"));
        // Setting process.env.REACT_APP_AUTH_URL -> Cypress should be able to read these values when calling async Redux action (Cypress bug?)
        process.env.REACT_APP_AUTH_URL = Cypress.config("auth-url");
        // Now read both whitelist and blacklist items.
        cy.fixture("completeWhitelist").as("whitelistItems")
        cy.fixture("completeBlacklist").as("blacklistItems")
    });

    afterEach(() => {
        cy.logout(Cypress.env("logoutUrl"));
    });

    it("CASE I: Items assigned to the whitelist: 1 public dataset AND 1 file with granted access", function () {
        // A. Mock documents selection (Redux async action (thunk): addItem) - They will be added to the cartWhitelist AFTER checking user file permissions on Permissions-API.
        cy.wait(5000);
        cy.getStore().then(store => store.dispatch(addItem(this.whitelistItems)));
        cy.wait(5000);
        // B. Check if both items have been added to the whitelist.
        cy.checkCartItems(this.whitelistItems, [], true, false);
        // C. Visit the Data Management section and wait until elements are rendered.
        cy.visit("/explore", { timeout: 10000 })
        // D. Check if UI elements corresponds to the expected ones.
        cy.get('.btn.btn-success').contains("Load to VRE");
        cy.get('.btn.btn-warning').should("not.exist");
    })

    it("CASE II: Items assigned to the blacklist - 1 private dataset with no granted access", function () {
        // A. Mock documents selection (Redux async action (thunk): addItem) - It will be added to the cartBlacklist AFTER checking user file permissions on Permissions-API.
        cy.wait(5000);
        cy.getStore().then(store => store.dispatch(addItem(this.blacklistItems)));
        cy.wait(5000);
        // B. Check if the item has been added to the blacklist.
        cy.checkCartItems([], this.blacklistItems, false, true);
        // C. Visit the Data Management section and wait until elements are rendered.
        cy.visit("/explore", { timeout: 5000 })
        // D. Check if UI elements corresponds to the expected ones.
        cy.get('.btn.btn-success').should("not.exist")
        cy.get('.btn.btn-warning').contains("Request Access");
    })

    it("CASE III: Items assigned to the whitelist/blacklist - 1 public dataset & 2 private datasets ungranted/granted access", function () {
        // A. Mock documents selection (Redux async action (thunk): addItem) - It will be added to the cartBlacklist AFTER checking user file permissions on Permissions-API.
        cy.wait(5000);
        cy.getStore().then(store => store.dispatch(addItem([...this.whitelistItems, this.blacklistItems]));
        cy.wait(5000);
        // B. Check if the item has been added to the blacklist.
        cy.checkCartItems(this.whitelistItems, this.blacklistItems, true, true);
        // C. Visit the Data Management section and wait until elements are rendered.
        cy.visit("/explore", { timeout: 5000 })
        // D. Check if UI elements corresponds to the expected ones.
        cy.get('.btn.btn-success').contains("Load to VRE");
        cy.get('.btn.btn-warning').contains("Request Access");
    })

})
