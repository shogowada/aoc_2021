export const countNumberWithUniqueNumberOfSegments = (
  input: string[]
): number => {
  return input.reduce((count: number, row: string): number => {
    return (
      count +
      row
        .split("|")[1]
        .split(" ")
        .filter(
          (digits) =>
            digits.length === 2 ||
            digits.length === 3 ||
            digits.length === 4 ||
            digits.length === 7
        ).length
    );
  }, 0);
};

export const sum = (input: string[]): number => {
  return input.map(mapRowToNumber).reduce((lhs, rhs) => lhs + rhs, 0);
};

interface DecodedDigitToEncodedDigitsMap {
  [decodedDigit: string]: string[];
}

interface EncodedDigitToDecodedDigitMap {
  [encodedDigit: string]: string;
}

const Digits: string[] = ["a", "b", "c", "d", "e", "f", "g"];

const DecodedDigitsToNumberDictionary: { [digits: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

const InitialDecodedDigitToEncodedDigitsMap = Digits.reduce(
  (map, digit) => ({ ...map, [digit]: Digits }),
  {}
);

const mapRowToNumber = (inputRow: string): number => {
  const { encodedDigitsList, resultDigitsList } =
    mapToResultDigitsListAndEncodedDigitsList(inputRow);

  const encodedDigitToDecodedDigitMap: EncodedDigitToDecodedDigitMap =
    decodeDigits(encodedDigitsList);

  return Number(
    resultDigitsList
      .map((encodedDigits) =>
        mapEncodedDigitsToDecodedDigits(
          encodedDigits,
          encodedDigitToDecodedDigitMap
        )
      )
      .map((decodedDigits) => mapDecodedDigitsToNumber(decodedDigits))
      .join("")
  );
};

const mapToResultDigitsListAndEncodedDigitsList = (inputRow: string) => {
  const [inputDigitsRow, outputDigitsRow] = inputRow.split("|");

  const resultDigitsList: string[] = outputDigitsRow
    .split(" ")
    .map((digits) => digits.trim())
    .filter((digits) => digits);

  const encodedDigitsList: string[] = [
    ...inputDigitsRow
      .split(" ")
      .map((digits) => digits.trim())
      .filter((digits) => digits),
    ...resultDigitsList,
  ];

  return { resultDigitsList, encodedDigitsList };
};

const decodeDigits = (
  encodedDigitsList: string[],
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap = InitialDecodedDigitToEncodedDigitsMap
): EncodedDigitToDecodedDigitMap => {
  const fullyDecoded: boolean = Object.values(
    decodedDigitToEncodedDigitsMap
  ).every((encodedDigits) => encodedDigits.length === 1);

  if (fullyDecoded) {
    return createEncodedDigitToDecodedDigitMap(decodedDigitToEncodedDigitsMap);
  } else {
    const nextDecodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap =
      encodedDigitsList.reduce(
        reduceDecodedDigitToEncodedDigitsMap,
        decodedDigitToEncodedDigitsMap
      );

    return decodeDigits(encodedDigitsList, nextDecodedDigitToEncodedDigitsMap);
  }
};

const createEncodedDigitToDecodedDigitMap = (
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap
): EncodedDigitToDecodedDigitMap => {
  return Object.entries(decodedDigitToEncodedDigitsMap).reduce(
    (
      encodedDigitToDecodedDigitMap: EncodedDigitToDecodedDigitMap,
      [decodedDigit, encodedDigits]
    ) => ({
      ...encodedDigitToDecodedDigitMap,
      [encodedDigits[0]]: decodedDigit,
    }),
    {}
  );
};

const reduceDecodedDigitToEncodedDigitsMap = (
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap,
  encodedDigits: string
): DecodedDigitToEncodedDigitsMap => {
  const decodedDigitsWithTheSameLengthList: string[] = Object.keys(
    DecodedDigitsToNumberDictionary
  ).filter((decodedDigits) => decodedDigits.length === encodedDigits.length);

  const commonDecodedDigits: string = decodedDigitsWithTheSameLengthList.reduce(
    (commonDecodedDigits: string, decodedDigits: string): string => {
      return commonDecodedDigits
        .split("")
        .filter((commonDecodedDigit) =>
          decodedDigits.includes(commonDecodedDigit)
        )
        .join("");
    },
    decodedDigitsWithTheSameLengthList[0]
  );

  decodedDigitToEncodedDigitsMap = commonDecodedDigits
    .split("")
    .reduce(
      (
        decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap,
        decodedDigit: string
      ): DecodedDigitToEncodedDigitsMap => {
        return {
          ...decodedDigitToEncodedDigitsMap,
          [decodedDigit]: decodedDigitToEncodedDigitsMap[decodedDigit].filter(
            (encodedDigit) => encodedDigits.includes(encodedDigit)
          ),
        };
      },
      decodedDigitToEncodedDigitsMap
    );

  return filterOutEncodedDigitsForFullyDecodedDigits(
    decodedDigitToEncodedDigitsMap
  );
};

const filterOutEncodedDigitsForFullyDecodedDigits = (
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap
): DecodedDigitToEncodedDigitsMap => {
  const fullyDecodedDigitToEncodedDigitTuples: [string, string][] =
    Object.entries(decodedDigitToEncodedDigitsMap)
      .filter(([decodedDigit, encodedDigits]) => encodedDigits.length === 1)
      .map(([decodedDigit, encodedDigits]) => [decodedDigit, encodedDigits[0]]);

  return mapTuplesToDictionary(
    Object.entries(decodedDigitToEncodedDigitsMap).map(
      ([decodedDigit, encodedDigits]) => {
        const encodedDigitsForOtherFullyDecodedDigits: string[] =
          fullyDecodedDigitToEncodedDigitTuples
            .filter(([fullyDecodedDigit]) => fullyDecodedDigit !== decodedDigit)
            .map(([fullyDecodedDigit, encodedDigit]) => encodedDigit);

        return [
          decodedDigit,
          encodedDigits.filter(
            (encodedDigit) =>
              !encodedDigitsForOtherFullyDecodedDigits.includes(encodedDigit)
          ),
        ];
      }
    )
  );
};

const mapEncodedDigitsToDecodedDigits = (
  digits: string,
  encodedDigitToDecodedDigitMap: EncodedDigitToDecodedDigitMap
): string => {
  return digits
    .split("")
    .map((digit) => encodedDigitToDecodedDigitMap[digit])
    .join("");
};

const mapDecodedDigitsToNumber = (digits: string): number => {
  return DecodedDigitsToNumberDictionary[digits.split("").sort().join("")];
};

const mapTuplesToDictionary = <V>(tuples: [string, V][]): Record<string, V> => {
  return tuples.reduce(
    (dictionary: Record<string, V>, [key, value]: [string, V]) => ({
      ...dictionary,
      [key]: value,
    }),
    {}
  );
};
