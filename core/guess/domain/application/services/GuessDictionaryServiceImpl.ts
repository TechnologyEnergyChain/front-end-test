import {GuessDictionaryService} from './GuessDictionaryService'
import {GuessRepository} from '../../ports/GuessRepository'
import {ResponseStatus} from '../../../../common/domain/ResponseStatus'
import {GuessWord, GuessWordDoesntExistException} from '../../entities/GuessWord'
import {GameDailyWord} from '../../../../game/domain/entities/GameDailyWord'
import {GuessResult} from '../../entities/GuessResult'

export class GuessDictionaryServiceImpl implements GuessDictionaryService {
    constructor(private readonly repository: GuessRepository) {
    }

    validate(dailyWord: GameDailyWord, guess: GuessWord): Promise<GuessResult> {
        return Promise.resolve(compareGuess(dailyWord, guess))
    }

    async checkIfWordIsInDictionary(word: string): Promise<boolean> {

        const {status} = await this.repository.search(word)
        if (ResponseStatus.NOT_FOUND === status) {
            throw GuessWordDoesntExistException(word)
        }
        return Promise.resolve(true)
    }


}

function compareGuess(target: GameDailyWord, guess: GuessWord) {
    const result = []
    const targetArray = target.split('')
    const guessArray = guess.split('')

    // Primero, marcar todas las coincidencias exactas
    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === targetArray[i]) {
            result[i] = 2
            targetArray[i] = '' // Marcar esta posición como usada
            guessArray[i] = ''  // Marcar esta posición como usada
        }
    }

    // Luego, marcar las coincidencias no exactas
    for (let i = 0; i < guessArray.length; i++) {
        if ('' !== guessArray[i]) {
            const index = targetArray.indexOf(guessArray[i])
            if (-1 !== index) {
                result[i] = 1
                targetArray[index] = '' // Marcar esta posición como usada
            } else {
                result[i] = 0
            }
        }
    }

    return result.join('')
}