import * as path from "path";
import { describe, it } from "mocha";
import { expect } from "chai";
import { calculateScore, DrawnNumbersAndBoards } from "./calculate-score";
import { readDrawnNumbersAndBoards } from "./read-drawn-numbers-and-boards";

describe("calculate-score", () => {
  it("should calculate the correct score for test input", () => {
    const drawnNumbersAndBoards: DrawnNumbersAndBoards =
      readDrawnNumbersAndBoards(path.join(__dirname, "input.test.txt"));
    expect(calculateScore(drawnNumbersAndBoards)).to.equal(4512);
  });

  it("should calculate the correct score", () => {
    const drawnNumbersAndBoards: DrawnNumbersAndBoards =
      readDrawnNumbersAndBoards(path.join(__dirname, "input.txt"));
    expect(calculateScore(drawnNumbersAndBoards)).to.equal(6592);
  });
});
