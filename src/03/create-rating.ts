import { intRange } from "../common";
import { flipDigit } from "./flip-digit";

export const createRating = (rows: string[], majorityDigit: number): number => {
  const digitCount: number = rows[0].length;

  const ratingAsString: string = intRange(digitCount).reduce(
    createRowsReducer(majorityDigit),
    rows
  )[0];

  return parseInt(ratingAsString, 2);
};

const createRowsReducer =
  (majorityDigit: number) =>
  (rows: string[], index: number): string[] => {
    if (rows.length === 1) {
      return rows;
    } else {
      const oneCountForIndex: number = rows.filter(
        (row) => row[index] === `1`
      ).length;

      const isOneMajority = oneCountForIndex >= rows.length / 2;
      if (isOneMajority) {
        return rows.filter((row) => row[index] === String(majorityDigit));
      } else {
        return rows.filter(
          (row) => row[index] === String(flipDigit(majorityDigit))
        );
      }
    }
  };
