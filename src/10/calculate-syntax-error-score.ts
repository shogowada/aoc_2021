const OpeningCharacters: string[] = ["(", "[", "{", "<"];
const ClosingCharacters: string[] = [")", "]", "}", ">"];

interface ClosingCharacterMetadata {
  openingCharacter: string;
  syntaxErrorScore: number;
}

const mapClosingCharacterToMetadata = (
  closingCharacter: string
): ClosingCharacterMetadata => {
  switch (closingCharacter) {
    case ")": {
      return {
        openingCharacter: "(",
        syntaxErrorScore: 3,
      };
    }
    case "]": {
      return { openingCharacter: "[", syntaxErrorScore: 57 };
    }
    case "}": {
      return { openingCharacter: "{", syntaxErrorScore: 1197 };
    }
    case ">": {
      return { openingCharacter: "<", syntaxErrorScore: 25137 };
    }
    default: {
      throw new Error(`Unknown closing character: ${closingCharacter}`);
    }
  }
};

export const calculateSyntaxErrorScore = (rows: string[]): number => {
  return rows.map(calculateScore).reduce((lhs, rhs) => lhs + rhs, 0);
};

const calculateScore = (row: string): number => {
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

const mapClosingCharacterToScore = (character: string): number => {
  return mapClosingCharacterToMetadata(character).syntaxErrorScore;
};
