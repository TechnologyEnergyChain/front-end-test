export type GuessEntity = {
    result: string;
    attemptsLeft: number;
    isGameWon: boolean;
};

export type GuessIntent = {
    gameId: string;
    guessWord: string;
};
