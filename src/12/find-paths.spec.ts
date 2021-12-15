import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import * as path from "path";
import { countPaths } from "./find-paths";

describe("day 12: find-paths", () => {
  [
    { inputFileName: "input.test.1.txt", expectedCount: 36 },
    { inputFileName: "input.test.2.txt", expectedCount: 103 },
    { inputFileName: "input.test.3.txt", expectedCount: 3509 },
    { inputFileName: "input.txt", expectedCount: 93572 },
  ].forEach(({ inputFileName, expectedCount }) => {
    let rows: string[];

    beforeEach(() => {
      rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
    });

    it(`should count the paths for ${inputFileName}`, () => {
      expect(countPaths(rows)).to.equal(expectedCount);
    });
  });
});
