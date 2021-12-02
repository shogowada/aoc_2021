import * as path from "path";
import * as fs from "fs";

const InputFilePath = path.join(__dirname, "input.txt");

const input: string = fs.readFileSync(InputFilePath, { encoding: "utf8" });

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

const intRange = (count: number): number[] => {
  return Array(count)
    .fill(0)
    .map((value, index) => index);
};

const SumCount = 3;

const sums: number[] = inputValues.reduce(
  (sums: number[], value: number, index: number, allValues: number[]) => {
    if (index < SumCount) {
      return [];
    } else {
      return [
        ...sums,
        intRange(SumCount).reduce(
          (sum, rangeIndex) => sum + allValues[index - rangeIndex],
          0
        ),
      ];
    }
  },
  []
);

console.log(`2: ${countNumberOfTimesIncreased(sums)}`);
