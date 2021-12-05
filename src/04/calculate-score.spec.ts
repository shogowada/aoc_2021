import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import {
  calculateLastWinnerScore,
  calculateFirstWinnerScore,
  DrawnNumbersAndBoards,
} from "./calculate-score";
import { readDrawnNumbersAndBoards } from "./read-drawn-numbers-and-boards";

describe("day 04: calculate-score", () => {
  describe("using test input", () => {
    let drawnNumbersAndBoards: DrawnNumbersAndBoards;

    beforeEach(() => {
      drawnNumbersAndBoards = readDrawnNumbersAndBoards(
        path.join(__dirname, "input.test.txt")
      );
    });

    it("should calculate the correct score", () => {
      expect(calculateFirstWinnerScore(drawnNumbersAndBoards)).to.equal(4512);
    });

    it("should calculate the correct score for last won board", () => {
      expect(calculateLastWinnerScore(drawnNumbersAndBoards)).to.equal(1924);
    });
  });

  describe("using real input", () => {
    let drawnNumbersAndBoards: DrawnNumbersAndBoards;

    beforeEach(() => {
      drawnNumbersAndBoards = readDrawnNumbersAndBoards(
        path.join(__dirname, "input.txt")
      );
    });

    it("should calculate the correct score", () => {
      expect(calculateFirstWinnerScore(drawnNumbersAndBoards)).to.equal(6592);
    });

    it("should calculate the correct score for last won board", () => {
      expect(calculateLastWinnerScore(drawnNumbersAndBoards)).to.equal(31755);
    });
  });
});
