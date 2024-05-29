import {Guess} from "../../../guess/domain/entities/GuessModel";
import {GameStatus} from "../../../game/domain/entities/GameStatus";
import {Factory} from "../Factory";
import {fakeAttempts} from "../helpers/fakeAttempts";
import {fakeResult} from "../helpers/fakeResult";
import {fakeGuessWord} from "../helpers/fakeGuessWord";

export class GuessModelFactory extends Factory<Guess> {

    private data = {
        attempts: fakeAttempts(),
        gameStatus: GameStatus.InProgress,
        result: fakeResult(),
        word: fakeGuessWord()
    }

    create(extra?: {}): Guess {
        return new Guess({...this.data, ...extra});
    }

    createGuessWithInvalidWord(): Guess {
        return this.create({word: 'invalid word'})
    }


}