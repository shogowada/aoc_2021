import * as path from "path";
import { intRange, readTextFileRowsSync } from "../common";

const InputFilePath = path.join(__dirname, "input.txt");

const inputValues: number[] = readTextFileRowsSync(InputFilePath).map((value) =>
  Number(value)
);

console.log(`Number of input values: ${inputValues.length}`);

const countNumberOfTimesIncreased = (values: number[]): number => {
  interface Result {
    count: number;
    prev: number | null;
  }

  const resultReducer = ({ count, prev }: Result, value: number): Result => {
    if (prev === null || value <= prev) {
      return {
        count,
        prev: value,
      };
    } else {
      return {
        count: count + 1,
        prev: value,
      };
    }
  };

  return values.reduce(resultReducer, { count: 0, prev: null }).count;
};

console.log(`1: ${countNumberOfTimesIncreased(inputValues)}`);

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

const sums: number[] = inputValues.reduce(sumsReducer, []);

console.log(`2: ${countNumberOfTimesIncreased(sums)}`);
