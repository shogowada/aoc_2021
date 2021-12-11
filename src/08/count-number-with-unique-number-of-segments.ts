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
  const [inputDigitsRow, outputDigitsRow] = inputRow.split("|");
  const outputDigitsList: string[] = outputDigitsRow
    .split(" ")
    .map((digits) => digits.trim())
    .filter((digits) => digits);
  const encodedDigitsList: string[] = [
    ...inputDigitsRow
      .split(" ")
      .map((digits) => digits.trim())
      .filter((digits) => digits),
    ...outputDigitsList,
  ];

  const encodedDigitToDecodedDigitMap: EncodedDigitToDecodedDigitMap =
    decodeDigits(encodedDigitsList);

  return Number(
    outputDigitsList
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

const decodeDigits = (
  encodedDigitsList: string[],
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap = InitialDecodedDigitToEncodedDigitsMap
): EncodedDigitToDecodedDigitMap => {
  if (
    Object.values(decodedDigitToEncodedDigitsMap).every(
      (encodedDigits) => encodedDigits.length === 1
    )
  ) {
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
  } else {
    return decodeDigits(
      encodedDigitsList,
      encodedDigitsList.reduce(
        reduceDecodedDigitToEncodedDigitsMap,
        decodedDigitToEncodedDigitsMap
      )
    );
  }
};

const reduceDecodedDigitToEncodedDigitsMap = (
  decodedDigitToEncodedDigitsMap: DecodedDigitToEncodedDigitsMap,
  encodedDigits: string
): DecodedDigitToEncodedDigitsMap => {
  console.log(`encodedDigits: ${encodedDigits}`);

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

  Object.entries(decodedDigitToEncodedDigitsMap)
    .filter(([decodedDigit, encodedDigits]) => encodedDigits.length === 1)
    .forEach(([decodedDigit, encodedDigits]) => {
      Object.keys(decodedDigitToEncodedDigitsMap)
        .filter((thisDecodedDigit) => thisDecodedDigit !== decodedDigit)
        .forEach((thisDecodedDigit) => {
          decodedDigitToEncodedDigitsMap[thisDecodedDigit] =
            decodedDigitToEncodedDigitsMap[thisDecodedDigit].filter(
              (thisEncodedDigit) => !encodedDigits.includes(thisEncodedDigit)
            );
        });
    });

  console.log(
    `post decodedDigitToEncodedDigitsMap: ${JSON.stringify(
      decodedDigitToEncodedDigitsMap,
      undefined,
      2
    )}`
  );

  return decodedDigitToEncodedDigitsMap;
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
