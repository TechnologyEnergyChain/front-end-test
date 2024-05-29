import {normalizeWord} from "../../../core/common/helpers/normalizeWord";

describe("Keydown event", () => {
  it('can write the word SOLAR', () => {
    cy.visit('/')

    cy.wrap(['S', 'O', 'L', 'A', 'R']).each((letter) => {
      cy.get("body").type(letter)
      cy.get('li.has-letter').last().should('contain.text', normalizeWord(letter))
    })

    // cy.get("body").type('{enter}')
  })

  it('can press enter to execute the guess submit', () => {
    cy.visit('/')

    cy.wrap(['S', 'O', 'L', 'A', 'D']).each((letter) => {
      cy.get("body").type(letter)
      cy.get('li.has-letter').last().should('contain.text', normalizeWord(letter))
    })

    cy.get("body").type('{enter}')
  })
})
