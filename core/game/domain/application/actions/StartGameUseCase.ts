import {Command} from '../../../../common/domain/Command'
import {GameRepository} from '../../ports/GameRepository'
import {Game} from "../../entities/GameModel";


export class StartGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(): Promise<Game> {
        return this.repository.getDailyWord()
    }
}