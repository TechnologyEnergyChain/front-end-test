import {Command} from "../../../common/domain/Command";
import {GuessRepository} from "../GuessRepository";
import {GameId} from "../../../game/domain/GameId";
import {Guess} from "../GuessModel";


export class SubmitGuessUseCase implements Command {
    constructor(private readonly repository: GuessRepository) {
    }

    execute({gameId, word}: { gameId: GameId, word: string }): Promise<Guess> {
        return this.repository.submitGuess(gameId, word)
    }
}