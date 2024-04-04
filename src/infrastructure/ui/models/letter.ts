export interface Letter {
    value: string;
    state: LetterState;
}

export enum LetterState {
    EMPTY = 'empty',
    FILL = 'fill',
    WRONG = 'wrong',
    VALID = 'valid',
    SUCCESS = 'success',
}
