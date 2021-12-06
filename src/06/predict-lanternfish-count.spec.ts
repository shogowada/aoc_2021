import * as path from "path";
import { describe, it } from "mocha";
import { expect } from "chai";
import { readTextFileSync } from "../common";
import { predictLanternfishCount } from "./predict-lanternfish-count";

describe("predict-lanternfish-count", () => {
  [
    { inputFileName: "input.test.txt", count: 5934 },
    { inputFileName: "input.txt", count: 374927 },
  ].forEach(({ inputFileName, count }) => {
    it(`should predict ${count} for ${inputFileName}`, () => {
      const initialDaysToReproduceAsString: string = readTextFileSync(
        path.join(__dirname, inputFileName)
      );
      const initialDaysToReproduce: number[] = initialDaysToReproduceAsString
        .split(",")
        .map(Number);
      expect(predictLanternfishCount(initialDaysToReproduce, 80)).to.deep.equal(
        count
      );
    });
  });
});
