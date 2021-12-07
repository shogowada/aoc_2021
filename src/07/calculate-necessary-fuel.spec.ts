import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileSync } from "../common";
import { calculateNecessaryFuel } from "./calculate-necessary-fuel";

describe("day 07: calculate-necessary-fuel", () => {
  [
    { inputFileName: "input.test.txt", fuel: 37 },
    { inputFileName: "input.txt", fuel: 345035 },
  ].forEach(({ inputFileName, fuel }) => {
    let positions: number[];

    beforeEach(() => {
      const input = readTextFileSync(path.join(__dirname, inputFileName));
      positions = input.split(",").map(Number);
    });

    it(`should calculate necessary fuel for ${inputFileName}`, () => {
      expect(calculateNecessaryFuel(positions)).to.equal(fuel);
    });
  });
});
