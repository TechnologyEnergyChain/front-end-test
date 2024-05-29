import { Guess } from "./guess.model";

export enum GameStatus {
    InProgress = 0,
    Victory = 1,
    Defeat = 2
}

export interface Game {
    gameId: string;
    status: GameStatus;
    wordToGuess: string;
    guesses: Guess[];
}