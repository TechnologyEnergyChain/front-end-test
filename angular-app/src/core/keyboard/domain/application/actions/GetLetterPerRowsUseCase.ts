import {Command} from '@src/core/common/domain/Command'
import {Injectable} from '@angular/core'
import {DictionaryServiceImpl} from '@src/core/keyboard/domain/application/services/DictionaryServiceImpl'

@Injectable()
export class GetLetterPerRowsUseCase implements Command {

  constructor(private readonly service: DictionaryServiceImpl) {
  }

  execute(): number {
    return this.service.getLettersPerRow()
  }
}
