import {beforeEach, describe, expect, test, vi} from 'vitest'
import {GuessRepositoryImpl} from '../../../../../guess/infrastructure/repositories/GuessRepositoryImpl'
import {GuessMapper} from '../../../../../guess/infrastructure/mappers/GuessMapper'
import {ApiClient} from '../../../../../common/infrastructure/ApiClient'
import {GuessDtoFactory} from '../../../../factories/guess/GuessDtoFactory'
import {FakeApiClientImpl} from '../../../../FakeApiClientImpl'
import {fakeUUID} from '../../../../factories/helpers/fakeUUID'


describe('GuessRepositoryImpl', () => {
    let apiClient: ApiClient
    let mapper: GuessMapper
    let guessRepository: GuessRepositoryImpl

    beforeEach(() => {
        apiClient = new FakeApiClientImpl()
        mapper = new GuessMapper()
        guessRepository = new GuessRepositoryImpl(apiClient, mapper)
    })

    test('should return a Guess object', async () => {
        const fakeDto = new GuessDtoFactory().create()
        const mappedData = mapper.toDomain(fakeDto)

        vi.spyOn(apiClient, 'post').mockResolvedValue({status: 200, data: fakeDto})
        const result = await guessRepository.submitGuess(fakeUUID(), mappedData.word)
        expect(result).toEqual(mapper.toDomain(fakeDto))
    })

})