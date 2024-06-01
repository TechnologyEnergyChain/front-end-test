import {Factory} from '../Factory'
import {Game} from '../../../game/domain/entities/GameModel'
import {GameStatus} from '../../../game/domain/entities/GameStatus'
import {fakeUUID} from '../helpers/fakeUUID'
import {fakeAttempts} from '../helpers/fakeAttempts'
import {fakeGuessWord} from '../helpers/fakeGuessWord'

export class GameModelFactory extends Factory<Game> {
    data = {
        id: fakeUUID(),
        status: GameStatus.IN_PROGRESS,
        attempts: fakeAttempts(),
        wordToGuess: fakeGuessWord(),
        guesses: []
    }

    create(extra?: {}): Game {
        return new Game({...this.data, ...extra})
    }

    createEmptyGame() {
        return new Game({id:''})
    }

}