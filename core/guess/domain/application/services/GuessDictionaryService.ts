import {GuessWord} from '../../entities/GuessWord'
import {GameDailyWord} from '../../../../game/domain/entities/GameDailyWord'
import {GuessResult} from '../../entities/GuessResult'

export interface GuessDictionaryService {
    checkIfWordIsInDictionary(word: string): Promise<boolean>

    validate(dailyWord: GameDailyWord, guess: GuessWord): Promise<GuessResult>
}
