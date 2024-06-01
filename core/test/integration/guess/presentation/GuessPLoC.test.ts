import {beforeAll, beforeEach, describe, expect, test} from 'vitest'
import {GuessPLoC} from '../../../../guess/presentation/GuessPLoC'
import {TestApiClientImpl} from '../../common/infrastructure/TestApiClientImpl'

import {Guess} from '../../../../guess/domain/entities/GuessModel'
import {fakeGuessWord} from '../../../factories/helpers/fakeGuessWord'
import {DependencyProvider} from '../../../../common/dependencies/DependencyProvider'
import {GamePLoC} from '../../../../game/presentation/GamePLoC'
import {GuessModelFactory} from '../../../factories/guess/GuesModelFactory'
import {GameGuessesException} from '../../../../game/domain/entities/GameGuesses'
import {GameModelFactory} from '../../../factories/game/GameModelFactory'


describe('GuessPLoC', () => {
    const provider: DependencyProvider = new DependencyProvider()
    let ploc: GuessPLoC
    let gamePloc: GamePLoC


    beforeAll(() => {
        provider.provideGamePloc(new TestApiClientImpl())
        provider.provideGuessPloc(new TestApiClientImpl(), new TestApiClientImpl())
    })

    beforeEach(() => {
        ploc = provider.get('GuessPloc')
        gamePloc = provider.get('GamePloc')
    })

    test('should update state with a empty Guess object', async () => {
        await (provider.get('GamePloc') as GamePLoC).start()
        ploc.updateWord = fakeGuessWord()
        const result: Guess = await ploc.submit()
        expect(result?.word).toBeUndefined()
    })

    test('should throw error for repeated word "MENTE"', async () => {
        await (provider.get('GamePloc') as GamePLoC).start()
        const fakeWord = 'MENTE'
        ploc.updateWord = fakeWord
        gamePloc.update(
            new GameModelFactory().create(
                {guesses: [new GuessModelFactory().create({word: fakeWord})]}
            ))
        try {
            await ploc.submit()
        } catch (e) {
            expect(e.kind).toBe(GameGuessesException.USED)
        }
    })
})
