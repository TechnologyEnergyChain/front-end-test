import {GameStatus} from "../../game/domain/GameStatus";

export interface GuessModel {
    result?: string
    attempts?: number
    word?: string
    gameStatus?: GameStatus
}

export class Guess implements GuessModel {
    result?: string;
    attempts?: number;
    gameStatus?: GameStatus;
    word?: string;

    constructor({attempts, gameStatus, result, word}: GuessModel) {
        this.result = result
        this.attempts = attempts
        this.gameStatus = gameStatus
        this.word = word
    }

}