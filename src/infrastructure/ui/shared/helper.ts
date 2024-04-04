import { GameStatus, Result } from '@infrastructure/data/model/game';
import { Letter, LetterState } from '../models/letter';
import { Word } from '../models/word';
import { MAX_TRIES, MAX_WORD_LETTERS } from '@infrastructure/data/constants/gameConfig';
import { MESSAGE_LOSE, MESSAGE_WIN } from './constants';

export const RESULT_GUESS: Record<string, LetterState> = {
    '0': LetterState.WRONG,
    '1': LetterState.VALID,
    '2': LetterState.SUCCESS,
};

export const STATUS_MESSAGE: Record<GameStatus, string> = {
    [GameStatus.PLAYING]: '',
    [GameStatus.LOSS]: MESSAGE_LOSE,
    [GameStatus.WIN]: MESSAGE_WIN,
};

export const guessToWord = (guesses: Result[], words: Word[]): Word[] => {
    guesses.forEach((guess: Result, index) => {
        const word: Word = {
            letters: [],
        };
        [...guess.result].forEach((result, index) => {
            const letter: Letter = {
                value: guess.guessWord[index],
                state: RESULT_GUESS[result] ?? LetterState.WRONG,
            };
            word.letters.push(letter);
        });
        words[index] = word;
    });

    return words;
};

export const isRepeatedWord = (guess: string, guesses: Result[]): boolean => {
    return guesses.some((guessed) => guessed.guessWord === guess);
};

export const getWord = (word: Word): string => {
    const concatenatedString = word.letters.reduce((acc, currentValue) => {
        return acc + currentValue.value;
    }, '');
    return concatenatedString;
};

export const createEmptyRowLetter = (): Letter[] => {
    const wordLetters: Letter[] = [];
    Array.from({ length: MAX_WORD_LETTERS }, () => {
        const letter: Letter = {
            value: '',
            state: LetterState.EMPTY,
        };
        wordLetters.push(letter);
    });
    return wordLetters;
};

export const createEmptyTableWord = (): Word[] => {
    const words: Word[] = [];
    Array.from({ length: MAX_TRIES }, () => {
        const wordLetters = createEmptyRowLetter();
        words.push({ letters: wordLetters });
    });
    return words;
};
