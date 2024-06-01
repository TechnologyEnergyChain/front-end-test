import {GuessResult} from '../../../guess/domain/entities/GuessResult'

export const fakeGameWon = (result: string) => {
    return !result.split('').some((number:string) => number === GuessResult.VALID)
}