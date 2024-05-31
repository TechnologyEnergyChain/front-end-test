import {Command} from "../../../../common/domain/Command";
import {GuessDictionaryService} from "../services/GuessDictionaryService";

export class CheckGuessWordIsInDictionaryUseCase implements Command {
    constructor(private readonly service: GuessDictionaryService) {
    }

    execute(word: string): Promise<boolean> {
        return this.service.checkIfWordIsInDictionary(word)
    }
}