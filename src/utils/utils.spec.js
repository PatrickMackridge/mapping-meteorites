import {
  formatSizeData,
  formatLargeSizeData,
  formatHemisphereData,
  formatCenturyData,
  formatHeatMapData
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
describe("formatHeatMapData", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatHeatMapData([])).toEqual([]);
  });
  it("returns an array of geolocation objects with an 'intensity' key also added and set to 100", () => {
    const input = [
      {
        name: "Abee",
        id: "6",
        nametype: "Valid",
        recclass: "EH4",
        mass: "107000",
        fall: "Fell",
        year: "1952-01-01T00:00:00.000",
        reclat: "54.216670",
        reclong: "-113.000000",
        geolocation: {
          latitude: "54.21667",
          longitude: "-113.0"
        }
      },

      {
        name: "Achiras",
        id: "370",
        nametype: "Valid",
        recclass: "L6",
        mass: "780",
        fall: "Fell",
        year: "1902-01-01T00:00:00.000",
        reclat: "-33.166670",
        reclong: "-64.950000",
        geolocation: {
          latitude: "-33.16667",
          longitude: "-64.95"
        }
      }
    ];
    expect(formatHeatMapData(input)).toEqual([
      {
        latitude: "54.21667",
        longitude: "-113.0",
        intensity: 100
      },
      {
        latitude: "-33.16667",
        longitude: "-64.95",
        intensity: 100
      }
    ]);
  });
  it("returns an array geolocation objects, filtering out meteorites that have invalid latitude and/or longitude data", () => {
    const input = [
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: {
          latitude: "Unknown",
          longitude: "6.08333"
        }
      },
      {
        name: "Aarhus",
        id: "2",
        nametype: "Valid",
        recclass: "H6",
        mass: "720",
        fall: "Fell",
        year: "1951-01-01T00:00:00.000",
        reclat: "56.183330",
        reclong: "10.233330",
        geolocation: {
          latitude: "56.18333",
          longitude: "Unknown"
        }
      },
      {
        name: "Abee",
        id: "6",
        nametype: "Valid",
        recclass: "EH4",
        mass: "107000",
        fall: "Fell",
        year: "1952-01-01T00:00:00.000",
        reclat: "54.216670",
        reclong: "-113.000000",
        geolocation: {
          latitude: "54.21667",
          longitude: "-113.0"
        }
      },
      {
        name: "Acapulco",
        id: "10",
        nametype: "Valid",
        recclass: "Acapulcoite",
        mass: "1914",
        fall: "Fell",
        year: "1976-01-01T00:00:00.000",
        reclat: "16.883330",
        reclong: "-99.900000",
        geolocation: {
          latitude: "Unknown",
          longitude: "Unknown"
        }
      },
      {
        name: "Achiras",
        id: "370",
        nametype: "Valid",
        recclass: "L6",
        mass: "780",
        fall: "Fell",
        year: "1902-01-01T00:00:00.000",
        reclat: "-33.166670",
        reclong: "-64.950000",
        geolocation: {
          latitude: "-33.16667",
          longitude: "-64.95"
        }
      }
    ];
    expect(formatHeatMapData(input)).toEqual([
      {
        latitude: "54.21667",
        longitude: "-113.0",
        intensity: 100
      },
      {
        latitude: "-33.16667",
        longitude: "-64.95",
        intensity: 100
      }
    ]);
  });
});
