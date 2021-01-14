/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Should send execute something on node", () => {
    cy.resetDB();
  });

  it("Add notes button", () => {
    cy.get("div > :nth-child(4)").should("be.enabled");
  });
});
