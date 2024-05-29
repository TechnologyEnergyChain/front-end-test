import {describe, expect, test} from 'vitest'
import {normalizeWord} from "../../../../common/helpers/normalizeWord";

describe('normalizeWord', () => {
    test("should normalize the word SOLÁR by changing it to lowercase and removing all diacritic",  () => {
        const word = 'SOLÁR'
        const wordNormalized = normalizeWord(word)
        expect(wordNormalized).toEqual('solar');
    })

    test("should normalize the word MuiÑeirA by changing it to lowercase and keeping the tilde ñ", () => {
        const word = 'MuiÑeirA'
        const wordNormalized = normalizeWord(word)
        expect(wordNormalized).toEqual('muiñeira');
    })
})
