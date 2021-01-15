/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.resetDB();
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it("Should have 3 sample notes when first loaded", () => {
    cy.get("ul > li").should("be.length", 3);
  });

  // 1. Please finish this test
  it("Should be able to add note and delete note", () => {});
  // 2. Please finish this test
  it("Max 10 notes allowed - show error message when users want to add more", () => {});
});
