import { formatSizeData } from "./utils";

describe("formatSizeData", () => {
  it("accepts an empty array and returns an array of [0,0,0]", () => {
    expect(formatSizeData([])).toEqual([0, 0, 0, 0, 0]);
  });
  it("accepts an of objects and sorts into counts of sizes", () => {
    const input = [
      { mass: 1000 },
      { mass: 2000 },
      { mass: 75000 },
      { mass: 150000 },
      { mass: 190000 },
      { mass: 250000 },
      { mass: 2000000 }
    ];

    expect(formatSizeData(input)).toEqual([2, 1, 2, 1, 1]);
  });
});
