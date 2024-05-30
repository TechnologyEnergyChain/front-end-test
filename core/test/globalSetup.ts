import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";
import {GuessDtoFactory} from "./factories/guess/GuessDtoFactory";
import {afterAll, afterEach, beforeAll} from "vitest";
import { faker} from "@faker-js/faker";

const server = setupServer(
    http.post('http://test-mock/v1/game', (req, res, ctx) => {
        return HttpResponse.json({gameId: faker.string.uuid()});
    }),

    http.post('http://test-mock/v1/game/:gameId/guess', (req, res, ctx) => {
        return HttpResponse.json(new GuessDtoFactory().create({guessWord: 'solar'}));
    }),

    http.get('http://test-mock/v1/search', (req, res, ctx) => {
        return HttpResponse.json({});
    })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());