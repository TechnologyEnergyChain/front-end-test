import {Guess} from "../domain/GuessModel";
import {GuessDto} from "./GuessDto";
import {Mapper} from "../../common/infrastructure/Mapper";
import {GameStatus} from "../../game/domain/GameStatus";


export class GuessMapper implements Mapper<Guess, GuessDto> {
    toApi(model: Guess): GuessDto {
        return {} as GuessDto;
    }

    toDomain(dto: GuessDto): Guess {
        const {isGameWon, guessWord: word, result, attemptsLeft: attempts} = dto
        return new Guess({
            word,
            gameStatus: isGameWon ? GameStatus.WON : undefined,
            result,
            attempts
        });

    }

}