/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Http {
    get: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | any>;
    post: <T>(path: string, params?: Record<string, any>, config?: any) => Promise<T | any>;
}
