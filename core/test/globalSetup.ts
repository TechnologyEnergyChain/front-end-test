import {setupServer} from 'msw/node'
import {http, HttpResponse} from 'msw'
import {GuessDtoFactory} from './factories/guess/GuessDtoFactory'
import {afterAll, afterEach, beforeAll} from 'vitest'
import { faker} from '@faker-js/faker'

const server = setupServer(
    http.post('http://test-mock/v1/game', () => {
        return HttpResponse.json({gameId: faker.string.uuid()})
    }),

    http.post('http://test-mock/v1/game/:gameId/guess', () => {
        return HttpResponse.json(new GuessDtoFactory().create({guessWord: 'solar'}))
    }),

    http.get('http://test-mock/v1/search', () => {
        return HttpResponse.json({})
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())