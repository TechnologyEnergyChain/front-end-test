export interface Game {
    id: string;
    attemptsLeft: number;
    status: GameStatus;
    wordToGuess: string;
    guesses: Result[];
}

export interface Result {
    guessWord: string;
    result: string;
}

export enum GameStatus {
    PLAYING = 0,
    WIN = 1,
    LOSS = 2,
}
