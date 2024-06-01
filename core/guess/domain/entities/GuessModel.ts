import {GameStatus} from '../../../game/domain/entities/GameStatus'
import {GuessWord, GuessWordIsNotDefinedException, GuessWordIsNotValidException, isGuessWordValid} from './GuessWord'

export interface GuessModel {
    result?: string
    attempts?: number
    word?: GuessWord
    gameStatus?: GameStatus
}

export class Guess implements GuessModel {
    result?: string
    attempts?: number
    gameStatus?: GameStatus
    word?: GuessWord

    constructor({attempts, gameStatus, result, word}: GuessModel) {
        this.result = result
        this.attempts = attempts
        this.gameStatus = gameStatus
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