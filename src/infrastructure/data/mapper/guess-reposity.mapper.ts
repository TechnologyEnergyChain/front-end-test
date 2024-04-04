import { GuessEntity } from '@domain/entity/Guess';
import { Mapper } from '@domain/core/mapper';
import { Guess } from '../model/guess';

export class GameRepositoryMapper implements Mapper<GuessEntity, Guess> {
    mapToList(param: Guess[]): GuessEntity[] {
        const gameEntities: GuessEntity[] = [];

        param.forEach((guessModel) => {
            gameEntities.push({
                attemptsLeft: guessModel.attemptsLeft,
                isGameWon: guessModel.isGameWon,
                result: guessModel.result,
            });
        });

        return gameEntities;
    }

    mapFromList(param: GuessEntity[]): Guess[] {
        const games: Guess[] = [];

        param.forEach((guessEntity) => {
            games.push({
                attemptsLeft: guessEntity.attemptsLeft,
                isGameWon: guessEntity.isGameWon,
                result: guessEntity.result,
            });
        });

        return games;
    }

    mapFrom(guessEntity: GuessEntity): Guess {
        return {
            attemptsLeft: guessEntity.attemptsLeft,
            isGameWon: guessEntity.isGameWon,
            result: guessEntity.result,
        };
    }

    mapTo(guess: Guess): GuessEntity {
        return {
            attemptsLeft: guess.attemptsLeft,
            isGameWon: guess.isGameWon,
            result: guess.result,
        };
    }
}
