import * as path from "path";
import { describe, it } from "mocha";
import { expect } from "chai";
import { readTextFileSync } from "../common";
import { predictLanternfishCount } from "./predict-lanternfish-count";

describe("day 06: predict-lanternfish-count", () => {
  [
    { inputFileName: "input.test.txt", count: 26984457539 },
    { inputFileName: "input.txt", count: 1687617803407 },
  ].forEach(({ inputFileName, count }) => {
    it(`should predict ${count} for ${inputFileName}`, () => {
      const initialDaysToReproduceAsString: string = readTextFileSync(
        path.join(__dirname, inputFileName)
      );
      const initialDaysToReproduce: number[] = initialDaysToReproduceAsString
        .split(",")
        .map(Number);
      expect(
        predictLanternfishCount(initialDaysToReproduce, 256)
      ).to.deep.equal(count);
    });
  });
});
