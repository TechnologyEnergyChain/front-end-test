import {GameId} from "../../../game/domain/entities/GameId";
import {Guess} from "../entities/GuessModel";

export interface GuessDictionaryRepository {
    search(word: string): Promise<any>
}