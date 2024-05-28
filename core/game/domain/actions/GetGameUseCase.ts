import {Game} from "../GameModel";
import {Command} from "../../../common/domain/Command";
import {GameRepository} from "../GameRepository";
import {GameId} from "../GameId";


export class GetGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(id: GameId): Promise<Game> {
        return this.repository.getGame(id)
    }
}