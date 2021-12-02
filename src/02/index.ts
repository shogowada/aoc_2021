import * as path from "path";
import { readTextFileRowsSync } from "../common";
import { calculatePosition } from "./calculate-position";

const InputFilePath = path.join(__dirname, "input.txt");

const inputRows: string[] = readTextFileRowsSync(InputFilePath);

const { horizontalPosition, depth } = calculatePosition(inputRows);

console.log(horizontalPosition * depth);
