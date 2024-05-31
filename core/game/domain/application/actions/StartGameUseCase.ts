import {Command} from "../../../../common/domain/Command";
import {GameRepository} from "../../ports/GameRepository";
import {GameId} from "../../entities/GameId";


export class StartGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(): Promise<GameId> {
        return this.repository.startGame()
    }
}