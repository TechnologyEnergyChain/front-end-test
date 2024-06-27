import {describe, expect, test} from 'vitest'
import {GuessDtoFactory} from '../../../../factories/guess/GuessDtoFactory'
import {GuessMapper} from '../../../../../guess/infrastructure/mappers/GuessMapper'
import {Guess} from '../../../../../guess/domain/entities/GuessModel'

describe('GuessMapper', () => {
    test('should transform a GuessDto to GuessModel', () => {
        const dto = new GuessDtoFactory().create()
        const model = new GuessMapper().toDomain(dto)

        expect(model).toBeInstanceOf(Guess)
    })
})