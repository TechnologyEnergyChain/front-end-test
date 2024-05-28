import {Command} from "../../../common/domain/Command";
import {GameRepository} from "../GameRepository";
import {GameId} from "../GameId";


export class StartGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(): Promise<GameId> {
        return this.repository.startGame()
    }
}