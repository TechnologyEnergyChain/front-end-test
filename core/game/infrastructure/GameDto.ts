export type GameDto = {
    gameId: string,
    status: number,
    attemptsLeft: number,
    wordToGuess: string,
    guesses: {guessWord:string, result:string}[]
}