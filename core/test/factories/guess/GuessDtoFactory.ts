import {Factory} from "../Factory";
import {GuessDto} from "../../../guess/infrastructure/dtos/GuessDto";
import {fakeResult} from "../helpers/fakeResult";
import {fakeAttempts} from "../helpers/fakeAttempts";
import {fakeGameWon} from "../helpers/fakeGameWon";

export class GuessDtoFactory extends Factory<GuessDto> {
    private result = fakeResult()

    data = {
        result: this.result,
        attemptsLeft: fakeAttempts(),
        isGameWon: fakeGameWon(this.result)
    }

    create(extra?: {}): GuessDto {
        return {
            ...this.data,
            ...extra
        };
    }
}
