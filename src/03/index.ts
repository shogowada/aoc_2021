import * as path from "path";
import { readTextFileRowsSync } from "../common";
import { createRate } from "./create-rate";
import { createRating } from "./create-rating";

const inputRows: string[] = readTextFileRowsSync(
  path.join(__dirname, "input.txt")
);

const gammaRate: number = createRate(inputRows, 1);
const epsilonRate: number = createRate(inputRows, 0);

console.log(`gammaRate: ${gammaRate}`);
console.log(`epsilonRate: ${epsilonRate}`);
console.log(`powerConsumption: ${gammaRate * epsilonRate}`);

const oxygenGeneratorRating: number = createRating(inputRows, 1);
const co2ScrubberRating: number = createRating(inputRows, 0);

console.log(`oxygenGeneratorRating: ${oxygenGeneratorRating}`); // 1327
console.log(`co2ScrubberRating: ${co2ScrubberRating}`); // 3429
console.log(`lifeSupportRating: ${co2ScrubberRating * oxygenGeneratorRating}`); // 4550283
