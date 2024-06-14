export interface GuessRepository {
    search(word: string): Promise<any>
}