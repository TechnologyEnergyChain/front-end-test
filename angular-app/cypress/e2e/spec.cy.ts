import {GameBoard} from "../../../core/game/domain/entities/GameBoard";


describe('The app runs', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
  })

  it('The board is printed', () => {
    cy.visit('/')
    cy.get('li').should('have.length', GameBoard.ROWS * GameBoard.COLUMNS)
  })
})
