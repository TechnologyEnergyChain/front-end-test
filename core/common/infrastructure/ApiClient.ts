export interface ApiClient {
    baseUrl?: string

    get<T>({url, params}: { url: string, params?: any }): Promise<T>

    post<T>({url, params, payload}: { url: string, params?: any, payload?: any }): Promise<T>

    update<T>({url, params, payload}: { url: string, params?: any, payload?: any }): Promise<T>

    delete<T>({url, params}: { url: string, params?: any }): Promise<T>
}