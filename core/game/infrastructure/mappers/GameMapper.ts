import {Mapper} from '../../../common/infrastructure/Mapper'
import {Game} from '../../domain/entities/GameModel'
import {GameDto} from '../dtos/GameDto'
import {normalizeWord} from '../../../common/helpers/normalizeWord'
import {GameStatus} from '../../domain/entities/GameStatus'

export class GameMapper implements Pick<Mapper<Game, GameDto>, 'toDomain'> {

    toDomain(dto: GameDto): Game {
        const {word} = dto

        return new Game({
            id: crypto.randomUUID(),
            status: GameStatus.IN_PROGRESS,
            attempts: 0,
            wordToGuess: normalizeWord(word),
            guesses: []
        })
    }


}