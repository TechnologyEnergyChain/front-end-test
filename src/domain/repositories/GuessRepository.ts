import { GuessEntity, GuessIntent } from '../entity/Guess';

export interface GuessRepository {
    makeGuess: (guessIntent: GuessIntent) => Promise<GuessEntity>;
}
