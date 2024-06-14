import {GuessLetterResult} from '../../../guess/domain/entities/GuessLetterResult'

export const fakeGameWon = (result: string) => {
    return !result.split('').some((number:string) => number === GuessLetterResult.VALID)
}