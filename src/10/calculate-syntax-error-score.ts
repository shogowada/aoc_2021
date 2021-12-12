const OpeningCharacters: string[] = ["(", "[", "{", "<"];
const ClosingCharacters: string[] = [")", "]", "}", ">"];

interface ClosingCharacterMetadata {
  openingCharacter: string;
  syntaxErrorScore: number;
  autoCompleteScore: number;
}

const mapOpeningCharacterToScore = (openingCharacter: string): number => {
  const metadata = ClosingCharacters.map((closingCharacter) =>
    mapClosingCharacterToMetadata(closingCharacter)
  ).find((metadata) => metadata.openingCharacter === openingCharacter)!;

  return metadata.autoCompleteScore;
};

const mapClosingCharacterToMetadata = (
  closingCharacter: string
): ClosingCharacterMetadata => {
  switch (closingCharacter) {
    case ")": {
      return {
        openingCharacter: "(",
        syntaxErrorScore: 3,
        autoCompleteScore: 1,
      };
    }
    case "]": {
      return {
        openingCharacter: "[",
        syntaxErrorScore: 57,
        autoCompleteScore: 2,
      };
    }
    case "}": {
      return {
        openingCharacter: "{",
        syntaxErrorScore: 1197,
        autoCompleteScore: 3,
      };
    }
    case ">": {
      return {
        openingCharacter: "<",
        syntaxErrorScore: 25137,
        autoCompleteScore: 4,
      };
    }
    default: {
      throw new Error(`Unknown closing character: ${closingCharacter}`);
    }
  }
};

export const calculateSyntaxErrorScore = (rows: string[]): number => {
  return rows
    .map(calculateSyntaxErrorScoreForRow)
    .reduce((lhs, rhs) => lhs + rhs, 0);
};

export const calculateAutoCompleteScore = (rows: string[]): number => {
  const scores: number[] = rows
    .map(calculateAutoCompleteScoreForRow)
    .filter((score) => score)
    .sort((lhs, rhs) => lhs - rhs);

  return scores[Math.floor(scores.length / 2)];
};

const calculateSyntaxErrorScoreForRow = (row: string): number => {
  return checkSyntax(row).syntaxErrorScore || 0;
};

const calculateAutoCompleteScoreForRow = (row: string): number => {
  const { remainingStack, syntaxErrorScore } = checkSyntax(row);

  if (syntaxErrorScore) {
    return 0;
  } else {
    return remainingStack.reduceRight(
      (score: number, openingCharacter: string): number => {
        return score * 5 + mapOpeningCharacterToScore(openingCharacter);
      },
      0
    );
  }
};

interface CheckSyntaxResult {
  remainingStack: string[];
  syntaxErrorScore?: number;
}

const checkSyntax = (row: string): CheckSyntaxResult => {
  const characters: string[] = row.split("");

  return characters.reduce(checkSyntaxResultReducer, {
    remainingStack: [],
  });
};

const checkSyntaxResultReducer = (
  { remainingStack, syntaxErrorScore }: CheckSyntaxResult,
  character: string
): CheckSyntaxResult => {
  if (syntaxErrorScore) {
    return { remainingStack, syntaxErrorScore };
  } else if (OpeningCharacters.includes(character)) {
    return {
      remainingStack: [...remainingStack, character],
    };
  } else {
    const { openingCharacter, syntaxErrorScore } =
      mapClosingCharacterToMetadata(character);
    if (remainingStack[remainingStack.length - 1] !== openingCharacter) {
      return { remainingStack, syntaxErrorScore };
    } else {
      return {
        remainingStack: remainingStack.slice(0, remainingStack.length - 1),
      };
    }
  }
};
