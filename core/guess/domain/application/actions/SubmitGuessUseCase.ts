import {Command} from '../../../../common/domain/Command'
import {GuessRepository} from '../../ports/GuessRepository'
import {GameId} from '../../../../game/domain/entities/GameId'
import {Guess} from '../../entities/GuessModel'


export class SubmitGuessUseCase implements Command {
    constructor(private readonly repository: GuessRepository) {
    }

    execute({gameId, word}: { gameId: GameId, word: string }): Promise<Guess> {
        return this.repository.submitGuess(gameId, word)
    }
}