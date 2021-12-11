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

export const sumDecodedNumbers = (input: string[]): number => {
  return input.map(mapRowToDecodedNumber).reduce((lhs, rhs) => lhs + rhs, 0);
};

type DecodedDigitToEncodedDigitsRecord = Record<string, string[]>;

type EncodedDigitToDecodedDigitRecord = Record<string, string>;

const Digits: string[] = ["a", "b", "c", "d", "e", "f", "g"];

const DecodedDigitsToNumberRecord: Record<string, number> = {
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

const InitialDecodedDigitToEncodedDigitsRecord = Digits.reduce(
  (map, digit) => ({ ...map, [digit]: Digits }),
  {}
);

const mapRowToDecodedNumber = (inputRow: string): number => {
  const { encodedDigitsList, resultDigitsList } =
    mapToResultDigitsListAndEncodedDigitsList(inputRow);

  const encodedDigitToDecodedDigitRecord: EncodedDigitToDecodedDigitRecord =
    decodeDigits(encodedDigitsList);

  return Number(
    resultDigitsList
      .map((encodedDigits) =>
        mapEncodedDigitsToDecodedDigits(
          encodedDigits,
          encodedDigitToDecodedDigitRecord
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
  decodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord = InitialDecodedDigitToEncodedDigitsRecord
): EncodedDigitToDecodedDigitRecord => {
  const fullyDecoded: boolean = Object.values(
    decodedDigitToEncodedDigitsRecord
  ).every((encodedDigits) => encodedDigits.length === 1);

  if (fullyDecoded) {
    return createEncodedDigitToDecodedDigitRecord(
      decodedDigitToEncodedDigitsRecord
    );
  } else {
    const nextDecodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord =
      encodedDigitsList.reduce(
        reduceDecodedDigitToEncodedDigitsRecord,
        decodedDigitToEncodedDigitsRecord
      );

    return decodeDigits(
      encodedDigitsList,
      nextDecodedDigitToEncodedDigitsRecord
    );
  }
};

const createEncodedDigitToDecodedDigitRecord = (
  decodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord
): EncodedDigitToDecodedDigitRecord => {
  return Object.entries(decodedDigitToEncodedDigitsRecord).reduce(
    (
      encodedDigitToDecodedDigitRecord: EncodedDigitToDecodedDigitRecord,
      [decodedDigit, encodedDigits]
    ) => ({
      ...encodedDigitToDecodedDigitRecord,
      [encodedDigits[0]]: decodedDigit,
    }),
    {}
  );
};

const reduceDecodedDigitToEncodedDigitsRecord = (
  decodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord,
  encodedDigits: string
): DecodedDigitToEncodedDigitsRecord => {
  const decodedDigitsWithTheSameLengthList: string[] = Object.keys(
    DecodedDigitsToNumberRecord
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

  decodedDigitToEncodedDigitsRecord = commonDecodedDigits
    .split("")
    .reduce(
      (
        decodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord,
        decodedDigit: string
      ): DecodedDigitToEncodedDigitsRecord => {
        return {
          ...decodedDigitToEncodedDigitsRecord,
          [decodedDigit]: decodedDigitToEncodedDigitsRecord[
            decodedDigit
          ].filter((encodedDigit) => encodedDigits.includes(encodedDigit)),
        };
      },
      decodedDigitToEncodedDigitsRecord
    );

  return filterOutEncodedDigitsForFullyDecodedDigits(
    decodedDigitToEncodedDigitsRecord
  );
};

const filterOutEncodedDigitsForFullyDecodedDigits = (
  decodedDigitToEncodedDigitsRecord: DecodedDigitToEncodedDigitsRecord
): DecodedDigitToEncodedDigitsRecord => {
  const fullyDecodedDigitToEncodedDigitTuples: [string, string][] =
    Object.entries(decodedDigitToEncodedDigitsRecord)
      .filter(([decodedDigit, encodedDigits]) => encodedDigits.length === 1)
      .map(([decodedDigit, encodedDigits]) => [decodedDigit, encodedDigits[0]]);

  return mapTuplesToRecord(
    Object.entries(decodedDigitToEncodedDigitsRecord).map(
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
  encodedDigitToDecodedDigitRecord: EncodedDigitToDecodedDigitRecord
): string => {
  return digits
    .split("")
    .map((digit) => encodedDigitToDecodedDigitRecord[digit])
    .join("");
};

const mapDecodedDigitsToNumber = (digits: string): number => {
  return DecodedDigitsToNumberRecord[digits.split("").sort().join("")];
};

const mapTuplesToRecord = <V>(tuples: [string, V][]): Record<string, V> => {
  return tuples.reduce(
    (dictionary: Record<string, V>, [key, value]: [string, V]) => ({
      ...dictionary,
      [key]: value,
    }),
    {}
  );
};
