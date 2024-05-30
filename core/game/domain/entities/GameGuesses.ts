import {Guess} from "../../../guess/domain/entities/GuessModel";
import {DataException} from "../../../common/domain/DataException";

export type GameGuesses = Guess[]

export enum GameGuessesException {
    USED = 'GameGuessesWordUsedException'
}

export function isWordOnGuessList(word: string, list?:GameGuesses) {
    return (list ?? []).some((guess: Guess) => (word === guess.word))
}
export function GameGuessesWordUsedException(word: string):DataException {
    return {
        kind: GameGuessesException.USED,
        error: Error(`🧐 The word: ${word} has been already used`)
    }
}