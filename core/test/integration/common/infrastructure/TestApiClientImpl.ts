import {ApiClient} from "../../../../common/infrastructure/ApiClient";

export class TestApiClientImpl implements ApiClient {
    baseUrl = 'http://test-mock/v1';


    async get<T>({url, params}: { url: string; params?: any }): Promise<T> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return await (await fetch(URL)).json()
    }

    async delete<T>({url, params}: { url: string; params?: any }): Promise<T> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return await (await fetch(URL, {method: 'DELETE'})).json()
    }

    async post<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<T> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return await (await fetch(URL, {method: 'POST', body: payload})).json()
    }

    async update<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<T> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return await (await fetch(URL, {method: 'PUT', body: payload})).json()
    }

}

function createUrlWithParams(url: string, params?: any) {
    if (!params) {
        return url
    }
    const newUrl = new URL(url)
    Object.entries(params).forEach(([key, value]) => {
        newUrl.searchParams.append(<string>key, <string>value)
    })
    return newUrl.toString()
}
