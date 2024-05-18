/// <reference types="cypress" />

describe("Teste de Login", function () {
  it("Realiza login na aplicação", function () {
    cy.visit("https://comfy-capybara-03665d.netlify.app");

    cy.get("input[name=email]").type("cliente@youdrive.com");
    cy.get("input[name=password]").type("password");

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/home");
  });
});
