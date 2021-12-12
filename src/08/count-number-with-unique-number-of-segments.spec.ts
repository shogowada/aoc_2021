import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import {
  countNumberWithUniqueNumberOfSegments,
  sumDecodedNumbers,
} from "./count-number-with-unique-number-of-segments";
import { readTextFileSync } from "../common";

describe("day 08: count-number-with-unique-number-of-segments", () => {
  [
    {
      inputFileName: "input.test.txt",
      expectedNumberWithUniqueNumberOfSegments: 26,
      expectedSum: 61229,
    },
    {
      inputFileName: "input.txt",
      expectedNumberWithUniqueNumberOfSegments: 301,
      expectedSum: 908067,
    },
  ].forEach(
    ({
      inputFileName,
      expectedNumberWithUniqueNumberOfSegments,
      expectedSum,
    }) => {
      let input: string[];

      beforeEach(() => {
        const wholeInput: string = readTextFileSync(
          path.join(__dirname, inputFileName)
        ).replace(/\|\n/g, "|");

        input = wholeInput.split("\n");
      });

      it("should count number with unique number of segments", () => {
        expect(countNumberWithUniqueNumberOfSegments(input)).to.equal(
          expectedNumberWithUniqueNumberOfSegments
        );
      });

      it("should sum decoded numbers", () => {
        expect(sumDecodedNumbers(input)).to.equal(expectedSum);
      });
    }
  );
});
