import * as path from "path";
import { readTextFileRowsSync } from "../common";
import { countNumberOfTimesIncreased } from "./count-number-of-times-increased";
import { createSums } from "./create-sums";

const InputFilePath = path.join(__dirname, "input.txt");

const inputValues: number[] = readTextFileRowsSync(InputFilePath).map((value) =>
  Number(value)
);
const sums: number[] = createSums(inputValues);

console.log(`Number of input values: ${inputValues.length}`);
console.log(`1: ${countNumberOfTimesIncreased(inputValues)}`);
console.log(`2: ${countNumberOfTimesIncreased(sums)}`);
