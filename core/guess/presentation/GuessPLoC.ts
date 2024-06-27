import {Ploc} from '../../common/presentation/Ploc'
import {Guess} from '../domain/entities/GuessModel'
import {SubmitGuessUseCase} from '../domain/application/actions/SubmitGuessUseCase'
import {normalizeWord} from '../../common/helpers/normalizeWord'
import {DataException, UnexpectedException} from '../../common/domain/DataException'
import {GamePLoC} from '../../game/presentation/GamePLoC'
import {CheckGuessWordIsInDictionaryUseCase} from '../domain/application/actions/CheckGuessWordIsInDictionaryUseCase'
import {GuessResult} from '../domain/entities/GuessResult'
import {WORD_LENGTH} from '../domain/entities/GuessWord'
import {GuessLetterResult} from '../domain/entities/GuessLetterResult'
import {GameStatus} from '../../game/domain/entities/GameStatus'

export class GuessPLoC extends Ploc<Guess> {
    constructor(
        private readonly currentGame: GamePLoC,
        private readonly submitGuessUseCase: SubmitGuessUseCase,
        private readonly checkInDictionaryUseCase: CheckGuessWordIsInDictionaryUseCase
    ) {
        super()
    }

    async submit() {

        // First validate that the current game exists correctly
        this.currentGame.state.ensureGameIsValid()

        // Then we check that the word entered is valid
        this.state.ensureGuessIsValid()

        // Finally, we check that the word entered hasn't already been used
        this.currentGame.state.ensureWordHasNotBeenUsed(this.state.word ?? '')

        try {
            await this.checkInDictionaryUseCase.execute(this.state.word ?? '')
            const result: GuessResult = await this.submitGuessUseCase.execute({
                target: this.currentGame.state.wordToGuess ?? '',
                guess: this.state.word ?? ''
            })

            this.currentGame.guesses = new Guess({result, word: this.state.word})

            if (result === new Array(WORD_LENGTH).fill(GuessLetterResult.VALID).join('')) {
                this.currentGame.status = GameStatus.WON
            }
            this.update(new Guess({}))
        } catch (e) {
            throw (e as DataException)?.kind ? e : UnexpectedException()
        }
    }

    set updateWord(word: string) {
        this.update(new Guess({
            ...(this.state ?? {}),
            word: normalizeWord(word)
        }))
    }

}