import {Ploc} from "../../common/presentation/Ploc";
import {Guess} from "../domain/entities/GuessModel";
import {SubmitGuessUseCase} from "../domain/application/SubmitGuessUseCase";
import {GameId, GameIdIsNotDefinedException, isGameIdDefined} from "../../game/domain/entities/GameId";
import {normalizeWord} from "../../common/helpers/normalizeWord";
import {UnexpectedException} from "../../common/domain/DataException";

export class GuessPLoC extends Ploc<Guess> {
    constructor(
        private readonly submitGuessUseCase: SubmitGuessUseCase
    ) {
        super()
    }

    async submit(gameId: GameId = '') {
        if (!isGameIdDefined(gameId)) {
            throw GameIdIsNotDefinedException
        }

        this.state.ensureGuessIsValid()

        try {
            await this.submitGuessUseCase.execute({gameId, word: this.state.word ?? ''})
            this.update(new Guess({}))
        } catch (e) {
            throw UnexpectedException()
        }
    }

    set updateWord(word: string) {
        this.update(new Guess({
            ...(this.state ?? {}),
            word: normalizeWord(word)
        }))
    }

}