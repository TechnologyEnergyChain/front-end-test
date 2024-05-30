export interface GuessDictionaryService {
    checkIfWordIsInDictionary(word:string):Promise<boolean>
}