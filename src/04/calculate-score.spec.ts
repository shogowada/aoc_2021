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
  [
    {
      inputFileName: "input.test.txt",
      score: 4512,
      lastWinnerScore: 1924,
    },
    {
      inputFileName: "input.txt",
      score: 6592,
      lastWinnerScore: 31755,
    },
  ].forEach(({ inputFileName, score, lastWinnerScore }) => {
    describe(`using ${inputFileName} as an input`, () => {
      let drawnNumbersAndBoards: DrawnNumbersAndBoards;

      beforeEach(() => {
        drawnNumbersAndBoards = readDrawnNumbersAndBoards(
          path.join(__dirname, inputFileName)
        );
      });

      it("should calculate the correct score", () => {
        expect(calculateFirstWinnerScore(drawnNumbersAndBoards)).to.equal(
          score
        );
      });

      it("should calculate the correct score for last won board", () => {
        expect(calculateLastWinnerScore(drawnNumbersAndBoards)).to.equal(
          lastWinnerScore
        );
      });
    });
  });
});
