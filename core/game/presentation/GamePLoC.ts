import {Ploc} from "../../common/presentation/Ploc";
import {Game} from "../domain/GameModel";
import {StartGameUseCase} from "../domain/actions/StartGameUseCase";
import {GetGameUseCase} from "../domain/actions/GetGameUseCase";
import {GameId} from "../domain/GameId";

export class GamePLoC extends Ploc<Game> {
    constructor(
        private readonly startGameUseCase: StartGameUseCase,
        private readonly getGameUseCase: GetGameUseCase,
    ) {
        super()
    }

    async start() {
        const id:GameId = await this.startGameUseCase.execute()
        this.update(new Game({...this.state ?? {}, id}))
    }

    async getGame() {
        if(!this.state?.id) {
            throw new Error('🚨 The game id is not defined.')
        }

        const game: Game = await this.getGameUseCase.execute(this.state.id)
        this.update(game)
    }
}