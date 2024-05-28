import {Mapper} from "../../common/infrastructure/Mapper";
import {Game} from "../domain/GameModel";
import {GameDto} from "./GameDto";
import {GuessMapper} from "../../guess/infrastructure/GuessMapper";

export class GameMapper implements Mapper<Game, GameDto> {
    constructor(private readonly guessMapper: GuessMapper) {
    }

    toApi(model: Game): GameDto {
        return {} as GameDto;
    }

    toDomain(dto: GameDto): Game {
        const {gameId: id, status, guesses, wordToGuess, attemptsLeft: attempts} = dto

        return new Game({
            id,
            status: 'string' === typeof status ? parseInt(status) : status,
            attempts,
            wordToGuess,
            guesses: guesses.map((guess) => (this.guessMapper.toDomain(guess)))
        });
    }


}