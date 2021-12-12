import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { countStepsToSimultaneousFlash, countTotalFlashes } from "./flashes";

describe("day 11: flashes", () => {
  [
    {
      inputFileName: "input.test.txt",
      expectedTotalFlashes: 1656,
      expectedStepsToSimultaneousFlash: 195,
    },
    {
      inputFileName: "input.txt",
      expectedTotalFlashes: 1729,
      expectedStepsToSimultaneousFlash: 237,
    },
  ].forEach(
    ({
      inputFileName,
      expectedTotalFlashes,
      expectedStepsToSimultaneousFlash,
    }) => {
      let rows: string[];

      beforeEach(() => {
        rows = readTextFileRowsSync(path.join(__dirname, inputFileName));
      });

      it(`should count total flashes for ${inputFileName}`, () => {
        expect(countTotalFlashes(rows, 100)).to.equal(expectedTotalFlashes);
      });

      it(`should predict total steps to flash all for ${inputFileName}`, () => {
        expect(countStepsToSimultaneousFlash(rows)).to.equal(
          expectedStepsToSimultaneousFlash
        );
      });
    }
  );
});
