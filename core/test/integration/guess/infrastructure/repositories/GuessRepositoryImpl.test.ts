import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi} from "vitest";
import {GuessRepositoryImpl} from "../../../../../guess/infrastructure/repositories/GuessRepositoryImpl";
import {GuessMapper} from "../../../../../guess/infrastructure/mappers/GuessMapper";
import {ApiClient} from "../../../../../common/infrastructure/ApiClient";
import {GuessDtoFactory} from "../../../../factories/guess/GuessDtoFactory";
import {FakeApiClientImpl} from "../../../../FakeApiClientImpl";
import {faker} from '@faker-js/faker';
import {setupServer} from 'msw/node';
import {http, HttpResponse} from 'msw';
import {fakeUUID} from "../../../../factories/helpers/fakeUUID";
import {fakeGuessWord} from "../../../../factories/helpers/fakeGuessWord";
import {TestApiClientImpl} from "../../../common/infrastructure/TestApiClientImpl";
import {Guess} from "../../../../../guess/domain/entities/GuessModel";

describe('GuessRepositoryImpl', () => {
    let apiClient: ApiClient;
    let mapper: GuessMapper;
    let guessRepository: GuessRepositoryImpl;


    beforeEach(() => {
        apiClient = new TestApiClientImpl();
        mapper = new GuessMapper();
        guessRepository = new GuessRepositoryImpl(apiClient, mapper);
    });

    test('should return a Guess object', async () => {
        const gameId = fakeUUID();
        const guessWord = fakeGuessWord();
        const result: Guess = await guessRepository.submitGuess(gameId, guessWord);
        expect(result.word).toEqual('solar');
    });
});