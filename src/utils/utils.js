const formatSizeData = (arrayOfMeteorites) => {
  let result = [0, 0, 0, 0, 0];

  arrayOfMeteorites.forEach((meteorite) => {
    if (meteorite.mass <= 50000) {
      result[0] += 1;
    } else if (meteorite.mass <= 100000) {
      result[1] += 1;
    } else if (meteorite.mass <= 200000) {
      result[2] += 1;
    } else if (meteorite.mass <= 300000) {
      result[3] += 1;
    } else {
      result[4] += 1;
    }
  });
  return result;
};

const formatLargeSizeData = (arrayOfMeteorites) => {
  let result = [0, 0, 0, 0, 0];

  arrayOfMeteorites.forEach((meteorite) => {
    if (meteorite.mass <= 500000) {
      result[0] += 1;
    } else if (meteorite.mass <= 1000000) {
      result[1] += 1;
    } else if (meteorite.mass <= 2000000) {
      result[2] += 1;
    } else if (meteorite.mass <= 5000000) {
      result[3] += 1;
    } else {
      result[4] += 1;
    }
  });
  return result;
};

const formatHemisphereData = (arrayOfMeteorites) => {
  let result = [0, 0, 0, 0, 0];

  arrayOfMeteorites.forEach((meteorite) => {
    if (
      meteorite.geolocation.latitude > 0 &&
      meteorite.geolocation.longitude > 0
    ) {
      result[0] += 1;
    } else if (
      meteorite.geolocation.latitude < 0 &&
      meteorite.geolocation.longitude > 0
    ) {
      result[1] += 1;
    } else if (
      meteorite.geolocation.latitude < 0 &&
      meteorite.geolocation.longitude < 0
    ) {
      result[2] += 1;
    } else if (
      meteorite.geolocation.latitude > 0 &&
      meteorite.geolocation.longitude < 0
    ) {
      result[3] += 1;
    } else {
      result[4] += 1;
    }
  });
  return result;
};

const formatCenturyData = (arrayOfMeteorites) => {
  let result = [0, 0, 0, 0, 0];
  arrayOfMeteorites.forEach((meteorite) => {
    if (meteorite.year < 1700) {
      result[0] += 1;
    } else if (meteorite.year < 1800) {
      result[1] += 1;
    } else if (meteorite.year < 1900) {
      result[2] += 1;
    } else if (meteorite.year < 2000) {
      result[3] += 1;
    } else {
      result[4] += 1;
    }
  });
  return result;
};

const formatHeatMapData = (arrayOfMeteorites) => {
  const filteredData = arrayOfMeteorites.filter((meteorite) => {
    return (
      !isNaN(meteorite.geolocation.latitude) &&
      !isNaN(meteorite.geolocation.longitude)
    );
  });
  const formattedData = filteredData.map((meteorite) => {
    return { ...meteorite.geolocation, intensity: 100 };
  });
  return formattedData;
};

export {
  formatSizeData,
  formatLargeSizeData,
  formatHemisphereData,
  formatCenturyData,
  formatHeatMapData,
};
