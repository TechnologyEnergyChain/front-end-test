import {ApiClient} from "../common/infrastructure/ApiClient";

export class FakeApiClientImpl implements ApiClient {
    delete<T>({url, params}: { url: string; params?: any }): Promise<T> {
        return Promise.resolve(undefined);
    }

    get<T>({url, params}: { url: string; params?: any }): Promise<T> {
        return Promise.resolve(undefined);
    }

    post<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<T> {
        return Promise.resolve(undefined);
    }

    update<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<T> {
        return Promise.resolve(undefined);
    }
}