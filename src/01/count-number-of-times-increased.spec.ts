import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { countNumberOfTimesIncreased } from "./count-number-of-times-increased";
import { createSums } from "./create-sums";

describe("day 01: count-number-of-times-increased", () => {
  let inputValues: number[];

  beforeEach(() => {
    inputValues = readTextFileRowsSync(path.join(__dirname, "input.txt")).map(
      (value) => Number(value)
    );
  });

  it("should count the number of times increased", () => {
    expect(countNumberOfTimesIncreased(inputValues)).to.equal(1162);
  });

  describe("calculating the shifting sums of the input values", () => {
    let sums: number[];

    beforeEach(() => {
      sums = createSums(inputValues);
    });

    it("should count the number of times increased for the sums", () => {
      expect(countNumberOfTimesIncreased(sums)).to.equal(1190);
    });
  });
});
