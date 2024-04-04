export type Guess = {
    result: string;
    attemptsLeft: number;
    isGameWon: boolean;
};

export type GuessIntent = {
    gameId: string;
    guessWord: string;
};
