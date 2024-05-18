Cypress.Commands.add('interceptGuess', (word, fixture) => {
  cy.intercept(
    'POST',
    `http://localhost:3000/game/2/guess?guessWord=${word.toUpperCase()}`,
    {
      fixture: fixture,
    }
  ).as(`${word}Guess`);
});
