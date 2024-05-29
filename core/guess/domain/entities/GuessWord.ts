import {GameBoard} from "../../../game/domain/entities/GameBoard";
import {DataException} from "../../../common/domain/DataException";

export type GuessWord = string

export enum GuessWordException {
    UNDEFINED = 'GuessWordIsNotDefinedException',
    INVALID = 'GuessWordIsNotValidException',
}

export const WORD_LENGTH = GameBoard.COLUMNS

export function isGuessWordValid(word: GuessWord) {
    return WORD_LENGTH === word.length
}

export function GuessWordIsNotValidException(word?: GuessWord): DataException {
    return {
        kind: GuessWordException.INVALID,
        error: new Error(`👎 The word: ${word} length isn't valid`)
    }
}

export function GuessWordIsNotDefinedException(): DataException {
    return {
        kind: GuessWordException.UNDEFINED,
        error: new Error(`😵 The word isn't defined`)
    }
}