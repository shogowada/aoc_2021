import * as path from "path";
import { intRange, readTextFileRowsSync } from "../common";

const inputRows: string[] = readTextFileRowsSync(
  path.join(__dirname, "input.txt")
);

const totalCount: number = inputRows.length;
const halfCount: number = totalCount / 2;
const digitCount: number = inputRows[0].length;

const trueCountsReducer = (trueCounts: number[], row: string): number[] => {
  intRange(row.length).forEach((index) => {
    if (row[index] === "1") {
      trueCounts[index] = trueCounts[index] + 1;
    }
  });
  return trueCounts;
};

const trueCounts: number[] = inputRows.reduce(
  trueCountsReducer,
  Array(digitCount).fill(0)
);

const gammaRateAsString = trueCounts
  .map((trueCount) => {
    if (trueCount >= halfCount) {
      return "1";
    } else {
      return "0";
    }
  })
  .join("");

const epsilonRateAsString = trueCounts
  .map((trueCount) => {
    if (trueCount >= halfCount) {
      return "0";
    } else {
      return "1";
    }
  })
  .join("");

console.log(`gammaRateAsString: ${gammaRateAsString}`);
console.log(`epsilonRateAsString: ${epsilonRateAsString}`);

const gammaRate: number = parseInt(gammaRateAsString, 2);
const epsilonRate: number = parseInt(epsilonRateAsString, 2);

console.log(`trueCounts: ${trueCounts}`);
console.log(`gammaRate: ${gammaRate}`);
console.log(`epsilonRate: ${epsilonRate}`);
console.log(`powerConsumption: ${gammaRate * epsilonRate}`);
