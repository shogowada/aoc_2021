import { flipDigit } from "./flip-digit";

export const createRate = (rows: string[], majorityDigit: number): number => {
  const oneCounts: number[] = createOneCounts(rows);

  const rateAsString: string = createRateAsString(
    oneCounts,
    rows.length,
    majorityDigit
  );

  return parseInt(rateAsString, 2);
};

const createOneCounts = (rows: string[]): number[] => {
  const digitCount: number = rows[0].length;

  return rows.reduce(oneCountsReducer, Array(digitCount).fill(0));
};

const oneCountsReducer = (oneCounts: number[], row: string): number[] => {
  return oneCounts.map((oneCount: number, index: number) => {
    if (row[index] === "1") {
      return oneCount + 1;
    } else {
      return oneCount;
    }
  });
};

const createRateAsString = (
  oneCounts: number[],
  rowCount: number,
  majorityDigit: number
): string => {
  return oneCounts
    .map((oneCount) => {
      const isOneMajority = oneCount >= rowCount / 2;
      if (isOneMajority) {
        return String(majorityDigit);
      } else {
        return String(flipDigit(majorityDigit));
      }
    })
    .join("");
};
