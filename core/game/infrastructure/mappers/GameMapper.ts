import {Mapper} from '../../../common/infrastructure/Mapper'
import {Game} from '../../domain/entities/GameModel'
import {GameDto} from '../dtos/GameDto'
import {GuessMapper} from '../../../guess/infrastructure/mappers/GuessMapper'
import {normalizeWord} from '../../../common/helpers/normalizeWord'

export class GameMapper implements Mapper<Game, GameDto> {
    constructor(private readonly guessMapper: GuessMapper) {
    }

    toApi(model: Game): GameDto {
        return {} as GameDto
    }

    toDomain(dto: GameDto): Game {
        const {gameId: id, status, guesses, wordToGuess, attemptsLeft: attempts} = dto

        return new Game({
            id,
            status: 'string' === typeof status ? parseInt(status) : status,
            attempts,
            wordToGuess: normalizeWord(wordToGuess),
            guesses: guesses.map((guess) => (this.guessMapper.toDomain(guess)))
        })
    }


}