import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import {
  calculateAutoCompleteScore,
  calculateSyntaxErrorScore,
} from "./calculate-syntax-error-score";

describe("day 10: calculate-syntax-error-score", () => {
  [
    {
      inputFileName: "input.test.txt",
      expectedSyntaxErrorScore: 26397,
      expectedAutoCompleteScore: 288957,
    },
    {
      inputFileName: "input.txt",
      expectedSyntaxErrorScore: 366027,
      expectedAutoCompleteScore: 1118645287,
    },
  ].forEach(
    ({
      inputFileName,
      expectedSyntaxErrorScore,
      expectedAutoCompleteScore,
    }) => {
      let rows: string[];

      beforeEach(() => {
        rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
      });

      it(`should calculate syntax error score for ${inputFileName}`, () => {
        expect(calculateSyntaxErrorScore(rows)).to.equal(
          expectedSyntaxErrorScore
        );
      });

      it(`should calculate auto complete score for ${inputFileName}`, () => {
        expect(calculateAutoCompleteScore(rows)).to.equal(
          expectedAutoCompleteScore
        );
      });
    }
  );
});
