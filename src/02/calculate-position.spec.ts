import * as path from "path";
import { describe, beforeEach, it } from "mocha";
import { expect } from "chai";
import { readTextFileRowsSync } from "../common";
import { calculatePosition } from "./calculate-position";

describe("day 02: calculate-position", () => {
  let inputRows: string[];

  beforeEach(() => {
    inputRows = readTextFileRowsSync(path.join(__dirname, "input.txt"));
  });

  it("should calculate position", () => {
    const { horizontalPosition, depth } = calculatePosition(inputRows);

    expect(horizontalPosition * depth).to.equal(1842742223);
  });
});
