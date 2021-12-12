import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { countTotalFlashes } from "./flashes";

describe("flashes", () => {
  [
    { inputFileName: "input.test.txt", expectedTotalFlashes: 1656 },
    { inputFileName: "input.txt", expectedTotalFlashes: 1729 },
  ].forEach(({ inputFileName, expectedTotalFlashes }) => {
    let rows: string[];

    beforeEach(() => {
      rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
    });

    it(`should count total flashes for ${inputFileName}`, () => {
      expect(countTotalFlashes(rows, 100)).to.equal(expectedTotalFlashes);
    });
  });
});
