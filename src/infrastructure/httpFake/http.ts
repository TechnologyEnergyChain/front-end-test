// import { productListMock } from '../../mocks/products';

import { Http } from '../../domain/repositories/Http';

export const httpFake: Http = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    get: async <T>(_path: string, _params?: Record<string, any>): Promise<any> => {
        const response = await {};
        return response;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    post: async <T>(_path: string, _params?: Record<string, any>): Promise<any> => {
        const response = await {};
        return response;
    },
};
