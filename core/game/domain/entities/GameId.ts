export type GameId = string

export function isGameIdDefined (id:GameId) {
    return !!id
}

export function GameIdIsNotDefinedException() {
    return new Error('🚨 The game isn\'t started.')
}