import {ResponseStatus} from './ResponseStatus'

export type ApiResponse<T> = { status: ResponseStatus, data: T }