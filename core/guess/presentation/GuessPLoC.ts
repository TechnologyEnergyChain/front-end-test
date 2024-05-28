import {Ploc} from "../../common/presentation/Ploc";
import {Guess} from "../domain/GuessModel";
import {SubmitGuessUseCase} from "../domain/actions/SubmitGuessUseCase";
import {GameId} from "../../game/domain/GameId";

export class GuessPLoC extends Ploc<Guess> {
    constructor(
        private readonly submitGuessUseCase: SubmitGuessUseCase
    ) {
        super()
    }

    async submit(gameId: GameId) {
        if(!this.state?.word) {
            throw new Error('🚨 The word id is not defined.')
        }
        const data: Guess = await this.submitGuessUseCase.execute({gameId, word: this.state.word})
        this.update(data)
    }

    set updateWord(word: string) {
        this.update(new Guess({
            ...this.state ?? {},
            word: this.normalize(word)
        }))
    }

    private normalize (word:string) {
        return word.toLowerCase()
    }
}