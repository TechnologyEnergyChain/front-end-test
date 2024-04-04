import { Guess } from '@infrastructure/data/model/guess';
import { GameStatus, Result } from '@domain/entity/Game';
import { GuessEntity, GuessIntent } from '../../domain/entity/Guess';
import { GuessRepository } from '../../domain/repositories/GuessRepository';
import { Http } from '../../domain/repositories/Http';
import { StateGameFake } from './stateGameFake';

export const guessRepository = (client: Http): GuessRepository => ({
    makeGuess: async (guessIntent: GuessIntent) => {
        await client.get<GuessEntity>('');

        const stateFake = StateGameFake.getInstance();
        stateFake.game.attemptsLeft -= 1;

        let result = '';
        let isGameWon = true;
        for (let i = 0; i < guessIntent.guessWord.length; i++) {
            const guess = guessIntent.guessWord[i];
            const wordToGuess = stateFake.game.wordToGuess[i];
            if (guess === wordToGuess) {
                result += '2';
            } else {
                isGameWon = false;
                stateFake.game.wordToGuess.includes(guess) ? (result += '1') : (result += '0');
            }
        }

        const guess: Result = {
            result: result,
            guessWord: guessIntent.guessWord,
        };
        stateFake.game.guesses.push(guess);

        stateFake.game.status = isGameWon ? GameStatus.WIN : stateFake.game.attemptsLeft < 0 ? GameStatus.LOSS : stateFake.game.status;

        const guessResult: Guess = {
            result: result,
            attemptsLeft: stateFake.game.attemptsLeft,
            isGameWon: isGameWon,
        };
        return guessResult;
    },
});
