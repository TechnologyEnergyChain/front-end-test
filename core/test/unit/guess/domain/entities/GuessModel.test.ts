import {describe, expect, test} from "vitest";
import {Guess} from "../../../../../guess/domain/entities/GuessModel";
import {GuessModelFactory} from "../../../../factories/guess/GuesModelFactory";
import {GuessWordException, WORD_LENGTH} from "../../../../../guess/domain/entities/GuessWord";

describe("GuessModel", () => {
    test("should create a GuessModel with word 'solar'", () => {
        const model = new Guess({word: 'solar'})
        expect(model.word).toEqual('solar')
    })

    test('should ensure that the word is valid', () => {
        const model = new GuessModelFactory().create()
        try {
            model.ensureGuessIsValid()
        } catch (e) {
            expect(e).toBeUndefined()
        } finally {
            expect(model.word.length).toEqual(WORD_LENGTH)
        }
    })

    test('should ensure that the word is invalid', () => {
        const model = new GuessModelFactory().createGuessWithInvalidWord()
        try {
            model.ensureGuessIsValid()
        } catch (e) {
            expect(e.kind).toBe(GuessWordException.INVALID)
        }
    })
})