import {ApiClient} from "../../../common/infrastructure/ApiClient";
import {GuessDictionaryRepository} from "../../domain/repositories/GuessDictionaryRepository";


export class GuessDictionaryRepositoryImpl implements GuessDictionaryRepository {
    constructor(
        private readonly apiClient: ApiClient,
    ) {
    }

    async search(word: string): Promise<any> {
        return await this.apiClient.get<any>({url: `/search`, params: {word}})
    }

}