import {Dictionary} from '@src/core/keyboard/domain/entities/Dictionary'

export interface DictionaryService {
  getAlphabet(dictionary:Dictionary): string[]
  getLettersPerRow(): number
}
