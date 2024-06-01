import {Game} from '../../entities/GameModel'
import {Command} from '../../../../common/domain/Command'
import {GameRepository} from '../../ports/GameRepository'
import {GameId} from '../../entities/GameId'


export class GetGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(id: GameId): Promise<Game> {
        return this.repository.getGame(id)
    }
}