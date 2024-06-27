import {Ploc} from '../../common/presentation/Ploc'
import {Game} from '../domain/entities/GameModel'
import {StartGameUseCase} from '../domain/application/actions/StartGameUseCase'
import {GetGameUseCase} from '../domain/application/actions/GetGameUseCase'
import {UnexpectedException} from '../../common/domain/DataException'
import {GameStatus} from '../domain/entities/GameStatus'
import {GameBoard} from '../domain/entities/GameBoard'
import {GuessWord} from '../../guess/domain/entities/GuessWord'
import {Guess} from '../../guess/domain/entities/GuessModel'

export class GamePLoC extends Ploc<Game> {
    constructor(
        private readonly startGameUseCase: StartGameUseCase,
        private readonly getGameUseCase: GetGameUseCase,
    ) {
        super()
    }

    async start() {
        try {
            const newGame = await this.startGameUseCase.execute()
            this.update(newGame)
        } catch (e) {
            throw UnexpectedException()
        }
    }

    set status(status: GameStatus) {
        this.update(new Game({...this.state, status}))
    }

    updateAttempts() {
        if ( GameBoard.ROWS > this.state.attempts) {
            this.update(new Game({...this.state, attempts: this.state.attempts++}))
            return
        }

        this.status = GameStatus.FINISHED

    }

    set guesses (guess:Guess) {
        const guesses: Guess[] = this.state.guesses
        guesses.push(guess)

        let attempts = this.state.attempts
        if(GameBoard.ROWS > attempts) {
            attempts++
        }

        this.update(new Game({...this.state, guesses, attempts}))
    }
}