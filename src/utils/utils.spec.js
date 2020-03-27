import {
  formatSizeData,
  formatLargeSizeData,
  formatHemisphereData,
  formatCenturyData
} from "./utils";

describe("formatSizeData", () => {
  it("accepts an empty array and returns an array of [0,0,0, 0, 0]", () => {
    expect(formatSizeData([])).toEqual([0, 0, 0, 0, 0]);
  });
  it("accepts an array of objects and sorts into counts of sizes", () => {
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

describe("formatHemisphereData", () => {
  it("accepts an empty array and returns an array of [0,0,0,0,0]", () => {
    expect(formatHemisphereData([])).toEqual([0, 0, 0, 0, 0]);
  });
  it("accepts an array of one object and creates a count of hemispheres", () => {
    const data = [{ geolocation: { latitude: 48.9, longitude: 22.4 } }];
    expect(formatHemisphereData(data)).toEqual([1, 0, 0, 0, 0]);
  });
  it("accepts an array of multiple objects and creates it into a count of hemispheres", () => {
    const data = [
      { geolocation: { latitude: 48.9, longitude: 22.4 } },
      { geolocation: { latitude: 19.9, longitude: 67.4 } },
      { geolocation: { latitude: -20, longitude: 22.4 } },
      { geolocation: { latitude: -40, longitude: -22 } },
      { geolocation: { latitude: -15, longitude: -34 } },
      { geolocation: { latitude: 40, longitude: -12 } },
      { geolocation: { latitude: "Unknown", longitude: "Unknown" } }
    ];
    expect(formatHemisphereData(data)).toEqual([2, 1, 2, 1, 1]);
  });
});

describe("formatCenturyData", () => {
  it("accepts an empty array and returns an array of [0, 0 ,0 , 0, 0]", () => {
    expect(formatCenturyData([])).toEqual([0, 0, 0, 0, 0]);
  });
  it("accepts an array of objects with years and returns a count of centuries", () => {
    const input = [
      { year: 1802 },
      { year: 2000 },
      { year: 1728 },
      { year: 1680 },
      { year: 1900 },
      { year: 1924 },
      { year: 2005 }
    ];
    expect(formatCenturyData(input)).toEqual([1, 1, 1, 2, 2]);
  });
});
