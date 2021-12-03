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

const oxygenGeneratorRatingAsString: string = intRange(digitCount).reduce(
  (rows: string[], index: number): string[] => {
    if (rows.length === 1) {
      return rows;
    }

    const oneCount: number = rows.filter((row) => row[index] === "1").length;

    if (oneCount >= rows.length / 2) {
      return rows.filter((row) => row[index] === "1");
    } else {
      return rows.filter((row) => row[index] === "0");
    }
  },
  inputRows
)[0];

const oxygenGeneratorRating: number = parseInt(
  oxygenGeneratorRatingAsString,
  2
);

console.log(`oxygenGeneratorRatingAsString: ${oxygenGeneratorRatingAsString}`);
console.log(`oxygenGeneratorRating: ${oxygenGeneratorRating}`);

const co2ScrubberRatingAsString: string = intRange(digitCount).reduce(
  (rows: string[], index: number): string[] => {
    if (rows.length === 1) {
      return rows;
    }

    const oneCount: number = rows.filter((row) => row[index] === "1").length;

    if (oneCount >= rows.length / 2) {
      return rows.filter((row) => row[index] === "0");
    } else {
      return rows.filter((row) => row[index] === "1");
    }
  },
  inputRows
)[0];

const co2ScrubberRating: number = parseInt(co2ScrubberRatingAsString, 2);

console.log(`co2ScrubberRatingAsString: ${co2ScrubberRatingAsString}`);
console.log(`co2ScrubberRating: ${co2ScrubberRating}`);

console.log(co2ScrubberRating * oxygenGeneratorRating);
