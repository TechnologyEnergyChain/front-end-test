import {Command} from "../../../../common/domain/Command";
import {GameRepository} from "../../ports/GameRepository";
import {GameId} from "../../entities/GameId";
import {GameDifficulty} from "../../entities/GameDifficulty";


export class StartGameUseCase implements Command {
    constructor(private readonly repository: GameRepository) {
    }

    execute(difficulty?:GameDifficulty): Promise<GameId> {
        return this.repository.startGame(difficulty ?? "easy")
    }
}