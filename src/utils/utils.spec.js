import { formatDataFromSizes } from "./utils";

describe("formatDataFromSizes", () => {
  it("accepts an empty array and returns an array of [0,0,0]", () => {
    expect(formatDataFromSizes([])).toEqual([0, 0, 0]);
  });
  it("accepts an of objects and sorts into counts of sizes", () => {
    const input = [
      { mass: 100 },
      { mass: 200 },
      { mass: 1001 },
      { mass: 2000000 }
    ];

    expect(formatDataFromSizes(input)).toEqual([2, 1, 1]);
  });
});
