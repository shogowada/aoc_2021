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
  const characters: string[] = row.split("");

  let stack: string[] = [];
  for (let index = 0; index < characters.length; ++index) {
    const character = characters[index];

    if (OpeningCharacters.includes(character)) {
      stack = [...stack, character];
    } else {
      const { openingCharacter, syntaxErrorScore } =
        mapClosingCharacterToMetadata(character);
      if (stack[stack.length - 1] !== openingCharacter) {
        return syntaxErrorScore;
      } else {
        stack = stack.slice(0, stack.length - 1);
      }
    }
  }

  return 0;
};

const calculateAutoCompleteScoreForRow = (row: string): number => {
  const characters: string[] = row.split("");

  let stack: string[] = [];
  for (let index = 0; index < characters.length; ++index) {
    const character = characters[index];

    if (OpeningCharacters.includes(character)) {
      stack = [...stack, character];
    } else {
      const { openingCharacter } = mapClosingCharacterToMetadata(character);
      if (stack[stack.length - 1] !== openingCharacter) {
        return 0;
      } else {
        stack = stack.slice(0, stack.length - 1);
      }
    }
  }

  return stack.reduceRight(
    (score: number, openingCharacter: string): number => {
      return score * 5 + mapOpeningCharacterToScore(openingCharacter);
    },
    0
  );
};
