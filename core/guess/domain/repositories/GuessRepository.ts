import {GameId} from "../../../game/domain/entities/GameId";
import {Guess} from "../entities/GuessModel";

export interface GuessRepository {
    submitGuess(gameId:GameId, guess: string): Promise<Guess>
}