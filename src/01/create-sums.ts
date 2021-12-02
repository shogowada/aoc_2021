import { intRange } from "../common";

export const createSums = (values: number[]): number[] => {
  return values.reduce(sumsReducer, []);
};

const sumsReducer = (
  sums: number[],
  value: number,
  index: number,
  allValues: number[]
): number[] => {
  const SumRangeLength = 3;

  if (index < SumRangeLength) {
    return [];
  } else {
    const values: number[] = intRange(SumRangeLength).map(
      (rangeIndex) => allValues[index - rangeIndex]
    );
    const sum: number = values.reduce((sum, value) => sum + value, 0);
    return [...sums, sum];
  }
};
