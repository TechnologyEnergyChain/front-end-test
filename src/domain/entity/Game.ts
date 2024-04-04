export type GameEntity = {
    gameId: string;
    attemptsLeft: number;
    status: GameStatus;
    wordToGuess: string;
    guesses: Result[];
};

export enum GameDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
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
