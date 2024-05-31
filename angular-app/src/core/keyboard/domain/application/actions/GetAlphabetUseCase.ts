import {Command} from "@src/core/common/domain/Command";
import {Dictionary} from "@src/core/keyboard/domain/entities/Dictionary";
import {Injectable} from "@angular/core";
import {DictionaryServiceImpl} from "@src/core/keyboard/domain/application/services/DictionaryServiceImpl";

@Injectable()
export class GetAlphabetUseCase implements Command {

  constructor(private readonly service: DictionaryServiceImpl) {
  }

  execute(): string[] {
    return this.service.getAlphabet()
  }
}
