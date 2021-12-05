import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { createRating } from "./create-rating";

describe("day 03: create-rating", () => {
  let inputRows: string[];
  let oxygenGeneratorRating: number;
  let co2ScrubberRating: number;

  beforeEach(() => {
    inputRows = readTextFileRowsSync(path.join(__dirname, "input.txt"));

    oxygenGeneratorRating = createRating(inputRows, 1);
    co2ScrubberRating = createRating(inputRows, 0);
  });

  it("should create oxygen generator rating", () => {
    expect(oxygenGeneratorRating).to.equal(1327);
  });

  it("should create CO2 scrubber rating", () => {
    expect(co2ScrubberRating).to.equal(3429);
  });

  it("should calculate life support rating", () => {
    expect(oxygenGeneratorRating * co2ScrubberRating).to.equal(4550283);
  });
});
