import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { countNumberOfPoints } from "./count-number-of-points";

describe("day 05: count-number-of-points", () => {
  [
    { inputFileName: "input.test.txt", point: 12 },
    { inputFileName: "input.txt", point: 20373 },
  ].forEach(({ inputFileName, point }) => {
    let rows: string[];

    beforeEach(() => {
      rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
    });

    it(`should count the number of points for ${inputFileName}`, () => {
      expect(countNumberOfPoints(rows, 2)).to.equal(point);
    });
  });
});
