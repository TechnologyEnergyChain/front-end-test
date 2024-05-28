import {GameId} from "../../game/domain/GameId";
import {Guess} from "./GuessModel";

export interface GuessRepository {
    submitGuess(gameId:GameId, guess: string): Promise<Guess>
}