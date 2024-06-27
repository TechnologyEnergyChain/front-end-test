import {Command} from '../../../../common/domain/Command'
import {GameDailyWord} from '../../../../game/domain/entities/GameDailyWord'
import {GuessWord} from '../../entities/GuessWord'
import {GuessDictionaryService} from '../services/GuessDictionaryService'
import {GuessResult} from '../../entities/GuessResult'


export class SubmitGuessUseCase implements Command {
    constructor(private readonly service: GuessDictionaryService) {
    }

    execute({target, guess}: { target: GameDailyWord, guess: GuessWord }): Promise<GuessResult> {
        return this.service.validate(target, guess)
    }
}