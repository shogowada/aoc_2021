import { intRange } from "../common";

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

      if (oneCountForIndex >= rows.length / 2) {
        return rows.filter((row) => row[index] === `${majorityDigit}`);
      } else {
        return rows.filter(
          (row) => row[index] === `${majorityDigit === 0 ? 1 : 0}`
        );
      }
    }
  };
