enum LetterStatus {
  CORRECT = 2,
  WRONG_PLACE = 1,
  WRONG = 0,
  NONE = -1,
}

interface Letter {
  letter: string;
  status: LetterStatus;
}

export { Letter, LetterStatus };
