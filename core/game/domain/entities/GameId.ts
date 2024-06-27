import {DataException} from '../../../common/domain/DataException'

export type GameId = string

export enum GameIdException {
    UNDEFINED = 'GuessWordIsNotValidException'
}

export function isGameIdDefined(id?: GameId) {
    return !!id
}

export function GameIdIsNotDefinedException(): DataException {
    return {
        kind: GameIdException.UNDEFINED,
        error: Error('🚨 The game isn\'t started.')
    }
}