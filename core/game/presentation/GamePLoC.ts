import {Ploc} from "../../common/presentation/Ploc";
import {Game} from "../domain/entities/GameModel";
import {StartGameUseCase} from "../domain/application/actions/StartGameUseCase";
import {GetGameUseCase} from "../domain/application/actions/GetGameUseCase";
import {GameId} from "../domain/entities/GameId";
import {UnexpectedException} from "../../common/domain/DataException";

export class GamePLoC extends Ploc<Game> {
    constructor(
        private readonly startGameUseCase: StartGameUseCase,
        private readonly getGameUseCase: GetGameUseCase,
    ) {
        super()
    }

    async start() {
        try {
            const id: GameId = await this.startGameUseCase.execute()
            this.update(new Game({...this.state ?? {}, id}))
        } catch (e) {
            throw UnexpectedException()
        }
    }

    async getGame() {
        this.state?.ensureGameIsValid()
        try {
            const game: Game = await this.getGameUseCase.execute(this.state.id)
            this.update(game)
        } catch (e) {
            throw UnexpectedException()
        }
    }
}