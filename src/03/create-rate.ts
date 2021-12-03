import { intRange } from "../common";

export const createRate = (rows: string[], majorityDigit: number): number => {
  const totalCount: number = rows.length;

  const oneCounts: number[] = createOneCounts(rows);

  const rateAsString: string = createRateAsString(
    oneCounts,
    totalCount,
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
  totalCount: number,
  majorityDigit: number
): string => {
  const halfCount: number = totalCount / 2;

  return oneCounts
    .map((oneCount) => {
      if (oneCount >= halfCount) {
        return `${majorityDigit}`;
      } else {
        return `${majorityDigit === 0 ? 1 : 0}`;
      }
    })
    .join("");
};
