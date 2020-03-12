import { formatSizeData, formatLargeSizeData } from "./utils";

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

describe("formatLargeSizeData", () => {
  it("accepts an empty array and returns an array of [0,0,0]", () => {
    expect(formatLargeSizeData([])).toEqual([0, 0, 0, 0, 0]);
  });
  it("accepts an of objects and sorts into counts of sizes", () => {
    const input = [
      { mass: 100000 },
      { mass: 200000 },
      { mass: 750000 },
      { mass: 1500000 },
      { mass: 2500000 },
      { mass: 4000000 },
      { mass: 6000000 }
    ];

    expect(formatLargeSizeData(input)).toEqual([2, 1, 1, 2, 1]);
  });
});
