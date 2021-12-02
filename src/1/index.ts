import * as path from "path";
import { intRange, readTextFileSync } from "../common";

const InputFilePath = path.join(__dirname, "input.txt");

const input: string = readTextFileSync(InputFilePath);

const inputValues: number[] = input.split("\n").map((value) => Number(value));

console.log(`Number of input values: ${inputValues.length}`);

const countNumberOfTimesIncreased = (values: number[]): number => {
  interface Result {
    count: number;
    prev: number | null;
  }

  return values.reduce(
    ({ count, prev }: Result, value: number): Result => {
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
    },
    { count: 0, prev: null }
  ).count;
};

console.log(`1: ${countNumberOfTimesIncreased(inputValues)}`);

const SumCount = 3;

const sumsReducer = (
  sums: number[],
  value: number,
  index: number,
  allValues: number[]
): number[] => {
  if (index < SumCount) {
    return [];
  } else {
    const values: number[] = intRange(SumCount).map(
      (rangeIndex) => allValues[index - rangeIndex]
    );
    const sum: number = values.reduce((sum, value) => sum + value, 0);
    return [...sums, sum];
  }
};

const sums: number[] = inputValues.reduce(sumsReducer, []);

console.log(`2: ${countNumberOfTimesIncreased(sums)}`);
