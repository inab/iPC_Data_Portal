import "cypress-localstorage-commands";

describe("Stories: Catalogue selections - Authenticated users are able to POST/DELETE whitelisted cart elements to/from the Outbox-API.", () => {

    beforeEach( () => {
        cy.visit("/");
        // Login as a regular user.
        cy.login(Cypress.env("regularUsername"), Cypress.env("regularUserPassword"));
        // Read JSON test file.
        cy.fixture("partialWhitelist").then((whitelistItem) => {
            // Mock item selection (Redux action: ADD_ITEM_TO_WHITELIST) and push to the cart whitelist.
            cy.getStore().then(store => {
                store.dispatch({ type: "ADD_ITEM_TO_WHITELIST", payload: whitelistItem });
            });
            // Then, visit the Data Management section and wait until elements are rendered.
            cy.visit("/explore", { timeout : 5000 })
            // Finally, check if the document has been added to the cart whitelist. 
            cy.checkCartItems(whitelistItem, [], true, false);
        })
    })

    it("Check if a regular user is able to POST selections to the Outbox API, and then, check if its able to DELETE it", () => {
        // A. POST document to the Outbox API via "Load to VRE" card button.
        cy.get('.btn.btn-success').contains("Load to VRE").click();
        // B. Check on the VRE tab if the document has been imported - new card (succeed), and then, click "Unload data" button in order to undo the operation (REMOVE).
        cy.get('#react-tabs-2').click();
        cy.get('.btn.btn-danger').contains("Unload data").click();
        // C. Go back to the initial tab, and check if the initial document (card) has been changed from loaded to unloaded state (initial state).
        cy.get('#react-tabs-0').click();
        cy.get('.btn.btn-success').contains("Load to VRE");
    })
});