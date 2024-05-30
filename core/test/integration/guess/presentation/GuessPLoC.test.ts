import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, test} from "vitest";
import {GuessPLoC} from "../../../../guess/presentation/GuessPLoC";
import {GuessMapper} from "../../../../guess/infrastructure/mappers/GuessMapper";
import {GuessRepositoryImpl} from "../../../../guess/infrastructure/repositories/GuessRepositoryImpl";
import {SubmitGuessUseCase} from "../../../../guess/domain/actions/SubmitGuessUseCase";
import {TestApiClientImpl} from "../../common/infrastructure/TestApiClientImpl";

import {fakeUUID} from "../../../factories/helpers/fakeUUID";
import {Guess} from "../../../../guess/domain/entities/GuessModel";
import {fakeGuessWord} from "../../../factories/helpers/fakeGuessWord";



describe("GuessPLoC", () => {
    let ploc: GuessPLoC

    beforeEach(() => {
        ploc = new GuessPLoC(
            new SubmitGuessUseCase(
                new GuessRepositoryImpl(
                    new TestApiClientImpl(),
                    new GuessMapper()
                )
            )
        );
    });

    test('should update state with a empty Guess object', async () => {
        const gameId = fakeUUID();
        ploc.updateWord = fakeGuessWord()
        const result: Guess = await ploc.submit(gameId);
        expect(result?.word).toBeUndefined();
    });
})