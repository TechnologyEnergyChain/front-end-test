import {DictionaryService} from '@src/core/keyboard/domain/application/services/DictionaryService'
import {Dictionary} from '@src/core/keyboard/domain/entities/Dictionary'
import {Injectable} from '@angular/core'

@Injectable()
export class DictionaryServiceImpl implements DictionaryService {
  private readonly dictionary: Dictionary

  constructor() {
    const lang = navigator.language.includes('gl') ? 'gl' : 'es'
    this.dictionary = new Dictionary(lang)
  }


  getAlphabet(): string[] {
    return this.dictionary.alphabet
  }

  getLettersPerRow(): number {
    return this.dictionary.lettersPerRow
  }
}
