import '../support/commands';

describe('Game tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/game', {
      fixture: 'gameStart.json',
    }).as('startGame');
    cy.visit('/');
    cy.wait('@startGame');
  });

  it('Visits the initial project page', () => {
    cy.contains('h1', 'Gaba Wordle');
  });

  it('Should show popup on game start', () => {
    cy.get('.toast').should('be.visible');
  });

  it('Should write letters with text when user writes', () => {
    cy.get('body').type('mente');
    cy.get('.letter').should('have.length', 5);
  });

  it('Should paint red letters when user writes wrong word', () => {
    cy.interceptGuess('mente', 'mente.json');
    cy.get('body').type('mente{enter}');
    cy.wait('@menteGuess');
    cy.get('.letter__wrapper.incorrect').should('have.length', 5);
  });

  it('Should show warning toast on duplicate word', () => {
    cy.interceptGuess('mente', 'mente.json');
    cy.get('body').type('mente{enter}');

    cy.wait('@menteGuess');

    cy.get('.letter__wrapper.incorrect').should('have.length', 5);
    cy.get('body').type('mente{enter}');

    cy.get('.toast.warning-toast').should('be.visible');
  });

  it('Should show yellow letters when user writes correct letters in wrong order', () => {
    cy.interceptGuess('aureo', 'aureo.json');

    cy.get('body').type('aureo{enter}');
    cy.wait('@aureoGuess');
    cy.get('.letter__wrapper.wrongPlace').should('have.length', 3);
  });

  it('Should show green letters when user writes correct letters in correct order', () => {
    cy.interceptGuess('molar', 'molar.json');

    cy.get('body').type('molar{enter}');
    cy.wait('@molarGuess');
    cy.get('.letter__wrapper.correct').should('have.length', 4);
  });

  it('Should show win toast when user wins', () => {
    cy.interceptGuess('solar', 'solar.json');

    cy.get('body').type('solar{enter}');
    cy.wait('@solarGuess');
    cy.get('.letter__wrapper.correct').should('have.length', 5);

    cy.get('.toast.success-toast').should('be.visible');
  });

  it('Should change theme', () => {
    cy.get('.theme__button').should('be.visible').click();
    cy.get('body').should('have.class', 'dark');
  });

  it('Should show virtual keyboard and write with it', () => {
    cy.get('.simple-keyboard ').should('be.visible');
    cy.get('.hg-standardBtn').should('be.visible').first().click();

    cy.get('.letter').should('have.length', 1);
  });
});
