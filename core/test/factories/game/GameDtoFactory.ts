import {Factory} from '../Factory'
import {GuessDto} from '../../../guess/infrastructure/dtos/GuessDto'
import {fakeResult} from '../helpers/fakeResult'
import {fakeAttempts} from '../helpers/fakeAttempts'
import {fakeGameWon} from '../helpers/fakeGameWon'
import {GameDto} from '../../../game/infrastructure/dtos/GameDto'
import {fakeUUID} from '../helpers/fakeUUID'
import {fakeGuessWord} from '../helpers/fakeGuessWord'

export class GameDtoFactory extends Factory<GameDto> {
    private result = fakeResult()

    data = {
        gameId: fakeUUID(),
        status: fakeGameWon(this.result),
        attemptsLeft: fakeAttempts(),
        wordToGuess: fakeGuessWord(),
        guesses: []
    }

    create(extra?: {}): GameDto {
        return {
            ...this.data,
            ...extra
        }
    }
}
