Cypress.Commands.add('getStore', () => { 
  cy.window().its('store');
});

Cypress.Commands.add('login', (username, pwd) => { 
  cy.get("#username").type(username);
  cy.get("#password").type(pwd);
  cy.get("#kc-login").click();
  cy.visit("/");
  cy.wait(4000);
});

Cypress.Commands.add('logout', (url) => {
  cy.window().then(win => win.location.href = url);
});

Cypress.Commands.add('checkCartItems', (whiteListItems, blackListItems, checkWhiteListDocs, checkBlackListDocs) => { 
  
  cy.getStore().invoke('getState').its("cart").should('have.keys', ['cartBlacklist', 'cartWhitelist']);   
  cy.getStore().invoke('getState').its("cart").its("cartBlacklist").should("have.length", blackListItems.length);  
  cy.getStore().invoke('getState').its("cart").its("cartWhitelist").should("have.length", whiteListItems.length);

  // Compare blacklist elements stored in redux-store against provided blacklistItems.
  if(checkBlackListDocs) {
    blackListItems.map( (el, index) => {
      cy.getStore().invoke('getState').its("cart").its("cartBlacklist").its(index).should('deep.include', el);
    })
  }

  // Compare whitelist elements stored in redux-store against provided whitelistItems.
  if(checkWhiteListDocs) {
    whiteListItems.map( (el, index) => {
      cy.getStore().invoke('getState').its("cart").its("cartWhitelist").its(index).should('deep.include', el);
    }) 
  }

});
