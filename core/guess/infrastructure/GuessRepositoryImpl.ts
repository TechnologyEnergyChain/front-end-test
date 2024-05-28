import {GuessRepository} from "../domain/GuessRepository";
import {GuessMapper} from "./GuessMapper";
import {GameId} from "../../game/domain/GameId";
import {GuessDto} from "./GuessDto";
import {Guess} from "../domain/GuessModel";


export class GuessRepositoryImpl implements GuessRepository {
    constructor(private readonly mapper: GuessMapper) {
    }

    async submitGuess(gameId: GameId, guess: string): Promise<Guess> {
        const result: GuessDto = await (await fetch(`http://localhost:3001/v1/game/${gameId}/guess?guessWord=${guess}`, {method: 'POST'})).json()
        return this.mapper.toDomain(result)
    }


}