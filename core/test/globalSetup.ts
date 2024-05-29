import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";
import {GuessDtoFactory} from "./factories/guess/GuessDtoFactory";
import {afterAll, afterEach, beforeAll} from "vitest";

const server = setupServer(
    http.post('http://test-mock/v1/game/:gameId/guess', (req, res, ctx) => {
        return HttpResponse.json(new GuessDtoFactory().create({guessWord: 'solar'}));
    })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());