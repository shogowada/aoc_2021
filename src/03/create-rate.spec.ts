import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { createRate } from "./create-rate";

describe("day 03: create-rate", () => {
  let inputRows: string[];
  let gammaRate: number;
  let epsilonRate: number;

  beforeEach(() => {
    inputRows = readTextFileRowsSync(path.join(__dirname, "input.txt"));

    gammaRate = createRate(inputRows, 1);
    epsilonRate = createRate(inputRows, 0);
  });

  it("should create gamma rate", () => {
    expect(gammaRate).to.equal(1300);
  });

  it("should create epsilon rate", () => {
    expect(epsilonRate).to.equal(2795);
  });

  it("should calculate power consumption", () => {
    expect(gammaRate * epsilonRate).to.equal(3633500);
  });
});
