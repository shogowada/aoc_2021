import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { calculateSyntaxErrorScore } from "./calculate-syntax-error-score";

describe("day 10: calculate-syntax-error-score", () => {
  [
    { inputFileName: "input.test.txt", expectedScore: 26397 },
    { inputFileName: "input.txt", expectedScore: 366027 },
  ].forEach(({ inputFileName, expectedScore }) => {
    let rows: string[];

    beforeEach(() => {
      rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
    });

    it(`should calculate syntax error score for ${inputFileName}`, () => {
      expect(calculateSyntaxErrorScore(rows)).to.equal(expectedScore);
    });
  });
});
