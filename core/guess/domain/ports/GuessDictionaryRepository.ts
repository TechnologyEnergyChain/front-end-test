export interface GuessDictionaryRepository {
    search(word: string): Promise<any>
}