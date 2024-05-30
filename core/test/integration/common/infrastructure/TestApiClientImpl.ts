import {ApiClient} from "../../../../common/infrastructure/ApiClient";
import {ApiResponse} from "../../../../common/domain/ApiResponse";

export class TestApiClientImpl implements ApiClient {

    protected constructor(readonly baseUrl: string = 'http://test-mock/v1') {
    }

    delete<T>({url, params}: { url: string; params?: any }): Promise<ApiResponse<T>> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return doFetch(URL, {method: 'DELETE'})
    }

    get<T>({url, params}: { url: string; params?: any }): Promise<ApiResponse<T>> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return doFetch(URL)
    }

    post<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<ApiResponse<T>> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return doFetch(URL, {method: 'POST', body: payload})
    }

    update<T>({url, params, payload}: { url: string; params?: any; payload?: any }): Promise<ApiResponse<T>> {
        const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
        return doFetch(URL, {method: 'PUT', body: payload})
    }

}

async function doFetch<T>(url: string, options = {}): Promise<ApiResponse<T>> {
    const response = await fetch(url, options)
    const data = await response.json()
    return {
        status: response.status,
        data
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

