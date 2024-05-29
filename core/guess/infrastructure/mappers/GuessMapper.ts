import {Guess} from "../../domain/entities/GuessModel";
import {GuessDto} from "../dtos/GuessDto";
import {Mapper} from "../../../common/infrastructure/Mapper";
import {GameStatus} from "../../../game/domain/entities/GameStatus";
import {normalizeWord} from "../../../common/helpers/normalizeWord";


export class GuessMapper implements Mapper<Guess, GuessDto> {
    toApi(model: Guess): GuessDto {
        return {} as GuessDto;
    }

    toDomain(dto: GuessDto): Guess {
        const {isGameWon, guessWord: word, result, attemptsLeft: attempts} = dto
        return new Guess({
            word: normalizeWord(word ?? ''),
            gameStatus: isGameWon ? GameStatus.WON : 0 >= (attempts ?? 0) ? GameStatus.FINISHED : GameStatus.IN_PROGRESS,
            result,
            attempts
        });

    }

}