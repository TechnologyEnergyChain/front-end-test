import {GuessDictionaryService} from './GuessDictionaryService'
import {GuessDictionaryRepository} from '../../ports/GuessDictionaryRepository'
import {ResponseStatus} from '../../../../common/domain/ResponseStatus'
import {GuessWordDoesntExistException} from '../../entities/GuessWord'

export class GuessDictionaryServiceImpl implements GuessDictionaryService {
    constructor(private readonly repository: GuessDictionaryRepository) {
    }

    async checkIfWordIsInDictionary(word: string): Promise<boolean> {

        const {status} = await this.repository.search(word)
        if (ResponseStatus.NOT_FOUND === status) {
            throw GuessWordDoesntExistException(word)
        }
        return Promise.resolve(true)
    }

}