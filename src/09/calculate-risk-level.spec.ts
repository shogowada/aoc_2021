import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import {
  calculateMultiplyOfThreeLargestBasins,
  calculateRiskLevel,
} from "./calculate-risk-level";
import { readTextFileRowsSync } from "../common";
import * as path from "path";

describe("day 09: calculate-risk-level", () => {
  [
    {
      inputFileName: "input.test.txt",
      expectedRiskLevel: 15,
      expectedMultiplyOfThreeLargestBasins: 1134,
    },
    {
      inputFileName: "input.txt",
      expectedRiskLevel: 539,
      expectedMultiplyOfThreeLargestBasins: 736920,
    },
  ].forEach(
    ({
      inputFileName,
      expectedRiskLevel,
      expectedMultiplyOfThreeLargestBasins,
    }) => {
      let rows: string[];

      beforeEach(() => {
        rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
      });

      it("should calculate the risk level", () => {
        expect(calculateRiskLevel(rows)).to.equal(expectedRiskLevel);
      });

      it("should calculate the multiply of three largest basins", () => {
        expect(calculateMultiplyOfThreeLargestBasins(rows)).to.equal(
          expectedMultiplyOfThreeLargestBasins
        );
      });
    }
  );
});
