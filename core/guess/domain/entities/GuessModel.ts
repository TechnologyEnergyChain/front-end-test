import {GuessWord, GuessWordIsNotDefinedException, GuessWordIsNotValidException, isGuessWordValid} from './GuessWord'

export interface GuessModel {
    result?: string
    word?: GuessWord
}

export class Guess implements GuessModel {
    result?: string
    word?: GuessWord

    constructor({  result, word}: GuessModel) {
        this.result = result
        this.word = word
    }

    ensureGuessIsValid() {
        if(!this.word) {
            throw GuessWordIsNotDefinedException()
        }

        if (!isGuessWordValid(this.word)) {
            throw GuessWordIsNotValidException(this.word)
        }
    }
}