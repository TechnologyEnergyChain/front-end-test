export interface Guess {
    result: string;
    attemptsLeft: number;
    isGameWon: boolean;
}

export interface GuessIntent {
    gameId: string;
    guessWord: string;
}
