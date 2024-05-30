import {beforeAll, beforeEach, describe, expect, test} from "vitest";
import {GuessPLoC} from "../../../../guess/presentation/GuessPLoC";
import {TestApiClientImpl} from "../../common/infrastructure/TestApiClientImpl";

import {Guess} from "../../../../guess/domain/entities/GuessModel";
import {fakeGuessWord} from "../../../factories/helpers/fakeGuessWord";
import {DependencyProvider} from "../../../../common/dependencies/DependencyProvider";
import {GamePLoC} from "../../../../game/presentation/GamePLoC";



describe("GuessPLoC", () => {
    const provider: DependencyProvider = new DependencyProvider()
    let ploc: GuessPLoC


    beforeAll(()=>{
        provider.provideGamePloc(new TestApiClientImpl())
        provider.provideGuessPloc(new TestApiClientImpl(), new TestApiClientImpl())
    })

    beforeEach(() => {
        ploc = provider.get("GuessPloc")
    });

    test('should update state with a empty Guess object', async () => {
        await (provider.get("GamePloc") as GamePLoC).start()
        ploc.updateWord = fakeGuessWord()
        const result: Guess = await ploc.submit();
        expect(result?.word).toBeUndefined();
    });
})
