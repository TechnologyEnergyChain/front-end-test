import { GuessIntent } from '../entity/Guess';
import { GuessRepository } from '../repositories/GuessRepository';

export const GameService = (repository: GuessRepository): GuessRepository => ({
    makeGuess: (guessIntent: GuessIntent) => {
        return repository.makeGuess(guessIntent);
    },
});
