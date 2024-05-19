// cypress/support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to intercept a guess request
     * @example cy.interceptGuess('mente', 'mente.json')
     */
    interceptGuess(word: string, fixture: string): Chainable<void>;
  }
}
