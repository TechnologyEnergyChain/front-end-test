import {ApiClient} from '../../../common/infrastructure/ApiClient'
import {GuessRepository} from '../../domain/ports/GuessRepository'


export class GuessDictionaryRepositoryImpl implements GuessRepository {
    constructor(
        private readonly apiClient: ApiClient,
    ) {
    }

    async search(word: string): Promise<any> {
        return await this.apiClient.get({url: '/search', params: {word}})
    }

}