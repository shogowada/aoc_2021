import * as path from "path";
import { intRange, readTextFileRowsSync } from "../common";
import { createRate } from "./create-rate";

const inputRows: string[] = readTextFileRowsSync(
  path.join(__dirname, "input.txt")
);

const digitCount: number = inputRows[0].length;

const gammaRate: number = createRate(inputRows, 1);
const epsilonRate: number = createRate(inputRows, 0);

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
