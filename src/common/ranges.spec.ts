import { describe, it } from "mocha";
import { expect } from "chai";
import { intRange } from "./ranges";

describe("ranges", () => {
  it("should create ranges for 1 input", () => {
    expect(intRange(3)).to.deep.equal([0, 1, 2]);
  });

  it("should create ranges for 2 inputs", () => {
    expect(intRange(3, 6)).to.deep.equal([3, 4, 5]);
  });
});
