import {GameId, GameIdIsNotDefinedException, isGameIdDefined} from "./GameId";
import {GameStatus} from "./GameStatus";
import {Guess} from "../../../guess/domain/entities/GuessModel";
import {GameGuesses, GameGuessesWordUsedException, isWordOnGuessList} from "./GameGuesses";


export interface GameModel {
    id: GameId
    status?: GameStatus
    attempts?: number
    wordToGuess?: string
    guesses?: Guess[]
}

export class Game implements GameModel {
    id: GameId;
    attempts?: number;
    guesses?: GameGuesses;
    status?: GameStatus;
    wordToGuess?: string;

    constructor({id, status, attempts, wordToGuess, guesses}: GameModel) {
        this.id = id
        this.status = status ?? GameStatus.IN_PROGRESS
        this.attempts = attempts
        this.wordToGuess = wordToGuess
        this.guesses = guesses ?? []
    }

    ensureGameIsValid() {
        if (!isGameIdDefined(this.id)) {
            throw GameIdIsNotDefinedException()
        }
    }

    ensureWordHasNotBeenUsed(word: string) {
        if (isWordOnGuessList(word, this.guesses)) {
            throw GameGuessesWordUsedException(word)
        }
    }
}

