import { intRange } from "../common";

export const createRate = (rows: string[], majorityDigit: number): number => {
  const totalCount: number = rows.length;
  const halfCount: number = totalCount / 2;
  const digitCount: number = rows[0].length;

  const trueCounts: number[] = createTrueCounts(rows, digitCount);

  const rateAsString: string = trueCounts
    .map((trueCount) => {
      if (trueCount >= halfCount) {
        return `${majorityDigit}`;
      } else {
        return `${majorityDigit === 0 ? 1 : 0}`;
      }
    })
    .join("");

  return parseInt(rateAsString, 2);
};

const createTrueCounts = (rows: string[], digitCount: number): number[] => {
  return rows.reduce(trueCountsReducer, Array(digitCount).fill(0));
};

const trueCountsReducer = (trueCounts: number[], row: string): number[] => {
  intRange(row.length).forEach((index) => {
    if (row[index] === "1") {
      trueCounts[index] = trueCounts[index] + 1;
    }
  });
  return trueCounts;
};
