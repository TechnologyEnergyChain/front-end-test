import {Ploc} from "../../common/presentation/Ploc";
import {Guess} from "../domain/entities/GuessModel";
import {SubmitGuessUseCase} from "../domain/actions/SubmitGuessUseCase";
import {normalizeWord} from "../../common/helpers/normalizeWord";
import {DataException, UnexpectedException} from "../../common/domain/DataException";
import {GamePLoC} from "../../game/presentation/GamePLoC";
import {CheckGuessWordIsInDictionaryUseCase} from "../domain/actions/CheckGuessWordIsInDictionaryUseCase";
import {GuessWordDoesntExistException} from "../domain/entities/GuessWord";

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
            await this.submitGuessUseCase.execute({gameId: this.currentGame.state.id, word: this.state.word ?? ''})
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